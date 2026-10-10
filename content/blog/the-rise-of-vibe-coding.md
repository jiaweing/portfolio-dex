---
title: "The rise of vibe coding"
date: "2026-02-08"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

> Knowing what to type into Google to find what you want was a skill. Today it is called prompting.
Everyone's talking about vibe coding. The promise is intoxicating: describe what you want in plain English, and AI writes the code for you. No syntax to memorize, no frameworks to learn, no debugging at 2 a.m. Andrej Karpathy coined the term in early 2025, describing a workflow where you "fully give in to the vibes, embrace exponentials, and forget that the code even exists."
A year later, adoption has exploded. According to the 2025 Stack Overflow Developer Survey, 51% of professional developers use AI tools daily. Some estimates put US developer adoption of AI coding tools at over 90% in 2026. But buried inside these numbers is a narrative that most people get wrong.
The popular story goes like this: vibe coding is for non-developers. It democratizes software. Anyone can build an app now.
That story is incomplete, and in some important ways, it's backwards.
## The misconception
Scroll through social media and you'll find a recurring pattern. Someone shares a slick, functional app and says, "I vibe coded this in a weekend." The implication is that the AI did the heavy lifting, and anyone could replicate it.
But look closer. The person behind the demo is almost always a seasoned developer. They understand system architecture, know how to decompose a problem into manageable pieces, and can spot when the AI generates something subtly broken. They're not blindly accepting AI output. They're steering it with years of hard-won intuition.
When non-developers try the same thing, the experience is often very different. One developer on Reddit described attempting to vibe code an iOS app in Swift, a language they weren't familiar with. The result? Hours of frustration, circular debugging, and an app that barely worked. The AI could generate code, but without the developer's ability to evaluate and course-correct, the project stalled.
## Why experienced developers benefit the most
The real superpower of vibe coding isn't that it removes the need for skill. It's that it *amplifies* existing skill.
**Experienced developers can evaluate AI output.** When an LLM generates a function, a skilled developer can glance at it and know whether the approach is sound. They catch edge cases the AI misses. They recognize when the generated architecture will create problems six months down the road. A non-developer doesn't have this filter, and that's where things break down.
**They know what to ask for.** Prompting an AI effectively requires understanding the problem domain. A senior engineer doesn't just say "build me a login page." They specify authentication flows, token handling, error states, and session management. The quality of the output is directly proportional to the quality of the input, and domain expertise shapes that input.
**They can fix what breaks.** AI-generated code isn't perfect. Stanford research has shown that while greenfield tasks with low complexity can see up to 2x productivity gains, complex brownfield tasks can actually result in *negative* productivity when developers spend more time refactoring AI output than they would have spent writing it themselves. Experienced developers know when to lean on AI and when to take the wheel.
**They use AI as a force multiplier, not a replacement.** As one engineering lead put it: "I can now accomplish 4x more development with one strong senior engineer than before, because they're not needing to do things like 'change the button hover state' and can actually focus on deep work." The AI handles the tedious scaffolding while the human focuses on design decisions, edge cases, and system integrity.
## The real risk for non-developers
None of this means non-developers can't build anything with vibe coding. They absolutely can, and for certain use cases, the results are genuinely impressive. Quick prototypes, internal tools, personal projects, proof-of-concept demos: these are all legitimate wins.
The problem emerges when the stakes get higher. Production applications need security hardening, performance optimization, error handling, and ongoing maintenance. Bubble's 2025 State of Visual Development report found that while 86.7% of respondents would recommend visual development tools to new entrepreneurs, only 51.4% would recommend vibe coding. The gap reflects a practical reality: prompt-only coding tools work well for prototyping but struggle when builders need to debug, customize, and maintain applications over time.
Addy Osmani, a well-known engineering leader at Google, drew a sharp distinction between "vibe coding" and "AI-assisted engineering." Vibe coders operate with minimal code review, sparse tests, and blind trust in AI outputs, resulting in "a lot of rope with little guidance." AI-assisted engineers, by contrast, use the same tools but maintain rigorous review processes, testing, and architectural oversight. The tools are the same. The outcomes depend entirely on the person using them.
## LLMs are tools, not architects
This is the core insight that gets lost in the hype cycle. Large language models are extraordinarily powerful tools for writing code. They can generate boilerplate in seconds, suggest implementations you hadn't considered, and help you explore unfamiliar APIs. But they don't understand your product, your users, or your constraints.
An LLM doesn't know that your payment processing flow needs to handle idempotency. It doesn't know that your startup's runway depends on keeping infrastructure costs low. It doesn't know that the elegant solution it just generated will create a nightmare for the developer who inherits the codebase in eight months.
These are judgment calls. They require context that no model currently possesses. And they're exactly the kind of decisions that experienced developers make dozens of times a day, often without even thinking about it.
## So what should we actually take away?
**If you're a developer**, embrace these tools. They will make you dramatically more productive. Use them for scaffolding, boilerplate, exploration, and the mechanical parts of coding that slow you down. But keep your hands on the wheel. Review what the AI generates. Write tests. Think about architecture. The developers who will thrive in this era are the ones who treat AI as a very fast, somewhat unreliable junior developer, not as a replacement for their own judgment.
**If you're not a developer**, go ahead and experiment. Vibe coding is a fantastic way to prototype ideas, build personal tools, and learn how software works. But be honest about the limitations. If you're building something that real users will depend on, you'll eventually need someone who understands the code well enough to maintain it. The AI got you started, but the hard part, keeping it running, still requires human expertise.
**If you see a really amazing app that someone tells you was vibe coded**, and you're wondering why you can't do the same, remember: it's probably not the AI that's impressive. It's the developer behind it.
## References
1. Karpathy, A. (2025). Original coining of "vibe coding" concept. [Twitter/X post](https://x.com/karpathy/status/1886192184808149383)
2. Stack Overflow. (2025). "2025 Developer Survey: AI Tools." [survey.stackoverflow.co](http://survey.stackoverflow.co)
3. Hashnode. (2026). "The State of Vibe Coding in 2026: Adoption Won, Now What?" [hashnode.com](http://hashnode.com)
4. Bubble. (2025). "The 2025 State of Visual Development and Vibe Coding." [bubble.io](http://bubble.io)
5. Osmani, A. (2025). "Vibe Coding Is Not the Same as AI-Assisted Engineering." [Medium](https://medium.com/@addyosmani/vibe-coding-is-not-the-same-as-ai-assisted-engineering-3f81088d5b98)
6. Stanford University. (2025). Study on AI productivity gains across task complexity. Referenced via [YouTube summary](https://youtu.be/tbDDYKRFjhk)
7. Google Cloud. (2026). "What is Vibe Coding?" [cloud.google.com](http://cloud.google.com)
8. Codecademy. (2025). "Is Vibe Coding Bad? What Developers Need to Know." [codecademy.com](http://codecademy.com)
9. The New Stack. (2025). "AI Engineering Trends in 2025: Agents, MCP and Vibe Coding." [thenewstack.io](http://thenewstack.io)
