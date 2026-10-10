---
title: "How I use Notion to code"
date: "2026-03-11T01:39:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Guide"]
tagColors: {"Guide":"yellow"}
postTags: []
---

Notion is not a code editor. It can't run a build, lint a file, or autocomplete an import. But over the past few months, it has quietly become one of the most important tools in my coding workflow, and it has nothing to do with writing code directly.
The reason is simple: Notion gives me unlimited AI chats powered by the best frontier models available right now, including Claude Opus 4.6 and Gemini 3.1 Pro. Rather than burning through my Claude Code usage limits on planning and thinking, I offload that work to Notion AI, where I can iterate as much as I need without worrying about cost.
Here's how I've structured that workflow.
## The problem with using coding agents for planning
Tools like Claude Code and OpenCode are incredible for hands-on coding. They can read your codebase, edit files, run commands, and ship changes. But they come with usage limits, and every message you send eats into that budget.
The issue is that planning takes a lot of back-and-forth. You might spend dozens of messages just thinking through an approach before writing a single line of code. Architecture decisions, tradeoffs, edge cases, sequencing, all of this is valuable thinking work, but it doesn't need direct access to your terminal or filesystem. Using a coding agent for this kind of deliberation is like hiring a carpenter to help you sketch a blueprint.
I wanted to separate the *thinking* from the *doing*, and Notion turned out to be the perfect place for that.
## Why Notion AI works for code planning
Notion AI now includes access to Claude Opus 4.6, which Anthropic describes as a major leap for agentic planning. It breaks complex tasks into subtasks, reasons through edge cases, and produces structured, thoughtful output. For planning code implementations, it's exactly what I need.
What makes Notion especially useful is that the AI isn't just a chatbot sitting in a sidebar. It's deeply integrated into the workspace. I can have a long-running conversation where I iteratively refine an implementation plan, and the AI can agentically write structured to-do lists, update pages, and organize my thinking into something actionable.
A typical session looks like this:
1. I describe the feature or problem I'm working on
2. Opus 4.6 asks clarifying questions and proposes an approach
3. We go back and forth refining the plan, breaking it into concrete steps
4. The AI writes a structured to-do list with implementation steps directly in my Notion workspace
By the time I switch over to my coding agent, I already have a clear, well-reasoned plan. The coding agent's job becomes execution, not exploration.
## Connecting Notion to my codebase with MCP
The real unlock came when I connected Notion AI to my actual development tools using the Model Context Protocol (MCP). MCP is an open standard created by Anthropic that lets AI applications connect to external systems through a universal interface. Think of it like a USB-C port for AI, one standardized protocol that works across tools and data sources.
Through MCP, my Notion AI chats can connect to:
- **Claude Code and OpenCode** for context about what's currently happening in my terminal sessions and coding agents
- **GitHub** to read my existing codebase, pull requests, and repository structure
This means when I'm planning in Notion, the AI isn't working in a vacuum. It can pull in real context from my actual codebase to inform its suggestions. If I ask it to plan a refactor, it can look at the current code structure. If I'm designing a new feature, it can reference existing patterns in my repo.
This context-awareness is what elevates the planning from generic advice to specific, actionable implementation plans tailored to my project.
## How MCP bridges the gap
The Model Context Protocol works through a client-server architecture. AI applications act as MCP clients, and external tools expose their capabilities through MCP servers. The protocol is built on JSON-RPC 2.0 and provides a standardized way for AI to invoke functions, fetch data, and interact with services.
In practice, setting this up means configuring MCP servers for the tools I want to connect. GitHub's MCP server lets the AI search issues, read files, and browse repository structure. My coding agents expose their own context through MCP as well, creating a shared understanding across tools.
The beauty of this approach is that I don't need custom integrations for each pairing. Once MCP is configured, any AI client that supports the protocol can access the same tools and data.
## The workflow in practice
Here's what a typical development session looks like for me now:
**Phase 1: Plan in Notion**
I open a Notion page and start a conversation with Opus 4.6. I describe what I want to build, and the AI pulls context from my GitHub repo to understand the current state of the codebase. We iterate on the approach until I have a solid plan with clear steps.
**Phase 2: Execute in the terminal**
I switch to Claude Code or OpenCode with a well-defined plan. Instead of spending messages figuring out what to do, the coding agent can focus on implementation. The plan is already vetted, the approach is clear, and the edge cases are accounted for.
**Phase 3: Iterate**
If I hit a snag during implementation, I go back to Notion for more planning. Because Notion AI has no usage cap, I can think through problems as thoroughly as I need without watching a meter tick down.
This separation keeps my Claude Code usage focused and efficient. I'm not wasting expensive coding agent messages on work that doesn't require file access or command execution.
## Practical takeaways
If you're using AI coding agents and finding yourself burning through usage limits, here are a few things worth trying:
- **Separate planning from execution.** Use an unlimited AI chat for the thinking phase and reserve your coding agent for hands-on implementation.
- **Use the strongest reasoning model for planning.** Claude Opus 4.6 excels at breaking down complex problems and structuring implementation plans. Use it where reasoning matters most.
- **Connect your tools with MCP.** The Model Context Protocol lets your planning AI access real codebase context, which makes plans significantly more useful.
- **Structure your output.** Have the AI write to-do lists and implementation steps, not just prose. This makes the handoff to your coding agent much smoother.
- **Iterate freely on the plan.** The best implementation plans come from multiple rounds of refinement. Using an unlimited chat means you never have to cut that process short.
The tools for AI-assisted development are evolving fast. But the most impactful change in my workflow wasn't a new coding agent or a faster model. It was simply putting the right tool in the right place: Notion for thinking, coding agents for building.
## References
1. Anthropic, "Introducing Claude Opus 4.6," February 2026. [https://www.anthropic.com/news/claude-opus-4-6](https://www.anthropic.com/news/claude-opus-4-6)
2. Anthropic, "Introducing the Model Context Protocol," November 2024. [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
3. Model Context Protocol, "What is MCP?" [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
4. Notion, "Claude Opus 4.6, now in Notion," February 9, 2026. [https://www.notion.com/releases/2026-02-09](https://www.notion.com/releases/2026-02-09)
5. Claude Code Documentation, "Claude Code overview." [https://code.claude.com/docs/en/overview](https://code.claude.com/docs/en/overview)
6. OpenCode, "The open source AI coding agent." [https://opencode.ai](https://opencode.ai)
