---
title: "OpenClaw is bloated"
date: "2026-04-21T14:12:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Agents","Open Source","Claude","Anthropic","Memory","Security","Safety","Prompt Engineering"]
---

OpenClaw has over 300,000 GitHub stars. It's the fastest-growing open-source project in recent memory, outpacing Docker and Kubernetes in its early trajectory. Everyone and their dog is setting up an OpenClaw instance on a Mac Mini.
But here's the thing: 90% of its features go unused. Most people just use the Telegram channel to chat with their agent. And for that, you don't need 600,000 lines of code.
## The allure of the everything agent
OpenClaw promises a lot. It connects to WhatsApp, Telegram, Discord, Slack, Signal, IRC, iMessage, and over a dozen more platforms through bundled and community plugins. It has a heartbeat system for proactive task execution, cron jobs for scheduling, persistent memory across sessions, browser automation, shell access, file management, and a plugin ecosystem with 700+ community skills.
On paper, it sounds like the ultimate personal AI assistant. In practice, most setups look the same: one person, one Telegram bot, asking Claude to do things.
The codebase tells the story. Multiple analyses have pointed out that OpenClaw's 600,000+ lines are mostly integration bloat and noise wrapped around what is really just about 4,000 lines of core agent logic. The actual loop, the part that takes your message, reasons about it, calls tools, and responds, is tiny. Everything else is scaffolding for features that most users never touch.
## What people actually use
Talk to anyone running OpenClaw daily and the pattern is remarkably consistent. They use Telegram as their primary channel. They might set up a heartbeat to check their inbox or calendar. Maybe a cron job or two. That's it.
The dozens of channel integrations? Unused. The elaborate multi-agent workspace routing? Overkill for a single user. The community skill marketplace? Most people write their own prompts or use three or four skills at most.
This isn't a knock on the OpenClaw team. They built something genuinely impressive. But there's a growing gap between what OpenClaw offers and what people need, and that gap is filled with complexity, token costs, and debugging headaches.
## The bloat has real costs
OpenClaw's architecture makes the LLM do everything. There's really no architecture in the traditional sense, it's a collection of cron jobs that are all LLM calls. This design means the agent burns through tokens at an alarming rate. Stories of \$800 monthly API bills from unmonitored instances are not uncommon.
The bloat also affects reliability. Users report that after a few weeks of use, their OpenClaw instance starts struggling to follow simple instructions. Context windows fill up with memory artifacts, old conversation fragments, and skill definitions. A fresh install works perfectly, but the agent degrades over time as it accumulates cruft.
Debugging is another pain point. When a traditional program fails, you debug logic. When an OpenClaw agent fails, you're debugging intent, reasoning chains, tool selection, and prompt scaffolding all at once. That's exhausting in any production setting.
## Claude Code Channels does 80% of the job
In March 2026, Anthropic shipped Claude Code Channels, a native feature that lets you interact with Claude Code sessions directly from Telegram and Discord. VentureBeat called it "an OpenClaw killer."
The comparison is telling. Claude Code Channels gives you two-way conversations through Telegram, code execution on your local machine, and replies back in the same chat thread. Setup takes minutes: create a Telegram bot via BotFather, install the official plugin, and launch Claude with the `--channels` flag. No gateway process, no complex YAML configuration, no 600,000-line codebase to maintain.
Is it a perfect replacement? No. OpenClaw still wins on always-on availability since it's designed to run continuously on dedicated hardware, while Channels needs your system running. OpenClaw also has richer memory and skill systems. But for the core use case, messaging an AI agent from your phone and having it do things on your machine, Channels is simpler, cheaper, and more reliable.
## Pi agent: the minimal core
Here's something most people don't realize. The actual agent powering OpenClaw, the Pi Coding Agent by Mario Zechner, is available as a standalone tool. It's the minimal agent runtime extracted from all the OpenClaw scaffolding.
Pi is dramatically more efficient. Some benchmarks suggest it's 16x cheaper to run than a full OpenClaw setup. The agent logic is clean, readable, and modifiable in an afternoon. There's no buried abstraction, no layers of integration code between you and the model.
If you want the heartbeat and channels functionality that OpenClaw is famous for, you can replicate it with Pi plus a few plugins. Set up a Telegram bridge, add a cron-based heartbeat check, and you've got the core OpenClaw experience without the bloat. Startup is basically instant because there's very little to load.
## Hermes agent enters the chat
Then there's Hermes Agent from Nous Research, which takes a fundamentally different approach to the personal AI assistant problem. Instead of bolting on every possible integration, Hermes focuses on a built-in learning loop. It creates skills from experience, improves them during use, and builds a deepening model of who you are across sessions.
Hermes supports the same messaging platforms, Telegram, Discord, Slack, WhatsApp, Signal, and more, all through a single gateway process. But the architecture is cleaner. It has real sandboxing with five backends (local, Docker, SSH, Singularity, Modal), proper container hardening, and namespace isolation. The security story alone makes it a compelling alternative, especially given OpenClaw's well-documented vulnerability to prompt injection attacks.
What makes Hermes interesting is the "procedural memory" concept. Rather than dumping everything into a context window and hoping the model sorts it out, Hermes automatically distills execution experience into reusable skill cards. The agent genuinely improves over time instead of degrading like OpenClaw instances tend to.
## The real question
The popularity of OpenClaw proved something important: people want a personal AI agent they can message from their phone. That insight is valuable. The implementation, not so much.
You don't need 600,000 lines of code, 700 community skills, and 30+ channel integrations to have a useful AI assistant. You need a solid agent loop, one messaging channel, and maybe a heartbeat. Everything else is optional.
Claude Code Channels gives you the Telegram integration natively with zero maintenance overhead. Pi gives you the minimal agent runtime if you want more control. Hermes gives you a self-improving agent with proper security architecture. Each of these solves the actual problem, talking to an AI that does things, without the weight.
OpenClaw was the proof of concept. The next wave of personal AI agents should learn from its success and its excess. Ship the 10% that matters. Leave the rest as optional plugins for the people who actually need them.
## References
1. [OpenClaw official site](https://openclaw.ai/)
2. [What Is OpenClaw? The Open-Source AI Agent That Actually Does Things, MindStudio](https://www.mindstudio.ai/blog/what-is-openclaw-ai-agent/)
3. [4 Critical Reasons OpenClaw Is the Most Overhyped AI Tool Right Now, PCMag](https://www.pcmag.com/opinions/4-critical-reasons-openclaw-is-the-most-overhyped-ai-tool-right-now)
4. [Honest review about OpenClaw vs Claude Code after a month, Reddit](https://www.reddit.com/r/ClaudeCode/comments/1rkn2h4/honest_review_about_openclaw_vs_claude_code_after/)
5. [Pi: The Minimal Agent Within OpenClaw, Armin Ronacher](https://lucumr.pocoo.org/2026/1/31/pi/)
6. [Anthropic just shipped an OpenClaw killer called Claude Code Channels, VentureBeat](https://venturebeat.com/orchestration/anthropic-just-shipped-an-openclaw-killer-called-claude-code-channels)
7. [Hermes Agent, Nous Research](https://hermes-agent.nousresearch.com/)
8. [OpenClaw Heartbeat documentation](https://docs.openclaw.ai/gateway/heartbeat)
9. [Personal AI Agents like OpenClaw Are a Security Nightmare, Cisco](https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare)
10. [OpenClaw bloat discussion, Reddit](https://www.reddit.com/r/openclaw/comments/1soiacn/openclaw_bloat/)
