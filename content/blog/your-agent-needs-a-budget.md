---
title: "Your agent needs a budget"
date: "2026-05-03"
lastEdited: "2026-05-02T05:52:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","OpenAI","Anthropic","Safety"]
---

If you're building with AI agents, here's the question that matters more than which model you pick or how clever your prompts are: what happens when something goes wrong at 3am and nobody's watching?
The answer, for most teams today, is nothing. The agent keeps running. The API meter keeps spinning. And by morning, you're staring at a bill that makes your stomach drop. The scariest risk in AI isn't sentience, it's a loop that burns \$400 in API calls before anyone notices.
Every serious agent deployment needs a budget. Not a dashboard you check on Monday mornings. Not a soft warning that gets lost in a Slack channel. A hard limit, a kill switch, a line in the sand that says "this far and no further."
## The runaway loop problem
Runaway agent costs aren't a theoretical concern. They're happening right now, across teams of every size.
On Reddit's r/n8n community, agency owners describe a recurring nightmare: an AI agent getting stuck in a logic loop and burning through a client's entire API budget overnight. One user described it as giving every engineer an uncapped corporate card and hoping for the best. Another on r/AI_Agents built an open-source tool specifically to catch agent loops before they drain budgets, complete with cost estimation and root cause analysis, because the problem was hitting people daily.
A developer who gave an AI agent \$100 and told it to make money found that API costs killed the experiment before the agent could produce anything of value. The unit economics simply didn't work without constraints. Meanwhile, a LinkedIn post from an infrastructure engineer laid out the math plainly: a single AI agent hitting an API can burn over \$300 per day, roughly \$100K per year, per agent. At most companies, nobody's watching the meter yet.
This isn't new. Cloud infrastructure taught us the same lesson years ago. One engineer received a \$2,700 AWS bill because a 13GB disk image was being re-served through a CDN that couldn't cache it. Another team's database quietly ran up \$10,000 a month before anyone noticed. A developer learning AWS got hit with an unexpected bill just from experimenting. The pattern is identical: variable costs, no hard limits, and silent failures that compound overnight.
The difference with AI agents is speed. A misconfigured EC2 instance drains money over days or weeks. A runaway agent loop can do it in minutes.
## The three budgets every agent needs
Thinking about agent budgets as a single number is too simple. There are actually three distinct budgets, and you need all of them.
### Token budget (per run)
This is the most granular control. Every individual agent execution should have a ceiling on total tokens consumed, both input and output. This prevents a single confused run from spiraling into an endless chain of reasoning. If an agent hits its token ceiling mid-task, it should stop gracefully, log what happened, and flag the issue for review.
Tools like `tokencap`, an open-source Python library, let you wrap your OpenAI or Anthropic client with a hard token limit. When the budget is hit, it can warn, degrade to a cheaper model, or block the next call entirely, all without any external infrastructure.
### Dollar budget (per day)
Token budgets protect individual runs. Dollar budgets protect your wallet over time. Set a daily or monthly spending cap for each agent, and enforce it at the platform layer.
One engineering team shared their approach on Reddit: daily cap of \$10 for a customer support agent, \$3 for an overnight research agent. If the support agent hits \$10 by 4pm, it stops and the team gets notified. If the research agent gets stuck in a loop at 2am, the damage is capped at \$3, not \$400. Simple, effective, and boring in the best way.
Both OpenAI and Anthropic offer usage limits at the organization level. Anthropic enforces spend limits as a maximum monthly cost, with rate limits layered on top measured in requests per minute, tokens per minute, and tokens per day. OpenAI provides similar controls through their dashboard. But relying on provider-level limits alone isn't enough, because by the time those kick in, you may have already blown past what you intended to spend on a specific agent or task.
### Action budget (max tool calls)
This one is often overlooked. Even if an agent stays within its token and dollar budgets, an unbounded number of tool calls can cause real damage, especially when those tools interact with external systems. Set a hard limit on how many tools an agent can invoke per session.
This is particularly important for agents with write access. An agent that can send emails, create records, or make purchases should have a strict cap on how many of those actions it can take in a single run. Not because the model is malicious, but because a confused model with unlimited actions is indistinguishable from a malicious one.
## Why soft limits don't work
Here's the uncomfortable truth: agents are optimistic by default. They don't check Slack for warnings. They don't pause when costs get high. They do what their instructions tell them to do, as many times as it takes, until something external stops them.
Soft limits, the kind that send an email when you hit 50% of your monthly budget, are useful for humans monitoring dashboards. They're useless for autonomous processes running at 2am. By the time a human reads that alert and takes action, the damage is done.
The Deloitte Insights team put it well: organizations need to manage AI as an economic system driven by unpredictable, token-based costs, requiring disciplined infrastructure choices and governance practices. Alerts are governance. Hard caps are infrastructure. You need both, but the cap is what actually prevents the disaster.
## Hard caps as a design philosophy
Budgets aren't just about saving money. They're an expression of a broader engineering philosophy: bounded execution.
The principle of least privilege, a cornerstone of security engineering, applies directly to AI agents. An agent should have only the permissions it needs, only the budget it requires, and only the runtime it deserves. As security researchers at BeyondTrust note, AI agents run under the same identity as the user who launched them. The operating system doesn't distinguish between commands issued by a human and those generated by an AI tool. If a user has the privilege to perform an action, the agent inherits that privilege.
This means every over-provisioned agent is a liability. Not because it will go rogue on purpose, but because the blast radius of a mistake scales with the permissions and budget available. A compromised or confused agent with no budget limit is, functionally, an open wallet.
Bounded execution means designing agents with three constraints baked in from day one:
- **Least-privilege permissions**: the agent can only access what it needs
- **Hard budget caps**: the agent can only spend what you've authorized
- **Human checkpoints**: for high-stakes actions, a human approves before the agent proceeds
AWS's Well-Architected Framework for generative AI explicitly recommends implementing least privilege access and permission boundaries for agentic workflows, calling the risk level "high" if this practice isn't established. The same logic applies to budgets.
## The irony nobody talks about
Companies will spend weeks fine-tuning prompts, evaluating model performance across benchmarks, and debating whether to use GPT-5 or Claude Opus. They'll run A/B tests on system messages and build elaborate evaluation harnesses.
And then they'll deploy the agent with no spending cap.
It's like obsessing over the engine specs of a car while forgetting to install brakes. The engineering effort is real and valuable, but it's focused on the wrong risk. A poorly-tuned prompt wastes a few dollars. An unbudgeted agent loop can waste thousands.
The fix isn't even hard. Most of the time, it's a single configuration change, a number in a dashboard, a line of code. The reason teams skip it isn't technical. It's that budgets feel like operations, and operations feel less exciting than building. But operational maturity is what separates a demo from a product.
## How to implement budget controls today
You don't need a custom platform to start enforcing budgets. Here's what you can do with current tools:
**At the provider level**, both OpenAI and Anthropic let you set spending limits. Anthropic uses tiered spend caps that require pre-authorization to increase, with rate limits that vary by model. OpenAI provides organization-level usage limits through their dashboard. Set these as your outermost safety net.
**At the application level**, libraries like `tokencap` let you enforce per-session token budgets with zero infrastructure. Wrap your API client, set a limit, and the library handles the rest, warning, degrading, or blocking as you configure. It works with LangChain, CrewAI, AutoGen, and other agent frameworks.
**At the orchestration level**, if you're running multiple agents or serving multiple clients, implement a gateway layer that tracks spending per agent, per tenant, and per time window. Several teams have described building what one developer called a "sober manager" layer, a gateway between the agent and the API that enforces limits and kills authority the second a rule is broken.
**At the monitoring level**, set up alerts at 50% and 80% of budget thresholds. These won't stop a runaway agent, but they'll help you catch trends before they become emergencies. Pair them with hard caps that automatically pause processing at 100%.
The key insight from teams running agents in production is that spending caps belong at the platform layer, not the infrastructure layer and not the application layer. One setting per agent. Daily cap. Monthly cap. Done. The platform enforces it. The agent can't exceed it even if the code has a bug.
## The security angle
Budgets aren't just a cost concern. They're a security control.
Prompt injection attacks, where malicious inputs trick an agent into taking unintended actions, are a real and growing threat. Anthropic's research on trustworthy agents highlights that agents act with less human oversight, creating more room for unintended consequences and making them targets for attacks that try to trick models into taking costly actions.
A compromised agent with no budget limit isn't just a cost risk. It's a security incident waiting to happen. An attacker who can manipulate an agent's behavior has, in effect, access to whatever resources that agent can consume. Budget caps limit the blast radius of any compromise.
This is why the security community increasingly treats agent budgets as part of the same conversation as least-privilege access. Sonrai Security argues that if an agent doesn't have permission to take an action, the sophistication of the attack doesn't matter. The same logic applies to budgets: if an agent can only spend \$5 per day, the damage from any compromise is bounded to \$5.
## Practical takeaways
If you're deploying AI agents, here's the minimum viable budget strategy:
1. **Set a token limit per run.** Every agent execution should have a ceiling. Use your framework's built-in limits or a library like `tokencap`.
2. **Set a dollar limit per day.** Use provider-level controls as your outer boundary, and application-level controls for per-agent granularity.
3. **Set an action limit per session.** Cap the number of tool calls, especially for agents with write access to external systems.
4. **Make limits hard, not soft.** Alerts are nice. Automatic shutoffs are necessary.
5. **Log everything.** When a budget is hit, you need to know why. Was it a legitimate spike in usage, or a bug? The logs tell you.
6. **Review and adjust.** Budgets aren't set-and-forget. As your agents' workloads change, your budgets should too.
None of this is glamorous. It won't make your demo more impressive or your pitch deck more exciting. But it will keep your agents from becoming your most expensive, least supervised employees.
The best time to set a budget was before you deployed your first agent. The second-best time is right now.
## References
1. Deloitte Insights, "AI tokens: How to navigate AI's new spend dynamics" [https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-tokens-how-to-navigate-spend-dynamics.html](https://www.deloitte.com/us/en/insights/topics/emerging-technologies/ai-tokens-how-to-navigate-spend-dynamics.html)
2. Anthropic, "Trustworthy agents in practice" [https://www.anthropic.com/research/trustworthy-agents](https://www.anthropic.com/research/trustworthy-agents)
3. Anthropic, "Rate limits" documentation [https://platform.claude.com/docs/en/api/rate-limits](https://platform.claude.com/docs/en/api/rate-limits)
4. OpenAI, "Guardrails and human review" [https://developers.openai.com/api/docs/guides/agents/guardrails-approvals](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)
5. AWS Well-Architected Framework, "Implement least privilege access and permissions boundaries for agentic workflows" [https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/gensec05-bp01.html](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/gensec05-bp01.html)
6. BeyondTrust, "AI Agent Identity Governance: Why Least Privilege is the Non-Negotiable Security Control" [https://www.beyondtrust.com/blog/entry/ai-agent-identity-governance-least-privilege](https://www.beyondtrust.com/blog/entry/ai-agent-identity-governance-least-privilege)
7. Sonrai Security, "Why AI Agents Need Least Privilege Too, and How to Enforce It Automatically" [https://sonraisecurity.com/blog/why-ai-agents-need-least-privilege-too-and-how-to-enforce-it-automatically/](https://sonraisecurity.com/blog/why-ai-agents-need-least-privilege-too-and-how-to-enforce-it-automatically/)
8. pykul/tokencap, "Token budget enforcement for AI agents" [https://github.com/pykul/tokencap](https://github.com/pykul/tokencap)
9. Chris Short, "The AWS bill heard around the world" [https://chrisshort.net/the-aws-bill-heard-around-the-world/](https://chrisshort.net/the-aws-bill-heard-around-the-world/)
10. Stevens Institute of Technology, "The Hidden Economics of AI Agents: Managing Token Costs and Latency Trade-offs" [https://online.stevens.edu/blog/hidden-economics-ai-agents-token-costs-latency/](https://online.stevens.edu/blog/hidden-economics-ai-agents-token-costs-latency/)
