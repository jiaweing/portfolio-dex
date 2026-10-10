---
title: "I start any idea from Notion"
date: "2026-03-12T01:39:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Guide"]
tagColors: {"Guide":"yellow"}
postTags: []
---

Every time I have a new app idea, I don't open a code editor. I open Notion.
You've probably seen the meme by now. Someone opens an AI coding tool and types "build me a \$1M MRR app, make no mistakes." It's funny because it captures something real about where we are right now. With vibe coding and AI-assisted development, the barrier to *building* has never been lower. But that's exactly why **planning matters more than ever**.
If you can spin up a full-stack app in a day, the bottleneck isn't code anymore. It's clarity. And that's where Notion comes in for me, not as a place where I manually write out plans, but as a structured layer where Notion AI does the thinking and my coding agent stays on track.
## Why I start in Notion, not in code
When an idea hits, the temptation is to dive straight into building. But I've learned the hard way that jumping in without a plan leads to wasted hours, half-built features, and apps that don't solve the problem I originally had in mind.
Instead, I open a Notion page and start a conversation with Notion AI. I describe the idea, and the AI helps me think through it, asking clarifying questions, proposing approaches, and breaking things down. I'm not manually writing out long planning docs. The AI does the heavy lifting while I steer the direction.
Before I've written a single line of code, I already have a clear picture of the whole project, structured as tasks and to-dos that my coding agent can actually work from.
This isn't about being slow or overly cautious. It's about being intentional.
## How I actually use Notion to plan an app
My process usually follows a few steps:
**1. Brain dump the idea with Notion AI**
I start with a page and describe the app concept to Notion AI. What's the problem? What's the solution? Who would use this? The AI helps me explore the idea, asks questions I hadn't considered, and starts organizing my thoughts. I'm not writing walls of text myself. I'm having a conversation and letting the AI structure the output.
**2. Define the scope**
Notion AI helps me break the idea into features and prioritize them. What's the MVP? What can wait for v2? The AI proposes a breakdown, I refine it, and we iterate until the scope feels right. Notion's flexibility shines here because the AI can rearrange blocks, nest pages, and build out a hierarchy without any friction.
**3. Assess the difficulty**
This step is crucial. For each feature, the AI and I think through how hard it will be to build. Is it a simple CRUD operation or does it need complex integrations? Does it require authentication, payments, or third-party APIs? This helps me estimate effort and spot potential blockers before they become real problems.
**4. Create a structured task list**
Once we know what needs to be built, Notion AI turns the feature list into a structured set of to-dos and tasks right in my workspace. Each task gets a status, priority, and relevant context. This becomes my roadmap, and more importantly, it becomes the source of truth that my coding agent reads from.
**5. Connect to Claude Code over MCP**
Here's where it all comes together. My Notion workspace is connected to Claude Code through the Model Context Protocol (MCP). This means Claude Code can read my Notion tasks, understand the current state of the project, and know exactly what to work on next. I don't need to copy-paste plans or re-explain context. Claude Code pulls it directly from Notion, and as it completes tasks, the state stays in sync. Notion is the structured layer that keeps everything on track.
![](/content/blog/i-start-any-idea-from-notion/image-1.webp)
## The real value of this workflow
There's a reason experienced developers always say "think before you code," and it's not because they're slow. It's because they've seen what happens when you don't.
Using Notion AI for planning and MCP for execution gives me three things:
- **Clarity on scope.** Notion AI helps me nail down exactly what I'm building before I start. No feature creep, no wandering. The structured plan keeps me honest.
- **A realistic difficulty assessment.** Some ideas sound simple but are actually complex under the hood. Talking it through with the AI forces me to confront that early, not after I've already sunk hours into building.
- **A live connection between planning and execution.** Because Claude Code reads directly from my Notion tasks over MCP, there's no handoff gap. The coding agent always knows the current state, what's done, what's next, and what the context is. I'm not starting from "build me an app." The agent is starting from a structured, up-to-date task list with full context.
## Why this matters in the age of vibe coding
Vibe coding, a term coined by AI researcher Andrej Karpathy in early 2025, describes a workflow where you guide an AI assistant to generate and refine code through conversation rather than writing it yourself. Tools like Claude Code, Cursor, Replit, and others have made it possible for anyone to build functional software in hours rather than months.
But here's the thing: the easier it is to build, the more important it is to know *what* to build. When the cost of building is near zero, the only real differentiator is the quality of your thinking.
That's why I start in Notion. Not because I'm afraid of code, but because Notion AI gives me unlimited access to frontier models for the planning phase, and the MCP connection means that planning seamlessly flows into execution. Notion becomes the structured layer where the project state lives, and Claude Code becomes the hands that build it.
## A practical example
Say I want to build a habit tracker app. Instead of immediately prompting a coding agent to build one, I'd open Notion and start a chat with Notion AI:
- What habits should it track?
- Do I need streaks, reminders, or analytics?
- Should it be a web app, a mobile app, or both?
- What's the simplest version that's actually useful?
The AI helps me think through these questions, pushes back on unnecessary complexity, and structures the answers into a clear plan. After 30 minutes, I might realize that what I really need isn't a full app at all, just a simple daily checklist with a weekly summary. That saves me from building something overengineered that I'll abandon in a week.
Or I might realize the idea is bigger than I thought and needs to be broken into phases. Either way, I'm making that discovery in a conversation with Notion AI, not in a half-built codebase. And when I'm ready to build, Claude Code already has the task list waiting over MCP.
## The takeaway
If you're building apps with AI, whether you're a developer or a non-technical founder, try starting in Notion first. Let Notion AI help you think through the idea, break it into pieces, and assess the difficulty. Let it create a structured task list. Then connect it to your coding agent over MCP and let execution flow from there.
The meme says "build me a \$1M MRR app, make no mistakes." But the real no-mistake move is having a structured planning layer that your coding agent can read from, so it always knows exactly what to build next.
## References
1. Andrej Karpathy on vibe coding (2025), as documented by Google Cloud: [https://cloud.google.com/discover/what-is-vibe-coding](https://cloud.google.com/discover/what-is-vibe-coding)
2. Anthropic, "Introducing the Model Context Protocol," November 2024: [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
3. Model Context Protocol, "What is MCP?": [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
4. Notion for software project management, Shift Asia: [https://shiftasia.com/column/notion-for-software-project-management-a-comprehensive-guide/](https://shiftasia.com/column/notion-for-software-project-management-a-comprehensive-guide/)
5. Getting started with projects and tasks in Notion: [https://www.notion.com/help/guides/getting-started-with-projects-and-tasks](https://www.notion.com/help/guides/getting-started-with-projects-and-tasks)
