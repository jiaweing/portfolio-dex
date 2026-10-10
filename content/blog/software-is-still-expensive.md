---
title: "Software is still expensive"
date: "2026-04-28T18:48:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Agents","LLMs","Coding","Security","Economics","Productivity"]
---

You might think the cost of shipping software has dropped to near zero. AI can write code, generate tests, scaffold entire features in minutes. The tooling has never been better. So why does building good software still feel so expensive?
Because it is. The hard parts of software were never about typing code faster.
## The illusion of cheap
The narrative is seductive. AI coding assistants are everywhere, 91% of software companies now use AI-powered tools across their development lifecycle, and 61% expect AI to cut project budgets by 10 to 25%. GitHub Copilot, Cursor, Claude, and a growing list of agents can produce working code in seconds. If you squint, it looks like software is about to become free.
But producing code was never the bottleneck. Understanding the problem, designing the right solution, navigating edge cases, coordinating across teams, maintaining the thing for years after launch, that is where the real cost lives. AI hasn't touched most of that.
A study by METR found that experienced developers who believed AI made them 20% faster were actually 19% slower when objectively measured. The perception of speed doesn't always match reality.
## AI ships bugs faster too
Here's the uncomfortable truth: AI-generated code introduces more defects, not fewer. CodeRabbit's analysis of millions of pull requests found that AI-generated code contains 1.7 times more bugs than human-written code. Another study found that 45% of AI-generated code contains security flaws, with Java implementations failing over 70% of the time. Nearly 27% of AI-generated programs produce incorrect outputs, and about half have maintenance issues.
Silent logic failures, the kind that pass tests but break in production, make up 60% of faults in AI-generated code. These are the worst kind of bugs. They don't announce themselves. They quietly corrupt data, produce wrong results, and erode trust.
Stack Overflow's 2025 developer survey captured this tension perfectly: 84% of developers use or plan to use AI tools, but only 29% actually trust them. Usage is up, trust is down. That gap tells you something important.
## The new cost centers
AI hasn't eliminated costs. It has shifted them. Companies now face a whole category of expenses that didn't exist before.
**Code review is harder.** When a developer writes code, they understand the tradeoffs they made. When AI writes code, someone still needs to verify those tradeoffs, and the reviewer often lacks the context that a human author would have. As one senior engineer put it, every PR now consistently has 10+ changes and irrelevant formatting updates. Code that looks correct but was never deeply thought through. The New York Times reported that companies are struggling to hire enough application security engineers to monitor AI-generated code, with one adviser noting there aren't enough on the planet to satisfy what American companies alone need.
**Testing gets more expensive.** More code means more surface area to test. AI can generate tests too, but AI-generated tests often test the implementation rather than the behavior, missing the edge cases that matter. You still need humans who understand the domain to decide what to test and what "correct" actually means.
**Technical debt accumulates faster.** AI optimizes for getting something working now. It doesn't think about whether this pattern will scale, whether it conflicts with existing architecture, or whether someone will need to understand this code six months later. MIT Sloan Management Review warns that careless deployment of AI coding tools creates technical debt that compounds over time. When 50% of software development budgets are already wasted on bug fixes in poorly executed projects, adding more code faster doesn't help.
**Tooling costs add up.** AI tools aren't free. Licensing, API usage, compute costs, and training overhead for a team of 100 developers can run \$40,000+ per year in direct costs alone. And as The Pragmatic Engineer's survey found, the cost trajectory is generally considered unsustainable. Heavily subsidized enterprise plans come with vendor lock-in, and experienced engineering leaders recall that cloud providers played the same game, subsidizing for a few years, then raising prices once customers were fully locked in.
## Hard problems are still hard
Distributed systems are still hard. Security is still hard. Performance at scale is still hard. Making software that actually solves the right problem for real users is still hard.
AI excels at the mechanical parts of programming, the parts that were already getting easier with better frameworks and tooling. It doesn't help with the parts that make software expensive: understanding requirements, making architectural decisions, debugging production issues at 2 AM, migrating systems without downtime, or coordinating work across a team of humans with different mental models of the codebase.
These are judgment problems, not typing problems. And judgment is exactly what AI lacks.
## We need fewer engineers, better equipped
This isn't an argument against AI tools. They're genuinely useful. The right framing is that we need fewer engineers, but we need them to be better equipped and more skilled, not less.
An engineer with AI tools can absolutely produce more output. But "more output" only translates to "more value" when the engineer has the judgment to direct that output well. Writing code was never the hard part. Knowing what code to write, and more importantly what code not to write, that's the skill that matters more than ever.
The developer role is shifting from writer to conductor. You're orchestrating AI output, reviewing it critically, catching the things it misses, and making the architectural calls that determine whether the software actually works in production. That's not a less skilled job. It's a differently skilled one.
## The real equation
Software costs were never primarily about the labor of writing code. They were about the labor of thinking clearly about complex problems. AI has made the writing part cheaper, which is great, but the thinking part is just as expensive as it ever was.
If anything, AI raises the stakes. Moving faster means mistakes compound faster. More code means more to maintain. Easier creation means more things get built that probably shouldn't have been.
The companies that will build great software in this era aren't the ones that replaced their engineers with AI. They're the ones that gave their best engineers better tools and the time to use them thoughtfully.
Software is still expensive. It's just expensive in different places now.
## References
1. GoodFirms, "91% of Software Companies Use AI to Cut Development Costs in 2026" ([link](https://finance.yahoo.com/news/goodfirms-survey-91-software-companies-133000343.html))
2. METR, "Early 2025 AI Experienced OS Dev Study" ([link](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/))
3. CodeRabbit, "State of AI vs Human Code Generation Report" ([link](https://coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report))
4. Ranger, "Common Bugs in AI-Generated Code and Fixes" ([link](https://www.ranger.net/post/common-bugs-ai-generated-code-fixes))
5. Stack Overflow, "Mind the Gap: Closing the AI Trust Gap for Developers" ([link](https://stackoverflow.blog/2026/02/18/closing-the-developer-ai-trust-gap/))
6. The New York Times, "The Big Bang: A.I. Has Created a Code Overload" ([link](https://www.nytimes.com/2026/04/06/technology/ai-code-overload.html))
7. MIT Sloan Management Review, "The Hidden Costs of Coding With Generative AI" ([link](https://sloanreview.mit.edu/article/the-hidden-costs-of-coding-with-generative-ai/))
8. The Pragmatic Engineer, "The Impact of AI on Software Engineers in 2026" ([link](https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026))
9. MIT Technology Review, "AI Coding Is Now Everywhere. But Not Everyone Is Convinced" ([link](https://www.technologyreview.com/2025/12/15/1128352/rise-of-ai-coding-developers-2026/))
10. Forbes, "The Hidden Cost of Bad Software Practices" ([link](https://www.forbes.com/councils/forbestechcouncil/2025/03/28/the-hidden-cost-of-bad-software-practices-why-talent-and-engineering-standards-matter/))
11. DX, "Total Cost of Ownership of AI Coding Tools" ([link](https://getdx.com/blog/ai-coding-tools-implementation-cost/))
