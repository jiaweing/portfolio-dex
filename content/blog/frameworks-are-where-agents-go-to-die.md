---
title: "Frameworks are where agents go to die"
date: "2026-04-01"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Every week there's a new agent framework. LangGraph, CrewAI, AutoGen, Mastra, OpenAI Swarm, PydanticAI, the list never stops growing. Each one promises to be the "Rails for agents," the abstraction layer that finally makes building autonomous AI systems easy and scalable.
But here's what I keep seeing: the agents that actually ship in production are almost always simple orchestration written in plain code. No DAG libraries, no role-based crew abstractions, no multi-agent conversation protocols. Just an API call, an LLM, a tool, and a log.
Frameworks add abstraction before you understand the problem. That's backwards.
## The explosion nobody asked for
The agent framework landscape in 2025 and 2026 has been staggering. LangChain's State of Agent Engineering survey found that 57% of respondents now have agents in production, but quality remains the top barrier, cited by 32% as the thing that kills their deployments. Meanwhile, analysis of enterprise AI agent projects suggests that fewer than 1 in 8 agent initiatives successfully reach production, with scope creep and data quality causing 61% of all failures.
And yet, the frameworks keep multiplying. Everyone is building the "Rails for agents" when nobody has the equivalent of a CRUD app yet. We don't have a shared understanding of what the default agent looks like, what it should do, or what the right level of abstraction even is. We're building elaborate scaffolding for a building whose blueprints haven't been drawn.
This is not a new pattern.
## We've seen this movie before
If you were around for the early web framework wars, this should feel familiar. Before Rails and Django emerged as winners, there were dozens of web frameworks that all tried to abstract away HTTP, routing, and database access in slightly different ways. Most of them got the abstraction wrong. They optimized for the wrong layer, hid the wrong details, and collapsed under the weight of real-world applications that didn't fit their assumptions.
As one observer of the current agent landscape put it, comparing it to the container orchestration wars: "The cast is different, and the stakes are much higher, but the plot is almost identical." Big tech companies are giving away agent frameworks for the same reason they gave away container orchestration tools, to control the ecosystem and lock in developers.
But there's a crucial difference. Containers are a homogeneous abstraction. A container is a container, and workloads are portable by definition. Agents are not like that. A coding agent, a customer service agent, and a data analysis agent have fundamentally different runtime requirements, tool chains, evaluation needs, and context patterns. The "Kubernetes of agents" might not be a framework at all. It might be the protocol layer.
## One agent, one job
The agents I've seen work in production share a common trait: they do one thing well. They have a narrow set of tools, a focused system prompt, and a clear contract for what they receive and what they return.
This isn't a limitation. It's a feature.
Anthropic's guide on building effective agents makes this point directly: "We suggest that developers start by using LLM APIs directly: many patterns can be implemented in a few lines of code. If you do use a framework, ensure you understand the underlying code. Incorrect assumptions about what's under the hood are a common source of customer error."
The most successful agentic systems Anthropic has seen in production use basic composable patterns. An augmented LLM with retrieval, tools, and memory. Simple workflows chained together. Not a seventeen-node graph with parallel execution paths and fallback strategies.
The real production loop for most agents is embarrassingly simple: receive input, call the model, execute a tool, observe the result, repeat if needed, return. You don't need a DAG library for that. You need a while loop and some error handling.
## Frameworks optimize for demos
Here's the uncomfortable truth: most agent frameworks are designed to make impressive demos, not reliable production systems.
LangChain's own blog post on how to think about agent frameworks acknowledged the problem with their earlier abstractions: "These abstractions end up making it really really hard to understand or control exactly what is going into the LLM at all steps. This is important, having this control is crucial for building reliable agents. This is the danger of agent abstractions."
That's LangChain saying this about their own product category.
The pattern repeats everywhere. Frameworks start with a class that involves a prompt, a model, and tools. Then they add a few more parameters. Then a few more. Eventually you end up with a wall of configuration options that control a multitude of behaviors, all hidden behind an abstraction. When something goes wrong, and it will, you have to dig into the source code to understand what happened.
The gap between a working demo and a reliable production system is exactly where agent projects go to die. One analysis found that the failure patterns are remarkably consistent across companies and industries. Agents that look polished in controlled environments fail in predictable ways when they hit real-world conditions: API timeouts, partial data, unexpected edge cases, coordination failures between components.
A framework doesn't solve these problems. Understanding your system solves these problems.
## Premature abstraction is the real enemy
The deeper issue isn't that frameworks are bad. It's that they arrive too early.
Premature abstraction, building generic solutions before you understand how things will actually vary, is one of the oldest mistakes in software engineering. As the saying goes, "It's cheaper to wait for a pattern to emerge than to undo a bad abstraction."
Agent frameworks are committing this sin at an industrial scale. They're creating elaborate type systems, orchestration patterns, and multi-agent protocols for a problem space that is still being defined. The equivalent would have been building Kubernetes in 2005, before anyone had figured out what containers were good for.
The Reddit community of agent builders has noticed this too. As one developer put it: "Every three minutes, there is a new AI agent framework that hits the market. These abstractions differ oh so slightly, viciously change, and stuff everything in the application layer. Now I wait for a patch because I've gone down a code path that doesn't give me the freedom to make modifications."
When you adopt a framework, you're betting that its authors understood your problem better than you do. In a mature domain like web development, that bet often pays off. In a domain as young and fast-moving as AI agents, it almost never does.
## Constraint as a feature
There's a philosophy I keep coming back to: give an agent four tools, not forty. Constraint is a feature, not a limitation.
When you limit what an agent can do, you make its behavior predictable. You make it testable. You make it debuggable. You make it something you can reason about when a customer reports a bug at 2 AM.
The multi-tool, multi-agent framework approach does the opposite. It multiplies the surface area for failure. Every additional tool is another thing that can timeout, return partial data, or be selected incorrectly by the model. Every additional agent in a "crew" is another source of coordination failure, context loss, and unpredictable behavior.
GitHub's engineering team studied why multi-agent workflows fail and concluded that "most multi-agent workflow failures come down to missing structure, not model capability." The fix isn't more abstraction. It's more discipline.
## When frameworks actually make sense
I don't want to be dismissive of all frameworks. Some will survive, and some will become essential.
Frameworks start to make sense when you have a genuinely complex orchestration problem at scale. When you're running multiple models, managing shared state across many agents, handling sophisticated error recovery and retry logic, and need built-in observability across the entire pipeline, that's when the overhead of a framework starts to pay for itself.
But that's not your first agent. That's your fiftieth. And by the time you need it, you'll know enough about your specific problem to evaluate whether a framework solves it or just rearranges it.
The LangChain survey found that observability is now table stakes, with 89% of respondents implementing it for their agents. That's the kind of cross-cutting concern where shared tooling genuinely helps. But observability is infrastructure, not an agent framework. There's a difference between a library that helps you see what your agent is doing and a framework that tells your agent how to think.
## What to do instead
If you're building your first agent, or even your fifth, here's what I'd recommend:
Start with the raw API. Call the model directly. Add tools one at a time. Write the orchestration loop yourself. It's probably thirty lines of code.
Invest in observability early. Log every model call, every tool invocation, every decision point. When something goes wrong, you need to see the full trace.
Keep your tool count low. Every tool you add is a new way for the agent to fail. Start with the minimum set that solves the problem.
Test with real-world inputs, not demo scenarios. The difference between a demo and production is the long tail of weird inputs, edge cases, and partial failures.
Only reach for a framework when the plain-code approach becomes genuinely painful, and you can articulate exactly what problem the framework solves that you can't solve yourself.
The agents that work in production aren't the ones with the most sophisticated architecture. They're the ones where the developers understand every line of code between the user's input and the agent's output.
Frameworks will have their day. But right now, in 2026, the smartest thing you can do is write boring code that works.
## References
1. [State of Agent Engineering](https://www.langchain.com/state-of-agent-engineering), LangChain, 2026
2. [Why 88% of AI Agents Fail Production: Analysis Guide](https://www.digitalapplied.com/blog/88-percent-ai-agents-never-reach-production-failure-framework), Digital Applied
3. [Building effective agents](https://www.anthropic.com/research/building-effective-agents), Anthropic
4. [How to think about agent frameworks](https://blog.langchain.com/how-to-think-about-agent-frameworks/), LangChain Blog
5. [The reason big tech is giving away AI agent frameworks](https://thenewstack.io/agent-framework-container-wars/), The New Stack, 2026
6. [Multi-agent workflows often fail. Here's how to engineer ones that don't.](https://github.blog/ai-and-ml/generative-ai/multi-agent-workflows-often-fail-heres-how-to-engineer-ones-that-dont/), The GitHub Blog, 2026
7. [Why AI Agents Fail in Production: What I've Learned the Hard Way](https://medium.com/@michael.hannecke/why-ai-agents-fail-in-production-what-ive-learned-the-hard-way-05f5df98cbe5), Michael Hannecke, Medium
8. [Everyone's Building AI Agent Frameworks, Most Are Getting It Wrong](https://www.artiquare.com/ai-agent-frameworks-critical-analysis/), Artiquare
9. [The 2025 AI Agent Report: Why AI Pilots Fail in Production](https://composio.dev/content/why-ai-agent-pilots-fail-2026-integration-roadmap), Composio, 2026
10. [The convenience trap of AI frameworks](https://www.reddit.com/r/AI_Agents/comments/1r5pdpj/the_convenience_trap_of_ai_frameworks/), r/AI_Agents, Reddit
