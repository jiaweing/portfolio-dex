import { type NextRequest, NextResponse } from "next/server";
import { deleteEntry, getRedis, moveEntry, moveInput } from "@/lib/guestbook";

export const dynamic = "force-dynamic";

const STATUS = { not_found: 404, forbidden: 403 } as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Not set up" }, { status: 503 });
  }
  const { id } = await params;
  const parsed = moveInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid move" }, { status: 400 });
  }
  const result = await moveEntry(redis, id, parsed.data);
  if (result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: STATUS[result.error] }
    );
  }
  return NextResponse.json(result);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ error: "Not set up" }, { status: 503 });
  }
  const { id } = await params;
  const token = request.headers.get("x-guestbook-token") ?? "";
  const result = await deleteEntry(redis, id, token);
  if (result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: STATUS[result.error] }
    );
  }
  return NextResponse.json(result);
}
