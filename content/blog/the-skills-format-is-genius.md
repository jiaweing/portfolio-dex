---
title: "The skills format is genius"
date: "2026-03-18T17:04:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Everyone dismissed it when it first appeared. "It's just a markdown file," people said, as if simplicity were a flaw. No SDK, no plugin architecture, no package registry. Just a folder with a `SKILL.md` file inside it. How could that possibly be the answer?
But here's the thing: that's exactly why it works.
## What the skills format actually is
If you haven't encountered it yet, the skills format is an open standard for giving AI coding agents reusable capabilities. Anthropic published the specification at [agentskills.io](http://agentskills.io) in December 2025, and it was quickly adopted by OpenAI Codex, Gemini CLI, JetBrains Junie, Cursor, and over a dozen other tools.
A skill is a folder. Inside it, there's one required file: `SKILL.md`. That file has some YAML frontmatter at the top (a name and a description) and markdown instructions in the body. That's the whole thing.
```javascript
my-skill/
├── SKILL.md          # Required: instructions + metadata
├── scripts/          # Optional: executable code
├── references/       # Optional: docs loaded on demand
└── assets/           # Optional: templates, images
```
The YAML frontmatter tells the agent *what* the skill does and *when* to activate it. The markdown body tells it *how*. If you need supporting material, you can drop reference files and scripts alongside it, and the agent pulls them in only when needed.
That's it. No build step, no compilation, no deployment pipeline. You write markdown, you save the file, and your AI agent picks it up.
## Why people underestimated it
I think the initial backlash came from a mismatch in expectations. People were waiting for something that *looked* like infrastructure. A proper plugin system with types and schemas and API surfaces. Something engineered.
Instead, they got a text file.
But the skeptics missed something important. The skills format isn't trying to be a plugin system. It's trying to be a *universal prompt format*, and for that job, markdown is the perfect choice. Every developer already knows it. Every AI model already understands it. It's human-readable, machine-parseable, and version-controllable all at once.
As Visual Studio Magazine put it, markdown has gone from a passive artifact (explaining things to humans) to an active artifact (governing AI behavior). The skills format is the clearest expression of that shift.
## The genius is in the loading system
What makes skills more than just "a saved prompt" is how agents actually consume them. The format defines a three-level progressive loading system that keeps things efficient.
**Level 1: Metadata.** When a session starts, the agent reads only the name and description from every installed skill. This costs roughly 100 tokens per skill, so you can have dozens installed without bloating context.
**Level 2: Instructions.** When the agent decides a skill is relevant to your request, it loads the full body of `SKILL.md`. This is where your actual instructions live, and they only enter context when needed.
**Level 3: References and scripts.** If the skill body points to other files, those are pulled in on demand. Scripts can even execute without being read into context at all.
This means a skill that bundles a 2,000-word style guide and three validation scripts costs you zero tokens at idle. The agent pays only for what it uses, when it uses it. That's a genuinely clever design for a format that looks like "just markdown."
## It's a universal standard, and that matters
The part that seals the deal is portability. A skill you write for Claude Code works in OpenAI Codex. It works in Gemini CLI, in Cursor, in JetBrains Junie. The spec is the same. The file is the same. You write it once, commit it to your repo, and every agent on your team can use it.
This wasn't inevitable. These companies could have each built their own proprietary formats. Instead, the industry converged on an open standard built on markdown, a format that has been around since 2004. GitHub formalized `.github/copilot-instructions.md` for repo-scoped instructions. Microsoft built prompt files as `.prompt.md`. Anthropic and OpenAI both adopted `SKILL.md`. The whole ecosystem is aligning around the same idea: markdown as the instruction layer for AI.
Cloudflare even published an RFC proposing a `.well-known/skills/` convention for web-hosted skill discovery. The format is spreading beyond code editors into the broader agent ecosystem.
## The real tip: build skills from your own patterns
Here's where I think most people get the skills format wrong. They go looking for a marketplace, a directory, some collection of pre-built skills to install. And sure, those exist. There are repositories with hundreds of community-built skills covering everything from code review to sprint planning.
But the real power is in building your own.
If you find yourself asking AI the same thing repeatedly, that's a skill waiting to be written. If the AI does something perfectly and you want it to do that exact thing again next time, capture it as a skill. If you have a workflow that involves multiple steps and you keep having to re-explain it, convert it into a skill and let the agent ask you clarifying questions once, then save the result.
A skill should be custom-built from scratch to fit *your* workflow. Not someone else's generic template from the internet. The most useful skills I've written are the ones that encode patterns specific to how I work, the kind of thing no one else would ever publish because it only makes sense in my context.
That specificity is the point. A generic "write unit tests" skill is fine. A skill that writes unit tests the way your team writes them, using your conventions, your test framework config, your naming patterns, that's transformative.
## Why simplicity wins
There's a broader lesson here about tool design. The skills format works because it made the smallest possible bet. It didn't try to solve authentication, or dependency management, or sandboxing, or distribution. It solved one problem: how do you save and reuse a prompt?
The answer turned out to be: you write it in a markdown file and put it in a folder.
Everything else, the progressive loading, the cross-platform support, the git-based sharing, follows naturally from that foundation. The format is easy to understand for anyone, technical or not. You can open a `SKILL.md` file in any text editor and immediately grasp what it does. Try saying that about a VS Code extension manifest or a Terraform provider schema.
Sometimes the smartest engineering decision is to not engineer something at all. To recognize that the problem doesn't need a framework. It needs a convention. The skills format is a convention that happened to be exactly right, and the fact that it looks simple is not a weakness. It's the entire point.
## References
1. Agent Skills Open Standard, [agentskills.io](http://agentskills.io), [https://agentskills.io/what-are-skills](https://agentskills.io/what-are-skills)
2. Bibek Poudel, "The [SKILL.md](http://SKILL.md) Pattern: How to Write AI Agent Skills That Actually Work," Medium, February 2026, [https://bibek-poudel.medium.com/the-skill-md-pattern-how-to-write-ai-agent-skills-that-actually-work-72a3169dd7ee](https://bibek-poudel.medium.com/the-skill-md-pattern-how-to-write-ai-agent-skills-that-actually-work-72a3169dd7ee)
3. David Ramel, "In Agentic AI, It's All About the Markdown," Visual Studio Magazine, February 2026, [https://visualstudiomagazine.com/articles/2026/02/24/in-agentic-ai-its-all-about-the-markdown.aspx](https://visualstudiomagazine.com/articles/2026/02/24/in-agentic-ai-its-all-about-the-markdown.aspx)
4. OpenAI Codex Agent Skills documentation, [https://developers.openai.com/codex/skills/](https://developers.openai.com/codex/skills/)
5. Cloudflare, "Introducing Markdown for Agents," [https://blog.cloudflare.com/markdown-for-agents/](https://blog.cloudflare.com/markdown-for-agents/)
6. Mintlify, "[skill.md](http://skill.md): An open standard for agent skills," [https://www.mintlify.com/blog/skill-md](https://www.mintlify.com/blog/skill-md)
7. Marco Kotrotsos, "Again: Prompts VS Skills," Medium, February 2026, [https://kotrotsos.medium.com/again-prompts-vs-skills-7236b907c0a3](https://kotrotsos.medium.com/again-prompts-vs-skills-7236b907c0a3)
