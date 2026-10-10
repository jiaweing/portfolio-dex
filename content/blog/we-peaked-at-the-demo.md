---
title: "We peaked at the demo"
date: "2026-04-21"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: ["Agents","LLMs","Startups","Fundraising","VCs","Hype","Economics"]
---

The most impressive version of every AI product is the demo. Launch day. The keynote clip. The founder on stage, narrating a flawless walkthrough while the audience holds its breath. Everything after that moment is a slow, quiet reckoning with edge cases, latency, cost, and reality.
We have built an entire industry optimized for first impressions.
## The gap between "wow" and "works"
According to Deloitte's 2026 State of AI in the Enterprise report, 75% of companies plan to invest in agentic AI. Only 11% have agents running in production. That is not a rounding error. That is a chasm, and billions of dollars are disappearing into it.
Gartner puts a finer point on it: over 40% of agentic AI projects will be canceled by the end of 2027, due to escalating costs, unclear business value, or inadequate risk controls. As Gartner analyst Anushree Verma noted, "Most agentic AI projects right now are early stage experiments or proof of concepts that are mostly driven by hype and are often misapplied."
The pattern is consistent. Incredible demo. Public launch. Complaints about reliability. Quiet downgrade of claims. Then, the next demo.
## Why demos lie (without technically lying)
Large language models are probabilistic. They do not execute instructions the way traditional software does. They sample from distributions, which means the same prompt can produce different outputs every time. Demos exploit this by cherry-picking the best runs.
A prompt that handles ten hand-tested inputs perfectly may fail on 8% of real user inputs in ways nobody anticipated. One AI engineer, reflecting on a year of building production LLM systems, described seeing teams with 95%+ accuracy on evaluation datasets get hit with 30-40% failure rates once real users showed up. The test cases were too narrow. Real users ask questions your QA team never imagined.
This is the fundamental asymmetry: demos show the best case. Production reveals the full distribution. And the full distribution is always uglier than the highlight reel.
## Demo-driven development
The problem runs deeper than misleading presentations. It has become a development philosophy. Product teams optimize for the keynote moment, not the daily use case.
This creates a cycle. The demo sets expectations. Leadership gets excited. Resources flow toward features that look good on stage rather than infrastructure that works reliably at scale. When the product inevitably disappoints in production, the response is not to fix the foundation. It is to build the next demo.
The term "demo-driven development" predates AI, but AI has supercharged it. When your product is built on a system that can generate impressive outputs on demand but cannot guarantee consistency, the temptation to optimize for the showcase becomes almost irresistible.
## The startup version
In startups, this pattern has its own lifecycle. Raise on a demo. Struggle to ship the product. Discover that the gap between prototype and production is wider than anyone budgeted for. Run low on runway. Raise again on the next demo. Repeat until acqui-hire.
The numbers tell the story. In 2025, AI startups pulled in over \$200 billion in venture capital, with mega-rounds of \$100 million or more accounting for 79% of all AI funding. The money is flowing to fewer, larger bets, and the pressure to justify those bets with impressive demonstrations is enormous. CB Insights data shows that investment is increasingly top-heavy: investors are funneling capital into fewer companies while deal activity dips.
But capital raised is not value created. The most well-funded demo is still just a demo until it survives contact with real users, real data, and real edge cases.
## Agentwashing
The demo is also the primary vehicle for a newer phenomenon: agentwashing. This is when companies call an AI tool "agentic" when it is really just conventional automation with a chatbot bolted on, or when they overstate the degree of autonomy, reliability, or business impact of their AI agents.
The SEC has already started scrutinizing AI-washing in public company disclosures. Debevoise noted that the imprecise use of terms like "agentic" may mislead clients, regulators, or investors about the capabilities of underlying systems. Meanwhile, IDC's Heather Hershey observed that many "agentic AI" products she reviewed in the past year were, upon investigation, just LLM wrappers on conventional machine learning with no actual agent in the "agentic AI."
The demo makes this possible. A two-minute video of an AI agent flawlessly executing a complex workflow tells you nothing about what happens on the 500th execution, or the 5,000th, when the inputs are messy and the context is ambiguous.
## What demo-last would look like
What if we built AI products demo-last? Ship boring reliability first, then show the impressive stuff.
This would mean starting with the unglamorous work: clean data pipelines, clear ownership of what the AI is actually deciding, fallback mechanisms for when things go sideways, and honest evaluation against the full distribution of real-world inputs, not just the curated set that makes the model look good.
It would mean measuring success by production metrics, not applause. Uptime, not wow factor. Consistency, not peak performance. The companies that end up in Gartner's surviving 60% will not be the ones that moved fastest. They will be the ones that moved with discipline.
Some products do deliver on their demos. That is worth acknowledging. The point is not that all AI is vaporware. The point is that the ratio is off. We have created an ecosystem where the incentive to demo dramatically outweighs the incentive to deploy reliably, and that imbalance is burning through capital, trust, and credibility at an unsustainable rate.
## The reckoning is the product
Every technology goes through a version of this cycle. The internet had its dot-com demos. Crypto had its white papers. AI has its keynote clips.
But the correction always comes. Not because the technology is fake, but because the gap between what is shown and what is shipped eventually becomes too expensive to ignore. The most interesting AI companies of the next few years will not be the ones with the best demos. They will be the ones that figured out how to make the boring middle, the part between the demo and the daily use case, actually work.
The demo is the promise. Production is the proof. And right now, we have a lot more of one than the other.
## References
1. Deloitte, "The State of AI in the Enterprise, 2026" ([deloitte.com](http://deloitte.com))
2. Gartner, "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027," June 2025 ([gartner.com](http://gartner.com))
3. Kaushik Rajan, "Only 11% of AI Agents Make It to Production," Data Science Collective, February 2026 ([medium.com](http://medium.com))
4. CB Insights, "State of AI 2025 Report" ([cbinsights.com](http://cbinsights.com))
5. Debevoise & Plimpton, "Agent Washing: Disclosure Risks in the Emerging Market for AI Agents," March 2026 ([debevoisedatablog.com](http://debevoisedatablog.com))
6. PROS, "Agent-Washing: How to Spot Hype and Separate Buzzwords from Real Agentic AI" ([pros.com](http://pros.com))
7. Thoughtworks, "The Dangers of AI Agentwashing" ([thoughtworks.com](http://thoughtworks.com))
8. Sumit Bhattacharyya, "The Last Mile of LLMs: Why Most AI Applications Fail After the Demo," December 2025 ([medium.com](http://medium.com))
9. Hypersense Software, "Why 88% of AI Agents Never Make It to Production," January 2026 ([hypersense-software.com](http://hypersense-software.com))
