---
title: "The state of open source models"
date: "2026-05-01T22:32:00.000+08:00"
lastEdited: "2026-04-30T16:01:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Open Source","Models","LLMs","DeepSeek","Meta","Google","Microsoft","Apple","Anthropic","Claude","ChatGPT","OpenAI","Local-first","Privacy","GPU","Hardware"]
---

Open source AI models have come a long way. Two years ago, they were interesting experiments that trailed far behind commercial offerings. Today, they are competitive enough to power real products, run on consumer hardware, and reshape how the entire industry thinks about access to intelligence.
So where do things actually stand? How close are open models to the frontier, and what does that mean for people who want to run them locally?
## The gap is real, but it's shrinking
The most commonly cited figure is that open source models lag behind the best closed models by about six to nine months. Nathan Lambert at Interconnects has written extensively about this "perpetual catch-up" dynamic, arguing that the best open models are constantly chasing a moving target set by labs like OpenAI and Anthropic.
But the picture is more nuanced than a single number suggests. Epoch AI, which tracks model capabilities through its Epoch Capabilities Index (ECI), found that frontier open-weight models lag behind the state of the art by an average of roughly three months. The gap fluctuates considerably. At times it has closed almost entirely, such as when Meta's Llama 3.1 405B briefly matched Claude 3.5 Sonnet's performance in mid-2024.
The important takeaway is not the exact number of months. It's that for the vast majority of practical tasks, the gap is functionally irrelevant. As one developer put it after testing Gemma 3 12B against paid frontier models across real business workflows: 90% of tasks showed no meaningful difference.
## The models that changed the conversation
A few releases over the past year have fundamentally shifted expectations for what open models can do.
### DeepSeek V3 and R1
DeepSeek's releases in late 2024 and early 2025 were a watershed moment. DeepSeek-V3, a 671-billion parameter mixture-of-experts model, delivered performance rivaling GPT-4o at a fraction of the training cost. Then came DeepSeek-R1, which demonstrated ChatGPT-level reasoning and became so popular that it briefly topped Apple's App Store as a chatbot. The market reaction was dramatic: AI stocks lost over \$600 billion in value in a single day as investors reckoned with the idea that frontier-level capabilities could be built for far less money than assumed.
What made DeepSeek especially significant was the combination of strong performance, open weights, and ruthless cost efficiency. It proved that you don't need billions of dollars and exclusive access to the latest hardware to build competitive models. The latest iteration, DeepSeek-V3.2, continues to rank among the strongest open models available, with particular strengths in reasoning and agentic workloads.
### Meta's Llama 4
Meta released Llama 4 in April 2025, introducing Scout and Maverick as the first open-weight natively multimodal models built on a mixture-of-experts architecture. Llama 4 Scout supports context windows up to 10 million tokens, one of the first open models to reach that scale, and can run on a single H100 GPU. Maverick, with 17 billion active parameters spread across 128 experts, beat GPT-4o and Gemini 2.0 Flash across a range of benchmarks while using less than half the active parameters of DeepSeek V3.
The Llama 4 release was not without controversy. Some developers criticized the initial models for underperforming expectations. But the broader trajectory matters more than any single launch: Meta continues to invest heavily in making its best models freely available.
### The rest of the field
The open model landscape is no longer a two-horse race. Qwen (from Alibaba) has become a major player, with Qwen 3.5 earning strong marks for reasoning and coding, even at small parameter counts. Google's Gemma models have found a niche on consumer hardware. GLM-5 and Kimi K2.5 currently top the open source leaderboards. Mistral continues to compete at the large model tier. The sheer number of credible open models being released every month is itself a sign of how competitive this space has become.
## Small models are the real story
Perhaps the most consequential development is not happening at the frontier. It's happening at the small end of the spectrum.
Small language models (SLMs) in the 1 to 13 billion parameter range have improved dramatically. Modern SLMs benefit from better training data, knowledge distillation from larger models, and improved post-training techniques like reinforcement learning. A well-trained 7B model today can reach roughly 70 to 95 percent of the benchmark performance of much larger models on many language and coding tasks, depending on the domain.
The practical implications are significant. An 8B model that would normally require 16GB of VRAM can be quantized down to under 5GB using 4-bit quantization with minimal loss in accuracy. That means genuinely useful AI running on a laptop, a phone, or an edge device, with no internet connection required.
Models like Phi (Microsoft), Gemma (Google), Qwen (Alibaba), and Llama 3.2 (Meta) have pushed the boundaries of what small models can do. Qwen 3.5 at just 4 billion parameters has shown the ability to handle complex coding tasks that much larger models struggle with.
## The rise of local models
The tooling for running models locally has matured to the point where setup is trivial. Ollama, the most popular local LLM runtime, has become the default choice for developers and hobbyists alike. A report tracking over 174,500 Ollama instances worldwide shows the scale of adoption. Other tools like LM Studio and AnythingLLM have made the experience even more accessible.
Several forces are driving this shift toward local deployment:
- **Privacy.** Running a model locally means your data never leaves your machine. For individuals handling sensitive documents and for enterprises with compliance requirements, this is a decisive advantage.
- **Cost.** After the upfront hardware investment, local inference is essentially free. One analysis estimated the amortized cost at roughly \$1 per day versus \$20 per month for a cloud subscription.
- **Reliability.** No API rate limits, no outages, no deprecation of models you depend on.
- **Customization.** Open models can be fine-tuned on proprietary data. A well fine-tuned small model can outperform much larger general-purpose models on narrow, specialized tasks.
The user base is broadening beyond developers. As models get smaller and tools get simpler, local AI is becoming viable for writers, researchers, small businesses, and anyone who wants AI assistance without ongoing costs or privacy trade-offs.
## What the future looks like
The trajectory points in a clear direction, even if the exact timeline is uncertain.
Open models will likely continue to lag frontier closed models by some margin on the hardest benchmarks. The labs building closed models have more compute, more data, and more resources to throw at the problem. Nathan Lambert argues that the most likely outcome is for the status quo to persist, with open models trailing by six to nine months indefinitely.
But the counterargument is equally compelling. Training costs are falling. Reinforcement learning is reducing dependence on distillation from closed models. The mixture-of-experts architecture is making large models dramatically more efficient. And there is always the possibility of a fundamental breakthrough, a 100x cost reduction in training, or a new way to merge and share expert models, that could let open source leapfrog the frontier entirely.
What seems almost certain is that the "good enough" threshold will keep dropping. If a 4B parameter model can already handle most everyday tasks, the question of whether the best closed model is technically superior on a hard math benchmark starts to feel academic. The future of open source AI may not depend on catching the frontier at all. It may depend on making the models that already exist work better, run cheaper, and reach more people.
For most users and most use cases, that future is already here.
## References
1. Nathan Lambert, "Open models in perpetual catch-up," Interconnects, [https://www.interconnects.ai/p/open-models-in-perpetual-catch-up](https://www.interconnects.ai/p/open-models-in-perpetual-catch-up)
2. Luke Emberson, "Open-weight models lag state-of-the-art by around 3 months on average," Epoch AI, October 2025, [https://epoch.ai/data-insights/open-weights-vs-closed-weights-models](https://epoch.ai/data-insights/open-weights-vs-closed-weights-models)
3. "What DeepSeek Means for Open-Source AI," IEEE Spectrum, [https://spectrum.ieee.org/deepseek](https://spectrum.ieee.org/deepseek)
4. "The Llama 4 herd: The beginning of a new era of natively multimodal AI innovation," Meta AI, April 2025, [https://ai.meta.com/blog/llama-4-multimodal-intelligence/](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)
5. "The state of open source AI models in 2025," Red Hat Developer, January 2026, [https://developers.redhat.com/articles/2026/01/07/state-open-source-ai-models-2025](https://developers.redhat.com/articles/2026/01/07/state-open-source-ai-models-2025)
6. "The Best Open-Source LLMs in 2026," BentoML, [https://www.bentoml.com/blog/navigating-the-world-of-open-source-large-language-models](https://www.bentoml.com/blog/navigating-the-world-of-open-source-large-language-models)
7. "Best Open Source Models, 2026 Rankings," Onyx AI, [https://onyx.app/open-llm-leaderboard](https://onyx.app/open-llm-leaderboard)
8. "The Best Open-Source Small Language Models (SLMs) in 2026," BentoML, [https://www.bentoml.com/blog/the-best-open-source-small-language-models](https://www.bentoml.com/blog/the-best-open-source-small-language-models)
9. "Small Language Models: A Complete Guide for 2026," Knolli AI, [https://www.knolli.ai/post/small-language-models](https://www.knolli.ai/post/small-language-models)
10. "Ollama's Global Reach: A Look at Deployment Trends and Model Choices," Tenthe AI, April 2025, [https://dev.to/realryan/ollamas-global-reach-a-look-at-deployment-trends-and-model-choices-16a4](https://dev.to/realryan/ollamas-global-reach-a-look-at-deployment-trends-and-model-choices-16a4)
11. "The Coming Disruption: How Open-Source AI Will Challenge Closed-Model Giants," California Management Review, January 2026, [https://cmr.berkeley.edu/2026/01/the-coming-disruption-how-open-source-ai-will-challenge-closed-model-giants/](https://cmr.berkeley.edu/2026/01/the-coming-disruption-how-open-source-ai-will-challenge-closed-model-giants/)
12. Sebastian Raschka, "The State Of LLMs 2025: Progress, Problems, and Predictions," December 2025, [https://magazine.sebastianraschka.com/p/state-of-llms-2025](https://magazine.sebastianraschka.com/p/state-of-llms-2025)
