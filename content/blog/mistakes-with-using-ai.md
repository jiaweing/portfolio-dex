---
title: "Mistakes with using AI"
date: "2026-04-28T16:08:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Prompt Engineering","LLMs","Coding","Claude","Notion","OpenAI"]
---

Most people use AI the same way: type something in, get something back, complain it's not good enough. Then they either give up or enter the dreaded loop of "this doesn't work, please fix" over and over again. I think a lot of people don't actually maximize what they get out of AI, and it comes down to a handful of avoidable mistakes.
I've spent a lot of time working with LLMs, both for coding and general problem-solving, and I've noticed patterns in how people get stuck. The good news is that these mistakes are easy to fix once you see them.
## Stop talking, start interviewing
One of the biggest mistakes I see is people treating AI like a search engine. You throw a question at it and expect a perfect answer. But AI doesn't know what you don't tell it, and unlike a coworker, it won't push back or ask for clarification on its own.
The fix is simple: ask the AI to interview you. Tell it to ask you questions back so it can understand exactly what you need. This forces you to articulate the gaps in your own thinking, and it gives the AI the context it needs to actually help.
This works everywhere. Claude has this capability. Cursor has it. Notion has it. Instead of dumping a vague prompt and hoping for the best, flip the dynamic. Let the AI pull the right information out of you. You'll be surprised how much better the output gets when the AI understands what you actually want.
Research backs this up. One of the most common reasons AI gives generic or off-target responses is that users don't provide enough information upfront, and the model is forced to guess at your intent. It fills in the gaps with assumptions, and those assumptions are often wrong.
## Provide real context, not vibes
This is especially true for coding. If you already know how your codebase works, don't make the AI figure it out from scratch. Provide as much context as you would give to a new team member. Tell it the exact feature you want, how to go about implementing it, which files are relevant, and what patterns the codebase uses.
This is how senior engineers get great results from AI. A study on over 1,000 developers found that senior engineers benefit more from AI coding agents than juniors, not because they type faster, but because they're better at specifying what needs to be done. They treat the AI like a junior developer: clear instructions, specific scope, and enough context to work with.
I think of it the same way. You're basically talking to an intern. A very fast, very eager intern who will do exactly what you say, but won't question whether what you said makes sense. So tell it exactly how to do it. Point it to the right files. Explain the architecture. The more precise you are, the less time you spend fixing its mistakes.
## Narrow the scope
When you hit a bug or a complex problem, resist the urge to throw the entire mess at the AI and say "fix this." That's like telling a mechanic your car "feels weird" and expecting them to diagnose it in five seconds.
Instead, narrow down the scope. If you know the bug is in a specific file, tell the AI to look there. If you know which function is behaving unexpectedly, point to it. If you don't know where the issue is, ask the AI to add logging so you can trace the problem together.
Here's something I've learned the hard way: what looks like one big problem is often two or three smaller, unrelated problems stacked on top of each other. If you break things down into smaller, atomic pieces, you can isolate each issue and fix them individually. This gets you to a solution much faster than letting the AI flail around trying to solve everything at once.
Research from the University of Waterloo found that even top AI coding tools make mistakes roughly one in four times. The error rate goes up significantly when the problem is broad and underspecified. Giving the AI a tight, well-defined scope dramatically improves accuracy.
## Close the feedback loop properly
This is where I see the most wasted time. The typical loop looks like this:
1. Ask AI for a solution
2. It doesn't work
3. Say "this doesn't work, please fix"
4. Get another solution
5. Repeat forever
This loop is useless because you're not providing any new information. The AI has no idea why it didn't work. It's just guessing again with slightly different code.
What I do instead is actually look at the output. I look at what the AI generated, what it's doing in the UI or the console, and I use my own knowledge to provide a specific diagnosis. Maybe the problem is in a useEffect hook. Maybe the state isn't updating because of a stale closure. Whatever it is, I tell the AI what I observe and what I suspect, and it can zero in on the real issue instead of throwing darts in the dark.
The key insight is that you need to be an active participant, not a passive consumer. AI is a collaboration tool, not a magic wand. The quality of the output is directly proportional to the quality of the input and feedback you provide.
## Think of AI as a multiplier, not a replacement
All of these mistakes come from the same root cause: treating AI as something that should just work on its own. But AI is a multiplier of your existing skills and knowledge. If you bring domain expertise, clear thinking, and good communication, AI will amplify those qualities. If you bring vague instructions and zero context, you'll get vague, unhelpful results.
The developers and knowledge workers who get the most out of AI aren't the ones who know the fanciest prompting tricks. They're the ones who know their domain well, communicate clearly, and treat the AI as a collaborative partner rather than an oracle.
Start with these four things: let AI interview you, provide specific context, scope down your problems, and give meaningful feedback. You'll be amazed at the difference.
## References
1. [2 Biggest issues of AI in 2026](https://www.reddit.com/r/PromptEngineering/comments/1q7nlxg/2_biggest_issues_of_ai_in_2026/) , r/PromptEngineering
2. [Senior engineers benefit MORE from AI coding agents than juniors](https://www.linkedin.com/posts/lewisowain_senior-engineers-benefit-more-from-ai-coding-activity-7397967171764514816-vGop) , Owain Lewis on LinkedIn
3. [Top AI coding tools make mistakes one in four times, study shows](https://techxplore.com/news/2026-03-ai-coding-tools.html) , TechXplore / University of Waterloo
4. [What Senior Engineers Need to Know About AI Coding Tools](https://frontendmasters.com/blog/what-senior-engineers-need-to-know-about-ai-coding-tools/) , Frontend Masters
5. [7 AI Prompts Senior Engineers Use to Build Production Code Faster](https://dev.to/theprodsde/7-ai-prompts-senior-engineers-use-to-build-production-code-faster-4482) , DEV Community
6. [Best practices for prompt engineering with the OpenAI API](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api) , OpenAI Help Center
