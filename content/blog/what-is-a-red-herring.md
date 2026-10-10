---
title: "What is a red herring?"
date: "2026-03-15T13:03:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

If you've ever spent hours debugging a problem only to discover the error message that sent you down a rabbit hole had nothing to do with the actual bug, you've encountered a red herring. The term comes from a story about using strong-smelling smoked fish to throw hounds off a trail, and it fits perfectly in software.
A red herring is anything that misleads you, that pulls your attention away from the real issue and toward something irrelevant. In everyday language it's a logical fallacy or a literary device. In software, it's Tuesday.
## Red herrings in debugging
The most common place you'll run into red herrings is during debugging. A misleading error message points to the wrong file. A stack trace implicates a function that's perfectly fine. A log entry correlates with the failure but has no causal relationship to it.
Here's a familiar pattern: your application crashes, and the last log line mentions a database timeout. You spend two hours investigating the database connection pool, tweaking configurations, restarting services. Then you discover the real problem was an unrelated null reference that corrupted state upstream, and the database timeout was just a downstream symptom.
The error was real. It just wasn't *the* error.
Red herrings in debugging are dangerous because they feel productive. You're investigating. You're forming hypotheses. You're reading stack traces. But you're solving the wrong problem, and every minute spent chasing a red herring is a minute not spent finding the actual bug.
## Why software is full of red herrings
Software systems are layered, interconnected, and full of indirect causation. A failure in one component ripples through others, producing symptoms far from the source. This makes red herrings almost inevitable.
A few reasons they show up so often:
- **Misleading error messages.** Error messages are written by developers who anticipated certain failure modes. When something unexpected happens, the error message might technically fire but describe the wrong situation entirely.
- **Correlation without causation.** Two things changed at the same time. One of them caused the bug. The other is a red herring. Without careful isolation, you'll pick the wrong one half the time.
- **Stale assumptions.** You "know" how a system works because you built it two years ago. But someone refactored that module six months back, and your mental model is outdated. Your assumptions themselves become the red herring.
- **Noisy logs.** In complex systems, logs are full of warnings and minor errors that are normally harmless. During an incident, every one of them looks suspicious.
## Other interesting terms like this
Software engineering is full of colorful terms borrowed from other fields. If you enjoyed learning about red herrings, here are some other favorites.
### Rubber duck debugging
This one comes from *The Pragmatic Programmer* by Andrew Hunt and David Thomas. The idea is simple: when you're stuck on a bug, explain your code line by line to a rubber duck (or any inanimate object). The act of articulating the problem out loud forces you to slow down and examine your assumptions, and you'll often find the mistake before you finish explaining.
Many developers keep actual rubber ducks on their desks for exactly this purpose. It works because the bug is frequently hiding behind something you *think* you understand but haven't actually examined carefully.
### Yak shaving
Coined by Carlin Vieri at MIT in the 1990s (inspired by an episode of *The Ren & Stimpy Show*), yak shaving describes the seemingly endless chain of small prerequisite tasks you need to complete before you can do the thing you actually set out to do.
You sit down to fix a bug. But first you need to update a dependency. But that dependency requires a newer compiler version. But upgrading the compiler breaks the build script. But the build script uses a tool that's deprecated. Three hours later, you're configuring something completely unrelated to your original task, and a colleague asks what you're working on. "I'm shaving a yak," you say.
### Bikeshedding
Based on C. Northcote Parkinson's Law of Triviality from 1957, bikeshedding describes the tendency for teams to spend disproportionate time debating trivial decisions while glossing over complex, important ones. The name comes from Parkinson's example of a committee reviewing plans for a nuclear power plant. They spend two minutes on the reactor design (too complex for most to have opinions about) and forty-five minutes arguing over what material to use for the employee bike shed.
In software, this shows up constantly. A team will breeze through the architecture of a distributed system in ten minutes, then spend an hour arguing about variable naming conventions or which shade of blue a button should be. Poul-Henning Kamp popularized the term in the Berkeley Software Distribution community in 1999, and it has stuck in software culture ever since.
### Heisenbugs (and friends)
Named after physicist Werner Heisenberg, a heisenbug is a bug that disappears or changes behavior when you try to observe it. Add a logging statement? Bug goes away. Attach a debugger? Everything works fine. Remove the debugging tools? Bug comes back. This typically happens with race conditions and timing-sensitive code, where the overhead of observation changes the system's behavior just enough to mask the problem. The term appeared around 1985 in a paper by Jim Gray on software failures.
There's a whole family of physics-inspired bug names:
- **Bohrbug**: the opposite of a heisenbug. A solid, deterministic, reproducible bug, named after the Bohr atom model. It behaves the same way every time and is relatively straightforward to track down.
- **Mandelbug**: a bug so complex and dependent on so many interacting factors that its behavior appears chaotic, named after the Mandelbrot set. You suspect it's deterministic somewhere deep down, but good luck proving it.
- **Schroedinbug**: a bug that only manifests after someone reads the code and realizes it should never have worked in the first place. Until observed, the code existed in a superposition of "working" and "broken."
### Canary testing
Borrowed from the coal mining practice of bringing canary birds into mines to detect toxic gases (the bird would die before gas levels became lethal to humans), canary testing in software means rolling out a change to a small subset of users or servers first. If the canary deployment shows problems, you roll back before the issue affects everyone. The canary takes the hit so the rest of the system doesn't have to.
### Dogfooding
Short for "eating your own dog food," this term describes the practice of using your own product internally before shipping it to customers. If you build a project management tool, your team should manage its own projects with it. The idea is that you'll find bugs, friction, and missing features faster when you experience them firsthand.
## The value of naming things
There's something powerful about having a name for a pattern. Once you know what a red herring is, you can catch yourself chasing one. Once you recognize yak shaving, you can step back and ask whether the chain of tasks is truly necessary or if there's a shortcut. Naming a pattern makes it visible, and visibility is the first step toward managing it.
Software is abstract work, and these borrowed metaphors give us a shared vocabulary for the very human experience of building systems that are, frankly, too complex for any one person to fully understand. The next time you find yourself three hours deep in a debugging session following a trail that leads nowhere, at least you'll know what to call it.
## References
1. "Red herring," Wikipedia, [https://en.wikipedia.org/wiki/Red_herring](https://en.wikipedia.org/wiki/Red_herring)
2. "Rubber duck debugging," Wikipedia, [https://en.wikipedia.org/wiki/Rubber_duck_debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging)
3. Andrew Hunt and David Thomas, *The Pragmatic Programmer: From Journeyman to Master*, Addison-Wesley, 1999
4. "Yak shaving," TechTarget, [https://www.techtarget.com/whatis/definition/yak-shaving](https://www.techtarget.com/whatis/definition/yak-shaving)
5. "Law of triviality," Wikipedia, [https://en.wikipedia.org/wiki/Law_of_triviality](https://en.wikipedia.org/wiki/Law_of_triviality)
6. "Heisenbug," Wikipedia, [https://en.wikipedia.org/wiki/Heisenbug](https://en.wikipedia.org/wiki/Heisenbug)
7. "Software Engineering Terms and Their Interesting Origins," Kyle Higginson, [https://kylehigginson.medium.com/software-engineering-terms-and-their-interesting-origins-1e5cf2d9adc6](https://kylehigginson.medium.com/software-engineering-terms-and-their-interesting-origins-1e5cf2d9adc6)
