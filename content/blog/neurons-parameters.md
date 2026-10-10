---
title: "Neurons = parameters"
date: "2026-03-18T02:23:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

It's one of the most common comparisons in AI discourse: the human brain has roughly 86 billion neurons, and GPT-4 has an estimated 1.8 trillion parameters. People line these numbers up side by side and conclude that large language models are approaching, or have already surpassed, the complexity of the human brain.
But neurons and parameters are not the same thing. They aren't even measuring the same kind of thing. The comparison is tempting because both numbers are impressively large, but it collapses the moment you look at what each one actually does.
## What is a parameter, really?
In a neural network, a parameter is a single number, a weight or a bias, that gets adjusted during training. It controls how strongly one artificial neuron influences another. Think of it as a dial. The model learns by turning millions (or trillions) of these dials until the outputs start to look right.
GPT-3 had 175 billion parameters. GPT-4 is estimated to have around 1.8 trillion, structured as a mixture-of-experts model where only a subset of roughly 200 billion parameters are active for any given input. These numbers are big, but each parameter is just a floating-point number. It stores one piece of information about one connection.
## What is a neuron, really?
A biological neuron is a living cell. It has dendrites that receive signals from thousands of other neurons, a cell body that integrates those signals, and an axon that transmits the output. Each neuron forms between 1,000 and 10,000 synaptic connections with other neurons, and the human brain contains an estimated 100 trillion of these synapses in total.
But here's where the comparison really breaks down: a single biological neuron is not simple. A 2021 study published in *Neuron* found that it takes a deep neural network of 5 to 8 layers with around 1,000 artificial neurons to approximate the input-output behavior of *one* biological neuron. That's because real neurons perform complex computations within their own dendritic trees, something artificial neurons don't do at all.
Biological neurons also exhibit synaptic plasticity, meaning they strengthen or weaken their connections in real time based on activity. They adapt continuously. Artificial neural networks only adjust their weights during training, not during inference.
## If you must compare, compare synapses to parameters
The better analogy, if there is one, is between *synapses* and *parameters*. Both represent weighted connections between processing units. The brain has around 100 trillion synapses. GPT-4 has roughly 1.8 trillion parameters. By this measure, the brain still has roughly 50 times more "connection weights" than one of the largest language models ever built.
And even this comparison understates the gap, because a synapse is far more complex than a single floating-point number. Synapses involve neurotransmitter release, receptor binding, temporal dynamics, and structural changes. A single synapse encodes multiple bits of information, possibly as many as 4.7 bits according to a 2015 Salk Institute study, compared to a typical 16 or 32-bit floating-point parameter that serves a much narrower computational role.
## The architecture gap
Beyond raw numbers, the architectures are fundamentally different.
**Energy efficiency.** The human brain runs on about 20 watts, roughly the power of a dim light bulb. Training GPT-4 reportedly cost over \$100 million in compute, and inference still requires substantial energy per query.
**Learning paradigm.** Brains learn continuously from multimodal sensory input, vision, sound, touch, smell, taste, all integrated in real time. LLMs are trained on static text datasets in a fixed training phase. Even with the rise of multimodal AI, the learning process looks nothing like biological development.
**Robustness.** Biological neural networks degrade gracefully. You can lose neurons and still function. Artificial neural networks can be brittle, where small perturbations to inputs (adversarial examples) cause wildly incorrect outputs.
**Parallelism.** The brain processes information through massive parallelism across billions of neurons operating simultaneously. LLMs process tokens sequentially through layers, even if the underlying hardware runs in parallel.
## Why the comparison persists
The neuron-parameter comparison sticks because it offers a simple narrative: AI is catching up to the brain. It gives people a mental model for how powerful these systems are becoming. And it isn't entirely useless. The fact that models with more parameters tend to produce more human-like language outputs (as shown in research from the Flinker Lab at NYU) does suggest some relationship between scale and capability.
But mistaking a loose analogy for an equivalence leads to bad predictions. It makes people either overestimate AI ("it's already as complex as a brain") or underestimate biology ("the brain is just a bigger neural network"). Neither is true.
## What's actually true
Neurons are not parameters. They're closer to entire sub-networks. The brain operates on principles we still don't fully understand, including the roles of glial cells, dendritic computation, spike timing, and neural oscillations, none of which have counterparts in transformer architectures.
LLMs are impressive for what they are: mathematical models that have learned statistical patterns in language at extraordinary scale. But comparing their parameter counts to neuron counts is like comparing the number of transistors in a calculator to the number of cells in a human hand. The numbers might be in the same ballpark someday, but they're measuring fundamentally different things.
The honest answer to "do neurons equal parameters?" is no, not even close. And understanding *why* they're different is far more interesting than pretending they're the same.
## References
1. Azevedo, F.A.C. et al. "Equal numbers of neuronal and nonneuronal cells make the human brain an isometrically scaled-up primate brain." *Journal of Comparative Neurology*, 2009. [https://pubmed.ncbi.nlm.nih.gov/19226510/](https://pubmed.ncbi.nlm.nih.gov/19226510/)
2. Goriely, A. "Eighty-six billion and counting: do we know the number of neurons in the human brain?" *Brain*, 2024. [https://academic.oup.com/brain/article/148/3/689/7909879](https://academic.oup.com/brain/article/148/3/689/7909879)
3. Beniaguev, D., Segev, I., & London, M. "Single cortical neurons as deep artificial neural networks." *Neuron*, 2021. [https://www.quantamagazine.org/how-computationally-complex-is-a-single-neuron-20210902/](https://www.quantamagazine.org/how-computationally-complex-is-a-single-neuron-20210902/)
4. Heilbron, M. et al. "Scale matters: Large language models with billions of parameters better match neural representations of natural language." *eLife*, 2024. [https://elifesciences.org/reviewed-preprints/101204](https://elifesciences.org/reviewed-preprints/101204)
5. Semafor / George Hotz on GPT-4 architecture and estimated 1.8 trillion parameters. [https://explodingtopics.com/blog/gpt-parameters](https://explodingtopics.com/blog/gpt-parameters)
6. Zimmer, C. "100 Trillion Connections." *Scientific American*, 2011. [https://www.scientificamerican.com/article/100-trillion-connections/](https://www.scientificamerican.com/article/100-trillion-connections/)
7. Illing, B. et al. "Study shows that the way the brain learns is different from the way that artificial intelligence systems learn." University of Oxford, 2024. [https://www.ox.ac.uk/news/2024-01-03-study-shows-way-brain-learns-different-way-artificial-intelligence-systems-learn](https://www.ox.ac.uk/news/2024-01-03-study-shows-way-brain-learns-different-way-artificial-intelligence-systems-learn)
8. Jazayeri, M. & Fiete, I. "Study urges caution when comparing neural networks to the brain." MIT News, 2022. [https://news.mit.edu/2022/neural-networks-brain-function-1102](https://news.mit.edu/2022/neural-networks-brain-function-1102)
