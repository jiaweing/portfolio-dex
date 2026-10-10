---
title: "Nobody reads your README"
date: "2026-03-16"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Be honest: when was the last time you actually read a README from top to bottom?
If you're like most developers, the answer is somewhere between "never" and "I skimmed the install section." We copy-paste from Stack Overflow, ask ChatGPT, or just read the tests. The README sits in the repo like a welcome mat nobody wipes their feet on. And yet we keep writing them, keep telling junior devs they matter, keep pretending the ceremony is the point.
Here's the thing, developer documentation is broken, and it has been for a long time. But now that AI agents can read and reason over entire codebases, we're at an inflection point. The question isn't whether READMEs are useful. It's whether they're about to become essential infrastructure or a relic of a slower era.
## The write-once, update-never problem
Documentation fails for a boringly predictable reason: it's written once and then abandoned. Code ships fast. Features change. APIs evolve. But the docs? They sit in a parallel universe, drifting further from reality with every commit.
According to the 2025 Stack Overflow Developer Survey, technical documentation is the most-used learning resource, with nearly 68% of respondents relying on it. That's a staggering number of people depending on something that's almost always out of date.
The root cause isn't laziness. It's structural. Documentation lives in a separate context from the code it describes. A README in the repo root, a Confluence page three clicks deep, an API reference generated six months ago, none of these are tightly coupled to the actual behavior of the software. When the code changes, the docs don't know about it. Nobody gets a failing test because the README is wrong.
As one popular framing puts it: "From the perspective of a user, if a feature is not documented, then it doesn't exist, and if a feature is documented incorrectly, then it's broken." That's a nice philosophy, but in practice, most teams treat docs as a deliverable, not a living system.
## What developers actually do instead
Let's be real about how developers actually learn a new codebase:
1. **Read the tests.** A well-named test suite tells you what the code is supposed to do, and unlike a README, it breaks when the behavior changes.
2. **Ask an AI.** Tools like ChatGPT, Copilot, and Cursor have become the first stop for understanding unfamiliar code. Paste in a function, ask what it does, move on.
3. **Read the types.** In typed languages, a good type signature is documentation that the compiler enforces. `fn process(input: ValidatedRequest) -> Result<Response, ApiError>` tells you more than a paragraph of prose.
4. **Grep the codebase.** Search for how a function is actually used. Real call sites beat hypothetical examples every time.
5. **Check git blame.** The commit history tells you *why* something changed, not just what it does now.
Notice what's missing from that list: reading the README. It's not that developers are bad at reading. It's that the README is usually the least reliable source of truth in the entire project.
## AI agents already bypass your docs
Here's where it gets interesting. AI coding agents like GitHub Copilot, Cursor, and Claude don't start by reading your README. They read your code. They parse your types, scan your test suites, index your file structure, and infer intent from patterns across the codebase.
This is a fundamental shift. For decades, documentation existed because humans needed a bridge between "what the code does" and "what I need to know." AI agents don't need that bridge. They can walk through the code directly, at a speed and scale no human can match.
Some agents go even further. Tools are emerging that build semantic graphs of codebases, indexing every function, class, and relationship into a queryable structure. They don't need your README to understand your architecture. They can derive it.
So does this make documentation obsolete?
## The paradox: docs might matter more now
Here's the counterintuitive argument. AI coding agents are voracious consumers of context, and documentation is some of the highest-quality context you can provide. A well-written README doesn't just describe what the code does. It captures *intent*, *constraints*, and *decisions* that aren't visible in the code itself.
Why did you choose this architecture over that one? What are the known limitations? What should a contributor *not* do? These are things that can't be inferred from reading function signatures and test cases. They require human judgment, distilled into words.
The emergence of [AGENTS.md](http://AGENTS.md) makes this point explicitly. [AGENTS.md](http://AGENTS.md) is an open standard, now used by over 60,000 open-source projects, that provides a dedicated file for guiding AI coding agents. It's been described, quite literally, as "a README for agents." Supported by tools from OpenAI Codex, Cursor, Google's Jules, and others, it standardizes how projects communicate setup commands, code style preferences, and architectural decisions to AI assistants.
The irony is hard to miss: we spent years writing READMEs that humans ignored, and now we're writing new files specifically so that AI agents will read them.
## The counterargument: the code *is* the documentation
There's a compelling case on the other side too. If an AI agent can infer intent from code, tests, and git history, then maybe polished prose documentation is a net negative. It's one more thing to maintain, one more thing that can be wrong, one more thing that creates a false sense of understanding.
Consider a well-maintained TypeScript project with strict types, comprehensive tests, and descriptive commit messages. An AI agent working on this codebase has everything it needs:
- **Types** tell it what data flows where and what constraints exist.
- **Tests** tell it what behavior is expected and what edge cases matter.
- **Commit messages** tell it why changes were made and what trade-offs were considered.
In this world, the code truly documents itself, not in the hand-wavy way that phrase is usually used, but in a rigorous, machine-readable way. The documentation isn't absent. It's embedded in the artifacts that actually get maintained.
## The pragmatic middle ground
Both arguments have merit, and the right answer depends on your context. But if you're a solo developer or a small team, here's a practical framework:
**Invest in what stays true automatically.** Type signatures, test suites, and commit messages are documentation that the development process naturally keeps up to date. A failing test is a doc that screams "I'm out of date!" A README just quietly lies.
**Write docs for the "why," not the "what."** If your code explains what it does through types and tests, your documentation should focus on decisions, constraints, and context. Why this database and not that one? Why is this module structured differently from the rest? What are the known trade-offs?
**If you write for agents, write for humans too.** An [AGENTS.md](http://AGENTS.md) file is great, but if it contains information that a human contributor would also need, you've just fragmented your documentation. Consider whether one well-structured document can serve both audiences.
**Treat docs like code.** The docs-as-code movement has the right idea: store documentation in version control, review it in pull requests, and automate what you can. If your docs don't live next to your code, they will drift.
## The README of the future is a prompt
Here's a provocation to end on: the README of the future might not be a document you read. It might be a document you *query*.
Imagine a world where, instead of scrolling through a 500-line README, you ask your AI coding agent: "How do I add a new API endpoint to this project?" The agent reads your codebase, checks your [AGENTS.md](http://AGENTS.md), reviews your test patterns, and gives you a step-by-step answer grounded in how *your* project actually works. Not a generic tutorial. Not a blog post from 2019. A context-aware, project-specific answer.
In that world, the README isn't dead. It has been absorbed, turned from a static document into a layer of context that AI agents weave into real-time, personalized guidance.
The best developer experience is the one that requires the least context-switching. And right now, reading a README is a context switch. Asking an agent that's already read everything, that's just flow.
So no, nobody reads your README. But that might not be the problem you think it is. The real question is whether you've invested in the things that both humans and machines actually use, types, tests, commit messages, and clear architectural intent, or whether you've been polishing a document that was always more ceremony than substance.
## References
1. Stack Overflow, "2025 Developer Survey: Developers," [https://survey.stackoverflow.co/2025/developers](https://survey.stackoverflow.co/2025/developers)
2. [AGENTS.md](http://AGENTS.md), "A simple, open format for guiding coding agents," [https://agents.md/](https://agents.md/)
3. InfoQ, "[AGENTS.md](http://AGENTS.md) Emerges as Open Standard for AI Coding Agents," [https://www.infoq.com/news/2025/08/agents-md/](https://www.infoq.com/news/2025/08/agents-md/)
4. Zach Supalla, "Documentation-Driven Development," [https://gist.github.com/zsup/9434452](https://gist.github.com/zsup/9434452)
5. PostHog, "What nobody tells developers about documentation," [https://newsletter.posthog.com/p/what-nobody-tells-developers-about](https://newsletter.posthog.com/p/what-nobody-tells-developers-about)
6. Patrick Wright, "Why Most Developer Documentation Fails (And How to Fix It)," [https://patrickwright.io/why-most-developer-documentation-fails-and-how-to-fix-it/](https://patrickwright.io/why-most-developer-documentation-fails-and-how-to-fix-it/)
7. [Builder.io](http://Builder.io), "Improve your AI code output with [AGENTS.md](http://AGENTS.md)," [https://www.builder.io/blog/agents-md](https://www.builder.io/blog/agents-md)
