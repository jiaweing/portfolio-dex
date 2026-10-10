---
title: "Parent agent and subagent architecture"
date: "2026-04-15T12:26:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","LLMs","Prompt Engineering","Hallucinations","OpenAI","Anthropic","Google","Microsoft","Models"]
---

Most AI agent setups start the same way. You have one agent, one conversation history, and a growing list of tools. It works fine at first. Then the system prompt balloons, the context window fills with irrelevant tool responses, and the agent starts forgetting its own instructions halfway through a task.
This is the single-agent ceiling, and it hits faster than you'd expect. The fix isn't a bigger context window or a smarter model. It's architecture. Specifically, it's splitting your monolithic agent into a parent agent that coordinates and subagents that execute.
## The single-agent problem
Tools like OpenClaw made autonomous agents accessible to everyone. You message your agent, it reasons about what to do, calls tools, and gives you results. But as you add capabilities, something breaks down.
A single agent running on one conversation history accumulates everything: the system prompt, every tool description, all prior messages, and every tool response. A 300-message conversation with a dozen tools can easily consume 40,000 to 60,000 tokens of context before the agent even starts thinking about your latest request. Research from Anthropic's engineering team confirms that this context bloat is one of the primary failure modes for long-running agents.
The symptoms are predictable. The agent "forgets" instructions from its system prompt because they've been pushed too far back in the context window. It calls the wrong tools because it's confused by the sheer volume of tool descriptions. It hallucinates details from earlier in the conversation that are no longer relevant. And debugging becomes nearly impossible because the conversation history is an undifferentiated wall of text.
As one developer put it after rebuilding their OpenClaw setup: a single change to use threaded, isolated conversations "fixed 80% of my frustrations overnight."
## What parent-subagent architecture looks like
The core idea is borrowed from how organizations actually work. A general contractor doesn't personally do the electrical, plumbing, and framing. They break the project into domains, assign each to a specialist, and coordinate the results.
In a parent-subagent architecture:
- The **parent agent** (also called the orchestrator) receives the user's request, decomposes it into subtasks, and decides which subagent handles each one
- Each **subagent** is a fully independent agent with its own conversation session, its own system prompt, and only the tools it needs for its specific task
- Subagents execute their tasks in isolation and return condensed results back to the parent
- The parent synthesizes the results and responds to the user
This is what LangChain calls the "subagents pattern" in their multi-agent architecture guide: a supervisor agent coordinates specialized subagents by calling them as tools. The main agent maintains conversation context while subagents remain stateless, providing strong context isolation.
## Why isolation is the real feature
The most important benefit isn't parallelism or specialization, though those matter. It's **context isolation**.
When a subagent runs, it gets a clean context window. No leftover conversation from three tasks ago. No tool descriptions it doesn't need. No accumulated noise. It gets its system prompt, the specific task instructions from the parent, and its own tools. That's it.
Anthropic's engineering team describes this directly: "Rather than one agent attempting to maintain state across an entire project, specialized sub-agents can handle focused tasks with clean context windows. The main agent coordinates with a high-level plan while subagents perform deep technical work. Each subagent might explore extensively, using tens of thousands of tokens or more, but returns only a condensed, distilled summary of its work, often 1,000 to 2,000 tokens."
This compression is powerful. The parent agent never sees the raw tool responses, the false starts, or the intermediate reasoning of its subagents. It only sees the final answer. This keeps the parent's context window lean and focused on coordination.
As one analysis of hierarchical orchestration patterns notes: "No single agent needs to hold the full context of the entire system. The top-level agent holds the high-level objective and summary results from each branch. Workers hold only their specific subtask input and tools. This allows hierarchical systems to tackle problems that would overflow any single agent's context window."
## Keeping the parent agent lean
A bloated parent agent defeats the purpose. The parent should know how to decompose tasks and which subagent to call for what. It should not contain domain-specific knowledge, tool implementations, or detailed instructions for every possible task.
In practice, this means:
- **Minimal tools on the parent.** The parent's tools are its subagents. It doesn't need direct access to databases, APIs, or file systems unless it's doing coordination-level work.
- **Short system prompt.** The parent's instructions describe what each subagent does and when to use it. Domain expertise lives in the subagent prompts.
- **No raw data in the parent's context.** Subagents process and summarize. The parent works with summaries.
OpenClaw's multi-agent documentation reflects this pattern. The orchestrator's configuration needs to know where each subagent workspace lives, what task to give each one, and how to handle the results. Everything else is the subagent's concern.
This mirrors what the broader community has observed about prompt maintenance. As one engineering team described their journey: their single agent's system prompt grew from 100 lines to a 9,000-token monster that included persona definitions, every tool description, domain knowledge, output formatting rules, and edge cases. Splitting into a multi-agent team with focused prompts made the system maintainable again.
## Practical patterns for subagent design
There are a few patterns that work well when designing subagents:
**Give each subagent exactly the tools it needs.** A research subagent gets web search. A code subagent gets file access and a terminal. A data subagent gets database queries. No subagent gets everything. This reduces confusion and prevents the model from reaching for the wrong tool.
**Use cheaper models for routine subagents.** Not every subagent needs your most capable model. Validation, formatting, and simple lookups can run on smaller, faster models. This is a real cost control lever when you're spawning multiple subagents per request.
**Design clear input/output contracts.** The parent sends a specific task description. The subagent returns a structured result. This boundary is what makes the system composable. You can swap out a subagent's implementation without changing the parent.
**Set depth limits.** Subagents can spawn their own subagents, but unbounded recursion leads to runaway costs and latency. Most production systems cap at two or three levels of delegation.
**Handle failures at the parent level.** If a subagent fails or times out, the parent needs a strategy: retry, fall back to a different subagent, or report the failure. Don't let subagent errors silently corrupt the parent's reasoning.
## When to use this pattern
Parent-subagent architecture isn't always the right choice. For simple, single-domain tasks, a single agent with a few tools works fine. The overhead of spawning and coordinating subagents only pays off when:
- Your agent handles **multiple distinct domains** (research, code, data analysis, communication)
- Tasks involve **deep tool usage** that generates large intermediate outputs
- You need **parallel execution** of independent subtasks
- Your single agent's context window is consistently hitting its limits
- You want to use **different models** for different types of work
- Debugging has become painful because everything happens in one conversation thread
The LangChain team summarizes this well: the subagents pattern is best for "applications with multiple distinct domains where you need centralized workflow control and subagents don't need to converse directly with users."
## The tradeoffs
This architecture isn't free. You're trading simplicity for capability.
**Latency increases.** Every subagent call is at minimum one additional LLM round-trip. For tasks that chain multiple subagents sequentially, the wall-clock time can grow significantly.
**Costs multiply.** One user request might trigger three subagents, each making four tool calls. That's twelve LLM calls for a single request. Token budgets and depth limits are essential to keep costs predictable.
**Coordination is hard.** The parent needs to correctly decompose tasks, which is itself a reasoning challenge. Bad decomposition leads to subagents doing redundant work or missing important context that only another subagent has.
**Debugging spans multiple sessions.** Instead of one conversation to inspect, you now have a parent session and several subagent sessions. Good logging and tracing infrastructure becomes non-negotiable.
These tradeoffs are real, but for complex systems, the alternative, a single agent that degrades as it scales, is worse.
## Where this is heading
The multi-agent ecosystem is evolving quickly. OpenClaw introduced deterministic sub-agent spawning and structured inter-agent communication in early 2026. Google's Agent Development Kit provides built-in parent-to-child delegation. Amazon Bedrock offers native multi-agent collaboration with automatic task delegation and response aggregation. Microsoft's architecture guidance now treats multi-agent orchestration as a primary pattern rather than an advanced technique.
The underlying insight is simple: the best way to build a capable agent isn't to make one agent that can do everything. It's to build a team of focused agents that each do one thing well, coordinated by a parent that understands the big picture.
That's not a new idea. It's how every effective organization works. The AI agent ecosystem is just catching up.
## References
1. [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), Anthropic
2. [Choosing the right multi-agent architecture](https://blog.langchain.com/choosing-the-right-multi-agent-architecture/), LangChain
3. [AI agent orchestration patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns), Microsoft Azure Architecture Center
4. [Agent orchestration patterns: swarm vs mesh vs hierarchical](https://gurusup.com/blog/agent-orchestration-patterns), GuruSup
5. [Hierarchical AI agent architecture: how parent agents are redefining AI collaboration](https://medium.com/@angadi.saa/hierarchical-ai-agent-architecture-how-parent-agents-are-redefining-ai-collaboration-4b293baf4662), Shankar Angadi
6. [OpenClaw sub-agents documentation](https://docs.openclaw.ai/tools/subagents), OpenClaw
7. [OpenClaw multi-agent: subagents, agent teams and orchestration](https://www.meta-intelligence.tech/en/insight-openclaw-multi-agent), Meta Intelligence
8. [Multi-agent systems: coordinating AI agents for complex tasks](https://tutorialq.medium.com/multi-agent-systems-coordinating-ai-agents-for-complex-tasks-1743fe7855ba), Mahi Mullapudi
9. [What is AI agent orchestration?](https://www.ibm.com/think/topics/ai-agent-orchestration), IBM
10. [Guidance for multi-agent orchestration on AWS](https://aws.amazon.com/solutions/guidance/multi-agent-orchestration-on-aws/), Amazon Web Services
