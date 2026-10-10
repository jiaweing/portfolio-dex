---
title: "GitHub is the issue"
date: "2026-05-02T13:52:00.000+08:00"
lastEdited: "2026-05-02T06:20:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Microsoft","Security","Open Source","JavaScript","TypeScript","DevTools","Coding","OpenAI","Claude","Agents"]
---

Every developer tool I reach for, every package I install, every CI pipeline I trigger, all roads lead back to the same company, the same platform. And if you actually look at what's been happening, GitHub isn't just the center of the developer world. It's becoming the single point of failure for it.
I'm not talking about some theoretical risk. I'm talking about the last year and a half of escalating supply chain attacks, catastrophic downtime, critical vulnerabilities, and a growing exodus of developers who've finally had enough. The common thread? It's GitHub. And behind GitHub, it's Microsoft.
## The supply chain is on fire
Let's start with the attacks, because the sheer volume is staggering.
In March 2025, the widely used GitHub Action `tj-actions/changed-files` was compromised (CVE-2025-30066). Over 23,000 repositories relied on this action. Attackers hijacked a maintainer's personal access token and modified version tags to point at a malicious commit that exfiltrated secrets from CI/CD pipelines, including API keys, npm tokens, and private RSA keys. CISA issued an alert. The compromise was linked to another hijacked action, `reviewdog/action-setup`, meaning the blast radius extended well beyond a single tool.
Then in September 2025, one of the largest npm supply chain attacks in history hit. The maintainer account behind `chalk` (299 million weekly downloads) and `debug` (357 million weekly downloads) was hijacked via a phished TOTP code. Eighteen packages total were compromised with crypto-stealing malware. The attack window was only about two and a half hours, but the packages involved had billions of cumulative downloads. The maintainer, Josh Goldberg (known as Qix), later spoke publicly about how the attack bypassed MFA because time-based one-time passwords aren't phishing-resistant.
In 2026, the hits kept coming. The Trivy supply chain attack cascaded into Checkmarx's KICS open source project, allowing attackers to hijack dozens of GitHub Action version tags. Checkmarx confirmed data was stolen from their GitHub environment. SAP-related npm packages were compromised with credential-stealing malware. The Axios library, one of the most popular HTTP clients in JavaScript, had compromised versions briefly published through npm after its lead maintainer's account was hijacked. And in late April 2026, CVE-2026-3854 dropped, a critical remote code execution vulnerability (CVSS 8.7) found by Wiz in GitHub's internal Git infrastructure, affecting both [GitHub.com](http://GitHub.com) and GitHub Enterprise Server. A simple `git push` could have been turned into an RCE vector.
That last one exposed millions of repositories.
## The uptime problem
If the security story isn't enough, let's talk about reliability.
GitHub's uptime has been declining for years, but 2025 and 2026 have been particularly brutal. According to an unofficial "Missing GitHub Status Page" maintained by Marek Šuppa (because GitHub's own status page stopped showing aggregate uptime numbers years ago), uptime dropped below 90% in 2025. By April 2026, it was below 85%.
Let that sink in. The platform that most of the world's software developers depend on for their daily work can't maintain two nines of availability.
In February 2026, GitHub experienced two related periods of degraded availability affecting nearly every service, including the API, Actions, Git operations, Copilot, Issues, pull requests, webhooks, and Codespaces. Users couldn't push or pull code for nearly three hours. In March 2026, four separate incidents caused degraded performance. In late April 2026, GitHub had four major incidents in just four days. Thousands of repositories couldn't merge pull requests. On April 27, an Elasticsearch cluster became overloaded, likely from a botnet attack, breaking search across the UI.
GitHub's own leadership acknowledged the problem in a public post, admitting they started planning for a 10x capacity increase in October 2025, but by February 2026 realized they actually needed 30x. The stated reason? Agentic AI development workflows that "accelerated sharply" starting in late December 2025. Repository creation, pull request activity, API usage, and automation workloads all surging at once.
The developer community's response has been skeptical. As one commenter on Hacker News put it: "GitHub is claiming that a usage spike in 2026 is the cause of availability issues in 2025, so their explanation is clearly incomplete at best."
## Ghostty and the exodus
The most visible departure came on April 28, 2026, when Mitchell Hashimoto, co-founder of HashiCorp and creator of Terraform, announced that his terminal emulator project Ghostty would be leaving GitHub.
Hashimoto, GitHub user number 1299 since February 2008, had been keeping a daily journal marking every date a GitHub outage disrupted his work. Almost every day had an outage marked. On the day he published his announcement, GitHub Actions was down for two hours.
"This is no longer a place for serious work," he wrote.
Hashimoto isn't alone. Before Ghostty's departure, the Zig programming language had already quit GitHub, citing Microsoft's AI obsession as having "ruined the service." The pattern is clear: projects that take reliability seriously are finding that GitHub can no longer deliver it.
## No one is at the wheel
Here's a detail that makes everything above feel even more precarious. GitHub doesn't have a CEO right now.
Thomas Dohmke, GitHub's CEO since 2021, announced his departure in August 2025. He stayed on through the end of 2025 to help guide the transition, then left to become a startup founder again. That part is normal. Executives leave companies all the time.
What isn't normal is what Microsoft did next, which was nothing. They didn't replace him.
Instead, GitHub was folded into Microsoft's CoreAI division. The remaining leadership team now reports directly into CoreAI rather than to a dedicated GitHub CEO. After nearly seven years of operating as a semi-autonomous unit inside Microsoft, GitHub's independent identity is effectively over. There's no single person whose job is to think about GitHub as GitHub, with its own roadmap, its own priorities, and its own answer to questions like "should we invest in reliability before features."
Now think about the timing. The CEO announced his exit in August 2025 and was gone by year end. The catastrophic uptime drops, the four-incidents-in-four-days streak, the Elasticsearch outage, the CVE-2026-3854 RCE, all of it happens in the months immediately after. GitHub's own leadership admitted they had to revise their capacity planning from 10x to 30x because agentic AI workloads "accelerated sharply" in late December 2025, right in the middle of a leadership transition where the top job was being eliminated rather than refilled.
Critical infrastructure needs someone whose entire job is to care about it. GitHub no longer has that person. It has a leadership team reporting up into a division focused on Microsoft's broader AI strategy, where GitHub is one piece of a much larger portfolio that includes Copilot, Azure AI, and OpenAI integrations. When the priorities of the parent organization conflict with the priorities of keeping the platform reliable, there's no longer a CEO whose mandate is to fight for the latter.
This isn't a coincidence sitting next to the reliability problems. It's a structural cause of them.
## Microsoft owns the whole stack
Here's the part that makes all of this feel systemic rather than incidental.
Microsoft acquired GitHub in 2018 for \$7.5 billion. GitHub had acquired npm in 2020. Microsoft also develops TypeScript, maintains VS Code (the most popular code editor in the world), owns LinkedIn (where developers build professional profiles), and has a massive investment in OpenAI, which powers GitHub Copilot.
Think about what that means. The place where you host your code (GitHub), the registry where you publish and install packages (npm), the language many of those packages are written in (TypeScript), the editor you write code in (VS Code), the AI assistant that autocompletes your code (Copilot), and increasingly the CI/CD system that builds and deploys it (GitHub Actions), all of it traces back to Microsoft.
This isn't inherently evil. Microsoft has invested heavily in open source and developer tools. But the concentration of control creates a fragility that we're now seeing play out in real time. When npm gets hit by a supply chain attack, the blast radius is enormous because npm is the registry for the JavaScript ecosystem, which is the largest package ecosystem in the world. When GitHub Actions gets compromised, thousands of CI/CD pipelines leak secrets. When GitHub goes down, the entire global software development workflow grinds to a halt.
The 29 million secrets leaked on GitHub in 2025, a 34% year-over-year increase, with AI-generated code making the problem worse. Commits built with Claude Code leaked secrets at roughly twice the baseline rate. The tools Microsoft is promoting (Copilot, AI-assisted development) are actively contributing to the security problems on the platform Microsoft owns.
## What this actually means
I'm not saying everyone should abandon GitHub tomorrow. There's no alternative that matches its combination of features, community, and network effects. That's precisely the problem.
When a single platform becomes critical infrastructure for the global software industry, it needs to operate like critical infrastructure. That means investing in reliability before features, treating security as a first principle rather than a response to incidents, and being transparent about the actual state of the platform rather than hiding uptime numbers.
The developer community has been remarkably patient. But patience has limits. When the co-founder of HashiCorp says your platform isn't suitable for serious work, when your uptime drops below what most developers would accept from a side project, when supply chain attacks hit your ecosystem so frequently they blend together, something fundamental needs to change.
GitHub is still the center of the developer universe. But right now, that center isn't holding.
## References
1. [CISA Alert: Supply Chain Compromise of tj-actions/changed-files (CVE-2025-30066)](https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction)
2. [Wiz: GitHub Action tj-actions/changed-files Supply Chain Attack](https://www.wiz.io/blog/github-action-tj-actions-changed-files-supply-chain-attack-cve-2025-30066)
3. [Upwind: npm Supply Chain Attack, Compromise of debug, chalk, and 16 Other Packages](https://www.upwind.io/feed/npm-supply-chain-attack-massive-compromise-of-debug-chalk-and-16-other-packages)
4. [Palo Alto Networks: Widespread npm Supply Chain Attack](https://www.paloaltonetworks.com/blog/cloud-security/npm-supply-chain-attack/)
5. [SecurityWeek: Critical GitHub Vulnerability Exposed Millions of Repositories (CVE-2026-3854)](https://www.securityweek.com/critical-github-vulnerability-exposed-millions-of-repositories/)
6. [Checkmarx: Supply Chain Security Incident Update](https://checkmarx.com/blog/supply-chain-security-incident-update/)
7. [Microsoft Security Blog: Mitigating the Axios npm Supply Chain Compromise](https://www.microsoft.com/en-us/security/blog/2026/04/01/mitigating-the-axios-npm-supply-chain-compromise/)
8. [The Register: GitHub Says Sorry and Vows to Do Better as Uptime Slips](https://www.theregister.com/2026/04/29/github_says_sorry_and_says/)
9. [GitHub Blog: An Update on GitHub Availability](https://github.blog/news-insights/company-news/an-update-on-github-availability/)
10. [The Missing GitHub Status Page](https://mrshu.github.io/github-statuses/)
11. [GitHub Blog: Availability Report, February 2026](https://github.blog/news-insights/company-news/github-availability-report-february-2026/)
12. [Mitchell Hashimoto: Ghostty Is Leaving GitHub](https://mitchellh.com/writing/ghostty-leaving-github)
13. [InfoQ: GitHub Acknowledges Recent Outages, Cites Scaling Challenges](https://www.infoq.com/news/2026/04/github-outages-scaling/)
14. [TechRadar: Over 29 Million Secrets Were Leaked on GitHub in 2025](https://www.techradar.com/pro/security/over-29-million-secrets-were-leaked-on-github-in-2025-and-ai-really-isnt-helping)
15. [A Security Engineer: The Rise of Supply Chain Attacks, Why 2025-2026 Changed Everything](https://asecurityengineer.com/posts/the-rise-of-supply-chain-attacks/)
16. [GitHub Blog: Our Plan for a More Secure npm Supply Chain](https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/)
