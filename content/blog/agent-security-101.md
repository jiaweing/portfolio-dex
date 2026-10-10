---
title: "Agent security 101"
date: "2026-03-23T23:36:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
pinned: true
---

AI agents are no longer experiments. They send emails, write code, manage databases, make purchases, and interact with the world on your behalf. That power comes with a simple but uncomfortable truth: if an agent can do something useful, it can also do something harmful, whether through a bug, a prompt injection, or just bad configuration.
Securing agents is not about locking everything down. It is about being deliberate with what you give them access to and thinking carefully about the blast radius when things go wrong.
Here is a practical breakdown of how to think about agent security, whether you are running a coding assistant locally or deploying autonomous workflows in production.
## Treat your agent like a new employee, not like yourself
This is the most important mental shift. When you give an agent your own credentials, your own API keys, your own browser session, you are giving it the full blast radius of your identity. If the agent gets compromised through prompt injection or a malicious tool, the attacker inherits everything you have access to.
Instead, treat the agent like a new hire on day one. Ask the same questions you would ask when onboarding someone:
- What systems does this role actually need access to?
- What is the maximum spending authority for this role?
- What actions require a second pair of eyes?
Give the agent its own identity. If you use Notion, create a separate workspace account for it. If it needs email, use a service like [AgentMail](https://agentmail.to/) to give it a dedicated inbox rather than forwarding from yours. If it needs to make purchases, issue it a dedicated virtual card through something like Ramp with a strict spending cap, say \$100, rather than handing over your own payment method. If it needs a phone number, get it one.
The line between "agent acting as you" and "agent acting on your behalf" matters enormously. The first gives away your identity. The second gives away a scoped set of permissions.
## Scope permissions with role-based access control
The principle of least privilege is not new, but it is newly urgent. According to ISACA, 88% of enterprises reported confirmed or suspected AI agent security incidents in the past year, with insufficient identity management being a key vulnerability.
Role-based access control (RBAC) is the starting point. Define what your agent can read, what it can write, and what it can execute. Be specific:
- A research agent should have read access to documents and web search, not write access to your database.
- A coding agent should be sandboxed to the project directory, not given access to your home folder.
- A customer support agent should be able to read tickets and draft responses, not modify billing records.
RBAC alone is not always enough for agents, as some security researchers have pointed out. Agents can chain actions together in ways that individual permission checks might miss. Consider layering attribute-based controls on top for sensitive workflows, where permissions depend not just on the agent's role but on the context of what it is doing, what data it is touching, and when.
The goal is that even if the agent is fully compromised, the damage is contained. If you have given it its own identity with scoped permissions, a breach is a contained incident rather than a full account takeover.
## Set spending limits and resource caps
One of the less obvious risks with agents is the "denial of wallet" attack, where a compromised or misbehaving agent runs up your API bill through unbounded loops or excessive tool calls.
Set hard limits:
- Cap API spending per agent per day
- Limit the number of tool calls per session
- Set timeouts on agent execution
- Monitor token usage and cost per session
These controls are not just about security. They are also about catching bugs early. An agent stuck in a loop calling an API 10,000 times is a problem whether or not there is an attacker involved.
## Validate inputs and outputs with a strong model
Agents that interact with the internet face a specific class of attacks: indirect prompt injection. This is where malicious instructions are hidden inside documents, web pages, emails, or API responses that the agent processes. The agent reads what looks like normal content but embedded within it are instructions that hijack its behavior.
The OWASP AI Agent Security Cheat Sheet lists this as one of the top risks and recommends treating all external data as untrusted. In practice, this means:
**On the input side**, use a capable model or classifier to scan incoming content for common injection patterns before it enters the agent's context. Sanitize and delimit external data clearly so the agent can distinguish instructions from content.
**On the output side**, scan everything the agent produces before it leaves your system. Check for PII, API keys, secrets, and internal URLs. A well-meaning agent summarizing a document might inadvertently include a password that was embedded in the source material.
This is not a theoretical risk. Lakera AI's Q4 2025 analysis of production attack traffic found that indirect prompt injection through external content is already one of the most common attack patterns against deployed agents.
## Hide secrets behind a proxy layer
Agents often need credentials to do their work, but that does not mean they should see those credentials directly. If an agent has your AWS keys in its environment variables, a prompt injection attack can potentially exfiltrate them.
The better approach is secret injection through a proxy layer:
- Start the agent with an empty or minimal credential set
- Use a credential broker that provides short-lived tokens on demand, scoped to the current task
- Never store long-lived secrets in environment variables the agent can read
NVIDIA's AI Red Team specifically recommends this pattern: inject required secrets based only on the specific task, ideally through a mechanism that is not directly accessible to the agent. The goal is to limit the blast radius so that a compromised agent can only use credentials that have been explicitly provisioned for the current task.
Tools like [ClawShell](https://github.com/clawshell/clawshell) take this approach by acting as a proxy layer between your agent and your shell environment, controlling what commands and credentials the agent can actually access.
## Run agents in the cloud, not on your computer
Your local machine is full of valuable targets: SSH keys, browser sessions, password managers, source code, personal files. Running an agent locally with broad permissions puts all of that at risk.
Cloud-based execution environments isolate the damage. If an agent running in a container gets compromised, the attacker gets access to that container, not your laptop. The blast radius is fundamentally smaller.
If you must run agents locally, especially coding agents like Claude Code or similar tools, sandbox them aggressively:
- Restrict file access to the workspace directory only
- Block writes to configuration files and dotfiles
- Control network egress so the agent cannot phone home to arbitrary servers
- Review commands before execution, do not run in fully autonomous mode
NVIDIA's security guidance goes further, recommending virtualization-level isolation (microVMs or Kata containers) rather than simple containerization, because agents that execute code by design can potentially exploit shared kernel vulnerabilities.
The key principle: the more access an agent has to your environment, the more isolation it needs.
## Use deterministic workflows for predictable tasks
Not every task needs an autonomous agent making decisions. If a workflow has predictable inputs and expected outputs, use deterministic automation instead. Traditional scripts, pipelines, and rule-based systems are more predictable, more auditable, and harder to subvert.
Reserve agentic behavior for tasks that genuinely require reasoning, adaptation, and judgment. For everything else, a well-tested script is more secure than an LLM making decisions.
This also applies to hybrid architectures. You can use an agent for the reasoning step (analyzing data, drafting content, making recommendations) while routing the execution step through deterministic code that validates and constrains the agent's output before acting on it.
## Be careful with agents in shared contexts
If your agent has broad access to your data, be cautious about using it in group chats, shared channels, or multi-user environments. Other participants in the conversation can craft messages that manipulate the agent's behavior, intentionally or accidentally.
An agent that is yours should stay yours, especially if it has elevated permissions. Keep it in private contexts where you control the inputs. If you need an agent in a shared space, make sure it has minimal permissions and treat every message it receives as untrusted input.
## Monitor everything
You cannot secure what you cannot see. Log all agent decisions, tool calls, and outcomes. Track costs, token usage, and execution patterns. Set up alerts for anomalies: unusually high API call rates, access to unexpected resources, or cost spikes.
The OWASP cheat sheet recommends implementing anomaly detection tuned to identify capability expansion or goal drift, the subtle signs that an agent has been manipulated into doing something it was not designed to do. For high-stakes agents, consider a paired architecture where a monitoring agent continuously validates that the operational agent stays within behavioral bounds.
Build this observability from day one. Retrofitting monitoring onto a production agent is much harder than including it from the start.
## The bottom line
Agent security is not a single technique. It is a set of layered decisions about identity, permissions, isolation, and oversight. The core principles are straightforward:
- **Own identity**: Give agents separate accounts, credentials, and spending limits
- **Least privilege**: Only grant the specific permissions each agent needs
- **Isolation**: Run agents in sandboxed, cloud-based environments when possible
- **Input/output validation**: Scan everything coming in and going out
- **Secret management**: Never expose raw credentials to agents
- **Monitoring**: Log everything and watch for anomalies
- **Determinism where possible**: Use agents for reasoning, deterministic code for execution
The agents you deploy today are only going to get more capable and more autonomous. The security foundations you set now will determine how much you can trust them later.
## References
1. [OWASP AI Agent Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html)
2. [OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/)
3. [NVIDIA AI Red Team, "Practical Security Guidance for Sandboxing Agentic Workflows and Managing Execution Risk"](https://developer.nvidia.com/blog/practical-security-guidance-for-sandboxing-agentic-workflows-and-managing-execution-risk/)
4. [Coalition for Secure AI, "Securing the AI Agent Revolution: A Practical Guide to MCP Security"](https://www.coalitionforsecureai.org/securing-the-ai-agent-revolution-a-practical-guide-to-mcp-security/)
5. [ISACA, "Four Emerging AI Risk Areas for Digital Trust Professionals in 2026"](https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2026/four-emerging-ai-risk-areas-for-digital-trust-professionals-in-2026)
6. [Lakera AI, "Q4 2025 AI Agent Security Trends"](https://www.lakera.ai/ai-security-guides/q4-2025-ai-agent-security-trends)
7. [AGAT Software, "AI Agent Security in 2026: What Enterprises Are Getting Wrong"](https://agatsoftware.com/blog/ai-agent-security-enterprise-2026/)
8. [Oso, "Why RBAC Is Not Enough for AI Agents"](https://www.osohq.com/learn/why-rbac-is-not-enough-for-ai-agents)
9. [OWASP Securing Agentic Applications Guide 1.0](https://genai.owasp.org/resource/securing-agentic-applications-guide-1-0/)
