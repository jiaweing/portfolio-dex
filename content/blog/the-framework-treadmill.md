---
title: "The framework treadmill"
date: "2026-05-04"
lastEdited: "2026-05-03T08:24:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Frameworks","TypeScript","Documentation","Marketing","Economics","LLMs","Coding"]
---

Somewhere between the last time you ran `npm update` and the next conference keynote promising to "fix frontend forever," you lost a week. Not to building. Not to shipping. To migrating.
The JavaScript ecosystem has a well-documented addiction to novelty. A new framework surfaces, gathers momentum on social media, lands a few conference talks, and suddenly your current stack feels like legacy software. You start planning the rewrite. Six months later, the cycle repeats. The treadmill is the product now, and most of us are running on it without questioning where it leads.
## The quarterly reinvention
The pattern is almost clockwork. Every few months, a new framework or meta-framework emerges with bold claims: better developer experience, smaller bundles, faster rendering. The community rallies. Blog posts flood in. Tutorials get written. And for a brief window, everything old is wrong and everything new is the answer.
But the State of JavaScript 2025 survey tells a more grounded story. The average respondent has used only 2.6 frontend frameworks over their entire career. The survey editors put it directly: "The image of the burned-out web developer jumping from framework to framework on a monthly basis isn't quite accurate anymore." The major frameworks, React, Vue, Angular, and Svelte, are all mature and stable. Developers aren't switching because they're bored. They're settling because the tools work.
So why does it still *feel* like everything is churning? Because the loudest voices in the ecosystem aren't the ones quietly shipping with stable tools. They're the ones announcing the next big thing.
## The real cost of churn
Framework churn isn't free, and the price isn't just engineering hours. It compounds in ways that are easy to overlook.
First, there's **documentation decay**. When a framework ships a major version, every tutorial written for the previous version becomes partially or fully obsolete. Stack Overflow answers stop working. Blog posts that once helped thousands now mislead them. The collective knowledge base effectively resets.
Then there's **plugin and ecosystem erosion**. Third-party libraries that took years to mature get abandoned when the framework they depend on changes direction. You lose battle-tested solutions and inherit fresh, unproven replacements.
There's also the **expertise expiration problem**. A developer who spent 18 months mastering a framework's internals finds that knowledge devalued overnight. Not because they stopped learning, but because the ground shifted beneath them. This isn't growth. It's waste.
And the financial cost is real. Enterprise teams migrating between major framework versions can spend hundreds of thousands of dollars on what is essentially a lateral move, rebuilding the same product with different syntax. One analysis estimated that a 500-employee tech company could spend nearly \$14 million over three years just keeping up with framework-driven development costs, including migrations, post-migration fixes, and the complexity tax that comes with staying current.
## The boring tech that keeps winning
While the JavaScript world reinvents itself quarterly, some technologies just keep working. Rails powers Shopify, GitHub, and Basecamp. Django runs Instagram and Pinterest. PHP, for all the jokes, still powers a massive share of the web through WordPress and beyond. Nobody writes breathless blog posts about these stacks anymore, and that's exactly the point.
Dan McKinley's famous essay "Choose Boring Technology" introduced the concept of innovation tokens: the idea that every team has a limited budget for new, unproven technology. Boring technology, MySQL, Postgres, Python, Linux, isn't boring because it's bad. It's boring because its failure modes are well understood. When something breaks at 3 AM, you want to be debugging a technology with thousands of documented solutions, not pioneering uncharted territory.
The boring tech advantage isn't about refusing to evolve. It's about spending your innovation budget on problems that actually matter to your users, your business logic, your unique value proposition, not on which way the rendering wind is blowing this quarter.
## Conference-driven development
There's an uncomfortable truth about how frameworks get adopted: it often has less to do with technical merit and more to do with marketing.
A well-delivered conference talk can single-handedly shift an ecosystem. A charismatic speaker with polished slides and a compelling demo can make a framework feel inevitable. Developers leave the talk excited, pitch it to their teams on Monday, and suddenly a technology choice that should involve careful evaluation becomes an impulse decision driven by a 30-minute presentation.
This isn't a critique of conference speakers, most of whom are genuinely passionate. It's a critique of how we collectively make technology decisions. Frameworks shouldn't get adopted because of good talks. They should get adopted because of good software. But the incentive structures push the opposite direction: framework authors are rewarded for novelty and visibility, not for stability and backward compatibility.
## AI makes it worse and better
Artificial intelligence has introduced a strange duality into the framework churn problem.
On one hand, AI coding assistants are genuinely useful for migrations. They can translate syntax, update API calls, and handle the mechanical drudgery of moving between framework versions. What used to take weeks of careful manual work can now be accelerated significantly.
On the other hand, AI dramatically lowers the barrier to creating yet another framework. When you can scaffold a new meta-framework in an afternoon with AI assistance, the temptation to build rather than reuse gets stronger. The supply side of framework creation just got a massive boost, which means more noise, more options, and more pressure to evaluate things you probably don't need.
The net effect is unclear. AI might help teams stay current more cheaply, reducing the pain of churn. Or it might accelerate the cycle itself, creating more frameworks faster than anyone can evaluate them. Probably both, simultaneously.
## How to tell signal from noise
None of this means all churn is bad. React was once "the new thing," and it genuinely improved how we build interfaces. TypeScript was dismissed by many early on and is now effectively standard. Some new frameworks really do represent meaningful progress.
The challenge is distinguishing signal from noise, and here are a few heuristics that help.
**Look at adoption curves, not launch hype.** A framework that's growing steadily after two years is a very different bet than one that peaked on launch week. Hype fades. Sustained adoption reflects real utility.
**Check the migration story.** How does the framework handle breaking changes? Does it provide codemods, migration guides, and backward compatibility layers? A framework that respects your existing investment is one that plans to be around.
**Ask who's using it in production.** Conference demos are optimized for "wow." Production deployments are optimized for "works." The gap between those two is where most framework promises quietly die.
**Count the innovation tokens.** Borrowing McKinley's model, ask yourself: is this new framework solving a problem that genuinely matters for my product, or am I spending an innovation token on infrastructure that won't move the needle for users?
## What the ecosystem actually needs
The JavaScript ecosystem doesn't need another framework. It needs something far less exciting: stability.
It needs boring releases. Releases that fix bugs, improve performance, and don't break your code. Releases that respect the investment developers have already made.
It needs mature plugin ecosystems where library authors can build with confidence that the platform underneath them won't shift in six months.
It needs documentation that stays accurate for more than one major version cycle.
And it needs a culture that celebrates shipping over switching. The best framework is the one you don't have to think about, the one that gets out of your way and lets you focus on the thing your users actually care about.
I've watched too many teams spend more time migrating than building. The framework treadmill keeps spinning, and it'll keep spinning as long as we let conference hype and social media momentum drive our technology decisions. The way off the treadmill isn't to run faster. It's to step off, pick what ships, and start building things that last.
## References
1. State of JavaScript 2025 survey, [https://2025.stateofjs.com/en-US/libraries/front-end-frameworks](https://2025.stateofjs.com/en-US/libraries/front-end-frameworks)
2. Dan McKinley, "Choose Boring Technology," [https://mcfunley.com/choose-boring-technology](https://mcfunley.com/choose-boring-technology)
3. Alexander T. Williams, "Why Developers Are Ditching Frameworks for Vanilla JavaScript," The New Stack, December 2025, [https://thenewstack.io/why-developers-are-ditching-frameworks-for-vanilla-javascript/](https://thenewstack.io/why-developers-are-ditching-frameworks-for-vanilla-javascript/)
4. JetBrains, "JavaScript and TypeScript Trends 2024," [https://blog.jetbrains.com/webstorm/2024/02/js-and-ts-trends-2024/](https://blog.jetbrains.com/webstorm/2024/02/js-and-ts-trends-2024/)
5. Resti Guay, "The Hidden Million-Dollar Cost: Why Modern JavaScript Frameworks Are Bankrupting Enterprise Development," Medium, [https://medium.com/@resti.guay/the-hidden-million-dollar-cost-why-modern-javascript-frameworks-are-bankrupting-enterprise-575db08a4663](https://medium.com/@resti.guay/the-hidden-million-dollar-cost-why-modern-javascript-frameworks-are-bankrupting-enterprise-575db08a4663)
6. Charity Majors, "Choose Boring Culture," [charity.wtf](http://charity.wtf), 2023, [https://charity.wtf/2023/05/01/choose-boring-technology-culture/](https://charity.wtf/2023/05/01/choose-boring-technology-culture/)
7. Ted Hagos, "The Case for Boring Tech: Why Stability is a Feature," 2026, [https://tedhagos.com/engineering/strategy/2026/01/19/the-boring-tech-why-stability-is-a-feature.html](https://tedhagos.com/engineering/strategy/2026/01/19/the-boring-tech-why-stability-is-a-feature.html)
