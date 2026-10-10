---
title: "The GUI lost"
date: "2026-04-23"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Agents","CLI","Vibe Coding","Coding","LLMs","OpenAI","Anthropic","Claude","Google","Open Source","MCP"]
---

Claude Code just got rebuilt for parallel AI agents running in your terminal. OpenAI's Codex operates from the command line. Google's Gemini CLI is open source and terminal-native. The best AI coding tools in 2026 are all CLI-first. The terminal won, and nobody noticed.
This wasn't supposed to happen. We spent four decades building graphical interfaces to make computers accessible, and the most powerful development interface of the AI era turns out to be a blinking cursor on a dark background.
## The GUI revolution, in brief
In 1984, Apple ran a print campaign for the Macintosh: "A funny thing happens when you design a computer everyone can use." The graphical user interface was a genuine paradigm shift. Point, click, drag. No commands to memorize. By 1990, Windows 3.0 sold 10 million copies in two years, and the question was no longer whether GUIs would replace the command line, but whose GUI would win.
GUIs lowered the barrier to entry. They made computing visual, intuitive, and forgiving. The command line retreated to server rooms and the workflows of stubborn sysadmins. For most people, the terminal was a relic.
That consensus held for about 35 years.
## What changed
AI agents don't have eyes. They don't have a mouse. They don't need a visual hierarchy or a carefully designed button placement. They read text, they write text, and they execute commands. Everything a GUI does for a human, a terminal does better for an agent.
The shift is architectural, not aesthetic. Consider what the terminal gives you: composability, scriptability, pipeability, and automation. You can chain commands together. You can feed the output of one tool into the input of another. You can run processes in parallel, in the background, headless on a server. These are properties that GUIs were never designed to have, because GUIs were designed for humans navigating with their eyes and hands.
AI agents navigate with text. The terminal is text. The match is almost too obvious.
## The evidence is everywhere
Claude Code, Anthropic's coding agent, was rebuilt with first-class support for parallel agentic sessions. Multiple agents can run from a single terminal window, each working on different parts of a codebase simultaneously. The desktop app exists, but the terminal is where the real orchestration happens. In-app file editing, integrated terminal, drag-and-drop layout for parallel sessions, SSH support. It's not a chatbot with a shell, it's the terminal reimagined as an agent coordination layer.
OpenAI's Codex CLI is an open-source local coding agent that runs entirely in your terminal. At over 75,000 GitHub stars and 700+ releases by mid-2026, it's one of the most actively developed terminal tools in the AI ecosystem. It supports MCP servers with parallel tool calls and runs on your machine with your files, no IDE required.
Google's Gemini CLI brings the same approach: an open-source AI agent that uses a reason-and-act loop with built-in tools and MCP servers, all from the command line. It works in Cloud Shell, local terminals, and even powers the agent mode in VS Code under the hood.
Cline, which started as a VS Code extension, rebuilt its agent for the terminal with CLI 2.0. The announcement was telling: "The IDE sidebar was a fine home for AI coding assistants when the job was autocomplete. But the job has changed." Developers spend less time editing individual files and more time orchestrating agents across modules, tests, and migrations. The terminal was built for exactly this kind of work.
## Why terminals are better for agents
There's a research paper from 2026, "Terminal Is All You Need," that frames this precisely. Terminal-based tools provide three things that agent-human collaboration requires: explicit turn-taking protocols, visible plan representations, and low-friction intervention mechanisms. The text stream's structure gives you all three for free. GUI-based tools have to engineer each one deliberately, and they usually don't.
Andrej Karpathy has argued that modern products should be "AI-accessible," meaning they should expose a scriptable interface that agents can understand. A CLI provides exactly that. It's a stable, text-based contract that any agent can read and execute. No parsing pixel layouts, no navigating DOM trees, no dealing with the infinite variability of graphical interfaces.
The practical advantages stack up quickly:
- **Composability**: pipe the output of one agent into another. Chain tools together in ways their creators never anticipated.
- **Scriptability**: automate entire workflows in a shell script. Trigger agents from CI/CD pipelines, cron jobs, or other agents.
- **Portability**: a terminal works on your Mac, a Linux server, a Raspberry Pi, a cloud VM. The same agent commands work everywhere.
- **Parallelism**: run ten agents in ten terminal tabs, or ten tmux panes, or ten background processes. No UI to get in the way.
- **Observability**: everything is logged as text. You can grep your agent's output, pipe it to a file, search it later. Every command, every response, every decision is captured in a format that's trivially searchable.
## The terminal renaissance
It's not just that AI agents happen to run in terminals. The terminal itself is getting better.
Warp, which now calls itself an "Agentic Development Environment," crossed 700,000 developers in 2025. Its agents edited 3.2 billion lines of code and processed tens of trillions of LLM tokens in a single year. It offers first-class support for Claude Code, Codex, Gemini CLI, and other terminal agents. The terminal as a product category is experiencing a genuine renaissance.
Ghostty, the terminal emulator built by HashiCorp co-founder Mitchell Hashimoto, launched with GPU acceleration and platform-native UI. It's a terminal that performs like a modern application while remaining fundamentally a terminal. The interest was immediate and significant.
These aren't marginal tools for power users. They represent real investment in the terminal as a primary development surface, because the industry is recognizing that the terminal is where AI-native development actually happens.
## Natural language is the new GUI
Here's the deeper irony. GUIs won in the 1990s because they replaced arcane commands with visual metaphors anyone could understand. You didn't need to know `ls -la`, you just opened a folder. The barrier to entry dropped dramatically.
AI agents are doing the same thing, but in reverse. Natural language is the new visual metaphor. You don't need to know terminal commands anymore, you just describe what you want. "Fix the failing tests." "Refactor this module to use dependency injection." "Deploy to staging." The agent translates your intent into the commands, and the terminal is where those commands execute.
Natural language maps better to text-based interfaces than to graphical ones. When you tell an agent what to do, the agent needs to execute a sequence of discrete operations, read outputs, make decisions, and execute again. That's exactly what a shell session looks like. A GUI, by contrast, is designed for spatial navigation and visual feedback, things that are useless to an entity that processes text.
The terminal didn't get easier to use. It got a translator.
## What GUIs still do well
This isn't a eulogy. GUIs still win decisively for anything spatial, visual, or creative. Design tools, video editors, 3D modeling, data visualization, anything where the output is inherently visual and the interaction is inherently spatial. You're not going to design a user interface in a terminal, and you shouldn't try.
GUIs also remain superior for discoverability. A well-designed interface shows you what's possible. A terminal requires you to already know, or to ask an agent that knows. For casual users doing casual tasks, the GUI is still the right answer.
But for development work, for anything that can be described in text and executed as a sequence of operations, the terminal has a structural advantage that no amount of GUI polish can overcome. AI agents made that advantage decisive.
## What this means for the vibe coding era
The term "vibe coding" describes the practice of describing what you want to an AI and letting it generate the code. It's programming by intent rather than by instruction. And the interesting thing is that the best interface for vibe coding isn't a pretty IDE with inline suggestions and colorful diffs. It's a shell.
In a terminal, you describe the vibe. The agent does the coding. You review the output as text, approve or redirect, and the agent continues. The feedback loop is tight, the context is clear, and there's no interface chrome getting between you and the work.
The most efficient human-AI interface for coding turns out to not need much screen real estate at all. As one developer put it: "Once you're comfortable with the terminal, a coding agent's chat window doesn't need much screen real estate anymore." The elaborate visual scaffolding of modern IDEs, the file trees, the split panes, the decorative gutters, becomes unnecessary overhead when an agent manages the files for you.
## The blinking cursor wins
We spent decades building prettier and prettier interfaces, each generation more polished than the last. And the most powerful interface for the work that matters most turned out to be the one we started with: a prompt, waiting for input.
The GUI didn't lose because it was bad. It lost because AI agents changed what "interface" means. When the user is a human with eyes and hands, you need pixels and pointers. When the user is an agent that reads and writes text, you need a terminal.
The blinking cursor was always the most honest interface. It never pretended to know what you wanted. It just waited, ready to do whatever you asked. In the age of AI agents, that turns out to be exactly the right design.
## References
1. Anthropic, "Claude Code overview," [code.claude.com/docs/en/overview](http://code.claude.com/docs/en/overview)
2. OpenAI, "Codex CLI," [github.com/openai/codex](http://github.com/openai/codex)
3. Google, "Gemini CLI: your open-source AI agent," [blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent](http://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent)
4. Augment Code, "OpenAI releases Codex CLI: what developers should know," [augmentcode.com/learn/openai-codex-cli-terminal-agent](http://augmentcode.com/learn/openai-codex-cli-terminal-agent)
5. Prompt Security, "The Terminal Strikes Back: AI Coding Assistants Make a CLI Comeback," [prompt.security/blog/ai-coding-assistants-make-a-cli-comeback](http://prompt.security/blog/ai-coding-assistants-make-a-cli-comeback)
6. [DevOps.com](http://DevOps.com), "Cline CLI 2.0 Turns Your Terminal Into an AI Agent Control Plane," [devops.com/cline-cli-2-0-turns-your-terminal-into-an-ai-agent-control-plane](http://devops.com/cline-cli-2-0-turns-your-terminal-into-an-ai-agent-control-plane)
7. "Terminal Is All You Need: Design Properties for Human-AI Agent Collaboration," [arxiv.org/html/2603.10664v1](http://arxiv.org/html/2603.10664v1)
8. Vinay Bhaskarla, "Why Command Line Interfaces Are the Secret Sauce for AI Agents," [medium.com](http://medium.com)
9. Warp, "Warp Wrapped: 2025 in Review," [warp.dev/blog/2025-in-review](http://warp.dev/blog/2025-in-review)
10. Ghostty terminal emulator, [ghostty.org](http://ghostty.org)
11. Jakob Nielsen, "History of the Graphical User Interface: The Rise (and Fall?) of WIMP Design," [jakobnielsenphd.substack.com/p/gui-history](http://jakobnielsenphd.substack.com/p/gui-history)
12. Mistral AI, "Two users, one CLI: people and agents," [mistral.ai/news/two-users-one-cli-people-and-agents](http://mistral.ai/news/two-users-one-cli-people-and-agents)
