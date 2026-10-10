---
title: "Nobody reads your docs"
date: "2026-03-24"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Documentation is the most important thing nobody reads. Every engineering team agrees it matters, and almost every engineering team under-invests in it. But something interesting is happening: AI agents are about to make documentation more important than it has ever been, not because humans suddenly learned to read, but because machines need to.
## The dirty secret about developer docs
Developers don't read documentation. Not really. They skim headings, search for code snippets, copy-paste an example, and move on. Studies suggest engineers spend 3 to 10 hours per week just *searching* for information that should be documented. For a 100-person team, that's the equivalent of up to 25 full-time engineers doing nothing but hunting for answers.
The reasons are well understood. Writing docs feels like overhead. Maintaining them feels like a chore. And the payoff is invisible, because nobody tells you when your docs saved them time. They only tell you when docs are wrong.
So most documentation slowly rots. It falls behind the code. Developers learn to distrust it, which makes them read it even less, which makes teams invest in it even less. It's a vicious cycle that almost every software organization has lived through.
## AI coding assistants made it worse
Then came GitHub Copilot, ChatGPT, and the wave of AI coding tools. According to recent surveys, 84% of developers now use or plan to use AI tools, and around 41% of all code is AI-generated. When you can ask an AI assistant to generate the boilerplate, write the integration, or explain the API, the motivation to read docs drops even further.
Why carefully read through a quickstart guide when you can type "help me set up authentication with this SDK" and get a working snippet in seconds? AI assistants have become the ultimate shortcut around documentation, and developers have happily taken it.
But here's the thing: those AI assistants are only as good as the docs they were trained on. When the documentation is wrong or missing, the AI confidently generates plausible-looking code that doesn't work. The developer, who skipped the docs, now has a harder debugging problem than before.
## AI agents actually need to read your docs
This is where the story takes a turn. While AI coding assistants reduced the incentive for *humans* to read docs, a new category of AI, autonomous agents, has created an entirely new kind of reader that is completely dependent on them.
AI agents don't skim. They don't guess from context clues. They don't ask a colleague. When an agent needs to call a tool, query an API, or interact with a service, it reads the documentation, whether that's an OpenAPI spec, an MCP tool description, or a structured schema. If the documentation is ambiguous, incomplete, or wrong, the agent fails.
The Model Context Protocol (MCP), an open standard for connecting AI agents to external tools and data, makes this relationship explicit. An MCP server exposes tools to agents through structured descriptions: what the tool does, what parameters it accepts, what it returns. These descriptions *are* the documentation. There's no separate human-readable page to fall back on. The spec is the interface.
OpenAPI specifications play a similar role. When an agent needs to interact with a REST API, it reads the OpenAPI document to understand available endpoints, required authentication, expected request bodies, and response formats. Microsoft, OpenAI, and others have built agent frameworks that consume OpenAPI specs directly, turning API documentation into executable knowledge.
## The shift: writing for machines, not just humans
This changes what "good documentation" means. For decades, the gold standard was a well-written tutorial with clear explanations, helpful diagrams, and progressive disclosure. That kind of documentation is still valuable, but it's no longer sufficient.
Docs now need to serve two audiences simultaneously:
**Humans** still need tutorials, conceptual guides, and examples. These remain important for onboarding, understanding architecture, and debugging edge cases.
**Machines** need structured, schema-rich, unambiguous specifications. They need precise parameter types, explicit error codes, complete enum values, and descriptions that leave no room for interpretation.
The practical implications are significant:
- **OpenAPI specs need to be thorough.** Every endpoint, every parameter, every response code. Descriptions should explain not just what a field is, but when and why you'd use it.
- **MCP tool descriptions need to be precise.** An agent deciding whether to call your tool has only the description to go on. Vague descriptions like "manages data" are useless. "Creates a new user account with the specified email and role, returning the user ID" gives the agent what it needs.
- **READMEs need structure.** A wall of prose that a human can parse is opaque to an agent. Structured sections, consistent formatting, and explicit capability declarations make a README machine-navigable.
- **Error messages need to be actionable.** An agent that receives "Bad Request" can't recover. An agent that receives "Parameter 'email' must be a valid email address" can fix the problem and retry.
## The irony: machines might make us write better docs
Here's what's unexpected. For years, developer advocacy teams have begged engineers to write better documentation. The arguments were always the same: it helps new hires, it reduces support tickets, it improves adoption. Mostly, those arguments lost to shipping deadlines.
But AI agents have created an economic forcing function that tutorials never could. If your tool has poor documentation, agents can't use it. If agents can't use it, your tool gets skipped in favor of one they can use. In the agent era, documentation quality directly determines whether your software gets adopted.
This is already playing out with MCP servers. The MCP ecosystem is growing rapidly, and developers building MCP-compatible tools are discovering that the quality of their tool descriptions directly correlates with how reliably agents can use them. A well-described tool gets called correctly. A poorly described one gets hallucinated parameters and failed calls.
The same dynamic applies to API providers. Platforms that generate comprehensive OpenAPI specs automatically, with AI-optimized descriptions and structured metadata, are finding that their APIs are more accessible to both traditional developers and AI agents. Documentation is converging with the interface itself.
## Your docs are your API now
If you're building tools, libraries, or services that you want to work in an agentic world, here's what this means in practice:
**Treat documentation as a first-class product.** Not an afterthought, not a nice-to-have. Your docs are how agents discover, understand, and interact with your tool. They are, in a very real sense, your API.
**Invest in structured formats.** OpenAPI specs, JSON schemas, MCP tool definitions. These aren't just nice for code generation; they're the primary way agents will understand your software.
**Write descriptions for the literal reader.** Humans can infer meaning from context. Agents cannot. Every parameter description, every tool summary, every error message should be written as if the reader will take it completely at face value, because they will.
**Keep docs in sync with code.** This was always good practice, but the penalty for drift is now immediate. A human might notice that the docs are slightly outdated and adjust. An agent will follow the docs exactly and break.
**Don't abandon human-readable docs.** The goal isn't to replace tutorials and guides with JSON schemas. It's to maintain both: human docs for understanding, machine docs for execution. The best documentation will serve both audiences from a single source of truth.
The documentation problem hasn't changed. It's always been important, and most teams have always underinvested in it. What's changed is that there's finally a reader who will actually use every word you write, exactly as written. That reader just happens to be a machine.
## References
1. [Why do developers love clean code but hate writing documentation?](https://stackoverflow.blog/2024/12/19/developers-hate-documentation-ai-generated-toil-work/) - Stack Overflow Blog
2. [Developer documentation: How to measure impact and drive engineering productivity](https://getdx.com/blog/developer-documentation/) - DX
3. [Top 100 Developer Productivity Statistics with AI Tools 2026](https://www.index.dev/blog/developer-productivity-statistics-with-ai-tools) - [Index.dev](http://Index.dev)
4. [Model Context Protocol Specification](https://modelcontextprotocol.io/specification/2025-11-25) - MCP
5. [OpenAPI Specification: The Definitive Guide (2026 Edition)](https://www.xano.com/blog/openapi-specification-the-definitive-guide/) - Xano
6. [Empowering AI Agents with Tools via OpenAPI](https://devblogs.microsoft.com/agent-framework/empowering-ai-agents-with-tools-via-openapi-a-hands-on-guide-with-microsoft-semantic-kernel-agents/) - Microsoft Developer Blog
7. [Code execution with MCP: Building more efficient agents](https://www.anthropic.com/engineering/code-execution-with-mcp) - Anthropic
8. [Developer's Guide to AI Agent Protocols](https://developers.googleblog.com/developers-guide-to-ai-agent-protocols/) - Google Developers Blog
9. [MCP Servers for Documentation Sites](https://buildwithfern.com/post/mcp-servers-documentation-sites) - Fern
