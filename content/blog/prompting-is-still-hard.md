---
title: "Prompting is still hard?"
date: "2026-03-13T13:39:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

It's 2026. We're four years into the ChatGPT era, and people are *still* agonizing over how to write the perfect prompt. There are entire courses, YouTube tutorials, and six-figure job titles dedicated to "prompt engineering." And honestly, I think most of it misses the point.
AI models today are extraordinarily good at understanding what you mean, even when you don't say it well. The real skill isn't crafting a flawless prompt. It's learning to iterate fast, have a conversation, and stop overthinking.
## The perfect prompt is a trap
Here's what I see constantly: someone sits down, spends 30 minutes carefully constructing a detailed prompt with specific instructions, tone guidelines, and formatting rules. They hit send, get a mediocre response, and conclude that AI is useless.
The problem isn't the AI. The problem is the approach.
When you invest that much time and energy into a single prompt, two things happen. First, you set impossibly high expectations for the response. Second, you're too exhausted to do the thing that actually matters, which is iterating on it.
I've found the opposite approach works far better. I just type whatever comes to mind and send it. No formatting, no careful phrasing, sometimes not even correct grammar or spelling. And it works. Modern models like GPT-5, Claude, and Gemini are remarkably good at parsing messy, informal input and figuring out what you actually want.
## Modern models don't need perfect input
This is the part people haven't caught up with yet. The language models of 2024 were already decent at handling ambiguity. The models of 2026 are on another level entirely. Context windows have exploded, with GPT-4o handling 1 million tokens, Claude reaching 2 million, and Gemini pushing 10 million. Reasoning capabilities have improved dramatically, with models now able to work through 30+ step chains of logic.
What this means practically is that you don't need to front-load all the context and instructions into one carefully engineered prompt. The model can hold an entire conversation in memory. It can ask you clarifying questions. It can course-correct mid-stream. The days of needing pixel-perfect prompts are behind us.
As one Reddit user put it well: "These new models are way smarter than we give them credit for. They don't need perfectly engineered prompts, they just need context." Some people have even found that voice-to-text rambling produces better results than carefully typed prompts, simply because people naturally provide more context when speaking freely.
## Treat AI like a conversation, not a search query
I think the most valuable thing about AI is the back-and-forth. It's more like talking to a person than typing into Google. You can argue your point of view, it will push back, and through that exchange you end up somewhere better than either of you started.
For simple questions, I treat it exactly like a search engine. "What is DRM?" That's it. One sentence, no overthinking. I wouldn't type an elaborate query into Google, so why would I do it for AI?
But for more complex work, especially coding, the conversation is where the magic happens. I narrow the scope down to a specific task and tell it what to do. It can still be broad in the sense that I don't know all the specifics yet, but I define the boundaries clearly. Then we go back and forth until it's right.
## For coding, context beats cleverness
When I'm building something, say an expense tracking app, I don't try to get the AI to build the whole thing in one shot. I break it down. One agent works on one feature. I tell it what stack to use, what libraries I want, and point it to the relevant documentation.
This is where tools like MCP (Model Context Protocol) shine. Instead of trying to describe a library's API in your prompt, you can just tell the model to go look at the docs directly. Give it real context, and it will produce dramatically better results than any amount of prompt crafting could achieve.
The pattern is simple: define the scope, provide the context, and let the model work. You don't need to be a "prompt engineer" to do this. You just need to know what you want and be willing to point the AI in the right direction.
## Different models, different strengths
One thing I've learned from testing extensively is that not all models are equal at every task. In 2026, the landscape roughly looks like this:
- **Gemini** excels at research tasks and deep work with large amounts of context, thanks to its massive context window and tight Google ecosystem integration
- **Claude** is the go-to for reasoning, code generation, and long-form writing, consistently producing clean, well-structured output
- **ChatGPT** leads in versatility and general-purpose conversation, with the strongest voice mode and broadest plugin ecosystem
- **DeepSeek** has emerged as a serious contender for coding tasks, offering strong performance at a fraction of the cost
The key is to stop treating every AI model as interchangeable. Test each one on the tasks you actually care about. You'll quickly learn which model to reach for in different situations.
## The real skill is iteration speed
If I had to boil down my approach to one principle, it's this: optimize for iteration speed, not prompt quality.
Start with the simplest possible prompt. See what the model can do with it. Then expand from there. Add context where it's needed. Redirect when it goes off track. Try a different model if the first one isn't cutting it.
This approach has a few advantages. You learn what each model is actually capable of, rather than what some tutorial told you it could do. You discover the boundaries faster. And you stay in a flow state instead of getting bogged down in prompt construction.
New models drop every few months. Each one has different strengths, different quirks, different failure modes. The only way to keep up is to keep throwing things at them and seeing what sticks. If you're still using the same prompting style you used in 2024, you're leaving most of the capability on the table.
## Stop overthinking, start experimenting
The irony of the "prompt engineering" discourse is that the people who are best at using AI are often the ones who think about it the least. They type fast, iterate faster, and treat every interaction as a cheap experiment rather than a high-stakes performance.
AI in 2026 is not the brittle, literal-minded technology it was a few years ago. These models can genuinely understand intent, work through ambiguity, and produce useful output from rough input. The bottleneck is no longer the quality of your prompt. It's how quickly you can have a conversation and steer toward what you need.
So stop perfecting your prompts. Start using AI the way you'd talk to a smart colleague: casually, iteratively, and without overthinking every word.
## References
1. Roop Shree, "From Prompt Engineering to Iterative Reasoning," Medium, 2026. [https://medium.com/@roop_shree/from-prompt-engineering-to-iterative-reasoning-6e0249040b35](https://medium.com/@roop_shree/from-prompt-engineering-to-iterative-reasoning-6e0249040b35)
2. "Prompt Engineering is Dead in 2026," r/PromptEngineering, Reddit, 2026. [https://www.reddit.com/r/PromptEngineering/comments/1rci46t/prompt_engineering_is_dead_in_2026/](https://www.reddit.com/r/PromptEngineering/comments/1rci46t/prompt_engineering_is_dead_in_2026/)
3. "Prompt Engineering is overrated. AIs just need context now," r/PromptEngineering, Reddit, 2025. [https://www.reddit.com/r/PromptEngineering/comments/1ic8c43/prompt_engineering_is_overrated_ais_just_need/](https://www.reddit.com/r/PromptEngineering/comments/1ic8c43/prompt_engineering_is_overrated_ais_just_need/)
4. "Your 2026 Guide to Prompt Engineering," The AI Corner, 2026. [https://www.the-ai-corner.com/p/your-2026-guide-to-prompt-engineering](https://www.the-ai-corner.com/p/your-2026-guide-to-prompt-engineering)
5. "AI Comparisons 2026: ChatGPT vs Gemini vs Claude vs DeepSeek," GuruSup, 2026. [https://gurusup.com/blog/ai-comparisons](https://gurusup.com/blog/ai-comparisons)
6. "ChatGPT vs Claude vs Gemini for Coding 2026," PlayCode Blog, 2026. [https://playcode.io/blog/chatgpt-vs-claude-vs-gemini-coding-2026](https://playcode.io/blog/chatgpt-vs-claude-vs-gemini-coding-2026)
7. "Technical Performance," The 2025 AI Index Report, Stanford HAI, 2025. [https://hai.stanford.edu/ai-index/2025-ai-index-report/technical-performance](https://hai.stanford.edu/ai-index/2025-ai-index-report/technical-performance)
8. Bernard Marr, "Why Prompt Engineering Isn't The Most Valuable AI Skill In 2026," [bernardmarr.com](http://bernardmarr.com), 2026. [https://bernardmarr.com/why-prompt-engineering-isnt-the-most-valuable-ai-skill-in-2026/](https://bernardmarr.com/why-prompt-engineering-isnt-the-most-valuable-ai-skill-in-2026/)
