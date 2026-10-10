---
title: "If nobody is writing code"
date: "2026-03-25T00:55:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: []
---

Programming languages have always been about one thing: abstraction. Machine code abstracted circuits. Assembly abstracted machine code. FORTRAN abstracted assembly. Python abstracted memory management. Each layer moved us further from the metal and closer to plain intent.
Now AI writes the code. Dario Amodei, CEO of Anthropic, predicted in early 2025 that AI would be writing 90% of code within months, and essentially all of it within a year. Stack Overflow's 2025 Developer Survey found that 65% of developers already use AI coding tools at least weekly. The trajectory is unmistakable.
So here's the question that's been gnawing at me: if nobody is writing code anymore, what was the point of all that evolution? The languages, the paradigms, the flamewars over tabs versus spaces, React versus Vue, Python versus everything. Was it all just a prerequisite? A scaffold that AI needed before it could stand on its own?
## The longest ladder ever built
Think about the timeline. Ada Lovelace wrote the first algorithm in 1843 for a machine that barely existed. Konrad Zuse created Plankalkül in the 1940s. FORTRAN arrived in 1957. Then came C, C++, Java, Python, JavaScript, TypeScript, Rust, and hundreds of others. Each one a rung on a ladder stretching toward something.
Every new language solved a problem the last one couldn't. C gave us portability. Java gave us "write once, run anywhere." Python gave us readability. TypeScript gave JavaScript a spine. But what if the problem they were all converging on wasn't better human productivity? What if it was legibility for machines?
Higher-level languages don't just make code easier for people to write. They make intent clearer. Python reads almost like pseudocode. TypeScript annotates what things are. React describes what the UI should look like, not how to draw it. Each generation of language moved closer to describing *what* you want rather than *how* to do it.
That's exactly what AI needs. A deterministic, structured way to express intent.
## Nobody reads the code anymore
Here's the part that unsettles me most. It's not just that nobody writes the code. Increasingly, nobody reads it either.
Software engineer Peter Steinberger has openly said he stopped reading AI-generated code. And he's not alone. A 2026 survey by Sonar found that 48% of developers think AI-generated code is incorrect, yet adoption keeps climbing. The trust gap is real: Stack Overflow reported that developer trust in AI tools dropped 11 percentage points between 2024 and 2025, even as usage surged.
The Black Duck 2026 OSSRA report found that average open source vulnerabilities per codebase more than doubled, rising 107%, with 87% of audited codebases containing at least one vulnerability. Security researchers have already found that AI coding tools fail XSS security checks 86% of the time and produce hard-coded secrets in over 35% of cases.
Code that nobody writes, nobody reviews, and nobody fully understands, but that runs everything.
## Was code always meant for machines?
There's a strange irony here. We spent decades making programming languages more human-readable. We fought for clean code, meaningful variable names, elegant abstractions. We wrote books about code as craft, code as literature, code as communication between humans.
But maybe we had it backwards. Maybe the real audience was never other humans. Maybe every improvement in expressiveness, every step toward natural language, was unconsciously preparing code to be the native tongue of a non-human intelligence.
Programming languages are, at their core, formal systems for expressing logic. They have strict syntax, unambiguous semantics, and deterministic behavior. That's not how humans naturally think. But it's exactly how you'd design a training signal for a reasoning machine.
From this angle, the entire history of programming looks less like human toolmaking and more like building a bridge. We needed a way to translate fuzzy human intent into precise machine execution. Programming languages were that bridge. And now AI can walk across it in both directions.
## The scaffold doesn't disappear
But here's where the metaphor breaks down. Scaffolding gets removed after the building is done. Programming languages aren't going anywhere.
AI doesn't generate code from nothing. It generates code *in* programming languages, trained on decades of human-written code. The patterns, the idioms, the architectural decisions baked into millions of repositories are what give AI its fluency. Without that corpus, there is no AI coder.
As Alexandru Nedelcu argues, the source of truth is still the source code itself. Higher-level languages matter even for AI agents because they preserve intent, constraints, and design decisions that lower-level representations lose. Assembly might be executable, but it's a lossy format for meaning. The evolution of programming languages wasn't wasted effort. It was the creation of a knowledge base dense enough for AI to learn from.
Code is still the specification. It's still the contract between what you want and what the machine does. What's changing is who writes the first draft.
## The real question isn't about code
If I'm being honest, the question "what's the point of code?" is really a proxy for a deeper one: what's the point of *us* in the loop?
The answer, I think, is the same as it's always been. Code was never the hard part. Knowing what to build was. Understanding the problem, making tradeoffs, deciding what matters, those are human problems. AI can generate a thousand lines of code in seconds, but it can't tell you whether you're solving the right problem.
The most dangerous developer in 2026 isn't the one who refuses to use AI. It's the one who ships AI-generated code without understanding what it does. The evolution of programming wasn't a ladder to make humans obsolete. It was a ladder to lift us out of the syntax and into the thinking.
Maybe that was always the point.
## References
1. Stack Overflow, "2025 Developer Survey: AI Section" — [https://survey.stackoverflow.co/2025/ai/](https://survey.stackoverflow.co/2025/ai/)
2. MIT Technology Review, "AI coding is now everywhere. But not everyone is convinced." (December 2025) — [https://www.technologyreview.com/2025/12/15/1128352/rise-of-ai-coding-developers-2026/](https://www.technologyreview.com/2025/12/15/1128352/rise-of-ai-coding-developers-2026/)
3. Forbes, "Myth Or Reality: Will AI Replace Computer Programmers?" (August 2025) — [https://www.forbes.com/sites/bernardmarr/2025/08/04/myth-or-reality-will-ai-replace-computer-programmers/](https://www.forbes.com/sites/bernardmarr/2025/08/04/myth-or-reality-will-ai-replace-computer-programmers/)
4. Yahoo Finance, "Anthropic CEO Predicts AI Models Will Replace Software Engineers In 6-12 Months" (January 2026) — [https://finance.yahoo.com/news/anthropic-ceo-predicts-ai-models-233113047.html](https://finance.yahoo.com/news/anthropic-ceo-predicts-ai-models-233113047.html)
5. Black Duck, "2026 OSSRA Report: Open Source Vulnerabilities Double as AI Soars" — [https://www.blackduck.com/blog/open-source-trends-ossra-report.html](https://www.blackduck.com/blog/open-source-trends-ossra-report.html)
6. Stack Overflow Blog, "Mind the gap: Closing the AI trust gap for developers" (February 2026) — [https://stackoverflow.blog/2026/02/18/closing-the-developer-ai-trust-gap/](https://stackoverflow.blog/2026/02/18/closing-the-developer-ai-trust-gap/)
7. Alexandru Nedelcu, "Programming Languages in the Age of AI Agents" (November 2025) — [https://alexn.org/blog/2025/11/16/programming-languages-in-the-age-of-ai-agents/](https://alexn.org/blog/2025/11/16/programming-languages-in-the-age-of-ai-agents/)
8. Sonar, "State of Code Developer Survey" (2026), reported via Medium — [https://tomaszs2.medium.com/programmers-dont-trust-ai-survey-reveals-48-think-ai-code-is-incorrect-3f348e9c719f](https://tomaszs2.medium.com/programmers-dont-trust-ai-survey-reveals-48-think-ai-code-is-incorrect-3f348e9c719f)
9. Computer History Museum, "Software & Languages Timeline" — [https://www.computerhistory.org/timeline/software-languages/](https://www.computerhistory.org/timeline/software-languages/)
10. DEV Community, "Reports of Code's Death Are Greatly Exaggerated" (2026) — [https://dev.to/onsen/reports-of-codes-death-are-greatly-exaggerated-227g](https://dev.to/onsen/reports-of-codes-death-are-greatly-exaggerated-227g)
