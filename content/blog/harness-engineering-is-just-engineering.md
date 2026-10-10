---
title: "Harness engineering is just engineering"
date: "2026-04-24"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["LLMs","Agents","OpenAI","Anthropic","Safety","Memory"]
---

The industry just invented a new job title, "harness engineering," for the practice of making AI systems reliable and consistent. We used to call that engineering.
In February 2026, OpenAI published a blog post describing how a small team shipped a product with zero lines of manually written code. Every line, from application logic to tests to CI configuration, was written by Codex. The humans didn't write code. They designed the constraints, feedback loops, documentation structures, and dependency rules that made the agents reliable. OpenAI called this "harness engineering."
Within weeks, Anthropic published multiple engineering papers on the same concept. Martin Fowler's site ran a detailed article from Birgitta Böckeler framing harnesses as the key architectural layer for coding agents. Thoughtworks flagged it as a macro trend in their April 2026 Technology Radar. An arXiv paper formalized it. A cottage industry of guides, maturity matrices, and "complete guides to harness engineering" appeared overnight.
And just like that, we had a new discipline.
## We've seen this movie before
Every technology hype cycle follows the same script. Build the exciting thing. Realize it breaks. Invent a discipline to make it not break. Give it a name. Sell certifications.
DevOps was operations done by people who also wrote code. SRE was DevOps with SLOs and error budgets. Platform engineering was SRE with an internal product mindset. Each time, the industry took existing engineering practices, applied them to a specific problem, and minted a new title.
Harness engineering fits the pattern perfectly. The core activities it describes, designing constraints for automated systems, building feedback loops, creating test harnesses, managing state across sessions, implementing fallback patterns and observability, are things good engineers have been doing since before most of us had careers. The difference is that the automated system is now an LLM agent instead of a CI pipeline or a deployment script.
The Reddit thread that summed it up best: "the competitive advantage in 2026 comes from infrastructure, not intelligence. The model is commodity. The harness determines whether agents succeed or fail." That's true, but it's also a description of every infrastructure problem in the history of software.
## What harness engineering actually is
Strip away the branding and here's what you're left with.
OpenAI's original post describes designing the environment that agents work inside. The team built constraints that kept Codex on track, feedback loops that caught errors early, documentation structures that gave the model context, and dependency rules that prevented cascading failures. The humans steered. The agents executed.
Anthropic's research goes deeper into the specific challenges of long-running agents. Their core insight is that agents working across multiple context windows face the same problem as a team of engineers working in shifts where each new engineer arrives with no memory of the previous shift. Their solution involves structured artifacts for handing off context between sessions, decomposing work into tractable chunks, and multi-agent architectures where a planner, generator, and evaluator each handle different aspects of the work.
Birgitta Böckeler's article on Martin Fowler's site frames it through the lens of trust. LLMs are non-deterministic, they don't know your context, and they think in tokens rather than concepts. A harness is the set of guides and sensors, both computational and inferential, that bridge that trust gap. Guides constrain what the agent can do. Sensors detect when it goes wrong.
The Thoughtworks Radar connects harness engineering to spec-driven development, where frameworks like OpenSpec and GitHub SpecKit provide structured guardrails and workflows that keep agents aligned with human intent.
All of this is real, useful, and important work. None of it is new.
## The oldest problem in software wearing a new hat
Making unreliable systems reliable is the defining challenge of software engineering. It's why we have type systems, test suites, linters, code review, staging environments, feature flags, circuit breakers, and runbooks. Every one of these is a "harness" in the broad sense: a constraint, feedback loop, or safety mechanism designed to keep automated systems from going off the rails.
What's changed is the nature of the unreliable system. A traditional program is deterministic. Given the same inputs, it produces the same outputs. When it breaks, you can trace the failure to a specific line of code. An LLM agent is non-deterministic. It might handle the same task differently each time. When it fails, the failure mode might be subtle, a plausible-sounding wrong answer rather than a stack trace.
This is a genuinely harder version of the reliability problem. But it's the same category of problem. The tools look different (context management instead of dependency injection, evaluation harnesses instead of unit tests, guardrails instead of type checkers), but the engineering mindset is identical: define expected behavior, instrument the system, detect deviations, recover gracefully.
A Vercel team reportedly stripped 80% of the tools from their agent and accuracy jumped from 80% to 100%. That's not a breakthrough in harness engineering. That's the principle of least privilege applied to an AI system. We've known about this since the 1970s.
## When renaming helps, and when it doesn't
There's a cynical reading of all this: renaming existing practices is how consultancies sell services and how engineers negotiate raises. Every new title creates a knowledge gap that someone can fill with courses, certifications, and job postings. The "harness engineer" of 2026 is the "prompt engineer" of 2023, which was the "DevOps engineer" of 2015.
But there's also a generous reading, and it's the more useful one.
Naming things is powerful. When you give a practice a name, you make it legible. Teams can discuss it, budget for it, hire for it, and prioritize it. Before "DevOps" had a name, plenty of companies treated deployment as an afterthought. Naming the practice forced organizations to take it seriously. The same thing happened with SRE, with platform engineering, and with security engineering.
Harness engineering, as a name, draws attention to something genuinely important: that the infrastructure around AI agents matters more than the models themselves. When AI adoption scaled through 2025 and into 2026, reliability became the number one concern. Teams were shipping agents that worked in demos and failed in production. The term "harness engineering" gives that problem a home.
The term is useful if it focuses attention on the right things. It's harmful if it creates another gatekept specialty, another set of certifications that substitute for actual engineering skill, another title that lets organizations pretend they're solving a new problem instead of doing the hard work they've always needed to do.
## What this means for teams shipping AI today
If you're building with AI agents right now, here's the practical takeaway: you don't need to become a harness engineer. You need to be an engineer who takes reliability seriously.
The specific practices that matter are not mysterious:
- **Testing**: Evaluate agent outputs systematically. Build test suites that cover not just happy paths but adversarial inputs, edge cases, and failure modes. This is the same discipline as writing good tests for any software, just applied to a system with probabilistic outputs.
- **Guardrails**: Constrain what agents can do. Limit their tool access. Validate their outputs before they reach users or other systems. Define boundaries explicitly rather than hoping the model stays in bounds.
- **Fallback patterns**: Design for failure. When an agent produces garbage, what happens? If the answer is "it gets shown to the user," you have an engineering problem, not a harness engineering problem.
- **Observability**: Instrument your agent systems the same way you'd instrument any distributed system. Log inputs, outputs, and intermediate steps. Track latency, error rates, and cost. Build dashboards that tell you when things are degrading.
- **Context management**: This is the one area where agent systems genuinely introduce new challenges. Managing state across context windows, designing handoff mechanisms between sessions, and structuring information so models can actually use it are skills that don't have direct precedents in traditional software engineering. But the underlying principle, giving your system the information it needs to do its job, is as old as programming itself.
None of this requires a new job title. It requires engineers who understand both the capabilities and limitations of the systems they're building and who apply the same rigor to AI systems that they would to any other production software.
## The attention is the point
The best thing about the harness engineering conversation is not the name itself. It's the fact that the industry is finally paying attention to AI reliability with the seriousness it deserves.
For the past few years, the dominant narrative in AI has been about capability: what models can do, how much better they're getting, how fast they're improving. The emergence of harness engineering as a concept represents a shift toward a more mature question: how do we make these systems actually work in production?
That's not a new discipline. That's engineering, doing what it has always done, catching up to the hype with the hard, unglamorous work of making things reliable.
We didn't need a new name for it. But if the name gets more teams to take it seriously, it's done its job.
## References
1. [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) , OpenAI
2. [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) , Anthropic
3. [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) , Anthropic
4. [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html) , Birgitta Böckeler on [martinfowler.com](http://martinfowler.com)
5. [Harness engineering, first thoughts](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html) , Birgitta Böckeler on [martinfowler.com](http://martinfowler.com)
6. [Macro trends in the tech industry, April 2026](https://www.thoughtworks.com/en-us/insights/blog/technology-strategy/macro-trends-tech-industry-april-2026) , Thoughtworks
7. [What is harness engineering? Complete guide for AI agent development](https://www.nxcode.io/resources/news/what-is-harness-engineering-complete-guide-2026) , NxCode
8. [Harness engineering: what every AI engineer needs to know in 2026](https://ai.gopubby.com/harness-engineering-what-every-ai-engineer-needs-to-know-in-2026-0ab649e5686a) , Yanli Liu
