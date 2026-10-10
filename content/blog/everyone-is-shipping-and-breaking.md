---
title: "Everyone is shipping and breaking"
date: "2026-04-21T14:57:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Anthropic","Claude","OpenAI","Notion","Vibe Coding","Coding","Testing","Safety","Agents"]
---

Something strange is happening in tech right now. Every tool I use, every platform I depend on, ships updates at a pace that would have been unthinkable a few years ago. And almost all of them are breaking things in the process.
I saw a chart floating around on X recently showing how many releases various AI companies had pushed in just a two-week window. Anthropic was at the top. And that tracks, because they shipped 74 product releases in 52 days earlier this year. Fourteen of those came in March alone, alongside five outages. They were, quite literally, releasing faster than they could stabilize.
This isn't just an Anthropic thing. It's everywhere.
## The new normal is daily releases
AI has fundamentally changed the speed at which software gets built. Ninety-two percent of US developers now use AI coding tools daily. Forty-one percent of all code being written globally is AI-generated. The vibe coding market, which barely existed in 2023, hit an estimated \$4.7 billion in 2026.
Ramp shipped 270 features in the first half of 2025, more than all of 2024 combined. They moved roughly three times faster across the organization after getting 99.5% of employees onto regular AI use. Their internal coding agent, Inspect, now writes over half of all merged pull requests.
Anthropic's own engineers reportedly use Claude for about 60% of their work, which means every release makes the next one faster to build. It's a compounding loop. Ship, learn, ship again. The gap between companies that embrace this and those that don't grows every single day.
OpenAI pushes ChatGPT updates constantly. Notion ships feature after feature. Claude Code has had over 170 updates since launch. The changelogs are so long that by the time you finish reading one, there's already a new version.
## Faster at creating problems
Here's the thing nobody in the hype cycle wants to talk about: we're not just faster at building. We're faster at breaking.
A study by Uplevel tracked around 800 developers after Copilot adoption. The result? No significant improvement in pull request cycle time. But a 41% increase in bugs. Faros AI saw something similar across 10,000 developers: individual output went up 21%, PRs increased 98%, but review times ballooned 91% and PR sizes inflated 154%. At the company level, any correlation between AI adoption and actual performance metrics vanished.
DX's research across 43,000 engineers at roughly 100 companies paints a volatile picture. Quality outcomes range from big gains to serious declines. The common thread? AI accelerates whatever engineering culture you already have. If your practices are solid, AI makes them better. If they're shaky, AI makes them worse, faster.
This matches what I see as a user. Something that works today might genuinely not work tomorrow, because there's a new update shipping before the last one was properly tested. Notion Calendar gets an update practically every day. Claude has outages that coincide with massive feature drops. Even OpenAI has had to pause features and focus on backend stability.
## Vibe coding and the testing gap
The term "vibe coding" has gone mainstream. It describes the practice of describing what you want in plain language and letting AI generate the code. It's powerful for prototyping. It's transformative for non-technical builders. And it's producing a mountain of code that nobody fully understands.
A controlled study of 16 experienced open-source developers found that experienced developers were actually 19% slower when using AI tools on mature codebases. The kicker? The developers themselves predicted they'd be 20% faster, and still believed they had been faster even after the study ended. There's a perception gap between how productive AI makes us feel and how productive it actually makes us.
When companies are vibe coding their way to production, the testing gap becomes enormous. You can generate code in minutes that would have taken days. But the review, testing, and stabilization process hasn't sped up at the same rate. The bottleneck has shifted from writing code to understanding code, and that's a much harder problem to solve with AI.
## The trust cost of moving fast
Facebook's old motto was "move fast and break things." In 2026, Forbes published a piece arguing it's time to retire that philosophy entirely. Their point was sharp: what we break isn't just code or processes. We break trust. We break reliability. We break the confidence users have that the tool they depend on will actually work when they need it.
There's a Reddit thread titled "Notion's constant updates are so annoying" that captures the user side of this perfectly. Another one says "Anthropic: Stop shipping. Seriously." Users are paying hundreds of dollars for tools that feel less reliable with each update. Anthropic's status page showed 98.73% uptime, a single nine, which is genuinely unacceptable for production tooling.
The irony is that the companies shipping fastest are the ones building the tools that enable everyone else to ship fast. It's turtles all the way down. Anthropic ships Claude updates that break Claude Code, which developers use to ship their own updates that break their own products.
## What actually needs to change
I don't think the answer is to slow down. The companies that pause to perfect everything are getting outcompeted by the ones that iterate in public. That's the reality of the market right now.
But there's a meaningful difference between shipping fast with guardrails and shipping fast without looking. The companies getting the best results from AI aren't just adopting tools. They're investing in engineering culture, code review processes, automated testing, and the kind of infrastructure that catches problems before users do.
Notion itself published a detailed post about how they built CI guardrails to catch breaking schema changes automatically. That's the right instinct. You don't fight speed with slowness. You fight speed with better systems.
The pattern I keep seeing is this: the first wave of AI adoption makes everything faster. The second wave, which we're entering now, has to make everything faster and more reliable. The companies that figure out that second part will win. The ones that just keep shipping and breaking will eventually lose the trust that made their products valuable in the first place.
We're in an awkward middle period where the tools to build have outpaced the tools to verify. AI can write code in seconds, but it can't yet reliably tell you whether that code will break something three services away. Until that gap closes, every update is a gamble, and users are the ones placing the bets.
## References
1. [The AI Company That Ships Faster Than You Can Read the Changelog](https://tao-hpu.medium.com/the-ai-company-that-ships-faster-than-you-can-read-the-changelog-5cb08b8cbaea), Tao An, Medium
2. [Anthropic's madcap March: 14+ launches, 5 outages, and an accidental Claude Mythos leak](https://thenewstack.io/anthropic-march-2026-roundup/), The New Stack
3. [AI's impact on quality: A volatile, uneven landscape](https://getdx.com/blog/ais-impact-on-quality-a-volatile-uneven-landscape/), DX
4. [The 10x AI Developer is a Myth](https://paddo.dev/blog/ai-developer-productivity-myth/), [Paddo.dev](http://Paddo.dev)
5. [State of Vibe Coding 2026: Market Size, Adoption & Trends](https://www.taskade.com/blog/state-of-vibe-coding), Taskade
6. [6 Moments in 2025/2026 When AI Coding Tools Made Things Catastrophically Worse](https://medium.com/@coders.stop/6-moments-in-2025-2026-when-ai-coding-tools-made-things-catastrophically-worse-0d4315a1fd37), Coders Stop, Medium
7. [Why It's Time To Stop Saying "Move Fast And Break Things"](https://www.forbes.com/sites/hillennevins/2026/03/26/why-its-time-to-stop-saying-move-fast-and-break-things/), Forbes
8. [How Ramp built a full context background coding agent on Modal](https://modal.com/blog/how-ramp-built-a-full-context-background-coding-agent-on-modal), Modal
9. [How Notion catches breaking schema changes before they reach production](https://www.notion.com/blog/how-notion-catches-breaking-schema-changes), Notion
10. [Vibe coding statistics 2026: Adoption, productivity, and security data](https://www.hostinger.com/blog/vibe-coding-statistics), Hostinger
11. [METR: Early 2025 AI Experienced OS Dev Study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), METR
