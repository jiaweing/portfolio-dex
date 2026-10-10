---
title: "Security in 2026"
date: "2026-04-27T18:39:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Security","Privacy","LLMs","Models","MCP","Open Source","JavaScript","TypeScript","CLI","DevTools","Coding","Frameworks","Cloud"]
---

Security in 2016: make sure all your software is up to date. Security in 2026: for the love of god, don't update anything.
That's the joke making the rounds, and it's funny because it's barely an exaggeration. In just the first four months of 2026, a string of supply chain attacks has turned the simple act of running `npm install` or `pip install` into a game of Russian roulette. The tools we rely on to build software, manage passwords, serve AI models, and deploy applications have all been weaponized against us.
Here's what happened, why it keeps happening, and what it means for how we think about security going forward.
## The attacks
### Axios: 100 million weekly downloads, three hours of chaos
On March 31, 2026, two malicious versions of Axios, the ubiquitous JavaScript HTTP client with over 100 million weekly npm downloads, were published through a compromised maintainer account. Versions `1.14.1` and `0.30.4` injected a phantom dependency called `plain-crypto-js@4.2.1` that silently installed a cross-platform remote access trojan.
The malicious versions were live for roughly three hours. But because Axios is so commonly auto-updated, any project with a loose version range that ran `npm install` during that window pulled the compromised package automatically. The RAT targeted Windows, macOS, and Linux systems with platform-specific payloads, and then the malware erased itself, leaving minimal forensic traces.
Microsoft Threat Intelligence attributed the attack to Sapphire Sleet, a North Korean threat actor. CISA issued a formal alert on April 20.
### LiteLLM: poisoning the AI gateway
A week earlier, on March 24, the threat actor group TeamPCP compromised the PyPI publishing credentials for LiteLLM, a popular open-source library used to route requests across LLM providers. With roughly 95 million monthly downloads, LiteLLM sits at the heart of many AI infrastructure stacks.
TeamPCP published two backdoored versions (1.82.7 and 1.82.8) with malicious code injected directly into the distributed wheels. The payload orchestrated a three-stage attack: harvesting credentials from cloud environments, attempting lateral movement across Kubernetes clusters, and installing a persistent systemd backdoor that polled for additional payloads.
The compromise was traced back to a cascading attack that started with the hijacking of Aqua Security's Trivy vulnerability scanner. The irony is thick: a security scanning tool was compromised and then used as a stepping stone to backdoor an AI routing library.
### Bitwarden CLI: your password manager is the malware
On April 22, version `2026.4.0` of the Bitwarden CLI npm package was published with malicious code. The attack exploited a compromised GitHub Action in Bitwarden's CI/CD pipeline, part of a broader campaign by TeamPCP that had already hit Trivy, LiteLLM, and Checkmarx's KICS scanner.
The malware targeted the crown jewels of developer environments: AWS, Azure, GCP, and GitHub tokens, SSH keys, `.env` files, npm authentication tokens, shell history, and even AI tooling configuration and MCP-related files. Exfiltrated data was uploaded to public GitHub repositories using the victims' own tokens, with asymmetric encryption ensuring only the attackers could decode it.
The malicious version was live for about 90 minutes before being pulled. Only 334 users downloaded it, but the attack demonstrated just how fragile the trust chain has become.
### Vercel: the AI tool you forgot you installed
In April 2026, Vercel disclosed a security incident that traced back to a compromised AI productivity tool called [Context.ai](http://Context.ai). The attack chain was almost absurdly human.
A [Context.ai](http://Context.ai) employee searched for Roblox auto-farm scripts and game exploit executors, got infected with Lumma Stealer malware in February, and had their credentials harvested. The attacker used those stolen credentials to compromise [Context.ai](http://Context.ai)'s AWS environment and OAuth tokens. A Vercel employee who had installed [Context.ai](http://Context.ai)'s browser extension then became the bridge, the attacker pivoted through the OAuth trust relationship into the employee's Vercel Google Workspace account.
From there, the attacker accessed environment variables that weren't marked as "sensitive" and weren't encrypted at rest. The stolen data was reportedly listed on BreachForums for \$2 million.
The lesson: your security posture is only as strong as every third-party tool every employee has ever connected to their work accounts.
### SGLang: when the model is the exploit
SGLang, a framework for serving large language models, disclosed multiple critical vulnerabilities in early 2026. CVE-2026-3059 and CVE-2026-3060 (both CVSS 9.8) stemmed from unsafe pickle deserialization, allowing unauthenticated remote code execution through exposed ZMQ sockets.
Then came CVE-2026-5760, which enabled RCE through malicious GGUF model files. An attacker could craft a model with a poisoned Jinja2 chat template, host it on HuggingFace, and take complete control of any server that loaded it. The attack surface here is particularly unsettling: the model itself becomes the weapon.
### React: server components as attack surface
In December 2025, the React team disclosed CVE-2025-55182, dubbed "React2Shell," a CVSS 10.0 critical vulnerability in React Server Components. Insecure deserialization in the RSC "Flight" protocol meant an attacker could execute privileged JavaScript on the server with a single unauthenticated HTTP request. This wasn't just a React issue, it affected every framework implementing RSC, including Next.js, React Router, and RedwoodJS.
Then in 2026, malicious versions of React Native were published to npm in a separate supply chain attack, with install-time hooks that ran credential and crypto-theft payloads before any application code even executed.
## The pattern
Look at these attacks together and a clear pattern emerges.
**The update mechanism is the attack vector.** Every one of these incidents weaponized the same trust we place in package managers, CI/CD pipelines, and automatic updates. The attackers didn't need to find zero-days in your application. They just needed to slip into the pipe that delivers code to your machine.
**Credential theft cascades.** TeamPCP's campaign is a masterclass in chain reactions. Compromise Trivy, steal credentials, use those to compromise LiteLLM, steal more credentials, use those to compromise Bitwarden CLI. Each link in the chain gives access to a wider pool of secrets. The Vercel breach followed the same logic: compromise [Context.ai](http://Context.ai), pivot to Vercel, enumerate credentials.
**AI infrastructure is a high-value target.** LiteLLM, SGLang, AI tooling configs, MCP files, these keep showing up. AI systems tend to concentrate API keys and cloud credentials in ways that make them extraordinarily valuable targets. A single compromised AI gateway can expose credentials for every LLM provider, cloud service, and internal system it touches.
**The blast radius is enormous.** Axios has 100 million weekly downloads. LiteLLM has 95 million monthly downloads. React is... React. When attackers compromise packages at this scale, even a three-hour window can affect thousands of builds across thousands of organizations.
## What this means for developers
The uncomfortable truth is that the old security advice, keep your software updated, now comes with a caveat. Blind automatic updates are a liability. Here's what the new reality demands.
**Pin your dependencies.** Use lock files religiously. Don't use loose version ranges like `^1.14.0` that auto-upgrade to whatever's newest. Yes, this means you'll miss security patches until you manually upgrade. That's now the lesser evil.
**Verify before you update.** Treat major dependency updates like code reviews. Check changelogs, scan for unexpected new dependencies, and wait a reasonable period before adopting new versions in production.
**Audit your CI/CD pipeline.** The Bitwarden and Axios attacks both exploited the publish step. If your pipeline has write access to a package registry, it's a target. Harden GitHub Actions, rotate tokens, use short-lived credentials.
**Inventory your OAuth grants and browser extensions.** The Vercel breach happened because one employee installed one AI productivity tool. Every OAuth connection and browser extension is a trust relationship that can be exploited. Audit them regularly and revoke what you don't need.
**Treat AI tooling as critical infrastructure.** If your AI stack touches cloud credentials, API keys, or internal systems, treat it with the same security rigor as your production database. Don't assume that because a tool is "just for development" it's low risk.
**Assume compromise and prepare for it.** Rotate secrets regularly. Use short-lived tokens where possible. Segment access so a single compromised credential can't cascade through your entire infrastructure.
## The new security paradox
We've arrived at a genuine paradox. Not updating your software leaves you vulnerable to known exploits. Updating your software might install malware. The answer isn't to stop updating, it's to update more carefully, with more verification, more isolation, and a much healthier sense of paranoia.
The supply chain attacks of early 2026 aren't anomalies. They're the new normal. TeamPCP alone has demonstrated that a single threat actor group can sustain a months-long campaign across multiple ecosystems, npm, PyPI, Docker Hub, GitHub Actions, VS Code extensions, each compromise funding the next.
The joke writes itself: the most dangerous thing you can do in 2026 is trust your own build system. But behind the joke is a serious reckoning. The software industry built its productivity on a foundation of implicit trust in open-source registries, package managers, and automated pipelines. That trust has been exploited, and rebuilding it will require fundamental changes to how we distribute and consume software.
Until then, maybe think twice before you hit `npm install`.
## References
1. [SecurityWeek: Bitwarden NPM Package Hit in Supply Chain Attack](https://www.securityweek.com/bitwarden-npm-package-hit-in-supply-chain-attack/)
2. [The Hacker News: Bitwarden CLI Compromised in Ongoing Checkmarx Supply Chain Campaign](https://thehackernews.com/2026/04/bitwarden-cli-compromised-in-ongoing.html)
3. [Microsoft Security Blog: Mitigating the Axios npm Supply Chain Compromise](https://www.microsoft.com/en-us/security/blog/2026/04/01/mitigating-the-axios-npm-supply-chain-compromise/)
4. [CISA: Supply Chain Compromise Impacts Axios Node Package Manager](https://www.cisa.gov/news-events/alerts/2026/04/20/supply-chain-compromise-impacts-axios-node-package-manager)
5. [Cycode: LiteLLM Supply Chain Attack: What Happened and How to Respond](https://cycode.com/blog/lite-llm-supply-chain-attack/)
6. [Trend Micro: Your AI Gateway Was a Backdoor: Inside the LiteLLM Supply Chain Compromise](https://www.trendmicro.com/en_us/research/26/c/inside-litellm-supply-chain-compromise.html)
7. [Vercel Knowledge Base: Vercel April 2026 Security Incident](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident)
8. [The Hacker News: Vercel Breach Tied to Context AI Hack](https://thehackernews.com/2026/04/vercel-breach-tied-to-context-ai-hack.html)
9. [OX Security: Vercel Breached via Context AI Supply Chain Attack](https://www.ox.security/blog/vercel-context-ai-supply-chain-attack-breachforums/)
10. [CERT/CC: SGLang Vulnerable to Code Execution via Unsafe Pickle Deserialization](https://www.kb.cert.org/vuls/id/665416)
11. [The Hacker News: SGLang CVE-2026-5760 Enables RCE via Malicious GGUF Model Files](https://thehackernews.com/2026/04/sglang-cve-2026-5760-cvss-98-enables.html)
12. [Palo Alto Networks: Bitwarden CLI Impersonation Attack](https://www.paloaltonetworks.com/blog/cloud-security/bitwardencli-supply-chain-attack/)
13. [Trend Micro: Axios NPM Package Compromised](https://www.trendmicro.com/en_us/research/26/c/axios-npm-package-compromised.html)
14. [Huntress: Axios npm Supply Chain Compromise](https://www.huntress.com/blog/axios-npm-compromise)
15. [LiteLLM: Security Update on Suspected Supply Chain Incident](https://docs.litellm.ai/blog/security-update-march-2026)
