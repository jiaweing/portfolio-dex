---
title: "Free tiers were never free"
date: "2026-04-27"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Business"]
tagColors: {"Business":"red"}
postTags: ["SaaS","Fundraising","VCs","Pricing","Startups","Open Source","OpenAI","Google"]
---

Something quietly shifted in the developer tooling world this spring. Mezmo, Mintlify, Qoder, Pickaxe, Convex, even Google's Gemini API, all repriced or restricted their free tiers within the same few weeks. This is not coincidence. It is a phase transition. The VC-subsidized free tier era is ending, and developers who built on "free forever" are about to learn an expensive lesson.
## The pattern no one is naming
In April and May 2026 alone, at least half a dozen developer-facing companies changed the economics of their entry-level plans. Convex announced new pricing effective May 6, 2026, restructuring plans and resource limits. Qoder ended its 50% promotional discount and restructured its Teams plan pricing effective April 30, 2026. Google pulled its Gemini Pro models out of the free tier entirely, leaving only Flash-series models for unpaid users. Mintlify's free Hobby tier, once generous for documentation startups, now sits behind increasingly visible upsell walls.
These are not isolated product decisions. They are symptoms of the same underlying pressure: the math no longer works.
## Why free tiers existed in the first place
Free tiers were never charity. They were a growth-stage fundraising tactic.
For a startup trying to raise a Series B, the most persuasive metric was usage. Free users generated vanity numbers, impressive dashboards of monthly active users, API calls, and deployments that made investor decks shine. The cost of serving those users was subsidized by venture capital, treated as a marketing expense rather than a product cost.
This worked when the marginal cost of an additional user was negligible. Bandwidth and storage are cheap. A few extra API calls on a traditional SaaS product barely moved the needle on infrastructure spend. The bet was simple: acquire users for free now, convert a fraction to paid later, and use the growth curve to raise the next round at a higher valuation.
The playbook was proven. It worked for Slack, for Figma, for Notion, for dozens of developer tools that rode the 2015-2022 wave of low interest rates and abundant venture funding.
## The math changed
Then AI happened.
Every developer tool now ships with AI features, and AI features are expensive to run. Every free user on an AI-powered platform costs real GPU dollars, not just bandwidth. When Enrique Dans compared this moment to the end of "millennial lifestyle subsidies" like early Uber and DoorDash, he was pointing at the same dynamic: services that seemed magically cheap because someone was losing money to buy growth.
OpenAI reportedly expects to spend \$5 billion this year on AI operations. Google has strained under the demand for its Gemini models. Activant Capital published research on what they call "the AI pricing cliff," warning that AI startups likely will not grow annual contract values the way traditional SaaS companies did, because offering key features for free has become the competitive norm, at least until the money runs out.
And the money is running out. As interest rates rose and venture capital tightened, the equation flipped. Investors stopped rewarding user count and started demanding unit economics. Suddenly, every free user was not a future customer but a current liability.
## The trust problem
"Free forever" was a promise. It appeared on pricing pages, in blog posts, in conference talks. Developers chose tools based on it. They built production systems, integrated APIs, wrote documentation, and trained teams around platforms that told them the entry cost would always be zero.
Breaking that promise breaks the social contract that open-source-adjacent tools depend on. Developer trust is hard to earn and easy to lose. When a tool you depend on changes its pricing, the switching cost is not just financial. It is the hours spent migrating, the bugs introduced during transition, the institutional knowledge lost.
This is especially painful for small teams. In places like Singapore, where developer teams often run lean and budgets are tight, the reliance on free tooling is not laziness. It is pragmatism. When five tools in your stack reprice in the same month, the compounding cost is real.
## Not everyone is doing this
The interesting counterexample is the companies that have made free tiers a genuine competitive moat.
Cloudflare published a blog post titled "Reaffirming our commitment to free," explicitly stating that their free plan is here to stay and is both mission-aligned and business-aligned. Their argument: free users actually help keep costs lower. The more traffic that flows through Cloudflare's network, the better their threat intelligence, the more efficient their routing, the stronger their product for paying customers.
Vercel's Hobby plan remains "free forever," driving over 100,000 monthly signups through their self-serve freemium model. They crossed \$200 million in revenue by 2025, built on a flywheel where open-source adoption converts into developer trust, which converts into enterprise deals.
The difference between these companies and the ones killing free tiers comes down to unit economics. For Cloudflare and Vercel, free users generate network effects that make the paid product better. For an AI-powered dev tool, each free user is a direct cost center with no offsetting benefit beyond the hope of conversion.
## What replaces free
The post-free-tier landscape is taking shape, and it splits roughly three ways.
**Usage-based pricing** is the most common replacement. Convex's new Starter plan, for example, offers pay-as-you-go beyond free tier limits, letting developers pay only for what they use. Bessemer Venture Partners calls this the shift from "access-based" to "outcome-based" pricing, though the practical reality is messier than the framework suggests.
**Open-source self-hosted alternatives** are gaining ground. Supabase, for instance, is open source and can be self-hosted for free, even as its managed cloud service charges for usage. The 2026 wave of repricing is pushing more developers toward self-hosting as a hedge against vendor pricing changes.
**Just paying** is the third option, and the one most developers resist. But as Andreessen Horowitz noted in their research on AI price wars, the hard part about pricing is resisting the pressure to underprice. Companies that undercharge to win market share eventually have to correct, and the correction is always more painful than starting at the right price.
## The smart response
The lesson here is not "you should have seen this coming," because most developers had no real alternative. The tools were good, the prices were right, and the promises were explicit.
But going forward, the smart response is to treat every free tool as a dependency with an expiration date. Budget for it. Have an exit plan. Know what the self-hosted alternative looks like, or what it would cost to switch to a competitor.
Ask a different question when evaluating tools: not "is this free?" but "what are the unit economics of my usage to this company?" If you are a cost center for your vendor, your free tier is borrowed time.
The era of VC-subsidized developer tooling is not ending because companies are greedy. It is ending because the subsidy was never sustainable. The free tier was always a loan. The bill is just coming due.
## References
1. Convex, "Convex for Enterprise (and updates to everything else)," [news.convex.dev](http://news.convex.dev)
2. Qoder, "Pricing Update: End of Discount & Teams Plan Changes," [docs.qoder.com](http://docs.qoder.com)
3. [Apiyi.com](http://Apiyi.com), "Google Gemini API free tier tightened: Pro models to become paid starting in April," [help.apiyi.com](http://help.apiyi.com)
4. Enrique Dans, "The era of free AI is ending, here's how you'll pay for it," Medium, March 2026, [medium.com](http://medium.com)
5. Activant Capital, "The AI Pricing Cliff No One Wants To Talk About," [activantcapital.com](http://activantcapital.com)
6. Cloudflare, "Reaffirming our commitment to free," [blog.cloudflare.com](http://blog.cloudflare.com)
7. [Reo.dev](http://Reo.dev), "How Developer Experience Powered Vercel's \$200M+ Growth," [reo.dev](http://reo.dev)
8. Tugce Erten, "Surviving AI Price Wars Without Destroying Your Business," Andreessen Horowitz, April 2026, [a16z.com](http://a16z.com)
9. Bessemer Venture Partners, "The AI pricing and monetization playbook," [bvp.com](http://bvp.com)
10. Entrepreneurloop, "AI Free Tier Limits Cut by OpenAI and Google Due to Rising Costs," [entrepreneurloop.com](http://entrepreneurloop.com)
