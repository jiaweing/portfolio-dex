---
title: "Agents dont need frameworks"
date: "2026-04-27"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","LLMs","OpenAI","Anthropic","Google","Microsoft","Open Source"]
---

Every week there's a new agent framework. Mastra, CrewAI, LangGraph, AutoGen, whatever dropped this morning. The pitch is always the same: autonomous agents made easy, multi-agent systems in minutes, the Rails of AI agents. And the demos are impressive. A multi-agent workflow diagram in a README gets GitHub stars. A orchestrator coordinating three specialized agents to plan a trip looks magical in a conference talk.
But here's what nobody tells you: the most reliable agents running in production right now are just API calls, a loop, and some if-statements. Frameworks are solving for demos, not deployment.
## The proliferation problem
The agent framework space has reached a level of saturation that should make anyone pause. Every major AI lab now ships one. Anthropic launched the Claude Agent SDK. OpenAI replaced the experimental Swarm with a production-grade Agents SDK. Google released ADK in four languages. Microsoft merged AutoGen and Semantic Kernel into a unified Agent Framework. And that's just the big players, not counting the dozens of open-source projects jockeying for position on GitHub.
Each promises to be the abstraction layer that finally makes agents simple. Each introduces its own vocabulary, its own patterns, its own opinions about how agent logic should be structured. LangGraph wraps everything in a state machine metaphor. CrewAI injects role-play and team metaphors. AutoGen emphasizes conversational architecture. They all solve the same core loop, an LLM thinks, calls tools, observes results, and responds, but they all solve it differently.
The result is a fragmented ecosystem where your choice of framework matters less for what it enables and more for what it locks you into.
## What a production agent actually looks like
Strip away the abstractions and a production agent is surprisingly simple. It's an API call to a language model. A retry loop with exponential backoff. Error handling for when the model returns garbage. A kill switch for when costs spike. That's it.
You don't need a DAG orchestrator for that. You don't need a directed graph with conditional edges. You don't need agents with backstories and role descriptions. You need a function that calls an LLM, parses the response, maybe calls a tool, and loops until the task is done or a limit is hit.
The real production challenges aren't about agent orchestration at all. As one engineer put it after months of running agents in production: "The real production killer isn't the agent library, it's everything around it. Rate limiting, cost controls, fallback strategies when the LLM provider has a bad day." They ended up building more infrastructure around the framework than the framework itself provided.
This matches broader industry data. According to a 2026 analysis, 67% of organizations using agents report productivity gains, but only 10% are scaling them in production. The gap almost always comes down to the same thing: teams picked the framework that produced the fastest demo, only to discover it couldn't handle production failure modes, compliance requirements, or cost constraints.
## Why frameworks get adopted anyway
If frameworks aren't necessary for production, why does every new one get thousands of stars overnight?
Because they make demos look incredible. A multi-agent workflow diagram in a README is visual, impressive, and shareable. "Look, three agents collaborating to research, write, and review a report!" That's a compelling story. It gets conference talks accepted and blog posts shared.
Simplicity doesn't sell the same way. Nobody screenshots a while loop with an API call and posts it on Twitter. There's no architecture diagram to admire. But that boring code is what actually runs at 2 AM on a Saturday without waking anyone up.
Frameworks also benefit from a real psychological pull: they make complex things feel manageable by giving them names and structures. Defining an "Agent" with a "role" and "backstory" feels more intentional than writing a prompt and a loop. But the feeling of structure isn't the same as actual reliability.
## Match the tool to the problem
There's a useful principle here: match the complexity of the tool to the complexity of the problem. Most agent tasks are simple. A customer support bot that looks up an order and responds. A code reviewer that reads a diff and leaves comments. A data pipeline that summarizes daily reports. These don't need multi-agent orchestration. They need a well-written prompt, a tool call or two, and some error handling.
The instinct to reach for a framework often comes from imagining the final, most complex version of a system rather than the version you need today. You picture a fleet of specialized agents coordinating across services, so you pick the framework that supports that architecture. But you're building for a future that may never arrive, and paying the complexity tax right now.
Start with the simplest thing that works. An API call and a loop. If that's not enough, add structure incrementally. Most of the time, you'll find that simple code with good observability outperforms a framework with impressive abstractions.
## Framework lock-in is the new cloud lock-in
Here's the part that doesn't get enough attention: when you adopt a framework, your agent logic becomes coupled to someone else's abstraction. And in a space moving this fast, those abstractions change constantly.
CrewAI's API surface has shifted significantly between major versions. LangGraph's state management patterns have evolved as the team learns what works. AutoGen went through a complete architectural overhaul when Microsoft merged it with Semantic Kernel. If your production agent is built on any of these, a framework update can mean a rewrite.
This is transitional lock-in, and it's arguably worse than cloud lock-in. At least AWS APIs are stable. Agent framework APIs are not. Your agent logic is now coupled to someone else's abstraction that changes every two weeks, and the migration path is often "rewrite your agents."
When you write plain code, your only dependencies are the LLM API itself, which is far more stable, and your own abstractions, which you control.
## When frameworks actually make sense
This isn't a blanket argument against all frameworks in all situations. There are legitimate cases where a framework earns its keep:
- **Multi-model routing**: If you're dynamically routing between different models based on task complexity, cost, or latency requirements, a framework that handles provider abstraction can save real time.
- **Complex state machines**: If your agent genuinely needs branching logic with multiple decision points, parallel execution paths, and dynamic adaptation, a graph-based approach like LangGraph provides useful primitives.
- **Team guardrails**: If you have a team of engineers with varying experience levels building agents, a framework can enforce patterns and prevent common mistakes.
- **Rapid prototyping**: If you need to validate an idea quickly and plan to rewrite for production anyway, frameworks can compress the feedback loop.
But here's the thing: that's maybe 5% of use cases. Most agents in production are doing one thing in a loop. They don't need a framework any more than a CRUD app needs a microservices architecture.
## The democratization counterpoint
There's a fair counterargument: "just write code" doesn't scale for everyone. Not every team building agents has experienced engineers who can design retry logic, manage state, and handle edge cases from scratch. Frameworks democratize agent development by packaging these patterns into reusable components.
That's true, and it matters. But democratization has a cost. When the framework handles complexity for you, it also hides complexity from you. And when something breaks in production, the complexity you didn't learn is exactly the complexity you need to debug.
The better path for most teams isn't adopting a heavy framework but building a thin internal layer, a few hundred lines of code that wrap your LLM calls, handle retries, manage costs, and provide observability. You own it, you understand it, and you can fix it at 2 AM without reading someone else's changelog.
## The practical takeaway
Before you add an agent framework to your next project, ask yourself three questions:
1. **What does this framework give me that I can't write in a hundred lines of code?** If the answer is "a nicer API for the demo," that's not enough.
2. **What happens when this framework releases a breaking change?** If the answer involves rewriting your agent logic, you're taking on more risk than you realize.
3. **Is my agent actually complex enough to need this?** Most aren't. A loop, an API call, and good error handling will take you further than you think.
The agent framework gold rush will settle eventually. The abstractions will stabilize. The winners will emerge. But right now, in this moment, the safest bet for production is the code you write yourself. It's not glamorous. It won't get GitHub stars. But it'll run.
## References
1. [AI Agent Frameworks Compared: Which Ones Ship?](https://www.chanl.ai/blog/ai-agent-frameworks-compared-2026-what-ships), Chanl Blog, 2026
2. [Top AI Agent Frameworks in 2026: A Production-Ready Comparison](https://pub.towardsai.net/top-ai-agent-frameworks-in-2026-a-production-ready-comparison-7ba5e39ad56d), Towards AI, 2026
3. [Which agent framework survived production](https://www.reddit.com/r/AI_Agents/comments/1sutvdc/which_agent_framework_survived_production/), Reddit r/AI_Agents
4. [AI Agent Frameworks in 2026: 8 SDKs, ACP, and the Trade-offs Nobody Talks About](https://www.morphllm.com/ai-agent-framework), Morph LLM, 2026
5. [AI Agents in Production: Frameworks, Protocols, and What Actually Works in 2026](https://47billion.com/blog/ai-agents-in-production-frameworks-protocols-and-what-actually-works-in-2026/), 47Billion
6. [What Is the Transitional Lock-In Risk in AI Agent Infrastructure?](https://www.mindstudio.ai/blog/transitional-lock-in-risk-ai-agent-infrastructure/), MindStudio
7. [LangGraph and CrewAI are overcomplicating agents for the sake of content](https://www.reddit.com/r/LangChain/comments/1ly2rbj/unpopular_opinion_langgraph_and_crewai_are/), Reddit r/LangChain
8. [What Challenges Do Developers Face in AI Agent Systems?](https://arxiv.org/html/2510.25423v2), arXiv, 2025
