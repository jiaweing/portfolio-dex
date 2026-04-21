import profileData from "@/data/profile.json";
import { getBlogPosts, getProjects } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET() {
  const [posts, projects] = await Promise.all([
    getBlogPosts().catch(() => []),
    getProjects().catch(() => []),
  ]);

  const recentPosts = posts.slice(0, 5);
  const recentProjects = projects.slice(0, 5);

  const present = (profileData as any).present as Array<{
    title: string;
    organization: string;
    url: string;
    description: string;
  }>;

  const social = (profileData as any).social as Array<{
    name: string;
    url: string;
  }>;

  const lines: string[] = [
    "# Jia Wei Ng",
    "",
    "a serial entrepreneur, designer & software engineer based in Singapore.",
    "",
    "## Current Roles",
    "",
  ];

  for (const role of present) {
    const title = role.title ? `${role.title} @ ` : "";
    lines.push(
      `- **${title}${role.organization}** — ${role.description} (${role.url})`
    );
  }

  lines.push("", "## Recent Projects", "");
  for (const project of recentProjects) {
    lines.push(
      `- **${project.title}** (${project.year}) — ${project.description}${project.url ? ` [${project.url}]` : ""}`
    );
  }

  lines.push("", "## Recent Blog Posts", "");
  for (const post of recentPosts) {
    lines.push(
      `- **${post.title}** (${post.date?.slice(0, 10) || ""}) — ${post.description} [https://jiaweing.com/blog/${post.slug}]`
    );
  }

  lines.push("", "## Links", "");
  for (const link of social) {
    lines.push(`- ${link.name}: ${link.url}`);
  }

  lines.push(
    "",
    "---",
    "",
    "MCP endpoint: https://jiaweing.com/mcp",
    "API catalog: https://jiaweing.com/.well-known/api-catalog",
    ""
  );

  const markdown = lines.join("\n");
  const tokenEstimate = Math.ceil(markdown.length / 4);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokenEstimate),
      "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
