---
title: "We still haven’t solved hallucinations"
date: "2026-04-28T11:00:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Hallucinations","LLMs","RAG","Safety","Prompt Engineering","Models","OpenAI"]
---

It's 2026 and large language models are everywhere. They write code, summarize legal documents, draft emails, and power customer service bots used by millions of people. And yet, they still make things up.
Not occasionally. Not in edge cases. Regularly, confidently, and in ways that are genuinely hard to catch. Despite billions of dollars in research, despite retrieval-augmented generation, despite reinforcement learning from human feedback, despite chain-of-thought prompting, the hallucination problem persists. We've gotten better at managing it. We haven't solved it. And there are good reasons to believe we never will.
## The numbers are still bad
A 2026 benchmark study across 37 large language models found hallucination rates ranging from 15% to 52% depending on the task and model. In legal queries, Stanford researchers measured rates as high as 58% to 88% across major models. In medical case summaries, hallucinations hit 64% without mitigation prompts. Even with the best prompting strategies, GPT-4o's hallucination rate only dropped from 53% to 23% in one study published in *npj Digital Medicine*.
These are not fringe results. They come from rigorous, peer-reviewed research. And they paint a consistent picture: hallucinations are not a rounding error. They are a core characteristic of how these systems work.
The situation gets worse in specific domains. AI search engines hallucinate incorrect facts in up to 60% of generated summaries. Chatbots in customer support produce hallucinated responses 15% to 27% of the time. Hallucinated citations appear in over 30% of chatbot-generated answers in research contexts. Knowledge workers now spend an average of 4.3 hours per week just fact-checking AI outputs.
## Why this keeps happening
LLMs don't "know" things. They predict the next token in a sequence based on statistical patterns learned from training data. When a model produces a fluent, confident answer, it isn't because it verified the facts. It's because the sequence of words it generated has high probability given the patterns it learned.
This is a fundamental architectural reality, not a bug that can be patched. The model has no internal mechanism for distinguishing true statements from plausible-sounding ones. It doesn't have a concept of truth at all. It has a concept of likelihood.
Researchers at MIT found something especially troubling: AI models use *more* confident language when hallucinating than when stating facts. Models were 34% more likely to use phrases like "definitely," "certainly," and "without a doubt" when generating incorrect information. The wronger the AI gets, the more certain it sounds.
This creates a dangerous dynamic. Users naturally trust confident outputs more. And the outputs most deserving of skepticism are precisely the ones that sound most authoritative.
## The mathematical case for inevitability
In early 2024, Ziwei Xu, Sanjay Jain, and Mohan Kankanhalli published a paper titled "Hallucination is Inevitable: An Innate Limitation of Large Language Models." Their argument was not empirical. It was formal.
They defined hallucination as inconsistency between a computable LLM and a computable ground truth function, then used results from learning theory to show that LLMs cannot learn all computable functions. Therefore, any LLM used as a general problem solver will inevitably produce outputs that diverge from ground truth. Hallucination isn't a failure of training. It's a mathematical certainty.
A separate 2024 paper, "LLMs Will Always Hallucinate, and We Need to Live With This," reinforced this conclusion by drawing on Godel's First Incompleteness Theorem and the undecidability of problems like the Halting Problem. The authors demonstrated that every stage of the LLM process, from training data compilation to text generation, carries a non-zero probability of hallucination. No amount of architectural improvement, dataset enhancement, or fact-checking can reduce that probability to zero.
These aren't pessimistic takes from AI skeptics. They're rigorous proofs from computer scientists pointing out structural limits.
## RAG helps, but doesn't fix the problem
Retrieval-augmented generation has become the go-to mitigation strategy. Instead of relying solely on the model's parametric knowledge, RAG systems retrieve relevant documents and feed them as context before generating a response. The idea is straightforward: ground the model in actual sources so it has less reason to fabricate.
It works, to a degree. On grounded summarization tasks, top models improved to 0.7% to 1.5% hallucination rates in 2025. That's genuinely impressive for narrow, well-defined tasks.
But RAG introduces its own failure modes. If the retrieval step pulls irrelevant or incomplete documents, the model may hallucinate based on bad context rather than no context. If multiple retrieved passages conflict, the model may synthesize them into something that doesn't reflect any of the sources. And if the question requires reasoning beyond what's explicitly stated in the retrieved text, the model falls back on its parametric knowledge, which is exactly the source of hallucinations RAG was supposed to mitigate.
RAG also doesn't help when the knowledge simply doesn't exist in the retrieval corpus. Ask a RAG system a question that falls outside its document store, and it will often generate an answer anyway rather than admitting it doesn't know.
## The real-world consequences are piling up
The theoretical concerns translate directly into real harm. In 2024, 47% of enterprise AI users admitted to making at least one major business decision based on hallucinated content. That same year, 39% of AI-powered customer service bots were pulled back or reworked due to hallucination-related errors.
In one high-profile case, Deloitte delivered a report to the Australian government that contained multiple fabricated citations and phantom footnotes, generated by an AI tool used to fill "traceability and documentation gaps." The firm had to refund part of a roughly \$300,000 contract. In another incident, Air Canada's AI chatbot offered a passenger a bereavement discount that didn't actually exist, leading to a dispute when the airline refused to honor it.
In healthcare, the stakes are even higher. A 2025 meta-analysis found LLMs answering oncology questions hallucinated in 23% of cases. Under adversarial conditions, that rate climbed to 82%.
These aren't hypothetical risks. They're documented failures happening right now, at scale.
## The confidence calibration problem
One of the most promising research directions is teaching models to express uncertainty. MIT's Computer Science and Artificial Intelligence Laboratory has been developing techniques like "Reinforcement Learning with Calibration Rewards" that train language models to produce calibrated confidence estimates alongside their answers.
The goal is straightforward: if a model could reliably say "I'm 30% confident in this answer," users could make informed decisions about when to trust the output. It would transform hallucination from a hidden risk into a visible one.
But calibration is hard. Current models are notoriously poorly calibrated, meaning their expressed confidence bears little relationship to their actual accuracy. And the incentive structures of model training work against good calibration. Models are rewarded for correct answers, not for knowing when they're wrong. Reinforcement learning optimizes for getting the answer right, not for honestly reporting uncertainty.
Research in this area is making progress, but we're far from deployment-ready solutions that work across domains and model architectures.
## What we should actually do
Accepting that hallucinations are a permanent feature of LLMs doesn't mean giving up. It means being honest about the engineering challenge and designing systems accordingly.
First, human-in-the-loop processes are non-negotiable for any high-stakes application. 76% of enterprises have already adopted this approach. The question isn't whether to include human review, but how to make it efficient enough to be practical.
Second, multi-layered mitigation works better than any single technique. The most effective production systems in 2026 combine retrieval augmentation, uncertainty estimation, self-consistency checking, and real-time guardrails. Some implementations report up to 96% reduction in hallucination rates. That's not zero, but it's a dramatic improvement.
Third, we need to stop framing hallucination as a temporary problem that the next model release will fix. The "just wait for GPT-N" narrative has collapsed. OpenAI's own research identified three mathematical factors making hallucinations inevitable: epistemic uncertainty when information appears rarely in training data, model limitations where tasks exceed architectural capacity, and computational intractability where some problems are simply too hard to solve.
Finally, the most underrated mitigation is scope. LLMs hallucinate less when they're asked to do less. A model tasked with summarizing a specific document halluccinates far less than one asked to answer open-ended questions about the world. Constraining the task constrains the failure mode.
## The honest path forward
We've built remarkably capable systems. LLMs can do things that would have seemed like science fiction a decade ago. But capability and reliability are different things, and we've been conflating them for too long.
The hallucination problem isn't going away. It's baked into the mathematics of how these models work. The sooner we internalize that, the sooner we can stop chasing the illusion of a hallucination-free model and start building the verification infrastructure, the calibration techniques, and the human processes that make these systems safe to use despite their limitations.
The path forward isn't a model that never hallucinates. It's a system that knows when it might be wrong, and tells you.
## References
1. Xu, Z., Jain, S., & Kankanhalli, M. (2024). [Hallucination is Inevitable: An Innate Limitation of Large Language Models](https://arxiv.org/abs/2401.11817). arXiv.
2. Banerjee, S., Agarwal, A., & Singla, S. (2024). [LLMs Will Always Hallucinate, and We Need to Live With This](https://arxiv.org/abs/2409.05746). arXiv.
3. [LLM Hallucination Statistics 2026: Hidden Risks Now](https://sqmagazine.co.uk/llm-hallucination-statistics/). SQ Magazine.
4. [It's 2026. Why Are LLMs Still Hallucinating?](https://blogs.library.duke.edu/blog/2026/01/05/its-2026-why-are-llms-still-hallucinating/) Duke University Libraries.
5. [LLM Hallucination Detection and Mitigation: State of the Art in 2026](https://zylos.ai/research/2026-01-27-llm-hallucination-detection-mitigation). Zylos Research.
6. [The Reality of AI Hallucinations in 2025](https://drainpipe.io/the-reality-of-ai-hallucinations-in-2025/). Drainpipe.
7. [A better method for identifying overconfident large language models](https://news.mit.edu/2026/better-method-identifying-overconfident-large-language-models-0319). MIT News.
8. [Teaching AI models to say "I'm not sure"](https://news.mit.edu/2026/teaching-ai-models-to-say-im-not-sure-0422). MIT News.
9. [LLM Hallucinations in 2026: How to Understand and Tackle AI's Most Persistent Quirk](https://www.lakera.ai/blog/guide-to-hallucinations-in-large-language-models). Lakera.
10. [AI hallucinations: A threat to scholarly integrity](https://www.sciencedirect.com/science/article/abs/pii/S221462962600191X). ScienceDirect.
11. [8 AI Hallucinations Examples](https://www.evidentlyai.com/blog/ai-hallucinations-examples). Evidently AI.
