---
title: "MCP won before you noticed"
date: "2026-04-21"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["MCP","Agents","LLMs","Open Source","Safety","Security","OpenAI","Anthropic","Claude","ChatGPT","Google","Microsoft","Notion","IDE","DevTools","TypeScript","CLI","Coding"]
---

In November 2024, Anthropic quietly open-sourced something called the Model Context Protocol. It was a small announcement, easy to miss amid the constant churn of AI news. A new way for AI models to talk to external tools. Cool, whatever, next.
Eighteen months later, MCP has 97 million monthly SDK downloads. OpenAI, Google, Microsoft, and Salesforce all shipped support. It's embedded in Cursor, Windsurf, VS Code, Notion, Claude Desktop, ChatGPT, and Gemini CLI. The protocol now lives under the Linux Foundation with formal governance, working groups, and a 2026 roadmap focused on enterprise readiness.
MCP won. And most developers still haven't built their first server.
## The adoption curve nobody expected
The timeline is almost comically fast. Anthropic launched MCP in late 2024 with Claude Desktop support and a handful of reference servers. Within weeks, Cursor and Windsurf integrated it. By early 2025, the open-source repository had exploded with community-built servers for everything from databases to design tools.
Then the dominoes fell. OpenAI added MCP support to its API, letting developers point models at any remote MCP server. Google announced official MCP servers for Google Maps, Cloud databases, and other services, calling it a "critical standard that connects models to data and applications." Microsoft backed it. Salesforce shipped support.
By the protocol's first anniversary in November 2025, the spec had matured enough for a formal release. By March 2026, there were over 1,000 live connectors and 7,000 exposed servers in the wild.
This wasn't a slow enterprise adoption cycle. This was a land grab.
## Why MCP won on simplicity
The AI tooling space has no shortage of abstraction layers. LangChain offered tool abstractions. OpenAI built function calling into their API. Google proposed agent protocols. Each solved a piece of the puzzle, but each came with trade-offs that limited adoption.
OpenAI's function calling is tightly coupled to their API. You define tools in the request payload, the model decides when to call them, and your application executes them. It works well within the OpenAI ecosystem, but it's proprietary. Your tool definitions don't port to Claude or Gemini without rewriting them.
LangChain took a framework approach, wrapping tool definitions in Python abstractions with memory management, prompt chaining, and orchestration built in. Powerful, but heavy. You're buying into an entire framework to solve what is fundamentally a connection problem.
MCP operates at a different layer entirely. It's a protocol, not a framework and not an API feature. An MCP server exposes tools, resources, and prompts through a standardized interface. Any MCP client, whether it's Claude, ChatGPT, Cursor, or a custom agent, can discover and use those tools without knowing anything about the server's implementation.
The architecture is dead simple: hosts are applications like your IDE or chat interface, clients manage communication, and servers expose capabilities. Anthropic describes it as the USB-C of AI, and the analogy actually holds. One plug, any device, it just works.
The barrier to building an MCP server is shockingly low. If you can build an API endpoint, you can build an MCP server. The TypeScript and Python SDKs handle the protocol plumbing. You define your tools, describe their inputs, and implement the handlers. That's it.
## The USB-C moment
Before USB-C, every device had its own connector. Phones had Micro-USB or Lightning. Laptops had a mess of proprietary charging ports. Peripherals needed dongles. It wasn't that any single connector was bad, it's that the fragmentation created friction everywhere.
AI tooling was in the same place. Every model provider had its own way of calling external tools. Every framework had its own abstraction. If you wanted your tool to work with Claude and GPT and Gemini, you were maintaining three different integrations. If you wanted your agent to use Slack, GitHub, and a database, you were writing custom glue code for each.
MCP collapses all of that into one protocol. Build a server once, and every MCP-compatible client can use it. That's the real unlock, not any single feature of the protocol, but the fact that it eliminates the combinatorial explosion of integrations.
The network effects are already kicking in. More clients support MCP, so more developers build servers. More servers exist, so more clients add support. Google didn't adopt MCP because Anthropic asked nicely. They adopted it because their developers were already using it.
## What came before, and why it wasn't enough
It's worth understanding why previous attempts didn't achieve this kind of convergence.
OpenAI's function calling launched in mid-2023 and quickly became the default way to give GPT models tool access. But it was designed as an API feature, not a standard. The tool definitions live in your API request. The execution happens in your application code. There's no discovery mechanism, no server abstraction, no way for a tool to announce its capabilities to an unknown client.
LangChain's tool system offered more flexibility, with state management, memory, and streaming. But it was a Python framework first. Using LangChain tools meant adopting LangChain's opinions about how agents should work. For teams that just wanted to connect a tool to a model, it was like buying a car to cross the street.
Neither approach solved the fundamental problem: how does an AI application discover and use tools it has never seen before, built by developers it has never met, running on infrastructure it doesn't control?
That's what a protocol solves. And that's why MCP won.
## The monoculture question
There's a real risk here that deserves honest discussion. When one protocol controls how all AI accesses all tools, the failure modes become systemic.
Security researchers have already found significant vulnerabilities. OX Security documented an architectural flaw affecting 200,000+ servers, demonstrating command execution on six live production platforms. Prompt injection attacks through MCP servers have been demonstrated against Cursor, VS Code, Windsurf, Claude Code, and Gemini CLI. Anthropic's response to the architectural concerns was that the execution model is "by design" and that sanitization is the developer's responsibility.
That's a reasonable position for a protocol designer to take. It's also exactly the kind of answer that leads to widespread security incidents when adoption outpaces developer education.
Beyond security, there's the governance question. MCP now lives under the Linux Foundation with formal processes, but its DNA is Anthropic's. The spec, the reference implementations, the initial design decisions, all trace back to one company. Anthropic benefits enormously from being the protocol's origin. When MCP becomes the standard way to connect AI to tools, the company that designed and best understands the protocol has a structural advantage.
This isn't to suggest Anthropic acted in bad faith. Open-sourcing the protocol and moving it to a foundation were the right moves. But "open standard controlled by one company" is a well-documented pattern in tech, and it doesn't always end well for the ecosystem.
## One agent, one job
The deeper significance of MCP isn't just about connecting tools. It's about making a particular philosophy of AI practical.
The idea that each agent should do one thing well, with clear boundaries and composable capabilities, only works if there's a standard way for agents to access the tools they need. Without MCP, building a focused agent meant writing custom integrations for every external service. The cost of specialization was too high, so people built monolithic agents that tried to do everything.
MCP changes the economics. A code review agent can connect to GitHub, a scheduling agent can connect to Calendar, and a research agent can connect to web search, all through the same protocol. The agent stays focused. The protocol handles the plumbing.
This is why MCP adoption matters beyond the technical details. It's enabling an architectural shift from "one agent that does everything poorly" to "many agents that each do one thing well." That shift has been theoretically appealing for years. MCP makes it practical.
## What happens next
The 2026 roadmap focuses on the hard problems: transport scalability for enterprise deployments, standardized agent-to-agent communication, and governance maturation so the protocol's future doesn't depend on a handful of maintainers.
These are growing pains, not existential threats. The protocol has already passed the point where a competitor could realistically displace it. The ecosystem is too large, the network effects too strong, the switching costs too high.
For developers who haven't engaged with MCP yet, the window for early-mover advantage is closing. The protocol is stable, the tooling is mature, and the major platforms have committed. Building an MCP server today is like building a REST API in 2010, not bleeding edge, just smart.
MCP won before most people noticed it was competing. The interesting question now isn't whether it will be the standard. It's what we'll build on top of it.
## References
1. [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol), Anthropic
2. [One Year of MCP: November 2025 Spec Release](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/), Model Context Protocol Blog
3. [The 2026 MCP Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/), Model Context Protocol Blog
4. [MCP Adoption in 2026: What Marketers Need to Know](https://knak.com/blog/mcp-adoption-in-2026-what-marketers-need-to-know/), Knak
5. [A Deep Dive Into MCP and the Future of AI Tooling](https://a16z.com/a-deep-dive-into-mcp-and-the-future-of-ai-tooling/), Andreessen Horowitz
6. [MCP and Connectors](https://developers.openai.com/api/docs/guides/tools-connectors-mcp), OpenAI
7. [Announcing Official MCP Support for Google Services](https://cloud.google.com/blog/products/ai-machine-learning/announcing-official-mcp-support-for-google-services), Google Cloud Blog
8. [The Architectural Flaw at the Core of Anthropic's MCP](https://www.ox.security/blog/the-mother-of-all-ai-supply-chains-critical-systemic-vulnerability-at-the-core-of-the-mcp/), OX Security
9. [MCP vs OpenAI Function Calling vs LangChain: Which One Wins in 2026?](https://docs.gostoa.dev/blog/mcp-vs-openai-function-calling-vs-langchain), STOA
10. [The Model Context Protocol's Impact on 2025](https://www.thoughtworks.com/en-us/insights/blog/generative-ai/model-context-protocol-mcp-impact-2025), Thoughtworks
11. [Everything Your Team Needs to Know About MCP in 2026](https://workos.com/blog/everything-your-team-needs-to-know-about-mcp-in-2026), WorkOS
12. [MCP 'Design Flaw' Puts 200k Servers at Risk](https://www.theregister.com/2026/04/16/anthropic_mcp_design_flaw/), The Register
