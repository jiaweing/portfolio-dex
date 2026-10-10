---
title: "10 trillion parameters solved nothing"
date: "2026-04-14"
lastEdited: "2026-04-29T12:47:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Models","LLMs","Anthropic","Claude","OpenAI","Security","Safety","Vibe Coding","Coding"]
---

Claude Mythos 5 shipped with 10 trillion parameters. It is the biggest model ever released. And it still fails 51% of security tests. More parameters was supposed to be the answer. It wasn't.
For years, the AI industry has operated on a simple bet: scale up, and everything gets better. More data, more compute, more parameters, more capability. The scaling laws said so. And to be fair, they delivered. GPT-2 had 1.5 billion parameters in 2019. GPT-4 hit an estimated 1.8 trillion in 2023. Now Anthropic has crossed the 10 trillion threshold, a 1,200x increase in just six years.
But here is the uncomfortable truth the benchmarks are finally making visible: bigger does not mean safer. And in a world where AI writes more and more of our code and infrastructure, that gap between capability and security is not just an academic concern. It is a liability.
## The numbers that matter
In April 2026, Radical Data Science published a comparative security analysis of new-generation LLMs. The findings were stark. Anthropic's Claude Opus 4.1 passed only 49% of security tests, the worst performance in the cohort. Four more models, all from Claude and Qwen3, scored just 50 out of 100.
The highest security score? OpenAI's GPT-5 Mini, at 72%. The *smallest* new model in the lineup outperformed every larger one on the metric that arguably matters most.
Let that sink in. The model with a fraction of the parameters, a fraction of the compute budget, and a fraction of the energy footprint achieved the best security results. Not by a slim margin, but by a wide one.
## Scaling laws were never about safety
The original scaling laws, first described by Kaplan et al. at OpenAI in 2020 and later refined by DeepMind's Chinchilla research in 2022, describe how model performance (measured by loss) improves as you increase parameters, training data, and compute. They are empirical power-law relationships, and they hold up remarkably well for what they measure.
But what they measure is *loss on next-token prediction*. Not safety. Not security. Not the ability to avoid generating exploitable code. These are fundamentally different objectives, and there is no scaling law that says increasing parameters will solve them.
As TechCrunch reported in late 2024, AI scaling laws were already showing diminishing returns, forcing labs to change course. MIT researchers found in January 2026 that "meek" models trained with limited resources were approaching the performance of frontier models, because the gap between high-budget and low-budget systems narrows as top models hit decreasing returns to compute.
The scaling hypothesis is being stress-tested in real time. And the results suggest that the relationship between parameter count and real-world utility is far more nuanced than the industry narrative would have you believe.
## The paradox of capability without safety
Claude Mythos Preview is, by published benchmarks, extraordinarily capable. It scores 93.9% on SWE-bench Verified. It hit 97.6% on the USAMO math olympiad. It autonomously discovered zero-day vulnerabilities in every major operating system and every major web browser. Anthropic's own red team documented thousands of high-severity findings, including a 27-year-old bug in OpenBSD and a 16-year-old bug in FFmpeg.
This is genuinely impressive work, and Anthropic deserves credit for both the capability and the transparency. But here is the catch: fewer than 1% of the vulnerabilities Mythos found have actually been fixed. The bottleneck was never finding bugs. It was always the human capacity to review, prioritize, and deploy patches.
A model that discovers security flaws ten times faster does not help much if the humans on the other end are already overwhelmed. And a model that generates insecure code at scale makes the problem worse, not better.
## Vibecoding is amplifying the problem
This brings us to what might be the most consequential issue: the security of AI-generated code itself.
The term "vibecoding" has come to describe the practice of using AI assistants to generate code through natural language prompts with minimal manual review. It feels productive. It is productive, at least by the metric of lines shipped. One financial services company reported going from 25,000 lines of code per month to 250,000 after adopting AI coding tools. That is a 10x increase in output.
But Veracode's 2025 GenAI Code Security Report, which analyzed over 100 LLMs across 80 real-world tasks, found that 45% of AI-generated code contains OWASP Top 10 vulnerabilities. A CodeRabbit analysis of 470 open-source GitHub pull requests showed AI-authored code produced 2.74 times more security vulnerabilities than human-written code. An audit of 1,645 web applications generated by AI tools found 10% had critical vulnerabilities exposing user data.
And here is the key insight from the research: models are not getting better at security. Newer, larger LLMs generate syntactically correct code but still produce the same security flaws. The problem is systemic, not a scaling issue. Bigger models do not equal more secure code.
This means the better AI gets at writing code that *works*, the more dangerous it becomes if that code is not *safe*. The capability scales. The security does not.
## The economics do not add up either
10 trillion parameters is not just a technical achievement. It is an economic statement. Training a model at that scale requires extraordinary amounts of compute, energy, and capital. The inference costs are proportionally higher. Every query to a 10-trillion-parameter model burns more electricity and costs more money than a query to a model one-tenth its size.
If the marginal improvement in security from those extra parameters is zero, or even negative, who is paying for it and why?
The industry has been optimizing for capability benchmarks: coding tasks, math competitions, reasoning puzzles. These are the numbers that make headlines and drive adoption. Security benchmarks? Those get buried in appendices. The incentive structure is misaligned, and the result is predictable: models that ace the tests we celebrate and fail the tests that matter for production systems.
## What actually works
The GPT-5 Mini result is not a fluke. It points to something the research community has been saying quietly for a while: for many practical applications, the best model for the job is not the biggest one. It is the smallest one that works.
Smaller models can be more thoroughly tested. They are cheaper to run, easier to audit, and faster to iterate on. When security is a priority, these properties matter more than raw parameter count.
For teams building production systems in 2026, the practical takeaway is straightforward:
- **Pick models based on security scores, not parameter counts.** If GPT-5 Mini passes 72% of security tests and a 10-trillion-parameter model passes 49%, the choice is obvious.
- **Treat AI-generated code as untrusted by default.** The 45% vulnerability rate means every line needs review, regardless of which model wrote it.
- **Invest in review capacity, not just generation speed.** The bottleneck is not writing code. It is catching the bugs that AI introduces.
- **Watch the security benchmarks, not just the capability ones.** A model that scores 93% on SWE-bench but fails half of security tests is a risk, not an asset, in production.
## The real question
The scaling hypothesis was never wrong, exactly. More parameters do unlock new capabilities. Claude Mythos can do things no smaller model can do. That is real.
But the hypothesis was incomplete. It assumed that capability improvements would generalize across all dimensions that matter, including safety and security. The 2026 data says otherwise. Capability and security are decoupled. You can have a model that is breathtakingly smart and fundamentally unsafe at the same time.
10 trillion parameters proved we can build bigger. The 49% security pass rate proved that bigger, on its own, solves nothing. The next chapter of AI progress will not be about who builds the largest model. It will be about who builds the most trustworthy one.
## References
1. [AI News Briefs Bulletin Board for April 2026](https://radicaldatascience.wordpress.com/2026/04/09/ai-news-briefs-bulletin-board-for-april-2026/), Radical Data Science
2. [New AI Model Releases April 2026](https://blog.mean.ceo/new-ai-model-releases-news-april-2026/), [mean.ceo](http://mean.ceo)
3. [Assessing Claude Mythos Preview's cybersecurity capabilities](https://red.anthropic.com/2026/mythos-preview/), Anthropic Red Team
4. [What Is Claude Mythos, And Why Anthropic Won't Let Anyone Use It](https://www.forbes.com/sites/jonmarkman/2026/04/08/what-is-claude-mythos-and-why-anthropic-wont-let-anyone-use-it/), Forbes
5. [Claude Mythos 5: The First 10-Trillion-Parameter Model](https://medium.com/ai-analytics-diaries/claude-mythos-5-the-first-10-trillion-parameter-model-scaling-laws-hit-a-new-milestone-fa542be336f8), AI & Analytics Diaries
6. [Claude Mythos Might Break Cybersecurity, But Not in the Way You Think](https://medium.com/@ricardomsgarces/claude-mythos-might-break-cybersecurity-but-not-in-the-way-you-think-d5c64ecbbd3b), Ricardo Garcês
7. [How AI is getting better at finding security holes](https://www.npr.org/2026/04/11/nx-s1-5778508/anthropic-project-glasswing-ai-cybersecurity-mythos-preview), NPR
8. [AI Scaling Laws Are Showing Diminishing Returns](https://techcrunch.com/2024/11/20/ai-scaling-laws-are-showing-diminishing-returns-forcing-ai-labs-to-change-course/), TechCrunch
9. [Why "Meek," Low-Budget Models Could Soon Match Frontier Models](https://ide.mit.edu/wp-content/uploads/2026/01/Meek_Models_Jan2026.pdf), MIT IDE
10. [Vibe Coding Has A Massive Security Problem](https://www.forbes.com/sites/jodiecook/2026/03/20/vibe-coding-has-a-massive-security-problem/), Forbes
11. [The Big Bang: A.I. Has Created a Code Overload](https://www.nytimes.com/2026/04/06/technology/ai-code-overload.html), The New York Times
12. [Bad Vibes: AI-Generated Code is Vulnerable, Researchers Warn](https://www.cc.gatech.edu/news/bad-vibes-ai-generated-code-vulnerable-researchers-warn), Georgia Tech
13. [GPT-5 Mini Security Report](https://promptfoo.dev/models/reports/gpt-5-mini), Promptfoo
14. [International AI Safety Report 2026](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026), International AI Safety Report
