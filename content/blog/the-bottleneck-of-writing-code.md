---
title: "The bottleneck of writing code"
date: "2026-03-26T15:47:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

The promise of AI coding tools was simple: write code faster, ship more, do it all with fewer people. And that promise has largely been kept. AI can generate hundreds of lines of code in seconds. The bottleneck of software engineering is no longer writing code. It is reviewing it.
This shift has consequences that few people are talking about honestly. It changes what it means to be a senior engineer. It reshapes the path for junior developers. And it forces us to reconsider what "productivity" actually looks like when a machine can out-type every human on the team.
## Nobody writes code anymore
That is a slight exaggeration, but the direction is clear. A 2025 survey by Sonar found that 72% of developers who have tried AI coding tools now use them every day, and 58% use them for mission-critical work. Developers estimate that 42% of the code in their repositories is already AI-assisted, and they expect that number to reach 65% by 2027.
The act of typing out code, the thing most of us spent years learning to do well, is rapidly becoming the least important part of the job. Tools like Claude Code, Cursor, and GitHub Copilot can generate entire features from a natural language prompt. One test found that an AI produced 186 lines of code for a simple REST API endpoint where a human wrote 29 lines for the same requirements. That is a 6.4x difference in volume for identical functionality.
Writing code used to be the hard part. Now it is the easy part.
## The burden is reviewing code
Here is the problem nobody anticipated: someone still has to read all that code.
A 2025 study by CodeRabbit found that AI-written code surfaces 1.7x more issues than human-written code. Nearly half of developers say debugging AI output takes longer than fixing code they wrote themselves. Senior engineers report spending an average of 4.3 minutes reviewing each AI-generated suggestion, compared to 1.2 minutes for human-written code. That might sound small, but multiply it across every pull request in a day and it adds up fast.
Faros AI analyzed data from more than 10,000 developers and found a 98% increase in pull request volume alongside a 91% increase in review time. Teams are shipping more code, but the review pipeline is choking on it.
I do not want to review a 10,000-line pull request. Nobody does. But that is increasingly what lands in the queue when someone points an AI agent at a codebase and lets it run. The code often looks fine on the surface. It compiles. It passes tests. But the review question has fundamentally changed. You are no longer asking "does this work?" You are asking "is all of this necessary?"
GitHub has even started exploring a kill switch for pull requests to help maintainers deal with the flood of AI-generated contributions. The review trust model is breaking down because reviewers can no longer assume that the person who submitted the code actually understands it.
## The real question: how much code can I actually understand?
AI-generated code tends to be defensively written. It handles edge cases you did not ask for. It creates abstractions you do not need yet. It wraps everything in custom exception classes and validation layers that might be useful someday but add cognitive load right now.
When a human writes code, a reviewer can reason about intent. They know the author made deliberate choices and can ask why. When AI writes code, there is no intent to reason about. Every decision was made by a model optimizing for completeness, not for the specific context of your project.
This creates what Sonar's research calls "deceptive complexity," code that looks correct but is not reliable. Their survey found that 61% of developers agree AI often produces code that looks right but cannot be trusted. And 38% say reviewing AI-generated code requires more effort than reviewing human-written code.
The challenge is not reading the code. The challenge is understanding the decisions behind it, and with AI-generated code, there are no decisions. There is only pattern matching at scale.
## The challenge has always been reducing code, not adding more
A good software engineer can reduce complexity. A less experienced one adds more. This has always been true, but AI has made it painfully obvious.
AI is exceptionally good at adding code. It can scaffold entire applications, generate boilerplate, and produce test suites on demand. What it cannot do is look at a system and say, "We don't need half of this." That judgment, the ability to simplify, to remove the unnecessary, to find the elegant solution, still belongs to experienced humans.
The best engineers I have worked with were the ones who could delete code confidently. They understood the system well enough to know what was load-bearing and what was dead weight. AI does not have that understanding. It generates from patterns, and those patterns tend toward more, not less.
Nine out of 10 developers in Sonar's survey reported that AI contributed to unnecessary or duplicative code in their codebase. The irony is hard to miss: a tool designed to make us more productive is generating work that experienced engineers then have to clean up.
## AI is making junior engineers skip the hard lessons
This is the part that worries me most. I have been writing code since I was 15. I learned critical thinking by solving actual problems, by sitting with a bug for hours, by optimizing a function through trial and error, by reading other people's code and understanding why they made the choices they did.
Junior developers entering the field today can skip all of that. Need a sorting algorithm? Ask AI. Database query optimization? AI handles it. Debugging a React hook? Let AI explain it. The code shows up, it works, and the developer never had to think through the problem.
A study from MIT Media Lab reported that excessive reliance on AI-driven solutions may contribute to "cognitive atrophy," a shrinking of critical thinking abilities. Research published in the journal *Societies* found a significant negative correlation between frequent AI tool usage and critical thinking skills, with cognitive offloading as the mediating factor.
Addy Osmani, an engineering leader at Google, identified this as a "knowledge paradox" in AI-assisted coding. AI tools tend to benefit experienced developers far more than junior ones. A senior developer constantly assesses, corrects, refactors, and enhances AI output, drawing on years of hard-won understanding. A junior developer accepts the output and moves on, missing the learning that would have made them capable of doing the assessment themselves.
The uncomfortable truth is that the skills we need most in a world full of AI-generated code, the ability to evaluate, simplify, and make architectural decisions, are exactly the skills that AI prevents junior developers from building.
## You have to use it anyway
I do not have a solution for junior software engineers. I really do not know how we help new people getting into the field other than encouraging them to spend time without AI, the way we all used to learn. Build the instincts first, then let the tools amplify them.
But here is the tension: there is no reason to avoid AI coding tools entirely. You have to start using them in some form. If you do not, you keep falling further behind. Your output drops relative to your peers. Your career trajectory flattens. People who use AI tools will always produce more volume.
The argument that AI makes us lazy has some truth to it. It does make us stop thinking as hard. But the argument that you should not use it is simply wrong. The industry has moved, and it is not going back.
What matters is whether you have the experience to use these tools well. People with years of practice will produce better quality output because they know what good looks like. They can spot when the AI is overengineering. They can simplify what it generates. They can catch the subtle bugs that pass every test but would fail in production at 3 a.m.
## Where this leaves us
The bottleneck of software engineering has moved. It used to be writing code. Now it is reviewing, understanding, and simplifying the enormous volume of code that AI produces.
For senior engineers, this means the job is evolving. Less time writing, more time evaluating. The skills that matter most are judgment, systems thinking, and the ability to say "we don't need this."
For junior engineers, the path is harder to navigate than it has ever been. The tools that make experienced developers more productive are the same tools that can prevent newcomers from developing the depth they need.
For teams and organizations, the lesson is straightforward: if you adopt AI coding tools without rethinking how code review works, expect slower releases, not faster ones. Track review cycle time. Invest in automated verification. And recognize that the time saved writing code is now being spent ensuring that code is worth keeping.
The speed of writing code is no longer the constraint. The constraint is our ability to understand what has been written.
## References
1. Sonar, "State of Code Developer Survey," 2025. [https://www.sonarsource.com/](https://www.sonarsource.com/)
2. Ikeh Akinyemi, "Why AI coding tools shift the real bottleneck to review," LogRocket Blog, January 2026. [https://blog.logrocket.com/ai-coding-tools-shift-bottleneck-to-review/](https://blog.logrocket.com/ai-coding-tools-shift-bottleneck-to-review/)
3. Anirban Chatterjee, "The AI Verification Bottleneck: Developer Toil Isn't Shrinking," The New Stack, January 2026. [https://thenewstack.io/the-ai-verification-bottleneck-developer-toil-isnt-shrinking/](https://thenewstack.io/the-ai-verification-bottleneck-developer-toil-isnt-shrinking/)
4. "GitHub ponders kill switch for pull requests to stop AI slop," The Register, February 2026. [https://www.theregister.com/2026/02/03/github_kill_switch_pull_requests_ai/](https://www.theregister.com/2026/02/03/github_kill_switch_pull_requests_ai/)
5. "Is AI dulling our minds?" Harvard Gazette, November 2025. [https://news.harvard.edu/gazette/story/2025/11/is-ai-dulling-our-minds/](https://news.harvard.edu/gazette/story/2025/11/is-ai-dulling-our-minds/)
6. Raafat Habib Nashed et al., "AI Tools in Society: Impacts on Cognitive Offloading and the Future of Critical Thinking," *Societies*, 2025. [https://www.mdpi.com/2075-4698/15/1/6](https://www.mdpi.com/2075-4698/15/1/6)
7. Addy Osmani, "Code Review in the Age of AI," Elevate Newsletter. [https://addyo.substack.com/p/code-review-in-the-age-of-ai](https://addyo.substack.com/p/code-review-in-the-age-of-ai)
8. Devrim Ozcay, "How AI Coding Tools Almost Killed My Developer Career," Medium. [https://medium.com/javarevisited/why-ai-coding-tools-killed-my-junior-developer-career-ab5243771f2f](https://medium.com/javarevisited/why-ai-coding-tools-killed-my-junior-developer-career-ab5243771f2f)
9. Brian Seaman, "How AI affects pull requests and code reviews," LinkedIn, 2026. [https://www.linkedin.com/posts/brian-seaman-78710a25_ai-coding-assistants-are-changing-the-way-activity-7369767305561432064-AHiN](https://www.linkedin.com/posts/brian-seaman-78710a25_ai-coding-assistants-are-changing-the-way-activity-7369767305561432064-AHiN)
