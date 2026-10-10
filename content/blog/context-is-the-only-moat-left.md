---
title: "Context is the only moat left"
date: "2026-03-25"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Every few months, a new model drops and the benchmarks shift. GPT-5 edges out Claude. Claude edges back. Open-source models close the gap. The leaderboards reshuffle, and for a brief moment it feels like the whole game has changed.
But it hasn't. Not really.
The models are converging. The prompts are public. The frameworks are interchangeable. If your product's only advantage is "we use the best model," you're one API update away from irrelevance. The real question isn't which model you're running. It's what you're feeding it.
The only durable advantage left in AI products is context, the proprietary, structured knowledge about your specific domain, your users, and their workflows.
## Intelligence is table stakes
We've crossed a threshold where raw model intelligence is no longer a differentiator. The gap between frontier models is measured in percentage points on benchmarks that most users never notice in practice. A Deloitte survey found that worker access to AI rose 50% in 2025, yet only 20% of organizations reported actually growing revenue through AI. The gap between aspiration and outcome isn't being closed by model upgrades. It's being closed by the infrastructure *around* the model.
Open-source models like Llama and Mistral have made capable AI available to anyone with a GPU. Prompting techniques spread on Reddit within hours. Agentic frameworks are commoditizing fast, with analyst predictions for 2026 pointing to standardized agent tooling becoming the norm rather than the exception.
When everyone has access to the same intelligence, intelligence stops being the moat.
## What context actually means
Context isn't just "data." It's not a pile of documents dumped into a vector database. Context is the *structured, maintained, workflow-specific knowledge* that makes an AI system useful for a particular set of users in a particular domain.
It includes things like:
- What your users have built, written, and organized over time
- How they work, what they reference, and what patterns they follow
- The relationships between their projects, people, and priorities
- The institutional knowledge that lives in wikis, threads, and shared documents
This is the kind of knowledge that can't be replicated by a competitor spinning up a new model. It's accumulated through usage, refined through interaction, and deeply tied to the product experience.
## RAG, fine-tuning, and agent memory are all context injection
The technical landscape of AI customization, retrieval-augmented generation, fine-tuning, agent memory, context engineering, these are all different strategies for the same underlying goal: getting the right context into the model at the right time.
RAG pulls from external knowledge bases in real time, keeping responses grounded in current information. Fine-tuning bakes domain expertise into model weights, useful when the knowledge is stable and the task is well-defined. Agent memory accumulates context across interactions, building a persistent understanding of the user and their environment.
Each approach has trade-offs. RAG is flexible but depends on retrieval quality. Fine-tuning is powerful but expensive and slow to update. Agent memory is promising but still maturing.
The point is that none of these techniques matter much without *good context to inject*. The model is the engine, but context is the fuel. And the companies winning right now are the ones sitting on the richest fuel reserves.
## The products winning on context
Look at the AI products that have built real traction, not hype, but actual daily usage that users would struggle to replace.
**Cursor** succeeded not just because it integrated AI into a code editor, but because it sits inside the developer's actual codebase. It has access to file structures, dependencies, recent changes, and the patterns specific to that project. A generic coding assistant working from a blank prompt can't compete with one that knows your codebase intimately. As one analysis noted, Cursor's advantage comes from mastering the "unit of work" within the developer's own context, creating a data flywheel that generic tools can't replicate.
**Notion AI** works because it operates on top of a user's entire workspace, their documents, databases, meeting notes, and project structures. When you ask it a question, it draws from the accumulated context of how your team actually works. That's not something a standalone chatbot can replicate.
**Linear** has built its AI features on top of deeply structured project data, issue histories, team workflows, and sprint patterns. The AI understands not just what a ticket says, but where it fits in the broader engineering process.
These products share a common trait: they didn't just bolt AI onto a generic interface. They built AI into a surface that already captures irreplaceable user context.
## The context flywheel
This is where context becomes a compounding advantage. More usage generates more context. More context makes the AI more useful. More usefulness drives more usage. And the cycle accelerates.
This flywheel is nearly impossible to bootstrap from scratch. A new entrant can match your model, copy your UI, and replicate your prompts. But they can't copy the months or years of accumulated user data, workflows, and interaction patterns that make the system genuinely useful.
It's the same dynamic that made Google Search so hard to displace. The algorithm mattered, but the real moat was the billions of search queries that continuously refined the results. In AI products, the equivalent is the context layer that grows richer with every user interaction.
## Why generic AI wrappers fail
This explains the pattern we've seen play out repeatedly: AI wrapper startups that launch with impressive demos and then quietly fade.
The problem is straightforward. If you're calling the same API with the same model using similar prompts, you're producing the same outputs as everyone else. There's nothing proprietary in the stack. The moment a competitor offers the same thing at a lower price, or the model provider adds your feature natively, you're done.
"Just use the API" isn't a business strategy. It's a starting point. The business strategy is building the context layer on top of it, the data, the workflows, the user-specific knowledge that makes your implementation meaningfully different from anyone else calling the same endpoint.
## MCP and the expanding context surface
The emergence of the Model Context Protocol is significant here, not because it changes the model, but because it changes what the model can reach.
MCP, introduced by Anthropic as an open standard, provides a universal way for AI applications to connect to external data sources and tools. Think of it as USB-C for AI, a standardized interface that lets any compatible AI system access any MCP-enabled data source. Instead of building custom integrations for every tool, developers can expose their data through MCP servers and let AI clients connect seamlessly.
This matters for the context thesis because MCP dramatically expands the *context surface area* available to AI products. When your AI assistant can pull from your databases, file systems, APIs, and internal tools through a single protocol, the amount of relevant context it can access multiplies.
The products that benefit most from MCP are, again, the ones that already sit on rich context. MCP doesn't create context from nothing. It makes existing context more accessible, which further strengthens the position of products that have been accumulating user data and workflows all along.
## Building context moats quickly
One important nuance: context moats aren't exclusively the domain of startups with clever data strategies. Incumbents with existing user bases can build context moats remarkably fast.
If you already have millions of users generating data in your product every day, adding an AI layer that leverages that context is a natural extension. This is exactly what companies like Notion, Linear, and others have done. They didn't start as AI companies. They started as products that captured valuable user context, and then realized that context was the key ingredient for making AI genuinely useful.
For new entrants, this means the window for building context-first AI products is narrowing. The incumbents are waking up, and they have a head start on the one thing that matters most.
## The takeaway
The AI landscape will keep shifting. Models will improve. New architectures will emerge. But the fundamental dynamic won't change: intelligence is converging toward commodity, and the products that endure will be the ones built on proprietary context that deepens with every interaction.
If you're building an AI product, the most important question isn't "which model should we use?" It's "what context do we have that nobody else does, and how do we make it grow?"
Everything else is replaceable.
## References
1. Deloitte, "State of AI in the Enterprise" survey on enterprise AI adoption and revenue growth, [https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html)
2. Tobias Pfuetze, "The Model Commoditisation Trap," Medium, March 2026, [https://medium.com/@tobias_pfuetze/the-model-commoditisation-trap-2c137956d6b7](https://medium.com/@tobias_pfuetze/the-model-commoditisation-trap-2c137956d6b7)
3. InformationWeek, "2026 Enterprise AI Predictions: Fragmentation, Commodification, and the Agent Push Facing CIOs," January 2026, [https://www.informationweek.com/machine-learning-ai/2026-enterprise-ai-predictions-fragmentation-commodification-and-the-agent-push-facing-cios](https://www.informationweek.com/machine-learning-ai/2026-enterprise-ai-predictions-fragmentation-commodification-and-the-agent-push-facing-cios)
4. Mixflow, "AI Models Are Becoming a Commodity: Second-Order Effects Reshaping Industry," November 2025, [https://mixflow.ai/blog/ai-models-commoditization-second-order-effects-2026](https://mixflow.ai/blog/ai-models-commoditization-second-order-effects-2026)
5. The AI Frontier, "Cursor's Unfair UX Advantage," Substack, [https://frontierai.substack.com/p/cursors-unfair-ux-advantage](https://frontierai.substack.com/p/cursors-unfair-ux-advantage)
6. IBM, "RAG vs. Fine-tuning," [https://www.ibm.com/think/topics/rag-vs-fine-tuning](https://www.ibm.com/think/topics/rag-vs-fine-tuning)
7. Anthropic, "Introducing the Model Context Protocol," [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
8. Model Context Protocol official documentation, [https://modelcontextprotocol.io/docs/getting-started/intro](https://modelcontextprotocol.io/docs/getting-started/intro)
9. S&P Global Ratings, "Recalibrating the Competitive Moat: Assessing Durability in an AI-Infused Software Landscape," [https://www.spglobal.com/ratings/en/regulatory/article/recalibrating-the-competitive-moat-assessing-durability-in-an-ai-infused-software-landscape-s101669629](https://www.spglobal.com/ratings/en/regulatory/article/recalibrating-the-competitive-moat-assessing-durability-in-an-ai-infused-software-landscape-s101669629)
