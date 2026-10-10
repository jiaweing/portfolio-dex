---
title: "Unreliability of emails and SMS"
date: "2026-04-24T16:50:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Security","Regulation","Apple","Google","Microsoft","Singapore","US"]
---

You sign up for an app. It asks for your phone number or email to verify your identity. A code gets sent. You wait. And wait. Nothing arrives.
This is not a rare edge case. It is one of the most common friction points in modern software, and it is getting worse. The channels we rely on for authentication, email and SMS, were never designed for this purpose. They are unreliable, increasingly filtered, and in some cases actively hostile to the very messages your users need to receive.
## So many factors can go wrong
When an app sends you an OTP, a magic link, or a 2FA code, that message has to survive a gauntlet before it reaches you. For SMS, the message passes through multiple carriers, routing agreements, and aggregators before landing on your phone. For email, it has to clear SPF, DKIM, and DMARC checks, survive spam filters, and hope your inbox provider does not quietly bury it.
At every hop, something can go wrong. Network congestion can delay SMS past the timeout window. Carrier spam filters can silently swallow messages. Email providers can route your login code straight to junk. And the user on the other end has no idea any of this happened.
According to Authsignal, SMS OTPs have roughly a 20% failure rate for delivery. One in five messages simply does not make it. That is not a rounding error. That is a fundamental infrastructure problem.
## Spam filters are getting aggressive
Email deliverability in 2026 is no longer just a technical configuration problem. Mailbox providers like Gmail, Microsoft, and Yahoo now evaluate engagement signals, complaint rates, unsubscribe behavior, and sending consistency. A perfectly authenticated email can still land in spam if the provider decides your sending pattern looks off.
The same is happening on the SMS side. Carriers increasingly block messages from short codes and bulk senders as part of anti-spam measures. If your OTP provider's reputation takes a hit, your users stop receiving codes, and you might not even know it until support tickets start piling up.
## Singapore's "Likely Scam" label
Singapore offers a particularly vivid example of how anti-scam measures can backfire on legitimate businesses. Under the SMS Sender ID Registry (SSIR), any SMS from an organization not registered in the central registry gets labelled as "Likely Scam." This went into effect in January 2023.
The intent is good: protect users from scam messages. But the side effect is brutal. As Toku documented, some phone operating systems automatically filter these flagged messages into spam or junk folders without even notifying the user. The recipient never sees a notification. They have no idea a message was sent at all.
Imagine a user waiting for a login code that was sent, delivered to their phone, but silently buried in a junk folder they never check. From their perspective, your app is broken.
## When your login depends on delivery
Here is the core problem: when you use email or SMS as your authentication channel, you are making message delivery a hard dependency for your users to access your product. If the message does not arrive, the user cannot log in. Your app is effectively broken for them, and there is nothing they can do about it.
This is not a theoretical concern. It plays out constantly with major platforms.
Instagram is notorious for SMS verification failures. Users report not receiving 6-digit codes, getting locked out of their accounts with no recourse. The platform insists on verifying phone numbers and identities but provides no alternative when SMS delivery fails. Forums and help articles are filled with frustrated users who simply cannot get back into their accounts.
iCloud has similar issues during account creation. Users trying to set up new Apple IDs hit verification walls when codes fail to arrive. Apple's own support pages acknowledge the problem, suggesting users check network connections, restart devices, and try again, but none of that helps when the underlying delivery channel is the bottleneck.
## Magic links, OTP, 2FA: same underlying problem
It is tempting to think of these as separate features, but they all share the same fragile foundation. Magic links send a one-time URL via email. OTPs send a numeric code via email or SMS. 2FA sends a verification code via SMS. Different packaging, same delivery channel, same failure modes.
If your email lands in spam, the magic link is useless. If the SMS gets filtered, the OTP never arrives. If the carrier blocks the short code, 2FA becomes a lockout mechanism instead of a security feature.
The irony is that these methods exist to improve security, but their reliance on unreliable channels means they often just create a different kind of failure. Instead of users getting hacked, they get locked out.
## The cost is real
Beyond user frustration, there are tangible business costs. Every failed authentication attempt can generate a support ticket. Users who cannot log in churn. And SMS itself is expensive at scale, with costs accumulating per message through providers like Twilio or Vonage.
Regulators are starting to take notice too. The FBI and CISA issued formal guidance against SMS-only authentication in 2025. The UAE Central Bank mandated elimination of SMS and email OTPs for financial institutions by March 2026. India set a similar deadline for April 2026. NIST SP 800-63-4, finalized in July 2025, classified SMS OTP as not meeting phishing-resistant assurance requirements.
The regulatory direction is clear: SMS OTP is being phased out in high-stakes contexts.
## What actually works better
The industry is moving toward alternatives that do not depend on message delivery at all.
**Passkeys and WebAuthn** use cryptographic key pairs stored on the user's device. Authentication happens locally through biometrics or a device PIN, with no code to send, intercept, or lose. Apple, Google, and Microsoft have all invested heavily in passkey support. The user experience is faster and more secure than any OTP flow.
**Authenticator apps** like Google Authenticator or Authy generate time-based codes on the device itself. No SMS, no email, no carrier dependency. The codes are generated offline using a shared secret established during setup.
**Push notifications** through dedicated authentication apps let users tap "Approve" instead of typing a code. These are tied to cryptographic device verification and are far harder to phish than a 6-digit number.
**Silent network authentication (SNA)** is an emerging approach that verifies the user's phone number directly through the carrier network, with no code sent at all. The verification happens invisibly in the background. It eliminates the code entirely, removing the delay, the failure mode, and the attack surface all at once.
## The takeaway
Email and SMS were built for communication, not authentication. Every time we use them to verify identity, we are betting on infrastructure that was never designed for reliability guarantees. Spam filters are getting smarter, carriers are getting more aggressive with blocking, and governments are adding new filtering layers that can silently swallow legitimate messages.
If your product depends on users receiving a code to log in, you are one spam filter update away from a wave of locked-out users and support tickets. The technology to move past this exists today. The question is whether we will keep building on a foundation we know is crumbling.
## References
1. [SMS OTP replacement in 2026: what leading companies are implementing](https://www.authsignal.com/blog/articles/sms-otp-replacement-in-2026-what-leading-companies-are-implementing)
2. [SMS-based authentication: why it's no longer enough for security](https://www.authsignal.com/blog/articles/why-sms-based-authentication-is-no-longer-enough-for-secure-account-protection)
3. [Silent network authentication: the invisible layer replacing SMS OTP in 2026](https://securityboulevard.com/2026/04/silent-network-authentication-the-invisible-layer-replacing-sms-otp-in-2026/)
4. [Email deliverability in 2026: why it is no longer just an ESP issue](https://blueshift.com/blog/email-deliverability-in-2026/)
5. [Labelled "Likely Scam" under SSIR: what happened and how to ensure it does not impact your business](https://toku.co/blog/labelled-likely-scam-under-ssir-what-happened-and-how-to-ensure-it-does-not-impact-your-business/)
6. [SMSes from organisations not in central registry to be labelled "Likely Scam"](https://www.channelnewsasia.com/singapore/smses-organisations-not-in-central-registry-be-labelled-likely-scam-jan-31-5595756)
7. [Beyond the OTP: why SMS-based 2FA is failing and what comes next](https://www.prove.com/blog/error-handling)
8. [SMS OTP delivery problems and solutions](https://mojoauth.com/white-papers/sms-otp-delivery-problems-solutions/)
9. [A crash course in passkeys and WebAuthn](https://jc1175.medium.com/a-crash-course-in-passkeys-and-webauthn-0d3ed4995e53)
10. [OTP alternatives: a 2025 authentication security guide](https://www.iddataweb.com/one-time-password-alternatives/)
