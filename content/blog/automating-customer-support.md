---
title: "Automating customer support"
date: "2026-05-02T17:37:00.000+08:00"
lastEdited: "2026-05-02T10:48:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: ["Agents","LLMs","Hallucinations","Safety","Anthropic","Claude"]
---

Every time I have to interact with an automated customer support system, a small part of me dies. Not because the technology is bad in theory, but because most companies deploy it in the worst possible way, at the worst possible time, for the worst possible reasons.
From a customer's perspective, nothing is more infuriating than being trapped in a chatbot loop when you have a real problem. And the data backs this up: a 2026 Qualtrics report found that nearly one in five consumers who used AI for customer service saw zero benefit from the experience, a failure rate almost four times higher than for AI use in general.
The problem isn't automation itself. It's the way companies wield it.
## The simple stuff is fine
Let me be clear: I'm not anti-automation. If I need to check my order status, reset a password, or find a return policy, a well-built bot can handle that faster than a human. If the answer lives in an FAQ or a help doc, go ahead and let the machine serve it up. That's a genuine win for everyone.
The sweet spot for automation is what the industry calls "tier-1 queries," the straightforward, repetitive questions that have clear, unambiguous answers. Klarna's AI assistant reportedly handles 66% of customer inquiries this way, and when it works, resolution times drop from minutes to seconds.
No complaints there.
## Where it falls apart
The trouble starts the moment a situation gets even slightly complicated. Real customer problems aren't neat little decision trees. They involve overlapping business rules, edge cases, exceptions to exceptions, and context that requires actual judgment.
Think about it: you have a billing dispute that involves a promotional rate, a mid-cycle plan change, and a refund policy that was updated last month. No bot is navigating that cleanly. A 2026 survey found that 75% of customers feel chatbots struggle with complex issues, and 55% get frustrated when bots keep asking questions without resolving anything.
Air Canada learned this the hard way. Their chatbot told a grieving customer he could book a flight and apply for a bereavement fare refund within 90 days. That wasn't the airline's actual policy, the bot just made it up. The customer sued, and Air Canada tried arguing that the chatbot was a "separate legal entity" responsible for its own actions. The tribunal, unsurprisingly, called that nonsense and ruled against them.
When your AI is hallucinating company policies to grieving customers, you have a problem that no amount of prompt engineering will fix.
## Even humans get it wrong
Here's the thing that makes this even harder: customer support is genuinely difficult. Even trained human agents mess things up. They misread policies, give inconsistent answers, and sometimes just don't know the edge case you're asking about.
So if humans struggle with complexity, why would we expect a language model, which fundamentally works by predicting the next plausible token, to handle it better? The answer is that we wouldn't, not unless we've meticulously documented every single scenario, business rule, and exception.
And that brings us to the real insight.
## The SOP paradox
If your company has rock-solid standard operating procedures for every situation, if every edge case is documented, every policy is clear, every exception is catalogued, then yes, a bot can probably handle it. You've essentially turned customer support into a lookup problem, and machines are excellent at lookup problems.
But here's the paradox: most companies don't have that. Not even close. Their policies are scattered across wikis, Slack threads, and the heads of senior agents who've been there for years. The institutional knowledge that makes great support possible is precisely the kind of knowledge that's hardest to codify.
Klarna discovered this after going all-in on AI customer service. They replaced roughly 700 human agents, celebrated the cost savings, and then watched customer satisfaction tank. CEO Sebastian Siemiatkowski admitted publicly that cost had been "too predominant" an evaluation factor and that the company needed to reinvest in human support quality. By mid-2025, Klarna was rehiring human agents in a gig-style setup, essentially admitting the AI-only approach had failed.
## The outsourcing trap
Automation isn't the only way companies try to cut corners on support. Outsourcing to teams who have no context about your product, your internal systems, or your customer base is arguably just as bad.
When your support agent doesn't understand your codebase, your internal tooling, or the nuance of your business rules, they're essentially a human chatbot, reading from scripts they barely understand. The customer can tell immediately. You ask a specific question about a specific feature and get a generic response that could apply to any product.
Look at what's happening with Anthropic and GitHub right now. Anthropic, a company building some of the most sophisticated AI in the world, has users on Hacker News complaining that it's "impossible to get customer support" and that the support AI is "terrible." Users paying \$100 per month for Claude Code report that their only escalation path is posting on GitHub Issues and hoping someone notices. Meanwhile, GitHub itself is struggling with reliability, experiencing repeated outages as AI-driven workloads overwhelm their infrastructure, and their support hasn't kept pace with the scale of frustration.
These are deeply technical companies whose customers have deeply technical problems. Generic support, whether automated or outsourced, simply cannot handle the complexity.
## What actually works
The companies getting this right aren't choosing between humans and machines. They're building hybrid systems where each handles what it's good at.
Bots handle the simple, repetitive, well-documented stuff. Humans handle the complex, ambiguous, emotionally charged stuff. And critically, there's always a clear path from one to the other. The moment a customer's problem exceeds the bot's capability, the handoff to a human should be instant and seamless.
This means investing in three things most companies neglect:
1. **Comprehensive documentation of every business rule and edge case.** If you can't explain it clearly to a human, you definitely can't explain it to a bot.
2. **Support agents who actually understand the product.** Not script-readers, but people with genuine domain knowledge who can exercise judgment.
3. **Escalation paths that don't feel like punishment.** When a customer needs a human, they should get one without fighting through five layers of "Did you try turning it off and on again?"
The Qualtrics report put it bluntly: "Too many companies are deploying AI to cut costs, not solve problems, and customers can tell the difference."
## The real cost of bad support
Companies love measuring cost-per-ticket and average handle time. Those metrics are easy to optimize for. What's harder to measure, but far more important, is the customer who silently leaves after a terrible support experience and never comes back.
A Sprinklr-cited study found that when automation fails and human agents have to step in, performance slows by 17.7% because the agents have lost the foundational skills they need. Over-reliance on automation doesn't just hurt customers, it degrades the capability of your entire support operation.
The lesson from Klarna, Air Canada, and dozens of other companies isn't that automation is bad. It's that automation without understanding is dangerous. If you don't deeply understand what your customers need and what your support team actually does, automating it will just scale your dysfunction faster.
The best customer support I've ever experienced came from people who clearly knew the product inside out and had the authority to actually solve my problem. No script, no bot, no "let me transfer you." Just competence and empathy.
That's still the gold standard. And until AI can genuinely replicate both, the smartest thing a company can do is figure out which problems deserve a human and make sure those humans are damn good at their jobs.
## References
1. Qualtrics, "2026 Customer Experience Trends Report" [https://www.qualtrics.com/articles/customer-experience/global-consumer-experience-trends/](https://www.qualtrics.com/articles/customer-experience/global-consumer-experience-trends/)
2. Twig, "Disadvantages of AI in Customer Service: 7 Real Risks (2026)" [https://www.twig.so/blog/understanding-the-risks-of-putting-ai-in-customer-support](https://www.twig.so/blog/understanding-the-risks-of-putting-ai-in-customer-support)
3. Ars Technica, "Air Canada must honor refund policy invented by airline's chatbot" [https://arstechnica.com/tech-policy/2024/02/air-canada-must-honor-refund-policy-invented-by-airlines-chatbot/](https://arstechnica.com/tech-policy/2024/02/air-canada-must-honor-refund-policy-invented-by-airlines-chatbot/)
4. The Guardian, "Air Canada ordered to pay customer who was misled by airline's chatbot" [https://www.theguardian.com/world/2024/feb/16/air-canada-chatbot-lawsuit](https://www.theguardian.com/world/2024/feb/16/air-canada-chatbot-lawsuit)
5. Bloomberg, "Klarna Slows AI-Driven Job Cuts With Call for Real People" [https://www.bloomberg.com/news/articles/2025-05-08/klarna-turns-from-ai-to-real-person-customer-service](https://www.bloomberg.com/news/articles/2025-05-08/klarna-turns-from-ai-to-real-person-customer-service)
6. Forbes, "Why The Impact Of AI On Customer Support Isn't What Leaders Expected" [https://www.forbes.com/councils/forbestechcouncil/2026/04/02/why-the-impact-of-ai-on-customer-support-isnt-what-leaders-expected/](https://www.forbes.com/councils/forbestechcouncil/2026/04/02/why-the-impact-of-ai-on-customer-support-isnt-what-leaders-expected/)
7. Sprinklr, "Customer Service Challenges in the Age of AI" [https://www.sprinklr.com/blog/customer-service-challenges/](https://www.sprinklr.com/blog/customer-service-challenges/)
8. CNBC, "'I hate customer-service chatbots': The consumer-AI refund relationship is off to a rocky start" [https://www.cnbc.com/2026/04/01/ai-chatbot-customer-service-complaints-refunds.html](https://www.cnbc.com/2026/04/01/ai-chatbot-customer-service-complaints-refunds.html)
9. GitHub Blog, "An update on GitHub availability" [https://github.blog/news-insights/company-news/an-update-on-github-availability/](https://github.blog/news-insights/company-news/an-update-on-github-availability/)
10. The Pragmatic Engineer, "The Pulse: AI load breaks GitHub" [https://newsletter.pragmaticengineer.com/p/the-pulse-github-breaks](https://newsletter.pragmaticengineer.com/p/the-pulse-github-breaks)
