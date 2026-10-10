---
title: "Go far with AI"
date: "2026-04-27T18:32:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Vibe Coding","Prompt Engineering","Coding","Testing","Security","Productivity","Mindset","Philosophy","Safety"]
---

In February 2025, Andrej Karpathy coined the term "vibe coding" to describe a new way of building software: you talk to an AI, accept whatever it generates, and forget the code even exists. It was exhilarating. It was fast. And for throwaway weekend projects, it was genuinely fun.
But somewhere along the way, vibe coding became the default. Not just for prototypes, but for production systems, startup MVPs, and even enterprise features. The speed was intoxicating, and the results looked impressive, at least on the surface.
Here's the thing: speed and distance are not the same. If you want to go fast, vibe code. If you want to go far, understand what you're building.
## The allure of speed
It's easy to see why vibe coding took off. Karpathy's original description captured the feeling perfectly: "I 'Accept All' always, I don't read the diffs anymore. When I get error messages I just copy paste them in with no comment, usually that fixes it."
That workflow is seductive. You describe what you want in plain English, watch code materialize, and nudge the output until it looks right. The feedback loop is tight. The dopamine is real. You can go from idea to working prototype in hours instead of days.
And the tools keep getting better. AI coding assistants now write an estimated 41% of all new commercial code. Developers report feeling 20% faster. The productivity gains seem undeniable.
Except they aren't always what they seem.
## The speed trap
A Stack Overflow analysis found something counterintuitive: while developers *felt* roughly 20% faster with AI tools, they actually measured 19% slower when accounting for the full development lifecycle. The gap between perceived velocity and actual throughput is one of the defining tensions of this moment in software.
Why the disconnect? Because building software isn't just about generating code. It's about understanding what the code does, why it does it, and what happens when conditions change.
Vibe-coded projects tend to follow a predictable arc. The first few weeks feel magical. Features ship fast. The demo looks great. But then something breaks in production, or a security audit surfaces issues, or a new requirement collides with assumptions buried deep in AI-generated logic that nobody fully understands.
This is what some developers now call "instant legacy code," a codebase where the bus factor is zero from day one, because no one ever had a mental model of how it works.
## What understanding actually means
Understanding what you're building doesn't mean rejecting AI tools. It means using them differently.
Addy Osmani drew a useful distinction between "vibe coders" and "AI-assisted engineers." Vibe coders collaborate with AI in a free-flowing, conversational way, acting as orchestrators who focus on ideas over syntax. The upside is speed and creativity. The downside is a lack of control: minimal code review, sparse tests, and blind trust in AI outputs.
AI-assisted engineers, by contrast, use the same tools but maintain a deliberate grip on architecture, testing, and system design. They treat AI as a collaborator, not a replacement for judgment.
The difference isn't about typing more code. It's about maintaining a mental model of what your system does and why.
## The technical debt tsunami
The costs of skipping that understanding are becoming measurable. GitClear reported a 60% decline in refactored code in AI-heavy projects, alongside a 48% increase in copy-paste patterns. Ox Security found that AI-generated code is "highly functional but systematically lacking in architectural judgment," identifying 10 common architecture and security anti-patterns in AI outputs.
The debt pattern that vibe coding creates is different from classic legacy code. It's not necessarily old or poorly written. In many cases, it's modern, well-formatted, and logically correct in isolation. The risk comes from accumulation: implicit architecture that nobody designed intentionally, shallow understanding where developers know *that* something works but not *why*, and overcoupled components that bleed into each other because AI optimizes locally without seeing the bigger picture.
Some estimates put the cost of unmanaged AI-generated technical debt at 4x normal maintenance costs by year two. Companies that moved aggressively to replace experienced developers with AI prompts are now facing what one analysis called a "\$61 billion technical debt crisis."
## The fundamentals are more important, not less
There's an irony in all of this. AI was supposed to make software engineering fundamentals obsolete. Instead, it's making them more important than ever.
Teams that struggled with vibe coding's consequences are rediscovering practices they thought they'd outgrown: writing specifications before generating code, demanding thorough code reviews, making documentation mandatory, and writing acceptance tests first. Stage four of the AI adoption cycle looks remarkably similar to the disciplined engineering practices many teams abandoned in the rush to go fast.
As one developer put it: "You still should not be committing code that you don't understand to a production environment. While generative AI can speed up development, software engineers must be able to explain their code, identify security issues, and maintain it over time."
This isn't about gatekeeping or nostalgia. It's about recognizing that the hard parts of software, the architecture, the edge cases, the security model, the maintainability, haven't gotten easier just because the typing got faster.
## A better way to use AI
The developers who are genuinely going far with AI tend to share a few habits.
They **understand before they generate**. They think about what they need before asking AI to write it. They have a clear picture of the architecture, the constraints, and the failure modes. The AI fills in implementation details, but the human holds the blueprint.
They **review everything**. Not with a rubber stamp, but with genuine scrutiny. They read the diffs. They question the patterns. They ask themselves whether they could explain this code to a colleague in six months.
They **keep changes small**. Instead of generating entire features in one pass, they work in tight, incremental loops. Small changes are easier to understand, easier to test, and easier to revert when something goes wrong.
They **refactor deliberately**. After getting something working with AI assistance, they go back and clean it up. They consolidate duplicated logic, ensure consistent patterns, and document the decisions that matter. This step is where understanding deepens.
They **invest in tests**. Tests aren't just a safety net. They're a specification. Writing tests first gives AI better context and gives humans a way to verify that generated code actually does what it should.
## Going far
Vibe coding is a legitimate tool for exploration, prototyping, and learning. Karpathy was right that it's "not too bad for throwaway weekend projects." The problem isn't the technique itself. It's the conflation of speed with progress.
Building something that lasts, something that scales, something you can maintain and evolve, requires understanding. Not understanding every line of syntax, but understanding the system: its purpose, its boundaries, its failure modes, and its design.
AI makes the mechanical parts of coding faster. That's genuinely valuable. But it doesn't make the thinking faster. And the thinking is what separates software that works today from software that still works next year.
If you want to go fast, vibe code. If you want to go far, understand what you're building.
## References
1. Andrej Karpathy, original "vibe coding" post on X (February 2025), [x.com/karpathy/status/1886192184808149383](http://x.com/karpathy/status/1886192184808149383)
2. Addy Osmani, "Vibe coding is not the same as AI-Assisted engineering" (Medium), [medium.com/@addyosmani/vibe-coding-is-not-the-same-as-ai-assisted-engineering](http://medium.com/@addyosmani/vibe-coding-is-not-the-same-as-ai-assisted-engineering)
3. RocketDevs, "The AI Technical Debt Crisis: Why the Fastest Codebases in 2026 Are Becoming the Most Fragile," [rocketdevs.com/blog/AI-Technical-Debt-Crisis](http://rocketdevs.com/blog/AI-Technical-Debt-Crisis)
4. Ox Security, "Army of Juniors: The AI Code Security Crisis" report (October 2025), [ox.security/army-of-juniors](http://ox.security/army-of-juniors)
5. Amplifi Labs, "The Hidden Risks of Vibe Coding and the Technical Debt It Leaves Behind," [amplifilabs.com/post/the-hidden-risks-of-vibe-coding](http://amplifilabs.com/post/the-hidden-risks-of-vibe-coding)
6. Simon Willison, "Not all AI-assisted programming is vibe coding (but vibe coding rocks)," [simonwillison.net/2025/Mar/19/vibe-coding](http://simonwillison.net/2025/Mar/19/vibe-coding)
7. Ali Spittel, "Teaching Code in the AI Era: Why Fundamentals Still Matter" (DEV Community), [dev.to/aspittel/teaching-code-in-the-ai-era](http://dev.to/aspittel/teaching-code-in-the-ai-era)
8. Murat Aslan, "The Ironic Return: How AI Brought Back the Software Engineering Practices We Thought We'd Outgrown" (Dev Genius), [blog.devgenius.io](http://blog.devgenius.io)
