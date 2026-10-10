---
title: "The genius of ecosystem lock-ins"
date: "2026-05-26T20:31:00.000+08:00"
lastEdited: "2026-05-25T16:06:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["SaaS","Pricing","Moats","Startups","VCs","Open Source","Ecosystems","Economics"]
---

A growing wave of developer tool startups have figured out something clever: give away the product for free, solve a genuinely hard problem, and wait for the rare winners to grow into high-paying customers. It looks like generosity. It is generosity. But it is also a carefully designed business model, and if you are building on top of these tools, it is worth understanding how it works before the bill arrives.
## The free tier is the product
WorkOS offers authentication for up to one million users at no cost. PostHog gives you one million analytics events per month for free, and more than 90% of companies using the platform never pay a cent. Axiom provides 500 GB of log ingestion per month on its personal tier. Clerk hands you 10,000 monthly active users with polished, drop-in React components. Vercel lets you deploy a Next.js app in seconds with automatic CI/CD, a global CDN, and DDoS mitigation, all on the free hobby plan.
These are not stripped-down trials. They are fully functional products that solve real, difficult problems. Authentication alone involves session management, token handling, bot detection, rate limiting, multi-factor authentication, cross-server persistence, and dozens of edge cases that most teams would rather not think about. Observability means ingesting, storing, and querying massive volumes of telemetry data in near real-time. Deployment means building, caching, routing, and scaling across a global network.
These companies invest heavily to make the free experience excellent because that is how the funnel starts.
## The bet underneath the generosity
The economics here resemble venture capital more than traditional SaaS pricing. A VC firm invests in twenty companies knowing that nineteen might fail, but the one that succeeds returns enough to cover all the losses and then some. Developer tool startups with generous free tiers operate on the same principle.
Most of their users will never pay. Most startups will never reach one million users, or one million events, or enough traffic to breach the free limits. The companies behind these tools know this. They are not losing money on you out of charity. They are making a calculated bet that a small percentage of free users will grow into large, profitable customers, and those customers will pay enough to subsidize everyone else.
WorkOS, for example, makes its real money when your app starts onboarding enterprise clients who need SAML SSO and SCIM provisioning, features that cost per connection. Clerk charges \$0.02 per monthly active user beyond the free tier, and locks features like SMS-based MFA behind a \$100/month add-on. PostHog's usage-based pricing means costs scale directly with your product's success. Vercel's Pro plan starts at \$20/month per seat, but overages on bandwidth, serverless function execution, and image optimization can add up quickly.
The pattern is consistent: free until you succeed, then priced according to how much you succeed.
## Why it works so well as a lock-in
The genius is not just the pricing. It is the timing.
You adopt these tools when you are small, scrappy, and moving fast. You pick Clerk because the pre-built login components save you two weeks of work. You pick Vercel because `git push` and your site is live. You pick PostHog because the free analytics tier is better than what competitors charge thousands for. These are rational decisions at the time.
But as your product grows, these tools become deeply embedded in your stack. Authentication touches every route, every API call, every user session. Observability pipelines feed into dashboards, alerts, and team workflows. Your deployment configuration accumulates custom domains, environment variables, edge functions, and caching rules. Migrating away from any of these becomes a serious engineering project, one that delivers no new features to your users.
By the time you are paying meaningful amounts, switching costs are high and the opportunity cost of a migration is even higher. This is not accidental. The free tier is not just a marketing strategy. It is the first step in a long-term retention play.
## The managed service trade-off
There is a broader pattern here that extends beyond free tiers: the managed service model. These companies do not just give you software. They take on operational complexity. They handle the infrastructure, the security patches, the scaling, the uptime monitoring. You see only the interface you care about.
This is genuinely valuable. Running your own authentication server, or managing your own observability stack, or configuring your own CDN and build pipeline is real work that requires real expertise. Managed services let you trade money for time and headcount.
But the premium can be steep. Developers on Reddit have reported paying \$300 or more per month on Vercel for workloads that would cost \$80 on AWS. One user described a \$3,000 bill from a single misconfiguration with Vercel's image optimization. These are not unusual stories. The convenience markup on managed services is significant, and it compounds as you scale.
For portfolios, side projects, and early-stage products, the trade-off is almost always worth it. Push to deploy, let someone else handle the rest. But for production workloads with meaningful traffic, the math changes, and by then you have already built your entire workflow around the platform.
## What this means for you
None of this means you should avoid these tools. They are excellent products that solve genuinely hard problems, and for most projects, the free tier is more than enough. The startups behind them have aligned their incentives well: they succeed when you succeed.
But it is worth thinking about a few things before you build:
**Understand the pricing curve, not just the starting price.** Look at what happens at 10x and 100x your current usage. Many of these tools have usage calculators. Use them with optimistic growth numbers and see what the bill looks like.
**Identify your hardest-to-migrate dependencies.** Authentication and deployment platforms are particularly sticky. If you are choosing between a managed service and a self-hosted alternative, factor in the long-term cost of being locked in, not just the short-term convenience.
**Recognize the subsidy for what it is.** You are not getting something for nothing. You are getting something now that will cost more later, priced on the assumption that most users never reach "later." If you are one of the ones who does, the economics shift dramatically.
**Consider open-source or self-hosted alternatives for critical infrastructure.** Tools like Keycloak for authentication, Grafana and SigNoz for observability, or Coolify and Kamal for deployment give you more control, even if the initial setup takes longer.
The generous free tier is a brilliant business model. It works because it creates real value for developers at every stage. Just make sure you understand the deal you are signing up for, especially the parts that only become visible once your side project turns into something real.
## References
1. WorkOS AuthKit pricing and free tier details. [https://workos.com/blog/clerk-pricing](https://workos.com/blog/clerk-pricing)
2. Clerk pricing plans and per-MAU costs. [https://www.buildmvpfast.com/alternatives/clerk](https://www.buildmvpfast.com/alternatives/clerk)
3. PostHog pricing page and free tier information. [https://posthog.com/pricing](https://posthog.com/pricing)
4. PostHog usage-based pricing breakdown. [https://userorbit.com/blog/posthog-pricing-guide](https://userorbit.com/blog/posthog-pricing-guide)
5. Axiom observability pricing and free tier. [https://axiom.co/pricing](https://axiom.co/pricing)
6. Vercel pricing plans and usage limits. [https://vercel.com/pricing](https://vercel.com/pricing)
7. Vercel pricing breakdown and hidden costs analysis. [https://flexprice.io/blog/vercel-pricing-breakdown](https://flexprice.io/blog/vercel-pricing-breakdown)
8. Developer experiences with Vercel pricing at scale. [https://www.reddit.com/r/nextjs/comments/1qnld0e/is_anyone_else_frustrated_with_vercel_pricing/](https://www.reddit.com/r/nextjs/comments/1qnld0e/is_anyone_else_frustrated_with_vercel_pricing/)
9. Vercel image optimization billing incident. [https://www.reddit.com/r/nextjs/comments/12dngvg/small_mistake_leads_to_3000_bill_from_vercel_and/](https://www.reddit.com/r/nextjs/comments/12dngvg/small_mistake_leads_to_3000_bill_from_vercel_and/)
10. PostHog's own non-obvious pricing advice for startups. [https://newsletter.posthog.com/p/non-obvious-pricing-advice-for-startups](https://newsletter.posthog.com/p/non-obvious-pricing-advice-for-startups)
