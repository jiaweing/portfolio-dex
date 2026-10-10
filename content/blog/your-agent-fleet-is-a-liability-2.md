---
title: "Your agent fleet is a liability"
date: "2026-03-14"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

You've built eight agents. They run on schedules, respond to triggers, and touch your databases, email, and calendar. Congratulations, you've also built an attack surface that scales with every new agent you add.
I run a growing fleet of Notion agents, Claude Code scheduled tasks, and various automations that handle everything from blog drafting to task management. The convenience is real. So is the exposure. Every one of those agents holds credentials, has standing permissions, and runs without me watching. A compromised agent isn't a bad chat response. It's automated data exfiltration at machine speed.
If you're building with AI agents for personal projects or a small team, this post is for you. You don't need to be an enterprise to have agent sprawl. You just need a few months of enthusiasm and a "set it and forget it" mindset.
## The problem with "set it and forget it"
Enterprise security teams have started talking about agent sprawl as the new shadow IT. Dataiku's research frames it well: unchecked agent proliferation leads to overlapping workflows, wasted compute, and compliance gaps. But you don't need a Fortune 500 org chart to experience the same pattern. A solo developer with a handful of autonomous agents faces the same fundamental risk: things running in your name that you've stopped paying attention to.
Each agent you deploy is a non-human identity with real access. It authenticates with API keys or OAuth tokens. It reads and writes to your systems. And unlike a human, it doesn't question weird instructions, it just executes. OWASP's 2026 top 10 for agentic AI security highlights the risks clearly: excessive permissions, static credentials, lack of traceability, and compromised agents abusing trusted access. These aren't abstract enterprise problems. They're exactly what happens when you give a personal automation broad access to your workspace and walk away.
## What a compromised agent actually looks like
Forget the Hollywood version. A compromised agent doesn't announce itself. It looks like normal operation, except the data is going somewhere it shouldn't.
Trend Micro's research on agent vulnerabilities demonstrated that multi-modal agents can be manipulated through hidden instructions embedded in images or documents. The attack requires zero user interaction. A document containing concealed prompts can cause an agent to exfiltrate sensitive data without the user ever knowing it happened.
Meta's security team has formalized this threat model with their "Agents Rule of Two" framework. The core insight is that an agent becomes dangerous when it can simultaneously process untrusted inputs, access sensitive data, and take external actions. Any two of those three properties is manageable. All three together, and you have a recipe for automated compromise.
Think about your own agents. How many of them read external data, have access to your private information, and can take actions on your behalf? If the answer is "most of them," you have the exact configuration that Meta's framework warns against.
## Agent sprawl is a personal problem too
The enterprise version of agent sprawl involves dozens of teams building overlapping automations. The personal version is quieter but just as real. You set up an agent for email summaries. Then one for task management. Then one for code reviews. Each one gets the credentials it needs, and you move on to the next project.
Six months later, you have a collection of autonomous systems that you couldn't fully inventory if someone asked. Some of those agents might be running on deprecated APIs. Some might have broader permissions than they need because you gave them admin access during testing and never scoped it down. Some might be interacting with services you've stopped using entirely.
This is the irony of automation: the more you automate, the more you need to monitor. Automation doesn't eliminate work, it shifts it from execution to oversight. And oversight is the part that's easy to skip when everything appears to be running smoothly.
## One agent, one job
The single best thing you can do for agent security is also the single best thing you can do for agent reliability: give each agent one narrow job.
A narrowly scoped agent has a narrow blast radius. If your blog-drafting agent gets compromised, the attacker gets access to your blog drafts. Annoying, but survivable. If your everything-agent gets compromised, the attacker gets access to your email, calendar, databases, and whatever else you wired up for convenience.
This is the same principle behind the security concept of least privilege, applied to autonomous systems. Meta's Rule of Two framework is essentially a formalization of this idea. The fewer capabilities you bundle into a single agent, the harder it is for any single point of failure to cascade.
Resist the urge to build a Swiss Army knife agent. Build a fleet of specialized tools instead. Yes, it's more agents to manage. But each one is simpler to reason about, easier to audit, and safer to run.
## A practical checklist for solo devs and small teams
You don't need an enterprise governance framework. You need a quarterly habit. Here's what that looks like:
### Inventory your agents
Write down every agent, automation, and scheduled task you're running. Include what it does, what credentials it uses, and what systems it can access. If you can't produce this list from memory, that's already a finding.
### Audit permissions quarterly
For each agent, ask: does it still need every permission it has? Most agents accumulate permissions during development that never get trimmed for production. Revoke anything that isn't actively required.
### Set kill switches
Every agent should have a way to be stopped immediately. Whether that's a toggle in a dashboard, an API key you can revoke, or a cron job you can disable, make sure you can shut things down fast if something goes wrong.
### Log actions
If an agent can take actions on your behalf, you need a record of what it did. Logs don't prevent compromise, but they make it possible to detect and understand what happened. Without logs, a compromised agent can operate indefinitely without you noticing.
### Scope narrowly
When setting up a new agent, start with the minimum permissions it needs to do its job. You can always add more later. It's much harder to remember to remove permissions you granted months ago during a quick prototype.
### Rotate credentials
Static API keys are a liability. A 2025 GitGuardian report found 24 million leaked credentials on GitHub, and 70% of secrets leaked in 2022 were still valid years later. If your agents authenticate with long-lived keys, set a reminder to rotate them regularly.
## The uncomfortable truth
If you can't list every agent you're running and what each one has access to, you have a problem. Not a theoretical one. A practical one that gets worse with every new agent you add.
The good news is that the fix isn't complicated. It's just not automatic. Inventory, audit, scope, log, repeat. The same discipline that makes agents reliable is the discipline that makes them secure: small, focused, observable, and easy to turn off.
You built these agents because you value automation. Now treat your fleet the way you'd treat any production system. Because that's exactly what it is.
## References
1. OWASP, "Top 10 Risks and Mitigations for Agentic AI Security" (2025). [https://genai.owasp.org/2025/12/09/owasp-genai-security-project-releases-top-10-risks-and-mitigations-for-agentic-ai-security/](https://genai.owasp.org/2025/12/09/owasp-genai-security-project-releases-top-10-risks-and-mitigations-for-agentic-ai-security/)
2. Meta, "Agents Rule of Two: A Practical Approach to AI Agent Security" (2025). [https://ai.meta.com/blog/practical-ai-agent-security/](https://ai.meta.com/blog/practical-ai-agent-security/)
3. Dataiku, "Agent Sprawl Is the New IT Sprawl, Here's How to Control It" (2025). [https://www.dataiku.com/stories/blog/agent-sprawl-is-the-new-it-sprawl](https://www.dataiku.com/stories/blog/agent-sprawl-is-the-new-it-sprawl)
4. Trend Micro, "Unveiling AI Agent Vulnerabilities Part III: Data Exfiltration" (2025). [https://www.trendmicro.com/vinfo/us/security/news/threat-landscape/unveiling-ai-agent-vulnerabilities-part-iii-data-exfiltration](https://www.trendmicro.com/vinfo/us/security/news/threat-landscape/unveiling-ai-agent-vulnerabilities-part-iii-data-exfiltration)
5. GitGuardian, "State of Secrets Sprawl 2025" (2025). [https://www.gitguardian.com/state-of-secrets-sprawl-report-2025](https://www.gitguardian.com/state-of-secrets-sprawl-report-2025)
6. Token Security, "Top 10 Security Risks of Autonomous AI Agents" (2025). [https://www.token.security/lp/top-10-security-risks-of-autonomous-ai-agents](https://www.token.security/lp/top-10-security-risks-of-autonomous-ai-agents)
7. McKinsey, "Deploying Agentic AI with Safety and Security" (2025). [https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/deploying-agentic-ai-with-safety-and-security-a-playbook-for-technology-leaders](https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/deploying-agentic-ai-with-safety-and-security-a-playbook-for-technology-leaders)
8. Obsidian Security, "Top AI Agent Security Risks and How to Mitigate Them" (2025). [https://www.obsidiansecurity.com/blog/ai-agent-security-risks](https://www.obsidiansecurity.com/blog/ai-agent-security-risks)
