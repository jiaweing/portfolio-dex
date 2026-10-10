---
title: "Nobody rotates their passwords"
date: "2026-04-29"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Security"]
---

I had nine security incidents in seventeen days. Carousell breach notification. Canva credentials surfacing on a dark web forum. A GitHub webhook secret I set two years ago and never touched. My Google account flagged for suspicious login attempts. An Eurail breach that exposed passport data for 300,000 travelers, mine possibly included. Two separate Revolut alerts.
Nine incidents. Seventeen days. And you know what I did about rotating my credentials? Nothing. Not yet, anyway. I'm writing this post instead.
This isn't a guide to password security. This is a confession.
## The gap between knowing and doing
Everyone knows they should rotate their passwords. It's one of those pieces of advice that sits in the same mental category as flossing, backing up your hard drive, and checking your smoke detector batteries. You know it matters. You know the consequences of neglecting it. And you still don't do it.
The gap between security knowledge and security behavior is the actual vulnerability, and it's getting wider as the attack surface grows. Every new service you sign up for, every API key you generate, every OAuth connection you authorize is another credential that will eventually need attention. The pile never shrinks.
NIST changed its guidelines on passwords a while back. The updated guidance in SP 800-63-4 is clear: stop enforcing mandatory periodic password changes. The reasoning is that forced rotation leads to weaker passwords. People make minimal, predictable modifications. "Password1" becomes "Password2" becomes "Password3." Attackers know this pattern and account for it.
But here's the thing: NIST's recommendation assumes you'll change your password when there's evidence of compromise. The problem is that evidence of compromise is everywhere now. Breach notifications land in your inbox regularly. And the response is almost always the same: "I'll deal with it this weekend."
You won't.
## The "I'll do it tomorrow" loop
Security debt compounds exactly like technical debt. Every day you don't rotate a compromised credential, the risk doesn't stay flat, it grows. Credential stuffing attacks are automated. Once your email and password pair from one breach hits a database, bots will try it against hundreds of other services within hours.
But the urgency never feels real. That's because security failures are invisible until they're catastrophic. Technical debt shows up as slow builds, flaky tests, frustrated engineers. Security debt shows up as nothing, right until someone drains your account or impersonates you.
The psychology is the same as why people don't buy insurance until after the flood. The risk is abstract. The effort is concrete. And concrete effort always loses to abstract risk when you're tired and have other things to do.
I know all of this. I write about technology. I understand the threat model. And I still haven't finished rotating my passwords from those nine incidents. That's the point.
## Password managers solved the wrong problem
Password managers were supposed to fix this. And they did fix something: they solved storage. Having a vault with unique, complex passwords for every service is genuinely better than reusing the same password everywhere.
But storage was never the real bottleneck. Behavior was.
Having a password manager doesn't mean you audit it regularly. It doesn't mean you check which passwords are reused, which are weak, which are associated with breached services. Most people set up a vault, migrate their most important passwords, and then stop. The vault becomes a graveyard of credentials you set once and forgot.
The dashboard shows you a security score. You glance at it, feel vaguely guilty, and close the tab. Sound familiar?
## The developer problem is worse
For developers, the credential hygiene problem is an order of magnitude worse. API keys and webhook secrets are invisible in a way that passwords aren't. You set an API key in an environment variable or a secrets manager, and then it vanishes from your consciousness. It works. You move on.
OWASP lists insufficient credential hygiene as a top CI/CD security risk. Hard-coded credentials, shared keys, secrets that never expire. These aren't edge cases; they're standard practice in most codebases.
GitHub Personal Access Tokens without expiration dates. Webhook secrets created during initial setup and never rotated. Database credentials embedded in config files that haven't been touched in years. AWS keys that predate your current team.
The tools to fix this exist. AWS Secrets Manager, HashiCorp Vault, automated rotation policies. But "the tools exist" is the security equivalent of "the gym is open." Availability isn't the same as usage.
I have a GitHub webhook secret that's been unchanged for over two years. I know this. I've known this for months. It's still the same secret.
## The real fix is fewer passwords
The most honest answer to the password rotation problem isn't better rotation habits. It's fewer things to rotate.
Passkeys are the clearest example of this shift. According to Google, accounts with passkeys are 99.9% less likely to be compromised than those relying on passwords alone. Phishing and credential stuffing simply don't work against them. As of early 2026, passkey readiness on Windows is at roughly 90% across Chrome and Edge. NIST's SP 800-63-4 now recognizes synced passkeys as legitimate AAL2 authenticators, meaning they're officially considered strong authentication.
Hardware security keys, biometric authentication, SSO that consolidates your identity into fewer trust points. These approaches reduce the surface area. You can't forget to rotate what doesn't exist.
But we're in a transition period. Most services still use passwords. Many APIs still use static keys. The world where credentials manage themselves is coming, but it's not here yet. Which means we're stuck in the uncomfortable middle: too many credentials to manage well, not enough infrastructure to eliminate them.
## The backup analogy
The closest parallel to credential hygiene is backups. Everyone knows they should back up their data. Most people don't, or they do it inconsistently, until they lose something important. Then they become religious about it, for a while, before the habit fades again.
The difference is that losing your data hurts you immediately and visibly. You feel the loss. A compromised credential might not surface for months. Someone could be sitting on your credentials right now, and you'd have no way to know.
That delay between cause and consequence is what makes security behavior so hard to change. The feedback loop is broken. You never get the "your hard drive just died" moment that forces you to act, until it's too late.
## Security is a practice, not a state
You're never "secure." That framing is the problem. Security isn't a box you check. It's a practice, like exercise or hygiene. You don't shower once and declare yourself clean forever.
The better framing is: how recently did you rotate? How current is your audit? When did you last review what has access to what?
If the answer is "I don't remember," that's the vulnerability. Not the password itself, not the encryption algorithm, not the authentication protocol. The vulnerability is the gap between what you know you should do and what you actually do.
I'm going to go rotate my passwords now. Probably.
## References
1. [NIST SP 800-63-4 Digital Identity Guidelines](https://pages.nist.gov/800-63-4/)
2. [The problems with forcing regular password expiry, UK National Cyber Security Centre](https://www.ncsc.gov.uk/blog-post/problems-forcing-regular-password-expiry)
3. [Why Password Policies Are Failing in 2026, Logically](https://www.logically.com/all-resources/why-password-policies-are-failing-in-2026-and-what-actually-works-now)
4. [300,000 People Impacted by Eurail Data Breach, SecurityWeek](https://www.securityweek.com/300000-people-impacted-by-eurail-data-breach/)
5. [Canva Security Incident May 24 FAQs, Canva Help Center](https://www.canva.com/help/incident-may24/)
6. [Carousell fined for data breaches, The Straits Times](https://www.straitstimes.com/singapore/carousell-fined-58k-for-data-breaches-including-one-where-data-of-26m-users-were-sold-on-hacking-forum)
7. [Hackers steal \$20 million from Revolut, CS Hub](https://www.cshub.com/attacks/news/hackers-steal-20-million-from-revolut)
8. [Insufficient Credential Hygiene, OWASP/Palo Alto Networks](https://www.paloaltonetworks.com/cyberpedia/insufficient-credential-hygiene-cicd-sec6)
9. [Passkey vs Password: Are Passkeys Safer?, Authgear](https://www.authgear.com/post/passkey-vs-password-why-passkeys-are-the-future-of-security)
10. [State of Passkeys, Corbado](https://state-of-passkeys.io/windows)
11. [Passkey Implementation Overview, FIDO Alliance](https://fidoalliance.org/implement-passkeys-overview/)
