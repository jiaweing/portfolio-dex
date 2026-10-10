---
title: "What is model steering?"
date: "2026-03-20T13:43:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

If you have ever asked an AI to do something and watched it confidently veer off in the wrong direction, you already understand the problem that model steering tries to solve. As AI models grow more capable, the challenge is no longer just *what* they can do, but *how* we guide them toward doing it well. Model steering is the set of techniques that give humans finer control over a model's behavior, without retraining it from scratch.
## The core idea
At a high level, model steering refers to any method that adjusts how a large language model (LLM) behaves at inference time, meaning while the model is actively generating output. Rather than changing the model's underlying weights through full retraining, steering techniques nudge the model toward desired behaviors and away from undesirable ones.
As IBM Fellow Kush Varshney puts it: "Alignment is the goal, and steering is how we do it." A car without a steering wheel can go in a straight line and that is about it. To be useful, an AI model should be steerable so that it can generate text in a desired style, attribute factual claims to a source, or avoid producing harmful outputs.
## Why steering matters
LLMs are trained on massive datasets and learn broad, general-purpose capabilities. But general-purpose does not always mean fit-for-purpose. A model that is great at writing poetry might also generate toxic content. One that excels at coding might hallucinate API endpoints that do not exist.
Traditional fine-tuning can address some of these issues, but it is expensive, slow, and requires curated datasets. Steering offers a more practical alternative: lightweight, targeted interventions that shape model behavior without the overhead of retraining. This makes advanced AI more adaptable and, critically, more accessible to teams that lack the resources for full-scale model training.
## Three layers of steering
Researchers at IBM categorize steering methods by where in the model pipeline they intervene. Understanding these layers helps clarify the landscape.
### Prompt-level steering
The most familiar form of steering is prompt engineering. System prompts, few-shot examples, and carefully structured instructions all shape a model's output before it starts generating. This is the cheapest and most accessible approach, but it has limits. Prompts can be ignored, misinterpreted, or overridden by strong patterns in the model's training data.
### Activation-level steering
A more precise technique involves manipulating the model's internal representations directly. Researchers at UC San Diego developed a "nonlinear feature learning" method that identifies and adjusts important features within an LLM's neural network. Think of it like understanding individual ingredients in a recipe rather than just tasting the final dish.
By analyzing a model's internal activations across different layers, researchers can pinpoint which features are responsible for specific concepts, such as toxicity, factual accuracy, or language style. Once identified, these features can be amplified or suppressed. This approach has shown success in detecting and reducing hallucinations, mitigating harmful outputs, and even steering models to better handle poetic or archaic language.
### Decoding-level steering
The third layer targets the decoding step, where the model selects its next token. Techniques like constrained decoding, temperature adjustments, and classifier-guided generation modify the probability distribution over candidate tokens to favor certain outputs. This sits between prompting and activation steering in terms of both cost and precision.
IBM's AI Steerability toolkit brings all three approaches together, letting practitioners compare methods side by side for the same desired behavior. As Varshney notes, there is no universally best method. It always depends on the data, the desired behavior, and the underlying model.
## Steering agents, not just models
Steering takes on a new dimension with AI agents, systems that operate autonomously over extended tasks. When a model is generating a single response, a bad output is an inconvenience. When an agent is executing a multi-step workflow over minutes or hours, a wrong turn early on can cascade into wasted time and resources.
This is where the concept intersects with what many developers experience day-to-day. Steering documents like `AGENTS.md` files in codebases act as persistent instructions that guide AI coding agents toward project-specific conventions, architectural patterns, and workflows. These documents are essentially prompt-level steering, but applied at the system level to shape ongoing agent behavior rather than individual responses.
Amazon's Kiro IDE takes this further with a dedicated "Steering" feature that lets developers inject custom context, standards, and instructions into AI interactions. The idea is to create a persistent memory for the AI assistant that understands team conventions and best practices without repeating instructions every session.
## Mid-task steering in GPT-5.3 Codex
OpenAI's GPT-5.3 Codex, released in February 2026, introduced what may be the most practical implementation of agent steering to date: **mid-task steering**. Traditionally, working with an AI agent followed a rigid loop. You give instructions, wait for the result, evaluate, and start over if something is wrong. Mid-task steering breaks this pattern by letting users intervene and redirect the agent while it is still working.
As OpenAI describes it, GPT-5.3 Codex provides frequent updates so users stay informed of key decisions and progress. Instead of waiting for a final output, users can interact in real time, ask questions, discuss approaches, and steer toward a better solution. The model talks through what it is doing, responds to feedback, and keeps users in the loop from start to finish.
In practice, this means you can ask Codex to build a lead scoring model, watch it start weighting criteria, and say "actually, weight company size more heavily than job title" without restarting the task. The agent adjusts mid-flight and continues. This eliminates the costly restart cycle that plagued earlier agent workflows, where a single misunderstanding might require three or four full attempts to resolve.
Mid-task steering is enabled in the Codex app under Settings, in the "Follow-up behavior" section. It works across the web UI, CLI, and IDE extension.
## The bigger picture
Model steering is not a single technique. It is a growing family of methods that collectively make AI systems more controllable, predictable, and useful. From simple prompt engineering to deep activation manipulation to real-time agent redirection, the common thread is giving humans more agency over AI behavior without sacrificing the model's underlying capabilities.
As AI agents take on longer, more complex tasks, steering becomes less of a nice-to-have and more of a core requirement. The most capable model in the world is not very useful if you cannot point it in the right direction.
## References
1. OpenAI, "Introducing GPT-5.3-Codex," February 5, 2026. [openai.com/index/introducing-gpt-5-3-codex](http://openai.com/index/introducing-gpt-5-3-codex)
2. IBM Research, "In AI, alignment is the goal. Steerability is how you get there," September 26, 2025. [research.ibm.com/blog/map-measure-manage-gen-ai](http://research.ibm.com/blog/map-measure-manage-gen-ai)
3. UC San Diego, "Steering AI: New Technique Offers More Control Over Large Language Models," May 13, 2025. [today.ucsd.edu/story/steering-ai-new-technique-offers-more-control-over-large-language-models](http://today.ucsd.edu/story/steering-ai-new-technique-offers-more-control-over-large-language-models)
4. MarketBetter, "OpenAI Codex Mid-Turn Steering: The Killer Feature for GTM Teams," February 8, 2026. [marketbetter.ai/blog/codex-mid-turn-steering-gtm](http://marketbetter.ai/blog/codex-mid-turn-steering-gtm)
5. AWS Builder Center, "Mastering KIRO Steering: A Complete Guide to Context-Aware AI Development." [builder.aws.com](http://builder.aws.com)
6. Digital Fluency Guide, "What is steerable AI, why does it matter and how do you build it?" July 12, 2023. [digitalfluency.guide](http://digitalfluency.guide)
