---
title: "LeetCode ruined software"
date: "2026-04-04T15:53:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: []
---

Something strange happened to software engineering. We built AI that writes production code, invented agents that debug entire systems, and reimagined how software gets made from the ground up. Yet when it comes to hiring the people who do this work, we're still asking them to reverse a linked list on a whiteboard.
LeetCode-style interviews have dominated tech hiring for over a decade. And despite everything that's changed about the industry, they refuse to die.
## The disconnect
Here's the core problem: LeetCode interviews test algorithmic puzzle-solving under time pressure. The actual job of a software engineer involves collaborating with teammates, navigating ambiguous requirements, debugging production systems, and making tradeoffs across complex codebases.
A frontend engineer applying to build user interfaces still gets asked to implement a red-black tree. A backend developer who will spend most of their time writing API integrations and managing infrastructure is graded on whether they can solve a dynamic programming puzzle in 45 minutes. The skills being tested and the skills being used on the job barely overlap.
Ryan Peterman, a software engineer at Meta, has written about why this persists. The problems are deliberately harder than real work, he explains, because big tech companies have so many applicants that false negatives don't matter to them. If a great engineer can't solve the puzzle, there are hundreds more in line. It's a filtering mechanism, not an evaluation of engineering ability.
This made a certain kind of sense when the biggest challenge was sorting through volume. But in 2026, the landscape looks completely different.
## AI broke the whole model
The rise of generative AI didn't just change how software gets written. It obliterated the assumptions underpinning LeetCode interviews.
In March 2025, CNBC profiled Chungin "Roy" Lee, a 21-year-old Columbia University student who built Interview Coder, a tool that invisibly feeds candidates AI-generated answers during virtual coding interviews. He used it to land internship offers from Amazon, Meta, and TikTok, then posted a video of himself passing an Amazon interview with AI assistance. The offers were rescinded, but Lee's point was made.
"Everyone programs nowadays with the help of AI," Lee told CNBC. "It doesn't make sense to have an interview format that assumes you don't have the use of AI."
Lee's tool isn't an outlier. Leetcode Wizard, another cheating service, reported that over 16,000 people had used its app, with "several hundred" receiving job offers as a result. These tools are invisible to screen-recording software, webcam-proof, and increasingly undetectable.
Henry Kirk, a software developer and co-founder of Studio.init in New York, hosted a virtual coding challenge for an engineering role. Out of 700 applicants, he estimated that more than 50% cheated. "The problem is now I don't trust the results as much," Kirk said. "I don't know what else to do other than on-site."
Google CEO Sundar Pichai raised the issue at an internal town hall in February 2025, suggesting that the company consider returning to in-person interviews. Deloitte reinstated in-person interviews for its U.K. graduate program. Even Anthropic, the maker of Claude, began asking candidates not to use AI assistants during the application process.
The irony is thick. Companies that market themselves as AI-first are telling candidates not to use AI. Companies whose own CEOs boast that 25% of their new code is written by AI are penalizing engineers who use AI to demonstrate coding ability.
## What LeetCode actually selects for
If we're honest about what LeetCode-style interviews measure, the list is short:
- **Memorization.** Many problems have known optimal solutions that candidates study and rehearse. The interview rewards pattern recognition, not creativity.
- **Time pressure tolerance.** Solving a hard algorithmic problem in 45 minutes while someone watches you is a very specific skill. It doesn't predict how someone performs across weeks of real project work.
- **Willingness to grind.** Lee spent 600 hours practicing LeetCode before building Interview Coder. He said it made him miserable and nearly drove him away from programming entirely. That's not an uncommon story.
What these interviews don't measure is arguably more important: how someone communicates technical decisions, how they collaborate on a team, how they approach ambiguity, how they debug systems they didn't build, and how they handle the messy reality of production software.
Former Meta staff engineer Yangshun Tay captured the tension perfectly in a LinkedIn post about Lee's viral video: "I as an interviewer am so annoyed by him but as a candidate also adore him. Cheating isn't right, but oh god I am so tired of these stupid algorithm interviews."
## The alternatives emerging
The good news is that the cracks in the LeetCode model are finally producing real alternatives.
### Paid work trials
One of the most promising shifts is the rise of paid trial periods. Instead of evaluating a candidate in a 45-minute artificial setting, companies hire them for a short paid engagement, typically a few days to a couple of weeks, to work on real problems with the actual team.
Work Trial AI, a product from Final Round AI, has facilitated over 10,000 work trials since its launch. The platform tracks how candidates use real tools like GitHub, Slack, Notion, and Figma, surfacing not just the output but the process behind it. Companies like Linear, PostHog, and Automattic have adopted this approach.
The logic is straightforward: if you want to know how someone performs on the job, let them do the job. Trial periods reveal culture fit, collaboration style, ability to adapt to shifting priorities, and technical skill in context, all things a LeetCode problem cannot surface.
### Take-home projects with review
Some companies have moved to take-home coding projects where candidates build something closer to real work, then walk through their decisions in a follow-up conversation. This approach gives candidates time to think, use resources naturally, and demonstrate how they approach problems, not just whether they've memorized the optimal solution.
### System design and behavioral depth
Others have shifted weight toward system design interviews and deep behavioral questions. These formats evaluate how candidates think about architecture, tradeoffs, and past experience. They're harder to game with AI because they require genuine understanding and the ability to think on your feet about your own work.
### AI-native interviews
Perhaps the most forward-thinking approach is to embrace AI rather than ban it. Meta began experimenting with AI-enabled coding interviews where candidates are expected to use AI tools, and the evaluation focuses on how effectively they use them. This acknowledges the reality that AI is already part of every engineer's workflow.
## What needs to change
The path forward requires a few honest admissions from the industry.
**LeetCode was always a compromise, not a standard.** It was adopted because it was cheap to administer at scale, not because it was the best way to evaluate engineers. The fact that an entire cottage industry of prep courses, coaching services, and now cheating tools has sprung up around it is evidence that the signal it produces is weak.
**AI made the compromise untenable.** When anyone can generate a correct solution to a LeetCode hard problem in seconds, the test no longer measures what it was designed to measure. Banning AI from interviews while encouraging it everywhere else is not a sustainable position.
**Hiring is an investment, not a filter.** The LeetCode model treats hiring as a funnel optimization problem, minimizing false positives at the cost of massive false negatives. A work trial treats hiring as a mutual evaluation, something that costs more upfront but produces far better outcomes for both sides.
The engineers complaining about LeetCode aren't lazy. Many of them are experienced professionals who have shipped real products, led teams, and solved hard problems in production. They're frustrated because the interview process bears no resemblance to the work they've spent years doing.
## Where we go from here
The LeetCode era isn't over yet. Big tech companies still use it, and candidates still grind through it. But the foundations are crumbling. AI cheating tools have made the format unreliable. The rise of work trials and practical assessments offers a credible alternative. And a growing number of engineers, including those who conduct interviews, are openly saying the system is broken.
The companies that adapt first will have a real advantage. Not just in hiring better engineers, but in attracting the ones who were always turned off by a process that valued puzzle-solving over actual engineering.
Software engineering is a craft. It deserves an interview process that treats it like one.
## References
1. Peterman, R. "Why Leetcode Is So Popular." Substack, December 2024. [https://www.developing.dev/p/why-leetcode-is-so-popular](https://www.developing.dev/p/why-leetcode-is-so-popular)
2. Palmer, A. "Meet the 21-year-old helping coders use AI to cheat in Google and other tech job interviews." CNBC, March 2025. [https://www.cnbc.com/2025/03/09/google-ai-interview-coder-cheat.html](https://www.cnbc.com/2025/03/09/google-ai-interview-coder-cheat.html)
3. Hoffman, M. "Six Coding Interview Formats to Replace LeetCode." Medium. [https://hoffm.medium.com/six-coding-interview-formats-to-replace-leetcode-84f3c770b5c1](https://hoffm.medium.com/six-coding-interview-formats-to-replace-leetcode-84f3c770b5c1)
4. Work Trial AI. Tavus, October 2025. [https://www.tavus.io/post/work-trial-ai-fixing-broken-job-market](https://www.tavus.io/post/work-trial-ai-fixing-broken-job-market)
5. "Adapting Technical Interviews to Counter AI-Assisted Cheating." DEV Community. [https://dev.to/jotafeldmann/adapting-technical-interviews-to-counter-ai-assisted-cheating-36lk](https://dev.to/jotafeldmann/adapting-technical-interviews-to-counter-ai-assisted-cheating-36lk)
6. CodeSignal. "LeetCode alternatives: Best options for tech hiring and interview prep in 2026." [https://codesignal.com/blog/leetcode-alternatives-best-options-for-hiring-interview-prep/](https://codesignal.com/blog/leetcode-alternatives-best-options-for-hiring-interview-prep/)
7. Naveed. "Evaluating the common alternatives to the LeetCode Style Interview." [https://www.naveed.dev/posts/leetcode-alternatives-compared/](https://www.naveed.dev/posts/leetcode-alternatives-compared/)
