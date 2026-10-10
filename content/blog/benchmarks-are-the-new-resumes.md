---
title: "Benchmarks are the new resumes"
date: "2026-03-19"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: []
---

Not long ago, the quickest way to prove you could build software was to show the software. A polished portfolio, a side project with a nice landing page, a GitHub profile full of green squares. That era is fading. When AI can generate a working app in minutes, the finished product alone stops being impressive. What matters now is whether you can prove the thing actually *works*, and how well.
Benchmarks are becoming the new credibility token. Not vanity metrics on a dashboard, but real, measured evidence that a system performs under pressure. The question has shifted from "can you build it?" to "how do you know it's good?"
## "Show me the number" replaced "show me the code"
For years, developers earned trust by shipping code. Open-source contributions, clean pull requests, well-structured repos. These were the signals that someone knew what they were doing.
But code output is getting cheaper by the month. METR's 2025 randomized controlled trial found that experienced open-source developers using AI tools actually took 19% *longer* to complete tasks, yet believed they were 24% faster. By early 2026, METR's follow-up data showed the gap was closing, with some developers now seeing modest speedups. The trajectory is clear: AI-assisted code generation is improving rapidly, and raw code output is becoming commoditized.
When everyone can produce code quickly, the differentiator becomes whether that code does what it claims. A benchmark, an eval, a measured outcome. That's the proof. "Show me the number" is replacing "show me the code."
## Portfolios shifted from pretty apps to measured systems
The traditional developer portfolio was a gallery of projects. A weather app, a to-do list, maybe a blog built with the latest framework. These demonstrated taste and technical range, but they rarely answered the question hiring managers actually care about: does it work reliably, and how do you know?
The shift is already visible. AI coding benchmarks like SWE-bench Verified evaluate agents not by how elegant their code looks, but by whether their patches actually resolve real GitHub issues, verified by running test suites. The same logic is creeping into how people evaluate human work. Leading companies like OpenAI, Anthropic, and Meta are now interviewing engineers on practical, high-stakes capabilities rather than pattern-matching LeetCode problems.
A portfolio that says "I built X" is nice. A portfolio that says "I built X, measured Y, and improved Z by 30%" is compelling. The most interesting developers today don't just ship features. They ship features with evidence attached.
## What you measure reveals your taste
Here's the underappreciated part: benchmarks aren't just proof of competence. They're a window into judgment.
Choosing *what* to measure is a design decision. Someone who benchmarks latency at the 99th percentile is telling you they care about tail-end user experience. Someone who measures cost-per-task is signaling they think about systems holistically. Someone who tracks eval quality over time is showing they understand that performance isn't static.
This is true for AI systems and human work alike. When companies release model benchmarks, the selection of which benchmarks they highlight says as much about their priorities as the scores themselves. The same applies to a developer who includes performance data in a project write-up. The numbers matter, but the choice of numbers matters more.
## The three benchmark sins
Not all benchmarks are created equal. The growing emphasis on measured outcomes comes with predictable failure modes, and recognizing them is itself a signal of sophistication.
**Cherry-picking.** This is the most common sin. Selecting the one metric where your system looks great while ignoring the five where it doesn't. AI companies do this constantly, trumpeting scores on obscure benchmarks while staying quiet about widely-used ones. A 2026 Nature analysis found that many top-tier AI benchmarks fail to even define what they aim to test, making cherry-picking easier. The same temptation applies to personal work. If you only show the metrics that flatter you, sharp reviewers will notice.
**Unclear baselines.** A number without context is just a number. Saying "our system handles 10,000 requests per second" means nothing if you don't specify the hardware, the payload size, or what the previous system achieved. Baselines establish whether a result is actually impressive or just inevitable.
**Hidden costs.** A system that achieves 95% accuracy but costs ten times more to run isn't necessarily better than one at 90% accuracy. Scale AI's SWE-Bench Pro was specifically designed to address this kind of gap, testing AI agents on tasks with real-world ambiguity and unreliable testing environments rather than sanitized problems. The lesson extends beyond AI: any benchmark that ignores tradeoffs is telling an incomplete story.
## Benchmarks that actually matter
If benchmarks are the new credibility currency, which ones are worth earning?
**Latency.** Not average latency, but tail latency. The p95 and p99 numbers reveal how your system behaves when things get hard. Anyone can optimize for the happy path.
**Reliability.** Uptime percentages, error rates, graceful degradation. These show that a system was built to survive contact with real users, not just pass a demo.
**Budget.** What does it cost to run? Cost efficiency is an engineering skill. A solution that works beautifully but bankrupts the team isn't a good solution.
**Eval quality.** Especially relevant for AI systems, this measures whether your evaluation methodology itself is trustworthy. Are your test cases representative? Are you measuring what you think you're measuring? This meta-level rigor is increasingly what separates serious practitioners from hobbyists.
**Repeatability.** Can someone else reproduce your results? Benchmarks that only work in one specific environment, on one specific day, with one specific dataset, aren't really benchmarks. They're anecdotes.
## The job hunting connection
This shift is already reshaping how hiring works. A 2026 Karat survey of 400 engineering leaders found that companies are moving away from algorithmic puzzle interviews toward evaluating practical, measurable engineering capabilities. The question isn't "can you reverse a linked list?" but "can you demonstrate that the system you built actually solved the problem?"
Evidence trails are becoming the expectation. Candidates who can walk through the benchmarks they chose, explain why those metrics mattered, and show how their work moved the numbers have a structural advantage. It's not about having perfect numbers. It's about having *any* numbers, and being able to reason about them clearly.
This doesn't mean people without benchmarks are less capable. In many environments, especially large organizations with limited access to production metrics, individual contributors simply don't have the opportunity to measure their own impact. That's a structural problem, not a personal failing. But for those who can measure, the incentive to do so has never been stronger.
## Agents need evals the same way models do
The benchmarking mindset extends naturally to AI agents. As organizations move from using AI models to deploying AI agents that take actions autonomously, evaluation becomes critical.
IBM and Hebrew University researchers surveyed 120 AI agent evaluation methods and found that the field is still catching up to the complexity of what agents actually do. Traditional model benchmarks test isolated capabilities. Agent evals need to test planning, tool use, error recovery, and multi-step reasoning, all in realistic environments.
This mirrors the shift in human credibility. A model that scores well on a coding benchmark might fail at real software engineering, just as METR's study showed that perceived AI productivity didn't match actual productivity. The same gap exists for agents: benchmarks that look good in isolation often fall apart in production.
The developers and teams that build robust eval pipelines for their agents, measuring not just accuracy but reliability, cost, and user trust, are building the same kind of credibility that measured portfolios provide for individual engineers. The skill of knowing what to evaluate, and doing it honestly, is becoming as valuable as the engineering itself.
## The bottom line
In a world where output is abundant, measurement is the new craft. Benchmarks aren't just validation. They're communication. They tell a potential employer, a collaborator, or a user: I don't just build things. I know whether they work, and I can prove it.
The developers who thrive in this environment won't necessarily be the ones who write the most code or ship the most features. They'll be the ones who chose the right things to measure, measured them honestly, and told a clear story with the results.
## References
1. Becker, J., Rush, N., Barnes, E., & Rein, D. "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity." METR, July 2025. [https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
2. "We are Changing our Developer Productivity Experiment Design." METR, February 2026. [https://metr.org/blog/2026-02-24-uplift-update/](https://metr.org/blog/2026-02-24-uplift-update/)
3. "SWE-bench: Evaluating Large Language Models on Real World Software Issues." Princeton NLP. [https://www.swebench.com/](https://www.swebench.com/)
4. "SWE-bench Verified Technical Report." Verdent AI. [https://www.verdent.ai/blog/swe-bench-verified-technical-report](https://www.verdent.ai/blog/swe-bench-verified-technical-report)
5. "Is your AI benchmark lying to you?" Nature, 2025. [https://www.nature.com/articles/d41586-025-02462-5](https://www.nature.com/articles/d41586-025-02462-5)
6. "SWE-Bench Pro." Scale Labs. [https://labs.scale.com/leaderboard/swe_bench_pro_public](https://labs.scale.com/leaderboard/swe_bench_pro_public)
7. "A 360 Review of AI Agent Benchmarks." IBM Research. [https://research.ibm.com/blog/AI-agent-benchmarks](https://research.ibm.com/blog/AI-agent-benchmarks)
8. "Engineering Interviews in 2026: 3 Trends Hiring Leaders Must Prepare For." Karat, January 2026. [https://karat.com/engineering-interview-trends-2026/](https://karat.com/engineering-interview-trends-2026/)
9. "Evaluating AI Agents in Practice: Benchmarks, Frameworks, and Lessons Learned." InfoQ. [https://www.infoq.com/articles/evaluating-ai-agents-lessons-learned/](https://www.infoq.com/articles/evaluating-ai-agents-lessons-learned/)
