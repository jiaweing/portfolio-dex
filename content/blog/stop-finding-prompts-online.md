---
title: "Stop finding prompts online"
date: "2026-05-23T18:11:00.000+08:00"
lastEdited: "2026-05-22T16:04:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Prompt Engineering","Agents","Notion"]
---

You've probably seen them everywhere: "Top 50 AI prompts for productivity," "The ultimate prompt library," "Copy-paste these prompts to 10x your workflow." Prompt marketplaces and listicles are booming. But if you're building AI agents or using large language models for anything beyond a single question-and-answer exchange, copying prompts from the internet is one of the least effective things you can do.
Here's why, and what to do instead.
## Generic prompts solve generic problems
A prompt you find online was written for someone else's context. It doesn't know your standard operating procedures, your team's communication style, the tools you use, or the specific outcomes you care about. It was designed to sound impressive in a blog post, not to integrate into your actual work.
Think about it this way: a prompt that says "Act as a marketing expert and write a campaign brief" might produce a decent-looking output. But it won't know that your team uses a specific brief template, that your brand voice avoids exclamation marks, or that your campaigns always need a compliance review section. The gap between "decent-looking" and "actually useful" is where all the value lives.
When researchers and practitioners talk about why most prompts fail, the recurring theme is the same: **vagueness and lack of context**. A prompt without your specific constraints, goals, and workflow details will always produce generic results. That's not a flaw in the AI. That's a flaw in the prompt.
## Agents are not one-in, one-out
This distinction matters. When you're generating a single image, a copied prompt can work reasonably well. Image generation is largely a one-shot process: one prompt, one output. You can see someone's result, copy their prompt, and get something similar. The same goes for simple text completions or standalone questions.
But AI agents are fundamentally different. An agent operates across multiple steps, makes decisions, uses tools, and interacts with your data over time. The prompt that drives an agent isn't just a question. It's a set of **instructions, boundaries, and behavioral guidelines** that shape how the agent thinks and acts across an entire workflow.
A generic agent prompt can't account for:
- Which tools your agent has access to
- What data sources it should prioritize
- How it should handle ambiguous situations in your specific domain
- What tone and format your team expects
- When it should stop and ask for human input
This is why prompt marketplaces for agents are largely pointless. The prompt is the most context-dependent part of the entire system.
## The right approach: build it yourself, iteratively
The good news is that building a great prompt for your agent doesn't require prompt engineering expertise. It requires **iteration**.
Most modern AI tools, including Notion's built-in agent builder, let you describe what you want in plain language and then refine from there. The process looks something like this:
1. **Start with a rough description** of what you want the agent to do. Don't overthink it.
2. **Test it** against real tasks from your workflow.
3. **Identify where it falls short.** Does it miss important context? Use the wrong tone? Skip steps you care about?
4. **Refine the instructions.** Add the missing context, clarify the boundaries, specify the edge cases.
5. **Repeat.** Keep going back and forth until the output consistently matches what you need.
This iterative loop is where the real value gets created. Each round of refinement encodes more of your specific knowledge, preferences, and workflow patterns into the prompt. After a few cycles, you'll have something that no generic prompt could ever match.
## Why sharing agent prompts doesn't help much either
You might wonder: what about sharing prompts with colleagues or publishing them for others in your field? There's nothing wrong with using someone else's prompt as a **starting point or reference**. Seeing how others structure their instructions can spark ideas.
But treating someone else's prompt as a finished product for your own use almost never works. Even within the same industry, two teams will have different tools, different processes, different definitions of "good output." The prompt is the layer where all of that specificity lives.
This is also why the best AI practitioners tend to guard their prompts, not out of secrecy, but because sharing them without the surrounding context is misleading. The prompt only works because of everything around it.
## The exception: non-agentic, single-shot use cases
To be fair, there are cases where borrowing prompts makes sense. Image generation is the clearest example. If someone shares a Midjourney prompt that produces a particular art style, you can copy it and get a similar result. The same applies to simple text generation tasks where the output doesn't depend heavily on your personal context.
Video generation sits in a grey area. Models have gotten better at preserving subjects and styles across generations, but a well-crafted prompt still only steers the output in a general direction. The results are less deterministic than images, which means even copied prompts produce more variable outcomes.
The key distinction is whether the task is **contextual or self-contained**. Self-contained tasks (generate an image, translate a sentence, summarize a public article) can work with generic prompts. Contextual tasks (manage my project workflow, draft emails in my voice, triage my team's support tickets) cannot.
## Start building, stop browsing
The next time you're tempted to search for "best AI agent prompts," try this instead: open your AI tool's agent builder, describe what you want in a few sentences, and start iterating. You'll build something far more valuable than anything a prompt marketplace could sell you.
Your workflow is unique. Your prompts should be too.
## References
1. Reddit, r/PromptEngineering, "Why do generic AI prompts keep failing?" [https://www.reddit.com/r/PromptEngineering/comments/1qvwrr2/why_do_generic_ai_prompts_keep_failing/](https://www.reddit.com/r/PromptEngineering/comments/1qvwrr2/why_do_generic_ai_prompts_keep_failing/)
2. Arfa, "You're Using AI Wrong: Why 90% of Prompts Fail and What to Do Instead," AWS in Plain English. [https://aws.plainenglish.io/youre-using-ai-wrong-why-90-of-prompts-fail-and-what-to-do-instead-b125832f2733](https://aws.plainenglish.io/youre-using-ai-wrong-why-90-of-prompts-fail-and-what-to-do-instead-b125832f2733)
3. Lakera, "The Ultimate Guide to Prompt Engineering in 2026." [https://www.lakera.ai/blog/prompt-engineering-guide](https://www.lakera.ai/blog/prompt-engineering-guide)
4. Michael Dawson, "Prompt engineering: Big vs. small prompts for AI agents," Red Hat Developer, February 2026. [https://developers.redhat.com/articles/2026/02/23/prompt-engineering-big-vs-small-prompts-ai-agents](https://developers.redhat.com/articles/2026/02/23/prompt-engineering-big-vs-small-prompts-ai-agents)
5. Communications of the ACM, "Prompting Considered Harmful." [https://cacm.acm.org/opinion/prompting-considered-harmful/](https://cacm.acm.org/opinion/prompting-considered-harmful/)
6. AppFlowy, "Building Your Own Custom Prompt to Power Your AI Workflow." [https://appflowy.com/blog/Building-Your-Own-Custom-Prompt-to-Power-Your-AI-Workflow](https://appflowy.com/blog/Building-Your-Own-Custom-Prompt-to-Power-Your-AI-Workflow)
7. The Hard Thing, "Dead on arrival? Pitfalls of AI agent marketplaces." [https://hardthing.dev/ai-agents-marketplace/](https://hardthing.dev/ai-agents-marketplace/)
