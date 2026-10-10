---
title: "Your dashboard is lying"
date: "2026-03-14"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Every engineering team I've worked with has had a moment like this: the CI dashboard is green, deployment frequency is trending up, sprint velocity looks healthy, and DORA metrics are in the "elite" band. Leadership is thrilled. Meanwhile, developers are burning out, onboarding takes months, and nobody can explain how the payment service actually works.
The dashboard says everything is fine. The dashboard is lying.
## The comfort of green
Dashboards are seductive because they turn messy, ambiguous work into clean numbers. A chart that goes up and to the right feels like proof that things are working. And when someone asks "how's engineering doing?", it's much easier to point at a graph than to say "it's complicated."
The problem isn't dashboards themselves. It's what we choose to put on them. We gravitate toward metrics that are easy to collect, easy to visualize, and easy to celebrate. Lines of code written. Pull requests merged. Deployment frequency. Test coverage percentage. These numbers are comforting because they're concrete. But concrete and meaningful are not the same thing.
## The vanity metrics trap
A vanity metric is any number that looks impressive but doesn't connect to the outcome you actually care about. In engineering, vanity metrics are everywhere:
- **Lines of code** reward verbosity over clarity. The best refactor often *removes* code.
- **PR count** incentivizes splitting work into trivially small changes, not shipping meaningful features.
- **Deployment frequency** can skyrocket while user-facing value stays flat, especially if teams are deploying config tweaks and copy changes.
- **Test coverage percentage** tells you how much code is covered, not whether the tests are any good. A codebase with 95% coverage can still be riddled with bugs if the tests don't assert the right things.
The defining characteristic of a vanity metric is that it's gameable. Once a metric becomes a target, people optimize for the metric rather than the thing the metric was supposed to represent. This isn't malice. It's human nature. When your performance review mentions PR throughput, you will, consciously or not, start making more PRs.
## DORA was a step forward, and now it's the new ceiling
DORA metrics (deployment frequency, lead time for changes, change failure rate, and failed deployment recovery time) were a genuine improvement. They shifted the conversation from outputs to delivery performance, and the research behind them showed real correlations with organizational outcomes.
But something has happened over the past few years. DORA metrics went from being a diagnostic tool to being the dashboard itself. Teams optimize for elite DORA numbers the same way they once optimized for velocity, treating the scorecard as the goal rather than a signal.
DORA metrics are also lagging indicators. They tell you what happened, not why. A low deployment frequency might mean your CI pipeline is slow, your code review process is bottlenecked, your team is understaffed, or your architecture makes changes risky. The metric alone doesn't tell you which one. And critically, DORA metrics were designed to measure software *delivery* performance, not developer *productivity* or *experience*. Using them as a proxy for how your team is doing is like judging a restaurant solely on how fast the food comes out.
## What actually matters is hard to measure
The things that make engineering teams effective are stubbornly resistant to quantification:
- **Time to understanding**: how long does it take a developer to understand a new area of the codebase well enough to make a confident change? This is invisible to every dashboard.
- **Recovery from confusion**: when someone gets stuck, how quickly can they get unstuck? Do they have the documentation, the tooling, and the colleagues to unblock themselves?
- **Cognitive load**: how many tabs, services, config files, and mental models does a developer need to hold in their head to do their job? There's no metric for "how overwhelmed does this codebase make people feel."
- **Onboarding velocity**: can a new engineer ship a meaningful change in their first week? Not a typo fix or a README update, but something that touches real logic and goes to production. This is one of the best proxies for developer experience, and almost nobody tracks it.
These things are hard to measure because they're qualitative, contextual, and deeply personal. But the fact that they're hard to measure doesn't make them less important. It makes them more important, because nobody is gaming them.
## The AI coding paradox
AI coding tools make this problem worse in an interesting way. Tools like code assistants and autonomous agents are very good at boosting the metrics we already track. More PRs get opened. More code gets written. More tests get generated. The dashboard looks better than ever.
But the harder-to-measure qualities can quietly degrade. AI-generated code tends to be verbose and pattern-matched rather than architecturally coherent. It can introduce subtle inconsistencies that accumulate over time. Developers report spending less time writing code and more time reviewing AI output, which means the bottleneck shifts but doesn't disappear.
The risk is that organizations see the dashboard improve and declare victory, while the actual codebase becomes harder to navigate, understand, and maintain. You can't see "architectural coherence" on a chart. You feel it when a senior engineer quits and nobody can figure out how the system they built actually works.
## Measure what users care about
The way out isn't a better framework or a more sophisticated dashboard. It's accepting that measurement has limits, and that some of the most important things about how a team works can only be understood through conversation, observation, and judgment.
That said, if you want to get closer to what matters, here are a few starting points:
- **Ask your developers directly.** Surveys are imperfect, but a quarterly developer experience survey that asks "what slows you down?" will tell you more than any DORA dashboard.
- **Track onboarding time.** Measure how long it takes new engineers to ship their first meaningful change. If that number is going up, something is wrong, regardless of what deployment frequency says.
- **Watch for the review bottleneck.** If PRs sit in review for days, your throughput metric is hiding a dysfunction. Fast merges with shallow reviews are worse than slow merges with thoughtful ones.
- **Pay attention to attrition patterns.** When strong engineers leave, exit interviews often reveal problems that no metric captured.
The builder mindset isn't about shipping fast. It's about shipping things that matter. And the only way to know if you're doing that is to look beyond the dashboard, at what your users experience, what your developers feel, and what your codebase actually looks like when someone new opens it for the first time.
Your dashboard might be green. That doesn't mean everything is fine.
## References
1. DORA Team, "DORA's software delivery performance metrics," [dora.dev/guides/dora-metrics](http://dora.dev/guides/dora-metrics)
2. OpsLevel, "Why DORA Metrics Aren't Enough for Engineering Teams," [opslevel.com/resources/why-dora-metrics-arent-enough-for-engineering-teams](http://opslevel.com/resources/why-dora-metrics-arent-enough-for-engineering-teams)
3. Workweave, "The Problem with Using DORA Metrics to Measure Your Engineering Productivity," [workweave.dev/blog/problem-with-dora](http://workweave.dev/blog/problem-with-dora)
4. TechEmpower, "AI Coding Tools Metrics," [techempower.com/blog/2025/12/01/ai-coding-tools-metrics](http://techempower.com/blog/2025/12/01/ai-coding-tools-metrics)
5. Swarmia, "Measuring the productivity impact of AI coding tools," [swarmia.com/blog/productivity-impact-of-ai-coding-tools](http://swarmia.com/blog/productivity-impact-of-ai-coding-tools)
6. Jellyfish, "Vanity Metrics in Engineering," [jellyfish.co/blog/vanity-metrics](http://jellyfish.co/blog/vanity-metrics)
7. Thoughtworks, "In the age of AI coding, code quality still matters," [thoughtworks.com/insights/blog/generative-ai/in-the-age-of-AI-coding-code-quality-still-matters](http://thoughtworks.com/insights/blog/generative-ai/in-the-age-of-AI-coding-code-quality-still-matters)
8. Harvard Business Review, "AI Tools Make Coders More Important, Not Less," [hbr.org/2025/12/ai-tools-make-coders-more-important-not-less](http://hbr.org/2025/12/ai-tools-make-coders-more-important-not-less)
