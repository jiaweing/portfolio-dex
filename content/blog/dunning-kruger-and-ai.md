---
title: "Dunning-Kruger and AI"
date: "2026-05-02T01:01:00.000+08:00"
lastEdited: "2026-05-01T17:19:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["LLMs","Prompt Engineering","Hallucinations","Safety","ChatGPT"]
---

There's a well-known cognitive bias where the less you know about something, the more confident you tend to be. It's called the Dunning-Kruger effect, and for decades it has been one of the most intuitive observations in psychology. We've all seen it: the person who read one article about a topic and now considers themselves an expert.
But something strange is happening. AI tools are rewriting the rules. New research suggests that when people use AI, the classic Dunning-Kruger pattern doesn't just persist, it inverts. Everyone becomes overconfident, and the people who know the most about AI might actually be the worst offenders.
## What the Dunning-Kruger effect actually says
In their original 1999 paper, psychologists David Dunning and Justin Kruger described a consistent pattern: people with low ability in a given domain tend to dramatically overestimate their competence, while highly skilled individuals tend to slightly underestimate theirs. The core problem is metacognitive. To know how bad you are at something, you need enough skill to recognize what good looks like. If you lack that skill, you also lack the ability to see the gap.
The effect has been replicated across domains, from logical reasoning to grammar to emotional intelligence. It's one of those findings that feels obvious once you hear it, yet it catches people off guard in practice.
## The AI reversal
A 2025 study led by Professor Robin Welsch at Aalto University put the Dunning-Kruger effect to the test in the age of AI. Across two experiments involving nearly 700 participants, the researchers had people use ChatGPT to solve logical reasoning problems from the Law School Admission Test (LSAT). The results were striking.
First, the good news: participants who used AI performed about three points better on average compared to a norm population. AI genuinely helped.
But then came the catch. Every group, regardless of skill level, overestimated how well they had done. The classic Dunning-Kruger curve, where low performers are the most overconfident, vanished entirely. Instead, all participants showed inflated self-assessments.
Even more surprising, the people who rated themselves as highly AI-literate were the *most* overconfident. The researchers had expected that people who understood AI better would be better at judging their own performance when using it. The opposite was true.
"We found that when it comes to AI, the DKE vanishes," Welsch explained. "In fact, what's really surprising is that higher AI literacy brings more overconfidence."
## Cognitive offloading and the single-prompt trap
The Aalto study uncovered a behavioral pattern that helps explain why this happens. When the researchers examined how participants actually interacted with ChatGPT, they found that most people rarely prompted the AI more than once per question. They would copy the problem into the chat, get an answer, and accept it without checking or questioning.
This is what researchers call cognitive offloading, the process of outsourcing your thinking to an external tool. It's not new. We've been offloading cognition to calculators, search engines, and GPS systems for years. But AI takes it to a different level because the outputs look and sound like human reasoning. When an AI returns a well-structured, confident-sounding answer, there's very little friction pushing you to question it.
The problem with single-prompt interactions is that they strip away the feedback loops that normally help us calibrate our confidence. When you solve a problem yourself, you feel the friction. You notice when something doesn't quite fit. When AI solves it for you, that friction disappears, and along with it, your ability to accurately gauge how well things went.
"We looked at whether they truly reflected with the AI system and found that people just thought the AI would solve things for them," Welsch said. "Usually there was just one single interaction to get the results, which means that users blindly trusted the system."
## The illusion of competence
This creates what you might call an illusion of competence. AI doesn't just help you perform better, it makes you *feel* like you performed better than you actually did. And unlike traditional tools, AI blurs the line between assistance and replacement in a way that makes it hard to tell where its thinking ends and yours begins.
Consider a practical example. If you use a calculator to do arithmetic, you still understand the problem. You set up the equation, you interpret the result, and you know what the calculator did for you. But when you ask an AI to analyze a contract, draft a strategy, or debug a piece of code, the boundary is fuzzier. Did you understand the reasoning, or did you just read the output and agree with it? The answer matters, but in the moment it's easy to conflate reading with understanding.
This is especially concerning in professional contexts. People are using AI to produce work that looks polished and competent, but the understanding behind that work may be shallow. Over time, this can lead to a kind of de-skilling where people lose the ability to do the work without AI, while simultaneously believing they're getting better at it.
## AI literacy isn't the fix you'd expect
One of the most counterintuitive findings from the research is that AI literacy, knowing how large language models work, understanding prompting techniques, being familiar with AI's limitations, doesn't protect against overconfidence. If anything, it makes it worse.
This challenges a common assumption in education and training circles. The typical response to AI risks is to teach people more about AI. Understand how it works, learn its failure modes, and you'll be better equipped to use it wisely. But the data suggests that technical knowledge about AI doesn't automatically translate into better self-assessment when using it.
The likely explanation is that AI literacy is largely procedural, it teaches you how to use the tool more effectively, but it doesn't build the metacognitive muscle needed to evaluate your own reasoning. Knowing that a language model predicts the next token doesn't help you notice when you've stopped thinking critically about its output.
## What actually helps
If AI literacy alone isn't the answer, what is? The researchers point to metacognition, the ability to think about your own thinking, as the key skill that needs strengthening.
Doctoral researcher Daniela da Silva Fernandes offered a practical suggestion: "AI could ask the users if they can explain their reasoning further. This would force the user to engage more with AI, to face their illusion of knowledge, and to promote critical thinking."
This idea points toward a broader design principle. AI tools could be built to encourage reflection rather than just deliver answers. Some concrete approaches:
- **Ask before answering.** AI could prompt users to form their own hypothesis before providing a solution, anchoring them in their own reasoning first.
- **Multi-turn by default.** Instead of giving complete answers on the first prompt, AI could break problems into steps and ask users to verify each one.
- **Confidence calibration.** AI could ask users to estimate their confidence in a result, then show them how their estimate compared to the actual outcome over time.
- **Show uncertainty.** When AI isn't sure about something, making that uncertainty visible helps users develop better intuitions about when to trust and when to verify.
## The bigger picture
The Dunning-Kruger effect was originally about the limits of self-knowledge. You can't know what you don't know. AI doesn't solve this problem, it transforms it. Instead of ignorance creating overconfidence, convenience does. Instead of low skill being the risk factor, it's high trust.
This matters because we're building a world where AI is embedded in increasingly high-stakes decisions: medical diagnoses, legal analysis, financial planning, hiring. If the people using AI in these domains systematically overestimate the quality of AI-assisted outcomes, the consequences compound. Not because AI is bad at these tasks, but because humans are bad at knowing when AI has gotten it wrong.
The path forward isn't to use AI less. It's to use it more deliberately. That means treating AI outputs as starting points rather than conclusions, building in verification steps, and cultivating the uncomfortable habit of questioning results that look right. It means recognizing that the easier something feels, the more carefully you should check your confidence.
Because the most dangerous form of the Dunning-Kruger effect isn't thinking you know something you don't. It's thinking you understand something just because an AI explained it to you.
## References
1. Kruger, J. & Dunning, D. (1999). "Unskilled and unaware of it: How difficulties in recognizing one's own incompetence lead to inflated self-assessments." *Journal of Personality and Social Psychology*, 77(6), 1121-1134.
2. Welsch, R., da Silva Fernandes, D., et al. (2025). "AI makes you smarter but none the wiser: The disconnect between performance and metacognition." *Computers in Human Behavior*. [Link](https://www.sciencedirect.com/science/article/pii/S0747563225002262)
3. Aalto University. (2025). "AI use makes us overestimate our cognitive performance." [Link](https://www.aalto.fi/en/news/ai-use-makes-us-overestimate-our-cognitive-performance)
4. Li, L.T. et al. (2025). "Artificial Intelligence Promotes the Dunning Kruger Effect." *PubMed*. [Link](https://pubmed.ncbi.nlm.nih.gov/39321356/)
5. RealKM. (2025). "AI is changing the Dunning-Kruger Effect, with higher AI literacy correlating with overestimation of competence." [Link](https://realkm.com/2025/11/19/ai-is-changing-the-dunning-kruger-effect-with-higher-ai-literacy-correlating-with-overestimation-of-competence/)
