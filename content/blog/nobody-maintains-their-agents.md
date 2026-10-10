---
title: "Nobody maintains their agents"
date: "2026-03-14"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

There are hundreds of "I built an AI agent" posts on the internet. Conference talks, Twitter threads, YouTube tutorials, launch day blog posts. The energy is electric. Everyone is shipping agents.
Now try searching for "I maintained an AI agent for six months."
You'll find almost nothing.
That silence tells you everything. The excitement is in the building. The pain is in what comes after. And nobody wants to talk about the after, because the after is boring, frustrating, and deeply unglamorous.
I've been running 8+ Notion agents for months now. They handle everything from blog drafting to task filing to recurring reports. I like building them. But the thing I spend the most time on isn't building, it's maintaining. And that maintenance is the real cost of agents that nobody warns you about.
## The excitement gap
The agent ecosystem right now feels like the early days of microservices. Everyone is fascinated by the architecture, the patterns, the possibilities. Very few people are talking about what happens when you're paged at 2am because something silently broke three days ago and nobody noticed.
Gartner predicts that 40% of enterprise applications will embed task-specific AI agents by 2026. The industry is scaling up fast. But the operational maturity to support that scale? It's lagging behind, badly. A McKinsey survey found that while organizations are hiring aggressively for AI roles, few have invested meaningfully in the MLOps and maintenance infrastructure needed to keep these systems running well.
The gap between "demo" and "production" is real, and it's widening.
## Agents don't crash, they drift
Here's the thing that makes agent maintenance fundamentally different from traditional software maintenance: agents don't throw errors when they break. They just start doing the wrong thing, slightly.
Traditional software fails loudly. You get a 500 error, a stack trace, a crash log. You know something broke, and you usually know where. Agents fail quietly. The output looks plausible. The format is correct. The tone is right. But the substance has drifted. The wrong category got assigned. The summary missed the key point. The research cited an outdated source.
This is what researchers call "agent drift," and it manifests in three distinct ways. Goal drift is when the agent stops solving the right problem entirely, even though the tools still work and the output still compiles. Reasoning drift is when the logic degrades over time, producing increasingly shallow or circular analysis. Context drift is when accumulated noise in the agent's working memory pushes it away from the original intent.
One analysis of agent failures on SWE-bench Pro found that 35.9% of failures were syntactically valid patches that completely missed the actual bug. The agent had the capability. It had lost the target.
I've seen this firsthand. One of my agents started generating slugs with trailing hyphens. Another began categorizing every post as "Tech" regardless of content. A third quietly stopped including references in its output. None of these threw an error. I only noticed because I happened to look at the output closely one day.
## The five maintenance taxes
After months of running agents in production, I've identified five recurring maintenance costs that nobody warns you about.
### 1. Prompt rot
The prompts that worked perfectly three months ago may not work today. Upstream model updates change how instructions are interpreted. A prompt that once produced crisp, structured output might start generating verbose, meandering responses after a model version change. LinkedIn engineer Saikat Chakraborty describes this as "prompt entropy," the natural decay of prompt effectiveness over time that requires active monitoring and rebalancing.
### 2. Context window surprises
Long-running agents accumulate context clutter. As conversation histories grow, as reference documents change, as the data an agent operates on shifts in structure or volume, the effective context changes in ways you didn't anticipate. I've had agents that worked flawlessly for weeks suddenly produce garbage because a database they reference grew past a certain size.
### 3. Tool schema changes
Agents that call APIs or interact with external services are vulnerable to schema drift. An API endpoint changes its response format. A database adds a new required field. A third-party service deprecates a parameter. Production data shows that tool calling fails between 3% and 15% of the time in well-engineered systems, and those failure rates spike whenever upstream dependencies change.
### 4. The nondeterminism tax
Run the exact same prompt twice. Get different results. This is the fundamental debugging nightmare of agent maintenance. Traditional debugging assumes reproducibility, that if you can reproduce the bug, you can fix it. With agents, "ghost debugging" is the norm, where the system changes its behavior every time you look at it. You can't step through an agent's reasoning the way you step through code.
### 5. Evaluation debt
Most agent builders don't have evals. No automated quality checks, no regression tests, no performance baselines. You only find out your agent broke when a human notices bad output. And by then, the agent might have been producing bad output for days or weeks. Research from Galileo found that elite teams achieve 2.2x better reliability than non-elite teams, and the key differentiator is evaluation coverage. Yet only 15% of AI teams achieve what researchers consider "elite" evaluation coverage, a 57-point gap between believing testing matters and actually doing it.
## The "set and forget" myth
There's a seductive narrative around agents: build it once, let it run forever. The whole pitch is autonomy. But autonomy without oversight isn't intelligence, it's neglect.
Every agent I run needs regular attention. Some need prompt rewrites after model updates. Some need their instructions tightened after I notice quality drift. Some need to be retired entirely because the use case changed or the agent's approach no longer fits. The ones that work best are the ones I actively tend, like a garden, not a machine.
This is hard for people to accept because it undermines the promise. If I still need to check on my agents regularly, what exactly am I automating? The answer is: you're automating the execution, not the judgment. The agent does the work. You maintain the standards.
## One agent, one job
The single most effective maintenance strategy I've found is keeping agents narrow. One agent, one job. No Swiss-army-knife agents that handle five different workflows.
Narrow agents are easier to monitor because you know exactly what good output looks like. They're easier to debug because there are fewer variables. They're easier to rewrite because the scope is small. And they're easier to retire because replacing a single-purpose agent doesn't cascade into breaking five other workflows.
The temptation is always to add "just one more thing" to an existing agent. Resist it. Every additional responsibility makes the agent harder to maintain and harder to evaluate. The maintenance cost of agents doesn't scale linearly with capability, it scales exponentially.
## Why nobody talks about this
Maintenance doesn't demo well. You can't put "I rewrote my agent's prompt for the third time this month because the model update changed how it interprets numbered lists" in a tweet and expect engagement. There's no launch day for "my agent still works correctly."
The incentive structure of the current AI discourse rewards novelty. New frameworks, new capabilities, new architectures. The people doing the hard, unglamorous work of keeping agents running reliably in production aren't writing blog posts about it, because what would they even say? "Today I tweaked a prompt and ran 50 test cases to make sure my agent still categorizes emails correctly." That's not content. That's just work.
But it's the work that matters. The gap between a demo agent and a production agent isn't the initial build. It's the six months of maintenance that follow. And until we start treating agent maintenance as a first-class engineering discipline, with its own tools, practices, and respect, we'll keep building agents that work great on day one and quietly degrade from day two onward.
The real agent tax isn't compute costs or API fees. It's the ongoing human attention required to keep these systems honest. And that tax is due every single week, whether you feel like paying it or not.
## References
1. "AI agents arrived in 2025, here's what happened and the challenges ahead in 2026," The Conversation, 2025. [https://theconversation.com/ai-agents-arrived-in-2025-heres-what-happened-and-the-challenges-ahead-in-2026-272325](https://theconversation.com/ai-agents-arrived-in-2025-heres-what-happened-and-the-challenges-ahead-in-2026-272325)
2. Michael Hannecke, "Why AI Agents Fail in Production: What I've Learned the Hard Way," Medium, 2025. [https://medium.com/@michael.hannecke/why-ai-agents-fail-in-production-what-ive-learned-the-hard-way-05f5df98cbe5](https://medium.com/@michael.hannecke/why-ai-agents-fail-in-production-what-ive-learned-the-hard-way-05f5df98cbe5)
3. Prassanna Ravishankar, "Agent Drift: How Autonomous AI Agents Lose the Plot," [prassanna.io](http://prassanna.io), 2025. [https://prassanna.io/blog/agent-drift/](https://prassanna.io/blog/agent-drift/)
4. Saikat Chakraborty, "Prompt Drift: The Silent Killer of Production AI Systems," LinkedIn, 2025. [https://www.linkedin.com/pulse/prompt-drift-silent-killer-production-ai-systems-saikat-chakraborty-4ir5f](https://www.linkedin.com/pulse/prompt-drift-silent-killer-production-ai-systems-saikat-chakraborty-4ir5f)
5. "The Complete Enterprise Guide to AI Agent Observability," Galileo, 2025. [https://galileo.ai/blog/ai-agent-observability](https://galileo.ai/blog/ai-agent-observability)
6. "The State of AI 2025: Agents, Innovation, and Transformation," McKinsey & Company, 2025. [https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
7. "Agentic AI Takes Over, 11 Shocking 2026 Predictions," Forbes, December 2025. [https://www.forbes.com/sites/markminevich/2025/12/31/agentic-ai-takes-over-11-shocking-2026-predictions/](https://www.forbes.com/sites/markminevich/2025/12/31/agentic-ai-takes-over-11-shocking-2026-predictions/)
8. "AI Agent Observability: What to Monitor When Your Agent Goes Live," Chanl, March 2026. [https://chanl.ai/blog/ai-agent-observability-what-to-monitor-production](https://chanl.ai/blog/ai-agent-observability-what-to-monitor-production)
9. "AI Agent Monitoring and Observability: Keeping Production Systems Reliable," AI Agents Plus, March 2026. [https://www.ai-agentsplus.com/blog/ai-agent-monitoring-observability-2026](https://www.ai-agentsplus.com/blog/ai-agent-monitoring-observability-2026)
