---
title: " “I could build that” illusion"
date: "2026-04-28T14:09:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: ["Open Source","Startups","SaaS","Marketing","Distribution","Pricing","Moats","Security","Privacy","Documentation","Coding","Economics"]
---

You see a product, you poke around for ten minutes, and a familiar thought creeps in: "I could build that in a weekend." Maybe you could. The login screen, the dashboard, the CRUD operations, the basic feature set. That part was never the hard part.
The illusion isn't that you lack the technical skill. It's that you're comparing the wrong things. You're looking at the tip of the iceberg and estimating the weight of the whole thing.
## The clone is the easy part
With modern frameworks, open-source libraries, and AI-assisted coding, replicating the core functionality of most software products has never been faster. A to-do app, a CRM, a project tracker, a landing page builder, you can get a working prototype up in days.
But a prototype is not a product. And a product is not a business.
What you see when you use someone else's software is the polished surface: the interface, the features, the flow. What you don't see is the years of accumulated decisions underneath. Edge cases handled at 2 AM. Migration scripts from three database schemas ago. The billing logic that accounts for proration, refunds, tax jurisdictions, and failed payments. The monitoring that pages someone when a background job silently stops running.
Cloning the visible 10% is straightforward. It's the invisible 90% that breaks you.
## Three different games
The "I could build that" instinct also tends to flatten very different activities into one. Building something as a personal project, building it as open source, and building it as a business are three fundamentally different endeavors. They share a starting point, writing code, but diverge almost immediately after.
**Personal projects** are forgiving. You're the only user. You can cut corners, skip tests, hardcode values, and deploy from your laptop. If it breaks at 3 AM, nobody cares. The feedback loop is short and the stakes are low. This is where most developers form their intuition about how long things take, and it's precisely why that intuition misleads them when the context changes.
**Open-source projects** add a layer of social and technical complexity that personal projects don't have. Now you need documentation. You need a contribution guide. You need to handle issues from people running your code on operating systems you've never tested. You need to make architectural decisions that won't paint you into a corner two years from now, because other people are building on top of your choices. You need to review pull requests from strangers, maintain backward compatibility, and communicate breaking changes. And all of this is typically unpaid. A 2020 survey by Tidelift found that 46% of open-source maintainers have experienced burnout, and that figure jumps to 58% for maintainers of widely used projects.
**Businesses** are a different universe entirely. Now you need everything from the open-source track, plus infrastructure, uptime guarantees, payment processing, customer support, legal compliance, marketing, distribution, onboarding, and retention. Each of these is its own discipline. Each has its own failure modes. Software maintenance alone can account for up to 60% of total lifetime costs, according to industry analyses, and that's before you factor in the cost of acquiring and keeping customers.
Saying "I could build that" while looking at a business is like saying "I could paint that" while looking at a gallery. Sure, you could paint a canvas. But could you curate a collection, lease a building, attract visitors, manage staff, and stay solvent for a decade?
## Why the illusion persists
Developers are particularly susceptible to this bias because their core skill, writing code, maps so directly onto the visible artifact. When you know how to build software, every product looks like software. But most successful products are only incidentally software. They're really bundles of trust, distribution, operational reliability, and accumulated user understanding.
There's a version of the Dunning-Kruger effect at play here, though not the caricature version. It's not that developers are clueless. It's that expertise in one domain (building the thing) creates a blind spot for adjacent domains (shipping, selling, supporting, and sustaining the thing). The more fluent you are at writing code, the more natural it feels to underweight everything that isn't code.
This is also why so many developer-founded startups over-invest in engineering and under-invest in distribution. The code feels like the real work. Marketing feels like a distraction. But as the saying goes, the best product doesn't always win. The best-distributed product does.
## The real complexity checklist
Next time you catch yourself thinking "I could build that," try running through the full list of what "that" actually involves:
- **Infrastructure**: Servers, CDN, backups, monitoring, auto-scaling, disaster recovery. Who gets paged at 3 AM when the database runs out of disk space?
- **Payments**: Subscription management, invoicing, failed charge retries, refunds, proration, tax compliance across jurisdictions, fraud detection.
- **Security**: Authentication, authorization, data encryption, vulnerability patching, compliance certifications, penetration testing.
- **Support**: Bug reports, feature requests, onboarding help, documentation, status pages, incident communication.
- **Legal**: Terms of service, privacy policies, data processing agreements, GDPR/CCPA compliance, export controls.
- **Distribution**: SEO, content marketing, partnerships, sales outreach, product-led growth funnels, referral programs.
- **Maintenance**: Dependency updates, database migrations, API versioning, backward compatibility, performance optimization, technical debt management.
Any one of these areas can consume a full-time role. Together, they represent the bulk of what makes a product succeed or fail, and none of them involve writing new features.
## The useful version of the instinct
The "I could build that" instinct isn't entirely bad. It's a sign of confidence, curiosity, and technical ambition. The problem is only when it stops at the code.
A more honest version might be: "I could build a prototype of that." That's almost certainly true, and it's a great starting point. But between a prototype and a product people pay for, there's a canyon filled with unglamorous work that doesn't show up in demo videos or launch tweets.
The developers who actually ship successful products aren't the ones who can build the fastest clone. They're the ones who understand that the code is the easy part, and then choose to do all the hard parts anyway.
## References
1. [Tidelift 2020 Open Source Maintainer Survey](https://tidelift.com/about/press-releases/survey-of-open-source-software-maintainers-confirms-high-rates-of-unpaid-volunteer-work-and-burnout)
2. [Hidden Software Development Costs: What Businesses Overlook, Software Logic](https://softwarelogic.co/en/blog/hidden-software-development-costs-what-businesses-overlook)
3. [7 Hidden Costs That Sink Your Software Project, Dirox](https://dirox.com/post/hidden-costs-software-development)
4. [The Iceberg Principle in Software Products, Sean Flaherty](https://theseanflaherty.medium.com/software-architecture-imperatives-b0162dbc7ed2)
5. [The Dunning-Kruger Effect and Its Impact on Software Projects, Robert Nash](https://www.linkedin.com/pulse/dunning-kruger-effect-its-impact-software-projects-robert-nash-ovz3e)
6. [The Illusion of Building, r/programming](https://www.reddit.com/r/programming/comments/1rlgcs9/the_illusion_of_building/)
