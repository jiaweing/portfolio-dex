---
title: "The big agent gap"
date: "2026-03-13T15:21:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Everyone is building AI agents. Almost nobody is building them for the people who need them most.
We've entered a strange moment in AI. The technology has leapt forward dramatically. Claude Code can write and refactor entire codebases. OpenAI's Operator can browse the web and fill out forms autonomously. Anthropic's Computer Use lets Claude control a desktop like a human would. Google's Project Mariner handles concurrent tasks across virtual machines. Startups are racing to build "AI employees" you can hire from a marketplace, the way you'd find a freelancer on Fiverr.
And yet, if you ask a non-technical person what any of that means, you'll mostly get a blank stare.
## The gap nobody is talking about
Here's what I've noticed: the people building AI agents and the people who would benefit most from AI agents are two completely different groups, and they barely overlap.
As a developer, I assumed the concepts behind this technology were becoming mainstream. Terms like "LLM," "model," "agent," "prompt engineering" feel like basic vocabulary at this point. But when I started asking around outside the tech bubble, the reality hit hard. Most people know ChatGPT. Some know Claude or Gemini. That's it. They don't know what an agent is. They don't care what framework it runs on. They just want things to work.
This is the big agent gap: a chasm between what's technically possible with AI agents and what's actually accessible to the average person or business.
## Where we are today
The AI agent landscape in 2026 is impressive on paper. The market is projected to grow from \$7.8 billion in 2025 to \$52.6 billion by 2030. Gartner predicts that 40% of enterprise applications will embed task-specific AI agents by 2026. McKinsey estimates that AI-powered agents and robots could generate about \$2.9 trillion in US economic value per year by 2030.
But look closer and the picture gets murkier. While 99% of enterprise developers experimented with AI agents in 2025, mass adoption never materialized. Only 34% of companies are truly reimagining their business with AI. The rest are using it at surface level or tinkering with a few pilot projects.
The tools themselves tell the story. The most capable agent frameworks today, things like CrewAI, PydanticAI, LangGraph, and the various computer-use APIs, are built by developers, for developers. They require understanding of Python environments, API keys, model selection, prompt engineering, and orchestration patterns. Even the so-called "no-code" platforms often require what one Reddit user perfectly described as becoming "a wizard of said platform, at the cost of weeks of training."
## Why this gap is the biggest opportunity in AI
Every major technology shift has had a similar moment. The internet existed for years before the web browser made it usable. Smartphones existed before the iPhone made them intuitive. Cloud computing existed before AWS made it accessible (and even then, it took years before platforms like Heroku and Vercel simplified it further).
AI agents are at that pre-browser moment right now. The underlying capability is extraordinary. An AI agent can research a topic across dozens of sources, draft a report, schedule meetings, manage email, analyze data, and coordinate with other agents. But accessing that capability still requires you to either be technical or hire someone who is.
The companies and products that figure out how to bridge this gap, making agents as easy to use as sending a text message, will capture an enormous amount of value. This isn't just a product design challenge. It's the defining opportunity of this era.
## The interface problem
Perhaps the most interesting unsolved question is: what should the interface to an agent even look like?
Right now, most agent interactions follow the chat paradigm. You type a message, the agent responds. But chat is a poor fit for autonomous work. You wouldn't manage an employee by sending them a message and waiting for a reply every 30 seconds. You'd give them a goal, some context, and let them run.
Some companies are experimenting with different approaches. OpenAI's Operator uses a visual browser that you can watch as it works. Notion and other productivity tools are embedding agents directly into existing workflows. Some startups are trying dashboard-style interfaces where you monitor multiple agents simultaneously. Others are going fully invisible, agents that run in the background and only surface when they need input.
None of these have become the definitive answer yet. The chat interface feels too hands-on. The fully autonomous approach feels too opaque. There's a sweet spot somewhere, an interface that gives you confidence your agent is doing the right thing without requiring you to babysit it.
## What the right answer probably looks like
My point of view is that agents should be fully autonomous. You shouldn't need to handhold them. The ideal state is agents running on autopilot 90% of the time, quietly doing their work, only surfacing when something genuinely requires human judgment.
Think about how you work with a great colleague. You don't micromanage them. You set expectations, give context, and trust them to deliver. When something unexpected comes up, they flag it. Otherwise, they just get things done.
That's what the agent interface should feel like. Not a chat window. Not a visual browser replay. Something closer to a trusted team member who shows up with completed work and occasional questions.
To get there, we need a few things:
**Better defaults and templates.** Most people don't want to "build" an agent. They want to describe a problem and have an agent materialize that solves it. The setup experience needs to shrink from hours to minutes.
**Trust through transparency.** Agents need to show their work without requiring you to watch every step. Activity logs, summaries, and clear escalation paths build the kind of trust that enables autonomy.
**Embedded, not separate.** Agents shouldn't live in their own app. They should be woven into the tools people already use, whether that's email, project management, CRM, or spreadsheets.
**Graceful failure.** When agents mess up (and they will), the cost of failure needs to be low. Undo buttons, approval gates for high-stakes actions, and clear boundaries on what an agent can and can't do.
## The race is on
Every major AI company is converging on this space. OpenAI has Operator and its ChatGPT agent. Anthropic is investing heavily in computer use, recently acquiring Vercept to push those capabilities further. Google has Project Mariner and Vertex AI Agent Builder. Enterprise platforms like Salesforce, ServiceNow, and Microsoft are embedding agents into their ecosystems.
Meanwhile, a wave of startups is attacking the problem from the other direction, building consumer-friendly agent platforms like Lindy, MindStudio, and others that promise no-code agent creation.
But so far, nobody has cracked it. Nobody has created the "iPhone moment" for AI agents, the product so intuitive that your non-technical friend picks it up and immediately gets value from it.
## The bottom line
The technology is ready. The models are capable. The infrastructure exists. What's missing is the bridge, the product layer that translates raw AI capability into something anyone can use without thinking about what's under the hood.
Whoever builds that bridge won't just build a successful company. They'll define how an entire generation interacts with AI. And right now, that bridge is still waiting to be built.
### References
1. Gartner forecast on enterprise AI agent adoption by 2026, cited in Forbes ([https://www.forbes.com/sites/markminevich/2025/12/31/agentic-ai-takes-over-11-shocking-2026-predictions/](https://www.forbes.com/sites/markminevich/2025/12/31/agentic-ai-takes-over-11-shocking-2026-predictions/))
2. AI agent market projections (\$7.8B to \$52.6B by 2030), MindStudio ([https://www.mindstudio.ai/blog/future-of-ai-agents/](https://www.mindstudio.ai/blog/future-of-ai-agents/))
3. McKinsey Global Institute, "Agents, Robots, and Us: Skill Partnerships in the Age of AI" ([https://www.mckinsey.com/mgi/our-research/agents-robots-and-us-skill-partnerships-in-the-age-of-ai](https://www.mckinsey.com/mgi/our-research/agents-robots-and-us-skill-partnerships-in-the-age-of-ai))
4. OpenAI, "Introducing Operator" ([https://openai.com/index/introducing-operator/](https://openai.com/index/introducing-operator/))
5. Anthropic, "Introducing computer use, a new Claude 3.5 Sonnet, and Claude 3.5 Haiku" ([https://www.anthropic.com/news/3-5-models-and-computer-use](https://www.anthropic.com/news/3-5-models-and-computer-use))
6. Anthropic, "Anthropic acquires Vercept to advance Claude's computer use capabilities" ([https://www.anthropic.com/news/acquires-vercept](https://www.anthropic.com/news/acquires-vercept))
7. Michael Lanham, "Why AI Agents Didn't Take Over in 2025, And What Changes Everything in 2026" ([https://medium.com/@Micheal-Lanham/why-ai-agents-didnt-take-over-in-2025-and-what-changes-everything-in-2026-9393a5bb68e8](https://medium.com/@Micheal-Lanham/why-ai-agents-didnt-take-over-in-2025-and-what-changes-everything-in-2026-9393a5bb68e8))
8. PwC, "AI agents are the future of work" ([https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-agents.html](https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-agents.html))
