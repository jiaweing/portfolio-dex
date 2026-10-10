---
title: "Everything’s going down"
date: "2026-04-02T13:00:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

So the web has been breaking a lot lately. Vercel is down. GitHub is down. Claude is down. Cloudflare is down. AWS is down.
When people hear "AI is breaking the internet," they picture Skynet or some rogue chatbot gone haywire. The reality is way more boring and, honestly, more concerning. AI is degrading the reliability of the web through two quieter, compounding forces: the bots consuming it and the code building it.
## The bots are eating the web alive
Here's a stat that stopped me in my tracks: AI bots now account for roughly 52% of all global web traffic. More than half the requests hitting servers worldwide aren't from humans browsing, they're from crawlers scraping content to feed large language models.
And these aren't your friendly neighborhood Googlebot politely following robots.txt. AI crawlers from OpenAI, Anthropic, Google, and a growing swarm of smaller players are aggressive. Fastly reported that 80% of all AI bot traffic comes from data fetcher bots that can spike a site's traffic by 10 to 20 times normal levels within minutes. One hosting provider documented a single user's site getting hit with 30TB of bandwidth in a month, entirely from AI bots.
Wikimedia reported that 65% of their most costly traffic comes from bots. Shared hosting environments are buckling under what the industry calls the "noisy neighbor" effect, where heavy bot activity on one account crashes sites on the same server that have perfectly normal human traffic.
This isn't theoretical. It's happening right now, at scale, and it's making the entire web less reliable for everyone.
## AI-generated code is shipping bugs faster than ever
The other side of this problem is less visible but arguably more dangerous. AI coding tools have made developers incredibly fast. But speed without quality is just velocity toward failure.
A study scanning 470 open-access GitHub repos found that AI-generated code creates 1.7 times as many bugs as human-written code. It's not just minor stuff either, AI produced 1.3 to 1.7 times more critical and major issues. Sonar's research frames this as an "Engineering Productivity Paradox": the sheer volume of AI-generated code overwhelms manual review processes, and quality issues slip through at a rate that manual processes weren't designed to catch.
This isn't just an academic concern. Internal Amazon documents, viewed by CNBC and the Financial Times, cited "Gen-AI assisted changes" as a factor in a trend of increasing incidents. A December AWS outage reportedly occurred after engineers let Amazon's own AI coding tool, Kiro, make changes to production systems. Amazon later characterized it as "user error," but the pattern is clear.
Stack Overflow put it bluntly: AI coding agents promise speed but get tripped up by the errors they introduce.
## The numbers don't lie
Let me just lay out what's been happening to the services I depend on every day.
GitHub had 37 incidents in February 2026 alone. Incident frequency is up 23%. At one point in 2025, uptime dropped below 90%, which is staggeringly bad for a platform that millions of developers depend on. In December 2025 alone, they had five separate incidents causing degraded performance, ranging from Kafka misconfigurations to model latency issues in Copilot to runner timeouts from network packet loss.
AWS US-EAST-1 suffered an outage lasting over 15 hours, which cascaded into Vercel going down since Vercel's infrastructure depends on AWS. Cloudflare had a November 2025 outage that lasted up to 6 hours and affected 20 to 28% of global traffic, followed by another in December that hit 28% of HTTP traffic.
These aren't isolated incidents. This is a pattern.
## Centralization makes everything worse
Here's the part that really gets me. The internet was originally designed to be decentralized and resilient. If one node went down, traffic would route around it. But we've slowly concentrated the entire web into a handful of providers.
When AWS US-EAST-1 goes down, it doesn't just take down Amazon's services. It takes down Vercel, which takes down thousands of websites and apps. Cloudflare handles such a massive percentage of global traffic that a single bad config file can break a quarter of the internet. GitHub is the single source of truth for most of the world's source code and CI/CD pipelines.
We've built a web with single points of failure everywhere, and then we've added AI on top to stress those points harder than ever.
The AI traffic flooding in from crawlers adds constant background pressure to infrastructure that was already running hot. The AI-generated code being deployed to these platforms introduces subtle bugs at higher rates. And the AI services themselves, the chatbots and coding assistants, add entirely new categories of demand that this infrastructure wasn't originally designed for.
## What actually needs to change
I don't think AI is inherently bad for the web. But the current trajectory is unsustainable.
On the bot side, the industry needs enforceable standards for AI crawling behavior. Robots.txt is a suggestion, not a rule, and most AI crawlers ignore it anyway. Publishers are being forced into an arms race of WAFs, rate limiters, and CDN rules just to keep their sites online. That's a tax on running a website that didn't exist two years ago.
On the code quality side, the answer isn't to stop using AI coding tools. It's to stop treating them like they don't need oversight. The Amazon incident is a cautionary tale: letting an AI tool make changes without adequate review processes is asking for trouble. Companies need to invest in automated quality gates, better testing infrastructure, and a culture that treats AI-generated code with the same scrutiny as code from a junior developer.
And on the infrastructure side, we need to seriously reconsider how much of the web depends on three or four companies. Multi-region, multi-provider architectures cost more, but the cost of a 15-hour AWS outage cascading across the entire internet is far higher.
## The uncomfortable truth
The uncomfortable truth is that AI is making the web worse right now. Not because AI is evil or broken, but because we're deploying it without accounting for the second-order effects. More bots means more load on infrastructure that hasn't scaled to match. More AI-generated code means more bugs shipping to production. More centralized services means bigger blast radii when things go wrong.
I love building with AI. I use AI tools every day. But I'm also watching the web get noticeably less reliable, and it's hard not to connect the dots.
The web has always been a little fragile. AI is just stress-testing it in ways we weren't ready for.
## References
1. [AI bots are now a significant source of web traffic](https://www.wired.com/story/ai-bots-are-now-a-signifigant-source-of-web-traffic/) , WIRED
2. [The 2026 AI Bot Impact Report: Shared Hosting Risks & Solutions](https://skynethosting.net/blog/ai-bot-impact-report-in-shared-hosting/), Skynet Hosting
3. [AI crawlers destroying websites in hunger for content](https://www.theregister.com/2025/08/29/ai_web_crawlers_are_destroying/), The Register
4. [How crawlers impact the operations of the Wikimedia projects](https://metadrop.net/en/articles/impact-bot-traffic-websites-and-how-mitigate-it), Metadrop
5. [Are bugs and incidents inevitable with AI coding agents?](https://stackoverflow.blog/2026/01/28/are-bugs-and-incidents-inevitable-with-ai-coding-agents/), Stack Overflow
6. [The inevitable rise of poor code quality in AI-accelerated codebases](https://www.sonarsource.com/blog/the-inevitable-rise-of-poor-code-quality-in-ai-accelerated-codebases), Sonar
7. [An AI agent destroyed this coder's entire database](https://fortune.com/2026/03/18/ai-coding-risks-amazon-agents-enterprise/), Fortune
8. [GitHub had 37 incidents in February 2026](https://x.com/aakashgupta/status/2029067638966763692), Aakash Gupta
9. [GitHub seems to be struggling with three nines availability](https://www.theregister.com/2026/02/10/github_outages/), The Register
10. [The 2025 AWS and Cloudflare Outages Explained](https://www.softwareseni.com/the-2025-aws-and-cloudflare-outages-explained/), SoftwareSeni
11. [Cloudflare outage on November 18, 2025](https://blog.cloudflare.com/18-november-2025-outage/), Cloudflare
12. [Update regarding Vercel service disruption on October 20, 2025](https://vercel.com/blog/update-regarding-vercel-service-disruption-on-october-20-2025), Vercel
13. [The Internet Will Keep Breaking in 2026 and AI Is Part of the Reason](https://www.unite.ai/the-internet-will-keep-breaking-in-2026-and-ai-is-part-of-the-reason/), [Unite.AI](http://Unite.AI)
14. [2025 was the year the internet broke: Studies show incidents are increasing](https://www.coderabbit.ai/blog/why-2025-was-the-year-the-internet-kept-breaking-studies-show-increased-incidents-due-to-ai), CodeRabbit
