---
title: "Every app wants to be an agent"
date: "2026-04-11"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Open any SaaS product's marketing page in 2026 and you'll find it: "Now with agentic AI." Salesforce has agents. Notion has agents. Your project management tool, your CRM, your email client, even your expense tracker, they all want to be agents now.
But here's the thing most of these announcements gloss over: the vast majority of what's being sold as "agentic AI" isn't agentic at all. It's automation with a language model in the loop. The gap between agentic marketing and agentic reality has become the defining tension of this AI cycle, and it's worth understanding why.
## What "agentic" actually means
The term gets thrown around so loosely that it's worth anchoring on a definition. An AI agent, in the meaningful sense, takes a goal, decomposes it into steps, executes those steps using tools, and handles failures autonomously. It reasons about what to do next based on what just happened. It adapts.
Google Cloud defines agentic AI as "an advanced form of artificial intelligence focused on autonomous decision-making and action," distinct from traditional AI that "primarily responds to commands or analyzes data." MIT Sloan's researchers describe agents as systems that can "act and make decisions in a way a human might," going beyond the generate-and-respond pattern of generative AI.
That's a high bar. And most products calling themselves "agentic" don't clear it.
## The agentwashing problem
A 2026 survey on the state of agentic orchestration found that 71% of organizations claim to use AI agents, but only 11% have actually reached production. Even more telling: 80% of what organizations call "agents" are really just chatbots or simple LLM calls with basic prompts. The investment is massive. The actual autonomy is minimal.
This isn't just a branding problem. Debevoise & Plimpton, a major law firm, published a note in March 2026 warning that "agent washing" creates "heightened securities disclosure risk beyond traditional AI washing." When companies market AI agents as drivers of growth and efficiency, imprecise or inflated claims about autonomy and functionality become legally testable. The hype has gotten loud enough that regulators are paying attention.
"Agentic" has become the new "AI-powered," a label companies slap on anything that runs in a loop. Most aren't agents. They're cron jobs with GPT.
## Why most agentic products fail in practice
Gartner predicts that over 40% of agentic AI projects will be canceled by the end of 2027, due to escalating costs, unclear business value, or inadequate risk controls. MIT research puts the number even higher, finding that 95% of AI pilots don't survive contact with the real world.
The reasons are predictable. As OutSystems noted in their 2026 report, real enterprise environments involve constantly changing APIs, incomplete or messy data, conflicting business rules, complex identity and permissioning models, and non-deterministic behavior leading to unpredictable outcomes. Demos look spectacular. Production environments break them.
The fantasy of a "universal agent" that can do everything, plan your quarter, write your code, manage your calendar, negotiate your contracts, remains just that: a fantasy. The systems that actually work in production are narrowly scoped and deliberately constrained.
## The agents that are actually shipping
The interesting pattern in 2026 isn't the grand vision of autonomous AI running your business. It's the quiet success of narrow agents that do one thing well.
GitHub Copilot doesn't try to be your entire engineering team. It writes code suggestions, runs in agent mode to plan and execute within a codebase, and hands off work asynchronously. Critically, it can create code changes but not merge them. The constraint is the feature.
Cursor takes a similar philosophy: deep integration with the coding workflow, strong context awareness, but always scoped to what a developer is actually doing. These tools aren't replacing developers. They're making the feedback loop tighter.
Notion's agents follow the same pattern. They operate within a defined workspace, with explicit permissions, on specific databases and pages. The agent is scoped and constrained by design, not because the technology can't do more, but because that's what makes it reliable.
The "one agent, one job" philosophy is winning over the Swiss-army-knife approach. The agents that ship are the ones with clear boundaries.
## The security crisis nobody's ready for
Every app becoming an agent means every app now has autonomous access to your data. This is the part of the agentic revolution that should keep CISOs up at night.
McKinsey reports that 80% of organizations have already encountered risky behaviors from AI agents, including improper data exposure and unauthorized system access. Gartner predicts that by 2028, 25% of all enterprise GenAI applications will experience at least five minor security incidents per year, up from 9% in 2025.
The core issue is what security researchers call the "root permissions" problem. When an agent can take action on behalf of a human across multiple systems, every step in that chain becomes a potential risk surface. Unlike a human employee, an agent doesn't pause to ask whether something seems off. It just executes.
OutSystems found that 94% of organizations are concerned that AI sprawl is increasing complexity, technical debt, and security risk. Yet only 12% use a centralized platform to manage it. Permission sprawl, where every agentic integration gets broad access to function, is the next major security crisis. And most organizations are sleepwalking into it.
As Ken Johnson, CTO of DryRun Security, puts it: "Autonomy plus authority creates behavioral risk, not just code risk." The best implementations deliberately constrain authority. Security agents can explain why a change is risky but require human approval before acting. Incident response agents can gather context but not remediate on their own. The pattern is clear: useful agents need guardrails, not freedom.
## Jevons paradox for agents
Here's the counterintuitive thing about making agents cheaper and easier to build: you don't get fewer of them. You get more.
Jevons paradox, the 19th-century observation that making coal more efficient to use led to more coal consumption rather than less, applies directly to AI agents. When Satya Nadella shared the concept's Wikipedia page after DeepSeek's efficiency breakthrough, he was making this exact point: "As AI gets more efficient and accessible, we will see its use skyrocket."
Organizations now manage an average of 50 endpoints per business process, and that number is growing at 14% year over year. Every business process that gets an agent spawns new monitoring, orchestration, and governance needs. The complexity doesn't disappear. It shifts from code to orchestration.
This is why the competitive advantage in 2026 won't come from having the best models. Models are commoditizing fast. It will come from orchestration, how well you design agent interactions, escalation paths, failure handling, and governance. The IBM community frames it well: the organizations that win will be the ones that figure out how to manage the explosion of agents, not just deploy them.
## The honest middle ground
None of this means agentic AI is worthless. Some agentic products are genuinely useful. The critique isn't about the technology. It's about the label inflation.
The real value of the agentic paradigm is in making software more adaptive and context-aware. A tool that can break down a task, use multiple data sources, and adjust its approach based on results is genuinely better than one that just responds to prompts. That's a real improvement.
But calling every LLM-powered automation an "agent" dilutes the term and sets expectations that can't be met. When everything is agentic, nothing is. And the companies that will actually win this cycle are the ones building boring, reliable, narrowly scoped agents that do real work, not the ones writing the most impressive press releases.
The gap between the agentic future we're being sold and the one we're actually living in is wide. It will close. But it won't close because every app slapped an "agent" label on its existing automation. It will close when the tooling, security models, and orchestration layers catch up to the ambition.
Until then, the next time a SaaS company tells you their product is now "agentic," ask a simple question: can it actually take a goal, plan the steps, execute them, and recover from failure on its own? If the answer is "well, sort of," you're probably looking at a cron job with GPT.
## References
1. [Agentic AI, explained](https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained), MIT Sloan School of Management
2. [What is agentic AI?](https://cloud.google.com/discover/what-is-agentic-ai), Google Cloud
3. [Agent Washing: Disclosure Risks in the Emerging Market for AI Agents](https://www.debevoise.com/insights/publications/2026/03/agent-washing-disclosure-risks-in-the-emerging), Debevoise & Plimpton LLP, March 2026
4. [I read "2026 State of Agentic Orchestration & Automation Report"](https://www.reddit.com/r/AI_Agents/comments/1qdh21i/i_read_2026_state_of_agentic_orchestration/), Reddit summary of industry report
5. [Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), Gartner, June 2025
6. [Agentic AI Goes Mainstream in the Enterprise, but 94% Raise Concern About Sprawl](https://www.businesswire.com/news/home/20260407749542/en/Agentic-AI-Goes-Mainstream-in-the-Enterprise-but-94-Raise-Concern-About-Sprawl-OutSystems-Research-Finds), OutSystems via BusinessWire, April 2026
7. [The Enterprise AI Reality Check: 10 Predictions for 2026](https://www.outsystems.com/blog/posts/2026-enterprise-ai-predictions/), OutSystems
8. [Deploying agentic AI with safety and security](https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/deploying-agentic-ai-with-safety-and-security-a-playbook-for-technology-leaders), McKinsey & Company
9. [Agentic AI Is Changing The Security Model For Enterprise Systems](https://www.forbes.com/sites/heatherwishartsmith/2026/03/07/agentic-ai-is-changing-the-security-model-for-enterprise-systems/), Forbes, March 2026
10. [Gartner Predicts 25% of All Enterprise GenAI Applications Will Experience At Least Five Minor Security Incidents Per Year By 2028](https://www.gartner.com/en/newsroom/press-releases/2026-04-09-gartner-predicts-25-percent-of-all-enterprise-gen-ai-applications-will-experience-at-least-five-minor-security-incidents-per-year-by-2028), Gartner, April 2026
11. [Why the AI world is suddenly obsessed with Jevons paradox](https://www.npr.org/sections/planet-money/2025/02/04/g-s1-46018/ai-deepseek-economics-jevons-paradox), NPR Planet Money
12. [Agentic AI Beyond the Hype: What 2026 Actually Looks Like from the Trenches](https://community.ibm.com/community/user/discussion/agentic-ai-beyond-the-hype-what-2026-actually-looks-like-from-the-trenches), IBM Community
13. [The Agentic AI Revolution: 7 Breakthroughs Reshaping Tech in April 2026](https://www.switas.com/articles/the-agentic-ai-revolution-7-breakthroughs-reshaping-tech-in-april-2026), Switas
