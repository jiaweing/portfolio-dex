---
title: "Stop building for scale"
date: "2026-04-27"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: ["Startups","SaaS","Vibe Coding","Cloud","Serverless","VPS","Coding","Productivity","Mindset"]
---

Most startups die with zero users, not a million. Yet every architecture decision, every tech choice, every hiring plan gets optimized for scale that will never come.
Somewhere along the way, the startup world convinced itself that the default question is "what happens when we get 10 million users?" The honest answer for 99% of startups: you won't. Not because your idea is bad, but because most startups never get past the first hundred. The real killer isn't a lack of infrastructure. It's a lack of users.
Premature scaling, not bad ideas, is the leading cause of startup death. And in the age of AI-assisted coding, the temptation to over-engineer has never been greater.
## The data is clear
In 2011, the Startup Genome Project partnered with researchers at Berkeley and Stanford to study 3,200 startups. Their conclusion was striking: 74% of startups that failed did so because of premature scaling. Not because of bad products, not because of competition, not because of funding. They scaled too early.
Even more telling, the study found that failed startups wrote 3.4 times more code before product-market fit than successful ones. The teams that survived wrote less code and used simpler architectures. The ones that failed were busy building platforms.
This isn't a new insight. Donald Knuth said it decades ago: "The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil." He was talking about code, but the principle applies to entire companies.
## Premature optimization as a cultural disease
Kubernetes for a todo app. Microservices for a team of three. Event sourcing for a landing page.
These aren't exaggerations. They're real patterns that play out in startups every day. A study on Kubernetes adoption found that running a reliable production Kubernetes environment requires roughly four DevOps engineers, each averaging \$141,000 in compensation. That's over half a million dollars a year just to manage infrastructure.
For a small team, the cost isn't just financial. It's attentional. Your backend developer ends up spending two to three hours a day wrestling with cluster issues. Deployments that should take five minutes take two hours. Feature development grinds to a halt. The infrastructure becomes the product, and the actual product stops evolving.
Microservices tell a similar story. Only about 5% of projects genuinely require a microservice architecture from the start. For everyone else, it introduces communication overhead, deployment complexity, and debugging nightmares that a well-structured monolith would never create. As DHH, creator of Ruby on Rails, put it: "The vast majority of systems are much better served by starting and staying with a majestic monolith."
When Amazon's Prime Video team replaced their serverless microservices architecture with a monolith, they cut operating costs by 90%. If Amazon can benefit from simplifying, your seed-stage startup probably can too.
## The AI angle makes it worse
Vibe coding has made it trivially easy to over-engineer. You can scaffold a distributed system in twenty minutes. AI assistants will happily generate Kubernetes configs, set up message queues, and wire together a dozen microservices before you've even validated your idea with a single user.
The tools are remarkable. But capability isn't the same as necessity. Just because you can spin up a complex architecture in an afternoon doesn't mean you should. The speed of generation masks the long-term cost of maintenance. Every service you add, every abstraction you layer on, becomes something you have to understand, debug, and keep running.
Research on AI-assisted coding has found that vibe coders often act as orchestrators rather than engineers, focusing on ideas over implementation. That's powerful for prototyping. But when the orchestrator doesn't fully understand what they've built, the codebase becomes brittle and opaque. The complexity is real even if the effort to create it wasn't.
## What actually kills startups
Startups don't die from database limitations. They die from not finding users, not talking to customers, not shipping fast enough. Infrastructure is never the bottleneck at the start.
Paul Graham captured this perfectly: "The mistake they make is to underestimate the power of compound growth. If you have 100 users, you need to get 10 more next week to grow 10% a week. And while 110 may not seem much better than 100, if you keep growing at 10% a week you'll be surprised how big the numbers get."
The work that matters early on is manual, unglamorous, and doesn't involve choosing between PostgreSQL and CockroachDB. It's sending direct messages to potential users, sitting in on customer calls, and shipping features that solve real problems for real people. The Startup Genome study found that consistent startups spend more time discovering who their customers are, while inconsistent ones skip straight to execution. Successful startups search. Failed startups execute the irrelevant.
Martin Fowler's YAGNI principle, "You Aren't Gonna Need It," is the engineering version of this same truth. Don't build for hypothetical future requirements. Build for what's needed now, and trust that you can adapt when the situation changes.
## The frugal builder philosophy
SQLite on a single VPS gets you further than you think. Developers have scaled SQLite-backed applications to hundreds of thousands of users on a single machine. The SQLite documentation itself demonstrates that it can be 35% faster than direct filesystem I/O for many workloads.
Basecamp, the project management tool used by millions, runs on a monolithic Rails application with roughly 50 employees. Shopify, processing over \$17 million a month in revenue from their SaaS plans alone, runs on a monolith. These aren't companies that couldn't afford to go distributed. They chose not to because it wasn't necessary.
The point isn't that you should never use Kubernetes or microservices. Context matters. The point is that your architecture should match your actual needs, not your imagined future. A Django app with SQLite, a Rails monolith on a single server, a Next.js app on Vercel, these are all perfectly valid architectures for a startup that hasn't found product-market fit yet. And they let you focus on the thing that actually matters: building something people want.
## When scale problems are real
Here's the thing about scale problems: they're a luxury. If you have scale problems, it means you have users, revenue, and signal. That's the dream scenario.
Scale problems are solvable. You can migrate databases, decompose monoliths, add caching layers, and hire infrastructure engineers. These are well-understood problems with well-documented solutions. What's not solvable after the fact is the time you wasted building for a future that never arrived.
Every hour spent on premature infrastructure is an hour not spent talking to users, iterating on the product, or figuring out distribution. The opportunity cost is the real killer.
## Build for the reality in front of you
Life is finite. Build things that matter to real people now, not imaginary users later.
A tool used by 500 companies is a success. A product loved by 100 paying customers is a foundation. An app that solves a genuine problem for a small group of people is infinitely more valuable than a perfectly architected system that nobody uses.
The next time you catch yourself asking "but what if we need to handle millions of requests?", stop and ask a better question: "Do we have ten users who love this?"
If the answer is no, put down the Terraform config and go talk to a customer.
## References
1. Startup Genome Project, "Startup Genome Report Extra on Premature Scaling" (2011), study of 3,200 startups in partnership with UC Berkeley and Stanford, [s3.amazonaws.com/startupcompass-public/StartupGenomeReport2_Why_Startups_Fail_v2.pdf](http://s3.amazonaws.com/startupcompass-public/StartupGenomeReport2_Why_Startups_Fail_v2.pdf)
2. Donald Knuth, "Structured Programming with go to Statements," *Computing Surveys*, Vol. 6, No. 4 (1974)
3. Martin Fowler, "Yagni" (2015), [martinfowler.com/bliki/Yagni.html](http://martinfowler.com/bliki/Yagni.html)
4. David Heinemeier Hansson, "How to recover from microservices" (2023), [world.hey.com/dhh/how-to-recover-from-microservices-ce3803cc](http://world.hey.com/dhh/how-to-recover-from-microservices-ce3803cc)
5. Paul Graham, "Do Things that Don't Scale" (2013), [paulgraham.com/ds.html](http://paulgraham.com/ds.html)
6. Nick Janetakis, "Microservices Are Something You Grow into, Not Begin With," [nickjanetakis.com/blog/microservices-are-something-you-grow-into-not-begin-with](http://nickjanetakis.com/blog/microservices-are-something-you-grow-into-not-begin-with)
7. SQLite Documentation, "35% Faster Than The Filesystem," [sqlite.org/fasterthanfs.html](http://sqlite.org/fasterthanfs.html)
8. KITRUM, "Why Microservices Could Be Your First Big Startup Misstep," [kitrum.com/blog/why-microservices-could-be-your-first-big-startup-misstep](http://kitrum.com/blog/why-microservices-could-be-your-first-big-startup-misstep)
