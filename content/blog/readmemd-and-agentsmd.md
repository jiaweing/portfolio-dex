---
title: "README.MD and AGENTS.MD"
date: "2026-03-19T22:38:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

They sound similar. They even look similar, both sitting in your repo root as markdown files. But [README.MD](http://README.MD) and [AGENTS.MD](http://AGENTS.MD) serve fundamentally different audiences, and understanding the gap between them matters more now than ever.
## One is for humans, the other is for machines
[README.MD](http://README.MD) has been the front door of every software project for decades. It tells humans what a project does, how to install it, and how to contribute. It's the first thing you see on a GitHub repo page.
[AGENTS.MD](http://AGENTS.MD) is something newer. Introduced in mid-2025 through a collaboration between Sourcegraph, OpenAI, Google, Cursor, and others, it's now maintained by the Agentic AI Foundation under the Linux Foundation. The pitch is simple: one file, any agent. It's a dedicated, predictable place to give AI coding agents the context and instructions they need to work on your project. Think of it as a README for agents.
Over 60,000 open-source projects already use [AGENTS.MD](http://AGENTS.MD). Claude Code uses a similar convention called [CLAUDE.MD](http://CLAUDE.MD). You can symlink between them to keep everything working across tools.
## How [AGENTS.MD](http://AGENTS.MD) actually works
When you drop an [AGENTS.MD](http://AGENTS.MD) file into your project root, coding agents like Cursor, GitHub Copilot, Gemini CLI, and Windsurf automatically read it before doing any work. It sits at the top of the conversation history, right below the system prompt. Every turn, every request, the agent has that context available without needing to decide whether to load it.
This is the key difference from a README. A README is a document you read once to get oriented. [AGENTS.MD](http://AGENTS.MD) is injected into every single interaction. It's persistent, passive context that shapes how an agent behaves in your codebase.
Typical contents include build commands, test instructions, code style guidelines, architecture decisions, and security considerations. You can even nest [AGENTS.MD](http://AGENTS.MD) files in subdirectories for monorepos. At the time of writing, the main OpenAI repo has 88 of them.
## Passive context beats active retrieval
Vercel ran a set of evaluations comparing two approaches for teaching coding agents about Next.js 16 APIs that weren't in model training data: [AGENTS.MD](http://AGENTS.MD) (passive context) versus skills (on-demand retrieval).
The results were striking:
<table fit-page-width="true" header-row="true">
<tr>
<td>**Configuration**</td>
<td>**Pass rate**</td>
<td>**vs. baseline**</td>
</tr>
<tr>
<td>Baseline (no docs)</td>
<td>53%</td>
<td>-</td>
</tr>
<tr>
<td>Skill (default behavior)</td>
<td>53%</td>
<td>+0pp</td>
</tr>
<tr>
<td>Skill with explicit instructions</td>
<td>79%</td>
<td>+26pp</td>
</tr>
<tr>
<td>[AGENTS.MD](http://AGENTS.MD) docs index</td>
<td>100%</td>
<td>+47pp</td>
</tr>
</table>
A compressed 8KB docs index embedded directly in [AGENTS.MD](http://AGENTS.MD) achieved a perfect pass rate. Skills, even when the agent was explicitly told to use them, maxed out at 79%. Without those instructions, skills performed no better than having no documentation at all, because in 56% of cases the agent simply never invoked them.
Vercel's theory comes down to three factors. First, there's no decision point. The information is already present, so the agent never has to decide whether to look something up. Second, consistent availability. Skills load asynchronously and only when invoked, but [AGENTS.MD](http://AGENTS.MD) content is there for every turn. Third, no ordering issues. Skills create sequencing decisions about whether to read docs first or explore the project first. Passive context avoids this entirely.
## But there's a catch: context bloat
Not everyone agrees that more context is better. Researchers at ETH Zurich ran a study (arXiv:2602.11988) evaluating [AGENTS.MD](http://AGENTS.MD) files across 138 real-world coding tasks from 12 Python repositories. They tested Claude Code, Codex, and Qwen Code under three conditions: no context file, LLM-generated context file, and human-written context file.
The findings were uncomfortable. Context files tended to *reduce* task success rates compared to providing no repository context, while also increasing inference cost by over 20%. The researchers concluded that unnecessary requirements from context files make tasks harder, and that human-written context files should describe only minimal requirements.
This creates a real tension. Vercel's evals showed passive context achieving perfect scores. ETH Zurich's study showed it often hurting performance. The difference likely comes down to what's in the file. A tightly compressed, version-specific docs index is very different from a sprawling, outdated set of instructions that describe a codebase that has moved on.
As one developer put it after debugging a week of strange agent behavior: "I opened my [CLAUDE.md](http://CLAUDE.md). There it was, three months of accumulated instructions, half of which described a codebase that didn't exist anymore."
## [README.MD](http://README.MD) has been changing too
I was one of the first people to use AI for README generation. Back when the first agentic coding tools like Cline came out, writing code was still hit-or-miss, but README generation was genuinely useful. It was one of the first things I thought of because, honestly, writing a README is a pain.
Since then, READMEs have gotten longer. AI makes it easy to generate comprehensive documentation, so people do. But the more interesting shift is that READMEs are no longer just for humans. Developers are adding sections specifically optimized for AI agents browsing the internet, knowing that agents now read and interpret README files when exploring repositories.
This blurs the line. If your README already contains build instructions, architecture notes, and contribution guidelines, why do you need a separate [AGENTS.MD](http://AGENTS.MD)?
## The case for keeping them separate
The [AGENTS.MD](http://AGENTS.MD) specification makes a deliberate argument for separation. README files are for humans: quick starts, project descriptions, and contribution guidelines. [AGENTS.MD](http://AGENTS.MD) complements this by containing the extra, sometimes detailed context that coding agents need, things like precise build steps, test commands, and conventions that might clutter a README or aren't relevant to human contributors.
The separation keeps READMEs concise and focused on human readers. It gives agents a clear, predictable location for instructions. And it provides a format that works across different agent tools without requiring any special schema or YAML frontmatter, just plain markdown.
## How they compare
<table fit-page-width="true" header-row="true" header-column="true">
<tr>
<td></td>
<td>[**README.MD**](http://README.MD)</td>
<td>[**AGENTS.MD**](http://AGENTS.MD)</td>
</tr>
<tr>
<td>**Primary audience**</td>
<td>Humans (developers, contributors, users)</td>
<td>AI coding agents</td>
</tr>
<tr>
<td>**When it's read**</td>
<td>Once, when someone visits the repo</td>
<td>Every turn of every agent interaction</td>
</tr>
<tr>
<td>**How it's consumed**</td>
<td>Read by a person in a browser</td>
<td>Injected into the system prompt automatically</td>
</tr>
<tr>
<td>**Typical contents**</td>
<td>Project overview, installation, usage, contributing</td>
<td>Build commands, test steps, code style, architecture</td>
</tr>
<tr>
<td>**Nesting support**</td>
<td>One per repo (by convention)</td>
<td>Multiple files, nearest one takes precedence</td>
</tr>
<tr>
<td>**Standardization**</td>
<td>Informal convention since the 1970s</td>
<td>Open standard maintained by the Linux Foundation (2025)</td>
</tr>
<tr>
<td>**Size considerations**</td>
<td>Longer is fine, humans skim</td>
<td>Shorter is better, context windows have limits</td>
</tr>
<tr>
<td>**Tool support**</td>
<td>GitHub, GitLab, npm, etc.</td>
<td>Cursor, Copilot, Gemini CLI, Windsurf, Codex, and more</td>
</tr>
<tr>
<td>**Risk of staleness**</td>
<td>Low, usually updated with major changes</td>
<td>High, outdated instructions actively harm agent performance</td>
</tr>
</table>
## What this means going forward
The landscape is still shifting. Markdown has evolved from documentation format to a version-controlled instruction layer that governs AI behavior. Microsoft and GitHub now use markdown files like `.github/copilot-instructions.md` and `SKILL.md` to persist AI rules and reusable prompts. Projects are fragmenting their knowledge across files like `agents.md`, `skills.md`, `tools.md`, and `policies.md`.
The practical takeaway is this: if you're building software with AI coding agents, you probably need both files. A README that clearly communicates what your project is about to humans, and an [AGENTS.MD](http://AGENTS.MD) that gives agents the precise, minimal context they need to work effectively in your codebase.
Just keep your [AGENTS.MD](http://AGENTS.MD) lean. The ETH Zurich research is a useful corrective to the instinct to dump everything into it. Describe only what's necessary. Update it when your codebase changes. And remember that unlike a README, which humans can skim past the irrelevant parts, agents take every word literally and carry it through every interaction.
## References
1. [AGENTS.md](http://AGENTS.md)[, official specification and documentation](https://agents.md/)
2. [AGENTS.md](http://AGENTS.md)[ outperforms skills in our agent evals, Vercel Blog](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)
3. [Evaluating ](https://arxiv.org/abs/2602.11988)[AGENTS.md](http://AGENTS.md)[: Are Repository-Level Context Files Helpful for Coding Agents? (arXiv:2602.11988), Gloaguen et al., ETH Zurich](https://arxiv.org/abs/2602.11988)
4. [A Complete Guide To ](https://www.aihero.dev/a-complete-guide-to-agents-md)[AGENTS.md](http://AGENTS.md)[, AIhero](https://www.aihero.dev/a-complete-guide-to-agents-md)
5. [The Complete Guide to AI Agent Memory Files, Data Science Collective](https://medium.com/data-science-collective/the-complete-guide-to-ai-agent-memory-files-claude-md-agents-md-and-beyond-49ea0df5c5a9)
6. [AGENTS.md](http://AGENTS.md)[, ThoughtWorks Technology Radar](https://www.thoughtworks.com/en-us/radar/techniques/agents-md)
7. [In Agentic AI, It's All About the Markdown, Visual Studio Magazine](https://visualstudiomagazine.com/articles/2026/02/24/in-agentic-ai-its-all-about-the-markdown.aspx)
8. [Effective context engineering for AI agents, Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
