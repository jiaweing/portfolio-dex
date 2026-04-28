import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectContent } from "@/components/ProjectContent";
import { FadeIn } from "@/components/ui/fade-in";
import { generateProjectMetadata, siteConfig } from "@/lib/metadata";
import {
  extractDescriptionFromBlocks,
  getProject,
  getProjects,
} from "@/lib/notion";

export const revalidate = 60; // Revalidate every minute

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { project, blocks } = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const description =
    project.description || extractDescriptionFromBlocks(blocks);
  return generateProjectMetadata({ ...project, description });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { project, blocks } = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": `${siteConfig.url}/projects/${project.slug}#project`,
            name: project.title,
            description: project.description,
            url: project.url ?? `${siteConfig.url}/projects/${project.slug}`,
            author: {
              "@type": "Person",
              "@id": "https://jiaweing.com/#person",
              name: "Jia Wei Ng",
              url: siteConfig.url,
            },
            applicationCategory: "WebApplication",
            keywords: project.techStack.join(", "),
          }),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteConfig.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Projects",
                item: `${siteConfig.url}/projects`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: project.title,
                item: `${siteConfig.url}/projects/${project.slug}`,
              },
            ],
          }),
        }}
        type="application/ld+json"
      />
      <div className="space-y-8">
        {/* Back Link */}
        <FadeIn>
          <Link
            className="mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/projects"
          >
            <ChevronLeft className="h-4 w-4" />
            back to projects
          </Link>
        </FadeIn>

        <ProjectContent blocks={blocks} project={project} />
      </div>
    </article>
  );
}
