---
title: "We’re building for agents"
date: "2026-03-15T15:51:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Something quietly shifted in the last year. Documentation sites started adding "Copy as Markdown" buttons. Then came the "Ask ChatGPT" and "Ask Claude" links, deep-linking into AI chatbots with `?q=` query parameters pre-filled with context from the docs. At first it looked like a nice convenience feature. But zoom out and the pattern becomes clear: we're no longer building just for humans. We're building for agents.
## Docs are no longer just for humans
For decades, documentation was a human-readable artifact. You wrote it so a developer could read it, understand it, and implement it. The design choices reflected that: syntax highlighting, collapsible sections, search bars, nice typography.
But now there's a second audience. AI agents are consuming documentation at scale, and they don't care about your CSS. They need clean, structured text they can fit into a context window and reason about. The rise of the "Copy as Markdown" button tells the story. LINE Developers added "Copy for LLM" and "View as Markdown" buttons below page titles. Retool's docs let you copy any page as Markdown, explicitly designed for pasting into an LLM. Palantir, Mastercard, and dozens of others followed suit.
Then came the deep links. Documentation sites started embedding buttons that open ChatGPT, Gemini, or Claude with a pre-filled query about the page you're reading. One click and you're in a conversation with an AI that already has the relevant context. The documentation itself became the bridge between the reader and the agent.
## The llms.txt standard
In September 2024, Jeremy Howard proposed a simple idea: a `/llms.txt` file that lives at the root of your website, similar to `robots.txt`, but designed for large language models. The file provides a structured map of your site's most important content in a format LLMs can parse efficiently.
The adoption has been staggering. By late 2025, over 844,000 websites had implemented `llms.txt` according to BuiltWith tracking data. Anthropic, Cloudflare, Stripe, Vercel, and Astro all adopted it. The standard typically includes two variants: a concise `llms.txt` with links to key resources, and a more comprehensive `llms-full.txt` that inlines the actual content.
The reasoning is practical. Context windows are too small to handle most websites in their entirety, and converting complex HTML pages with navigation, ads, and JavaScript into clean text is both difficult and lossy. A dedicated file that curates the most important content in Markdown solves both problems at once.
## Content negotiation and the two-audience problem
Mintlify took this a step further with content negotiation, a standard HTTP mechanism where the server responds differently based on what the client asks for. When a browser requests a documentation page, it gets the rich HTML version with all the visual design. When an AI agent requests the same page with an `Accept: text/markdown` header, it gets clean Markdown instead.
The result is a 30x reduction in token usage for the same information. Nothing is hidden or duplicated. Each reader simply gets what they need.
Mintlify also pioneered `install.md`, a format for installation instructions that are human-readable but also structured enough for AI agents to execute. The idea is elegant: the same document serves as a guide for a developer reading it and as a set of executable steps for an agent working through it. Different onboarding paths for humans and agents, built from the same source of truth.
## MCP changed the integration game
The Model Context Protocol, introduced by Anthropic, is often described as "USB-C for AI integrations." Before MCP, every AI agent needed a custom integration for every external tool it wanted to use. A GitHub integration. A Slack integration. A database integration. Each one built from scratch, each one slightly different.
MCP provides a universal protocol. Developers implement it once in their agent, and it unlocks an entire ecosystem of integrations. MCP servers connect to third-party applications and expose their data and functionality through standardized tools that any MCP-compatible agent can call.
The architecture is straightforward: an LLM processes requests and decides when to make tool calls, an MCP client translates those requests into properly structured calls, and an MCP server handles the actual connection to external systems. Google, Microsoft, and dozens of other companies have built MCP servers for their platforms.
This matters because it dramatically lowers the barrier for libraries and tools to become agent-accessible. Instead of waiting for each AI platform to build a bespoke integration, you publish an MCP server and every agent in the ecosystem can use your tool immediately.
## The ones who make it easy are winning
There's a clear competitive dynamic emerging. The libraries, frameworks, and platforms that make it easiest for agents to integrate are the ones gaining adoption fastest. This isn't just about having good documentation anymore. It's about having agent-ready documentation.
Think about what a developer workflow looks like today. You're building something, you hit a problem, and instead of reading through docs page by page, you paste the relevant documentation into Claude or ChatGPT and ask your question. The library that makes this seamless, with clean Markdown exports, `llms.txt` files, and MCP servers, is the one you'll reach for next time.
This creates a flywheel. Better agent integration means more developers using your tool with AI assistance, which means more real-world usage, which means more community contributions and better documentation, which makes the agent integration even better.
## What this means for builders
If you're building a developer tool, a library, or any product with documentation, the playbook is becoming clear:
1. **Add ****`llms.txt`**** to your site.** It's low effort and immediately makes your content more accessible to AI agents. Start with a curated list of your most important pages.
2. **Support content negotiation.** Serve Markdown when agents ask for it. Your documentation platform may already support this.
3. **Publish an MCP server.** If your tool has an API, wrapping it in an MCP server makes it instantly accessible to every agent in the ecosystem.
4. **Think in two audiences.** Every piece of documentation you write now has two readers: a human and an agent. Structure it so both can extract what they need.
5. **Make installation agent-friendly.** Structured setup instructions that an agent can follow step by step will increasingly be how developers onboard with your tool.
The shift is already well underway. Documentation is no longer just something you write for people to read. It's infrastructure that agents depend on. The teams that internalize this early will have a meaningful advantage as AI-assisted development becomes the default way software gets built.
## References
1. Jeremy Howard, "The /llms.txt file" proposal, [https://llmstxt.org/](https://llmstxt.org/)
2. BuiltWith, llms.txt adoption tracking, [https://trends.builtwith.com/robots/LLMS-Text](https://trends.builtwith.com/robots/LLMS-Text)
3. Mintlify, "Improved agent experience with llms.txt and content negotiation," [https://www.mintlify.com/blog/context-for-agents](https://www.mintlify.com/blog/context-for-agents)
4. Mintlify, [install.md](http://install.md) specification, [https://github.com/mintlify/install-md](https://github.com/mintlify/install-md)
5. Anthropic, "Code execution with MCP: building more efficient AI agents," [https://www.anthropic.com/engineering/code-execution-with-mcp](https://www.anthropic.com/engineering/code-execution-with-mcp)
6. Model Context Protocol documentation, [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
7. LINE Developers, "Let AI read the documentation: Markdown display feature," [https://developers.line.biz/en/tips/2026/02/19/markdown-notebooklm/](https://developers.line.biz/en/tips/2026/02/19/markdown-notebooklm/)
8. Retool, "Copy as Markdown," [https://docs.retool.com/changelog/copy-as-markdown](https://docs.retool.com/changelog/copy-as-markdown)
9. Mintlify, "Almost half your docs traffic is AI," [https://www.mintlify.com/blog/ai-traffic](https://www.mintlify.com/blog/ai-traffic)
