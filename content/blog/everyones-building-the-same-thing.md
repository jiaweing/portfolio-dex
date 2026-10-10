---
title: "Everyone’s building the same thing "
date: "2026-04-03T13:58:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: []
---

Open any indie hacker forum, scroll through Twitter, or browse Product Hunt on launch day. You'll see it immediately: the same AI expense tracker, the same travel planning app, the same meeting assistant, the same note-taking tool, the same wrapper around someone else's API. Everyone is building the same thing.
I've been in this place more times than I'd like to admit. And every time, it stings a little more.
## The pattern I can't escape
In early 2024, I built Decosmic, one of the first platforms to let non-technical users deploy AI agents grounded in trusted documents through retrieval-augmented generation. RAG wasn't a buzzword yet. The idea that you could pipe your own files into an LLM and get answers that didn't hallucinate felt genuinely new. I was ahead of the curve, or so I thought.
Then between late 2024 and mid 2025, I pivoted to Dense, a local-first AI meeting app. At the time, running models on-device wasn't mature enough to fully realize the vision. But I believed deeply that the future of AI was local, private, and personal. Fast forward to today, and tools like Granola and Notion AI meetings have validated exactly that foresight. The market is now flooded with what I envisioned back then.
Then came Ryu, a privacy-first desktop AI assistant with native Telegram and WhatsApp integration, built before OpenClaw exploded onto the scene. I remember thinking the concept of a self-hosted bot running on your desktop that could talk to you through your messaging apps was genuinely novel. I thought it was insane, in the best way. But by the time OpenClaw hit 250,000 GitHub stars and spawned an entire ecosystem of clones, my early-mover advantage had evaporated. Everyone was already building the same thing.
## Why convergence is inevitable
There's a structural reason this keeps happening, and it's not just bad luck.
When a new technology platform emerges, whether it's LLMs, local inference, or agentic frameworks, it creates a sudden burst of possibility. Thousands of builders see the same capabilities at roughly the same time. They read the same blog posts, watch the same demos, and experience the same pain points in their daily lives. Naturally, they reach for the same solutions.
The AI expense tracker exists because everyone hates expense reports and everyone just got access to GPT-4. The meeting summarizer exists because everyone sits through too many calls and just discovered Whisper. The AI wrapper exists because OpenAI handed the world an API and a billing page, and suddenly anyone with a Tailwind template and a Stripe account could call themselves a startup.
As Peter Thiel argues in *Zero to One*, competition is for losers. When you're fighting over the same slice of an existing market, prices drop, sales fragment, and profits evaporate. The only way to build something truly valuable is to go from zero to one, to create something new rather than copying what already exists. But in the age of AI, going from zero to one has become extraordinarily difficult because the underlying capabilities are so accessible that everyone arrives at "one" simultaneously.
## The wrapper graveyard
The numbers paint a grim picture. By some estimates, 80 to 90 percent of AI startups are essentially wrappers, pretty interfaces stapled onto someone else's model. They take a transcript, run it through a few hardcoded prompts like "summarize this" or "turn it into a tweet," and charge a monthly fee for what amounts to a few API calls.
The economics don't hold. When the model providers themselves start shipping the same features, and they always do, the wrapper's value proposition collapses overnight. OpenAI builds it in. Anthropic ships it natively. Google adds it to Workspace. The wrapper startups scramble to pivot, differentiate, or die.
This isn't hypothetical. The wave of AI copywriting tools that surged in 2022 cratered once GPT-4's native interface improved. The same pattern is playing out in every vertical, from coding assistants to chat-driven spreadsheets to, yes, AI meeting apps and desktop agents.
## The real problem isn't the product
Here's what I've learned through three iterations of building things early and watching the market catch up: the product is rarely what matters.
The companies that survive the convergence wave aren't the ones with the best prompt engineering or the cleanest UI. They're the ones with distribution, trust, data, and workflow depth. They've moved beyond "AI that answers questions" into "AI that manages entire workflows." They own something the model provider can't easily replicate.
This is the blue ocean insight applied to AI. Instead of competing in the red ocean where everyone is fighting over the same AI-powered features, the real opportunity lies in creating entirely new categories of value. Not another meeting summarizer, but a fundamentally different relationship between humans and their tools. Not another wrapper, but a deep integration into specific workflows that creates genuine switching costs.
## So what's the point?
I'd be lying if I said I have this figured out. There are days when the convergence feels suffocating, when every idea I get excited about already has twelve competitors by the time I ship a prototype. The instinct to ask "what's the point?" is real.
But I think the answer lies somewhere in the space between timing and taste.
Timing, because being early isn't the same as being right. The market has to be ready. The technology has to be mature enough. The distribution channels have to exist. Being six months too early can be indistinguishable from being wrong.
And taste, because when everyone has access to the same models, the same APIs, and the same frameworks, the differentiator becomes the decisions you make about what to build and, more importantly, what not to build. It's the opinionated choices. The willingness to go deep on one thing instead of broad on everything. The conviction to say "this is how it should work" when everyone else is copying the same playbook.
The truth is, building the same thing as everyone else isn't a death sentence. It's just the starting line. What you do from there, the depth you pursue, the specific problems you obsess over, the users you actually talk to, that's where the real divergence happens.
Everyone might be building the same thing. But not everyone is building it the same way, for the same people, with the same conviction. And maybe that's enough.
## References
1. Peter Thiel and Blake Masters, *Zero to One: Notes on Startups, or How to Build the Future* (Crown Business, 2014)
2. [The AI Wrapper Problem: Why 80% of "AI Startups" Will Disappear by 2026](https://medium.com/@Binoykumarbalan/the-ai-wrapper-problem-why-80-of-ai-startups-will-disappear-by-2026-6b4a873b0ad3)
3. [The death of AI wrappers is actually happening](https://www.reddit.com/r/ArtificialInteligence/comments/1p09tol/the_death_of_ai_wrappers_is_actually_happening/)
4. [99% of AI Startups Will Be Dead by 2026](https://skooloflife.medium.com/99-of-ai-startups-will-be-dead-by-2026-heres-why-bfc974edd968)
5. [Beyond the Blank Slate: Escaping the AI Wrapper Trap](https://jeffreybowdoin.com/beyond-blank-slate-escaping-ai-wrapper-trap/)
6. [Red Ocean vs Blue Ocean Strategy](https://www.blueoceanstrategy.com/tools/red-ocean-vs-blue-ocean-strategy/)
7. [The Graveyard of AI Startups: Startups That Forgot to Build Real Value](https://dev.to/dev_tips/the-graveyard-of-ai-startups-startups-that-forgot-to-build-real-value-5ad9)
