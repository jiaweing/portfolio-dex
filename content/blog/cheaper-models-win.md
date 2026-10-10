---
title: "Cheaper models win"
date: "2026-03-20"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Everyone wants to talk about which model tops the leaderboard. Which one scores highest on MMLU. Which one edges ahead on SWE-Bench by half a percentage point. But here's what I keep noticing: the models actually getting adopted, the ones reshaping how people build and ship, aren't the most capable ones. They're the cheapest ones.
Cost reduction, not capability improvement, is the real innovation right now.
## The benchmark gap is closing, the price gap isn't
MiniMax, a Chinese AI lab, recently released M2.5. On SWE-Bench Verified, it scores 80.2%, just 0.6 points behind Claude Opus 4.6. On Multi-SWE-Bench, which tests complex multi-file projects across multiple languages, M2.5 actually pulls ahead at 51.3% vs 50.3%.
Now look at the pricing. Claude Opus 4.6 charges \$5.00 per million input tokens and \$25.00 per million output tokens. MiniMax M2.5? \$0.30 input, \$1.20 output. That's roughly **95% cheaper** for nearly identical benchmark performance. One estimate puts the daily cost difference at \$4.70 vs \$100 for a workload of 10 million input tokens and 2 million output.
And MiniMax isn't alone. DeepSeek V3.2 offers input tokens at \$0.14 per million. Alibaba, Tencent, Baidu, and ByteDance have all shipped competitive models at similar price points. When five independent labs can cluster around the same performance tier, the marginal value of that last fraction of a percent shrinks fast, especially when the price delta is 20x.
## The frugal optimizer's playbook
I've never paid for ChatGPT Plus. I rotate between Claude, Gemini, GLM, and whatever's free or cheap at the moment, and it works fine. Not because I don't value quality, but because for the vast majority of what I actually need, the cheaper option is good enough.
This isn't a hot take. It's just how most people use these tools in practice. You don't reach for the \$75-per-million-output-token model to summarize a meeting, draft an email, or help debug a React component. You reach for the one that's fast, cheap, and clears the bar.
Most real-world tasks don't need frontier models. They need models that are reliable, fast, and affordable. The gap between "good enough" and "state of the art" matters far less than the gap between "too expensive to use freely" and "cheap enough to use everywhere."
## Jevons paradox in action
When DeepSeek dropped R1 in early 2025, Nvidia's stock fell 17% in a single day, wiping out roughly \$600 billion in market value. The logic seemed sound: if AI gets cheaper, we need fewer chips.
But that logic misses what actually happens when a resource gets cheaper. William Stanley Jevons observed it with coal in the 1860s: when steam engines became more efficient, total coal consumption didn't decrease. It exploded. More efficient engines made more applications viable, and total demand surged.
The same pattern is playing out with AI. Satya Nadella posted about it openly, sharing the Jevons paradox Wikipedia page and writing that "as AI gets more efficient and accessible, we will see its use skyrocket, turning it into a commodity we just can't get enough of."
Cheaper models don't shrink the market. They expand it. Startups that couldn't afford \$100/day inference costs can now experiment. Developers who were rationing API calls can now build features that make dozens of calls per user session. Use cases that were economically unviable at \$15 per million output tokens become obvious at \$1.20.
## The AWS parallel
This isn't a new pattern in tech. AWS didn't win the cloud wars by being the most technically sophisticated option. It won by being cheap enough, reliable enough, and available enough that developers chose it by default. The convenience of not having to think about cost removed friction, and that friction reduction mattered more than raw capability.
The same dynamic applies to AI models. When the cost of intelligence drops low enough, the bottleneck shifts from "can we afford to use AI here?" to "what else can we use AI for?" The quantity of usage, not the quality of any single model, becomes the primary growth vector.
## What this means for the premium model play
OpenAI's GPT-5.2 charges \$1.75 per million input tokens and \$14.00 per million output tokens. Their GPT-5.2 Pro pushes to \$21 input and \$168 output. Anthropic's Claude Opus 4 sits at \$15 input and \$75 output.
These models are extraordinary. Some tasks genuinely require that level of capability, like complex multi-step reasoning, autonomous terminal operations, or high-stakes code generation where the cost of errors dwarfs the cost of inference.
But the strategic question is: what percentage of total AI usage actually needs frontier-tier performance? If 90% of real-world tasks can be handled by models that cost 5-10% as much, the "premium model" business is fighting over a shrinking slice of total demand. The volume play, serving the long tail of use cases at razor-thin margins, is where the market is actually growing.
Developer behavior confirms this. People optimize for cost per token, not MMLU scores. They pick the cheapest model that clears their quality threshold and move on. The model that wins isn't the one with the highest benchmark, it's the one with the lowest price that's good enough.
## Intelligence is becoming a commodity
This is what commoditization looks like. Not a sudden collapse in quality, but a gradual convergence where the differences between models shrink while the price differences remain enormous. When MiniMax can match Opus on coding benchmarks at a fraction of the cost, and DeepSeek can offer reasoning models for pennies, the era of AI as a premium product is giving way to AI as infrastructure.
The companies that win in this environment won't be the ones with the highest-scoring model. They'll be the ones that figure out distribution, ecosystem lock-in, and developer experience at commodity prices. Just like cloud computing before it, the real moat isn't the technology. It's the scale economics that come from being cheap enough that everyone uses you without thinking twice.
The AI industry keeps chasing the next benchmark record. Meanwhile, the future is being built on the models that cost almost nothing.
## References
1. MiniMax M2.5 benchmark performance and pricing analysis, Reddit r/LLMDevs discussion, [https://www.reddit.com/r/LLMDevs/comments/1rl8m0d/minimax_m25_matches_opus_on_coding_benchmarks_at/](https://www.reddit.com/r/LLMDevs/comments/1rl8m0d/minimax_m25_matches_opus_on_coding_benchmarks_at/)
2. MiniMax M2.5 vs GPT-5.2 vs Claude Opus 4.6 vs Gemini 3.1 Pro comparison, Clarifai, [https://www.clarifai.com/blog/minimax-m2.5-vs-gpt-5.2-vs-claude-opus-4.6-vs-gemini-3.1-pro](https://www.clarifai.com/blog/minimax-m2.5-vs-gpt-5.2-vs-claude-opus-4.6-vs-gemini-3.1-pro)
3. Claude Opus 4.6 vs MiniMax M2.5 pricing comparison, [Galaxy.ai](http://Galaxy.ai), [https://blog.galaxy.ai/compare/claude-opus-4-6-vs-minimax-m2-5](https://blog.galaxy.ai/compare/claude-opus-4-6-vs-minimax-m2-5)
4. Why the AI world is suddenly obsessed with Jevons paradox, NPR Planet Money, [https://www.npr.org/sections/planet-money/2025/02/04/g-s1-46018/ai-deepseek-economics-jevons-paradox](https://www.npr.org/sections/planet-money/2025/02/04/g-s1-46018/ai-deepseek-economics-jevons-paradox)
5. Jevons Paradox in Action: How AI Efficiency Drives More Demand, Christine Ying, Medium, [https://medium.com/design-bootcamp/jevons-paradox-in-action-how-ai-efficiency-drives-more-demand-5184942fbc3c](https://medium.com/design-bootcamp/jevons-paradox-in-action-how-ai-efficiency-drives-more-demand-5184942fbc3c)
6. What is DeepSeek and why is it disrupting the AI sector, Reuters, [https://www.reuters.com/technology/artificial-intelligence/what-is-deepseek-why-is-it-disrupting-ai-sector-2025-01-27/](https://www.reuters.com/technology/artificial-intelligence/what-is-deepseek-why-is-it-disrupting-ai-sector-2025-01-27/)
7. DeepSeek API pricing, [https://api-docs.deepseek.com/quick_start/pricing](https://api-docs.deepseek.com/quick_start/pricing)
8. OpenAI API pricing, [https://developers.openai.com/api/docs/pricing/](https://developers.openai.com/api/docs/pricing/)
9. Understanding LLM Cost Per Token: A 2026 Practical Guide, Silicon Data, [https://www.silicondata.com/blog/llm-cost-per-token](https://www.silicondata.com/blog/llm-cost-per-token)
10. The Jevons Paradox: Flawed Consensus View On Efficiency, Forbes, [https://www.forbes.com/sites/jonmarkman/2026/01/27/the-jevons-paradox-flawed-consensus-view-on-efficiency/](https://www.forbes.com/sites/jonmarkman/2026/01/27/the-jevons-paradox-flawed-consensus-view-on-efficiency/)
