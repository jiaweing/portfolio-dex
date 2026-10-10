---
title: "The era of local AI"
date: "2026-04-01T16:22:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

You have probably heard it a thousand times by now: AI is changing everything. But here is something that does not get enough attention, the AI you can run *on your own machine*, with no cloud, no API keys, and no monthly bill. Local AI has quietly become remarkably capable, and this post walks through how we got here, what makes it work, and how to get the most out of it.
## What is an LLM, and what are parameters?
A large language model (LLM) is a neural network trained on massive amounts of text to predict the next word in a sequence. The "large" part refers to the number of **parameters** the model has. Parameters are the numerical values, primarily weights and biases, that the model learns during training. They represent everything the model "knows" about language.
When you see a model described as "7B" or "70B," that refers to 7 billion or 70 billion parameters. More parameters generally means the model can capture more complex language patterns, handle nuanced prompts, and produce higher quality outputs. But more parameters also means more memory, more compute, and more cost to run.
A model like GPT-4 is estimated to have over a trillion parameters. Running something that large requires data center hardware. That is where the challenge begins, and where the story of local AI picks up.
## Knowledge distillation: teaching small models to think big
If large models are too expensive to run locally, can we somehow transfer their intelligence into smaller ones? That is exactly what **knowledge distillation** does.
The concept, formalized by Geoffrey Hinton, Oriol Vinyals, and Jeff Dean in 2015, works like a teacher-student relationship. A large, powerful "teacher" model produces not just final answers but probability distributions across all possible outputs. A smaller "student" model is then trained to mimic those distributions rather than just learning from raw training data.
Why does this matter? Because the teacher's output contains *richer information* than simple correct-or-incorrect labels. When a teacher model says "this word has an 80% chance of being right, but these other words have 10% and 5% chances," the student learns the relationships between concepts, not just the answers. The result is a smaller model that punches well above its weight class.
This is the bridge that makes local AI possible. Models like Llama, Qwen, Phi, and Gemma have all benefited from distillation techniques, bringing frontier-level reasoning down to sizes that fit on consumer hardware.
## Enter local AI
Thanks to distillation and other compression techniques, we now have models that run entirely on your laptop, desktop, or even your phone. No internet connection required.
The benefits are significant:
- **Privacy**: Your data never leaves your device. No prompts are logged to a server, no conversations are used for training. For sensitive work, legal documents, medical notes, or proprietary code, this is a fundamental advantage.
- **Security**: No data in transit means no data to intercept. You control the entire pipeline.
- **Cost**: After the initial hardware investment, inference is free. No per-token pricing, no subscription fees, no rate limits.
- **Offline capability**: Local models work on a plane, in a cabin, or anywhere without connectivity.
- **Speed**: No network round-trip means lower latency for many tasks.
Tools like [Ollama](https://ollama.com), [LM Studio](https://lmstudio.ai), and [llama.cpp](https://github.com/ggerganov/llama.cpp) have made setup almost trivial. A single command can download and run a model locally.
### A note on prompt injection
Local models are not immune to prompt injection attacks. If you expose a local model to external input, such as web content, emails, or user-submitted text, an attacker can craft inputs that manipulate the model's behavior. The more tools you give your model (file access, web browsing, code execution), the larger the attack surface becomes. Privacy from the cloud does not equal invulnerability.
## Running on CPU: it actually works now
One of the most underappreciated developments is that many local models now run *entirely on CPU*, no GPU required. Libraries like llama.cpp are optimized for CPU inference, and Intel's Advanced Matrix Extensions (AMX) provide hardware acceleration on newer processors.
A quantized 7B model typically needs 4 to 7 GB of RAM, well within the range of most modern laptops. Performance will not match a dedicated GPU, but for many tasks, such as drafting text, answering questions, or summarizing documents, CPU inference is fast enough to be practical.
This lowers the barrier to entry dramatically. You do not need a gaming rig or a workstation GPU. A reasonably modern computer with 16 GB of RAM can run useful models today.
## Fine-tuning your own model with Unsloth
What if you want a model tailored to your specific use case? Fine-tuning used to require expensive GPU clusters, but tools like [Unsloth](https://unsloth.ai) have changed the equation.
Unsloth is an open-source framework that makes fine-tuning up to 30x faster while using 90% less memory than standard approaches. It achieves this by manually deriving compute-heavy math steps and writing custom GPU kernels. You can fine-tune models on Google Colab's free tier or locally with as little as 3 GB of VRAM using LoRA (Low-Rank Adaptation).
The process is straightforward: prepare a dataset of question-answer pairs, choose a base model, and run the training script. Unsloth supports supervised fine-tuning (SFT), preference optimization (DPO, ORPO), and reinforcement learning (GRPO). The result is a model that understands your domain, your terminology, and your preferred output format.
## Context is everything
Here is a truth about local models that does not get said enough: **they are not dumb, they just need more context**.
Larger cloud models can compensate for vague prompts with their enormous parameter count and training data. Smaller local models need you to meet them halfway. The difference between a useless response and an excellent one often comes down to how much context you provide.
Instead of zero-shot prompting (giving the model a bare instruction with no examples), try these approaches:
- **Give examples**: Show the model what good output looks like before asking it to produce its own.
- **Provide reference material**: Paste in relevant documents, code, or data. Local models excel when you give them the right context to work with.
- **Use tools**: Connect your model to web search, workspace search, file systems, email, or local documents. The more information a model can retrieve, the better its outputs become.
- **Be specific**: Instead of "write me an email," say "write a professional email to a client explaining that the project deadline is moving from March 15 to April 1, and the reason is a dependency on the vendor's API update."
The more tools and context a local model has access to, the closer it gets to cloud-model quality. For most everyday tasks, a well-configured local model with good context is genuinely good enough.
## Vision and tool calling: how far we have come
Two capabilities have seen remarkable progress in local models: **vision** and **tool calling**.
### Vision
Modern local models like Qwen 2.5 VL, Phi-4 Multimodal, and LLaVA variants can process images alongside text. They can describe photos, read text from screenshots, interpret charts, and even understand UI layouts. Apple's Foundation Models framework, introduced at WWDC 2025, brings on-device vision capabilities directly to iOS apps. This is not a gimmick anymore. Local vision models are genuinely useful for tasks like extracting data from receipts, reading handwritten notes, or analyzing product images.
### Tool calling
Tool calling lets a model decide when to invoke external functions, like searching the web, running code, or querying a database, rather than just generating text. Models like GPT-OSS, Qwen3, and Llama 4 have shown strong tool-calling ability even at smaller sizes. Unsloth provides a comprehensive guide for setting up tool calling with local models, including executing Python code, running terminal commands, and chaining multiple tool calls together.
The combination of vision and tool calling transforms a local model from a text generator into a genuine assistant that can see your screen, read your files, search for information, and take actions.
## Quantization: compressing models without losing the plot
Quantization is the technique that makes large models fit on consumer hardware. Think of it as compression for neural networks.
### How it works
During training, model parameters are typically stored as 16-bit floating point numbers (FP16). Quantization reduces the precision of these numbers. Instead of 16 bits per parameter, you might use 8, 4, or even 2 bits. A 7B model in FP16 takes about 14 GB of memory. Quantize it to 4-bit, and it drops to roughly 4 GB.
### Understanding GGUF quantization labels
If you have browsed model downloads on Hugging Face, you have seen labels like Q4_K_M or Q5_K_S. Here is what they mean:
- **Q** stands for quantized, followed by the bit count. Q4 means 4-bit quantization, Q8 means 8-bit.
- **K** indicates "K-quant," a modern quantization method that uses a two-level scheme with super-blocks and sub-blocks for better accuracy. K-quants are faster and more accurate than legacy quantization methods and are the standard choice today.
- The suffix, **_S** (small), **_M** (medium), or **_L** (large), describes the mix of quantization types used across the model's layers. More important layers get higher precision. _L preserves more quality but uses more memory. _S is more aggressive about compression.
There are also **I-quants** (IQ2_XXS, IQ3_S) that use importance matrices for even more efficient compression at very low bit counts.
### The tradeoffs
Quantization is not free. Reducing precision means the model becomes less capable:
- **Q8**: Nearly indistinguishable from full precision. Minimal quality loss.
- **Q6_K**: Very good quality. A sweet spot for many users with sufficient memory.
- **Q4_K_M**: The most popular choice. Good balance of quality and size.
- **Q3_K** and below: Noticeable quality degradation. The model may struggle with complex reasoning or produce more errors.
The rule of thumb: quantize as little as you can get away with for your available hardware.
## Mixture of Experts: more brain, less cost
**Mixture of Experts (MoE)** is an architecture that changes how we think about model size. Instead of activating all parameters for every input, an MoE model contains multiple specialized "expert" sub-networks and a router that selects which experts to activate for each token.
DeepSeek popularized this approach with their DeepSeekMoE paper in January 2024, introducing two key innovations: fine-grained expert segmentation (more, smaller experts for flexible combinations) and shared expert isolation (dedicated experts for common knowledge to reduce redundancy). Their DeepSeek-V3 and R1 models, at 236 billion total parameters but only 21 billion active parameters, demonstrated that MoE can deliver frontier-level performance at a fraction of the inference cost.
Why does this matter for local AI? Because an MoE model's *active* parameter count determines its memory bandwidth requirement during inference, while its *total* parameter count determines its knowledge capacity. Meta's Llama 4 Scout, for example, uses MoE to deliver GPT-4-class quality in a package that can run on a single consumer GPU. You get the intelligence of a much larger model with the compute cost of a much smaller one.
The catch: MoE models still need enough memory to store all the experts, even if only a few are active at a time. So the total model file size remains large. But the compute per token stays manageable.
## What can you actually run today?
Here is a rough guide based on current hardware as of early 2026:
### On a smartphone (iPhone 17, flagship Android)
Modern phones have 8 to 12 GB of RAM and increasingly capable neural processing units (NPUs). Mobile memory bandwidth sits around 50 to 90 GB/s.
- **Practical range**: Models up to about **3B to 4B parameters** at Q4 quantization.
- **Examples**: Gemma 3 1B/3B, Phi-4 Mini (3.8B), Qwen 2.5 3B, SmolLM2.
- **Performance**: Usable for simple tasks, summarization, quick Q&A, and drafting short text. Apple's Foundation Models framework enables on-device inference natively on iOS.
### On a desktop or laptop
A typical machine with 16 to 32 GB of RAM, or a discrete GPU with 8 to 24 GB of VRAM, can handle significantly larger models.
- **16 GB RAM (CPU only)**: Models up to about **7B to 8B parameters** at Q4 quantization.
- **24 GB VRAM (e.g., RTX 4090)**: Models up to about **14B parameters** at Q4, or 7B at Q8. With aggressive quantization, even 30B+ models can fit.
- **32 GB+ RAM/VRAM**: Comfortable range for **14B models** and MoE models like Llama 4 Scout.
- **Examples**: Llama 3.3 8B, Qwen 2.5 7B/14B, Mistral 7B, DeepSeek-R1 distilled variants, GPT-OSS 20B.
- **Performance**: At 7B to 14B with a good GPU, you can expect 30 to 80+ tokens per second, which is faster than reading speed.
The sweet spot for most desktop users is **7B to 14B parameters**, where you get strong general-purpose capability with comfortable performance on mainstream hardware.
## The bottom line
Local AI in 2026 is not a compromise. It is a genuine alternative to cloud AI for a wide range of tasks. The combination of knowledge distillation, quantization, MoE architectures, and tools like Unsloth has created an ecosystem where useful, private, free AI runs on hardware you already own.
The models are not perfect. They are smaller than frontier cloud models, and they will struggle with the most complex reasoning tasks. But give them context, give them tools, and give them well-crafted prompts, and they will surprise you with what they can do.
The era of local AI is not coming. It is already here.
## References
1. Hinton, G., Vinyals, O., & Dean, J. (2015). "Distilling the Knowledge in a Neural Network." [arXiv:1503.02531](https://arxiv.org/abs/1503.02531)
2. DeepSeek-AI. (2024). "DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models." [arXiv:2401.06066](https://arxiv.org/abs/2401.06066)
3. Chandra, V. & Krishnamoorthi, R. (2026). "On-Device LLMs: State of the Union, 2026." [Meta AI Research](https://v-chandra.github.io/on-device-llms/)
4. Unsloth AI. "Fine-tuning LLMs Guide." [Unsloth Documentation](https://unsloth.ai/docs/get-started/fine-tuning-llms-guide)
5. Unsloth AI. "Tool Calling Guide for Local LLMs." [Unsloth Documentation](https://unsloth.ai/docs/basics/tool-calling-guide-for-local-llms)
6. Apple Newsroom. (2025). "Apple's Foundation Models framework unlocks new intelligent app experiences." [Apple](https://www.apple.com/newsroom/2025/09/apples-foundation-models-framework-unlocks-new-intelligent-app-experiences/)
7. GGUF Quantization Methods Overview. [Reddit r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1ba55rj/overview_of_gguf_quantization_methods/)
8. Micro Center. "Run AI Locally: The Best LLMs for 8GB, 16GB, 32GB Memory and Beyond." [Micro Center](https://www.microcenter.com/site/mc-news/article/best-local-llms-8gb-16gb-32gb-memory-guide.aspx)
