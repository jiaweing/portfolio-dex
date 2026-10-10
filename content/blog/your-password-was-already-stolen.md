---
title: "Your password was already stolen"
date: "2026-04-22"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Security","Privacy","Regulation","Agents","LLMs","Singapore","US","Google","Apple","Hardware"]
---

Five security incidents hit me in ten days. Carousell, Canva, GitHub, a personal Google account alert, and a breach notification from a service I barely remembered signing up for. None of these were targeted attacks. None required sophisticated hacking. They were just the normal background radiation of the internet in 2026.
At some point you stop asking "if" your credentials are compromised and start asking "which ones." The default state of digital identity is breached.
## The numbers are staggering
Verizon's 2025 Data Breach Investigations Report documented 22,052 security incidents with 12,195 confirmed data breaches across 139 countries. In the US alone, breach notifications affected 1.35 billion records in 2024, driven largely by five mega-breaches each exposing over 100 million records. The global average cost of a data breach reached \$4.44 million in 2025.
The most telling statistic: 22% of all breaches began with stolen credentials, more than any other attack vector. These credential-based incidents take an average of 292 days to detect. That means someone could be walking around with your login for nearly ten months before anyone notices.
And the problem is accelerating. Industry reports confirm a 160% surge in credential-based attacks in 2025, fueled by automation and AI.
## Credential reuse is the original sin
A Cybernews analysis of 19 billion leaked passwords found that 94% were reused or weak. Let that sink in. Nineteen billion passwords, and nearly all of them are effectively useless as a security measure.
The pattern is depressingly predictable. You sign up for some service in 2019. You use the same password you use for three other sites. That service gets breached in 2024. Now attackers have a username-password pair they can try everywhere else. This is credential stuffing, and it works because we keep giving it ammunition.
Password managers help, but adoption remains stubbornly low. Only 36% of American adults use one, according to [Security.org](http://Security.org)'s 2024 report. That means nearly two-thirds of people are still relying on memorization, browser autofill, or sticky notes. Among Gen Z, supposedly the most digitally native generation, 72% reuse the same password across accounts.
Users with password managers were significantly less likely to experience identity theft or credential theft, 17% versus 32% for those without. The tool works. People just don't use it.
## AI is accelerating both sides of the arms race
The security landscape in 2026 looks like an arms race where both sides just discovered nuclear weapons. AI scams surged 1,210% in 2025, far outpacing the 195% growth in traditional fraud. The Google Cloud Cybersecurity Forecast 2026 stated that "threat actor use of AI is expected to transition decisively to the norm."
On the attack side, AI has eliminated the tells we used to rely on. Phishing emails no longer have broken grammar or generic greetings. Language models can mimic corporate writing styles or even an individual's email voice. Voice phishing with AI-driven cloning enables hyperrealistic impersonations at scale. The window between domain registration and active phishing campaigns has collapsed to hours.
An estimated 82.6% of phishing operations now use AI in some capacity. Attackers use LLMs to generate convincing pretexts, automate credential stuffing with intelligent password prediction, and orchestrate multi-channel campaigns that hit email, voice, and video simultaneously.
On the defense side, AI powers anomaly detection, behavioral analysis, and real-time threat intelligence. Network detection and response systems catch the patterns that content-based filters miss. But defenders are playing catch-up. Traditional security training, which relied on teaching people to spot grammatical errors and suspicious formatting, is becoming obsolete when AI-generated phishing is flawless.
## The tools exist, adoption is the problem
Passkeys, the FIDO2-based authentication standard that eliminates passwords entirely, have made remarkable progress. According to the FIDO Alliance, 69% of consumers have now enabled passkeys on at least one account, and 48% of the top 100 websites support them, double from the previous year. Dashlane reported that passkey authentication doubled from 2024 to 2025, reaching 1.3 million authentications per month.
The regulatory push is real too. In July 2025, NIST published the final version of SP 800-63-4, which now requires that multi-factor authentication must offer a phishing-resistant option. Not "should" or "may," must. Syncable passkeys stored in iCloud Keychain or Google Password Manager now officially qualify as legitimate strong authentication at the AAL2 level.
But legacy systems still have a firm grip. Despite 87% of organizations acknowledging that passwords are ineffective, they remain part of the authentication stack. Development complexity is a major barrier: 46% of organizations have postponed customer identity improvements due to competing priorities, and 47% struggle to modernize legacy systems. For enterprises with complex environments, passkeys alone are not yet the complete solution many hoped for.
Hardware security keys and zero-trust architectures are similarly mature technologies with adoption problems. The friction isn't technical, it's behavioral and organizational.
## AI agents are the next credential attack surface
Here's what keeps me up at night. As AI agents proliferate across enterprise workflows, they're creating an entirely new category of credential risk. These agents authenticate using API keys, OAuth tokens, and service accounts, credentials that often have broad permissions and long lifecycles.
A SailPoint-commissioned study found that 96% of tech leaders agree AI agents are a growing security threat, yet fewer than half have policies to manage them. The problem is structural: OAuth 2.1, the protocol most agents use for authorization, was designed for human consent flows, not autonomous task delegation. This creates what researchers call a "confused deputy vulnerability," where any sub-agent can inherit the full authority of its parent.
Combine that with prompt injection attacks, where a poisoned document can escalate a read intent to a delete-all execution, and you have a systemic risk that most organizations are not prepared for.
The principles are straightforward: unique machine identities for every agent, least-privilege access controls, short-lived tokens instead of static API keys, regular credential rotation. But as with password managers and passkeys, knowing what to do and actually doing it are very different things.
## What a realistic security posture looks like in 2026
I'm not going to lecture anyone about password hygiene. Everyone knows. Few act. Instead, here's what I actually did after my ten-day streak of breach notifications:
First, I audited every account in my password manager and killed the ones I no longer use. Fewer accounts means fewer attack surfaces. Second, I enabled passkeys everywhere they're available, prioritizing high-value accounts like banking and email. Third, I moved to hardware security keys for my most critical accounts. Fourth, I reviewed every OAuth grant and API key connected to my accounts, revoking anything I didn't actively need.
The "security over convenience" trade-off is real, but it's smaller than most people think. Passkeys are actually faster than passwords. A password manager is more convenient than memorizing dozens of credentials. The upfront cost is an afternoon of setup. The ongoing cost is basically zero.
## The Singapore context
Singapore faces a disproportionately high volume of cybercrime relative to its size, driven by the deep integration of digital payment systems, e-commerce platforms, and digital identity frameworks. The attack surface here is wide.
The government has been proactive. Singapore's Cybersecurity Amendment Act came into force on 31 October 2025, extending obligations to third-party critical information infrastructure owners and new categories of digital service providers. The Cyber Security Agency is raising mandatory requirements for residential routers from Level 1 to Level 2 of the Cybersecurity Labelling Scheme by 2027, recognizing that basic protections are insufficient against sophisticated attacks.
Perhaps most notably, the PDPC announced in February 2026 that private organizations must cease using NRIC numbers for authentication purposes by 31 December 2026. Organizations that continue relying on NRIC numbers as credentials may be found in breach of the PDPA. This is significant because NRIC-based authentication has been endemic in Singapore for decades, and it's exactly the kind of static, widely-known identifier that makes credential theft trivially easy.
The Personal Data Protection Commission has also been actively enforcing data protection standards, with undertakings in 2025 addressing ransomware attacks and zero-day vulnerabilities that affected the personal data of over 400,000 individuals.
## The default state is breached
The uncomfortable truth is that if you've been online for more than a few years, some subset of your credentials has already been compromised. The question isn't whether you've been breached. It's whether the breach matters, whether your accounts are segmented enough, your authentication strong enough, and your exposure limited enough that a stolen credential from some forgotten service can't cascade into something serious.
We have the tools. Passkeys, hardware keys, password managers, zero-trust architectures, least-privilege access models. The technology is mature. The gap is entirely human: awareness, motivation, and the willingness to spend an afternoon making yourself a harder target.
Your password was already stolen. The only question is what you're going to do about it.
## References
1. Verizon, "2025 Data Breach Investigations Report" — [verizon.com/dbir](http://verizon.com/dbir)
2. IBM, "Cost of a Data Breach Report 2025" — [ibm.com/reports/data-breach](http://ibm.com/reports/data-breach)
3. Identity Theft Resource Center, "2025 Annual Data Breach Report" — [idtheftcenter.org](http://idtheftcenter.org)
4. Cybernews, "Password Leak Study: 19 Billion Passwords Analyzed" — [cybernews.com](http://cybernews.com)
5. [Security.org](http://Security.org), "2024 Password Manager Industry Report" — [security.org](http://security.org)
6. FIDO Alliance, "World Passkey Day 2025 Consumer Survey" — [fidoalliance.org](http://fidoalliance.org)
7. NIST, "SP 800-63-4 Digital Identity Guidelines" — [pages.nist.gov/800-63-4](http://pages.nist.gov/800-63-4)
8. Google Cloud, "Cybersecurity Forecast 2026" — [services.google.com](http://services.google.com)
9. Saptang Labs, "AI-Powered Credential Theft: 160% Surge in 2025" — [saptanglabs.com](http://saptanglabs.com)
10. Vectra AI, "AI Scams in 2026" — [vectra.ai](http://vectra.ai)
11. SailPoint and Dimensional Research, "AI Agents: The New Attack Surface" — [sailpoint.com](http://sailpoint.com)
12. Descope, "Passwordless Authentication Trends" — [descope.com](http://descope.com)
13. Baker McKenzie, "Singapore Cybersecurity Licensing Framework Updates" — [bakermckenzie.com](http://bakermckenzie.com)
14. Chambers and Partners, "Data Protection & Privacy 2026: Singapore" — [practiceguides.chambers.com](http://practiceguides.chambers.com)
15. Hogan Lovells, "Singapore's Cybersecurity (Amendment) Act" — [hoganlovells.com](http://hoganlovells.com)
