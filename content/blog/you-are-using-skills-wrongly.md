---
title: "You are using skills wrongly"
date: "2026-05-04T23:54:00.000+08:00"
lastEdited: "2026-05-03T16:01:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","LLMs","Anthropic","OpenAI","Claude","ChatGPT","Prompt Engineering"]
---

Everyone is talking about AI skills right now. Anthropic launched Agent Skills in October 2025, OpenAI followed with skills in ChatGPT, and suddenly there are marketplaces and directories popping up everywhere. People are browsing community hubs, installing pre-made skills, and expecting magic.
But here's the thing: most people are using skills completely wrong.
## What skills actually are
Before we talk about what's going wrong, let's be clear about what skills are. At their core, skills are just structured prompts. They're folders containing a `SKILL.md` file with instructions, optional scripts, and resources that tell an AI model how to complete a specific task in a repeatable way.
Anthropic describes them as "folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks." OpenAI calls them "reusable workflows that tell ChatGPT how to complete a specific task." Both platforms have adopted the same open standard format through [agentskills.io](http://agentskills.io).
The key word in both descriptions is *repeatable*. Skills exist to capture processes you do over and over again. That's it. They're not magic plugins. They're not secret sauce. They're prompts packaged in a standard format.
## The problem with browsing skill marketplaces
The moment skills became a feature, marketplaces appeared. Community hubs like [claudeskills.info](http://claudeskills.info) started curating collections. OpenAI's GPT Store already had over 3 million custom GPTs before skills even launched. Anthropic built a plugin marketplace for Claude Code. Everyone rushed to browse, install, and collect.
This is where people go wrong. They scroll through directories of skills made by strangers, install a handful that sound useful, and expect their AI workflow to improve overnight.
It doesn't work like that, for one simple reason: *someone else's workflow is not your workflow*.
A generic "blog post writer" skill doesn't know your tone, your audience, your structure preferences, or the specific steps you take when writing. A "meeting notes" skill doesn't know your team's format, your action item conventions, or how you like summaries organized. These skills might produce output that looks polished, but it won't match the way you actually work.
There are exceptions, of course. If you need a skill for a very specific technical task, like working with a particular library (Remotion, FFmpeg, a niche API), then a community skill built by someone who knows that library inside out can be genuinely valuable. The instructions in that skill encode domain knowledge you might not have.
But for general workflows? The ones you do every day? A stranger's skill is just a stranger's prompt. And you can write a better one yourself, because you know the process.
## The right way to use skills
The real power of skills comes from looking inward, not outward. Instead of browsing what others have built, start by paying attention to what *you* keep repeating.
Think about your daily work. What tasks do you find yourself explaining to the AI over and over? What processes do you run through the same steps every time? These repeating workflows are your Standard Operating Procedures, whether you've written them down or not.
**Here's the process that actually works:**
1. **Identify a repeating workflow.** Something you do at least a few times a week. Maybe it's writing a specific type of email, formatting a report, reviewing code in a particular way, or processing data from a recurring source.
2. **Do the task with the AI once, manually.** Walk through the entire process in a conversation. Explain each step, correct the output, refine the approach until the result matches what you actually want.
3. **Ask the AI to convert that conversation into a skill.** Both Claude and ChatGPT can generate a `SKILL.md` file from a conversation. The AI will extract the steps, the formatting requirements, the quality checks, and the guardrails from your working session.
4. **Test and refine.** Use the skill a few times. When the output drifts from what you want, update the instructions. Skills are just text files. They're easy to edit.
The result is a skill that captures *your* specific process, not a generic approximation of it. The prompt inside the skill already contains the exact steps to get the output you want, because those steps came from you actually doing the work.
## Why this approach works better
There's a concept in the skills architecture called **progressive disclosure**. When an AI loads a skill, it first reads the metadata (the name and description), then loads the full instructions only when relevant, and finally accesses any bundled resources as needed. This means skills are lightweight by design. They don't bloat your context window with information the AI doesn't need.
But progressive disclosure only works well when the instructions are precise. A vague skill with generic instructions forces the AI to guess at every step. A skill built from your actual workflow has specific, concrete instructions at every stage. The AI doesn't guess. It follows the process you already validated.
This is also why the "just prompts" framing matters. If skills were complex software, you'd need technical expertise to build them. But because they're structured prompts, anyone can create them. The barrier is not technical skill. It's self-awareness about your own processes.
## Practical examples
**Instead of installing a generic "weekly report" skill**, walk the AI through how you actually write your weekly report. What sections do you include? What data sources do you reference? How do you frame wins versus blockers? What tone does your manager expect? Convert that into a skill, and every Monday your report follows your exact format.
**Instead of installing a generic "code review" skill**, do a few code reviews with the AI, correcting its feedback until it matches your team's standards. What do you care about most: performance, readability, test coverage? What patterns do you flag as anti-patterns? That becomes a skill that reviews code the way you would.
**Instead of installing a generic "email drafter" skill**, draft a few emails with the AI across different scenarios: follow-ups, cold outreach, internal updates. Correct the tone, adjust the structure, specify what you never want included. Now you have a skill that writes emails in your voice for your specific contexts.
## The takeaway
Skills are one of the most practical features to come out of the AI tooling space recently. The open standard format means they work across platforms. The progressive disclosure architecture keeps them efficient. The simplicity of the `SKILL.md` format makes them accessible to everyone.
But the value of a skill is entirely determined by what's inside it. And what's inside a generic skill from a marketplace is someone else's workflow, someone else's preferences, someone else's assumptions about how work should be done.
The skills that will actually change how you work are the ones you build yourself, from the repeating processes you already run every day. Pay attention to those patterns. Capture them. Turn them into skills.
That's how skills should be used.
### References
1. Anthropic, "Agent Skills overview," Claude API documentation, 2025. [https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
2. Anthropic, "What are Skills?," Claude Help Center, 2025. [https://support.claude.com/en/articles/12512176-what-are-skills](https://support.claude.com/en/articles/12512176-what-are-skills)
3. OpenAI Academy, "Skills," OpenAI Academy Resources, February 2026. [https://academy.openai.com/public/clubs/work-users-ynjqu/resources/skills](https://academy.openai.com/public/clubs/work-users-ynjqu/resources/skills)
4. Anthropic, "Skills" (open-source repository), GitHub, 2025. [https://github.com/anthropics/skills](https://github.com/anthropics/skills)
5. The Verge, "Anthropic turns to 'skills' to make Claude more useful at work," October 2025. [https://www.theverge.com/ai-artificial-intelligence/800868/anthropic-claude-skills-ai-agents](https://www.theverge.com/ai-artificial-intelligence/800868/anthropic-claude-skills-ai-agents)
6. Katie Parrott, "Vibe Check: Claude Skills Need a 'Share' Button," Every, November 2025. [https://every.to/vibe-check/vibe-check-claude-skills-need-a-share-button](https://every.to/vibe-check/vibe-check-claude-skills-need-a-share-button)
7. Mark Chen, "Claude Code Has a Skills Marketplace Now," Medium, January 2026. [https://medium.com/@markchen69/claude-code-has-a-skills-marketplace-now-a-beginner-friendly-walkthrough-8adeb67cdc89](https://medium.com/@markchen69/claude-code-has-a-skills-marketplace-now-a-beginner-friendly-walkthrough-8adeb67cdc89)
