---
title: "Nobody reads documentation"
date: "2026-03-18"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Every developer has been there. You spend a weekend writing thorough documentation for your project, complete with examples, edge cases, and architecture diagrams. A week later, someone opens a Slack thread: "Hey, how does the auth flow work?" You paste the link. They say thanks. They never click it.
Developers write docs that nobody reads, then complain that nobody reads the docs. But the problem isn't laziness on the reader's part. It's that documentation is almost always written for the wrong audience at the wrong time.
## The curse of knowledge
The fundamental paradox of documentation is that the person writing it knows too much, and the person reading it knows too little. The gap between those two states is almost never bridged well.
When you've just built a system, everything feels obvious. You skip over the assumptions baked into your mental model because you can't unsee them. You write "configure the middleware" as if the reader already knows which file to open, what format the config takes, and why the middleware exists in the first place.
This is the curse of knowledge in action. Research in cognitive psychology has shown that once you know something, it's extremely difficult to imagine not knowing it. Documentation authors consistently overestimate what readers already understand. The result is docs that make perfect sense to the person who wrote them and almost nobody else.
The gap compounds over time. As software evolves, docs drift further from reality. In fast-paced environments, especially those using Agile methodologies, maintaining up-to-date documentation is an afterthought. Developers deprioritize it because of tight deadlines and a focus on shipping working code. The docs become stale, and stale docs are arguably worse than no docs, because they actively mislead.
## Developers don't read, they mine
Here's the thing most documentation authors get wrong: developers don't read docs the way you read a book. They don't start at the beginning and work through to the end. They arrive with a specific problem, scan for the relevant section, grab what they need, and leave.
As one developer put it, developers don't read your documentation, they mine it. They land on a page with a problem to solve, find a code snippet, copy it, and paste it into their IDE. If that snippet fails, they don't file a bug. They just leave, probably for good.
This means the traditional approach of writing long, sequential documentation is fundamentally mismatched with how developers actually consume information. The best documentation isn't comprehensive, it's scannable. It doesn't explain everything, it answers the question the reader showed up with.
## AI is eating documentation (and that might be fine)
Something interesting has happened in the last couple of years. Developers increasingly skip docs entirely and go straight to ChatGPT or Claude. Need to understand an API endpoint? Ask the AI. Confused by an error message? Paste it into a chat. Want a working example in your language of choice? The AI generates one in seconds.
Is this bad? On one level, it feels like a failure of documentation. But on another, it might be documentation finally meeting developers where they are. AI chatbots do several things that traditional docs struggle with: they speak plain language, they don't make you feel stupid for asking basic questions, they adapt their explanation to your level of understanding, and they give you a working example tailored to your exact situation.
The catch is that AI can confidently produce wrong answers. It hallucinates features that don't exist, suggests deprecated APIs, and misses edge cases, which is the exact opposite of what good documentation should do. The true power of AI isn't replacing docs but making technical concepts more accessible. It's a complement, not a substitute.
Some companies are already leaning into this. Tools like DocsBot and Mintlify are building AI layers on top of existing documentation, using retrieval-augmented generation to ground answers in the actual source material. The docs become the database, and the AI becomes the interface. Users get conversational answers without the AI making things up, because every response is anchored to verified content.
This points to a future where "reading the docs" might mean asking a question and getting back a precise, sourced answer, rather than scrolling through a 40-page reference guide. The documentation still matters, it just stops being the user-facing layer.
## The hierarchy of useful documentation
Not all documentation formats are created equal. If you've spent any time in the developer ecosystem, you've probably developed an intuition for what actually helps:
1. **A working example.** Nothing beats code you can copy, run, and modify. If your documentation doesn't have this, everything else is window dressing.
2. **A 30-second video.** A short screen recording showing the thing in action removes ambiguity faster than any written explanation.
3. **A well-structured README.** Clear sections, a quick-start guide, and a table of contents go a long way.
4. **Walls of text.** These are last. Detailed prose has its place, but it should never be the first thing a developer encounters.
The best documentation feels less like a manual and more like a product. It has structure, it anticipates questions, and it respects the reader's time.
## Why open source lives or dies by docs
In the open-source world, documentation quality isn't just nice to have, it's existential. The adoption funnel for any open-source project starts at the README. A developer lands on your GitHub repo, scans the README for 30 seconds, and decides whether to invest more time. If the README is confusing, sparse, or clearly outdated, they move on. The code could be brilliant. It doesn't matter.
Clear and well-structured documentation lowers the barrier to entry, making it easier for developers to understand and start using a project. It enables adoption by providing installation instructions, usage examples, and integration guides. Beyond initial adoption, documentation empowers collaboration. When contributors have access to accurate and up-to-date docs, they can contribute code, submit bug fixes, and improve the project's quality.
The projects that win aren't necessarily the ones with the best code. They're the ones that make it easiest to get started.
## The READMEs that actually work
A few companies have become reference points for developer documentation done right, and it's worth understanding what they do differently.
**Stripe** is the gold standard. Ask any developer which company has the best documentation, and Stripe is the answer you'll hear most often. What makes their docs exceptional isn't just the content, it's the structure and embedded functionality. You can switch between programming languages seamlessly. Examples are pre-populated with data from your own Stripe account, making them immediately meaningful. Their docs feel less like reference material and more like an interactive tutorial. Stripe built a custom Markdown-based syntax called Markdoc to power their docs, and they've open-sourced it. They also embed documentation quality into their engineering culture, including it in career ladders and performance reviews. Writing good docs isn't a chore at Stripe, it's part of the job.
**Supabase** takes a similar developer-first approach. Their documentation includes interactive examples, and the writing assumes you're smart but new to their specific tool. The quick-start guides get you from zero to a working project in minutes, which is exactly what a developer evaluates when deciding whether to adopt a technology. Their docs also benefit from being tightly coupled to a product that's designed around developer experience, clean dashboard, solid CLI, and logical abstractions.
**Vercel** rounds out the trio by focusing on seamless integration with developer workflows. Their documentation isn't just about explaining features, it's about reducing the gap between reading and doing. Git-based workflows, automatic preview deployments, and a platform that "just works" mean that the docs rarely need to explain workarounds or edge cases. When the product itself is intuitive, the documentation's job gets a lot easier.
The common thread across all three: they treat documentation as a product, not an afterthought.
## Docs-as-code: treating docs like they matter
The "docs-as-code" movement is built on a simple premise: documentation should be written and maintained using the same tools and processes as code. That means version control with Git, plain text markup like Markdown, code reviews on every change, and automated testing and deployment.
This approach, championed by the Write the Docs community and adopted by a growing number of engineering teams, creates a culture where writers and developers both feel ownership of documentation. It enables some powerful workflows: you can block merging of new features if they don't include documentation updates, which incentivizes developers to write about features while they're fresh. When code gets reviewed, docs get reviewed. When code deploys, docs deploy.
The real shift, though, is treating documentation like a product with actual metrics. Not vanity metrics like page views, but real impact questions: Where are users dropping off? What searches return nothing? What code samples fail? Which tutorials don't get completed? When you start measuring these things, you can iterate on your docs the same way you iterate on your product.
This is where most teams fall short. They write the docs once and consider the job done. But documentation, like software, rots. The only way to keep it useful is to maintain it continuously, and the only way to justify that maintenance is to measure its impact.
## The incentive problem
None of this is really about developers being bad writers or readers being lazy. It's about incentives. In most engineering organizations, shipping code is rewarded. Writing documentation is not. There's no promotion track for the engineer who maintains beautiful, comprehensive docs. There's no sprint points allocated for rewriting a confusing README.
Stripe figured this out early. They made documentation quality part of their engineering culture, not a separate concern handled by a technical writing team after the fact. Their leadership set the tone, and their career ladder reinforces it.
Until more organizations follow that lead, documentation will continue to be written by people who know too much, for people who know too little, at a time when neither party has the incentive to bridge the gap.
## What actually works
If you're building something and want people to actually use your documentation, here's what the evidence suggests:
**Start with a working example.** Before you write a single paragraph of explanation, make sure there's code someone can copy and run.
**Write for the scanner, not the reader.** Use clear headings, short paragraphs, and put the most important information first. Nobody is reading your docs top to bottom.
**Keep docs close to code.** The further documentation lives from the codebase, the faster it drifts out of date. Docs-as-code isn't just a philosophy, it's a practical solution to staleness.
**Measure what matters.** If you don't know which pages people visit, where they drop off, or what they search for and can't find, you're flying blind.
**Meet developers where they are.** That might mean an AI chatbot layer on top of your docs. It might mean a Discord community. It might mean a two-minute video. It almost certainly doesn't mean a 50-page PDF.
**Make documentation part of the job.** If your culture treats docs as optional, they'll be treated as optional. Build it into code reviews, career ladders, and the definition of done.
The problem was never that nobody reads documentation. The problem is that most documentation isn't written to be read.
## References
1. Write the Docs, "Documentation as Code," [https://www.writethedocs.org/guide/docs-as-code.html](https://www.writethedocs.org/guide/docs-as-code.html)
2. Stack Overflow Blog, "Why do developers love clean code but hate writing documentation?" [https://stackoverflow.blog/2024/12/19/developers-hate-documentation-ai-generated-toil-work/](https://stackoverflow.blog/2024/12/19/developers-hate-documentation-ai-generated-toil-work/)
3. Mintlify, "How Stripe creates the best documentation in the industry," [https://www.mintlify.com/blog/stripe-docs](https://www.mintlify.com/blog/stripe-docs)
4. Mintlify, "New Devs Don't Read Docs? Maybe It's Not Their Fault," [https://www.mintlify.com/blog/new-devs-dont-read-docs-maybe-its-not-their-fault](https://www.mintlify.com/blog/new-devs-dont-read-docs-maybe-its-not-their-fault)
5. DEV Community, "The Role of Documentation in Open Source Success," [https://dev.to/opensauced/the-role-of-documentation-in-open-source-success-2lbn](https://dev.to/opensauced/the-role-of-documentation-in-open-source-success-2lbn)
6. Compositecode Blog, "Treating Documentation as a Product," [https://compositecode.blog/2025/12/03/treating-documentation-as-a-product/](https://compositecode.blog/2025/12/03/treating-documentation-as-a-product/)
7. Mintlify, "How and why you should adopt Docs as Code," [https://www.mintlify.com/blog/adopt-docs-as-code](https://www.mintlify.com/blog/adopt-docs-as-code)
8. DEV Community, "ChatGPT vs Documentation," [https://dev.to/peboycodes/chatgpt-vs-documentation-3ma5](https://dev.to/peboycodes/chatgpt-vs-documentation-3ma5)
