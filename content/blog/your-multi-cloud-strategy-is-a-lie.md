---
title: "Your multi-cloud strategy is a lie"
date: "2026-04-16"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Cloud","Geopolitics","Security","Regulation","Data Centers","Models","Anthropic","Claude"]
---

Everyone talks about multi-cloud like it's table stakes. Every architecture review, every vendor pitch, every conference keynote, someone will mention their "multi-cloud strategy." But here's the uncomfortable truth: almost nobody actually has one. What most companies have is a single cloud provider they depend on for everything critical, plus a couple of side accounts they barely touch. That's not multi-cloud. That's multi-invoice.
And the stakes just got a lot higher. In March 2026, Iranian drones struck three AWS data centers across the UAE and Bahrain, forcing them offline and causing service outages for banking, payments, and enterprise software across the entire region. Iran's Revolutionary Guard then published a list of 29 additional tech targets, including facilities run by Microsoft, Google, Oracle, Nvidia, and Palantir. For the first time in military history, private-sector cloud infrastructure became a deliberate target of war.
If your disaster recovery plan assumes your cloud provider's data centers won't get bombed, it might be time to revisit that assumption.
## The gap between "multi-cloud" and multi-cloud
There's a meaningful difference between "we use AWS and also have a GCP account" and actual multi-cloud resilience. Most companies land firmly in the first camp.
The typical pattern looks like this: a startup picks AWS (or Azure, or GCP) early on. Over time, the entire stack gets deeply coupled to that provider's IAM, networking model, managed databases, serverless functions, and deployment tooling. Three years in, the switching costs are enormous. Everything from CI/CD pipelines to monitoring dashboards to on-call runbooks is provider-specific.
Then someone in leadership reads an article about vendor lock-in and decides the company needs a "multi-cloud strategy." So they spin up a GCP project, maybe run a few non-critical workloads there, and put it on a slide deck. That's not resilience. That's theater.
Real multi-cloud means your critical workloads can actually run on a different provider within a meaningful timeframe. It means your data can move. It means your team knows how to operate in both environments under pressure, not just during a hackathon.
## The new risk matrix
Traditionally, cloud risk was about uptime, latency, and cost. The questions were predictable: What's the SLA? Where are the availability zones? How much will we pay for egress?
That risk matrix just got a new dimension: geopolitics.
The Iranian strikes on AWS weren't random. They targeted cloud infrastructure precisely because of its dual-use nature, serving both commercial customers and military operations. As AI-enabled warfare becomes mainstream, data centers are no longer just business infrastructure. They're strategic assets, and that makes them strategic targets.
But kinetic attacks are only part of the picture. Consider what else has happened recently:
- The U.S. government designated Anthropic, maker of the Claude AI assistant, as a "supply chain risk to national security" after the company refused to remove certain safety guardrails. The Pentagon blacklisted the company, and defense contractors were told to certify they don't use Anthropic's models. A federal appeals court declined to block the designation.
- Nvidia halted production of its H200 chips for the Chinese market after months of export restriction uncertainty between Washington and Beijing. China, in turn, blocked imports of the same chips.
- The EU continues to grapple with the CLOUD Act, which gives the U.S. government the ability to compel American cloud providers to hand over data stored anywhere in the world, regardless of local privacy laws.
The pattern is clear: cloud services, AI models, and semiconductor supply chains are all becoming leverage points in international disputes. Your cloud provider's availability now depends not just on their engineering, but on which side of a geopolitical line they fall on.
## Multi-model is the same lie
The multi-cloud illusion has a twin in the AI world: the myth of model agnosticism.
Teams love to say they're "model-agnostic." In practice, everything is hardcoded to a specific model's API. Prompts are tuned for one model's quirks. Evaluation pipelines assume specific output formats. The entire application architecture is built around one provider's token limits, pricing tiers, and rate limits.
Then something happens. A model gets deprecated. Pricing doubles. A provider gets blacklisted by your government, or by your customer's government. And suddenly your "model-agnostic" system can't switch to anything without weeks of rework.
The Anthropic situation is a perfect example. Companies that had deeply integrated Claude into their government-adjacent workflows found themselves scrambling when the Pentagon's blacklisting threatened to cascade across federal contracting. If your only plan for model failure is "we'll just switch to GPT-4," you don't have a plan.
Real model portability, like real cloud portability, requires deliberate architecture. It means abstraction layers between your application logic and the model API. It means maintaining evaluation suites that work across providers. It means actually testing failover, not just assuming it'll work.
## What actual portability looks like
So what does real multi-cloud (and multi-model) architecture actually require?
**Containerization and orchestration.** Kubernetes has become the de facto abstraction layer for compute portability. If your workloads run in containers orchestrated by Kubernetes, you have at least a fighting chance of moving them between providers. If they're built on Lambda functions calling DynamoDB through API Gateway, you're welded to AWS.
**Infrastructure as code.** Tools like Terraform and Pulumi let you define infrastructure in provider-agnostic terms (to a degree). The key word is "to a degree," because the moment you use a provider-specific resource type, you've introduced a dependency. The discipline is in minimizing those dependencies for critical paths.
**Abstraction layers for managed services.** This is where it gets expensive. Every managed service you use, whether it's a database, message queue, or identity provider, is a lock-in point. Real portability means either using open-source alternatives you can run anywhere (PostgreSQL instead of Aurora, RabbitMQ instead of SQS) or building translation layers that can swap backends.
**Data portability.** Your data is the hardest thing to move. Egress fees are one barrier, but the real challenge is that cloud-native data formats, indexing, and query patterns are often provider-specific. A serious multi-cloud strategy includes regular data replication to a secondary provider, not as a backup, but as a warm standby.
**Multi-model abstraction for AI.** Companies like TrueFoundry and others are building AI gateways that sit between your application and model providers, routing requests through a unified interface. Your code talks to the gateway; the gateway handles the provider-specific translation. This isn't free, but it's a lot cheaper than rewriting your application when your model provider becomes unavailable.
## The cost of honesty
Here's the part nobody likes to talk about: real multi-cloud is expensive. Not a little more expensive. Significantly more expensive.
Industry analysis from 2026 puts the overhead of genuine multi-cloud abstraction at meaningful multiples of single-cloud costs. A comprehensive multi-cloud toolset alone, spanning management platforms, cost optimization, security posture management, unified monitoring, and disaster recovery, can easily cost \$500K+ per year. That's before you account for the talent premium: engineers fluent in AWS, Azure, and GCP are rare and expensive.
Most companies can't justify this cost. And honestly, for many of them, the rational choice is to accept single-cloud lock-in and manage the risk through other means, contractual protections, geographic distribution within a single provider, or simply accepting the tail risk.
The problem isn't the lock-in itself. Lock-in is a rational economic choice when switching costs exceed the expected value of optionality. The problem is pretending the lock-in doesn't exist. It's putting "multi-cloud" on a strategy document while your entire production stack runs on one provider's proprietary services.
## Singapore's pragmatic middle ground
Singapore offers an interesting case study in navigating these tensions. As a small, wealthy city-state with multiple cloud regions from major providers, Singapore has taken a pragmatic approach to cloud sovereignty.
The Infocomm Media Development Authority (IMDA) introduced advisory guidelines in 2025 to enhance the resilience and security of cloud services and data centers, recognizing that digital services from banking to ride-hailing depend on cloud infrastructure availability. Singapore's Personal Data Protection Act establishes comprehensive data protection obligations that govern how data is handled, without mandating strict data localization.
But Singapore also illustrates the limits of sovereignty in the cloud era. Despite investing over \$1 billion in its National AI Strategy 2.0 and having one of the world's most sophisticated technology governance frameworks, Singapore remains fundamentally dependent on foreign infrastructure for cloud computing, semiconductors, and foundational AI technologies controlled by U.S. and Chinese ecosystems.
That's not a failure of planning. It's an honest acknowledgment of reality. True cloud independence is effectively impossible for any single nation, let alone a city-state of six million people. The best you can do is diversify your dependencies, maintain strong regulatory frameworks, and ensure you have contingency plans that actually work.
## What to actually do
If you've read this far and feel uncomfortable, good. That discomfort is the gap between your strategy document and your actual architecture. Here's how to start closing it:
**Audit your real dependencies.** Map every provider-specific service your critical workloads touch. IAM, networking, databases, queues, serverless functions, ML platforms. Be honest about what would break if that provider became unavailable for a week.
**Classify your workloads by portability priority.** Not everything needs to be portable. Your marketing website can probably stay on one provider forever. Your payment processing system probably can't. Prioritize based on business impact, not engineering elegance.
**Build portable where it matters most.** For your highest-priority workloads, invest in containerization, infrastructure as code, and open-source alternatives to managed services. Accept the cost premium for these specific systems.
**Test your failover.** If you haven't actually moved a critical workload to a secondary provider under realistic conditions, your multi-cloud strategy is untested. Run the drill. Find out what breaks.
**Extend this thinking to AI.** If you're building on a single model provider, ask yourself what happens if that provider doubles its prices, gets blacklisted, or simply degrades in quality. Build abstraction layers now, while the cost is low, not during a crisis.
**Accept what you can't control.** Geopolitical risk is real, but it's not something most companies can hedge against completely. The goal isn't zero risk. It's honest risk assessment and proportionate mitigation.
The companies that will weather the next disruption, whether it's a drone strike on a data center, a government blacklisting an AI provider, or an export ban on critical hardware, won't be the ones with the best slide decks. They'll be the ones who looked honestly at their dependencies and did the hard, expensive, unglamorous work of building real optionality.
Your multi-cloud strategy might be a lie. But it doesn't have to stay one.
## References
1. [Why Iran targeted Amazon data centers and what that does, and doesn't, change about warfare](https://theconversation.com/why-iran-targeted-amazon-data-centers-and-what-that-does-and-doesnt-change-about-warfare-278642), The Conversation
2. [Amazon's cloud business in Bahrain damaged in Iran strike](https://www.reuters.com/world/middle-east/amazons-cloud-business-bahrain-damaged-iran-strike-ft-reports-2026-04-01/), Reuters
3. [Iranian attacks on Amazon data centers in UAE, Bahrain signal a new kind of war](https://fortune.com/2026/03/09/irans-attacks-on-amazon-data-centers-in-uae-bahrain-signal-a-new-kind-of-war-as-ai-plays-an-increasingly-strategic-role-analysts-say/), Fortune
4. [Data Is Now the Front Line of Warfare](https://www.csis.org/analysis/data-now-front-line-warfare), CSIS
5. [Iran threatens Nvidia, Apple and other tech giants with attacks](https://www.cnbc.com/2026/04/01/iran-irgc-nvidia-appple-attack-threat.html), CNBC
6. [US court declines to block Pentagon's Anthropic blacklisting for now](https://www.reuters.com/world/us-court-declines-block-pentagons-anthropic-blacklisting-now-2026-04-08/), Reuters
7. [Where things stand with the Department of War](https://www.anthropic.com/news/where-stand-department-war), Anthropic
8. [Nvidia Stops Chip Production for Chinese Market](https://www.trendingtopics.eu/nvidia-stops-chip-production-for-chinese-market/), Trending Topics
9. [Singapore's AI Strategy and the Limits of Digital Sovereignty](https://cambrianr.substack.com/p/singapores-ai-strategy-and-the-limits), Cambrian
10. [IMDA introduces Advisory Guidelines to enhance the resilience and security of Cloud Services and Data Centres](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2025/advisory-guidelines-of-cloud-services-and-data-centres), IMDA
11. [Multi-Cloud Costs: Hidden Expenses of Abstraction](https://www.ai-infra-link.com/multi-cloud-costs-hidden-expenses-of-abstraction-in-2026/), AI Infra Link
12. [Multi-Cloud Madness: The Complexity That Kills Performance and Security](https://medium.com/@jsocitblog/multi-cloud-madness-the-complexity-that-kills-performance-and-security-fde183c2b4d4), Medium
13. [Vendor Lock-In Prevention with TrueFoundry's AI Gateway](https://www.truefoundry.com/blog/vendor-lock-in-prevention), TrueFoundry
14. [Geopolitical Risks of Over-Reliance on Foreign Cloud Providers](https://www.linkedin.com/pulse/geopolitical-risks-over-reliance-foreign-cloud-andre-oazje), LinkedIn
