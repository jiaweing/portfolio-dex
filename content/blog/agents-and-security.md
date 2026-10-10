---
title: "Agents and security"
date: "2026-03-05"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Nobody trusts AI to book a flight ticket today. Yet every tech demo seems to use travel as the showcase example. The itineraries AI spits out are still mediocre at best. And travel is just the tip of the iceberg, because the real question underneath is much bigger: **how much power should we actually give an AI agent?**
Give it too few tools and too many restrictions, and it becomes useless. Give it too much access, and it becomes a massive security risk. This is the central tension of the AI agent era, and nobody has a clean answer yet.
## The travel demo problem
Travel planning has become the default demo for AI agents. It sounds compelling: tell the agent where you want to go, and it books your flights, reserves your hotels, finds restaurants. Autonomous, end-to-end, no friction.
But the reality is far less polished. A BBC investigation found that AI travel recommendations are riddled with inaccuracies, from hallucinated restaurants to nonsensical directions. Microsoft's AI travel guide for Ottawa once recommended tourists visit the city's food bank as a top attraction. A Skift report from March 2026 found that **only 2% of leisure travelers** are willing to let AI book on their behalf, even as the industry pours billions into building these tools.
The reason travel keeps showing up in demos is that it *looks* like a solved problem. The steps are clear: search, compare, book. But in practice, travel planning is full of subjective judgment, edge cases, and high-stakes decisions where mistakes cost real money. It is a perfect illustration of why the agent trust gap exists.
## The trust gap in numbers
The disconnect between builders and buyers is staggering. An IBM survey from 2025 found that **99% of developers** are exploring or developing AI agents. But a Harvard Business Review survey of 603 business leaders found that **only 6% fully trust AI agents** with essential end-to-end business processes.
That is not a gap. That is a canyon.
A G2 survey found that 57% of B2B companies have already put agents into production, yet 63% say their agents need more human supervision than expected. Less than half trust agents to make autonomous decisions even with guardrails. Only 8% are comfortable giving agents total autonomy.
Companies are deploying agents they do not trust because competitive pressure demands it. As one analysis put it, "We're speed-running the 'oops' phase of a major technology shift."
## The permissions dilemma
This is where security enters the picture, and it is not a simple problem to solve.
An AI agent is, fundamentally, a new kind of operator in your system. It can read data, write records, call APIs, send emails, and trigger workflows. Every one of those capabilities is a potential attack surface.
**Too little access, and agents are useless.** If an agent's job is to manage your calendar but it cannot read your email for context, it will produce generic, unhelpful results. If a customer service agent cannot look up order history, it is worse than a FAQ page. The whole promise of agents is that they can act autonomously, and autonomy requires access.
**Too much access, and agents become dangerous.** Okta documented critical vulnerabilities (scoring 9.3 to 9.4 on the CVSS scale) across Anthropic, Microsoft, ServiceNow, and Salesforce platforms in 2025. The pattern was consistent: agents retrieved data using one person's permissions but output it to shared spaces where recipients had different access levels. A CFO's agent in a Slack channel could expose executive compensation data to junior analysts.
Air Canada's chatbot provided false information about bereavement fare policies, leading to a tribunal ruling that businesses bear full responsibility for their AI agents' statements. McDonald's terminated its AI voice ordering partnership with IBM after the system repeatedly added items to orders unprompted, reaching 260 items in a single order in one viral incident.
The AI Incident Database recorded 233 documented AI incidents in 2024 alone, a 56% increase from the previous year. And those are just the ones that got reported.
## Why traditional security models break down
The standard approach to access control in software is Role-Based Access Control (RBAC). You define roles, assign permissions to those roles, and give users a role. It is straightforward, predictable, and well-understood.
AI agents break this model in several ways.
**Agents are non-deterministic.** The same input can produce different actions depending on context, conversation history, and model behavior. You cannot predict exactly what an agent will do, which means you cannot pre-define a fixed set of permissions that covers every scenario safely.
**Agents inherit permissions in unpredictable ways.** When an agent acts on behalf of a user, whose permissions should it use? The user's? A restricted subset? What happens when the agent serves multiple users with different access levels? The Okta research showed this is not a theoretical concern, it is already causing real breaches.
**Agents chain actions together.** A single user request can trigger a multi-step workflow: read from a database, process the data, call an external API, write results back, send a notification. Each step might be individually authorized, but the *combination* of steps could produce an outcome no one intended or approved.
Security researchers are increasingly arguing that agents need **Policy-Based Access Control (PBAC)** instead, where authorization decisions are made in real time based on context, not just static roles. Zero trust principles, originally designed for network security, are being adapted for AI: never trust, always verify, for every single action.
## What the smart companies are doing
Not everyone is deploying blindly. Some organizations are building governance frameworks alongside the technology, and the results suggest that careful deployment actually works.
**Walmart** built an "AI Super Agent" that ingests real-time point-of-sale data, supply chain inputs, weather patterns, and local trends to forecast demand. But it has hard limits: it cannot order more than 120% of historical maximum for any product without human review, and it cannot initiate orders exceeding \$50,000 without approval. The result was a 22% increase in e-commerce sales in pilot regions.
**Wells Fargo** is deploying agents across the company with a structured governance approach. Every agent has a unique identifier, a defined purpose, and documented capabilities. Agents are classified into risk levels with corresponding approval workflows. Critical processes require human confirmation. All interactions are logged and reviewed.
The pattern across successful deployments is the same: **narrow scope, hard limits, and human checkpoints for high-stakes decisions.**
As one AI governance expert put it, "The most trustworthy agents are boringly narrow in their ability. The broader and freer rein the agent has, the more that can go wrong."
## The emerging framework: permissions, policies, and proof
A practical security model for AI agents is starting to take shape around three pillars.
**Permissions:** Apply the principle of least privilege aggressively. If an agent's job is to read from a database, it should not have write access. If it only needs one API endpoint, it should not have keys to the entire API. Over-permissioning turns a minor safety failure into a catastrophe.
**Policies:** Define behavioral guardrails that go beyond static permissions. If an agent suddenly starts bulk downloading data, triggers unusual API calls, or operates outside normal patterns, the system should automatically restrict access without waiting for a human to notice.
**Proof:** Every agent action should be logged, auditable, and explainable. When something goes wrong (and it will), you need a clear trail of what the agent did, why it did it, and what data it accessed. Without proof, you cannot learn from failures or demonstrate compliance.
## The kill switch matters more than the model
The companies navigating this moment successfully are not the ones with the most capable agents. They are the ones with the best circuit breakers.
The question is shifting from "How do I trust this agent completely?" to "What is my containment plan when it fails?" Because agents will fail. Models hallucinate. Permissions get misconfigured. Edge cases surface in production that no one anticipated.
The goal is not to build perfect agents. It is to build systems where agent failures are **small, contained, and recoverable**. That means narrow scopes, hard spending limits, mandatory human review for high-risk actions, real-time monitoring, and the ability to shut things down instantly.
We are in the early innings of figuring this out. The industry is writing the rulebook while the game is already in play. But the direction is clear: the future of AI agents is not about removing humans from the loop entirely. It is about designing the loop so that humans stay in control of the things that matter most.
## References
1. Skift, "Travel Brands Are Building AI Agents for a Consumer That Doesn't Exist," March 2026. [Link](https://skift.com/2026/03/03/travel-brands-are-building-ai-agents-for-a-consumer-that-doesnt-exist/)
2. BBC Travel, "The Perils of Letting AI Plan Your Next Trip," September 2025. [Link](https://www.bbc.com/travel/article/20250926-the-perils-of-letting-ai-plan-your-next-trip)
3. CIO, "Agentic AI Has Big Trust Issues," November 2025. [Link](https://www.cio.com/article/4087765/agentic-ai-has-big-trust-issues.html)
4. Siddharth Kandola, "The AI Agent Trust Gap: Why Companies Are Deploying What They Don't Trust," Medium, January 2026. [Link](https://medium.com/@siddharth.kandola/the-ai-agent-trust-gap-why-companies-are-deploying-what-they-dont-trust-867cba0d39aa)
5. Okta, "AI Agent Security: The Authorization Gap in Shared Workspaces." [Link](https://www.okta.com/blog/ai/ai-agent-authorization-gap/)
6. Obsidian Security, "Top AI Agent Security Risks and How to Mitigate Them." [Link](https://www.obsidiansecurity.com/blog/ai-agent-security-risks)
7. Dark Reading, "2026: The Year Agentic AI Becomes the Attack-Surface Poster Child." [Link](https://www.darkreading.com/threat-intelligence/2026-agentic-ai-attack-surface-poster-child)
8. Nexumo, "The Agentic AI Security Model That Actually Holds Up," Medium, January 2026. [Link](https://medium.com/@Nexumo_/the-agentic-ai-security-model-that-actually-holds-up-e96976ef22f9)
9. CyberArk, "AI Agents and Identity Risks: How Security Will Shift in 2026." [Link](https://www.cyberark.com/resources/blog/ai-agents-and-identity-risks-how-security-will-shift-in-2026)
10. [Dev.to](http://Dev.to), "AI Agent Security vs. Safety: 5 Essential Best Practices for Developers." [Link](https://dev.to/alessandro_pignati/ai-agent-security-vs-safety-5-essential-best-practices-for-developers-4g2a)
