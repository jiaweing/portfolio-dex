import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotionRenderer } from "@/components/NotionRenderer";
import { FadeIn } from "@/components/ui/fade-in";
import { generatePageMetadata } from "@/lib/metadata";
import { extractDescriptionFromBlocks, getPage, getPages } from "@/lib/notion";
import { highlightCode } from "@/lib/shiki";

export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { page, blocks } = await getPage(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const description = page.description || extractDescriptionFromBlocks(blocks);
  return generatePageMetadata({ ...page, description });
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { page, blocks } = await getPage(slug);

  if (!page) {
    notFound();
  }

  const highlightedCodeMap: Record<string, string> = {};
  if (blocks) {
    await Promise.all(
      blocks
        .filter((b) => b.type === "code")
        .map(async (block) => {
          const b = block as Extract<typeof block, { type: "code" }>;
          const code = b.code.rich_text.map((t) => t.plain_text).join("");
          const html = await highlightCode(code, b.code.language);
          if (html) highlightedCodeMap[block.id] = html;
        })
    );
  }

  return (
    <>
      <FadeIn>
        <div className="mb-8 flex flex-col">
          <div className="flex flex-col items-start gap-4">
            <h3 className="mb-2 font-semibold">{page.title}</h3>
            {page.description && (
              <p className="text-muted-foreground text-xl">
                {page.description}
              </p>
            )}
          </div>
        </div>
      </FadeIn>

      {blocks && blocks.length > 0 && (
        <FadeIn delay={0.2} duration={0.5}>
          <div className="mb-16">
            <NotionRenderer
              blocks={blocks}
              highlightedCodeMap={highlightedCodeMap}
            />
          </div>
        </FadeIn>
      )}
    </>
  );
}
