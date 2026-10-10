---
title: "Javascript was written in 10 days"
date: "2026-04-09T17:43:00.000+08:00"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

In May 1995, a 34-year-old engineer named Brendan Eich sat down at Netscape Communications and built a programming language in just 10 days. He didn't sleep much. What emerged from that sprint was a scrappy, imperfect scripting language that would go on to become the backbone of the modern web. Today, JavaScript runs on 98.9% of all websites, powers server infrastructure, mobile apps, and desktop software, and is now deeply intertwined with the rise of artificial intelligence.
This is the story of how a "silly little brother language" became one of the most important technologies ever created.
## The 10 days that changed computing
The mid-1990s were a frenetic time for the internet. Netscape Navigator dominated the browser market, and the web was still mostly static HTML pages. Marc Andreessen, Netscape's co-founder, had a vision: the web needed a scripting language that could make pages dynamic and interactive.
Netscape had just struck a deal with Sun Microsystems to embed Java in the browser. But Java was heavy, complex, and aimed at professional software engineers. What Andreessen, Sun's Bill Joy, and Eich saw was a need for something lighter, something that ordinary web developers, designers, and beginners could use. Think Visual Basic to Java's C++.
Eich was uniquely suited for the job. He had been building programming languages since college "just to experiment in syntax," and had created languages for network monitoring tools at Silicon Graphics. He was originally recruited to Netscape to implement Scheme, an elegant academic language. But by the time he arrived, the political landscape had shifted. Java was now the star, and the question became whether a second language was even needed.
Under pressure from both Microsoft's looming competition and internal skepticism, Eich was given an impossibly tight deadline. "I was under marketing orders to make it look like Java but not make it too big for its britches," he later recalled. "It's just this sort of silly little brother language, right? The sidekick to Java."
The result was Mocha, later renamed LiveScript, and finally JavaScript. It borrowed syntax from Java, functions from Scheme, and prototypal inheritance from a lesser-known language called Self. It was a compromise, but a potent one.
## From browser toy to global standard
JavaScript's early years were messy. The language shipped with bugs and quirks that quickly became impossible to fix because, as Eich noted, "once something is released into the wild, bugs or imperfections quickly become essential features and are nearly impossible to change."
One of his biggest regrets was the loose equality operator (`==`), which performs type coercion. An early Netscape tester asked Eich to make it so that comparing the number `2` to the string `"2"` would return true without explicit conversion. He obliged. That decision eventually led to the creation of the strict equality operator (`===`) during standardization, a band-aid that JavaScript developers still navigate today.
Standardization came through ECMA International, which published the first ECMAScript specification in 1997. This was critical for the language's survival, as the browser wars between Netscape and Microsoft's Internet Explorer had created divergent implementations. A shared standard meant JavaScript could evolve consistently across platforms.
But progress stalled for years. ECMAScript 4 was abandoned due to disagreements about the language's direction, and ECMAScript 5 (2009) delivered only modest improvements. JavaScript was widely used but widely derided, trapped in a perception as a language of `alert()` boxes and copy-pasted snippets.
## The ES6 revolution and the rise of modern JavaScript
Everything changed with ECMAScript 2015, commonly known as ES6. This was the most significant update in the language's history, introducing:
- **Arrow functions** for cleaner, more concise syntax
- **Classes** for more familiar object-oriented patterns
- **Promises** for better asynchronous programming
- **Template literals**, **destructuring**, and **modules**
- **`let`**** and ****`const`** to replace the quirky scoping behavior of `var`
ES6 didn't just add features. It signaled that JavaScript was serious about becoming a modern, professional-grade language. Annual releases followed (ES2016, ES2017, and so on), each adding targeted improvements like `async/await`, optional chaining, and nullish coalescing.
Meanwhile, the ecosystem exploded. Node.js (released in 2009) had already brought JavaScript to the server, creating the possibility of full-stack JavaScript development. Frameworks like React, Angular, and Vue transformed frontend development. Package managers like npm grew to host over a million packages, making JavaScript's ecosystem the largest in the history of software.
By the mid-2010s, JavaScript was no longer just a browser language. It was everywhere.
## TypeScript: JavaScript's strict older sibling
As JavaScript codebases grew in size and complexity, developers increasingly bumped into the limitations of a dynamically typed language. Microsoft's answer was TypeScript, released in 2012, a strict superset of JavaScript that adds static type checking.
TypeScript's adoption was slow at first, but it accelerated as major frameworks embraced it. Angular rewrote itself in TypeScript. React's ecosystem shifted heavily toward it. New frameworks like Next.js and tools like Vite scaffold projects in TypeScript by default.
The numbers tell the story. In August 2025, TypeScript overtook both Python and JavaScript to become the most-used programming language on GitHub, growing by one million contributors in a single year (a 66% year-over-year increase). JavaScript still boasts 2.15 million contributors, but growth has slowed as developers migrate to TypeScript for its safety guarantees and tooling benefits.
Not everyone is thrilled. Some high-profile projects have moved away from TypeScript, citing build complexity and developer friction. DHH removed TypeScript from Turbo 8. Svelte's internal codebase switched to JSDoc annotations. The State of JavaScript 2024 survey showed that while 80% of developers use TypeScript, forums are filled with exhaustion over fighting the type system rather than writing code.
Still, TypeScript's trajectory is clear. It has become the default for serious JavaScript development, and its influence on the language itself is growing.
## JavaScript in the AI age
The rise of large language models (LLMs) and AI-assisted development has given JavaScript and TypeScript an unexpected advantage. LLMs generate TypeScript code with remarkable accuracy, and the reason is structural.
AI models learn from training data, and the internet is overflowing with focused, self-contained JavaScript and TypeScript examples. Unlike C++ or Java, which often appear in large enterprise codebases as fragments tied to broader contexts, JavaScript code tends to be modular, problem-oriented, and well-scoped. React components, Node.js utilities, and API handlers are exactly the kind of patterns that LLMs excel at reproducing.
TypeScript's static type system amplifies this further. Types serve as constraints that help LLMs produce more correct, predictable code. When a function signature specifies its inputs and outputs, the model has a clearer target. This is why AI coding assistants like GitHub Copilot and Cursor perform especially well in TypeScript environments.
The data backs this up. More than 80% of new developers on GitHub use Copilot within their first week. Over 1.1 million public repositories now use an LLM SDK, a 178% year-over-year increase. Coding agents created over a million pull requests between May and September 2025 alone.
JavaScript's role in AI extends beyond being a target language for code generation. Libraries like TensorFlow.js bring machine learning directly into the browser. The Vercel AI SDK provides a unified TypeScript interface for working with multiple LLM providers. Tools like LangGraph and FastMCP are being built in the JavaScript ecosystem for orchestrating agentic AI workflows.
In a twist of irony, the language that was hacked together in 10 days is now one of the best languages for machines to write.
## Where the future holds
JavaScript's future is shaped by several converging trends.
**TypeScript will continue to dominate.** The TypeScript compiler is being rewritten in Go (by the TypeScript team at Microsoft) for dramatically faster performance, which should address one of the language's most common complaints. Native TypeScript execution support is being explored in Node.js and Deno, potentially eliminating the compilation step entirely.
**AI-assisted development will reshape workflows.** The combination of TypeScript's type safety and AI's code generation capabilities is creating a new development paradigm. Developers increasingly describe what they want, and AI fills in the implementation. This makes TypeScript's strict contracts more valuable, not less.
**The ecosystem will keep expanding.** JavaScript already runs on servers (Node.js, Deno, Bun), in mobile apps (React Native), on desktops (Electron, Tauri), at the edge (Cloudflare Workers), and even in embedded systems. WebAssembly, which Eich calls "another thing I'm particularly proud of," extends JavaScript engines to run code from any language at near-native speed.
**The language itself will keep evolving.** ECMAScript proposals for pattern matching, decorators, and other features continue to modernize JavaScript's syntax and capabilities. The TC39 standards process ensures that changes are carefully vetted and backward-compatible.
Brendan Eich once described JavaScript as "a seed, a potent kind of compromise, but still very powerful kernel that grew into a bigger language." Three decades later, that seed has grown into something he could never have imagined from those 10 sleepless days in May 1995. And with AI supercharging both how JavaScript is written and what it can do, the language shows no signs of slowing down.
## References
1. Eich, B. "Brendan Eich on Creating JavaScript in 10 Days, and What He'd Do Differently Today." The New Stack, August 2018. [https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/](https://thenewstack.io/brendan-eich-on-creating-javascript-in-10-days-and-what-hed-do-differently-today/)
2. "JavaScript." Wikipedia. [https://en.wikipedia.org/wiki/JavaScript](https://en.wikipedia.org/wiki/JavaScript)
3. "History of JavaScript." GeeksforGeeks. [https://www.geeksforgeeks.org/javascript/history-of-javascript/](https://www.geeksforgeeks.org/javascript/history-of-javascript/)
4. Milanović, M. "The Trends #9: TypeScript just became the most used programming language on GitHub." Tech World With Milan Newsletter, December 2025. [https://newsletter.techworld-with-milan.com/p/the-trends-9-typescript-just-became](https://newsletter.techworld-with-milan.com/p/the-trends-9-typescript-just-became)
5. Shaw, S. "TypeScript Is Becoming the Java of 2025." JavaScript in Plain English. [https://javascript.plainenglish.io/typescript-is-becoming-the-java-of-2025-heres-what-s-replacing-it-c916d591f7c0](https://javascript.plainenglish.io/typescript-is-becoming-the-java-of-2025-heres-what-s-replacing-it-c916d591f7c0)
6. Landgraf, T. "Why I Choose TypeScript for LLM-Based Coding." Medium. [https://medium.com/@tl_99311/why-i-choose-typescript-for-llm-based-coding-19cbb19f3fa2](https://medium.com/@tl_99311/why-i-choose-typescript-for-llm-based-coding-19cbb19f3fa2)
7. McKenzie, C. "The Future of AI is JavaScript." Medium. [https://medium.com/@kenzic/the-future-of-ai-is-javascript-4e8501c3062f](https://medium.com/@kenzic/the-future-of-ai-is-javascript-4e8501c3062f)
8. "AI + JavaScript: Beyond the Hype." devmio. [https://devm.io/javascript/ai-javascript-beyond-hype](https://devm.io/javascript/ai-javascript-beyond-hype)
