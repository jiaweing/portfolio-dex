---
title: "The rise of agents"
date: "2026-01-20"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Everyone is talking about how smart the models are getting. But intelligence was never the bottleneck.
If you have been following the AI space, you have probably noticed the conversation shifting. We have moved past "can LLMs write code?" and "can they pass the bar exam?" into something more interesting: what happens when you give these models the ability to *act*?
That is the story of agents, and it is reshaping how we think about AI entirely.
## The chat era had a ceiling
For a few years, the dominant interaction pattern with AI was the chatbot. You type a prompt, you get a response. Maybe you refine the prompt, try again, copy-paste the output somewhere useful. It worked, but it hit a wall pretty quickly.
The wall was not intelligence. Models kept getting smarter, context windows kept growing, reasoning kept improving. Yet the output quality still depended almost entirely on two things: the person crafting the prompt, and what the model could actually *do* with its answer.
A brilliant model trapped in a text box is still just a text box.
## Agents break through the ceiling
An AI agent is fundamentally different from a chatbot. Where a chatbot responds, an agent *acts*. It can break a goal into steps, decide which tools to use, call APIs, read documents, write to databases, and loop back to check its own work.
The shift from chatbot to agent is not just a product upgrade. It is an architectural change in how AI systems work. As LangChain's 2026 State of Agent Engineering report found, 57% of surveyed organizations now have agents running in production. The question is no longer *whether* to build agents, but how to deploy them reliably and at scale.
This matters because the real leverage in AI was never raw intelligence. It was always about **context** and **capabilities**, what the model knows about your situation, and what actions it can take on your behalf.
## Why intelligence alone is not enough
Here is the uncomfortable truth that gets lost in benchmark hype: no matter how good the base model gets, the quality of the output still comes down to two things.
**The person behind it.** Someone has to define the goal, set the constraints, and decide what "good" looks like. An agent building a report needs to know *which* report, *for whom*, and *why it matters*. That judgment is irreplaceably human.
**The tools the model has access to.** A model that can reason brilliantly but cannot read your database, check your calendar, or send an email is limited to giving advice. An agent with the right integrations can actually *execute*. The difference is enormous.
This is why two teams using the exact same model can get wildly different results. One team gives their agent access to their codebase, their project tracker, and their documentation. The other team gives it a chat window. The model is identical. The outcomes are not even close.
## The anatomy of a useful agent
What makes an agent actually useful in practice? It comes down to a few key ingredients:
**Goal decomposition.** Good agents can take a high-level objective and break it into concrete steps. "Write a blog post about X" becomes: research the topic, outline the structure, draft each section, check facts, compile sources.
**Tool access.** This is the multiplier. An agent that can search the web, query a database, read files, and write to a page is orders of magnitude more capable than one that can only generate text. Gartner predicts that 40% of enterprise applications will embed task-specific AI agents by 2026 for exactly this reason.
**Human-in-the-loop design.** The best agents are not fully autonomous. They know when to ask for input, when to pause for approval, and when to flag uncertainty. Microsoft's Vasu Jakkal put it well: agents in 2026 are "acting more like teammates than tools." Good teammates check in.
**Observability.** You need to see what the agent is doing and why. According to LangChain's survey, 89% of organizations with agents in production have implemented observability. You cannot trust what you cannot inspect.
## The multi-agent future
The next wave is not just single agents doing tasks. It is multiple agents collaborating, each specialized for a different domain, handing off work to each other.
Think of it like a team. You would not ask one person to handle sales, engineering, design, and legal. You would assemble specialists. The same logic applies to agents. A research agent gathers information. A writing agent drafts content. A review agent checks quality. An orchestrator coordinates the whole thing.
This is already happening. Platforms like LangGraph, CrewAI, and others are building frameworks specifically for multi-agent orchestration. Enterprises are moving from "one agent per task" to "agent teams per workflow."
## The real risk is not AI taking over
The discourse around agents tends to swing between utopian ("agents will do everything!") and dystopian ("agents will replace everyone!"). The reality is more nuanced and, frankly, more interesting.
The real risk is not that agents become too autonomous. It is that organizations deploy them without thinking carefully about:
- **Security.** Every agent needs identity management, access controls, and data boundaries. As Microsoft's security team warns, you need to ensure "agents don't turn into double agents carrying unchecked risk."
- **Quality.** LangChain's survey found that 32% of organizations cite quality as the top barrier to production deployment. A fast agent that produces unreliable output is worse than no agent at all.
- **Accountability.** When an agent takes an action, who is responsible for the outcome? This is not just a philosophical question. It is a practical one that affects how you design workflows.
## What this means for how we work
The rise of agents does not diminish the importance of human skill. If anything, it amplifies it.
The people who will get the most value from agents are those who can clearly articulate what they want, set up the right tools and integrations, define good guardrails, and evaluate whether the output meets the bar. That is a skill set, a new kind of literacy that combines domain expertise with an understanding of what AI can and cannot do.
We are moving from an era where "prompting" was the key skill to one where **designing systems** is. The prompt is just one input. The real craft is in choosing the right tools, defining the right boundaries, and knowing when to let the agent run versus when to step in.
## Looking ahead
Agents are not a trend. They are an infrastructure shift. The trajectory is clear:
- More tools and integrations will become available to agents
- Multi-agent systems will become the default for complex workflows
- Human-in-the-loop patterns will mature and standardize
- Observability and evaluation will become non-negotiable
- The gap between "AI-assisted" and "AI-native" organizations will widen
The models will keep getting smarter. But the teams that win will not be the ones with the smartest model. They will be the ones who build the best systems around the model, with the right tools, the right guardrails, and the right human judgment in the loop.
Intelligence is table stakes. What you *do* with it is the real game.
## References
1. [State of Agent Engineering 2026](https://www.langchain.com/state-of-agent-engineering), LangChain, surveying 1,300+ professionals on agent adoption and challenges
2. [AI Agents in 2025: Expectations vs. Reality](https://www.ibm.com/think/insights/ai-agents-2025-expectations-vs-reality), IBM
3. [What's Next in AI: 7 Trends to Watch in 2026](https://news.microsoft.com/source/features/ai/whats-next-in-ai-7-trends-to-watch-in-2026/), Microsoft, featuring insights from Vasu Jakkal on agent security
4. [Agentic AI Takes Over: 11 Shocking 2026 Predictions](https://www.forbes.com/sites/markminevich/2025/12/31/agentic-ai-takes-over-11-shocking-2026-predictions/), Forbes, citing Gartner's prediction on enterprise agent adoption
5. [AI Agents Arrived in 2025: Here's What Happened](https://theconversation.com/ai-agents-arrived-in-2025-heres-what-happened-and-the-challenges-ahead-in-2026-272325), The Conversation
6. [Autonomous Generative AI Agents: Under Development](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2025/autonomous-generative-ai-agents-still-under-development.html), Deloitte
7. [A Survey on Large Language Model Based Autonomous Agents](https://arxiv.org/pdf/2308.11432), arXiv
8. [AI Agents: What They Are and Their Business Impact](https://www.bcg.com/capabilities/artificial-intelligence/ai-agents), BCG
