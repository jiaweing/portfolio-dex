---
title: "Make specialized agents"
date: "2026-05-02T23:32:00.000+08:00"
lastEdited: "2026-05-01T16:04:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","MCP","Models","Safety","Security","OpenAI","Google","Microsoft","Anthropic","DeepSeek"]
---

We're living through a cambrian explosion of AI agents. Every major framework, from OpenAI's Agents SDK to LangGraph to Google ADK, now makes it trivially easy to spin up a general-purpose agent that can browse the web, write code, manage files, and hold a conversation. The temptation is obvious: build one smart agent that does everything.
But if you've ever managed a team, you know that the person who "does a bit of everything" is rarely the one you trust with the critical stuff. The same principle applies to agents. Instead of building one all-knowing generalist, you should be building a team of specialists.
## Why generalists fall short
A general-purpose agent is impressive in demos. It can answer questions, call APIs, draft emails, and summarize documents. But in practice, it carries a few structural problems that get worse as your system grows.
**Cognitive overload.** The more tools you give a single agent, the harder it becomes for the model to reason about which tool to use and when. Context windows fill up with instructions for dozens of capabilities, and accuracy drops as a result.
**Impossible to secure.** A generalist agent needs access to everything: your database credentials, your email, your deployment pipeline, your CRM. That's an enormous attack surface. One prompt injection or misconfigured tool, and the blast radius is your entire stack.
**Hard to improve.** When a generalist agent fails at a task, it's difficult to diagnose why. Was it the prompt? The tool selection? The context? With everything tangled together, debugging becomes guesswork.
Multi-agent research backs this up. Single agents have clear limitations on complex tasks: they struggle to maintain context across diverse domains and are difficult to parallelize. Specialized agents solve this through focused expertise, parallel processing, and modularity.
## Think of agents like employees
The better mental model is to treat agents like employees. Each one has a role, a set of tools, a scope of access, and clear boundaries around what they can and cannot do.
A writing agent gets access to your CMS and style guide. A data agent gets read access to your analytics platform. A deployment agent gets permission to push to staging, but not production. Each agent is skilled at its job and has only the credentials it needs to do that job.
This maps directly to how modern agent frameworks handle tool access. Protocols like MCP (Model Context Protocol) let you define exactly which tools and data sources an agent can reach. You're not just assigning tasks, you're scoping exposure. If one agent is compromised or behaves unexpectedly, the damage is contained.
Isolation isn't a limitation. It's a feature.
## The mixture of experts analogy
This pattern has a well-known parallel inside the models themselves. The Mixture of Experts (MoE) architecture, used in models like Mixtral and DeepSeek, divides a single neural network into multiple specialized sub-networks called "experts." A gating mechanism routes each input to the most relevant experts, activating only a small subset of the total parameters at any given time.
The result is a model that is both massive in total capacity and efficient in execution, because it doesn't waste compute running the entire network for every token. Each expert becomes genuinely good at its niche through repeated exposure to similar inputs during training.
The lesson translates directly to agent systems. A collection of specialized agents, each trained or prompted to excel at a narrow domain, will outperform a single generalist agent that tries to cover everything. The key is the routing layer: something needs to decide which specialist handles each request.
## Use a generalist as the orchestrator
This is where the generalist still has a role, just not the role you might expect. Instead of doing the work, a general-purpose agent becomes the orchestration layer. It understands the user's intent, breaks it into sub-tasks, and delegates each sub-task to the right specialist.
This is sometimes called the "agents as tools" pattern. The orchestrator treats each specialized agent as a callable function. It manages context, handles handoffs, and assembles the final output. The specialists do the actual domain-specific reasoning and action.
Microsoft's agent orchestration patterns formalize several variations of this: sequential pipelines where agents process output in stages, concurrent patterns where specialists work in parallel, and handoff patterns where agents dynamically transfer control based on the task at hand.
The orchestrator doesn't need deep expertise in any domain. It needs to be good at understanding requests and routing them. That's a much simpler job, and one that generalist models are already good at.
## How many agents is too many?
The honest answer is: probably more than you think. A well-designed system could have anywhere from five to a hundred specialized agents, each handling a different slice of your workflow. That sounds extreme until you realize you probably already have that many human roles in your organization.
Consider a typical software company. You might have agents for:
- Triaging support tickets
- Drafting documentation
- Reviewing pull requests
- Monitoring production alerts
- Generating weekly reports
- Updating your CRM after sales calls
- Scheduling meetings based on team availability
Each of these is a distinct domain with distinct tools, distinct access patterns, and distinct quality criteria. Trying to stuff all of them into one agent is like hiring one person to do seven jobs. It technically works until it doesn't.
The beauty of specialized agents is that they're modular. If your documentation agent starts producing poor output, you fix that one agent. You swap its model, refine its prompt, or give it better tools. The rest of your system keeps running. Try doing that with a monolithic generalist.
## Getting started
You don't need to build a hundred agents on day one. Start with one high-value workflow where a generalist agent is underperforming or where security concerns make broad access uncomfortable.
1. **Identify the domain.** Pick a task with clear boundaries, like drafting blog posts, processing invoices, or triaging bugs.
2. **Scope the tools.** Give the agent only what it needs. If it's a writing agent, it gets your content management system and a web search tool. Nothing else.
3. **Define the interface.** Decide what inputs the agent accepts and what outputs it returns. This makes it easy to plug into an orchestrator later.
4. **Add an orchestrator when you need one.** Once you have two or three specialists, introduce a lightweight general agent that routes requests to the right one.
Over time, your "team" of agents grows the same way a real team does: one hire at a time, each with a clear role.
## The bottom line
General-purpose agents are a great starting point, but they're a poor endpoint. The future of practical AI isn't one agent that does everything. It's a coordinated team of specialists, each excellent at their job, connected by an orchestration layer that knows who to call.
The Mixture of Experts architecture proved that deploying focused experts inside a model beats scaling a single dense network. The same logic applies at the system level. Build small, focused agents. Isolate their access. Let them collaborate through well-defined interfaces.
It might feel excessive to have dozens of agents running different parts of your workflow. But when each one is reliable, secure, and easy to maintain, it's not excessive. It just makes sense.
## References
1. NVIDIA, "What Are Multi-Agent Systems?" [https://www.nvidia.com/en-us/glossary/multi-agent-systems/](https://www.nvidia.com/en-us/glossary/multi-agent-systems/)
2. Anthropic, "Building Effective Agents." [https://www.anthropic.com/research/building-effective-agents](https://www.anthropic.com/research/building-effective-agents)
3. Microsoft Learn, "AI Agent Orchestration Patterns." [https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns)
4. IBM, "What is Mixture of Experts?" [https://www.ibm.com/think/topics/mixture-of-experts](https://www.ibm.com/think/topics/mixture-of-experts)
5. NVIDIA, "What Is Mixture of Experts (MoE) and How It Works?" [https://www.nvidia.com/en-us/glossary/mixture-of-experts/](https://www.nvidia.com/en-us/glossary/mixture-of-experts/)
6. Enkrypt AI, "Top Business Benefits of Using Specialized Task AI Agents." [https://www.enkryptai.com/blog/what-are-specialized-task-ai-agents-benefits-features-use-cases-explained](https://www.enkryptai.com/blog/what-are-specialized-task-ai-agents-benefits-features-use-cases-explained)
7. Emergent Mind, "Specialized Agents in Multi-Agent Systems." [https://www.emergentmind.com/topics/specialized-agents](https://www.emergentmind.com/topics/specialized-agents)
8. Anthropic, "Donating the Model Context Protocol." [https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
9. Wang et al., "Mixture-of-Agents Enhances Large Language Model Capabilities." arXiv, 2024. [https://arxiv.org/html/2406.04692v1](https://arxiv.org/html/2406.04692v1)
10. Langfuse, "Comparing Open-Source AI Agent Frameworks." [https://langfuse.com/blog/2025-03-19-ai-agent-comparison](https://langfuse.com/blog/2025-03-19-ai-agent-comparison)
