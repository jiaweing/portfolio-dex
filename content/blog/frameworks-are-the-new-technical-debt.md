---
title: "Frameworks are the new technical debt"
date: "2026-04-08"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Every JavaScript framework promises to save you time. Pick one, follow the happy path, and you'll ship faster than if you wired everything together yourself. That promise held up for years. But something has changed.
We've entered an era where AI writes a significant chunk of our code, and the assumptions baked into modern frameworks are starting to crack. The abstraction layers that once helped human developers move faster are now confusing the AI tools meant to assist them. The frameworks that were supposed to reduce complexity are quietly becoming the biggest source of technical debt in AI-assisted codebases.
This isn't a "JavaScript bad" argument. The problem is structural, and it applies across languages and ecosystems.
## The training data mismatch problem
AI coding assistants learn from historical data. GPT-4, Claude, Copilot, they all have training cutoff dates, and software frameworks don't wait around for models to catch up. A model trained on React 18 patterns will confidently generate code that breaks on React 19. It won't warn you. It won't flag the incompatibility. It will just produce plausible-looking code that subtly fails.
This is already happening in the wild. Next.js developers have reported spending hours debugging issues because Copilot generated App Router code using outdated patterns, mixing pages directory and app directory conventions, suggesting deprecated metadata APIs, and producing stale data fetching patterns. The framework moved, but the model didn't.
The faster a framework ships breaking changes, the wider this gap becomes. Monthly releases with API churn are effectively hostile to AI-assisted development. Every breaking change creates a window where every AI tool in the ecosystem is generating wrong code with high confidence.
## Abstraction layers that confuse agents
Frameworks earn their keep by hiding complexity behind abstractions. Server components, file-based routing, middleware chains, build-time optimizations, these are powerful features when a human developer understands the mental model behind them. But AI models don't have mental models. They have statistical patterns.
When a framework relies on implicit behavior, convention-over-configuration magic, or complex compilation steps, AI tools struggle to reason about what's actually happening. The more "magic" a framework introduces, the more likely an AI assistant is to hallucinate incorrect usage patterns. Research has shown that AI-generated code frequently contains bugs stemming from incomplete understanding of program intent and the inherent limitations of statistical pattern matching. Layers of framework abstraction make this worse, not better.
The meta-framework explosion compounds this problem. Next.js, Nuxt, SvelteKit, Remix, Astro, each one adds its own routing conventions, rendering strategies, data loading patterns, and deployment assumptions. For a human, picking one and learning it deeply is manageable. For an AI model that needs to handle all of them, it's an enormous surface area for confusion.
## The shadcn/ui insight: ownership over dependency
One of the most interesting counter-trends in frontend development is shadcn/ui, and its success tells us something important about where things are heading.
shadcn/ui isn't a component library in the traditional sense. You don't install it as a dependency. Instead, you copy component source code directly into your project. As the project puts it: "This is not a component library. It is how you build your component library."
This copy-paste model flips the traditional framework relationship. Instead of depending on an external package that can change underneath you, you own the code. No version conflicts. No risk of abandoned packages breaking your build. No fighting with CSS overrides because the library made different assumptions about your design system.
It also happens to work beautifully with AI tools. LLMs work well with Tailwind CSS. The components are self-contained and readable. There's no hidden runtime behavior to misunderstand. The code is right there in your project, exactly the kind of stable, explicit context that AI assistants handle well.
The shadcn/ui philosophy points toward a broader principle: ownership over dependency. When you own the code, the AI can read it, understand it, and modify it. When you depend on a framework, the AI has to guess what version you're on, what configuration you're using, and what implicit behaviors are in play.
## Thin and composable: the anti-framework framework
There's a class of tools gaining traction that takes a radically different approach from the full-stack meta-framework. Libraries like Hono, tRPC, and Drizzle succeed precisely because they're thin, composable, and explicit.
Hono is an ultrafast web framework built on Web Standards. It works across runtimes (Cloudflare Workers, Deno, Bun, Node.js) with a tiny API surface. There's not much to get wrong, and the patterns are stable.
tRPC provides end-to-end type-safe APIs without requiring REST or GraphQL boilerplate. The API is small, the types are explicit, and the behavior is predictable.
Drizzle is a TypeScript ORM that reads like SQL. No magic query builders, no implicit eager loading, no surprising runtime behavior. What you write is what runs.
These tools share a philosophy: do one thing, do it well, get out of the way. They're composable rather than comprehensive. You pick the pieces you need and wire them together. The result is a stack where every layer is explicit, stable, and easy for both humans and AI to reason about.
This is minimalism as a feature, not a limitation. When your tools have small, stable API surfaces, AI models are far more likely to generate correct code. The training data mismatch problem shrinks because there's less surface area to get wrong.
## What framework-light development actually looks like
Framework-light doesn't mean framework-free. It means choosing tools with intention, favoring explicit behavior over magic, and minimizing the abstraction layers between your code and what actually runs.
In practice, this might look like:
- Using a thin HTTP layer (like Hono) instead of a full meta-framework for your API
- Copying well-designed components into your project (the shadcn/ui approach) instead of installing a monolithic UI library
- Choosing a type-safe, SQL-adjacent ORM (like Drizzle) over one that hides the database behind layers of abstraction
- Keeping your build pipeline simple and explicit rather than relying on framework-specific compilation magic
- Writing plain TypeScript functions that any AI tool can read, understand, and modify
The common thread is reducing the gap between what you write and what executes. The less magic in your stack, the better AI tools can help you, and the less technical debt you accumulate when those tools inevitably get details wrong.
## The next generation of libraries will be AI-first
There's a prediction worth making: the next generation of popular libraries will be designed with AI consumption in mind. Not because their authors are thinking about AI specifically, but because the qualities that make a library AI-friendly are the same qualities that make it good.
Stable APIs. Excellent documentation. Minimal implicit behavior. Small surface area. Predictable patterns. These have always been signs of good library design. The difference is that in an AI-assisted development world, the cost of violating these principles becomes much more visible.
We're already seeing early signs of this shift. The tools gaining the most traction, Hono, Drizzle, shadcn/ui, share these characteristics. Meanwhile, frameworks that lean heavily on convention, implicit behavior, and rapid iteration cycles are generating the most friction with AI tools.
This doesn't mean frameworks will disappear. For many projects, the productivity gains of a well-chosen framework still outweigh the costs. But it does mean that framework authors will increasingly need to consider how their design decisions interact with AI-assisted development. Breaking changes have always been painful. Now they're painful at scale, because every breaking change ripples through every AI-generated codebase that touches the framework.
## The real debt is invisible
The most insidious thing about framework-driven technical debt in the AI era is that it's invisible at first. The AI generates code that looks correct. It passes a cursory review. It might even work initially. But it's built on assumptions about framework behavior that are subtly wrong, and those assumptions compound over time.
Traditional technical debt is a conscious trade-off: you know you're cutting corners. AI-generated framework debt is different. You don't know the model hallucinated a deprecated API. You don't know the pattern it used was from two major versions ago. The debt accumulates silently, and by the time you discover it, it's woven throughout your codebase.
The antidote is the same as it's always been for technical debt: simplicity. Use less framework. Own more of your code. Choose tools that are explicit, stable, and composable. The AI era hasn't changed what good software engineering looks like. It's just made the costs of complexity harder to hide.
## References
1. "A Survey of Bugs in AI-Generated Code," arXiv, 2024. [https://arxiv.org/html/2512.05239v1](https://arxiv.org/html/2512.05239v1)
2. "Why Does AI Generate Outdated Code and How Do I Fix It?" Zen Van Riel, 2025. [https://zenvanriel.com/ai-engineer-blog/why-does-ai-generate-outdated-code-explained/](https://zenvanriel.com/ai-engineer-blog/why-does-ai-generate-outdated-code-explained/)
3. "NextJS + AI Coding Assistants = Outdated suggestions hell," Reddit r/nextjs, 2024. [https://www.reddit.com/r/nextjs/comments/1h2f1al/nextjs_ai_coding_assistants_outdated_suggestions/](https://www.reddit.com/r/nextjs/comments/1h2f1al/nextjs_ai_coding_assistants_outdated_suggestions/)
4. "Introduction," shadcn/ui documentation. [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs)
5. "Why shadcn/ui is Different," Vercel Academy. [https://vercel.com/academy/shadcn-ui/why-shadcn-ui-is-different](https://vercel.com/academy/shadcn-ui/why-shadcn-ui-is-different)
6. "Web framework built on Web Standards," Hono documentation. [https://hono.dev/docs/](https://hono.dev/docs/)
7. "It's Time To Build APIs for AI, Not Just For Developers," The New Stack, 2025. [https://thenewstack.io/its-time-to-build-apis-for-ai-not-just-for-developers/](https://thenewstack.io/its-time-to-build-apis-for-ai-not-just-for-developers/)
8. "AI use may speed code generation, but developers' skills suffer," InfoWorld, 2025. [https://www.infoworld.com/article/4125231/ai-use-may-speed-code-generation-but-developers-skills-suffer.html](https://www.infoworld.com/article/4125231/ai-use-may-speed-code-generation-but-developers-skills-suffer.html)
