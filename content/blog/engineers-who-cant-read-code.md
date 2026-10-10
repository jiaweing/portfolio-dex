---
title: "Engineers who cant read code"
date: "2026-03-26"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

We've never had more code being written, and we've never had fewer people who can actually read it.
The rise of AI coding tools, and the culture of "vibe coding" that came with them, has optimized software development for one thing: generation speed. Prompt in, code out. Ship it. But production engineering was never primarily about writing code. It's about reading it, debugging it, understanding how systems fit together. That skill, the one that actually matters, is quietly atrophying.
And almost nobody is talking about it.
## The generation trap
The term "vibe coding" started as a joke, half-ironic shorthand for letting AI do the heavy lifting while you steer with prompts and good intentions. But somewhere along the way, it stopped being a joke. It became the default workflow.
The appeal is obvious. Tools like Copilot, Cursor, and Claude can produce working code faster than most humans can type it. You describe what you want in plain English, and seconds later you have a function, a module, sometimes an entire feature. The feedback loop is intoxicating. You feel productive. Your commit history agrees.
But there's a cost that doesn't show up in your velocity metrics. Addy Osmani calls it "comprehension debt", the growing gap between how much code exists in your system and how much of it any human being genuinely understands. It accumulates steadily, and eventually it has to be paid, with interest.
## The 80% nobody optimizes for
Here's the uncomfortable truth about software engineering: developers have always spent far more time reading code than writing it.
Robert C. Martin famously estimated the ratio at 10:1. More recent studies suggest it can range from 7:1 to over 200:1, depending on the codebase and the task. An IDC report from 2024 found that application development, the actual writing of code, accounted for just 16% of developers' time. The rest goes to reading, reviewing, debugging, understanding, and coordinating.
Vibe coding optimizes for the 16%. It makes the smallest slice of the job faster while doing nothing for the 84% that actually determines whether software works, scales, and survives contact with production.
Worse, it may be actively degrading the skills you need for that 84%.
## What the research actually says
In early 2026, Anthropic published a randomized controlled trial that should have been a wake-up call. They took experienced Python developers, split them into two groups, and asked both to complete coding tasks using a library none of them had used before. One group had access to an AI assistant. The other had only documentation and web search.
The results were striking. Developers who used AI scored 17% lower on comprehension tests afterward, roughly the equivalent of two letter grades. The largest gap appeared in debugging questions. The people who relied on AI were measurably worse at identifying when code was wrong and explaining why it failed.
And here's the kicker: the AI group didn't even finish significantly faster. The slight speed advantage didn't reach statistical significance.
A deeper analysis within the study revealed an even starker divide. Developers who delegated code generation entirely to AI scored below 40%. Those who used AI for conceptual questions, asking it to explain rather than just produce, scored 65% or higher. The tool wasn't the problem. The relationship to the tool was.
## The productivity paradox
You'd think that if individual developers are producing more code, teams would be shipping more. They aren't.
Faros AI analyzed telemetry data from over 10,000 developers and found what they called "The AI Productivity Paradox." Teams with high AI adoption merged 98% more pull requests. But PR review time increased by 91%. PR size ballooned by 154%. Code review became the new bottleneck.
The 2025 DORA report, Google's annual benchmark for software delivery performance, confirmed the pattern. Over 80% of respondents said AI made them more productive. But organizational delivery metrics stayed flat. Individual output surged. Team throughput didn't.
As Addy Osmani put it: we got faster cars, but the roads got more congested.
The reason is straightforward. When you generate code faster than humans can review it, you don't eliminate the bottleneck. You move it. And the new bottleneck, code comprehension, is exactly the skill that's being eroded.
## The Jensen Huang equation
At GTC 2026, Jensen Huang made headlines by saying he'd be "deeply alarmed" if a \$500,000 engineer didn't consume at least \$250,000 worth of AI tokens per year. He compared not using AI to designing chips with paper and pencil.
The framing is telling. Huang is right that AI is a powerful tool, just as CAD tools were for chip design. But CAD tools worked because the engineers using them understood circuit design at a fundamental level. They could evaluate the output. They could spot when the tool got it wrong.
The \$500K-engineer-plus-\$250K-in-tokens equation only works if the engineer can actually read and audit what comes back. If they can't, they're not a highly productive engineer augmented by AI. They're a very expensive rubber stamp.
## The calculator analogy, and why it breaks down
People love to compare AI coding tools to calculators. "Calculators didn't kill math skills," they say. "AI won't kill coding skills."
But calculators didn't kill math skills because schools deliberately kept teaching arithmetic. There was a conscious, institutional decision to maintain foundational skills even after tools made computation trivial. Curricula were redesigned. Tests still required showing your work.
Nothing equivalent is happening for code reading. No bootcamp has a "code comprehension" module. No interview loop tests your ability to read a 500-line function and explain what it does. No team has a practice of sitting down together to read code the way they do to review architecture diagrams.
The calculator analogy isn't an argument that everything will be fine. It's a blueprint for what we need to do, and aren't doing.
## The Stack Overflow era was better at this
There's an irony worth noting. The "copy-paste from Stack Overflow" era, which everyone loved to mock, was actually better at building comprehension than vibe coding is.
When you found an answer on Stack Overflow, you had to read it. You had to understand enough to adapt it to your specific context, to change variable names, modify the logic, handle edge cases the answer didn't cover. The friction was the feature. It forced a minimum level of engagement with the code.
Vibe coding removes even that friction. You describe what you want, accept the output, and move on. The code works (or appears to). There's no step in the workflow that requires you to understand *why* it works.
## What this actually looks like in practice
Here's a practical test. Take a 500-line function generated by an AI coding assistant. Can you explain every line? Can you identify the assumptions it's making? Can you spot the edge case it's not handling? Can you describe, without running it, what happens when the input is malformed?
If you can, you're a software engineer who uses AI tools. If you can't, you're a prompt engineer. There's nothing wrong with being a prompt engineer, but it's a different job with different limitations, and the industry is pretending the distinction doesn't exist.
This isn't about seniority, either. Senior engineers are losing this muscle too. When you spend months letting AI handle the implementation details, your ability to reason about those details atrophies. It's not a character flaw. It's how human cognition works. Skills you don't practice degrade.
## This isn't anti-AI
Let me be clear: this is not an argument against AI coding tools. They're genuinely useful. They're especially powerful for experienced developers who already have strong mental models of how systems work. Anthropic's own earlier research showed AI can speed up tasks by 80% when people already have the relevant skills.
The problem isn't the tools. It's the uncritical adoption. It's the culture that equates token consumption with productivity. It's the hiring managers who care about how fast you can ship but not whether you understand what you shipped.
The fix is straightforward, if unglamorous. Use AI to write. Maintain the ability to audit. Treat code reading as a skill worth practicing, not an inconvenience to be automated away.
## The engineers who will matter in 2026
The best engineers this year won't be the ones who generate the most code. They'll be the ones who can read anyone else's, including the AI's.
They'll be the ones who can take a 2,000-line PR, generated in minutes by an AI agent, and actually review it. Not rubber-stamp it. Review it. Spot the subtle bug in the error handling. Notice the N+1 query hiding in the ORM call. Question the architectural decision that looks clean but won't survive the next requirements change.
That's the skill that's becoming scarce. And in a world where code generation is essentially free, scarcity is where the value is.
## References
1. Shen, J. & Tamkin, A. "How AI assistance impacts the formation of coding skills." Anthropic Research, 2026. [https://www.anthropic.com/research/AI-assistance-coding-skills](https://www.anthropic.com/research/AI-assistance-coding-skills)
2. Osmani, A. "Comprehension Debt, the hidden cost of AI generated code." Medium, March 2026. [https://medium.com/@addyosmani/comprehension-debt-the-hidden-cost-of-ai-generated-code-285a25dac57e](https://medium.com/@addyosmani/comprehension-debt-the-hidden-cost-of-ai-generated-code-285a25dac57e)
3. Osmani, A. "The 80% Problem in Agentic Coding." Substack. [https://addyo.substack.com/p/the-80-problem-in-agentic-coding](https://addyo.substack.com/p/the-80-problem-in-agentic-coding)
4. Faros AI. "Key Takeaways from the DORA Report 2025." [https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025](https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025)
5. DORA. "State of AI-assisted Software Development 2025." Google Cloud. [https://dora.dev/dora-report-2025/](https://dora.dev/dora-report-2025/)
6. Huang, J. "Jensen Huang says \$500K engineers should use at least \$250K in tokens." Business Insider, March 2026. [https://www.businessinsider.com/jensen-huang-500k-engineers-250k-ai-tokens-nvidia-compute-2026-3](https://www.businessinsider.com/jensen-huang-500k-engineers-250k-ai-tokens-nvidia-compute-2026-3)
7. Gorman, J. "The AI-Ready Software Developer #10, Comprehension Debt." Codemanship Blog, October 2025. [https://codemanship.wordpress.com/2025/10/26/the-ai-ready-software-developer-10-comprehension-debt/](https://codemanship.wordpress.com/2025/10/26/the-ai-ready-software-developer-10-comprehension-debt/)
8. IDC. "How Do Software Developers Spend Their Time?" InfoWorld, February 2025. [https://www.infoworld.com/article/3831759/developers-spend-most-of-their-time-not-coding-idc-report.html](https://www.infoworld.com/article/3831759/developers-spend-most-of-their-time-not-coding-idc-report.html)
