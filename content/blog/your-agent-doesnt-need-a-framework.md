---
title: "Your agent doesnt need a framework"
date: "2026-03-24"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Every week there's a new agent framework. LangGraph, CrewAI, AutoGen, OpenAI Swarm, and dozens more, each promising to make agent development "easy." The ecosystem is exploding, and developers feel real pressure to pick a side.
But here's the thing most of these frameworks won't tell you: the majority of agent tasks don't need any of them. A function, a loop, and an LLM call will get you further than you think.
## The framework trap
The pattern is familiar. A new framework launches with slick docs and a demo that chains together five agents to answer a question. Developers flock to it, spend a weekend learning the abstractions, and wire up something that works in a notebook. Then it breaks at 2 AM in production, and suddenly those abstractions become walls.
This is the core tension. Frameworks add layers between you and what's actually happening. That's fine when you understand the layers. It's a nightmare when you don't. And most developers adopting these frameworks are still figuring out the basics of how agents work in the first place.
The real problem isn't the frameworks themselves. It's that they're reached for too early, before the problem is even understood.
## Most production agents are embarrassingly simple
Strip away the marketing and conference talks, and most agents running in production today look surprisingly boring. A system prompt. A tool or two. A loop that calls the LLM, checks if there's a tool call to make, runs it, and feeds the result back. Repeat until done.
Anthropic described this exact architecture in their guide to building effective agents: a simple while-loop that keeps running as long as there are tool calls to process. The pseudocode is almost trivial, maybe four lines of real logic. Call the model. If it wants to use a tool, run the tool. Give the result back. Keep going until the model says it's done.
That's it. That's the agent.
No directed acyclic graphs. No classifier chains. No elaborate state machines. Just a prompt, a loop, and some well-defined tools.
## One agent, one job
The most reliable agents in production follow a simple principle: do one thing well. A narrow agent with a focused prompt and a handful of purpose-built tools will outperform a Swiss-army-knife framework agent every time.
Consider the difference between giving an agent access to a generic "send message" tool versus a specific "notify customer about order status" tool. The specific tool constrains the problem space. It reduces the chance of misuse. It makes the agent's behavior predictable and debuggable.
This is the same instinct behind Inflection's design of Pi, which launched with an intentionally minimal set of capabilities. Instead of trying to do everything, it focused on doing a few things exceptionally well. The lesson applies directly to agent design: four focused tools beat forty generic ones.
When you limit your agent's scope, you gain something invaluable: the ability to reason about what it will do. You can test it. You can trust it. You can explain it to your team.
## What frameworks actually hide from you
Every abstraction has a cost. When a framework manages your prompt construction, your tool routing, your state, and your memory, you're trusting that its authors made the right decisions for your use case. Often they didn't.
Here's what tends to go wrong:
**Debugging becomes archaeology.** When your agent makes a bad tool call, you need to trace back through the framework's internals to understand why. With a simple loop, the entire execution history is right there in the conversation.
**State management gets opaque.** Frameworks often require you to define state schemas upfront, and those schemas become rigid and messy as the agent evolves. In a basic loop, your state is just the conversation history, something the LLM already knows how to work with.
**Prompt control slips away.** Many frameworks construct prompts behind the scenes, injecting system messages, formatting tool descriptions, and managing context in ways you can't easily inspect. When the output is wrong, you can't always tell if it's your prompt or the framework's.
**Upgrades break things.** Framework APIs change frequently. A version bump can silently alter how your agent behaves. With a direct API integration, you control the surface area.
## When frameworks actually make sense
None of this means frameworks are useless. They solve real problems, just not the ones most developers face on day one.
Frameworks earn their place when you need multi-agent orchestration at genuine scale, where agents hand off tasks, share state, and coordinate across complex workflows. They help when you need enterprise-grade compliance and auditing baked into every interaction. And they're useful when your state management genuinely outgrows what a conversation history can handle.
If you're building a system where ten agents collaborate across three services with rollback capabilities and human-in-the-loop approval gates, yes, reach for a framework. You'll be glad it exists.
But if you're building an agent that reads emails and drafts responses, or one that monitors a database and sends alerts, or one that takes a user question and searches a few APIs, you probably don't need one. And starting without a framework means you'll actually understand your system when it's time to scale.
## The vibe coding test
Here's a useful litmus test: if your agent is simple enough to vibe-code in an afternoon, you don't need a framework.
Vibe coding, the practice of describing what you want to an AI coding assistant and letting it generate the implementation, works remarkably well for straightforward agent builds. Tell Cursor or Claude Code to "build me an agent that does X with these tools" and you'll often have something running within an hour.
That's not a sign that the problem is trivial. It's a sign that the core architecture of most agents, a loop with tools, is genuinely simple. The complexity lives in the prompt design, the tool definitions, and the edge cases, not in the orchestration layer.
When a framework is necessary, vibe coding won't get you there. That's actually a pretty good signal.
## Start without the framework
The real skill in building agents isn't picking the right framework. It's knowing when you don't need one.
Start with the simplest thing that could work. Write a function that calls the LLM. Give it a tool or two. Wrap it in a loop. Handle the edge cases as they come up. You'll learn more about how agents actually work in an afternoon of building from scratch than in a week of reading framework documentation.
And when you eventually do hit the limits of your simple setup, you'll know exactly what you need from a framework, because you'll have felt the pain yourself. That's the best possible position to be in when evaluating tools.
The agent framework ecosystem will keep growing. New options will keep appearing. But the fundamentals haven't changed: an LLM, some tools, and a loop. Everything else is optional.
## References
1. Anthropic, "Building effective agents" (2024), [https://www.anthropic.com/research/building-effective-agents](https://www.anthropic.com/research/building-effective-agents)
2. Anthropic, "Writing effective tools for AI agents" (2025), [https://www.anthropic.com/engineering/writing-tools-for-agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
3. Oracle Developers, "What Is the AI Agent Loop? The Core Architecture Behind Autonomous AI Systems," [https://blogs.oracle.com/developers/what-is-the-ai-agent-loop-the-core-architecture-behind-autonomous-ai-systems](https://blogs.oracle.com/developers/what-is-the-ai-agent-loop-the-core-architecture-behind-autonomous-ai-systems)
4. Can Demir, "Building AI Agents Without Frameworks: What LangChain Won't Teach You," Towards AI (2026), [https://medium.com/@candemir13/building-ai-agents-without-frameworks-what-langchain-wont-teach-you-035a11d9d80c](https://medium.com/@candemir13/building-ai-agents-without-frameworks-what-langchain-wont-teach-you-035a11d9d80c)
5. Braintrust, "The canonical agent architecture: A while loop with tools," [https://www.braintrust.dev/blog/agent-while-loop](https://www.braintrust.dev/blog/agent-while-loop)
6. Victor Dibia, "The Agent Execution Loop: How to Build an AI Agent From Scratch," [https://newsletter.victordibia.com/p/the-agent-execution-loop-how-to-build](https://newsletter.victordibia.com/p/the-agent-execution-loop-how-to-build)
