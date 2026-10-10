---
title: "My AI stack in 2026"
date: "2026-03-13T01:59:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
pinned: true
---

Most developers pick one AI coding tool and stick with it. I run a whole chain of them, and it's the most productive setup I've ever had.
The trick isn't finding the single best tool. It's layering multiple tools with different limits, price points, and strengths so you're never blocked. Here's exactly what I use in 2026 and how it all fits together.
## The coding tool chain
My primary coding tool is **Claude Code Pro** at \$20/month. It's fast, capable, and handles most of my day-to-day work. But like every subscription plan, it has usage limits, and I hit them regularly.
I also use [**Handy**](https://handy.computer) for speech-to-text input, which makes working with Claude Code significantly faster. Instead of typing out every prompt or instruction, I just speak it. It's a small addition to the workflow, but it shaves off a surprising amount of time when you're constantly feeding context to a coding agent.
Before settling on Claude Code, I was using **OpenCode**. It worked fine initially, but over time it became painfully slow. The lag to first input after opening was worse than Claude Code, and pasting large chunks of text would cause the whole thing to hang. Claude Code is just a lot snappier in comparison, which matters when you're switching between agents and tasks all day.
When I exhaust my Claude Code limits, I switch to **Google Antigravity** running **Claude Opus 4.6**. Antigravity is Google's agentic development platform, and Opus 4.6 is Anthropic's smartest model with a 1M token context window, improved planning, and stronger debugging. Running it inside Antigravity gives me access to multi-model routing and agentic workflows on top of that raw capability.
Once Antigravity is tapped out, I move to **Gemini CLI**. Since it runs on Google's own infrastructure with separate rate limits from Antigravity's Opus allocation, it gives me another full pool of usage to work with.
After Gemini, I switch to **OpenAI Codex** on the free plan, powered by GPT-5.4. Codex runs as a cloud-based coding agent that can work on tasks in parallel using isolated sandbox environments. The free tier is surprisingly usable for shorter tasks and quick iterations.
## Unlocking near-unlimited coding with Claude Code Router
This is where the setup gets interesting. Once the major providers' limits are used up, I turn to **Claude Code Router**, an open-source tool that lets you route Claude Code requests to different AI model providers. You keep the full Claude Code interface, including thinking modes, MCP servers, and slash commands, but your requests get sent to whichever backend you configure.
I connect Claude Code Router to my **Alibaba Cloud coding plan**. This plan costs just \$3 for the first month and \$10/month after that. For that price, you get access to four models through a single API key: **Qwen 3.5**, **MiniMax**, **GLM 5**, and **Kimi K2.5**. The Lite tier supports up to 18,000 requests per month, which for my workflow is practically unlimited.
The models are solid for most tasks. Qwen 3.5 in particular punches well above its price point, and the latest generation of Chinese open-source models has closed the gap with frontier models on standard coding work. Super complex architectural decisions might need a heavier model, but for the vast majority of implementation work, this plan handles it.
I actually cancelled my standalone GLM coding plan after switching to Alibaba's bundle. The dedicated GLM plan had lower limits, only included one model tied to that single provider, and cost more. When GLM 5 had a rough rollout with reduced limits, getting a full refund was the obvious move.
## Managing parallel work with Vibe Kanban
With near-unlimited model access, the bottleneck shifts from "how many tokens can I use" to "how many tasks can I run at once." That's where **Vibe Kanban** comes in.
Vibe Kanban is an open-source project management tool built specifically for AI coding agents. It uses git worktrees to let you run multiple agents in parallel, each on its own isolated branch. You create issues on a kanban board, assign them to agents, and each agent works in its own worktree without interfering with the others.
This pairs perfectly with high-volume plans like Alibaba's. I can have several agents working on different features simultaneously, each with full access to the codebase but isolated from each other's changes. Status updates happen automatically as agents start work and create pull requests.
## Coding on the go
I use **Codex** and the **Claude app** on my phone to code while I'm away from my desk. Both support cloud-based agents, so the actual computation happens remotely. I can review code, kick off tasks, and iterate on features from anywhere. It's not a replacement for a full desktop setup, but for quick fixes and keeping projects moving, it works surprisingly well.
## OpenClaw on the Pi
I run **OpenClaw** on a Raspberry Pi at home, but honestly, I don't use it for much. It handles simple web searches and reminders, and the setup was minimal. For anything more involved, I reach for Notion Custom Agents instead. They're more flexible, more integrated with my existing workflow, and far more capable for the kinds of automation I actually care about. I wrote about this in detail in my post on [how I use Notion Custom Agents](https://jiaweing.com/blog/nobody-uses-notion-custom-agents-like-me).
## Knowledge and search
For documentation, notes, and general knowledge work, I use **Notion**. Beyond the obvious note-taking, Notion has a global AI shortcut that most people miss. On Windows, you can press `Ctrl+Shift+J` to open a quick AI chat window from anywhere, even when the app is in the background. I've bound this to `Alt+Space` in the settings page, giving me the same instant-access AI chat experience that ChatGPT has on Mac.
For understanding codebases, I use **DeepWiki** from Devin. It lets me explore repos, understand their structure, see what stack they use, and reverse-engineer how they implement specific things. Google has **CodeWiki**, which does something similar, but it only supports repos they've already indexed and I'm not sure what the criteria is for inclusion. Before DeepWiki, I relied on **GitHub Copilot** directly on GitHub to ask questions about a repo. It works for simple queries, but it tends to lose the full context of the codebase. Sometimes it even thinks I'm asking about its own architecture rather than the repo I'm looking at.
For real-time search, I use **Grok**. Its integration with X gives it access to information that other search tools miss, particularly for breaking news, developer discussions, and trending topics. When Notion's search doesn't surface what I need, Grok usually fills the gap.
For deep research tasks, I use **Gemini** and **ChatGPT**. When I need to go deep on a topic, pull together multiple sources, or get a thorough analysis before making a decision, these two are my go-to tools. They each have slightly different strengths in how they synthesize and present information, so I'll often use both and compare.
## Key takeaways
**Layer your tools by limits, not just features.** Every AI service has rate limits. Instead of paying for the most expensive plan on one service, chain multiple services together. When one runs out, the next one picks up.
**Open-source routers are a game changer.** Tools like Claude Code Router let you keep a consistent coding interface while swapping out the backend model. This means you can take advantage of budget providers without learning a new tool.
**Budget plans from Chinese cloud providers are underrated.** Alibaba's coding plan offers four capable models for \$10/month with generous limits. The quality gap for everyday coding tasks is smaller than most people think.
**Parallel agents need parallel infrastructure.** Once your model access is effectively unlimited, invest in tooling like Vibe Kanban that lets you actually use that capacity. Running five agents in parallel is five times the throughput.
**Don't sleep on mobile coding.** Cloud-based agents like Codex and Claude mean your phone is a legitimate development environment for certain workflows.
## References
1. Anthropic, "Introducing Claude Opus 4.6," [https://www.anthropic.com/news/claude-opus-4-6](https://www.anthropic.com/news/claude-opus-4-6)
2. Google Antigravity, [https://antigravity.google/](https://antigravity.google/)
3. Claude Code Router, [https://github.com/musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
4. Alibaba Cloud, "Ultimate Coding Plan with Four Top-Tier Open-Source Models," [https://pandaily.com/alibaba-cloud-launches-ultimate-coding-plan-with-four-top-tier-open-source-models](https://pandaily.com/alibaba-cloud-launches-ultimate-coding-plan-with-four-top-tier-open-source-models)
5. Vibe Kanban, [https://github.com/BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban)
6. OpenAI Codex, [https://openai.com/codex/](https://openai.com/codex/)
7. Grok by xAI, [https://x.ai/grok](https://x.ai/grok)
