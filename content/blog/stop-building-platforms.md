---
title: "Stop building platforms"
date: "2026-05-03"
lastEdited: "2026-05-02T05:52:00.000Z"
tags: ["Business"]
tagColors: {"Business":"red"}
postTags: ["Startups","VCs","Distribution","SaaS"]
---

You have a seed-stage startup. You have a small team, maybe some early traction, and a pitch deck that says "platform" somewhere on slide three. You're imagining the ecosystem. The marketplace. The developer community. The API that everyone builds on top of.
Stop.
Every seed-stage founder wants to build a platform. Nobody has the distribution, the trust, or the usage to justify one. Build one thing. Nail it. The platform is a reward for winning, not a strategy for starting.
## The premature platform trap
The pattern is everywhere. A founder sees Shopify, Stripe, or Notion and thinks, "I'll be a platform too." The pitch writes itself: massive TAM, network effects, developer ecosystems, winner-take-all dynamics. Investors nod along because platform narratives make the addressable market look enormous.
But here's what gets lost in the narrative: none of those companies started as platforms.
Shopify started because Tobias Lütke wanted to sell snowboards online. In 2004, he and his co-founders tried to launch an online snowboarding equipment store called Snowdevil. They couldn't find an e-commerce tool that worked, so Lütke, a programmer, built his own using Ruby on Rails. It took two months. Two years later, they realized the tool they'd built was more interesting than the snowboards they were selling, and Shopify was born. The app store, the theme ecosystem, the developer platform, all of that came years later, after thousands of merchants were already using the core product.
Stripe started as seven lines of code. In 2010, Patrick and John Collison, two brothers from a village of 200 people in rural Ireland, were frustrated that accepting payments online was unreasonably hard. Existing options like PayPal and [Authorize.net](http://Authorize.net) required weeks of integration work, merchant account applications, and navigating PCI compliance. The Collisons built an API that reduced all of that to a copy-paste job. No merchant accounts. No compliance headaches. Just seven lines of JavaScript and you could accept money. The financial infrastructure empire, Stripe Connect, Stripe Atlas, Stripe Treasury, came much later, after millions of developers had already adopted the core payments product.
Notion started as a note-taking and document tool. The initial release in 2016 was focused on a simple, flexible workspace for writing and organizing information. The databases, the API, the integrations, the template marketplace, the AI features, all of that came after the company had already found its core user base. Notion's co-founders had to restart the company, move to Kyoto, and nearly run out of money before they got the basic product right.
The lesson is consistent: the platform is what you earn after solving one problem so well that people demand extensibility. It's not something you architect on day one.
## Why platforms don't work at seed stage
A platform requires three things that seed-stage companies don't have: distribution, trust, and usage density.
**Distribution** means you need enough users on both sides of a marketplace or enough developers building on your API for the network effects to kick in. At seed stage, you're lucky if you have fifty paying customers. Network effects require a network. Without one, you're just an empty room with nice architecture.
**Trust** means that other businesses or developers are willing to build their products on top of yours. That's a huge ask. They're betting their roadmap on your survival. No one makes that bet on a company with six months of runway and a beta product. Stripe earned developer trust over years of uptime, clear documentation, and consistent API behavior. You can't shortcut that.
**Usage density** means enough activity on your platform that the data, the interactions, and the integrations create compounding value. Stripe's fraud detection system, Radar, gets better as more merchants process transactions through the platform. More data means better models, which means less fraud, which attracts more merchants. That flywheel is meaningless at low volume. You need massive transaction throughput before the network effects even start to materialize.
Without these three ingredients, calling yourself a platform is just declaring an ambition. And ambition without traction is just a pitch deck.
## The API-first fallacy
"We'll be the API for X" is one of the most seductive pitches in startup land. It sounds technically sophisticated and strategically expansive. It implies that you're building infrastructure, not just a product. The TAM looks infinite because you're not selling to end users, you're selling to every developer who might ever need X.
The problem: if you're the API for X, someone else has to build the product. You're outsourcing the hardest part, finding and delighting the end user, to hypothetical third-party developers who may never show up.
This is the premature abstraction problem applied to an entire business model. You're designing the interface before you understand the use case. You're building the plumbing before anyone has drawn the house.
The companies that succeeded as API-first businesses, Stripe, Twilio, SendGrid, earned that position by first understanding the end-user problem deeply. Stripe's founders had personally experienced the pain of integrating payments. Twilio's team understood exactly how developers needed to interact with telephony. They built APIs that were shaped by real needs, not imagined ones.
If you haven't felt the pain yourself, if you can't describe the exact workflow your API simplifies, you're guessing. And guessing at the API layer is expensive, because every revision cascades through every consumer that depends on you.
## What actually works early
One job. One user. One workflow. Painfully narrow.
This feels wrong. It feels small. When you're building a startup, the instinct is to think big, to imagine the end state, the platform vision, the ecosystem diagram on the whiteboard. But the companies that become platforms almost always start by being embarrassingly focused.
Shopify's first version was a single-purpose online store builder. Not a commerce platform. Not a marketplace. Not an app ecosystem. Just a way to put products on a webpage and accept payment for them. The founders built it for their own snowboard shop and then realized other merchants needed the same thing.
Stripe's first version handled one thing: accepting a credit card payment on a website. Not subscriptions. Not marketplaces. Not identity verification or banking-as-a-service. Just "give us card details, we give you money." Seven lines of code. That was the whole product.
Notion's breakthrough came when they stopped trying to be everything and focused on being a flexible document editor that could also handle simple databases. The power came from doing one thing, structured documents, with unusual flexibility.
The pattern is the same every time. Do one thing. Do it ten times better than what exists. Get adopted by people who desperately need that one thing. Then, and only then, start expanding.
## Investors love platform narratives, and that's dangerous
VCs get excited about platforms because the math is irresistible. A platform implies marketplace dynamics, which implies network effects, which implies winner-take-all outcomes, which implies massive returns. The TAM slide in a platform pitch always looks enormous because you're not just capturing revenue from end users, you're capturing a percentage of every transaction in an entire ecosystem.
But TAM is not traction. A large addressable market doesn't mean anyone will address it through your platform. And the gap between "this market is big" and "we are winning in this market" is where most platform startups go to die.
The danger is that the platform narrative can actually delay product-market fit. When you're building a platform, every feature request from a potential customer can be deferred with "a developer will build that on top of our API." Every gap in the product can be hand-waved with "the ecosystem will fill it." The platform abstraction becomes a shield against the hard, unglamorous work of building something that one specific person needs.
The founders who find product-market fit fastest are usually the ones who pick one customer segment, understand their workflow in painful detail, and build the exact tool that segment needs. Not a platform. Not infrastructure. A tool.
## When to actually platform
There is a right time to become a platform. You'll know it because you won't have to force it.
The signal is organic demand for extensibility from existing users. When your customers start asking for an API, when developers start screen-scraping your product because they want to integrate with it, when people are building workarounds to connect your tool with others, that's the sign.
Shopify opened its app store after merchants kept asking for features the core team couldn't build fast enough. Stripe launched Connect after marketplace companies kept hacking together multi-party payment flows on top of the basic API. Notion released its API after years of users begging for a way to programmatically access their workspace data.
In each case, the platform layer was a response to demand, not a speculation about it. The users were already there. The use cases were already proven. The platform just formalized what was already happening informally.
If nobody is asking you for an API, you don't need one. If nobody is trying to build on top of your product, you don't have a platform, you have a product that hasn't found its footing yet.
## One product, one problem
The best early-stage companies are almost boringly focused. They solve one problem for one type of person in one specific workflow. The pitch isn't exciting. The TAM slide is modest. The competitive landscape section is honest about how narrow the initial wedge is.
But the product works. And the users love it. And word spreads. And eventually, the problem space expands naturally because the people who love the first thing start asking for the second thing.
That's how you earn a platform. You don't declare it. You don't architect it. You don't pitch it to investors on slide three.
You build one thing. You nail it. And then the platform finds you.
## References
1. [Shopify founding story and history](https://en.wikipedia.org/wiki/Shopify)
2. [How Stripe turned 7 lines of code into a \$107 billion company](https://grahammann.net/blog/how-stripe-turned-7-lines-of-code-into-107-billion)
3. [Notion: How it became the productivity app of choice](https://medium.com/courtly-intrepid/notion-how-it-became-the-productivity-app-of-choice-1639323b5764)
4. [Seven lines of code, one \$90 billion company: the Stripe story](https://www.linkedin.com/pulse/seven-lines-code-one-90-billion-company-stripe-story-kabr%C3%A9-cpa-wkacc)
5. [The API-first fallacy: why building APIs before products fails](https://www.thegarnetjournal.com/blog/api-first-fallacy/)
6. [How two brothers turned seven lines of code into a \$9.2 billion startup](https://www.bloomberg.com/news/features/2017-08-01/how-two-brothers-turned-seven-lines-of-code-into-a-9-2-billion-startup)
7. [What is Notion AI? Complete history](https://www.taskade.com/blog/notion-ai-history)
8. [Reinventing e-commerce: the history of Shopify](https://craftberry.co/articles/reinventing-e-commerce-the-history-of-shopify-2004-2024)
9. [The importance of network effects for startups](https://www.techfounderstack.com/p/the-importance-of-network-effects)
10. [Premature acceleration: what breaks inside a startup that scales before it's ready](https://medium.com/@dcirl/premature-acceleration-what-breaks-inside-a-startup-that-scales-before-its-ready-cbea82cb7206)
