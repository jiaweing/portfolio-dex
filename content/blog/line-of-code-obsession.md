---
title: "Line of code obsession"
date: "2026-04-04T14:24:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

For about forty years, the software industry had one consensus: lines of code is a terrible metric. Dijkstra called it "a very costly measuring unit because it encourages the writing of insipid code." Bill Gates compared measuring programming progress by lines of code to measuring aircraft building progress by weight. Ken Thompson said one of his most productive days was throwing away a thousand lines.
Then AI showed up, and we brought it all back.
## The Garry Tan moment
In March 2026, Y Combinator CEO Garry Tan posted on X that he was averaging 17,000 lines of code per day across 15 concurrent agentic coding sessions. He later updated the number to 37,000 lines per day. The post went viral, racking up over a hundred thousand views, and it triggered exactly the reaction you'd expect: a mix of awe, mockery, and a Fast Company investigation that found "inefficiencies, code bloat, and rookie mistakes lurking in production."
Tan isn't alone. Every major tech CEO is now competing on what percentage of their code is written by AI. Sundar Pichai told investors that over 25% of Google's new code was AI-generated. Satya Nadella estimated 20 to 30% at Microsoft. Mark Zuckerberg predicted AI would handle half of Meta's development within a year. The numbers only go up, and they're always presented as achievements.
But here's the thing nobody seems to ask: should more code even be the goal?
## Less code has always been better
There's an old intuition among experienced developers that the best code is the code you don't write. Every line of code is a liability. It needs to be read, understood, tested, maintained, debugged, and eventually deleted. The less code it takes to solve a problem, the better the solution usually is.
This isn't just vibes. It's a principle that shows up repeatedly in software engineering history. Unix was built on the philosophy of small, composable tools that each do one thing well. The entire Redis codebase, one of the most widely used databases in the world, was famously kept lean by its creator Salvatore Sanfilippo. Rich Hickey, the creator of Clojure, has talked at length about how simplicity (not ease) is the core value of good software, and simplicity almost always means fewer moving parts.
When you ship less code that does the same job, you get:
- Fewer places for bugs to hide
- Less surface area for security vulnerabilities
- Faster onboarding for new team members
- Easier refactoring when requirements change
- Lower cognitive load for everyone who touches the codebase
The developer who solves a problem in 50 lines that someone else solved in 500 hasn't done less work. They've done more thinking.
## AI makes the problem worse, not better
We can ship more code than ever before. AI coding tools make it trivially easy to generate thousands of lines in minutes. But the cost of generating code dropping to near zero doesn't change the cost of maintaining it. If anything, it makes the maintenance problem worse, because now there's just more of it.
The data backs this up. GitClear analyzed 211 million lines of code across private repos and major open-source projects from 2020 to 2024. They found that copy-pasted code rose from 8.3% to 12.3%. Code blocks with five or more duplicated lines increased eightfold during 2024. Refactoring collapsed, with the percentage of moved and restructured lines dropping from 24.1% in 2020 to 9.5% in 2024. And code churn doubled: new code revised within two weeks of being committed grew from 3.1% to 5.7%.
In other words, 2024 was the first year where copy-pasted lines exceeded moved lines. We crossed a threshold. We're now generating more duplicate code than we're cleaning up existing code.
A randomized controlled trial by METR found that experienced open-source developers using AI tools took 19% longer to complete their tasks, but believed they were 20% faster. That's a 40-point perception gap. And the Stack Overflow 2025 Developer Survey found that 66% of developers say they spend more time fixing "almost-right" AI-generated code than they save in the initial writing phase.
More code. Worse code. Less understood code. And we're celebrating the "more" part.
## The LOC metric is broken, again
Lines of code failed as a productivity metric decades ago because it was gameable. A developer rewarded for writing more lines could just write verbose, redundant code. The industry spent years documenting this problem and eventually moved on.
AI didn't just repeat the mistake. It broke the mistake open.
When a human games LOC, there's natural friction. Writing unnecessary code takes effort. There's a ceiling because a person can only type so fast. Remove those limits, and an AI can produce ten thousand lines in the time a developer writes fifty. The cost of generating a line of code is now functionally zero. If LOC was misleading when it cost effort to produce, it's meaningless when it costs nothing.
As Allan MacGregor put it, this is Goodhart's Law with infinite leverage: the metric that was already broken is now the target for a system with infinite capacity to game it.
The replacement metric, acceptance rate (the percentage of AI suggestions developers accept), isn't better. Accepting code doesn't mean it's good code. A developer might accept a suggestion because it's close enough, because they're tired of rejecting and rewriting, or because the context-switching cost of evaluating each suggestion exceeds the cost of just taking it. "Not rejected" and "valuable" are not the same thing.
## What we should actually measure
If lines of code and acceptance rate are broken, what should replace them? The answer requires a shift from measuring inputs to measuring outcomes.
**Time-to-value.** Not "how fast did we write code" but "how long from identified need to working feature in production?" AI should compress this timeline. If it doesn't, the code volume is noise.
**Code half-life.** How long does new code survive before it needs revision? GitClear's data shows AI code gets revised faster. Code that gets rewritten in fourteen days was never finished.
**Defect origin rate.** What percentage of production defects trace back to AI-generated code versus human-written code? Not as blame, but as calibration. If AI code introduces defects at a higher rate, you need more review, not less AI.
**Comprehension coverage.** Can someone on the team explain how every critical path in the system works? If the answer is "the AI wrote that and nobody reviewed the logic," you have a time bomb.
Good metrics measure what happened after the code was written. Bad metrics measure what happened during writing. The act of writing code has never been the bottleneck. Understanding, design, and judgment are the bottleneck.
## The real flex is less code
We can ship more code than ever. But we shouldn't. The lesser LOC it takes to do something, the better the code is most of the time. That was true before AI, and it's even more true now.
The developer who uses AI to write 10,000 lines of code hasn't necessarily built anything better than the developer who used AI to write 200 lines that do the same job. In fact, I'd bet on the 200-line solution every time. It means someone actually thought about the problem, understood the constraints, and made deliberate choices about what to include and what to leave out.
The obsession with LOC as a flex, whether it's CEOs on earnings calls or developers on X, reveals a fundamental confusion about what software development actually is. It's not about producing code. It's about solving problems. And the best solutions are almost always the simplest ones.
Next time someone brags about shipping 37,000 lines of code in a day, ask them how much of it they can explain. Ask them what the code half-life is. Ask them how many of those lines will still exist in six months.
The real flex isn't how much code you can generate. It's how little code you need.
## References
1. Edsger Dijkstra, remarks on lines of code as a unit of measurement, [EWD 1036](https://www.cs.utexas.edu/~EWD/transcriptions/EWD10xx/EWD1036.html)
2. Allan MacGregor, "Lines of Code Are Back (And It's Worse Than Before)," [The Pragmatic CTO](https://www.thepragmaticcto.com/p/lines-of-code-are-back-and-its-worse)
3. Keegan Donley, "Lines of Code as a Productivity Metric in the AI Era," [keegan.codes](http://keegan.codes)
4. Garry Tan, post on X about shipping 17k lines of code per day, [March 15, 2026](https://x.com/garrytan/status/2033306615966060734)
5. Fast Company, "Y Combinator's CEO says he ships 37,000 lines of AI code per day. A developer looked under the hood," [fastcompany.com](http://fastcompany.com)
6. GitClear, "AI Assistant Code Quality" research report, 2025, [gitclear.com](http://gitclear.com)
7. METR, randomized controlled trial on AI coding tool productivity, referenced in The Pragmatic CTO
8. Stack Overflow, 2025 Developer Survey, [stackoverflow.com](http://stackoverflow.com)
9. DX, "Why lines of code are a bad measure of developer productivity," [getdx.com](http://getdx.com)
10. Veracode, 2025 report on security flaws in AI-generated code, [veracode.com](http://veracode.com)
