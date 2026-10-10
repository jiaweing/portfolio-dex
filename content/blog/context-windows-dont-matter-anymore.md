---
title: "Context windows don't matter anymore"
date: "2026-03-15"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

GPT-5.4 shipped with a 1-million-token context window and everyone cheered. Gemini 2.5 Pro matched it. Claude pushed even further. Every model release now leads with a bigger number, as if cramming more tokens into the window is the breakthrough we've all been waiting for.
It isn't. The context window arms race is a distraction from a harder, more important problem: *how well models actually use what you give them*.
## The bigger-is-better illusion
The pitch is intuitive. A larger context window means the model can "see" more at once, so it should produce better answers. Feed it your entire codebase, your full contract, your complete research corpus. No need to choose what to include. Just throw everything in.
In practice, this falls apart quickly. Researchers at Stanford and elsewhere demonstrated in the now-famous "Lost in the Middle" paper that language models struggle to use information placed in the center of long contexts. Performance is highest when relevant details appear at the beginning or end of the input, and it degrades significantly for content buried in the middle. This holds true even for models explicitly designed for long contexts.
More recent work has made the picture worse, not better. A 2025 study published at EMNLP found that context length *alone* hurts LLM performance, even when retrieval is perfect and there are no distracting documents. The sheer volume of tokens degrades the model's ability to reason, independent of noise or irrelevant content.
Chroma Research coined the term "context rot" to describe this effect. After evaluating 18 state-of-the-art models including GPT-4.1, Claude 4, Gemini 2.5, and Qwen3, they found that no model uses its context uniformly. Performance grows increasingly unreliable as input length grows, despite near-perfect scores on synthetic benchmarks like Needle in a Haystack.
## More tokens do not equal better reasoning
Here's the analogy that makes this click: giving someone a 10,000-page book doesn't make them smarter than giving them a well-curated 100-page summary. It probably makes them worse. They'll skim, miss key passages, and lose the thread.
LLMs behave the same way. The "Lost in the Middle" problem isn't just a quirk of older architectures. It reflects a fundamental tension in how attention mechanisms work. Attention is a finite resource. Spreading it across hundreds of thousands of tokens dilutes focus on the tokens that actually matter.
OpenAI seems to understand this implicitly. GPT-5.4's 1-million-token window is opt-in and experimental. The default API window is 272K tokens. ChatGPT Plus users get just 32K. The company caps the window not because the model can't handle more input, but because accuracy degrades and latency spikes when you push toward the limit.
## What actually moves the needle
If raw context size isn't the answer, what is? The evidence points consistently in one direction: *curation beats volume*.
**Better retrieval.** Retrieval-augmented generation (RAG) remains one of the most effective strategies for knowledge-intensive tasks. Instead of stuffing the entire knowledge base into the prompt, RAG fetches only the relevant documents and feeds them to the model. The ICLR 2026 paper on retrieval robustness confirmed that while RAG isn't always better than no retrieval, targeted retrieval with careful reranking consistently outperforms brute-force long-context approaches.
**Better chunking and reranking.** Even within RAG pipelines, the size and quality of retrieved chunks matters enormously. Research suggests retrieving generously in the first pass to maximize recall, then aggressively filtering during reranking to keep only the 3-5 most relevant documents for generation. This balances comprehensive retrieval with the model's actual capacity for reasoning.
**Better orchestration.** The emerging discipline of "context engineering," a term that gained traction in the second half of 2025, captures this shift perfectly. The goal isn't to maximize how much context you provide. It's to dynamically and intelligently assemble the *most effective* context for each specific task at each specific moment. Agent architectures that fetch only what's needed, when it's needed, consistently outperform approaches that front-load everything into the prompt.
**Retrieve-then-reason.** One surprisingly effective technique is simple: prompt the model to extract and recite the relevant evidence from a long context, then prepend it directly before the question. This converts a long-context task into a short-context one. Experiments on GPT-4o showed meaningful performance gains from this approach alone.
## The legitimate exceptions
This isn't a case for dismissing context windows entirely. There are real use cases where large windows matter. Full codebase analysis benefits from the model seeing the entire dependency graph at once. Legal document review sometimes requires cross-referencing clauses spread across hundreds of pages. Scientific meta-analyses may need simultaneous access to multiple papers.
But these are exceptions, not the norm. For the vast majority of production workloads, the bottleneck isn't how much the model can hold. It's whether the right information reaches the model at the right time, in the right format.
## The real moat
Every dollar spent on processing massive context windows is a dollar that could go toward better retrieval infrastructure, smarter chunking, or more thoughtful prompt engineering. Paying for hundreds of thousands of tokens when 80% of them are noise isn't just wasteful, it actively degrades the quality of the output.
The companies that will win aren't the ones with the biggest context windows. They're the ones that know *what to feed the model*, not how much it can eat. Curation, not capacity, is the moat.
The context window arms race makes for great marketing. But the real breakthroughs are quieter: better retrieval, better filtering, better orchestration. The model doesn't need to see everything. It needs to see the right things.
## References
1. Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2023). "Lost in the Middle: How Language Models Use Long Contexts." [arxiv.org/abs/2307.03172](http://arxiv.org/abs/2307.03172)
2. Bai, J., et al. (2025). "Context Length Alone Hurts LLM Performance Despite Perfect Retrieval." EMNLP 2025 Findings. [arxiv.org/abs/2510.05381](http://arxiv.org/abs/2510.05381)
3. Chroma Research. (2025). "Context Rot: How Increasing Input Tokens Impacts LLM Performance." [research.trychroma.com/context-rot](http://research.trychroma.com/context-rot)
4. Wang, Y., et al. (2025). "Evaluating the Retrieval Robustness of Large Language Models." ICLR 2026. [arxiv.org/abs/2505.21870](http://arxiv.org/abs/2505.21870)
5. RAGFlow. (2025). "From RAG to Context: A 2025 Year-End Review of RAG." [ragflow.io/blog/rag-review-2025-from-rag-to-context](http://ragflow.io/blog/rag-review-2025-from-rag-to-context)
6. Raschka, S. (2025). "The State of LLMs 2025: Progress, Problems, and Predictions." [magazine.sebastianraschka.com/p/state-of-llms-2025](http://magazine.sebastianraschka.com/p/state-of-llms-2025)
7. OpenAI. (2026). "GPT-5.3 and GPT-5.4 in ChatGPT." [help.openai.com/en/articles/11909943-gpt-53-and-54-in-chatgpt](http://help.openai.com/en/articles/11909943-gpt-53-and-54-in-chatgpt)
