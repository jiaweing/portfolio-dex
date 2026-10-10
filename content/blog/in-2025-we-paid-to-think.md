---
title: "In 2025 we paid to think"
date: "2026-01-08"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Something shifted in 2025. For decades, we paid computers to *do* things: crunch numbers, serve web pages, move bytes around. Then, almost overnight, we started paying them to *think*. Not metaphorically. Literally. Every major AI provider introduced a new line item on the bill: **thinking tokens**, billed by the thousands, consumed in silence before a single word of output appeared.
It was a strange new economy. You could watch the meter tick while the machine reasoned its way through a math proof or debugged a function, and the longer it thought, the more it cost. For the first time, deliberation had a price tag.
## The year the models learned to pause
The shift started in late 2024, when OpenAI released o1, its first "reasoning" model. Unlike GPT-4, which generated answers in a single forward pass, o1 produced a hidden internal monologue, a chain-of-thought that the model used to plan, evaluate, and self-correct before committing to an answer. By the time you read the response, the hard work had already happened behind the scenes.
Then came the avalanche. In January 2025, DeepSeek released R1, an open-source reasoning model under an MIT license that matched o1's performance at a fraction of the cost, and promptly wiped \$593 billion off Nvidia's market cap in a single day. Anthropic shipped Claude 3.7 Sonnet in February, the first "hybrid" reasoning model that could toggle between instant responses and extended thinking, with a configurable budget for how long it was allowed to reason. OpenAI followed with o3 in April, and by summer, GPT-5 arrived with "built-in thinking" as a default feature.
Every major model family now had a thinking mode. The question was no longer *can* AI reason, but *how much reasoning can you afford?*
## Thinking tokens: the invisible line item
Here is what made this moment unusual. Reasoning models introduced a new category of computation called **thinking tokens** (sometimes called reasoning tokens). These tokens are generated during inference, used internally by the model to work through a problem, and then discarded before the final answer is produced. You never see them. But you pay for them.
OpenAI's documentation spells it out plainly: "While reasoning tokens are not visible via the API, they still occupy space in the model's context window and are billed as output tokens."
At launch, o1 cost \$15 per million input tokens and \$60 per million output tokens, with thinking tokens counted as output. For complex queries, the model might generate 10,000 to 50,000 thinking tokens before producing a 500-token answer. The thinking was often 10 to 100 times more expensive than the answer itself.
By mid-2025, prices had dropped sharply. OpenAI cut o3's pricing by 80%, bringing it down to \$2 input and \$8 output per million tokens. DeepSeek undercut everyone, offering its thinking models at \$0.28 per million input tokens. But the fundamental dynamic remained: you were paying for a machine to deliberate, and the harder the problem, the higher the bill.
## The \$200 subscription to unlimited thought
For individual users, the economics took a different shape. In late 2024, OpenAI launched ChatGPT Pro at \$200 per month, a plan built around unlimited access to o1 and later o1-pro. No rate limits. No throttling. Just an all-you-can-think buffet.
Who pays \$200 a month for an AI to reason? As it turned out, quite a few people. Strategy consultants, researchers, financial analysts, and software engineers reported that the plan "completely transformed" their workflows. The value proposition was not speed or convenience. It was *depth*. The model could spend minutes working through a problem, exploring dead ends, and arriving at an answer that a quick-response model would fumble.
This was new territory. We had moved from paying for compute (how fast can you run this?) to paying for cognition (how well can you think about this?).
## The Jevons Paradox of thought
A strange thing happened as thinking got cheaper: people spent more on it, not less. This is the Jevons Paradox, the 19th-century observation that when a resource becomes more efficient to use, total consumption tends to increase rather than decrease. Coal became more efficient, so we burned more of it. Data storage got cheaper, so we stored everything.
The same pattern emerged with AI reasoning. As token prices fell, developers built more complex agentic workflows, multi-step pipelines where models planned, delegated, verified, and iterated. A single user query might trigger a chain of reasoning calls, each consuming thousands of thinking tokens. Per-token costs went down. Per-task costs stayed stubbornly high, or even increased, because the tasks themselves became more ambitious.
Demand for compute on platforms like OpenRouter increased 25-fold between December 2024 and late 2025. The AI inference market, valued at \$106 billion in 2025, is projected to reach \$255 billion by 2030. We are spending more on AI thinking than ever, precisely because thinking has never been cheaper.
## Token anxiety and the psychology of metered thought
Not everyone celebrated. A quieter phenomenon emerged among developers: **token anxiety**, the low-grade stress of watching a cost meter tick upward in real time while an AI reasons through your problem.
One developer described the experience of installing an IDE extension that showed real-time token usage: "The second I could see the meter ticking, something in me flinched. Every time I hovered over 'Send,' I felt that tiny internal question: *Is this worth it?*" Over time, the awareness of cost changed how they built. They asked fewer follow-up questions. They second-guessed whether a problem was "worth" the reasoning. The meter did not just measure tokens, it measured the perceived value of curiosity.
This is one of the stranger consequences of paying for thought. When thinking has a price, you start rationing it, not because you cannot afford more, but because the act of pricing something changes your relationship to it.
## What we are really paying for
The phrase "paying to think" sounds like a punchline, but it captures something real about where technology is headed. For most of computing history, intelligence was the human contribution. Machines were fast but incurious. The person in the loop did the reasoning, the planning, the judgment calls, and the computer executed instructions.
Now the cost structure has inverted. Execution is nearly free. Reasoning is the expensive part. And the entity doing the reasoning is, increasingly, not human.
This raises questions that 2025 only began to surface. If we can buy better thinking by the token, what does that mean for the value of human expertise? If a \$200 monthly subscription gives you access to reasoning that rivals a domain specialist, what happens to the market for that specialist's time? If open-source models can replicate proprietary reasoning for pennies, what is the durable competitive advantage in AI?
We do not have answers yet. But we have a new cost center, and it is one of the most philosophically loaded line items in the history of technology.
In 2025, we paid to think. The interesting question is what we will do with all that thinking in 2026.
## References
1. [Large Reasoning Models: The Complete Guide to Thinking AI (2025)](https://medium.com/@nomannayeem/large-reasoning-models-the-complete-guide-to-thinking-ai-2025-b07d252a1cca), Nayeem Islam, Medium
2. [Claude 3.7 Sonnet and Claude Code announcement](https://www.anthropic.com/news/claude-3-7-sonnet), Anthropic, February 2025
3. [Reasoning models documentation](https://developers.openai.com/api/docs/guides/reasoning/), OpenAI API Docs
4. [The Advent of 'Thinking Tokens' Causes Unforeseen Inflationary Impact on Generative AI](https://www.forbes.com/sites/lanceeliot/2025/11/05/the-advent-of-thinking-tokens-caused-an-unforeseen-inflationary-impact-on-generative-ai/), Lance Eliot, Forbes
5. [DeepSeek-R1 Release](https://api-docs.deepseek.com/news/news250120), DeepSeek API Docs
6. [DeepSeek rocked Silicon Valley in January 2025](https://www.itpro.com/technology/artificial-intelligence/deepseek-r1-one-year-anniversary-what-next), IT Pro
7. [O3 is 80% cheaper and introducing o3-pro](https://community.openai.com/t/o3-is-80-cheaper-and-introducing-o3-pro/1284925), OpenAI Developer Community, June 2025
8. [LLM API Pricing Comparison (2025)](https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025), IntuitionLabs
9. [OpenAI API Pricing](https://developers.openai.com/api/docs/pricing/), OpenAI
10. [Introducing ChatGPT Pro](https://openai.com/index/introducing-chatgpt-pro/), OpenAI
11. [Token Anxiety: How Real-Time AI Pricing Is Killing Developer Flow](https://medium.com/illumination/token-anxiety-how-real-time-ai-pricing-is-killing-developer-flow-883dc6612ff7), NAJEEB, Medium
12. [The More AI Costs Fall, The More You'll Spend](https://davefriedman.substack.com/p/the-more-ai-costs-fall-the-more-youll), Dave Friedman, Substack
13. [AI Inference Costs in 2025](https://www.tensormesh.ai/blog-posts/ai-inference-costs-2025-energy-crisis), Tensormesh
14. [The rise of AI 'reasoning' models is making benchmarking more expensive](https://techcrunch.com/2025/04/10/the-rise-of-ai-reasoning-models-is-making-benchmarking-more-expensive/), TechCrunch
