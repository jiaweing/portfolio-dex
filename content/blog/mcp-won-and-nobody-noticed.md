---
title: "MCP won and nobody noticed"
date: "2026-03-17"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Somewhere in 2025, without a grand announcement or a decisive "winner takes all" moment, the Model Context Protocol became the default way AI agents talk to tools. There was no dramatic launch event. No industry consortium press release. MCP just quietly showed up, worked well enough, and kept spreading until one day the ecosystem looked up and realized: this is the standard now.
If you build software that touches AI in any way, this matters more than you think.
## The REST parallel
To understand why MCP is a big deal, think back to the early 2000s. Before REST became the dominant pattern for web APIs, every service had its own bespoke interface. SOAP, XML-RPC, custom protocols, you name it. Integrating two systems meant learning a new set of conventions every time.
REST didn't win because it was the most technically sophisticated option. It won because it was simple, it mapped cleanly onto HTTP, and developers could start using it without reading a 200-page spec. It became the lingua franca of web services precisely because it prioritized being useful over being complete.
MCP is following the same playbook, but for a different era. Instead of connecting web services to each other, it connects AI agents to tools, data sources, and external systems. One protocol, one interface, and any agent can talk to any tool that speaks MCP.
## From bespoke integrations to composable tools
Before MCP, connecting an AI agent to an external tool meant writing custom integration code. Want your agent to query a database? Custom code. Pull a file from cloud storage? Custom code. Trigger an action in your internal app? More custom code.
Every new tool required its own glue layer, and every agent framework had a different way of handling it. The result was an explosion of one-off integrations that were expensive to build, painful to maintain, and impossible to reuse across different agent platforms.
MCP flips this model. Instead of building integrations per agent, you publish an MCP server that any agent can consume. Your tool becomes a first-class citizen in the agent ecosystem, discoverable and usable by Claude, GPT-based agents, open-source frameworks, and anything else that speaks the protocol.
This is composability in the truest sense. Build once, connect everywhere. By early 2025, the MCP ecosystem had grown to over 1,000 publicly available servers. By 2026, that number has surpassed 17,000. The network effects are compounding fast.
## Why MCP won
MCP's victory wasn't inevitable. There were other attempts to solve the agent-tool communication problem, some of them more technically ambitious. So why did this one stick?
**It's simple.** MCP uses JSON-RPC 2.0 and provides a clean abstraction: servers expose resources (things to read) and tools (things to do). Agents discover what's available through standardized calls like `tools/list` and invoke them through `tools/call`. You don't need to read a dissertation to get started.
**It's open.** Anthropic open-sourced MCP in November 2024 and donated it to the Linux Foundation by the end of 2025. This wasn't a proprietary play dressed up as a standard. The governance is transparent, the spec is public, and contributions come from across the industry.
**Anthropic didn't try to own it.** This is perhaps the most underrated factor. Previous attempts at standardization often failed because the sponsoring company wanted too much control. Anthropic took the opposite approach, building something useful and then letting the community run with it. OpenAI, Microsoft, Google, and Amazon have all added MCP support. That kind of cross-industry adoption doesn't happen when one company is trying to lock everyone in.
**Timing.** MCP arrived at exactly the moment when the industry was shifting from "chatbot" use cases to genuine agentic workflows. As agents started needing to actually *do* things in the real world, the need for a standard communication protocol became urgent. MCP was there, it worked, and it was free.
## MCP servers are the new microservices
Here's the developer tooling angle that I think is most interesting: MCP servers are starting to look a lot like the microservices of the agent era.
Think about how microservices reshaped backend architecture. Instead of monolithic applications, teams shipped small, focused services that could be composed into larger systems. MCP servers follow the same pattern, but for AI capabilities. Each server wraps a specific tool or data source and exposes it through a standard interface.
The ecosystem is moving fast. According to a 2025 survey by Zuplo, 70% of MCP adopters already have between two and seven MCP servers configured in their environments. 58% are building MCP servers by wrapping existing APIs, which means the barrier to entry is low if you already have a REST API. The most common use cases are data source access (documentation, knowledge bases), API integrations, and developer tools like Git.
Frameworks like FastMCP and Anthropic's official SDK have made it straightforward to spin up a server in an afternoon. The developer experience is good enough that 30% of teams report the primary value they get from MCP is better context for AI responses, which is essentially what "context engineering" is all about: giving the model the right information at the right time.
## The honest take on limitations
MCP isn't perfect, and pretending otherwise would be dishonest. The protocol has real limitations that the community is actively working through.
**Security is the biggest gap.** In the Zuplo survey, 50% of MCP server builders cited security and access control as their top challenge. 24% of MCP servers have no authentication at all. Security researchers have demonstrated prompt injection vulnerabilities where malicious inputs can trick agents into exfiltrating data through MCP tool calls. The auth model is still maturing, and best practices for securing agent-tool communication are evolving in real time.
**Statefulness creates scaling headaches.** MCP currently relies on long-lived, stateful sessions, which makes it harder to deploy servers behind load balancers or across distributed infrastructure. The 2026 roadmap has flagged this as a top priority, with plans to evolve the transport model so servers can scale horizontally without maintaining state on a single machine.
**Governance is a bottleneck.** Every protocol change currently requires review by the full group of core maintainers, regardless of the area it affects. As MCP lead maintainer David Soria Parra has acknowledged, "That's a bottleneck. It slows down Working Groups that already have the expertise to evaluate proposals in their own area."
**Enterprise readiness is still early.** Organizations integrating MCP into internal systems need audit trails, corporate identity integration, gateway controls, and environment-portable configuration. This area is intentionally underdefined in the roadmap because the maintainers want input from teams encountering these issues firsthand.
None of these limitations are fatal. They're the growing pains of a protocol that got adopted faster than its infrastructure could mature. The important thing is that the community is addressing them openly rather than pretending they don't exist.
## Good enough and widely adopted beats perfect and theoretical
This is the lesson MCP keeps teaching: in protocol adoption, "good enough and widely adopted" beats "perfect and theoretical" every single time.
Competing protocols exist. Google's Agent-to-Agent (A2A) protocol, IBM's Agent Communication Protocol (ACP), and others are carving out adjacent spaces. But MCP has the network effects, the ecosystem momentum, and the cross-vendor buy-in that makes it extraordinarily hard to displace.
In the Zuplo survey, 72% of adopters expect their MCP usage to increase over the next 12 months. 54% are confident in its long-term viability as a standard. Even among skeptics, the criticism tends to be about specific implementation details rather than the fundamental approach.
The pattern here is familiar. HTTP wasn't the best transport protocol. JSON wasn't the best data format. REST wasn't the best architectural style. But they were all good enough, easy to adopt, and open. MCP is following the exact same trajectory.
## What this means if you're building software
If you're a developer or a product team, the strategic implication is clear: shipping an MCP server for your product is the highest-leverage integration play available right now.
Here's why. Every AI agent platform is adding MCP support. Every developer building agents is looking for MCP-compatible tools. By publishing an MCP server, you make your product accessible to an entire ecosystem of AI agents without having to negotiate individual integrations with each platform.
The practical steps are straightforward. If you already have a REST API, you can wrap it in an MCP server using FastMCP or Anthropic's SDK. Focus on the tools and resources that are most useful for AI workflows. Start with a narrow, well-defined surface area and expand from there.
The teams that move early on this will have the same advantage that companies had when they were the first to ship a clean REST API in the 2000s: they became the default integration target, and that compounding advantage is hard to undo.
## The bigger picture
MCP is winning because it prioritized being useful over being complete. It shipped with known limitations, gathered real-world feedback, and iterated in the open. That's not just a protocol design philosophy, it's a shipping philosophy.
The agent era is just getting started. The tools, patterns, and infrastructure we build now will shape how AI systems interact with the world for years to come. MCP has positioned itself as the foundational layer for that interaction, not because it's perfect, but because it showed up, worked, and kept getting better.
That's usually how standards win. Not with a bang, but with quiet, relentless adoption.
## References
1. Anthropic, "Introducing the Model Context Protocol," November 2024, [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
2. Model Context Protocol official documentation, [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
3. Model Context Protocol specification, [https://spec.modelcontextprotocol.io](https://spec.modelcontextprotocol.io)
4. CData, "2026: The Year for Enterprise-Ready MCP Adoption," [https://www.cdata.com/blog/2026-year-enterprise-ready-mcp-adoption](https://www.cdata.com/blog/2026-year-enterprise-ready-mcp-adoption)
5. Zuplo, "The State of MCP: Adoption, Security & Production Readiness," [https://zuplo.com/mcp-report](https://zuplo.com/mcp-report)
6. Paul Sawers, "MCP's biggest growing pains for production use will soon be solved," The New Stack, March 2026, [https://thenewstack.io/model-context-protocol-roadmap-2026/](https://thenewstack.io/model-context-protocol-roadmap-2026/)
7. Thoughtworks, "The Model Context Protocol's impact on 2025," [https://www.thoughtworks.com/en-us/insights/blog/generative-ai/model-context-protocol-mcp-impact-2025](https://www.thoughtworks.com/en-us/insights/blog/generative-ai/model-context-protocol-mcp-impact-2025)
8. Simon Willison, "Model Context Protocol has prompt injection security problems," [https://simonw.substack.com/p/model-context-protocol-has-prompt](https://simonw.substack.com/p/model-context-protocol-has-prompt)
9. CIO, "Why Model Context Protocol is suddenly on every executive agenda," [https://www.cio.com/article/4136548/why-model-context-protocol-is-suddenly-on-every-executive-agenda.html](https://www.cio.com/article/4136548/why-model-context-protocol-is-suddenly-on-every-executive-agenda.html)
