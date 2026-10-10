---
title: "Context rot"
date: "2026-04-20T23:31:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["LLMs","RAG","Prompt Engineering","Models","Anthropic","Claude","Google","OpenAI","Attention"]
---

We keep getting bigger context windows. Claude now offers 1 million tokens. Gemini has pushed even further. The implicit promise is simple: more context means better results. But a growing body of research tells a different story. The more you feed a model, the worse it gets at using what you gave it.
Chroma's research team gave this phenomenon a name: context rot. And once you understand it, you start seeing it everywhere.
## What context rot actually is
Context rot is the degradation of model performance as input length increases, even when the task itself stays the same difficulty. It's not about hitting a hard limit or running out of tokens. It's about the model quietly becoming less reliable the more context it has to work with.
The intuition makes sense if you think about how attention mechanisms work. A transformer doesn't process every token equally. As the input grows, the model has to spread its attention across more material, and relevant information gets diluted by irrelevant noise. The model can technically "see" everything in its context window, but seeing and reliably using are two very different things.
Anthropic's own documentation now acknowledges this directly: "As token count grows, accuracy and recall degrade, a phenomenon known as context rot. This makes curating what's in context just as important as how much space is available."
## The research that quantified it
In July 2025, Chroma published a technical report evaluating 18 LLMs, including GPT-4.1, Claude Sonnet 4, Gemini 2.5, and Qwen3 models. The findings were striking.
They ran a series of controlled experiments where the task complexity stayed constant but the input length varied. Across every experiment and every model, performance degraded as input length increased. This wasn't a subtle effect buried in edge cases. It showed up on tasks as simple as finding a fact buried in a document or replicating a sequence of repeated words.
A few findings stood out:
**Lower similarity between question and answer accelerates decay.** When the needle (the relevant information) didn't share obvious keywords with the question, models fell apart faster at longer contexts. This matters because real-world queries rarely match their answers word for word.
**Distractors compound the problem.** Adding content that's topically related but doesn't answer the question caused significant performance drops, and these drops got worse as context grew. Even a single distractor degraded results. Four distractors made things substantially worse.
**Structured haystacks hurt more than shuffled ones.** This was the counterintuitive finding. Models actually performed worse when surrounding content followed a logical flow of ideas. When the haystack was randomly shuffled sentences, the needle was easier to find. The implication is that coherent context may cause the model to "get absorbed" in the narrative rather than scanning for the target information.
**Even trivial output tasks degrade.** In a repeated words experiment, models were asked to simply replicate a sequence of words with one unique word inserted. As the sequence grew longer, every model tested started making errors, generating random words, refusing the task, or losing track of the unique word's position.
## The lost-in-the-middle problem
Context rot builds on earlier research from Stanford, which documented a pattern they called "lost in the middle." Their work showed that language models exhibit a U-shaped performance curve: they're best at recalling information placed at the very beginning or very end of the input, and worst at finding things buried in the middle.
This positional bias means that even if you carefully curate your context, where you place the information matters as much as whether it's included. MIT researchers later traced this back to the attention architecture itself, finding that certain design choices in how models process input create an inherent bias toward the edges of the sequence.
The combination of these two effects, context rot (degradation with length) and positional bias (degradation with placement), means that long context windows have a much smaller effective capacity than their token counts suggest.
## What this means for the 1M token era
Claude's 1M context window went generally available in March 2026. The announcement highlighted real benefits: fewer compaction events in Claude Code, the ability to load entire codebases, and state-of-the-art scores on long-context retrieval benchmarks like MRCR v2.
These aren't trivial improvements. For specific use cases, like maintaining continuity across long coding sessions or processing large document sets, having more room genuinely helps. Anthropic reported a 15% decrease in compaction events, which means fewer moments where the model loses track of earlier context.
But the benchmarks that show strong 1M performance, like Needle in a Haystack, test a narrow capability: direct lexical retrieval. As Chroma's research demonstrated, real-world tasks involve semantic matching, disambiguation among distractors, and reasoning across scattered information. These are exactly the capabilities that degrade with context length.
Practitioners have noticed. A GitHub issue for Claude Code documented self-reported degradation starting at roughly 40% of the 1M context window, with the model losing track of what was already tried, applying fixes then reverting them, and claiming issues were fixed when nothing had changed. Multiple users on forums have noted that 200K context models with regular compaction outperform 1M models that let context accumulate.
The environment variable `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` exists for a reason. So does `CLAUDE_CODE_AUTO_COMPACT_WINDOW`, which lets you cap the effective window size. These aren't obscure workarounds. They're responses to a real pattern where more context leads to worse outcomes.
## Context engineering over context stuffing
The lesson from context rot isn't that large context windows are useless. It's that they need to be managed. The emerging discipline of context engineering treats the context window as a constrained resource to be carefully curated, not a bucket to be filled.
A few principles follow from the research:
**Less is often more.** If your task doesn't require a large volume of context, keep things clean. A focused 20K token prompt will almost always outperform a 200K token prompt that includes the same information buried in noise.
**Retrieval beats stuffing.** RAG architectures that retrieve only the most relevant passages and place them strategically in the prompt consistently outperform approaches that dump entire documents into context. The retrieval step acts as a filter, ensuring the model only sees what it needs.
**Position matters.** Place the most critical information at the beginning or end of your context. The lost-in-the-middle effect is real and measurable. If you're building a system that assembles context programmatically, this is a straightforward optimization.
**Compact regularly.** For long-running sessions, periodic summarization and context clearing maintains quality better than letting context grow unbounded. Think of it like memory management: you wouldn't let a program allocate RAM indefinitely without garbage collection.
**Match the window to the task.** A 1M context window is a tool for specific situations, like complex multi-step agentic tasks or research sessions where continuity across many documents genuinely matters. For shorter, more contained tasks, the old discipline of clearing context and starting fresh still applies.
## The real bottleneck isn't size
The context window arms race mirrors an older pattern in computing: the assumption that more of a resource automatically means better performance. More RAM, more storage, more bandwidth. In practice, what matters is how efficiently you use what you have.
Chroma's conclusion is worth quoting directly: "Whether relevant information is present in a model's context is not all that matters; what matters more is how that information is presented."
We're still early in understanding why models behave this way. The mechanisms behind context rot likely involve how attention patterns shift with sequence length, how the model's internal representations interact with the structure of its input, and how training data distributions shape the model's expectations about what appears where. These are open questions for interpretability research.
What's clear now is that the number on the context window is a ceiling, not a guarantee. Treating it as a guarantee is how you end up three hours into a coding session watching the model suggest building the system you just built together.
The models are getting better. The windows are getting bigger. But the fundamental insight from context rot research holds: curation beats capacity. The best context is not the most context. It's the right context.
## References
1. Hong, K., Troynikov, A., & Huber, J. (2025). [Context Rot: How Increasing Input Tokens Impacts LLM Performance](https://www.trychroma.com/research/context-rot). Chroma.
2. Liu, N. F., Lin, K., Hewitt, J., Paranjape, A., Bevilacqua, M., Petroni, F., & Liang, P. (2023). [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172). Stanford University.
3. Anthropic. (2026). [1M context is now generally available for Opus 4.6 and Sonnet 4.6](https://claude.com/blog/1m-context-ga).
4. Anthropic. (2026). [Context Windows](https://platform.claude.com/docs/en/build-with-claude/context-windows). Claude API Documentation.
5. Anthropic. (2026). [Model Configuration: Extended Context](https://code.claude.com/docs/en/model-config). Claude Code Documentation.
6. Modarressi, A., et al. (2025). [NoLiMa: Long-Context Evaluation Beyond Literal Matching](https://arxiv.org/abs/2502.05167).
7. Huo, C., et al. (2025). [Found in the Middle: Calibrating Positional Attention Bias Improves Long Context Utilization](https://arxiv.org/abs/2406.16008). MIT & Google Cloud AI.
