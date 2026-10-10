---
title: "Turns out the wall for AI is compute"
date: "2026-05-02T19:05:00.000+08:00"
lastEdited: "2026-05-02T11:18:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Agents","LLMs","OpenAI","Anthropic","Claude","GPU","Data Centers","Pricing","SaaS","Cloud","Hardware"]
---

Everyone said 2026 would be the year of agents. They were right, just not in the way anyone expected. The agentic era arrived, and it immediately ran headfirst into a wall. Not an intelligence wall, not a capability wall, but a compute wall. The AI industry is now consuming more computing power than it can physically supply, and the consequences are cascading through every product, pricing model, and developer workflow in the ecosystem.
The signs have been building for months. Anthropic can't keep up with demand for Claude. OpenAI is burning through cash at an unprecedented rate. GitHub just moved Copilot to token-based billing. Rate limits are tightening during peak hours. Third-party tools like OpenClaw are getting banned. And somewhere in the background, millions of developers are vibe coding their way through token budgets that were never designed for this kind of usage.
This isn't one problem. It's a domino effect.
## The agentic era eats tokens for breakfast
At the start of the year, every major AI company was pitching the same vision: autonomous agents that can plan, execute, and iterate on complex tasks without human intervention. OpenAI launched Codex as a full coding agent. Anthropic pushed Claude Code as the developer's new best friend. GitHub Copilot evolved from autocomplete into something that could review, refactor, and reason across entire codebases.
The pitch was compelling. The math, however, was brutal.
Agentic workflows don't just send one prompt and get one response. A single task might trigger 10 to 50 LLM calls as the agent plans, executes sub-tasks, checks its work, and iterates. Context windows explode. Tool usage multiplies. Memory retrieval grows unbounded. NVIDIA's Jensen Huang described modern data centers as "token factories" at GTC 2026, and he wasn't exaggerating. AI computing demand has grown roughly 1,000,000x in just a few years.
The result is that inference, the cost of actually running these models, has overtaken training as the dominant compute workload. Deloitte estimates inference accounted for roughly two-thirds of all AI compute in 2026, up from a third in 2023. And enterprise AI compute needs are projected to quadruple or quintuple annually through 2030.
The industry built the most capable AI systems ever created, then discovered it couldn't run them at scale.
## Anthropic's compute crunch
No company illustrates this tension more clearly than Anthropic. Claude became the model of choice for developers in late 2025 and early 2026, partly on technical merit and partly because many users migrated away from OpenAI after its Pentagon deal. Claude Code saw its annual run-rate revenue climb past \$2.5 billion by February 2026, effectively doubling in less than six weeks.
Then the cracks appeared.
In March 2026, Anthropic quietly adjusted Claude's session limits so that peak-hour usage (weekdays 5am to 11am PT) consumed a larger share of the weekly budget. An engineer's post on X confirmed what users had already noticed: your weekly total was unchanged, but when you used Claude now mattered more than ever. Pro subscribers reported burning through their five-hour limit in just two prompts. Max users hit caps they'd never encountered before.
The Wall Street Journal reported that GPU rental prices surged, and Anthropic was plagued by frequent outages. The company began metering compute supply during peak hours, but the rollout was marred by complaints that limits were being reached far too quickly.
Anthropic's Thariq Shihipar framed it as "demand management," noting that roughly 7% of users would hit session limits they wouldn't have hit before. But for developers who had built entire workflows around Claude's availability, 7% was a lot of people.
## OpenAI's spending problem
OpenAI, meanwhile, was fighting a different battle on the same front. The company has locked in roughly \$600 billion in future data-center spending through 2030, accumulated through years of aggressive dealmaking under Sam Altman's thesis that compute scarcity was the true constraint on AI growth.
But revenue wasn't keeping pace. Reports surfaced in late April that OpenAI had missed internal revenue and new-user targets ahead of its potential IPO. CFO Sarah Friar reportedly raised concerns that revenue may not grow fast enough to cover those computing contracts. Board directors grew more probing about the data-center deals.
The company made some telling moves. Sora, its AI video generator, was discontinued on April 26, 2026, less than two years after its headline-grabbing unveiling. OpenAI said it wanted to focus on robotics and "real-world, physical tasks," but the timing was hard to ignore: developer demand for Codex had surged to 4 million weekly users, and something had to give. When compute is finite, you allocate it to whatever generates the most value, and video generation wasn't it.
The irony is sharp. OpenAI's CFO described seeing a "vertical wall of demand" for its products. The wall of demand, it turns out, looks a lot like a wall of compute.
## The OpenClaw ban and the subsidy reckoning
One of the most revealing episodes in this whole saga was Anthropic's ban on OpenClaw, a popular open-source AI agent that let users route autonomous workloads through their Claude subscription.
The math told the story. OpenClaw users were getting \$1,000 to \$5,000 worth of API-equivalent usage for a \$200 subscription. That's not a sustainable business model when you're already compute-constrained. Anthropic blocked OAuth authentication for third-party tools, forcing agent workloads onto the pay-per-token API where they belonged.
The OpenClaw ban was really a symptom of a much larger problem: AI subscriptions have been subsidized from the start. For a flat monthly fee, users could experiment freely, run coding agents, and push generous limits without thinking about the meter. That model worked when most usage was conversational, a few prompts here, a chat session there.
Agents changed the equation. A developer running Claude Code or Hermes through an agentic workflow might burn through in an hour what a casual user consumes in a month. The all-you-can-eat buffet doesn't work when some customers are backing up trucks to the door.
As one analysis put it: the era of subsidized AI model usage is over.
## GitHub Copilot goes token-based
GitHub's April announcement that Copilot would move to usage-based billing starting June 1, 2026 was another domino falling. Under the new model, users consume monthly allotments of GitHub AI Credits based on actual token consumption, including input, output, and cached tokens at published API rates.
Base subscription prices stayed the same (\$10/month for Pro, \$39 for Pro+), but the mechanics changed fundamentally. The old system of "premium requests" treated every AI interaction as roughly equal. The new system acknowledges that a quick code completion and a multi-turn agentic coding session are wildly different workloads with wildly different costs.
Developers pushed back hard. Comments in GitHub's FAQ thread raised concerns about reduced included value, less predictable usage, and whether Copilot would remain competitive with direct model APIs. As one developer put it: "You will get less, but pay the same price."
GitHub's framing was straightforward: this was necessary to keep Copilot financially sustainable amid surging demand for limited AI computing resources. In other words, the compute wall.
## The [HERMES.md](http://HERMES.md) incident and hidden costs
Perhaps the most absurd illustration of how tangled the compute economy has become was the [HERMES.md](http://HERMES.md) billing bug. Developers discovered that having the string "[HERMES.md](http://HERMES.md)" in their git commit history could silently route Claude Code billing to an "extra usage" pool, bypassing their Max plan quota entirely. One developer reported \$200 in unexpected charges from what should have been covered usage.
It's a small incident in the grand scheme, but it captures something important about the current moment. The billing systems, the rate limits, the usage tracking, none of it was designed for how people are actually using these tools now. The infrastructure, both technical and financial, was built for a world of chatbots, not a world of autonomous agents that run continuously and chain dozens of model calls together.
## Everything is vibe coded now
Here's the part that doesn't get enough attention: the demand side of this equation isn't slowing down. It's accelerating.
Nearly 80% of new GitHub developers used Copilot within their first week of joining the platform in the past year. 89% of developers report using generative AI daily. Stack Overflow data shows 41% of all code is now AI-generated. Vibe coding, the practice of building software through AI prompts without necessarily understanding the underlying code, has gone from a joke term coined by Andrej Karpathy in early 2025 to a mainstream development practice.
Every vibe-coded application is a token-consuming application. Every developer who ships code through an AI agent is feeding the compute machine. And the more these tools improve, the more people use them, the more tokens they consume, and the more pressure builds on an already strained infrastructure.
A 4-person startup called Swan AI made headlines for racking up a \$113,000 monthly Anthropic bill, with the CEO proudly calling it a feature, not a bug. "We're building the first autonomous business, scaling with intelligence, not headcount," he wrote on LinkedIn. That's the future the AI industry has been selling. It's also the future that requires more compute than currently exists.
## Where this goes
The hardware side is moving as fast as it can. NVIDIA's Vera Rubin architecture promises 10x lower token costs. Blackwell already delivers 30 to 50x performance-per-watt gains over previous generations. Morgan Stanley estimates roughly \$2.9 trillion in global data center construction costs through 2028. The U.S. alone needs to grow data center power capacity from about 30 GW to 90 GW or more by 2030.
But here's the catch that Gartner and others keep flagging: per-token costs are falling, but total spending keeps climbing because token consumption grows faster than costs fall. It's the Jevons paradox playing out in real time. Make compute cheaper, and people find ways to use more of it.
The near-term reality is more of what we've already seen. Tighter rate limits during peak hours. Usage-based pricing replacing flat subscriptions. Third-party tools getting cut off when they consume too many resources. Companies making hard choices about which products to keep and which to shut down.
The AI industry spent the last few years racing to build the most capable models possible. Now it's discovering that capability without capacity is just a demo. The wall for AI was never intelligence. It was always going to be compute.
## References
1. [Deloitte, "More compute for AI, not less"](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/compute-power-ai.html)
2. [Scientific American, "What is the AI compute crunch, and why are AI tools hitting usage limits?"](https://www.scientificamerican.com/article/what-is-the-ai-compute-crunch-and-why-are-ai-tools-hitting-usage-limits/)
3. [Wall Street Journal, "We're Using So Much AI That Computing Firepower Is Running Out"](https://www.wsj.com/tech/ai/ai-is-using-so-much-energy-that-computing-firepower-is-running-out-156e5c85)
4. [Fortune, "Anthropic faces user backlash over reported performance issues with its Claude AI chatbot"](https://fortune.com/2026/04/14/anthropic-claude-performance-decline-user-complaints-backlash-lack-of-transparency-accusations-compute-crunch/)
5. [New York Times, "OpenAI's New Model Spurs Debate Over Computing Power"](https://www.nytimes.com/2026/05/01/business/dealbook/openai-anthropic-compute.html)
6. [Yahoo Finance, "OpenAI Fell Short of Its Own Targets as Compute Costs Piled Up"](https://finance.yahoo.com/sectors/technology/articles/openai-fell-short-own-targets-111454840.html)
7. [BBC, "Claude Code users hitting usage limits 'way faster than expected'"](https://www.bbc.com/news/articles/ce8l2q5yq51o)
8. [MindStudio, "What Is the OpenClaw Ban?"](https://www.mindstudio.ai/blog/anthropic-openclaw-ban-oauth-authentication/)
9. [GitHub Blog, "GitHub Copilot is moving to usage-based billing"](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
10. [Ars Technica, "GitHub will start charging Copilot users based on their actual AI usage"](https://arstechnica.com/ai/2026/04/github-will-start-charging-copilot-users-based-on-their-actual-ai-usage/)
11. [Forbes, "The AI Subscription Buffet May Not Last Much Longer"](https://www.forbes.com/sites/ronschmelzer/2026/04/24/the-ai-subscription-buffet-may-not-last-much-longer/)
12. [Security Boulevard, "When AI Billing Breaks Trust"](https://securityboulevard.com/2026/04/when-ai-billing-breaks-trust-what-the-claude-code-backlash-says-about-ai-governance/)
13. [OpenAI, "Scaling Codex to enterprises worldwide"](https://openai.com/index/scaling-codex-to-enterprises-worldwide/)
14. [OpenAI Help Center, "What to know about the Sora discontinuation"](https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation)
15. [Business Insider, "Startup CEO Is Proud of His \$113,000 Monthly AI Bill"](https://www.businessinsider.com/startup-ceo-monthly-ai-bill-anthropic-swan-2026-4)
16. [Forbes, "AI Compute Surpasses Human Costs: Enterprise Budgets Shift"](https://www.forbes.com/sites/timbajarin/2026/04/29/ai-compute-surpasses-human-costs-enterprise-budgets-shift/)
17. [Morgan Stanley, "AI Market Trends 2026"](https://www.morganstanley.com/insights/articles/ai-market-trends-institute-2026)
18. [Zylos Research, "Inference Economics: AI Agent Compute Markets in 2026"](https://zylos.ai/research/2026-04-13-inference-economics-ai-agent-compute-markets)
