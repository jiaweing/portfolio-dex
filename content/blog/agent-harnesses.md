---
title: "Agent harnesses"
date: "2026-04-10T12:08:00.000+08:00"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

If you want to understand where AI agent performance actually comes from, look at the Terminal Bench 2.0 leaderboard. ForgeCode running Claude Opus 4.6 sits at rank #2 with 81.8% accuracy. Claude Code, Anthropic's own terminal agent, running Claude Opus 4.5, lands at rank #49 with 52.1%. Same family of model. A nearly 30-point gap.
The difference isn't the model. It's the harness.
## What is an agent harness?
An agent harness is everything wrapped around a language model to make it function as an agent. The execution loop that decides when to call the model again. The tools it can access. The logic controlling what context gets loaded into the model's window and when. The error recovery behavior when something fails. The memory and state management between steps.
Martin Fowler's definition puts it simply: Agent = Model + Harness. The model reads input and generates output. The harness is the entire system that turns those capabilities into useful work.
Claude Code is a harness. Cursor's agent mode is a harness. ForgeCode is a harness. They all wrap language models in different architectures, with different context management strategies, different tool interfaces, and different recovery mechanisms. Swap the harness, keep the model, and you get completely different outcomes.
## The Terminal Bench evidence
Terminal Bench is a benchmark suite developed by Stanford and Laude for evaluating AI agents in real terminal environments. Tasks range from compiling code to training models and setting up servers. It tests what actually matters for practical agent use: can the agent navigate an unfamiliar codebase, decompose a problem, call tools correctly, and finish the task under time and context constraints?
The leaderboard tells a clear story about what drives performance:
- **ForgeCode + GPT-5.4**: 81.8% (Rank #1)
- **ForgeCode + Claude Opus 4.6**: 81.8% (Rank #2)
- **TongAgents + Gemini 3.1 Pro**: 80.2% (Rank #3)
- **Claude Code + Claude Opus 4.5**: 52.1% (Rank #49)
- **OpenHands + Claude Opus 4.5**: 51.9% (Rank #50)
ForgeCode achieves nearly identical top-tier results with two completely different models from two different providers. Meanwhile, Claude Opus running under Claude Code scores 30 points lower than the same model family running under ForgeCode. The model matters far less than most people assume.
This isn't unique to Terminal Bench. On SWE-bench, the same pattern holds. Six frontier models now score within 0.8 points of each other on SWE-bench Verified when run through the same scaffolding, but changing only the scaffolding produces 22+ point swings with the same model.
## Why harnesses matter more than models
The core insight is that once a model crosses a capability threshold, the thing that can reliably follow multi-step instructions, use tools correctly, and recover from single-step errors, the harness becomes the primary bottleneck.
There are a few reasons for this.
### Context is a scarce resource
Models have finite context windows. How the harness manages that window determines whether the agent remembers the right things at the right time. A naive harness that stuffs everything into context will hit limits fast. A well-designed one indexes the codebase, retrieves only what's relevant, and compresses or discards stale information. Anthropic's own research on long-running agents found that basic context compaction isn't enough. You need structured artifacts to hand off context between sessions and decomposition strategies to break work into tractable chunks.
### Error recovery compounds
When an agent makes a mistake, what happens next matters enormously. Does the harness detect the failure? Does it provide the model with useful diagnostic information? Can it retry with different context? Or does it let the error cascade into subsequent steps? ForgeCode's blog series on their climb from 25% to 81.8% on Terminal Bench identified seven distinct failure modes, all of them harness problems, not model problems. Fixes included better tool-call naming, planning enforcement, skill routing, and reasoning-budget control.
### Tool design shapes agent behavior
Anthropic's research on writing effective tools for agents found that tool quality directly drives agent performance. How you describe tools, what parameters you expose, how you handle errors in tool responses, these all affect whether the model can use them correctly. A well-designed harness optimizes its tools for LLM consumption, not just human readability.
## The emerging discipline of harness engineering
What we're seeing is the emergence of harness engineering as a distinct discipline. It's not prompt engineering (crafting better instructions), though that's part of it. It's not context engineering (curating what the model sees), though that's part of it too. Harness engineering is the full-stack practice of designing the runtime system that makes an agent effective.
Anthropic has published extensively on this. Their harness design work for long-running applications uses a three-agent architecture, a planner, a generator, and an evaluator, that produced rich full-stack applications over multi-hour autonomous coding sessions. The key techniques included decomposing builds into tractable chunks, using structured artifacts to hand off context between sessions, and building verification loops that catch failures before they compound.
Martin Fowler frames it in terms of feedforward and feedback controls. Guides (feedforward) anticipate the agent's behavior and steer it before it acts. Sensors (feedback) observe after the agent acts and help it self-correct. Custom linter messages that include correction instructions are a form of positive prompt injection. You need both. Feedback-only gives you an agent that keeps repeating mistakes. Feedforward-only gives you an agent that encodes rules but never finds out if they worked.
## What this means in practice
If you're building with AI agents, the implication is straightforward: spend less time debating which model to use and more time designing the system around it.
This means investing in context management that treats the context window as a scarce resource rather than an infinite buffer. It means building verification loops so the agent can catch and correct its own mistakes. It means designing tools that are optimized for how LLMs process information, not just how humans would use them. It means thinking about state persistence, retry logic, and graceful degradation.
The Terminal Bench leaderboard is proof. ForgeCode didn't get to #1 by using a better model. They got there by building a better harness. Their model-agnostic results, identical accuracy with GPT-5.4 and Claude Opus 4.6, show that the harness, not the model, is their actual product.
As models continue to converge in raw capability, the harness becomes the differentiator. The companies shipping the best AI agents today all understand this. The agent harness is not a solved problem or a commodity layer. It's where the hard engineering lives.
## References
1. [Terminal Bench 2.0 Leaderboard](https://www.tbench.ai/leaderboard/terminal-bench/2.0)
2. [Effective harnesses for long-running agents, Anthropic Engineering](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
3. [Harness design for long-running application development, Anthropic Engineering](https://www.anthropic.com/engineering/harness-design-long-running-apps)
4. [Effective context engineering for AI agents, Anthropic Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
5. [Benchmarks Don't Matter, Until They Do (Part 1), ForgeCode](https://forgecode.dev/blog/benchmarks-dont-matter/)
6. [Benchmarks Don't Matter, Until They Do (Part 2), ForgeCode](https://forgecode.dev/blog/gpt-5-4-agent-improvements/)
7. [Harness engineering for coding agent users, Martin Fowler](https://martinfowler.com/articles/harness-engineering.html)
8. [The Anatomy of an Agent Harness, Avi Chawla](https://blog.dailydoseofds.com/p/the-anatomy-of-an-agent-harness)
9. [Agent Scaffolding Beats Model Upgrades: 42% to 78% on SWE-Bench, Particula](https://particula.tech/blog/agent-scaffolding-beats-model-upgrades-swe-bench)
10. [Writing effective tools for AI agents, Anthropic Engineering](https://www.anthropic.com/engineering/writing-tools-for-agents)
