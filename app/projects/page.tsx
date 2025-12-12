import { ProjectsCardStack } from "@/components/ProjectsCardStack";
import { FadeIn } from "@/components/ui/fade-in";
import { getProject, getProjects } from "@/lib/notion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of my recent work and projects.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  // Fetch full content (blocks) for each project
  const projectsWithBlocks = await Promise.all(
    projects.map(async (p) => {
      const { blocks } = await getProject(p.slug);
      return { ...p, blocks };
    })
  );

  return (
    <div className="min-h-screen">
      <FadeIn>
        <h3 className="font-semibold mb-8 text-center hidden md:block opacity-0">
          projects
        </h3>
        {/* Hide default header since we have card stack, or keep it? User said "main ui". 
            I'll keep the section header but maybe center it or styled differently. 
            Actually, let's keep it simple. */}
      </FadeIn>

      <FadeIn delay={0.1}>
        <ProjectsCardStack projects={projectsWithBlocks} />
      </FadeIn>
    </div>
  );
}
