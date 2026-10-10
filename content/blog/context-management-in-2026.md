---
title: "Context management in 2026"
date: "2026-03-28T14:45:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

If you've spent any time building with AI agents, you've hit the wall. Not the model's intelligence wall, but the context wall. Your agent starts strong, gathers information, calls tools, reasons through problems, and then somewhere around the 30-minute mark, things start to fall apart. Responses get repetitive. Important details vanish. The agent forgets what it already tried.
Context windows keep growing, with some models now supporting over a million tokens, but bigger windows haven't solved the problem. In fact, they've introduced new ones. The real challenge in 2026 isn't fitting more tokens into the window. It's deciding which tokens deserve to be there.
## Why bigger context windows aren't the answer
It's tempting to think that a million-token context window means you can throw everything in and let the model sort it out. Documents, tool definitions, conversation history, retrieved passages, all of it. But research keeps showing that model performance degrades as context length increases, even well before the window is full.
Anthropic's engineering team describes this as a finite "attention budget." Every token in the context competes for the model's attention due to the transformer architecture's n² pairwise relationships between tokens. As context grows, the model's ability to accurately recall and reason over that information gets stretched thin. This isn't a bug, it's a fundamental property of how these systems work.
Drew Breunig catalogued four specific ways that long contexts fail agents:
- **Context poisoning** happens when a hallucination or error enters the context and gets referenced repeatedly, sending the agent down impossible paths
- **Context distraction** occurs when accumulated history causes the model to repeat past actions rather than synthesize new strategies
- **Context confusion** arises when irrelevant information, like unused tool definitions, influences the model's responses
- **Context clash** emerges when different parts of the context contradict each other, which is especially common in multi-turn conversations
Google's Gemini team observed this directly when their agent played Pokémon. Beyond 100k tokens, the agent started favoring repeated actions from its history over developing new strategies. The context that was supposed to help became the thing holding it back.
The takeaway is clear: context management isn't optional. It's the core engineering discipline for building agents that work reliably over long time horizons.
## Compaction
Compaction is the most widely adopted technique for keeping agents functional during extended sessions. The idea is straightforward: when the context window approaches its limit, summarize the conversation so far and start a fresh window with that summary.
Claude Code implements this by passing the full message history to the model for compression. The model preserves architectural decisions, unresolved bugs, and key implementation details while discarding redundant tool outputs and intermediate messages. The agent then continues with the compressed context plus a handful of recently accessed files. Users get continuity without manually managing what the model remembers.
The art of compaction is in choosing what to keep. Overly aggressive compression loses subtle details whose importance only becomes apparent later. The recommendation from Anthropic's applied AI team is to start by maximizing recall, making sure your compaction captures everything potentially relevant, then iterate to trim the noise.
One of the safest and lightest forms of compaction is **tool result clearing**. Once a tool has been called and its output processed, the raw result deep in the message history rarely needs to be seen again. Stripping these out is low-risk and can free up significant space.
## Starting fresh sessions
Sometimes the best context management strategy is the simplest one: don't let context accumulate in the first place.
When working on distinct features or tasks, starting a new session for each one prevents context pollution from the previous task bleeding into the next. This is especially valuable in coding workflows. If you've been debugging an authentication module for an hour, your context is saturated with auth-related reasoning, error traces, and file contents. Switching to work on a payment feature in that same session means the model has to reason through payments while still "remembering" all that auth context, which can lead to confusion and cross-contamination.
Starting a clean session for each new feature gives the agent a pristine attention budget focused entirely on the task at hand. It's the manual equivalent of compaction, but with zero risk of important information being lost, because you're making the deliberate choice that the previous context isn't relevant.
This approach pairs well with structured note-taking. Before ending a session, have the agent write down key decisions, open questions, and current state. Then the next session can pick up from those notes without inheriting all the noise from the previous conversation.
## Subagents and context isolation
Multi-agent architectures tackle context management by splitting work across agents with separate context windows. Instead of one agent trying to hold everything in its head, a lead agent coordinates while specialized subagents handle focused tasks.
Each subagent gets a clean context window scoped to its specific job. A research subagent might explore extensively, consuming tens of thousands of tokens worth of search results and documents, but it returns only a condensed summary of 1,000 to 2,000 tokens to the lead agent. The detailed search context stays isolated within the subagent and never pollutes the lead agent's window.
Anthropic's multi-agent research system demonstrated substantial improvements over single-agent approaches on complex research tasks using exactly this pattern. The key insight is separation of concerns: the lead agent focuses on synthesis and coordination while subagents do the deep, context-heavy exploration.
This approach maps naturally to how teams of humans work. A project lead doesn't read every document that every team member reviews. They get summaries and make decisions based on distilled information. Subagent architectures bring the same efficiency to AI systems.
## Tool search and programmatic tool calling
Two techniques from Anthropic's platform directly address context confusion caused by bloated tool sets.
**Tool search** solves the problem of too many tool definitions eating up the context window. Instead of loading all tool definitions upfront, the agent searches a tool catalog on demand and loads only the tools relevant to its current step. For agents with access to hundreds of MCP tools, this can reduce token usage from tool definitions by roughly 85%. More importantly, it eliminates the confusion that comes from the model trying to choose between dozens of irrelevant options.
The Berkeley Function-Calling Leaderboard has consistently shown that every model performs worse when given more tools, and that models will sometimes call irrelevant tools simply because they're present in the context. Tool search sidesteps this entirely by keeping the context clean.
**Programmatic tool calling** takes a different angle. Instead of the agent requesting tools one at a time, with each result returning to the context window, the agent writes a Python script that orchestrates multiple tool calls in a sandbox. Only the final output enters the context. Three tool calls become one inference pass instead of three, with roughly 37% fewer tokens consumed. On agentic search benchmarks like BrowseComp and DeepSearchQA, programmatic tool calling was the key factor that unlocked strong agent performance.
Together, these two techniques keep the context focused on what matters: the agent's reasoning and the information it actually needs.
## MCP skills and persistent knowledge
Claude Code skills, stored as `SKILL.md` files, represent another approach to context management. Instead of the agent rediscovering project conventions, coding patterns, and workflow preferences every session, skills encode this knowledge in persistent files that get loaded when relevant.
A context and state management skill, for example, can persist the agent's reasoning and project state across context window compactions. By writing structured task files that track objectives, discovered work, and intermediate results, the agent maintains continuity even when its main conversation history gets compressed.
This is essentially externalized memory. Rather than keeping everything in the context window where it competes for attention, the agent offloads stable knowledge to the file system and retrieves it on demand. It mirrors how experienced developers don't memorize every API, they know where to look things up.
Skills also help with what you might call "context bootstrapping." When starting a new session, the agent doesn't need extensive history to understand the project. It reads the relevant skill files, gets up to speed on conventions and state, and starts productive work immediately.
## Truncating history
History truncation is the most basic form of context management, but it remains a practical tool when applied thoughtfully. The idea is simple: when the conversation exceeds a certain length, drop the oldest messages.
The risk with naive truncation is obvious. Important early context, like the original task description or key architectural decisions, can get dropped. More sophisticated approaches combine truncation with other techniques:
- **Sliding window with pinned messages** keeps the system prompt and a few critical early messages while truncating the middle
- **Recency-biased truncation** keeps the most recent N turns in full while aggressively trimming older turns
- **Selective truncation** removes tool outputs and intermediate reasoning while preserving the agent's conclusions and decisions
Dynamic summarization builds on truncation by replacing old messages with living summaries that get updated as the conversation evolves. LangChain and LlamaIndex both implement this pattern: when you hit a token budget threshold, the oldest chunk of conversation gets summarized and the originals are discarded. The summary plus recent messages become the new context.
The key principle across all truncation strategies is the same: preserve decisions and conclusions, discard intermediate work.
## Putting it all together
No single technique solves context management on its own. The most effective agents in 2026 combine several approaches based on their specific workload:
- **Compaction** maintains conversational flow for tasks requiring extensive back-and-forth
- **Fresh sessions** prevent cross-contamination between distinct tasks
- **Subagents** handle complex research and analysis where parallel exploration pays dividends
- **Tool search** keeps the context clean when working with large tool catalogs
- **Programmatic tool calling** reduces token waste from multi-step tool workflows
- **Skills and external memory** provide persistence across sessions
- **Truncation and summarization** serve as the safety net that keeps everything within bounds
The common thread is treating context as a finite, precious resource rather than an infinite dumping ground. As Anthropic's context engineering guide puts it, the goal is finding the smallest possible set of high-signal tokens that maximize the likelihood of the desired outcome.
Context windows will keep growing. Models will keep getting smarter about handling long inputs. But the fundamental tension between context size and attention quality isn't going away anytime soon. The developers building the best agents in 2026 are the ones who've stopped waiting for bigger windows and started engineering what goes inside them.
### References
1. Anthropic, "Effective context engineering for AI agents," Sep 2025. [https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
2. Drew Breunig, "How long contexts fail," Jun 2025. [https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html)
3. Isaac Kargar, "The fundamentals of context management and compaction in LLMs," Feb 2026. [https://kargarisaac.medium.com/the-fundamentals-of-context-management-and-compaction-in-llms-171ea31741a2](https://kargarisaac.medium.com/the-fundamentals-of-context-management-and-compaction-in-llms-171ea31741a2)
4. Anthropic, "Introducing advanced tool use on the Claude Developer Platform," 2025. [https://www.anthropic.com/engineering/advanced-tool-use](https://www.anthropic.com/engineering/advanced-tool-use)
5. Anthropic, "Tool search tool," Claude API Docs. [https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool)
6. Anthropic, "Programmatic tool calling," Claude API Docs. [https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling)
7. Anthropic, "Extend Claude with skills," Claude Code Docs. [https://code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)
8. JetBrains Research, "Cutting through the noise: Smarter context management for LLM-powered agents," Dec 2025. [https://blog.jetbrains.com/research/2025/12/efficient-context-management/](https://blog.jetbrains.com/research/2025/12/efficient-context-management/)
