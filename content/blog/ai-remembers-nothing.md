---
title: "AI remembers nothing"
date: "2026-05-04"
lastEdited: "2026-05-03T08:24:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Memory","RAG","Agents","LLMs","Safety","OpenAI","Google","Claude","Microsoft","Hallucinations"]
---

Context windows are 1M+ tokens now. Models can technically "see" an entire novel in a single prompt. And yet, every conversation you have with an AI starts from scratch. It doesn't know your name, your preferences, or the thing you told it yesterday. It has no idea you exist.
This isn't a bug that will get fixed in the next release. It's a fundamental design limitation, and the workarounds we have today are far more fragile than most people realize. Memory is AI's biggest unsolved problem, and it matters more than benchmarks, reasoning scores, or model size.
## Bigger context windows are not memory
When model providers announce they've gone from 128K to 1M to 2M tokens, it sounds like progress on the memory front. It isn't. A context window is just the amount of text a model can process in a single pass. Making it bigger is like giving someone a larger desk, not a better brain.
As one researcher put it, "a bigger memory buffer doesn't create long-term memory, it lengthens short-term memory." The model doesn't understand or store the information you feed it. It temporarily references it, then forgets everything the moment the session ends.
There are deeper technical problems too. Attention cost scales quadratically with token count, which means performance degrades as you stuff more in. More tokens dilute attention across irrelevant text. Summaries lose nuance. Reasoning breaks down on very long sequences. A model holding 200 pages in context doesn't mean it comprehends them. It just keeps them nearby.
You don't re-read your entire life history before every conversation. You have working memory that surfaces what's relevant and a long-term store that encodes what matters. AI has neither. It has a text buffer that gets wiped clean every time.
## RAG is a band-aid, not a solution
Retrieval-Augmented Generation (RAG) is the current go-to approach for connecting LLMs to external knowledge. The idea is simple: when a user asks a question, retrieve relevant documents from a database and inject them into the prompt. It works, kind of. But calling it "memory" is a stretch.
RAG has three structural problems that make it a poor substitute for real memory.
First, RAG is read-only and static. It retrieves information but has no ability to update, overwrite, or delete entries based on new interactions. If you tell an agent "I've switched from Python to TypeScript," a standard RAG system adds a new chunk. Later, when the agent queries for your coding preferences, it retrieves both the old Python context and the new TypeScript instructions, with no way to resolve the conflict.
Second, RAG retrieves based on similarity, not truth or relevance. Every query loads a fixed number of chunks regardless of whether they're useful. There's no mechanism for the system to say "I have nothing useful for this query" or "one result is enough." It always pulls the same amount, flooding context with noise.
Third, RAG has no sense of time. It can't distinguish between something you said yesterday and something from six months ago. There's no recency weighting, no concept of what's current versus outdated.
RAG is the best tool we have right now for grounding LLMs in external data. But it's retrieval, not remembering. And there's a meaningful difference between the two.
## The personalization gap
Every AI product promises to "learn you." Personalized responses, adaptive behavior, an assistant that gets better over time. The reality is far less impressive.
OpenAI's memory feature for ChatGPT is perhaps the most visible attempt at persistent AI memory. On paper, it sounds great: the model remembers facts about you across sessions. In practice, it stores a bullet-point list of facts with a token limit so small that users regularly hit "memory full" after saving basic information about themselves. The storage limit has been reported at roughly 6,000 tokens, about 4,500 words. That's less memory than a 1980s home computer.
But the bigger problem isn't capacity, it's reliability. Users have reported persistent bugs: memories failing to save, duplicating existing entries instead of adding new ones, and the feature silently breaking for days at a time. Even when it works, the model has no mechanism for prioritizing important memories over trivial ones. Your name gets the same weight as a throwaway comment from three weeks ago.
There's also the problem that Google's Gemini team calls "context poisoning." If the model misinterprets something and saves it to memory, that bad signal shapes every future response. You'd never know you were getting poisoned results unless you manually audited your memory entries, something almost no one does.
This is what passes for AI personalization in 2026. Not understanding, but a fragile list of facts that breaks regularly.
## Why this matters for agents
The memory problem becomes existential when you move from chatbots to agents. An agent is supposed to take actions, make decisions, and operate autonomously over time. An agent without memory is just expensive autocomplete running in a loop.
Consider what memory-less agents can't do. They can't learn from mistakes, because they don't remember making them. They can't build on previous work, because every session starts from zero. They can't develop an understanding of your codebase, your business, or your preferences, because nothing persists.
Google DeepMind's Evo-Memory research draws an important distinction between conversational recall and experience reuse. Conversational recall is remembering what was said: "What were the solutions to 2x² + 3x - 1 = 0?" Experience reuse is learning how to solve problems: "I should use the quadratic formula for equations like this." Current AI systems can approximate the first. None of them can do the second at any meaningful scale.
DeepMind's benchmark showed that agents with self-evolving memory, those that could refine and prune their own experiences, consistently improved accuracy and needed far fewer steps to complete tasks. Smaller models with good memory management often matched or beat larger models with static context. The key finding: success depends on the agent's ability to refine and prune, not just accumulate.
This points to something important. The path to better agents isn't just bigger models. It's better memory.
## What real memory might look like
There are promising research directions, even if none are production-ready at consumer scale.
The MemGPT architecture (now called Letta) treats an agent's context window like a computer's memory hierarchy. There's core memory, analogous to RAM, that holds the most important current context. And there's archival memory, analogous to disk storage, that persists everything else in a searchable database. The agent manages its own memory autonomously, deciding what to promote, what to archive, and what to forget. It's an operating-system approach to a problem that most developers are still solving with append-only logs.
Mem0 takes a different approach as a bolt-on memory layer. Rather than reimagining the entire agent runtime, it adds persistent memory to whatever framework you're already using. It handles storage and retrieval separately from the agent's core logic.
At the research frontier, systems like MemGen from ICLR 2026 go further by generating latent memory tokens directly within the model's reasoning stream, inspired by how human brains integrate memory and reasoning dynamically. The agent decides when to recall memory and synthesizes past experiences into compact representations that enrich ongoing reasoning.
These approaches share a common insight: memory isn't just about storing more data. It's about knowing what to keep, what to forget, and when to use what you know. That's much harder than making a context window bigger.
## The security tension
Here's the uncomfortable trade-off: memory equals persistence, and persistence equals attack surface.
Palo Alto Networks demonstrated through proof-of-concept attacks that AI agents with long-term memory can serve as vectors for persistent malicious instructions. Because memory contents are injected into system prompts, they're often prioritized over user input, meaning a poisoned memory can silently override what you're actually asking the agent to do. The attack persists across sessions, surviving reboots and context resets.
Cisco's security team discovered a method to compromise Claude Code's memory system, poisoning it to deliver insecure, manipulated guidance to users across every project and session. The attack worked because memory entries were trusted by default, with no mechanism to verify their integrity.
Microsoft has documented what they call "AI Recommendation Poisoning," where attackers manipulate an agent's memory to influence its future recommendations for profit.
The delivery mechanisms for these attacks are broad: malicious webpages, documents, third-party APIs, user-generated content. Any untrusted input channel becomes a potential vector for memory manipulation.
This creates a genuine dilemma. The more an AI remembers, the more useful it becomes. But the more it remembers, the more it can leak, the more it can be manipulated, and the harder it is to audit. We don't yet have good answers for how to build memory systems that are both powerful and secure.
## What builders should do today
If you're building on top of LLMs, the practical advice is straightforward: design for amnesia.
Don't trust the model to remember anything. Build your own memory layer with explicit read and write operations, versioning, and the ability to invalidate stale data. Treat the LLM as a stateless reasoning engine and manage state yourself.
Be honest about what RAG can and can't do. It's excellent for grounding responses in factual data. It's terrible at maintaining coherent state across interactions. Use it for what it's good at, and build complementary systems for the rest.
Don't confuse context length marketing with actual memory capabilities. A model that can process 2M tokens in a single prompt still doesn't remember your name tomorrow. These are different problems that require different solutions.
And think carefully about the security implications before you give your agents persistent memory. Every piece of data you persist is a piece of data that can be poisoned, leaked, or manipulated. Build with that assumption from day one.
## The road ahead
Memory is where AI's limitations are most viscerally felt. You can watch a model write beautiful prose, solve complex math problems, and generate working code, then realize it has no idea who you are or what you asked it five minutes ago.
The gap between "impressive in a demo" and "useful as a long-term collaborator" is almost entirely a memory problem. Until AI can learn from experience, maintain coherent state across sessions, and build genuine understanding of the people and contexts it works with, it will remain a powerful tool that needs to be re-introduced to you every single time you use it.
The research is promising. The production reality is not. We're closer to the beginning of solving this problem than the end.
## References
1. Nagendra Gupta, "Context Windows Are Not Enough: The Future of Memory in LLMs," [Medium](https://medium.com/emergent-intelligence/context-windows-are-not-enough-the-future-of-memory-in-llms-9b8f7fbceb21)
2. ByteByteGo, "The Memory Problem: Why LLMs Sometimes Forget Your Conversation," [ByteByteGo Blog](https://blog.bytebytego.com/p/the-memory-problem-why-llms-sometimes)
3. Oracle Developers, "Agent Memory: Why Your AI Has Amnesia and How to Fix It," [Oracle Blog](https://blogs.oracle.com/developers/agent-memory-why-your-ai-has-amnesia-and-how-to-fix-it)
4. Letta, "RAG is not Agent Memory," [Letta Blog](https://www.letta.com/blog/rag-vs-agent-memory)
5. Austin, "Beyond RAG: Why AI Agents Need Long-Term Memory, Not Retrieval," [Medium](https://medium.com/@austin_78858/beyond-rag-why-ai-agents-need-long-term-memory-not-retrieval-5f5d821b239c)
6. SJ Ramblings, "Your AI Agent's Memory is a Liability: Why Flat RAG Fails at Scale," [sjramblings.io](http://sjramblings.io)
7. Evo-Memory: Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory, [arXiv](https://arxiv.org/abs/2511.20857)
8. MemGen: Weaving Generative Latent Memory for Self-Evolving Agents, ICLR 2026, [GitHub](https://github.com/KANABOON1/MemGen)
9. Letta (formerly MemGPT), "Agent Memory: How to Build Agents that Learn and Remember," [Letta Blog](https://www.letta.com/blog/agent-memory)
10. Vectorize, "Mem0 vs Letta (MemGPT): AI Agent Memory Compared," [Vectorize](https://vectorize.io/articles/mem0-vs-letta)
11. Palo Alto Networks Unit 42, "When AI Remembers Too Much, Persistent Behaviors in Agents' Memory," [Unit 42 Blog](https://unit42.paloaltonetworks.com/indirect-prompt-injection-poisons-ai-longterm-memory/)
12. Cisco, "Identifying and Remediating a Persistent Memory Compromise in Claude Code," [Cisco Blogs](https://blogs.cisco.com/ai/identifying-and-remediating-a-persistent-memory-compromise-in-claude-code)
13. Microsoft Security, "Manipulating AI Memory for Profit: The Rise of AI Recommendation Poisoning," [Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/)
14. Every, "Why I Turned Off ChatGPT's Memory," [Every](https://every.to/also-true-for-humans/why-i-turned-off-chatgpt-s-memory)
