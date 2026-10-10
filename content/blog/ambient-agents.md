---
title: "Ambient agents"
date: "2026-03-29"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Claude Code just shipped scheduled tasks. You define a prompt once, set a cron expression, and Claude runs it on autopilot: nightly code reviews, dependency audits, error log scans, all ticking away without a terminal open. It's a small feature on paper. But it signals something much bigger about where AI agents are headed.
We're watching agents graduate from chat-on-demand to always-on background processes. The industry has started calling these **ambient agents**, and the shift changes how we think about building with AI, working alongside it, and trusting it.
## What ambient agents actually are
The term was popularized by Harrison Chase and the LangChain team in early 2025. Their definition is clean: ambient agents listen to event streams and act on them accordingly, potentially handling multiple events at a time. They are not triggered by a human typing a message. They respond to signals from the environment, things like incoming emails, new database entries, schedule ticks, webhook events.
This is a departure from the chatbot paradigm that dominates most AI tooling today. Chat-based agents require you to open an interface, write a prompt, and wait. Ambient agents flip the model. They watch, decide, and act. They surface to you only when they need input or want to flag something important.
LangChain identified three human-in-the-loop patterns that ambient agents typically use: **notify** (flag something for your attention), **question** (ask for clarification before acting), and **review** (draft an action and wait for approval). The best ambient agents know which pattern to use and when.
## The automation layer cake
Not all agents are created equal, and thinking about them as a stack helps clarify where the industry sits today.
**Layer 1: Chat agents.** This is the baseline. You open a window, type a prompt, get a response. ChatGPT, Claude in the browser, Notion AI in a sidebar conversation. Useful, but entirely human-initiated. Every interaction costs you a context switch.
**Layer 2: Triggered agents.** These respond to events. A new page appears in a database, and an agent drafts content. A message lands in Slack, and an agent triages it. Notion's own agent triggers work this way. The human sets up the trigger once, and the agent handles recurring work from there.
**Layer 3: Scheduled agents.** This is what Claude Code's scheduled tasks unlock. Agents that run on a cron, not waiting for an event but proactively checking on things at intervals. A nightly build health check. A weekly summary of open pull requests. The agent operates on its own clock.
**Layer 4: Fully autonomous agents.** The theoretical ceiling. Agents that set their own sub-goals, coordinate with other agents, learn from feedback over time, and operate with minimal human oversight. We're not here yet, and being honest about that gap matters.
Most production systems today sit somewhere between layers 2 and 3. The jump from layer 3 to layer 4 is the hardest, and the one most prone to hype. Scheduled tasks are not autonomy. They're automation with a timer. That's valuable, but it's important to call it what it is.
## One agent, one job
There's a temptation, once you have agents running in the background, to make them do everything. Resist it.
The most reliable agent architectures follow a principle that's familiar from microservices: each agent should have a single, well-defined responsibility. A blog drafting agent drafts blog posts. A triage agent triages incoming requests. A code review agent reviews code.
This isn't just an organizational preference. It's a practical constraint. Agents with narrow scope are easier to prompt, easier to debug, and easier to trust. When an agent has a clear job, you can evaluate whether it's doing that job well. When an agent tries to be a general-purpose assistant running 24/7, failures become harder to trace and harder to fix.
Snowplow's Alex Dean, writing about ambient agent principles, calls this **agent specialization**: individual agents with clear purposes and legible boundaries are much easier to build and operate than monolithic ones, especially given the non-deterministic nature of LLMs.
## The security surface gets wider
An agent you chat with occasionally is one thing. An agent that runs continuously with broad permissions is something else entirely.
Always-on agents introduce a larger attack surface. They hold persistent API keys and OAuth tokens. They have standing access to databases, file systems, and third-party services. If compromised, the blast radius is bigger than a one-off chat session because the agent's permissions don't expire when a conversation ends.
Security researchers have flagged several specific risks with autonomous agents: prompt injection (manipulating an agent into performing unauthorized actions), privilege escalation (agents requesting additional permissions to overcome obstacles), and the "confused deputy" problem (attackers crafting inputs that trick an agent into misusing its legitimate access).
The practical takeaway is that ambient agents need the same security discipline we apply to production services. That means least-privilege permissions, scoped API keys, regular access reviews, and audit logs for every action the agent takes. Most agent frameworks don't enforce this by default. It's on you to build the guardrails.
## What actually breaks in practice
Running a fleet of background agents teaches you things that the documentation doesn't cover.
**Context drift.** Agents that run on schedules can gradually lose alignment with what you actually need. The prompt that made sense three weeks ago might not reflect how your workflow has evolved. Periodic review of agent instructions isn't optional, it's maintenance.
**Silent failures.** A chat agent fails visibly: you see a bad response and correct it. A background agent can fail silently for days. Maybe it's writing summaries that miss key details, or triaging messages into the wrong category. Without monitoring, you won't know until the damage compounds.
**Human checkpoint design.** The hardest design question isn't "what should the agent do?" It's "when should the agent stop and ask?" Too many checkpoints and you've just built a notification system with extra steps. Too few and you're trusting an LLM to make judgment calls it shouldn't. LangChain's notify/question/review framework is a good starting mental model, but the right balance is specific to each workflow.
**Coordination overhead.** Once you have multiple agents, they start stepping on each other. Two agents might act on the same event. One agent's output might conflict with another's. Managing this requires thinking about event ownership, deduplication, and clear boundaries between agent responsibilities.
## When ambient agents start talking to each other
The next frontier isn't just agents running in the background. It's agents coordinating with each other.
Google's Agent2Agent protocol, released in 2025, is an early attempt at standardizing how agents from different vendors discover each other and collaborate. The vision is compelling: your scheduling agent negotiates with a vendor's delivery agent to find a time slot, your code review agent flags an issue and hands it to your deployment agent to roll back, all without human mediation.
We're in the early innings of this. Most multi-agent systems today are orchestrated top-down, with a central controller assigning tasks. The more ambitious pattern is bottom-up, with agents communicating through shared event streams, discovering relevant signals, and composing solutions together.
Snowplow's framework describes this as **asynchronous communication via event streams**, replacing brittle point-to-point integrations with loosely coupled message passing. It's the same architectural pattern that made microservices scalable, now applied to agents. The benefits are similar: better fault tolerance, easier scaling, and the possibility of emergent behavior where agents collaborate in ways you didn't explicitly program.
But emergent behavior in autonomous systems is also the thing that makes security teams nervous, and rightfully so. The more agents can do without asking, the more carefully you need to define what they're allowed to do.
## Where this is actually going
The honest assessment: we're early. Scheduled tasks and event-driven triggers are real, production-ready capabilities. True agent autonomy, where agents set their own goals, learn from outcomes, and coordinate without human design, is still largely theoretical.
The gap between "runs on a cron" and "operates autonomously" is enormous. Bridging it requires advances in long-term memory, reliable reasoning under uncertainty, and trust frameworks that let humans gradually expand an agent's scope as it proves itself.
What's worth paying attention to right now isn't the autonomy ceiling. It's the practical floor. The combination of triggers, schedules, and well-scoped agent responsibilities is already enough to automate a meaningful chunk of knowledge work. The layer cake doesn't need to be complete for the bottom layers to be useful.
The agents that will matter most in the near term aren't the ones that do everything. They're the ones that do one thing reliably, in the background, without being asked.
## References
1. LangChain, "Introducing ambient agents," LangChain Blog, January 14, 2025. [https://blog.langchain.com/introducing-ambient-agents/](https://blog.langchain.com/introducing-ambient-agents/)
2. Alex Dean, "The Seven Principles of Ambient Agents," Snowplow Blog, May 14, 2025. [https://snowplow.io/blog/seven-principles-of-ambient-agents](https://snowplow.io/blog/seven-principles-of-ambient-agents)
3. Anthropic, "Run prompts on a schedule," Claude Code Documentation. [https://code.claude.com/docs/en/scheduled-tasks](https://code.claude.com/docs/en/scheduled-tasks)
4. Pinar Patton, "Ambient Agents: When Events, Not Prompts, Are the Trigger," Medium, September 20, 2025. [https://medium.com/@pinarpatton/ambient-agents-when-events-not-prompts-are-the-trigger-183813315cb6](https://medium.com/@pinarpatton/ambient-agents-when-events-not-prompts-are-the-trigger-183813315cb6)
5. McKinsey & Company, "Deploying agentic AI with safety and security: A playbook for technology leaders," October 16, 2025. [https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/deploying-agentic-ai-with-safety-and-security-a-playbook-for-technology-leaders](https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/deploying-agentic-ai-with-safety-and-security-a-playbook-for-technology-leaders)
6. RSA Conference, "The 'Root Permissions' Problem: Why Agentic AI Poses Unique Data Security Risks." [https://www.rsaconference.com/library/blog/the-root-permissions-problem-why-agentic-ai-poses-unique-data-security-risks](https://www.rsaconference.com/library/blog/the-root-permissions-problem-why-agentic-ai-poses-unique-data-security-risks)
7. Moveworks, "What Is an Ambient Agent? The Future of Enterprise AI." [https://www.moveworks.com/us/en/resources/blog/what-is-an-ambient-agent](https://www.moveworks.com/us/en/resources/blog/what-is-an-ambient-agent)
8. Temporal, "Orchestrating ambient agents with Temporal." [https://temporal.io/blog/orchestrating-ambient-agents-with-temporal](https://temporal.io/blog/orchestrating-ambient-agents-with-temporal)
