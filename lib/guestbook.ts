import { createHash, randomBytes, randomUUID } from "node:crypto";
import { Pool } from "pg";
import { z } from "zod";

// Signatures live in Postgres. Each one carries a hash of the edit token
// handed to its author, so only they can move or remove it later.

const MAX_ENTRIES = 500;
const RATE_LIMIT = { max: 5, windowSeconds: 3600 };

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS guestbook_entries (
    id uuid PRIMARY KEY,
    name text NOT NULL DEFAULT '',
    paths jsonb NOT NULL,
    view_box jsonb NOT NULL,
    x double precision NOT NULL,
    y double precision NOT NULL,
    rotation integer NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    token_hash text NOT NULL,
    signer_hash text
  );
  -- One live signature per signer, so removing yours frees you to sign again
  CREATE UNIQUE INDEX IF NOT EXISTS guestbook_entries_signer_hash_key
    ON guestbook_entries (signer_hash) WHERE signer_hash IS NOT NULL;
  CREATE INDEX IF NOT EXISTS guestbook_entries_created_at_idx
    ON guestbook_entries (created_at);
  CREATE TABLE IF NOT EXISTS guestbook_rate_limits (
    key text PRIMARY KEY,
    count integer NOT NULL,
    expires_at timestamptz NOT NULL
  );
`;

let pool: Pool | null = null;
let ready: Promise<void> | null = null;

/** Null until DATABASE_URL is set */
export async function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  pool ??= new Pool({ connectionString, max: 5 });
  const db = pool;
  ready ??= db
    .query(SCHEMA)
    .then(() => undefined)
    .catch((error) => {
      ready = null;
      throw error;
    });
  await ready;
  return db;
}

// Outline paths from the signature pad only ever use these characters
const PATH_DATA = /^[MmLlQqCcZz0-9.,\s-]+$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const signatureInput = z.object({
  name: z.string().trim().max(40).optional().default(""),
  // A long cursive stroke outlines to tens of thousands of characters, so cap
  // the signature as a whole rather than each stroke
  paths: z
    .array(
      z.object({
        d: z.string().min(1).max(150_000).regex(PATH_DATA),
        color: z.enum(["black", "blue", "violet"]),
      })
    )
    .min(1)
    .max(200)
    .refine(
      (paths) => paths.reduce((sum, p) => sum + p.d.length, 0) <= 400_000,
      "Signature is too detailed"
    ),
  viewBox: z.tuple([
    z.number().finite(),
    z.number().finite(),
    z.number().positive().max(2000),
    z.number().positive().max(2000),
  ]),
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
});

export const moveInput = z.object({
  token: z.string().min(16).max(128),
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
});

export type SignatureInput = z.infer<typeof signatureInput>;

export type GuestbookEntry = Omit<SignatureInput, "name"> & {
  id: string;
  name: string;
  rotation: number;
  createdAt: string;
};

interface Row {
  id: string;
  name: string;
  paths: SignatureInput["paths"];
  view_box: SignatureInput["viewBox"];
  x: number;
  y: number;
  rotation: number;
  created_at: Date;
}

const PUBLIC_COLUMNS = "id, name, paths, view_box, x, y, rotation, created_at";

const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

const toPublic = (row: Row): GuestbookEntry => ({
  id: row.id,
  name: row.name,
  paths: row.paths,
  viewBox: row.view_box,
  x: row.x,
  y: row.y,
  rotation: row.rotation,
  createdAt: row.created_at.toISOString(),
});

export async function listEntries(db: Pool): Promise<GuestbookEntry[]> {
  const { rows } = await db.query<Row>(
    `SELECT ${PUBLIC_COLUMNS} FROM guestbook_entries ORDER BY created_at`
  );
  return rows.map(toPublic);
}

/** True when this IP is still within its signing allowance */
export async function allowSigning(db: Pool, ip: string) {
  await db.query("DELETE FROM guestbook_rate_limits WHERE expires_at < now()");
  const { rows } = await db.query<{ count: number }>(
    `INSERT INTO guestbook_rate_limits (key, count, expires_at)
     VALUES ($1, 1, now() + make_interval(secs => $2))
     ON CONFLICT (key) DO UPDATE SET
       count = CASE WHEN guestbook_rate_limits.expires_at <= now()
         THEN 1 ELSE guestbook_rate_limits.count + 1 END,
       expires_at = CASE WHEN guestbook_rate_limits.expires_at <= now()
         THEN EXCLUDED.expires_at ELSE guestbook_rate_limits.expires_at END
     RETURNING count`,
    [hashToken(ip), RATE_LIMIT.windowSeconds]
  );
  return (rows[0]?.count ?? Number.POSITIVE_INFINITY) <= RATE_LIMIT.max;
}

export async function createEntry(
  db: Pool,
  input: SignatureInput,
  signerId: string
) {
  const signerHash = hashToken(signerId);
  const { rows: existing } = await db.query(
    "SELECT 1 FROM guestbook_entries WHERE signer_hash = $1",
    [signerHash]
  );
  // Only blocks while their signature is still on the wall, so a removed or
  // moderated entry frees them to sign again
  if (existing.length > 0) {
    return { error: "already_signed" as const };
  }

  const { rows: total } = await db.query<{ count: number }>(
    "SELECT count(*)::int AS count FROM guestbook_entries"
  );
  if ((total[0]?.count ?? 0) >= MAX_ENTRIES) {
    return { error: "full" as const };
  }

  const token = randomBytes(24).toString("base64url");
  const { rows } = await db.query<Row>(
    `INSERT INTO guestbook_entries
       (id, name, paths, view_box, x, y, rotation, token_hash, signer_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (signer_hash) WHERE signer_hash IS NOT NULL DO NOTHING
     RETURNING ${PUBLIC_COLUMNS}`,
    [
      randomUUID(),
      input.name,
      JSON.stringify(input.paths),
      JSON.stringify(input.viewBox),
      input.x,
      input.y,
      // A slight random tilt so the wall looks hand made
      Math.round((Math.random() - 0.5) * 16),
      hashToken(token),
      signerHash,
    ]
  );
  // Lost a race with another request from the same signer
  if (!rows[0]) {
    return { error: "already_signed" as const };
  }
  return { entry: toPublic(rows[0]), token };
}

async function ownershipError(db: Pool, id: string) {
  const { rows } = await db.query(
    "SELECT 1 FROM guestbook_entries WHERE id = $1",
    [id]
  );
  return rows.length > 0 ? ("forbidden" as const) : ("not_found" as const);
}

export async function moveEntry(
  db: Pool,
  id: string,
  { token, x, y }: z.infer<typeof moveInput>
) {
  if (!UUID.test(id)) {
    return { error: "not_found" as const };
  }
  const { rows } = await db.query<Row>(
    `UPDATE guestbook_entries SET x = $3, y = $4
     WHERE id = $1 AND token_hash = $2
     RETURNING ${PUBLIC_COLUMNS}`,
    [id, hashToken(token), x, y]
  );
  if (!rows[0]) {
    return { error: await ownershipError(db, id) };
  }
  return { entry: toPublic(rows[0]) };
}

export async function deleteEntry(db: Pool, id: string, token: string) {
  if (!UUID.test(id)) {
    return { error: "not_found" as const };
  }
  const { rowCount } = await db.query(
    "DELETE FROM guestbook_entries WHERE id = $1 AND token_hash = $2",
    [id, hashToken(token)]
  );
  if (!rowCount) {
    return { error: await ownershipError(db, id) };
  }
  return { ok: true as const };
}
