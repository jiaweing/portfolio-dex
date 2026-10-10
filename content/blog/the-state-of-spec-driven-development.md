---
title: "The state of spec-driven development"
date: "2026-04-20"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","LLMs","Claude","Anthropic","Prompt Engineering","Coding","Frameworks"]
---

Everyone in AI coding has an opinion on spec-driven development right now. Some think it's the most important shift since pair programming. Others think it's elaborate cosplay for people who want to feel like engineers while an LLM does the work. The truth is somewhere in between, and the answer depends entirely on what you're building and who you are.
I've been watching this space for a while, trying the major frameworks, and reading the discourse. Here's my honest take on the handful of tools people actually use, and how to pick between them.
## Why this matters
Spec-driven development is the idea that you write a structured specification first, then hand it to an AI coding agent to implement. It's the formalisation of something I wrote about in [Describe what you want](https://jiawei.io/blog/describe-what-you-want), that the bottleneck in AI-assisted work has shifted from execution to articulation.
The reason there are now multiple competing frameworks is that people disagree on how much structure you actually need. Some think a markdown spec is enough. Others think you need role-based agents simulating an agile team. The answer, annoyingly, is it depends.
## The frameworks worth knowing
There are more than a handful, but these are the ones actually shipping real projects. OpenSpec, GSD, Spec Kit, BMAD-METHOD, Superpowers, and gstack.
### OpenSpec
OpenSpec came out of Fission AI, hit 27k GitHub stars in six months, and is probably the most pragmatic of the four. It treats each change as a spec delta, a diff against a living specification. You propose a change, implement it, then archive it.
The key insight in OpenSpec is that workflows shouldn't be rigid phase gates. Real development has requirements that shift while implementation is in progress. OpenSpec leans into that by making the spec itself a living document you modify alongside code.
It works with 20+ AI coding assistants through native slash commands. The founder, Tabish Bidiwale, recommends Opus 4.5 or GPT 5.2 for best results, which is a telling admission. The framework benefits meaningfully from stronger reasoning models.
### GSD (Get Shit Done)
GSD is the most Claude Code native of the bunch. It's a context engineering layer built specifically to fight what the author calls context rot, the quality degradation that happens as Claude's context window fills up.
The architecture is wave execution with atomic commits. You break a project into small, isolated task plans. Each plan runs in a fresh context window. Git commits stitch the output together. When you run `/gsd-execute-phase`, you can walk away and come back to working code, assuming you set it up right.
GSD hit 50k+ stars and supports 14 runtimes through one installer. It's the tool that feels most like it was built by someone who actually uses Claude Code for real work. The quote from its README captures the vibe well: no enterprise roleplay bullshit, just a system for building things consistently.
GSD 2 is rebuilding the original as a real coding agent rather than a prompt framework, which tells you something about the limitations of the slash command approach.
### Spec Kit
Spec Kit is GitHub's official entry, released September 2025. It's the most formally structured of the four, with a four-phase workflow: constitution, specify, plan, tasks.
The constitution phase is smart. It's where you lock in non-negotiables like tech stack, architectural rules, and conventions. If your AI keeps trying to add frameworks you didn't ask for, Spec Kit gives you a place to say no once and have it remembered.
Martin Fowler's write-up on Spec Kit raised a fair criticism. The tutorials blur the line between functional specs and technical implementation, and most practitioners don't actually separate requirements from implementation well. This isn't a Spec Kit problem, it's a requirements engineering problem, but the tool doesn't solve it for you.
Spec Kit is the right pick if your team includes juniors, if you want clear PM/dev separation, or if you just trust GitHub to maintain the standard.
### BMAD-METHOD
BMAD stands for Build More Architect Dreams. It's the heaviest framework on the list, modelling a full agile team with role-based agents: Analyst, PM, Architect, Dev, QA, and more.
If you're building a large enterprise project where the separation between product and engineering actually matters, BMAD gives you the most comprehensive planning artifacts. You get PRDs, architecture docs, user stories, test plans, the whole thing.
For anything smaller, it's overkill. A solo developer running BMAD is basically doing improv theatre with themselves.
### Superpowers
Superpowers is a Claude Code plugin from obra that installs a full development methodology as a set of composable skills. It runs a seven-phase workflow from brainstorming through planning, execution, test-driven development, and code review, with sub-agents that verify the implementation against the plan.
Unlike OpenSpec or Spec Kit, Superpowers is opinionated about process rather than artifact format. It enforces a RED-GREEN-REFACTOR loop during implementation, forces the agent to delete code written before tests, and dispatches fresh sub-agents for isolated tasks. As of 5.0 it writes specs and plans to `docs/superpowers/specs` and `docs/superpowers/plans`, and explicitly tells the agent to prefer your [CLAUDE.md](http://CLAUDE.md) or [AGENTS.md](http://AGENTS.md) over its own internal instructions.
It is the most prescriptive of the bunch when it comes to how the agent should actually behave, which is exactly why some developers swear by it. If you've watched Claude start coding before it understood the problem, Superpowers is built to make that physically harder.
### gstack
gstack is Garry Tan's open-source Claude Code configuration, released in March 2026. It hit 66k GitHub stars within weeks, which tells you something about how hungry developers are for structure around the AI they already have.
Unlike the other frameworks here, gstack is not strictly spec-driven. It is role-driven. The toolkit ships 23 specialist skills and 8 standalone tools that each switch Claude into a defined persona. `/office-hours` pressure-tests product ideas before a line of code gets written. `/review` does paranoid pre-landing code review. `/qa` opens a real browser via Playwright and commits regression tests. `/ship` cuts the PR. `/retro` forces reflection after a sprint.
The bet underneath gstack is that opinionated prompts, not custom runtimes, are the right abstraction for AI-assisted development. Every skill is just a Markdown file. No libraries, no lock-in, no premium tier. Fork it, modify it, keep whatever fits your workflow.
Where Spec Kit and BMAD formalise artifacts, gstack formalises judgment. That makes it a strong complement to the others rather than a direct competitor. You can run `/office-hours` before drafting an OpenSpec change, or use `/review` and `/qa` to gate what Spec Kit generated.
## The honest framing
Here's the part nobody writes about clearly. These frameworks exist on a spectrum of ceremony.
On one end, you have Claude Code's built-in plan mode with no framework at all. Fast, flexible, assumes you're disciplined enough to guide the model well. On the other end, you have BMAD with 12+ role agents generating documents for every phase. Thorough, prescriptive, assumes you need external structure to avoid drift.
The right spot on that spectrum depends on three things:
1. **How long the project runs.** A weekend hack needs no framework. A six-month build needs serious structure.
2. **Whether it's greenfield or brownfield.** Starting from scratch rewards structured planning. Iterating on an existing codebase rewards delta-based specs.
3. **How senior your team is.** Experienced engineers benefit from lightweight tools. Mixed teams benefit from prescriptive ones.
## At a glance
<table fit-page-width="true" header-row="true">
<tr>
<td>**Framework**</td>
<td>**Best for**</td>
<td>**Strengths**</td>
<td>**Watch out for**</td>
<td>**Ceremony**</td>
</tr>
<tr>
<td>OpenSpec</td>
<td>Iterating on a live codebase with a senior team</td>
<td>Delta-based specs, PR-style review, living documentation</td>
<td>Less leverage on pure greenfield work, benefits from stronger models</td>
<td>Light</td>
</tr>
<tr>
<td>GSD</td>
<td>Solo builders on Claude Code running long multi-session projects</td>
<td>Atomic task plans, fresh context per wave, fights context rot, git-stitched output</td>
<td>Opinionated and Claude Code native, v1 is prompt scaffolding not a true runtime</td>
<td>Medium</td>
</tr>
<tr>
<td>Spec Kit</td>
<td>Mixed-experience teams, fresh projects, GitHub-heavy workflows</td>
<td>Constitution phase locks conventions, clear four-phase flow, well documented</td>
<td>Blurs functional and technical specs, does not fix weak requirements practice</td>
<td>Medium to heavy</td>
</tr>
<tr>
<td>BMAD-METHOD</td>
<td>Large enterprise builds with distinct PM, architect, dev, and QA roles</td>
<td>Full agile simulation, comprehensive planning artifacts across roles</td>
<td>Overkill for solo or small teams, heavy process drag</td>
<td>Heavy</td>
</tr>
<tr>
<td>Superpowers</td>
<td>Claude Code users who want enforced TDD and a structured end-to-end workflow</td>
<td>Seven-phase methodology, sub-agent verification, enforced RED-GREEN-REFACTOR, composable skills</td>
<td>Claude Code centric, opinionated process can feel heavy for small tasks</td>
<td>Medium to heavy</td>
</tr>
<tr>
<td>gstack</td>
<td>Solo founders and small teams on Claude Code who want role-based structure without a full spec methodology</td>
<td>Role-based skills, real browser QA via Playwright, pure Markdown configuration, composable with other frameworks</td>
<td>Not spec-first, productivity claims lean heavily on line counts which are a noisy metric</td>
<td>Light to medium</td>
</tr>
<tr>
<td>No framework (plan mode)</td>
<td>Weekend hacks, clear scope, capable model</td>
<td>Zero overhead, maximum flexibility, fastest path to shipping</td>
<td>Requires discipline, breaks down once scope grows past a few sessions</td>
<td>None</td>
</tr>
</table>
## When to use which
Here's my actual decision tree.
**Use OpenSpec when** you're iterating on an existing codebase, your team is senior, and you value short specs over long ones. It's the best tool for adding features to a live product without drowning in documentation. The delta format reviews like a pull request, which means your existing review muscle just works.
**Use GSD when** you're a solo builder or tiny team using Claude Code, and the project is big enough to span multiple sessions. If you've ever had Claude start hallucinating halfway through a build because its context got polluted, GSD is built exactly for you. It's also the right pick when you want to run long autonomous tasks and trust the system to commit along the way.
**Use Spec Kit when** your team has mixed experience levels, when you're starting something new and want the constitution phase to lock in conventions, or when you work inside GitHub heavily enough that the official tooling matters. It's the most documented and probably the easiest to teach to a new team member.
**Use BMAD when** you're running a project that actually has distinct product, architecture, development, and QA roles, and you need artifacts that map to those roles. If that sounds like your team, you probably already know it. If you're not sure, you don't need BMAD.
**Use Superpowers when** you're on Claude Code and want a methodology that enforces process rather than just generating documents. If you struggle to make yourself write tests first, or if you find your agent rushing past planning into code, Superpowers bakes those guardrails in. It also fits teams that want standardised AI-assisted practice, because the skills are composable and installable as a plugin.
**Use gstack when** you want role-based structure on top of Claude Code without committing to a full spec methodology. If your failure modes are shipping without enough product pressure-testing, skipping review, or missing QA before merge, gstack plugs those gaps with opinionated slash commands. It also pairs well with any of the other frameworks above, since its skills operate on workflow phases rather than spec artifacts.
**Use nothing when** the project fits in a weekend, you know what you're building, and the model is capable enough to one-shot it. Plan mode plus a clear description still wins for small scope. The frameworks add overhead, and overhead only pays off above a certain project size.
## A concrete example
I'm about to start building Update Night 2.0, a directory and news feed site with Next.js 15, Postgres, pgvector, an MCP server, and AI chat. Seven weeks of work, fresh codebase, solo build, Claude Code.
For this project, I'm using GSD. The reasons are specific. The build spans too many sessions for plain plan mode to keep context clean. The phases are already mapped out with atomic tasks, which is exactly how GSD wants to consume work. It's solo so I don't need Spec Kit's PM/dev separation or BMAD's full agile simulation. And the project is greenfield, so OpenSpec's delta-based strength doesn't apply until later.
Next year, once Update Night is live and I'm shipping v2.1 and v2.2, I'll probably switch to OpenSpec. Deltas are the right primitive for feature iteration. The tool should match the phase of the project.
## The contrarian view
There's a loud camp on Reddit and in engineering circles that calls all of this technical masturbation. Their argument is that specs are non-deterministic, context drift kills the output anyway, and you burn tokens writing documents that Claude Code's plan mode could have generated on the fly.
They're not entirely wrong. I've seen people spend more time maintaining spec files than they would have spent just building. I've seen teams adopt a framework because it felt professional, not because it solved a real problem.
The test I apply is simple. If your specs are getting stale, if nobody reads them after they're written, if the framework is adding process without improving output, you're cargo-culting. Either adopt a lighter tool or drop the framework entirely.
The frameworks earn their keep when the project is big enough that holding it all in your head stops working. That's usually somewhere around week three or four of full-time building. Below that, just describe what you want clearly and let the model work.
## What I think comes next
We're in the awkward phase where every framework is a markdown generator that plugs into Claude Code or Cursor. That won't last. The next generation will be actual agent runtimes with control over context windows, session state, and tool execution. GSD 2 is already moving in that direction.
The tools that survive will be the ones that stop pretending code is the output and start treating the spec as the source of truth. Tessl is closest to that vision. Kiro is gesturing at it. Most of the rest are still operating at the spec-first or spec-anchored level.
There's a parallel thread worth watching on the task-tracking side. [Dex](https://dex.rip/) treats tasks as persistent memory for agents, so a multi-session build can pick up where the last context window died without re-loading the entire plan. It's not a spec framework, it's the layer underneath that keeps the spec executable across sessions. Pair something like Dex with OpenSpec or GSD and you get closer to the runtime model the next generation actually needs.
On the review side, [Plannotator](https://plannotator.ai/) is worth watching. It is a free, open-source plan review UI that hooks into Claude Code, Codex, Gemini CLI, OpenCode, and others, and lets you annotate an agent's plan visually before it runs. Feedback goes straight back to the agent with one click. It pairs well with any of the spec frameworks above, because the weakest link in spec-driven development is usually the human review of the plan, not the generation of it.
What I'm sure of is that the skill underneath all of this, the ability to describe what you want with precision, is the real leverage. Frameworks are scaffolding. The articulation is the work.
## References
1. Fission AI, "OpenSpec: The Spec Framework for Coding Agents," [https://openspec.dev/](https://openspec.dev/)
2. TÂCHES, "Get Shit Done," [https://github.com/gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)
3. GitHub, "Spec Kit," [https://github.com/github/spec-kit](https://github.com/github/spec-kit)
4. Den Delimarsky, "Spec-driven development with AI," GitHub Blog, September 2025, [https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
5. Birgitta Böckeler, "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl," Martin Fowler's Blog, [https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
6. Augment Code, "6 Best Spec-Driven Development Tools for AI Coding in 2026," [https://www.augmentcode.com/tools/best-spec-driven-development-tools](https://www.augmentcode.com/tools/best-spec-driven-development-tools)
7. Augment Code, "GSD hits 53.9K stars with spec-driven dev system for Claude Code," [https://www.augmentcode.com/learn/gsd-stars-spec-driven](https://www.augmentcode.com/learn/gsd-stars-spec-driven)
8. The New Stack, "Beating context rot in Claude Code with GSD," [https://thenewstack.io/beating-the-rot-and-getting-stuff-done/](https://thenewstack.io/beating-the-rot-and-getting-stuff-done/)
9. Hashrocket, "OpenSpec vs Spec Kit," [https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team/](https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team/)
10. Dex, "Task tracking for Agents," [https://dex.rip/](https://dex.rip/)
11. obra, "Superpowers," [https://github.com/obra/superpowers](https://github.com/obra/superpowers)
12. Jesse Vincent, "Superpowers 5," [fsck.com](http://fsck.com) blog, [https://blog.fsck.com/2026/03/09/superpowers-5/](https://blog.fsck.com/2026/03/09/superpowers-5/)
13. Plannotator, "Plan and Code Review for AI Coding Agents," [https://plannotator.ai/](https://plannotator.ai/)
14. Garry Tan, "gstack," [https://github.com/garrytan/gstack](https://github.com/garrytan/gstack)
