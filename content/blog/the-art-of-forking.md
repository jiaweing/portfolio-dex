---
title: "The art of forking"
date: "2026-03-21T20:33:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Every few months, a new fork drama explodes across tech Twitter. Someone takes an open source project, builds something new on top of it, and the original creators lose their minds. The community picks sides. Hot takes fly. And then everyone moves on, until it happens again.
But here's the thing: forking is one of the most fundamental rights in open source software. It's baked into every MIT, Apache, and GPL license ever written. So why does it keep making people so angry?
## Forking is everywhere right now
If you look around the developer ecosystem in early 2026, forks are driving some of the most important products in tech.
### The AI IDE wave
The most popular AI-powered code editors are all forks of the same project: Visual Studio Code. Microsoft released VS Code under the MIT license, and that single decision seeded an entire category of products.
Cursor forked VS Code and layered on deep AI integration, including context-aware completions, an agentic coding mode, and inline code generation. Windsurf (formerly Codeium) did the same, taking the VS Code foundation and building a different philosophy around AI-assisted development, one that emphasizes flow and automatic context management. Google's Antigravity joined the party too, forking VS Code and adding planning artifacts and process transparency for AI workflows.
Each of these products took the same open source codebase and built something genuinely different. They compete fiercely with each other, yet none of them would exist without Microsoft's decision to make VS Code open source. Microsoft hasn't complained. If anything, VS Code's dominance as a platform has only grown because of its forks.
### The AI browser race
The same pattern is playing out with web browsers. Chromium, Google's open source browser engine, has become the foundation for a wave of AI-native browsers. Perplexity built Comet, a browser that treats search and AI as first-class features of the browsing experience. The Dia browser, ChatGPT's Atlas, and others have all taken Chromium and reimagined what a browser can be when AI is baked into the core rather than bolted on as a sidebar.
Just like with VS Code, Google hasn't gone to war over these forks. Chrome still dominates with roughly 65-70% market share globally. The forks aren't stealing the market, they're expanding it.
### Cursor and Kimi K2.5, a fork done right
One of the more interesting recent examples is Cursor's use of Moonshot AI's open source Kimi K2.5 model. When Cursor launched Composer 2, it revealed that Kimi K2.5 provided the foundation. Cursor took the open source model, applied continued pretraining and reinforcement learning, and built something that competes with the best proprietary coding models available.
Moonshot AI's response? They congratulated Cursor publicly. "Seeing our model integrated effectively through Cursor's continued pretraining and high-compute RL training is the open model ecosystem we love to support," they wrote. This is what forking looks like when both sides understand the game.
## When forking gets ugly
Not every fork story ends with congratulations. The Cloudflare and Vercel saga of early 2026 is a masterclass in how forking can go sideways, not legally, but socially.
### The vinext incident
In late February 2026, Cloudflare published a blog post titled "How we rebuilt Next.js with AI in one week." The project, called vinext, reimplemented the Next.js App Router API on top of Vite, targeting Cloudflare Workers as the deployment platform. They claimed one engineer and about \$1,100 in AI tokens were all it took.
Vercel, the company that builds and maintains Next.js, was not thrilled. The framing felt like a direct attack on their core product. Making things worse, vinext shipped with security vulnerabilities that were quickly discovered by researchers. Vercel CEO Guillermo Rauch accused Cloudflare of a pattern of "forking the entire developer ecosystem."
### The just-bash fork
The tensions escalated again in March 2026 when Cloudflare engineer Sunil Pai forked just-bash, an Apache 2.0 licensed bash emulator created by Vercel CTO Malte Ubl. The project was designed for safely running AI-generated shell commands.
Malte called out the fork publicly, arguing that the reasons Cloudflare gave for needing a separate version appeared to be hallucinated by an LLM. He coined the term "slop-fork," a fork that exists not because of genuine technical disagreement but because an AI suggested it should.
The two eventually talked it out. Sunil apologized for not reaching out first. Malte apologized for the public callout. But the damage to the broader relationship between the companies was visible, and the community was left debating where the line is between legitimate forking and corporate strip-mining.
## Why legal forks still feel wrong
The tension in all of these stories comes from a gap between what's *legal* and what feels *right*. Open source licenses are explicit: if the code is MIT or Apache licensed, you can fork it, rename it, commercialize it, and never contribute back. That's the deal.
But open source communities run on norms, not just licenses. And those norms include things like:
- **Reaching out first.** If you're going to fork a project maintained by a specific person or company, a heads-up goes a long way. Sunil and Malte's reconciliation basically came down to this: just talk to each other.
- **Giving credit.** Changing the name and stripping attribution, even when the license technically allows it, erodes trust. A Reddit user captured this frustration perfectly: "Someone forked my MIT project, wiped the commit history to hide my authorship, and is claiming it as their own work."
- **Having a genuine reason.** The community respects forks that exist because of real technical or philosophical differences. MariaDB forked MySQL over governance concerns. LibreOffice forked OpenOffice over development speed. These forks had clear, defensible motivations. A "slop-fork" that exists because an LLM suggested it, not so much.
- **Not weaponizing forks.** When a large company forks a smaller company's core product, the power dynamics matter, even if the license says they're equal. AWS forking Elasticsearch into OpenSearch in 2021 was perfectly legal, but it reshaped the entire competitive landscape overnight.
## The deeper pattern
What's really happening is a shift in how forking works. Historically, forks were rare and expensive. They required recruiting maintainers, building community, and years of sustained effort. Most forks failed.
That's changing fast. AI dramatically lowers the cost of creating a fork. Cloudflare rebuilt a major framework API in a week. The Linux Foundation assembled Valkey, a Redis fork, in eight days. When forking is cheap, it happens more often, and the social norms around it haven't caught up to the new reality.
This creates an interesting paradox. The easier forking becomes, the more important the *social* aspects of open source get. When anyone can fork anything in a weekend, the things that differentiate a project are no longer just the code. They're the community, the trust, the brand, and the relationships between maintainers and users.
## What this means for developers
If you're building on or contributing to open source in 2026, a few things are worth keeping in mind.
**Forks are a feature, not a bug.** The ability to fork is what makes open source resilient. It's the ultimate check on power. If a project's leadership goes sideways, the community can always walk away with the code. That's incredibly valuable.
**Choose your license intentionally.** If you release code under MIT, accept that someone might build a billion-dollar company on it without giving you a dime. If that bothers you, consider copyleft licenses like GPL or AGPL, which require derivative works to remain open source. There's no wrong answer, but there is an uninformed one.
**The best forks add genuine value.** Cursor didn't just copy VS Code. It reimagined the development experience around AI. That's the kind of fork that enriches the ecosystem. A rename-and-redeploy adds nothing.
**Communication beats litigation.** Almost every forking drama could have been avoided or at least softened by a conversation before the public announcement. Open source is a community of people, not just a collection of licenses.
The art of forking isn't really about code at all. It's about understanding that open source is a social contract as much as a legal one, and the best participants in the ecosystem honor both.
## References
1. [What a Difference a VS Code Fork Makes: Antigravity, Cursor and Windsurf Compared](https://visualstudiomagazine.com/articles/2026/01/26/what-a-difference-a-vs-code-fork-makes-antigravity-cursor-and-windsurf-compared.aspx), Visual Studio Magazine, January 2026
2. [Windsurf vs Cursor: which is the better AI code editor?](https://www.builder.io/blog/windsurf-vs-cursor), [Builder.io](http://Builder.io)
3. [The 5 best AI browsers in 2026](https://zapier.com/blog/best-ai-browser/), Zapier
4. [How we rebuilt Next.js with AI in one week](https://blog.cloudflare.com/vinext/), Cloudflare Blog
5. [Cloudflare's AI-built Next.js replacement hit by security flaws](https://cybernews.com/security/hackers-find-critical-flaws-in-cloudflares-nextjs-alternative/), Cybernews, March 2026
6. [Why Open Source Forking Is a Hot-Button Issue](https://thenewstack.io/why-open-source-forking-is-a-hot-button-issue/), The New Stack
7. [Open Source Forks Explained: Innovation, Drama, and Preservation in OSS](https://www.herodevs.com/abcs-of-oss/f-is-for-the-breakups-drama-and-innovation-of-open-source), HeroDevs
8. [Kimi K2.5 is live on AI Gateway](https://vercel.com/changelog/kimi-k2-5-on-ai-gateway), Vercel Changelog, January 2026
