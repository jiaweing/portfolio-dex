---
title: "gstack"
date: "2026-04-29"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Open Source","Claude","Agents","LLMs","Prompt Engineering","CLI","DevTools","Coding","Models"]
---

In March 2026, Garry Tan, the CEO of Y Combinator, open-sourced his personal Claude Code configuration. He called it gstack. Within weeks, it had racked up over 66,000 GitHub stars, making it one of the fastest-growing developer tools of the year.
What makes gstack interesting isn't just that it's popular. It's that it represents a fundamentally different way of thinking about AI-assisted development. Instead of treating an AI coding assistant as one general-purpose tool you prompt ad hoc, gstack turns it into a structured team of specialists, each with a defined role, clear constraints, and opinionated priorities.
## What gstack actually is
gstack is an open-source collection of custom slash commands (which the project calls "skills") that run inside Claude Code and seven other compatible AI coding agents. It's MIT licensed, free, and installs in about 30 seconds.
At its core, gstack packages 23 specialist skills and 8 standalone power tools into a structured workflow system. Each slash command switches the AI into a specific operational mode with a distinct persona. There's a CEO who pressure-tests your product strategy, an engineering manager who locks your architecture, a paranoid reviewer who hunts for production bugs, a QA lead who opens a real browser and clicks through your app, and a release engineer who manages deployment.
The philosophy is straightforward: rather than prompting Claude with varying levels of context and hoping for consistent output, you assign it a defined role with clear responsibilities. This mimics how a real engineering team operates, where different people bring different judgment to different phases of work.
## The key skills
gstack's skills map to distinct phases of the software development lifecycle. Here are the ones that stand out.
### /office-hours
This is the starting point. Before any code gets written, `/office-hours` acts as a discovery consultant. It asks six forcing questions about what you're actually building, not what you said you're building.
The skill encodes the kind of pressure-testing that YC partners do when evaluating startup ideas. You might say "daily briefing app for my calendar," and it pushes back, extracting capabilities you didn't realize you were describing, challenging your premises, and giving you implementation approaches with effort estimates. The recommendation is always the same: ship the narrowest wedge tomorrow, learn from real usage, and treat the full vision as a roadmap.
People who've used it describe feeling challenged rather than just productive. That's the point.
### /plan-ceo-review
This skill activates a CEO-mode plan review. It walks through your product plan with the cognitive patterns of experienced founders, looking at market positioning, user needs, and strategic coherence. It's meant to catch product-level mistakes before they become engineering problems.
### /review
The pre-landing PR review skill. It acts as a senior engineer doing a thorough code review, auto-fixing lint issues, flagging race conditions, mapping test coverage, and building diagrams of every code branch that needs testing. It's opinionated and paranoid by design.
### /qa
This is where gstack gets genuinely interesting from a technical standpoint. The QA skill doesn't just analyze code statically. It opens a real browser using Playwright, clicks through your application, and commits regression tests. It's browser automation built into the review cycle, not bolted on as an afterthought.
### /ship
The release engineering skill. It syncs your main branch, runs tests, and opens the PR. It's the "last mile" command that turns reviewed code into a deployable artifact.
### /retro
After a sprint, `/retro` generates a structured retrospective: lines changed, commits, patterns, what went well, what to improve. It's a forcing function for learning from the work instead of just moving to the next task.
## Beyond slash commands
Starting with version 0.19, gstack also ships standalone CLI binaries for workflows that don't belong inside a coding session. `gstack-model-benchmark` runs the same prompt through Claude, GPT (via Codex CLI), and Gemini, comparing latency, tokens, cost, and quality scores across providers. `gstack-taste-update` writes design approvals and rejections from the `/design-shotgun` skill into a persistent per-project taste profile that decays 5% per week, so the system gradually learns your aesthetic preferences.
These tools show that gstack is evolving beyond prompt configuration into something more like an opinionated development platform.
## Why it matters
The deeper insight behind gstack isn't about the specific skills. It's about what abstraction layer works for AI-assisted development.
Most approaches to AI coding fall into two camps. The first treats the AI as a code generator: describe what you want, get code back. The second builds complex tooling and infrastructure around AI agents. gstack bets on a third path: that opinionated prompts, not custom tooling, are the right abstraction layer.
The skills are pure Markdown configuration files. They require no additional libraries. The only dependency is Claude Code and an active API account. This means gstack is compatible with any project regardless of language, framework, or domain, because the role definitions are language-agnostic prompt configurations.
That's a significant design choice. It means the entire system is forkable, readable, and modifiable by anyone who can edit a text file. There's no vendor lock-in, no premium tier, no waitlist.
## The productivity claims
Tan claims gstack helped him ship over 600,000 lines of production code in 60 days while running YC full-time. His retrospective examples show 140,000+ lines added, 362 commits, and roughly 115,000 net lines of code in a single week.
These numbers deserve some skepticism. Line count is a notoriously poor measure of developer productivity, and AI-generated code can inflate metrics without proportionally increasing value. But even if you discount the raw numbers, the workflow itself, structured roles with review gates and quality checks, represents genuine engineering discipline applied to AI-assisted development.
The real question isn't whether one person can ship 600K lines. It's whether the structured approach produces better outcomes than unstructured prompting. Early adopters suggest it does, particularly for larger coding sessions where context drift and quality degradation are real problems.
## Who should use it
gstack is aimed at founders, developers, and technical leads who are already using Claude Code and want more structure around it. You need comfort with the command line and Markdown files, but not deep programming knowledge.
It's especially useful for solo developers or small teams who don't have the luxury of separate product, engineering, QA, and release roles. gstack simulates that division of labor within a single tool, applying different kinds of judgment at different stages.
If you've ever spent 30 minutes spinning on scope before touching code, or shipped something that passed your own review but failed in production because you were wearing too many hats at once, gstack addresses those failure modes directly.
## The bigger picture
gstack represents a moment in how the developer tools ecosystem is evolving. The fact that a collection of Markdown files can accumulate 66,000 GitHub stars suggests that developers are hungry not for more powerful AI, but for more structured ways to use the AI they already have.
The toolkit's rapid adoption also validates a broader trend: the best AI developer tools aren't necessarily the most technically complex. Sometimes they're just well-organized opinions about how work should flow, encoded in a format that machines can follow consistently.
Whether gstack itself becomes a lasting standard or gets absorbed into the AI coding agents it sits on top of, the pattern it establishes, role-based, phase-aware, quality-gated AI development, is likely here to stay.
## References
1. [gstack GitHub repository](https://github.com/garrytan/gstack)
2. [Garry Tan open-sources gstack: what developers should know, Augment Code](https://www.augmentcode.com/learn/garry-tan-gstack-claude-code)
3. [What Is GStack? Gary Tan's Open-Source Startup Framework for Claude Code, MindStudio](https://www.mindstudio.ai/blog/what-is-gstack-gary-tan-claude-code-framework/)
4. [GStack Tutorial: Garry Tan's Claude Code Workflow for 10K LOC/Week Development, SitePoint](https://www.sitepoint.com/gstack-garry-tan-claude-code/)
5. [gstack: Garry Tan's Claude Setup Is 🔥, ](https://www.mager.co/blog/2026-03-28-gstack-garry-tan-claude-plugin/)[mager.co](http://mager.co)
6. [gstack is not a dev tool, it's Garry Tan's brain on AI, Luong Nguyen on Medium](https://medium.com/@luongnv89/gstack-is-not-a-dev-tool-its-garry-tan-s-brain-on-ai-b813e09b32c7)
7. [gstack AI Agent overview, AI Agent Store](https://aiagentstore.ai/ai-agent/gstack)
