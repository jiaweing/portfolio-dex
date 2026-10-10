---
title: "Are humans just LLMs?"
date: "2026-04-28T00:05:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: ["LLMs","Models","Learning","Attention"]
---

There's a question that keeps surfacing in conversations about AI, one that makes both engineers and philosophers uncomfortable: are we, as humans, really that different from large language models?
On the surface, it sounds absurd. We have bodies, emotions, decades of lived experience. An LLM is a statistical model trained on text. But the more you dig into how the brain actually works, the more the comparison starts to feel less like a provocation and more like a genuine inquiry worth taking seriously.
## The brain as a prediction machine
One of the most influential ideas in modern neuroscience is that the brain is fundamentally a prediction engine. This isn't a loose metaphor. It's a well-developed theoretical framework known as predictive processing (or predictive coding), championed by neuroscientist Karl Friston and philosopher Andy Clark, among others.
The core idea is that your brain doesn't passively receive sensory input and then figure out what's happening. Instead, it's constantly generating predictions about what it expects to see, hear, and feel, then comparing those predictions against actual sensory signals. What bubbles up to conscious awareness isn't raw data from the world. It's the error signal, the difference between what the brain predicted and what actually arrived.
Researchers at the Max Planck Institute for Psycholinguistics demonstrated this in the context of language: our brains work like an autocomplete function, constantly predicting the next word during conversation, reading, and listening. But unlike simple autocomplete, the brain makes predictions at multiple levels simultaneously, from the meaning of a sentence down to specific speech sounds.
Friston's free energy principle takes this further, proposing that minimizing prediction error (or "free energy") is the fundamental organizing principle of all brain function, and perhaps of all biological systems. Perception, action, learning, even attention can all be recast as different strategies for reducing the gap between what the brain expects and what it encounters.
## Next-token prediction at scale
Now consider what an LLM does. At its core, it's trained on a single objective: predict the next token. Given a sequence of words, what word comes next? That's it.
The dismissive version of this observation is that LLMs are "just" autocomplete. They don't understand anything. They're pattern matchers operating on statistics.
But here's where things get interesting. When you train next-token prediction at massive scale, on trillions of tokens of human-generated text, something unexpected emerges. The models develop internal representations that correspond to real concepts. They can reason about novel problems, follow complex instructions, and even exhibit behavior that looks like theory of mind. Research from Anthropic has shown that these models develop structured internal features, not just surface-level statistical correlations.
Philosophers Alex Grzankowski, Stephen Downes, and Patrick Forber have argued that reducing LLMs to "just next token predictors" misses the point entirely. Yes, that's the training objective. But the capabilities that emerge from that objective are far richer than the objective itself would suggest.
Sound familiar? It should.
## The reductionism trap
Scott Alexander made what might be the most incisive observation on this topic: saying LLMs are "just" next-token predictors is like saying humans are "just" survival-and-reproduction machines because that's what evolution optimized for.
There is, of course, a sense in which we are survival-and-reproduction machines. Every cognitive faculty we have can be traced back to its effects on survival and reproduction. But nobody seriously argues that a mathematician working on a proof is "really just trying to have sex." The optimization objective and the resulting capabilities are different things.
The same logic applies to LLMs. Next-token prediction is the training objective. But what emerges from that training, the internal representations, the apparent reasoning, the structured knowledge, can't be fully explained by pointing at the loss function and saying "it's just statistics."
And it applies to us, too. Prediction error minimization might be the brain's core operating principle. But what emerges from that principle, consciousness, creativity, love, existential dread, can't be captured by saying "we're just prediction machines."
## Where the analogy holds
The structural parallels between brains and LLMs are striking enough that researchers are now actively studying them side by side.
Both are prediction engines. The brain predicts sensory input. LLMs predict text. Both improve through exposure to patterns. Both build internal models of the world (or at least, models of the statistical regularities in their inputs). Both generate outputs that are probabilistic rather than deterministic.
Research published in Nature Human Behaviour found evidence of a predictive coding hierarchy in the human brain during speech processing, where different brain regions predict at different levels of abstraction. This mirrors how transformer layers in LLMs build increasingly abstract representations as information flows through the network.
Perhaps most provocatively, a study from PMC found that neural language models trained on a developmentally realistic amount of data (about 100 million words, similar to what a child encounters in their first 10 years) can already predict human brain responses to language. The brain and the model, trained on similar data, converge on similar internal solutions.
Brown University researchers found that LLMs and humans follow surprisingly similar trajectories when adjusting hypotheses in light of evidence, not just arriving at the same answers, but getting there in similar ways.
## Where it breaks down
But the analogy has real limits, and they matter.
First, embodiment. The brain doesn't just predict text. It predicts sensory input across every modality, vision, touch, sound, proprioception, and it does so in the context of a body that moves through and acts upon the world. Andy Clark's work on the predictive brain emphasizes that prediction and action are deeply intertwined. We don't just passively model the world. We actively intervene in it, and our predictions are shaped by our capacity for action. LLMs have no body, no sensory grounding, no ability to act.
Second, grounding. When you read the word "coffee," your brain activates networks associated with the smell, taste, warmth, and ritual of coffee. An LLM processes "coffee" as a token in relation to other tokens. The representations might be structurally similar in some abstract sense, but they're built on fundamentally different foundations. As researchers at Scientific American put it: "Where a human judges, a model correlates. Where a human evaluates, a model predicts. Where a human engages with the world, a model engages with a distribution of words."
Third, learning efficiency. Humans learn language from vastly fewer examples than LLMs require. A child doesn't need trillions of tokens to learn to speak. This suggests that the brain brings significant innate structure to the table, what Chomsky called universal grammar and what modern cognitive science frames as strong inductive biases. LLMs start closer to a blank slate, compensating with sheer scale.
Fourth, metacognition. Humans don't just predict. We know that we're predicting. We can reflect on our own thought processes, question our assumptions, and deliberately override our predictions. Whether LLMs have anything resembling this self-awareness is, to put it mildly, an open question.
## A thousand brains, not one
Jeff Hawkins' Thousand Brains Theory adds another dimension to this comparison. Hawkins proposes that the brain doesn't build a single model of any object or concept. Instead, it builds thousands of models simultaneously, using different sensory inputs and different reference frames. These models then "vote" to reach a consensus about what's being perceived.
This is architecturally very different from an LLM, which processes information through a single pathway (albeit with multiple attention heads). The brain's approach is massively parallel, decentralized, and inherently multi-modal. Each cortical column is, in a sense, its own little prediction machine, and intelligence emerges from their collaboration.
This suggests that even if prediction is the shared principle, the implementation matters enormously. The brain and the LLM might both be in the prediction business, but they're running very different operations.
## What the question really asks
The question "are humans just LLMs?" is provocative because it cuts in both directions.
If you want to diminish AI, you say: LLMs are just pattern matching, and humans are so much more. If you want to diminish humans, you say: we're just biological prediction machines, no different in principle from a chatbot.
But both framings miss the point. The real insight is that prediction, the ability to build models of the world and use them to anticipate what comes next, appears to be a powerful and perhaps universal principle of intelligence. It shows up in brains. It shows up in transformers. It might be something fundamental about what it means to process information about a complex world.
The question isn't whether humans are "just" LLMs or LLMs are "just" humans. It's what the deep parallels between these two very different systems tell us about the nature of intelligence itself.
Maybe intelligence, wherever it appears, is always a story about prediction. About building models, testing them against reality, and updating when they fail. The brain does it with neurons and embodied experience. LLMs do it with attention heads and text. The substrate is different. The principle might be the same.
And if that's true, then the question "are humans just LLMs?" has it backwards. The more interesting question is: what is it about prediction that gives rise to something that looks like understanding, regardless of whether it's running on carbon or silicon?
## References
1. Friston, K. (2010). The free-energy principle: a unified brain theory? [Nature Reviews Neuroscience](https://www.nature.com/articles/nrn2787)
2. Clark, A. (2013). Whatever next? Predictive brains, situated agents, and the future of cognitive science. [Behavioral and Brain Sciences](https://pubmed.ncbi.nlm.nih.gov/23663408/)
3. Heilbron, M. et al. (2022). Evidence of a predictive coding hierarchy in the human brain listening to speech. [Nature Human Behaviour](https://www.nature.com/articles/s41562-022-01516-2)
4. Max Planck Institute for Psycholinguistics. (2022). Our brain is a prediction machine that is always active. [MPI News](https://www.mpi.nl/news/our-brain-prediction-machine-always-active)
5. Grzankowski, A., Downes, S. M., & Forber, P. (2024). LLMs are Not Just Next Token Predictors. [arXiv](https://arxiv.org/pdf/2408.04666)
6. Alexander, S. (2024). Next-Token Predictor Is An AI's Job, Not Its Species. [Astral Codex Ten](https://www.astralcodexten.com/p/next-token-predictor-is-an-ais-job)
7. Huff, M. et al. (2025). Judgments of learning distinguish humans from large language models. [Nature Scientific Reports](https://www.nature.com/articles/s41598-025-22290-x)
8. Tuckute, G. et al. (2024). Artificial Neural Network Language Models Predict Human Brain Responses to Language Even After a Developmentally Realistic Amount of Training. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11025646/)
9. Hawkins, J. (2019). The Thousand Brains Theory of Intelligence. [Numenta](https://www.numenta.com/blog/2019/01/16/the-thousand-brains-theory-of-intelligence/)
10. Ullman, S. (2025). AI and human intelligence are drastically different. [Scientific American](https://www.scientificamerican.com/article/ai-and-human-intelligence-are-drastically-different-heres-how/)
