---
title: "Nobody reads your changelog"
date: "2026-04-05"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: []
---

You shipped 47 features last quarter. Nobody noticed.
This isn't a hypothetical. It's the reality for most product teams. Engineering celebrates, PMs update the roadmap, the changelog gets a fresh entry, and then... nothing. Users discover the new feature three weeks later by accident and ask support, "Was this always here?"
The gap between building and communicating has never been wider. Code has become absurdly fast to write, but storytelling hasn't caught up. We've optimized every part of the development pipeline except the part that actually matters to users: telling them what changed and why they should care.
## The changelog nobody asked for
Most changelogs read like git commit messages wearing a polo shirt. They're technically accurate and completely forgettable.
An Atlassian Community analysis found that nearly 70% of release notes remain unread. Not because the updates aren't important, but because they fail to engage their audience. The average SaaS changelog is text-heavy, jargon-filled, buried on a website, and has zero shareability. It's written for the builder, not the user.
A Reddit thread in r/ProductManagement put it bluntly: "Everyone agrees that nobody reads Internal Release Notes. Why do you still use it?" The replies were revealing. Teams keep writing them out of habit, compliance, or some vague sense of obligation. Almost nobody writes them because they believe anyone will read them.
The core problem isn't that people don't care about updates. It's that the format is broken. Changelogs were designed for an era when software shipped quarterly and users had patience. Now software ships daily and your changelog competes with TikTok for attention.
## The companies that narrate better
A few companies have figured this out. They don't just ship features, they tell stories about them. And the difference in engagement is staggering.
**Linear** is the most cited example. While the average SaaS product sees 10 to 15 percent of users interact with their changelog, Linear reportedly achieves engagement rates many times higher. Their secret isn't magic. It's craft. Every update includes GIFs, screenshots, and icons. The writing is benefit-driven and relatable rather than technical. They store bug fixes and small improvements in collapsible dropdowns to avoid cluttering the main narrative. And critically, they distribute updates across multiple channels: in-app, email, and social media. Their changelog isn't a dusty archive. It's a product in itself.
Linear's own product method documentation explains why they bother: "Writing a changelog benefits both internal and external communication. Internally, it helps your team to track progress and reflect on what they have achieved. Externally, it keeps users informed about what's new and demonstrates your commitment to improving the product."
**Vercel** takes a different approach with their Ship events. Instead of drip-feeding updates through a changelog, they batch announcements into high-energy conferences and themed weeks. Ship 2025 drew over 1,200 people to New York City. Ship AI followed months later. Each event turns infrastructure updates, things that would normally be ignored, into moments of excitement. It's the product launch model applied to continuous delivery.
The genius of Vercel's approach is that it creates narrative arcs. Instead of "we added X," the story becomes "here's where the platform is going and here's how these pieces fit together." Context transforms features into a vision.
**Arc** from The Browser Company went even further by turning release notes into YouTube videos. Their "What's new in Arc" playlist made browser updates feel like episodes of a show you'd actually want to watch. The updates were personal, visual, and short. They didn't just explain features, they showed the humans behind them. Arc proved that the medium matters as much as the message.
## Distribution beats product, even inside the product
There's a recurring pattern in technology: distribution beats product. The best product with no distribution loses to a decent product with great distribution. This principle usually gets applied to go-to-market strategy, but it applies just as powerfully inside the product itself.
Features that aren't communicated don't exist. Not in any meaningful sense. A user who doesn't know about a capability cannot use it. A feature that ships silently might as well not have shipped at all.
This creates a strange tax on every feature. It's not enough to build it, test it, and deploy it. You also have to sell it, and selling it to your existing users is often harder than selling it to new ones. New users encounter your product fresh. Existing users have built habits and mental models. Breaking through those patterns requires more than a bullet point in a changelog.
For indie developers and small teams, this tax is especially brutal. Solo builders ship constantly, sometimes multiple times a day. Each feature represents hours or days of work. But the marketing effort required to make anyone notice a single update can dwarf the engineering effort that went into building it. When you're a team of one, the communication burden is proportionally enormous.
## The AI paradox
The obvious question: can AI fix this? If the problem is that writing good release notes takes too much time and effort, surely AI can help.
Tools are already emerging for this. Aha! offers AI-powered release note drafting that analyzes completed features and organizes them by type. GitHub Marketplace has AI release note generators that turn pull requests into summaries. The pitch is compelling: transform raw changelogs into customer-friendly stories in minutes instead of hours.
But there's an ironic loop here. AI can absolutely write more polished release notes faster. The problem is that we're entering an era where users are increasingly skeptical of AI-generated content. If your release notes feel like they were written by a machine, users will treat them accordingly, which is to say, they'll skim or ignore them entirely.
The companies winning at product communication aren't winning because their writing is efficient. They're winning because their communication feels human, intentional, and crafted. Linear's changelog works because someone clearly cared about every word and every screenshot. Arc's videos worked because real people showed their faces and personalities. Vercel's Ship events work because they create genuine excitement in a room full of actual humans.
AI might be the right tool for generating the first draft. But the last mile of product communication, the part that makes someone stop scrolling and actually pay attention, still requires a human touch.
## What good communication actually looks like
The companies that do this well share a few common traits.
First, they write for benefits, not features. Linear's product communication philosophy explicitly avoids comparative descriptors like "faster, better, more, easier, simpler." Instead, they focus on capabilities (binary statements about what the product can do) and the emotional resonance those capabilities create. The feature isn't "longer battery life." It's "leave your charger at home."
Second, they choose the right medium. A changelog entry works for minor fixes. A video works for visual features. A launch event works for platform shifts. Matching the medium to the magnitude of the update is itself a form of communication. When everything is a changelog entry, nothing feels important.
Third, they distribute aggressively. The best update in the world is useless if it lives on a page nobody visits. In-app notifications, email digests, social media posts, community discussions, these are all channels that need to be part of the communication plan. As one analysis of Linear's strategy noted, their updates are designed to be social-ready and shareable, not static and buried.
Fourth, they batch intelligently. Not every update deserves its own announcement. Grouping related changes into a coherent narrative, like Loops does with their weekly batched releases, creates a sense of momentum. It's raining features, rather than drizzling them one forgettable droplet at a time.
Finally, they treat communication as a product discipline, not an afterthought. The teams that write great changelogs don't do it because someone reminded them to. They do it because they believe, correctly, that an uncommunicated feature is an unfinished feature.
## The real cost of silence
The gap between shipping and communicating isn't just a marketing problem. It's a product problem.
When users don't know about new features, they build workarounds. They submit feature requests for things that already exist. They churn because they think the product isn't improving. Support teams answer questions that good release notes would have prevented.
The cost of silence compounds. Every unnoticed feature is a missed opportunity to demonstrate value, build trust, and deepen engagement. Over time, the product that ships in silence becomes the product that users describe as "it hasn't changed much."
You shipped 47 features last quarter. The question isn't whether they were good features. It's whether anyone knows they exist.
## References
1. "No One Reads Your Release Notes: Here's What They'll Watch Instead," Atlassian Community, October 2025. [Link](https://community.atlassian.com/forums/App-Central-articles/No-One-Reads-Your-Release-Notes-Here-s-What-They-ll-Watch/ba-p/3130089)
2. "Everyone agrees that nobody reads Internal Release Notes. Why do you still use it?" Reddit r/ProductManagement. [Link](https://www.reddit.com/r/ProductManagement/comments/jvy1gn/everyone_agrees_that_nobody_reads_internal/)
3. "Linear's Changelog Strategy: A Deep Dive (And What You Can Learn)," Honest Money by George Pu. [Link](https://blog.getsimpledirect.com/linears-changelog-strategy-a-deep-dive-and-what-you-can-learn/)
4. "Write a changelog," Linear Method, Principles & Practices. [Link](https://linear.app/method/introduction)
5. "Building Product the Linear Way," Nick White, Substack. [Link](https://substack.com/home/post/p-156403632)
6. "Vercel Ship 2025 recap," Vercel Blog. [Link](https://vercel.com/blog/vercel-ship-2025-recap)
7. "Public changelog best practices & examples," [Cycle.app](http://Cycle.app) Blog. [Link](https://www.cycle.app/blog/public-changelog-best-practices-examples-make-your-product-shine-with-stunning-release-notes)
8. "Introducing AI-Powered Release Notes," Aha! Blog. [Link](https://www.aha.io/blog/introducing-ai-powered-release-notes)
9. "AI-Powered Release Notes Customers Actually Read," Modexa, Medium. [Link](https://medium.com/@Modexa/ai-powered-release-notes-customers-actually-read-dbe9b65163a3)
