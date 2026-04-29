import { NextResponse } from "next/server";
import { getProjects } from "@/lib/notion";

export const revalidate = 1800;

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(
    { projects, generatedAt: Date.now() },
    {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    }
  );
}
