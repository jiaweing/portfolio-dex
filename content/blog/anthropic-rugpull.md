---
title: "Anthropic rugpull"
date: "2026-03-31"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
pinned: true
---

If you've been using Claude over the past few weeks, you've probably noticed something feels off. Sessions burning through limits in minutes. Overloaded errors during peak hours. A Pro plan that empties itself after two prompts. And the worst part? Anthropic didn't say a word about it until the community forced their hand.
This isn't just a capacity problem. It's a transparency problem.
## What actually happened
In late February 2026, users started reporting that Claude Code was chewing through token allotments at an alarming rate. A prompt caching bug in version 2.1.1 meant that follow-up messages weren't being cached properly, so every interaction was billed as if it were brand new context. Anthropic eventually acknowledged the issue and reset affected limits, but the damage to trust was already done.
Then, on March 13, Anthropic rolled out what they called a "usage promotion," doubling limits for Free, Pro, Max, and Team plans during off-peak hours (outside 8 AM to 2 PM ET on weekdays). Sounds generous, right? The promotion ran through March 28. But something strange happened when the weekend boost expired around March 23: users noticed their baseline limits felt dramatically worse, not back to normal, but down to what felt like 0.25x to 0.5x of what they were used to.
I kept noticing my Pro plan running out after just a couple of prompts. I couldn't figure out why, and I wasn't alone. Reddit threads filled up with people reporting the same experience. One user on r/ClaudeCode ran token diagnostics and found a single Opus 4.6 session had consumed 652,069 output tokens, an estimated \$342.74 worth, with almost no user input.
For days, Anthropic said nothing. The community was left guessing whether this was a bug, an intentional change, or both.
## The silent announcement
On March 26, after Forbes, MacRumors, and TechRadar had all picked up the story, Anthropic's Thariq Shihipar finally posted a statement on X:
*"To manage growing demand for Claude we're adjusting our 5 hour session limits for free/Pro/Max subs during peak hours. Your weekly limits remain unchanged. During weekdays between 5am to 11am PT / 1pm to 7pm GMT, you'll move through your 5-hour session limits faster than before."*
Let that sink in. "Move through your 5-hour session limits faster" is a euphemism for "we're giving you less." During peak hours, your session limits could drain in under five minutes of actual usage. And this wasn't framed as a temporary measure or a regrettable necessity. It was just quietly implemented and only confirmed after the backlash became impossible to ignore.
The timing is suspicious too. The "double usage promotion" that ran March 13 through 28 now looks less like a gift and more like a smokescreen. If you're about to cut baseline limits during peak hours, offering a temporary off-peak boost is a convenient way to soften the blow, or at least delay the outrage.
## The third-party lockout
This isn't happening in isolation. Earlier in 2026, Anthropic updated their terms of service to explicitly ban the use of OAuth tokens from consumer plans (Free, Pro, Max) in any third-party tool or service. This means popular open-source coding agents that had been routing through Claude subscriptions were cut off overnight.
The official justification makes some sense: Anthropic doesn't want third-party harnesses making unoptimized API calls on flat-rate subscription plans. They want developers building products to use API keys through the Claude Console. Fair enough. But when you combine this with the rate limit squeeze, the picture that emerges is less about optimization and more about control.
You can't use Claude through other tools. And you can barely use it through Anthropic's own tools during the hours when you actually need it.
## The real problem is silence
Look, I get it. Scaling AI infrastructure is genuinely hard. Demand for Claude has been surging, and GPU capacity isn't infinite. Rate limits exist for a reason. If Anthropic had come out and said, "We're experiencing unprecedented demand, here's what we're doing about it, and here's how it affects your plan," most people would have understood.
But that's not what happened. What happened was:
1. A caching bug silently inflated token usage for weeks before being acknowledged
2. Peak-hour limits were reduced without any announcement
3. A "promotion" was used to mask the reduction in baseline service
4. An official statement only came after media coverage made silence untenable
This pattern of implementing changes silently and only communicating when forced to is what turns a capacity problem into a trust problem. Paying customers, especially those on the \$100/month and \$200/month Max plans, deserve to know what they're getting before they discover it the hard way.
## The competition is circling
I've been trying OpenAI's Codex here and there. The free plan is genuinely useful for lighter tasks, and the cloud-based execution model means you can fire off a task and come back to the result later. The model isn't as good as Claude for the really hard stuff, I've thrown complex tasks at it and it just doesn't keep up the way Opus does. But at least it works when I need it to.
That's the thing about reliability. It's not just about peak performance. It's about being able to sit down, start working, and trust that your tool won't tap out after two prompts. Right now, Claude is the better model wrapped in a worse experience.
And Anthropic should be worried about that. Developer loyalty is earned through consistency, not just capability. Every time someone hits a rate limit wall and switches to Codex or Gemini to finish their work, Anthropic loses a little more of the goodwill that made Claude the default choice in the first place.
## What needs to change
This isn't a call to boycott Claude. I still think it's the strongest coding model available, and when it works, nothing else comes close. But Anthropic needs to fix three things:
1. **Communicate changes before they happen.** If you're adjusting rate limits, tell people first. Not after Reddit figures it out. Not after journalists start calling. Before.
2. **Be honest about what plans include.** "You'll move through your limits faster" is weasel language. Tell users exactly what their token budget is per session window, in numbers, so they can plan accordingly.
3. **Invest in capacity to match the product.** If you're going to ship features like extended thinking, voice mode, and expanded context windows that all consume more tokens, you need the infrastructure to support them at the service levels you're selling.
The AI race is heating up. OpenAI, Google, and a dozen startups are all competing for developer mindshare. Anthropic's edge has always been that Claude felt like the thoughtful choice, the model built by people who cared about getting things right. Silently degrading service and hoping nobody notices is the opposite of that ethos.
Do better.
## References
1. [Claude March 2026 usage promotion](https://support.claude.com/en/articles/14063676-claude-march-2026-usage-promotion), Claude Help Center
2. [Claude Suddenly Eating Up Your Usage? Here Is What I Found](https://www.reddit.com/r/ClaudeCode/comments/1s2kdl9/claude_suddenly_eating_up_your_usage_here_is_what/), r/ClaudeCode
3. [Claude Code Limits Were Silently Reduced and It's MUCH Worse](https://www.reddit.com/r/ClaudeCode/comments/1s2lye7/claude_code_limits_were_silently_reduced_and_its/), r/ClaudeCode
4. [Usage limit bug is measurable, widespread, and Anthropic's silence is unacceptable](https://www.reddit.com/r/ClaudeCode/comments/1s27ugk/usage_limit_bug_is_measurable_widespread_and/), r/ClaudeCode
5. [Anthropic: Huge Pricing Issues With Glitching Claude Code Limits?](https://www.forbes.com/sites/johnkoetsier/2026/03/26/anthropic-huge-pricing-issues-with-glitching-claude-code-limits/), Forbes
6. [Claude Code Users Report Rapid Rate Limit Drain, Suspect Bug](https://www.macrumors.com/2026/03/26/claude-code-users-rapid-rate-limit-drain-bug/), MacRumors
7. [Claude is limiting usage more aggressively during peak hours, here's what changed](https://www.techradar.com/ai-platforms-assistants/claude/claude-is-limiting-usage-more-aggressively-during-peak-hours-heres-what-changed), TechRadar
8. [Legal and compliance](https://code.claude.com/docs/en/legal-and-compliance), Claude Code Docs
9. [Anthropic cracks down on unauthorized Claude usage by third-party harnesses and rivals](https://venturebeat.com/technology/anthropic-cracks-down-on-unauthorized-claude-usage-by-third-party-harnesses), VentureBeat
10. [Excessive token usage in Claude Code 2.1.1](https://github.com/anthropics/claude-code/issues/16856), GitHub
11. [Claude Code in March 2026: The Economics of the Quota](https://medium.com/@william.couturier/claude-code-in-march-2026-the-economics-of-the-quota-792449b63edb), Medium
