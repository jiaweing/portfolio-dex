---
title: "Nobody uses Notion Custom Agents like me"
date: "2026-03-16T13:05:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Notion launched Custom Agents on February 24, 2026, and within weeks, early adopters had already built over 21,000 of them. I might be single-handedly responsible for a decent chunk of the usage. In just the second week of March, I burned through 35,000 Notion credits running my fleet of custom agents. I’m projected to burn through 70,000 by the end of the month. Here's how I'm using them, what I've learned, and why I think the pricing model needs work.
![](/content/blog/nobody-uses-notion-custom-agents-like-me/image-1.webp)
## What are Notion Custom Agents?
Custom Agents are autonomous AI teammates that live inside your Notion workspace. Unlike the standard Notion AI chat, which only responds when you prompt it, Custom Agents run on their own. You give them instructions, set triggers (like a schedule, an incoming email, or a new database entry), scope their permissions, and let them work in the background, whether you're online or not.
They arrived as part of Notion 3.3, available on Business and Enterprise plans. During the public beta through May 3, 2026, they're free to try. After that, they'll run on Notion credits at \$10 per 1,000 credits. That’s \$7k for my estimated 70k end of month burn rate.
## My agent lineup
I've built 13 agents so far, each handling a specific job. The key principle is **one agent, one job**, and it works remarkably well.
### Expense tracker
Nobody does this like me. This agent scans all my incoming emails for receipts and invoices. When it finds one, it extracts the total amount, the line-item breakdown, the merchant, and the payment method, then logs everything into my expenses database. It's a fully autonomous, autopilot expense tracker. No manual data entry, no forgetting to log purchases. It just runs.
### Self profile agent
This is the creepiest and most fascinating one. It scans my emails and my Notion workspace daily, then updates a dedicated page with a continuously evolving profile of me. What I'm working on, what I care about, what my patterns look like. It knows me better than I know myself. The real power is that this profile helps my other agents understand me better, too. It's like giving all of them shared context about who I am.
### Blog writer
This is the agent writing this very post. I give it a topic, sometimes just rambling my thoughts via speech-to-text, and it does deep research on the latest information before curating everything into a structured blog post. The heavy lifting is done for me. I just need to review it once, verify the facts, and publish. The best part my blog is connected directly to my Notion database. Blog on automation.
### Blog ideator
While I mostly have ideas to write about, this agent runs every morning at 7:30am and creates a batch of 5 to 10 blog post ideas in my Blog database. It studies my existing posts, my About Me page, and my recurring themes, then generates fresh titles with short ideation stubs. It even checks the latest news and ties at least one idea to a current event if something relevant happened. By the time I sit down to write, I already have a menu of ideas waiting for me, each with a premise, key points, and links to get started. And the blog writer agent will take over from here, and write out the entire first draft of the blog post.
### Email drafter
This is the agent that keeps my inbox from piling up. Every time a new email arrives, it reads the message, decides whether a reply is actually needed, and if so, drafts one. It skips newsletters, notifications, and receipts. For everything else, it matches the sender's tone, answers each question, and saves the draft for me to review. If something is ambiguous, it flags the uncertainty with a bracketed note at the top of the draft instead of guessing. I still hit send myself, but the thinking and writing are already done.
### Job hunter
Every morning, this agent searches the web for job recommendations tailored to me. It knows my skills, my preferences, and my career goals. It finds relevant openings and adds them directly to my job database, complete with the role, company, and a draft cover letter. All the details are filled in automatically.
### Job tracker
This one works hand-in-hand with the Job Hunter. It scans my incoming emails looking for job application confirmation receipts. When it finds one, it extracts the job title, company, and role, then adds the entry to my job database. It also monitors for follow-up emails, like interview invitations or acceptance notices, and updates the application status accordingly. The result is a live dashboard where I can see every application I've submitted, what's pending, and what needs my attention.
### Business validator
When I have a new business idea, I create a page in a database, and this agent goes to work. It runs deep research on the idea, performs a SWOT analysis, maps the value chain, evaluates competitors, and assesses the market. It even outlines a path from MVP to a fully marketable product. For zero effort on my part, I get a comprehensive business analysis.
### Social post writer
I tell it the platform, whether it's X, Threads, LinkedIn, or YouTube, and I voice out my ideas. It formats the content appropriately for each platform, handling the differences in tone, length, and structure. No more manually reformatting the same idea four different ways.
### YouTube script writer
Similar to the blog writer, but optimized for video. I give it a topic, maybe a link to a new UI library like Shadcn, and it does deep research. It comes back with a hook intro, a structured body covering what I should talk about, and all the references organized at the bottom. The hardest part of making a video, the research and outlining, is done before I even open my camera.
### Portfolio updater
This one watches my inbox for trade confirmation emails, buy or sell, from any broker. When it detects one, it extracts the ticker, quantity, price, and trade date, then updates my Portfolio database in Notion automatically. If I bought something new, it creates a row. If I sold, it decreases the quantity. If the quantity hits zero, it marks the holding as Sold. I never have to manually log a trade again. The agent even leaves a note on each row tracing it back to the original email, so I have a full audit trail.
### Investor brief
Every morning at 8am, this agent reviews my entire portfolio, runs multiple rounds of web research, and generates a full investor brief as a new page in Notion. It covers what moved, why it moved, what to do next, and proposes new buy ideas. The key difference from a generic market summary is depth. It digs into SEC filings, institutional ownership changes, insider buying patterns, and analyst revisions, not just headlines. It also emails me a scannable summary so I can check it on my phone before I even open my laptop. This is the agent that makes me feel like I have a personal research analyst on payroll.
### Weekly explore
Every Friday at 5pm, this agent does something completely different from the rest: it plans my weekend. It runs multiple web searches across Singapore lifestyle sources like TimeOut, TheSmartLocal, Honeycombers, and Eventbrite, then compiles a weekly roundup of upcoming events, new cafe openings, new shops, and experiences worth checking out. Each item comes with the venue, dates, price range, and a quick reason to go. It even flags major expos and conventions I might want to hit. The output is a new page in my Travel database, formatted like a friend texting you their weekend picks. It's the one agent that has nothing to do with productivity and everything to do with actually living.
## The credit problem
Here's where things get complicated. Notion credits cost \$10 per 1,000. I've used 70,000 credits in less than a month. That's \$7,000, and my use cases aren't even that intensive. I'm not running agents constantly in the background. These are basic, practical workflows.
The math doesn't add up when you consider that Notion AI chat is unlimited on Business plans. I can literally copy my agent's instructions, paste them into the AI chat, and get the same result manually. The agent just automates one layer, the triggering. So why does that one layer of automation cost \$500 a month?
I've seen plenty of other users voicing the same concern. The credit system, as it stands, doesn't feel sustainable for individual power users. The lack of credit rollover makes it worse. If you buy credits and don't use them all in a billing cycle, they're gone.
## What needs to change
I think Notion has a few options:
1. **Include a base pool of credits with Business and Enterprise plans.** The AI chat is already unlimited. Give agents a reasonable baseline so users can automate without a separate, significant expense.
2. **Allow credit rollover.** If I buy 10,000 credits and only use 7,000, those remaining 3,000 should carry over. Use-it-or-lose-it pricing discourages adoption.
3. **Introduce tiered pricing.** Not every agent run is equal. A simple email scan shouldn't cost the same as a deep research task. Let pricing reflect the actual compute used.
Without changes, power users like me will start converting agents into standalone tools and apps. The expense tracker, for example, could be rebuilt as a custom application that handles email parsing and database updates without Notion credits. It's more work, but at \$500 a month, the ROI on building it myself starts to make sense.
## Why I'm still bullish
Despite the pricing frustrations, Notion Custom Agents are genuinely transformative. The ability to set up an autonomous workflow inside a tool I already use for everything, my notes, databases, project management, is incredibly powerful. The setup is straightforward: write clear instructions, set a trigger, scope the permissions, and let it run.
The key is the **one agent, one job** principle. Each agent does one thing well, and when you chain them together, you get a system that handles your busywork while you focus on the things that actually need your brain.
If Notion can figure out the pricing, this is the future of personal productivity. Nobody uses Custom Agents like me, but honestly, everyone should.
## References
1. Notion, "Introducing Custom Agents," February 24, 2026. [https://www.notion.com/blog/introducing-custom-agents](https://www.notion.com/blog/introducing-custom-agents)
2. Notion Help Center, "Custom Agents." [https://www.notion.com/help/custom-agent](https://www.notion.com/help/custom-agent)
3. Notion Help Center, "Custom Agent Pricing." [https://www.notion.com/help/custom-agent-pricing](https://www.notion.com/help/custom-agent-pricing)
4. Notion, "What's New, Only pay for the work Custom Agents do." [https://www.notion.com/releases](https://www.notion.com/releases)
5. Notion, "How Notion uses Custom Agents." [https://www.notion.com/blog/how-notion-uses-custom-agents](https://www.notion.com/blog/how-notion-uses-custom-agents)
6. Matthias Frank, "Notion Custom Agents: Full Tutorial, Use Cases & Pricing Changes." [https://matthiasfrank.de/en/notion-custom-agents-full-tutorial-use-cases-pricing-changes/](https://matthiasfrank.de/en/notion-custom-agents-full-tutorial-use-cases-pricing-changes/)
7. ALM Corp, "Notion Custom Agents: Complete Setup, Use Cases & Pricing (2026)." [https://almcorp.com/blog/notion-custom-agents/](https://almcorp.com/blog/notion-custom-agents/)
