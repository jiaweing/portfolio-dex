---
title: "Claude Code creator’s insane workflow"
date: "2026-03-13T12:18:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

On January 3, 2026, Boris Cherny, the creator and head of Claude Code at Anthropic, posted a thread on X breaking down exactly how he uses the tool he built. The post went massively viral, racking up nearly 8 million views. What surprised people most wasn't some elaborate multi-agent architecture or exotic customization. It was how simple his setup actually is.
The thread sparked a wave of discussion, analysis, and imitation across the developer community. Here's a deep look at what Boris shared, what developers learned from it, and why the underlying philosophy matters more than any individual tip.
## The setup is surprisingly vanilla
Boris opened with a disarming admission: his setup is not particularly fancy. Claude Code works well out of the box, and he doesn't customize it much. He runs five Claude Code sessions in parallel in his terminal, numbered one through five, and uses system notifications to know when a session needs input. On top of that, he runs five to ten more sessions on [claude.ai/code](http://claude.ai/code) in the browser, sometimes teleporting sessions between local and web using the `--teleport` flag. He even kicks off a few sessions from his phone each morning.
Each session gets its own separate git checkout of the same repository. Not branches, not worktrees, but full independent clones. This prevents conflicts between parallel agents working on different tasks. When asked about this, Boris confirmed he literally has the repo cloned multiple times, though on [claude.ai/code](http://claude.ai/code) this happens automatically when you start a session.
The model choice is equally straightforward. Boris uses Opus 4.5 with thinking enabled for everything. Despite being bigger and slower than Sonnet, he finds it ultimately faster because you have to steer it less and it handles tool use better. The upfront speed cost pays for itself in fewer corrections and less back-and-forth.
## Plan first, then execute
Perhaps the most important pattern in Boris's workflow is how he separates planning from execution. Most of his sessions start in Plan mode (accessed by pressing Shift+Tab twice). When the goal is to write a pull request, he goes back and forth with Claude in Plan mode until the plan looks right. Only then does he switch into auto-accept edits mode, at which point Claude can usually one-shot the entire implementation.
"A good plan is really important," Boris wrote. This resonated widely. Developers who ship consistently tend to invest heavily in planning. Those who struggle often skip it to save time, only to spend more time fixing mistakes downstream.
The pattern is simple: think first, then let the machine execute. It's the digital equivalent of measuring twice and cutting once.
## [CLAUDE.md](http://CLAUDE.md) as institutional memory
The Claude Code team shares a single `CLAUDE.md` file, checked into git. The whole team contributes to it multiple times a week. Whenever Claude does something incorrectly, they add a note so it doesn't make the same mistake next time. Each team at Anthropic maintains their own `CLAUDE.md` for their respective repositories.
What makes this particularly effective is how it integrates with code review. Boris frequently tags `@.claude` on coworkers' pull requests to add learnings to `CLAUDE.md` as part of the PR itself. Using the Claude Code GitHub Action, guidelines evolve alongside the codebase rather than living in a separate documentation silo. Despite this ongoing contribution from the whole team, their `CLAUDE.md` is only about 2,500 tokens long, keeping it focused and digestible.
This is what some have called "compounding engineering." Every correction becomes permanent context. The cost of a mistake pays dividends forever because the fix propagates to every future session that reads the file.
## Slash commands and subagents for repeated workflows
Boris uses slash commands for every "inner loop" workflow he does many times a day. These are stored in `.claude/commands/` and checked into git so the whole team benefits. His most-used command, `/commit-push-pr`, runs dozens of times daily. It uses inline bash to pre-compute git status and other context, making the command fast and avoiding unnecessary back-and-forth with the model.
He also uses a handful of subagents for common post-coding tasks:
- **code-simplifier** cleans up and simplifies code after Claude finishes working
- **verify-app** runs detailed end-to-end testing of the application
- Other subagents handle build validation, architecture checks, and on-call workflows
The philosophy here is to identify workflows you repeat constantly, then codify them. The same principle that makes `CLAUDE.md` powerful, applied to execution rather than knowledge.
## Hooks, permissions, and security
A `PostToolUse` hook automatically formats Claude's code after every write or edit operation. Claude generally produces well-formatted code, but the hook catches the last 10% of formatting inconsistencies that would otherwise cause CI failures.
On the security side, Boris almost never uses `--dangerously-skip-permissions`. Instead, he uses `/permissions` to pre-allow bash commands he knows are safe in his environment, things like `bun run build:*`, `bun run test:*`, and `bun run typecheck:*`. These permission settings are checked into `.claude/settings.json` and shared with the team, so everyone gets a consistent experience without constant approval prompts.
The one exception: for very long-running tasks inside a sandbox, he will use `--dangerously-skip-permissions` or `--permission-mode=dontAsk` so Claude can work uninterrupted for hours.
## External tools through MCP
Claude Code serves as the interface to all of Boris's external tools. Through MCP (Model Context Protocol) servers, Claude searches and posts to Slack, runs BigQuery queries for analytics, and pulls error logs from Sentry. The Slack MCP configuration is checked into `.mcp.json` and shared with the team, so tool access is standardized across developers.
This approach means Claude acts as a unified interface to the entire development ecosystem, not just the code editor.
## Long-running tasks and autonomous loops
For tasks that run longer than a typical session, Boris described three approaches:
1. **Prompt Claude to verify** its work with a background agent when it finishes
2. **Use an Agent Stop hook** for more deterministic verification at the end of a task
3. **Use the Ralph Wiggum plugin** (originally conceived by Geoffrey Huntley) for fully autonomous loops that can run for hours
The Ralph Wiggum plugin is designed for scenarios where Claude needs to keep working, evaluating its own output, and iterating without human intervention. Combined with sandboxed permission modes, this allows truly hands-off execution for well-defined tasks.
## The most important tip: verification
Boris saved what he considers the single most important insight for last. Give Claude a way to verify its work. If Claude has a feedback loop to check its output, the quality of the final result improves by two to three times.
For the [claude.ai/code](http://claude.ai/code) web application, Claude tests every change using the Chrome extension. It opens a browser, interacts with the UI, and iterates until everything works and the user experience feels right. But verification looks different depending on the domain:
- For backend code, it might be as simple as running a bash command or test suite
- For web applications, browser-based testing through the Chrome extension
- For mobile apps, testing through iOS or Android simulator MCPs
When asked how to set up good validation loops, Boris's answer was refreshingly simple: give Claude a tool to see the output of its code, describe the tool well, and Claude will figure out the rest. People tend to overcomplicate it.
## The community reaction
The thread generated over a thousand replies and extensive discussion. The most common reaction was surprise at the simplicity. As one popular comment put it, "Notice how he doesn't have 17 parallel subagents."
The most contentious point was resource usage. Boris's workflow, running 10 to 15 Claude instances simultaneously on Opus 4.5, burns through tokens at a rate that most developers on Pro or Max plans can't match. His daily token usage screenshot showed 2.4 million tokens in a single day. For context, he completes around 50 to 100 pull requests per week.
Some developers felt this made his advice unrealistic for typical users. Others pointed out that at API prices, 2.4 million tokens in a day costs roughly \$70, which is modest compared to an engineer's salary. The broader takeaway is that the *patterns* transfer even if the scale doesn't. Plan mode, shared `CLAUDE.md` files, slash commands, and verification loops all work regardless of how many instances you're running.
## What makes this workflow work
Looking at the full picture, a few principles emerge that explain why Boris's workflow is effective despite its apparent simplicity:
**Separation of concerns.** Planning and execution are distinct phases. Each parallel session handles one task in one git checkout. Formatting is handled by hooks, not by the model.
**Compounding knowledge.** `CLAUDE.md` grows smarter over time. Slash commands encode repeated workflows. Permission settings standardize the team experience. Every improvement persists.
**Verification as a force multiplier.** Rather than trying to make Claude perfect on the first attempt, the workflow assumes imperfection and builds in feedback loops. This is far more robust than optimizing prompts.
**Parallelization over optimization.** Instead of perfecting one session, Boris runs many simple sessions simultaneously. He round-robins between them, starting a new task as soon as a tab is free. The throughput comes from volume, not from squeezing more out of each individual interaction.
The real lesson from Boris's workflow isn't any single tip or tool configuration. It's that the fundamentals, planning, shared context, verification, and parallel execution, compound dramatically when applied consistently. The fancy customizations that many developers obsess over matter far less than getting these basics right.
## References
1. Boris Cherny, "I'm Boris and I created Claude Code" (X thread, January 3, 2026). [https://x.com/bcherny/status/2007179832300581177](https://x.com/bcherny/status/2007179832300581177)
2. Sergio De Simone, "Inside the Development Workflow of Claude Code's Creator," InfoQ (January 10, 2026). [https://www.infoq.com/news/2026/01/claude-code-creator-workflow/](https://www.infoq.com/news/2026/01/claude-code-creator-workflow/)
3. "How the Creator of Claude Code Uses Claude Code," [paddo.dev](http://paddo.dev) (January 5, 2026). [https://paddo.dev/blog/how-boris-uses-claude-code/](https://paddo.dev/blog/how-boris-uses-claude-code/)
4. "Claude Code creator Boris shares his setup with 13 detailed steps," r/ClaudeAI, Reddit (January 2026). [https://www.reddit.com/r/ClaudeAI/comments/1q2c0ne/claude_code_creator_boris_shares_his_setup_with/](https://www.reddit.com/r/ClaudeAI/comments/1q2c0ne/claude_code_creator_boris_shares_his_setup_with/)
5. Claude Code documentation, Anthropic. [https://code.claude.com/docs/en/slash-commands](https://code.claude.com/docs/en/slash-commands)
6. Claude Code documentation: Sub-agents, Anthropic. [https://code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents)
7. Claude Code documentation: Hooks guide, Anthropic. [https://code.claude.com/docs/en/hooks-guide](https://code.claude.com/docs/en/hooks-guide)
8. Ralph Wiggum plugin, Anthropic (GitHub). [https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-wiggum](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-wiggum)
