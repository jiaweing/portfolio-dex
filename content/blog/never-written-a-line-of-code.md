---
title: "Never written a line of code"
date: "2026-04-08T13:26:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Somewhere in the last year, "I've never written a line of code" stopped being an admission and started being a flex. You see it on LinkedIn, in podcast intros, on startup pitch decks. Founders wear it like a badge. CEOs cite it as proof their company is ahead of the curve. Spotify's CEO proudly announced that some of their best developers haven't written a single line of code since December 2025, framing it as a triumph of AI adoption. Former Google CEO Eric Schmidt declared that the best programmers no longer write code, they write specs and let AI work overnight.
And I keep thinking: when did not doing the core thing become the achievement?
## The scalpel problem
Saying "I've never written a line of code" and expecting applause is like a doctor bragging about never touching a scalpel. Sure, maybe you can describe the incision you want. Maybe you can point at the right spot on the body. But if something goes wrong on the table, you have no idea what to do.
The scalpel isn't just a tool. It represents years of training, muscle memory, and understanding of what's underneath the surface. Knowing how to use it means you know anatomy, you know risks, you know what happens when you cut too deep or in the wrong place. The tool is inseparable from the knowledge required to use it responsibly.
Code works the same way. Writing code isn't just typing syntax into an editor. It's understanding systems, data flow, security boundaries, failure modes, and trade-offs. When you've written code, you develop an intuition for how things break. You learn why certain architectures exist, why certain patterns persist, and why some shortcuts always cost you later.
When you skip all of that and go straight to prompting, you get output without understanding. And output without understanding is a liability.
## The CEO flex
There's a new genre of corporate announcement that goes something like this: "AI now handles X% of our work." Fortune reported on this trend, noting how CEOs from Salesforce, Google, and Microsoft have started citing AI productivity numbers as a flex, a signal to investors that the company is cutting costs and staying ahead. But when asked for details, spokespeople declined to explain how those numbers were calculated.
The flex isn't about capability. It's about optics. Saying your developers don't write code anymore sounds futuristic. It sounds efficient. It makes the stock price happy. But it papers over a real question: do the people shipping your product actually understand what they're shipping?
Spotify's framing is telling. They said their engineers "supervise" AI-generated code. But as some engineers have pointed out, reviewing enormous amounts of AI-generated code can actually be harder than writing it yourself. You need deep understanding to catch what the model gets wrong, especially the subtle mistakes that look correct on the surface but break under load or at the edges.
Supervision without comprehension isn't supervision. It's just watching.
## The founder version
The startup world has its own flavor of this. "Built my MVP without writing a single line of code" has become a common headline. Forbes reported that non-developers using vibe coding tools have contributed to wiping \$285 billion from SaaS valuations as businesses replace subscriptions with custom-built internal tools. Platforms like Replit, Lovable, and Bolt market directly to non-technical founders, promising production-ready apps from plain English prompts.
And some of those tools genuinely work for prototypes. But the gap between a prototype and a product is enormous, and it's filled with all the things you don't know you don't know: authentication edge cases, database migrations, rate limiting, error handling, data privacy compliance, payment security.
RedHunt Labs found thousands of secrets leaking through vibe-coded sites, including API keys, database connection strings, and payment credentials embedded in client-side code. A Databricks study confirmed that vibe-coded projects regularly produce critical vulnerabilities, even when the generated code appears to work. These aren't theoretical risks. They're things that happen when the person building the software doesn't understand what "client-side" means.
The flex of "I didn't write any code" starts to sound different when the follow-up is "and I don't know why my users' data leaked."
## What gets lost
The real issue isn't whether AI can generate code. It clearly can, and it's getting better at it. The issue is the cultural shift in how we talk about expertise.
When "I've never written a line of code" becomes a point of pride, it signals that the knowledge behind the craft doesn't matter. It reduces software engineering to an output, lines of code, and then celebrates eliminating that output. But the output was never the point. The understanding behind it was.
A chef who has never cooked a meal can still describe flavors. A pilot who has never flown can still read a manual. But we don't hand them the kitchen or the cockpit and call it innovation. We recognize that expertise requires doing the thing, not just describing the thing.
Code is the same. You can absolutely use AI to write it faster, to handle boilerplate, to prototype ideas you'd never have time to build from scratch. That's genuine progress. But using AI as a collaborator is fundamentally different from using it as a replacement for knowledge you never acquired.
## The dangerous middle ground
The most precarious position isn't the experienced developer using AI to move faster. It's the person who has never written code, built something with AI, and now believes they understand software. They have just enough confidence to ship and not enough knowledge to know what could go wrong.
This is where the scalpel analogy gets real. The danger isn't the tool. The danger is the confidence that comes from using the tool without understanding what it does. A scalpel in untrained hands doesn't just fail to heal. It causes harm.
The same is true for code that handles payments, stores personal data, or runs infrastructure. When it fails, real people are affected. And the person who built it without understanding it has no framework for diagnosing what went wrong, let alone fixing it.
## What this actually means
None of this is an argument against AI or against non-technical people building things. The tools are real. The opportunity is real. But the framing matters.
"I used AI to build something I couldn't have built alone" is honest and impressive. It acknowledges the tool while being transparent about the human's role.
"I've never written a line of code" as a flex is something else entirely. It's a celebration of absence, a pride in not knowing. And in a field where understanding what you're building is the difference between a product and a liability, that absence isn't a strength. It's a risk.
The flex shouldn't be that you've never written code. The flex should be that you understand what the code does, regardless of who or what wrote it.
## References
1. Gustav Söderström on Spotify developers not writing code, Business Insider (February 2026): [https://finance.yahoo.com/news/spotify-ceo-says-top-developers-103101995.html](https://finance.yahoo.com/news/spotify-ceo-says-top-developers-103101995.html)
2. Eric Schmidt on best programmers no longer writing code, Times of India (March 2026): [https://timesofindia.indiatimes.com/technology/tech-news/google-ex-ceo-eric-schmidt-best-programmers-dont-write-code-anymore-they-/articleshow/129871929.cms](https://timesofindia.indiatimes.com/technology/tech-news/google-ex-ceo-eric-schmidt-best-programmers-dont-write-code-anymore-they-/articleshow/129871929.cms)
3. "CEOs have a new AI flex," Fortune (July 2025): [https://fortune.com/2025/07/03/ceo-have-a-new-ai-flex/](https://fortune.com/2025/07/03/ceo-have-a-new-ai-flex/)
4. "How Non-Developers Wiped \$285 Billion From SaaS Valuations," Forbes (April 2026): [https://www.forbes.com/sites/jodiecook/2026/04/07/how-non-developers-wiped-285-billion-from-saas-valuations/](https://www.forbes.com/sites/jodiecook/2026/04/07/how-non-developers-wiped-285-billion-from-saas-valuations/)
5. RedHunt Labs, "Echoes of AI Exposure: Thousands of Secrets Leaking Through Vibe Coded Sites": [https://redhuntlabs.com/blog/echoes-of-ai-exposure-thousands-of-secrets-leaking-through-vibe-coded-sites-wave-15-project-resonance/](https://redhuntlabs.com/blog/echoes-of-ai-exposure-thousands-of-secrets-leaking-through-vibe-coded-sites-wave-15-project-resonance/)
6. Databricks, "Passing the Security Vibe Check: The Dangers of Vibe Coding": [https://www.databricks.com/blog/passing-security-vibe-check-dangers-vibe-coding](https://www.databricks.com/blog/passing-security-vibe-check-dangers-vibe-coding)
7. "Vibe Coding Is The Biggest Unlock For Non-Technical Founders Right Now," Forbes (March 2026): [https://www.forbes.com/sites/jodiecook/2026/03/10/vibe-coding-is-the-biggest-unlock-for-non-technical-founders-right-now/](https://www.forbes.com/sites/jodiecook/2026/03/10/vibe-coding-is-the-biggest-unlock-for-non-technical-founders-right-now/)
