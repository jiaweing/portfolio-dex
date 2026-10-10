---
title: "Nobody reads the docs"
date: "2026-04-22"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Documentation","Hallucinations","Agents","MCP","LLMs","OpenAI"]
---

For as long as software has existed, developers have skipped the docs. We skim the quickstart, copy the first code snippet that looks right, and figure out the rest through trial and error. It's a tradition as old as `man` pages.
But here's what's changed: the AI coding assistants we now rely on do the exact same thing. They hallucinate APIs, guess at parameters, and confidently reference methods that were deprecated three versions ago. The tools we built to save us from reading documentation are themselves failing because of bad documentation.
Documentation just became the most important, and most ignored, thing in software.
## The hallucination problem is a documentation problem
When an AI coding assistant generates a function call that doesn't exist, it's tempting to blame the model. But the root cause is often simpler: the model was trained on a messy soup of StackOverflow answers from 2019, outdated blog posts, and conflicting tutorials. When the official docs are thin, ambiguous, or buried, the model fills in the gaps with plausible-sounding fiction.
A Bilkent University study found that GitHub Copilot generates correct code only about 46% of the time, while ChatGPT manages roughly 65%. A Snyk survey from 2023 reported that over 50% of organizations experienced outages or security issues due to AI-generated code referencing outdated APIs. And a Columbia Journalism Review study in March 2025 measured citation accuracy across AI assistants, finding hallucination rates between 37% and 94% depending on the tool.
This isn't a model intelligence problem. It's a context problem. When the right information doesn't exist in a clear, structured, accessible form, the model improvises. And improvisation in code means bugs.
Developers on forums describe the same pattern over and over: they ask an AI assistant for help with a specific library, and the response looks legitimate but references methods that were never part of the API. Twenty minutes of debugging later, they realize the function literally doesn't exist. The AI blended knowledge across versions, frameworks, and sometimes entirely made-up patterns.
## AI needs better docs than humans ever did
Here's the irony. We're building AI to write code so we don't have to read documentation. But the AI needs better documentation than humans ever did.
Humans can deal with ambiguity. We read between the lines, check the date on a blog post, notice when something feels off. We have intuition. Language models don't. They need explicit, structured, unambiguous context to produce reliable output.
This becomes even more acute with agent frameworks like the Model Context Protocol (MCP). MCP is an open standard for connecting AI applications to external systems, tools, and data sources. When an AI agent needs to call an API, query a database, or interact with infrastructure, it relies on structured context to know what's available and how to use it. Bad docs don't just confuse the agent, they make it fundamentally unable to do its job.
As one engineering blog put it, agents are only as good as the context they're given. If a coding agent can't discover the right tool, the right parameter, or the right constraint, it will guess. And a confident guess from an AI agent that's wired into your production systems is a very different thing from a wrong answer in a chat window.
## Documentation as infrastructure
The shift we need is conceptual: stop treating documentation as a nice-to-have and start treating it as infrastructure.
The analogy to tests is useful here. A decade ago, many teams treated tests as optional, something you wrote if you had time. Today, untested code is considered unshippable by most professional teams. Tests aren't a favor to future developers. They're a structural requirement for the system to work.
Documentation is heading the same direction. If your docs aren't maintained, the AI tools your team relies on will produce unreliable output. If your API reference is incomplete, every coding assistant that touches your library will hallucinate the missing pieces. Documentation rot is now a production risk.
The "docs as code" philosophy, treating documentation with the same rigor as source code using version control, peer review, and automated validation, has been gaining traction through communities like Write the Docs and practices at companies like Google and GitHub. But with AI agents in the loop, this philosophy goes from "good practice" to "essential infrastructure."
## What good docs look like in the age of AI
So what does effective documentation actually look like when your readers include AI agents?
The emergence of [AGENTS.md](http://AGENTS.md) is one answer. Created through collaboration between OpenAI Codex, Cursor, Google's Jules, Amp, and Factory, and now stewarded by the Agentic AI Foundation under the Linux Foundation, [AGENTS.md](http://AGENTS.md) is a simple convention: a Markdown file at the root of your repository that gives AI coding agents the context they need. Think of it as a README for agents.
Over 60,000 open-source projects already use it. The file typically includes setup commands, coding conventions, testing rules, and constraints the agent can't infer from the codebase alone. It captures the tribal knowledge that would normally live in Slack threads and code reviews, the kind of context that a human mentor would share verbally but an AI agent will never ask about.
As one engineering manifesto put it: "A codebase without an [AGENTS.md](http://AGENTS.md) is a codebase that will be misunderstood. If the conventions aren't written down, they don't exist."
But [AGENTS.md](http://AGENTS.md) is just one piece. The broader principles for AI-friendly documentation include:
- **Structured schemas over prose.** Agents parse structure better than paragraphs. Type definitions, parameter tables, and clear input/output specifications are more useful than narrative explanations.
- **Examples over explanations.** A working code snippet communicates more to an AI than three paragraphs describing the same behavior. Show, don't tell.
- **Version-aware content.** Documentation should make it unambiguous which version of an API or library it applies to. AI models blend knowledge across versions, so explicit versioning is a defense against hallucination.
- **Machine-readable formats.** OpenAPI specs, JSON schemas, and typed interfaces give agents precise context. They're also easier to validate and keep in sync with the actual codebase.
## The companies winning at AI have exceptional docs
This pattern is already visible in practice. The companies that are integrating AI most effectively into developer workflows tend to be the same ones with best-in-class documentation.
Stripe is the canonical example. Their API docs are consistently cited as a gold standard, not just for human readability but for their structured, interactive design. They built Markdoc, an open-source documentation framework, specifically to create docs that are both author-friendly and machine-parseable. Their API reference includes runnable examples, test mode integration, and version-specific content. It's no coincidence that Stripe integrations tend to work well with AI coding assistants.
Cloudflare has taken this further by publishing "skills" for AI agents, structured context files that help coding agents understand how to build on Workers, the Agents SDK, and the broader Cloudflare Developer Platform. They've also invested heavily in their developer documentation infrastructure, rebuilding [developers.cloudflare.com](http://developers.cloudflare.com) with a focus on consistency and discoverability.
These aren't just nice developer relations investments. They're competitive advantages. When every developer is using AI to write integration code, the platform with the best docs gets the best AI-generated code, which means fewer support tickets, faster adoption, and happier developers.
## The real shift
The uncomfortable truth is that documentation has always mattered this much. The difference is that the consequences of neglecting it are now immediate and measurable rather than slow and invisible.
When a human developer skips the docs, they might waste an afternoon. When an AI agent skips the docs, it might confidently ship broken code across an entire team's workflow. When a thousand AI agents all reference the same outdated tutorial, the compounding effect is a wave of identical bugs across the ecosystem.
We can't solve this by making AI smarter. We solve it by making documentation better. Not as an afterthought, not as a chore, but as a first-class engineering concern, the same way we treat tests, CI pipelines, and monitoring.
Nobody reads the docs. That was always true. What's new is that the systems writing our code don't read them either, and they need to.
## References
1. [AGENTS.md](http://AGENTS.md)[ - A simple, open format for guiding coding agents](https://agents.md/)
2. [How to Build Your ](https://www.augmentcode.com/guides/how-to-build-agents-md)[AGENTS.md](http://AGENTS.md)[ (2026) - Augment Code](https://www.augmentcode.com/guides/how-to-build-agents-md)
3. [The AI Coding Agent Manifesto - Wix Engineering](https://medium.com/wix-engineering/the-ai-coding-agent-manifesto-c8f61629d677)
4. [Why AI Still Struggles with Deprecated APIs and How to Fix It - Redefined by AI](https://medium.com/@redefinedbyai/why-ai-still-struggles-with-deprecated-apis-and-how-to-fix-it-701d7b5a1a59)
5. [AI Hallucination Examples: A Catalog of What Goes Wrong and Why - Morph](https://www.morphllm.com/ai-hallucination-examples)
6. [What is the Model Context Protocol (MCP)?](https://modelcontextprotocol.io/docs/getting-started/intro)
7. [How Stripe builds interactive docs with Markdoc](https://stripe.dev/blog/markdoc)
8. [Cloudflare Skills for AI Agents - GitHub](https://github.com/cloudflare/skills)
9. [Docs as Code - Write the Docs](https://www.writethedocs.org/guide/docs-as-code/)
10. [Documentation in the age of AI: why context is the new code](https://medium.com/@jlcases/documentation-in-the-age-of-ai-why-context-is-the-new-code-003247818347)
11. [How to Fix API Integration for AI Coding Agents - APIMatic](https://www.apimatic.io/blog/fixing-ai-coding-agents-for-api-integration)
12. [We rebuilt Cloudflare's developer documentation - Cloudflare Blog](https://blog.cloudflare.com/new-dev-docs/)
