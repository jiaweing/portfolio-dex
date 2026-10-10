---
title: "Am I a wizard?"
date: "2026-04-14T16:55:00.000+08:00"
lastEdited: "2026-04-29T12:40:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: ["RAG","Agents","LLMs","OpenAI","Claude","Open Source","Hallucinations","Moats","Distribution"]
pinned: true
---

I keep building things that turn into trends. Not because I'm copying anyone, but because every time I start working on something, the rest of the world seems to converge on the exact same idea within months. It's happened so many times now that I genuinely have to ask: am I seeing the future, or am I just seeing what I want to see?
This is the story of five products I built (or started building) during and after university, each of which was later echoed by a well-funded company or a viral open-source project. It's also a story about moats, distribution, and a cognitive bias that might explain all of it.
## Decosmic: RAG before RAG was cool
The first thing I built during university was Decosmic, an AI platform grounded in retrieval-augmented generation, or RAG. Back then, ChatGPT was still in its early days. There was no web search, image generation was locked behind a paywall, and hallucination was the number one concern everyone had about large language models.
I was frustrated by how bad ChatGPT was at knowing context. If I wanted it to help me study, I had to re-upload my lecture notes every single session. So I built a platform where I could upload all my materials, organize them into spaces (one per module), and chat with an AI that only pulled from the documents in that space.
Decosmic was one of the very first platforms to implement RAG in a consumer-facing product. The concept of retrieval-augmented generation had been formalized in a 2020 paper by Patrick Lewis and colleagues at Meta AI, but by 2023 it was still mostly an academic technique. I was using it to ground chatbot responses in trusted, user-uploaded data, and it worked remarkably well.
My moat was simple: I didn't have to keep uploading files to ChatGPT, I didn't need a pro plan, and I was paying through the API, only for what I used. I added features like mind maps and quizzes for the education use case. But then OpenAI launched Custom GPTs, which offered essentially the same capability, and my differentiator started to erode.
The education AI space quickly became crowded. Products like Coconut, Anura, and [Tutorially.sg](http://Tutorially.sg) emerged, each targeting students with AI-powered learning tools. As a student myself, I found it hard to distribute an education product when I didn't have deep roots in the space. And I knew that once I graduated, I wouldn't be in it anymore.
So I pivoted. I took Decosmic horizontal, positioning it as an enterprise search engine. Users could upload their own data, connect documents from Google Drive, and have a chatbot that responded using their trusted internal information. It was essentially what we now call an enterprise RAG platform. But as a solo builder juggling school and a .NET tech stack that wasn't optimized for AI, I couldn't ship fast enough. The platform still runs, but I never found the distribution.
## Mavu: cloning people with AI
Around the same time, I became fascinated with the idea of digitally cloning a person's knowledge and personality. Imagine uploading everything Elon Musk has ever said publicly, fine-tuning a model on his communication style, and then being able to have a conversation with a bot that thinks and responds like him.
I wanted to call the app Mavu. But the ethical and privacy concerns were thorny, and I wasn't sure how to navigate them as a solo developer. Then Delphi launched and did exactly this, building a platform where creators and professionals could create "digital minds" of themselves, complete with text, voice, and even video call capabilities. Meta followed with AI avatars on Facebook. The space I was eyeing had materialized without me in it.
## Been: gamifying the places you visit
I built Been in 24 hours, back when coding agents weren't even available and I was relying purely on autocomplete. The idea was an app that encouraged you to go out more, track the places you've visited, and discover new ones. Think of it as a bucket list meets review aggregator: you could save places from TikTok or Instagram, see all reviews in one central spot, and turn exploring the world into a game.
Google Maps doesn't have this concept. There's no personal layer of "places I've been" with a gamified progress system on top of reviews. I thought there was a real gap.
Then Corners blew up. Then Bump. Then Placify. Then Alberto, an app that helps you save places and links from across social media. Every single one of them was building some version of what I had started with Been. I hadn't shipped it far enough to claim the space.
## Dense: local meeting transcription
Granola was growing, and meeting AI was becoming a hot category. I saw an opportunity: most of these tools required a subscription and ran inference in the cloud. But local models were getting good enough to handle transcription on-device using Whisper. Why not build a meeting app that ran entirely locally, with no subscription?
I called it Dense. I built it as an Electron app wrapping React, with inference running on ONNX models via WebGPU. The vision was solid, but the execution was painful. Desktop apps weren't my strength, and the tech wasn't quite ready. WebGPU inference was slower than native options like llama.cpp. Speaker diarization, which a potential client specifically asked for, was available in Python but not in my JavaScript-based stack.
I scrapped it. Meanwhile, the meeting app space exploded. Super Whisper launched. Granola grew. Clue pivoted from interview assistance to meetings. And now Notion itself has built-in meeting functionality. Everyone converged on the same idea.
## Ryu: orchestrating the agent era
Dense evolved into something bigger. I started building Ryu, a local desktop AI assistant that could connect to your ChatGPT accounts, use your existing subscriptions without API keys, and run as an always-on assistant with context from your screen.
The core insight was that the richest context about what a user needs comes from what they're looking at. Your screen is the ultimate context window. The second part of the vision was local desktop AI agents packaged for consumers, something you could connect to Telegram or Discord and interact with remotely while everything stayed on your machine.
Then Open Interpreter appeared. An open-source project that lets language models run code locally, control your computer through natural language, and browse the web. It was, in many ways, the exact same thing I was building, but free and backed by a growing community.
So I pivoted again. Ryuis now an orchestration layer. There are dozens of AI agent frameworks out there: Claude, open-source tools, custom enterprise agents. But nobody is bridging the gap between developers who build these agents and the consumers who want to use them. Real packages the UI layer, integrations, hosting, model selection, and everything else into one platform. You bring your agent, and we make it usable.
This is what I'm shipping now, and this time it's a full-time commitment.
## The red car theory
There's a name for what I've been experiencing. Psychologists call it the frequency illusion, or the Baader-Meinhof phenomenon. It was first described by Terry Mullen in 1994 when he noticed the name "Baader-Meinhof" twice in 24 hours, decades after the group was newsworthy. The phenomenon works through two mechanisms: selective attention makes you notice something more after you've learned about it, and confirmation bias makes each new sighting feel like proof that it's suddenly everywhere.
The colloquial version is the "red car theory." You buy a red car, and suddenly you see red cars on every street. The cars were always there. You just weren't looking.
So am I a wizard who keeps predicting the future? Probably not. What's more likely is that I'm tuned into the same signals that every other builder in the AI space is picking up on. Local models, RAG, meeting AI, agent orchestration: these aren't random ideas. They're logical next steps given the trajectory of the technology. When you're deep in a space, you're going to arrive at similar conclusions as other people who are equally deep.
But here's the uncomfortable part: arriving at the right idea at the right time isn't enough. Every single one of these projects stalled for the same reasons. Distribution was unclear. The moat was thin. The tech wasn't quite ready. Or I was building alone while juggling school.
The lesson isn't that ideas don't matter. They do, but only as a starting condition. What matters more is the ability to ship fast, find distribution, and build a defensible position before the rest of the world catches up. Because they will catch up. They're reading the same signals you are.
I'm not a wizard. But I might finally be ready to ship fast enough that it doesn't matter.
## References
1. Lewis, P. et al. (2020). "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." [NeurIPS 2020](https://proceedings.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html)
2. "Frequency illusion." [Wikipedia](https://en.wikipedia.org/wiki/Frequency_illusion)
3. "The Baader-Meinhof Phenomenon Explained." [Scribbr](https://www.scribbr.com/research-bias/baader-meinhof-phenomenon/)
4. Delphi AI. [delphi.ai](http://delphi.ai)
5. Open Interpreter. [GitHub](https://github.com/openinterpreter/open-interpreter)
