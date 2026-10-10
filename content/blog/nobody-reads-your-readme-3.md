---
title: "Nobody reads your README"
date: "2026-04-09"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Developers spend hours crafting READMEs that explain their projects clearly, document their APIs thoroughly, and provide helpful getting-started guides. There's just one problem: the humans these were written for barely read them. They skim, they ctrl-F, they copy the first code snippet that looks right and move on.
But something has changed. Your README now has a reader who actually reads every word, follows every instruction literally, and never skips a section. That reader just isn't human.
## The old flow is dead
For most of software's history, documentation followed a straightforward path. A developer reads the README, understands the API, and writes the integration code. The README was the handshake between a library author and the humans using it.
That flow has been quietly replaced. Today, a developer types "help me integrate this SDK" into Cursor, Claude, or Copilot. The agent fetches the README, parses it, generates the integration, and the human reviews the output. The README still matters, but the reader has changed.
This isn't a niche workflow. Cursor has reached 43% organizational adoption, while GitHub Copilot sits at 37%. Developers report using AI most heavily for code generation, documentation lookup, and research. The README is still being consumed, just not by human eyes.
## Machine-parseable first, human-readable second
This shift has an uncomfortable implication: your docs need to be optimized for machine consumption first and human readability second.
That doesn't mean making them ugly or unreadable. It means rethinking priorities. When a human reads a README, they benefit from narrative flow, analogies, and visual hierarchy. They can infer meaning from context and fill in gaps with experience. An AI agent does none of that. It takes every word at face value.
When your README says "set up your environment," a human knows what that probably means for their setup. An agent doesn't. When a parameter is described as "the identifier" without specifying the exact format, type, or constraints, a human can often figure it out. An agent guesses, and guesses wrong.
The documentation that works best for agents shares a few traits: explicit types and constraints for every parameter, self-contained sections that don't require following five links, consistent formatting patterns, concrete examples showing actual requests and responses, and unambiguous language that leaves no room for interpretation.
Here's what's interesting: these same qualities also make documentation better for humans. Especially junior developers, who lack the experience to fill in the gaps that senior developers don't even notice. If your README can't be understood by Claude, it probably can't be understood by a junior dev either.
## [AGENTS.md](http://AGENTS.md) and the rise of AI-targeted formats
The recognition that AI agents are a primary documentation audience has given rise to entirely new file formats designed specifically for them.
[AGENTS.md](http://AGENTS.md) is perhaps the most striking example. Think of it as a README for AI agents: a dedicated, predictable place to provide the context and instructions that coding agents need to work on your project. It emerged from a collaboration between OpenAI Codex, Google's Jules, Cursor, Amp, and Factory, and is now stewarded by the Agentic AI Foundation under the Linux Foundation. Over 60,000 open-source projects have adopted it.
The reasoning behind [AGENTS.md](http://AGENTS.md) is deliberately pragmatic. README files are for humans: quick starts, project descriptions, and contribution guidelines. [AGENTS.md](http://AGENTS.md) complements this by containing the detailed context coding agents need, like build steps, test commands, and code conventions, that would clutter a README or aren't relevant to human contributors. Rather than shoehorning agent instructions into an existing format, the community created a dedicated place for them.
Then there's llms.txt, proposed by Jeremy Howard in September 2024. It's a plain text markdown file that lives at /llms.txt on a website, providing a structured map of the site's most important content in a format LLMs can parse efficiently. Think of it as a sitemap, but for AI agents. The adoption has been significant, with over 844,000 websites implementing it according to BuiltWith tracking data. Anthropic, Cloudflare, Stripe, Vercel, and Mastercard have all adopted it.
The logic is simple. Context windows are too small to handle most websites in their entirety. Converting complex HTML pages with navigation, ads, and JavaScript into clean text is both difficult and lossy. A dedicated file that curates the most important content in Markdown solves both problems at once.
## MCP: your tool description is your docs
The Model Context Protocol takes the idea even further. Created by Anthropic, MCP is an open standard for connecting AI applications to external tools and data sources. Instead of writing docs that an agent has to read and interpret, you describe your tool's capabilities in a protocol that agents understand natively.
An MCP server exposes tools through structured definitions: what the tool does, what parameters it accepts, what it returns. These descriptions aren't supplementary documentation. They are the documentation. There's no separate human-readable page to fall back on. The spec is the interface.
This makes tool descriptions extraordinarily important. A vague MCP tool description like "manages data" is useless. An agent deciding whether to call your tool has only the description to go on. "Creates a new user account with the specified email and role, returning the user ID" gives the agent what it needs to make a correct decision.
OpenAPI specifications play a similar role for REST APIs. Microsoft, OpenAI, and Google have built agent frameworks that consume OpenAPI specs directly, turning API documentation into executable knowledge. Your API's capabilities, described in a protocol agents consume directly, rather than in prose they have to interpret.
This is the logical endpoint of the shift: documentation isn't just something humans read to understand your software. It's the interface through which agents interact with it. Code is becoming infrastructure, and your documentation is becoming part of that infrastructure layer.
## The irony nobody expected
For years, developer advocacy teams begged engineers to write better documentation. The arguments were always the same: it helps new hires, it reduces support tickets, it improves adoption. Those arguments mostly lost to shipping deadlines.
But here's the irony: we finally have a reader that actually reads every word of our docs, and it's not human.
AI agents have created an economic forcing function that tutorials never could. If your tool has poor documentation, agents can't use it. If agents can't use it, developers working with AI assistants will skip your tool in favor of one that works. Documentation quality now directly determines whether your software gets adopted.
This is already visible in the MCP ecosystem. Developers building MCP-compatible tools are discovering that the quality of their tool descriptions directly correlates with how reliably agents use them. A well-described tool gets called correctly. A poorly described one gets hallucinated parameters and failed calls.
The same dynamic applies to README quality. Libraries with clear, structured READMEs integrate smoothly when a developer asks their AI assistant for help. Libraries with vague or disorganized READMEs produce broken integrations that the developer has to debug manually, which often means they just pick a different library next time.
## Writing for two audiences
None of this means human-readable documentation is obsolete. That framing misses the point. Humans still need READMEs for onboarding, for understanding architectural decisions, for debugging edge cases, and for building mental models of how things work. A well-written tutorial remains valuable.
The shift is about recognizing that certain types of documentation, like API references, parameter lists, configuration guides, and setup instructions, now have a primary audience that is a machine. The conceptual explanations, the "why" behind design decisions, the architectural overviews, those remain firmly human territory.
The good news is that these goals don't conflict. Structured, explicit, unambiguous documentation serves both audiences. A parameter table with types, constraints, defaults, and examples is easier for an agent to parse and easier for a human to scan than a paragraph of prose describing the same information.
The challenge is building habits and systems that serve both readers from a single source of truth, rather than maintaining two separate documentation sets. Formats like [AGENTS.md](http://AGENTS.md) and llms.txt help by giving agents a dedicated entry point without requiring you to restructure your human-facing docs.
## What to do about it
If you maintain a library, tool, or API, the practical steps are clear.
Add an [AGENTS.md](http://AGENTS.md) to your repositories. Describe the project structure, key commands, test patterns, and code conventions. Give coding agents the context they need to contribute meaningfully instead of guessing.
Add an llms.txt to your documentation site. Even a basic one that lists your key pages with short descriptions provides agents with a structured entry point to your content.
Audit your README for structure. Every parameter should have an explicit type, constraints, and an example. Every section should be self-contained enough that a reader, human or machine, can get what they need without assembling context from five different pages.
Consider publishing an MCP server alongside traditional docs. If your tool has an API, wrapping it in an MCP server makes it directly accessible to every agent in the ecosystem without requiring documentation parsing.
Test your docs with agents. Ask Claude or Cursor to answer questions using your README. Where they fail or hallucinate, you've found a gap that affects both agent and human readers.
The audience for your README has fundamentally shifted. The developers using your tool are already asking AI agents to read your docs for them. Your README has never had a more attentive reader. It's time to write for them.
## References
1. [AGENTS.md](http://AGENTS.md), "A simple, open format for guiding coding agents," [https://agents.md/](https://agents.md/)
2. Jeremy Howard, "The /llms.txt file," [https://llmstxt.org/](https://llmstxt.org/)
3. Anthropic, "Introducing the Model Context Protocol," [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
4. Model Context Protocol specification, [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
5. [Builder.io](http://Builder.io), "Improve your AI code output with [AGENTS.md](http://AGENTS.md)," [https://www.builder.io/blog/agents-md](https://www.builder.io/blog/agents-md)
6. GitHub Blog, "How to write a great [agents.md](http://agents.md): Lessons from over 2,500 repositories," [https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
7. OpenAI Developers, "Custom instructions with [AGENTS.md](http://AGENTS.md)," [https://developers.openai.com/codex/guides/agents-md](https://developers.openai.com/codex/guides/agents-md)
8. GitBook, "What is llms.txt? Why it's important and how to create it for your docs," [https://www.gitbook.com/blog/what-is-llms-txt](https://www.gitbook.com/blog/what-is-llms-txt)
9. Mastercard Developers, "Working with llms.txt," [https://developer.mastercard.com/platform/documentation/agent-toolkit/working-with-llmstxt/](https://developer.mastercard.com/platform/documentation/agent-toolkit/working-with-llmstxt/)
10. Alation, "How to Write AI-Ready Documentation," [https://www.alation.com/blog/how-to-write-ai-ready-documentation/](https://www.alation.com/blog/how-to-write-ai-ready-documentation/)
