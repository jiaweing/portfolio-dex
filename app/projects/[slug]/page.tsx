import { ProjectContent } from "@/components/ProjectContent";
import { FadeIn } from "@/components/ui/fade-in";
import { generateProjectMetadata } from "@/lib/metadata";
import { getProject, getProjects } from "@/lib/notion";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            back to projects
          </Link>
        </FadeIn>

        <ProjectContent project={project} blocks={blocks} />
      </div>
    </article>
  );
}
