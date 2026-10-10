---
title: "Optimize for agents"
date: "2026-03-23T23:50:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
pinned: true
---

It's a strange thing to think about. We spent years building walls to keep bots out. CAPTCHAs, rate limiters, IP blockers. Bots were the enemy. They scraped content, spammed forms, and gamed rankings. We trained ourselves to treat automated traffic as hostile by default.
Now most of us talk to a bot every single day. We ask it to summarize documents, compare products, plan trips, and write code. And the number of people doing this is only going up, along with how often each person reaches for it.
This shift changes everything about how we build products, structure data, and think about visibility online.
## We used to block bots, now we need to welcome them
The old playbook was simple: if it's not human, block it. CAPTCHAs were the universal checkpoint. But AI agents are getting better at mimicking human behavior, and traditional CAPTCHAs are losing their effectiveness. Research from organizations like MBZUAI has shown that while current agents still struggle with modern CAPTCHA challenges, the gap is closing fast. Meanwhile, companies like HUMAN Security are already advocating for behavioral analysis over static challenges, monitoring mouse movements, typing speed, and interaction patterns instead of asking users to click on traffic lights.
The deeper issue is that blocking all bots is no longer a smart default. When a ChatGPT agent visits your site to help a user find a product, that's not an attack. That's a potential customer. The most valuable traffic hitting your website might soon come from machines acting on behalf of humans.
Companies need to rethink their bot strategies entirely. Not every automated visitor is a threat. Some of them are carrying wallets.
## Agentic commerce is already here
This isn't theoretical. According to McKinsey, around 50 percent of Google searches already include AI summaries, and that number is expected to exceed 75 percent by 2028. By then, an estimated \$750 billion in US revenue will flow through AI-powered search. The IAB found that 38 percent of consumers already use AI when shopping, and 80 percent expect to use it more.
At NRF 2026, agentic commerce dominated the conversation. Microsoft announced AI shopping experiences, Google introduced its Universal Commerce Protocol, and Stripe highlighted how agents are creating new market opportunities for retailers. The message was clear: AI agents are becoming the intermediary between customers and products.
What this means practically is that your product page isn't just being read by humans anymore. An agent might be evaluating your offering, comparing it against competitors, and making a recommendation, all without a human ever visiting your site directly. If the agent can't parse your data, you're invisible.
## The new SEO is convincing agents, not just humans
Traditional SEO optimized for search engine crawlers, but those crawlers operated on relatively simple rules: keywords, backlinks, metadata. AI agents are different. They understand context, evaluate quality, and synthesize information across sources.
This is a fundamental shift. We're no longer just convincing a human that our product is good. We need to convince the agent that's doing the research on that human's behalf. And as more people offload discovery and decision-making to AI, the agent's assessment becomes the one that matters.
There are a few practical things this changes:
- **Structured data matters more than ever.** Schema markup, clean metadata, and well-organized content help agents understand what you offer without guessing.
- **Content needs to be comprehensive and authoritative.** AI agents prefer thorough coverage of a topic in a single page rather than thin content spread across many. Semantic clustering, where related concepts appear close together, helps agents process your content within their context windows.
- **Your reputation across the web matters.** Agents pull from multiple sources. Consistent, positive mentions across third-party sites, reviews, and documentation all feed into how an agent evaluates you.
The companies that figure out how to be legible and trustworthy to AI agents will have a significant advantage over those still optimizing only for human eyeballs.
## WebMCP and the agent-ready web
One of the most concrete developments in this space is WebMCP, which Google shipped as an early preview in Chrome 146 in February 2026. WebMCP lets websites expose structured tools directly to AI agents through the browser. Instead of an agent scraping HTML and guessing where the search bar is, the website can declare exactly what actions are available: search products, book a flight, add to cart.
It works through three mechanisms: discovery (what tools does this page offer?), JSON schemas (what inputs and outputs does each tool expect?), and state management (tools appear and disappear based on context, like a checkout button only showing when items are in the cart).
Think of it as the difference between handing someone a map versus dropping them in a foreign city with no signs. WebMCP gives agents a map.
Google's Chrome team describes WebMCP and MCP as complementary. MCP handles server-side integrations, the core business logic, data retrieval, and background tasks. WebMCP handles the browser layer, letting agents interact with what the user actually sees. Together, they create a full stack for agent-to-website communication.
This is still early. WebMCP requires Chrome 146 and is behind a feature flag. But the direction is clear, and building for it now means being ready when it goes mainstream.
## Optimize internally too
The external-facing side gets most of the attention, but there's an equally important internal question: how do you optimize your own systems for agents?
This doesn't mean giving agents direct database access. That's a security and governance nightmare. It means thinking carefully about how your data is structured so that agents can read, query, and act on it effectively.
A few areas to consider:
- **APIs over raw access.** If you have a REST API or GraphQL endpoint, that's already a starting point for agent integration. Agents work well with structured, well-documented endpoints.
- **MCP servers for internal tools.** The Model Context Protocol isn't just for external-facing products. Teams are building MCP servers for internal databases, documentation, and workflows, letting AI agents assist with operations without exposing raw infrastructure.
- **Clean, consistent data formats.** Agents struggle with the same things humans do: inconsistent naming, missing fields, ambiguous relationships. The cleaner your data, the more useful agents can be.
- **CLI tools and automation hooks.** Command-line interfaces and webhook-based automation give agents concrete entry points for interacting with your systems.
The organizations that invest in making their internal data agent-friendly will find that AI tools become dramatically more useful across the board, not just for customer-facing applications.
## Start today
The temptation is to wait for standards to mature and best practices to solidify. But the shift is happening now, and the companies that move early will compound their advantage.
Here's what you can do today:
1. **Audit your bot policy.** Are you blocking traffic that could be valuable? Review your CAPTCHA and bot-mitigation strategy with AI agents in mind.
2. **Add structured data.** Implement schema markup, clean up your metadata, and make sure your content is machine-readable.
3. **Expose an API.** If you don't have one, start with something simple. Even a basic REST endpoint makes your product more accessible to agents.
4. **Look into MCP.** Whether it's building an MCP server for your product or experimenting with WebMCP for your website, the protocol is becoming the standard for agent integration.
5. **Think about your data hygiene.** Internally, clean and consistent data is the foundation for everything else. Start there.
The internet is being rebuilt around agents. The websites, products, and companies that make themselves easy to discover, understand, and interact with by AI won't just survive this transition. They'll thrive in it.
## References
1. McKinsey, "New front door to the internet: Winning in the age of AI search" (2025), [mckinsey.com](http://mckinsey.com)
2. McKinsey, "The agentic commerce opportunity: How AI agents are ushering in a new era for consumers and merchants," [mckinsey.com](http://mckinsey.com)
3. Stripe, "The three biggest agentic commerce trends from NRF 2026," [stripe.com](http://stripe.com)
4. Google Chrome Developers, "WebMCP is available for early preview" (February 2026), [developer.chrome.com](http://developer.chrome.com)
5. Google Chrome Developers, "When to use WebMCP and MCP," [developer.chrome.com](http://developer.chrome.com)
6. Search Engine Land, "WebMCP explained: Inside Chrome 146's agent-ready web preview," [searchengineland.com](http://searchengineland.com)
7. Forbes, "Google Ships WebMCP, The Browser-Based Backbone For The Agentic Web" (February 2026), [forbes.com](http://forbes.com)
8. VentureBeat, "Google Chrome ships WebMCP in early preview, turning every website into a structured tool for AI agents" (February 2026), [venturebeat.com](http://venturebeat.com)
9. MBZUAI, "CAPTCHAs aren't just annoying, they're a reality check for AI agents" (November 2025), [mbzuai.ac.ae](http://mbzuai.ac.ae)
10. Forbes, "Why AI Agents Demand A Reconsideration Of Fraud Prevention" (March 2025), [forbes.com](http://forbes.com)
11. Anthropic, "Introducing the Model Context Protocol" (November 2024), [anthropic.com](http://anthropic.com)
12. eMarketer, "How agentic AI will reshape shopping in 2026," [emarketer.com](http://emarketer.com)
13. Stridec, "How to Build a Content Optimization Strategy for AI Agents in 2026," [stridec.com](http://stridec.com)
