---
title: "Why are you not using AI?"
date: "2026-05-24T18:00:00.000+08:00"
lastEdited: "2026-05-23T16:02:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Prompt Engineering","Hallucinations","LLMs","Open Source","Coding","Productivity","Learning","Models"]
---

There's a study that made the rounds recently. Researchers at METR ran a randomized controlled trial with 16 experienced open-source developers and found that using AI tools actually *increased* completion time by 19%. The developers themselves predicted AI would make them 24% faster. Experts in economics and ML predicted even larger speedups. Everyone was wrong, and in the wrong direction.
On the surface, this looks like a slam dunk for the skeptics. AI slows you down. Case closed.
But that conclusion misses something important.
## The skill gap is real
The METR study tested developers with "moderate AI experience" working on mature codebases they'd contributed to for an average of five years. These are people who know their projects deeply but are still relatively new to working *with* AI.
That distinction matters. Knowing how to code and knowing how to code with AI are two different skills. The developers in the study spent time reviewing AI-generated suggestions, correcting hallucinations, and context-switching between their own mental model and the AI's output. That overhead adds up, especially when you haven't yet built the instinct for when to lean on AI and when to just type the code yourself.
This is not unique to AI. Any new tool has a learning curve. The first time you used Git, you probably lost more time than you saved. The first time you set up a CI/CD pipeline, it took longer than just deploying manually. But nobody argues that Git or CI/CD are net negatives for productivity.
## The people who use it well are pulling ahead
A McKinsey study found that developers can complete coding tasks up to twice as efficiently when using AI tools. The difference between that finding and the METR result isn't that one study is right and the other wrong. It's that the outcomes depend heavily on how people use the tools.
When you know how to prompt effectively, when you understand the boundaries of what the model can and can't do, when you use AI for the right tasks, the gains are significant. Code generation for boilerplate, rapid prototyping, debugging assistance, documentation, test generation, these are all areas where AI saves real time if you know how to direct it.
The Harvard Business Review published a piece in early 2026 titled "AI Doesn't Reduce Work, It Intensifies It." The argument is that AI doesn't just take tasks off your plate. It changes the nature of work, sometimes adding new cognitive overhead. That's true. But "intensifies" isn't the same as "worse." A power tool intensifies woodworking too. The point is that you need to adapt your workflow, not just bolt AI onto your existing one.
## Common reasons people resist (and why they're worth questioning)
**"It gives wrong answers."** Yes, it does. LLMs hallucinate. But the solution isn't to avoid them entirely. It's to learn where they're reliable and where they're not. You wouldn't stop using Stack Overflow because some answers are wrong. You'd develop the judgment to evaluate what you read.
**"It's slower than just doing it myself."** For tasks you've done a hundred times, maybe. But for tasks that involve research, boilerplate, or exploring unfamiliar territory, AI almost always gets you to a starting point faster. The key is knowing which category your current task falls into.
**"I don't want to depend on it."** This is the one that puzzles me most. You already depend on your IDE, your linter, your package manager, your search engine. Tools are not a weakness. Refusing to use effective tools because of some notion of purity is just leaving value on the table.
**"It'll take my job."** A Pew Research survey found that about a third of American workers worry AI will reduce job opportunities. That concern is understandable but misplaced for most knowledge workers right now. AI is far more likely to change what your job looks like than to eliminate it. The developers, writers, and designers who learn to work with AI will be more valuable, not less.
## How to actually get faster with AI
If you've tried AI tools and felt like they slowed you down, here are a few things worth trying before writing them off.
**Start with clearly scoped tasks.** Don't ask AI to architect your entire system. Ask it to write a specific function, generate test cases for a module, or convert data between formats. Small, well-defined prompts get better results.
**Provide context aggressively.** The more relevant context you give, paste in error messages, relevant code, documentation snippets, the less the model has to guess. Most bad AI output comes from insufficient context, not insufficient capability.
**Learn to edit, not just accept.** Treat AI output as a first draft, not a final answer. The skill isn't in getting perfect output. It's in getting to 80% faster and then refining the last 20% yourself.
**Use it consistently for two weeks.** The learning curve is real. If you try it once, get a mediocre result, and go back to your old workflow, you never get past the initial friction. Commit to integrating it into your daily work for at least a couple of weeks before judging.
## It's not too late
AI tools are improving rapidly. What was true of early-2025 models is already less true of what's available now. The gap between people who use AI effectively and those who don't is only going to widen.
You don't need to become an AI expert. You don't need to understand transformer architectures or fine-tuning. You just need to start using these tools regularly, build intuition for what they're good at, and adapt your workflow accordingly.
The people who figure this out early will have a compounding advantage. The ones who wait will spend more time catching up later.
So if you're still on the fence, just start. Pick one task tomorrow and try it with AI. Then do it again the next day. The learning curve is real, but it's shorter than you think.
## References
1. Becker, J., Rush, N., Barnes, E., & Rein, D. (2025). "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity." [arXiv:2507.09089](https://arxiv.org/abs/2507.09089)
2. McKinsey & Company. "Unleashing Developer Productivity with Generative AI." [McKinsey Digital](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/unleashing-developer-productivity-with-generative-ai)
3. Ranganathan, A. & Ye, X.M. (2026). "AI Doesn't Reduce Work, It Intensifies It." [Harvard Business Review](https://hbr.org/2026/02/ai-doesnt-reduce-work-it-intensifies-it)
4. Pew Research Center. (2025). "U.S. Workers Are More Worried Than Hopeful About Future AI Use in the Workplace." [Pew Research](https://www.pewresearch.org/social-trends/2025/02/25/u-s-workers-are-more-worried-than-hopeful-about-future-ai-use-in-the-workplace/)
5. Mueller, L. & Bruhin, O. (2025). "Developer Resistance to Generative AI Adoption: Identifying Barriers in Software Development." ICIS 2025 Proceedings. [AIS Electronic Library](https://aisel.aisnet.org/icis2025/impl_adopt/impl_adopt/3)
6. DX Newsletter. "Barriers to AI Adoption in Software Engineering." [getdx.com](http://getdx.com)
