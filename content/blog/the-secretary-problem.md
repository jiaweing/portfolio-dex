---
title: "The secretary problem"
date: "2026-03-29T12:05:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Psychology"]
tagColors: {"Psychology":"pink"}
postTags: []
---

You're apartment hunting in a new city. You have twenty viewings lined up over the next two weeks. The first place is decent, not perfect, but solid. Do you take it? Or do you keep looking, knowing that once you pass, the landlord moves on to someone else?
This is the essence of the secretary problem, one of the most elegant puzzles in all of mathematics. It asks a deceptively simple question: when you're evaluating options one at a time, and you can't go back, how do you know when to stop looking and commit?
The answer turns out to be surprisingly precise, and it applies to far more than hiring secretaries.
## The setup
Here's the classic formulation. You need to hire one secretary from a pool of *n* applicants. The rules are strict:
1. You interview candidates one at a time, in random order.
2. After each interview, you can rank the candidate relative to everyone you've seen so far, but you have no idea how they compare to those you haven't met yet.
3. You must immediately accept or reject each candidate. No callbacks.
4. Your goal is to select the single best candidate out of the entire pool.
If you could interview everyone and then decide, the problem would be trivial. The difficulty is that decisions are irrevocable. Accept too early and you might miss someone better. Wait too long and the best candidate may already be gone.
## The 37% rule
The optimal strategy, proven mathematically, is elegant in its simplicity. It's called the **look-then-leap** rule:
1. **Look phase**: Interview the first 37% of candidates (more precisely, *n/e* candidates, where *e* ≈ 2.718 is Euler's number). Reject all of them, no matter how impressive they are. But keep track of the best one you've seen.
2. **Leap phase**: Continue interviewing. The moment you encounter someone better than everyone in your look phase, hire them immediately.
If you reach the end without finding anyone better, you're stuck with the last candidate. But remarkably, this strategy gives you roughly a 37% chance of selecting the absolute best person, regardless of whether there are 10 candidates or 10,000.
That number, 1/*e* ≈ 0.3679, is where the "37% rule" gets its name.
## Why it works
The intuition is about balancing two risks. Stop too early and you haven't seen enough of the field to calibrate what "good" looks like. Stop too late and the best candidate has likely already appeared and been rejected.
The look phase serves as a calibration period. You're not trying to hire anyone during this stage. You're building a benchmark. You're learning what the top of the distribution looks like so that when you enter the leap phase, you can recognize a standout the moment they appear.
The mathematical proof relies on calculating, for each possible threshold *k* (the number of candidates you skip), the probability that the best candidate overall is selected. When you optimize this probability over all possible values of *k*, the answer converges to *n/e* as *n* grows large. The derivation uses the harmonic series and a limit that resolves cleanly to 1/*e*.
## A brief history
The secretary problem's origins are somewhat murky, which is fitting for a puzzle about uncertainty. The problem circulated by word of mouth through mathematical circles in the 1950s. Mathematician Merrill Flood is often credited with formalizing it around 1958, though he claimed to have been thinking about it since 1949.
The problem gained wider attention when Martin Gardner featured it in his "Mathematical Games" column in *Scientific American* in 1960, presenting it as the "game of googol." From there, it became a staple of probability theory and decision science, attracting work from statisticians like Herbert Robbins and Dennis Lindley.
The name "secretary problem" stuck, though it has gone by many aliases: the marriage problem, the sultan's dowry problem, the fussy suitor problem, and the best choice problem.
## Where it shows up in real life
The secretary problem is more than a mathematical curiosity. Its core insight, that you should spend a deliberate period exploring before committing, maps onto many real decisions.
### Hiring
The original framing is literally about hiring. If you're interviewing candidates for a role and you can't keep people waiting indefinitely, the 37% rule gives you a principled framework. Interview roughly a third of your candidates to set a baseline, then hire the first person who exceeds it.
### Dating
This is perhaps the most popular analogy. If you estimate you'll seriously date about a dozen people in your lifetime, the math suggests spending your first four or five relationships learning what you value, then committing to the next person who surpasses everyone before them.
Of course, dating violates nearly every assumption of the problem (people aren't randomly ordered, rejection isn't always permanent, and you're not just optimizing for "the best"), but the directional wisdom holds. Don't commit before you've seen enough of the world to know what good looks like.
### Apartment hunting
In competitive rental markets, apartments come and go quickly. You often have to decide on the spot. The 37% rule suggests viewing a set number of places first just to calibrate, then pulling the trigger on the first one that beats everything you've seen.
### Business decisions
From evaluating vendors to choosing between job offers that arrive sequentially, any scenario where options appear one at a time and earlier options expire fits the general shape of the problem.
## The limits of the model
It's worth being honest about where the secretary problem breaks down as a guide for real decisions.
**You rarely know *n*.** The classic problem assumes you know exactly how many candidates exist. In real life, you often don't know how many options you'll encounter. Variants of the problem that relax this assumption exist, and they tend to produce similar but slightly more conservative strategies.
**37% is the probability of getting the best, not a good outcome.** The classical formulation treats anything less than the absolute best as a total failure. In practice, you'd often be happy with the second or third best option. When the goal shifts from "pick the best" to "pick someone good," the optimal strategy changes, and outcomes improve significantly.
**Rejection isn't always permanent.** The problem assumes you can never revisit a rejected option. But in many real contexts, you can circle back. When recall is possible, you should explore more aggressively and commit later.
**Options aren't purely random.** The problem assumes candidates arrive in a uniformly random order. In reality, you might get better at attracting strong options over time, or the quality of what's available might shift. Your search is rarely a passive sampling of a fixed pool.
Robert Wiblin, writing about the problem's limitations, argues that it's "too bad a match for real life to usefully inform our decisions." That's a fair critique of literal application, but perhaps too dismissive of the underlying insight.
## What the secretary problem actually teaches
The real value of the secretary problem isn't a rigid formula. It's a framework for thinking about the explore-exploit tradeoff.
Every sequential decision involves a tension between gathering information (exploring) and acting on what you know (exploiting). Commit too early and you're underinformed. Wait too long and you've wasted your best opportunities.
The 37% rule is a precise answer to a simplified version of this tradeoff, but the qualitative lesson is robust:
- **Don't commit to the first good thing you see.** You need a baseline, and building one requires deliberate exploration.
- **Don't wait forever.** After sufficient exploration, act decisively when something exceeds your benchmark.
- **Calibration has value.** The "wasted" time spent on options you ultimately reject isn't wasted at all. It's what makes your eventual choice informed.
These principles apply whether you're choosing a career, a city to live in, a co-founder, or a strategy for your company. The math gives you a number. The wisdom gives you a posture: explore with intention, then leap with confidence.
## References
1. Ferguson, T.S. "Who Solved the Secretary Problem?" *Statistical Science*, Vol. 4, No. 3, 1989. [https://projecteuclid.org/journals/statistical-science/volume-4/issue-3/Who-Solved-the-Secretary-Problem/10.1214/ss/1177012493.full](https://projecteuclid.org/journals/statistical-science/volume-4/issue-3/Who-Solved-the-Secretary-Problem/10.1214/ss/1177012493.full)
2. Freeman, P.R. "The Secretary Problem and Its Extensions: A Review." *International Statistical Review*, 51, 1983, pp. 189-206.
3. Christian, B. and Griffiths, T. *Algorithms to Live By: The Computer Science of Human Decisions*. Henry Holt and Company, 2016.
4. Gardner, M. "Mathematical Games." *Scientific American*, February 1960.
5. "Secretary Problem." *Wikipedia*. [https://en.wikipedia.org/wiki/Secretary_problem](https://en.wikipedia.org/wiki/Secretary_problem)
6. "This Elegant Math Problem Could Help You Make the Best Choice in House Hunting and Even Love." *Scientific American*. [https://www.scientificamerican.com/article/this-elegant-math-problem-could-help-you-make-the-best-choice-in-house/](https://www.scientificamerican.com/article/this-elegant-math-problem-could-help-you-make-the-best-choice-in-house/)
7. Wiblin, R. "The 'Secretary Problem' Is Too Bad a Match for Real Life to Usefully Inform Our Decisions." *Medium*. [https://medium.com/@robertwiblin/the-secretary-problem-is-too-bad-a-match-for-real-life-to-usefully-inform-our-decisions-so-1cd29ae01024](https://medium.com/@robertwiblin/the-secretary-problem-is-too-bad-a-match-for-real-life-to-usefully-inform-our-decisions-so-1cd29ae01024)
8. James McCaffrey. "Test Run - The Secretary Problem." *Microsoft Learn*, September 2016. [https://learn.microsoft.com/en-us/archive/msdn-magazine/2016/september/test-run-the-secretary-problem](https://learn.microsoft.com/en-us/archive/msdn-magazine/2016/september/test-run-the-secretary-problem)
