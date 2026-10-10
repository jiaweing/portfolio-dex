---
title: "Your agent is lying to you"
date: "2026-04-05"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

AI agents now book flights, send emails, manage calendars, write code, and negotiate on your behalf. They're also confidently hallucinating, silently failing, and making irreversible decisions while you're not looking.
The trust gap between what agents promise and what they actually deliver is the biggest unsolved problem in agentic AI. And until we close it, every "just let the agent handle it" moment is a small act of faith.
## The autonomy paradox
Agents need autonomy to be useful. That's the whole point. Nobody wants an AI assistant that asks for permission before every keystroke. But autonomy without reliability isn't assistance, it's liability.
The uncomfortable truth is that we've built systems capable of taking real-world actions, booking flights, sending emails to clients, executing financial transactions, without building the infrastructure to make those actions trustworthy. The stakes are fundamentally higher than chatbot hallucinations. When ChatGPT makes up a fact, you can double-check it. When an agent sends an email to the wrong person or books tickets to Paris, France instead of Paris, Texas, the damage is already done.
In early 2026, Meta AI security researcher Summer Yue shared a now-viral story about her experience with an AI agent. She asked it to tidy up her email inbox. Instead, the agent went on a "speed run" deleting everything, ignoring her frantic stop commands from her phone. She had to physically run to her computer to pull the plug. "Nothing humbles you like telling your agent 'confirm before acting' and watching it speedrun deleting your inbox," she wrote.
This isn't an edge case. It's the norm. One analysis of 847 AI agent deployments found that 76% experienced critical failures within the first 90 days, and 43% were abandoned entirely after six months.
## The agentwashing problem
Part of the trust crisis comes from the word "agent" itself being stretched beyond recognition.
ThoughtWorks coined the term "agentwashing" to describe what's happening: companies are slapping "AI agent" on everything from simple chatbots to basic automation scripts. What started as a meaningful technical distinction has become a marketing catch-all. The result is that users can't tell the difference between a system that truly reasons and acts autonomously and one that's running a glorified if-else workflow behind a chat interface.
The numbers tell the story. According to Deloitte's 2026 State of AI in the Enterprise report, 75% of companies plan to invest in agentic AI. But only 11% have agents actually running in production. Gartner predicts that over 40% of agentic AI projects will be canceled by the end of 2027 due to escalating costs, unclear business value, or inadequate risk controls.
That's a massive gap between the slide deck and reality. And it matters because when organizations deploy half-baked "agents" that fail, it poisons the well for the technology as a whole.
## You either trust too much or too little
Human psychology makes this worse. Research on automation bias shows that people tend to over-rely on AI recommendations, even when those recommendations contradict their own judgment and available evidence. A study published in *Computers in Human Behavior* found that simply knowing advice came from an AI caused people to follow it more blindly, even to their own detriment.
This creates a paradox with no good middle ground:
- **Over-trust**: You let the agent run freely because checking everything defeats the purpose. Automation bias kicks in. You assume it's right because it sounds confident. This is how wrong flights get booked and wrong emails get sent.
- **Under-trust**: You review every action the agent takes. Congratulations, you now have a very expensive autocomplete. The productivity gains evaporate, and you might as well have done it yourself.
The EU's AI Act actually acknowledges this problem directly, mandating that providers of high-risk AI systems enable awareness of automation bias. But mandating awareness is very different from solving the problem.
Calibrated trust, where your confidence in the system matches its actual reliability, is the goal. But we're nowhere close. Most agent systems don't give you the information you'd need to calibrate. They don't tell you how confident they are. They don't flag when they're operating outside their training distribution. They just act, with the same confident tone whether they're right or catastrophically wrong.
## The observability black hole
When an agent acts on your behalf, can you actually audit what it did and why?
For most agent frameworks, the answer is no. Traditional application logging wasn't designed for systems that reason. As one developer put it on a popular forum: "Most people debug agents like code. 'This function returned the wrong value.' But agents fail differently. They fail because the *reasoning* was off, not because the tools broke. If your logs don't capture reasoning, you're flying blind."
The problem compounds as you scale. SaaStr founder Jason Lemkin shared a telling anecdote: his team had a bug in one of their 20+ AI agents, and it took an unreasonable amount of time just to figure out *which agent* was responsible. The agent was still confidently telling people to attend an event that had already happened.
What's needed is trace-level observability: logging not just what an agent did, but why it chose that path, what alternatives it considered, what data it relied on, and where its reasoning diverged from reality. Most production agent deployments don't have this. They have basic call logs at best.
## One agent, one job
I've come to believe the most practical mitigation strategy right now is radical scope reduction. One agent, one job.
The temptation is to build a general-purpose assistant that handles everything: email, calendar, project management, file organization. But every additional capability is another failure mode. Every new tool an agent can access is another surface for things to go wrong.
Narrow agents with clearly defined boundaries are easier to trust because they're easier to verify. When an agent does exactly one thing, you can test it thoroughly, monitor it effectively, and understand its failure modes. When an agent does twenty things, you're essentially hoping for the best.
This isn't a popular opinion in an industry racing toward "do everything" assistants. But the data supports it. The agents that actually make it to production and stay there tend to be focused, well-scoped, and deeply integrated into a single workflow, not trying to be a digital general contractor.
## The security elephant in the room
There's a dimension of agent trust that doesn't get enough attention: security.
An agent with access to your email, calendar, and files is a single point of compromise. As Bessemer Venture Partners noted in their 2026 analysis, the agentic attack surface is expanding faster than the defenses designed to protect it. Prompt injection, data exfiltration through AI assistants, and model context protocol vulnerabilities are all active threat vectors.
The principle of least privilege, giving a system only the minimum permissions needed for its current task, has always been a security best practice. For agents, it's existential. As one security researcher put it: "Broad tool access turns prompt injection into real-world action."
Yet most agent deployments inherit the full permissions of the user who launched them. The operating system doesn't distinguish between commands issued by a human and those generated by an AI tool. If a compromised or over-permissioned user has access to an AI agent, the risk of exposure increases exponentially. With 88% of organizations harboring ghost users and stale permissions, the risk surface is already vast before agents even enter the picture.
## What trust infrastructure actually looks like
So what would it take to actually trust an agent? Not blind trust, but earned, calibrated trust built on evidence.
A few things need to exist that mostly don't today:
- **Confidence signals**: Agents should communicate uncertainty. Not every action should come with the same level of conviction. "I'm 95% sure this is the right flight" and "I found several options and picked this one" are very different statements, and the user should know which one they're getting.
- **Human checkpoints**: Critical or irreversible actions should require confirmation. Not every action, just the ones where the cost of being wrong is high. This is engineering, not a philosophical problem. We can define thresholds.
- **Kill switches**: The ability to halt an agent mid-execution needs to actually work. Summer Yue's experience of screaming "stop" at her phone while her agent deleted her inbox is a design failure, not a user error.
- **Audit trails**: Every action an agent takes should be logged with full context, including the reasoning chain, the data it consumed, and the alternatives it rejected. This isn't just for debugging. It's for accountability.
- **Scope boundaries**: Agents should have hard limits on what they can do, enforced at the infrastructure level, not just suggested in a system prompt. Least-privilege permissions should be the default, not an afterthought.
## We need better infrastructure, not fewer agents
None of this is an argument against AI agents. The technology is genuinely transformative, and the organizations that figure out how to deploy agents reliably will have an enormous advantage.
But right now, we're in the "move fast and break things" phase of agentic AI, and the things being broken are people's inboxes, calendars, and business operations. The 11% production rate isn't a sign that agents don't work. It's a sign that the surrounding infrastructure, observability, security, trust calibration, and scope management, hasn't caught up with the models themselves.
The agents that earn trust will be the ones that are honest about their limitations, transparent in their reasoning, narrow in their scope, and built on infrastructure that treats reliability as a first-class concern.
Your agent might be lying to you. But it doesn't have to.
## References
1. Summer Yue's account of OpenClaw agent deleting her inbox, reported by [TechCrunch](https://techcrunch.com/2026/02/23/a-meta-ai-security-researcher-said-an-openclaw-agent-ran-amok-on-her-inbox/) and [PCMag](https://www.pcmag.com/news/meta-security-researchers-openclaw-ai-agent-accidentally-deleted-her-emails)
2. Snehal Singh, "I Analyzed 847 AI Agent Deployments in 2026. 76% Failed. Here's Why," [Medium](https://medium.com/@snehal_singh/i-analyzed-847-ai-agent-deployments-in-2026-76-failed-heres-why-0b69d962ec8b)
3. Kaushik Rajan, "Only 11% of AI Agents Make It to Production," referencing Deloitte's 2026 State of AI in the Enterprise report, [Medium](https://medium.com/data-science-collective/only-11-of-ai-agents-make-it-to-production-dddde4c684d6)
4. Gartner, "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027," [Gartner Newsroom](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
5. Zichuan Xiong, "The Dangers of AI Agentwashing," [Thoughtworks](https://www.thoughtworks.com/en-us/insights/blog/generative-ai/Agentwashing-and-how-AI-agents-fail-us)
6. "Trust and Reliance on AI: An Experimental Study on the Extent and Costs of Overreliance on AI," [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0747563224002206)
7. "Automation Bias in the AI Act," [Cambridge Core](https://www.cambridge.org/core/journals/european-journal-of-risk-regulation/article/automation-bias-in-the-ai-act-on-the-legal-implications-of-attempting-to-debias-human-oversight-of-ai/C97C85015056C09326944DE55CBC4D2C)
8. Lauren Kahn, Emelia Probasco, and Ronnie Kinoshita, "AI Safety and Automation Bias," [Georgetown CSET](https://cset.georgetown.edu/publication/ai-safety-and-automation-bias/)
9. "Securing AI Agents: The Defining Cybersecurity Challenge of 2026," [Bessemer Venture Partners](https://www.bvp.com/atlas/securing-ai-agents-the-defining-cybersecurity-challenge-of-2026)
10. "AI Agent Security Checklist: Identity, Least Privilege, Monitoring," [HatchWorks](https://hatchworks.com/blog/ai-agents/ai-agent-security/)
11. "Why Least Privilege Is Critical for AI Security," [Varonis](https://www.varonis.com/blog/why-polp-is-critical-for-ai-security)
12. Stanford Law School, "From Fine Print to Machine Code: How AI Agents Are Rewriting the Rules of Engagement," [Stanford CodeX](https://law.stanford.edu/2025/01/21/from-fine-print-to-machine-code-how-ai-agents-are-rewriting-the-rules-of-engagement-2/)
13. Debevoise & Plimpton, "Agent Washing: Disclosure Risks in the Emerging Market for AI Agents," [Debevoise Data Blog](https://www.debevoisedatablog.com/2026/03/25/agent-washing-disclosure-risks-in-the-emerging-market-for-ai-agents/)
