import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectContent } from "@/components/ProjectContent";
import { FadeIn } from "@/components/ui/fade-in";
import { generateProjectMetadata } from "@/lib/metadata";
import { getProject, getProjects } from "@/lib/notion";

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
  const { project } = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return generateProjectMetadata(project);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { project, blocks } = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
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
