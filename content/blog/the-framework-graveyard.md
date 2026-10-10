---
title: "The framework graveyard"
date: "2026-05-02"
lastEdited: "2026-05-01T16:04:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Frameworks","TypeScript","JavaScript","Web","Productivity","Mindset"]
---

TSRX dropped last week. Billed as the "spiritual successor to JSX," it promises a cleaner authoring model for UI components, framework-agnostic compilation, and scoped styles baked into the language. It was created by Dominic Gannaway, a former React core engineer who also built Inferno and contributed to Svelte. It compiles to React, Solid, and Ripple. The reception was enthusiastic, with hundreds of retweets and thousands of likes within hours.
Another week, another framework. Or in this case, a meta-framework that sits above frameworks. The JavaScript ecosystem has a well-documented addiction to reinvention, and at some point you have to ask: when does innovation become noise?
## The lifecycle of a JavaScript framework
Every new framework follows the same arc. Hype builds on Twitter and Hacker News. Early adopters write glowing blog posts. Conference talks proliferate. Tutorials flood YouTube. Companies start adopting it for greenfield projects. Then the cracks appear, the maintainer burns out or pivots, and the community quietly migrates to the next thing.
We have seen this play out repeatedly. Backbone.js was revolutionary in 2010, giving structure to chaotic jQuery spaghetti. By 2015 it was legacy code. AngularJS dominated enterprise frontend development, then Angular 2 broke backward compatibility so thoroughly that teams treated it as an entirely different framework, and many never came back. Ember promised "ambitious web applications" and delivered a strong convention-over-configuration model, but its complexity and learning curve pushed developers toward simpler alternatives.
Meanwhile, React has been around since 2013 and remains the dominant choice. Vue has held steady since 2014. Svelte, despite being smaller, carved out a loyal niche by taking a genuinely different approach to reactivity. The frameworks that survive tend to share a few traits: they solved a real problem, they maintained backward compatibility (or at least managed migrations gracefully), and they built ecosystems larger than themselves.
Most new frameworks have none of these advantages on day one.
## TSRX is interesting, but that is not the point
To be clear, TSRX is not a bad project. Gannaway has serious credentials. The idea of a TypeScript-native templating language that compiles to multiple framework targets is genuinely clever. Statement-based control flow inside templates, scoped styles as first-class syntax, and full backward compatibility with TypeScript are all thoughtful design choices.
But the interesting question is not whether TSRX is technically good. It is whether anyone needs it. JSX has been the standard way to write React components for over a decade. It works. The tooling supports it. Every tutorial, every Stack Overflow answer, every AI coding assistant understands it. TSRX solves real annoyances with JSX, like awkward conditional rendering and the lack of native style scoping, but these are paper cuts, not arterial bleeds.
This is the pattern that repeats across the ecosystem. A talented engineer identifies a genuine friction point, builds an elegant solution, and ships it to great fanfare. But the friction point was never painful enough to justify the migration cost, and the project slowly fades into the long tail of npm.
## The AI accelerant
Here is what makes the current moment different from previous waves of framework fatigue: AI tools have made framework choice less important than ever.
When an AI coding assistant can scaffold a project in React, Vue, Svelte, or Solid in under a minute, the syntactic differences between frameworks shrink to near zero. The developer experience gap that used to justify switching frameworks, things like boilerplate reduction, ergonomic APIs, and faster iteration, is being closed by tools that sit above the framework layer entirely.
This cuts both ways. On one hand, it means new frameworks face even stiffer headwinds. Why learn TSRX when your AI assistant already writes fluent JSX? On the other hand, it means the cost of trying something new is lower than ever. You can experiment with Ripple or Solid without committing weeks to learning a new mental model.
But experimentation is not adoption. And adoption is what determines whether a framework lives or dies.
## The productivity paradox
There is a cruel irony in the JavaScript ecosystem. The sheer volume of choices available to developers, frameworks, build tools, state management libraries, CSS-in-JS solutions, is supposed to empower productivity. In practice, it often does the opposite.
Dan McKinley's famous essay "Choose Boring Technology" articulated this problem clearly. Every organization has a limited number of "innovation tokens" to spend. Each new technology you adopt consumes one. Boring technologies, the ones that have been around long enough to have well-understood failure modes and deep community knowledge, are boring precisely because they work.
This applies directly to framework selection. React is boring. That is its greatest strength. When something breaks at 3 AM, there are Stack Overflow answers. When you need to hire, there are candidates. When you need a library for authentication, routing, forms, state management, or data fetching, there are mature options with years of production hardening.
A new framework has none of this. It has a README, a Discord server, and the enthusiasm of its creator. That is not nothing, but it is not enough to bet a product on.
## What actually survives
If you look at the frameworks and libraries that have endured in the JavaScript ecosystem, a pattern emerges. Longevity correlates with a few specific qualities:
**Ecosystem depth matters more than API elegance.** React's API has always been somewhat awkward. Hooks were controversial when they launched. Server components remain confusing to many developers. But React's ecosystem, Next.js, React Native, thousands of component libraries, an enormous job market, creates gravity that no amount of syntactic sugar can overcome.
**Stability compounds.** Every month a framework maintains backward compatibility is another month of accumulated blog posts, tutorials, answered questions, and battle-tested production deployments. This knowledge base becomes the framework's real moat. New entrants start at zero.
**Solving a real pain point matters, but timing matters more.** jQuery solved DOM manipulation pain in 2006 when browsers were wildly inconsistent. React solved UI state management pain in 2013 when single-page applications were becoming mainstream. Svelte solved build-time compilation in 2019 when bundle size anxiety was peaking. Each arrived at the moment its core insight was most needed. Arriving too early or too late is equally fatal.
## The TypeScript consensus
One thing the JavaScript ecosystem has genuinely agreed on is TypeScript. After years of type-system debates, TypeScript has won decisively. It is the default for new projects, supported by every major framework, and expected by most hiring managers.
This consensus is unusual and worth paying attention to. TypeScript succeeded not by being the most innovative option, but by being the most pragmatic. It was a strict superset of JavaScript, so migration was incremental. It integrated with existing tooling. It did not ask developers to abandon their mental models.
There is a lesson here for anyone building new developer tools. The technologies that win long-term tend to meet developers where they are, not where the creator wishes they were.
## Pick boring technology, seriously
If you are starting a new project today, the pragmatic advice has not changed in a decade. Use what your team knows. Optimize for hiring. Pick the framework with the largest ecosystem for your use case. Resist the dopamine hit of `npm init` with a shiny new tool.
This does not mean new frameworks are worthless. TSRX, Solid, and others push the ecosystem forward by exploring ideas that eventually filter into mainstream tools. React Server Components borrowed ideas that frameworks like Marko explored years earlier. Svelte's compiler-first approach influenced how every framework thinks about performance. Innovation at the edges is healthy.
But there is a difference between appreciating innovation and adopting it for production. The graveyard of JavaScript frameworks is full of projects that were technically superior to their contemporaries but failed to build the ecosystem gravity needed to survive.
The next time a new framework drops with a bold claim about being the successor to something that already works, take a breath. Read the README. Appreciate the craft. Then close the tab and get back to building your product with the boring tools that actually ship.
## References
1. [TSRX official website](https://tsrx.dev/)
2. [Dominic Gannaway's TSRX announcement on X](https://x.com/trueadm/status/2046696157066264846)
3. [Ryan Carniato, "Why TSRX isn't just your Favorite Templating Language"](https://hackmd.io/@0u1u3zEAQAO0iYWVAStEvw/Hk2Jiv8T-l)
4. [Dan McKinley, "Choose Boring Technology"](https://mcfunley.com/choose-boring-technology)
5. [Allen Pike, "JavaScript Fatigue Strikes Back"](https://allenpike.com/2025/javascript-fatigue-ssr/)
6. [The New Stack, "Why Developers Are Ditching Frameworks for Vanilla JavaScript"](https://thenewstack.io/why-developers-are-ditching-frameworks-for-vanilla-javascript/)
7. [Ripple TS documentation](https://www.ripple-ts.com/docs/introduction)
8. [State of JavaScript Survey](https://stateofjs.com/en-US)
