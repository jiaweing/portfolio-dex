---
title: "LLMs are smart enough, humans suck"
date: "2026-02-12"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

We keep blaming the models. "ChatGPT hallucinated again." "Claude didn't follow my instructions." "The AI gave me garbage." But here's the uncomfortable truth: in most cases, the model did exactly what you asked. The problem is that what you asked was vague, underspecified, or just plain lazy.
LLMs in 2026 are remarkably capable. They can follow complex multi-step instructions, reason through nuanced problems, and generate structured output in almost any format you want. The bottleneck is no longer the model. It's us.
## The real failure mode is ambiguity
Most people interact with LLMs the way they'd fire off a quick text to a coworker, assuming shared context that doesn't exist. "Summarize this." "Fix the bug." "Write something about cybersecurity." These feel like instructions, but they're closer to wishes. They leave the model guessing at your intent, your audience, your preferred format, and your definition of "good."
The result? Output that technically answers the question but misses the point entirely. And instead of reflecting on the input, we blame the output.
Lakera's 2026 prompt engineering guide puts it bluntly: "Clear structure and context matter more than clever wording. Most prompt failures come from ambiguity, not model limitations." The model isn't broken. Your request is just incomplete.
## You wouldn't hand a contractor a napkin sketch and expect a house
Imagine hiring someone to build you a website and saying, "Make it look good and have some pages." You'd never do that. You'd specify the layout, the audience, the tone, the navigation, the content structure. You'd write requirements.
Yet that's exactly how most people prompt LLMs. They skip the requirements step entirely and then act surprised when the output doesn't match the vision in their head.
Researchers at Carnegie Mellon University studied this gap directly. Their work on Requirement-Oriented Prompt Engineering (ROPE) found that the core skill most people lack isn't "prompt engineering" in the traditional sense (adding role-plays, saying "think step by step," tweaking wording). It's the ability to articulate clear, complete requirements. In a controlled experiment with 30 novices, participants who received training focused on requirement articulation improved their prompt quality by 20%. Those who received conventional prompt engineering training? Just 1%.
The takeaway is striking: the models already know how to follow instructions. Humans just don't know how to give them.
## The five ways we sabotage ourselves
After digging through the research and observing real-world patterns, a few failure modes show up over and over.
### 1. We're too vague
"Summarize this report" is not an instruction. It's an invitation for the model to guess. Summarize for whom? In what format? How long? What matters most? Every piece of missing context is a coin flip the model has to make on your behalf.
### 2. We skip the structure
People write prompts as stream-of-consciousness paragraphs when what the model needs is organized input: context, task, constraints, format. Lakera's guide recommends treating prompt construction the way a designer treats a brief, with labeled sections for the role, the instruction, the context, the examples, and the output constraints. Most people never bother.
### 3. We don't iterate
The CMU study found that novice prompters often give up after one attempt or make random surface-level edits (changing a word here, adding "please" there) without diagnosing what actually went wrong. Experienced users treat prompting like debugging: they identify the gap between expected and actual output, hypothesize which part of the prompt caused it, and fix that specific part.
### 4. We assume the model shares our context
You know what you mean. The model doesn't. It has no access to your mental model, your preferences, your project history, or what happened in last Tuesday's meeting. Every interaction starts from a blank slate unless you explicitly provide the context. Tito S., writing on LinkedIn, compared this to the early days of Boolean search: "Prompt engineering reminds me of Boolean searching, a specialized skill to overcome the communication gap between humans and IR systems."
### 5. We expect magic instead of precision
There's a persistent fantasy that the "right prompt" is some kind of secret incantation. People share "one weird trick" prompt templates and expect miracles. But prompting isn't magic. It's communication. And good communication requires clarity about what you want, who it's for, and how the output should look.
## The models keep getting better, but so does the gap
Here's the irony: as LLMs improve, the human bottleneck becomes more visible, not less. Better models are better at following instructions, which means the quality of your instructions matters more than ever.
The CMU researchers tested this directly. When they switched from GPT-4o to the more advanced o3-mini reasoning model, they found that the improved model's outputs were *more* reflective of the quality of users' explicit requirements, not less. A better engine doesn't help if you can't steer.
Sebastian Raschka, speaking on the state of LLMs in 2025 and 2026, has made a similar point: LLMs give people superpowers, but pure LLM-generated output doesn't replace expert-crafted work. The key variable is the human in the loop, the person who knows what to ask for and how to evaluate what comes back.
## What good looks like
So what does it actually look like to use an LLM well? It's less about tricks and more about discipline.
**Start with requirements, not prompts.** Before you type anything, ask yourself: What exactly do I want? Who is it for? What format should it be in? What should it include and exclude? Write those down. Then turn them into a prompt.
**Be specific about constraints.** "Summarize this in three bullet points, each under 20 words, focusing on business impact" is a vastly better prompt than "summarize this." The model thrives on constraints. Give it guardrails and it will run between them beautifully.
**Provide context explicitly.** Don't assume shared knowledge. If the model needs background, give it background. If the output depends on a particular audience, say so. If there are examples of what "good" looks like, include them.
**Iterate like a debugger, not a gambler.** When the output misses the mark, don't just re-roll the dice. Read the output, identify the specific gap, and adjust the specific part of your prompt that caused it.
**Treat prompting as a skill, not a hack.** The people who get extraordinary results from LLMs aren't using secret prompts. They're thinking clearly about what they want, communicating it precisely, and refining based on feedback. That's a skill. And like any skill, it improves with deliberate practice.
## The uncomfortable conclusion
The gap between what LLMs can do and what most people get from them is enormous. But it's not a technology gap. It's a human one. The models are already good enough for most tasks. We're just not holding up our end of the conversation.
The good news is that this is fixable. You don't need to learn to code. You don't need a PhD in machine learning. You just need to get better at saying what you mean, completely and precisely, to a system that will do exactly what you ask.
The question was never "Are LLMs smart enough?" The question is whether we're willing to put in the effort to use them well.
## References
1. Lakera Team, "The Ultimate Guide to Prompt Engineering in 2026," Lakera Blog, January 2026. [https://www.lakera.ai/blog/prompt-engineering-guide](https://www.lakera.ai/blog/prompt-engineering-guide)
2. Qianou Ma, Weirui Peng, Chenyang Yang, Hua Shen, Kenneth Koedinger, and Tongshuang Wu, "What Should We Engineer in Prompts? Training Humans in Requirement-Driven LLM Use," Carnegie Mellon University, 2025. [https://www.cs.cmu.edu/\~sherryw/assets/pubs/2025-rope.pdf](https://www.cs.cmu.edu/~sherryw/assets/pubs/2025-rope.pdf)
3. Sebastian Raschka, "The State of LLMs 2025: Progress, Problems, and Predictions," Ahead of AI Newsletter, 2025. [https://magazine.sebastianraschka.com/p/state-of-llms-2025](https://magazine.sebastianraschka.com/p/state-of-llms-2025)
4. Tito S., "Prompt engineering reminds me of Boolean searching..." LinkedIn post, 2025. [https://www.linkedin.com/posts/tsierra_prompt-engineering-reminds-me-of-boolean-activity-7405244733138284544-9Zi_](https://www.linkedin.com/posts/tsierra_prompt-engineering-reminds-me-of-boolean-activity-7405244733138284544-9Zi_)
5. Addy Osmani, "My LLM coding workflow going into 2026," Medium, 2025. [https://medium.com/@addyosmani/my-llm-coding-workflow-going-into-2026-52fe1681325e](https://medium.com/@addyosmani/my-llm-coding-workflow-going-into-2026-52fe1681325e)
6. Duke University Libraries, "It's 2026. Why Are LLMs Still Hallucinating?" Duke University Libraries Blogs, January 2026. [https://blogs.library.duke.edu/blog/2026/01/05/its-2026-why-are-llms-still-hallucinating/](https://blogs.library.duke.edu/blog/2026/01/05/its-2026-why-are-llms-still-hallucinating/)
