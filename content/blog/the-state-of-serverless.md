---
title: "The state of serverless"
date: "2026-05-13T13:14:00.000+08:00"
lastEdited: "2026-05-12T16:01:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Serverless","VPS","Cloud","Pricing","Open Source","SaaS"]
---

Serverless compute has become the default starting point for most web projects. Push your code, get a URL, never think about infrastructure. But as projects grow and bills arrive, the picture gets murkier. The promise of "pay only for what you use" starts to compete with the reality of cold starts, vendor lock-in, and pricing that scales faster than your revenue.
This post compares the major serverless platforms, looks at when a VPS makes more sense, and walks through the self-hosted tools that are closing the developer experience gap.
## What serverless actually means in 2026
Serverless, in the context of web application hosting, typically refers to two things: managed deployment platforms like Vercel and Netlify that abstract away infrastructure, and Function-as-a-Service (FaaS) offerings like AWS Lambda where you deploy individual functions that run on demand.
The common thread is that you never provision or manage servers directly. The platform handles scaling, availability, and execution. You write code, push it, and the platform does the rest.
The tradeoff is control. You give up the ability to tune your runtime environment, run long-lived processes, or manage state locally. In return, you get near-zero operational overhead and automatic scaling.
## The major serverless platforms
### Vercel
Vercel is the company behind Next.js, and it shows. The platform is built around frontend frameworks with first-class support for server-side rendering, incremental static regeneration, and edge functions. Deployment is as simple as connecting a Git repo.
**Pricing:** The free Hobby tier includes 100 GB bandwidth and 100,000 serverless function invocations per month. The Pro plan costs \$20 per user per month and bumps that to 1 TB bandwidth and 1,000 GB-hours of serverless compute. Beyond that, overages are charged at \$0.18 per GB-hour for functions and \$40 per 100 GB for bandwidth.
**Strengths:** Best-in-class developer experience for Next.js. Preview deployments on every pull request. Built-in analytics, image optimization, and edge middleware. Sub-second deployments.
**Weaknesses:** Pricing can surprise at scale. A moderately successful SaaS application can easily reach \$500 to \$2,000 per month. Some Next.js features only work properly on Vercel, creating vendor lock-in. Cold starts affect serverless functions under bursty traffic.
### Netlify
Netlify pioneered the Jamstack hosting model and remains a strong choice for static sites and frontend applications. It supports serverless functions, edge functions, form handling, and identity management out of the box.
**Pricing:** The free tier offers 100 GB bandwidth and 125,000 function invocations. The Pro plan is \$19 per user per month with 1 TB bandwidth. Serverless function pricing at scale is notably expensive: 25 million invocations costs around \$950 per month on Netlify versus roughly \$109 on Vercel for the same volume.
**Strengths:** Generous free tier. Built-in form handling and identity features reduce the need for third-party services. Strong support for static site generators and Jamstack workflows.
**Weaknesses:** More expensive than Vercel for serverless-heavy workloads. Egress beyond the free allowance is steep at \$55 per 100 GB. Less optimized for Next.js compared to Vercel.
### AWS Lambda
AWS Lambda is the original FaaS platform and remains the most flexible. It supports over 15 programming languages, integrates with more than 200 AWS services, and handles virtually any workload pattern.
**Pricing:** \$0.20 per million requests plus \$0.0000166667 per GB-second of compute time. The free tier includes 1 million requests and 400,000 GB-seconds per month, which is generous for small projects.
**Strengths:** Unmatched ecosystem integration. Fine-grained control over execution environment. Mature tooling and extensive documentation. Automatic scaling to millions of concurrent executions.
**Weaknesses:** Steeper learning curve. Cold starts of 100 to 800 milliseconds depending on runtime and configuration. Requires understanding of IAM roles, API Gateway, and the broader AWS ecosystem. Not a "push and deploy" experience without additional tooling like SST or the Serverless Framework.
### Cloudflare Workers
Cloudflare Workers run JavaScript at the edge across Cloudflare's global network. They use the V8 isolate model instead of containers, which eliminates cold starts almost entirely.
**Pricing:** The free tier includes 100,000 requests per day. The paid plan starts at \$5 per month for 10 million requests, with additional requests at \$0.30 per million.
**Strengths:** Near-zero cold start times. Extremely competitive pricing. Global distribution by default. Workers KV and Durable Objects provide edge-native storage.
**Weaknesses:** Limited to JavaScript and WebAssembly runtimes. Execution time limits are strict. Not suitable for long-running processes. Some Node.js APIs are not supported.
### Heroku
Heroku was one of the first PaaS platforms and still serves a large user base, though its relevance has faded since Salesforce removed the free tier in 2022.
**Pricing:** The cheapest plan (Eco) costs \$5 per month for shared dynos that sleep after 30 minutes of inactivity. The Basic plan is \$7 per month for an always-on single dyno. Production-grade plans start at \$25 per month.
**Strengths:** Simple, opinionated workflow. Excellent for quick prototypes. Large ecosystem of add-ons for databases, caching, and monitoring.
**Weaknesses:** Expensive for what you get at scale. Performance is inconsistent on shared dynos. The platform has seen less innovation compared to newer alternatives.
### Other platforms worth noting
[**Fly.io**](http://Fly.io) runs containers close to users on a global network. It offers a more VPS-like experience with the convenience of managed deployment. Pricing starts around \$1.94 per month for the smallest VM.
**Render** positions itself as a modern Heroku alternative with free static site hosting and paid services starting at \$7 per month. It supports background workers, cron jobs, and managed databases.
**Railway** offers a usage-based model with a generous free tier and a developer experience focused on simplicity. It supports any Dockerfile and provides managed databases.
## The pricing reality check
The common narrative is that serverless is cheaper because you only pay for what you use. This is true for low-traffic and bursty workloads. But the math changes quickly once traffic becomes predictable and sustained.
Consider a modest SaaS application handling 5 million API requests per month with an average execution time of 200 milliseconds at 512 MB memory:
- **AWS Lambda:** roughly \$15 to \$25 per month
- **Vercel:** roughly \$40 to \$80 per month depending on bandwidth
- **Netlify:** potentially \$200 or more per month at higher invocation tiers
Now compare that to a \$15 per month VPS from Hetzner or DigitalOcean that can comfortably handle 30,000 requests per second with proper tuning. The VPS costs the same regardless of whether it handles 1 million or 50 million requests.
The crossover point varies by workload, but the general pattern holds: serverless wins at low and unpredictable traffic, while fixed-cost infrastructure wins at steady, moderate-to-high traffic.
## The VPS alternative
A Virtual Private Server gives you a dedicated slice of a physical machine with root access, persistent processes, and predictable monthly billing. The tradeoff has always been operational overhead: you manage the OS, security patches, deployments, and scaling yourself.
But this tradeoff has shifted dramatically. A new generation of self-hosted PaaS tools now gives you most of the developer experience of Vercel or Heroku on your own VPS.
### Coolify
Coolify is an open-source, self-hosted platform that turns any VPS into a deployment target with a clean web interface. It supports Git-based deployments, automatic SSL via Let's Encrypt, and over 280 one-click application templates.
**Key features:**
- Supports GitHub, GitLab, Bitbucket, and Gitea integrations
- Automated database management for PostgreSQL, MySQL, MariaDB, MongoDB, and Redis
- Works on ARM devices including Raspberry Pi
- Built with Laravel and Svelte
**Best for:** Developers who want a Heroku-like experience without deep Docker knowledge. The interface is beginner-friendly and the template library covers most common self-hosted applications.
**Limitations:** Docker Compose projects with multiple interconnected services can be finicky. Error messages are sometimes vague when deployments fail. Built-in monitoring is basic.
### Dokploy
Dokploy is a newer entrant (launched in 2024) that takes a Docker-native approach. It uses Docker Swarm for orchestration and supports native Compose files with minimal modification.
**Key features:**
- Native Docker Swarm integration for multi-node scaling
- Pull request preview environments
- Built-in cron job support
- Over 200 one-click templates
- Built with Next.js and TypeScript
**Best for:** Teams comfortable with Docker who want a platform that stays close to standard container workflows. Dokploy handles complex Compose setups more reliably than Coolify.
**Limitations:** Smaller community and less documentation than Coolify. The interface assumes familiarity with Docker and Traefik concepts. Advanced monitoring features are only available in the paid cloud version.
### The cost savings are significant
Running a self-hosted PaaS on a VPS dramatically reduces hosting costs for developers managing multiple projects:
- **DigitalOcean App Platform:** roughly \$12 per month per project (basic app plus managed database), so \$60 per month for five projects
- **Hetzner VPS with Dokploy or Coolify:** roughly \$14 to \$15 per month total for the same five projects
That is a 75% cost reduction. Over a year, it adds up to over \$500 in savings for a handful of hobby projects.
## Serverless vs. VPS: when to use which
The choice is not binary. The best approach depends on your workload characteristics.
**Choose serverless when:**
- Traffic is unpredictable or bursty
- You are building an MVP and want to minimize operational overhead
- Your application is event-driven (webhooks, image processing, scheduled tasks)
- You need automatic global distribution
- Your team is small and does not want to manage infrastructure
**Choose a VPS when:**
- Traffic is steady and predictable
- You need persistent connections (WebSockets, streaming)
- You want consistent, low-latency performance without cold starts
- You are running multiple projects and want to consolidate costs
- You need full control over your runtime environment
**Consider a hybrid approach when:**
- Edge functions handle lightweight routing and auth
- Core API and background workers run on a VPS
- Bursty tasks like image processing use serverless functions
- A shared Redis or database instance ties everything together
## The horror stories
For every success story about serverless simplicity, there is a cautionary tale about a bill that arrived like a jump scare. These are not hypothetical risks. They happen regularly, and they happen to experienced engineers.
### The recursive Lambda trap
The most common serverless nightmare is the recursive loop. A Lambda function writes to an S3 bucket, which triggers the same Lambda function, which writes to the same bucket, and so on forever. AWS calls this the "recursive runaway problem," and it has produced some of the most expensive bugs in cloud computing history.
One developer on Reddit shared how a misconfigured Lambda-to-S3 loop ran undetected for three days and racked up a \$3,200 bill. There were no alerts, no warnings, and no automatic cutoffs. They only discovered it by checking the billing dashboard manually. AWS eventually forgave part of the charge, but not before the developer described nearly passing out at the sight of the number.
Another team reported a Lambda bill that exploded to \$75,000 over a single weekend due to bad retry logic. A small error cascaded into millions of invocations before anyone noticed. The post-mortem conclusion: billing alarms fired too late, and the only real fix was hard concurrency caps and dead-letter queues on every async flow.
A separate account described a \$47,000 weekend bill caused by a single line of code that introduced an unintended recursive invocation. AWS has since added recursive loop detection that stops invocations after roughly 16 calls in the same chain, but it is not foolproof and can produce false positives that block legitimate workflows.
### The Vercel and Netlify bill shock
Managed platforms are not immune. A Next.js developer using Vercel received an unexpected \$1,100 bill, primarily from Fast Data Transfer charges (\$1,031) and edge requests (\$87). The site had no viral traffic spikes and nothing unusual in analytics. The likely culprit was bots and crawlers hitting ISR pages and images. The developer was an employee, not the company owner, and had to explain the bill to their boss.
Photographer Jingna Zhang publicly shared receiving a massive Vercel bill that did not match request logs, calling the discrepancy unbelievable. The incident prompted Yan Cui, a well-known serverless advocate, to note that while pay-per-use pricing is inherently more expensive at scale, Vercel's overage pricing is "insane" compared to other serverless platforms.
The pattern repeats on Netlify. A developer in a Malaysian developer community shared a \$4,000 Netlify bill that took over two weeks of investigation before it was waived. The developer moved most sites to Cloudflare immediately.
These stories share a common thread: serverless platforms scale automatically in both directions, up when traffic surges and up when your bill surges. The "infinite scalability" that marketing teams celebrate is the same mechanism that can bankrupt a solo developer over a weekend.
### The \$70,000 freelancer bug
Perhaps the most painful category involves third-party code. One SaaS founder received a \$70,000 Google Cloud bill after a freelancer from Upwork introduced a bug that caused cloud functions to loop endlessly. The founder had no budget alerts configured and no concurrency limits set. The bill arrived before the bug was even noticed.
This highlights a uniquely dangerous aspect of serverless: the blast radius of a bug is your credit card limit. On a traditional VPS, a runaway process might crash the server or max out CPU. On serverless, it spawns thousands of parallel invocations across a global network, each one billable.
### Why these stories keep happening
The root cause is not that developers are careless. It is that serverless pricing models create asymmetric risk. The upside of automatic scaling is capped by your traffic. The downside is theoretically unlimited. Most platforms offer billing alerts, but they are often delayed by hours. By the time an alert fires, the damage is done.
AWS, Vercel, and others have introduced safeguards like recursive loop detection, spend limits, and concurrency caps. But these features are opt-in, not defaults. The safe configuration requires knowledge that most developers only acquire after getting burned.
## Practical takeaways
1. **Start with serverless if you are unsure.** The developer experience is unbeatable for getting started, and the free tiers are generous enough for prototyping.
2. **Monitor your bills.** Serverless pricing is opaque until it is not. Set up billing alerts early and review costs monthly.
3. **Know your crossover point.** Once your monthly serverless bill consistently exceeds the cost of a capable VPS, it is time to evaluate migration.
4. **Self-hosted PaaS tools are production-ready.** Coolify and Dokploy have matured to the point where the developer experience gap with managed platforms is small. The cost savings are real.
5. **Avoid vendor lock-in where possible.** Use standard Docker images, keep your deployment configuration portable, and be cautious about platform-specific features that do not have equivalents elsewhere.
6. **Do not over-optimize early.** A \$20 per month Vercel Pro plan that lets you ship faster is worth more than a \$5 VPS that takes a weekend to configure. Optimize for speed first, then for cost.
## References
1. Vercel pricing page, [https://vercel.com/pricing](https://vercel.com/pricing)
2. Netlify pricing documentation, [https://www.netlify.com/pricing](https://www.netlify.com/pricing)
3. AWS Lambda pricing, [https://aws.amazon.com/lambda/pricing](https://aws.amazon.com/lambda/pricing)
4. Cloudflare Workers pricing, [https://developers.cloudflare.com/workers/platform/pricing](https://developers.cloudflare.com/workers/platform/pricing)
5. Heroku pricing, [https://www.heroku.com/pricing](https://www.heroku.com/pricing)
6. Coolify documentation, [https://coolify.io/docs](https://coolify.io/docs)
7. Dokploy documentation, [https://dokploy.com](https://dokploy.com)
8. "Dokploy vs Coolify: The True Cost of Self-Hosting," [srvrlss.io](http://srvrlss.io), [https://www.srvrlss.io/blog/coolify-v-dokploy-v-digitalocean/](https://www.srvrlss.io/blog/coolify-v-dokploy-v-digitalocean/)
9. "Coolify vs Dokploy: Pros, Cons, and Best Use Cases," Cherry Servers, [https://www.cherryservers.com/blog/coolify-vs-dokploy](https://www.cherryservers.com/blog/coolify-vs-dokploy)
10. "Serverless vs. VPS for Backend Hosting: A 2025 Developer's Guide," Cloudzy, [https://cloudzy.com/blog/serverless-vs-vps/](https://cloudzy.com/blog/serverless-vs-vps/)
11. "Recursive AWS Lambda Horror Stories and How to Avoid Them," Vantage, [https://www.vantage.sh/blog/aws-lambda-avoid-infinite-loops](https://www.vantage.sh/blog/aws-lambda-avoid-infinite-loops)
12. "I got hit with a \$3,200 AWS bill from a misconfigured Lambda," Reddit r/aws, [https://www.reddit.com/r/aws/comments/1ltdshc/](https://www.reddit.com/r/aws/comments/1ltdshc/)
13. "AWS Lambda bill exploded to \$75k in one weekend," Reddit r/aws, [https://www.reddit.com/r/aws/comments/1mw89od/](https://www.reddit.com/r/aws/comments/1mw89od/)
14. "Our AWS Bill Hit \$47,000 in One Weekend Because of a Single Line of Code," Devrim Ozcay, [https://devrimozcay.medium.com/our-aws-bill-hit-47-000-in-one-weekend-because-of-a-single-line-of-code-32f6b9cb0cf1](https://devrimozcay.medium.com/our-aws-bill-hit-47-000-in-one-weekend-because-of-a-single-line-of-code-32f6b9cb0cf1)
15. "Unexpected \$1,100 Vercel Bill," Reddit r/nextjs, [https://www.reddit.com/r/nextjs/comments/1o1zs2u/](https://www.reddit.com/r/nextjs/comments/1o1zs2u/)
16. "The cloud billing risk that scares me most as a developer," Good Tech Things, [https://newsletter.goodtechthings.com/p/the-cloud-billing-risk-that-scares](https://newsletter.goodtechthings.com/p/the-cloud-billing-risk-that-scares)
17. "The Serverless Ransomware Model (Why Vercel Sent a \$96K Bill)," YouTube, [https://www.youtube.com/watch?v=u8c449uVk2A](https://www.youtube.com/watch?v=u8c449uVk2A)
