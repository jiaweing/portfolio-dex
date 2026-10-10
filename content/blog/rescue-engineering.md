---
title: "Rescue engineering"
date: "2026-04-29T15:09:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["LLMs","Agents","OpenAI","Prompt Engineering","Coding","Documentation","Testing","Security"]
---

Vibe coding made building software fast. Rescue engineering is the emerging discipline of making that software actually work.
When Andrej Karpathy coined the term "vibe coding" in February 2025, he described a workflow where you "fully give in to the vibes, embrace exponentials, and forget that the code even exists." It was playful, honest, and immediately resonant. Within weeks, a quarter of Y Combinator startups reportedly had codebases that were 95% AI-generated. By the end of 2025, "vibe coding" had been named Collins Dictionary's Word of the Year.
But something predictable happened next. The prototypes shipped. The demos impressed. And then things started breaking in ways nobody fully understood, because nobody had fully read the code in the first place.
Rescue engineering is the practice of taking over fragile, AI-generated codebases and turning them into professional, maintainable software. It is not a rebrand of legacy code cleanup. It is a distinct discipline born from a distinct problem: software that looks modern, passes surface-level review, and still collapses under real-world pressure.
## Why vibe-coded software breaks differently
Traditional technical debt accumulates over years. A team makes trade-offs, cuts corners under deadline pressure, and the codebase slowly degrades. Everyone involved at least understands what they built and why.
Vibe-coded technical debt is different. It arrives fully formed on day one.
The code often looks clean. It follows conventions. It might even have comments. But the architecture is implicit, meaning it emerged from a sequence of prompts rather than deliberate design decisions. Relationships between components exist but are undocumented and fragile. The developer knows the software works but often cannot explain why it works, because there was no reasoning process behind the structure, just a series of accepted suggestions.
This creates what some engineers call "shallow understanding" debt. When behavior changes or a bug surfaces, nobody is confident about the blast radius. A fix in one place cascades unpredictably because the system's internal logic was never consciously designed.
The numbers back this up. According to Stack Overflow's 2025 Developer Survey, 84% of developers now use or plan to use AI tools, but favorable sentiment has dropped from 77% to 60%. Developers are adopting the tools while trusting them less. That gap is where rescue engineering lives.
## What rescue engineers actually do
A rescue engagement typically starts with an audit. The engineer reads the codebase, not to judge how it was built, but to understand what it actually does versus what it was supposed to do. This is harder than it sounds when the original builder might not have read much of the code either.
From there, the work usually follows a pattern:
- **Stabilization first.** Fix the things that are actively breaking or pose security risks. Authentication bugs, exposed API keys, unvalidated inputs, these are common in vibe-coded projects because AI models optimize for functionality, not for adversarial conditions.
- **Architecture recovery.** Document the implicit architecture that emerged from the AI generation process. Make the relationships between components explicit. Identify which abstractions are load-bearing and which are decorative.
- **Selective refactoring.** The goal is not to rewrite everything from scratch. It is to surgically fix the parts that matter, the security model, the data layer, the state management, while preserving the parts that work fine.
- **Knowledge transfer.** Ensure the team actually understands the codebase they are maintaining. This often means pairing sessions, documentation, and establishing code review processes that did not exist during the vibe coding phase.
The best rescue engineers resist the temptation to start over. A full rewrite is only necessary when the architecture is fundamentally wrong. In most cases, the AI-generated foundation is salvageable, it just needs someone who understands software engineering principles to shore it up.
## The business of rescue
Rescue engineering is already becoming a market. Companies like Vibe Code Rescue, Future Wonder, and Designli have built service offerings specifically around stabilizing AI-generated codebases. Consulting firms are adding "vibe code cleanup" to their portfolios. Freelance developers report that rescue work is some of the most in-demand and well-compensated work available right now.
The typical engagement costs between \$1,000 and \$10,000 for a simple cleanup, and \$5,000 to \$50,000 or more for a full production hardening effort. That might sound expensive until you compare it to the cost of a security breach or a product that cannot scale past its first hundred users.
This pattern is not new in the history of technology. Every time a new tool dramatically lowers the barrier to creation, a secondary market emerges around quality and reliability. WordPress made it easy to build websites, and an entire ecosystem of WordPress maintenance and optimization services followed. No-code tools created demand for developers who could extend and fix no-code projects. Vibe coding is following the same trajectory, just faster.
## Harness engineering is not rescue engineering
It is worth distinguishing rescue engineering from another emerging concept: harness engineering.
In February 2026, OpenAI published a blog post describing how a small team shipped a product with zero lines of manually written code. The key insight was that the humans did not write code. They designed the environment the AI agents worked inside, defining constraints, feedback loops, documentation structures, and dependency rules. The agents wrote the code. The humans designed the system that made the agents reliable.
Harness engineering is proactive. It is about setting up the right scaffolding before the AI starts generating code, so the output is reliable from the beginning. Rescue engineering is reactive. It is about cleaning up after the scaffolding was missing.
Both are valuable. Both require deep engineering knowledge. But they sit on opposite ends of the timeline. The ideal scenario is that harness engineering makes rescue engineering unnecessary. The realistic scenario is that most teams will need both, harness engineering for new projects and rescue engineering for the prototypes that already shipped without guardrails.
## The skills that matter
Rescue engineering demands a specific combination of skills that is surprisingly rare:
- **Code reading over code writing.** Most engineering training emphasizes building from scratch. Rescue work is primarily about understanding code someone else (or something else) generated. It is closer to forensic analysis than greenfield development.
- **Architectural intuition.** You need to see the system's actual structure, not the structure its creator intended. AI-generated code often has redundant abstractions, circular dependencies, and patterns that look intentional but are accidental.
- **Security mindset.** AI models are notorious for generating code that works but is not secure. Common issues include hardcoded credentials, SQL injection vulnerabilities, missing input validation, and overly permissive API configurations.
- **Communication.** Rescue engineers frequently work with non-technical founders or teams that built their product with AI tools. Explaining what is wrong and what needs to change, without making people feel judged for how they built it, is a core part of the job.
## Where this is going
The demand for rescue engineering will likely peak and then gradually decline, not because the problems go away but because the tools get better at preventing them. AI coding assistants are already improving at generating tests, flagging security issues, and maintaining architectural consistency. Code review tools like CodeRabbit are specifically designed to catch the kinds of problems that vibe coding introduces.
In the near term, though, we are sitting on what some commentators have called the largest technical debt crisis in software history. Millions of applications have been built quickly with AI tools by people who may not fully understand what they shipped. Many of those applications handle real user data, process real payments, and run real businesses.
Someone has to fix them. That someone is the rescue engineer.
The irony is worth noting. The same AI revolution that created the problem is also changing the nature of the solution. Rescue engineers themselves use AI tools extensively, for code analysis, for generating tests, for identifying patterns across large codebases. The difference is that they understand what the tools are doing and can verify the results.
Vibe coding lowered the floor for software creation. Rescue engineering exists to raise the ceiling back up.
## References
1. Andrej Karpathy's original "vibe coding" tweet, February 2025. [x.com/karpathy/status/1886192184808149383](http://x.com/karpathy/status/1886192184808149383)
2. "Vibe coding" Wikipedia article, documenting the term's origin and cultural impact. [en.wikipedia.org/wiki/Vibe_coding](http://en.wikipedia.org/wiki/Vibe_coding)
3. OpenAI, "Harness engineering: leveraging Codex in an agent-first world," February 2026. [openai.com/index/harness-engineering](http://openai.com/index/harness-engineering)
4. Stack Overflow 2025 Developer Survey on AI tool adoption and sentiment. [survey.stackoverflow.co/2025](http://survey.stackoverflow.co/2025)
5. "AI is Rewriting the Developer Job Description: Skills Companies Need in 2026," Crossbridge Global Partners. [gocrossbridge.com/blog/skills-companies-need-in-2026](http://gocrossbridge.com/blog/skills-companies-need-in-2026)
6. "The Hidden Risks of Vibe Coding and the Technical Debt It Leaves Behind," Amplifi Labs. [amplifilabs.com/post/the-hidden-risks-of-vibe-coding](http://amplifilabs.com/post/the-hidden-risks-of-vibe-coding)
7. "Vibe Coding Rescue: Scaling Your AI MVP to Production," Outsourcify. [outsourcify.net/vibe-coding-rescue](http://outsourcify.net/vibe-coding-rescue)
8. "Google developers find that with AI, judgment is more important than JavaScript," Business Insider, March 2026. [businessinsider.com/ai-coding-changing-software-developer-role-2026-3](http://businessinsider.com/ai-coding-changing-software-developer-role-2026-3)
9. "How vibe coding cleanup specialists turn AI prototypes into products," MITRIX Technology. [mitrix.io/blog/how-vibe-coding-cleanup-specialists-turn-ai-prototypes-into-products](http://mitrix.io/blog/how-vibe-coding-cleanup-specialists-turn-ai-prototypes-into-products)
