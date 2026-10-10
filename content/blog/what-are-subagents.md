---
title: "What are subagents?"
date: "2026-04-06T16:48:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

If you have used any AI coding tool in the last year, you have probably noticed something shift. The AI is no longer just responding to your prompts. It is delegating. It is breaking your request into pieces, handing them off to smaller, focused workers, and assembling the results. This is the world of subagents, and it is quietly reshaping how we think about AI systems.
## From one agent to many
For most of AI's recent history, the interaction model was simple: one user, one model, one conversation. You typed a prompt, the model responded, and everything lived in a single context window. This worked well for short tasks, but it broke down fast when the work got complex.
The problem was not intelligence. The models were capable enough. The problem was *architecture*. A single agent trying to research a codebase, plan a refactor, write the code, and run the tests would burn through its context window, lose track of earlier findings, and start making mistakes. Every task polluted the same shared memory. Developers called this "context rot," where the accumulation of irrelevant details gradually degrades the model's performance.
The solution turned out to be the same one humans discovered thousands of years ago: divide the work.
## What is a subagent?
A subagent is a specialized AI instance spawned by a main agent to handle a specific task. It runs in its own isolated context window with its own system prompt, its own set of tools, and its own permissions. When it finishes, it returns a summary of its work to the parent agent and disappears.
Think of it like a manager delegating to a team. The manager keeps the big picture in mind. Each team member focuses on one piece, works independently, and reports back. The manager never needs to see every detail of every task, just the conclusions.
This pattern goes by several names: orchestrator-worker, lead-subagent, or hierarchical delegation. The core idea is always the same. One agent plans and coordinates. Many agents execute in parallel.
## How Claude Code pioneered the pattern
Claude Code was one of the first mainstream AI tools to ship subagents as a core feature. It started with a few built-in subagents, each designed for a common workflow:
- **Explore**: A fast, read-only agent optimized for searching and analyzing codebases. It uses a cheaper, faster model (Haiku) and has no write access, keeping exploration lightweight and contained.
- **Plan**: A research agent that gathers context before presenting a plan. It reads code and documentation but never modifies anything.
- **General-purpose**: A capable agent for complex, multi-step tasks that require both reading and writing. It inherits the full tool set of the main conversation.
These built-in agents solved an immediate problem. When you asked Claude Code to explore a large codebase, the exploration output no longer clogged your main conversation. The Explore subagent did the work in its own context, summarized what it found, and returned just the relevant bits.
But the real breakthrough came with *custom* subagents. Anthropic opened the system up so that developers could define their own specialized agents, each with a name, a description, a system prompt, a set of allowed tools, and even a preferred model. You could create a code reviewer that only had read access, a debugger that could edit files, or a database analyst restricted to SELECT queries. Each one lived as a simple Markdown file in your project.
Claude uses each subagent's description to decide when to delegate. When you ask it to review code, it checks which subagent fits the task and hands it off automatically. No manual routing required.
## The power of parallel execution
The most transformative aspect of subagents is parallelism. A single agent works sequentially, one search, one file read, one analysis at a time. Subagents can run simultaneously, each exploring a different direction.
Anthropic demonstrated this at scale with their multi-agent Research system. When a user submits a complex query, a lead agent analyzes it, develops a strategy, and spawns multiple subagents to explore different aspects at the same time. Each subagent independently searches, evaluates, and filters information, then returns its findings. The lead agent synthesizes everything into a coherent answer.
The performance gains are substantial. Anthropic's internal evaluations found that a multi-agent system with Claude Opus 4 as the lead and Claude Sonnet 4 subagents outperformed a single-agent Claude Opus 4 by 90.2% on their research benchmarks. For breadth-first tasks, like finding all board members of every Information Technology company in the S&P 500, the multi-agent system succeeded where the single agent failed entirely.
The numbers behind this are revealing. In Anthropic's analysis of the BrowseComp evaluation, three factors explained 95% of performance variance: token usage alone explained 80%, with tool calls and model choice covering the rest. Multi-agent systems are, at their core, a way to spend more tokens on a problem, but to spend them *efficiently* by distributing them across focused, parallel workers.
## Context isolation: the hidden superpower
Parallelism gets the headlines, but context isolation may be the more important innovation.
Every subagent starts with a clean context window. It receives only its task description and system prompt, not the full history of the parent conversation. This means each subagent operates with maximum focus and minimum noise.
When the subagent finishes, only its summary returns to the parent. The verbose logs, the dead-end searches, the intermediate reasoning, all of that stays contained. The parent agent's context stays clean and strategic.
This is especially valuable for tasks that produce large amounts of output. Running a test suite, processing log files, or auditing a codebase can generate thousands of lines of text. Without subagents, all of that would consume the main agent's context window. With subagents, the parent only sees "12 tests failed, here are the details for the 3 most critical ones."
## From subagents to agent teams
The natural evolution of subagents is agent teams, where multiple agents work not just in parallel but in coordination across separate sessions.
The progression looks like this:
1. **Single agent**: One model, one conversation, one context window. Simple but limited.
2. **Custom agents**: Users define specialized agents with focused prompts and tool access. Better, but still sequential.
3. **Subagents**: The main agent spawns child agents that work in their own context windows. Parallel execution, context isolation, and automatic delegation.
4. **Agent teams**: Multiple agents coordinate across independent sessions, sharing information through external systems like task boards and message passing.
Each step increases the system's capacity to handle complex, multi-faceted work. A single agent can write a function. A subagent system can refactor a module. An agent team can build a feature across multiple services.
## Practical takeaways
If you are building with or thinking about subagents, here are some lessons from the early adopters:
**Design focused subagents.** Each subagent should excel at one specific task. A code reviewer that also deploys to production is a code reviewer that does neither well.
**Write clear descriptions.** The orchestrator uses the description to decide when to delegate. Vague descriptions lead to tasks going to the wrong agent or not being delegated at all.
**Limit tool access.** A read-only reviewer should not have write permissions. Restricting tools is not just a safety measure, it helps the subagent stay focused.
**Scale effort to complexity.** Not every query needs five subagents. Simple fact-finding might need one agent with a few tool calls. Complex research might need ten agents with clearly divided responsibilities.
**Start broad, then narrow.** Subagents tend to default to overly specific searches. Prompting them to start with broad queries and then drill down produces better results.
**Expect higher token costs.** Multi-agent systems use significantly more tokens than single-agent interactions. Anthropic reports that agents use about 4x more tokens than chat, and multi-agent systems use about 15x more. The value of the task needs to justify the cost.
## Where this is heading
Subagents represent a fundamental shift in how AI systems are structured. The single-agent paradigm, where one model handles everything in one context window, is giving way to hierarchical, parallel architectures that mirror how human organizations work.
The trajectory is clear. As models become more capable and token costs continue to fall, we will see more sophisticated orchestration patterns. Agents that can dynamically spawn the right number of subagents based on task complexity. Subagents that can resume previous work instead of starting fresh. Teams of agents that coordinate asynchronously across long-running projects.
The foundation has been laid. The era of the single, all-knowing AI assistant is evolving into something more powerful: a network of specialized agents, each focused, each efficient, working together toward a shared goal.
## References
1. Anthropic, "Create custom subagents," Claude Code Documentation, [https://code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents)
2. Anthropic, "How we built our multi-agent research system," Anthropic Engineering Blog, June 13, 2025, [https://www.anthropic.com/engineering/multi-agent-research-system](https://www.anthropic.com/engineering/multi-agent-research-system)
3. Gigi Sayfan, "Claude Code Deep Dive - Subagents in Action," Medium, February 9, 2026, [https://medium.com/@the.gigi/claude-code-deep-dive-subagents-in-action-703cd8745769](https://medium.com/@the.gigi/claude-code-deep-dive-subagents-in-action-703cd8745769)
4. Jiten Oswal, "The Architecture of Scale: A Deep Dive into Anthropic's Sub-Agents," Medium, February 2026, [https://medium.com/@jiten.p.oswal/the-architecture-of-scale-a-deep-dive-into-anthropics-sub-agents-6c4faae1abda](https://medium.com/@jiten.p.oswal/the-architecture-of-scale-a-deep-dive-into-anthropics-sub-agents-6c4faae1abda)
5. IBM, "The Evolution of AI Agents," [https://www.ibm.com/think/topics/evolution-of-ai-agents](https://www.ibm.com/think/topics/evolution-of-ai-agents)
6. Spring AI, "Agentic Patterns (Part 4): Subagent Orchestration," January 27, 2026, [https://spring.io/blog/2026/01/27/spring-ai-agentic-patterns-4-task-subagents](https://spring.io/blog/2026/01/27/spring-ai-agentic-patterns-4-task-subagents)
7. VoltAgent, "Awesome Claude Code Subagents," GitHub, [https://github.com/VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
