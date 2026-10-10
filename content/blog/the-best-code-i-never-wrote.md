---
title: "The best code I never wrote"
date: "2026-04-29"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Coding","Prompt Engineering","Productivity","Career","Hiring","Claude","Microsoft","OpenAI","Anthropic","LLMs","DevTools"]
---

Every line of code you write in 2026 is a liability. It has bugs you haven't found yet, dependencies you'll need to update, and cognitive overhead for every person who reads it after you. The most productive thing a developer can do right now is decide what *not* to build.
AI coding tools have made writing code almost free. Claude Code, Cursor, Codex, Copilot: they'll turn a prompt into a working function in seconds. But the bottleneck was never typing speed. It was always knowing which code is worth writing in the first place.
## The real cost of code that shouldn't exist
There's a strong, well-documented correlation between lines of code and maintenance costs. As codebases grow, they become more complex, introduce more bugs, and demand more time from everyone who touches them. Research from Sonar has found that over five years, the costs associated with bad code can exceed \$1.5 million or 27,000 developer hours for a single organization.
Code that shouldn't exist carries all of these costs with none of the value. It has zero users, zero business impact, and infinite cost-to-value ratio. Every unnecessary abstraction, premature optimization, and speculative feature adds weight to a system that someone will eventually need to understand, debug, and maintain.
AI tools make this problem worse, not better. A 2025 study by CodeRabbit found that AI-written code surfaces 1.7x more issues than human-written code, and nearly half of developers say debugging AI output takes longer than fixing code written by people. When the cost of *producing* code drops to near zero, the cost of *maintaining* it becomes the only thing that matters.
## Shipping 17 apps taught me what matters
Here's what I learned from shipping 17 apps in three months: the constraint was never typing speed. It was always knowing what to build next and when to stop.
The apps that survived weren't the ones I built fastest. They were the ones where I was most disciplined about scope. Small, focused pull requests. Clear boundaries around what the app does and, more importantly, what it doesn't do. The skill that mattered wasn't how quickly I could generate code, it was how ruthlessly I could cut features before they existed.
This is the "best code" framing: the code you never wrote has zero bugs, zero maintenance cost, and zero cognitive overhead. It never breaks in production. It never confuses a new team member reading the codebase for the first time. It never needs a dependency update.
AI makes writing easy. The hard part is restraint.
## The senior dev advantage isn't what you think
The most valuable thing a senior developer does in 2026 isn't writing code faster with AI. It's knowing which pull requests to reject, which features to cut, and which abstractions to avoid entirely.
This shows up in small, concrete ways. Scoping a PR so it changes exactly what needs to change and nothing more. Reviewing AI-generated code with a critical eye toward whether the code should exist at all, not just whether it runs. Saying "we don't need this" in a planning meeting when everyone else is excited about a new feature.
The workflow that works: small, focused PRs with AI-assisted review. The skill is scoping, not writing. An AI can generate a thousand lines of code in minutes. A senior developer's value is in making sure only the fifty lines that matter ever get merged.
A randomized controlled trial from METR, published in mid-2025, found something surprising: experienced open-source developers actually took 19% longer to complete tasks when using AI tools compared to working without them. The researchers noted this contradicted predictions from both economics and ML experts, who had estimated AI would make developers 30-40% faster. The takeaway isn't that AI tools are useless. It's that the value of AI depends entirely on the judgment of the person directing it.
## The judgment gap, not the skills gap
There's a lot of talk about junior developers struggling in the current market. Entry-level tech hiring decreased 25% year-over-year in 2024, and Forrester forecasts a 20% drop in computer science enrollments alongside a doubling of the time it takes to fill developer roles.
But the problem isn't that juniors can't use AI tools. Most of them are better at prompting than their senior colleagues. The problem is that they haven't yet developed the judgment to direct those tools well. Knowing *what* to build requires experience that no amount of AI assistance can shortcut.
This isn't a criticism of junior developers. It's a recognition that the skill gap has shifted. The gap used to be about raw coding ability: can you write a binary search from scratch, do you know the standard library, can you debug a memory leak? Now the gap is about taste and judgment: do you know which PR to reject, which feature to defer, which abstraction is premature?
The developers who will thrive aren't the ones who can prompt AI the fastest. They're the ones who can look at a feature request and say, "We don't need to build this at all."
## The tools that actually matter
If code generation is nearly free, the tools that matter most aren't the ones that write code. They're the ones that help you *see* your system.
Observability platforms, dependency graphs, architecture diagrams: these are the tools that let you make informed decisions about what to build and what to leave alone. You can't decide what code not to write if you don't understand the system you're working with.
The observability space reflects this shift. Organizations are consolidating tools onto unified platforms, with 52% planning to do so in the near term. The goal isn't more data, it's better understanding. AI-driven observability tools are starting to automate decision-making based on telemetry data, helping teams see where complexity is accumulating before it becomes a problem.
For architecture and design, declarative diagramming tools like D2 and collaborative tools like Excalidraw are replacing heavyweight enterprise software. The trend is toward tools that make system structure visible and versionable, so developers can reason about what already exists before adding more.
The pattern is clear: the developer tools that matter in 2026 are the ones that support *thinking*, not typing.
## Taste as a throughput multiplier
The old model of developer productivity was straightforward: faster typing, better tools, more hours equals more output. AI has broken that model completely. When anyone can generate code at near-zero cost, the bottleneck moves upstream to the decisions about what gets built.
Taste and judgment are the new throughput multipliers. A developer with strong judgment and mediocre AI prompting skills will consistently outperform one with perfect prompting skills but no sense of what's worth building. The former ships less code that does more. The latter ships more code that does less, then spends weeks maintaining it.
The most productive thing you can do as a developer in 2026 is delete code, reject features, and say no. The best code you'll ever write is the code you never wrote.
## References
1. CodeRabbit, "State of AI vs. Human Code Generation Report," 2025. [https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)
2. METR, "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity," 2025. [https://arxiv.org/abs/2507.09089](https://arxiv.org/abs/2507.09089)
3. Sonar, "Unraveling the Costs of Bad Code in Software Development," 2025. [https://www.sonarsource.com/blog/unraveling-the-costs-of-bad-code-in-software-development/](https://www.sonarsource.com/blog/unraveling-the-costs-of-bad-code-in-software-development/)
4. Stack Overflow, "AI vs Gen Z: How AI Has Changed the Career Pathway for Junior Developers," 2025. [https://stackoverflow.blog/2025/12/26/ai-vs-gen-z/](https://stackoverflow.blog/2025/12/26/ai-vs-gen-z/)
5. CIO, "Demand for Junior Developers Softens as AI Takes Over," 2025. [https://www.cio.com/article/4062024/demand-for-junior-developers-softens-as-ai-takes-over.html](https://www.cio.com/article/4062024/demand-for-junior-developers-softens-as-ai-takes-over.html)
6. Infobip, "AI, Hiring, and the Future of Coding: What the Top 2026 Predictions Mean for Developers," 2026. [https://www.infobip.com/developers/blog/ai-hiring-and-the-future-of-coding-what-the-top-2026-predictions-mean-for-developers](https://www.infobip.com/developers/blog/ai-hiring-and-the-future-of-coding-what-the-top-2026-predictions-mean-for-developers)
7. New Relic, "Top Trends in Observability: The 2025 Forecast," 2025. [https://newrelic.com/blog/observability/top-trends-in-observability-the-2025-forecast-is-here](https://newrelic.com/blog/observability/top-trends-in-observability-the-2025-forecast-is-here)
8. DZone, "Developer Tools That Actually Matter in 2026," 2026. [https://dzone.com/articles/developer-tools-that-actually-matter-in-2026](https://dzone.com/articles/developer-tools-that-actually-matter-in-2026)
