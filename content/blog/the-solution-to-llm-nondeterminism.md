---
title: "The solution to LLM nondeterminism"
date: "2026-02-16"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Ask an LLM the same question twice and you will probably get two different answers. This is not a bug, it is a deep property of how these systems work. But for anyone building software on top of language models, it is a serious problem. The good news: there is a solution, and it is one that programmers have used for decades. Make the LLM output deterministic code, then run the code.
## The problem with LLM nondeterminism
Large language models are fundamentally stochastic. Even when you set the temperature to zero and fix the random seed, the outputs can still vary between runs. This surprises most people.
The obvious sources of randomness, like token sampling with a nonzero temperature, are well understood. But there are deeper, more subtle causes that persist even under supposedly "deterministic" settings:
- **Floating-point non-associativity.** GPUs perform floating-point arithmetic in parallel, and the order in which numbers get added together can change between runs. Because floating-point addition is not associative, $`(a + b) + c`$ does not always equal \$a + (b + c)\$. Tiny rounding differences accumulate across billions of operations, eventually shifting which token has the highest probability.
- **Batch size variation.** Inference servers batch multiple requests together for efficiency. The batch size changes the internal computation paths of GPU kernels, altering the numerical results for each individual request. From a user's perspective, this is pure nondeterminism, since you have no control over how many other people are querying the server at the same time.
- **Hardware and software differences.** Different GPU architectures, driver versions, and library implementations can all produce slightly different floating-point results for the same computation.
Research from Thinking Machines Lab demonstrated this concretely: when generating 1,000 completions of the same prompt with temperature zero using Qwen3-235B, they observed **80 unique completions**. The outputs were identical for the first 102 tokens, then diverged. "Queens, New York" versus "New York City," and from there the texts spiraled apart.
The critical insight is that this is not about sampling randomness. It is about the infrastructure itself being unable to guarantee bitwise identical results across runs.
## Why temperature zero does not save you
Setting `temperature=0` eliminates one source of randomness: the token sampling step. With greedy decoding, the model always picks the highest-probability token. No dice rolls involved.
But the logits themselves, the raw probability scores the model computes before selecting a token, can shift between runs due to the infrastructure-level causes described above. When two candidate tokens have very similar probabilities, a tiny numerical perturbation is enough to flip the winner. And because LLMs are autoregressive, each token depends on every token before it, so a single flipped token cascades into a completely different output.
OpenAI's documentation acknowledges this openly: their API can only be "mostly deterministic." Anthropic says the same about Claude. Google's Gemini documentation notes that "a small amount of variation is still possible" even at temperature zero. Nobody guarantees bitwise reproducibility, because the engineering cost of doing so is enormous.
## The elegant workaround: output code, not answers
Here is the key insight: **you do not need the LLM itself to be deterministic if its output is a deterministic program.**
Instead of asking an LLM to directly produce a final answer, ask it to produce code that computes the answer. The code is deterministic. Run it once, run it a thousand times, you get the same result. The LLM's nondeterminism is confined to the code generation step, and you can inspect, test, and version-control the generated code before ever executing it.
This is not a new idea. It is the principle behind every compiler, every SQL query planner, every spreadsheet formula. You separate the *specification* (which can tolerate ambiguity) from the *execution* (which must be precise). LLMs are remarkably good at translating fuzzy human intent into precise, executable specifications.
### How this works in practice
**Data extraction and transformation.** Instead of asking an LLM to extract fields from a document and return JSON directly, ask it to write a Python script or a set of regex patterns that performs the extraction. The script can be reviewed, tested, and reused across thousands of documents with perfectly consistent results.
**Calculations and analysis.** Rather than having an LLM compute a financial projection or statistical summary in prose, have it generate a script that pulls the data and runs the math. The arithmetic happens in a deterministic runtime, not in the model's token-by-token generation.
**Workflow automation.** The "Blueprint First, Model Second" framework (Qiu et al., 2025) formalizes this approach for agentic systems. Expert-defined procedures are codified into source code "Execution Blueprints" that a deterministic engine runs. The LLM is only invoked for bounded, complex sub-tasks within the workflow, never to decide the workflow's path. On the challenging \$tau\$-bench benchmark, this approach outperformed the strongest baseline by 10.1 percentage points.
**Constrained and structured output.** Tools like OpenAI's structured output mode, Anthropic's tool calling, and open-source libraries like Outlines use constrained decoding to force the LLM's output to conform to a JSON schema or formal grammar. This does not make the content deterministic, but it guarantees the *structure* is valid, which solves half the problem for many applications.
## When you actually need the inference itself to be deterministic
For some use cases, confining the LLM to code generation is not enough. Reinforcement learning from human feedback (RLHF) training loops, scientific reproducibility, and certain compliance scenarios genuinely need bitwise identical inference results.
The Thinking Machines Lab team showed this is achievable, but expensive. The core technique is making every GPU kernel "batch-invariant," meaning the numerical result for each element does not depend on how many other elements are in the batch. This requires:
1. **Batch-invariant RMSNorm** that uses a fixed reduction strategy regardless of batch size.
2. **Batch-invariant matrix multiplication** that avoids split-K strategies and uses a single kernel configuration for all shapes.
3. **Batch-invariant attention** with fixed-size KV splits instead of fixed-count splits, plus careful handling of the KV cache layout.
Their unoptimized implementation ran roughly 1.6x slower than default vLLM. After improving the attention kernel, the overhead dropped to about 1.6x. Not free, but not catastrophic either.
The payoff for RL was dramatic. Without deterministic inference, on-policy RL training suffered reward collapse. With deterministic inference, training ran smoothly with zero KL-divergence between the sampling policy and the training policy.
## Practical takeaways
**For most applications, generate code instead of answers.** If your LLM pipeline produces structured data, calculations, or decisions that need to be consistent, have the model write a program that produces the output. Review and test the program. Run it deterministically.
**Design for variance, not against it.** If you must use direct LLM output, build validation layers, retry logic, and output normalization into your pipeline. Accept that minor variations will happen and handle them gracefully.
**Use structured output modes.** JSON schema enforcement, tool calling, and constrained decoding dramatically reduce the space of possible outputs without eliminating the model's ability to handle novel inputs.
**Reserve deterministic inference for cases that truly need it.** If you are training RL models, doing scientific benchmarking, or operating under strict audit requirements, invest in batch-invariant kernels. For everything else, the code-generation approach is simpler and more practical.
**Treat the LLM as a translator, not an executor.** The model's job is to convert fuzzy human intent into precise, verifiable, deterministic specifications. The computer's job is to execute those specifications. This division of labor plays to each system's strengths.
## References
1. He, H. and Thinking Machines Lab. "Defeating Nondeterminism in LLM Inference." Thinking Machines Lab: Connectionism, Sep 2025. [Link](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)
2. Qiu, L. et al. "Blueprint First, Model Second: A Framework for Deterministic LLM Workflow." arXiv:2508.02721, Aug 2025. [Link](https://arxiv.org/abs/2508.02721)
3. Hussain, S. "Understanding why deterministic output from LLMs is nearly impossible." Unstract Blog, Oct 2025. [Link](https://unstract.com/blog/understanding-why-deterministic-output-from-llms-is-nearly-impossible/)
4. Atil, B. et al. "Non-Determinism of 'Deterministic' LLM Settings." arXiv:2408.04667, 2024. [Link](https://arxiv.org/abs/2408.04667)
5. Brenndoerfer, M. "Constrained Decoding: Grammar-Guided Generation for Structured LLM Output." Jul 2025. [Link](https://mbrenndoerfer.com/writing/constrained-decoding-structured-llm-output)
6. "Deterministic Programming with LLMs." Dragons in the Algorithm, Feb 2026. [Link](https://www.mcherm.com/deterministic-programming-with-llms.html)
