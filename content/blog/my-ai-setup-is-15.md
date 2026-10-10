---
title: "My AI setup is $15"
date: "2026-04-14T16:51:00.000+08:00"
lastEdited: "2026-04-29T12:40:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Notion","Coding","Models","Pricing","Cloud","China","LLMs","Agents","Productivity","Economics"]
---

Most people spend \$20 a month or more on a single AI subscription. ChatGPT Plus is \$20. Claude Pro is \$20. And if you want coding assistance on top of that, you're looking at another \$20 to \$200 depending on the plan. My entire AI setup costs \$15 a month, and it covers both my creative work and my coding workflow.
Here's how I pulled it off.
## The \$5 Notion AI setup
A lot of the creative work I do lives in Notion. Writing, planning, organizing, drafting contracts, building databases, all of it happens inside one workspace. And right now, I'm paying just \$5 a month for the Business plan, which includes unlimited Notion AI with access to all the latest models: Gemini, Claude, ChatGPT, you name it.
That price sounds impossible, and honestly, it kind of is. I got grandfathered in.
Here's the backstory. Notion used to sell AI as a separate add-on for \$10 per user per month. Back then, I was on the student plan, which gave me 50% off, bringing the AI add-on down to \$5. I wasn't even that excited about it at the time, but I decided to buy it anyway because the unlimited usage across all models seemed like a good deal.
Then in May 2025, Notion restructured their pricing. They eliminated the standalone AI add-on entirely and bundled full AI access into the Business plan, which now costs \$20 per user per month (or \$15 with annual billing). The Plus plan at \$10 per month only gets you a limited AI trial. If you want the full experience with AI Agents, Ask Notion, and access to all the frontier models, you need Business.
But here's the thing: existing users who had already purchased the AI add-on were grandfathered into their old pricing. So my \$5 student rate stuck. I didn't even know they were deprecating the add-on when I bought it. Pure luck.
What makes this especially valuable is that Notion AI isn't just a chatbot. It works directly with databases, dashboards, and documents. When I draft a contract, it comes out as an actual document I can share and use, not something buried in a chat thread. When I build a database, AI can populate properties, write formulas, and summarize content right where the data lives. The output is quantitative and usable in a way that standalone chat interfaces just can't match.
## The \$10 coding setup
For coding, I use Alibaba Cloud's Model Studio Coding Plan. This is a flat-rate subscription that gives you API access to multiple top-tier models under a single API key: Qwen 3.5 Plus, GLM-5, Kimi K2.5, and MiniMax M2.5, among others.
I got in on the Lite plan when it first launched at \$3 for the first month. It's now \$10 per month at regular price, which gives you 18,000 requests per month and 1,200 requests per 5-hour window. That's a generous amount of usage for individual coding work.
The model I've been using most is GLM-5, and there's a good reason for that. GLM-5 is a 744 billion parameter mixture-of-experts model from [Z.AI](http://Z.AI) (formerly Zhipu AI), with 40 billion active parameters. It scores 50 on the Artificial Analysis Intelligence Index, making it the top-ranked open-weights model, a milestone since no open-weights model had previously hit that mark. On SWE-bench Verified, it scores 77.8, which puts it right behind Claude Opus 4.5 at 80.9 and ahead of many proprietary models. For systems engineering and long-running agentic coding tasks, it punches well above its weight.
I've tried the other models on the plan too. Kimi K2.5 and MiniMax M2.5 are solid, but GLM-5 has consistently given me the best results, especially for the kind of code work I do. The benchmarks back this up, and in practice, the difference is noticeable.
There's also a Pro plan at \$50 per month that includes Qwen 3.6 Plus, the latest flagship from Alibaba's Qwen team. Qwen 3.6 Plus was released on March 30, 2026, and it's being positioned as a frontier-level agentic coding model with a 1 million token context window and strong multimodal reasoning. But honestly, I can't even finish using the \$10 plan's quota. The Pro plan was sold out for a while anyway, they used to restock weekly, but that's stopped.
MiniMax also recently released M2.7 in March 2026, which shows signs of self-improving training loops and benchmarks approaching Claude Opus 4.6 territory. It's not on the Alibaba Coding Plan yet, but it's worth keeping an eye on.
## Why this works
The key insight isn't really about being cheap. It's about recognizing that the AI landscape has fragmented in a way that creates opportunities.
Notion AI gives me frontier models embedded directly in my productivity workflow. I'm not copy-pasting between a chat window and my documents. The AI operates on the same canvas where I do my actual work, which makes the output immediately actionable.
The Alibaba Coding Plan gives me access to multiple competitive models at a fraction of what a single provider would charge. GLM-5 alone would cost significantly more at per-token API rates. At flat-rate pricing with generous quotas, the economics are hard to beat.
Compare this to the alternatives:
- ChatGPT Plus: \$20/month for one model family
- Claude Pro: \$20/month for one model family
- Claude Code Max: \$200/month for coding with Claude
- GitHub Copilot Pro+: \$39/month
My setup gives me more model diversity, more use cases covered, and more total capacity for \$15 combined.
## The luck factor
I want to be honest: a big part of this setup comes down to timing. I got the Notion student discount before the add-on was deprecated. I got the Alibaba Coding Plan during its introductory pricing period. Neither of these deals is available to new users in the same form today.
But the broader lesson still applies. The AI tooling market is moving fast, and providers regularly offer aggressive introductory pricing to build their user base. Alibaba, in particular, is subsidizing access to compete with Western providers. If you pay attention to new launches and are willing to try less mainstream platforms, there are real savings to be found.
The best AI setup isn't necessarily the most expensive one. It's the one that fits how you actually work.
## References
1. [Notion pricing plans](https://www.notion.com/pricing)
2. [Notion AI add-on removal and pricing restructure (May 2025)](https://plaky.com/learn/plaky/notion-pricing/)
3. [Alibaba Cloud Model Studio Coding Plan overview](https://www.alibabacloud.com/help/en/model-studio/coding-plan)
4. [GLM-5, everything you need to know, Artificial Analysis](https://artificialanalysis.ai/articles/glm-5-everything-you-need-to-know)
5. [GLM-5 model card, NVIDIA NIM](https://build.nvidia.com/z-ai/glm5/modelcard)
6. [GLM-5 benchmark scores, Weights & Biases](https://wandb.ai/byyoung3/ml-news/reports/GLM-5-Benchmark-Scores---VmlldzoxNTkwOTk2MQ)
7. [Qwen 3.6 Plus announcement](https://qwen.ai/blog?id=qwen3.6)
8. [MiniMax M2.7 release](https://www.minimax.io/news/minimax-m27-en)
9. [AI Coding Plan comparison 2026](https://gist.github.com/junbaor/06b01602889ea72d9159a6d6133c1522)
