import profileData from "@/data/profile.json";
import { getBlogPosts, getProjects } from "@/lib/notion";

export const dynamic = "force-dynamic";

const TOOLS = [
  {
    name: "get_profile",
    description:
      "Get Jia Wei Ng's profile: name, bio, current roles, and social links",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_projects",
    description: "List projects from Jia Wei Ng's portfolio",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Max number of projects to return (default 20)",
        },
      },
    },
  },
  {
    name: "list_blog_posts",
    description: "List published blog posts from Jia Wei Ng's blog",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Max number of posts to return (default 20)",
        },
      },
    },
  },
];

async function executeTool(name: string, args: Record<string, unknown>) {
  if (name === "get_profile") {
    const present = (profileData as any).present;
    const social = (profileData as any).social;
    return {
      name: "Jia Wei Ng",
      bio: "a serial entrepreneur, designer & software engineer based in Singapore",
      url: "https://jiaweing.com",
      currentRoles: present.map((r: any) => ({
        title: r.title,
        organization: r.organization,
        url: r.url,
        description: r.description,
      })),
      social: social.map((s: any) => ({ name: s.name, url: s.url })),
    };
  }

  if (name === "list_projects") {
    const limit = (args.limit as number) ?? 20;
    const projects = await getProjects().catch(() => []);
    return projects.slice(0, limit).map((p) => ({
      title: p.title,
      description: p.description,
      year: p.year,
      techStack: p.techStack,
      url: p.url || undefined,
      github: p.github || undefined,
      status: p.status,
    }));
  }

  if (name === "list_blog_posts") {
    const limit = (args.limit as number) ?? 20;
    const posts = await getBlogPosts().catch(() => []);
    return posts.slice(0, limit).map((p) => ({
      title: p.title,
      slug: p.slug,
      date: p.date,
      description: p.description,
      tags: p.tags,
      url: `https://jiaweing.com/blog/${p.slug}`,
    }));
  }

  throw new Error(`Unknown tool: ${name}`);
}

async function handleJsonRpc(body: any) {
  const { jsonrpc, id, method, params } = body;

  if (jsonrpc !== "2.0") {
    return {
      jsonrpc: "2.0",
      id: null,
      error: { code: -32_600, message: "Invalid Request" },
    };
  }

  if (method === "initialize") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        serverInfo: { name: "jiaweing-portfolio", version: "1.0.0" },
        capabilities: { tools: {} },
      },
    };
  }

  if (method === "tools/list") {
    return { jsonrpc: "2.0", id, result: { tools: TOOLS } };
  }

  if (method === "tools/call") {
    const toolName = params?.name as string;
    const toolArgs = (params?.arguments as Record<string, unknown>) || {};
    try {
      const result = await executeTool(toolName, toolArgs);
      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        },
      };
    } catch (err: any) {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32_603, message: err.message || "Internal error" },
      };
    }
  }

  return {
    jsonrpc: "2.0",
    id,
    error: { code: -32_601, message: "Method not found" },
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await handleJsonRpc(body);
    return Response.json(response);
  } catch {
    return Response.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32_700, message: "Parse error" },
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  return Response.json(
    {
      name: "jiaweing-portfolio MCP server",
      version: "1.0.0",
      protocol: "JSON-RPC 2.0",
      endpoint: "POST /mcp",
      tools: TOOLS.map((t) => t.name),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
