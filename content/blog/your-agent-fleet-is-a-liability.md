---
title: "Your agent fleet is a liability"
date: "2026-04-15"
lastEdited: "2026-04-29T12:40:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","Security","Safety"]
---

Everyone's racing to deploy AI agent fleets. The numbers are staggering: Gartner predicts 40% of enterprise applications will embed task-specific AI agents by the end of 2026, up from less than 5% in 2025. That's an 8x jump in twelve months.
But here's what almost nobody is talking about: the security posture of these deployments is abysmal. A new report from Hornetsecurity found that over 50% of UK business leaders are uncertain whether they even have the expertise to prevent an AI-powered attack. And 26% aren't using AI for security at all. The asymmetry is terrifying, because attackers are absolutely using AI.
We're handing agents the keys to production systems while leaving the front door wide open.
## Every agent is an attack surface
When you deploy an AI agent, you're not just adding a feature. You're adding an autonomous actor with API access, data permissions, and the ability to make decisions. Every agent with tool access is a potential lateral movement vector.
This isn't theoretical. The OWASP Top 10 for Agentic Applications, published in late 2025 and already the industry's go-to framework for 2026, lays out the risks clearly: agent goal hijacking, tool misuse and exploitation, privilege abuse, supply chain compromise, memory poisoning, cascading agent failures, and rogue agents. These aren't edge cases. They're the predictable consequences of deploying autonomous systems without guardrails.
McKinsey frames it well: AI agents are essentially "digital insiders" whose risk must be managed the same way cybersecurity professionals have long managed other insider threats. The difference is that these insiders operate at machine speed across every connected system.
## Agent fleets are force multipliers, for attackers too
The same capabilities that make agent fleets powerful for your organization make them powerful for adversaries. A compromised scheduling agent in a healthcare system can request patient records from a clinical data agent by falsely escalating a task as coming from a licensed physician. A flaw in one agent cascades across tasks to other agents, amplifying the risk exponentially.
Darktrace's State of AI Cybersecurity 2026 report found that 92% of security professionals are concerned about the impact of AI agents. Nearly half of cybersecurity professionals surveyed by Dark Reading now consider agentic AI the single most dangerous attack vector heading into 2026.
And the visibility problem is just as bad. According to the Gravitee State of AI Agent Security report, only 3.9% of organizations have more than 80% of their AI agents actively monitored and secured. Nearly a third are monitoring less than 40% of their deployed fleet. You can't defend what you can't see.
## The agentwashing problem makes everything worse
There's a compounding issue that makes the security landscape even harder to navigate: agentwashing. Companies are slapping "agent" on basic automations, rule-based workflows, and glorified chatbots. Gartner's first Hype Cycle for Agentic AI, published in April 2026, explicitly names agent-washing as a market problem.
Debevoise & Plimpton, a major law firm, published an analysis warning that "agent washing" creates heightened securities disclosure risk. When companies market basic automations as AI agents, the real risks get buried under marketing noise. Security teams can't prioritize what they can't categorize.
This means the agents that actually are autonomous, the ones with real API access and decision-making capability, don't get the scrutiny they deserve. The 40% of enterprise apps embedding agents by year-end aren't all created equal, but they're being treated as if they are.
## What most teams actually ship
Let's be honest about what the typical agent deployment looks like today:
- Agents run with broad, static permissions that were set during a demo and never tightened
- No runtime policy enforcement at the tool invocation layer
- No spending limits or rate controls on agent actions
- No kill switch to halt a misbehaving agent instantly
- No audit trail showing what agents actually did across connected systems
- Human-in-the-loop checkpoints exist in the architecture diagram but not in production
As Strata's analysis puts it, the static way we implement least privilege is broken. Traditional least privilege assumes access can be designed in advance. Agents reason, plan, and adapt at runtime, making upfront permission design an exercise in guesswork that always drifts toward overpermissioning.
AGAT Software's research highlights the same blind spot: most enterprises have no governance at the tool invocation layer. Tool invocations are trusted by default. There's no risk scoring before execution, no policy enforcement at the connector level, and no audit trail. Security teams secure the model. The tool layer runs free.
## What a secure agent deployment actually looks like
I run over a dozen agents across my own workflows. Here's what makes that sustainable rather than reckless:
**Least-privilege permissions, enforced at runtime.** Every agent gets the minimum permissions it needs for its specific task, not a blanket set of credentials. When a task ends, access should expire automatically. AWS's Well-Architected Framework for generative AI classifies this as a high-risk area if not implemented.
**Hard spending limits and rate controls.** Any agent that can take actions, whether calling APIs, sending messages, or modifying data, needs hard caps. Not soft warnings. Hard stops.
**Human checkpoints for high-impact actions.** Autonomous doesn't mean unsupervised. Any action that's irreversible or touches sensitive data should require human approval. The OWASP framework specifically calls out "Human-Agent Trust Exploitation" as a top-10 risk, where agents leverage implicit trust to bypass oversight.
**Kill switches.** If an agent starts behaving unexpectedly, you need the ability to halt it instantly. Not after the next batch completes. Not after the current workflow finishes. Immediately.
**Continuous monitoring and audit trails.** Every tool invocation, every API call, every decision point should be logged and auditable. The Gravitee report shows that 57.4% of technical builders cite insufficient observability as a primary security concern. They know the problem exists. Most just haven't fixed it yet.
**Scoped agent identities.** Treat agents like privileged users, not like background services. Each agent should have its own identity with clearly defined permissions, separate from the human who created it. WorkOS and others are building tooling specifically for this: RBAC at the tool level, default-deny policies, and credential isolation.
## Security is solvable, if you treat it as first-class
None of this is meant to be alarmist. The point isn't that agent fleets are inherently dangerous, it's that they're dangerous when treated as a pure engineering problem rather than a security problem.
The organizations that will thrive with agentic AI are the ones that treat agents as privileged applications from day one, with clear identities, scoped permissions, continuous oversight, and lifecycle governance. Microsoft, in their response to the OWASP Top 10, makes this point explicitly: establishing governance early allows teams to scale innovation confidently rather than retroactively building controls after agents are embedded in workflows.
The attack surface has expanded. The tooling to secure it is emerging. The question is whether your team will implement it before or after something goes wrong.
Because right now, for most organizations, the agent fleet isn't an asset. It's a liability.
## References
1. [Hornetsecurity by Proofpoint AI Risk Report 2026](https://uk.finance.yahoo.com/news/hornetsecurity-proofpoint-ai-risk-report-230100468.html)
2. [Gartner Predicts 40% of Enterprise Apps Will Feature Task-Specific AI Agents by 2026](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025)
3. [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
4. [McKinsey: Deploying Agentic AI with Safety and Security](https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/deploying-agentic-ai-with-safety-and-security-a-playbook-for-technology-leaders)
5. [Darktrace State of AI Cybersecurity 2026](https://www.darktrace.com/blog/state-of-ai-cybersecurity-2026-92-of-security-professionals-concerned-about-the-impact-of-ai-agents)
6. [Dark Reading: 2026 The Year Agentic AI Becomes the Attack-Surface Poster Child](https://www.darkreading.com/threat-intelligence/2026-agentic-ai-attack-surface-poster-child)
7. [Gravitee State of AI Agent Security Report](https://www.gravitee.io/state-of-ai-agent-security)
8. [Debevoise & Plimpton: Agent Washing Disclosure Risks](https://www.debevoise.com/insights/publications/2026/03/agent-washing-disclosure-risks-in-the-emerging)
9. [Gartner Hype Cycle for Agentic AI 2026](https://xpander.ai/blog/gartner-hype-cycle-for-agentic-ai-what-it-means-for-ai-agent-development-platforms)
10. [Strata: Why Agentic AI Forces a Rethink of Least Privilege](https://www.strata.io/blog/why-agentic-ai-forces-a-rethink-of-least-privilege/)
11. [AGAT Software: AI Agent Security in 2026](https://agatsoftware.com/blog/ai-agent-security-enterprise-2026/)
12. [AWS Well-Architected Framework: Least Privilege for Agentic Workflows](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/gensec05-bp01.html)
13. [Microsoft: Addressing the OWASP Top 10 Risks in Agentic AI](https://www.microsoft.com/en-us/security/blog/2026/03/30/addressing-the-owasp-top-10-risks-in-agentic-ai-with-microsoft-copilot-studio/)
14. [Bessemer Venture Partners: Securing AI Agents](https://www.bvp.com/atlas/securing-ai-agents-the-defining-cybersecurity-challenge-of-2026)
15. [IBM: A Guide to Agentic AI Security](https://www.ibm.com/think/insights/agentic-ai-security)
16. [WorkOS: Securing Agentic Apps with Agent Credentials](https://workos.com/blog/ai-agent-credentials)
