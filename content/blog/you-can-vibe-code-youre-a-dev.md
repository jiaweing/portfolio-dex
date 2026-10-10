---
title: "You can vibe code ≠ you’re a dev"
date: "2026-03-21T14:23:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Andrej Karpathy coined the term "vibe coding" in February 2025, describing it as a workflow where you "fully give in to the vibes, embrace exponentials, and forget that the code even exists." He meant it for throwaway weekend projects. Somewhere along the way, an entire industry decided to build a business model around it, and now we have a problem.
## The gap between can and should
If you're a developer and you vibe code, I think you're qualified to a certain level. You understand what you're talking about. You know what a backend is, what an API key does, why you don't put secrets in client-side code. When something breaks, you have the mental model to debug it, or at least to know *where* to start looking.
But that's not who these platforms are targeting.
Replit, Lovable, Bolt, and others are pitching the idea that people who can't code should "code." They're marketing directly to non-technical founders, designers, and hobbyists, telling them they can build production apps by typing prompts into a chat box. And sure, something will come out the other end. It'll look like an app. It might even work for a demo. But the moment something goes wrong, there's nothing they can do.
This isn't a new pattern. We had no-code tools before, drag-and-drop builders that abstracted away complexity. But those tools had guardrails. They were constrained by design. Vibe coding is different because it generates *actual code* that runs in production, written by someone who has no idea what it says or does.
## The security disaster that's already happening
The consequences aren't theoretical. They're playing out in real time.
RedHunt Labs published research showing thousands of secrets leaking through vibe-coded sites. The pattern is predictable: users paste API keys into prompts, the AI embeds them in public client-side code, and suddenly anyone can access those services with the original owner's privileges. Stripe keys enabling financial theft. Supabase connection strings leading to full database breaches. OpenAI and ElevenLabs keys racking up charges on someone else's account.
One developer on Hacker News shared how they lost \$300 after their Gemini API key leaked from a vibe-coded project. Another Reddit user found a hardcoded OpenAI key in a vibe-coded mobile app in 30 seconds flat. Security researcher Jeremiah Fowler found that Moltbook, a vibe-coded AI social network, exposed user data and API keys with zero authentication controls.
A Databricks study confirmed that vibe coding regularly produces critical vulnerabilities, including arbitrary code execution and memory corruption, even when the generated code appears to work perfectly fine. And an audit of five apps built with Cursor and Lovable found that *all five* leaked their entire databases.
The fix for most of these issues is basic stuff: use environment variables, run a backend proxy, don't expose secrets in client-side bundles. But that's the whole point. If you don't know what "client-side" means, you don't know you have a problem until the credit card bill arrives.
## The scalpel analogy
I keep coming back to this: giving someone who isn't a developer a vibe coding tool and telling them to build an app is like handing someone a scalpel and telling them to perform surgery. Just because you can cut doesn't mean you're a doctor.
The scalpel is a powerful tool. In trained hands, it saves lives. In untrained hands, it causes damage. The problem isn't the tool. The problem is removing the layer of expertise and pretending the tool alone is enough.
And this is what these platforms are doing. They're extracting the knowledge layer, the understanding of security, architecture, data flow, error handling, and replacing it with a chat interface. The marketing says "build anything." The reality is "build anything and hope nothing goes wrong."
## This pattern is everywhere now
Vibe coding isn't happening in isolation. It's part of a broader wave where AI bridges the gap between wanting to do something and actually knowing how to do it.
You don't know how to edit images? There are AI tools for that. You can't make music? Suno AI will generate a full track from a text prompt. You want a video? Just describe it and hit generate.
The output looks real. It sounds professional. But you didn't create it, not in any meaningful sense. You described what you wanted and a model filled in everything you didn't know. The gap between "I made this" and "I described this and a machine made it" keeps getting papered over.
With images and music, the stakes are relatively low. You get a mediocre song or a weird-looking photo, and nobody gets hurt. But with code, the stakes are completely different. Code handles payments. Code stores personal data. Code runs infrastructure. When vibe-coded software fails, real people get affected.
## The ownership question
This raises something that doesn't get talked about enough: if you didn't write the code, do you actually own it?
Under current U.S. copyright law, works created entirely by AI without significant human involvement may not be eligible for copyright protection. The U.S. Copyright Office has been clear that AI cannot be an author. If a developer uses AI as an assistant, refining and modifying the output, there's a reasonable argument for copyright protection. But if someone describes an app in plain English and accepts whatever the model generates without reading or understanding it, the legal ground gets shaky.
This matters for anyone building a business on vibe-coded software. If your codebase isn't copyrightable, it can't be protected. Anyone could theoretically use the same code, and you'd have limited legal recourse. For throwaway prototypes, this is fine. For a product you're charging money for, it's a real risk that most vibe coders aren't even thinking about.
## What actually makes a developer
Being a developer was never just about typing code into an editor. It's about understanding systems. Knowing why you make certain decisions. Recognizing trade-offs between speed and reliability, between features and security. It's about debugging not just the error message but the *thinking* that led to the error.
Vibe coding tools are incredible for developers who already have this understanding. They speed up the boring parts. They handle boilerplate. They let you prototype faster than ever. When Karpathy talks about vibe coding, he's talking about *his* experience as a world-class AI researcher who understands every layer of the stack even if he's choosing not to engage with it directly.
That context matters. Karpathy himself said it's "not too bad for throwaway weekend projects." He wasn't suggesting it as a way to build production software. He wasn't saying everyone should do it. The platforms selling vibe coding to non-developers took a casual observation and turned it into a product category.
## Where this is heading
I don't think vibe coding is going away. If anything, it's going to get better. Models will improve. Security defaults will get smarter. Some of these platforms will add guardrails that catch the most obvious mistakes.
But the fundamental issue remains: understanding what you're building matters. Tools can lower the barrier to entry, but they can't eliminate the need for knowledge. The gap between "I made an app" and "I understand the app I made" is where all the risk lives.
If you're a developer, vibe code away. You've earned the context to do it responsibly. But if you're not, and you're building something that handles real data, processes real payments, or serves real users, please recognize what you don't know. Hire someone who does. Or at the very least, get a security review before you ship.
Just because you can prompt an app into existence doesn't mean you're a developer. And pretending otherwise isn't empowering. It's dangerous.
## References
1. Andrej Karpathy, original "vibe coding" post on X (February 2025), [https://x.com/karpathy/status/1886192184808149383](https://x.com/karpathy/status/1886192184808149383)
2. RedHunt Labs, "Echoes of AI Exposure: Thousands of Secrets Leaking Through Vibe Coded Sites," [https://redhuntlabs.com/blog/echoes-of-ai-exposure-thousands-of-secrets-leaking-through-vibe-coded-sites-wave-15-project-resonance/](https://redhuntlabs.com/blog/echoes-of-ai-exposure-thousands-of-secrets-leaking-through-vibe-coded-sites-wave-15-project-resonance/)
3. Databricks, "Passing the Security Vibe Check: The Dangers of Vibe Coding," [https://www.databricks.com/blog/passing-security-vibe-check-dangers-vibe-coding](https://www.databricks.com/blog/passing-security-vibe-check-dangers-vibe-coding)
4. Infosecurity Magazine, "Vibe-Coded Moltbook Exposes User Data, API Keys and More," [https://www.infosecurity-magazine.com/news/moltbook-exposes-user-data-api/](https://www.infosecurity-magazine.com/news/moltbook-exposes-user-data-api/)
5. Towards Data Science, "The Reality of Vibe Coding: AI Agents and the Security Debt Crisis," [https://towardsdatascience.com/the-reality-of-vibe-coding-ai-agents-and-the-security-debt-crisis/](https://towardsdatascience.com/the-reality-of-vibe-coding-ai-agents-and-the-security-debt-crisis/)
6. MBHB, "Navigating the Legal Landscape of AI-Generated Code: Ownership and Liability Challenges," [https://www.mbhb.com/intelligence/snippets/navigating-the-legal-landscape-of-ai-generated-code-ownership-and-liability-challenges/](https://www.mbhb.com/intelligence/snippets/navigating-the-legal-landscape-of-ai-generated-code-ownership-and-liability-challenges/)
7. U.S. Copyright Office guidance on AI-generated works and human authorship requirements
8. Wikipedia, "Vibe coding," [https://en.wikipedia.org/wiki/Vibe_coding](https://en.wikipedia.org/wiki/Vibe_coding)
9. The New Stack, "Vibe coding is passé. Karpathy has a new name for the future of software," [https://thenewstack.io/vibe-coding-is-passe/](https://thenewstack.io/vibe-coding-is-passe/)
