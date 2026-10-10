---
title: "The problem being a CS student"
date: "2026-03-18T01:34:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: []
---

You don't notice it at first. It creeps in slowly, like a background process you never asked for. One day you're learning about time complexity, and the next you're standing at your front door thinking about how to shave two seconds off your key-to-door pipeline.
That's the problem with being a CS student. You start optimizing *everything*.
## It starts in the classroom
In school, we're trained to think about efficiency. What's the best way to sort a list? How do you traverse a graph with the fewest steps? Can you reduce this O(n²) algorithm to O(n log n)? We spend semesters learning that there is almost always a better, faster, more elegant way to do something.
And that's great, when you're writing code.
The issue is that this mindset doesn't stay inside the IDE. It leaks into your real life, one micro-optimization at a time.
## The real-life optimizations nobody asked for
Let me give you some examples from my own life, living in Singapore.
**The disembark sequence.** Every time I park my bike and get home, there's a specific order of operations I follow. Helmet off while walking. Bag unzipped before reaching the door. Keys already in hand. It's a pipeline, and I've mentally profiled it to remove every unnecessary wait state.
**The gate-and-door combo.** My condo has a fingerprint scanner at the gate and a key lock on the door. I've figured out the exact angle to hold my finger so the scanner reads on the first try, and I start pulling out my door key the moment the gate clicks. Two authentication steps, zero idle time in between.
**Hanging clothes.** This one sounds absurd, but I've genuinely thought about the optimal order for hanging laundry. Do you sort by type first, then hang? Or grab from the basket in sequence and hang as you go? I've settled on a method that minimizes the number of times I bend down to the basket. Batch processing, basically.
**Walking routes.** I know the exact timing of traffic lights near my place. I adjust my walking speed, sometimes slowing down slightly, so I arrive at the crossing just as it turns green. It's like packet scheduling, but for pedestrians.
These aren't life-changing optimizations. Each one saves maybe a second or two. But I can't stop doing them.
## Why CS students think this way
There's a concept in computer science called **computational thinking**, the idea that you can apply CS problem-solving techniques like decomposition, pattern recognition, and algorithm design to problems outside of programming. Jeannette Wing, who popularized the term, argued that computational thinking is a fundamental skill, not just for computer scientists, but for everyone.
The thing is, CS students don't just *apply* computational thinking to daily life. We can't turn it off. Once you've spent enough time decomposing problems into subproblems and looking for repeatable patterns, your brain starts doing it automatically. Every routine becomes a process. Every process becomes something that could, theoretically, be improved.
Brian Christian and Tom Griffiths explored this idea beautifully in *Algorithms to Live By*, showing how algorithms from computer science map onto human decisions, from finding a parking spot to organizing your closet. The book argues that many of our daily choices are, at their core, the same optimization problems that computers solve. The difference is that we're running them on much messier hardware.
## The trap of local optimization
Here's where it gets interesting, and maybe a little concerning. In optimization theory, there's a well-known problem called **local optima**. You find a solution that's better than everything nearby, so you stop searching. But there might be a much better solution somewhere else entirely that you'll never find because you're stuck on your little hill.
I think CS students fall into this trap in real life all the time. We spend so much energy optimizing the small stuff, the five-second routines, the walking routes, the laundry algorithms, that we sometimes miss the bigger picture. You can have the most efficient morning routine in the world and still be headed in the wrong direction.
There's also the problem of **premature optimization**. Donald Knuth famously said that "premature optimization is the root of all evil." In programming, this means you shouldn't optimize code before you know where the real bottlenecks are. In life, it means you probably shouldn't spend twenty minutes figuring out the fastest way to hang six shirts.
But we do it anyway.
## The Singapore factor
Living in Singapore makes this worse, or maybe just more visible. Everything here is already optimized. The MRT runs on time. The hawker centres are models of throughput efficiency. Even the way people queue at food stalls has an unspoken protocol.
When you live in a city that's already been optimized at a systems level, it's natural to start thinking about personal optimization too. You're surrounded by evidence that efficiency works, that shaving seconds matters at scale, that well-designed systems just *feel* better.
So you start treating your own life like a system. And honestly, sometimes that's fine. There's a quiet satisfaction in a well-executed routine, in knowing you've removed the friction from something you do every day.
## Learning to let some things be O(n²)
The real skill, I think, isn't in optimizing everything. It's in knowing when to stop.
Some things in life are worth doing inefficiently. A longer walk home that takes you past the park. A slower morning where you actually sit down for breakfast. A conversation that doesn't have a clear agenda or outcome.
Not everything needs to be reduced to its most efficient form. Sometimes the "wasted" time is the whole point.
I'm still working on this. My brain still calculates the fastest path through the grocery store, and I still pre-plan my movements when I'm carrying bags up the stairs. Old habits die hard when they're compiled into your neural firmware.
But I'm getting better at recognizing the moments where optimization isn't the goal. Where the inefficiency is, in its own way, the feature, not the bug.
## References
1. Wing, J. M. (2006). "Computational Thinking." *Communications of the ACM*, 49(3), 33-35. [https://www.cs.princeton.edu/\~chazelle/courses/BIB/jeannette-wing.pdf](https://www.cs.princeton.edu/~chazelle/courses/BIB/jeannette-wing.pdf)
2. Christian, B. & Griffiths, T. (2016). *Algorithms to Live By: The Computer Science of Human Decisions*. Henry Holt and Company. [https://us.macmillan.com/books/9781250118363/algorithmstoliveby/](https://us.macmillan.com/books/9781250118363/algorithmstoliveby/)
3. Knuth, D. E. (1974). "Structured Programming with go to Statements." *ACM Computing Surveys*, 6(4), 261-301.
