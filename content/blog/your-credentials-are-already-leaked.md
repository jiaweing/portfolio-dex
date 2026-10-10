---
title: "Your credentials are already leaked"
date: "2026-04-27"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Security","Privacy","Agents"]
---

Six security incidents in fifteen days. Carousell, Canva, a personal GitHub org, webhook secrets, a Google account alert, and an [Eurail.com](http://Eurail.com) data breach notification. At some point you stop calling these "incidents" and start calling them the default state of being online.
The question isn't whether your credentials have leaked. It's which ones, when, and whether anyone has used them yet.
## Breaches are background noise now
Have I Been Pwned currently tracks over 974 data breaches exposing 17.5 billion accounts. That number isn't a typo. It means that on average, every person with an email address has had their credentials compromised multiple times over.
In 2025 alone, infostealer malware harvested 1.8 billion credentials from 5.8 million devices, an 800% increase from prior years. Each compromised device yielded an average of 87 stolen credentials. Recorded Future found that 90% more credentials surfaced in the last three months of 2025 than in the first three months, meaning the problem is accelerating, not stabilizing.
This isn't a temporary spike. It's the new equilibrium.
## Six incidents, three root causes
When I looked at my own cluster of incidents, three patterns emerged.
The first was platform breaches outside my control. Carousell exposed 2.6 million users' data through an unsecured API during a system migration. Canva's 2019 breach hit 139 million accounts, and fresh dataset leaks tied to the platform surfaced as recently as March 2026. The [Eurail.com](http://Eurail.com) breach was the same story: a service I used once, years ago, that got compromised long after I'd forgotten about it.
The second was supply chain and infrastructure leaks. Webhook secrets and a personal GitHub org compromise fall into this category. These weren't caused by weak passwords or carelessness on my part. They were failures in the systems I trusted to hold my secrets.
The third was the ambient threat of credential reuse. The Google account alert was a reminder that even if I'm careful now, old passwords from years ago still circulate in breach databases. Attackers don't need to hack you today if they can find a password you used in 2017.
Different root causes, same outcome: credentials in someone else's hands.
## You can do everything right and still get pwned
This is the part that frustrates people the most. You can use a password manager, enable two-factor authentication on every account, and still receive breach notifications because a third-party service lost your data.
The [Eurail.com](http://Eurail.com) breach is a perfect example. You book a train ticket on vacation, enter your email and a password, and move on with your life. Three years later, that service gets breached and your credentials end up in a database that gets traded on underground forums. If you reused that password anywhere, the blast radius extends far beyond a train booking.
National Public Data's 2024 breach exposed billions of rows of personal information, including Social Security numbers. The SUCCESS breach in March 2026 exposed 250,000 accounts and was even used to send offensive newsletters through the compromised system. These aren't obscure targets. They're services that millions of people interact with without thinking twice about the security implications.
## AI agents make the problem worse
Every API key handed to an AI agent is another secret to manage, and another potential attack surface. The growth of agentic AI has introduced a new category of credential risk that most teams aren't equipped to handle.
Prompt injection attacks can trick AI agents into exfiltrating their own credentials. Security researchers demonstrated this with Claude Cowork, where an attacker was able to exfiltrate confidential documents without the user ever clicking "approve." The attacker didn't steal the victim's API key. They gave the victim their own, and that was enough.
Reddit users have reported catching AI agent plugins silently copying every credential they touched to external endpoints. The agents themselves became the exfiltration mechanism, no traditional malware required.
As Salt Security's 2026 report noted, APIs now account for the majority of web traffic and power all AI agent activity. They represent a distinct and critical attack surface that existing security tools weren't designed to protect. More automation means more secrets, and more secrets means a larger window for compromise.
## Credential rotation is the most neglected hygiene habit
Here's an uncomfortable truth: most people and most organizations don't rotate credentials on a schedule. They rotate them after a breach, if they rotate them at all.
A post on the r/ciso subreddit captured this perfectly. An organization stored all shared credentials in 1Password, but during offboarding, especially sudden ones, they rotated almost nothing because there was simply too much to rotate. The poster admitted it scared them how much access technically remained after someone left.
This is the norm, not the exception.
Interestingly, NIST's updated password guidelines (SP 800-63B, Revision 4) now recommend against mandatory periodic password changes for user accounts. Their reasoning is sound: forced resets lead to predictable mutations like "Password1" becoming "Password2." Passwords should only be changed when there's evidence of compromise.
But this guidance applies to user-facing passwords with proper monitoring. For API keys, service account tokens, webhook secrets, and the growing menagerie of machine credentials, the calculus is different. These credentials often have no monitoring, no expiration, and no one watching for signs of misuse. They sit in environment variables and config files for months or years, silently waiting to become someone else's entry point.
## Treat credentials like milk, not wine
The mental model shift that helped me most was simple: credentials have an expiration date. They don't get better with age. They get more dangerous.
Here's a practical framework:
**Assume breach as a starting point.** Check Have I Been Pwned regularly. Assume that any credential older than a year is already in a breach database somewhere. Act accordingly.
**Separate human credentials from machine credentials.** Your login passwords are one category. API keys, tokens, webhook secrets, and service accounts are another. Each needs its own rotation schedule and its own monitoring.
**Automate what you can.** Tools like HashiCorp Vault can automatically rotate database credentials on a schedule, reducing the window of exposure from months to hours. The goal is to make rotation a background process, not a manual task that competes with shipping for your attention.
**Scope down aggressively.** Every API key should have the minimum permissions it needs and nothing more. If an agent only needs read access, don't give it write. If a key only needs access to one service, don't give it access to ten.
**Audit your ghost accounts.** That service you signed up for in 2019 and forgot about? It still has your data. Periodically review and delete accounts you no longer use. You can't control whether they get breached, but you can control whether your data is there when they do.
## The real blocker is attention
The tools exist. Password managers, secret rotation platforms, breach notification services, hardware security keys. None of this is new technology.
The real problem is that security hygiene competes with every other demand on your time. Rotating credentials is boring. It has no visible ROI. Nobody celebrates a breach that didn't happen because you rotated your API keys last Tuesday.
But here's the thing: the cost of not doing it is measured in IBM's annual data breach report, which pegged the global average at \$4.4 million per incident in 2025. For individuals, the cost is harder to quantify but no less real: stolen identities, compromised accounts, and the creeping anxiety of knowing your data is out there.
Six incidents in fifteen days was my wake-up call. Yours might look different. But the underlying reality is the same for everyone: your credentials are already out there. The only question is what you do about it.
## References
1. Have I Been Pwned, "Who's Been Pwned" breach statistics, [https://haveibeenpwned.com/PwnedWebsites](https://haveibeenpwned.com/PwnedWebsites)
2. Vectra AI, "Infostealers stole 1.8B credentials in 2025," [https://www.vectra.ai/topics/infostealers](https://www.vectra.ai/topics/infostealers)
3. Recorded Future, "2025 Identity Threat Landscape Report," [https://www.recordedfuture.com/blog/identity-trend-report-march-blog](https://www.recordedfuture.com/blog/identity-trend-report-march-blog)
4. Personal Data Protection Commission Singapore, "Breach of the Protection Obligation by Carousell," [https://www.pdpc.gov.sg/all-commissions-decisions/2024/02/breach-of-the-protection-obligation-by-carousell](https://www.pdpc.gov.sg/all-commissions-decisions/2024/02/breach-of-the-protection-obligation-by-carousell)
5. Canva, "Security Incident, May 24 FAQs," [https://www.canva.com/help/incident-may24/](https://www.canva.com/help/incident-may24/)
6. Have I Been Pwned, "National Public Data Breach," [https://haveibeenpwned.com/Breach/NationalPublicData](https://haveibeenpwned.com/Breach/NationalPublicData)
7. Have I Been Pwned, "SUCCESS Data Breach," [https://haveibeenpwned.com/breach/SUCCESS](https://haveibeenpwned.com/breach/SUCCESS)
8. Beyond Identity, "The Attacker Gave Claude Their API Key," [https://www.beyondidentity.com/resource/the-attacker-gave-claude-their-api-key-why-ai-agents-need-hardware-bound-identity](https://www.beyondidentity.com/resource/the-attacker-gave-claude-their-api-key-why-ai-agents-need-hardware-bound-identity)
9. IT Security Guru, "Most Organisations Face an Unsecured API Surge As AI Agents Outpace Security," [https://www.itsecurityguru.org/2026/04/08/most-organisations-face-an-unsecured-api-surge-as-ai-agents-outpace-security/](https://www.itsecurityguru.org/2026/04/08/most-organisations-face-an-unsecured-api-surge-as-ai-agents-outpace-security/)
10. NIST, "SP 800-63B: Digital Identity Guidelines," [https://pages.nist.gov/800-63-4/sp800-63b.html](https://pages.nist.gov/800-63-4/sp800-63b.html)
11. CYFIRMA, "The Convergence of Infostealers and Ransomware," [https://www.cyfirma.com/research/the-convergence-of-infostealers-and-ransomware-from-credential-harvesting-to-rapid-extortion-chains/](https://www.cyfirma.com/research/the-convergence-of-infostealers-and-ransomware-from-credential-harvesting-to-rapid-extortion-chains/)
12. IBM, "Cost of a Data Breach Report 2025," [https://www.ibm.com/reports/data-breach](https://www.ibm.com/reports/data-breach)
13. Flare, "2026 State of Enterprise Infostealer Exposure," [https://flare.io/company/press/flare-research-warns-1-in-5-infostealer-infections-could-yield-enterprise-credentials-in-2026](https://flare.io/company/press/flare-research-warns-1-in-5-infostealer-infections-could-yield-enterprise-credentials-in-2026)
