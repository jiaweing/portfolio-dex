---
title: "The rise of CLIs"
date: "2026-03-10"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

The command line was supposed to be a relic. Instead, AI agents are turning it into the most important interface in software development.
## The terminal is back
For years, the trajectory of developer tools seemed clear: more dashboards, shinier GUIs, point-and-click everything. The terminal was still there, of course, but it felt like a holdover, the domain of greybeards and people who enjoyed pain, as one developer put it.
Then AI agents arrived, and something unexpected happened. Developers started *moving back* to the command line. Not out of nostalgia, but because AI agents work better there. Claude Code, Gemini CLI, Aider, Cline, the most powerful AI coding tools of 2025 and 2026 are terminal-first. The CLI isn't just surviving the AI era. It's thriving because of it.
## Why AI agents prefer the terminal
The resurgence isn't a coincidence. There are deep, structural reasons why CLIs and AI agents are a natural fit.
### Text is the native language of LLMs
Large language models think in text. They generate text, consume text, and reason about text. The terminal is a purely text-based environment, **stdout** from one program flows directly into **stdin** for another. This makes the CLI the most natural interface for an AI agent to operate within.
An IDE, by contrast, is a visual environment. It has tabs, scroll positions, unsaved buffers, and a complex UI state that an AI agent has to navigate around. In the terminal, there's no ambiguity. A file is either written to disk or it isn't. A test passes or it fails.
### Composability through Unix philosophy
Unix philosophy, small, composable tools that do one thing well, turns out to be the perfect architecture for AI agents. A CLI agent can chain commands together through pipes:
```bash
# Find all TypeScript files with a specific import and replace it
find . -name "*.ts" | xargs grep -l "old-import" | xargs sed -i 's/old-import/new-import/g'
```
No special API integration needed. The agent just needs to know how to write shell commands, and LLMs are very good at that, having been trained on vast amounts of shell scripts and documentation.
### Deterministic feedback loops
When a CLI agent runs a command, it gets a clear signal back: exit code 0 means success, anything else means failure. The agent can read **stderr**, understand what went wrong, plan a correction, and try again, all without human intervention.
This "self-healing" loop is much harder to build in a GUI, where verification often requires visual inspection. In the terminal, verification is just another command.
### Delegation over suggestion
This is perhaps the most important distinction. IDE-based AI tools are designed for **suggestion**, they propose code that a human reviews and accepts. CLI agents are designed for **delegation**, you describe a task, and the agent plans, executes, debugs, and commits the result.
As one developer noted: "Editor-based agents feel like pair programming. CLI-based agents feel like delegation." And when the task is well-defined, delegation is dramatically more productive.
## The ecosystem that already exists
One of the strongest arguments for CLI-based AI integration is that the tools already exist. Every major service maintains a high-quality CLI:
- **`git`** for version control
- **`kubectl`** for Kubernetes
- **`aws`**, **`gcloud`**, **`az`** for cloud providers
- **`docker`** for containers
- **`gh`** for GitHub
- **`gws`** for Google Workspace (Drive, Gmail, Calendar, Sheets, Docs, and more)
- **`terraform`** for infrastructure as code
These tools are maintained by the service providers themselves, battle-tested by millions of users, and updated quickly when APIs change. When an AI agent needs to interact with GitHub, it doesn't need a custom integration, it just uses `gh`. The authentication, pagination, and error handling are already built in.
Building custom protocol servers (like MCP servers) for each of these would mean duplicating enormous amounts of work that's already been done well. The CLI acts as a universal adapter layer that's been refined over decades.
## CLI vs. MCP: the emerging debate
The Model Context Protocol (MCP) was designed to standardize how AI models interact with external tools. It's a useful abstraction, but it introduces real overhead: every integration requires building and maintaining a separate server, learning the SDK, handling edge cases, and keeping up with protocol changes.
The CLI approach sidesteps most of this complexity. Instead of a custom server, the agent just executes shell commands against existing tools. As one analysis put it: "The future of AI agent integrations isn't a new protocol. It's the one we've had all along."
That said, MCP still makes sense for services without CLI tools, for complex stateful interactions, and for real-time streaming. The practical guidance emerging in the community is straightforward:
1. **Default to CLI** if a tool exists
2. **Wrap with a script** if you need a simple CLI interface for an API
3. **Use MCP selectively** for complex, stateful integrations
## The rise of agentic CLI tools
The trend has spawned an entirely new category of developer tools, AI agents that live in the terminal:
- **Claude Code** from Anthropic, which can plan, execute, and debug across entire codebases
- **Gemini CLI** from Google, open-sourced with a generous free tier
- **Aider**, which connects to multiple models and integrates deeply with Git workflows
- **Cline**, which supports autonomous mode for CI/CD pipelines
These tools don't just suggest code, they navigate filesystems, run tests, manage Git operations, and coordinate changes across dozens of files. Developers report spinning up multiple CLI agents in parallel across different branches, each working on a separate feature. When people say "using AI is like having a team," that's most achievable with CLI agents.
## Context management: the hidden advantage
One underappreciated advantage of CLI agents is how they handle context. IDE agents tend to load entire conversation histories plus all open files with each interaction, which scales poorly as conversations and codebases grow, a problem known as **context pollution**.
CLI agents are more surgical. They treat context as a scarce resource. When Claude Code needs to search a repo, it runs `grep` and gets filtered results rather than loading the entire file tree. Tools like Aider build codebase maps but only read files when needed. Some agents use "progressive disclosure," where they initially see only skill names and descriptions, then dynamically load full instructions when needed.
This efficiency means CLI agents can work on larger codebases for longer sessions without degrading in quality.
## What this means for developers
The CLI renaissance has practical implications:
**If you build developer tools**, consider your CLI experience as a first-class interface, not an afterthought. Well-designed CLIs with structured output (JSON flags, semantic exit codes, and comprehensive `--help`) are now serving two audiences: humans and AI agents.
**If you write code with AI assistance**, learning terminal-based workflows will unlock a different level of productivity. The learning curve is steeper, but the ability to delegate entire tasks, refactoring, testing, migrations, is transformative.
**If you manage engineering teams**, the shift toward CLI agents changes what "using AI" looks like. It's less about inline suggestions and more about autonomous task completion, which requires different workflows and review processes.
## Looking ahead
The trajectory is clear. We're moving from AI tools that *chat about your code* to AI agents that *complete work for you*. And the terminal, transparent, composable, automatable, is proving to be the best interface for that kind of autonomy.
The irony is rich. In an era of unprecedented technological advancement, the most powerful AI tools are running in an interface that's been around since 1971. But maybe that's not ironic at all. Maybe it just means the Unix pioneers got something deeply right about how humans and machines should communicate: through simple, composable streams of text.
The CLI isn't having a comeback. It's having its moment.
## References
1. Anthropic, "Claude Code" — terminal-based AI coding agent. [Link](https://docs.anthropic.com/en/docs/claude-code)
2. Google, "Gemini CLI" — open-source CLI for Gemini models. [Link](https://github.com/google-gemini/gemini-cli)
3. Aider, "Aider: AI Pair Programming in Your Terminal." [Link](https://aider.chat)
4. Cline, "Cline: Autonomous Coding Agent for Your IDE and Terminal." [Link](https://github.com/cline/cline)
5. Google, "Google Workspace CLI (gws)" — one command-line tool for Drive, Gmail, Calendar, Sheets, Docs, Chat, Admin, and more. Includes AI agent skills. [Link](https://github.com/googleworkspace/cli)
6. Addy Osmani, "Introducing the Google Workspace CLI," March 2026. [Link](https://x.com/addyosmani/status/2029372736267805081)
7. Code Pulse, "Google Just Shipped a CLI for All of Google Workspace. And It Works With AI Agents Too," Medium, March 2026. [Link](https://medium.com/coding-nexus/google-just-shipped-a-cli-for-all-of-google-workspace-and-it-works-with-ai-agents-too-204fe2bbd2f6)
8. Model Context Protocol (MCP), "Introduction." [Link](https://modelcontextprotocol.io/introduction)
9. Eric Raymond, "The Art of Unix Programming," 2003. [Link](http://www.catb.org/esr/writings/taoup/html/)
10. VentureBeat, "Google Workspace CLI brings Gmail, Docs, Sheets and more into a common interface for AI agents," March 2026. [Link](https://venturebeat.com/orchestration/google-workspace-cli-brings-gmail-docs-sheets-and-more-into-a-common)
