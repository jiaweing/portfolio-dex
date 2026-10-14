import { type NextRequest, NextResponse } from "next/server";
import {
  allowSigning,
  createEntry,
  getRedis,
  listEntries,
  signatureInput,
} from "@/lib/guestbook";

export const dynamic = "force-dynamic";

const notConfigured = () =>
  NextResponse.json(
    { error: "Guestbook storage is not set up" },
    { status: 503 }
  );

export async function GET() {
  const redis = getRedis();
  if (!redis) return notConfigured();
  return NextResponse.json({ entries: await listEntries(redis) });
}

export async function POST(request: NextRequest) {
  const redis = getRedis();
  if (!redis) return notConfigured();

  const parsed = signatureInput.safeParse(
    await request.json().catch(() => null)
  );
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const message =
      issue?.message === "Signature is too detailed"
        ? "That signature is too detailed, try a simpler one"
        : "Couldn't read that signature, please try again";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!(await allowSigning(redis, ip))) {
    return NextResponse.json(
      { error: "Too many signatures, try again later" },
      { status: 429 }
    );
  }

  const result = await createEntry(redis, parsed.data);
  if ("error" in result) {
    return NextResponse.json(
      { error: "The guestbook is full" },
      { status: 409 }
    );
  }
  return NextResponse.json(result, { status: 201 });
}
