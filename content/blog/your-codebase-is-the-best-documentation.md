---
title: "Your code is the best example"
date: "2026-03-21T21:06:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Everyone's scrambling to set up the perfect AI coding workflow. Custom instructions, documentation servers, context management tools. But there's a simpler truth most developers overlook: if you already have a working codebase, you already have the best documentation your AI assistant could ask for.
## Your code already speaks for itself
When you point an AI coding assistant at your existing project, it picks up on everything. Your folder structure, your naming conventions, how you handle errors, how you compose components, which patterns you reach for. It doesn't need a style guide or an architecture document to figure this out. The code *is* the guide.
Think about what your codebase contains. It has your preferred way of setting up API routes. It has the exact patterns you use for state management. It shows how you structure your database queries, how you handle authentication flows, how you write tests. All of that context is right there, in the files you've already written.
When I ask an AI to add a new feature to my project, I don't write a long prompt explaining how I like my code. I just tell it to look at how the existing code works and follow the same patterns. Nine times out of ten, it gets it right. The codebase teaches the AI how I write code far better than any set of instructions could.
## Where external docs actually matter
That said, your codebase can't teach AI everything. There's a clear dividing line between what your code can provide and what it can't.
Your codebase is great for:
- **Your patterns and conventions.** How you structure files, name things, handle errors.
- **Your integrations.** How you've wired up your database, your auth, your API layer.
- **Your business logic.** The specific rules and flows that make your app unique.
But your codebase can't help with libraries and frameworks you haven't used yet. If you're adding Stripe payments for the first time, or integrating a new auth library like Better Auth, the AI has nothing in your project to reference. It's working from its training data alone, and that's where things get shaky.
AI models know a lot, but they aren't always great with every library. Training data has cutoff dates. APIs change. Methods get deprecated. A model might confidently generate code that uses a function that no longer exists, because that's what it learned from older documentation.
This is where tools like Context7 come in. Context7 is an MCP server that pulls up-to-date, version-specific documentation directly into your AI's context. Instead of relying on potentially stale training data, it fetches current docs and working code examples from official sources. You add "use context7" to your prompt and suddenly the AI has accurate, current API references for whatever library you're working with.
The key insight is knowing *when* you need this. If the library is already in your codebase and you've written working code with it, you probably don't. Your existing usage patterns are enough. But for anything new, having fresh documentation injected into the context is genuinely useful.
## The codebase-first workflow
Here's the practical takeaway. Before you reach for elaborate documentation setups or context management tools, try the simplest approach first:
1. **Point the AI at your existing code.** Most modern AI coding tools can index your project. Let them. Your codebase is the single best source of truth for how *your* project works.
2. **Reference specific files when asking for changes.** Instead of describing your patterns, show them. "Add a new API route following the same pattern as `routes/users.ts`" is more effective than a paragraph of instructions.
3. **Only pull in external docs for new dependencies.** If you're integrating something you've never used before, that's when tools like Context7 or manual documentation lookup earn their keep.
4. **Let your code evolve the context.** As you add new integrations and write more code, the AI's understanding of your project grows automatically. Every file you write becomes part of the documentation.
## Stop over-engineering your AI workflow
The developer community has a tendency to over-engineer solutions. We see this playing out with AI coding workflows too. People build complex systems of rules files, context documents, and project brain tools, when the most effective context was sitting in their `src` folder all along.
Your codebase encodes decisions that no documentation can fully capture. The subtle choices about error handling, the way you compose abstractions, the tradeoffs you've made. An AI that reads your code picks up on all of this implicitly.
The best documentation for an AI is code that already works. Everything else is supplementary.
## References
1. Context7 Platform, "Up-to-date code documentation for LLMs and AI code editors," [https://github.com/upstash/context7](https://github.com/upstash/context7)
2. Upstash Blog, "Introducing Context7: Up-to-Date Docs for LLMs and AI Code Editors," [https://upstash.com/blog/context7-llmtxt-cursor](https://upstash.com/blog/context7-llmtxt-cursor)
3. AlgoMaster Newsletter, "How to Use AI Effectively in Large Codebases," [https://blog.algomaster.io/p/using-ai-effectively-in-large-codebases](https://blog.algomaster.io/p/using-ai-effectively-in-large-codebases)
4. Augment Code, "AI Coding Assistants for Large Codebases: A Complete Guide," [https://www.augmentcode.com/tools/ai-coding-assistants-for-large-codebases-a-complete-guide](https://www.augmentcode.com/tools/ai-coding-assistants-for-large-codebases-a-complete-guide)
