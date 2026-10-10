---
title: "Enterprise AI"
date: "2026-04-10T22:35:00.000+08:00"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

If you've been using Claude or ChatGPT lately and noticed your limits shrinking, you're not imagining things. Rate limits are getting tighter, new premium tiers keep appearing, and the free ride is quietly ending. But this isn't a bug. It's the business model working as intended.
AI companies don't really need you, the individual subscriber. They need enterprises. And everything about the way these products are evolving reflects that.
## The rate limit squeeze is real
Anthropic confirmed in mid-2025 that it had been "adjusting" five-hour usage limits for Claude Free, Pro, and Max users during peak weekday hours. About 7% of users were affected, hitting stricter daily caps even though weekly quotas stayed unchanged on paper. The company framed it as managing demand for Claude's million-token context window, but the effect was clear: individual users got less while paying the same.
Then came weekly rate limits. In August 2025, Anthropic introduced hard weekly caps for all subscription tiers, citing a small number of users running Claude Code "continuously in the background, 24/7." One user reportedly consumed tens of thousands of dollars worth of compute on a \$200 plan. The solution wasn't better pricing, it was restricting everyone.
OpenAI followed a similar playbook. In April 2026, they launched a new \$100/month ChatGPT Pro tier, positioned between Plus (\$20) and the existing \$200 Pro plan. It promised 5x more Codex usage than Plus. But the community response told a different story: many users reported that Plus limits felt tighter than before, making the upgrade feel less like a new option and more like a forced migration.
## The economics don't lie
To understand why this is happening, follow the money.
OpenAI's enterprise revenue now makes up more than 40% of total revenue, and the company expects enterprise to reach parity with consumer revenue by the end of 2026. Sam Altman revealed that OpenAI's API business alone added over \$1 billion in annual recurring revenue in a single month. The company's total annualized revenue hit \$25 billion by February 2026, up from \$20 billion just months earlier.
Anthropic's numbers tell an even starker story. An estimated 70-80% of Anthropic's revenue comes from enterprise customers. The company grew from \$1 billion in annualized revenue in December 2024 to \$14 billion by February 2026. Claude Code alone went from zero to over \$2.5 billion in annualized billings in roughly nine months. More than 500 customers now spend over \$1 million annually with Anthropic, up from about a dozen two years ago.
Meanwhile, Menlo Ventures estimates that enterprises spent \$37 billion on generative AI in 2025, up from \$11.5 billion in 2024. That's a 3.2x year-over-year increase. Enterprise AI spend in 2026 is expected to exceed \$2.5 trillion by some estimates.
When your API customers are Fortune 10 companies paying millions per year, a \$20/month subscriber running Claude Code all day isn't a customer, it's a cost center.
## Flat-rate subscriptions were never sustainable
The core problem is simple: flat-rate subscriptions and token-based costs don't mix. Every AI query has a real compute cost. When Anthropic charges \$20/month for Pro and a power user consumes thousands of dollars in compute, the math breaks immediately.
This is why we keep seeing the same pattern. A company launches with generous limits to build market share. Usage grows. Power users emerge. The company introduces tighter limits, new tiers, or both. The generous era was marketing, not a sustainable business model.
OpenAI's own financial disclosures make this plain. The company generated \$5.5 billion in revenue in 2024 while posting a net loss of \$5 billion. Inference costs alone are projected to hit \$14.1 billion in 2026. Even at massive scale, serving individual subscribers at flat rates is a losing proposition.
The shift to enterprise is the obvious fix. Enterprise contracts are higher margin, more predictable, and come with committed spend. API usage scales linearly with revenue. A company paying per token through the API will never be a cost center, it will always be profitable at the right price point.
## The SaaS playbook repeating itself
This isn't unique to AI. It's the same trajectory every platform technology follows.
Notion is a good example. It works beautifully as a personal tool, but the business model is built around teams. Per-seat pricing, collaboration features, admin controls, revision history, they all serve the enterprise use case. A single user on a free plan isn't who pays the bills.
Slack followed the same arc. It started as a tool individual teams adopted bottom-up. But the monetization engine was always enterprise: compliance features, SSO, admin controls, premium support. The product evolved to serve whoever was writing the checks.
AI companies are just moving through this cycle faster. The consumer product builds awareness and creates pull. Developers build on the API. Enterprises adopt at scale. And gradually, the product starts optimizing for the customers who generate the most revenue.
## What this means for individual users
None of this means consumer AI products will disappear. ChatGPT still has 900 million weekly active users, and that distribution is valuable. But the relationship between AI companies and individual subscribers is shifting.
Expect continued tier inflation. Today's Pro features become tomorrow's baseline, and new premium tiers absorb the capability ceiling. Rate limits will keep tightening at lower tiers as demand grows and compute costs stay high. And the best models, the fastest inference, the largest context windows, those will increasingly be reserved for API customers and enterprise plans.
The honest framing is this: consumer subscriptions subsidize product development and distribution. Enterprise contracts fund the actual business. If you're paying \$20/month and feeling squeezed, it's because the product was never really priced for you. It was priced to get you in the door so the sales team could land your company.
## The uncomfortable truth
AI companies are building transformative technology. They're also building businesses. And businesses optimize for their most valuable customers. Right now, that means enterprises paying through the API, not individuals paying \$20/month for unlimited access to the world's most expensive computers.
The rate limits, the tier reshuffling, the quiet nerfs during peak hours, these aren't failures of product management. They're signals that the business is maturing. The question isn't whether AI companies care about individual users. It's whether the value proposition at consumer price points can survive once the enterprise business is the clear priority.
For now, the answer seems to be: barely, and only if you don't use it too much.
## References
1. [Anthropic confirms it's been 'adjusting' Claude usage limits](https://www.pcworld.com/article/3100787/anthropic-confirms-its-been-adjusting-claude-usage-limits.html), PCWorld
2. [Anthropic unveils new rate limits to curb Claude Code power users](https://techcrunch.com/2025/07/28/anthropic-unveils-new-rate-limits-to-curb-claude-code-power-users/), TechCrunch
3. [OpenAI challenges Anthropic with ChatGPT Pro subscription tier](https://www.cnbc.com/2026/04/09/openai-chatgpt-pro-subscription-anthropic-claude-code.html), CNBC
4. [OpenAI Says Enterprise AI Is Already 40% of Its Revenue](https://finance.yahoo.com/sectors/technology/articles/openai-says-enterprise-ai-already-183912683.html), Yahoo Finance
5. [OpenAI is generating over \$1 billion from something that has nothing to do with ChatGPT](https://finance.yahoo.com/news/openai-making-more-1-billion-050103061.html), Yahoo Finance
6. [Anthropic Just Hit \$14 Billion in ARR](https://www.saastr.com/anthropic-just-hit-14-billion-in-arr-up-from-1-billion-just-14-months-ago/), SaaStr
7. [The Growth Miracle and the Six Fractures: Anthropic at \$380 Billion](https://shanakaanslemperera.substack.com/p/the-growth-miracle-and-the-six-fractures), Substack
8. [2025: The State of Generative AI in the Enterprise](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/), Menlo Ventures
9. [The Revenue Models Behind Today's Top AI Platforms](https://www.pymnts.com/artificial-intelligence-2/2026/the-revenue-models-behind-todays-top-ai-platforms/), PYMNTS
10. [OpenAI Is Adding a \$100-a-Month ChatGPT Subscription Because of Vibe Coding](https://www.cnet.com/tech/services-and-software/openai-chatgpt-pro-tier-100-vibe-coding/), CNET
11. [A business that scales with the value of intelligence](https://openai.com/index/a-business-that-scales-with-the-value-of-intelligence/), OpenAI
