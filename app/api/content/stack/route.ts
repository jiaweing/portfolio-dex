import { NextResponse } from "next/server";
import { getStackItems } from "@/lib/notion";

export const revalidate = 1800;

export async function GET() {
  const items = await getStackItems();
  return NextResponse.json(
    { items, generatedAt: Date.now() },
    {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    }
  );
}
