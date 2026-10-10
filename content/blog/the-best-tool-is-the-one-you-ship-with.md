---
title: "The best tool is the one you ship with"
date: "2026-03-21"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Every few months, a new thread pops up on Reddit or Hacker News: "What's the best TypeScript ORM in 2026?" The comments devolve into a bracket-style tournament between Prisma, Drizzle, TypeORM, MikroORM, and whatever just launched last Tuesday. Multiply that by meta-frameworks, bundlers, state management libraries, and deployment platforms, and you have a developer ecosystem that seems purpose-built for indecision.
Here's the thing nobody wants to admit: most of these tools are fine. The differentiator isn't which one you pick. It's whether you ship.
## The evaluation trap
There's a specific flavor of procrastination that looks like due diligence. You open twelve browser tabs comparing benchmarks. You scaffold a proof-of-concept in three frameworks. You read a blog post titled "Why we migrated from X to Y" and briefly consider doing the same, even though you haven't built anything yet.
This is the evaluation trap, and it's seductive because it feels productive. You're learning. You're making informed decisions. But past a certain threshold, more research is just fear wearing a lab coat. As the Linux kernel management guide puts it, "the key difference between a big decision and a small one is whether you can fix your decision afterwards." Most tech choices are small decisions. You can refactor. You can swap a library. The code isn't carved in stone.
The trap is especially potent in the TypeScript ecosystem, which has an almost comical abundance of options. Need an ORM? Pick from at least a dozen. Need a meta-framework? Next.js, Remix, Astro, Nuxt, SvelteKit, and more are all competing for your attention. Need a bundler? Vite, Turbopack, esbuild, Rspack. The paradox of choice is real, and it hits hardest when every option is genuinely decent.
## Why I stopped optimizing my stack
I use tRPC, Hono, and Drizzle. Are they the objectively best tools in their categories? I have no idea. Probably not by every metric. Drizzle isn't the most feature-rich ORM. Hono isn't the most popular server framework. tRPC has tradeoffs compared to plain REST or GraphQL.
But here's what matters: I know them. I've built things with them. When something breaks at 11 PM, I don't need to consult the docs for twenty minutes before I can debug it. The muscle memory is there, and muscle memory compounds.
"It works and I know it" beats "it benchmarks 12% faster" in almost every real-world scenario. That 12% performance gap disappears into noise once you factor in the time you'd spend learning the new tool, migrating existing code, and rebuilding the intuition you already have.
## The hidden cost of switching
We tend to think about tool migration as a one-time cost: rewrite some code, update some configs, done. But the real costs are sneakier than that.
**Migration debt** is the obvious one. You have to port existing code, which means understanding both the old tool and the new one well enough to translate between them. Edge cases that your current setup handles gracefully might behave differently in the new stack. Tests break. Deployment pipelines need updating.
**Relearning** is the expensive one. Every tool has idioms, patterns, and gotchas that you only internalize through use. Switching resets that clock. The first few weeks with a new framework are always slower, not because the framework is worse, but because you haven't built the mental model yet.
**Broken muscle memory** is the subtle one. When you reach for a pattern that worked in your old setup and it doesn't exist in your new one, you lose flow state. Those micro-interruptions add up to hours of lost productivity over weeks and months.
Research into tech stack migration costs consistently shows that organizations underestimate the total cost of switching. Training, onboarding, data migration, reconfigured workflows, and the inevitable friction points often dwarf the sticker price of the new tool itself.
## When tool choice actually matters
None of this means tool choice is irrelevant. There are real thresholds where the right tool makes a measurable difference.
**Scale.** If your ORM generates queries that fall apart at a million rows, that's not a preference problem, that's an engineering problem. Performance ceilings are legitimate reasons to switch.
**Team size.** A solo developer can hold an entire codebase in their head. A team of twenty needs conventions, type safety, and tooling that enforces consistency. The right framework for a solo project and the right framework for a team of twenty are often different.
**Hiring pool.** If you're building a team, your stack affects who you can hire and how fast they ramp up. Niche tools might be technically superior but practically limiting.
**Genuine pain.** Some tools have real, structural problems: abandoned maintenance, broken APIs, missing features you actually need. If your current tool is actively hurting you, not just theoretically suboptimal, switching is the right call.
The key distinction is between *theoretical* better and *practical* better. Theoretical better is what shows up in benchmarks and comparison blog posts. Practical better is what makes your specific project, with your specific constraints, move faster.
## The vibe coding angle
AI-assisted development is quietly making this entire debate less important. When you're pair-programming with an AI tool, the model adapts to whatever stack you're using. It can generate Drizzle queries or Prisma queries with roughly equal competence. It can scaffold a Next.js page or an Astro component.
This shifts the bottleneck. The limiting factor isn't whether your framework has the most ergonomic API anymore. It's whether you can clearly articulate what you want to build. The human in the loop matters more than the tool in the stack.
Research from Zhang et al. at arXiv found that different libraries with similar functionality can show up to 84% differences in the quality of LLM-generated code. That's a real consideration, but it cuts in an interesting direction: it means the "best" tool might increasingly be the one that AI models understand well, not the one with the most elegant API design. And as models improve, those gaps narrow.
TypeScript itself is a beneficiary of this trend. It became the most-used language on GitHub by monthly contributors in August 2025, partly because typed languages work well with AI coding assistants. The type system gives the model guardrails, which means it generates better code regardless of which specific TypeScript library you're using.
## How to tell if switching is worth it
Not all tool frustrations are created equal. Here's a simple framework for deciding whether to switch or stay.
**Stay** if your frustration is about aesthetics, marginal performance, or what other people are using. Stay if you'd need to rewrite more than a weekend's worth of code. Stay if the main appeal of the new tool is that it's new.
**Switch** if your current tool is unmaintained or has known security issues. Switch if you're hitting hard technical limits that the tool can't work around. Switch if the tool's mental model actively fights the kind of software you're building.
**Evaluate seriously** if your team is growing and the current tool doesn't scale to multiple contributors. Evaluate if you're starting a greenfield project and your old defaults don't apply. Evaluate if the ecosystem around your tool is shrinking in a way that affects your ability to get help.
## Pragmatism as a competitive advantage
For solo developers and small teams, the ability to just pick something and go is a genuine edge. While someone else is on month three of their framework evaluation, you've shipped a product, gotten user feedback, and iterated twice.
This isn't anti-intellectual. It's recognizing that decisions have diminishing returns. The first hour of research is valuable. The twentieth hour is almost certainly not. At some point, the information you need can only come from building the actual thing.
The best tool is the one you ship with. Not because it's perfect, but because shipping is where you learn what actually matters, and that knowledge is worth more than any benchmark.
## References
1. Linux kernel management style guide, The Linux Kernel documentation. [https://www.kernel.org/doc/html/latest/process/management-style.html](https://www.kernel.org/doc/html/latest/process/management-style.html)
2. Zhang, X. et al., "Rethinking Technology Stack Selection with AI Coding Proficiency," arXiv:2509.11132, September 2025. [https://arxiv.org/abs/2509.11132](https://arxiv.org/abs/2509.11132)
3. GitHub Octoverse 2025 report, "TypeScript tops GitHub as most-used language." [https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1)
4. "The Hidden Costs of Tech Stack Management: Why Switching Isn't as Simple as It Seems," Ethan Ellington, LinkedIn, February 2025. [https://www.linkedin.com/pulse/hidden-costs-tech-stack-management-why-switching-isnt-ethan-ellington-swtqc](https://www.linkedin.com/pulse/hidden-costs-tech-stack-management-why-switching-isnt-ethan-ellington-swtqc)
5. "React in 2025: Conquering Decision Paralysis," Martin Rojas, DEV Community. [https://dev.to/martinrojas/react-in-2025-conquering-decision-paralysis-3806](https://dev.to/martinrojas/react-in-2025-conquering-decision-paralysis-3806)
