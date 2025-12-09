import { NotionRenderer } from "@/components/NotionRenderer";
import { getPage, getPages } from "@/lib/notion";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await getPage(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.title,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const { page, blocks } = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="container py-12 md:py-24 max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4 mb-8 text-center items-center">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl">
          {page.title}
        </h1>
      </div>
       
      {/* Separator */}
      <div className="my-8 w-full border-t" />

      <NotionRenderer blocks={blocks} />
    </article>
  );
}
