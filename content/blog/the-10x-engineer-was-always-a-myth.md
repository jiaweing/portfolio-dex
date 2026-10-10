---
title: "The 10x engineer was always a myth"
date: "2026-03-31"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: []
---

There's a narrative the tech industry has clung to for decades: somewhere out there is a programmer so gifted, so unnaturally productive, that they can do the work of ten ordinary engineers. The "10x engineer." A hero figure, celebrated in hiring lore, startup mythology, and Twitter threads from venture capitalists.
AI has now made that narrative impossible to sustain. Not because AI replaced anyone, but because it compressed the gap between the best and the rest. And instead of celebrating this as the democratization it is, much of the industry is mourning the loss of a story that was mostly survivorship bias all along.
## Where the number came from
The "10x" idea traces back to a 1968 study by Sackman, Erikson, and Grant, published in *Communications of the ACM*. They measured professional programmers with an average of seven years' experience and found staggering variation: a 20:1 ratio in initial coding time, 25:1 in debugging time, 5:1 in program size, and roughly 10:1 in execution speed.
Those numbers sound dramatic. They were also deeply flawed.
The study combined results from programmers working in high-level and low-level languages, a methodological problem that inflates the apparent gap. As Steve McConnell noted in his analysis for *Making Software*, even after correcting for these flaws, a roughly 10-fold difference remained, but the context matters enormously. The study measured the gap between the *best and worst* performers, not the best and average. Fred Brooks popularized the finding in *The Mythical Man-Month* in 1975, and the number stuck.
Over the following decades, additional studies by Curtis, Mills, DeMarco and Lister, and others confirmed that large productivity variations exist among programmers. But the leap from "productivity varies widely" to "some individuals are inherently 10x better" is where the myth really took hold.
## What 10x actually was
Look closely at the engineers who earned the "10x" label in practice, and a pattern emerges. Their outsized output almost always came from factors that had little to do with typing speed or algorithmic brilliance:
- **Better tooling.** They knew their editor, their debugger, their build system inside out. They automated what others did by hand.
- **Clearer requirements.** They had the seniority or the relationships to get unambiguous specs. They weren't blocked by the same confusion that slowed everyone else.
- **Domain knowledge.** They'd been in the codebase for years. What looked like genius was often just knowing where the bodies were buried.
- **Problem selection.** This is the uncomfortable one. Many "10x engineers" were simply working on higher-leverage problems. They weren't writing better for-loops; they were choosing which for-loops mattered.
The Carnegie Mellon Software Engineering Institute conducted research that directly challenged the idea of inherent individual superiority. Their findings suggested that what looks like dramatic talent differences often reflects differences in environment, tooling, and task assignment rather than raw ability.
In other words, the 10x engineer was frequently a product of circumstance, not chromosomes.
## AI compressed the gap
Then AI coding tools arrived and did something the industry wasn't prepared for: they gave everyone access to the advantages that used to be hoarded by the few.
A median engineer with a modern AI assistant now has instant access to pattern recognition across millions of codebases, automated boilerplate generation, real-time bug detection, and documentation on demand. The things that used to separate a senior engineer from a junior one, deep familiarity with APIs, knowledge of edge cases, speed at writing standard patterns, are now accessible to anyone with a subscription.
According to Stack Overflow's 2025 Developer Survey, 65% of developers now use AI coding tools at least weekly. The gap hasn't disappeared, but it has narrowed substantially.
The data on whether this makes developers faster, though, is more complicated than the marketing suggests. A landmark randomized controlled trial by METR found that experienced open-source developers were actually 19% *slower* when using AI tools, even though they believed they were 24% faster. The perception gap is striking: developers felt more productive while measurably being less so. The time saved on initial code generation was eaten by prompting, reviewing, and refactoring AI output that didn't quite fit.
This doesn't mean AI tools are useless. It means the advantage isn't raw speed. It's access. AI tools lower the floor, giving less experienced developers capabilities that previously required years of accumulated knowledge.
## Why we're mourning instead of celebrating
If AI tools are democratizing coding ability, that should be good news. More people can build more things. The barrier to entry is lower. The talent pool is wider.
But the reaction across much of the industry has been anxiety, not celebration. There are a few reasons for this.
First, identity. For many engineers, the "10x" narrative was aspirational. It gave the profession a hero archetype, a reason to believe that raw technical skill was uniquely valuable and irreplaceable. Watching AI compress that advantage feels like a loss of status.
Second, economics. A Harvard study tracking 62 million workers found that companies adopting generative AI cut junior developer hiring by 9 to 10 percent within six quarters. Senior roles stayed flat. The industry is removing the bottom rung of the career ladder right as the tools that were supposed to empower everyone are being used to justify hiring fewer people.
Third, the uncomfortable realization that much of what passed for individual brilliance was actually leverage. Better tools, better context, better problems. When everyone gets better tools, the variance that made some engineers look exceptional starts to shrink.
## The new differentiator
If raw coding speed is no longer the primary axis of differentiation, what is?
**Taste.** Knowing what to build and, more importantly, what *not* to build. AI can generate code for any feature you describe, but it can't tell you which features matter. The ability to look at a problem space and identify the highest-leverage intervention is becoming the scarcest skill in engineering.
**System design.** Understanding how components fit together at scale, how to make tradeoffs between consistency and availability, how to design for maintainability over years rather than velocity over weeks. AI can help implement a system design, but the judgment calls about architecture still require deep experience.
**Problem selection.** The 10x advantage was never really in the code. It was in knowing which code mattered. That's even more true now. When implementation is cheap, the ability to identify the right problem becomes the bottleneck.
**Orchestration.** The engineers who are most effective in 2026 aren't the ones who type fastest. They're the ones who can fluidly move between AI tools, evaluate output quality, maintain context across complex systems, and ship complete products. It's a different skill set, one that looks more like directing than performing.
## What a "10x" looks like now
The variance between engineers hasn't disappeared. It's shifted.
The most impactful engineers today aren't distinguishable by their ability to write a sorting algorithm from memory or debug a memory leak by reading assembly. They're distinguishable by judgment: choosing the right abstraction, saying no to the wrong feature, designing systems that are simple enough to survive contact with reality.
Deep expertise still matters, just differently. An engineer who understands distributed systems at a fundamental level will make better architectural decisions than one who's relying on AI-generated suggestions without understanding the tradeoffs. The knowledge hasn't become worthless. But it's shifted from execution advantage to judgment advantage.
The honest version of the "10x" story was always this: some engineers work on problems that are ten times more valuable than what others work on. That was true before AI, and it's true now. The difference is that AI has made this dynamic visible by stripping away the implementation speed advantage that used to obscure it.
## The hero narrative was always the wrong story
The tech industry's obsession with the lone genius, the 10x engineer who single-handedly saves the startup, was always a convenient fiction. It justified paying some engineers dramatically more than others. It justified building cultures around individual heroics rather than team systems. It justified the VC mantra of "only hire 10x developers" without ever clearly defining what that meant.
The better story, the one that was always true but less exciting, is that great software comes from teams with clear communication, well-defined problems, good tooling, and the psychological safety to make mistakes. The "10x" effect was almost always a team-level phenomenon that got attributed to individuals.
AI hasn't killed the 10x engineer. It's revealed that the 10x engineer was always a story we told ourselves, a way of making sense of productivity differences that had more to do with systems than with talent. The sooner we let go of the hero narrative, the sooner we can build engineering cultures that actually work.
## References
1. H. Sackman, W.J. Erikson, and E.E. Grant, "Exploratory Experimental Studies Comparing Online and Offline Programming Performance," *Communications of the ACM*, January 1968. [https://dl.acm.org/doi/10.1145/362851.362858](https://dl.acm.org/doi/10.1145/362851.362858)
2. Steve McConnell, "Productivity Variations Among Software Developers and Teams: The Origin of 10x," Construx. [https://www.construx.com/blog/productivity-variations-among-software-developers-and-teams-the-origin-of-10x/](https://www.construx.com/blog/productivity-variations-among-software-developers-and-teams-the-origin-of-10x/)
3. Frederick Brooks, *The Mythical Man-Month: Essays on Software Engineering*, Addison-Wesley, 1975.
4. Bill Nichols, "Programmer Moneyball: Challenging the Myth of Individual Programmer Productivity," Carnegie Mellon Software Engineering Institute. [https://www.sei.cmu.edu/blog/programmer-moneyball-challenging-the-myth-of-individual-programmer-productivity/](https://www.sei.cmu.edu/blog/programmer-moneyball-challenging-the-myth-of-individual-programmer-productivity/)
5. Stack Overflow 2025 Developer Survey, AI section. [https://survey.stackoverflow.co/2025/ai/](https://survey.stackoverflow.co/2025/ai/)
6. Joel Becker, Nate Rush, Elizabeth Barnes, and David Rein, "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity," METR, July 2025. [https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
7. "AI coding is now everywhere. But not everyone is convinced," *MIT Technology Review*, December 2025. [https://www.technologyreview.com/2025/12/15/1128352/rise-of-ai-coding-developers-2026/](https://www.technologyreview.com/2025/12/15/1128352/rise-of-ai-coding-developers-2026/)
8. Justin Etheredge, "The 10x Programmer Myth," Simple Thread, 2021. [https://www.simplethread.com/the-10x-programmer-myth/](https://www.simplethread.com/the-10x-programmer-myth/)
9. Justin Searls, "The Looming Demise of the 10x Developer," Test Double. [https://testdouble.com/insights/the-looming-demise-of-the-10x-developer](https://testdouble.com/insights/the-looming-demise-of-the-10x-developer)
