---
title: "The state of RAG in 2026"
date: "2026-03-19T14:40:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

In early 2024, I built Decosmic, a platform designed to ground AI agents in trusted data. The core idea was straightforward: instead of letting an LLM hallucinate its way through answers, connect it to your actual documents, your definitions, your processes, and let it retrieve what it needs before responding. That, in its simplest form, is retrieval-augmented generation, or RAG.
Back then, RAG was still a relatively fresh concept outside of research circles. Most people were either prompting ChatGPT raw or fine-tuning models at great expense. The idea that you could just *fetch the right context* and feed it to the model felt almost too simple to work. But it did work, and it worked well.
Two years later, RAG hasn't just survived. It has become the backbone of nearly every serious AI product, from enterprise search to coding agents to the AI features inside Notion itself. It has also evolved in ways that would be unrecognizable to anyone who only knew the basic "embed, retrieve, generate" pipeline from 2024.
This post is a look at where RAG stands in 2026, the many forms it has taken, who's using it and how, and what you should actually reach for when building your next project.
## What RAG actually is
At its core, RAG is a two-step pattern:
1. **Retrieve** relevant information from an external source (documents, databases, APIs)
2. **Generate** a response using that retrieved context alongside the user's query
The standard pipeline works like this: you split your documents into chunks, convert those chunks into vector embeddings, store them in a vector database, and then at query time, you find the most similar chunks and pass them to the LLM as context. The model generates its answer grounded in real data rather than relying purely on its training.
This solves the two biggest problems with raw LLMs: they hallucinate, and their training data goes stale. RAG gives them a way to reference current, authoritative information without retraining.
## Where RAG is now
If you follow AI discourse at all, you have probably seen some version of "RAG is dead" float across your timeline. The argument usually goes something like this: context windows are now millions of tokens long, so why bother with retrieval at all? Just dump everything into the prompt.
It is a reasonable question with an incomplete answer.
Yes, context windows have grown enormously. Claude can handle 200,000 tokens. Gemini can process over a million. And with techniques like prompt caching and cache-augmented generation (CAG), you can preload entire knowledge bases without a retrieval step at all.
But here is the thing: most real-world knowledge bases are far larger than any context window. Enterprise document stores, codebases, legal archives, medical records, these are not 500-page pamphlets. They are millions of documents. No context window handles that.
There are also practical concerns. Bigger context windows cost more, introduce latency, and research consistently shows that models degrade when processing very long contexts, often missing critical information buried in the middle. The "lost in the middle" problem is real and well-documented.
RAG is not dead. It has simply evolved from a single pattern into an entire family of architectures, each designed for different problems.
## The many types of RAG
What started as a simple retrieve-and-generate pipeline has branched into a surprisingly diverse set of approaches. Here are the major ones worth understanding.
### Naive (vanilla) RAG
The original pattern. Embed your documents, store them in a vector database, retrieve the top-k chunks by similarity, and pass them to the LLM. It is fast, cheap, and easy to implement. It also struggles with ambiguous queries, noisy datasets, and anything requiring multi-step reasoning. Think of it as the baseline that every other approach improves upon.
### Hybrid RAG
Instead of relying on vector search alone, hybrid RAG combines dense retrieval (embeddings) with sparse retrieval (BM25 keyword search). This catches cases where semantic similarity misses exact keyword matches. If someone searches for "error code TS-999," an embedding model might return general error documentation, while BM25 finds the exact match. Combining both gives you the best of both worlds.
### Contextual RAG
This is Anthropic's contribution, and it is one of the most impactful improvements to RAG in recent years. The problem with chunking is that individual chunks lose context. A chunk saying "revenue grew by 3%" is useless without knowing which company or time period it refers to.
Contextual retrieval solves this by using an LLM to prepend a short explanatory context to each chunk before embedding it. So the chunk becomes: "This is from ACME Corp's Q2 2023 SEC filing. Revenue grew by 3% over the previous quarter." Combined with BM25 and reranking, Anthropic reported a 67% reduction in failed retrievals. That is a massive improvement from a relatively simple preprocessing step.
### Self-RAG
Self-RAG adds a feedback loop. After retrieving documents, the model evaluates whether the retrieved context is actually relevant. If relevance is low, it reformulates the query and retrieves again. After generating an answer, it critiques the answer against the evidence and revises if needed. This turns retrieval from a one-shot action into an iterative process. Slower, but significantly more accurate for complex queries.
### Corrective RAG (CRAG)
Similar in spirit to self-RAG, but focused specifically on fixing bad retrieval. CRAG evaluates retrieved documents and, if quality is poor, triggers corrective operations: query rewriting, fallback to keyword search, additional filtering, or multi-step reranking. It is like giving your retrieval pipeline a built-in safety net.
### Graph RAG
Instead of retrieving flat text chunks, graph RAG builds a knowledge graph of entities and their relationships, then retrieves based on structure and connections rather than just text similarity. This is powerful for domains where relationships matter as much as content, think legal documents, medical records, or research papers where understanding how concepts connect is essential.
### Agentic RAG
This is where retrieval meets intelligent agents. Instead of following a fixed retrieve-and-respond pipeline, agentic RAG uses modular agents that can reason, plan, and adjust. A query might get routed to different retrieval strategies based on complexity. Agents can break down multi-step questions, evaluate intermediate results, and loop back as needed. NVIDIA describes this as the shift from static retrieval to "dynamic knowledge" where AI agents continuously learn and adapt.
### Multi-agent RAG
The most complex variant. Instead of one model doing everything, multi-agent RAG distributes the work across specialized agents: a planner that breaks questions into sub-tasks, retriever agents for each sub-task, an extractor that summarizes findings, a critic that checks for errors, and a writer that produces the final answer. It is essentially a research team working on your question.
### Cache-augmented generation (CAG)
Technically not RAG at all, but increasingly discussed as an alternative. CAG preloads all relevant documents into the model's context window and caches the key-value states. At query time, there is no retrieval step, the model just processes the query against its cached context. Research from Chan et al. showed that CAG can match or surpass RAG accuracy when the entire corpus fits in the context window. The tradeoff is that it only works for smaller, relatively stable knowledge bases.
## How Notion uses RAG
Notion's AI features are built on a real-world RAG architecture, and it is one of the clearest examples of the pattern in production at scale.
Here is how it works, based on publicly shared architecture details. When you ask Notion AI a question, the query goes to an LLM provider (OpenAI or Anthropic). The LLM first decides whether it needs to search your workspace at all. If it does, it generates the most relevant search query. That query hits a Pinecone vector database, where every page in your workspace has been embedded using OpenAI's embedding API. The vector database returns a list of candidate pages ranked by relevance. Those candidates are then passed to a self-hosted LLM that reranks them by relevance to the original query. Finally, the refined list of pages goes back to the LLM provider, which generates a response grounded in your actual workspace content.
This is textbook hybrid RAG with reranking, and it demonstrates a key production pattern: using a smaller, self-hosted model for the computationally cheaper reranking step while reserving the expensive frontier model for final generation. It also handles the permissions challenge, making sure users only see results from pages they have access to, which is one of the hardest problems in enterprise RAG.
Notion's data infrastructure team has also noted that their data lake, built on Apache Hudi and Apache Spark, was essential for the rollout of AI features, serving as the foundation for their search and embedding infrastructure.
## How coding agents use RAG
Coding agents like Cursor, GitHub Copilot, and others have become some of the most sophisticated users of RAG, and they have also exposed its biggest limitations.
Cursor, for example, indexes your entire codebase using a RAG pipeline. It splits code into chunks, generates semantic embeddings, and retrieves the most relevant code when you ask a question or request a change. This is how it achieves "codebase awareness," the ability to understand your project's structure and conventions, not just the file you are currently editing.
But coding agents have also revealed a fundamental problem. Research from Morph found that coding agents spend roughly 60% of their time *searching*, not coding. And the standard one-hop retrieval of vanilla RAG is often not enough. As Aman Sanger, co-founder of Cursor, put it: "The hardest questions in a codebase require several hops. Vanilla retrieval only works for one hop." Tracing a bug across a 100,000-line monorepo requires understanding dependency chains, import graphs, and function call hierarchies, things that flat chunk retrieval simply cannot capture.
This is why coding agents increasingly rely on hybrid approaches: combining semantic search with LSP (Language Server Protocol) references, dependency graphs, file recency signals, and symbol summaries like function signatures. It is not pure RAG anymore. It is RAG augmented with structural understanding of code.
There is also the "lost in the middle" problem at play here. More context does not always mean better results. Research has shown that LLMs can actually perform worse when given too much context, because critical information gets buried. The emerging consensus is that coding agents need sub-agent architectures, where specialized components handle search, planning, and code generation separately.
## Why OpenClaw skips RAG entirely
OpenClaw, the viral open-source AI agent that has racked up over 200,000 GitHub stars, takes a radically different approach to memory and context. Instead of vector databases and embedding pipelines, OpenClaw stores everything in plain Markdown files.
The architecture is deliberately simple. Your agent's personality lives in `SOUL.md`. Its identity is in `IDENTITY.md`. Information about you, the user, goes in `USER.md`. Long-term memory is in `MEMORY.md`. Daily logs are appended to date-stamped Markdown files. The agent reads these files at session start and writes to them as it learns.
For search, OpenClaw uses `memory_search`, which combines keyword matching with basic semantic matching over these Markdown files. There is no vector database, no embedding pipeline, no chunking strategy. It is hybrid search over flat files.
Why does this work? Three reasons.
First, the data volume is small. A personal AI assistant's memory is measured in thousands of lines, not millions of documents. The entire knowledge base comfortably fits in a context window or can be searched with simple keyword matching.
Second, Markdown is human-readable and human-editable. You can open `SOUL.md` in any text editor and see exactly what your agent knows. There is no black box. OpenClaw's community has built an entire culture around sharing and debugging these files, something that would be impossible with opaque vector databases.
Third, it aligns with OpenClaw's philosophy of simplicity. The project's genius is in packaging, not invention. It wires together Claude Code, a messaging gateway, cron jobs, and a skill system. Adding a vector database would increase complexity without proportional benefit for its use case.
This is an important lesson: RAG is not always the right tool. When your data is small, stable, and fits in context, simpler approaches can be more effective, more maintainable, and more transparent.
## Choosing the right approach
With so many variants, the question is no longer "should I use RAG?" but "which RAG should I use?" Here is a comparison to help navigate the options.
<table fit-page-width="true" header-row="true">
<tr color="blue_bg">
<td>**Approach**</td>
<td>**Best for**</td>
<td>**Complexity**</td>
<td>**Latency**</td>
<td>**Accuracy**</td>
<td>**Key tradeoff**</td>
</tr>
<tr>
<td>Vanilla RAG</td>
<td>Simple Q&A, small datasets</td>
<td>Low</td>
<td>Low</td>
<td>Moderate</td>
<td>Misses nuance and keyword matches</td>
</tr>
<tr>
<td>Hybrid RAG</td>
<td>General-purpose production systems</td>
<td>Low-Medium</td>
<td>Low</td>
<td>Good</td>
<td>Fusion logic needs tuning</td>
</tr>
<tr>
<td>Contextual RAG</td>
<td>Document-heavy knowledge bases</td>
<td>Medium</td>
<td>Low</td>
<td>Very good</td>
<td>Preprocessing cost (one-time)</td>
</tr>
<tr>
<td>Self-RAG</td>
<td>Research, legal, medical</td>
<td>Medium</td>
<td>Medium</td>
<td>High</td>
<td>Slower due to feedback loops</td>
</tr>
<tr>
<td>Corrective RAG</td>
<td>Noisy or inconsistent datasets</td>
<td>Medium</td>
<td>Medium</td>
<td>High</td>
<td>Requires relevance thresholds</td>
</tr>
<tr>
<td>Graph RAG</td>
<td>Interconnected data, compliance</td>
<td>High</td>
<td>Medium</td>
<td>Very high</td>
<td>Expensive to build and maintain</td>
</tr>
<tr>
<td>Agentic RAG</td>
<td>Complex multi-step queries</td>
<td>High</td>
<td>High</td>
<td>Very high</td>
<td>Orchestration overhead</td>
</tr>
<tr>
<td>Multi-agent RAG</td>
<td>Research synthesis, analysis</td>
<td>Very high</td>
<td>High</td>
<td>Highest</td>
<td>Cost and engineering complexity</td>
</tr>
<tr>
<td>CAG</td>
<td>Small, stable knowledge bases</td>
<td>Low</td>
<td>Very low</td>
<td>High</td>
<td>Only works within context limits</td>
</tr>
<tr>
<td>Plain Markdown</td>
<td>Personal agents, small data</td>
<td>Very low</td>
<td>Very low</td>
<td>Moderate</td>
<td>Does not scale to large corpora</td>
</tr>
</table>
The honest answer for most teams in 2026: **start with hybrid RAG** (embeddings plus BM25), add contextual retrieval if your chunks are losing context, layer in reranking for production, and only reach for agentic or graph approaches when you genuinely need them.
If your knowledge base is under 500 pages, consider whether you need RAG at all. CAG or even just stuffing everything into a long context window with prompt caching might be simpler and equally effective.
If you are building a personal assistant with modest memory needs, take a page from OpenClaw's book. Plain Markdown and keyword search might be all you need.
## The bigger picture
RAG in 2026 is not a single technique. It is a spectrum, ranging from "just put it in the prompt" to "deploy a fleet of specialized agents that plan, retrieve, critique, and synthesize." The right choice depends on your data volume, your accuracy requirements, your latency budget, and your engineering capacity.
What has not changed is the fundamental insight that made RAG valuable in the first place: LLMs are more useful when they have access to the right information at the right time. Whether that information comes from a vector database, a knowledge graph, a cached context window, or a plain text file, the principle is the same.
The tooling will keep evolving. The architectures will keep branching. But retrieval-augmented generation, in one form or another, is here to stay.
## References
1. Anthropic, "Introducing Contextual Retrieval" (2024): [https://www.anthropic.com/news/contextual-retrieval](https://www.anthropic.com/news/contextual-retrieval)
2. Naresh B A, "Beyond Vanilla RAG: The 7 Modern RAG Architectures Every AI Engineer Must Know" (2025): [https://medium.com/@phoenixarjun007/beyond-vanilla-rag-the-7-modern-rag-architectures-every-ai-engineer-must-know-af18679f5108](https://medium.com/@phoenixarjun007/beyond-vanilla-rag-the-7-modern-rag-architectures-every-ai-engineer-must-know-af18679f5108)
3. Alon Gubkin, "How Notion Ask AI Works" (2024), LinkedIn: [https://www.linkedin.com/posts/alongubkin_ever-wondered-how-notion-ask-ai-works-heres-activity-7233850549354328064-TIu-](https://www.linkedin.com/posts/alongubkin_ever-wondered-how-notion-ask-ai-works-heres-activity-7233850549354328064-TIu-)
4. ZenML, "Notion: Scaling Data Infrastructure for AI Features and RAG": [https://www.zenml.io/llmops-database/scaling-data-infrastructure-for-ai-features-and-rag](https://www.zenml.io/llmops-database/scaling-data-infrastructure-for-ai-features-and-rag)
5. Morph, "Coding Agents Fail at Search, Not Coding: 15 Papers Prove It" (2026): [https://www.morphllm.com/blog/code-search-bottleneck](https://www.morphllm.com/blog/code-search-bottleneck)
6. Towards Data Science, "How Cursor Actually Indexes Your Codebase": [https://towardsdatascience.com/how-cursor-actually-indexes-your-codebase/](https://towardsdatascience.com/how-cursor-actually-indexes-your-codebase/)
7. Animesh Sinha, "Why RAG Falls Short for Autonomous Coding Agents": [https://medium.com/@animesh1997/why-rag-falls-short-for-autonomous-coding-agents-86cf5b3dcb69](https://medium.com/@animesh1997/why-rag-falls-short-for-autonomous-coding-agents-86cf5b3dcb69)
8. OpenClaw Documentation, "Memory": [https://docs.openclaw.ai/concepts/memory](https://docs.openclaw.ai/concepts/memory)
9. Chan et al., "Don't Do RAG: When Cache-Augmented Generation is All You Need for Knowledge Tasks" (2024): [https://arxiv.org/html/2412.15605v1](https://arxiv.org/html/2412.15605v1)
10. NVIDIA, "Traditional RAG vs. Agentic RAG": [https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/](https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/)
11. Squirro, "RAG in 2026: Bridging Knowledge and Generative AI": [https://squirro.com/squirro-blog/state-of-rag-genai](https://squirro.com/squirro-blog/state-of-rag-genai)
12. Suresh Beekhani, "Complete Guide to RAG Architecture: 25 Types, Patterns and Structures" (2025), LinkedIn: [https://www.linkedin.com/pulse/complete-guide-rag-architecture-25-types-patterns-you-suresh-beekhani-a1btf](https://www.linkedin.com/pulse/complete-guide-rag-architecture-25-types-patterns-you-suresh-beekhani-a1btf)
13. Domo, "Agentic RAG vs. RAG: What's the Difference?": [https://www.domo.com/learn/article/agentic-rag-vs-rag](https://www.domo.com/learn/article/agentic-rag-vs-rag)
