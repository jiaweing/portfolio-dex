---
title: "What a 2004 book got right about AI"
date: "2026-04-28T22:42:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Models","LLMs","Memory","Agents","Meta","Open Source"]
---

In 2004, Jeff Hawkins published *On Intelligence*, a book that argued the entire AI field was heading in the wrong direction. At the time, neural networks were in a relative winter, deep learning hadn't yet taken off, and most AI research focused on getting machines to mimic human behavior without understanding how the brain actually works. Hawkins, better known as the creator of the PalmPilot, had a different idea: figure out how the neocortex works first, then build machines that think the same way.
Two decades later, AI looks nothing like what most people in 2004 imagined. Large language models generate coherent text, diffusion models produce photorealistic images, and reinforcement learning agents master complex games. Yet many of Hawkins' core insights have aged remarkably well, even if the field arrived at them through a completely different path.
## The memory-prediction framework
The central argument of *On Intelligence* is deceptively simple: **the brain is fundamentally a prediction machine**. The neocortex doesn't just react to stimuli. It constantly generates predictions about what it expects to see, hear, and feel next, then compares those predictions against reality. When a prediction fails, that mismatch signal is what gets your attention.
Hawkins called this the *memory-prediction framework*. The neocortex stores sequences of patterns in a hierarchy. Lower levels handle fine details (edges, phonemes), while higher levels represent increasingly abstract concepts (faces, words, ideas). Information flows both ways: sensory data moves up, predictions flow down.
This wasn't entirely new in neuroscience. But Hawkins made a bold claim that this single mechanism, hierarchical prediction, was the *core* of intelligence. Not logic, not symbolic reasoning, not behavior. Prediction.
## What the book got right
### Prediction as a unifying principle
The idea that the brain runs on prediction has only grown stronger. Predictive coding, a closely related theory in neuroscience, has become one of the most active research areas in the field. Studies in 2024 and 2025 continue to validate the idea that sensory cortices generate top-down predictions and primarily transmit prediction errors up the hierarchy. Researchers at Harvard published findings in early 2026 demonstrating predictive coding of reward signals in the hippocampus, extending the framework beyond sensory processing into motivation and decision-making.
In AI, the parallel is striking. Modern transformers, the architecture behind GPT and similar models, are essentially next-token prediction machines. They learn to predict what comes next in a sequence, and this simple objective produces remarkably capable systems. Hawkins argued in 2004 that prediction was the key to intelligence. The success of language models trained on next-token prediction is perhaps the strongest, if unexpected, vindication of that intuition.
### The importance of world models
Hawkins insisted that true intelligence requires building an internal model of the world, not just learning input-output mappings. The brain doesn't just recognize a coffee cup. It knows what a cup feels like from different angles, predicts how it will behave when tilted, and understands that the coffee inside is liquid.
This idea has resurfaced forcefully in modern AI discourse. Yann LeCun, Meta's chief AI scientist, has been championing "world models" as the missing ingredient in current AI systems. The argument is that LLMs, despite their fluency, don't truly understand the world because they lack grounded, structured representations of how things work. They predict tokens, not physics.
Hawkins would likely agree with this critique, even as he'd note he made essentially the same argument twenty years earlier.
### Learning from sequences, not labeled datasets
*On Intelligence* emphasized that the brain learns from continuous streams of sensory data, not from neatly labeled training examples. The neocortex discovers structure in temporal sequences without a teacher telling it what's what.
This maps directly onto the rise of self-supervised learning, which has become the dominant paradigm in modern AI. Models like GPT learn from unlabeled text. Vision transformers learn from unlabeled images through techniques like masked autoencoders. The field has largely moved away from the supervised learning paradigm that dominated when Hawkins was writing, toward exactly the kind of unsupervised, sequence-based learning he advocated.
## What the book missed
### Scale and gradient descent actually work
Hawkins was deeply skeptical of artificial neural networks. He argued they were biologically unrealistic and fundamentally limited. In 2004, this seemed reasonable. Neural nets of that era were small, brittle, and couldn't do much that was practically useful.
What Hawkins didn't anticipate was that scaling up these "wrong" architectures, combined with massive datasets and better training methods, would produce systems of extraordinary capability. Deep learning doesn't work the way the brain works, but it works. The transformer architecture bears little resemblance to cortical columns, yet it can write essays, generate code, and reason about novel problems.
The lesson here is that there may be multiple paths to capable AI, not just the brain-inspired one.
### Reward, motivation, and goals
*On Intelligence* focuses almost entirely on the neocortex and largely ignores the subcortical systems that drive motivation, emotion, and reward-seeking behavior. The book has little to say about *why* an intelligent system would do anything at all.
Modern AI has grappled with this through reinforcement learning and reward modeling. Systems like AlphaGo and RLHF-tuned language models derive their purposeful behavior from explicit reward signals. The question of how to give AI systems goals, and how to make those goals safe, has become one of the central challenges in the field. Hawkins' framework, elegant as it is, doesn't address this.
### Language and abstract reasoning
The memory-prediction framework works beautifully for sensory processing and pattern recognition. But *On Intelligence* is vague about how the same mechanism handles language, mathematics, or abstract reasoning. Hawkins gestures at the idea that these are "just more prediction," but doesn't provide a convincing mechanistic account.
Ironically, this is the area where modern AI has made the most visible progress. Large language models handle language, logic, and abstraction with surprising competence, using an architecture that Hawkins would probably consider brainless.
## From On Intelligence to A Thousand Brains
Hawkins didn't stop in 2004. His research continued at Numenta, the company he founded to pursue brain-inspired AI. In 2021, he published *A Thousand Brains: A New Theory of Intelligence*, which significantly updated his ideas.
The key insight of the Thousand Brains Theory is that the neocortex doesn't build a single model of each object. Instead, every cortical column, and there are roughly 150,000 of them, builds its own complete model using grid cell-like reference frames. The brain then reaches a consensus across these thousands of models through a voting mechanism. It's a massively parallel, redundant system that's fundamentally different from how deep learning networks operate.
In late 2024, Hawkins and his team released a white paper outlining the Thousand Brains Project, an open-source initiative to build AI systems based on these neocortical principles, with funding from the Gates Foundation. The project aims to create sensorimotor agents that learn through interaction with their environment, much like a child does, rather than through passive consumption of training data.
## Two paths forward
The current landscape of AI presents an interesting tension. The dominant approach, deep learning, succeeds through scale, data, and gradient descent. It produces systems that are practically useful but arguably don't "understand" anything in the way Hawkins means. The brain-inspired approach that Hawkins champions is more theoretically principled but has yet to produce systems that compete on practical benchmarks.
These two paths aren't necessarily in conflict. Some of the most promising recent work sits at the intersection. Predictive coding algorithms applied to deep neural networks have been shown to produce more brain-like representations. Transformer architectures are being analyzed through the lens of memory and prediction. The boundaries are blurring.
What Hawkins got fundamentally right in 2004 was the question, not necessarily the answer. He asked: *what is intelligence, really?* And he argued that you can't build truly intelligent machines without answering that question first. Twenty years later, we have incredibly capable AI systems, and we're still not sure whether they're intelligent or just very good at pattern matching.
That question hasn't gone away. If anything, it's more urgent than ever.
## References
1. Hawkins, J. & Blakeslee, S. (2004). *On Intelligence*. Times Books.
2. Hawkins, J. (2021). *A Thousand Brains: A New Theory of Intelligence*. Basic Books.
3. Hawkins, J. et al. (2024). "The Thousand Brains Project: A New Paradigm for Sensorimotor Intelligence." [arXiv:2412.18354](https://arxiv.org/abs/2412.18354).
4. Masood, A. "Hierarchical Temporal Memory in Context, A Critical Reappraisal of Hawkins' On Intelligence." [Medium](https://medium.com/@adnanmasood/hierarchical-temporal-memory-in-context-a-critical-reappraisal-of-hawkins-on-intelligence-d9232e123634).
5. Meng et al. (2025). "Duet model of predictive coding unifies diverse neuroscience experimental protocols." [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC12338523/).
6. Harvard CBS (2026). "Predictive coding of reward in the hippocampus." [Harvard CBS](https://cbs.fas.harvard.edu/2026/01/14/predictive-coding-of-reward-in-the-hippocampus/).
7. Parr, T. et al. (2025). "Beyond Markov: Transformers, memory, and attention." [Taylor & Francis](https://www.tandfonline.com/doi/full/10.1080/17588928.2025.2484485).
8. Numenta. "On Intelligence (Book) by Jeff Hawkins." [Numenta](https://www.numenta.com/resources/books/on-intelligence-book-by-jeff-hawkins/).
9. IEEE Spectrum. "Jeff Hawkins Announces the Thousand Brains Project for AI." [IEEE Spectrum](https://spectrum.ieee.org/jeff-hawkins).
