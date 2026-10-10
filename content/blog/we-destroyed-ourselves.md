---
title: "We destroyed ourselves"
date: "2026-02-26"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: []
---

Every six months, someone declares software engineering dead. It happened with code generators in the 90s, with outsourcing in the 2000s, with no-code platforms in the 2010s. Now it's AI's turn. But this time, the twist cuts deeper: **the engineers themselves built the very tools that are coming for their jobs.**
That's the irony worth sitting with. Not that automation threatens work, it always has, but that the people most capable of building powerful tools pointed those tools squarely at their own craft.
## The cycle that never dies
The "software engineering is dead" take has been recycled for decades. Every new wave of technology promised to make developers obsolete. Code generators would write all the code. Offshore teams would do it cheaper. Drag-and-drop builders would let anyone ship software without writing a line.
And every single time, the opposite happened. Demand for engineers grew. The tools lowered barriers, which created more software, which created more complexity, which created more need for people who understood systems deeply.
AI feels different this time, and maybe it is. But the pattern is worth remembering before we panic.
## The numbers are real, though
The shift isn't just vibes. The data tells a clear story.
Entry-level tech hiring has collapsed. According to Ravio's 2025-2026 tech job market reports, junior-level hiring fell **73.4% year-over-year**, far outpacing the overall hiring decline of about 7% across seniority levels. SignalFire's data shows that entry-level hiring at the 15 largest US tech companies dropped significantly from 2023 to 2024. AI-driven layoffs in 2025 and 2026 have hit companies like Pinterest, Autodesk, Amazon, and Salesforce.
Meanwhile, AI-related roles surged 88% year-on-year in 2025. The average salary for AI engineers in the US now hovers around \$206,000, a jump of roughly \$50,000 from 2024 levels.
The message from the market is blunt: companies want fewer people writing code and more people building and managing AI systems.
## The irony, spelled out
Here's what makes this moment genuinely strange.
Software engineers spent decades building tools to make coding faster and easier. Better frameworks. Better abstractions. Better developer tooling. The entire arc of the profession has been about reducing the friction of turning ideas into working software.
And it worked. It worked so well that the tools eventually got good enough to write code on their own. Cursor, Claude Code, GitHub Copilot, Windsurf, and a growing ecosystem of AI coding assistants can now generate, debug, and refactor code at a pace no human can match.
The engineers who built the hammer are now watching the hammer swing itself.
## But the hammer keeps missing
There's a catch that the "engineering is dead" crowd consistently overlooks: **AI-generated code creates enormous downstream problems.**
A Stack Overflow analysis found that experienced developers are actually **19% slower** when using AI tools, partly because the time saved on writing code gets eaten up by reviewing, debugging, and fixing AI output. Sonar's research found that **88% of developers** report at least one negative impact of AI on technical debt, with 53% saying AI creates code that looks correct but is unreliable. Another 40% say AI increases debt by generating unnecessary or duplicative code.
The pattern is predictable. AI writes code fast, but it writes code like someone who has read every tutorial and understood none of the context. It doesn't know why a system was built a certain way. It doesn't understand the business constraints. It can't weigh tradeoffs that require institutional knowledge.
Someone still has to architect the system. Someone still has to review the output. Someone still has to debug the production incident at 3am. Someone still has to decide *what* to build in the first place.
## The real shift: from writing to thinking
What's actually happening isn't the death of software engineering. It's a transformation of what the job means.
The role is shifting from **syntax to strategy**. Less time typing code, more time designing systems, defining requirements, reviewing AI output, and making architectural decisions. As Gergely Orosz at The Pragmatic Engineer put it, product folks and designers can now build their own prototypes, which means the baseline expectation for developers is changing, not disappearing.
Morgan Stanley's analysis argues that AI in software development is more likely to create jobs than destroy them, because cheaper software production means more software gets built, which means more complexity to manage.
This is the same pattern we've seen before. Spreadsheets didn't eliminate accountants. CAD software didn't eliminate architects. The tools changed *what* those professionals spend their time on.
## The pipeline problem nobody's talking about
There's a deeper irony buried in the hiring data. If companies stop hiring juniors because AI handles the grunt work, who becomes the next generation of senior engineers?
The skills that make senior engineers valuable, deep system understanding, architectural intuition, the ability to debug problems that span multiple services, those skills are built through years of doing the "grunt work" that AI is now automating. As Lisanne Bainbridge's classic 1983 paper on automation ironically noted: automated systems built by skilled operators depend on skills that future operators won't have the opportunity to develop.
Entry-level software jobs dropped from 43% to 28% of postings. That's not just a market correction. It's a potential talent crisis in slow motion. The companies saving money today by replacing junior developers with AI may find themselves, five years from now, desperately short of engineers who actually understand how their systems work.
## So, did we destroy ourselves?
Not quite. But we did build something that forces a reckoning with what it means to be a software engineer.
The engineers who treat coding as their primary skill are in trouble. The engineers who treat coding as one tool among many, who think in systems, who communicate well, who understand the *why* behind the *what*, they'll be fine. More than fine, probably. The demand for that kind of thinking isn't going away.
The irony isn't that software engineers destroyed themselves. It's that they destroyed the *version* of themselves that was defined by writing code. What's left is arguably the more interesting part of the job: the thinking, the designing, the deciding.
Whether that's a tragedy or a liberation depends entirely on how you define the craft.
## References
1. [Ravio 2025-2026 Tech Job Market and Compensation Reports](https://ravio.com/tech-jobs-report-2025), on entry-level hiring decline of 73.4% and AI role growth of 88%
2. [SignalFire State of Talent Report 2025](https://www.signalfire.com/blog/signalfire-state-of-talent-report-2025), on entry-level hiring decline at top 15 US tech companies
3. [Stack Overflow: AI can 10x developers...in creating tech debt](https://stackoverflow.blog/2026/01/23/ai-can-10x-developers-in-creating-tech-debt/), on experienced developers being 19% slower with AI tools
4. [Sonar: How AI is Redefining Technical Debt](https://www.sonarsource.com/blog/how-ai-is-redefining-technical-debt/), on 88% of developers reporting negative impacts of AI on technical debt
5. [Morgan Stanley: AI in Software Development](https://www.morganstanley.com/insights/articles/ai-software-development-industry-growth), on AI creating jobs rather than eliminating them
6. [The Pragmatic Engineer: When AI Writes Almost All Code](https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what), on the shifting value of developer expertise
7. [IEEE Spectrum: How to Stay Ahead of AI as an Early-Career Engineer](https://spectrum.ieee.org/ai-effect-entry-level-jobs), on early-career hiring trends
8. [SF Standard: AI Writes the Code Now](https://sfstandard.com/2026/02/19/ai-writes-code-now-s-left-software-engineers/), on the state of engineering roles in 2026
9. [Bainbridge, L. (1983). Ironies of Automation. ](https://ckrybus.com/static/papers/Bainbridge_1983_Automatica.pdf)[*Automatica*](https://ckrybus.com/static/papers/Bainbridge_1983_Automatica.pdf)[, 19(6), 775-779](https://ckrybus.com/static/papers/Bainbridge_1983_Automatica.pdf), on the irony that automated systems depend on skills future operators won't develop
10. [Interview Query: Companies Freezing Entry-Level Jobs](https://www.interviewquery.com/p/companies-freezing-entry-level-jobs-talent-crisis), on entry-level job postings declining from 43% to 28%
