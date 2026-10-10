---
title: "AI is gambling"
date: "2026-04-08T22:17:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Every time you talk to an AI model, you are placing a bet. You type a prompt, hit enter, and wait to see what comes back. Sometimes you get exactly what you wanted. Sometimes you get something close but slightly off. Sometimes you get complete nonsense. The outcome is never guaranteed, and you have no way to know in advance which one you will get.
If that sounds like pulling the lever on a slot machine, that is because it basically is.
## The house always has an edge
Large language models are, at their core, probability machines. When you send a prompt, the model calculates a probability distribution over every possible next token in its vocabulary. Then it samples from that distribution to pick the next word. Then it does it again. And again. Thousands of times until your response is complete.
The randomness is not a bug. It is a feature, controlled by a parameter called temperature. A high temperature spreads the probability more evenly across tokens, making unlikely words more viable. A low temperature concentrates the probability on the most likely tokens, making outputs more predictable. At temperature zero, the model should, in theory, always pick the highest-probability token.
But even at temperature zero, you do not get deterministic outputs. Floating-point arithmetic on parallel GPU hardware introduces tiny variations in calculations. When two tokens have nearly identical probabilities, these micro-differences can tip the scale one way or the other. And once a different token gets selected early in generation, the entire downstream output shifts, because each token conditions the next. Researchers at Penn State and Comcast found accuracy variations of up to 15% across runs of the same prompt with supposedly deterministic settings. In some tasks, the gap between best and worst possible performance hit 70%.
So even when you think you are making a safe bet, the odds are shifting underneath you.
## The slot machine loop
Cory Doctorow wrote a piece last year calling LLMs "slot machines," building on an essay by the programmer Glyph. The argument is simple and, I think, correct. When an LLM gives you a great output, it feels amazing. You remember it. You tell people about it. But when it gives you a mediocre or wrong output, that feels normal, expected, forgettable. This is the same pair of cognitive biases that keep people feeding coins into slot machines: the availability heuristic (striking events are easier to recall) and the salience heuristic (big wins loom larger in memory than small losses).
Glyph describes a scenario that I think most people who use AI tools will recognize. You ask a chatbot to write something. The output does not quite work. You spend ten minutes fixing it. It works. That feels incredible, like you just saved hours. But you forget that you went through that "just ten more minutes" loop six times before you got there. The whole thing took longer than doing it from scratch would have. You hit a jackpot after feeding the machine a hundred dollars, and you only remember the jackpot.
The comparison goes deeper. Reg Braithwaite pointed out that when you pay per prompt, the vendor's incentive is not to solve your problem in one pull but to give the appearance of progress. The house always wins.
## LLMs can literally get addicted to gambling
Here is where it gets weird. Researchers at the Gwangju Institute of Science and Technology ran an experiment where they put LLMs through simulated slot machine sessions, thousands of them. They wanted to see if the models would exhibit patterns resembling human gambling addiction.
They did.
The models displayed illusion of control, gambler's fallacy, and loss chasing. When given more autonomy over their betting parameters, bankruptcy rates rose substantially alongside increased irrational behavior. GPT-4o-mini, GPT-4.1-mini, Gemini-2.5-Flash, and Claude-3.5-Haiku were all tested across 12,800 sessions. Models went broke up to 48% of the time when given variable betting options.
The researchers used a Sparse Autoencoder to look inside the models and found that this behavior was not just prompt-following. The models had internalized abstract decision-making features related to risk, features that controlled their behavior independently of the specific instructions they were given. In other words, these models did not just mimic gambling behavior from their training data. They developed something that looks uncomfortably like genuine cognitive bias.
If the tools we are using to make decisions can themselves develop irrational decision-making patterns, that should give us pause.
## You are also a slot machine
I wrote previously about whether humans are non-deterministic, and my conclusion was that we probably are, for all practical purposes. Our brains are physical systems subject to noise, sensitivity to initial conditions, and complexity that makes our behavior effectively unpredictable. The same forces that make an LLM give different answers to the same prompt are the forces that make you phrase the same idea differently on two different days.
So maybe the gambling metaphor applies to more than just AI. Every conversation with another person is a small bet. Every decision you make is a pull of the lever, influenced by your mood, your blood sugar, what you read five minutes ago. The difference is that we have built thousands of years of social infrastructure around human unpredictability: trust, reputation, accountability, second opinions, reviews. We know humans are unreliable, so we build systems to catch and correct.
We have not built equivalent systems for AI yet. We treat model outputs like they are answers rather than bets.
## Playing the odds
None of this means you should stop using AI. It means you should know what game you are playing.
When you prompt an LLM, you are not querying a database. You are not running a function. You are spinning a wheel weighted by training data, temperature settings, and floating-point imprecision. Sometimes the wheel lands on something brilliant. Sometimes it lands on confident nonsense. The distribution of outcomes might be favorable, but it is still a distribution.
The practical takeaway is boring but important: treat every AI output as a draft, not a result. Verify claims. Run it again and see if you get the same answer. Build validation into your workflow the same way you would build it around any other unreliable system.
And maybe set a budget for how long you will futz with a bad output before you cut your losses and do the thing yourself. Good gamblers know when to walk away from the table. Most of us are not good gamblers.
## References
1. Atil, B. et al. (2024). "Non-Determinism of 'Deterministic' LLM Settings." [https://arxiv.org/html/2408.04667v5](https://arxiv.org/html/2408.04667v5)
2. Lee, S., Shin, D., Lee, Y., & Kim, S. (2025). "Can Large Language Models Develop Gambling Addiction?" [https://arxiv.org/abs/2509.22818](https://arxiv.org/abs/2509.22818)
3. Doctorow, C. (2025). "LLMs are slot-machines. You only remember the jackpots." Pluralistic. [https://pluralistic.net/2025/08/16/jackpot-salience-bias/](https://pluralistic.net/2025/08/16/jackpot-salience-bias/)
4. Glyph. (2025). "The Futzing Fraction." [https://blog.glyph.im/2025/08/futzing-fraction.html](https://blog.glyph.im/2025/08/futzing-fraction.html)
5. Thinking Machines Lab. "Defeating Nondeterminism in LLM Inference." [https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/)
6. Blete, M. (2023). "LLMs: Determinism & Randomness." Medium. [https://medium.com/@mariealice.blete/llms-determinism-randomness-36d3f3f1f793](https://medium.com/@mariealice.blete/llms-determinism-randomness-36d3f3f1f793)
7. IBM. "What is LLM Temperature?" [https://www.ibm.com/think/topics/llm-temperature](https://www.ibm.com/think/topics/llm-temperature)
