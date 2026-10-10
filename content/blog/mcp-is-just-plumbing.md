---
title: "MCP is just plumbing"
date: "2026-03-21"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Model Context Protocol is having its moment. Conference talks, Twitter threads, startups pivoting to "MCP-native," venture capital firms publishing deep dives. If you've been anywhere near the AI ecosystem in the past year, you've heard the pitch: MCP is the USB-C for AI, the universal standard that will connect every model to every tool.
But here's the thing. MCP is a protocol, not a product. It's plumbing. And the companies that win won't be the ones who adopt MCP first. They'll be the ones who build useful things on top of it.
## What MCP actually is
Strip away the marketing and MCP is surprisingly straightforward. Released by Anthropic in November 2024, the Model Context Protocol is an open standard that defines how AI models connect to external tools, data sources, and APIs. It uses a client-server architecture with JSON-RPC 2.0 messages, inspired heavily by the Language Server Protocol (LSP) that powers autocomplete in code editors.
Before MCP, every integration between an AI model and an external system required a custom connector. If you wanted Claude to talk to your database, you wrote one integration. If you wanted it to also read your CRM, that was another. Each new tool meant new glue code, new auth handling, new failure modes. MCP replaces that fragmentation with a single protocol. Build one MCP server for your tool, and any MCP client can use it.
That's genuinely useful. But "genuinely useful plumbing" and "competitive advantage" are very different things.
## The REST analogy
We've seen this movie before. In the mid-2000s, REST emerged as the dominant pattern for web APIs. It replaced a patchwork of SOAP, XML-RPC, and proprietary protocols with a clean, standardized approach. REST won decisively, and for good reason.
But nobody ever won a customer by saying "we use REST." REST was table stakes. The value was in what you built on top of it, the products, the experiences, the data. The protocol layer became invisible, exactly as it should.
MCP is on the same trajectory. Right now it feels novel and differentiating because we're in the adoption phase. OpenAI integrated it across their products in March 2025. Google DeepMind followed. Major tool providers like Notion, Slack, and GitHub are building MCP servers. The ecosystem is coalescing around a standard, which is exactly what needs to happen.
But once everyone has MCP support, having MCP support means nothing. It becomes the baseline, not the moat.
## Why protocol hype cycles happen
Developers love standardization narratives. There's something deeply satisfying about the idea that one protocol will clean up a messy landscape and make everything work together. And the AI tooling landscape in 2024 was genuinely messy, full of fragmented integrations, vendor-specific APIs, and duplicated effort.
MCP arrived at the perfect moment with the perfect pitch. Anthropic framed it as "USB-C for AI," a metaphor that's catchy even if it's a bit misleading. USB-C is a physical connector. MCP is closer to HTTP, a set of rules for how software talks to other software.
The hype cycle followed a familiar pattern. First came breathless adoption. Then came the backlash. By early 2026, the discourse had already shifted. Developer Charles Chen, an engineering lead at Motion, described how his team "entirely skipped the MCP hype cycle" because most of their use cases were better served by simple API wrappers. The industry influencers who'd been championing MCP pivoted to championing CLIs as the new hotness.
Neither extreme is right. MCP isn't revolutionary, and it isn't useless. It's infrastructure.
## The real value: interoperability and reduced lock-in
Where MCP genuinely shines is in reducing the integration tax. Before MCP, if you built an AI agent that needed to interact with ten different tools, you wrote ten different integrations. If you switched from one AI provider to another, you might have to rewrite them all.
MCP changes that equation. A well-built MCP server for, say, a project management tool works with Claude, ChatGPT, Cursor, or any other MCP client. Tool makers build one server, agent builders connect to many. That's real value, not because it's flashy, but because it eliminates tedious, repetitive work.
For enterprises, the benefits go further. Centralized MCP servers over HTTP (as opposed to local servers over stdio) unlock telemetry, observability, and security controls that are hard to achieve with distributed CLI tools. You get standardized auth via OAuth, centralized secret management, and the ability to track which tools are actually being used across an organization. As teams move from experimental "vibe coding" with AI to production-grade agentic engineering, that kind of infrastructure becomes essential.
## Who actually benefits?
The MCP ecosystem creates value asymmetrically. Tool makers, companies like Notion, Slack, GitHub, Salesforce, benefit enormously. By publishing an MCP server, they make their product accessible to every AI agent in the ecosystem without negotiating individual integrations. It's the same logic that drove companies to build REST APIs a decade ago: reduce friction, increase surface area, let others build on your platform.
Agent builders benefit too, but differently. MCP gives them a growing catalog of tools they can plug into without writing custom code. But the hard problems in building useful agents, planning, reasoning, error recovery, knowing when to ask for help, have nothing to do with the protocol layer. MCP makes it easier to connect, but connecting is the easy part.
The most interesting question is whether a new layer of "MCP middleware" companies will emerge, gateway services, server hosting platforms, tool registries. Andreessen Horowitz published a detailed market map showing early movement in this direction, with companies building MCP marketplaces, server generation tools, and hosting solutions. Some of these will become real businesses. But they'll succeed because of what they build on top of the protocol, not because of the protocol itself.
## The "MCP-native" startup trap
Here's where I get worried. I've seen startups pitch themselves as "MCP-native" as if the protocol itself is a product differentiator. This is like pitching a company as "REST-native" in 2010. It's a technical implementation detail, not a value proposition.
Building a company on a protocol layer is building on someone else's foundation. Protocols change. Anthropic controls MCP's direction, and while it's open source, the governance model is still evolving. More importantly, protocols commoditize by design. That's the whole point. If MCP succeeds, it will make integrations cheap and easy for everyone, which means integration quality alone won't differentiate anyone.
The startups that will win are the ones solving hard problems that happen to use MCP as plumbing. The ones building better agent reasoning, better domain-specific tools, better user experiences. Not the ones whose main selling point is that they speak the protocol.
## How MCP fits into actual agent architecture
In my own work building agent pipelines, MCP occupies a specific, useful, and decidedly unsexy layer. It's the connection fabric between an agent and its tools. It handles the "how do I call this thing" question so I can focus on the "what should I call and why" question.
The interesting architectural decisions are all above the protocol layer. How does the agent decide which tools to use? How does it recover when a tool call fails? How does it manage context across a multi-step workflow? How does it know when it's done? These are the problems that determine whether an agent is useful or just impressive in a demo.
MCP makes the plumbing reliable and consistent. That matters. But it's still plumbing.
## The 18-month prediction
Here's my bet: within 18 months, nobody will talk about MCP anymore. Not because it failed, but because it succeeded. It will become invisible infrastructure, like HTTPS. You don't think about HTTPS when you browse the web. You don't think about TCP/IP when you stream a video. You definitely don't think about REST when you use an app that calls an API.
MCP will follow the same path. Every major AI tool will support it. Every major SaaS product will publish an MCP server. The protocol will fade into the background, doing its job quietly while the real innovation happens in the layers above.
That's not a criticism. That's the highest compliment you can pay a piece of infrastructure. The best plumbing is the kind you never think about.
## References
1. Anthropic, "Introducing the Model Context Protocol," November 2024, [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
2. Model Context Protocol, "What is the Model Context Protocol (MCP)?," [https://modelcontextprotocol.io/docs/getting-started/intro](https://modelcontextprotocol.io/docs/getting-started/intro)
3. Wikipedia, "Model Context Protocol," [https://en.wikipedia.org/wiki/Model_Context_Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol)
4. Yoko Li, "A Deep Dive Into MCP and the Future of AI Tooling," Andreessen Horowitz, March 2025, [https://a16z.com/a-deep-dive-into-mcp-and-the-future-of-ai-tooling/](https://a16z.com/a-deep-dive-into-mcp-and-the-future-of-ai-tooling/)
5. Charles Chen, "MCP is Dead; Long Live MCP!," March 2026, [https://chrlschn.dev/blog/2026/03/mcp-is-dead-long-live-mcp/](https://chrlschn.dev/blog/2026/03/mcp-is-dead-long-live-mcp/)
6. Karrtik Iyer, "The Model Context Protocol: Getting beneath the hype," Thoughtworks, May 2025, [https://www.thoughtworks.com/en-us/insights/blog/generative-ai/model-context-protocol-beneath-hype](https://www.thoughtworks.com/en-us/insights/blog/generative-ai/model-context-protocol-beneath-hype)
7. Speakeasy, "Common Criticisms of MCP (And Why They Miss the Point)," [https://www.speakeasy.com/mcp/mcp-for-skeptics/common-criticisms](https://www.speakeasy.com/mcp/mcp-for-skeptics/common-criticisms)
