---
title: "MCP vs CLI"
date: "2026-03-22T17:34:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

The debate over how AI agents should connect to external tools has turned into one of the loudest arguments in the developer ecosystem. On one side, the Model Context Protocol (MCP) promises a universal standard for agent-to-tool communication. On the other, CLI enthusiasts argue that good old command-line interfaces are simpler, cheaper, and already baked into the models. So which should you actually use?
The honest answer: it depends on who your agent is working for.
## The case for CLI
CLI tools have a massive head start. LLMs have been trained on enormous volumes of shell interactions, from GitHub repos to StackOverflow answers to code tutorials. Models are fluent in CLI patterns in a way they simply aren't with MCP's JSON-RPC schemas. Unix philosophy, piping, chaining, redirecting output, is deeply embedded in model weights.
The efficiency numbers back this up. In benchmarks run by Scalekit comparing identical tasks on Claude Sonnet 4 against GitHub's API, CLI agents used 10 to 32 times fewer tokens than MCP agents for the same operations. For a simple task like checking a repo's language, the CLI agent needed 1,365 tokens. The MCP agent needed 44,026. At scale, that translates to roughly \$3 per month for CLI versus \$55 for direct MCP across 10,000 operations.
CLI also achieved 100% reliability in those benchmarks, while MCP connections failed 28% of the time due to TCP-level timeouts against remote servers. CLI tools run locally. There is no remote server to time out.
There is one important caveat, though. CLI agents perform best when paired with a "skills" file, a short document (around 800 tokens) containing tips, useful flags, and common workflows for the tools the agent will use. Without that context, CLI agents waste tokens fumbling through help menus and trial-and-error. With it, they cut tool calls and latency by roughly a third.
## The schema bloat problem
MCP's overhead comes from a specific engineering issue: schema injection. When an MCP server connects to an agent, it injects definitions for *every* tool it exposes into the context window. GitHub's Copilot MCP server, for example, ships 43 tool definitions. Even if the agent only needs one or two, it carries the full schema for all 43 on every call.
Anthropic's own engineers documented this problem. In their testing, a modest five-server setup with 58 tools consumed approximately 55,000 tokens before the conversation even started. They reported seeing setups where tool definitions alone consumed 134,000 tokens, roughly half of Claude's entire context window gone before a single question was asked.
This is real overhead with real costs. But it is also a solvable engineering problem, not a fundamental flaw in the protocol.
## How the overhead problem is being solved
Several approaches have emerged to collapse MCP's context overhead dramatically.
**Tool search.** Instead of loading all tool definitions upfront, Anthropic's Tool Search Tool discovers tools on demand. The agent starts with only a lightweight search capability (about 500 tokens) and loads the 3 to 5 tools it actually needs per task. In their testing, this reduced token usage by 85% while improving accuracy, with Opus 4 jumping from 49% to 74% on MCP evaluations.
**Programmatic tool calling.** Rather than making individual tool calls where each result enters the context window, the agent writes a Python script that orchestrates multiple calls, processes intermediate results, and returns only the final output to the model. Anthropic reports a 37% reduction in token consumption on complex research tasks using this pattern. Claude for Excel, for example, uses programmatic tool calling to read and modify spreadsheets with thousands of rows without overloading the context window.
**Code mode.** Cloudflare's approach collapses thousands of API endpoints into just two tools: `search()` and `execute()`. The agent writes JavaScript against a typed API instead of loading every schema upfront, cutting token usage by over 99%.
These are not theoretical. They are shipping in production today, and they effectively neutralize the token overhead argument.
## Where CLI breaks down
CLI's advantages evaporate the moment an agent stops acting as *you* and starts acting on behalf of someone else.
Consider a concrete scenario: you are building an AI assistant for a project management platform. A user at one company says, "Create a Jira ticket from this GitHub PR and notify the team on Slack." Your agent needs to read from GitHub, write to Jira, and send on Slack, all using that specific user's permissions, scoped to their organization's data, without leaking anything into another customer's workspace.
With CLI, authentication means the agent inherits whatever credentials are lying around. There is no per-user scoping, no consent flow, no tenant isolation preventing one customer's data from leaking into another's context, and no structured audit trail recording which agent accessed what under whose authority.
The security implications are not theoretical either. Reports have documented exposed instances leaking credentials and API keys, malicious community-contributed scripts exfiltrating data, and agents open to remote hijacking, all consequences of architectures where shell access and ambient credentials operate without authorization boundaries.
MCP was designed with these layers in mind. Its authorization specification mandates OAuth 2.1 with PKCE by default, providing per-user authentication, scoped access tokens, and consent management as part of the protocol rather than bolt-on afterthoughts.
## The real question
The debate is not "MCP or CLI." It is "who is your agent acting for?"
**Use CLI when the agent acts as the developer.** For local tools, personal automation, dev workflows, and internal scripting, CLI is simpler, cheaper, and pragmatic. Pair it with a skills file for the best results.
**Use MCP when the agent acts on behalf of others.** For customer-facing products, multi-tenant environments, remote services, and anything where compliance matters, MCP provides the authorization scaffolding that CLI cannot. The token overhead is being engineered away rapidly.
**The hybrid approach is likely where we land.** CLI for local tools and developer flows, MCP for remote services, internal APIs, and security-sensitive workflows. As Smithery concluded from their 756-run benchmark across three models and three APIs: prefer CLI for local tools, MCP integrations for remote services. Start by building a good API with good documentation, then expose an MCP adapter on top.
## Both are still evolving
MCP is a young protocol, and it shows. Connection reliability, schema efficiency, and tooling maturity are all improving rapidly. The solutions to context overhead that seemed impossible a few months ago, like tool search and programmatic tool calling, are already in beta on major platforms.
The agent ecosystem is evolving just as fast. The patterns we use today to connect agents to tools will look different in a year. What matters now is understanding the trade-offs clearly enough to make the right architectural choice for what you are building, not chasing the hype cycle in either direction.
If you are automating your own workflow, CLI wins. If you are building something that touches other people's data, invest in MCP. And if someone tells you one of them is dead, they are probably selling something.
## References
1. Scalekit, "MCP is up to 32x more expensive than CLI. Here's why we still use it." [https://www.scalekit.com/blog/mcp-vs-cli-use](https://www.scalekit.com/blog/mcp-vs-cli-use)
2. Anthropic, "Introducing the Model Context Protocol." [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
3. Anthropic, "Introducing advanced tool use on the Claude Developer Platform." [https://www.anthropic.com/engineering/advanced-tool-use](https://www.anthropic.com/engineering/advanced-tool-use)
4. Anthropic, "Code execution with MCP: Building more efficient agents." [https://www.anthropic.com/engineering/code-execution-with-mcp](https://www.anthropic.com/engineering/code-execution-with-mcp)
5. Descope, "MCP vs. CLI: When to Use Them and Why." [https://www.descope.com/blog/post/mcp-vs-cli](https://www.descope.com/blog/post/mcp-vs-cli)
6. Vishal Mysore, "CLI vs MCP for AI Agents: How to Build a CLI Tool-Calling Agent!" [https://medium.com/@visrow/cli-vs-mcp-for-ai-agents-how-to-build-a-cli-tool-calling-agent-d3e7bb8252c2](https://medium.com/@visrow/cli-vs-mcp-for-ai-agents-how-to-build-a-cli-tool-calling-agent-d3e7bb8252c2)
7. Jannik Reinhard, "Why CLI Tools Are Beating MCP for AI Agents." [https://jannikreinhard.com/2026/02/22/why-cli-tools-are-beating-mcp-for-ai-agents/](https://jannikreinhard.com/2026/02/22/why-cli-tools-are-beating-mcp-for-ai-agents/)
8. Model Context Protocol, official specification. [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
9. Google Cloud, "What is Model Context Protocol (MCP)?" [https://cloud.google.com/discover/what-is-model-context-protocol](https://cloud.google.com/discover/what-is-model-context-protocol)
