---
title: "The model misconception"
date: "2026-04-27T17:57:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","Prompt Engineering","Models","LLMs","Memory","OpenAI","Anthropic","Claude","Google"]
---

Every few months, a new model drops and the internet lights up. Better benchmarks. Higher scores. "Models are getting better," the headlines say.
But are they?
In early 2025, the industry discovered thinking. OpenAI shipped o1, then o3. Anthropic added extended thinking to Claude. Google followed. The idea was that if you let the model reason step by step before answering, it could solve harder problems. And it worked. Scores on math, science, and coding benchmarks climbed. Everyone attributed the gains to the models themselves.
By late 2025, the story shifted to agents. Models weren't just answering questions anymore, they were writing code, browsing the web, running terminal commands. Agent benchmarks like SWE-bench and Terminal Bench became the new scoreboard. Performance climbed again. "Models are getting better," everyone said.
Then in early 2026, a quieter realization started spreading. A new term entered the vocabulary: harness. And with it came an uncomfortable question. When we say "models are getting better," what exactly is getting better?
## The leaderboard tells a different story
Look at the Terminal Bench 2.0 leaderboard. ForgeCode running Claude Opus 4.6 sits at 79.8% accuracy. Claude Code, Anthropic's own agent, running Claude Opus 4.5, lands at 52.1%. Same model family. A nearly 28-point gap.
The model didn't change. The harness did.
ForgeCode achieves nearly identical scores with two completely different models from two different providers: 81.8% with GPT-5.4 and 79.8% with Claude Opus 4.6. Meanwhile, Claude Code with Opus 4.5 sits almost 30 points behind ForgeCode running the same model family. The thing that's actually varying in these results is not the model. It's everything wrapped around it.
LangChain demonstrated this even more directly. They kept GPT-5.2-Codex fixed and only modified the harness around it. On Terminal Bench 2.0, the same model climbed from 52.8% to 66.5%. That's a 13.7-point improvement without touching the model at all. Their blog post was refreshingly honest about it: "We only changed the harness."
Epoch AI analyzed the pattern across SWE-bench Verified and found that switching scaffolds alone shifts scores by up to 15 percentage points. For some models, the scaffold choice accounts for more variation than the model choice.
## The misconception
When a new model launches and scores higher on a benchmark, we instinctively credit the model. That's the misconception. What we're often actually seeing is a better harness shipping alongside a new model.
Think about what happens when Anthropic releases a new Claude. They don't just release a model. They release updated system prompts, refined tool descriptions, improved context management in their products, better error recovery logic. The model is one variable. The harness is another. When the benchmark score goes up, both changed.
ForgeCode's journey makes this concrete. They started at 25% on Terminal Bench 2.0. They eventually reached 81.8%. Their blog documents the entire climb, and the improvements were almost entirely harness fixes: better tool-call naming, planning enforcement, skill routing, reasoning-budget control, error recovery, context management. Seven distinct failure modes, all harness problems, not model problems.
When they swapped from Gemini 3.1 Pro to GPT-5.4 to Claude Opus 4.6, their scores barely moved. The harness was doing the heavy lifting.
## Models get better from the body and hands they are given
A language model on its own is just a function that takes text in and produces text out. It has no memory between calls. It can't see a codebase. It can't run a command. It can't check whether its own output was correct.
The harness gives it all of those things. It gives the model a body to act in the world and hands to manipulate it. The execution loop that decides when to call the model again. The tools it can access. The logic controlling what context gets loaded into the window and when. The error recovery behavior. The memory and state management between steps.
When you improve any of those things, the model appears to get better. But the model didn't change. It just got a better body.
This is why a 2.7B parameter model with context scaffolding can outperform an unscaffolded 4.7B model on certain tasks. The smaller model with better infrastructure produces better outcomes than the larger model running naked.
METR's 2025 randomized controlled trial found something that puzzled people: experienced open-source developers using AI tools were 19% slower on average, even though they believed they were 24% faster. The tools were frontier models. The harnesses were early and crude. The models were capable, but the systems around them weren't designed to make that capability useful in context.
## Context is the real bottleneck
The single biggest thing a harness does is manage context. Models have finite context windows. What goes into that window determines what the model can reason about. Get the context wrong and even the most capable model will fail.
A naive approach stuffs everything into the window and hopes for the best. A good harness indexes the relevant information, retrieves only what's needed at each step, compresses or discards stale data, and structures everything so the model can actually use it.
This is why the same model can score 52% under one harness and 80% under another. The model's raw capability hasn't changed. What changed is whether the model had the right information in front of it at the right time.
Anthropic's own research on long-running agents found that basic context compaction isn't enough. You need structured artifacts to hand off context between sessions and decomposition strategies to break work into tractable chunks. These are engineering problems, not model problems.
## What's actually improving
Models are improving. I'm not arguing they aren't. Each generation handles longer contexts more reliably, follows instructions more precisely, and makes fewer reasoning errors. That's real progress.
But the rate at which models are improving is slower than it appears. Much of what looks like model improvement is actually harness improvement. When you see a headline saying a new model scores 10 points higher on a benchmark, some meaningful fraction of those points came from better tooling, better prompts, better context management, and better evaluation infrastructure.
The frontier models are converging. On SWE-bench Verified, six frontier models now score within a few points of each other when run through the same scaffolding. The models are increasingly similar in raw capability. The harness is where the divergence happens.
This matters because it changes where effort should go. If you're building with AI and spending all your time evaluating which model to use, you're optimizing the wrong variable. The Terminal Bench leaderboard proves it: ForgeCode's model-agnostic results show that the harness, not the model, is their actual product.
## The narrative needs updating
We evolved from thinking about thinking models to thinking about agents to thinking about harnesses. Each step was a realization that the previous frame was incomplete.
Thinking models showed us that how a model processes a problem matters as much as the model's raw knowledge. Agents showed us that models need tools and environments to do real work. Harnesses showed us that the infrastructure around the model determines whether any of it actually works.
The model misconception persists because it's a simpler story. "GPT-6 is better than GPT-5" is easy to understand. "The scaffolding around GPT-5 improved by 15 percentage points when we redesigned the context management and error recovery" is accurate but doesn't make a good headline.
But the accurate version is the one that matters if you're actually building things. The model is important. It's also increasingly commodity. The harness is where the hard engineering lives, and it's where the real improvements are coming from.
## References
1. Terminal Bench 2.0 Leaderboard ([https://www.tbench.ai/leaderboard/terminal-bench/2.0](https://www.tbench.ai/leaderboard/terminal-bench/2.0))
2. Improving Deep Agents with harness engineering, LangChain ([https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering))
3. Why benchmarking is hard, Epoch AI ([https://epoch.ai/gradient-updates/why-benchmarking-is-hard](https://epoch.ai/gradient-updates/why-benchmarking-is-hard))
4. Benchmarks Don't Matter, Until They Do (Part 1), ForgeCode ([https://forgecode.dev/blog/benchmarks-dont-matter/](https://forgecode.dev/blog/benchmarks-dont-matter/))
5. Benchmarks Don't Matter, Until They Do (Part 2), ForgeCode ([https://forgecode.dev/blog/gpt-5-4-agent-improvements/](https://forgecode.dev/blog/gpt-5-4-agent-improvements/))
6. Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity, METR ([https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/))
7. Effective harnesses for long-running agents, Anthropic Engineering ([https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents))
8. The Model vs. the Harness: Which matters more?, Adam Baitch ([https://medium.com/@adambaitch/the-model-vs-the-harness-which-actually-matters-more-59dd3116bb31](https://medium.com/@adambaitch/the-model-vs-the-harness-which-actually-matters-more-59dd3116bb31))
9. Towards Reasoning Era: A Survey of Long Chain-of-Thought for Reasoning Large Language Models ([https://arxiv.org/abs/2503.09567](https://arxiv.org/abs/2503.09567))
10. What is AI Scaffolding?, BlueDot Impact ([https://blog.bluedot.org/p/what-is-ai-scaffolding](https://blog.bluedot.org/p/what-is-ai-scaffolding))
