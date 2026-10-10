---
title: "The dark arts of prompting"
date: "2026-04-11T13:03:00.000+08:00"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Everyone uses AI now. If you're a developer and you're not using it in some form, you're leaving productivity on the table. And while it might sound reductive to say it's "just a next-token predictor," the reality is that today's LLMs are the worst they'll ever be. They will only get better from here. That's exactly why it's worth mastering the fundamentals of prompting right now.
I've been using AI daily since ChatGPT launched in 2022. I've built desktop apps, Chrome extensions, and full-stack projects with it, long before most people were experimenting with LLMs for coding. Over those years, I've developed a set of habits that consistently get me the output I want, even from weaker models. I wouldn't call myself an expert prompter, but I've learned what works through trial and error across hundreds of projects. No courses, no certifications, just building things and paying attention.
Here's what I've learned.
## Break down the problem first
This is the most basic and most important step. When you hit a problem, treat it like a LeetCode question or an exam. Break it into key points, identify subproblems, and isolate them individually.
If you throw the entire problem at the model in one go, it might solve it, but only if you're using a strong model with a good prompt. With weaker models, or with vague prompts, it will struggle. Decomposition is your best friend. Isolate each piece, solve it independently, and then combine the results.
This is well-supported by research too. Problem decomposition prompting has been shown to significantly improve LLM performance on complex tasks, even without upgrading to a larger model. The idea is simple: smaller, well-defined problems are easier for models to reason about than large, ambiguous ones.
## Define the expected behavior
This one is underrated. When you're prompting, don't just describe the problem, tell the model what the correct behavior should look like. If you know what the output should be, say so explicitly. This steers the model toward your intended direction instead of letting it guess.
Think of it like writing a test case before writing the code. You're giving the model a target to aim for, and that clarity makes a massive difference in output quality.
## Give it enough context
Coding agents like Claude Code can manage their own context to some extent, but if you're using a plain chat interface like ChatGPT's web version, you need to be deliberate about what you include. If the problem spans multiple files and you only paste one, the model simply cannot solve it. It needs the full picture.
This applies beyond code too. If you're asking about a system, give it the architecture. If you're debugging, include the error logs, the relevant config, and the surrounding code. The more relevant context you provide, the better the output.
Anthropic's engineering team has written extensively about what they call "context engineering," which they describe as the natural progression of prompt engineering. While prompt engineering focuses on how you write instructions, context engineering is about curating the optimal set of information during inference. The distinction matters: even a perfect prompt fails if the model doesn't have the right context to work with.
## Use your own knowledge to steer the model
This is where most people fall short. If you understand the problem, even partially, you should use that knowledge to guide the model. Don't just describe the bug, tell it where you think the issue might be. Suggest a direction. Point it at the right file or function.
I think of it like mentoring a junior developer. They have knowledge and capability, but when they encounter something unfamiliar, they need a nudge in the right direction. You don't solve the problem for them, you help them find it faster.
For example, if I'm debugging a React app and I suspect a `useEffect` is causing a re-render loop, I'll tell the model exactly that. "I think the issue is in this `useEffect`, it seems to be re-triggering on every render because of a missing dependency array." That kind of specificity cuts the debugging time dramatically.
This is also why vibe coding, where you just throw prompts at the model without understanding the codebase, doesn't scale. You need foundational knowledge to guide the model effectively. AI is a multiplier of your existing skills, not a replacement for them.
## With specific instructions, you don't need the best model
Here's something I've found consistently true: if your instructions are specific enough, you can get great results from mid-tier models. I've been using models like GLM-4 and other strong open-source options alongside Claude, and the results are surprisingly close when the prompt is well-crafted.
My strategy is to balance model usage. Complex reasoning tasks go to Claude or GPT-4. Straightforward code generation, refactoring, or boilerplate tasks go to open-source models. This way I maximize value across both tiers.
Claude Code's plan mode is a great example of this principle in action. It generates a plan in one context, then you can clear the window and execute with fresh context and specific instructions. The clean context plus detailed plan consistently produces better results than a cluttered context with vague instructions.
## Keep the model's context fresh with the right tools
One of the biggest issues with AI coding assistants is outdated knowledge. Models are trained on snapshots of the internet, so if you're working with a framework that updates frequently, like Next.js or the OpenAI SDK, the model might suggest deprecated APIs or outdated patterns.
Two tools have made a real difference in my workflow:
**Context7** is an MCP server by Upstash that pulls version-specific documentation directly into your prompt. Instead of the model relying on training data from months ago, it fetches the actual current docs. It integrates with Cursor, Windsurf, Claude Desktop, and VS Code. It's open source and free to use.
**opensrc** by Vercel is a CLI tool that fetches source code for any npm package, giving coding agents deeper context than types alone. Instead of the model guessing at a library's internals based on training data, you can point it at the actual source. It supports npm, PyPI, [crates.io](http://crates.io), and GitHub repos, and caches everything locally for instant access.
Both of these tools address the same fundamental problem: LLMs need current, accurate context to produce current, accurate code.
## It's a two-way conversation
The most important mental model shift is this: prompting is not a one-way interaction. You're not just issuing commands to a machine. You're having a conversation where both sides contribute.
When the model gives you a response, don't just accept or reject it. Think about how you can improve the next prompt based on what it got right and wrong. Help it think better so it can help you better. It's like pair programming, when you talk through a problem with someone, both of you develop a clearer mental model of the issue.
I've seen this pattern outside of coding too. A colleague of mine uses Gemini for stock market research. He doesn't blindly follow the model's recommendations. He layers his own market knowledge on top, pushes back when something doesn't match reality, and uses the model to explore directions he wouldn't have considered alone. The model does more research based on his feedback, and together they arrive at better conclusions than either would alone.
## Isolate the issue
When you're debugging a 1,000-line file, the issue is almost certainly in one or two functions. If you already have a sense of where the problem is, don't dump the entire file into the prompt. Extract the relevant section, provide the necessary context around it, and ask the model to focus there.
Isolation reduces noise, keeps the context window lean, and gives the model a much better chance of finding the right solution quickly. This ties back to decomposition: the smaller and more focused the problem, the better the model performs.
## Use logging as your debugging superpower
When AI can't solve a bug outright, the most effective thing you can do is add logs everywhere. Go low level. Instrument every function, every conditional branch, every API call. The goal is to see exactly how the code runs behind the scenes, because that clarity helps both you and the model converge on the issue faster.
Most models are actually good at this. When they're debugging, they'll often add logs on their own to trace the problem. But if the model doesn't do it automatically, ask it to. Tell it to add logging at every meaningful step and then work from the output.
Here's a workflow tip that saves a lot of friction: instead of manually copy-pasting server console outputs into the chat, ask the model to log everything to a central file. One log file that captures the full execution trace. Then you can point the model at that file directly. It removes the tedious back-and-forth of copying terminal output, and the model gets cleaner, more complete context to work with.
This extends beyond just text logs too. Giving the model context about what's actually showing on the screen, whether that's screenshots, error dialogs, or browser dev tools output, dramatically improves its ability to pinpoint the issue. The more observability you give it, the better it performs.
## Spec-driven approaches for larger projects
For bigger projects, there's a growing ecosystem of spec-driven development frameworks that formalize many of these principles. The BMAD Method (Build More Architect Dreams) is one example, an AI-driven agile framework that breaks projects into phases with specialized agents for analysis, architecture, development, and testing. GitHub's Spec Kit and similar tools like OpenSpec take a comparable approach, focusing on nailing down requirements before any code gets generated.
The core idea behind all of these is the same thing I've been describing: break the big problem into atomic subproblems, provide very specific instructions for each, and give the model enough context to execute well. The frameworks just formalize it into a repeatable process.
I wouldn't say spec-driven development is necessary for every project, but for anything beyond a weekend hack, having structured requirements before you start prompting will save you significant time and rework.
## The bottom line
Prompting well isn't magic. It's a learnable skill that compounds with practice. Break problems down, define expected behavior, provide rich context, use your own knowledge, keep the model's information current, and treat it as a collaborative conversation.
This isn't knowledge I got from a course. It's four years of building things with AI every single day, figuring out what works and what doesn't through trial and error. The models will keep getting better, but the developers who know how to communicate with them effectively will always have an edge.
## References
1. [DAIR.AI](http://DAIR.AI), "Prompting Techniques," Prompt Engineering Guide, [https://www.promptingguide.ai/techniques](https://www.promptingguide.ai/techniques)
2. Anthropic, "Effective context engineering for AI agents," [https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
3. OpenAI, "Best practices for prompt engineering with the OpenAI API," [https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)
4. Upstash, "Context7 MCP, up-to-date code documentation for LLMs," [https://github.com/upstash/context7](https://github.com/upstash/context7)
5. Vercel, "opensrc, fetch source code for npm packages to give AI coding agents deeper context," [https://github.com/vercel-labs/opensrc](https://github.com/vercel-labs/opensrc)
6. Khot et al., "Decomposed Prompting: A Modular Approach for Solving Complex Tasks," arXiv:2210.02406, [https://arxiv.org/abs/2210.02406](https://arxiv.org/abs/2210.02406)
7. BMAD Method, "Build More Architect Dreams, AI-driven development framework," [https://docs.bmad-method.org](https://docs.bmad-method.org)
8. Martin Fowler, "Context Engineering for Coding Agents," [https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html)
