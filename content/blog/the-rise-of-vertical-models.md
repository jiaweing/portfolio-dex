---
title: "The rise of vertical models"
date: "2026-03-30T02:06:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

For years, the AI playbook was simple: take a foundation model, wrap it in a product, ship it. That era is ending. The most ambitious vertical AI companies are no longer content to rent intelligence from OpenAI or Anthropic. They're building their own models, trained specifically for their domain, and in many cases outperforming the frontier labs on the tasks that actually matter.
This isn't a marginal shift. It's a structural change in how AI companies create value and defend their positions.
## The wrapper problem
The first wave of vertical AI startups followed a predictable pattern. Take GPT-4 or Claude, add a system prompt and some domain context, build a nice UI, and call it a product. It worked for a while. But the defensibility problem was obvious from day one: if your product is a layer on top of someone else's model, what stops that someone from absorbing your use case into their next release?
This is exactly what happened. As foundation models got better at coding, legal reasoning, and customer support out of the box, the gap between a generic model and a "specialized" wrapper shrank. Companies that had raised hundreds of millions found themselves competing with a ChatGPT feature update.
The companies that saw this coming started investing in something much harder: building their own models.
## Cursor and the coding vertical
Cursor is perhaps the clearest example of this shift. The AI coding assistant started by integrating third-party models, but in late 2025, it released Composer, its first in-house model built specifically for agentic coding.
Composer is a mixture-of-experts language model trained through reinforcement learning in real development environments. Rather than learning to generate code in isolation, the model was trained with access to actual development tools, including codebase-wide semantic search, file editors, and terminal commands. The result is a model that doesn't just write code but navigates large projects, tracks dependencies, and reasons about changes across multiple files.
The performance numbers are striking. Composer completes most tasks in under 30 seconds at roughly 250 tokens per second, making it approximately 4x faster than models with comparable intelligence. By March 2026, Cursor released Composer 2, which the company describes as "frontier-level at coding" while being priced at \$0.50 per million input tokens and \$2.50 per million output tokens.
What makes Cursor's approach significant is that it scaled reinforcement learning aggressively. Composer 1.5, released in February 2026, used 20x more compute in post-training than the original Composer, with the post-training compute even surpassing the amount used to pretrain the base model. This is a company that has decided its core competitive advantage is model quality, not just product design.
Cursor's parent company Anysphere is now valued at \$29.3 billion with \$1 billion in annual recurring revenue. That's not wrapper economics.
## Intercom's Fin Apex
Intercom's trajectory tells a similar story from the customer service vertical. Fin, Intercom's AI agent, started by applying a sophisticated orchestration layer on top of commercial LLMs. The Fin AI Engine refined queries, optimized responses, and validated answer quality, essentially building a system that could balance high resolution rates with low hallucination rates.
But in March 2026, Intercom took the next step. It released Fin Apex 1.0, a purpose-built model trained by Intercom's AI Group specifically for customer service. According to Intercom, Apex outperforms GPT-5.4 and Claude Sonnet 4.6 on the metrics that matter most for support: resolution accuracy, speed, and cost.
This is a 15-year-old software company that decided to build its own model. Not because it wanted to compete with OpenAI on general intelligence, but because it realized that a small, domain-specific model could beat the best general-purpose models on its specific task. Fin already handles over two million customer conversations weekly, giving Intercom the data flywheel needed to keep improving.
Intercom CEO Des Traynor called it the beginning of "the age of vertical models," and the framing is deliberate. The company isn't just shipping a feature. It's making a structural claim about where AI value will accrue.
## Decagon and the specialization stack
Decagon, launched in 2023, has become a key player in automating customer support for companies like Duolingo, Eventbrite, Notion, and Substack. Its approach is instructive because it shows how vertical model building can work even without training a model entirely from scratch.
Decagon uses a combination of OpenAI's models, including GPT-3.5, GPT-4, GPT-4o, GPT-4 Turbo, and o1-mini, but layers on deep domain specialization. Its agents don't just generate responses. They follow natural-language Agent Operating Procedures (AOPs), execute multi-step workflows, connect to external systems, and learn from every conversation.
The insight here is that "building your own model" exists on a spectrum. At one end, you have Cursor training a model from scratch with reinforcement learning. At the other, you have Decagon orchestrating multiple models with domain-specific fine-tuning and workflow integration. Both are moving far beyond the wrapper approach, and both are creating defensibility through accumulated domain expertise and data.
## Harvey and the legal frontier
Harvey has become the defining example of vertical AI in legal services. Founded in 2022, the company has grown to an \$11 billion valuation by building AI tools used by over 100,000 legal professionals, processing more than 200,000 queries and 1.3 million files per day.
Harvey's model strategy is multi-model by design. Its system breaks down requests into sub-tasks, selects the best model for each, and synthesizes the outputs. It draws from Anthropic's Sonnet and Opus 4 suite, OpenAI's GPT-5 and o3, and Google's Gemini 2.5 Pro. But the real value isn't in any individual model. It's in Harvey's evaluation methodology, its domain-specific training data, and its BigLaw Bench, a proprietary benchmark for measuring legal AI performance.
The company has also shifted its strategic focus from individual lawyer productivity to firm-level profitability, building infrastructure for workflow management, secure data sharing, and matter management. This is vertical AI moving from tool to platform, a much harder position to displace.
## Abridge and clinical AI
In healthcare, Abridge has emerged as one of the leading vertical AI companies. Its platform transforms patient-clinician conversations into structured clinical notes in real time, and the numbers tell the story: 78% decrease in cognitive load, 90% of clinicians giving more undivided attention to patients, and 86% doing less after-hours documentation work.
Abridge built what it calls the Contextual Reasoning Engine, proprietary AI infrastructure powering clinical note generation at the point of care. The company has deployed across major health systems including Johns Hopkins, Kaiser Permanente, Duke Health, and Mayo Clinic, and is reportedly in talks to raise at a \$5 billion valuation.
What makes Abridge's position particularly defensible is its deep integration with Epic, the dominant electronic health records system. From Haiku to Hyperdrive, Abridge works inside the clinician's existing workflow. This isn't a standalone AI tool. It's infrastructure embedded in the healthcare stack, and that embedding creates switching costs that no foundation model can replicate.
## Why this is happening now
Several forces are converging to make vertical model building viable for companies that aren't frontier labs.
First, the cost of training has dropped dramatically. Open-source base models, cheaper compute, and better training infrastructure mean that a well-funded startup can fine-tune or post-train a model for a fraction of what it cost two years ago.
Second, data flywheels are maturing. Companies like Cursor, Intercom, and Abridge have accumulated millions of domain-specific interactions. That data is the raw material for training models that understand their domain better than any general-purpose system.
Third, foundation models are converging. As GPT-5, Claude, and Gemini approach similar capability levels on general benchmarks, the marginal value of switching between them decreases. The differentiation shifts to domain-specific performance, where vertical models have a structural advantage.
Fourth, customers are demanding hard ROI. Enterprise buyers have moved past the "let's experiment with AI" phase. They want measurable outcomes, and vertical models tuned for specific workflows deliver more predictable results than general-purpose alternatives.
## What this means for the AI landscape
The rise of vertical models has implications that go beyond individual companies.
For the foundation model labs, it's a signal that their moat may be narrower than expected. If Intercom can build a customer service model that beats GPT-5.4 on its own turf, and Cursor can build a coding model that outperforms frontier models at 4x the speed, then the assumption that bigger and more general always wins starts to break down. The labs will still matter enormously for research and for providing base models. But the value capture is shifting downstream.
For vertical AI startups, the message is clear: wrappers are a temporary strategy. The companies building real moats are investing in proprietary model capabilities, whether through full custom training, aggressive fine-tuning, or sophisticated multi-model orchestration. The bar for defensibility has risen.
For enterprises, this creates a more complex but ultimately better buying landscape. Instead of choosing between a general-purpose AI and a thin vertical wrapper, they can now choose from vertical AI companies that genuinely understand their domain at the model level, not just the prompt level.
## The bottom line
The AI industry is entering a phase where the most valuable models might not be the biggest or most general. They might be the ones that know one thing extraordinarily well. Cursor knows how developers navigate codebases. Intercom knows how customers ask for help. Harvey knows how lawyers reason about contracts. Abridge knows how clinicians document patient encounters.
These companies didn't just build better products on top of AI. They built better AI for their products. That distinction, between using AI and building AI, is becoming the dividing line between vertical companies that will endure and those that won't.
The age of vertical models isn't coming. It's already here.
## References
1. Cursor, "Introducing Composer 2," March 2026. [cursor.com/blog/composer-2](http://cursor.com/blog/composer-2)
2. Cursor, "Composer: Building a fast frontier model with RL," 2025. [cursor.com/blog/composer](http://cursor.com/blog/composer)
3. Cursor, "Introducing Composer 1.5," February 2026. [cursor.com/blog/composer-1-5](http://cursor.com/blog/composer-1-5)
4. Cursor, "Introducing Cursor 2.0 and Composer," 2025. [cursor.com/blog/2-0](http://cursor.com/blog/2-0)
5. Intercom, "Announcing Fin Apex: The age of vertical models is here," March 2026. [intercom.com/blog/announcing-fin-apex-the-age-of-vertical-models-is-here](http://intercom.com/blog/announcing-fin-apex-the-age-of-vertical-models-is-here)
6. VentureBeat, "Intercom's new post-trained Fin Apex 1.0 beats GPT-5.4 and Claude Sonnet 4.6 at customer service resolutions," March 2026. [venturebeat.com](http://venturebeat.com)
7. OpenAI, "Delivering high-performance customer support" (Decagon case study). [openai.com/index/decagon](http://openai.com/index/decagon)
8. Harvey AI, "What AI Models Does Harvey Use?" March 2026. [help.harvey.ai/articles/what-ai-models-does-harvey-use](http://help.harvey.ai/articles/what-ai-models-does-harvey-use)
9. Abridge, "Generative AI for Clinical Conversations." [abridge.com](http://abridge.com)
10. Bessemer Venture Partners, "Building Vertical AI: An early stage playbook for founders." [bvp.com/atlas/building-vertical-ai](http://bvp.com/atlas/building-vertical-ai)
11. GeekWire, "The rise of vertical AI agents, and the startups racing to build them," 2026. [geekwire.com](http://geekwire.com)
12. Future Processing, "AI predictions 2026: from general AI models to vertical LLMs and autonomous agents," March 2026. [future-processing.com/blog/ai-predictions-2026](http://future-processing.com/blog/ai-predictions-2026)
