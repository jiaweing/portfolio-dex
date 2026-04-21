import { getProjects } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getProjects().catch(() => []);
  const data = projects.map((p) => ({
    title: p.title,
    description: p.description,
    year: p.year,
    techStack: p.techStack,
    url: p.url || undefined,
    github: p.github || undefined,
    status: p.status,
  }));
  return Response.json(data);
}
