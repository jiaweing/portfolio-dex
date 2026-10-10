---
title: "The terminal won"
date: "2026-04-05"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Two years ago, if you told a room full of developers that the most important interface in software would be a blinking cursor on a black screen, most would have laughed. We spent decades building richer, more visual, more mouse-friendly development environments. Syntax highlighting, inline previews, drag-and-drop UI builders, the trajectory was clear: more GUI, less terminal.
Then AI agents showed up, and the terminal won.
Not "is winning." Not "might win." Won. The data is in, the tools have shipped, and the developers who are shipping the fastest are doing it from a prompt, not a palette.
## The scoreboard
Claude Code went from zero to the most-used AI coding tool in eight months. The Pragmatic Engineer's 2026 developer survey found it overtook both GitHub Copilot and Cursor, and 75% of respondents now use AI for at least half their engineering work. Staff-plus engineers, the ones companies pay the most to retain, are the heaviest agent users at 63.5%.
OpenAI's Codex CLI, Google's Gemini CLI, Aider, Goose, Cline, the list of terminal-first AI coding tools keeps growing. Tembo's 2026 comparison covered 15 CLI agents. Pinggy's roundup of the top five didn't even bother including an IDE-based tool. The center of gravity hasn't just shifted. It's settled.
And it's not just developer tools adopting the terminal. Google shipped a CLI for all of Google Workspace, covering Drive, Gmail, Calendar, Sheets, Docs, and more, with built-in AI agent skills. The message is clear: if you want AI agents to interact with your service, give them a CLI.
## Why the terminal was always the right interface
The reason is almost embarrassingly simple. Large language models think in text. They generate text, consume text, and reason about text. The terminal is a purely text-based environment where stdout from one program flows directly into stdin for another.
An IDE is a visual environment with tabs, scroll positions, unsaved buffers, and complex UI state. An AI agent navigating a GUI is like asking someone to write a letter while wearing oven mitts. It works, technically, but you're fighting the medium.
In the terminal, there's no ambiguity. A file is written to disk or it isn't. A test passes or it fails. Exit code 0 means success, anything else means failure. The agent reads stderr, understands what went wrong, plans a correction, and tries again, all without a human touching anything.
This is what makes the terminal structurally superior for AI-driven development, not nostalgia, not aesthetics, but the fact that text-in, text-out is the native language of the models doing the work.
## The new stack is absurdly simple
The dominant AI coding setup in 2026 looks something like this: a terminal multiplexer, a CLI agent, git, and shell scripts. That's it.
Developers report spinning up multiple CLI agents in parallel across different branches, each working on a separate feature. One refactors authentication, another writes tests, a third updates documentation. The developer reviews diffs, approves commits, and moves on.
The old stack required an IDE with dozens of extensions, a plugin ecosystem, configuration files for each tool, and regular maintenance when things broke. The new stack requires a terminal and an API key.
Warp, the GPU-accelerated terminal written in Rust, reportedly ships over 50% of its own PRs using its built-in AI agent. Claude Code's own team writes around 95% of their code through Claude Code. Boris Cherny, the project lead, says 100% of his personal contributions over recent months were written through the tool, not assisted by it, but written through it.
This is what the new stack looks like in practice: you describe what you want, the agent does it, and you review the result.
## Vibe coding found its natural home
Andrej Karpathy coined the term "vibe coding" in early 2025 to describe writing software by describing intent in natural language and letting AI handle implementation. You focus on the vibe of what you're building, not the syntax.
The terminal turned out to be where this workflow actually works. No buttons, no menus, no dropdowns, just a prompt where you describe what you want. The agent reads your codebase, writes changes, runs tests, and iterates until the task is done.
In a GUI, vibe coding feels like dictating to someone while they navigate a complex control panel. In a terminal, it feels like conversation. You say what you want. It happens. You say what to fix. It's fixed.
The simplicity isn't a limitation. It's the feature. When your primary interaction with a coding tool shifts from "type code in an editor" to "describe what you want and review the output," the graphical chrome becomes overhead, not advantage.
## The counterpoint is real, and shrinking
VS Code with Copilot is still the most common setup for the majority of developers. The Stack Overflow 2025 Developer Survey found that 52% of developers either don't use AI agents or stick to simpler AI tools. Enterprise procurement, not individual preference, often dictates tool choice, with large companies (10,000+ employees) still favoring Copilot at 56%.
Visual debugging is still better in an IDE. Setting breakpoints, inspecting variables, stepping through execution, these are fundamentally visual activities. File navigation at scale, the extensions ecosystem, onboarding for junior developers, IDEs still have genuine advantages in all of these.
But the trend line is unmistakable. Nine months between surveys, and Cursor grew 35% while Claude Code went from nonexistent to number one. OpenAI's Codex, which didn't exist during the previous survey, already has 60% of Cursor's usage. The momentum is all in one direction.
The IDE vendors see it too. VS Code has been aggressively integrating agent capabilities. JetBrains is building AI features. But these feel like defensive moves, bolting AI onto an interface designed for a different workflow. The most capable AI experiences aren't being added to IDEs. They're being built in terminals.
## Every AI tool has its own CLI, and that's a problem
There is a real fragmentation issue. Claude Code, Gemini CLI, Codex CLI, Aider, Goose, Cline, OpenCode, the list keeps growing. Each has its own installation, configuration, authentication flow, and quirks.
For experienced developers, this is manageable. For the broader ecosystem, it's friction. No one has won the "default AI CLI" slot the way VS Code won the "default IDE" slot. The question is whether the market consolidates around a few winners or whether the Unix philosophy of small, composable tools keeps the ecosystem distributed.
The Model Context Protocol (MCP) is one attempt at standardization, giving agents a common way to interact with external tools and services. But MCP adds its own complexity, and for many tasks, a simple CLI tool piped through shell commands works just as well at a fraction of the token cost.
The practical guidance emerging in the community is straightforward: default to CLI if a tool exists, wrap with a script if you need a simple interface for an API, and use MCP selectively for complex, stateful integrations.
## The accessibility question
If the most powerful development tools live in the terminal, does that raise or lower the barrier to entry?
The optimistic case: natural language is the most accessible interface ever created. You don't need to memorize keyboard shortcuts or navigate nested menus. You describe what you want in English. The agent handles the rest. A new developer who can articulate what they want to build can be productive in a terminal agent faster than they could learn an IDE's feature set.
The pessimistic case: terminals are still intimidating. The blank prompt offers no affordances, no hints about what's possible. The concept of piping, environment variables, and shell configuration creates friction before you even get to the AI part. For developers who grew up with graphical tools, the terminal feels like a step backward.
The likely reality is somewhere in between. Tools like Warp are already bridging this gap, adding visual affordances like syntax-highlighted editing and AI-assisted command suggestions to a terminal-first experience. The terminal won, but the terminal itself is evolving to be more approachable.
## The vim wars never ended, AI just picked a side
There's a historical parallel worth acknowledging. The vim versus IDE debate has been running for decades, and it never truly resolved. Vim users insisted that a text-based, keyboard-driven workflow was faster and more expressive. IDE users insisted that visual tooling, autocomplete, and integrated debugging were worth the overhead.
AI didn't settle the debate philosophically. It settled it practically. The tools that AI agents work best with happen to be the tools that vim users always preferred: text-based, composable, scriptable, and fast. The terminal didn't win the argument. It won the implementation.
The irony is rich. In an era of unprecedented technological advancement, the most powerful development tools run in an interface that dates back to the 1970s. But maybe that's not ironic at all. Maybe the Unix pioneers understood something fundamental about how humans and machines should communicate: through simple, composable streams of text.
The GUI made computing accessible to billions. That achievement stands. But for the specific task of building software with AI, the terminal turned out to be the better interface. Not because it's cooler or more hardcore, but because it's what the models actually need.
The terminal won. Not everyone has noticed yet. But the developers shipping the fastest already have.
## References
1. Gergely Orosz, "AI Tooling for Software Engineers in 2026," The Pragmatic Engineer, 2026. [Link](https://newsletter.pragmaticengineer.com/p/ai-tooling-2026)
2. Tembo, "The 2026 Guide to Coding CLI Tools: 15 AI Agents Compared," February 2026. [Link](https://tembo.io/blog/coding-cli-tools-comparison)
3. David Eastman, "AI Coding Tools in 2025: Welcome to the Agentic CLI Era," The New Stack, December 2025. [Link](https://thenewstack.io/ai-coding-tools-in-2025-welcome-to-the-agentic-cli-era/)
4. Pinggy, "Top 5 CLI Coding Agents in 2026," January 2026. [Link](https://pinggy.io/blog/top_cli_based_ai_coding_agents/)
5. Stack Overflow, "2025 Developer Survey: AI Section." [Link](https://survey.stackoverflow.co/2025/ai)
6. Maxwell Zeff, "How Claude Code Is Reshaping Software, and Anthropic," WIRED, January 2026. [Link](https://www.wired.com/story/claude-code-success-anthropic-business-model/)
7. Prompt Security, "The Terminal Strikes Back: AI Coding Assistants Make a CLI Comeback," 2025. [Link](https://www.prompt.security/blog/ai-coding-assistants-make-a-cli-comeback)
8. Chetan Dattaram Rane, "The Case for CLI-First Development in the Age of AI," Medium, February 2026. [Link](https://medium.com/@chetandattaramrane/the-case-for-cli-first-development-in-the-age-of-ai-5bdf4ef84a14)
9. Anthropic, "Claude Code Documentation." [Link](https://docs.anthropic.com/en/docs/claude-code)
10. Google, "Gemini CLI," GitHub. [Link](https://github.com/google-gemini/gemini-cli)
11. Addy Osmani, "Introducing the Google Workspace CLI," March 2026. [Link](https://x.com/addyosmani/status/2029372736267805081)
12. Model Context Protocol (MCP), "Introduction." [Link](https://modelcontextprotocol.io/introduction)
