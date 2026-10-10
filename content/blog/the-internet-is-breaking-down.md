---
title: "The internet is breaking down"
date: "2026-04-25T12:36:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Cloud","Security","Open Source","JavaScript","TypeScript","CLI","IDE","DevTools","Coding","Apple","Google","Microsoft","OpenAI","Data Centers"]
---

Just a couple of days ago, I wrote <mention-page url="https://app.notion.com/p/3360023f0e8380e28985e0e07b74bf51"/> and <mention-page url="https://app.notion.com/p/34c0023f0e83809a8355fb469b60ecdd"/>. I thought I had captured the full picture. I was wrong.
Today GitHub had a critical merge PR bug ([status incident](https://www.githubstatus.com/incidents/zsg1lk7w13cf), [Elliott Williams on X](https://x.com/theotherelliott/status/2047467609486954623)). Yesterday it was something else. Last week it was something else. The list keeps growing faster than I can write about it.
So this post is the receipt. Every hack, breach, outage, and bug I can remember from this year, in one place. If you've been feeling like the entire stack is falling apart at once, this is why.
## The cloud keeps catching fire
The foundations everyone builds on have been wobbling for months.
**AWS US-EAST-1, October 20, 2025.** Over 15 hours of degraded service, cascading into Snapchat, Roblox, Fortnite, Vercel, and thousands of apps that don't even know they live in us-east-1.
**AWS December 2025 outage.** The one Amazon partly blamed on its own AI coding tool, Kiro, making changes to production systems. "User error," sure.
**AWS Bahrain (ME-SOUTH-1), March 2026.** Multi-service disruption that rippled into LATAM workloads thousands of kilometers away.
**AWS US-EAST-1 wobble, February 10, 2026.** Another reminder that one region still runs half the internet.
**Cloudflare, November 18, 2025.** Up to 6 hours, hit roughly 28% of global HTTP traffic.
**Cloudflare, December 2025.** Another \~28% traffic hit weeks later.
**Cloudflare, February 20, 2026.** A subset of customers using Bring Your Own IP (BYOIP) had their routes withdrawn via BGP. The internet quite literally forgot how to find them.
**GitHub, all year.** 37 incidents in February 2026 alone. Sub-90% uptime windows in late 2025. December 2025 alone had five separate incidents from Kafka misconfigs to Copilot model latency to runner timeouts. And now today, a critical merge PR bug.
**Vercel, October 20, 2025.** Cascaded directly off the AWS outage. When us-east-1 sneezes, Vercel catches a cold.
## The npm ecosystem is on fire
If 2025 was the year supply chain attacks went mainstream, 2026 is the year they industrialized.
**Shai-Hulud, September 2025.** The original self-replicating npm worm. Compromised over 200 packages and 500 versions, including @ctrl/tinycolor (2.2M weekly downloads), ngx-bootstrap (300K), and ng2-file-upload (100K).
**Shai-Hulud 2.0, November to December 2025.** Hit Zapier, PostHog, and Postman maintainer accounts. Exposed 33,185 secrets across 20,649 repositories.
**Shai-Hulud 3.0.** A variant in @vietmoney/react-big-calendar with better obfuscation but the same bones.
**SANDWORM_MODE, February 20, 2026.** Compromised at least 19 typosquatted npm packages, and notably included a module that injected prompt-injection logic into AI coding assistants. The worm goes after both your CI pipeline and your IDE at the same time.
**GlassWorm, March 2026.** Over 400 compromised components across GitHub, npm, VS Code, and OpenVSX. Used invisible Unicode characters (the Trojan Source technique from CVE-2021-42574) to hide payloads in plain sight. Notably backdoored react-native-international-phone-number and react-native-country-select, with combined monthly downloads around 130,000.
**Axios, March 31, 2026.** This was the big one. Versions 1.14.1 and 0.30.4 hijacked, the lead maintainer's npm account taken over via a fake Google Meet driver-update social engineering call. The malicious versions added a phantom dependency, plain-crypto-js@4.2.1, that deployed a cross-platform RAT in roughly 1.1 seconds and erased itself afterward. Microsoft attributed it to Sapphire Sleet, Google to UNC1069, both pointing at North Korea. The exposure window was about three hours across 100M+ weekly downloads.
**Bitwarden CLI, April 22, 2026.** Malicious @bitwarden/cli@2026.4.0 published through a poisoned checkmarx/ast-github-action for exactly 93 minutes (5:57 PM to 7:30 PM ET). The payload was a file called bw1.js. Bitwarden contained it fast, but it was the first time a password manager's CLI shipped malware to users.
**Namastex Labs / @automagik worm, April 2026.** Self-spreading npm worm using TeamPCP-style techniques to steal developer tokens and auto-republish poisoned versions.
**Chalk and Debug.** Both hit in the post-Shai-Hulud cluster of compromises.
**NodeCordRAT, November 2025.** Three packages: bitcoin-main-lib, bitcoin-lib-js, bip40, all typosquatting bitcoinjs.
**pino-sdk-v2.** Typosquat impersonating pino, one of the most-installed Node loggers.
**js-logger-pack.** Multi-platform WebSocket stealer that grew from 601KB to 893KB over 12 days of active development.
**Solana-linked GlassWorm hijacks.** Tracked by Sonatype as part of the broader campaign.
## TeamPCP weaponized the security tools
This one deserves its own section because it's the connective tissue behind half of 2026. TeamPCP (also known as PCPcat, ShellForce, DeadCatx3) is the same group behind the React2Shell (CVE-2025-55182) campaign in late 2025. They didn't bypass defenses, they weaponized them.
**Trivy, March 19, 2026.** The first domino. Aqua Security's vulnerability scanner, used by 10,000+ dev teams. Attackers compromised the CI/CD pipeline, force-pushed malicious binaries starting at v0.69.4, and poisoned the trivy-action and setup-trivy GitHub Actions. They also pushed bad images to aquasec/trivy on Docker Hub. CVE-2026-33634.
**LiteLLM, March 24, 2026.** Versions 1.82.7 and 1.82.8 on PyPI, with 95M monthly downloads behind them. The malware hid in a .pth file (litellm_init.pth) that ran on every Python startup, no import required. It exfiltrated env vars, SSH keys, AWS/GCP/Azure/Kubernetes credentials, Docker configs, DB passwords, crypto wallets, CI/CD secrets to [models.litellm.cloud](http://models.litellm.cloud). Tracked as PYSEC-2026-2.
**Telnyx SDK on PyPI, March 27, 2026.** Versions 4.87.1 and 4.87.2, infected with a ContainerWorm variant.
**Checkmarx KICS Docker Hub + GitHub Action + VS Code/Open VSX extensions, April 22, 2026.** Malicious tags 2.63 and 2.66 on the AST results extension, 1.17.0 and 1.19.0 on the Developer Assist extension, plus poisoned Docker images.
**Bitwarden CLI, April 22, 2026.** Downstream of Checkmarx. Bitwarden's repo used checkmarx/ast-github-action.
**OpenAI Axios certificate exposure, April 11, 2026.** OpenAI's macOS code-signing GitHub Action used a floating tag that pulled the bad axios. They had to revoke their old codesign certificate (full revocation by May 8, 2026).
**Vect ransomware extortion, April 17, 2026.** Started publishing downstream Trivy victims publicly.
## Critical CVEs and bugs of 2026
### Axios
- **CVE-2026-40175.** Prototype-pollution gadget chain rated 10/10 CVSS, capable of RCE and full cloud compromise via AWS IMDSv2 bypass. Realistically only exploitable in obscure setups, but the rating is the rating. Fixed in 1.15.0 and 0.3.1.
- **CVE-2026-25639.** mergeConfig DoS via **proto** in JSON.parse'd config. Fixed in 0.30.3 and 1.13.5.
### Apple
- **CVE-2026-20700.** A decade-old dyld memory corruption, Apple's first actively exploited zero-day of 2026. Patched February 11, 2026.
- **Coruna iOS exploit kit.** 5 complete chains, 23 individual exploits, targeting iOS 13.0 through 17.2.1. A government surveillance tool that leaked into the wild.
- **DarkSword iOS exploit kit.** Zero-click, targeting iOS 18.4 through 18.7. Used against targets in Saudi Arabia, Turkey, Malaysia, and Ukraine, then trickled into infostealer campaigns aimed at ordinary users.
- **CVE-2026-28950.** Notifications marked for deletion stayed on device. The FBI used it to recover deleted Signal messages from a suspect's phone. Patched April 22, 2026 in iOS 26.4.2 and 18.7.8.
- iOS 26.4 / 18.7.5 / 18.7.7 batches included dozens more CVEs (CVE-2026-20690, CVE-2026-20675, CVE-2026-28878, and many others).
### Microsoft
- **CVE-2026-21509.** Office security-feature bypass, actively exploited. Patched January 26, 2026.
- **CVE-2026-32201.** SharePoint spoofing zero-day, part of the second-largest Patch Tuesday batch on record (April 2026).
- **CVE-2026-33825.** Microsoft Defender privilege escalation, exploited as a zero-day. CISA emergency directive, April 23, 2026.
- **BlueHammer, April 8, 2026.** A zero-day Windows exploit publicly dropped by an angry researcher with no patch available, frustrated with the Microsoft Security Response Center.
### Other notable CVEs
- **CVE-2026-23890.** pnpm path traversal in bin linking via @-scoped names.
- **CVE-2026-0628.** Chrome / Gemini Live extension hijack, allowed malicious extensions to access camera, mic, screenshots, and local files.
- **CVE-2026-20045.** Cisco HTTP zero-day, actively exploited.
- **CVE-2026-21992.** Oracle Identity Manager / Web Services Manager unauthenticated RCE.
- **CVE-2026-21999.** Oracle Database XML information disclosure.
- **CVE-2026-22010.** Oracle Financial Services auth bypass.
- **CVE-2026-28400.** Docker Desktop runtime flag injection in the Model Runner.
- **CVE-2025-65715, 65716, 65717.** Critical flaws in four popular VS Code extensions (Live Server, Code Runner, Markdown Preview Enhanced, Microsoft Live Preview), 128M combined installs.
- **CVE-2026-2796.** The browser bug Anthropic's own Claude Opus 4.6 wrote a partial exploit for in their red-team study. Important not because of the bug itself but because of what it signals.
## Platforms got popped
**Vercel, April 19, 2026.** ShinyHunters via [Context.ai](http://Context.ai). A [Context.ai](http://Context.ai) employee downloaded a Roblox cheat that installed Lumma Stealer. The credentials sat dormant in a criminal marketplace for two months. Then someone realized a Vercel employee had a [Context.ai](http://Context.ai) browser extension installed, pivoted into Google Workspace, and pulled out non-"sensitive" environment variables that could still be decrypted to plaintext. Listed for \$2M on a dark forum.
**Lovable, April 20, 2026.** A Broken Object Level Authorization flaw, OWASP API Security Top 10 #1, that let any free-tier user pull source code, database credentials, AI chat histories, and customer data through five API calls. Reported on March 3 via HackerOne, marked as duplicate, sat exposed for 48 days. Real Supabase strings, real Stripe keys, real LinkedIn profiles in the data.
**Salesforce ShinyHunters wave, March to April 2026.** Targeting Experience Cloud guest user misconfigurations. Confirmed or alleged victims include Cisco (3M+ records), McGraw Hill (13.5M records, 100GB+), 7-Eleven, Pitney Bowes, Medtronic, Canada Life, Zara, Carnival Corp, and Aman Resorts.
**Snowflake via Anodot, April 7, 2026.** ShinyHunters again. Stolen SaaS-integration tokens used to pivot into a dozen-plus Snowflake customer environments. Snowflake itself wasn't breached, the trust path was.
**DocketWise.** Roughly 116,000 victims, SSNs and passport data, with a six-month gap between discovery and notification.
**Stryker, March 2026.** Operationally disruptive though no data was ultimately exposed.
**Cloud Imperium Games (Star Citizen), March 4, 2026.** Backup access leaked usernames, names, DOBs, and contact info.
**Marquis Software Solutions.** Ransomware attack hit \~672,000 people's bank and credit union data.
**England Hockey, March 12, 2026.** AiLock ransomware, 129GB stolen.
**Nike.** 1.4TB of internal data exfiltrated.
**Sri Lanka Finance Ministry.** \$2.5M diverted in payment fraud.
**Jaguar Land Rover.** Production halt described as the most costly cyber-incident-driven outage in a decade.
**Collins Aerospace.** Ransomware that caused weeks of flight cancellations and delays.
**Arup, January 2026.** \$25M stolen via an AI-generated deepfake video impersonating the CFO on a video call.
## The AI labs broke too
The companies building the AI you depend on had their own brutal year.
**OpenAI Axios certificate compromise, April 11, 2026.** Same Axios attack as everyone else, but OpenAI's exposure was their macOS code-signing pipeline. They're rotating certificates, presumably onto an HSM this time.
**OpenAI ChatGPT DNS exfiltration and Codex GitHub-token vuln, March 2026.** A side channel through the Linux runtime let attackers smuggle data out via DNS requests, bypassing every visible guardrail.
**Anthropic "Mythos" leak, March 26 to 27, 2026.** Around 3,000 unpublished assets sitting on an unsecured data store, including details on an unreleased model that Anthropic itself flagged as cyberattack-capable.
**Anthropic Claude Code source leak, March 31, 2026.** A 60MB [cli.js.map](http://cli.js.map) shipped inside the npm package exposed roughly 500,000 lines of TypeScript across \~1,900 files. CLI implementation, agent architecture, unreleased features, internal tooling. No model weights, but the entire scaffolding around them.
**Claude is shipping vulnerable code, April 22, 2026.** Cyber experts publicly warned that the latest Claude models are introducing serious security issues into generated code at higher rates than previous versions.
**Anthropic disrupted Chinese state-sponsored AI-orchestrated espionage** (mid-September 2025, reported in November). The first documented large-scale cyberattack executed largely by an AI agent, hitting roughly 30 global targets across tech, finance, chemicals, and government.
## The browser is now an attack surface
**108 malicious Chrome extensions, April 14, 2026.** All talking to the same C2 infrastructure, stealing Google and Telegram data from 20,000+ users.
**AI Frame fake AI-assistant Chrome extensions, February 2026.** 30 extensions, 260,000 users, full-screen iframe overlay phishing.
**MaliciousCorgi VS Code AI extensions, January 2026.** 1.5M installs siphoning developer source code to China-based servers.
**Open VSX pre-publish bypass, March 2026.** A bug that let malicious extensions pass scanning entirely.
**72 malicious Open VSX extensions, since January 31, 2026.** GlassWorm transitive loaders hidden behind seemingly clean parents.
**North-Korea-linked VS Code project-file backdoors, January 2026.** Crafted .vscode files that ran backdoors the moment you opened the folder.
**Phantom Shuttle Chrome extensions.** Hardcoded proxy credentials hidden inside what looked like a legitimate jQuery library.
**Browser Syncjacking.** Multi-stage Chrome-extension device takeover.
**prettier-vscode-plus, November 2025.** A four-hour live impersonation of the Prettier formatter.
## The carryover from late 2025 still bleeding in
Most of 2026's worst incidents are downstream of things that started in 2025.
**tj-actions/changed-files, March 14 to 15, 2025.** CVE-2025-30066. Over 23,000 GitHub repos compromised.
**reviewdog/action-setup.** The upstream that enabled the tj-actions compromise.
**Coinbase-targeted GitHub Actions attack, March 2025.** The original target before the campaign expanded.
**Oracle Cloud breach, March to April 2025.** Threat actor "rose87168", 6 million records across 140,000 tenants on legacy Gen-1 servers. Oracle denied it for weeks.
**Oracle Health breach.** Roughly 80 hospitals affected.
**React2Shell, CVE-2025-55182.** The RCE that originally vaulted TeamPCP into the spotlight.
**Snowflake 2024 breach.** Up to 165 customers, the foundational ShinyHunters playbook that's still being rerun in 2026.
## Hardware and contests too, just for completeness
**Pwn2Own Automotive 2026.** 76 zero-days disclosed, \$1,047,000 awarded, EV chargers from multiple manufacturers fell to live exploitation.
**Microsoft Zero Day Quest 2026.** \$2.3M paid out for fresh research.
**PyPI second audit, April 16, 2026.** OIDC JTI race conditions, badge bypasses, audit-event drops, all remediated, but a reminder that the registries themselves are not above review.
## Open source is closing its doors
[Cal.com](http://Cal.com), one of the largest Next.js open-source projects, announced on April 14, 2026 that it was going closed source after five years. The reason: AI makes finding vulnerabilities in publicly available code too easy.
Co-founder Bailey Pumfleet put it bluntly: AI coding assistants have fundamentally changed the security calculus for open-source software. The commercial edition's codebase would no longer be publicly available. A stripped-down community edition, [Cal.diy](http://Cal.diy), would continue under MIT License for self-hosters.
The timing wasn't accidental. [Cal.com](http://Cal.com)'s decision came days after Anthropic's Mythos leak demonstrated exactly what they feared, an AI capable of systematically discovering exploitable vulnerabilities given enough compute. On Hacker News, the top comment on [Cal.com](http://Cal.com)'s announcement reframed the entire security landscape: "If Mythos continues to find exploits so long as you keep throwing money at it, security is reduced to a brutally simple equation: to harden a system you need to spend more tokens discovering exploits than attackers will spend exploiting them."
This is the logical endpoint of everything else in this post. When attackers can point an AI at your public codebase and find vulnerabilities faster than you can patch them, the calculus of open source changes fundamentally. [Cal.com](http://Cal.com) won't be the last.
## By the numbers, Jan to Apr 2026 vs 2025
It's tempting to assume this year just *feels* worse because we're closer to it. The data says otherwise. Here's how Q1 2026 (and the early April window) actually compares to the same window last year.
### Ransomware victims, Q1
<table header-row="true">
<tr>
<td>**Source**</td>
<td>**Q1 2025**</td>
<td>**Q1 2026**</td>
<td>**Δ**</td>
</tr>
<tr>
<td>[Ransomware.live](http://Ransomware.live)</td>
<td>2,251</td>
<td>2,318</td>
<td>+3%</td>
</tr>
<tr>
<td>RansomLook</td>
<td>2,509</td>
<td>2,570</td>
<td>+2%</td>
</tr>
<tr>
<td>ZeroFox</td>
<td>2,001</td>
<td>2,059</td>
<td>+3%</td>
</tr>
<tr>
<td>GuidePoint GRIT</td>
<td>2,063</td>
<td>\~2,300</td>
<td>\~+11%</td>
</tr>
<tr>
<td>Mandiant (DLS)</td>
<td>2,302</td>
<td>\~2,300</td>
<td>flat</td>
</tr>
</table>
Active ransomware crews went from 67 to 70 ([Ransomware.live](http://Ransomware.live)) and 76 to 89 (RansomLook), so somewhere between +4% and +17% more groups operating. Q1 2025 was the all-time record at the time of writing it. Q1 2026 just edged past it, and April is accelerating again.
### Vulnerabilities and zero-days
- **CVE submissions in Q1 ran roughly +33% higher** in 2026 than in 2025. NIST enriched \~42K CVEs in all of 2025 (already +45% over 2024), and FIRST forecasts \~59,000 CVEs for full-year 2026, the first year submissions cross the 50K threshold.
- **Q1 2025 baseline.** 12,333 vulnerabilities reported, with actively exploited flaws up 75% YoY (vs. Q1 2024).
- **Zero-days exploited in the wild.** 2023: 100. 2024: 78. 2025: 90 (+15%). Q1 2026 trackers are reporting up to a 400% surge in critical zero-days vs. Q1 2025, though that's the upper-bound estimate.
### npm and supply chain
- **Malicious npm packages.** 2024: 5,290. 2025: **10,819 (+105%)**, \~90% of all open-source malware. Q1 2026 is on pace to roughly double 2025 again, driven by Shai-Hulud variants, GlassWorm, SANDWORM_MODE, Axios, and the TeamPCP cluster.
- **Total malicious packages identified by Sonatype in 2025.** 454,648 new ones, lifetime total over 1.233 million.
- **Supply chain attacks overall.** Doubled YoY in 2025 (IBM X-Force, Cipher x63). Global losses \~\$60B. Average detection time: 254 days.
- **Cloud intrusions.** +35% YoY in 2025 (CrowdStrike Global Threat Report).
- **Website attacks.** +56% YoY (Indusface State of App Security 2026).
### Data breaches
- **US data compromises, full-year 2025.** 3,322 cases, 278.83M individuals affected (ITRC), +4% over 2024.
- **Q1 2026 disclosed breach events.** 486 (Bitsight). Q1 2025 was tracking around 400 to 450 in the same dataset, so roughly **+10% YoY**.
- **Single-incident scale.** January 2026 alone produced a 149M-record cloud-misconfig dump, plus the McGraw Hill / Salesforce wave (13.5M records) in April.
### The headline
Versus Jan to Apr 2025:
- Ransomware victim count: **flat to +5%**, but on a base that was already the all-time record.
- Active ransomware crews: **+4% to +17%**.
- New CVEs disclosed: **+33%**.
- Malicious npm packages: tracking **+100% again** on top of 2024's doubling.
- Cloud intrusions: **+35%** (full-year 2025 trajectory).
- Zero-days exploited: full-year 2025 was +15%, Q1 2026 trending much higher.
- Big-name supply chain incidents specifically (Trivy, LiteLLM, Telnyx, Checkmarx, Axios, Bitwarden, Vercel, Lovable, GlassWorm): roughly **zero** of comparable severity in Jan to Apr 2025. The closest analog from that window was tj-actions/changed-files in March 2025.
The honest one-line read: 2026 isn't dramatically more *incidents* than 2025, it's dramatically more *consequential* ones. Q1 2025 broke records on volume. Q1 2026 broke records on blast radius, with Axios (100M+ weekly downloads), LiteLLM (95M monthly), and the entire TeamPCP cascade hitting the tools everyone uses to defend themselves.
## What ties all of this together
Look at the list and the pattern is obvious.
A browser extension nobody thought about took down Vercel. A GitHub Action nobody pinned took down Bitwarden. A maintainer nobody knew got social-engineered into hijacking 100 million weekly Axios installs. An AI assistant making changes nobody fully reviewed contributed to an AWS outage. A bug report nobody triaged stayed open for 48 days at Lovable.
The attackers aren't smarter than us. They've just figured out that we built the entire industry on implicit trust, and the trust is the vulnerability.
Every story in this list is the same story in different clothes:
- Trust in maintainers (Axios, LiteLLM, Trivy, Telnyx).
- Trust in CI/CD actions (tj-actions, reviewdog, checkmarx/ast-github-action).
- Trust in security tools (Trivy, Checkmarx KICS, Bitwarden).
- Trust in browser extensions (Vercel via [Context.ai](http://Context.ai), MaliciousCorgi, AI Frame).
- Trust in AI tools (Kiro on AWS prod, Claude on developer machines, Codex with GitHub tokens).
- Trust in cloud platforms (AWS, Cloudflare, GitHub, Vercel, Salesforce, Snowflake).
- Trust in vendor disclosure timelines (Lovable's 48 days, DocketWise's 6 months, Oracle's flat denials).
And at every layer, AI is making both sides faster. Attackers use it to find vulnerabilities, write phishing, and automate spread. Defenders ship it into production and accept its output as code review. Both sides are accelerating, but the asymmetry favors the attacker, because they only need one entry point and we need to defend all of them.
I keep saying "the internet is breaking down" half-joking, but at some point the joke stops being funny. The web has always been a little fragile. What's new in 2026 is that the fragility is no longer a series of isolated incidents. It's the steady-state.
The call really is coming from inside the house. From the npm install you ran this morning. From the GitHub Action you didn't pin. From the browser extension your colleague added last week. From the AI agent you gave write access to. From the cloud region you assumed had a backup somewhere.
I'll keep writing these as they come. Unfortunately, I don't think I'm going to run out of material.
## References
1. [GitHub critical merge PR bug, April 25, 2026](https://www.githubstatus.com/incidents/zsg1lk7w13cf), GitHub Status
2. [The Cloudflare outage on February 20, 2026](https://blog.cloudflare.com/cloudflare-outage-february-20-2026/), Cloudflare
3. [Mitigating the Axios npm supply chain compromise](https://www.microsoft.com/en-us/security/blog/2026/04/01/mitigating-the-axios-npm-supply-chain-compromise/), Microsoft Security
4. [Supply Chain Compromise Impacts Axios npm](https://www.cisa.gov/news-events/alerts/2026/04/20/supply-chain-compromise-impacts-axios-node-package-manager), CISA
5. [Inside the Axios supply chain compromise](https://www.elastic.co/security-labs/axios-one-rat-to-rule-them-all), Elastic Security Labs
6. [Axios CVE-2026-40175 analysis](https://www.aikido.dev/blog/axios-cve-2026-40175-a-critical-bug-thats-not-exploitable), Aikido
7. [Trivy compromised by TeamPCP](https://www.wiz.io/blog/trivy-compromised-teampcp-supply-chain-attack), Wiz
8. [Weaponizing the Protectors: TeamPCP's multi-stage supply chain attack](https://unit42.paloaltonetworks.com/teampcp-supply-chain-attacks/), Palo Alto Unit 42
9. [LiteLLM and Telnyx compromised on PyPI](https://securitylabs.datadoghq.com/articles/litellm-compromised-pypi-teampcp-supply-chain-campaign/), Datadog Security Labs
10. [Bitwarden CLI compromised in ongoing Checkmarx supply chain campaign](https://thehackernews.com/2026/04/bitwarden-cli-compromised-in-ongoing.html), The Hacker News
11. [Bitwarden Statement on Checkmarx Supply Chain Incident](https://community.bitwarden.com/t/bitwarden-statement-on-checkmarx-supply-chain-incident/96127), Bitwarden
12. [Malicious KICS Docker Images and VS Code Extensions](https://thehackernews.com/2026/04/malicious-kics-docker-images-and-vs.html), The Hacker News
13. [GlassWorm malware hits 400+ code repos](https://www.bleepingcomputer.com/news/security/glassworm-malware-hits-400-plus-code-repos-on-github-npm-vscode-openvsx/), BleepingComputer
14. [Glassworm strikes React Native packages](https://www.aikido.dev/blog/glassworm-strikes-react-packages-phone-numbers), Aikido
15. [Shai-Hulud npm supply chain attack](https://www.reversinglabs.com/blog/shai-hulud-worm-npm), ReversingLabs
16. [Shai-Hulud 2.0 guidance](https://www.microsoft.com/en-us/security/blog/2025/12/09/shai-hulud-2-0-guidance-for-detecting-investigating-and-defending-against-the-supply-chain-attack/), Microsoft Security
17. [SANDWORM_MODE: a new Shai-Hulud-style npm worm](https://www.kodemsecurity.com/resources/sandworm-mode-a-new-shai-hulud-style-npm-worm-threatening-developer-ai-toolchain-security), Kodem
18. [Self-propagating supply chain worm hijacks npm packages](https://thehackernews.com/2026/04/self-propagating-supply-chain-worm.html), The Hacker News
19. [Our response to the Axios developer tool compromise](https://openai.com/index/axios-developer-tool-compromise/), OpenAI
20. [OpenAI patches ChatGPT data exfiltration flaw](https://thehackernews.com/2026/03/openai-patches-chatgpt-data.html), The Hacker News
21. [Anthropic Mythos leak](https://fortune.com/2026/03/27/anthropic-leaked-ai-mythos-cybersecurity-risk/), Fortune
22. [Anthropic Claude Code source leak](https://fortune.com/2026/03/31/anthropic-source-code-claude-code-data-leak-second-security-lapse-days-after-accidentally-revealing-mythos/), Fortune
23. [Anthropic's Claude is pumping out vulnerable code](https://www.forbes.com/sites/the-wiretap/2026/04/22/anthropics-claude-is-pumping-out-vulnerable-code-cyber-experts-warn/), Forbes
24. [Disrupting the first reported AI-orchestrated cyber espionage campaign](https://www.anthropic.com/news/disrupting-AI-espionage), Anthropic
25. [Reverse engineering Claude's CVE-2026-2796 exploit](https://red.anthropic.com/2026/exploit/), Anthropic Red Team
26. [Vercel data breach: ShinyHunters claims theft](https://www.upguard.com/news/vercel-data-breach-2026-04-21), UpGuard
27. [App host Vercel says it was hacked](https://techcrunch.com/2026/04/20/app-host-vercel-confirms-security-incident-says-customer-data-was-stolen-via-breach-at-context-ai/), TechCrunch
28. [Our response to the April 2026 incident](https://lovable.dev/blog/our-response-to-the-april-2026-incident), Lovable
29. [Lovable denies data leak, cites "intentional behavior"](https://www.theregister.com/2026/04/20/lovable_denies_data_leak/), The Register
30. [Salesforce hacks 2026: everything we know so far](https://www.salesforceben.com/salesforce-hacks-2026-everything-we-know-so-far/), Salesforce Ben
31. [McGraw Hill linked to 13.5M-record data leak](https://www.theregister.com/2026/04/16/mcgraw_hill_salesforce/), The Register
32. [Cisco Salesforce data breach](https://www.cxtoday.com/crm/cisco-salesforce-data-breach-crm-records/), CX Today
33. [Snowflake customers hit in data theft attacks after SaaS integrator breach](https://www.bleepingcomputer.com/news/security/snowflake-customers-hit-in-data-theft-attacks-after-saas-integrator-breach/), BleepingComputer
34. [The Snowflake DocketWise breaches](https://cmitsolutions.com/lasvegas-nv-1206/blog/snowflake-docketwise-supply-chain-data-breaches-2026/), CMIT Solutions
35. [CVE-2026-20700: Apple patches zero-day](https://socprime.com/blog/cve-2026-20700-vulnerability/), SOC Prime
36. [Coruna iOS exploit kit](https://cloud.google.com/blog/topics/threat-intelligence/coruna-powerful-ios-exploit-kit), Google Cloud Blog
37. [The proliferation of DarkSword](https://cloud.google.com/blog/topics/threat-intelligence/darksword-ios-exploit-chain), Google Cloud Blog
38. [The iPhone, invincible no more](https://www.kaspersky.com/blog/ios-exploits-darksword-and-coruna-in-mass-attacks/55622/), Kaspersky
39. [Apple fixes bug that let the FBI recover deleted Signal messages](https://www.bleepingcomputer.com/news/security/apple-fixes-ios-bug-that-retained-deleted-notification-data/), BleepingComputer
40. [CVE-2026-21509: Microsoft Office zero-day](https://socprime.com/blog/latest-threats/cve-2026-21509-vulnerability/), SOC Prime
41. [Microsoft drops second-largest monthly batch of defects on record](https://cyberscoop.com/microsoft-patch-tuesday-april-2026/), CyberScoop
42. [CISA orders feds to patch BlueHammer flaw](https://www.bleepingcomputer.com/news/security/cisa-orders-feds-to-patch-microsoft-defender-flaw-exploited-in-zero-day-attacks/), BleepingComputer
43. [BlueHammer Windows zero-day](https://www.forbes.com/sites/daveywinder/2026/04/08/1-billion-microsoft-users-warned-as-angry-hacker-drops-0-day-exploit/), Forbes
44. [Taming agentic browsers: vulnerability in Chrome](https://unit42.paloaltonetworks.com/gemini-live-in-chrome-hijacking/), Palo Alto Unit 42
45. [Oracle Security Alert CVE-2026-21992](https://www.oracle.com/security-alerts/alert-cve-2026-21992.html), Oracle
46. [108 malicious Chrome extensions steal Google and Telegram data](https://thehackernews.com/2026/04/108-malicious-chrome-extensions-steal.html), The Hacker News
47. [Open VSX bug let malicious VS Code extensions bypass checks](https://thehackernews.com/2026/03/open-vsx-bug-let-malicious-vs-code.html), The Hacker News
48. [Critical flaws found in four VS Code extensions](https://thehackernews.com/2026/02/critical-flaws-found-in-four-vs-code.html), The Hacker News
49. [Malicious VS Code AI extensions with 1.5M installs](https://community.opentextcybersecurity.com/ai-threats-security-245/malicious-vs-code-ai-extensions-with-1-5-million-installs-steal-developer-source-code-363280), OpenText Cybersecurity
50. [GitHub Action tj-actions/changed-files supply chain attack](https://www.wiz.io/blog/github-action-tj-actions-changed-files-supply-chain-attack-cve-2025-30066), Wiz
51. [The Oracle Cloud breach exposed a harsh truth](https://www.nexsan.com/resources/the-oracle-cloud-breach-exposed-a-harsh-truth-public-cloud-infrastructure-is-a-growing-ai-attack-surface-for-cybercriminals/), Nexsan
52. [80 hospitals may have been affected by the Oracle Health data breach](https://www.hipaajournal.com/oracle-health-data-breach/), HIPAA Journal
53. [PyPI completes its second audit](https://blog.pypi.org/posts/2026-04-16-pypi-completes-second-audit/), PyPI
54. [Waterfall Threat Report 2026](https://industrialcyber.co/reports/waterfall-threat-report-2026-finds-ransomware-slowdown-masks-deeper-shift-toward-nation-state-attacks-on-critical-infrastructure/), Industrial Cyber
55. [Arup deepfake: how an AI-generated video stole \$25M](https://purplesec.us/breach-report/), PurpleSec
56. [Cal.com](http://Cal.com)[ is going closed source. Here's why.](https://cal.com/blog/cal-com-goes-closed-source-why), [Cal.com](http://Cal.com)
57. [Cal.com](http://Cal.com)[ goes private: a security reckoning for open source](https://thenewstack.io/cal-com-codebase-security-ai/), The New Stack
58. [The State of Ransomware in Q1 2026](https://www.emsisoft.com/en/blog/47562/the-state-of-ransomware-in-q1-2026/), Emsisoft
59. [Q1 2026 Ransomware Wrap-Up](https://www.zerofox.com/intelligence/q1-2026-ransomware-wrap-up/), ZeroFox
60. [GRIT Q1 2025 Ransomware & Cyber Threat Report](https://www.guidepointsecurity.com/resources/grit-2025-q1-ransomware-and-cyber-threat-report/), GuidePoint Security
61. [NIST updates NVD operations to address record CVE growth](https://www.nist.gov/news-events/news/2026/04/nist-updates-nvd-operations-address-record-cve-growth), NIST
62. [NIST to stop rating non-priority flaws due to volume increase](https://securityboulevard.com/2026/04/nist-to-stop-rating-non-priority-flaws-due-to-volume-increase/), Security Boulevard
63. [Look What You Made Us Patch: 2025 Zero-Days in Review](https://cloud.google.com/blog/topics/threat-intelligence/2025-zero-day-review), Google Threat Intelligence Group
64. [73% rise in malicious open source packages](https://www.reversinglabs.com/press-releases/reversinglabs-2026-software-supply-chain-security-report-identifies-73-increase-in-malicious-open-source-packages), ReversingLabs
65. [2026 State of the Software Supply Chain](https://www.sonatype.com/state-of-the-software-supply-chain/2026/open-source-malware), Sonatype
66. [Strobes VI: Supply Chain, Ransomware & Threat Actor Tracking](https://strobes.co/blog/strobes-vi-supply-chain-ransomware-threat-actors-tracking/), Strobes Security
67. [2026: The year of AI-assisted attacks](https://www.chainguard.dev/unchained/2026-the-year-of-ai-assisted-attacks), Chainguard
68. [Vulnerability Statistics 2026](https://www.indusface.com/blog/key-vulnerability-statistics/), Indusface
69. [U.S. data compromises hit record breaches in 2025](https://www.hipaajournal.com/u-s-data-breach-record-2025/), HIPAA Journal
70. [2025-26 Data Breach Statistics](https://www.bitsight.com/underground/data-breaches), Bitsight
