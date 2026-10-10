---
title: "The command line never left"
date: "2026-04-25"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["CLI","Agents","Coding","DevTools","LLMs","OpenAI","Anthropic","Claude","Google"]
---

Something strange happened on the way to the AI-powered IDE future. We spent the better part of a decade building increasingly sophisticated graphical development environments, polishing tab completions, perfecting inline suggestions, and wrapping everything in Electron. Then the most capable AI coding tools arrived, and they were terminal applications.
Claude Code, Codex CLI, Gemini CLI, Aider, Amp, Droid. The tools at the bleeding edge of AI-assisted development are CLIs, not GUIs. The terminal is having a genuine renaissance, and the irony is hard to miss: the most efficient interface for AI-powered coding turned out to be the one we have had since the 1970s.
This is not nostalgia. This is a pattern.
## Why AI naturally gravitates to the terminal
The command line is, at its core, a text interface. You type text in, you get text out. AI models are, at their core, text machines. The alignment is almost too obvious.
But it goes deeper than that. CLIs are composable, scriptable, and automatable. You can pipe the output of one tool into another. You can wrap a CLI invocation in a shell script that runs on every git commit. You can chain agents together in ways that would require elaborate plugin architectures in a GUI.
As one developer put it, the terminal is "the only interface that supports the full spectrum of workflows, manual, automated, and AI-augmented, without fighting them." When a coding agent needs to read files, run tests, execute builds, check logs, and iterate on failures, the terminal is not just convenient. It is the native environment for all of those operations.
GUIs, by contrast, impose structure. That structure is helpful when a human needs visual orientation, but it becomes overhead when the primary actor is an AI agent that does not care about syntax highlighting or collapsible sidebars. The agent just needs to read and write text, execute commands, and observe results.
## The historical pattern
This is not the first time a major computing shift has rediscovered the terminal.
When containerization took off in the early 2010s, Docker made the command line the default interface for building, shipping, and running software. Kubernetes followed with kubectl. The entire cloud-native ecosystem was built around CLI tools, shell scripts, and YAML files. Infrastructure-as-code tools like Terraform and Pulumi are fundamentally terminal workflows.
Before that, the DevOps movement brought developers and operations teams together through shared command-line tooling. CI/CD pipelines are, at bottom, sequences of shell commands. The rise of git itself was a return to a text-based, terminal-first workflow after years of GUI-based version control tools like TortoiseSVN.
The pattern is consistent: whenever computing undergoes a paradigm shift that demands automation, composability, and programmability, the terminal re-emerges as the primary interface. GUIs get built on top later, once the workflows stabilize. But the foundational work happens in the terminal.
AI-assisted development is following the same trajectory.
## The MCP correction and the rise of agent skills
Thoughtworks flagged this trend directly in their April 2026 Technology Radar, identifying the "persistence or re-emergence of older and established technologies" as a macro theme in the industry. One specific example they highlighted was the return to the command line, driven in part by growing skepticism around MCP (Model Context Protocol).
MCP was hailed as transformative when it launched, a universal standard for connecting AI models to external tools and data sources. But in practice, many teams found it introduced unnecessary complexity. Every tool definition, every parameter description, every authentication flow gets dumped into the model's context window before a single task gets done. Stack a few MCP servers together and you have burned through tens of thousands of tokens on overhead alone.
The correction has been decisive. Rather than routing everything through MCP servers, developers are turning to Agent Skills, an open standard that packages instructions, executable scripts, and associated resources into portable modules that coding agents can invoke directly from the command line. GitHub shipped `gh skill` in April 2026, making it trivial to discover, install, and manage agent skills across tools like Claude Code, Codex, Cursor, and Gemini CLI.
The Claude Code plugin marketplace has further accelerated this shift, with dozens of community-built plugins that extend the CLI's capabilities. The pattern is clear: the ecosystem is converging on the terminal as the coordination layer for AI-assisted development, not a graphical IDE.
## What makes CLIs compose better
The technical argument for CLIs over GUIs in the AI era comes down to composability.
A GUI-based AI tool lives inside a specific application. It can modify files the application knows about, run actions the application exposes, and display results the application can render. Everything is mediated through the application's abstractions.
A CLI-based AI agent, by contrast, has access to the entire file system. It can read any file, write any file, execute any command, and observe any output. It can build your project, run your test suite, check your Docker logs, hit your API endpoints, and iterate on failures, all without leaving the terminal. The boundary of what it can do is the boundary of what your shell can do, which is effectively everything.
This is why developers who try CLI agents often struggle to go back. As one user described the experience: "I fell in love with the ease of this interface, the CLI. I once ran out of my Claude Code quota and ended up installing the Cursor CLI to continue my work." Once you experience an agent that can operate across your entire development environment without artificial boundaries, a tool constrained to a single IDE window feels limiting.
The composability extends to how agents work together, too. Claude Code supports agent teams using git worktrees for parallel execution. Codex runs parallel tasks through cloud sandboxes. OpenAI even released a Codex plugin for Claude Code, letting one agent delegate tasks to another, all orchestrated through the terminal.
## This is not CLI elitism
It is worth being clear about what this trend does and does not mean.
GUIs still serve important purposes. For developers who are new to a codebase, visual interfaces provide orientation. For design-heavy work, graphical tools are essential. For teams that need approachable onboarding, a chat window is less intimidating than a terminal prompt. Codex's GUI-first approach makes sense for exactly these reasons.
The point is not that everyone should abandon their IDE. The point is that for the specific use case of AI-assisted coding, where the primary workflow is giving an agent instructions and reviewing its work, the terminal turns out to be the more natural fit. It is not a step backward. It is a recognition that the best interface is the one that gets out of the way.
Thoughtworks made a broader observation in their Radar about the importance of "ensuring there are robust and even familiar foundations" during periods of rapid change. The terminal is exactly that: a stable, well-understood interface that has proven its value across decades of computing shifts.
## What this means for developer tooling
The implications for companies building developer tools are significant.
IDE plugin strategies, which dominated the first wave of AI coding tools, are running into natural limits. Plugins are constrained by the host application's APIs, they fragment across editors, and they cannot easily access resources outside the IDE's scope. This is why even Cursor, arguably the most successful GUI-first AI coding tool, has a CLI mode.
The tools that are winning developer mindshare, Claude Code, Codex CLI, Gemini CLI, are terminal-native. They treat the command line as a first-class citizen, not an afterthought. The ecosystem forming around them, from Agent Skills to plugin marketplaces to cross-agent orchestration, is all CLI-first.
For tooling companies, the strategic question is whether to double down on IDE integrations or invest in terminal-native experiences. The market seems to be answering that question already.
## The interface that endures
There is something almost poetic about it. We have spent years building increasingly complex abstractions on top of the development workflow, layers upon layers of UI, each promising to make coding more accessible and productive. Then AI arrived and stripped it all back to a blinking cursor in a terminal window.
But maybe that is the wrong framing. The terminal did not "come back." It never left. It was always there, running your builds, executing your deploys, managing your infrastructure. What changed is that AI agents need the same things the terminal has always provided: text-based I/O, universal access to the system, and the ability to compose operations without friction.
The command line is not a relic being revived by a trend. It is the foundation that every computing shift eventually rediscovers.
## References
1. Thoughtworks, "Macro trends in the tech industry \| April 2026," [thoughtworks.com](http://thoughtworks.com)
2. Oz Ural, "The CLI Renaissance: Why Developers Are Returning to the Terminal in the Age of AI and Platforms," [medium.com](http://medium.com)
3. GitHub Changelog, "Manage agent skills with GitHub CLI," April 2026, [github.blog](http://github.blog)
4. Anthropic, "Extend Claude with skills," Claude Code Docs, [code.claude.com](http://code.claude.com)
5. soulentheo, "Every AI Coding CLI in 2026: The Complete Map (30+ Tools Compared)," [dev.to](http://dev.to)
6. [paddo.dev](http://paddo.dev), "The Terminal Renaissance," [paddo.dev](http://paddo.dev)
7. Anthropic, "Claude Code overview," Claude Code Docs, [code.claude.com](http://code.claude.com)
8. [jrpospos.blog](http://jrpospos.blog), "The Terminal Renaissance in the Age of AI Coding Agents," December 2025, [jrpospos.blog](http://jrpospos.blog)
