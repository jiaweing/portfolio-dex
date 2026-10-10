---
title: "Prompt engineering still matters"
date: "2026-04-27T22:57:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Prompt Engineering","Agents","Anthropic","LLMs"]
---

Everyone seems to agree: prompt engineering is dead. The new hotness is context engineering, the art of curating everything the model sees, from retrieved documents to tool outputs to conversation history. Andrej Karpathy endorsed the shift. Tobi Lutke coined the reframe. Blog posts and Reddit threads declared prompting a relic of 2023.
I get the appeal of the rebrand. But I think the pendulum has swung too far. With all the hype on context engineering and agentic harnesses, the prompt is still the most important thing. Context engineering matters, absolutely, but it doesn't replace the need to write clear, structured, intentional instructions. It extends it.
## The context engineering wave
In mid-2025, context engineering emerged as the preferred framing for how serious AI practitioners work with large language models. Karpathy called it "the delicate art and science of filling the context window with just the right information for the next step." Anthropic described it as the natural progression of prompt engineering, encompassing all the strategies for curating tokens during inference, not just the instruction text itself.
The distinction is real and useful. In production systems, the prompt is only a fraction of what the model actually sees. There's retrieved context from vector databases, conversation memory, tool call results, system-level instructions, and more. Designing that entire information environment is genuinely a different skill from writing a single clever instruction.
But here's the thing: the prompt is still at the center of that environment.
## Why the prompt still runs the show
Context engineering is about what information the model has access to. Prompt engineering is about how you tell the model to use it. You can assemble a perfect context window, rich with relevant documents, structured data, and tool outputs, and still get mediocre results if the instructions are vague or poorly structured.
This isn't theoretical. Teams building production LLM systems consistently find that small changes to prompt wording produce outsized effects on output quality. Caylent, an AWS consulting partner that has deployed dozens of agentic systems on Amazon Bedrock, reported a counterintuitive finding: the teams that succeed focus more on prompt engineering than orchestration complexity. Their experience across 30,000+ facilities showed that well-crafted prompts often deliver better ROI than sophisticated multi-agent architectures.
The Wharton School's 2025 Prompting Science Report found that matching technique to task matters more than memorizing every method. But it also confirmed that techniques like chain-of-thought prompting, few-shot examples, and structured output formatting continue to produce meaningful accuracy gains, sometimes 10 to 40 percent on reasoning benchmarks.
## The techniques that held up
Several prompt engineering techniques have proven durable across model generations, even as models have gotten dramatically more capable.
**Chain-of-thought prompting** remains one of the most reliable ways to improve reasoning quality. Asking the model to work through intermediate steps before arriving at an answer produces better results on analytical tasks. The original research by Wei et al. in 2022 demonstrated this, and it continues to hold in practice, though the gains are smaller on models that already reason step-by-step internally.
**Few-shot examples** still work remarkably well for establishing output patterns. Showing two or three examples of desired format and style lets the model pattern-match in ways that instruction-only prompts sometimes fail to achieve.
**Structured output specification** has become more important, not less. As LLMs are integrated into larger systems that expect JSON, tables, or other machine-readable formats, explicit formatting instructions in the prompt are critical for reliability. Without them, you're relying on hope and regex.
**Role and persona framing** continues to shape tone, depth, and perspective effectively. And **iterative refinement**, treating the first prompt as a starting point rather than a final product, consistently produces better results than trying to nail the perfect prompt on the first attempt.
## Prompts are the instructions layer in agentic systems
The rise of agentic AI makes prompt engineering more important, not less. An AI agent isn't just answering a question. It's planning, using tools, evaluating results, and deciding next steps. Every one of those capabilities depends on well-written prompts.
As one analysis put it, effective prompt engineering for agentic systems is about building structured reasoning patterns. The natural language is the medium, and the reasoning patterns are the structures. A single cleverly worded prompt is often less effective than serviceable words organized in a highly effective reasoning architecture.
This means the skill hasn't gone away. It has gotten more demanding. You're no longer writing one prompt. You're writing system prompts, tool-use instructions, evaluation criteria, and fallback behaviors. Each one needs to be clear, consistent, and robust.
## Context engineering needs prompt engineering
Anthropics's own documentation frames context engineering as a superset, not a replacement. The prompt is still a core component of the context. And research on position bias, the finding that models attend more strongly to content at the start and end of the context window, means that where and how you write your instructions within the context still matters enormously.
Prompt caching strategies, like those offered by Anthropic, can cut costs by 90 percent and latency by 85 percent on cached prefixes. But they work best when the system prompt is stable and well-designed, which is itself a prompt engineering problem.
The framing that prompt engineering is dead and context engineering has replaced it creates a false dichotomy. Context engineering is the house. Prompt engineering is the foundation. You can't build one without the other.
## The real shift is in scope, not relevance
What's actually changed is not that prompts matter less, but that the surface area of prompting has expanded. In 2023, prompt engineering meant crafting a single input to a chatbot. In 2026, it means designing instruction sets across multi-step workflows, agent architectures, and dynamic retrieval pipelines.
The skill is evolving from artisanal one-shot prompting to systematic instruction design. That's a maturation, not an extinction. The developers who dismiss prompt engineering as a solved problem, or worse, an irrelevant one, are the same ones whose agents behave unpredictably in production.
## Practical takeaways
If you're building with LLMs today, here's what I'd recommend:
1. **Don't skip the prompt.** Before investing in complex retrieval pipelines or multi-agent orchestration, make sure your base prompts are clear, structured, and tested. You'd be surprised how much improvement comes from getting the instructions right.
2. **Match technique to task.** Chain-of-thought helps with reasoning. Few-shot helps with formatting. Structured output helps with reliability. Use the right tool for the job.
3. **Treat prompts as code.** Version them. Review them. Test them against edge cases. The "vibe-coding" approach to prompting doesn't scale.
4. **Think in layers.** Context engineering and prompt engineering aren't competing approaches. Use context engineering to ensure the model has the right information. Use prompt engineering to ensure it knows what to do with that information.
5. **Iterate.** Three rounds of prompt refinement typically produce dramatically better results than one perfect attempt. Build iteration into your workflow.
The hype cycle will move on. Context engineering will get its own successor term. But the fundamental challenge of telling a language model what to do clearly and effectively isn't going anywhere. The prompt still matters. It might matter more than ever.
## References
1. Wei, J., Wang, X., Schuurmans, D., et al. "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models." NeurIPS 2022. [https://arxiv.org/abs/2201.11903](https://arxiv.org/abs/2201.11903)
2. Anthropic. "Effective context engineering for AI agents." [https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
3. Karpathy, A. Post on X, June 25, 2025. [https://x.com/karpathy/status/1937902205765607626](https://x.com/karpathy/status/1937902205765607626)
4. Caylent. "Agentic AI: Why Prompt Engineering Delivers Better ROI Than Orchestration." June 2025. [https://caylent.com/blog/agentic-ai-why-prompt-engineering-delivers-better-roi-than-orchestration](https://caylent.com/blog/agentic-ai-why-prompt-engineering-delivers-better-roi-than-orchestration)
5. Lakera. "The Ultimate Guide to Prompt Engineering in 2026." [https://www.lakera.ai/blog/prompt-engineering-guide](https://www.lakera.ai/blog/prompt-engineering-guide)
6. Comet. "Prompt Engineering for Agentic AI Systems: An Introduction." January 2026. [https://www.comet.com/site/blog/prompt-engineering/](https://www.comet.com/site/blog/prompt-engineering/)
7. SurePrompts. "Every Prompt Engineering Technique Explained: The Research-Backed Guide (2026)." [https://sureprompts.com/blog/advanced-prompt-engineering-techniques](https://sureprompts.com/blog/advanced-prompt-engineering-techniques)
