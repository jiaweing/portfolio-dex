---
title: "I stopped using Notion’s custom agents"
date: "2026-05-31T16:42:00.000+08:00"
lastEdited: "2026-05-30T16:00:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Notion","Agents","MCP","RAG","Models","Open Source","Pricing","Local-first","CLI","Privacy","GPU","Cloud","Memory","Productivity","Economics","LLMs","Claude","OpenAI","ChatGPT"]
---

A few weeks ago, I wrote about how [nobody uses Notion Custom Agents like me](https://www.notion.so/31c0023f0e8380b0b090faf1e0dfc682). I had eight agents running, 50,000 credits burned in under a month, and a genuine belief that this was the future of personal productivity. I meant every word.
Now I've stopped using them entirely.
This isn't a rage quit. I still think the technology is impressive. But the economics forced me to look for alternatives, and what I found was better in almost every way.
## The cost that broke me
Let me recap the numbers. Notion credits cost \$10 per 1,000. During the free beta period (which ends May 4, 2026), I was burning through credits at a rate that would translate to roughly \$500 per month once billing kicked in. That's for basic, practical workflows: a blog writer, a job hunter, an expense tracker, a social post writer. Nothing exotic.
The math simply doesn't hold up. Notion AI chat is unlimited on Business plans. I can copy my agent's instructions, paste them into the chat, and get the same result manually. The only thing Custom Agents automate is the trigger, the moment when work begins without me prompting it. That one layer of automation was going to cost me \$500 a month.
I raised this in my last post. I suggested Notion include a base pool of credits with Business plans, allow credit rollover, and introduce tiered pricing. None of that has materialized. And to make things worse, the community response confirmed I wasn't alone. Reddit threads are filled with users calling the pricing "insane" and the no-rollover policy "wild." One commenter compared it to a drug dealer giving out free samples during the beta period.
## The "just optimize it" argument
Every time someone complains about credit costs, the response is predictable: optimize your agents. Write tighter instructions. Reduce unnecessary triggers. Batch your operations.
I tried all of that. I trimmed instructions, reduced trigger frequency, consolidated workflows. The bill came down, sure, but not enough. The fundamental problem isn't efficiency. It's that the pricing model charges premium rates for something that should be table stakes.
When the underlying AI chat is unlimited, charging separately for the orchestration layer feels like double-dipping. No amount of optimization changes the structural mismatch between what you're getting and what you're paying.
## What I'm using instead
I built [Ryu](https://www.notion.so/4512c7d1a50b4cc8bd0f4d9005867653), a local-first AI runtime. It's a single Rust binary that runs agents on my own machine, manages models, connects tools via MCP, and remembers context across sessions. Everything stays private. Everything stays local. And critically, it runs my agents for free.
Ryu isn't a Notion replacement. It's the orchestration layer that Notion charges \$10 per 1,000 credits for, except it runs on my hardware using my own API keys or local models.
Here's what makes it work:
**Local and cloud models.** Ryu supports local inference through llama.cpp for tasks that don't need frontier-level intelligence, and routes to cloud models like Claude or GPT-4o via OpenRouter when they do. I bring my own API keys, so I pay the model provider directly at their standard rates, no markup, no credit system.
**MCP-native tooling.** Every tool connects through the Model Context Protocol. I can plug in community MCP servers, build custom ones in Rust, or connect to 500+ apps through Composio. The tool ecosystem is open and extensible, not locked behind a proprietary integration layer.
**Sub-agent orchestration.** Agents can delegate tasks to specialized sub-agents with scoped permissions and isolated contexts. This is the same "one agent, one job" principle I used with Notion Custom Agents, except now it runs locally with no per-execution cost.
**Persistent memory.** Ryu maintains short-term session memory and long-term cross-session memory, plus document-level RAG through vector search over 27+ file formats. My agents remember what they've done and what I care about, without sending everything to a cloud service.
## Connecting Ryu to Notion
The missing piece was getting Ryu to actually read and write to my Notion workspace. That's where [overnotion](https://github.com/overseedai/overnotion) comes in. It's an open-source CLI that bridges local agents to the Notion API, letting Ryu manage pages, databases, and blocks the same way Notion's own Custom Agents do, just from outside.
The workflow is straightforward. Ryu runs the agent logic locally, decides what to do, and uses overnotion to push changes into Notion. My blog writer agent, for example, still drafts posts directly into my Blog database. My expense tracker still logs entries from parsed email receipts. The end result in Notion looks identical. The difference is that the compute happens on my machine instead of Notion's servers.
## What I gained
**Cost.** The most obvious win. I went from a projected \$500 per month to effectively \$0 for local model tasks, and standard API rates for cloud model tasks. A typical month of running all my agents through cloud APIs costs me under \$20, and that number drops further when I offload simpler tasks to local models.
**Privacy.** Everything runs on my hardware by default. My emails, receipts, job applications, and personal profile data never leave my machine unless I explicitly route a query to a cloud model. For an agent like the Self Profile Agent, which builds a continuously evolving picture of who I am, local-first isn't just a preference. It's a requirement.
**Control.** I choose the model for each agent. I choose when it runs. I choose what data it can access. There's no opaque credit system, no rollover anxiety, no surprise bills. If something breaks, I can debug it directly instead of waiting for a support ticket.
**Speed.** Local inference on a modern GPU is fast. For most of my agent tasks, especially those that don't require frontier reasoning, local models respond faster than cloud round-trips through Notion's infrastructure.
## What I lost
**Convenience.** Setting up Ryu, configuring MCP servers, and wiring up overnotion requires real technical effort. Notion Custom Agents are point-and-click. You write instructions in natural language, set a trigger, and you're done. The setup experience isn't comparable, and I wouldn't recommend my approach to someone who isn't comfortable with CLIs, config files, and API keys.
**Native integration depth.** Notion's agents live inside the workspace. They understand the data model natively, can traverse relations, read database schemas, and interact with views in ways that an external tool operating through the API simply can't match. Some of my agents needed refactoring to work around API limitations that didn't exist when they ran natively.
**Zero maintenance.** Notion handles model updates, infrastructure scaling, and reliability. With Ryu, I'm responsible for keeping things running. If my machine is off, my agents don't run. If a model update breaks something, I fix it myself.
These are real trade-offs. For most users, especially teams and non-technical individuals, Notion Custom Agents are still the right choice. The credit system is the tax you pay for not having to manage infrastructure.
## The bigger picture
I think Notion built something genuinely impressive with Custom Agents. The "one agent, one job" paradigm, the trigger system, the permission scoping, it's well-designed software. The problem is purely economic.
At \$10 per 1,000 credits with no rollover, the pricing pushes power users toward exactly what I did: rebuilding the orchestration layer outside of Notion. That's a lose-lose. Notion loses engaged users who would otherwise champion the platform, and those users lose the convenience of native integration.
The fix isn't complicated. Include a reasonable credit allowance with Business plans. Let unused credits roll over. Price based on actual compute consumed, not a flat rate per agent run. These are the same suggestions I made weeks ago, and the community has been echoing them since.
Until then, I'll be running my agents locally through Ryu, connected to Notion through overnotion. The irony isn't lost on me that this very blog post was drafted by a local agent writing into the same Blog database that my Notion Custom Agent used to write into.
The agent wrote the post. Notion just didn't get paid for it.
## References
1. Notion, "Custom Agent Pricing," Notion Help Center. [https://www.notion.com/help/custom-agent-pricing](https://www.notion.com/help/custom-agent-pricing)
2. Notion, "Introducing Custom Agents," February 24, 2026. [https://www.notion.com/blog/introducing-custom-agents](https://www.notion.com/blog/introducing-custom-agents)
3. Matthias Frank, "Notion Custom Agents: Full Tutorial, Use Cases & Pricing Changes." [https://matthiasfrank.de/en/notion-custom-agents-full-tutorial-use-cases-pricing-changes/](https://matthiasfrank.de/en/notion-custom-agents-full-tutorial-use-cases-pricing-changes/)
4. ALM Corp, "Notion Custom Agents: Complete Setup, Use Cases & Pricing (2026)." [https://almcorp.com/blog/notion-custom-agents/](https://almcorp.com/blog/notion-custom-agents/)
5. OverseedAI, "overnotion," GitHub. [https://github.com/overseedai/overnotion](https://github.com/overseedai/overnotion)
6. Reddit, "Notion Credits to cost \$10 per 1,000 for Notion's Custom Agents (Starting May 4th)," r/Notion. [https://www.reddit.com/r/Notion/comments/1rd0u2j/](https://www.reddit.com/r/Notion/comments/1rd0u2j/)
7. Reddit, "Notion AI Agents, Steer clear," r/Notion. [https://www.reddit.com/r/Notion/comments/1rebn56/](https://www.reddit.com/r/Notion/comments/1rebn56/)
