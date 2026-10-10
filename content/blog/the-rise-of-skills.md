---
title: "The rise of skills"
date: "2026-04-05T16:09:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

For a while, the AI agent ecosystem was obsessed with connectivity. MCP (Model Context Protocol) gave agents a standardized way to reach external tools and data sources, and the hype was enormous. But there was a gap. Agents could *access* tools, yet they often didn't know *how* to use them well. Enter skills, a deceptively simple idea that is quietly reshaping how we build and deploy AI agents.
## What are skills?
At their core, skills are folders of instructions, scripts, and resources that teach an agent how to perform a specific task. The central artifact is a `SKILL.md` file, a mix of YAML metadata and Markdown content that defines the skill's name, describes when it should be used, and provides step-by-step instructions with examples and expected output formats.
Think of it this way: **MCP gives your agent access to external tools and data. Skills teach your agent *what to do* with those tools and data.**
A skill is not executable code. It doesn't run Python or spin up a server. It's structured prose, a very detailed instruction manual that an agent can load into its context and follow. If MCP is the USB-C port, skills are the user manuals for every device you plug in.
## Where skills came from
Anthropic first introduced Agent Skills on October 16, 2025, as a feature for Claude. The initial release allowed Claude to load modular sets of instructions on demand, only when they were relevant to the current task. By December 2025, Anthropic opened skills as a formal standard, publishing the specification and SDK at [agentskills.io](http://agentskills.io) for any AI platform to adopt.
The timing was deliberate. MCP, which Anthropic had also originated, had already proven the value of open standards in the AI tooling ecosystem. But while MCP solved the *connectivity* problem, teams building agents kept running into the same issue: getting agents to reliably follow complex, multi-step workflows. Skills addressed this by giving agents a portable, version-controlled way to learn new procedures.
## The MCP moment, and its limits
When Anthropic launched MCP in late 2024, the excitement was real. An open protocol for connecting AI applications to external systems sounded transformative. And it was, in theory. In practice, though, the community spent more time *talking* about MCP than actually building with it. Integration was still manual and often brittle. Having access to a tool didn't mean an agent could use it competently.
Skills emerged as the natural complement. Where MCP provides the *interface*, skills provide the *expertise*. A well-written skill can turn a generic agent into a specialist, guiding it through a code review workflow, a data analysis pipeline, or an infrastructure deployment, all without changing a line of application code.
## How skills actually work
Skills use a design pattern called **progressive disclosure** to manage context efficiently. This is one of the more elegant aspects of the system:
**Level 1: Metadata.** At startup, the agent reads only the `name` and `description` from every installed skill's YAML frontmatter. This costs roughly 100 tokens per skill, so you can install dozens of skills without blowing up your context window.
**Level 2: Instructions.** When the agent decides a skill is relevant to the current task, it loads the full body of `SKILL.md` into context. Only at this point do the actual instructions get loaded, typically under 5,000 tokens.
**Level 3: Resources.** If the skill includes supporting scripts, templates, or reference files, those are loaded only when the agent needs to act on them.
This tiered approach means skills are economical by default. An agent with fifty installed skills doesn't pay the token cost of fifty sets of instructions, just fifty short descriptions.
## Invocation: automatic or manual?
One of the more debated aspects of skills is how they get triggered. By default, both the user and the agent can invoke any skill. The agent reads the skill descriptions in its system prompt and decides autonomously when a skill is relevant. You can also invoke a skill manually using a slash command like `/skill-name`.
Two configuration options let you fine-tune this behavior. Setting `disable-model-invocation: true` means only the user can trigger the skill, which is useful for workflows with side effects like deployments or sending messages. Setting `user-invocable: false` means only the agent can invoke it, which is useful for background knowledge that shouldn't surface as a command.
In practice, automatic invocation is still a work in progress. Some users report that skills don't fire consistently unless triggered manually or prompted with specific keywords. The community is still developing best practices around writing skill descriptions that reliably trigger the right behavior.
## OpenClaw and the skill ecosystem
While Anthropic created the standard, it was the open-source agent OpenClaw that turned skills into a mainstream phenomenon. OpenClaw (originally called Clawdbot) launched in November 2025 and grew explosively, surpassing 214,000 GitHub stars by February 2026. That's faster growth than Docker, Kubernetes, or React ever achieved.
OpenClaw embraced skills as its primary extension mechanism and built ClawHub, a public skill registry where developers can publish, version, and search for skills. The ecosystem now hosts over 5,400 skills spanning categories like development, productivity, AI/ML, media, and more. Popular skills include integrations for GitHub, Linear, email management, web search, and home automation. The install experience is deliberately simple: `clawdhub install github` is all it takes.
This marketplace model, borrowing patterns from npm and package registries, made skills accessible to developers who might never write a [SKILL.md](http://SKILL.md) from scratch. It also created a feedback loop: more skills attracted more users, which attracted more skill authors.
## An open standard takes hold
Perhaps the most significant development is the industry-wide adoption of skills as an open standard. In a surprising show of consensus, Microsoft, OpenAI, Atlassian, Figma, Cursor, and GitHub have all adopted the Agent Skills specification. OpenAI's Codex, GitHub Copilot, Cursor's agent mode, and numerous other tools now support the same `SKILL.md` format.
This means a skill written for Claude works identically in Codex, Copilot, Cursor, and over twenty other platforms. Write once, use everywhere. The portability argument that once applied to code and containers now applies to agent capabilities.
The open standard lives at [agentskills.io](http://agentskills.io), with the specification and reference SDK hosted on GitHub under the Apache 2.0 license.
## The human analogy
There's a reason the term "skill" resonates. Humans are born with general intelligence, but we need to *learn* how to do specific things. Nobody emerges from the womb knowing how to perform a code review or file a tax return. We acquire skills through instruction, practice, and examples.
AI agents work the same way. A foundation model has broad reasoning capabilities, but it doesn't inherently know your company's deployment process or your team's code style. Skills bridge that gap. They're the training materials that turn raw intelligence into applied competence.
And just like human skills, agent skills are modular. You don't need to retrain the entire model to teach it something new. You hand it a well-structured set of instructions, and it adapts.
## What this means going forward
The rise of skills signals a broader shift in how we think about AI agents. Instead of building monolithic, all-knowing systems, the industry is moving toward composable architectures where agents start general and gain expertise on demand.
A few implications stand out:
- **Specialization becomes shareable.** Teams can package their hard-won domain knowledge as skills and share them across the organization, or with the community.
- **Agent behavior becomes auditable.** Because skills are plain text files, you can review, version, and diff them just like code. This makes agent behavior more transparent and governable.
- **The skill economy is just beginning.** With registries like ClawHub and growing ecosystem support, we're likely to see skills become a meaningful layer in the AI development stack, with its own marketplace dynamics.
The pattern is familiar from software development: standardize the interface, build an ecosystem of reusable components, and let specialization compound over time. Skills are doing for AI agents what packages did for programming languages, making expertise portable, composable, and shared.
## References
1. Anthropic, "Building Effective Agents," December 2024. [https://www.anthropic.com/research/building-effective-agents](https://www.anthropic.com/research/building-effective-agents)
2. Agent Skills specification and documentation. [https://agentskills.io](https://agentskills.io)
3. Anthropic, Agent Skills for Claude. [https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
4. Claude Code Skills documentation, "Extend Claude with skills." [https://code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills)
5. Strapi, "What Are Agent Skills and How To Use Them." [https://strapi.io/blog/what-are-agent-skills-and-how-to-use-them](https://strapi.io/blog/what-are-agent-skills-and-how-to-use-them)
6. The New Stack, "Agent Skills: Anthropic's Next Bid to Define AI Standards." [https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/](https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/)
7. Plaban Nayak, "Agent Skills: Standard for Smarter AI," Medium, January 2026. [https://medium.com/@nayakpplaban/agent-skills-standard-for-smarter-ai-bde76ea61c13](https://medium.com/@nayakpplaban/agent-skills-standard-for-smarter-ai-bde76ea61c13)
8. Weights & Biases, "Anthropic introduces Agent Skills," October 2025. [https://wandb.ai/byyoung3/ml-news/reports/Anthropic-introduces-Agent-Skills---VmlldzoxNDc1NDg1MA](https://wandb.ai/byyoung3/ml-news/reports/Anthropic-introduces-Agent-Skills---VmlldzoxNDc1NDg1MA)
9. MindStudio, "What Is OpenClaw? The Open-Source AI Agent That Actually Does Things," February 2026. [https://www.mindstudio.ai/blog/what-is-openclaw-ai-agent/](https://www.mindstudio.ai/blog/what-is-openclaw-ai-agent/)
10. VoltAgent, "Awesome OpenClaw Skills," GitHub. [https://github.com/VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)
11. Bibek Poudel, "The [SKILL.md](http://SKILL.md) Pattern: How to Write AI Agent Skills That Actually Work," Medium, February 2026. [https://bibek-poudel.medium.com/the-skill-md-pattern-how-to-write-ai-agent-skills-that-actually-work-72a3169dd7ee](https://bibek-poudel.medium.com/the-skill-md-pattern-how-to-write-ai-agent-skills-that-actually-work-72a3169dd7ee)
12. [DeepLearning.AI](http://DeepLearning.AI), "Agent Skills with Anthropic" course. [https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/](https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/)
13. OpenAI, "Agent Skills for Codex." [https://developers.openai.com/codex/skills/](https://developers.openai.com/codex/skills/)
14. Anthropic, "Introducing the Model Context Protocol," November 2024. [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
