---
title: "The cheap model wins"
date: "2026-04-09"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

GPT-5.4 just dropped. Claude Mythos 5 is out. Gemini 3.1 went open source. Everyone is chasing frontier benchmarks, racing to top the next leaderboard. But here's what I keep seeing in practice: the model that wins in production is almost never the smartest one. It's the one that's cheap enough to call 10,000 times a day without blowing your budget.
The benchmark war is a distraction from the real competition: cost per useful output.
## The benchmark treadmill
Every few months, a new model arrives with a press release trumpeting its MMLU score, its AIME math performance, its coding benchmarks. The AI community collectively loses its mind for about 72 hours. Then the next model drops and the cycle repeats.
The problem is that these benchmarks rarely reflect real workloads. MMLU measures broad academic knowledge. AIME tests competition math. HumanEval checks coding puzzles. None of these tell you how well a model will handle your customer support tickets, summarize your meeting notes, or classify incoming requests in your pipeline.
In production, what actually matters is a different equation entirely: latency multiplied by cost multiplied by reliability. A model that scores 3% higher on a reasoning benchmark but costs 20x more and takes four times as long to respond is a terrible production choice for most applications.
## The real math of production AI
The Stanford HAI 2025 AI Index Report captured a staggering trend: the inference cost for a system performing at GPT-3.5 level dropped over 280-fold between November 2022 and October 2024, from \$20 per million tokens down to \$0.07. Depending on the task, inference prices have fallen anywhere from 9 to 900 times per year.
This isn't just a fun statistic. It fundamentally changes the calculus of what's worth building. When inference is expensive, you carefully ration every API call. When it's cheap, you can afford to be creative, to build systems that call models dozens of times per request, to add layers of validation and refinement that would have been prohibitively expensive a year ago.
Look at the current small model landscape. GPT-5 Mini with roughly 13 billion parameters costs \$0.25 per million input tokens. GPT-5 Nano at around 7 billion parameters costs \$0.05. These models handle classification, summarization, extraction, and basic reasoning tasks with more than enough quality for production use.
Open-weight models have closed the gap even further. The performance difference between open and closed models shrank from 8% to just 1.7% on some benchmarks in a single year. When the gap is that small and the cost difference is 10x or more, the math does itself.
## I've never paid for ChatGPT Plus
I rotate between models. I match the model to the task. Need quick text cleanup or a format conversion? The cheapest available model handles it fine. Writing a complex technical analysis? Maybe I'll reach for something stronger. But most of the time, the cheap model is good enough, and "good enough" at 1/50th the price is a massive win.
This is the same strategy that works at scale. The smartest production teams don't default to the most powerful model for everything. They right-size intelligence to the task.
Nobody runs their entire backend on the most expensive AWS instance type. That would be absurd. You pick the instance that fits the workload. Yet somehow, the default in AI development is still to reach for GPT-4 class or Claude Opus for every single request, regardless of complexity.
## The model routing pattern
The most sophisticated AI deployments have figured this out. They use a pattern called model routing, sometimes called an AI gateway, where a lightweight system evaluates each incoming request and sends it to the cheapest model capable of handling it well.
The logic is straightforward. High-volume, low-complexity requests go to cheap models. Low-volume, high-value requests go to expensive models. Everything in between gets optimized iteratively.
Research from Swfte AI found that intelligent LLM routing can cut costs by up to 85% compared to routing everything through a premium model. DeepSeek V3.2 demonstrated 94% cost savings on straightforward queries versus premium models, without meaningful quality loss.
This isn't a niche optimization. Enterprise AI gateways like Portkey, Helicone, and others have emerged specifically to solve this problem at the infrastructure level, routing requests, caching repeated queries, enforcing budgets, and falling back to cheaper providers automatically.
## Small models are eating production
Gartner predicts that by 2027, organizations will use small, task-specific AI models three times more than general-purpose LLMs. Red Hat's research shows that even a 350-million-parameter model, fine-tuned on high-quality data, can outperform generalist frontier models in specific tool-calling and API orchestration domains.
The SLM market is projected to grow from \$0.93 billion in 2025 to \$5.45 billion by 2032. That's not hype, it's enterprises discovering that a 3-7 billion parameter model running locally can handle 80% of their production workloads at a fraction of the cost.
The sweet spot for small language models sits around 1-13 billion parameters. In that range, well-trained models can reach 70-95% of the benchmark performance of much larger models while using 85-95% fewer parameters. For most production tasks, that performance gap is invisible to end users.
## The Jevons paradox twist
Here's where it gets interesting. You might expect cheaper models to mean lower AI spending overall. The opposite is happening.
William Stanley Jevons observed in the 1860s that as steam engines became more efficient at using coal, total coal consumption didn't decrease, it exploded. The efficiency made new applications viable, and demand far outstripped the per-unit savings.
The same dynamic is playing out with AI. Enterprise generative AI spending surged to \$37 billion in 2025, up 3.2x from the previous year. Companies aren't saving money by using cheaper models. They're doing more. Tasks that weren't worth automating at \$20 per million tokens become obvious wins at \$0.07.
Microsoft CEO Satya Nadella captured this perfectly after DeepSeek's announcement: "Jevons paradox strikes again! As AI gets more efficient and accessible, we will see its use skyrocket, turning it into a commodity we just can't get enough of."
Cheaper models don't shrink the market. They expand it. Every drop in cost per inference unlocks a new category of applications that weren't economically viable before.
## Frontier models still matter
None of this means frontier models are irrelevant. They're essential for the hard 20%, the tasks that require genuine reasoning depth, novel problem solving, or handling edge cases that smaller models fumble.
The point isn't that big models are bad. It's that using them for everything is wasteful. Frontier models push the boundary of what's possible. Cheap models push the boundary of what's practical. Both boundaries matter, but in production, practical wins.
DeepSeek's story illustrates this nicely. They trained V3 for roughly \$5.6 million in compute, a fraction of the estimated \$50-100 million for GPT-4, by pioneering efficient architectures like Mixture-of-Experts and Multi-head Latent Attention. The result was competitive performance at radically lower cost. When efficiency becomes a first-class design goal rather than an afterthought, the results are dramatic.
## Right-sizing intelligence
The winning strategy isn't about finding the single best model. It's about building systems that match the right level of intelligence to each task, automatically, at scale.
This means investing in evaluation. You need to know which tasks actually require frontier-level capability and which ones a small model handles just fine. Most teams are surprised to find that the vast majority of their production calls fall into the second category.
It means investing in routing infrastructure. Even a simple heuristic, like sending short classification requests to the cheapest model and longer analytical requests to a mid-tier one, can dramatically reduce costs.
And it means resisting the temptation to default to the biggest model because it feels safer. In production, the cheap model isn't a compromise. It's a feature.
## References
1. [The 2025 AI Index Report](https://hai.stanford.edu/ai-index/2025-ai-index-report), Stanford Institute for Human-Centered AI
2. [AI Index 2025: State of AI in 10 Charts](https://hai.stanford.edu/news/ai-index-2025-state-of-ai-in-10-charts), Stanford HAI
3. [Top Cost-Efficient Small Models for AI APIs](https://www.clarifai.com/blog/top-cost-efficient-small-models), Clarifai
4. [Intelligent LLM Routing: How Multi-Model AI Cuts Costs by 85%](https://www.swfte.com/blog/intelligent-llm-routing-multi-model-ai), Swfte AI
5. [LLM Routing: Optimizing AI Model Selection for Cost & Quality](https://www.linkedin.com/pulse/llm-routing-optimizing-ai-model-selection-cost-quality-anshuman-jha-6fahc), Anshuman Jha
6. [Small Models, Big Impact: The Future of Scaling Enterprise AI Agents](https://www.redhat.com/en/blog/small-models-big-impact-future-scaling-enterprise-ai-agents), Red Hat
7. [The Power of Small: Edge AI Predictions for 2026](https://www.dell.com/en-us/blog/the-power-of-small-edge-ai-predictions-for-2026/), Dell Technologies
8. [Small Language Models: Why Enterprises Are Betting Big on Going Small](https://techvoices.com/viewpoints/small-language-models-why-enterprises-are-betting-big-on-going-small/), TechVoices
9. [2025: The State of Generative AI in the Enterprise](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/), Menlo Ventures
10. [What Is Jevons Paradox in AI?](https://www.mindstudio.ai/blog/jevons-paradox-ai-human-work-demand/), MindStudio
11. [The Jevons Paradox: Flawed Consensus View On Efficiency](https://www.forbes.com/sites/jonmarkman/2026/01/27/the-jevons-paradox-flawed-consensus-view-on-efficiency/), Forbes
12. [DeepSeek-V3 Technical Report](https://arxiv.org/pdf/2412.19437), DeepSeek AI
13. [The Complete Guide to DeepSeek Models](https://www.bentoml.com/blog/the-complete-guide-to-deepseek-models-from-v3-to-r1-and-beyond), BentoML
