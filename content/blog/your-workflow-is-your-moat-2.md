---
title: "Your workflow is your moat"
date: "2026-04-06"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Every developer now has access to the same AI coding tools. Claude Code, Cursor, Copilot, Gemini Code Assist, they all work. They all generate decent code, catch bugs, and autocomplete functions. The baseline has been leveled.
So if everyone has the same hammer, what separates the developers who ship in days from the ones who ship in weeks?
It's not the model. It's the workflow.
The developers pulling ahead aren't the ones with access to a secret LLM. They're the ones who have built systems around themselves, orchestration layers, automation pipelines, and personal infrastructure that compound their output. The tool is commoditized. The wiring is not.
## The commoditization is real
A year ago, picking the right AI coding assistant felt like a meaningful decision. Today, the gap between tools has narrowed to the point where it barely matters. GitHub Copilot, Cursor, Claude Code, and Gemini Code Assist all offer strong context awareness, multi-file editing, and agentic capabilities. Matt Tanner captured this well in his 2025 breakdown of AI coding tools: the real difference in performance lies in "context understanding, agentic capabilities, and collaborative workflows," not in the raw model powering the suggestions.
This is what commoditization looks like. The individual tool becomes a utility. What you do with it becomes the differentiator.
And yet most developers are still optimizing at the wrong level. They're comparing model benchmarks, debating which autocomplete is 3% more accurate, and switching editors every quarter. Meanwhile, the developers who are actually shipping faster have moved past tool selection entirely. They've shifted their attention to the system that surrounds the tool.
## Workflow as a compound advantage
A good developer workflow isn't a single tool or a clever alias. It's a system of interconnected automations that reduce the friction between intention and execution.
Think about what slows most development cycles down:
- Context switching between tasks
- Manual setup and configuration for repetitive work
- Waiting for CI pipelines to pass (or figuring out why they failed)
- Writing boilerplate that varies only slightly between projects
- Coordinating information across tools that don't talk to each other
None of these are problems that a better code completion model solves. They're orchestration problems. And the developers who solve them build compound advantages that grow over time.
I run 13 Notion agents in my personal workspace. Each one has a single job. One drafts blog posts when I create a new entry. One processes meeting notes. One manages task prioritization. They're connected to cron-driven workflows and automated pipelines that handle the operational overhead of running a blog, managing projects, and staying organized.
This isn't because I love automation for its own sake. It's because every hour I don't spend on repetitive coordination is an hour I can spend on the work that actually matters.
## One agent, one job
The philosophy that makes this work is simple: one agent, one job.
This mirrors the microservices principle in software architecture. A single monolithic agent that tries to do everything will be fragile, hard to debug, and impossible to maintain. But a fleet of small, focused agents, each responsible for a well-defined task, is resilient and composable.
The parallels between agent design and microservices are striking. As Andrii Tkachuk has written, if you define an AI agent as "a component that uses an LLM to solve a well-defined class of tasks via a stable interface," then the architectural lessons from distributed systems apply directly. Isolation, clear interfaces, independent deployment, and failure containment all translate.
In practice, this means decomposing your workflow into discrete, automatable units. Instead of one mega-agent that handles "everything about my blog," you build separate agents for drafting, scheduling, formatting, and publishing. Each one is simple enough to reason about, test, and fix when it breaks.
And things will break. That's actually the point, because when they do, you're debugging a single, scoped component rather than untangling a monolithic mess.
## Concrete examples that matter
The power of workflow-first thinking shows up in concrete, everyday scenarios:
**Agent fleets for repetitive tasks.** Instead of manually processing each new task, you delegate to purpose-built agents. A code review agent that runs on every PR. A documentation agent that updates docs when APIs change. A testing agent that generates test cases for new functions. None of these require cutting-edge models. They require thoughtful orchestration.
**Self-healing CI/CD.** GeekyAnts documented a self-healing CI system where an AI agent reads pipeline errors, identifies the fix, and submits a pull request for review, all without human intervention. Dagger built a similar system where lint failures in CI trigger an agent that generates and commits the correction. The model doesn't need to be brilliant. It just needs to be wired into the right place in the pipeline.
**Adaptive testing.** Traditional test suites break every time the UI changes. Intent-based testing systems that understand what a test is trying to verify, rather than which DOM elements to click, can adapt to refactors without manual updates. The test suite maintains itself because the automation layer is designed around behavior, not implementation.
In each case, the competitive advantage isn't the AI model. It's the system that connects the model to the workflow.
## MCP as connective tissue
This is where the Model Context Protocol (MCP) enters the picture. MCP is an open protocol developed by Anthropic that standardizes how AI applications connect to external tools and data sources. Think of it as a USB-C port for AI: a universal interface that lets any model talk to any tool.
The value of MCP isn't in any single integration. It's in composability. When your AI coding assistant can connect to your GitHub repos, your CI pipeline, your documentation system, and your project management tool through a single standardized protocol, the automation possibilities multiply.
Before MCP, every integration was bespoke. You'd write custom glue code to connect Claude to your database, then different glue code to connect it to your file system, then more code for your issue tracker. Each connection was fragile and expensive to maintain.
With MCP, you build or install a server once, and any MCP-compatible client can use it. The November 2025 specification release marked MCP's first anniversary, and in that single year it became the de-facto standard for connecting models to context. The ecosystem now includes servers for everything from GitHub and Slack to custom internal tools.
For workflow-oriented developers, MCP is the missing piece. It's what turns a collection of isolated AI tools into an integrated system. The developer who understands MCP isn't just using AI to write code. They're using AI to orchestrate their entire development lifecycle.
## The new 10x developer
The concept of the "10x developer" has always been controversial. The original framing, that some developers are literally ten times more productive than others through raw coding ability, was always suspect.
But in the age of AI, there's a new version of this idea that actually holds up. As one DEV Community post put it bluntly: "10x individual coding speed is mostly dead. AI writes code faster than any human now. But 10x leverage is very much alive."
The new 10x developer isn't someone who types faster. They're someone who automates better. They build systems that multiply their output, not through heroic individual effort, but through thoughtful delegation to agents, scripts, and workflows.
This is a fundamentally different skill set. It requires thinking about your work as a series of processes rather than a series of tasks. It means investing time upfront to build infrastructure that pays dividends over weeks and months. And it means being comfortable with the meta-work of maintaining and improving your automation layer.
## The automation tax is real
I'd be dishonest if I didn't acknowledge the counter-argument. Workflows are fragile. Automation requires maintenance. Every agent you deploy is another thing that can break, another thing that needs updating when APIs change or requirements shift.
This is the automation tax, and it's real.
A Reddit thread in r/AI_Agents captured the sentiment perfectly: "It felt like I was maintaining infrastructure instead of experimenting with AI." When the overhead of your automation exceeds the time it saves, you've over-engineered your workflow.
The key is being honest about which tasks genuinely benefit from automation and which ones don't. Not everything needs an agent. Not every process needs a pipeline. Some of the best developers I know work with remarkably minimal tooling and still ship excellent work. The point isn't maximalism. It's optionality.
The right approach is to automate the tasks that are high-frequency, low-variance, and easily testable. Leave the creative, ambiguous, and rapidly-changing work to humans. And be willing to tear down automations that cost more to maintain than they save.
## Building your own moat
If workflow is the moat, how do you start building one?
**Start with observation.** For a week, notice every time you do something repetitive. Every manual copy-paste, every routine check, every "I always do X after Y" pattern. These are your automation candidates.
**Decompose before you automate.** Break complex workflows into discrete steps. Each step should have a clear input, a clear output, and a clear success criteria. This is the "one agent, one job" philosophy in action.
**Use MCP to connect your tools.** Don't build bespoke integrations. Use standardized protocols so your automations are portable and maintainable.
**Accept imperfection.** Your first automations will be clunky. They'll break. They'll occasionally do the wrong thing. That's fine. The goal is iteration, not perfection.
**Measure the tax.** Track how much time you spend maintaining your automations versus how much time they save. If the ratio goes negative, simplify.
The developers who will thrive in the next few years aren't the ones chasing the latest model or the newest coding assistant. They're the ones building systems that make them more effective regardless of which model is on top this quarter.
Your tools will be commoditized. Your workflow won't.
## References
1. Matt Tanner, "Best AI Coding Tools of 2025: What Tools Should You Use?" [Medium](https://medium.com/@matthewtanner91/best-ai-coding-tools-of-2025-what-tools-should-you-use-6456a720ea23)
2. "What is the Model Context Protocol (MCP)?" [modelcontextprotocol.io](http://modelcontextprotocol.io)
3. "One Year of MCP: November 2025 Spec Release" [Model Context Protocol Blog](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/)
4. Andrii Tkachuk, "Designing AI Agents Like Microservices: A Practical Mental Model for Modern Architectures" [Medium](https://medium.com/@andrii.tkachuk7/designing-ai-agents-like-microservices-a-practical-mental-model-for-modern-architectures-dbf384c664d3)
5. "Building a Self-Healing CI/CD System with an AI Agent" [GeekyAnts](https://geekyants.com/blog/building-a-self-healing-cicd-system-with-an-ai-agent)
6. Kyle Penfound, "Automate Your CI Fixes: Self-Healing Pipelines with AI Agents" [Dagger](https://dagger.io/blog/automate-your-ci-fixes-self-healing-pipelines-with-ai-agents/)
7. "The 10x Engineer in 2026: What Actually Matters (After AI Changed Everything)" [DEV Community](https://dev.to/hainanzhao/the-10x-engineer-in-2026-what-actually-matters-after-ai-changed-everything-1g9m)
8. "The maintenance tax is slowly killing my excitement for AI agents" [Reddit r/AI_Agents](https://www.reddit.com/r/AI_Agents/comments/1rcabe2/the_maintenance_tax_is_slowly_killing_my/)
9. "MCP Prompts: Building Workflow Automation" [Model Context Protocol Blog](https://blog.modelcontextprotocol.io/posts/2025-07-29-prompts-for-automation/)
10. "The Model Context Protocol's impact on 2025" [Thoughtworks](https://www.thoughtworks.com/en-us/insights/blog/generative-ai/model-context-protocol-mcp-impact-2025)
