---
title: "OpenAI bought a conscience"
date: "2026-04-01"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

On March 9, 2026, OpenAI announced it was acquiring Promptfoo, the open-source AI security and evaluation platform used by over 25% of the Fortune 500. Instead of building safety tooling from scratch, OpenAI bought the company that had been stress-testing its models from the outside.
The deal raises a question worth sitting with: what happens when the company being evaluated acquires the evaluator?
## What Promptfoo actually does
Promptfoo started in 2024 as a developer tool for testing AI applications. Co-founders Ian Webster and Michael D'Angelo quickly realized that the hardest problem wasn't prompt quality, it was trust. Security vulnerabilities, safety failures, and unpredictable behavior were the biggest blockers to shipping AI in production, especially at large enterprises.
The platform evolved into a full AI security suite: automated red teaming, prompt injection detection, jailbreak testing, data leakage scanning, and compliance reporting. It supported testing across multiple model providers, including OpenAI, Anthropic, Google, Meta, and others. That model-agnostic stance was a big part of its appeal.
By the time of the acquisition, Promptfoo had 350,000 developers who had used the tool, 130,000 active monthly users, and adoption across more than a quarter of Fortune 500 companies. The 23-person team had raised \$23 million in total funding, including an \$18.4 million Series A in July 2025 led by Insight Partners with participation from Andreessen Horowitz. PitchBook pegged the post-money valuation at roughly \$86 million.
## Why OpenAI wants it
OpenAI is integrating Promptfoo into OpenAI Frontier, its enterprise platform for building and managing AI agents that launched on February 5, 2026. The pitch is straightforward: as companies deploy AI agents into real workflows, they need systematic ways to test agent behavior, detect risks before deployment, and maintain audit trails for governance.
From OpenAI's perspective, this is a smart move. Baking security testing directly into the platform where enterprises build agents removes friction. Customers don't have to stitch together separate tools for development, deployment, and security. It's the same logic that drove Salesforce to embed security into its platform rather than leaving it to third parties.
But there's a second, less discussed benefit. Promptfoo's enterprise customer base, covering over 25% of the Fortune 500, gives OpenAI instant credibility with exactly the buyers it needs to win over for its Frontier platform. This isn't just a technology acquisition. It's a distribution play.
## The watchdog problem
Here's where it gets uncomfortable. Promptfoo's value proposition was built on independence. It tested AI systems from the outside, across multiple providers, with no allegiance to any one model maker. That neutrality was the reason enterprises trusted it.
Now it's owned by one of the model makers it was testing.
OpenAI and Promptfoo both say the open-source project will continue under its current license. But promises to maintain open-source projects after acquisition have a mixed track record. The more relevant question isn't whether the code stays open, it's whether the development roadmap stays neutral.
Will Promptfoo's red teaming tools be as aggressively updated for testing Claude or Gemini as they are for GPT? Will the enterprise version prioritize OpenAI Frontier integrations over competing platforms? These aren't hypothetical concerns. They're structural incentive problems that come with the territory.
## A pattern we've seen before
Big tech acquiring its own oversight tools isn't new. The pattern is well-established, and the outcomes are instructive.
In 2022, Google acquired Mandiant for \$5.4 billion. Mandiant was one of the most respected independent cybersecurity firms in the world, known for uncovering state-sponsored hacking campaigns. After the acquisition, Mandiant was folded into Google Cloud. The brand survived, but the independence didn't. Mandiant's threat intelligence now serves Google's cloud sales motion first.
The more cautionary tale is Meta and CrowdTangle. Meta acquired CrowdTangle in 2016, a tool that journalists and researchers used to track how content spread on Facebook and Instagram. For years, CrowdTangle was the primary way outsiders could hold Meta accountable for the spread of misinformation on its platforms. In August 2024, Meta shut it down entirely. The replacement, Meta Content Library, was restricted to qualified academic researchers, effectively cutting off the journalists and watchdog organizations that had relied on CrowdTangle most.
The pattern is consistent: acquire the tool, integrate it, then gradually shift its purpose from external accountability to internal optimization.
## The neutrality gap
Promptfoo wasn't just a security tool. It was becoming something like a shared evaluation language for the AI industry. Developers building on any model could use the same framework to test for vulnerabilities, compare performance, and document compliance. That kind of neutral infrastructure is rare and valuable.
With Promptfoo inside OpenAI, competitors building on Claude, Gemini, Llama, or Mistral now face an awkward choice: keep using an eval framework owned by a rival, or build their own. Neither option is great. The first requires trusting that OpenAI won't subtly tilt the playing field. The second fragments an ecosystem that benefited from having a common standard.
This is the real cost of the acquisition, not the \$86 million price tag, but the potential loss of a neutral benchmark. If OpenAI controls the eval stack, it becomes harder for anyone to make apples-to-apples comparisons across models. And in a market where enterprise buyers are trying to evaluate which AI platform to bet on, that asymmetry matters.
## The regulatory angle
There's also a governance dimension worth noting. Regulators in the US and EU have been pushing AI companies toward more rigorous safety testing and transparency. Having robust evaluation tools is increasingly a compliance requirement, not just a nice-to-have.
OpenAI acquiring Promptfoo could be read two ways by regulators. Optimistically, it shows OpenAI is investing in safety infrastructure. Skeptically, it looks like a company bringing its own auditor in-house, which is exactly the kind of self-regulation that tends to erode trust over time.
The EU AI Act, for instance, emphasizes the importance of independent third-party auditing for high-risk AI systems. An evaluation framework owned by the model provider it's evaluating may not satisfy that requirement, even if the code is technically open source.
## What this means for the rest of us
The real risk here isn't that OpenAI is acting in bad faith. There are genuine benefits to tighter integration between AI development tools and security testing. Catching vulnerabilities earlier in the development cycle is unambiguously good.
The risk is structural. When the entity building AI systems also controls the tools used to evaluate those systems, the incentives shift in ways that are hard to reverse. It doesn't require malice, just the ordinary gravity of business priorities pulling resources toward internal goals and away from external accountability.
For developers and enterprises currently using Promptfoo, the short-term impact is probably minimal. The open-source tool will likely continue working as it does today. But the long-term trajectory matters. If the best AI security tooling becomes platform-specific rather than platform-agnostic, the entire industry loses a layer of independent verification that it badly needs.
The AI safety community has spent years arguing that security and evaluation need to be treated as first-class concerns, not afterthoughts. Promptfoo was proof that the market agreed. The question now is whether that work is better served inside the walls of the company it was built to scrutinize, or whether something important gets lost in the process.
## References
1. [OpenAI to acquire Promptfoo](https://openai.com/index/openai-to-acquire-promptfoo/), OpenAI, March 9, 2026
2. [Promptfoo is joining OpenAI](https://www.promptfoo.dev/blog/promptfoo-joining-openai/), Promptfoo, March 9, 2026
3. [OpenAI acquires Promptfoo to secure its AI agents](https://techcrunch.com/2026/03/09/openai-acquires-promptfoo-to-secure-its-ai-agents/), TechCrunch, March 9, 2026
4. [OpenAI Acquires Promptfoo To Embed Security Testing Into Its Agents](https://www.forbes.com/sites/janakirammsv/2026/03/10/openai-acquires-promptfoo-to-embed-security-testing-into-its-agents/), Forbes, March 10, 2026
5. [OpenAI to buy cybersecurity startup Promptfoo to safeguard AI agents](https://www.cnbc.com/2026/03/09/open-ai-cybersecurity-promptfoo-ai-agents.html), CNBC, March 9, 2026
6. [OpenAI to Acquire AI Security Startup Promptfoo](https://www.securityweek.com/openai-to-acquire-ai-security-startup-promptfoo/), SecurityWeek, March 11, 2026
7. [OpenAI Acquires Promptfoo, Gaining 25% Foothold in Fortune 500 Enterprises](https://futurumgroup.com/insights/openai-acquires-promptfoo-gaining-25-foothold-in-fortune-500-enterprises/), Futurum Group
8. [Google completes acquisition of Mandiant](https://cloud.google.com/blog/products/identity-security/google-completes-acquisition-of-mandiant), Google Cloud Blog, September 12, 2022
9. [Meta kills off CrowdTangle despite pleas from researchers, journalists](https://apnews.com/article/meta-crowdtangle-research-misinformation-shutdown-facebook-977ece074b99adddb4887bf719f2112a), AP News, August 14, 2024
10. [Meta Is Getting Rid of CrowdTangle, and Its Replacement Isn't as Transparent or Accessible](https://www.cjr.org/tow_center/meta-is-getting-rid-of-crowdtangle.php), Columbia Journalism Review, July 9, 2024
