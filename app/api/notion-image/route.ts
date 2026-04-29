import { unstable_cache } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { getNotionClient } from "@/lib/notion";

const fetchNotionImageUrl = unstable_cache(
  async (
    pageId: string,
    prop: string,
    index: number
  ): Promise<string | null> => {
    const notion = getNotionClient();
    if (!notion) return null;

    const page: any = await notion.pages.retrieve({ page_id: pageId });

    if (prop === "logo") {
      return (
        page.properties?.Logo?.files?.[0]?.file?.url ||
        page.properties?.Logo?.files?.[0]?.external?.url ||
        null
      );
    }
    if (prop === "cover") {
      return (
        page.properties?.Banner?.files?.[0]?.file?.url ||
        page.properties?.Banner?.files?.[0]?.external?.url ||
        page.properties?.Cover?.files?.[0]?.file?.url ||
        page.properties?.Cover?.files?.[0]?.external?.url ||
        page.properties?.Image?.files?.[0]?.file?.url ||
        page.properties?.Image?.files?.[0]?.external?.url ||
        page.cover?.external?.url ||
        page.cover?.file?.url ||
        null
      );
    }
    if (prop === "screenshot") {
      const files = page.properties?.Screenshots?.files || [];
      const file = files[index];
      return file?.file?.url || file?.external?.url || null;
    }
    return null;
  },
  ["notion-image-url"],
  { revalidate: 3600 }
);

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const pageId = searchParams.get("pageId");
  const prop = searchParams.get("prop") || "logo";
  const index = Number.parseInt(searchParams.get("index") || "0");

  if (!pageId) {
    return new NextResponse("Missing pageId", { status: 400 });
  }

  try {
    const url = await fetchNotionImageUrl(pageId, prop, index);
    if (!url) {
      return new NextResponse("Image not found", { status: 404 });
    }
    return NextResponse.redirect(url, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Failed to fetch from Notion", { status: 500 });
  }
}
