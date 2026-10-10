---
title: "Stop building agents"
date: "2026-03-22"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Everyone wants to build agents right now. The pitch is irresistible: autonomous AI systems that reason, plan, use tools, and get things done without you lifting a finger. Investors love the word. Product teams love the framing. And developers love the challenge of wiring up multi-step loops with tool calls and memory.
But here's the thing: most of the time, you don't need an agent. A well-written prompt, a simple script, or a cron job will outperform an "agentic system" that costs ten times more in tokens and fails unpredictably. The agent hype is making people over-engineer simple problems, and the data backs this up.
I run 13 Notion agents myself. I'm not anti-agent. I'm anti-unnecessary agents.
## The agentwashing problem
There's a growing trend of companies slapping the word "agent" on what is really just a chain of API calls. A webhook that triggers a function that calls an LLM that writes to a database is not an agent. It's a pipeline. A perfectly good pipeline, but calling it an agent doesn't make it smarter, and it doesn't justify a 10x price increase.
Gartner placed AI agents at the "Peak of Inflated Expectations" on their 2025 Hype Cycle for Artificial Intelligence, and separately predicted that **over 40% of agentic AI projects will be canceled by the end of 2027** due to escalating costs, unclear business value, or inadequate risk controls. As Gartner analyst Anushree Verma put it, most agentic AI projects right now are "early stage experiments or proof of concepts that are mostly driven by hype and are often misapplied."
The label matters because it sets expectations. When you call something an agent, stakeholders expect autonomy, reasoning, and adaptability. When what you've built is a deterministic pipeline with an LLM call in the middle, you've created a gap between expectation and reality that will bite you later.
## The numbers don't lie
According to Deloitte's 2026 State of AI in the Enterprise report, 75% of companies plan to invest in agentic AI, but only **11% have agents actually running in production**. That's a massive gap between intention and execution.
A study from Cleanlab surveying 1,837 engineering and AI leaders found even starker results: only 95 respondents reported having AI agents live in production. And even within that small group, most teams were still early in capability, control, and transparency, struggling to understand when their agents were right, wrong, or uncertain.
McKinsey's 2025 State of AI survey tells a similar story. Nearly two-thirds of respondents said their organizations hadn't begun scaling AI across the enterprise. The interest is there (62% are at least experimenting with agents), but production readiness is another matter entirely.
## The cost math
An agent loop that retries five times costs five times what a single well-crafted prompt costs. That's the simple version. The real cost math is worse.
Agents consume tokens on every reasoning step, every tool call, every retry. A complex agent workflow might make dozens of LLM calls to complete a single task. If that task could have been handled by one carefully engineered prompt with structured output, you've just burned through your API budget for marginal (or zero) improvement in quality.
Token billing adds up fast. An agent that requires endless back-and-forth with a model can quietly rack up massive bills. If solving an issue with AI costs more than doing it manually, you've failed the business case.
The hidden costs go beyond tokens. Enterprise agentic AI platforms typically require \$50,000 to \$200,000 in professional services fees and three to six months of implementation time. That's before you've handled a single customer request.
## The reliability math
Each step in an agent workflow is a probability of failure. More steps means exponentially less reliability.
A large-scale study of AI agents in production, surveying 306 practitioners across 26 domains, found that **68% of production agents execute at most 10 steps before requiring human intervention**. Seventy percent rely on prompting off-the-shelf models rather than fine-tuning, and 74% depend primarily on human evaluation. Reliability was cited as the top development challenge.
Research on multi-agent systems paints an even grimmer picture. Studies analyzing 200+ real-world tasks across frameworks like MetaGPT and ChatDev found **failure rates of 60 to 66% per framework**. That's two out of every three tasks breaking down.
A recent paper from researchers studying AI agent reliability found that "recent capability gains have only yielded small improvements in reliability." Rising accuracy scores on benchmarks don't translate to dependable behavior in the real world. Agents still fail to behave consistently across runs, withstand perturbations, or have bounded error severity.
## When you actually need an agent
Agents shine in a specific set of conditions:
- **Open-ended tasks** where the steps aren't known in advance
- **Multi-step reasoning** that requires adapting based on intermediate results
- **Dynamic tool selection** where the agent must choose which tools to use and in what order
- **Ambiguous inputs** that require judgment calls, not just pattern matching
If your task has known inputs, known outputs, and a deterministic path between them, you don't need an agent. You need a function.
Here's a simple decision framework:
**Use an agent when:**
- The task requires exploring multiple possible approaches
- The steps depend on the results of previous steps in unpredictable ways
- The system needs to recover from errors by trying alternative strategies
- Human-like judgment is needed to navigate ambiguity
**Use a pipeline (or a single prompt) when:**
- The inputs and outputs are well-defined
- The steps are sequential and predictable
- Error handling can be hardcoded
- The task is repeated frequently with similar patterns
## The "one agent, one job" philosophy
If you must use agents, keep them narrow. The most successful production deployments aren't sprawling multi-agent orchestration systems. They're tightly scoped agents that do one thing well.
The production study data supports this: agents that work in practice tend to be simple and controllable. They execute a handful of steps, rely on straightforward prompting, and keep humans in the loop. The fantasy of fully autonomous agent swarms coordinating across your entire business is exactly that, a fantasy, at least for now.
Think of it like microservices. A single agent that handles invoice processing is testable, debuggable, and improvable. A constellation of agents that "collaboratively manage your entire finance department" is a reliability nightmare.
## What to do instead
Before reaching for an agent framework, try these approaches first:
1. **Write a better prompt.** Structured prompts with clear instructions, examples, and output formats can handle surprisingly complex tasks in a single LLM call.
2. **Build a pipeline.** Chain a few deterministic steps together with an LLM call where you need flexibility. This gives you the benefits of AI without the unpredictability of autonomous loops.
3. **Use a cron job.** If your "agent" runs on a schedule and does the same thing every time, it's a cron job. Call it what it is.
4. **Add an LLM to your existing tools.** You don't need an agent framework to call an API. Most programming languages can make HTTP requests to an LLM provider in a few lines of code.
5. **Scope ruthlessly.** If you do build an agent, give it one job, clear boundaries, and a human in the loop for anything outside its lane.
The best AI systems in production today aren't impressive because they're autonomous. They're impressive because they're reliable, cost-effective, and actually solve the problem they were built for. Sometimes that means an agent. Most of the time, it doesn't.
## References
1. Gartner, "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027," June 2025. [Link](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
2. Gartner, "Gartner Hype Cycle Identifies Top AI Innovations in 2025," August 2025. [Link](https://www.gartner.com/en/newsroom/press-releases/2025-08-05-gartner-hype-cycle-identifies-top-ai-innovations-in-2025)
3. Deloitte, "State of AI in the Enterprise," 2026, as cited in K. Rajan, "Only 11% of AI Agents Make It to Production," Medium, February 2026. [Link](https://medium.com/data-science-collective/only-11-of-ai-agents-make-it-to-production-dddde4c684d6)
4. Cleanlab, "AI Agents in Production 2025: Enterprise Trends and Best Practices." [Link](https://cleanlab.ai/ai-agents-in-production-2025/)
5. McKinsey & Company, "The State of AI: Global Survey 2025." [Link](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
6. S. Guha et al., "Measuring Agents in Production," arXiv, 2024. [Link](https://arxiv.org/html/2512.04123v1)
7. J. Cemri et al., "Towards a Science of AI Agent Reliability," arXiv, 2025. [Link](https://arxiv.org/abs/2602.16666)
8. Reddit, "What nobody tells you about the actual failure rates of multi-agent AI systems," r/n8n. [Link](https://www.reddit.com/r/n8n/comments/1lhmsm3/what_nobody_tells_you_about_the_actual_failure/)
