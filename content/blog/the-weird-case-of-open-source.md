---
title: "The weird case of open source"
date: "2026-04-16T12:44:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Open Source","Security","Agents","LLMs","Claude","Anthropic","Microsoft","Google","Apple","Safety"]
pinned: true
---

Open source has always been around. Code has been freely available for decades, governed by licenses that dictate how you can use, modify, and distribute it. But something has shifted. AI has made the cost of shipping code so low that the old reasons for keeping things closed source are starting to fall apart. And yet, at the same time, AI has made open source riskier than ever.
We're in a weird place right now, and I think it's worth unpacking.
## The cost of shipping code has collapsed
The barrier to building software has never been lower. AI coding assistants now generate 30 to 40 percent of enterprise code, according to recent industry analyses. Open source components appear in 98 percent of commercial codebases. The average number of components per application jumped 30 percent year over year in the 2026 OSSRA report, with file counts surging 74 percent.
What this means in practice is that anyone can build things fast. Really fast. When Cluely, a paid AI meeting assistant, launched and gained traction, open source clones appeared within days. Projects like Glass, Pluely, and Natively replicated the core functionality for free, with full transparency and no subscription fees. One of the founders behind an open source alternative even called out Cluely's founder directly, saying "distribution isn't the moat, velocity is."
This pattern keeps repeating. If your product is just code, someone will rebuild it. The question becomes: what's actually defensible?
## The moat is brand, not code
I think the moat has shifted entirely to brand. The code itself just isn't the secret sauce anymore.
Consider what happened with Claude Code. Anthropic kept it closed source, presumably because it was proprietary and valuable. Then on March 31, 2026, a missing `.npmignore` entry accidentally shipped 512,000 lines of unobfuscated TypeScript in an npm package. Within hours, the code was mirrored, dissected, and rewritten in Python and Rust. A clean-room rewrite hit 50,000 GitHub stars in two hours, likely the fastest-growing repository in GitHub's history.
And what did people find inside? It was just another agent harness. Nothing revolutionary. The community reaction was essentially: "That's it?"
The benchmarks tell a similar story. On Terminal Bench 2.0, the agent harness matters as much as the underlying model. The Pilot harness running on Claude Opus 4.6 sits at rank one with 82.9 percent accuracy, while Claude Code's own harness ranks much lower. Three frameworks running identical models scored 17 issues apart on 731 problems in the same test. The scaffolding around the model, not some secret proprietary magic, is what determines performance. And plenty of that scaffolding is open source.
ChatGPT has more daily users than Google Gemini despite comparable model quality. OpenAI owns the "consumer AI assistant" brand. That brand recognition, that default position in people's minds, is worth more than any codebase. Features can be cloned. Interfaces can be duplicated. But the meaning, trust, and identity behind a brand compounds over time in ways that code simply doesn't.
## The security equation has changed
Here's where it gets complicated. While AI has made it trivially easy to ship and replicate code, it has also made it terrifyingly effective at breaking it.
Anthropic's Claude Mythos model, announced in April 2026, can autonomously discover and exploit zero-day vulnerabilities across every major operating system and web browser. Where the previous Claude Opus 4.6 had an exploit development success rate of just over zero percent, Mythos generates a working exploit 72.4 percent of the time. It found bugs that were 10 to 20 years old, including a 27-year-old vulnerability in OpenBSD, an operating system literally known for its security.
Anthropic chose not to release Mythos publicly. Instead, they launched Project Glasswing, a \$100 million defensive coalition with Microsoft, Google, Apple, AWS, CrowdStrike, and others, to help critical infrastructure harden their defenses before similar capabilities inevitably become widely available.
This changes the open source calculus significantly. If your entire codebase is public, AI-powered attackers can analyze it at machine speed to find every exploitable flaw. The 2026 OSSRA report found that the mean number of open source vulnerabilities per codebase has more than doubled, rising 107 percent to an average of 581 vulnerabilities. 87 percent of audited codebases contained at least one vulnerability, and 44 percent contained critical-risk issues that could lead to remote code execution or significant data breaches.
Separate research found that 45 percent of AI-generated code contains security vulnerabilities, and AI-generated code is now the cause of one in five breaches. The pace at which software is created now exceeds the pace at which most organizations can secure it.
## The trust tradeoff
So there are genuinely two sides to this.
On one side, open source builds trust. When you're doing sensitive work like managing data, building AI agents, or handling anything that touches compliance, having your code open means people can verify exactly what it does. There's no black box. No hidden telemetry. No "just trust us." For companies operating under SOC 2 Type 2 compliance or dealing with regulations like the EU Cyber Resilience Act, this transparency isn't just nice to have. It's increasingly becoming a requirement.
The community benefits are real too. Open source means people can help you optimize performance, find bugs, patch vulnerabilities, and extend functionality. The collective intelligence of thousands of developers will always outpace what a closed team can do alone.
On the other side, you're giving attackers a roadmap. Every line of code is a potential attack surface. With AI models that can analyze codebases and generate exploits at superhuman speed, that exposure is more dangerous than it's ever been. The same transparency that builds trust also builds vulnerability.
## Finding the balance
I don't think there's a clean answer here. But I think the direction is becoming clearer.
For most software, especially developer tools, AI frameworks, and infrastructure, the default should probably be open source. The benefits of community contribution, trust, and adoption outweigh the risks, especially since security through obscurity was never a real strategy anyway. The Claude Code leak proved that, if your code is valuable enough, it will be exposed eventually whether you want it to be or not.
The exceptions are narrow but important. Truly novel algorithms, active security mechanisms, and anything where the exposure directly enables exploitation of critical systems might warrant staying closed. But even then, the window of competitive advantage is shrinking fast.
What actually matters now is execution speed, community, distribution, and brand. The code is just the vehicle. If someone can rebuild your product in a weekend with AI, your value was never in the code to begin with.
We're in this strange transition period where the old rules about intellectual property and competitive advantage in software are being rewritten in real time. Open source isn't just a philosophy anymore. In the age of AI, it might be the only honest strategy left.
## References
1. Black Duck, "2026 Open Source Security and Risk Analysis Report" [https://www.blackduck.com/blog/open-source-trends-ossra-report.html](https://www.blackduck.com/blog/open-source-trends-ossra-report.html)
2. The Guardian, "Claude's code: Anthropic leaks source code for AI software engineering tool" [https://www.theguardian.com/technology/2026/apr/01/anthropic-claudes-code-leaks-ai](https://www.theguardian.com/technology/2026/apr/01/anthropic-claudes-code-leaks-ai)
3. Layer5, "The Claude Code Source Leak: 512,000 Lines, a Missing .npmignore, and the Fastest-Growing Repo in GitHub History" [https://layer5.io/blog/engineering/the-claude-code-source-leak-512000-lines-a-missing-npmignore-and-the-fastest-growing-repo-in-github-history](https://layer5.io/blog/engineering/the-claude-code-source-leak-512000-lines-a-missing-npmignore-and-the-fastest-growing-repo-in-github-history)
4. Terminal Bench 2.0 Leaderboard [https://www.tbench.ai/leaderboard/terminal-bench/2.0](https://www.tbench.ai/leaderboard/terminal-bench/2.0)
5. Codegen, "Best AI Coding Agents in 2026: Ranked and Compared" [https://codegen.com/blog/best-ai-coding-agents/](https://codegen.com/blog/best-ai-coding-agents/)
6. Anthropic, "Claude Mythos Preview System Card" [https://www.anthropic.com/claude-mythos-preview-system-card](https://www.anthropic.com/claude-mythos-preview-system-card)
7. Anthropic, "Project Glasswing: Securing critical software for the AI era" [https://www.anthropic.com/glasswing](https://www.anthropic.com/glasswing)
8. The Register, "Anthropic Mythos model can find and exploit 0-days" [https://www.theregister.com/2026/04/07/anthropic_all_your_zerodays_are_belong_to_us/](https://www.theregister.com/2026/04/07/anthropic_all_your_zerodays_are_belong_to_us/)
9. SQ Magazine, "AI Coding Security Vulnerability Statistics 2026" [https://sqmagazine.co.uk/ai-coding-security-vulnerability-statistics/](https://sqmagazine.co.uk/ai-coding-security-vulnerability-statistics/)
10. Hyperlush, "Cluely vs Glass and how Open Source Marketing = Virality" [https://hyperlush.com/cluely-vs-glass/](https://hyperlush.com/cluely-vs-glass/)
11. California Management Review, "The Coming Disruption: How Open-Source AI Will Challenge Closed-Model Giants" [https://cmr.berkeley.edu/2026/01/the-coming-disruption-how-open-source-ai-will-challenge-closed-model-giants/](https://cmr.berkeley.edu/2026/01/the-coming-disruption-how-open-source-ai-will-challenge-closed-model-giants/)
