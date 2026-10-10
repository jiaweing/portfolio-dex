---
title: "Anthropic is sneaking around"
date: "2026-04-06T20:10:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Claude is good. Maybe the best model out there for a lot of tasks. But the company behind it? I'm not so sure anymore.
Over the past year, Anthropic has built up a pattern of confusing communication, quiet policy reversals, and aggressive moves against the developer community that built around their product. Each incident on its own might be forgivable. Stacked together, they paint a picture of a company that either can't get its messaging straight or doesn't want to.
## The SDK terms fiasco
In February 2026, Anthropic quietly updated their Claude Code documentation to state that OAuth tokens from Free, Pro, and Max plans could only be used in Claude Code and [Claude.ai](http://Claude.ai). Using them in any other tool, including Anthropic's own Agent SDK, would be a terms of service violation.
The developer community immediately panicked. Gergely Orosz's post about it pulled nearly 300K views and over 170 replies. Developers who had built entire workflows on top of the Agent SDK were suddenly staring at potential account suspensions. Tools like OpenClaw, Conductor, and Zed were all at risk overnight.
Then Thariq Shihipar from Anthropic stepped in: "Apologies, this was a docs clean up we rolled out that's caused some confusion. Nothing is changing about how you can use the Agent SDK and MAX subscriptions."
Nothing is changing. Remember those words.
## Except everything changed
Except things did change. On January 9, 2026, Anthropic had already deployed server-side checks that blocked tools like OpenCode, Cline, and RooCode from authenticating with subscription OAuth tokens overnight, with zero advance warning. In March, open-source coding agent OpenCode, a project with over 125,000 GitHub stars, received legal demands from Anthropic and was forced to strip all Claude subscription authentication from its codebase.
Then came OpenClaw. Anthropic blocked Claude subscription usage with OpenClaw entirely, and confirmed that the restriction would expand to all remaining third-party harnesses in the coming weeks. They even went after system prompts, blocking OpenClaw from sending its standard system prompt when connecting to the Claude API.
If you were running any kind of automation, agent workflow, or non-coding task through these tools, you were out of luck. Anthropic made it clear: if you're paying \$200 a month for a Max subscription, you're buying access to their interface, not their model.
The question a lot of developers are asking is simple: if nothing was changing, why did everything change?
## The usage limits saga
Then there's the usage limits problem, which has been simmering since mid-2025 and still isn't resolved.
Anthropic introduced weekly rate limits for Claude Code in July 2025, claiming most users wouldn't notice. But the complaints started almost immediately and haven't stopped. The Claude Usage Limits Megathread on Reddit became one of the most active posts in the community, a rolling log of developers hitting their caps far earlier than expected.
I keep hitting this issue myself. I used up my weekly limit in just two days of normal usage, no skills, no MCP, no plugins, vanilla Claude Code. I always start a new session and I'm always on Sonnet medium. Their response? People kept using Opus.
In late March 2026, Anthropic finally acknowledged the problem on Reddit: "We're aware people are hitting usage limits in Claude Code way faster than expected. We're actively investigating... it's the top priority for the team." But that admission came months after the complaints started. One user on the Pro plan reported that out of 30 days, they could only use Claude for 12.
The Register reported claims of a roughly 60 percent reduction in token usage limits, based on a token-level analysis of Claude Code logs, with speculation that the changes were tied to cost reductions ahead of Anthropic's expected public stock offering. Anthropic denied this, but the pattern of quiet adjustments followed by belated acknowledgment hasn't exactly inspired confidence.
## The distillation accusations
In February 2026, Anthropic published a blog post accusing three Chinese AI labs, DeepSeek, Moonshot, and MiniMax, of running "industrial-scale" distillation campaigns against Claude. They claimed these labs generated over 16 million exchanges through approximately 24,000 fraudulent accounts to extract Claude's capabilities.
Distillation itself is a well-known and widely used technique. Frontier labs routinely distill their own models to create smaller, cheaper versions. The line between legitimate research use and illicit capability extraction is blurry, and analysts told CNBC that nuance was needed to distinguish between the different narratives.
Whether or not the accusations were entirely justified, the timing and framing felt strategic, coming right as Anthropic was navigating its supply chain risk designation from the Trump administration and trying to position itself as an American AI champion. It's hard not to notice when a company simultaneously restricts how paying customers use their model while loudly accusing foreign competitors of using it too much.
## Undercover mode
Then on March 31, 2026, the entire Claude Code source was accidentally leaked via a source map file shipped in a public npm package. All 512,000 lines of TypeScript, exposed for anyone to read.
Among the discoveries was something called "Undercover Mode," a system that kicks in when Anthropic employees use Claude Code to contribute to public or open-source repositories. The prompt literally tells the model: "Do not blow your cover. Never mention you are an AI."
The feature was designed to prevent internal information from leaking through AI-generated code contributions. But in a twist of irony, the Undercover Mode prompt itself contained unreleased model version numbers (Opus 4.7 and Sonnet 4.8) and internal codenames (Tengu for Claude Code, Fennec for Opus 4.6, Numbat for a model still in testing). The system built to prevent leaks became the leak.
Beyond the embarrassment, Undercover Mode raises a real question: if Anthropic employees are using Claude to write code on public repos without disclosing it, what does that mean for open-source projects that unknowingly receive AI-generated contributions? It's not illegal, but it's not exactly transparent either, especially from a company that brands itself as the safety-first AI lab.
## The real problem
None of this is about whether Claude is a good model. It is. For coding tasks, long-form reasoning, and nuanced conversation, it's genuinely excellent. More people like me would be subscribing to it right now, and fewer people would be cancelling, if Anthropic could just get their act together.
But trust is built on consistency, and Anthropic keeps undermining it. They say nothing is changing, then block third-party tools. They promise transparent usage limits, then quietly reduce them. They build a leak-prevention system that becomes the leak. They accuse competitors of misusing their model while restricting how paying customers can use it.
The pattern isn't malicious. It's more likely a fast-growing company struggling to reconcile the economics of running expensive models with the expectations of a developer community that took them at their word. But at some point, the gap between what Anthropic says and what Anthropic does becomes the story itself.
I can't fathom subscribing to it right now because of how opaque the company has been. The model is great. The company needs to do better.
## References
1. [Anthropic docs update caused mass panic about Agent SDK ban](https://www.reddit.com/r/ClaudeAI/comments/1r9365q/anthropic_docs_update_caused_mass_panic_about/) , Reddit r/ClaudeAI
2. [Anthropic's Confusing Claude Subscription Policy, Explained](https://www.engineerscodex.com/anthropic-claude-subscription-switcharoo) , Engineer's Codex
3. [Anthropic Forces OpenCode to Strip Claude Integration After Legal Demands](https://theagenttimes.com/articles/anthropic-forces-opencode-to-strip-claude-integration-after--96edcc05) , The Agent Times
4. [The Open vs Closed Debate Over AI Coding Tools in 2026](https://www.shareuhack.com/en/posts/opencode-anthropic-legal-controversy-2026) , ShareUHack
5. [Anthropic Blocks OpenClaw Users From Claude Subscriptions](https://www.sovereignmagazine.com/article/anthropic-blocks-openclaw-claude-subscriptions) , Sovereign Magazine
6. [Anthropic unveils new rate limits to curb Claude Code power users](https://techcrunch.com/2025/07/28/anthropic-unveils-new-rate-limits-to-curb-claude-code-power-users/) , TechCrunch
7. [Claude Code users say they're hitting usage limits faster than normal](https://thenewstack.io/claude-code-usage-limits/) , The New Stack
8. [Anthropic admits Claude Code users hitting usage limits 'way faster than expected'](https://www.devclass.com/ai-ml/2026/04/01/anthropic-admits-claude-code-users-hitting-usage-limits-way-faster-than-expected/5213575) , DevClass
9. [Claude devs complain about surprise usage limits](https://www.theregister.com/2026/01/05/claude_devs_usage_limits/) , The Register
10. [Detecting and preventing distillation attacks](https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks) , Anthropic Blog
11. [Anthropic accuses DeepSeek, Moonshot and MiniMax of distillation attacks on Claude](https://www.cnbc.com/2026/02/24/anthropic-openai-china-firms-distillation-deepseek.html) , CNBC
12. [Claude Code Undercover Mode: What the Leaked Source Actually Reveals](https://wavespeed.ai/blog/posts/claude-code-undercover-mode-leaked-source/) , Wavespeed AI
13. [Here's what that Claude Code source leak reveals about Anthropic's plans](https://arstechnica.com/ai/2026/04/heres-what-that-claude-code-source-leak-reveals-about-anthropics-plans/) , Ars Technica
14. [Anthropic Claude Code Leak](https://www.zscaler.com/blogs/security-research/anthropic-claude-code-leak) , Zscaler ThreatLabz
