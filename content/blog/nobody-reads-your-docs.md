---
title: "Nobody reads your docs"
date: "2026-04-26"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Agents","LLMs","MCP","OpenAI","Anthropic","Claude","Documentation","Coding"]
---

Developer documentation was written for humans who read. You'd craft a narrative, build up context, sprinkle in diagrams, and trust that a patient reader would follow along. That assumption is quietly breaking down.
The primary consumer of your docs is increasingly not a person. It's an AI agent, skimming your README, extracting the relevant bits, and moving on. Cursor, GitHub Copilot, Claude Code, Gemini CLI, and dozens of other coding agents now sit between your documentation and the developer who needs it. The craft of technical writing needs to catch up.
## The shift already happened
Developers don't read docs the way they used to. Instead of navigating to a reference page and scanning for the right section, they ask an agent. "How do I authenticate with this API?" "What's the correct format for this config file?" The agent fetches the docs, parses them, and returns an answer.
This isn't a niche workflow. AI coding tools have seen explosive adoption, with Cursor alone reaching 43% organizational adoption in recent surveys, while GitHub Copilot sits at 37%. Developers report using AI most heavily for code generation, documentation lookup, and research. Your docs are still being consumed, just not by human eyes.
The implication is significant. When an agent reads your documentation, it doesn't benefit from the same things a human does. It doesn't appreciate a well-placed analogy. It doesn't follow a narrative arc. It doesn't look at your diagrams. What it needs is structure, precision, and unambiguous content it can extract and relay accurately.
## What breaks when agents are the reader
We spent years making documentation more human-friendly. Tutorials with conversational tone. Step-by-step walkthroughs with context about *why* something works a certain way. Diagrams that convey architecture at a glance. These are genuinely good practices for human readers, and they're not going away.
But many of the patterns we optimized for humans actively trip up AI agents:
- **Narrative structure** buries the key information inside paragraphs of context. An agent has to work harder to extract the one line it needs.
- **Clever formatting** like tabs, interactive elements, and JavaScript-rendered content often doesn't survive the extraction process.
- **Implicit knowledge** is everywhere. We write "set up your environment" assuming the reader knows what that means for this particular tool. Agents don't carry that assumption.
- **Scattered information** across multiple pages means an agent needs to follow links, piece together context, and hope it got the full picture. Often it doesn't.
- **Ambiguous parameters** where a field is described as "the identifier" without specifying the exact format, type, or constraints leaves agents guessing, and they guess wrong more often than humans do.
The result is that agents hallucinate, give incomplete answers, or miss critical steps. And the developer blames the agent when the real problem is that the documentation wasn't built for this kind of consumption.
## What good agent-readable docs look like
Writing for agents doesn't mean abandoning human readers. It means adding a layer of structure that serves both audiences. The best agent-friendly documentation shares a few traits.
**Explicit schemas and types.** Don't just describe a parameter in prose. Include the type, the constraints, the default value, and an example. Structured, consistent patterns are far easier for an agent to parse than a paragraph of explanation.
**Self-contained pages.** Each page should answer its question fully without requiring the reader to follow three links to assemble the complete picture. Agents work best when they can get what they need from a single context window.
**Consistent patterns.** If every endpoint in your API docs follows the same format, like description, then parameters table, then example request, then example response, an agent can learn the pattern once and extract reliably every time.
**Concrete examples.** Show the actual request. Show the actual response. Include edge cases. Agents are excellent at pattern-matching from examples, often better than they are at interpreting prose descriptions.
**Machine-readable metadata.** Explicit frontmatter, structured headings, and semantic HTML all help agents navigate and extract content more reliably.
## The rise of docs-as-protocol
The most interesting development in this space is the emergence of standards that treat documentation as something agents consume natively, not as a human artifact that agents have to scrape.
**llms.txt** is a proposal to standardize a markdown file at `/llms.txt` on any website, providing a structured index of content specifically designed for LLM consumption. It's a plain text document with a list of links, each with a summary of what can be found by following that link. Think of it as a sitemap, but for AI agents. Major platforms like Expo, LangChain, and Mastercard's developer portal have already adopted it. Anthropic specifically requested `llms.txt` and `llms-full.txt` files for their documentation hosted on Mintlify.
[**AGENTS.md**](http://AGENTS.md) takes a similar approach for codebases. It's a markdown file at the root of a repository that tells AI coding agents how the project works, like a README for agents. It emerged from collaboration between OpenAI Codex, Google's Jules, Cursor, Amp, and Factory, and is now stewarded by the Agentic AI Foundation under the Linux Foundation. Over 60,000 open-source projects have adopted it.
**MCP (Model Context Protocol)** goes even further. Created by Anthropic, MCP is an open standard for connecting AI applications to external data sources and tools. Instead of writing docs that an agent has to read and interpret, you describe your tool's capabilities in a protocol that agents understand natively. An MCP server exposes structured tool definitions, input schemas, and descriptions that an agent can discover and invoke directly, no documentation parsing required.
In a sense, MCP servers *are* the new docs for agent-to-tool interaction. Your API's capabilities, described in a protocol agents consume directly, rather than in prose they have to interpret. OpenAI, Google, and most major AI coding tools now support MCP.
## The tension you have to manage
None of this means human-readable documentation is dead. That framing misses the point entirely.
Humans still need docs for onboarding, for understanding *why* something works the way it does, for debugging when things go wrong, and for building mental models of complex systems. A good tutorial that walks through a concept step by step is still invaluable.
The shift is about the *primary consumer* for certain types of documentation. The "what" and the "how," like API references, configuration guides, parameter lists, and setup instructions, are increasingly agent-consumed. The "why," like architectural decisions, design philosophy, and conceptual explanations, remains firmly human territory.
The practical challenge is serving both audiences without maintaining two entirely separate documentation sets. The good news is that the changes that make docs better for agents, like clearer structure, more explicit schemas, self-contained pages, and consistent formatting, also make docs better for humans. The investment pays off twice.
## What to change in your next README
If you're maintaining developer documentation, here are concrete steps to take:
1. **Add an ****`llms.txt`**** file** to your documentation site. Even a basic one that lists your key pages with short descriptions gives agents a structured entry point.
2. **Add an ****`AGENTS.md`** to your repositories. Describe the project structure, key commands, code conventions, and anything an agent would need to work on the codebase effectively.
3. **Audit your API reference for structure.** Every endpoint should follow the same format. Parameters should have explicit types, constraints, and examples, not just prose descriptions.
4. **Make pages self-contained.** If a developer (or agent) lands on a page, they should be able to get what they need without following five links to other pages.
5. **Consider MCP.** If you maintain a developer tool or API, exposing an MCP server alongside traditional docs lets agents interact with your tool natively rather than parsing documentation.
6. **Test with agents.** Ask Cursor or Claude to answer questions using your docs. Where they fail or hallucinate, your docs have a gap that affects both agent and human readers.
The developers using your tool are already asking AI to read your documentation for them. The question isn't whether to adapt. It's how quickly you can make that experience work well.
## References
1. Mintlify, "AI Documentation Trends: What's Changing in 2025," [https://www.mintlify.com/blog/ai-documentation-trends-whats-changing-in-2025](https://www.mintlify.com/blog/ai-documentation-trends-whats-changing-in-2025)
2. [llmstxt.org](http://llmstxt.org), "The /llms.txt file proposal," [https://llmstxt.org/](https://llmstxt.org/)
3. [AGENTS.md](http://AGENTS.md), "A simple, open format for guiding coding agents," [https://agents.md/](https://agents.md/)
4. Anthropic, "Introducing the Model Context Protocol," [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
5. Model Context Protocol, "What is MCP?," [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
6. Stainless, "MCP API Documentation: The Complete Guide," [https://www.stainless.com/mcp/mcp-api-documentation-the-complete-guide](https://www.stainless.com/mcp/mcp-api-documentation-the-complete-guide)
7. Mastercard Developer, "Working with llms.txt," [https://developer.mastercard.com/platform/documentation/agent-toolkit/working-with-llmstxt/](https://developer.mastercard.com/platform/documentation/agent-toolkit/working-with-llmstxt/)
8. Anthropic, "Writing effective tools for AI agents," [https://www.anthropic.com/engineering/writing-tools-for-agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
9. Expo, "Documentation for AI agents and LLMs," [https://docs.expo.dev/llms/](https://docs.expo.dev/llms/)
10. Dibeesh KS, "Cursor Overtakes GitHub Copilot: 43% vs 37% in AI Tool Adoption," Medium, [https://dibishks.medium.com/cursor-overtakes-github-copilot-43-vs-37-in-ai-tool-adoption-de44a7124d6e](https://dibishks.medium.com/cursor-overtakes-github-copilot-43-vs-37-in-ai-tool-adoption-de44a7124d6e)
11. Tessl, "[Agents.md](http://Agents.md): an open standard for AI coding agents," [https://tessl.io/blog/the-rise-of-agents-md-an-open-standard-and-single-source-of-truth-for-ai-coding-agents/](https://tessl.io/blog/the-rise-of-agents-md-an-open-standard-and-single-source-of-truth-for-ai-coding-agents/)
12. Heavybit, "The Future of Software Documentation in the Age of AI," [https://www.heavybit.com/library/article/software-documentation-in-the-age-of-ai](https://www.heavybit.com/library/article/software-documentation-in-the-age-of-ai)
