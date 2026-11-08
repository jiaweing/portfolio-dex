/**
 * One-off copy of guestbook signatures from Upstash Redis into Postgres.
 *
 *   UPSTASH_REDIS_REST_URL=... UPSTASH_REDIS_REST_TOKEN=... \
 *   DATABASE_URL=postgres://... bun scripts/migrate-guestbook-from-upstash.ts
 *
 * Safe to re-run: entries that already exist in Postgres are skipped.
 * Set DRY_RUN=1 to only report what would be copied.
 */
import { getDb } from "../lib/guestbook";

interface StoredEntry {
  id: string;
  name?: string;
  paths: unknown;
  viewBox: unknown;
  x: number;
  y: number;
  rotation: number;
  createdAt: string;
  tokenHash: string;
  signerHash?: string;
}

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const dryRun = process.env.DRY_RUN === "1";

if (!(url && token)) {
  throw new Error("Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN");
}

const response = await fetch(`${url}/hgetall/guestbook:entries`, {
  headers: { Authorization: `Bearer ${token}` },
});
if (!response.ok) {
  throw new Error(`Upstash responded ${response.status}`);
}
const { result } = (await response.json()) as { result: string[] | null };
const flat = result ?? [];

const entries: StoredEntry[] = [];
for (let i = 1; i < flat.length; i += 2) {
  entries.push(JSON.parse(flat[i] as string) as StoredEntry);
}
console.log(`Found ${entries.length} signatures in Upstash`);

if (dryRun) {
  process.exit(0);
}

const db = await getDb();
if (!db) {
  throw new Error("Set DATABASE_URL");
}

let copied = 0;
for (const entry of entries) {
  const { rowCount } = await db.query(
    `INSERT INTO guestbook_entries
       (id, name, paths, view_box, x, y, rotation, created_at, token_hash, signer_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT DO NOTHING`,
    [
      entry.id,
      entry.name ?? "",
      JSON.stringify(entry.paths),
      JSON.stringify(entry.viewBox),
      entry.x,
      entry.y,
      entry.rotation,
      entry.createdAt,
      entry.tokenHash,
      entry.signerHash ?? null,
    ]
  );
  copied += rowCount ?? 0;
}
console.log(`Copied ${copied}, skipped ${entries.length - copied} existing`);
await db.end();
