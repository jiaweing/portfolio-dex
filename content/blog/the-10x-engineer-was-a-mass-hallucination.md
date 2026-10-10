---
title: "The 10x engineer was a mass hallucination"
date: "2026-03-17"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

The 10x engineer is one of software's most durable myths. For decades, it shaped how companies hired, how teams were structured, and how individual contributors measured their own worth. But the story was always built on shaky ground, and AI is now exposing the fault lines.
The original claim was never about what we thought it was. And what actually separates great engineers from average ones has nothing to do with typing speed, lines of code, or late-night heroics. It has everything to do with clarity.
## Where the number came from
The "10x" idea traces back to a 1968 study by Sackman, Erikson, and Grant at the System Development Corporation. They measured twelve programmers completing two tasks: an algebra problem and a maze-solving exercise. The variance they observed was striking, with ratios of roughly 10:1 in coding time and over 25:1 in debugging time between the best and worst performers.
But there are problems with taking this at face value. The study was tiny. It mixed programmers working in high-level and low-level languages. The tasks were mathematical puzzles, not representative software engineering work. And critically, it measured *time spent*, not output, impact, or quality. Sackman and colleagues themselves called it "exploratory," never intending it to become an industry law.
Yet the number stuck. Fred Brooks cited it in *The Mythical Man-Month* in 1975, writing that "the \$20,000/year programmer may well be 10 times as productive as the \$10,000/year one." He used this observation to argue for small, elite "surgical teams" built around a single brilliant programmer supported by nine other roles. The concept of the lone genius developer was born.
In 2019, Bill Nichols at the Software Engineering Institute published a formal rebuttal in *IEEE Software* titled "The End to the Myth of Individual Programmer Productivity." His analysis found that the original claims were "misleading and miss numerous important effects," and that extreme productivity differences were statistical aberrations driven by task variability, not inherent programmer ability. Larger studies failed to replicate the original ratios, and individual performance varied dramatically across different tasks, meaning the same person could look like a "10x" on one problem and average on another.
## What we actually observed
If the 10x engineer never existed in the data, what were companies actually seeing when they identified standout performers?
Gergely Orosz at *The Pragmatic Engineer* offers a useful breakdown. The person labeled "10x" was often someone who hoarded context in a high-turnover environment, making them indispensable by default. Or someone who wrote fast but unmaintainable code that created work for others. Or someone with strong business sense who picked the most visible projects. Or someone skilled at taking credit for team efforts.
None of these are engineering excellence. They are artifacts of broken systems.
The people who genuinely moved the needle shared a different trait entirely. They understood the problem before touching the keyboard. They could decompose ambiguous requirements into clear, testable components. They knew what *not* to build. They had what you might call architectural taste, the ability to see the whole system and make decisions that would still make sense six months later.
This was never about speed. It was about clarity of thought.
## AI as a mirror
AI coding tools have made this distinction impossible to ignore. Tools like Cursor, Copilot, and Claude can generate code at superhuman speed. They've effectively democratized the one thing that looked like "10x" from the outside: raw output velocity.
If the bottleneck in software engineering was ever typing speed, AI would have solved it by now. But the evidence says otherwise.
A 2025 randomized controlled trial by METR studied 16 experienced open-source developers completing 246 real tasks from repositories they maintained. Developers who used AI tools (primarily Cursor Pro with Claude 3.5/3.7 Sonnet) took **19% longer** than those who worked without AI. The developers themselves predicted AI would save them 24% of their time, and even after experiencing the slowdown, they still believed AI had helped.
This perception gap is revealing. AI creates what CIO magazine called "the illusion of velocity," code appears on screen at superhuman speed, and the blank page problem vanishes. But the engineer's role shifts from creator to reviewer, and that's where time disappears. For experienced developers working on complex, familiar codebases with high quality standards, the overhead of reviewing, correcting, and integrating AI-generated code outweighed the speed of generation.
Bain & Company found similar patterns at scale: teams using AI assistants saw 10% to 15% productivity boosts, but the time saved rarely went toward higher-value work, so even those modest gains didn't translate into positive returns.
The lesson isn't that AI is useless for coding. It's that AI amplifies whatever you bring to it. If you bring clarity, good problem decomposition, and strong architectural judgment, AI accelerates your work. If you bring vague requirements and unclear thinking, AI generates plausible-looking code that creates more work downstream.
## 10x clarity over 10x code
The real multiplier was never the person who wrote the most code. It was the person who asked the right question before anyone else started writing.
Consider what this looks like in practice:
- The engineer who spends two hours understanding a problem and then writes fifty lines that solve it cleanly, versus the one who immediately starts coding and produces five hundred lines that mostly work
- The architect who says "we don't need this microservice" and saves the team three months of complexity
- The tech lead who writes a one-page design doc that prevents three rounds of refactoring
- The developer who reads the error message carefully instead of asking an AI to generate ten possible fixes
These are all expressions of clarity. And they compound. A clear problem statement leads to a clean architecture, which leads to maintainable code, which leads to fewer bugs, which leads to faster iteration. The multiplier isn't 10x on any single task. It's the cascading effect of good thinking applied consistently.
AI makes this gap wider, not narrower. When everyone has access to the same code generation tools, the differentiator becomes the quality of the instructions. The person who can write a precise, well-scoped prompt, or better yet, who knows exactly what to build before prompting anything, will get dramatically better results than the person who types "make it work" and hopes for the best.
## What this means for hiring and teams
If the 10x engineer myth shaped how we hired, then dismantling it should reshape hiring too.
Companies that screened for speed and confidence, the classic "10x" signals, were often selecting for the wrong traits. Timed coding challenges favor people who've memorized patterns, not people who think deeply. Whiteboard interviews reward performance under pressure, not the careful analysis that produces great systems.
The better signals are harder to measure but more predictive: How does someone decompose a problem they haven't seen before? Can they articulate what they *wouldn't* build? Do they ask clarifying questions, or do they start coding immediately? When they review code, do they catch architectural issues or just style nits?
These are expressions of clarity. And in a world where AI handles more of the mechanical work of programming, they are the skills that matter most.
## The myth served a purpose
It's worth asking why the 10x engineer myth persisted for so long despite weak evidence.
Part of it is that the software industry needed heroes. In the early days, programming was poorly understood, and the people who could make computers do useful things seemed like wizards. The myth gave companies a simple hiring heuristic: find the wizard, pay them well, and let them work.
Part of it is that variance in software engineering is real, just not in the way the myth suggests. There genuinely are massive differences in the *value* different engineers produce. But that value comes from judgment, experience, and clarity of thought, not from some innate coding ability that can be measured in a lab.
And part of it is that the myth was flattering. Every programmer wanted to believe they were the 10x one. It turned a collaborative craft into an individual sport, which felt good even as it made teams worse.
AI didn't kill the 10x engineer. It revealed that the emperor had no clothes. The bottleneck was never keystrokes. It was always thinking.
## References
1. Sackman, H., Erikson, W. J., & Grant, E. E. (1968). "Exploratory Experimental Studies Comparing Online and Offline Programming Performance." *Communications of the ACM*, 11(1), 3-11. [https://dl.acm.org/doi/10.1145/362851.362858](https://dl.acm.org/doi/10.1145/362851.362858)
2. Nichols, W. (2019). "The End to the Myth of Individual Programmer Productivity." *IEEE Software*, 36(5), 71-75. [https://doi.org/10.1109/MS.2019.2908576](https://doi.org/10.1109/MS.2019.2908576)
3. Brooks, F. P. (1975). *The Mythical Man-Month: Essays on Software Engineering*. Addison-Wesley.
4. Orosz, G. (2024). "The '10x Engineer:' 50 Years Ago and Now." *The Pragmatic Engineer*. [https://blog.pragmaticengineer.com/the-10x-engineer-evolution/](https://blog.pragmaticengineer.com/the-10x-engineer-evolution/)
5. Becker, J., Rush, N., Barnes, E., & Rein, D. (2025). "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity." *METR*. [https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
6. Bain & Company. (2025). "From Pilots to Payoff: Generative AI in Software Development." [https://www.bain.com/insights/from-pilots-to-payoff-generative-ai-in-software-development-technology-report-2025/](https://www.bain.com/insights/from-pilots-to-payoff-generative-ai-in-software-development-technology-report-2025/)
7. Shrikanth, N. C. et al. (2021). Referenced in "The End to the Myth of Individual Programmer Productivity." *ResearchGate*. [https://www.researchgate.net/publication/335535826](https://www.researchgate.net/publication/335535826)
