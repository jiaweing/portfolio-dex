import { notFound } from "next/navigation";
import { ProjectModal } from "@/components/ProjectModal";
import { getProject, getProjects } from "@/lib/notion";

interface ProjectModalProps {
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

export default async function ProjectModalPage({ params }: ProjectModalProps) {
  const { slug } = await params;
  const { project, blocks } = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectModal blocks={blocks} project={project} />;
}
