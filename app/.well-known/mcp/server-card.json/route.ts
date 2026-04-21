export function GET() {
  const card = {
    serverInfo: {
      name: "jiaweing-portfolio",
      version: "1.0.0",
      description:
        "MCP server for Jia Wei Ng's portfolio — profile, projects, and blog posts",
    },
    transport: {
      type: "http-streamable",
      endpoint: "https://jiaweing.com/mcp",
    },
    capabilities: {
      tools: {
        get_profile: {
          description:
            "Get Jia Wei Ng's profile: name, bio, current roles, and social links",
        },
        list_projects: {
          description:
            "List projects with title, description, tech stack, and year",
        },
        list_blog_posts: {
          description:
            "List recent published blog posts with title, date, and excerpt",
        },
      },
    },
  };

  return Response.json(card, {
    headers: { "Cache-Control": "s-maxage=86400" },
  });
}
