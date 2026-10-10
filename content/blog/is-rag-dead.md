---
title: "Is RAG dead?"
date: "2026-04-04T15:25:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

RAG, retrieval-augmented generation, was arguably the hottest technique in AI engineering throughout 2024 and into 2025. Every startup had a RAG pipeline. Every tutorial taught you to chunk documents, embed them, and stuff context into a prompt. It was the go-to answer for "how do I make an LLM work with my data?"
Then something shifted. Claude Code launched and proved you could explore an entire codebase with just grep and glob, no vector database required. Agentic workflows started replacing static retrieval pipelines. Context windows ballooned to millions of tokens. Suddenly, the question on everyone's mind became: is RAG dead?
The short answer is no. But the RAG we knew in 2024 is barely recognizable compared to what's actually working in production today.
## The case against RAG
The loudest argument against RAG comes from the coding world. Claude Code, Cline, Aider, and Codex CLI all abandoned traditional RAG in favor of what Anthropic calls "agentic search." Boris Cherny, who worked on Claude Code, confirmed that agentic search outperformed their earlier experiments with a local vector database.
The reasoning is elegant in its simplicity. Instead of pre-processing your entire codebase into embeddings and maintaining a vector store, you let the AI do what a human engineer would do: read the file tree, grep for patterns, follow imports, and iteratively narrow down to the relevant code. No infrastructure. No stale indexes. No chunking strategy to tune.
This approach works because modern LLMs are remarkably good at deciding what to search for next. As one developer put it on Reddit, "Open a folder containing your entire knowledge base, open Claude Code, start asking questions of any difficulty level, be amazed." The AI handles the retrieval strategy itself, dynamically, in real time.
Then there's the context window argument. When GPT-4 launched with 8K tokens, RAG was essential just to fit relevant information into the prompt. Now we have models with 200K, 1M, even 2M token windows. If you can just load your entire document set into context, why bother with retrieval at all?
## Why RAG is far from dead
Here's where the nuance matters. The "RAG is dead" narrative mostly applies to one specific use case: code search in development environments. And even there, the story is more complicated than it seems.
For enterprise knowledge bases with millions of documents, you simply cannot dump everything into a context window. Even if the window were large enough, research consistently shows that LLMs struggle with relevance when drowning in context. More tokens do not mean better answers. In fact, studies have found that the more context you send, the worse the answer quality becomes for targeted retrieval tasks. There's a reason Anthropic themselves published guidance on "context pollution," acknowledging that larger windows don't solve the fundamental problem of getting the right information in front of the model.
Cost is the other elephant in the room. Larger context windows mean more tokens processed per query, which means higher costs and higher latency. RAG systems paired with smaller context windows have been shown to be both more performant and more cost-effective for retrieval-heavy workloads. As one practitioner noted, depending exclusively on large context windows ties you to the most expensive models, when a smaller model with good retrieval can outperform them on 90% of tasks.
There's also the question of freshness and scale. RAG systems can be updated incrementally as new data arrives. Context windows require reloading everything. For organizations dealing with rapidly changing information, like customer support knowledge bases, legal document repositories, or real-time market data, RAG remains the only practical architecture.
## The real evolution: from pipelines to control loops
What's actually happening isn't the death of RAG, it's a metamorphosis. The naive RAG pattern of 2024, where you do a single vector search, grab the top-k chunks, and pray, is indeed dying. What's replacing it is far more sophisticated.
Agentic RAG wraps retrieval in a reasoning loop. Instead of one retrieval pass, the system reviews its evidence, identifies gaps, refines its query, and retrieves again. Think of it as the difference between running one database query and writing your conclusion versus iteratively debugging, where you query, inspect, notice what's missing, and repeat until you're confident.
NVIDIA's research describes agentic RAG as a system that "refines queries using reasoning, turning RAG into a sophisticated tool" compared to traditional RAG's "lack of reasoning" and "context blindness." Comparative studies have shown up to 80% improvement in retrieval quality with agentic approaches.
The RAGFlow team's 2025 year-end review captured it well: RAG is evolving from the specific pattern of "retrieval-augmented generation" into a "context engine" with intelligent retrieval as its core capability. It's less about the vector database and more about the orchestration.
## [CLAUDE.md](http://CLAUDE.md) and the skills approach
One of the more interesting developments is how tools like Claude Code handle persistent knowledge without RAG at all. The [CLAUDE.md](http://CLAUDE.md) file is a simple markdown document that sits in your project root, giving the AI persistent instructions, coding standards, architecture decisions, and project context at the start of every session.
Combined with Skills, which are reusable capability definitions, this creates a lightweight knowledge layer that requires zero infrastructure. No embeddings, no vector store, no retrieval pipeline. Just markdown files that the AI reads directly.
This works brilliantly for project-scoped knowledge: things like "in this project, we use TypeScript strict mode" or "our API follows this naming convention." It's essentially a human-curated context injection, and for many developer workflows, it's all you need.
But it doesn't scale to millions of documents, and it's not designed to. It solves a different problem than RAG was built for.
## When to use what
The landscape in 2026 isn't about choosing one approach. It's about matching the tool to the problem.
**Agentic search** (grep, file exploration, tool calling) works best for codebases and smaller knowledge bases where the AI can navigate the structure itself. It's simple, requires no infrastructure, and leverages model intelligence over retrieval engineering.
**RAG** remains essential for large-scale document retrieval, enterprise knowledge management, and any scenario where you need cost-effective access to vast amounts of data. The key is to move beyond naive top-k retrieval toward agentic RAG patterns with reasoning loops.
**Long context windows** are ideal for analytical tasks requiring complete document understanding, like summarizing a long report or comparing multiple contracts. They're not a replacement for retrieval over large corpora.
**Markdown-based context** ([CLAUDE.md](http://CLAUDE.md), skills files) is perfect for project-specific knowledge and team conventions. It's the simplest approach and often overlooked.
The winning architectures in production are increasingly hybrid. Use RAG to pull the right documents, load them into a generous context window, and let an agentic layer decide if it needs to retrieve more. Gartner predicts that 40% of enterprise applications will embed task-specific AI agents by the end of 2026, and most of those agents will need some form of structured retrieval underneath.
## The bottom line
RAG isn't dead. The naive, single-pass, top-k-and-pray version of RAG is dead, and good riddance. What's emerging is more interesting: retrieval as an intelligent, adaptive layer within agentic systems that can reason about what they need and go find it.
The real lesson from Claude Code abandoning traditional RAG isn't that retrieval doesn't matter. It's that static retrieval pipelines are being replaced by dynamic, reasoning-driven search. Whether you call that "agentic RAG" or "agentic search" is mostly a naming debate. The underlying insight is the same: let the model think about what it needs, rather than hoping your pre-built pipeline guessed right.
For developers building with AI in 2026, the practical takeaway is this: don't default to any single approach. Understand your data scale, your latency requirements, your cost constraints, and your accuracy needs. Then build the retrieval strategy that fits, whether that's a vector database, a grep command, a markdown file, or all three working together.
## References
1. Anthropic, "Effective context engineering for AI agents" (2025). [anthropic.com/engineering/effective-context-engineering-for-ai-agents](http://anthropic.com/engineering/effective-context-engineering-for-ai-agents)
2. NVIDIA Developer Blog, "Traditional RAG vs Agentic RAG: Why AI Agents Need Dynamic Knowledge to Get Smarter." [developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter](http://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter)
3. RAGFlow, "From RAG to Context, A 2025 year-end review of RAG" (2025). [ragflow.io/blog/rag-review-2025-from-rag-to-context](http://ragflow.io/blog/rag-review-2025-from-rag-to-context)
4. Pinecone, "Beyond the hype: Why RAG remains essential for modern AI" (2025). [pinecone.io/learn/rag-2025](http://pinecone.io/learn/rag-2025)
5. Aram, "Why Claude Code is special for not doing RAG/Vector Search" (2026). [zerofilter.medium.com](http://zerofilter.medium.com)
6. Rod Johnson, "Rethinking RAG: Pipelines Are the Past, Agentic Is the Future" (2026). [medium.com/@springrod](http://medium.com/@springrod)
7. Zhuowan Li et al., "Retrieval Augmented Generation or Long-Context LLMs? A Comprehensive Study and Hybrid Approach" (2024). [arxiv.org/abs/2407.16833](http://arxiv.org/abs/2407.16833)
8. Redis, "RAG vs Large Context Window: The Real Trade-offs for AI Apps." [redis.io/blog/rag-vs-large-context-window-ai-apps](http://redis.io/blog/rag-vs-large-context-window-ai-apps)
9. Milvus Blog, "RAG vs Long-Running Agents: Is RAG Obsolete?" (2026). [milvus.io/blog/is-rag-become-outdated-now-long-running-agents-like-claude-cowork-are-emerging](http://milvus.io/blog/is-rag-become-outdated-now-long-running-agents-like-claude-cowork-are-emerging)
10. Claude Code Docs, "How Claude remembers your project." [code.claude.com/docs/en/memory](http://code.claude.com/docs/en/memory)
