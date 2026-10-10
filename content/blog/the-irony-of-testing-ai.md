---
title: "The irony of testing AI"
date: "2026-04-21"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["LLMs","Testing","Hallucinations"]
---

Every time we send a prompt to an LLM, we're rolling the dice. The same input, the same model, the same temperature setting, and yet the output can be different each time. That's the nature of non-deterministic systems. And somehow, the way we've decided to test these systems is by expecting them to behave deterministically.
I find this genuinely funny. We've built the most unpredictable text generators in history, and our primary quality assurance strategy boils down to: "Did it say the right thing this time?"
## The evaluation paradox
Traditional software testing works because software is deterministic. You give a function an input, you get a predictable output, and you write a test that checks for it. If the test passes today, it passes tomorrow. Simple.
LLMs broke that contract. You can ask GPT the same question twice and get two different answers, both perfectly reasonable, both technically correct, both phrased completely differently. So how do you write a test for that? You can't just assert that the output equals some expected string. You need something fuzzier, something that understands whether the response is "good enough."
And here's where it gets truly absurd.
## Using a coin flip to judge a coin flip
The industry's most popular solution to the evaluation problem is called "LLM-as-a-judge." The idea is straightforward: you use one LLM to evaluate the output of another LLM. You prompt a model, typically something powerful like GPT-4, to act as a grader. It reads the output, considers some criteria, and assigns a score or a verdict.
Think about that for a second. We're using a non-deterministic system to judge the output of another non-deterministic system, and then we treat the result as ground truth. It's like asking one lottery player to verify whether another lottery player's ticket is a winner, without checking the actual numbers.
Researchers have found that LLMs are actually worse at evaluating answers than they are at generating them. A 2024 paper from Seoul National University called this "The Generative AI Paradox," showing that models exhibit significantly lower performance on evaluation tasks compared to generation tasks. The models can produce great answers but can't reliably tell you whether an answer is great.
## The biases run deep
It gets worse. LLM judges don't just produce inconsistent scores, they produce systematically biased ones. Research from Weights & Biases and others has documented several recurring problems:
- **Position bias**: The judge tends to prefer whichever response it sees first (or second, depending on the model), regardless of actual quality.
- **Verbosity bias**: Longer responses get rated higher, even when the shorter one is more accurate and more helpful.
- **Self-enhancement bias**: Models rate their own outputs higher than outputs from other models.
These aren't edge cases. They're consistent patterns that distort evaluation results at scale. A study on expert knowledge tasks found that subject matter experts only agreed with LLM judges about 64 to 68 percent of the time. That means roughly a third of the time, the LLM judge is just wrong, at least by human expert standards.
## The feedback loop problem
Here's the part that keeps me up at night. If we use LLM-as-a-judge to evaluate our models, and then use those evaluation scores to fine-tune our models, we're creating a closed feedback loop. The models learn to produce outputs that score well with the judge, not outputs that are actually good. Over time, the models optimize for pleasing another model rather than being useful to humans.
This is essentially Goodhart's Law applied to AI: once the metric becomes the target, it stops being a good metric. When your judge is an LLM, the models learn the judge's preferences and biases. They learn to be verbose because the judge likes verbosity. They learn to hedge and qualify because the judge rewards hedging. The system converges on outputs that game the evaluation, not outputs that serve the user.
## So what actually works?
I'm not saying we should throw out automated evaluation entirely. The scale problem is real. You can't have humans review every single output from a production system processing millions of requests. But we need to be honest about what LLM-as-a-judge actually gives us: a rough, biased, non-deterministic approximation of quality.
Some approaches that seem more promising:
- **Binary verdicts over numeric scores**: Instead of asking a judge to rate something on a scale of 1 to 10, ask specific yes-or-no questions. "Does this response contain a hallucinated fact?" "Does this directly answer the user's question?" Research from Galileo AI found that this approach, combined with polling multiple times (a technique called ChainPoll), improved accuracy by 23 percent over single-shot scoring.
- **Decomposed evaluation**: Break the assessment into concrete, measurable dimensions. Factual accuracy, relevance, completeness, tone. Each one can be evaluated independently, and many can use deterministic checks rather than LLM judgments.
- **Human-in-the-loop calibration**: Use LLM judges for scale, but regularly calibrate them against human expert evaluations. When the judge and the humans diverge, trust the humans and retune the judge.
- **Statistical acceptance testing**: Instead of checking individual outputs, evaluate distributions. Run the same prompt 50 times and check whether the distribution of outputs meets your quality threshold. Accept the non-determinism instead of fighting it.
## Accepting the uncertainty
I think the deeper issue is philosophical. We want AI systems to be testable the way software is testable. We want clean pass/fail results. We want CI/CD pipelines with green checkmarks. But LLMs aren't software in the traditional sense. They're closer to creative collaborators, and evaluating a creative collaborator's work has always been subjective, contextual, and messy.
The irony isn't just that we're testing non-deterministic systems with non-deterministic judges. It's that we're so uncomfortable with uncertainty that we'd rather have a confident but unreliable automated score than sit with the ambiguity. We'd rather pretend the problem is solved than do the harder work of defining what "good" actually means for each specific use case.
Maybe the first step is admitting that LLM evaluation is genuinely hard, that there's no clean solution, and that anyone selling you a fully automated eval pipeline is probably oversimplifying the problem. The best evaluation strategy might just be accepting that you're gambling, and learning to manage the odds instead of pretending they don't exist.
## References
1. Woo, S., et al. "The Generative AI Paradox on Evaluation: What It Can Solve, It May Not Evaluate." [arXiv:2402.06204](https://arxiv.org/abs/2402.06204), 2024.
2. Raju, K., et al. "Limitations of the LLM-as-a-Judge Approach for Evaluating LLM Outputs in Expert Knowledge Tasks." [ACM IUI 2025](https://dl.acm.org/doi/10.1145/3708359.3712091), 2025.
3. Munro, K. "LLMs as Judges: Practical Problems and How to Avoid Them." [katherine-munro.com](http://katherine-munro.com), 2024.
4. "Exploring LLM-as-a-Judge." [Weights & Biases](https://wandb.ai/site/articles/exploring-llm-as-a-judge/), 2024.
5. "Are You Making These 7 LLM-as-a-Judge Mistakes?" [Galileo AI](https://galileo.ai/blog/why-llm-as-a-judge-fails), 2024.
6. "LLM-as-a-judge: A Complete Guide to Using LLMs for Evaluations." [Evidently AI](https://www.evidentlyai.com/llm-guide/llm-as-a-judge), 2025.
7. Orosz, G. and Husain, H. "A Pragmatic Guide to LLM Evals for Devs." [The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/evals), 2025.
8. Huang, J. "Evaluating Large Language Model Systems: Metrics, Challenges, and Best Practices." [Microsoft Data Science Blog](https://medium.com/data-science-at-microsoft/evaluating-llm-systems-metrics-challenges-and-best-practices-664ac25be7e5), 2024.
