---
title: "The state of integrations"
date: "2026-04-18T23:22:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Agents","SaaS","MCP","Open Source","LLMs","OpenAI","Anthropic","TypeScript","Serverless","Models"]
---

If you're building a SaaS product or AI agent that needs to talk to other software, you've probably felt the pain: every API is different, auth flows are a mess, and maintaining dozens of integrations is a full-time job. The integration platform space has exploded in response, but the sheer number of options, and the different approaches they take, can make it hard to know where to start.
This post breaks down the current landscape, the major categories of tools, and the key players worth knowing about.
## The problem hasn't changed, but the scale has
Connecting software systems has always been tedious. Each third-party API has its own authentication scheme, data models, rate limits, pagination logic, and error handling quirks. For a long time, companies either built integrations in-house (expensive, slow) or used traditional iPaaS tools like MuleSoft or Boomi (powerful, but designed for internal IT plumbing rather than customer-facing product integrations).
What has changed is the demand. B2B SaaS companies are expected to offer native integrations with their customers' tools out of the box. According to Merge's 2026 State of Product Integrations report, 160 product managers and engineers surveyed indicated that integration roadmaps are expanding dramatically, with AI agents adding a whole new layer of complexity. Customers don't just want your product to sync data with Salesforce anymore. They want your AI agent to autonomously pull context from Slack, update Jira tickets, and push results to Google Sheets.
## The four categories of integration platforms
The market has settled into roughly four categories. Each solves a different slice of the problem.
### Unified APIs
A unified API gives you a single, standardized interface to access many third-party APIs within a software category. Instead of writing separate code for Salesforce, HubSpot, and Pipedrive, you build to one API and get access to all of them through normalized endpoints.
**Merge** is the most well-known player here. It offers hundreds of integrations across categories like CRM, HRIS, ATS, accounting, file storage, and ticketing. In 2025, Merge expanded with 11 new integrations and launched a Chat Unified API for real-time messaging platforms. The platform handles authentication, data normalization, and ongoing maintenance. The tradeoff is that you're working within Merge's common data models, so if you need deeply custom fields or non-standard objects, you may hit limitations.
**Apideck** takes a similar approach but with a no-cache architecture, meaning it delivers real-time data directly from the source API rather than syncing to an intermediate store. It supports around 190 connectors across CRM, HRIS, accounting, file storage, and ecommerce. Pricing is usage-based, which can be attractive for teams that want costs to scale proportionally with actual usage.
**Unified APIs are best when** you need broad, standardized coverage across a category fast and don't need deep customization for each provider.
### Embedded iPaaS
An embedded iPaaS (Integration Platform as a Service) lets SaaS companies build and offer integrations directly within their product, giving customers a native integration experience. These platforms provide workflow builders, embeddable UI components, and pre-built connectors.
**Paragon** is a popular choice here, offering 130+ connectors and a low-code orchestration builder. Developers can drag and drop triggers and actions to create integration logic, or go headless and use Paragon purely as a backend engine. It supports event-driven workflows, real-time triggers, and webhook-based syncs.
**Ampersand** takes a more developer-centric, code-first approach. Instead of visual builders, you define integrations in a manifest file (`amp.yaml`), giving you version control, code review, and declarative configuration. It focuses on deep CRM and go-to-market integrations with support for custom objects, custom fields, and dynamic field mappings. Ampersand's open-source connectors library is a notable differentiator.
**Embedded iPaaS is best when** you need flexible, custom integration logic and want to embed a polished integration experience directly in your product.
### Code-first integration platforms
These platforms sit between unified APIs and embedded iPaaS. They give you infrastructure for building integrations in code, with managed auth, execution, and observability, but without forcing you into a fixed data model.
**Nango** is the standout in this category. It's open-source, supports 700+ APIs, and works with any backend language or AI coding tool. The core primitives are simple: managed auth (OAuth, API keys, token refresh), a proxy for authenticated API requests, and serverless functions for custom sync logic. You write integration code in TypeScript (or let AI generate it), deploy to Nango's runtime, and it handles scaling, retries, and rate limits. Companies like Replit, Ramp, and Mercor use it in production. Nango is particularly appealing for teams that want full control over data models and sync logic without building infrastructure from scratch.
**Code-first platforms are best when** you want maximum flexibility and own your integration logic, but don't want to build auth, execution, and observability tooling yourself.
### Workflow automation and AI agent platforms
This category is the broadest and most consumer-friendly, but it's increasingly relevant for developers building AI-powered products.
**Zapier** remains the giant in workflow automation, with 8,000+ app integrations and a focus on connecting apps through triggers and actions. In recent years, Zapier has pushed hard into AI orchestration, offering AI agents, chatbots, and MCP (Model Context Protocol) support alongside its traditional Zap workflows. For many teams, Zapier is the fastest way to wire up simple integrations, but it's less suited for deep, product-embedded use cases where you need fine-grained control.
**Composio** is a newer, AI-native integration platform specifically designed for connecting LLMs and AI agents with external tools. It supports 1,000+ toolkits across apps like Slack, GitHub, Notion, and Jira, with managed authentication and framework-agnostic design. Composio works with LangChain, CrewAI, OpenAI, and other agent frameworks, positioning itself as the "action layer" that lets AI agents actually do things rather than just chat. If you're building agentic workflows and need your AI to interact with real-world APIs, Composio is built for exactly that.
**Sim Studio** ([sim.ai](http://sim.ai)) is an open-source AI agent workflow builder that takes a visual, low-code approach. You drag and drop components to build agent workflows, with native integrations to 80+ services including AI models (OpenAI, Anthropic, Gemini), communication tools (Slack, Gmail, Teams), and databases (PostgreSQL, Supabase, Pinecone). It also supports MCP for custom integrations. Sim is more of an agent orchestration tool than a pure integration platform, but its integration capabilities make it relevant in this space.
**These platforms are best when** you need quick automation glue between apps, or you're building AI agents that need to take actions across many services.
## Platform comparison
<table fit-page-width="true" header-row="true">
<tr>
<td>**Platform**</td>
<td>**Category**</td>
<td>**Approach**</td>
<td>**Integrations**</td>
<td>**Best for**</td>
<td>**MCP support**</td>
<td>**Open source**</td>
</tr>
<tr>
<td>**Merge**</td>
<td>Unified API</td>
<td>Single standardized interface with normalized endpoints</td>
<td>Hundreds across CRM, HRIS, ATS, accounting, file storage, ticketing</td>
<td>Shipping broad, standardized integrations fast</td>
<td>In progress</td>
<td>No</td>
</tr>
<tr>
<td>**Apideck**</td>
<td>Unified API</td>
<td>No-cache, real-time data from source APIs</td>
<td>\~190 connectors across CRM, HRIS, accounting, file storage, ecommerce</td>
<td>Usage-based pricing with real-time data needs</td>
<td>—</td>
<td>No</td>
</tr>
<tr>
<td>**Paragon**</td>
<td>Embedded iPaaS</td>
<td>Low-code orchestration builder with embeddable UI</td>
<td>130+</td>
<td>Native integration UX embedded in your product</td>
<td>—</td>
<td>No</td>
</tr>
<tr>
<td>**Ampersand**</td>
<td>Embedded iPaaS</td>
<td>Code-first, declarative config via `amp.yaml`</td>
<td>Deep CRM and GTM integrations</td>
<td>Custom objects, fields, and dynamic field mappings</td>
<td>Yes</td>
<td>Connectors only</td>
</tr>
<tr>
<td>**Nango**</td>
<td>Code-first</td>
<td>Managed auth + proxy + serverless functions in TypeScript</td>
<td>700+</td>
<td>Full control over integration logic without building infra</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>**Zapier**</td>
<td>Workflow automation</td>
<td>Trigger-action workflows with AI agent features</td>
<td>8,000+</td>
<td>Quick, broad automation between apps</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>**Composio**</td>
<td>AI agent platform</td>
<td>AI-native toolkits with managed auth, framework-agnostic</td>
<td>1,000+ toolkits</td>
<td>AI agents that need to take actions across services</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>**Sim Studio**</td>
<td>AI agent platform</td>
<td>Visual, low-code agent workflow builder</td>
<td>80+ native integrations</td>
<td>Visual AI agent orchestration</td>
<td>Yes</td>
<td>Yes</td>
</tr>
</table>
## The AI factor
The biggest shift in the integration landscape is the rise of AI agents. Traditional integrations were about syncing data between systems on a schedule or in response to events. AI agents need something different: the ability to discover tools, authenticate on behalf of users, and execute actions dynamically based on context.
This is driving several trends:
- **MCP adoption** is accelerating. The Model Context Protocol, originally developed by Anthropic, is becoming a standard way for AI agents to discover and interact with tools. Zapier, Composio, Nango, and Ampersand all now offer MCP support.
- **Tool-calling is the new API call.** Platforms are increasingly packaging integrations as "tools" that LLMs can invoke, complete with descriptions, parameter schemas, and authentication. Composio's entire architecture is built around this idea.
- **Auth is the hard part.** For AI agents acting on behalf of users, managing OAuth tokens, API keys, and multi-tenant credentials is a critical infrastructure problem. Every platform in this space is investing heavily in managed auth.
- **Integration platforms are becoming the nervous system of AI products.** Gartner predicts 40% of enterprise applications will include task-specific AI agents by the end of 2026, up from less than 5% in 2025. Each of those agents needs to connect to external systems, and building that plumbing from scratch doesn't scale.
## How to choose
There's no single right answer. The best platform depends on what you're building:
- **If you need to ship 50 CRM integrations next quarter**, a unified API like Merge or Apideck will get you there fastest.
- **If you need deep, custom integrations embedded in your product**, look at Ampersand or Paragon.
- **If you want full control and are comfortable writing integration code**, Nango gives you the infrastructure without the constraints.
- **If you're building AI agents that need to take actions across services**, Composio is purpose-built for that use case.
- **If you need quick, broad automation**, Zapier's ecosystem is hard to beat.
- **If you want a visual builder for AI agent workflows**, Sim Studio is worth exploring.
Many teams end up using multiple platforms. A common pattern is a unified API for standardized integrations (syncing CRM or HRIS data) combined with a more flexible tool for custom or AI-driven integrations. The categories are blurring, too. Nango offers pre-built unified APIs alongside its code-first platform. Merge is adding AI agent support. Zapier is pushing into developer tooling.
## What to watch
The integration space is moving fast. A few things worth keeping an eye on:
- **Consolidation.** With so many players, acquisitions are likely. The platforms that can serve both traditional sync use cases and AI agent use cases will have an advantage.
- **Open source momentum.** Nango and Sim Studio are both open source, and Ampersand's connectors library is open source. This is lowering the barrier to entry and giving developers more control.
- **MCP as a standard.** If MCP adoption continues, it could simplify the "tool discovery" problem for AI agents significantly, reducing the need for tightly integrated platforms.
- **The long tail.** Most platforms focus on popular APIs, but enterprise customers often need integrations with niche or legacy systems. How platforms handle the long tail, whether through open-source contributions, AI-generated connectors, or deep customization, will be a key differentiator.
The state of integrations in 2026 is messy, competitive, and exciting. The days of building every integration from scratch are over, but choosing the right abstraction layer still takes thought. The good news is that no matter what you're building, there's probably a platform that fits.
## References
1. Merge, "The 2026 State of Product Integrations," [https://www.merge.dev/sopi-2026](https://www.merge.dev/sopi-2026)
2. Merge, "How we restarted Merge in 2025," [https://www.merge.dev/blog/2025-review](https://www.merge.dev/blog/2025-review)
3. Nango, "Introduction to Nango," [https://nango.dev/docs/getting-started/intro-to-nango](https://nango.dev/docs/getting-started/intro-to-nango)
4. Nango, "Best unified API platforms to consider in 2026," [https://nango.dev/blog/best-unified-api](https://nango.dev/blog/best-unified-api)
5. Composio, "How Composio works," [https://docs.composio.dev/docs](https://docs.composio.dev/docs)
6. Composio, "The 2026 Guide to AI Agent Builders," [https://composio.dev/blog/best-ai-agent-builders-and-integrations](https://composio.dev/blog/best-ai-agent-builders-and-integrations)
7. Sim Studio documentation, [https://docs.sim.ai/introduction](https://docs.sim.ai/introduction)
8. Zapier, "Automation Now + Next: AI, Agents, and What's Coming in 2026," [https://zapier.com/resources/events/automation-now-next-ai-agents-and-whats-coming-in-2026](https://zapier.com/resources/events/automation-now-next-ai-agents-and-whats-coming-in-2026)
9. Ampersand, "The 10 Best Unified API Platforms in 2026," [https://www.withampersand.com/blog/the-10-best-unified-api-platforms-in-2026](https://www.withampersand.com/blog/the-10-best-unified-api-platforms-in-2026)
10. Apideck, "What is a Unified API?" [https://www.apideck.com/blog/what-is-a-unified-api](https://www.apideck.com/blog/what-is-a-unified-api)
11. Gartner, "40% of enterprise apps will feature task-specific AI agents by 2026," [https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025)
12. Membrane, "Best Integration Platforms for SaaS & AI product in 2026," [https://getmembrane.com/articles/comparisons/best-integration-platforms-for-saas-ai-2026](https://getmembrane.com/articles/comparisons/best-integration-platforms-for-saas-ai-2026)
