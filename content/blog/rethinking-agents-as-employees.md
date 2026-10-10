---
title: "Rethinking agents as employees"
date: "2026-04-15T18:03:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","Security","Privacy","Startups","SaaS","Notion"]
---

We keep building AI agents that act as extensions of ourselves. They use our accounts, send emails from our inboxes, post from our social profiles, and authenticate with our credentials. We call them "personal assistants," but they're not assistants at all. They're us, wearing a thin software mask.
This framing is the root of a growing problem. As agents become more capable and autonomous, treating them as proxies for our own identity creates security risks, accountability gaps, and operational fragility. There's a better mental model, and it's one we've used in organizations for decades.
**Treat your agents like employees.**
## The problem with "assistant" framing
When you hire a human assistant, you don't hand them your passport and tell them to pretend to be you. You give them their own credentials, define their access, and hold them accountable under their own identity. Yet with AI agents, we routinely do the digital equivalent of identity sharing.
Today's typical agent setup looks like this: the agent logs into your email, uses your API keys, authenticates as you in every system it touches. If something goes wrong, there's no separation between what you did and what the agent did. Audit logs show your name. Permissions are your permissions. The blast radius of a mistake is your entire digital life.
This creates several concrete problems:
- **No auditability.** When an agent acts under your identity, you lose the ability to distinguish its actions from your own. Every email it sends, every commit it makes, every message it posts looks like it came from you.
- **Overprivileged access.** Agents inherit your full set of permissions by default. An agent that only needs to read your calendar ends up with access to your entire Google Workspace.
- **No containment.** If an agent is compromised or behaves unexpectedly, the damage extends to everything your identity can touch.
## The employee model
Reframing agents as employees changes everything. An employee has their own identity, their own set of credentials, and a clearly scoped set of permissions. They can be onboarded, monitored, and offboarded. You can grant them access to specific systems without exposing your own.
Here's what this looks like in practice:
- **Agents get their own email addresses.** Not aliases on your account, but independent inboxes they own and operate.
- **Agents get their own phone numbers.** Real numbers for SMS verification, two-factor auth, and communication channels.
- **Agents maintain their own accounts.** Their own social media profiles, their own SaaS logins, their own password managers.
- **Agents are added as separate users in tools.** Need an agent in your Notion workspace? Add it as a new team member with its own account, not a bot pretending to be you.
This separation isn't just conceptual. It's operationally critical. When each agent has its own identity, you can apply the same role-based access control (RBAC) that organizations have used for decades. You can give Agent A read-only access to your CRM while Agent B gets write access to your calendar. You can revoke one agent's access without affecting another. You maintain root access over everything while each agent operates within its defined scope.
## The traditional RBAC advantage
Role-based access control is not a new concept. It's the backbone of enterprise security. Every company with more than a handful of employees uses some form of RBAC to manage who can access what.
The beauty of applying this model to agents is that we don't need to invent new paradigms. The infrastructure for managing identities, permissions, and audit trails already exists. What's been missing is the willingness to treat agents as first-class entities within these systems rather than extensions of a human user.
When you frame agents as employees:
- You can restrict them from accessing sensitive data they don't need.
- You can monitor their actions independently from your own.
- You can rotate their credentials without affecting your personal accounts.
- You can "fire" an agent (revoke all access) cleanly, without worrying about shared state.
As Michael Fauscette from Arion Research put it, "your AI systems need to operate more like employees than instruments." Every agent should have an identity record that documents who owns it, what systems it can access, and when that access expires. Every agent should operate on least privilege. Every agent's actions should be logged and auditable.
## The emerging agent identity stack
The startup ecosystem is starting to catch on. A growing number of companies are building the infrastructure to give agents their own identities, and it's becoming a real category.
**AgentMail** (YC S25) is one of the clearest examples. They've built an API-first email platform designed specifically for AI agents. Instead of forwarding emails through your personal inbox, AgentMail lets you programmatically create independent inboxes for each agent. The agent gets its own email address, can send and receive messages, and manages conversations in threads, just like a human employee would. As they put it, "it's not AI for your email, it's email for your AI."
Their thesis is compelling: email is the foundational identity layer of the internet. Almost every online service uses an email address for verification. By giving agents their own email, you're effectively giving them a legitimate way to participate in digital systems, sign up for services, receive verification codes, and communicate independently.
**Multifactor** (YC) is tackling another piece of the puzzle: credentials and authentication. They've built a password manager designed for the AI era that works for both humans and agents. The idea is that agents need a way to manage their own credentials, authenticate into services, and do so without ever exposing the human owner's passwords.
**Vouched** has raised \$17M to focus on the verification side of agent identity with their "Know Your Agent" (KYA) product suite. They help businesses identify, authenticate, and permission AI agents that interact with their platforms, essentially building the trust layer that lets agents be recognized as legitimate actors in digital systems.
On the phone number side, there's growing momentum around giving agents their own telephony presence. While established providers like Twilio and Telnyx offer programmatic phone number provisioning, the startup ecosystem is actively working on purpose-built solutions for agent-native phone and SMS identity. *(If you know the specific startup focused on agent identity via phone numbers, I'd love to hear about it in the comments, I wasn't able to track it down.)*
## Where this is going
I suspect we're at the very beginning of a fundamental shift in how we think about agents. The current paradigm, agents as extensions of human identity, is a transitional phase. The future looks more like agents as autonomous digital entities with their own identities, not in the sense of passports or national identification, but identities that allow them to interact online and socially as independent actors.
This doesn't mean agents become uncontrolled. Quite the opposite. By giving agents their own identities, we gain *more* control, not less. We can apply decades of organizational security practices, RBAC, least privilege, audit logging, lifecycle management, to a new class of digital workers.
The companies building this infrastructure are creating something analogous to what payroll providers, HR systems, and identity management platforms did for human employees. They're building the operational backbone that makes it possible to deploy agents at scale without compromising security or accountability.
## Practical takeaways
If you're building with agents today, here are some principles to apply:
1. **Stop sharing credentials.** Every agent should authenticate with its own accounts and API keys, never yours.
2. **Apply least privilege.** Give each agent only the permissions it needs for its specific task. Review and tighten these regularly.
3. **Create separate accounts.** When adding an agent to a tool like Notion, Slack, or your CRM, create a dedicated account for it.
4. **Log everything independently.** Make sure you can distinguish agent actions from your own in audit trails.
5. **Plan for offboarding.** Before deploying an agent, know exactly how you would revoke all its access if needed.
6. **Think in roles, not in proxies.** Design your agent architecture like an org chart, with clear roles, responsibilities, and boundaries.
The mental model shift is simple but powerful. Your agents aren't you. They're your team. Treat them accordingly.
## References
1. "Why AI Agents Need Their Own Identity: Lessons from 2025's Wake-Up Calls," Ayesha Dissanayaka, Medium, December 2025. [https://medium.com/@ayshsandu/why-ai-agents-need-their-own-identity-lessons-from-2025s-wake-up-calls-05ee0fa9edd8](https://medium.com/@ayshsandu/why-ai-agents-need-their-own-identity-lessons-from-2025s-wake-up-calls-05ee0fa9edd8)
2. "Agentic Identity and Privilege: Why Your AI Needs an Employee ID and a Security Clearance," Michael Fauscette, Arion Research, February 2025. [https://www.arionresearch.com/blog/agentic-identity-and-privilege-why-your-ai-needs-an-employee-id-and-a-security-clearance](https://www.arionresearch.com/blog/agentic-identity-and-privilege-why-your-ai-needs-an-employee-id-and-a-security-clearance)
3. "Why AI Agents Need Their Own Identity, Not Yours," Alex Williams, The New Stack, December 2025. [https://thenewstack.io/why-ai-agents-need-their-own-identity-not-yours/](https://thenewstack.io/why-ai-agents-need-their-own-identity-not-yours/)
4. AgentMail, YC S25. [https://agentmail.to](https://agentmail.to)
5. "Email as Identity for AI Agents," Adi Singh, AgentMail Blog, March 2026. [https://www.agentmail.to/blog/email-as-identity-for-ai-agents](https://www.agentmail.to/blog/email-as-identity-for-ai-agents)
6. Multifactor, Y Combinator. [https://www.prnewswire.com/news-releases/yc-startup-multifactor-launches-the-first-password-manager-built-for-the-ai-era-making-anything-a-read-only-link-302613088.html](https://www.prnewswire.com/news-releases/yc-startup-multifactor-launches-the-first-password-manager-built-for-the-ai-era-making-anything-a-read-only-link-302613088.html)
7. "Vouched Launches Agent Checkpoint to Establish Trust in the Age of AI Agents," Business Wire, February 2026. [https://www.businesswire.com/news/home/20260224311936/en/Vouched-Launches-Agent-Checkpoint-to-Establish-Trust-in-the-Age-of-AI-Agents](https://www.businesswire.com/news/home/20260224311936/en/Vouched-Launches-Agent-Checkpoint-to-Establish-Trust-in-the-Age-of-AI-Agents)
8. "Your AI Agents Are Employees. Are You Treating Them Like It?," Shane Dempsey, LinkedIn. [https://www.linkedin.com/pulse/your-ai-agents-employees-you-treating-them-like-shane-dempsey-ub19f](https://www.linkedin.com/pulse/your-ai-agents-employees-you-treating-them-like-shane-dempsey-ub19f)
9. "The Many Faces of Agentic Identities," Cyata. [https://cyata.ai/blog/many-faces-of-agentic-identities/](https://cyata.ai/blog/many-faces-of-agentic-identities/)
