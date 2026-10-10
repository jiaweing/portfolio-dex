---
title: "The framework doesn't matter"
date: "2026-03-23"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Every few weeks, a new AI agent framework drops. LangChain. CrewAI. AutoGen. LlamaIndex. Each one promises to make building agents "easy." Developer communities erupt in debates. Blog posts declare winners. Teams spend weeks running evaluations.
Then six months later, the cycle repeats with a new contender.
Here's what nobody wants to say out loud: for the vast majority of agent use cases, the framework you pick barely matters. The bottleneck is never the wrapper. It's the prompt, the tool design, and the orchestration logic underneath.
## They're thin wrappers all the way down
Strip away the branding and the developer docs, and most agent frameworks do the same thing. They wrap API calls to language models, manage a loop of thinking and acting, and provide plumbing for tool invocation and memory.
As one Hacker News commenter put it bluntly: "There isn't much that LangChain is doing in this regard. The heavy lifting is already done by the original libs like from OpenAI which they use and the rest are just wrappers around their API calls."
That's the uncomfortable truth. The core pattern behind every agent, the think-act-observe loop, is remarkably simple. You send a prompt, the model decides which tool to call, you execute the tool, feed the result back, and repeat. You can implement this in a few dozen lines of Python with nothing but an HTTP client and a JSON parser.
Frameworks add convenience on top of that loop: retry logic, streaming, memory management, tracing. But the fundamental architecture is the same whether you're using LangChain, CrewAI, or raw API calls.
## The real skill is invisible to frameworks
If the framework is just a wrapper, what actually determines whether your agent works?
Three things:
**Prompt design.** The quality of your system prompt, the way you describe tools, the instructions you give for reasoning, these are the single biggest lever on agent performance. No framework teaches you how to write a good prompt. That's craft, built through iteration and failure.
**Tool interfaces.** How you define what tools do, what inputs they accept, how their outputs are formatted, this shapes every decision the model makes. A well-designed tool interface makes the agent reliable. A sloppy one creates cascading errors no framework can catch.
**Orchestration logic.** When to use which model. When to break a task into subtasks. When to bail out and ask for human input. These decisions live in your code, not in the framework's abstractions. They require judgment about your specific domain, your users, and your cost constraints.
Frameworks can't teach these skills. They can only provide scaffolding around them.
## The over-abstraction trap
There's a pattern that plays out with thick frameworks. They make simple things easy and hard things impossible.
LangChain is the canonical example. The developer frustration around it has been loud and persistent. A LinkedIn post noted that 45% of AI teams use LangChain, but only 12% keep it in production. One developer reported cutting API latency by 1.3 seconds just by removing LangChain's memory wrapper, no model changes, no infrastructure upgrades.
The criticism is consistent across forums and communities: dependency bloat, frequent breaking changes, unstable APIs, documentation that can't keep up, and abstractions so deep that debugging becomes archaeology. As one developer on Reddit described it, "shooting your foot with LangChain blows your both legs off."
This isn't unique to LangChain. It's what happens when any framework tries to abstract away the parts you actually need to understand. When your agent breaks at 2 AM in production, and it will, those abstractions become walls. You can't debug what you don't understand.
## Constraints force clarity
There's a counterintuitive lesson here: limiting your tools makes you a better builder.
When you start with raw API calls and only four or five well-defined tools, you're forced to think carefully about each one. What does this tool actually need to do? What's the minimal input? What's the clearest output format? Every tool has to earn its place.
Add a framework with dozens of built-in integrations and that discipline evaporates. You reach for pre-built components instead of designing interfaces that fit your problem. More indirection means more places for bugs to hide. More abstraction means more surface area you don't control.
The constraint of simplicity is a feature, not a limitation. It forces you to make explicit choices about architecture instead of inheriting implicit ones from someone else's opinions.
## When frameworks genuinely help
This isn't an argument against all tooling. Frameworks have real value in specific situations.
**Team coordination.** When multiple developers are building agents in the same codebase, a shared framework enforces patterns and conventions. It's the difference between five developers writing five different agent loops and five developers building on the same foundation.
**Onboarding.** New team members can ramp up faster when there's a standard way to define agents, tools, and workflows. The framework becomes shared vocabulary.
**Enterprise requirements.** Observability, tracing, human-in-the-loop mechanisms, governance, these are genuinely hard to build from scratch. Frameworks designed for production use, especially at scale, can save months of infrastructure work.
**Rapid prototyping.** If you need a proof of concept in a day, reaching for a framework is pragmatic. Just don't mistake the prototype for the product.
The key distinction is between frameworks that earn their complexity and frameworks that impose it prematurely.
## Start raw, add structure when it hurts
Here's the practical advice: begin with the simplest thing that works.
Write a function that calls the OpenAI API. Define your tools as plain dictionaries. Implement the agent loop in thirty lines of code. Ship it.
When you hit a real pain point, a specific, concrete problem that a framework solves, that's when you adopt one. Maybe you need structured tracing across multiple agent steps. Maybe you need built-in support for multi-agent handoffs. Maybe your team is growing and you need shared patterns.
But adopt the framework for the problem you actually have, not the problem you might have someday. Premature abstraction in a field that changes every few months is a recipe for rewriting everything later anyway.
## Bet on thin layers
The AI tooling landscape moves fast. Models change. APIs change. Best practices change. In this environment, the safest bet is the thinnest possible layer between your code and the underlying capabilities.
Thick abstractions lock you into someone else's mental model of how agents should work. When that model doesn't match reality, and it won't, you're stuck fighting the framework instead of solving your problem.
Thin layers, raw API calls, small utility functions, minimal wrappers, give you the freedom to adapt. When a new model drops with different capabilities, you update a few lines of code instead of waiting for a framework release. When a best practice changes, you change your implementation instead of filing an issue and hoping.
The developers who thrive in fast-moving fields aren't the ones who picked the best framework. They're the ones who understood the fundamentals well enough to work with any framework, or none at all.
The framework doesn't matter. Your understanding of the problem does.
## References
1. "Why We No Longer Use LangChain for Building Our AI Agents," Hacker News discussion, [https://news.ycombinator.com/item?id=40739982](https://news.ycombinator.com/item?id=40739982)
2. "Building AI Agents Without Frameworks: What LangChain Won't Teach You," Can Demir, Towards AI, [https://medium.com/@candemir13/building-ai-agents-without-frameworks-what-langchain-wont-teach-you-035a11d9d80c](https://medium.com/@candemir13/building-ai-agents-without-frameworks-what-langchain-wont-teach-you-035a11d9d80c)
3. "Challenges & Criticisms of LangChain," Shashank Guda, Medium, [https://shashankguda.medium.com/challenges-criticisms-of-langchain-b26afcef94e7](https://shashankguda.medium.com/challenges-criticisms-of-langchain-b26afcef94e7)
4. "Never Use LangChain in Production," Manthan Patel, LinkedIn, [https://www.linkedin.com/posts/leadgenmanthan_never-use-langchain-in-production-45-of-activity-7367864422226112513-tMI4](https://www.linkedin.com/posts/leadgenmanthan_never-use-langchain-in-production-45-of-activity-7367864422226112513-tMI4)
5. "Why LangChain Apps Break in Production," Manasi and Mahimna, AWS in Plain English, [https://aws.plainenglish.io/why-langchain-apps-break-in-production-6a4c6aec5e9a](https://aws.plainenglish.io/why-langchain-apps-break-in-production-6a4c6aec5e9a)
6. "AI Agents Beyond the Hype: Implementing One from Scratch," Reddit r/AI_Agents, [https://www.reddit.com/r/AI_Agents/comments/1r2rpt5/ai_agents_beyond_the_hype_implementing_one_from/](https://www.reddit.com/r/AI_Agents/comments/1r2rpt5/ai_agents_beyond_the_hype_implementing_one_from/)
7. "AI Agent Frameworks Matter," Cloudamite, [https://cloudamite.com/ai-agent-frameworks-matter/](https://cloudamite.com/ai-agent-frameworks-matter/)
8. "Agent Frameworks: What They Actually Do," Reddit r/AI_Agents, [https://www.reddit.com/r/AI_Agents/comments/1llq8s9/agent_frameworks_what_they_actually_do/](https://www.reddit.com/r/AI_Agents/comments/1llq8s9/agent_frameworks_what_they_actually_do/)
