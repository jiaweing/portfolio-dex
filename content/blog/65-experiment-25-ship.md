---
title: "65% experiment, 25% ship"
date: "2026-04-17"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","Notion","Safety","Security"]
---

Every major survey in the past year tells roughly the same story. Around two-thirds of organizations are experimenting with AI agents. Fewer than one in four have shipped them to production. That 40-point gap between playing with agents and running agents is not a curiosity. It is the defining challenge of 2026, and how your team responds to it will determine whether you capture real value or just accumulate demos.
## The stat that should make you uncomfortable
McKinsey's 2025 State of AI survey found that 62% of respondents said their organizations are at least experimenting with AI agents, yet nearly two-thirds have not begun scaling AI across the enterprise. PwC reported that 79% of companies say agents are "being adopted," but Writer's enterprise survey found that 79% of organizations face challenges in adoption and 54% of C-suite executives admitted AI is "tearing their company apart." The enthusiasm is real. The follow-through is not.
This gap is not unique to AI agents. We have seen it before with cloud migration, DevOps, and microservices. The pattern is almost predictable: a new paradigm emerges, early adopters publish glowing case studies, the industry rushes to experiment, and then everyone stalls at the threshold of production. The difference this time is the stakes. Gartner predicts that over 40% of agentic AI projects will be cancelled by the end of 2027 due to escalating costs, unclear business value, or inadequate risk controls. Organizations that stall too long will not just miss a window. They will have burned budget and credibility on experiments that never matured.
## Why the gap exists
The reasons are not mysterious, but they are more structural than most teams want to admit.
**Reliability is the first wall.** In simulation testing by Carnegie Mellon, AI agents failed multi-step tasks nearly 70% of the time. A demo that triages support tickets perfectly in a controlled environment will hallucinate, loop, or silently break when it meets messy real-world data. Production demands consistency, not occasional brilliance.
**Observability barely exists.** Most teams cannot answer basic questions about their agents: What decisions did it make? Why did it choose that path? What would it do differently with different inputs? Without observability, debugging is guesswork and trust is impossible.
**Cost compounds quickly.** A single agent call is cheap. An agent running across thousands of tasks daily, with retries, tool calls, and context windows, is not. Many teams discover their agent's unit economics only after they have committed to a deployment timeline.
**Trust is organizational, not technical.** McKinsey's 2026 trust report found that security and risk concerns are the top barrier to scaling agentic AI, and confidence in organizational response to AI incidents has actually declined even as adoption grows. Engineers might trust the model. Legal, compliance, and the people whose workflows are being automated often do not.
**Integration is the real bottleneck.** As Box CEO Aaron Levie noted after visiting dozens of enterprise AI leaders, the friction blocking agent adoption "has almost nothing to do with the models. It is about legacy data systems, OpEx ceilings, and a shortage of engineers who can wire agents into real workflows." Agents do not operate in isolation. They need to plug into existing systems, permissions, data pipelines, and human processes. Every integration point is a potential failure point.
## The agentwashing problem
Making things worse is a growing credibility crisis. Thoughtworks has called it "agentwashing," where companies claim agentic capabilities that are really just chatbots with a few API calls, or workflows dressed up with the word "agent" in a press release. The concepts of agentic AI, AI agents, and agentic workflows are now used interchangeably, with few tangible outcomes delivered.
Agentwashing does not just mislead buyers. It pollutes the entire ecosystem. Teams that deploy a glorified prompt chain and call it an agent are setting unrealistic internal expectations. When the "agent" fails to handle edge cases, the organization does not blame the implementation. It blames the concept. That makes the next genuine agent project harder to fund and harder to staff.
## The microservices parallel
If this feels familiar, it should. The microservices adoption curve followed a remarkably similar trajectory. The concept emerged in the early 2010s. Netflix and Amazon published case studies. Every engineering team started talking about decomposing their monolith. And then most of them stalled for years.
The reason was the same: the gap between understanding the architecture and actually operationalizing it was enormous. Teams had to rethink deployment pipelines, monitoring, service discovery, data consistency, and organizational structure. The technology was the easy part. The operational maturity was not.
AI agents are following the same curve, just faster. The technology is more accessible than microservices ever were, which means more teams can start experimenting. But the operational requirements, reliability, observability, governance, integration, are just as demanding. Accessibility at the experimentation layer does not reduce complexity at the production layer.
## What the 25% did differently
The organizations that have actually shipped agents to production share a few common patterns. None of them are glamorous.
**They started narrow.** Instead of building a general-purpose agent that could "handle anything," they picked one well-defined task with clear inputs, outputs, and success criteria. Insurance companies processing straightforward claims. Banks handling clear-cut loan approvals. Support teams triaging tickets into three buckets. The scope was deliberately small.
**They kept humans in the loop.** The most successful deployments treat agents as team members, not replacements. As Harvard Business Review argued, the right mental model is not "deploy and forget" but "onboard and supervise." Agents handle the routine cases. Humans handle the exceptions. Over time, the boundary shifts, but it shifts based on evidence, not optimism.
**They followed a one-agent-one-job principle.** Rather than building a multi-agent orchestra on day one, they deployed a single agent for a single job. This made failures diagnosable, costs predictable, and trust buildable. You can always compose agents later. You cannot debug a system you do not understand.
**They invested in plumbing before intelligence.** Clean data pipelines, clear ownership of agent decisions, fallback mechanisms when something goes wrong, structured logging. The boring infrastructure work that never appears in a demo but determines whether an agent survives its first week in production.
**They budgeted for iteration.** Agent development is not a build-once process. The teams that shipped successfully planned for a cycle of deploy, observe, adjust, redeploy. They treated the first production version as a starting point, not a finished product.
I have seen this firsthand running 13+ Notion agents. The ones that became genuine tools, not toys, were the ones with the tightest scope, the clearest success metrics, and the most mundane integration work behind them. The flashy capabilities came later, after the foundation was solid.
## Where the value lives
In every technology wave, the gap between experimentation and production is where all the value concentrates. The teams that cross the gap early set the standards, build the institutional knowledge, and capture the compounding benefits. The teams that linger in experimentation accumulate costs without returns.
The current moment is not about whether AI agents work. They do, in the right contexts, with the right constraints. The question is whether your organization can build the operational muscle to move from a compelling demo to a reliable system. That requires honesty about what agents cannot yet do, discipline about scope, and patience with the unglamorous work of integration and observability.
The 40-point gap will close. It always does. The question is whether you will be in the 25% that closed it early, or the 65% that talked about it.
## References
1. McKinsey, "The State of AI: Global Survey 2025" [mckinsey.com](http://mckinsey.com)
2. PwC, "AI Agent Survey," June 2025 [pwc.com](http://pwc.com)
3. Writer, "Enterprise AI Adoption in 2026" [writer.com](http://writer.com)
4. Gartner, "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027," June 2025 [gartner.com](http://gartner.com)
5. Elementum AI, "Human-in-the-Loop Agentic AI," citing Carnegie Mellon research on agent failure rates [elementum.ai](http://elementum.ai)
6. McKinsey, "State of AI Trust in 2026: Shifting to the Agentic Era" [mckinsey.com](http://mckinsey.com)
7. Forbes, "Enterprise AI Agents Are Entering Production and Changing Who Gets Hired," April 2026 [forbes.com](http://forbes.com)
8. Thoughtworks, "The Dangers of AI Agentwashing" [thoughtworks.com](http://thoughtworks.com)
9. Harvard Business Review, "To Scale AI Agents Successfully, Think of Them Like Team Members," March 2026 [hbr.org](http://hbr.org)
