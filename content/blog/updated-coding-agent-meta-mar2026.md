---
title: "Updated coding agent meta (Mar 2026)"
date: "2026-03-25T12:24:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
pinned: true
---

The AI coding landscape moves fast, and so does my setup. Every few months I find myself reshuffling plans, hunting for promos, and figuring out how to get the most value out of these tools without burning through cash. Here's where things stand as of March 2026.
## The core strategy
My approach is simple: use Claude Opus to plan and reason through complex tasks, then hand off execution to cheaper models like Sonnet. Opus is incredible for architectural decisions and multi-step planning, but nobody can afford to run it for everything. The trick is layering plans so you always have a fallback when one runs dry.
## Claude Pro: the anchor plan
I'm on the base Claude Pro plan at \$20/month. There was a 50% off promo for new subscribers recently, so I locked in at about \$15 SGD/month for three months (the regular price is \$30 SGD). It includes access to Claude Code and all the core models.
Here's the honest take: usage runs out fast. Even with relatively light use, just some basic tasks here and there, I'm hitting limits quicker than expected. Part of it might be MCP skills and context window overhead, but regardless, the base Pro plan at full price isn't great value. I'll reassess after the promo period ends, but \$30 SGD/month for how quickly it depletes doesn't feel right.
For heavier users, Anthropic offers Max 5x at \$100/month and Max 20x at \$200/month, which multiply the Pro limits accordingly. Those make sense if you're coding all day, but it's a steep jump.
## Alibaba Coding Plan: the locked-in deal
This is my secret weapon. I got in on Alibaba's Coding lite plan at \$10/month before they discontinued it. They've since moved to a \$50/month pro plan as the only option, but existing light plan subscribers got their pricing locked in. The first month was only \$3.
What makes Lingma special compared to the other Chinese AI coding tools is that it's not vendor-locked to a single model. While GLM (Zhipu), MiniMax, and Kimi all tie you to their own proprietary models, Alibaba's offering spreads access across multiple models. That flexibility matters when you're routing different tasks to different models based on their strengths.
The usage is absurdly generous. Even on the light plan, I genuinely cannot exhaust it. If I were starting fresh today and could only pick one plan, the \$50 Alibaba pro plan would be a serious contender, especially paired with a strategy of using capable models for planning and cheaper ones for execution.
## Cursor: the murky middle
I have a Cursor student plan, free for one year. In theory, this is great. In practice, Cursor's pricing is one of the most confusing things in the AI coding space. Nobody seems to know exactly how much usage you get, what counts against your limits, or how the token budgets actually work.
Their paid tiers are clearer: Pro at \$20/month includes \$20 in API agent usage, Pro+ at \$60/month bumps that to about \$70, and Ultra at \$200/month gives you roughly \$400 in usage. The Composer family of models is interesting since they're trained on the massive corpus of generated code from years of Cursor users, which gives them a practical edge for common patterns. But the student plan specifics remain a black box.
## Google's offerings: anti-gravity and Gemini CLI
I have Google's student plan (free for one year), which gives me access to both anti-gravity and Gemini CLI. Here's the useful bit: these two tools have separate usage limits. If you exhaust your quota in anti-gravity, Gemini CLI still has its own pool. So you effectively get double the usage from a single Google plan.
Gemini CLI is particularly appealing. It's open source, runs directly in your terminal, and with a personal Google account you get 60 requests per minute and 1,000 requests per day for free using Gemini models. It supports MCP, has built-in tools for search, file operations, and shell commands, and the 1M token context window on Gemini models is genuinely useful for large codebases.
The downside: anti-gravity's usage has been cut significantly. The community was vocal about the reductions, and rightfully so. It used to include Claude Opus access, which made it far more valuable. Now it's more of a "use it when you need it" fallback rather than a primary tool.
## GitHub Copilot: the fallen star
As of March 12, 2026, GitHub made significant changes to the student plan. Claude Opus and Sonnet models, along with GPT-5.4, have been removed from self-selection under the Copilot Student plan. The reasoning is sustainability, keeping Copilot free for nearly two million students worldwide, but the practical impact is real.
Without premium models, the student plan's value drops considerably. The remaining standout is Gemini 3.1 Pro, but that's about it. For the paid Pro plan at \$10/month, you still get broader model access with credit-based usage, but at that point you're better off going directly to Anthropic for Claude access rather than routing through GitHub's layer.
## The vendor lock-in problem
This is the fundamental tension in the Chinese AI coding tool market right now. GLM's Coding Plan from Zhipu starts as low as \$3/month, which is incredible value. GLM-5 is legitimately impressive, a 744-billion parameter model trained entirely on Huawei Ascend chips. But you're locked into GLM models. Same story with MiniMax (whose M2.5 is designed for high-throughput agent workloads) and Kimi.
Zhipu recently hiked coding plan prices by at least 30% due to demand, and they've started limiting sales due to compute constraints. That's the risk with single-vendor plans: you're at the mercy of their capacity and pricing decisions.
Alibaba's multi-model approach avoids this entirely. Even if one model underperforms for a specific task, you can route to another without switching plans or tools.
## The free tier safety net
Beyond the main stack, there's a surprising amount of free tooling that works as overflow when everything else runs dry.
**Codex (ChatGPT free plan)** is my absolute last resort. OpenAI's free tier gives you access to Codex for coding tasks, and while the usage is limited and the experience isn't as polished as Claude Code or Cursor, it's zero cost. When every other plan is exhausted, having ChatGPT open in a browser tab as a fallback costs nothing.
**Ampcode** is interesting because it offers \$10 of free usage daily. That's a generous refresh cycle, effectively giving you a renewable pool of compute each day. For burst coding sessions or quick tasks, this is a solid option to slot in before burning through paid plans.
**OpenCode**, **Kilocode**, **OpenRouter**, and **NVIDIA** all provide access to free models. OpenCode and Kilocode are open-source coding tools that let you connect to free model endpoints, OpenRouter aggregates multiple providers and surfaces free-tier models you can route to, and NVIDIA offers free model endpoints through their API catalog. The quality varies, but for straightforward code generation and editing tasks, free models through these platforms can handle the job.
The pattern here is clear: layer your free options so there's always something available. Even if no single free tool replaces a paid plan, stacking them means you rarely hit a true dead end.
## My current stack, ranked
1. **Claude Pro** (anchor, \$15 SGD/month on promo) for planning with Opus and general use with Sonnet
2. **Alibaba Coding plan** **lite **(\$10/month, locked in) for when Claude runs out, generous multi-model usage
3. **Cursor student plan** (free) for IDE-integrated agent workflows
4. **Gemini CLI** (free with Google account) for terminal-based coding and as a separate usage pool
5. **Anti-gravity** (free with Google student plan) for additional Claude/Gemini access when needed
6. **GitHub Copilot student plan** (free) for Gemini 3.1 Pro access, limited value now
7. **Ampcode** (free, \$10 daily usage) for renewable daily compute
8. **OpenCode / Kilocode / OpenRouter / NVIDIA** (free models) for lightweight tasks
9. **Codex via ChatGPT free plan** (free) as the absolute last fallback
## The honest conclusion
The meta right now is messy. Everyone's cutting usage, hiking prices, or removing premium models from free tiers. The era of generous subsidized AI coding access is clearly ending.
If I were starting from zero today, I'd get the base Claude Pro plan and the Alibaba \$50 pro plan. That's \$70/month total and covers basically every scenario: Opus for planning, Sonnet for execution, and Alibaba's multi-model pool as an overflow valve. Everything else, Cursor, Copilot, anti-gravity, is nice to have but not essential.
The workaround game of stacking five different student plans and free tiers to cobble together enough Opus usage is, frankly, stupid. It's a lot of context switching between tools, different model IDs, different rate limits, and ultimately less usage than just paying for a Claude Max plan directly. But when you're optimizing for cost, you do what you have to do.
I'll revisit this in a few months. The way things are moving, it'll probably be completely different by then.
## References
1. [Anthropic Claude pricing plans](https://claude.ai/upgrade)
2. [Claude Max plan explained](https://support.claude.com/en/articles/11049741-what-is-the-max-plan)
3. [Cursor pricing and plans](https://cursor.com/pricing)
4. [Cursor models and pricing documentation](https://cursor.com/docs/models-and-pricing)
5. [Alibaba Cloud Lingma billing details](https://www.alibabacloud.com/help/en/lingma/product-overview/billing-description)
6. [GitHub Copilot student plan updates, March 2026](https://github.com/orgs/community/discussions/189268)
7. [GitHub Copilot plans and pricing](https://github.com/features/copilot/plans)
8. [Gemini CLI on GitHub](https://github.com/google-gemini/gemini-cli)
9. [Zhipu GLM coding plan price hike, Reuters](https://www.reuters.com/technology/chinese-ai-startup-zhipu-hikes-prices-coding-plan-demand-rises-2026-02-12/)
10. [Windsurf pricing plans announcement](https://windsurf.com/blog/windsurf-pricing-plans)
11. [Claude 50% off promo discussion, Reddit](https://www.reddit.com/r/ClaudeAI/comments/1rf8vkc/2026_50_off_claude_code_for_3_months_pro_plan_new/)
