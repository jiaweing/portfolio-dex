---
title: "MCP is the new API"
date: "2026-04-22"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["MCP","Agents","Security","Open Source","Anthropic","OpenAI","Google","Microsoft"]
---

APIs defined how software talked to software for over two decades. REST gave us a shared language: endpoints, verbs, JSON payloads, status codes. Every developer learned it. Every product shipped it. It was the connective tissue of the internet.
But REST was designed for human developers. Developers who read documentation, memorize URL structures, wire up authentication headers, and write error handling. The entire model assumes a person in the loop, translating intent into HTTP calls.
Now the client isn't a person. It's an AI agent. And the protocol it speaks isn't REST, it's MCP.
## What MCP actually is
The Model Context Protocol is an open standard created by Anthropic in November 2024 that defines how AI models connect to external tools and data sources. Think of it as a USB-C port for AI: a single, standardized interface that any agent can plug into to discover what a service offers and start using it immediately.
The architecture follows a client-server model. MCP servers expose tools, resources, and prompts. MCP clients (the AI agents or apps hosting them) connect to those servers, discover available capabilities at runtime, and invoke them as needed. The key difference from REST: no documentation required. An agent sends a `tools/list` request, gets back structured descriptions of every available function, and can start calling them autonomously.
This is not a small shift. REST requires the developer to understand the API before writing code. MCP lets the agent understand the API by asking.
## The abstraction layer moved up
Consider what happens when you integrate a new service with a REST API. You read the docs. You figure out auth. You map endpoints to your application logic. You handle pagination, rate limits, error codes. Every API is different, and every integration is bespoke.
With MCP, the integration work shifts from the developer to the protocol. The agent discovers tools dynamically, understands their input schemas, and executes them within a stateful session that preserves context across multiple calls. The developer's job is no longer writing glue code between services, it's standing up an MCP server that describes what the service can do.
This is the same pattern we've seen at every major abstraction shift. Assembly to C. C to Python. Raw HTTP to REST. Each time, the abstraction layer moves up, and the surface area a developer needs to worry about gets smaller. MCP is doing the same thing for AI-to-software communication.
## Protocol over company
The most remarkable thing about MCP's trajectory isn't the technology. It's the adoption curve.
Anthropic launched MCP in November 2024. Within four months, OpenAI adopted it across the Agents SDK, the Responses API, and the ChatGPT desktop app. Google DeepMind followed, shipping fully managed MCP servers for services like Maps, BigQuery, and Kubernetes Engine. Microsoft integrated MCP into Copilot Studio and VS Code. AWS Bedrock added support. By early 2026, every major AI provider was on board, and the protocol had crossed 97 million monthly downloads.
In December 2025, Anthropic donated MCP to the Agentic AI Foundation under the Linux Foundation, co-founded with Block and OpenAI. This cemented MCP as a vendor-neutral open standard rather than a single company's project.
This kind of cross-provider convergence is historically rare for infrastructure standards. It usually takes years of competing formats before the industry settles. MCP skipped that phase almost entirely. The network effects were too strong: each new MCP server added value to the entire ecosystem, and no provider wanted to be locked out.
## The parallel to early APIs
If you've been around long enough, the current MCP landscape feels familiar. The same debates that shaped early API ecosystems are playing out again.
Standardization versus flexibility. Should MCP be opinionated about auth flows, or should implementers choose their own? The spec went with OAuth 2.1 as the recommended framework while keeping authorization optional, a pragmatic middle ground that mirrors how early REST APIs handled authentication before OAuth became the norm.
Land-grab dynamics. With over 5,800 MCP servers in the ecosystem, the race is on to become the definitive integration layer for every major service. Whoever builds the most reliable, most widely adopted MCP servers for CRMs, databases, payment systems, and cloud platforms will own a critical piece of the AI infrastructure stack.
The "Stripe of MCP" question is real. Stripe won APIs by making payments integration absurdly simple. The equivalent play for MCP is making tool integration for agents absurdly simple, with managed hosting, built-in auth, and a registry that agents can browse.
## What works and what's still broken
MCP in production today is powerful but rough. The happy path, agent discovers tools, calls them, gets results, works remarkably well. The unhappy path reveals the protocol's youth.
Tool discovery scales poorly. When an agent connects to many MCP servers simultaneously, the combined tool list creates context overload. Unlike progressive disclosure in a UI, MCP tools load all at once. Agents burn reasoning tokens just figuring out which tool to use, and the wrong choice can cascade into wasted API calls.
Authentication remains incomplete. The spec defines OAuth 2.1 flows for remote servers, but many production implementations still rely on static tokens or environment variables. Enterprise requirements like fine-grained RBAC, token rotation, and audit trails are left as exercises for the implementer.
Rate limiting is an afterthought. A single agent stuck in a retry loop can generate over a thousand API calls per minute. The spec provides no built-in backpressure mechanism. Every server has to roll its own rate limiting, and most open-source servers simply don't.
Monitoring and observability are minimal. When an agent makes a chain of tool calls across multiple MCP servers, tracing what happened, what failed, and why is harder than it should be. The operational tooling that exists for REST APIs (API gateways, request tracing, anomaly detection) hasn't caught up yet.
## The new attack surface
MCP servers are the new attack surface, and the security story is still being written.
Researchers at OX Security uncovered a critical architectural flaw in MCP implementations that put as many as 200,000 servers at risk of remote command execution. The vulnerability allowed attackers to access sensitive data, API keys, and chat histories through vulnerable MCP implementations. Ten high- and critical-severity CVEs were issued for individual tools and agents using MCP.
The problem runs deeper than individual bugs. Most MCP servers ship with zero security: no authentication, no input validation, no rate limiting. They start as quick demos, get adopted by thousands of developers, and suddenly they're production infrastructure with the security posture of a hackathon project.
Four categories of attacks have been identified in the MCP ecosystem: tool poisoning (malicious tool descriptions that manipulate agent behavior), puppet attacks (hijacking agent actions through compromised servers), rug pull attacks (servers that change behavior after initial trust is established), and exploitation through malicious external resources.
The principle of least-privilege permissions matters more than ever. When a human developer uses an API, there's a cognitive bottleneck that limits damage. When an agent has unrestricted access to tools that can modify production infrastructure, the blast radius of a compromised server is enormous. Every MCP server should be treated like any other integration surface: supply-chain controls, dependency scanning, version pinning, and strong authentication are not optional.
## Invisible to agents is invisible to users
Here's the strategic implication that most people are underestimating: if your product doesn't have an MCP server, you're becoming invisible to the fastest-growing class of software consumers.
Agents don't browse websites. They don't read marketing pages. They discover capabilities through protocols. When a user asks an AI assistant to "find me a project management tool and set up a sprint," the assistant reaches for whatever tools are available through MCP. If your product isn't in that tool list, you don't exist in the agent's world.
This is the new SEO. In the same way that being unfindable on Google made you invisible to web users, being unreachable through MCP makes you invisible to AI agents. The difference is that this shift is happening faster. It took a decade for SEO to become existential for businesses. MCP adoption is moving on a timeline of months.
The implication for developers is straightforward: treat your MCP server as a first-class product surface, not an afterthought. The quality of your tool descriptions, the reliability of your server, and the granularity of your permissions model are now directly tied to how well AI agents can use your product.
## Small, composable, single-purpose
The architecture that's emerging around MCP naturally favors small, composable, single-purpose servers. One server for your CRM. One for your database. One for your email. Each server does one thing well and exposes a focused set of tools.
This maps perfectly to the "one agent, one job" philosophy that's proving most effective in production AI systems. A research agent connects to search and document servers. A coding agent connects to GitHub and CI/CD servers. A customer support agent connects to ticketing and knowledge base servers. The MCP server model makes this modular architecture the path of least resistance.
The composability is the real power. Because MCP is a standard protocol, you can mix and match servers from different providers, swap implementations without changing agent code, and scale horizontally by adding new servers to the ecosystem. This is the microservices pattern applied to AI tool integration, and it's working.
## What comes next
MCP is early and rough. The spec is still evolving. The security model needs hardening. The operational tooling needs to catch up. Enterprise adoption faces real hurdles around compliance, data sovereignty, and governance.
But the trajectory is clear. MCP is doing for AI-to-software communication what REST did for software-to-software communication. It's establishing the shared language, the common protocol, the universal interface that an entire ecosystem will build on.
REST APIs aren't going anywhere. Most MCP servers call REST APIs behind the scenes. The two aren't competing standards, they're complementary layers in the stack. REST handles the business logic. MCP makes that logic accessible to agents.
The developers and companies building for this future, treating MCP as infrastructure rather than experiment, are the ones who will be ready when agents become the default interface. And based on the adoption curve, that's not a distant hypothetical. It's already happening.
## References
1. [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol), Anthropic, November 2024
2. [One year of MCP: November 2025 spec release](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/), MCP Core Maintainers, November 2025
3. [Donating the Model Context Protocol and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation), Anthropic
4. [A year of MCP: from internal experiment to industry standard](https://www.pento.ai/blog/a-year-of-mcp-2025-review), Pento
5. [MCP hits 97M downloads: Model Context Protocol guide](https://www.digitalapplied.com/blog/mcp-97-million-downloads-model-context-protocol-mainstream), Digital Applied
6. [MCP vs. REST: what's the right way to connect AI agents to your API?](https://workos.com/blog/mcp-vs-rest), WorkOS
7. [The architectural flaw at the core of Anthropic's MCP](https://www.ox.security/blog/the-mother-of-all-ai-supply-chains-critical-systemic-vulnerability-at-the-core-of-the-mcp/), OX Security
8. [Beyond the protocol: unveiling attack vectors in the MCP ecosystem](https://arxiv.org/abs/2506.02040), arXiv
9. [Why MCP is not production ready yet](https://builder.aws.com/content/2zQBE367D31d5OxS7SdLUYgrVSh/why-mcp-is-not-production-ready-yet), AWS Builder Center
10. [Security best practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices), Model Context Protocol documentation
11. [The hidden challenge of MCP adoption in enterprises](https://portkey.ai/blog/the-hidden-challenge-of-mcp-adoption-in-enterprises), Portkey
12. [How to implement MCP server rate limiting](https://fast.io/resources/mcp-server-rate-limiting/), Fastio
