---
title: "Agents don't need memory"
date: "2026-04-03"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Everyone is racing to bolt persistent memory onto AI agents. Vector stores, RAG pipelines, long-term context databases, the assumption is that more memory equals smarter agents. It sounds intuitive. After all, human intelligence is inseparable from memory. Why wouldn't the same be true for AI?
But here's what I've learned from building agents: the best ones I've made are stateless. Memory is a feature you think you need until it starts poisoning every future decision.
## The memory hype cycle
The AI agent ecosystem has fully bought into persistent memory. Frameworks like Mem0, Letta, and LangGraph all center memory as core infrastructure. The pitch is compelling: agents that learn from past interactions, maintain context across sessions, and build knowledge over time.
The reasoning goes something like this: without memory, agents are "digital goldfish." They forget everything between conversations. They can't personalize. They can't improve. So the solution must be to give them the ability to remember.
But there's a gap between the pitch and reality. In practice, most agent workloads don't benefit from persistent memory, and the ones that adopt it often end up worse.
## Stateless agents are predictable agents
A stateless agent processes each request independently, with no knowledge of past interactions. Every input gets the same treatment. There's no hidden context influencing behavior behind the scenes.
This makes them predictable. Given the same input, you get the same output. That property alone is enormously valuable when you're building systems people rely on.
Stateless agents are also easier to debug. When something goes wrong, you can trace the issue to the current input and the current prompt. You don't have to dig through layers of accumulated memory to figure out why the agent suddenly started behaving differently on Tuesday.
And they're cheap to run. No vector database to maintain. No memory retrieval pipeline adding latency to every call. No storage costs growing with every interaction.
## Memory introduces drift
Here's the core problem with persistent memory: an agent that "remembers" wrong context makes systematically worse decisions over time.
This isn't hypothetical. Dan Giannone described it well in his analysis of AI agent memory: for power users who already provide full context in their prompts, memory often makes things worse. The memory system retrieves snippets based on keyword overlap, frequently from different projects, different timeframes, or different contexts entirely. The agent references the wrong client or mixes details from multiple projects. When something goes subtly wrong because of stale memory, users spend cognitive effort debugging whether the error came from the model or from injected context.
This is what I call memory drift. Over time, the accumulated context becomes a liability rather than an asset. Each stored "memory" is a potential source of contamination for future decisions. The more memories an agent accumulates, the harder it becomes to predict which ones will surface and how they'll influence the output.
It's the AI equivalent of a colleague who half-remembers a conversation from three months ago and confidently applies the wrong lesson to today's problem.
## Memory is a security surface
Beyond reliability, persistent memory introduces a serious security concern: memory poisoning.
Researchers at Palo Alto Networks' Unit 42 demonstrated that adversaries can use indirect prompt injection to silently corrupt an AI agent's long-term memory. In their proof of concept, a malicious webpage manipulated an agent's session summarization process, causing injected instructions to be stored in memory. Once planted, these instructions persisted across sessions and were incorporated into the agent's orchestration prompts, ultimately allowing silent exfiltration of user conversation history.
The MINJA (Memory Injection Attack) research showed over 95% injection success rates against production agents. OWASP now recognizes memory poisoning as a top agentic AI risk for 2026.
The fundamental issue is that the agent has no way to distinguish between memories formed from legitimate interactions and memories planted by an attacker. Stateless agents sidestep this entire attack surface. If there's no persistent memory to corrupt, there's nothing to poison.
## The microservices parallel
This pattern should feel familiar to anyone who's been through the stateful vs. stateless debate in distributed systems.
In the early days of web applications, stateful servers were the default. Each server maintained session information for its users. It worked until it didn't. Scaling stateful services meant complex session replication, sticky load balancing, and cascading failures when a server went down and took its sessions with it.
The industry moved to stateless architectures for good reasons: horizontal scalability, fault tolerance, and simplicity. Any server could handle any request. Failures were isolated. Deployment was straightforward.
The same forces apply to AI agents. Stateless agents scale horizontally without coordination. They're resilient to failures because there's no state to lose. They're simpler to deploy, test, and maintain.
Stateful microservices didn't disappear entirely, they still exist where persistence is genuinely necessary (databases, caches, message queues). But the default shifted to stateless, and the burden of proof fell on anyone who wanted to add state. The same shift should happen with AI agents.
## When memory actually helps
I'm not arguing that memory is never useful. There are narrow cases where it genuinely improves the agent experience:
**Personal assistants** that interact with the same user over weeks or months benefit from remembering preferences, like preferred communication style or recurring meeting contexts. The key here is that the memory is user-specific and the user can verify and correct it.
**Long-running research workflows** where an agent needs to build on previous findings across multiple sessions can benefit from structured memory, but this is closer to a working document than traditional agent memory.
**Customer support agents** that need to recall a user's history with a product have a legitimate need for memory, though this is really just database lookups dressed up as "agent memory."
The common thread is that these are cases where the agent has an ongoing relationship with a specific user or task, and where stale or incorrect memory can be caught and corrected through interaction.
For task agents, the ones that take an input and produce an output, memory is almost always over-engineering. You don't need your code review agent to remember what it reviewed last week. You don't need your summarization agent to recall previous summaries. You need them to do the current task well with the current context.
## The real bottleneck is context selection
The industry is focused on the wrong problem. The bottleneck for agent performance isn't memory, it's context selection: deciding what to feed the model for the current task.
Anthropics's engineering team described this well in their work on context engineering for agents. Waiting for larger context windows might seem like an obvious tactic, but context windows of all sizes are subject to context pollution and information relevance concerns. The fix isn't to remember more. It's to be smarter about what you include right now.
This means:
- **Compaction**: summarizing and compressing previous tool outputs after they've been used, rather than keeping raw results in context
- **Structured note-taking**: letting agents maintain a working scratchpad for the current task rather than a persistent memory bank
- **Selective retrieval**: pulling in only what's relevant to the current step, not everything the agent has ever seen
These are all techniques for managing the current context window, not for building persistent memory. They treat context as a budget to be spent wisely, not a warehouse to be filled.
I've found this to be true in practice. The agents I've built that perform best are the ones where I've invested time in curating what goes into each prompt, not in building systems to remember past interactions. Fresh context, carefully selected, beats accumulated memory almost every time.
## Build stateless by default
If you're building AI agents, start stateless. Make it the default. Only add memory when you can articulate a specific, concrete use case that stateless design can't serve.
When you do add memory, treat it with the same skepticism you'd apply to any mutable shared state:
- Give users visibility into what's stored and the ability to edit or delete it
- Add provenance tracking so you know where each memory came from
- Implement expiration so memories don't accumulate indefinitely
- Monitor for drift by comparing agent behavior with and without memory
The agents that will win aren't the ones that remember everything. They're the ones that are reliable, predictable, and good at using the context they're given right now. Memory is a feature you can add later. Reliability is much harder to bolt on after the fact.
## References
1. Dan Giannone, ["The Problem with AI Agent Memory"](https://medium.com/@DanGiannone/the-problem-with-ai-agent-memory-9d47924e7975), Medium
2. Palo Alto Networks Unit 42, ["When AI Remembers Too Much, Persistent Behaviors in Agents' Memory"](https://unit42.paloaltonetworks.com/indirect-prompt-injection-poisons-ai-longterm-memory/)
3. Christian Schneider, ["Memory poisoning in AI agents: exploits that wait"](https://christian-schneider.net/blog/persistent-memory-poisoning-in-ai-agents/)
4. Anthropic, ["Effective context engineering for AI agents"](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
5. Lakera, ["Agentic AI Threats: Memory Poisoning & Long-Horizon Goal Hijacks"](https://www.lakera.ai/blog/agentic-ai-threats-p1)
6. ByteByteGo, ["Stateless Architecture: The Key to Building Scalable and Resilient Systems"](https://blog.bytebytego.com/p/stateless-architecture-the-key-to)
7. Cerbos, ["The Importance of Stateless Architecture"](https://www.cerbos.dev/blog/the-importance-of-stateless-architecture-in-authorization-systems)
8. Comet, ["Context Window: What It Is and Why It Matters for AI Agents"](https://www.comet.com/site/blog/context-window/)
