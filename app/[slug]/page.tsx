import { NotionRenderer } from "@/components/markdown-renderer";
import { FadeIn } from "@/components/ui/fade-in";
import { getPage, getPages } from "@/lib/notion";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
  const { page } = await getPage(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.title,
    description: page.description,
  };
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

  return (
    <>
      <FadeIn>
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
            {page.title}
          </h1>
        </header>
      </FadeIn>

      {blocks && blocks.length > 0 && (
        <FadeIn delay={0.2} duration={0.5}>
          <div className="mb-16">
            <NotionRenderer blocks={blocks} />
          </div>
        </FadeIn>
      )}
    </>
  );
}
