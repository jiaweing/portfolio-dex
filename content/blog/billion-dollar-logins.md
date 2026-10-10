---
title: "Billion dollar logins"
date: "2026-04-21T16:11:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Security","Privacy"]
---

You'd think that companies worth hundreds of billions of dollars would have figured out how to let people create an account. They haven't.
I was recently trying to make a new Instagram account and a new TikTok account. Instagram wouldn't send me an SMS verification code. I kept requesting a new one, and after a few attempts I got blocked for 24 hours for "sending too many requests." TikTok told me "maximum attempts reached" on my very first attempt to register. Apple, I experienced something similar a while back, where I simply couldn't create a new Apple ID, no matter what I tried.
These are not obscure startups. Instagram has 3 billion monthly active users. TikTok has nearly 2 billion. Apple has over 2.35 billion active devices worldwide. And yet, the front door to their platforms is broken.
## The login graveyard
Search for any of these problems and you'll find thousands of people reporting the exact same issues. Reddit threads, YouTube tutorials, forum posts, all from people desperately trying to do the simplest thing imaginable: make an account.
Instagram's SMS verification has been unreliable for years. Codes get silently blocked by carriers, swallowed by spam filters, or simply never arrive. Request too many times and you're locked out for 24 hours, even if the failure was entirely on their end. The workarounds people share online read like rituals: clear your cache, try a different browser, switch to mobile data, use a VPN, sacrifice a goat.
And if you do somehow make it past SMS, Instagram has another trick waiting. I've created a handful of accounts over the years, and almost every single one was instantly disabled the moment it was created. You get force-logged out, your account is hidden from everyone, and the app tells you to submit an appeal. An hour or a day later, if you're lucky, you get the "You're back on Instagram" email and can finally use the account you made. No violation, no activity, no posts, just an automatic ban handed out at the door.
This isn't a rare edge case either. Reddit has entire threads titled things like "Account disabled seconds after first login," where people describe being banned before they've even uploaded a profile picture. Quora is full of the same question asked year after year: "Why was my IG account disabled right after I created it?" and "Why has Instagram banned my account immediately after creating it?" There are even forum posts from people running into this at scale, asking how to avoid the auto-suspension that hits every new account on signup.
The flow, when you lay it out, is absurd. Create an account, get instantly banned for violating community guidelines you haven't had time to violate, submit an appeal, wait in limbo while the app tells you your "account is not visible to people on Instagram and you can't use it," then eventually get unblocked and welcomed back to the platform you just joined. You're guilty until proven innocent, and the proof is basically just existing long enough for the moderation system to shrug and let you through.
Imagine a store where every new customer is locked in a holding room for an hour while staff decides whether they look trustworthy enough to shop. That's Instagram onboarding in 2026.
TikTok's "maximum attempts reached" error is equally maddening. People report getting this message on their literal first login attempt. It triggers on fresh devices, fresh browsers, fresh installs. The most common fix people have found is to try a completely different browser or wait days. For a first-time registration.
Apple's account creation issues are documented across their own support forums, Reddit, and dozens of help articles. "Your account cannot be created at this time" is a message that has haunted new Apple device owners for years. The support page exists, the problem persists.
All of these are well-known issues. The fact that I have to find YouTube videos explaining workarounds, and still come away unable to create accounts, is embarrassing for companies of this scale.
## The real cost of a broken front door
This isn't just an inconvenience. It's a massive business problem that these companies seem content to ignore.
Research from Frontegg found that 87% of Americans have abandoned an account sign-up or purchase due to login issues. A separate study found that 83% of consumers abandon their shopping cart or registration attempt when the login process is too complex. When 60% of users abandon transactions due to authentication frustration, every broken SMS code is money walking out the door.
For platforms that depend on network effects and user growth, this is especially self-defeating. Every failed registration is a user who might never come back. Every 24-hour lockout is a window where a competitor gets a chance. The irony is that these companies spend billions on user acquisition through ads and marketing, then fumble the actual moment of conversion.
## The fragile foundation of SMS
And here's the deeper problem: all of this authentication infrastructure relies on SMS, a protocol that was never designed for security.
SMS was built in the 1980s for sending short text messages between phones. It was designed for message delivery, not confidentiality. Messages are transmitted in clear text through a chain of carriers and aggregators, any of whom can read the content. The underlying protocol, SS7 (Signaling System No. 7), has known vulnerabilities that have been publicly documented since at least 2014. Hackers can exploit SS7 to intercept text messages with nothing more than a phone number.
The delivery reliability isn't great either. SMS OTPs have roughly a 20% failure rate for delivery. Messages get delayed during network congestion, blocked by carrier spam filters, or lost entirely in areas with poor coverage. When your entire authentication system depends on a message that has a one-in-five chance of not arriving, something is fundamentally wrong.
Then there's SIM swapping. In the UK, SIM swap fraud cases surged 1,055% in 2024, rising from 289 cases to nearly 3,000. In the US, the FBI investigated over 1,000 SIM swap attacks in 2023 alone, with losses approaching \$50 million. The FTC reported that US consumers lost more than \$12.5 billion to various types of fraud in 2024, with phone-based fraud being a significant contributor. A single SIM swap attack against a T-Mobile customer resulted in a \$33 million arbitration award after the victim's cryptocurrency was stolen.
SMS-based 2FA is, as security researchers have been saying for years, one of the weakest forms of two-factor authentication. The fact that billion-dollar companies still rely on it as their primary gatekeeper is baffling.
## The path forward exists, but adoption is slow
The alternative is already here. Passkeys, built on the FIDO2/WebAuthn standard, replace passwords and SMS codes with cryptographic key pairs tied to your device. They're phishing-resistant by design, faster to use, and don't depend on carrier infrastructure that was built before the internet existed.
In 2025, NIST made phishing-resistant authentication mandatory for AAL2 (multi-factor authentication), officially recognizing syncable passkeys stored in iCloud Keychain or Google Password Manager as legitimate strong authenticators. The FIDO Alliance has been pushing adoption aggressively, and major platforms are rolling out support.
But adoption remains frustratingly slow. The companies that need passkeys most, the ones with billions of users and broken SMS flows, are the ones dragging their feet on making passkeys the default path. They offer passkeys as an option buried in settings, not as the primary registration flow.
The financial incentive is clear. The FIDO Alliance notes that moving to passkeys reduces costs for SMS text messages associated with authentication, eliminates account reset costs from forgotten passwords and lockouts, and lowers monitoring costs for defending against credential-based attacks. Fewer users drop off from critical conversion paths.
## It shouldn't be this hard
We've normalized the idea that creating an account might not work. That's insane. The signup flow is the single most important moment in a product's relationship with a user, and some of the most valuable companies on Earth have let it rot.
The technology to fix this exists today. Passkeys work. Authenticator apps work. Even email-based magic links are more reliable than SMS. The problem isn't technical, it's organizational. These companies have decided that a broken front door is acceptable because most people eventually get through. But "most people" isn't everyone, and the people who don't get through never show up in the metrics that matter.
Next time you can't log in, remember: you're not the problem. The billion-dollar company that can't send you a text message is.
## References
1. [Instagram SMS verification troubleshooting](https://www.businessinsider.com/reference/instagram-not-sending-sms-code), Business Insider
2. [TikTok "Maximum attempts reached" troubleshooting](https://ads.tiktok.com/help/article/how-to-troubleshoot-login-issues-for-tiktok-for-business), TikTok for Business
3. [If you can't create an Apple Account](https://support.apple.com/en-us/120636), Apple Support
4. [The Cost of Login Frustration](https://frontegg.com/guides/cost-of-login-frustration), Frontegg
5. [60% of Users Abandon Transactions Due to Authentication Frustration](https://martechvibe.com/article/60-of-users-abandon-transactions-due-to-authentication-frustration), Martech Vibe
6. [Consumers are still being let down by poor login experiences](https://ecommerceage.co.uk/customer-experience/first-impressions-consumers-are-still-being-let-down-by-poor-login-experiences/), Ecommerce Age
7. [Beyond the OTP: Why SMS-Based 2FA Is Failing](https://www.prove.com/blog/error-handling), Prove
8. [SMS-based authentication: Why it's no longer enough](https://www.authsignal.com/blog/articles/why-sms-based-authentication-is-no-longer-enough-for-secure-account-protection), Authsignal
9. [SIM Swap Fraud Surges 1,055%](https://www.cloudcommunications.com/news/sim-swap-fraud-surges), Cloud Communications
10. [A deep dive into the growing threat of SIM swap fraud](https://www.thomsonreuters.com/en-us/posts/corporates/sim-swap-fraud/), Thomson Reuters Institute
11. [SIM Swap Scam Statistics 2025](https://deepstrike.io/blog/sim-swap-scam-statistics-2025), DeepStrike
12. [EFF to FCC: SS7 is Vulnerable](https://www.eff.org/deeplinks/2024/07/eff-fcc-ss7-vulnerable-and-telecoms-must-acknowledge), Electronic Frontier Foundation
13. [Passwordless authentication in 2025: The year passkeys went mainstream](https://www.authsignal.com/blog/articles/passwordless-authentication-in-2025-the-year-passkeys-went-mainstream), Authsignal
14. [Displace Password + OTP Authentication with Passkeys](https://fidoalliance.org/white-paper-displace-password-otp-authentication-with-passkeys/), FIDO Alliance
15. [Instagram now has 3 billion monthly active users](https://www.cnbc.com/2025/09/24/instagram-now-has-3-billion-monthly-active-users.html), CNBC
16. [Apple Now Has More Than 2.35 Billion Active Devices Worldwide](https://www.macrumors.com/2025/01/30/apple-active-devices-worldwide-record/), MacRumors
17. [Account disabled seconds after first login](https://www.reddit.com/r/Instagram/comments/8hbrv8/account_disabled_seconds_after_first_login/), Reddit
18. [Why was my IG account disabled right after I created it?](https://www.quora.com/Why-was-my-IG-account-disabled-right-after-I-created-it), Quora
19. [Why has Instagram banned my account immediately after creating it?](https://www.quora.com/Why-has-Instagram-banned-my-account-immediately-after-creating-it), Quora
20. [Instagram is suspending my accounts right after creation, how to solve?](https://www.blackhatworld.com/seo/instagram-is-suspending-my-accounts-right-after-creation-how-to-solve.1536902/), BlackHatWorld
