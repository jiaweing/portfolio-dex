---
title: "The token cost paradox"
date: "2026-03-17T19:01:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

AI is getting cheaper. That much is undeniable. The cost of running a model at GPT-3 level performance has dropped from \$60 per million tokens in 2021 to fractions of a cent today. Andreessen Horowitz calls this trend "LLMflation," noting that for an LLM of equivalent performance, the cost is decreasing by roughly 10x every year. That pace is faster than Moore's Law during the PC revolution, and faster than the bandwidth explosion during the dotcom boom.
So why doesn't it feel cheaper?
Because we're using dramatically more tokens than we used to. And the ways we're using them are fundamentally different. The result is a strange economic paradox: the unit price of intelligence keeps falling, but the total bill keeps rising.
## The 10x drop that keeps disappearing
The raw numbers are staggering. GPT-4-class performance that cost \$60 per million tokens in early 2023 can now be had for under a dollar. Open-source models from Meta and others have driven competitive pricing through the floor. Quantization, better instruction tuning, and software optimizations have all compounded these gains.
If you're running the same workload you ran two years ago, you're paying a fraction of what you used to. The problem is that almost nobody is running the same workload.
## Reasoning tokens changed the equation
The biggest shift came with reasoning models. When OpenAI introduced o1, and later o3, they brought a new cost dynamic: thinking tokens. These models don't just produce an answer, they reason through the problem step by step, generating thousands of internal tokens before outputting a final response.
A simple question might consume 10,000 reasoning tokens internally while returning a 200-token answer. At maximum reasoning settings, models can increase output token consumption by 1.6x or more compared to standard modes. In extreme cases, some reasoning models consume over 600 tokens to generate just two words of output.
The reasoning tokens are billed as output tokens, which are typically the most expensive tier. So a query that used to cost a fraction of a cent can now cost several cents, not because the price went up, but because the model is doing fundamentally more work.
## Agents multiply everything
Reasoning models were just the beginning. The real explosion comes from agentic workflows, where AI systems chain multiple calls together to complete complex tasks.
SaaStr recently shared a telling comparison between two of their AI tools. A simple startup valuation calculator costs about \$0.0002 per use, involving a single API call with minimal context. Their pitch deck analyzer, on the other hand, costs roughly \$0.20 per analysis, running up to five passes through the API, each building on the previous one. That's an 800x difference in token consumption between two products at the same company.
This pattern is everywhere. AI-powered code editors don't just autocomplete a line of code anymore. They read entire codebases, plan multi-file changes, run tests, iterate on failures, and try again. Each cycle burns through context windows that would have seemed absurd a year ago.
## Jevons' paradox, 160 years later
In 1865, economist William Stanley Jevons observed something counterintuitive about coal. As steam engines became more efficient, you'd expect coal consumption to drop. Instead, it soared. Cheaper energy made new applications viable, and total demand overwhelmed the efficiency gains.
The AI industry is living through the same dynamic. When Satya Nadella saw DeepSeek dramatically undercut competitors on cost, he didn't panic. He posted on social media: "Jevons paradox strikes again! As AI gets more efficient and accessible, we will see its use skyrocket, turning it into a commodity we just can't get enough of."
Deloitte's research confirms the pattern at the enterprise level. While the unit price of AI tokens is falling, overall enterprise spending on AI systems is rising. Cloud computing bills climbed 19% in 2025, driven largely by generative AI workloads. The number of users, complexity of models, and intensity of workloads are all expanding faster than prices are declining.
## The three layers of cost expansion
The paradox operates on at least three distinct levels.
**Depth of reasoning.** Models think harder per query. Chain-of-thought, tree search, and extended reasoning all consume more tokens to produce better answers. Users and developers naturally gravitate toward higher quality, even when it costs more.
**Breadth of application.** Tasks that were never economically viable before, like analyzing every customer support ticket in real time, or reviewing every line of code in a pull request, suddenly become feasible. Each new application adds to the aggregate token count.
**Complexity of orchestration.** Agentic systems chain multiple model calls together, with each step feeding into the next. A single user action might trigger dozens of LLM calls behind the scenes. The token cost of a workflow scales multiplicatively with the number of steps.
## So is it actually cheaper?
The honest answer is: it depends on what you're measuring.
If you hold the task constant, yes, it's dramatically cheaper. The same simple chatbot query that cost a dollar in 2022 costs a fraction of a cent today.
But nobody holds the task constant. The moment costs drop, expectations rise. The chatbot becomes an agent. The agent gets reasoning capabilities. The reasoning agent gets access to tools. Each evolution consumes more tokens while delivering more value.
This is not a bug. It is, in a real sense, the entire point. The value of AI comes from doing more, not from doing the same thing for less. The paradox isn't a market failure. It's a sign that the technology is working.
The practical question for anyone building with AI isn't "is it getting cheaper?" but rather "am I getting more value per dollar?" Right now, for most applications, the answer is yes. The cost per unit of useful work is falling even as the total spend rises, because each token is contributing to something meaningfully more capable than before.
The companies and developers who understand this distinction will make better decisions about where to invest. The ones chasing the cheapest possible token will find themselves in a race to the bottom, optimizing for the wrong metric entirely.
## References
1. Appenzeller, G. "Welcome to LLMflation: LLM inference cost is going down fast." Andreessen Horowitz, November 2024. [https://a16z.com/llmflation-llm-inference-cost/](https://a16z.com/llmflation-llm-inference-cost/)
2. Merizzi, N. et al. "AI tokens: How to navigate AI's new spend dynamics." Deloitte Insights, January 2026. [https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-tokens-how-to-navigate-spend-dynamics.html](https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-tokens-how-to-navigate-spend-dynamics.html)
3. Lemkin, J. "The Great AI Token Paradox: How We're Simultaneously Driving AI Costs Down and Up." SaaStr, 2025. [https://www.saastr.com/the-great-ai-token-paradox-how-were-simultaneously-driving-costs-down-and-usage-through-the-roof/](https://www.saastr.com/the-great-ai-token-paradox-how-were-simultaneously-driving-costs-down-and-usage-through-the-roof/)
4. Hashmi, S. "Agentic AI's Token Paradox: When Cheaper Means More Expensive." Forbes, November 2025. [https://www.forbes.com/sites/saharhashmi/2025/11/03/agentic-ais-token-paradox-when-cheaper-means-more-expensive/](https://www.forbes.com/sites/saharhashmi/2025/11/03/agentic-ais-token-paradox-when-cheaper-means-more-expensive/)
5. "The LLM Cost Paradox: How 'Cheaper' AI Models Are Breaking Budgets." IKANGAI, 2025. [https://www.ikangai.com/the-llm-cost-paradox-how-cheaper-ai-models-are-breaking-budgets/](https://www.ikangai.com/the-llm-cost-paradox-how-cheaper-ai-models-are-breaking-budgets/)
6. "Why the AI world is suddenly obsessed with a 160-year-old economics paradox." NPR Planet Money, February 2025. [https://www.npr.org/sections/planet-money/2025/02/04/g-s1-46018/ai-deepseek-economics-jevons-paradox](https://www.npr.org/sections/planet-money/2025/02/04/g-s1-46018/ai-deepseek-economics-jevons-paradox)
7. "LLM inference prices have fallen rapidly but unequally across tasks." Epoch AI, March 2025. [https://epoch.ai/data-insights/llm-inference-price-trends](https://epoch.ai/data-insights/llm-inference-price-trends)
