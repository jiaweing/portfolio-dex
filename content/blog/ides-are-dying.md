---
title: "IDEs are dying"
date: "2026-04-23T17:37:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Agents","IDE","DevTools","Coding","LLMs","OpenAI","Anthropic","Claude","Prompt Engineering","Vibe Coding"]
---

A few months ago, Steve Yegge declared 2026 "the year the IDE died." It's a bold claim, but it doesn't feel wrong. Between Claude Code, OpenAI Codex, Cursor's background agents, and a growing list of CLI-based coding tools, the way we write software is shifting under our feet. We're watching a new abstraction layer form in real time, and for the first time, the interface isn't a text editor. It's a conversation.
But I'm not fully sold. I still use an IDE. I still want to see the code. And I think there's a more nuanced story here than "IDEs are dead."
## The abstraction argument
Every major leap in programming has been an abstraction. Assembly abstracted machine code. C abstracted assembly. Python abstracted memory management and low-level control flow. Each layer traded granularity for speed, and each time, purists argued that the new layer would produce worse software.
AI coding agents are the next step in that chain. Instead of writing Python, you describe what you want in English, and an agent writes the Python for you. Andrej Karpathy called English "the hottest new programming language." The O'Reilly team described it as moving from precisely specified programming languages with small vocabularies to natural language with a huge vocabulary, flexible syntax, and lots of ambiguity. It's the same pattern we've seen before, just pushed one level higher.
The difference this time is that the abstraction doesn't just hide implementation details. It hides the code itself. When you use Claude Code or Codex to build a feature, you might never open the file it changed. You describe intent, the agent executes, and you verify the result. The feedback loop skips the editor entirely.
## Haven't we seen this before?
If this sounds familiar, it should. The no-code movement made the exact same promise. Platforms like Bubble, Webflow, and Retool said you'd never need to write code again. They offered visual abstractions, drag-and-drop builders, and the dream of democratized software development.
And for a while, it worked. For simple apps, internal tools, and MVPs, no-code platforms delivered. But they all hit the same wall. The moment you needed something the platform didn't anticipate, you were stuck. ThoughtWorks called it "the 10% trap," where 90% of what you need is easy, but the last 10% is either impossible or requires hacking around the platform's constraints. You'd end up learning proprietary internal logic instead of transferable skills.
AI coding agents feel different because the output is real code. You're not locked into a visual builder. The agent writes the same Python, TypeScript, or Rust that a human would. If the agent gets something wrong, you can open the file and fix it yourself. The escape hatch is always there.
But is the experience of using these agents actually that different from no-code in practice? When you're prompting an agent and accepting its output without reading the code, you're trusting an abstraction you don't fully control. The failure mode isn't a platform limitation. It's a context limitation. The agent doesn't know your codebase's five-year history of evolved patterns, your custom middleware, or your domain-specific conventions. As one developer put it when testing AI tools on a real production codebase with 800k lines, the results were very different from what the YouTube demos suggest.
## The orchestration problem
Here's where things get practical. Even if you buy the vision of agents replacing manual coding, the tooling isn't there yet.
I've tried most of them. Claude Code's built-in orchestration is limited. Codex runs tasks in the cloud but the feedback loop is slow. T3 Code is sluggish. OpenCode's desktop app has the same speed issues. The experience of managing multiple agents across a real project is still rough.
The closest thing I've found to a workable orchestrator is Vibe Kanban. It treats AI coding agents like a team you manage through a kanban board, with each task running in an isolated git worktree so parallel work stays separated until you decide what to merge. The concept is right: plan work, dispatch it to agents, review the output, merge what's good.
But even Vibe Kanban has friction. Worktrees are enabled by default with no option to disable them, which creates unnecessary overhead for simple changes. When you just want to fix a typo or adjust a config value, spinning up an isolated worktree is overkill. The tool assumes every task is a feature branch, but real development includes a lot of small, fast changes that don't need that level of isolation.
This is the gap that matters. The individual agents are getting better fast, but the layer that sits above them, the thing that lets you coordinate multiple agents on a real project, is still immature.
## Why I still use an IDE
I know this makes me sound like the assembly programmer who refused to use C. But there's a practical reason I keep my IDE open: agents get stuck.
Not on the hard problems, usually. They get stuck on simple things. A mismatched import. A type error that's obvious if you can see the file. A loop that's clearly wrong if you read the code. When that happens, I want to be able to jump in, make the fix, and move on. I don't want to spend three prompts explaining to an agent what I could fix in ten seconds with a keyboard shortcut.
Steve Yegge himself acknowledged this dynamic. He described "the Dracula effect," where vibe coding at full speed is physically draining, and argued that employers shouldn't reasonably expect more than three hours of AI-augmented work from engineers per day. The mental overhead of managing agents, reviewing their output, and course-correcting when they drift is real.
There's also the question of understanding. When I read code, I build a mental model of the system. That model is what lets me make good architectural decisions, catch subtle bugs, and know when the agent's suggestion is wrong. If I never read the code, that model atrophies. I become dependent on the agent's understanding, which is only as good as its context window.
## The real shift isn't about IDEs
I think the "IDEs are dying" framing misses the point. What's actually changing is the ratio of time developers spend writing code versus directing code.
The developers getting the most out of AI in 2026 aren't choosing between IDEs and agents. They're using both. Cursor for the 80% of work that involves active coding, iteration, and exploration. Codex for the 20% involving parallelizable tasks, automated workflows, and background processing. The tools represent complementary philosophies rather than competing products.
The IDE isn't dying. It's being demoted from the center of the workflow to one tool among many. You'll still open VS Code or Neovim or whatever you prefer. But you'll spend less time there, and more time in a terminal running agents, reviewing PRs they generated, and planning the next batch of tasks to dispatch.
That's a meaningful change. It just isn't the death of the IDE. It's the birth of a new layer on top of it.
## What comes next
The trajectory is clear. Agents will get better at maintaining context across large codebases. Orchestration tools will mature. The feedback loop between "describe what you want" and "get working code" will tighten.
But the transition won't be clean. We're in the awkward middle phase where the tools are good enough to change habits but not good enough to fully replace the old workflow. The developers who thrive will be the ones who can work at both levels, who can prompt an agent effectively and also drop into the code when the agent falls short.
The IDE isn't dead. But it's no longer the whole story. And that's probably the most interesting thing happening in software development right now.
## References
1. Steve Yegge and Gene Kim, "2026: The Year the IDE Died" (AI Engineer Conference talk), [YouTube](https://www.youtube.com/watch?v=7Dtu2bilcFs)
2. Steve Yegge, "The Future of Coding Agents," [Medium](https://steve-yegge.medium.com/the-future-of-coding-agents-e9451a84207c)
3. Gergely Orosz, "From IDEs to AI Agents with Steve Yegge," [The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/from-ides-to-ai-agents-with-steve)
4. O'Reilly, "The Abstractions, They Are A-Changing," [O'Reilly Radar](https://www.oreilly.com/radar/the-abstractions-they-are-a-changing/)
5. ThoughtWorks, "Low-code/no-code platforms: The 10% trap and the limits of abstractions," [ThoughtWorks](https://www.thoughtworks.com/en-au/insights/podcasts/technology-podcasts/low-code-no-code-platforms-ten_percent-trap-limits-abstractions)
6. Coder, "Is the IDE Dead? The Rise of Agentic AI in Software Development," [Coder Blog](https://coder.com/blog/is-the-ide-dead-the-rise-of-agentic-ai-in-software-development)
7. WaveSpeed AI, "Cursor vs Codex: IDE Copilot vs Cloud Agent," [WaveSpeed AI Blog](https://wavespeed.ai/blog/posts/cursor-vs-codex-comparison-2026/)
8. Vibe Kanban, [vibekanban.com](http://vibekanban.com)
9. Dino Esposito, "English will become the most popular development language in 6 years," [blog.almaer.com](http://blog.almaer.com)
