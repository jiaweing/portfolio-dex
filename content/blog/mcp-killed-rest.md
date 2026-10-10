---
title: "MCP killed REST"
date: "2026-04-14"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Agents","LLMs","Anthropic","Claude","OpenAI","Google","Microsoft","Models"]
---

REST APIs have been the backbone of the web for over two decades. They made sense when the primary consumer was a human clicking a button, waiting for a response, and reading a page. But AI agents don't work that way. They don't read documentation. They don't browse endpoints. They negotiate capabilities, pass context, and chain tools together on the fly.
The Model Context Protocol, or MCP, was built for this world. And the shift from REST to MCP isn't a theoretical exercise. It's already happening.
## REST was built for a different era
REST emerged in the early 2000s as an antidote to SOAP's complexity. Where SOAP required rigid XML contracts, formal WSDL definitions, and heavy tooling, REST said: just use HTTP verbs and URLs. It matched how the web actually worked, and developers loved it for that simplicity.
That simplicity carried REST for twenty years. It powers most of the APIs we use today. But REST was designed around a core assumption: that a *human developer* would read the docs, understand the schema, write integration code, and handle errors manually. Every new API means a new integration. Every new model or agent that wants to use that API needs custom glue code to bridge the gap.
When your consumer is an AI agent, this model breaks down. Agents don't want to parse OpenAPI specs. They want to discover what tools are available, understand what those tools do, and call them with structured inputs and outputs. REST was never designed to support that kind of interaction.
## What MCP gets right
MCP, introduced by Anthropic in November 2024 as an open standard, takes a fundamentally different approach. Instead of exposing resources through URL-based endpoints, MCP exposes *capabilities* through a standardized protocol that agents can discover and use at runtime.
The architecture follows a client-server model. The AI application (the client) connects to one or more MCP servers, each of which exposes a set of tools, resources, and prompts. The key differences from REST are significant:
- **Semantic tool discovery.** MCP servers are self-describing. An agent doesn't need external documentation to figure out what a server can do. It asks, and the server tells it, including what inputs are expected and what outputs to expect back.
- **Structured input and output.** Every tool call follows a consistent schema. There's no guessing about whether you need a query parameter, a path parameter, or a JSON body. The protocol handles it.
- **Context passing.** MCP supports stateful sessions where context flows between the agent and the server. This matters because agents often need to chain multiple operations together, and losing context between calls makes that painful.
- **Composability.** Because every MCP server exposes capabilities in the same way, agents can dynamically combine tools from multiple servers without anyone writing integration code ahead of time.
The analogy that keeps coming up is USB-C. Before USB-C, every device had its own connector. MCP is doing the same thing for AI integrations: one protocol, many tools.
## The adoption curve is past the tinkerer phase
MCP isn't a whitepaper collecting dust. Within months of its release, it was adopted by major players across the AI ecosystem. Claude natively supports MCP. So does Cursor and a growing list of agent frameworks and developer tools. OpenAI and Google DeepMind adopted it in early 2025, and by late 2025, MCP was donated to the Linux Foundation's Agentic AI Foundation, cementing its status as a true open standard rather than a single company's project.
Gartner projects that 40% of enterprise applications will embed task-specific AI agents by the end of 2026, up from less than 5% in 2025. That's one of the steepest adoption curves in enterprise history. Every one of those agents needs to connect to external tools and data sources, and MCP is quickly becoming the default way to do it.
The ecosystem of MCP servers is growing fast. File systems, databases, GitHub, Slack, calendar services, search engines: the list keeps expanding. Developers aren't waiting for permission. They're building MCP servers because it's the path of least resistance for making their services agent-accessible.
## A pattern we've seen before
This isn't the first time a simpler protocol displaced an entrenched one. In the early 2000s, SOAP was the enterprise standard for web services. It had XML schemas, formal contracts, WS-Security, WS-ReliableMessaging, and a stack of specifications that grew heavier every year. It worked. But it was complex, rigid, and overkill for most use cases.
REST didn't win because it was more powerful than SOAP. It won because it was simpler and matched how the web actually worked. Developers could test an API with a browser. They could read a URL and understand what it did. The barrier to entry collapsed, and adoption followed.
MCP is following the same playbook, but for a different consumer. REST matched how *human developers* interact with the web. MCP matches how *agents* interact with tools. The protocol that fits the actual workflow wins. It always does.
## Your API is no longer your interface
Here's the shift that matters most for developers: if you're building a service that agents will use, your REST API is no longer your primary interface. Your MCP server is.
This changes what "good API design" means. A well-designed REST API optimizes for composability and developer ergonomics: small endpoints, clear documentation, consistent conventions. But as Philipp Schmid has pointed out, a good REST API is not automatically a good MCP server. REST design principles work for human developers. They don't necessarily work for AI agents.
The skill that matters now is: *how do I expose my service so that agents can use it well?*
That means thinking about tool granularity (not too fine-grained, not too coarse), clear descriptions that an LLM can reason about, structured error messages that help agents recover gracefully, and security boundaries that make sense when the caller isn't a human.
## What good MCP integration looks like
A well-designed MCP server has a few key characteristics:
- **Task-oriented tools.** Instead of exposing low-level CRUD operations (create record, update field, delete row), good MCP servers expose higher-level actions that map to what an agent is actually trying to accomplish. "Summarize recent sales data" is more useful to an agent than "GET /sales?limit=100&sort=date".
- **Rich descriptions.** Every tool should have a clear, natural-language description of what it does, when to use it, and what its parameters mean. This is the documentation that agents actually read.
- **Minimal permissions.** MCP servers should run with the fewest permissions possible. A compromised server with broad access is a serious security risk. Containerize, sandbox, and restrict.
- **Graceful error handling.** When something goes wrong, the server should return structured errors that help the agent understand what happened and what to try next, not stack traces or generic 500 codes.
The common anti-patterns are the inverse: wrapping every REST endpoint as a separate tool (too granular), providing vague descriptions ("does stuff with data"), requesting excessive permissions, and returning unstructured error messages.
## One agent, one job
MCP enables something that was awkward with REST-based integrations: clean composition of narrow, focused agents. Instead of building one monolithic agent that knows how to call dozens of different APIs, you can build small agents that each do one thing well, each connected to the specific MCP servers they need.
This "one agent, one job" pattern works because MCP's standardized interface makes it trivial for agents to discover and use tools without custom integration work. An agent that handles calendar scheduling doesn't need to know anything about the database agent or the email agent. They each connect to their own MCP servers and do their own thing. An orchestration layer can compose them as needed.
This is a much cleaner architecture than having every agent carry the weight of every possible API integration.
## REST isn't dead, but the growth is elsewhere
To be clear, REST isn't going anywhere for traditional web applications. If you're building a mobile app that talks to a backend, REST (or GraphQL, or gRPC) is still the right choice. These protocols are mature, well-tooled, and perfectly suited for human-driven software.
But the growth, the exciting new surface area, is in agent-native protocols. Every new AI product, every agent framework, every tool-using LLM needs a way to connect to external services. MCP is becoming the standard way to do that. If you're only thinking about your REST API, you're optimizing for yesterday's consumer.
The developers who thrive in this shift will be the ones who learn to think about their services from the agent's perspective. Not "what endpoints do I expose?" but "what capabilities do I offer, and how do I make them easy for an agent to discover and use?"
The protocol that matches how the consumer actually works always wins. REST matched the web. MCP matches agents. The transition is already underway.
## References
1. Anthropic, "Introducing the Model Context Protocol," November 2024. [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
2. Model Context Protocol, "What is the Model Context Protocol (MCP)?" [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
3. Wikipedia, "Model Context Protocol." [https://en.wikipedia.org/wiki/Model_Context_Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol)
4. Google Cloud, "What is Model Context Protocol (MCP)?" [https://cloud.google.com/discover/what-is-model-context-protocol](https://cloud.google.com/discover/what-is-model-context-protocol)
5. Philipp Schmid, "MCP is Not the Problem, It's your Server: Best Practices for Building MCP Servers." [https://www.philschmid.de/mcp-best-practices](https://www.philschmid.de/mcp-best-practices)
6. Firecrawl, "10 Best MCP Servers for Developers in 2026." [https://www.firecrawl.dev/blog/best-mcp-servers-for-developers](https://www.firecrawl.dev/blog/best-mcp-servers-for-developers)
7. Gartner, "Gartner Predicts 40 Percent of Enterprise Apps Will Feature Task-Specific AI Agents by 2026." [https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026)
8. Jay Greenwald, "SOAP And REST At Odds," The History of the Web. [https://thehistoryoftheweb.com/soap-rest-odds/](https://thehistoryoftheweb.com/soap-rest-odds/)
9. Roo Code Documentation, "MCP vs REST APIs: A Fundamental Distinction." [https://docs.roocode.com/features/mcp/mcp-vs-api](https://docs.roocode.com/features/mcp/mcp-vs-api)
10. Replay, "MCP vs REST: Choosing the Best Protocol for AI Developer Agents in 2026." [https://www.replay.build/blog/mcp-vs-rest-choosing-the-best-protocol-for-ai-developer-agents-in-2026](https://www.replay.build/blog/mcp-vs-rest-choosing-the-best-protocol-for-ai-developer-agents-in-2026)
