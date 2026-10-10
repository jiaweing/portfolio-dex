---
title: "The subsidization era is ending"
date: "2026-04-20"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["OpenAI","Anthropic","Claude","ChatGPT","Pricing","SaaS","Open Source","Models","LLMs"]
---

You're probably paying \$20 a month for ChatGPT, Claude, or Gemini. For that, you get access to some of the most powerful technology ever built, models that cost billions to train and millions per day to run. It feels like a bargain because it is one. These companies are losing money on you, and they know it.
The AI subscription model we've all gotten comfortable with is a subsidy. And like every subsidy before it, from Uber rides to Amazon diapers, it's designed to end.
## The playbook we've seen before
If this feels familiar, it should. The pattern is straight out of the Silicon Valley growth manual: price below cost, acquire users at scale, build dependency, then raise prices once switching costs are high enough.
Uber and Lyft subsidized rides for years, burning billions to undercut taxis and build habit. After their 2019 IPOs, ride prices nearly doubled. Amazon sold products at a loss and offered free shipping to condition consumers into Prime memberships, then steadily raised the price from \$79 to \$139. The playbook works because by the time prices go up, the product has become infrastructure in your daily life.
OpenAI and Anthropic are running the same play. The \$20/month AI subscription is the \$5 Uber ride of 2026, a price point designed to hook you, not to make money.
## The numbers don't add up
The economics of running frontier AI models are brutal. OpenAI is valued at roughly \$852 billion but isn't expected to turn a profit until 2029. Anthropic's revenue has exploded to an estimated \$30 billion annualized run rate, up from \$9 billion at the end of 2025, yet margins remain thin at best.
Consider what a heavy user actually consumes. When Anthropic cut off third-party tools from accessing Claude Code subscriptions in April 2026, it revealed that some \$200/month subscribers were burning through up to \$5,000 worth of compute. Boris Cherny, head of Claude Code, acknowledged on X that subscriptions "weren't built for the usage patterns of these third-party tools." The quiet part is that they probably aren't built for power users of any kind.
Meanwhile, the infrastructure costs are staggering. Meta closed 2025 with \$72 billion in capital expenditure and projected \$115 to \$135 billion for 2026. OpenAI and Anthropic rely on cloud partnerships with Microsoft and Google respectively, but that compute isn't free, it's deferred cost that eventually shows up on the balance sheet.
## Why cheaper tokens won't save us
There's a common counterargument: inference costs are falling rapidly, so won't AI just get cheaper over time? The per-token cost is indeed dropping. But this misses a critical dynamic that economists have a name for: Jevons paradox.
William Stanley Jevons observed in the 1860s that as steam engines became more efficient at burning coal, total coal consumption went up, not down. Efficiency made coal useful for more things, which drove demand beyond what efficiency gains could offset.
The same thing is happening with AI. As models get cheaper per token, we use them for more things. Chatbots become agents. Agents run 24/7. Context windows expand from 4,000 tokens to 1 million. Multimodal inputs add images, audio, and video. Each of these consumes dramatically more compute. One analysis found that AI agent usage consumes roughly 1,500 times more tokens per user than a simple chatbot conversation.
Gartner's analysis puts it succinctly: token costs are coming down, and that will unlock new applications, but those applications are going to be more expensive, not less. The per-unit cost drops while the total bill climbs.
## The IPO pressure cooker
Both OpenAI and Anthropic are eyeing late 2026 IPOs. OpenAI has been holding informal talks with Wall Street banks and hiring finance executives to prepare. Anthropic is racing to list around the same time. Both companies are valued in the hundreds of billions, OpenAI at \$852 billion, Anthropic at \$380 billion.
Public markets don't tolerate indefinite subsidies the way venture capital does. Once these companies are publicly traded, investors will demand margins. The pressure to move from "growth at all costs" to "show me the money" will be enormous.
OpenAI's own head of product, Nick Turley, has said it plainly: "There's no world in which pricing doesn't significantly evolve." The company has already signaled that "unlimited" plans may not survive. Internal documents from 2024 projected ChatGPT Plus rising from \$20 to \$44 by 2029. Given how much the landscape has shifted since then, that timeline might be optimistic.
## What replaces the subsidy
The transition won't be a single dramatic price hike. It'll be a gradual restructuring that plays out across several dimensions.
**Usage-based pricing becomes the norm.** The flat-rate, all-you-can-eat subscription is the first casualty. Anthropic already moved to cut off third-party tools that were exploiting unlimited plans. The broader software industry is shifting from per-seat licenses to consumption-based models, and AI will lead that charge. Expect to see token budgets, overage charges, and tiered usage caps become standard.
**The market splits into tiers.** Frontier models, the ones capable of deep reasoning, complex coding, and multi-step agent workflows, will become premium products priced for enterprises and power users. Meanwhile, smaller, efficient models will handle everyday tasks at lower cost. Most casual users might not notice much change, but anyone relying on cutting-edge capabilities will pay significantly more.
**Enterprise captures the margin.** Both OpenAI and Anthropic are aggressively courting business customers. OpenAI's CRO has said enterprise revenue is set to equal consumer revenue by end of 2026. Anthropic already derives roughly 80% of its revenue from business customers, with over 1,000 customers spending more than \$1 million annually. Consumer plans may remain relatively cheap because enterprise contracts subsidize them, at least for a while.
**Open source creates a floor.** Models like Meta's Llama, Mistral, and DeepSeek provide a competitive check on pricing. If proprietary models get too expensive, more users and companies will shift to self-hosted alternatives. A 70-billion parameter Llama model can run on cloud hardware for \$25 to \$50 per day, a fraction of what equivalent API usage would cost. This competition won't keep frontier models cheap, but it will prevent the most extreme pricing.
## What this means for you
If you're building on top of AI APIs, now is the time to architect for cost flexibility. That means implementing model routing so you can direct simple tasks to cheaper models and reserve expensive ones for when they matter. It means tracking your token usage carefully and understanding your actual unit economics, not the subsidized version.
If you're a consumer enjoying \$20/month access to frontier intelligence, enjoy it while it lasts. You're living through the equivalent of \$3 Uber rides across Manhattan. The service is real, the convenience is real, but the price is artificial.
The subsidization era isn't ending because AI companies are greedy. It's ending because the math demands it. Billions in training costs, billions more in inference, shareholder pressure from impending IPOs, and usage growth that outpaces efficiency gains. Something has to give, and that something is your monthly bill.
The good news is that AI isn't going away. It's becoming essential infrastructure, which is precisely why the price will eventually reflect its true cost. The companies that survive the transition will be the ones that built enough value into their products that users pay willingly, not just because the price was too good to refuse.
## References
1. [The era of free AI is ending, here's how you'll pay for it](https://medium.com/enrique-dans/the-era-of-free-ai-is-ending-heres-how-you-ll-pay-for-it-2ae819d5e947) , Enrique Dans, Medium, March 2026
2. [Don't get too used to 'subsidized' chatbot costs](https://www.fastcompany.com/91511668/dont-get-too-used-to-subsidized-chatbot-costs) , Fast Company, March 2026
3. [Don't get used to cheap AI](https://www.axios.com/2026/03/12/ai-models-costs-ipo-pricing) , Axios, March 2026
4. [The Era of Subsidized AI Model Usage is Over, the IPOs are coming](https://www.uncoveralpha.com/p/the-era-of-subsidized-ai-model-usage) , UncoverAlpha, April 2026
5. [What Happens When AI Stops Being Artificially Cheap](https://danielmiessler.com/blog/ai-stops-being-artificially-cheap) , Daniel Miessler, March 2026
6. [The All-You-Can-Use AI Subscription Won't Last Forever](https://creatoreconomy.so/p/the-all-you-can-use-ai-subscription) , Creator Economy
7. [AI demand is inflated, only Anthropic is being realistic](https://www.cnbc.com/2026/04/17/ai-tokens-anthropic-openai-nvidia.html) , CNBC, April 2026
8. [OpenAI is rethinking ChatGPT pricing, and 'unlimited' plans may not last](https://finance.yahoo.com/news/openai-rethinking-chatgpt-pricing-unlimited-143826057.html) , Yahoo Finance
9. [OpenAI will allocate IPO shares to retail investors](https://www.cnbc.com/2026/04/08/openai-ipo-sarah-friar-retail-investors.html) , CNBC, April 2026
10. [If OpenAI is to float on the stock market this year, it needs to start turning a profit](https://www.theguardian.com/technology/2026/mar/31/openai-stock-market-flotation-profit) , The Guardian, March 2026
11. [Why you'll pay more for AI in 2026](https://www.zdnet.com/article/why-ai-costs-increasing-2026-tokens-dram-licensing-how-to-budget/) , ZDNet, January 2026
12. [AI tokens: How to navigate AI's new spend dynamics](https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-tokens-how-to-navigate-spend-dynamics.html) , Deloitte Insights
13. [Why the AI world is suddenly obsessed with Jevons paradox](https://www.npr.org/sections/planet-money/2025/02/04/g-s1-46018/ai-deepseek-economics-jevons-paradox) , NPR Planet Money, February 2025
