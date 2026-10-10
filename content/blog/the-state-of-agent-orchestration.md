---
title: "The state of agent orchestration"
date: "2026-04-21T17:23:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Agents","LLMs","MCP","Open Source","Claude","OpenAI","Microsoft","Google","Coding","CLI","IDE","DevTools","SaaS"]
---

We went from "can an AI write code?" to "how do I manage a fleet of AI agents writing code simultaneously?" in about a year. The coding agent itself is becoming commoditized. Claude Code, Codex, Gemini CLI, Cursor, Amp, OpenCode, the list keeps growing. The hard part is no longer getting an agent to write a function. It's coordinating ten of them across a real codebase without everything falling apart.
A new layer of tooling has emerged to solve exactly this problem. Agent orchestration, the infrastructure that sits between you and your fleet of AI coders, is quickly becoming the most interesting space in developer tooling. Here's what the landscape looks like right now.
## The agents themselves
Before talking about orchestration, it helps to understand what's being orchestrated.
**OpenAI Codex** started as a cloud-based software engineering agent launched in May 2025. It runs tasks in sandboxed environments preloaded with your repository, handling everything from writing features to proposing pull requests. It has since evolved into a full platform with a CLI, desktop app, IDE integrations, and a skills system that extends it beyond pure code generation. Over 3 million developers use it weekly.
**Claude Code** from Anthropic takes a different approach. It's an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development environment. It works in your terminal, IDE, desktop app, and browser. The Agent SDK (formerly the Claude Code SDK) lets you build production agents with the same tools that power Claude Code itself. Anthropic also recently launched Claude Managed Agents for long-running autonomous work in the cloud.
Both are powerful individually. But the real shift is that developers stopped asking "which agent is best?" and started asking "how do I use all of them at once?"
## The parallelization problem
The core issue is simple. A single coding agent works on a single task in a single context. If you have ten things to build, you wait ten times as long, or you open ten terminals and manually babysit each one. That doesn't scale.
What you actually want is isolated workspaces (so agents don't step on each other's code), a unified interface (so you can see what everything is doing), and a review workflow (so you can quickly evaluate and ship the output). This is what the new wave of tools provides.
## Agent environments and interfaces
The first category of tools focuses on giving you a better workspace for running multiple agents.
**Superset** is a desktop application that lets you run 10+ CLI coding agents in parallel on your machine. Each task gets its own git worktree, so agents never interfere with each other. It includes a built-in diff viewer, terminal, and one-click handoff to your preferred editor. The philosophy is pragmatic: Claude Code is brilliant half the time and goes off the rails the other half, so launch many agents at once and pick the best result.
**Superconductor** takes a similar approach but is built entirely in Rust with no Electron. It's a native macOS app that supports unlimited parallel agents, rendering the terminal on the GPU for performance. It supports Claude Code, Codex, Amp, OpenCode, Gemini, and others. Each agent gets a live browser preview, so you can review frontend changes in real time from desktop or mobile.
**Jean**, created by András Bácsai (the creator of Coolify), is an opinionated desktop app built with Tauri. It manages multiple projects, worktrees, and chat sessions with Claude CLI, Codex CLI, and OpenCode. It automates common git operations like reviewing code, creating commits, opening PRs, and resolving merge conflicts. Everything runs locally with no vendor lock-in.
**Craft Agents** from the team behind [Craft.do](http://Craft.do) is an open-source agent interface under Apache 2.0. It uses the Claude Agent SDK and the Pi SDK side by side, emphasizing a document-centric workflow over a code-centric one. It supports connecting any API or MCP server, multitasking across sessions, and deep customization. The team builds Craft Agents using Craft Agents itself, with no code editors involved.
## Orchestration and project management
The next layer up focuses on task management and workflow orchestration, treating agents less like tools and more like team members.
**Vibe Kanban** is a Y Combinator-backed tool that wraps a kanban board around AI coding agents. You create issues, prioritize them, and assign them to agent workspaces. Each workspace gives an agent a branch, a terminal, and a dev server. You can review diffs, leave inline comments that go directly to the agent, preview your app with built-in devtools, and create pull requests, all from one interface. It supports switching between 10+ coding agents including Claude Code, Codex, Gemini CLI, and Cursor.
The insight behind Vibe Kanban is that the bottleneck has shifted. It used to be the speed of writing code. Now it's how quickly humans can plan, review, and keep on top of the work that AI produces. Time spent watching coding agents work is time wasted.
**Conductor** (the Mac app from [conductor.build](http://conductor.build), not to be confused with Netflix's workflow engine of the same name) is purpose-built for orchestrating teams of coding agents. It creates parallel Codex and Claude Code agents in isolated workspaces, lets you see what they're working on at a glance, then review and merge their changes. Microsoft also released their own CLI tool called Conductor for defining and running multi-agent workflows with the GitHub Copilot SDK and Anthropic Agents SDK.
## The management layer
Some tools go further, aiming to be the organizational infrastructure for entire AI workforces.
**OpenClaw** is an open-source AI agent that went from zero to one of the fastest-growing repositories in GitHub history after launching in late January 2026. It runs on your machine as a local gateway process, connects to messaging platforms you already use (WhatsApp, Telegram, Slack, Signal), and routes messages through an LLM-powered agent that can take real-world actions: shell commands, browser automation, email, calendar, and file operations. It's model-agnostic, working with Claude, GPT, Gemini, or local models through Ollama. For multi-agent setups, it supports agent bindings that route different channels to different specialized agents.
**Paperclip** sits at the most ambitious end of the spectrum. It's an open-source orchestration framework for running what it calls "zero-human companies" with AI agent teams. While most tools focus on the agent's brain (reasoning and decision-making), Paperclip focuses on the organizational body: org charts, reporting lines, cost budgets, audit trails, and governance controls. It supports agents from OpenClaw, Claude Code, Codex, Cursor, or any HTTP-based agent. The thesis is that the bottleneck is no longer capability but coordination. When you deploy three capable agents without structure, you don't get a team, you get chaos.
## What's driving this explosion
Several forces are converging to make agent orchestration a critical layer.
**Agents are commoditizing fast.** Every major AI company now ships production-ready agent SDKs. The Model Context Protocol (MCP) is emerging as a universal connectivity standard. When the agents themselves are interchangeable, the value shifts to how you coordinate them.
**The economics favor parallelism.** Running five agents for 10 minutes is often cheaper and faster than running one agent for 50 minutes. Isolated worktrees make this safe. The tools that enable this workflow create real leverage.
**Human review is the bottleneck.** The pattern across all these tools is the same: humans should spend their time planning and reviewing, not watching agents work. Every tool in this space is essentially an answer to the question "how do I review AI output faster?"
**Context engineering matters more than prompting.** As the AI agent landscape report for 2025-2026 notes, context engineering has replaced prompt engineering as the critical discipline. Orchestration tools that manage context well, giving each agent the right information at the right time, produce dramatically better results.
## What to watch for
The space is moving fast, and a few patterns are worth tracking.
First, consolidation is inevitable. There are too many tools doing similar things with slightly different interfaces. The winners will likely be the ones that nail the review workflow, because that's where humans actually spend their time.
Second, the line between "coding agent orchestrator" and "general AI workforce manager" is blurring. Paperclip's vision of AI companies with org charts feels extreme today but may look prescient in a year.
Third, the open-source ecosystem is leading. Almost every tool mentioned here is open source. This is partly because the space is too young for proprietary lock-in to work, and partly because developers want to customize their workflows deeply.
Finally, the developer role is genuinely changing. The skill that matters most is no longer writing code. It's architecting solutions, decomposing problems into parallelizable tasks, and efficiently reviewing AI-generated output. The tools in this space are accelerating that transition.
## References
1. OpenAI, "Introducing Codex" ([https://openai.com/index/introducing-codex/](https://openai.com/index/introducing-codex/))
2. Anthropic, "Claude Code overview" ([https://code.claude.com/docs/en/overview](https://code.claude.com/docs/en/overview))
3. Anthropic, "Scaling Managed Agents: Decoupling the brain from the hands" ([https://www.anthropic.com/engineering/managed-agents](https://www.anthropic.com/engineering/managed-agents))
4. Superset, "Code Editor for the AI Agents Era" ([https://superset.sh/](https://superset.sh/))
5. Superconductor ([https://super.engineering/](https://super.engineering/))
6. Jean, "A dev environment for AI agents" ([https://jean.build/](https://jean.build/))
7. Craft Agents, "The Open Source Agent Interface" ([https://agents.craft.do/](https://agents.craft.do/))
8. Vibe Kanban, "Orchestrate AI Coding Agents" ([https://vibekanban.com/](https://vibekanban.com/))
9. Conductor, "Run a team of coding agents" ([https://docs.conductor.build/](https://docs.conductor.build/))
10. OpenClaw ([https://openclaw.ai/](https://openclaw.ai/))
11. Paperclip, "The human control plane for AI labor" ([https://paperclip.ing/](https://paperclip.ing/))
12. Milvus Blog, "What Is OpenClaw? Complete Guide to the Open-Source AI Agent" ([https://milvus.io/blog/openclaw-formerly-clawdbot-moltbot-explained-a-complete-guide-to-the-autonomous-ai-agent.md](https://milvus.io/blog/openclaw-formerly-clawdbot-moltbot-explained-a-complete-guide-to-the-autonomous-ai-agent.md))
13. Tao An, "AI Agent Landscape 2025-2026: A Technical Deep Dive" ([https://tao-hpu.medium.com/ai-agent-landscape-2025-2026-a-technical-deep-dive-abda86db7ae2](https://tao-hpu.medium.com/ai-agent-landscape-2025-2026-a-technical-deep-dive-abda86db7ae2))
14. Addy Osmani, "The future of agentic coding: conductors to orchestrators" ([https://addyosmani.com/blog/future-agentic-coding/](https://addyosmani.com/blog/future-agentic-coding/))
