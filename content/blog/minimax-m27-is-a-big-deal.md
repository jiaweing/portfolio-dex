---
title: "MiniMax M2.7 is a big deal"
date: "2026-03-25T11:29:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Something quietly shifted this week. MiniMax, a Chinese AI startup, released M2.7, a reasoning model that autonomously handled 30 to 50 percent of its own reinforcement learning workflow. The model built its own agent harnesses, managed data pipelines, and optimized its programming performance over more than 100 iterative rounds, all without human intervention.
This isn't a research paper or a theoretical concept. It's a commercial product you can call through an API right now for \$0.30 per million input tokens.
And MiniMax isn't alone. GPT-5.3-Codex was used to help create itself. Anthropic's Claude Code team uses Claude Code to build Claude Code. Andrej Karpathy's autoresearch project ran 700 experiments in two days with zero human input. Google DeepMind's AlphaEvolve designs algorithms that improve the very infrastructure it runs on.
We are watching the start of something I think most people aren't fully processing yet: models that participate in their own improvement.
## What MiniMax M2.7 actually does
Let me be specific about what "self-evolving" means here, because the term gets thrown around loosely.
M2.7 operates inside a larger agent setup that includes memory, tools, skills, and evaluation loops. During its own development, the model updated its own memory, built dozens of complex skills in its harness, and helped run reinforcement learning experiments. It then used the results of those experiments to improve its own learning process and harness. This creates a feedback cycle: the model gets better, which makes the harness better, which makes the model get better.
The results are genuinely impressive. On SWE-Pro, a benchmark for real-world software engineering, M2.7 scored 56.22%, nearly matching Claude Opus 4.6. On PinchBench, it placed fifth out of 50 models, within 1.2 points of Opus. On MLE Bench Lite, it achieved a 66.6% medal rate in machine learning competitions, tying with Gemini 3.1.
All of this at roughly one-third the cost of comparable models.
But the benchmarks aren't the story. The story is the process. M2.7 didn't just perform well on tasks. It helped design the system that made it perform well on tasks.
## The pattern is everywhere now
MiniMax isn't an isolated case. The same recursive pattern is showing up across every major AI lab.
OpenAI released GPT-5.3-Codex in February 2026, their most capable agentic coding model. What made headlines wasn't the benchmarks, it was the disclosure that the model assisted in its own creation. It helped debug training runs, manage deployment, and build internal tooling. Terminal-Bench scores jumped 13 points. OSWorld nearly doubled. The model got dramatically better at operating computers, not just writing code.
At Anthropic, the relationship between Claude and its own development has become openly recursive. The Claude Code team uses Claude Code as a daily tool for building Claude Code itself. When Kubernetes clusters went down, they fed dashboard screenshots into Claude Code and it guided them through the fix. Finance team members with no coding experience now write plain text workflow descriptions that Claude Code executes automatically.
Andrej Karpathy took this idea and made it radically simple with autoresearch: a 630-line Python script that gives an AI agent a small LLM training setup and lets it experiment autonomously overnight. It modifies code, trains for five minutes, checks if the result improved, keeps or discards, and repeats. Karpathy ran 700 experiments in two days. The agent discovered better learning rates and committed the proof to git without a single human instruction.
And then there's AlphaEvolve from Google DeepMind. This evolutionary coding agent doesn't just write code, it invents new algorithms. It found a more efficient method for matrix multiplication that betters the Strassen algorithm, which had been the standard for 56 years. It reclaimed 0.7% of Google's entire data center capacity, cut Gemini training kernel runtime by 23%, and sped up FlashAttention by 32%. Most remarkably, AlphaEvolve improves the infrastructure used to train the very models that power AlphaEvolve itself.
## Why this time feels different
People have been talking about recursive self-improvement in AI for decades. The concept of an intelligence explosion, where an upgradable intelligent agent enters a runaway cycle of self-improvement with each generation appearing faster and smarter than the last, has been a fixture of AI theory since I.J. Good first described it in 1965.
What's different now is that it's no longer theoretical. We have concrete, measurable examples of models participating in their own development loops. Not in a lab simulation, not in a thought experiment, but in production systems shipping to millions of users.
The key insight is that modern AI performance depends on more than model weights alone. The surrounding system, the harness, the tools, the memory, the evaluation loops, decides whether a model is merely good at answering prompts or genuinely useful over long tasks. When models can improve that surrounding system, you get a compounding effect that traditional training alone can't achieve.
Consider the implications. If a model can handle 30-50% of its own RL workflow today, what happens when the next generation can handle 70%? What happens when it can handle 95%? Each improvement in capability directly accelerates the next improvement. The feedback loop tightens.
## The acceleration is real
I think most people are underestimating how fast this is moving.
Dario Amodei, CEO of Anthropic, has predicted that powerful AI could arrive as early as 2026, calling it a "singularity-type moment." Julian Schrittwieser, an AI researcher at Anthropic, wrote that models will be able to autonomously work for full eight-hour days by mid-2026, and that at least one model will match the performance of human experts across many industries before the end of the year.
These aren't fringe predictions. These are people running the labs that build the models.
What we're seeing right now, with MiniMax M2.7, with GPT-5.3-Codex, with AlphaEvolve, with autoresearch, are the early echoes of something much larger. Each of these systems demonstrates a piece of the puzzle: models that can experiment autonomously, models that can improve their own training, models that can design better algorithms, models that can build and maintain the tools they use.
Put those pieces together and you get something that looks a lot like the beginning of a hard takeoff. Not the dramatic, overnight version from science fiction, but a steady, compounding acceleration where each generation of models makes the next generation arrive faster.
## What to watch for
The thing that makes this moment so consequential is that the bottleneck is shifting. For years, the limiting factor in AI progress was compute, data, and human researcher time. Models are now starting to remove themselves from the third constraint. When AI can run its own experiments, debug its own training, and design its own algorithms, human researcher time becomes less of a bottleneck.
This doesn't mean humans are out of the loop. MiniMax M2.7 handles 30-50% of its RL workflow, not 100%. GPT-5.3-Codex assisted in its own creation, it didn't create itself from scratch. The human role is shifting from doing the work to designing the systems that let AI do the work, and then evaluating the results.
But that remaining human role is shrinking with every model generation. And each generation is arriving faster than the last.
We are, I believe, at the very beginning of the curve. The early echoes, as MiniMax themselves put it. The question isn't whether AI self-improvement will accelerate from here. It's whether we're ready for how fast it will.
## References
1. [MiniMax M2.7: Early Echoes of Self-Evolution](https://www.minimax.io/news/minimax-m27-en), MiniMax News
2. [New MiniMax M2.7 proprietary AI model is 'self-evolving' and can perform 30-50% of reinforcement learning research workflow](https://venturebeat.com/technology/new-minimax-m2-7-proprietary-ai-model-is-self-evolving-and-can-perform-30-50), VentureBeat
3. [MiniMax's M2.7 model competes with Gemini and Opus](https://www.deeplearning.ai/the-batch/minimaxs-m2-7-model-competes-with-gemini-and-opus/), The Batch by [DeepLearning.AI](http://DeepLearning.AI)
4. [Introducing GPT-5.3-Codex](https://openai.com/index/introducing-gpt-5-3-codex/), OpenAI
5. [GPT-5.3-Codex: The Model That Built Itself](https://medium.com/data-science-collective/gpt-5-3-codex-the-model-that-built-itself-6946670037f9), Data Science Collective
6. [How Anthropic teams use Claude Code](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf), Anthropic
7. [autoresearch: AI agents running research on single-GPU nanochat training automatically](https://github.com/karpathy/autoresearch), Andrej Karpathy, GitHub
8. ['The Karpathy Loop': 700 experiments, 2 days, and a glimpse of where AI is heading](https://fortune.com/2026/03/17/andrej-karpathy-loop-autonomous-ai-agents-future/), Fortune
9. [AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/), Google DeepMind
10. [Google's AlphaEvolve: The AI agent that reclaimed 0.7% of Google's compute](https://venturebeat.com/infrastructure/googles-alphaevolve-the-ai-agent-that-reclaimed-0-7-of-googles-compute-and-how-to-copy-it), VentureBeat
11. [AlphaEvolve: A coding agent for scientific and algorithmic discovery](https://arxiv.org/abs/2506.13131), arXiv
12. [Benchmarked MiniMax M2.7 through 2 benchmarks](https://www.reddit.com/r/LocalLLaMA/comments/1rxwcda/benchmarked_minimax_m27_through_2_benchmarks/), r/LocalLLaMA
13. [2026 will be a pivotal year for the widespread integration of AI into the economy](https://www.julian.ac/blog/2025/09/27/failing-to-understand-the-exponential-again/), Julian Schrittwieser
14. [AI Takeoff](https://www.lesswrong.com/w/ai-takeoff), LessWrong
