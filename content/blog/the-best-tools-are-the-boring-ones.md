---
title: "The best tools are the boring ones"
date: "2026-04-27"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["JavaScript","Frameworks","Documentation","DevTools","Coding"]
---

Postgres started as a research project at UC Berkeley in 1986. SQLite is the most deployed database engine in existence, with over a trillion active databases running on every smartphone, laptop, browser, and car infotainment system on the planet. cURL was first released in 1998 and still quietly powers the majority of internet data transfers. grep has been matching patterns since 1973.
Meanwhile, the average JavaScript bundler enjoys about 18 months in the spotlight before the next one replaces it.
There is a lesson here about what actually survives, and why the tools we overlook tend to be the ones holding everything together.
## The longevity test
The tools that run the internet are decades old. They are boring, stable, and absurdly well-documented. They don't have marketing teams. They don't trend on social media. They just work.
DNS was designed in 1983. TCP/IP dates back to 1974. Make was written in 1976. These technologies have outlasted every hype cycle in computing history, from object-oriented programming to microservices to AI-first everything. They have survived not because nobody tried to replace them, but because replacements kept failing the same test: can you be relied upon at 3 AM when everything is on fire?
The tools that get the most attention are almost always the ones most likely to be abandoned. Hype is a poor predictor of durability. Quiet reliability is a much better one.
## The churn treadmill
The JavaScript ecosystem is the clearest case study in tooling churn. Consider the bundler timeline alone: Webpack arrived and dominated for years. Then Parcel promised zero-config simplicity. Then esbuild rewrote the speed expectations in Go. Then Vite combined esbuild with a dev server that felt instant. Then Turbopack appeared, backed by Vercel and written in Rust. Now Rolldown is emerging as yet another contender.
Each one is genuinely better than the last in some measurable way. Faster cold starts, smaller bundles, better HMR. The improvements are real. But so is the cost.
Every migration means rewriting build configs, updating plugins, debugging edge cases in new territory, and convincing your team the switch is worth the lost sprint. Multiply that across an organization and the numbers get serious. One analysis estimated that framework switching can burn \$200,000 or more in developer time for a single product, with zero immediate business value delivered during the transition.
The irony is that Webpack, despite all the complaints, still holds roughly 97% market share in production. The new tools win benchmarks. The boring tool wins deployments.
## Survivorship bias in tooling
We have a collective habit of celebrating the new and ignoring the old. Tech Twitter rewards novelty. Conference talks showcase what is fresh. Blog posts announce what just launched.
But the things that actually matter, the things your production systems depend on, are invisible precisely because they never break. Nobody writes a blog post titled "DNS worked again today." Nobody gives a conference talk called "grep: still matching patterns after 52 years."
This is survivorship bias running in reverse. We pay attention to the things that are loud and new, while the things that are quiet and old keep the world running without acknowledgment. SQLite does not have a DevRel team. It has over a trillion databases.
## Why boring wins
Boring tools win for compounding reasons, not just one.
First, they have a smaller attack surface. Fewer surprises means fewer 3 AM incidents. Every edge case has already been encountered and documented by someone, somewhere, years ago.
Second, they have better documentation. Not because they hired better technical writers, but because time itself generates documentation. Decades of Stack Overflow answers, blog posts, books, and tribal knowledge accumulate around tools that stick around long enough.
Third, they are better understood by AI coding assistants. This is a newer advantage but an increasingly important one. Tools like Postgres, Python, and cURL have enormous representation in training data. When you ask an AI to help you write a query or debug a connection issue, it performs dramatically better with boring tech than with the framework that launched last quarter. More training data means better assistance, which means faster development.
Fourth, boring tools tend to have battle-tested edge cases. The weird timezone bug, the Unicode normalization issue, the off-by-one error in pagination, someone already hit it, filed it, and got it fixed. With new tools, you are the one filing the issue.
## The Lindy effect applied to dev tools
Nassim Taleb popularized the Lindy effect in his book *Antifragile*: for non-perishable things like technologies and ideas, future life expectancy is proportional to current age. Something that has existed for 50 years is likely to exist for another 50. Something that has existed for 18 months might not make it to 36.
This is not nostalgia. It is a statistical observation about robustness. Technologies that survive do so because they have weathered competition, changing requirements, shifting paradigms, and the relentless pressure of real-world use. Each year of survival is evidence of fitness.
Postgres has been around for 40 years. SQLite for over 25. cURL for nearly 28. grep for over 52. By the Lindy effect, these tools are not just old. They are likely to outlast whatever launches next week.
Contrast this with the database startup that raised a Series A last month. It might be brilliant. It might solve a real problem. But if you are betting your production infrastructure on it, you are making a high-variance wager. The Lindy effect says to bet on Postgres.
## Dan McKinley's innovation tokens
Dan McKinley's essay "Choose Boring Technology" introduced a useful mental model: every company gets about three innovation tokens. You can spend them on new, unproven technology, but the supply is fixed.
Spend one on a novel database? Fine. Spend another on a cutting-edge frontend framework? Okay. Spend a third on a service mesh that has existed for less than a year? Now you have no tokens left, and every layer of your stack carries unknown risk.
The insight is not that new technology is bad. It is that novelty has a cost, and most teams underestimate it. The operational burden of learning failure modes, building institutional knowledge, and debugging undocumented behavior is real and cumulative. Boring technology has known failure modes. When something breaks at 3 AM, you want to be searching Stack Overflow, not pioneering uncharted territory.
## The personal angle
I run 17 apps across multiple stacks. The ones that cause the least pain, without exception, are the ones built on the most boring foundations. Postgres for data. SQLite for local state. Standard HTTP for communication. Vanilla CSS when I can get away with it.
The apps that keep me up at night are the ones where I got clever. The ones where I adopted something exciting because the demo looked fast or the DX felt magical. Those are the ones with mysterious build failures, breaking changes in minor versions, and GitHub issues with no responses.
Stability compounds in the same way that technical debt compounds, just in the opposite direction. Every month you do not spend migrating is a month you spend building. Every hour you do not spend debugging a new tool's quirks is an hour you spend shipping features.
## When boring means stagnant
This is not an argument for technological conservatism. React was new once. Docker was new once. Kubernetes was new once. All of them solved real problems that boring alternatives could not.
The question is not "should I ever adopt new technology?" It is "does this specific new technology solve a problem that my current boring stack genuinely cannot?" If the answer is yes, adopt it. If the answer is "it's faster in benchmarks" or "everyone on social media is using it," that is not sufficient justification for the migration cost.
The best developers I know are not the ones who chase every new framework. They are the ones who deeply understand a small number of reliable tools and know exactly when those tools are not enough. They adopt new technology deliberately, not reflexively.
## Stability compounds
The real argument for boring tools is not that old things are inherently good. It is that stability is an undervalued asset.
In a world obsessed with the next big thing, the competitive advantage often belongs to the team that spends less time migrating and more time building. The team running Postgres while their competitor evaluates the fifth database this year. The team shipping features while others rewrite their build pipeline.
Boring tools are not a compromise. They are a strategy. The best tools are the ones that disappear into the background and let you focus on the work that actually matters.
And if a tool has been doing that quietly for 40 years, that is not a reason to replace it. That is a reason to trust it.
## References
1. [PostgreSQL: A Brief History of PostgreSQL](https://www.postgresql.org/docs/current/history.html)
2. [SQLite: Most Widely Deployed and Used Database Engine](https://sqlite.org/mostdeployed.html)
3. [Lindy effect, Wikipedia](https://en.wikipedia.org/wiki/Lindy_effect)
4. [Dan McKinley, Choose Boring Technology](https://mcfunley.com/choose-boring-technology)
5. [Grep, Wikipedia](https://en.wikipedia.org/wiki/Grep)
6. [The Cost of Switching Frameworks Every Year That No One Wants to Admit, Stackademic](https://blog.stackademic.com/the-cost-of-switching-frameworks-every-year-that-no-one-wants-to-admit-fe896eedc538)
7. [Top 3 Module Bundlers by Market Share (2026), Webmaster Tips](https://www.wmtips.com/technologies/module-bundlers/)
8. [The Lindy Effect: Explaining the Longevity of Legacy Software](https://tobiasvanderwerff.com/2024/08/01/lindy.html)
9. [Choose Boring Technology, Revisited, Aaron Brethorst](https://www.brethorsting.com/blog/2025/07/choose-boring-technology,-revisited/)
