---
title: "Credit based billing sucks"
date: "2026-04-27T17:05:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Pricing","SaaS","OpenAI","Anthropic","Claude"]
---

If you've used any AI tool in the last year, you've probably seen it: "You have 47 credits remaining." Cool. What does that mean? How many prompts is that? How many code completions? How many image generations? Nobody knows, and that's the problem.
Credit-based billing has become the default pricing model for AI products. And I think it's one of the worst experiences we've normalized in software.
## The fundamental problem with credits
Credits are an abstraction layer between you and the thing you're actually paying for. When you sign up for a plan, you're asked to choose how many credits you need. But there's no way to know that upfront. There's no historical data to reference, no mental model to anchor to. You're essentially guessing.
This isn't a minor UX issue. It's a structural flaw. As one monetization director at an enterprise productivity company put it: "Credits gave us breathing room while we figured out the real value metric. But they're not intuitive to buyers."
The opacity runs deep. A single "credit" might cover one API call on one platform, ten messages on another, or half a code generation session on a third. There's no standard unit, no shared definition. Forbes has described it well: buyers often don't understand what a credit translates to in value, and expiration rules with surprise overages erode trust fast.
## Real users are getting burned
This isn't theoretical. JetBrains users have been vocal about their frustration with AI credit consumption. One user on the Ultimate tier reported that after updating to a new version, two hours of typical usage burned through a quarter of their monthly credits, a drastic change from the week it used to take. Others reported credits disappearing while their machines were asleep. Multiple users have cancelled subscriptions outright, unable to justify costs under the new model.
Claude users have faced similar pain. In early 2026, Anthropic tightened usage limits as demand outstripped GPU capacity. Pro subscribers started hitting walls faster, and Max subscribers reported usage meters jumping from under 50% to 100% on single prompts. The BBC covered the story after users flagged that one session in a loop could drain an entire daily budget in minutes.
These aren't edge cases. They're the predictable outcome of a billing model that obscures what you're actually consuming.
## Why companies default to credits anyway
To be fair, credit-based pricing exists for a reason. AI inference costs are genuinely variable, and companies need a way to capture that. Credits offer three things vendors care about:
1. **Simplification.** Customers avoid parsing infrastructure metrics like GPU minutes or token counts.
2. **Predictability.** Prepayment limits spend and gives both sides a baseline.
3. **Flexibility.** Vendors can adjust how different features consume credits without rewriting contracts.
But these are vendor benefits dressed up as customer benefits. The simplification only works if customers can intuit the value of a credit, which they can't. The predictability is one-sided, you know your maximum spend but not your maximum utility. And the flexibility means pricing can shift under your feet without any visible contract change.
## A better model: base plan plus overflow
I think a better way to do it is to lock in a base plan and then let usage overflow from there. You get a fixed monthly cost that covers your typical usage, and if you go beyond that, you pay for the extra. The key difference: you're not asked to predict your consumption before you have any data.
This is essentially the hybrid pricing model, and it's gaining traction. A fixed platform fee covers your baseline costs and gives you budget predictability. The usage component captures expansion naturally as adoption grows. Stripe, Metronome, and others in the billing infrastructure space have been advocating for exactly this approach.
The hybrid model works because it aligns incentives. The vendor gets predictable recurring revenue from the base fee. The customer gets clarity on minimum cost and only pays more when they're getting more value. Nobody has to guess.
## The subsidy era is ending, and that changes everything
Here's what makes this conversation urgent: the era of subsidized AI is ending. Every major lab has been losing money on inference. OpenAI burns through \$1.4 million per day just keeping systems running. Anthropic's cash burn sits at 57% of revenue. These companies have been selling AI below cost to acquire users, the same playbook Uber and DoorDash ran years ago.
As these subsidies unwind, prices will rise. And when they do, the gap between what you thought credits would cost and what they actually cost is going to widen dramatically. If you're already confused about your credit consumption at subsidized rates, imagine what happens when the real costs hit.
The trajectory is already visible. Free tiers are getting slower and more limited. Advanced features are clustering behind paid tiers. By 2028 or 2029, frontier models will likely be subscription or usage-based services negotiated like cloud contracts. AI is becoming a metered utility, and the billing model needs to match.
## What good billing looks like
Pay-as-you-go makes sense. Usage meters with clear time windows, like the 5-hour rolling windows some providers use, make sense. What doesn't make sense is asking someone to pre-purchase an arbitrary number of abstract units before they've even started using the product.
Good billing should have a few properties:
- **Transparency.** You should know exactly what actions cost what, in terms you understand.
- **Real-time visibility.** Dashboards showing current usage, not just end-of-month surprises.
- **Graceful overflow.** When you exceed your plan, the product should slow down or charge a clear overage rate, not just cut you off.
- **Anchoring to outcomes.** Charge per message, per generation, per analysis, something the user can reason about. Not per "credit."
The companies that figure this out will have a genuine competitive advantage. When JetBrains users are fleeing to GitHub Copilot and Claude subscribers are rationing their prompts, billing isn't just a finance problem. It's a product problem.
## The bottom line
Credit-based billing was a bridge solution for an industry that didn't yet know how to price AI. That bridge has served its purpose. As costs rise and users get more sophisticated, the companies that win will be the ones that charge clearly for what they deliver, not the ones hiding behind an abstraction layer nobody understands.
The future of AI billing should be simple: tell me what it costs, let me use it, and charge me fairly for what I consume. Credits don't do that. It's time to move on.
## References
1. Forbes, "Using Credit-Based Pricing In AI-Powered SaaS: What Works And What Doesn't" ([https://www.forbes.com/sites/metronome/2025/10/01/using-credit-based-pricing-in-ai-powered-saas-what-works-and-what-doesnt/](https://www.forbes.com/sites/metronome/2025/10/01/using-credit-based-pricing-in-ai-powered-saas-what-works-and-what-doesnt/))
2. Metronome, "The Rise of AI Credits: Why Cost-Plus Credit Models Work (Until They Don't)" ([https://metronome.com/blog/the-rise-of-ai-credits-why-cost-plus-credit-models-work-until-they-dont](https://metronome.com/blog/the-rise-of-ai-credits-why-cost-plus-credit-models-work-until-they-dont))
3. Forbes, "The Prepaid Credit Trap: Why AI Companies Outgrow The Pricing Model" ([https://www.forbes.com/sites/metronome/2025/12/01/the-prepaid-credit-trap-why-ai-companies-outgrow-the-pricing-model/](https://www.forbes.com/sites/metronome/2025/12/01/the-prepaid-credit-trap-why-ai-companies-outgrow-the-pricing-model/))
4. JetBrains Community, "AI Assistant consuming credits much faster since WebStorm 2025.2.1" ([https://intellij-support.jetbrains.com/hc/en-us/community/posts/29142783285266](https://intellij-support.jetbrains.com/hc/en-us/community/posts/29142783285266))
5. JetBrains Community, "Serious Concerns Regarding JetBrains AI Pricing & Credit Consumption" ([https://intellij-support.jetbrains.com/hc/en-us/community/posts/31142845556370](https://intellij-support.jetbrains.com/hc/en-us/community/posts/31142845556370))
6. BBC News, "Claude Code users hitting usage limits 'way faster than expected'" ([https://www.bbc.com/news/articles/ce8l2q5yq51o](https://www.bbc.com/news/articles/ce8l2q5yq51o))
7. Daniel Miessler, "What Happens When AI Stops Being Artificially Cheap" ([https://danielmiessler.com/blog/ai-stops-being-artificially-cheap](https://danielmiessler.com/blog/ai-stops-being-artificially-cheap))
8. Medium, "The era of free AI is ending, here's how you'll pay for it" ([https://medium.com/enrique-dans/the-era-of-free-ai-is-ending-heres-how-you-ll-pay-for-it-2ae819d5e947](https://medium.com/enrique-dans/the-era-of-free-ai-is-ending-heres-how-you-ll-pay-for-it-2ae819d5e947))
9. Capstone DC, "The End of Cheap AI: Why AI's Cost Reckoning has Begun" ([https://capstonedc.com/insights/the-end-of-cheap-ai-why-ais-cost-reckoning-has-begun/](https://capstonedc.com/insights/the-end-of-cheap-ai-why-ais-cost-reckoning-has-begun/))
10. Stanford Social Innovation Review, "How Much Does AI Cost? For Nonprofits the Answer Is Changing" ([https://ssir.org/articles/entry/low-cost-ai-illusion-nonprofits](https://ssir.org/articles/entry/low-cost-ai-illusion-nonprofits))
11. Forbes, "Hybrid Pricing In SaaS: A Strategic Guide For AI Products" ([https://www.forbes.com/sites/metronome/2025/10/01/hybrid-pricing-in-saas-a-strategic-guide-for-ai-products/](https://www.forbes.com/sites/metronome/2025/10/01/hybrid-pricing-in-saas-a-strategic-guide-for-ai-products/))
12. Kyle Poyar, "AI Credit Pricing Strategies" ([https://www.linkedin.com/posts/kyle-poyar_ai-credit-pricing-is-getting-out-of-hand-activity-7420515716870856704-5YFz](https://www.linkedin.com/posts/kyle-poyar_ai-credit-pricing-is-getting-out-of-hand-activity-7420515716870856704-5YFz))
