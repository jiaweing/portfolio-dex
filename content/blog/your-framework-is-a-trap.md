---
title: "Your framework is a trap"
date: "2026-04-02"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Every JavaScript developer has opinions about cloud vendor lock-in. We'll debate AWS vs. GCP vs. Azure, agonize over Kubernetes portability, and architect elaborate multi-cloud strategies to avoid being trapped. Then we'll turn around and build our entire product on Next.js without a second thought.
The irony is striking. We've trained ourselves to spot lock-in when it comes from infrastructure providers, but we're remarkably blind to it when it comes wrapped in a great developer experience and an MIT license.
## The economics of "free"
Open-source frameworks cost nothing to adopt. That's the pitch, and it's technically true. You can `npm install next` today and start building for free. But the real price of a framework isn't the license fee, it's the migration cost.
Every component you write in a framework's idiom, every file you place according to its conventions, every API you call from its runtime, these are deposits into an account you can't easily withdraw from. The deeper you go, the more expensive it gets to leave.
This isn't unique to JavaScript. But the JavaScript ecosystem has a particular talent for making lock-in feel like productivity. When a framework handles your routing, your data fetching, your server-side rendering, your image optimization, and your deployment pipeline, you're not just using a tool. You're living inside someone else's architecture.
## The Vercel playbook
Next.js is the clearest example of how this works in practice. The framework is open-source. You can technically self-host it. But the experience is designed, layer by layer, to steer you toward Vercel's platform.
The App Router introduced Server Components that merge data fetching directly into component hierarchies. This sounds elegant until you try to extract those patterns into a standard React application. There are no clean API boundaries to migrate, your data layer is woven into your rendering layer. As one analysis put it, Next.js "no longer functions as a thin routing layer over React" but rather creates dependencies that "pervade your entire application architecture."
The State of JavaScript 2025 survey captured the tension well. Next.js is used by 59% of respondents, making it the dominant meta-framework by a wide margin. But sentiment is deeply mixed, with 21% positive and 17% negative, and it generated more comments than any other project in the survey. One respondent summed it up: "While I did have a positive experience with Next, I'm worried because Vercel is trying to use it to make money."
The existence of the OpenNext project tells you everything you need to know. OpenNext started in 2023 as a community effort to make Next.js "truly portable, deployable on any platform, not just Vercel." It now has backing from Cloudflare and Netlify. The fact that a multi-company open-source initiative is required just to deploy a supposedly open-source framework on other platforms reveals how deep the coupling goes.
And this pattern isn't limited to Vercel. Astro leans toward Netlify. SvelteKit has its own hosting preferences. The framework-to-platform pipeline is becoming the standard business model for JavaScript tooling companies.
## The AI angle nobody talks about
Here's where things get more interesting, and more insidious. AI coding tools are accelerating framework lock-in in ways most developers haven't noticed.
When you ask Cursor or GitHub Copilot to build a feature, what framework does the generated code use? Overwhelmingly, it's React and Next.js. Not because an AI made a reasoned architectural decision, but because that's what dominates the training data. The most popular patterns get suggested most often, which makes them more popular, which makes them get suggested more often.
You didn't choose Next.js. Your AI assistant chose it for you, and you accepted the autocomplete.
The Synopsys OSSRA report found that the amount of open-source code in the average commercial application nearly doubled in a single year, driven largely by AI-generated code. Developers are shipping faster than ever, but much of that velocity comes from automatically generated patterns that embed framework assumptions you never consciously evaluated.
This creates a new kind of lock-in that's harder to see. Traditional lock-in happens when you make a deliberate choice and later discover the exit costs. AI-assisted lock-in happens before you've made any choice at all. By the time you realize your codebase is deeply coupled to a specific framework, it wasn't because you decided it should be, it's because your tools decided for you.
## What "framework-agnostic" actually looks like
There are developers who've opted out of the framework treadmill, and their stacks look very different.
Hono is a web framework built on Web Standards. It runs on Cloudflare Workers, Deno, Bun, AWS Lambda, or Node.js, the same code on all platforms. It's under 14kB in its tiny preset. It has zero dependencies. There's no proprietary runtime, no platform-specific abstractions, no deployment pipeline that happens to work best on one particular cloud provider.
htmx takes an even more radical approach, returning to server-driven HTML with minimal client-side JavaScript. As one developer noted, "literally any full stack developer can pick HTMX up in under 2 hours. There's no complicated state management." The HTMX and Hono combination has gained traction as a lean, server-driven architecture that's genuinely portable.
But let's be honest about the tradeoffs. These tools give you less magic. There's no file-based routing that just works, no automatic image optimization, no zero-config deployment. You're trading convenience for control, and that's a trade most teams aren't willing to make, especially under deadline pressure.
The question isn't whether these alternatives are better in some abstract sense. It's whether the convenience you're getting from your current framework is worth the exit cost you're accumulating.
## The counter-argument is real
Not all lock-in is bad. React has been the dominant UI library for over a decade. Its ecosystem is massive, its job market is deep, and its corporate backing from Meta provides a level of stability that newer alternatives can't match. Sometimes betting on the market leader is the right call.
If your framework is good enough and the company behind it is stable enough, the rational move might be to accept the coupling and move on to problems that actually matter for your product. Not every technical decision needs to be optimized for a future migration that may never happen.
A Cloudflare engineering manager recently demonstrated that you can rebuild 94% of the Next.js API surface in seven days using AI, for about \$1,100 in API tokens. If frameworks are becoming that reproducible, maybe the lock-in penalty is shrinking. Maybe the abstractions matter less than we think when the cost of recreating them keeps dropping.
But trust isn't a guarantee. Vercel's incentives are Vercel's incentives, not yours. And the history of technology is littered with platforms that were stable right up until they weren't.
## Assess the exit cost
The question isn't whether to use frameworks. Of course you should use frameworks. Building everything from scratch is a different kind of trap, one that wastes time instead of constraining it.
The question is whether you've honestly assessed what it would cost to leave. How many of your architectural decisions are genuinely yours, and how many were made by your framework, your deployment platform, or your AI coding assistant?
Here's a simple exercise. Pick your most important production service. Imagine the framework it's built on disappears tomorrow, or more realistically, that the company behind it changes its pricing, its license, or its priorities in a way that doesn't align with yours. How many engineering weeks would it take to migrate? Is that number one you're comfortable with?
If you don't know the answer, that's the problem. Not the lock-in itself, but the fact that you haven't measured it.
Every framework is a bet. Make sure you know the stakes.
## References
1. Shubham Sharma, "The Next.js Vendor Lock-In Architecture," [Medium](https://medium.com/@ss-tech/the-next-js-vendor-lock-in-architecture-a0035e66dc18)
2. "State of JavaScript 2025: Survey Reveals a Maturing Ecosystem," [InfoQ](https://www.infoq.com/news/2026/03/state-of-js-survey-2025/)
3. OpenNext, "Making Next.js truly portable," [opennext.js.org](http://opennext.js.org)
4. Melvin Prince, "Next.js Is at a Breaking Point: Vendor Lock-In, \$1,100 AI Clones, and the Framework War of 2026," [Medium](https://medium.com/better-dev-nextjs-react/next-js-is-at-a-breaking-point-vendor-lock-in-1-100-ai-clones-and-the-framework-war-of-2026-f87f050a1fa4)
5. Hono, "Web framework built on Web Standards," [hono.dev](http://hono.dev)
6. Omar Abid, "Next.js 15.1+ is unusable outside of Vercel," [omarabid.com](http://omarabid.com)
7. HeroDevs, "The Dependency Boom: How AI Is Inflating Open Source Use," [herodevs.com](http://herodevs.com)
8. "State of JavaScript 2025: Key Takeaways for Dev Teams," [Strapi Blog](https://strapi.io/blog/state-of-javascript-2025-key-takeaways)
