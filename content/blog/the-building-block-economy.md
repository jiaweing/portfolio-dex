---
title: "The building block economy"
date: "2026-04-18T22:34:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Agents","LLMs","Frameworks","Open Source","SaaS","Economics","Security","Documentation","Coding","DevTools"]
---

Software has always been built on layers of abstraction. We stand on the shoulders of libraries, frameworks, and protocols that someone else wrote so we don't have to. But something has shifted. The way software gets composed, who composes it, and how fast it happens has fundamentally changed, and the ripple effects are reshaping what it means to build, maintain, and ship software today.
Mitchell Hashimoto, creator of Terraform and Ghostty, recently coined the term "the building block economy" to describe this shift. His thesis is simple but profound: the most effective way to build software and get massive adoption is no longer through high-quality standalone applications, but through building blocks that enable others to assemble their own solutions at speed.
He's not wrong. And the implications run deeper than most people realize.
## The factory floor has changed
The core observation is this: AI is really good at gluing together well-documented, proven components. It prefers to reach for existing building blocks over writing things from scratch. And when it does, the results are surprisingly functional.
Humans have always preferred to build on top of existing primitives too. The difference is that the barrier to entry, understanding how those pieces fit together, used to be high enough to limit who could do it. That barrier is now largely gone. An AI coding agent can read documentation, pull in dependencies, wire up integrations, and produce working software in minutes. The "factory" of software production has become agentic, and its output is enormous.
Hashimoto saw this firsthand with Ghostty, his terminal emulator. The Ghostty GUI app took 18 months to reach one million daily macOS update checks. But libghostty, the cross-platform library that powers it, reached multiple millions of daily users in just two months. The building block outpaced the application. Projects like Rootshell (a terminal for iPhone and iPad) and experimental integrations with VS Code's xterm.js are already built on top of libghostty, each solving problems the original app never needed to address.
This pattern isn't unique to Ghostty. It's visible across the entire software landscape.
## Building blocks everywhere
Think about the tools that define modern software development. Next.js, Tailwind CSS, Stripe, Vercel, shadcn/ui. These aren't just popular because they're good. They're popular because they're composable. They're designed to be assembled, mixed, and reconfigured by both humans and AI agents alike.
The API economy anticipated this trend years ago. Stripe didn't just build a payment processor, it built a payment primitive. Twilio didn't build a call center, it built communication building blocks. These companies succeeded because they made it trivially easy for others to compose new experiences on top of their infrastructure.
What's different now is the speed and scale at which composition happens. The composable applications market was valued at roughly \$6.4 billion in 2024 and is projected to reach \$31.5 billion by 2034, growing at over 17% annually. That growth reflects a fundamental architectural shift: enterprises are moving from monolithic systems to modular, API-first designs built from interchangeable components.
And AI is accelerating this transition. When your coding agent can spin up a new SaaS starter with Postgres, Stripe, Tailwind, and authentication in a single prompt, the economics of software creation change dramatically.
## Imports up, exports up
Hashimoto frames this neatly: imports are up, and exports are up.
On the import side, software projects are pulling in more dependencies than ever. AI agents naturally gravitate toward existing, well-documented packages rather than reimplementing functionality from scratch. This makes high-quality, well-maintained building blocks more valuable than ever before.
On the export side, the sheer volume of software being produced has exploded. Not all of it is good, and the risks are real: security vulnerabilities from poorly understood dependencies, instability from code that nobody fully comprehends, and a growing disconnect between the people shipping software and the people who understand how it works.
But the positives are substantial. The quality bar for niche software is lower in a good way. A tool targeting a handful of users doesn't need to weigh every feature against every other feature the way a mainstream application does. You can ship faster and more loosely. Awareness of building blocks grows as niche communities adopt and adapt them. And maintenance becomes more sustainable when you can say "no" to feature requests because you're offering the means of production, not a finished product.
Perhaps most interesting is the outsourcing of R&D. When thousands of people are forking, extending, and experimenting with your building block, you get to observe working proof of concepts before deciding what to bring back to the mainline. Less talk, more walk.
## The spectrum of responses
Not everyone is celebrating this shift. The software community is distributed across a spectrum of responses, from resistance to full embrace.
On one end, there are developers creating what Hashimoto calls "enclaves." Drew DeVault's decision to fork Vim, stripping it back to version 8.2 before the introduction of Vim9 Script and taking a stand against AI-generated code contributions, is a clear example. It's a principled position: preserve the integrity and craftsmanship of software by rejecting the chaos that AI-assisted development introduces.
On the other end, there are people like Steve Yegge, who built Gas Town as an orchestration layer for swarms of AI coding agents and then expanded it into "the Wasteland," a federated network where thousands of Gas Town users collaborate on building software at breakneck speed. Yegge's thesis is that the cost of software development has dropped below minimum wage, and the right response is to lean into it completely.
Most of us sit somewhere in between. We use AI tools daily but still care about code quality. We reach for building blocks but still want to understand how they work. We appreciate the speed but worry about the fragility.
## What this means for how we build
If the building block economy is real, and the evidence suggests it is, there are practical implications for anyone who writes or ships software.
**Design for composability.** If you're building a library, framework, or tool, think about how it will be consumed by both humans and AI agents. Clear documentation, well-defined APIs, and modular architecture aren't just nice to have. They're the difference between your project being a building block and being ignored.
**Invest in understanding.** The barrier to assembling software is gone, but the barrier to understanding it shouldn't be. The developers who thrive in this economy will be the ones who can reason about the systems they compose, debug them when they break, and make informed decisions about which building blocks to trust.
**Embrace the mainline-plus-ecosystem model.** Hashimoto's insight about Ghostty is instructive. The mainline application isn't disappearing. It's becoming more stable and more purposeful, thanks to a much larger and more diverse ecosystem of users and contributors. Building a great application and offering it as a building block aren't mutually exclusive.
**Accept the trade-offs.** More software means more surface area for bugs, vulnerabilities, and misunderstandings. The answer isn't to stop building. It's to invest in better tooling for security, observability, and governance at the building-block level.
## The shift has already happened
This isn't a prediction about the future. It's a description of the present. AI coding agents already prefer proven components over bespoke code. Open-source building blocks already grow faster than the applications built on top of them. The composable architecture market is already expanding at double-digit rates.
The question isn't whether the building block economy is real. It's how you position yourself within it. Whether you're building the blocks, assembling them, or maintaining the systems that emerge from their combination, the landscape has changed.
The factories are running. The blocks are on the shelf. What you build with them is up to you.
## References
1. Mitchell Hashimoto, ["The Building Block Economy"](https://mitchellh.com/writing/building-block-economy), April 2026
2. Ghostty official documentation, ["About Ghostty"](https://ghostty.org/docs/about)
3. Ghostty 1.3.0 release notes, ["libghostty roadmap"](https://ghostty.org/docs/install/release-notes/1-3-0)
4. Drew DeVault, ["A eulogy for Vim"](https://drewdevault.com/2026/03/25/2026-03-25-Forking-vim.html), March 2026
5. Steve Yegge, ["Welcome to the Wasteland: A Thousand Gas Towns"](https://steve-yegge.medium.com/welcome-to-the-wasteland-a-thousand-gas-towns-a5eb9bc8dc1f), March 2026
6. Precedence Research, ["Composable Applications Market Size"](https://www.precedenceresearch.com/composable-applications-market)
7. JetSoftPro, ["Composable Software in 2025: Why Modular Architectures Are Winning"](https://jetsoftpro.com/blog/composable-software-modular-architecture-2025/)
8. Infosys, ["APIs: Building blocks for a digital economy"](https://www.infosys.com/iki/perspectives/api-building-blocks.html)
