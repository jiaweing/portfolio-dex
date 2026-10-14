import { createHash, randomBytes, randomUUID } from "node:crypto";
import { Redis } from "@upstash/redis";
import { z } from "zod";

// Signatures live in one Redis hash, id -> JSON. Each one carries a hash of the
// edit token handed to its author, so only they can move or remove it later.

const ENTRIES_KEY = "guestbook:entries";
const MAX_ENTRIES = 500;
const RATE_LIMIT = { max: 5, windowSeconds: 3600 };

let client: Redis | null = null;

/** Null until the Upstash integration has provisioned its env vars */
export function getRedis() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!(url && token)) return null;
  client ??= new Redis({ url, token });
  return client;
}

// Outline paths from the signature pad only ever use these characters
const PATH_DATA = /^[MmLlQqCcZz0-9.,\s-]+$/;

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

type StoredEntry = GuestbookEntry & { tokenHash: string };

const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

const toPublic = ({
  tokenHash: _hash,
  ...entry
}: StoredEntry): GuestbookEntry => entry;

export async function listEntries(redis: Redis): Promise<GuestbookEntry[]> {
  const all = await redis.hgetall<Record<string, StoredEntry>>(ENTRIES_KEY);
  return Object.values(all ?? {})
    .map(toPublic)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

/** True when this IP is still within its signing allowance */
export async function allowSigning(redis: Redis, ip: string) {
  const key = `guestbook:rate:${hashToken(ip)}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_LIMIT.windowSeconds);
  return count <= RATE_LIMIT.max;
}

export async function createEntry(redis: Redis, input: SignatureInput) {
  if ((await redis.hlen(ENTRIES_KEY)) >= MAX_ENTRIES) {
    return { error: "full" as const };
  }
  const token = randomBytes(24).toString("base64url");
  const entry: StoredEntry = {
    ...input,
    id: randomUUID(),
    // A slight random tilt so the wall looks hand made
    rotation: Math.round((Math.random() - 0.5) * 16),
    createdAt: new Date().toISOString(),
    tokenHash: hashToken(token),
  };
  await redis.hset(ENTRIES_KEY, { [entry.id]: entry });
  return { entry: toPublic(entry), token };
}

async function findOwned(redis: Redis, id: string, token: string) {
  const entry = await redis.hget<StoredEntry>(ENTRIES_KEY, id);
  if (!entry) return { error: "not_found" as const };
  if (entry.tokenHash !== hashToken(token))
    return { error: "forbidden" as const };
  return { entry };
}

export async function moveEntry(
  redis: Redis,
  id: string,
  { token, x, y }: z.infer<typeof moveInput>
) {
  const found = await findOwned(redis, id, token);
  if ("error" in found) return { error: found.error };
  const entry = { ...found.entry, x, y };
  await redis.hset(ENTRIES_KEY, { [id]: entry });
  return { entry: toPublic(entry) };
}

export async function deleteEntry(redis: Redis, id: string, token: string) {
  const found = await findOwned(redis, id, token);
  if ("error" in found) return { error: found.error };
  await redis.hdel(ENTRIES_KEY, id);
  return { ok: true as const };
}
