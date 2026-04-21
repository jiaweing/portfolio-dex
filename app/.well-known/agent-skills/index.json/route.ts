import { createHash } from "node:crypto";

export function GET() {
  const mcpCardUrl = "https://jiaweing.com/.well-known/mcp/server-card.json";

  const skill = {
    id: "jiaweing-portfolio-mcp",
    name: "Jia Wei Ng Portfolio MCP",
    description:
      "Access Jia Wei Ng's portfolio data via MCP: profile info, projects, and blog posts",
    type: "mcp-server",
    endpoint: mcpCardUrl,
    version: "1.0.0",
  };

  const digest = createHash("sha256")
    .update(JSON.stringify(skill))
    .digest("hex");

  const index = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [{ ...skill, digest: `sha256:${digest}` }],
  };

  return Response.json(index, {
    headers: { "Cache-Control": "s-maxage=86400" },
  });
}
