---
title: "MCP is the new REST"
date: "2026-04-04"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

REST didn't win because it was the best protocol. It won because it was simple enough that everyone adopted it. Developers could understand it in an afternoon, and within a few years it became the default way software talked to other software.
Model Context Protocol has that same energy. Introduced by Anthropic in late 2024, MCP is quietly becoming the standard for how AI agents connect to the world. And if you're building anything that touches AI in 2026, it's worth understanding why.
## What MCP actually is
At its core, MCP is a standardized way for AI agents to discover and call tools. Think of it as OpenAPI or Swagger, but designed for agents instead of human developers.
With a traditional REST API, a developer reads the docs, understands the endpoints, writes integration code, and handles errors. The developer is the one doing the reasoning. With MCP, the AI model itself discovers what tools are available, understands what they do, and decides how to use them, all at runtime.
The protocol defines three core primitives: tools (actions the agent can take), resources (data the agent can read), and prompts (reusable templates for common interactions). An MCP server exposes these capabilities, and any MCP client, whether it's Claude, ChatGPT, Cursor, or VS Code, can connect and start using them immediately.
This is the key insight. MCP doesn't replace REST APIs. Most MCP servers are calling REST APIs under the hood. What MCP does is add a layer on top that makes existing APIs legible to AI. It's the translation layer between human-designed services and machine reasoning.
## Why it matters now
The agent explosion created an integration crisis.
Every AI application needs to connect to external tools, databases, APIs, and services. Without a standard, each combination of model and tool requires a custom integration. If you have M models and N tools, you end up building M×N integrations. That's the same fragmentation problem that REST itself solved for web services two decades ago.
MCP collapses that to M+N. Build one MCP server for your tool, and every MCP-compatible agent can use it. Build one MCP client into your agent, and it can talk to every MCP server.
The adoption numbers are striking. By the end of 2025, the MCP ecosystem had reached 97 million monthly SDK downloads across Python and TypeScript, with over 10,000 active servers. First-class client support now exists in Claude, ChatGPT, Cursor, Gemini, Microsoft Copilot, and Visual Studio Code.
In January 2026, Anthropic launched MCP Apps, which allow tools to return interactive UI components instead of plain text. Launch partners included Amplitude, Box, Canva, Figma, Hex, Monday, and Slack. Each company made deliberate choices about which parts of their product to expose, essentially asking: what is the essence of our value when an AI agent is the interface?
That question is going to define the next era of SaaS.
## The Anthropic play
Anthropic didn't just build MCP and keep it proprietary. They open-sourced it from day one, then in December 2025, donated it to the newly formed Agentic AI Foundation under the Linux Foundation. OpenAI and Block joined as co-founders. Google, Microsoft, AWS, Cloudflare, and Bloomberg signed on as supporting members.
This wasn't charity. It was strategy.
Anthropic understood that protocol control equals ecosystem control. Whoever defines how agents connect to tools shapes the entire agentic economy. By open-sourcing MCP and getting competitors to co-sign it, Anthropic ensured that their protocol, not someone else's, became the shared infrastructure.
We've seen this playbook before. Google shaped the web by building Chrome and V8, then making them open source. The browser became the platform, and Google controlled the most important browser. Facebook shaped social by creating the Graph API, giving developers a standard way to build on top of social data, while Facebook controlled the graph itself.
Anthropic is making the same bet with MCP. The protocol is open. The ecosystem is shared. But the company that defined the spec, that built the reference implementations, that has the deepest understanding of how agents should interact with tools, that company has a structural advantage that's hard to replicate.
## If you're building, you need an MCP server
Here's the practical reality for anyone building a developer tool or SaaS product in 2026: if you don't have an MCP server, you're invisible to agents.
This isn't hypothetical. When a developer asks Claude to "check the latest deployment status" or "find the failing test in CI," the agent looks for available MCP tools. If your platform doesn't expose an MCP server, the agent can't use it. Your product drops out of the workflow entirely.
The companies that moved early understood this. Figma started with a local MCP server and later upgraded to a remote one. Amplitude exposed its insights layer. Slack made its messaging and channel data available. Each of them recognized that being agent-accessible isn't a nice-to-have anymore, it's a distribution channel.
For builders, the good news is that wrapping an existing REST API in an MCP server is straightforward. The SDKs are mature, the spec is well-documented, and the ecosystem of examples is large. The harder question is deciding which capabilities to expose and how to structure them so that agents can use them effectively.
## What's still broken
MCP is not finished. It's important to be honest about that.
Authentication is still evolving. The protocol uses OAuth, but the patterns for handling credentials across different server types, local vs. remote, single-user vs. multi-tenant, are not fully standardized. The 2026 roadmap lists auth as a priority area, which tells you it's still a pain point.
Discovery is fragmented. There's no universal registry where agents can find MCP servers. The roadmap introduces the concept of "MCP Server Cards," a standard for exposing structured metadata via a `.well-known` URL so that browsers, crawlers, and registries can discover a server's capabilities without connecting to it. But that's still in development.
Scalability is a work in progress. Running MCP servers at scale has revealed gaps around horizontal scaling, stateless operation, and middleware patterns. The next-generation transport aims to fix these, enabling MCP to run statelessly across multiple server instances behind load balancers.
And then there's the broader protocol landscape. MCP handles tool access, but Google's Agent-to-Agent (A2A) protocol targets agent coordination, while protocols like ACP and UCP address commerce-specific workflows. A complete enterprise agent stack in 2026 will likely use multiple protocols, and the boundaries between them are still being drawn.
## The protocol layer is boring, and that's the point
Protocols don't make for exciting demos. Nobody showcases a protocol at a product launch. They showcase what the protocol enables.
But the protocol layer is where empires are built. HTTP defined how the web worked. REST defined how APIs worked. TCP/IP defined how networks worked. Each of these was, on its own, deeply boring. Each of them also created trillion-dollar ecosystems.
MCP is making its bid to be the protocol that defines how AI agents interact with the world. It's early, it's rough around the edges, and there's real work left to do. But the adoption curve is steep, the backing is broad, and the problem it solves, giving agents a universal way to connect to tools, is only getting more urgent.
REST gave developers a shared language for building on the web. MCP is giving agents a shared language for building on everything else.
## References
1. [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol), Anthropic
2. [Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation), Anthropic
3. [A Year of MCP: From Internal Experiment to Industry Standard](https://www.pento.ai/blog/a-year-of-mcp-2025-review), Pento
4. [MCP's biggest growing pains for production use will soon be solved](https://thenewstack.io/model-context-protocol-roadmap-2026/), The New Stack
5. [The Model Context Protocol's impact on 2025](https://www.thoughtworks.com/en-us/insights/blog/generative-ai/model-context-protocol-mcp-impact-2025), Thoughtworks
6. [Everything your team needs to know about MCP in 2026](https://workos.com/blog/everything-your-team-needs-to-know-about-mcp-in-2026), WorkOS
7. [MCP Adoption Statistics 2025](https://mcpmanager.ai/blog/mcp-adoption-statistics/), MCP Manager
8. [MCP specification](https://modelcontextprotocol.io/specification/2025-11-25), Model Context Protocol
9. [MCP vs APIs: When to Use Which for AI Agent Development](https://www.tinybird.co/blog/mcp-vs-apis-when-to-use-which-for-ai-agent-development), Tinybird
10. [How MCP apps are turning SaaS into context engines](https://www.linkedin.com/pulse/how-mcp-apps-turning-saas-context-engines-ravi-madabhushi-7eh5c), Ravi Madabhushi
