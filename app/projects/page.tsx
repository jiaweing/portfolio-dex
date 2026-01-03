import { OpenSourceSection } from "@/components/experience/OpenSourceSection";
import { ProjectsView } from "@/components/ProjectsView";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata } from "@/lib/metadata";
import { getProject, getProjects } from "@/lib/notion";

export const metadata = generateMetadata({
  title: "Projects",
  description: "A showcase of my recent work and projects.",
  url: "/projects",
});

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
      <FadeIn delay={0.1}>
        <ProjectsView projects={projectsWithBlocks} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="container mx-auto px-4 pb-20">
          <h2 className="mb-8 font-semibold text-2xl tracking-tight">
            Open Source
          </h2>
          <OpenSourceSection />
        </div>
      </FadeIn>
    </div>
  );
}
