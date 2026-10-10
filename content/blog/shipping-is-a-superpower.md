---
title: "Shipping is a superpower"
date: "2026-03-30"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Everyone has ideas. Twitter is full of them. "I'm building X" threads with mockups that never become products. AI-generated landing pages for apps that will never exist. The gap between people who talk about building things and people who actually ship them has never been wider.
AI made it easier to start things. It also made it easier to fake momentum. The real superpower was never having ideas, and it was never writing code. It's getting something into the hands of real users.
## The builder-to-talker ratio is broken
Scroll through any tech community and you'll notice a pattern. For every person who actually deployed something this week, there are dozens posting about what they're "working on." Build-in-public threads that never reach a launch date. Polished concept videos for products that don't exist yet. AI-generated prototypes shared for engagement, not for users.
The tools got better, but the ratio got worse. When it took six months to build an MVP, talking about building was at least a signal that you were doing hard work. Now that you can scaffold a full-stack app in an afternoon, the talking part carries almost no signal at all.
The people who stand out are the ones who ship. Not because shipping is inherently virtuous, but because it's the only way to learn anything real.
## Shipping is a compound skill
Every time you deploy something, you learn things that no amount of planning can teach you. You learn how users actually behave versus how you imagined they would. You learn which assumptions were wrong. You build muscle memory for the entire process, from writing the code to handling the deployment pipeline to responding to the first bug report.
This compounds over time. Your tenth deployment is faster than your first, not because the code is simpler, but because you've internalized the patterns. You know where the gotchas are. You know which corners you can cut and which ones will cost you later.
People who only plan and never ship miss this entirely. They optimize in a vacuum. They refine ideas that have never been tested. Each cycle of planning without deploying makes the next deployment feel harder, because the gap between theory and practice keeps growing.
## AI collapsed the wrong bottleneck
Tools like Cursor, Claude Code, and v0 have dramatically compressed the coding phase of building software. You can go from idea to working prototype in hours. This is genuinely transformative.
But here's the thing: writing code was never the hardest part of shipping.
Shipping is deployment. It's DNS configuration and SSL certificates. It's authentication flows and payment integrations. It's CI/CD pipelines, error monitoring, database migrations, and the dozen small decisions that turn a project on your laptop into a product on the internet. It's writing documentation, handling edge cases, and dealing with the first user who finds a bug you never anticipated.
A Fastly survey found that senior developers ship 2.5x more AI-generated code than juniors. Not because seniors write better prompts, but because they know what to do with the output. They've built the surrounding infrastructure before. They understand the deployment context. They can evaluate whether the AI's code actually works in production, not just in a demo.
Juniors, meanwhile, often generate impressive-looking code but get stuck at the integration layer. A METR study even found that experienced open-source developers using AI tools took 19% longer on tasks, partly because the tools created a false sense of speed that led to less careful planning. The lesson isn't that AI is unhelpful. It's that AI amplifies existing skills, and the skills that matter most are the ones that come after the code is written.
## The last mile is where most people quit
There's a well-known pattern in software projects: going from 90% to done takes as long as the first 90%. The Standish Group has consistently found that only about 29% of IT projects are considered successful. The rest are late, over budget, or abandoned.
Side projects are even worse. Developers joke about their graveyard of unfinished repos. One developer catalogued 47 unfinished projects on their machine, including a folder called "million-dollar-idea" with a single empty file inside. The pattern is always the same: excitement at the start, momentum through the fun parts, then a wall when you hit auth, payments, deployment, or error handling.
This is the last mile problem applied to building. The boring infrastructure work, the CI/CD setup, the monitoring, the edge case handling, is where real shipping happens. It's also where most people quit. They move on to the next shiny idea because starting is more fun than finishing.
Recognizing this pattern is half the battle. The other half is pushing through it anyway.
## Consistency beats intensity
Pieter Levels famously challenged himself to launch 12 startups in 12 months. The results weren't 12 unicorns. Most of those projects went nowhere. But the ones that worked, like Nomad List and Remote OK, eventually generated over \$3 million per year in revenue with zero employees.
The insight isn't that you should launch a startup every month. It's that volume creates opportunities that perfectionism never will. Each launch was a chance to learn, to find product-market fit, to discover what users actually wanted. The failures were cheap. The successes compounded.
This applies at every scale. Daily small deploys teach you more than monthly big launches. A consistent publishing cadence, whether it's code, writing, or products, builds a body of work that creates surface area for luck. You can't predict which project will resonate, so the rational strategy is to ship more of them.
Planning matters. But planning without shipping is just daydreaming with a spreadsheet.
## Experience is the real multiplier
The developers who benefit most from AI tools are the ones who already know how to ship without them. They have mental models for architecture decisions. They know which trade-offs matter at which stage. They can look at AI-generated code and immediately spot whether it will work in production or fall apart under load.
This creates an interesting dynamic. AI tools are most powerful in the hands of people who need them least. A senior developer using Cursor can move at extraordinary speed because they're directing the tool with decades of accumulated judgment. A junior developer using the same tool might produce code faster but ship products slower, because they lack the surrounding context to turn code into a working product.
The implication is clear: if you want to get the most out of AI tools, invest in learning how to ship. Not how to write code, how to ship. Learn deployment. Learn infrastructure. Learn how to debug production issues. Learn the boring stuff, because the boring stuff is where the leverage is.
## Ship something mediocre
This is the counterintuitive part. Shipping something mediocre teaches you more than perfecting something you never release. A rough product in front of real users generates feedback that no amount of internal iteration can replicate.
This doesn't mean quality doesn't matter. It means that quality improves faster through iteration than through speculation. Version one is supposed to be embarrassing. Version five is where it gets good. But you only get to version five if you shipped version one.
The portfolio effect is real. Ten small projects shipped over three months will teach you more than one perfect project that takes a year. Not because the small projects are better, but because each one is a complete cycle: idea, build, deploy, learn. That cycle is the unit of progress. The more cycles you complete, the faster you improve.
## The superpower is the last click
Ideas are abundant. Code is increasingly cheap. The scarce resource is the willingness to push through the unglamorous final stretch, to deal with the DNS records and the error handling and the user who found a bug at 11 PM.
That's the superpower. Not having better ideas. Not writing code faster. Just actually deploying the thing.
The gap between people who ship and people who talk about shipping has never been wider. Pick a side.
## References
1. Pieter Levels, [I'm Launching 12 Startups in 12 Months](https://levels.io/12-startups-12-months/)
2. Fastly, [Senior Developers Ship 2.5x More AI Code Than Juniors](https://www.fastly.com/blog/senior-developers-ship-more-ai-code)
3. METR, [AI Coding Tools Underperform in Field Study with Experienced Developers](https://www.infoq.com/news/2025/07/ai-productivity/), InfoQ, 2025
4. Standish Group, CHAOS Report, via [Software Projects Don't Have to Be Late, Costly, and Irrelevant](https://www.bcg.com/publications/2024/software-projects-dont-have-to-be-late-costly-and-irrelevant), BCG, 2024
5. Stack Overflow, [AI vs Gen Z: How AI Has Changed the Career Pathway for Junior Developers](https://stackoverflow.blog/2025/12/26/ai-vs-gen-z/), 2025
6. ZDNet, [The AI Coding Gap: Why Senior Devs Are Getting Faster While Juniors Spin Their Wheels](https://www.zdnet.com/article/why-gen-ai-boosts-productivity-some-developers-not-others/), 2025
