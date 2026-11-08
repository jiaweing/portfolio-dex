import { type NextRequest, NextResponse } from "next/server";
import { deleteEntry, getDb, moveEntry, moveInput } from "@/lib/guestbook";

export const dynamic = "force-dynamic";

const STATUS = { not_found: 404, forbidden: 403 } as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Not set up" }, { status: 503 });
  }
  const { id } = await params;
  const parsed = moveInput.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid move" }, { status: 400 });
  }
  const result = await moveEntry(db, id, parsed.data);
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
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Not set up" }, { status: 503 });
  }
  const { id } = await params;
  const token = request.headers.get("x-guestbook-token") ?? "";
  const result = await deleteEntry(db, id, token);
  if (result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: STATUS[result.error] }
    );
  }
  return NextResponse.json(result);
}
