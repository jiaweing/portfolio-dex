import { ProjectCard } from "@/components/projects-showcase";
import { FadeIn } from "@/components/ui/fade-in";
import { getProjects } from "@/lib/notion";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of my recent work and projects.",
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      <FadeIn>
        <h3 className="font-semibold mb-2">projects</h3>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 0.1}>
            <Link href={`/projects/${project.slug}`} className="block h-full">
              <ProjectCard project={project} />
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
