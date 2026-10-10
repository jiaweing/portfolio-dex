---
title: "Everyone’s a vibe coder"
date: "2026-03-25T13:33:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
pinned: true
---

Just over a year ago, Andrej Karpathy fired off what he called a "shower thoughts throwaway tweet" that ended up reshaping how the entire tech industry talks about writing software. He coined the term "vibe coding," describing a practice where you fully give in to the vibes, embrace the exponentials, and forget that the code even exists. He was using Cursor Composer with Claude Sonnet, talking to it via voice with SuperWhisper, hitting "Accept All" without reading diffs, and copy-pasting error messages with no commentary. When bugs proved stubborn, he'd just ask for random changes until they went away.
At the time, people were skeptical. It sounded reckless. Irresponsible, even. But here's the thing, Karpathy wasn't wrong. He was just early in naming something that was already happening beneath the surface. And now, a year later, vibe coding isn't a fringe experiment. It's the water we're all swimming in.
## The moment everything shifted
The real turning point wasn't the tweet. It was Claude Code.
When Anthropic released Claude Code in mid-2025, something clicked. It wasn't just another AI coding assistant. It was a delegation-first workflow. You didn't pair with it, you assigned tasks to it. You described what you wanted, and it went off and built it. It could reason across files, hold project context, run commands, and iterate on its own work.
Cursor, which had dominated the AI coding space, suddenly felt like a different category. Cursor is a control-first workflow, an accelerator for developers who already know what they're building. Claude Code is a delegator. You tell it what to do, and it does it. Both are valuable, but they represent fundamentally different relationships with code.
Then came OpenAI's Codex, which took the concept even further. Codex operates as a cloud-based agent that can spin up parallel tasks, each in its own sandboxed environment, working on your repository simultaneously. Companies like Temporal, Superhuman, and Kodiak Robotics started using it in production, not as an experiment, but as a core part of their engineering pipeline.
The speed of convergence was staggering. By late 2025, Karpathy himself wrote: "I've never felt this much behind as a programmer. The profession is being dramatically refactored as the bits contributed by the programmer are increasingly sparse." That post got over 22,000 likes and 3.6 million views. It resonated because every developer was feeling the same thing.
## The code review question
Here's where it gets interesting. If agents are writing the code, who's reviewing it?
Traditionally, code review was one of the most important quality gates in software development. A human reads the diff, understands the reasoning behind each change, checks for edge cases, and approves it. But when an AI agent generates a 2,000-line pull request, or even a 10,000-line one, can any human realistically review that with the same rigor?
The honest answer is no. And the industry knows it.
That's why tools like CodeRabbit and Graphite have exploded in popularity. CodeRabbit provides automated AI code reviews across platforms, catching patterns, logic bugs, and best practice violations. Graphite built an entire platform around stacked pull requests with AI review baked in. Greptile indexes your full codebase to catch deep, context-dependent bugs that surface-level reviews miss.
But here's the uncomfortable truth that CodeRabbit's own research surfaced: AI-generated code has 1.7x more issues and bugs than human-written code. The speed is there. The quality is lagging behind. Their framing for 2026 is telling: if 2025 was the year of speed, 2026 will be the year of quality.
So we're in this strange middle ground. AI writes the code. AI reviews the code. Humans are increasingly just orchestrating the flow between the two.
## From vibe coding to agentic engineering
Karpathy noticed the gap too. In February 2026, exactly one year after his original tweet, he posted a retrospective. He acknowledged that vibe coding had taken on a life of its own, but he wanted to draw a clear line between casual AI-assisted hacking and professional AI-assisted development.
His new term: agentic engineering.
The distinction matters. Vibe coding is prompting an AI, getting code back, and tweaking it until it works. Agentic engineering is designing systems and workflows where AI agents participate as first-class contributors, with context, validation loops, structured repositories, and human oversight.
As Karpathy put it: "Agentic, because the new default is that you are not writing the code directly 99% of the time. You are orchestrating agents who do and acting as oversight. Engineering, to emphasize that there is an art and science and expertise to it."
This is a meaningful reframe. It acknowledges that the skill hasn't disappeared, it's transformed. You're no longer valued for your ability to write a tight for-loop. You're valued for your ability to decompose problems, set up the right context for agents, validate their output, and maintain architectural coherence across a system that no single person fully understands.
## Does the code even matter anymore?
This is the question I keep coming back to. If agents are writing the code, and agents are reviewing the code, and agents will be maintaining the code, does the underlying quality of that code actually matter?
The traditional argument for clean code was always about human maintainability. We wrote readable code because other humans would need to understand it, extend it, debug it. We minimized technical debt because future developers would pay the cost.
But what if the future developers are agents too?
If an AI can refactor a messy codebase as easily as it can write one, the calculus changes. Technical debt becomes less of a long-term liability and more of a short-term tradeoff that can be resolved on demand. The code becomes disposable in a way it never was before.
That said, I don't think we're fully there yet. CodeRabbit's data about AI code quality suggests we're still in the "fast but fragile" phase. The agents are good enough to build things quickly, but not yet reliable enough to maintain complex systems without human judgment in the loop. The gap is closing fast, but it hasn't closed.
## The IDE is disappearing
There's another shift happening that's easy to miss if you're not paying attention. The traditional IDE, the place where developers stare at code all day, is losing its central role.
Cursor was arguably the first to experiment with a chat-first interface where you could interact with your codebase without looking at the raw code. Then Claude Code took a CLI-first approach, running entirely in your terminal. Codex went fully cloud-native, operating in remote sandboxes. The trajectory is clear: the interface between developer and code is becoming conversational, not visual.
This is a profound change. For decades, programming meant reading and writing text files in a specialized editor. Syntax highlighting, code folding, debugging breakpoints, these were the tools of the trade. Now, increasingly, the tool of the trade is a chat window where you describe what you want and review the results.
Cursor's own leadership has acknowledged this. According to Forbes, their priority is now building a model that can compete with Claude Code's autonomous capabilities, shifting focus away from making a better editor for humans who code alongside AI.
## Everyone's a vibe coder now
So here we are. The skeptics from a year ago have largely gone quiet, not because they were wrong about the risks, but because the momentum is undeniable. Vibe coding went from a joke to a workflow to the Collins English Dictionary Word of the Year for 2025.
The developers who swore they'd never accept code they didn't understand are now running multiple AI agents in parallel, merging PRs they've barely glanced at, and shipping faster than they ever have. The code review tools that were supposed to be the last line of defense are themselves powered by AI. The IDE is becoming a chat interface. The codebase is becoming something that agents maintain for other agents.
Is this sustainable? Maybe. The quality gap is real, and the incidents caused by AI-generated code in 2025 were unprecedented. But the tooling is evolving just as fast as the problems it creates. AI review tools are getting better. Testing frameworks are being redesigned for agentic workflows. And the developers who are thriving aren't the ones fighting the tide, they're the ones learning to orchestrate it.
Karpathy's evolution from vibe coding to agentic engineering tells the whole story. The vibes aren't going away. They're just getting professionalized. And whether you're a senior engineer orchestrating a fleet of AI agents or a non-technical founder building your first product with natural language, you're a vibe coder now.
The only question left is whether you're doing it with engineering discipline, or just vibes.
## References
1. [Andrej Karpathy's original "vibe coding" tweet, February 2025](https://x.com/karpathy/status/1886192184808149383)
2. [Vibe coding, Wikipedia](https://en.wikipedia.org/wiki/Vibe_coding)
3. [Karpathy's "agentic engineering" retrospective, February 2026](https://x.com/karpathy/status/2019137879310836075)
4. ["Vibe coding is passé," The New Stack, February 2026](https://thenewstack.io/vibe-coding-is-passe/)
5. ["AI Agents Wrote 80% of Karpathy's Code," Forbes, March 2026](https://www.forbes.com/sites/josipamajic/2026/03/22/ai-agents-wrote-80-of-karpathys-code-junior-developers-are-paying-the-price/)
6. ["The guy who coined vibe coding says AI is making programming unrecognizable," Business Insider, February 2026](https://www.businessinsider.com/andrej-karpathy-programming-unrecognizable-ai-2026-2)
7. ["2025 was the year of AI speed, 2026 will be the year of AI quality," CodeRabbit](https://www.coderabbit.ai/blog/2025-was-the-year-of-ai-speed-2026-will-be-the-year-of-ai-quality)
8. [Claude Code overview, Anthropic](https://code.claude.com/docs/en/overview)
9. [OpenAI Codex product page](https://openai.com/codex/)
10. ["Inside OpenAI's fast-growing Codex," Fast Company](https://www.fastcompany.com/91498841/openai-codex-growing-fast-agentic-engineering)
11. ["The future of Cursor is becoming Claude Code," Cursor Community Forum, March 2026](https://forum.cursor.com/t/the-future-of-cursor-is-becoming-claude-code/155326)
12. [Karpathy's 2025 LLM Year in Review](https://karpathy.bearblog.dev/year-in-review-2025/)
