---
title: "The age of reliable software"
date: "2026-04-13T02:41:00.000+08:00"
lastEdited: "2026-04-29T12:50:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Testing","Documentation","Coding","LLMs","Prompt Engineering","Safety","Security","Cloud","Google","Notion"]
---

Everyone is talking about what AI can build. Few people are talking about what keeps breaking.
Over the past year, we've watched some of the most critical infrastructure in tech buckle under the weight of AI-driven changes. AWS suffered a 13-hour outage after an AI coding assistant decided the best way to fix a problem was to delete and recreate an entire environment. GitHub has published monthly availability reports documenting repeated degraded performance across its services. The CrowdStrike incident in July 2024, while not AI-caused, reminded the entire industry what happens when a single faulty software update cascades across 8.5 million systems worldwide, costing an estimated \$5.4 billion in direct losses to the Fortune 500 alone.
The pattern is clear: software is getting faster to produce, but not more dependable. And in a world increasingly run by software, that gap matters more than ever.
## The speed trap
AI code generation is accelerating at a staggering pace. Around 41% of all code written in 2025 was AI-generated, and that number is expected to cross 50% by late 2026 in organizations with high AI adoption. Google reports that 25% of its code is now AI-assisted. The 2025 DORA State of AI-assisted Software Development report found that 90% of technology professionals use AI at work, with over 80% believing it has increased their productivity.
But here's the uncomfortable finding: higher AI adoption is associated with an increase in both software delivery throughput *and* software delivery instability. Teams are shipping faster, yes, but they're also breaking things more often.
The data backs this up across multiple studies. AI-assisted pull requests have 1.7 times more issues than human-authored ones. Technical debt increases 30 to 41% after AI tool adoption. Change failure rates are up 30%, and incidents per pull request are up 23.5%. A study by METR found that when experienced open-source developers used AI tools, they actually took 19% longer to complete tasks, despite believing AI had sped them up by 20%.
This is the speed trap. We're moving faster, but we're not moving better.
## Vibe coding and the reliability gap
There's a term that's gained traction in developer circles: "vibe coding." It describes the practice of letting AI generate code based on loose prompts, accepting the output with minimal review, and hoping it works. As one widely shared critique put it, "This isn't engineering, it's hoping."
The problem isn't that AI-generated code is always bad. It's that it's unpredictable. Unlike human code, where error rates correlate with developer experience, AI code quality is essentially random. Every line requires verification regardless of how plausible it looks. You can't skim it the way you'd trust a senior developer's work, because there's no accumulated judgment behind it.
Research from CodeRabbit found that AI-generated code had up to 75% more logic and correctness issues in areas likely to contribute to downstream incidents. Performance regressions from AI were roughly 8 times more common than from human developers. Security vulnerabilities appear in 45% of AI-generated code samples.
So while everyone races to ship more, the organizations that will win are the ones that ship *reliably*.
## Why reliability is the real moat
I think about this a lot. In a landscape where everyone has access to the same AI tools, the same models, the same ability to generate code and content at unprecedented speed, what actually differentiates you?
It's not novelty. It's not being cutting edge. It's being reliable.
People don't want software that's impressive in a demo but unpredictable in daily use. They want something that works, consistently, every time they reach for it. If your tool is incredibly powerful but breaks during a critical moment, it doesn't matter how many features it has. Trust evaporates instantly, and trust is hard to rebuild.
The IEEE Computer Society has increasingly emphasized reliability as a core system design concern rather than an operational afterthought. In modern distributed, cloud-native platforms delivering mission-critical services, the cost of unreliable software has shifted from inconvenience to existential risk. Outages today can halt financial transactions, disrupt supply chains, and erode user trust within minutes.
There has to be a balance between reliability and usefulness. Software that never breaks but does nothing useful isn't valuable either. But the current imbalance is heavily skewed toward speed and features at the expense of dependability. The teams that correct this imbalance, that treat reliability as a feature rather than a chore, are the ones building lasting products.
## The amplifier effect
One of the most insightful findings from the 2025 DORA report is that AI acts as an amplifier. It magnifies an organization's existing strengths and weaknesses. Teams with strong engineering practices, good testing culture, and clear architectural standards use AI to become even better. Teams without those foundations use AI to produce more technical debt, faster.
This makes sense intuitively. If your codebase is well-structured and your review process is rigorous, AI-generated code slots in more cleanly. If your codebase is already tangled and your reviews are cursory, AI just accelerates the entropy.
The practical implication is that the greatest returns on AI investment come not from the tools themselves, but from investing in the underlying organizational system. Process, culture, testing, documentation, all of these "boring" fundamentals are what determine whether AI helps or hurts.
## What reliable software actually looks like
I've been thinking about what makes software feel reliable in daily use, and I keep coming back to a few qualities:
**Consistency.** The software behaves the same way every time. There are no surprises, no random failures, no "it worked yesterday but not today" moments. You develop muscle memory because the tool is predictable.
**Availability.** It's there when you need it. Not intermittently down, not degraded, not showing error messages during peak hours. Reliable software respects the fact that your work depends on it.
**Graceful handling of edge cases.** Things will go wrong, inputs will be unexpected, networks will be flaky. Reliable software handles these situations without catastrophic failure. It degrades gracefully rather than crashing spectacularly.
**Transparency.** When something does go wrong, reliable software tells you what happened and helps you recover. It doesn't silently corrupt your data or leave you guessing.
I've experienced this firsthand. I've been using Notion heavily to run my company since the start of the year, and the AI features are a good example of what reliability looks like in practice. The output is consistent, it does what I expect, and I can rely on it to actually handle my workflows. That consistency is worth more to me than any flashy feature that works half the time. For the price of a single AI subscription, the value I get from something that just works, reliably, day after day, is hard to overstate.
## Building for reliability in an AI world
If you're building software today, here's what the research and recent incidents suggest you should prioritize:
**Treat AI output as a starting point, not a finished product.** Every AI-generated line of code needs review. The productivity gains are real, but only if you invest the saved time into verification and testing rather than just shipping faster.
**Measure stability, not just velocity.** Track change failure rates, incident frequency, and mean time to recovery alongside deployment frequency. Speed without stability is just chaos with better metrics.
**Invest in the foundations.** Testing infrastructure, code review processes, monitoring, documentation. These are the systems that determine whether AI amplifies your strengths or your weaknesses.
**Design for failure.** Assume things will break. Build redundancy, implement circuit breakers, plan for graceful degradation. The CrowdStrike incident showed that even trusted security software can bring down millions of systems if failure modes aren't properly contained.
**Value boring technology.** Not every component needs to use the latest framework or the newest AI model. Sometimes the most reliable choice is the well-understood, battle-tested one.
## The bottom line
We're in an era where anyone can build software quickly. AI has democratized code generation in ways that would have seemed impossible a few years ago. But the ability to build quickly was never the hard part. The hard part has always been building something that works, keeps working, and earns the trust of the people who depend on it.
In a world full of fast, fragile software, reliability is a competitive advantage. It might not be as exciting as the latest AI breakthrough, but it's what people actually need. And right now, just having a system that works consistently is already enough to be ahead.
## References
1. [Amazon's cloud 'hit by two outages caused by AI tools last year'](https://www.theguardian.com/technology/2026/feb/20/amazon-cloud-outages-ai-tools-amazon-web-services-aws), The Guardian, February 2026
2. [2024 CrowdStrike-related IT outages](https://en.wikipedia.org/wiki/2024_CrowdStrike-related_IT_outages), Wikipedia
3. [What the 2024 CrowdStrike Glitch Can Teach Us About Cyber Risk](https://hbr.org/2025/01/what-the-2024-crowdstrike-glitch-can-teach-us-about-cyber-risk), Harvard Business Review, January 2025
4. [How AI Is Reshaping Software Development and the Tech Industry in 2026](https://medium.com/@tobore/how-ai-is-reshaping-software-development-and-the-tech-industry-in-2026-4ec7f7a801df), Medium, February 2026
5. [Balancing AI tensions: Moving from AI adoption to effective SDLC use](https://dora.dev/insights/balancing-ai-tensions/), DORA, March 2026
6. [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), METR, July 2025
7. [AI-Generated Code Quality and the Challenges we all face](https://agilepainrelief.com/blog/ai-generated-code-quality-problems/), Agile Pain Relief
8. [2025 was the year of AI speed. 2026 will be the year of AI quality](https://coderabbit.ai/blog/2025-was-the-year-of-ai-speed-2026-will-be-the-year-of-ai-quality), CodeRabbit
9. [The Evidence Against Vibe Coding: What Research Reveals About AI Code Quality](https://www.softwareseni.com/the-evidence-against-vibe-coding-what-research-reveals-about-ai-code-quality/), SoftwareSeni
10. [Reliability as a First-Class Software Engineering Requirement](https://www.computer.org/publications/tech-news/trends/software-reliability), IEEE Computer Society
11. [Announcing the 2025 DORA Report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report), Google Cloud Blog
12. [Vibe coding is not the same as AI-Assisted engineering](https://medium.com/@addyosmani/vibe-coding-is-not-the-same-as-ai-assisted-engineering-3f81088d5b98), Addy Osmani, Medium, November 2025
