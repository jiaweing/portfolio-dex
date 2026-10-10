---
title: "Agentic writing"
date: "2026-03-11T11:35:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Two years ago, the way most people used AI for writing looked roughly the same: open ChatGPT, type a prompt, copy the output, paste it into a document, then spend the next twenty minutes reformatting, trimming, and stitching it into something that actually fits. It worked, but it was clunky. The hard part was never generating the text. It was everything that came after.
The same thing happened with code. Developers would prompt an LLM, copy a snippet, paste it into their editor, fix the indentation, debug the context mismatch, and repeat. That loop was the status quo until tools like Cursor and Cline changed the game entirely.
Now writing is going through the same shift, and it is moving fast.
## What agentic coding taught us
The term "agentic" gets thrown around a lot, but in coding it refers to something specific: AI that does not just suggest code but actively edits your files, runs commands, and iterates on problems with minimal hand-holding.
Cursor, a code editor built on VS Code, introduced the idea of AI that understands your entire codebase and makes changes in place. Instead of copying a function from a chat window, Cursor rewrites the function directly in your file and shows you a diff of what changed. You review, accept or reject, and move on.
Cline took a similar approach as an open-source VS Code extension, going further by executing terminal commands and managing multi-step workflows autonomously. A developer on Reddit described spending more on Cline API costs in a single evening than a month of Cursor, and calling it "totally worth it" because of how much manual work it eliminated.
The pattern is clear: AI that operates *inside* your workflow, editing in place and showing you what changed, beats AI that operates *outside* it, requiring you to shuttle text back and forth.
## The copy-paste bottleneck in writing
Most AI writing tools today still follow the old pattern. You open a chat interface, describe what you want, get a block of text, and then manually figure out where it goes. The generation is fast. The integration is slow.
This creates a bottleneck that is less about the quality of the AI output and more about the friction of moving it into place. Where exactly should this paragraph go? Does it match the tone of what comes before it? Did the AI understand the structure of my document, or did it just produce something generic?
When you are writing a short email, the copy-paste loop is tolerable. When you are working on a long-form blog post, a product spec, or documentation that evolves over weeks, it becomes a real drag.
## Writing tools that edit, not just generate
This is where the idea of agentic writing comes in. Instead of generating text in a separate window and leaving you to handle the integration, an agentic writing tool operates directly inside your document. It reads what is already there, understands the structure, and makes targeted edits in context.
Notion has been pushing hard in this direction. Its AI does not just produce blocks of text for you to paste somewhere. It edits your page directly, and, critically, it shows you diffs. Just like a code review in GitHub, you can see exactly what was added, removed, or changed. You review the proposed edits and accept or reject them.
This diff-based approach changes the workflow fundamentally. The hard part of AI-assisted writing was never "get the AI to produce words." It was "figure out what changed and whether it is an improvement." Diffs solve that problem by making changes visible and reviewable at a glance.
Notion's custom agents take this further. You can set up an agent that triggers automatically, say when a new page is created in a database, researches the topic, and drafts content directly on the page. The AI is not just a tool you invoke manually. It is a teammate that picks up work and does it in the right place.
## Why working inside the document matters
The difference between generating text externally and editing in place might seem small, but it compounds quickly.
When AI edits in place, it has full context. It can see your headings, your existing paragraphs, your formatting choices, and the overall structure of your document. That context makes the output dramatically better than what you get from a blank chat prompt.
It also means you spend less time on logistics. No more tabbing between windows, no more reformatting pasted text, no more losing your train of thought while you figure out where the AI output should land. The review step becomes the only step: read the diff, decide if it is good, and move on.
This is the same insight that made agentic coding tools so effective. Cursor and Cline succeed not because they use better models than ChatGPT, but because they eliminated the copy-paste loop and let developers stay in their editor.
## The landscape of AI writing tools
It is worth looking at where other tools sit on this spectrum.
**Jasper AI** is one of the more established AI writing platforms, aimed primarily at marketing teams. It offers templates, brand voice controls, and campaign workflows. But its core interaction model is still largely generative: you prompt, it produces, you copy. It is powerful for churning out ad copy and marketing assets, but it does not deeply integrate into a single document editing flow the way agentic tools do.
**Writer** positions itself as an enterprise AI platform for "agentic work," focusing on brand consistency and compliance at scale. It is designed for large organizations that need AI output to stay on-brand across teams and channels.
**Grammarly** takes a different approach, working inline as you type to catch errors and suggest improvements. It is agentic in the sense that it operates inside your document, but it is focused on editing and polishing rather than generating and structuring content from scratch.
**ChatGPT and Claude**, used directly, remain the most flexible general-purpose options. But they still operate in a chat window, separate from wherever your actual document lives. The integration gap is the tax you pay for that flexibility.
The tools that are pulling ahead are the ones that collapse the distance between where AI thinks and where your work lives. That is why Notion's approach, where AI agents operate inside your workspace with full context, represents where things are heading.
## What this means for how we write
The shift from generative AI to agentic AI in writing mirrors what happened in coding almost exactly, just on a slight delay. First came the novelty of AI-generated output. Then came the realization that generating output was never the bottleneck. Then came tools that eliminated the real bottleneck: the manual labor of integrating AI output into your actual work.
We are still early. Most people writing with AI today are still copying and pasting, the same way most developers were still copying code snippets two years ago. But the trajectory is clear. The tools that win will be the ones that do the work where the work already lives, show you what changed, and let you stay in the flow of thinking and reviewing rather than shuffling text between windows.
The era of agentic writing is not coming. For the people paying attention, it is already here.
## References
1. Cline, "The Open Coding Agent," [https://cline.bot/](https://cline.bot/)
2. Augment Code, "Cline vs Cursor: Which AI Coding Tool Wins in 2025?," [https://www.augmentcode.com/tools/cline-vs-cursor](https://www.augmentcode.com/tools/cline-vs-cursor)
3. LinkedIn, "The Rise of Agentic Coding: How Intelligent Agents Are Redefining Software Development," [https://www.linkedin.com/pulse/rise-agentic-coding-how-intelligent-agents-redefining-layak-singh-zoufc](https://www.linkedin.com/pulse/rise-agentic-coding-how-intelligent-agents-redefining-layak-singh-zoufc)
4. Robert Clarke, "Agentic AI and the Future of Collaborative Writing," Medium, April 2025, [https://medium.com/@robertclarke/agentic-ai-and-the-future-of-collaborative-writing-991327792034](https://medium.com/@robertclarke/agentic-ai-and-the-future-of-collaborative-writing-991327792034)
5. MIT Sloan, "Agentic AI, explained," [https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained](https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained)
6. CIO, "How agentic AI will reshape engineering workflows in 2026," [https://www.cio.com/article/4134741/how-agentic-ai-will-reshape-engineering-workflows-in-2026.html](https://www.cio.com/article/4134741/how-agentic-ai-will-reshape-engineering-workflows-in-2026.html)
7. Info-Tech Research Group via Yahoo Finance, "Top AI Writing Assistants for 2026," [https://finance.yahoo.com/news/top-ai-writing-assistants-2026-200900367.html](https://finance.yahoo.com/news/top-ai-writing-assistants-2026-200900367.html)
8. Notion, "Get started with your Notion Agent," [https://www.notion.com/help/guides/get-started-with-your-personal-agent-in-notion](https://www.notion.com/help/guides/get-started-with-your-personal-agent-in-notion)
9. [eesel.ai](http://eesel.ai), "6 Best Jasper AI Alternatives for 2026," [https://www.eesel.ai/blog/jasper-ai-alternatives](https://www.eesel.ai/blog/jasper-ai-alternatives)
10. Writer, "The enterprise AI platform for agentic work," [https://writer.com/](https://writer.com/)
