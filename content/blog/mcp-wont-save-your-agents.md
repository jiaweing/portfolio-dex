---
title: "MCP won't save your agents"
date: "2026-04-29"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","MCP","LLMs","Safety","Memory","OpenAI","Google","Microsoft","Open Source"]
---

Model Context Protocol is everywhere. Every AI startup mentions it. Every demo shows an agent calling tools through it. Every SDK has an MCP integration. In just over a year since Anthropic open-sourced it, MCP has crossed 97 million monthly SDK downloads and powers over 10,000 servers in production. It was donated to the Agentic AI Foundation under the Linux Foundation, with backing from OpenAI, Google, Microsoft, and AWS. By any measure, the protocol has won.
But winning adoption and solving the hard problems of agents are two very different things. MCP is a connector standard, not a solution. The hard part of building agents was never "how do I call a tool." It was judgment, reliability, and knowing when to stop.
## The hype pattern is familiar
If you've been building software long enough, you've seen this before.
GraphQL was going to replace REST. When Facebook open-sourced it in 2015, every conference talk declared REST dead. By 2020, reality had set in. GraphQL added real value for certain use cases, like reducing over-fetching in complex mobile apps, but it also introduced query complexity, caching headaches, and a learning curve that wasn't always worth it. Today, most teams treat GraphQL as one tool in the toolbox, not the silver bullet it was sold as.
Kubernetes was going to make deployment trivial. Instead, it introduced an entirely new category of complexity that spawned its own ecosystem of tools just to manage it.
The pattern is always the same: a genuinely useful technology gets positioned as the thing that will fix everything, and then the industry spends years recalibrating expectations. MCP is entering that recalibration phase now.
## What MCP actually does well
To be clear, MCP solves a real problem. Before it existed, every AI integration was a bespoke implementation. If you wanted Claude to talk to your database, you wrote custom code. If you wanted it to talk to GitHub, more custom code. Every new tool meant another integration from scratch.
MCP standardizes this. It defines how an AI model discovers tools, understands their inputs, and calls them. It makes integrations portable across different AI clients, whether that's Claude, ChatGPT, Cursor, or VS Code. Write one MCP server and any compatible client can use it.
That's genuinely useful. The ecosystem reflects it: over 10,000 active servers, with categories spanning developer tools, business applications, and internal organizational connectors. Major vendors like GitHub, Stripe, Atlassian, and Salesforce have published official MCP servers. The infrastructure layer is real, and it's growing.
The 2026 roadmap reflects real maturity too. The protocol is tackling enterprise concerns: audit trails, SSO-integrated auth, gateway patterns, and configuration portability. These are the kinds of problems you solve when you're past the hype phase and into actual production use.
## What MCP doesn't do
Here's where the expectation gap lives.
MCP doesn't make agents smarter. It gives them a standardized way to call tools, but the agent still needs to decide which tool to call, when to call it, what parameters to use, and when to stop. Those are model and orchestration problems that have nothing to do with the protocol layer.
MCP doesn't make agents more reliable. According to Deloitte's 2026 State of AI in the Enterprise report, 75% of companies plan to invest in agentic AI, but only 11% have agents running in production. That gap isn't caused by a lack of tool connectivity. It's caused by the fact that agents fail in unpredictable ways at scale, hallucinate confidently, struggle with multi-step reasoning, and require extensive guardrails to operate safely.
LangChain's 2026 State of Agent Engineering survey paints a similar picture from a different angle. While 57% of their respondents have agents in production, the number one barrier to getting there is quality, not connectivity. Cost concerns actually dropped from the previous year. The bottleneck is making agents work reliably, not wiring them up to more tools.
MCP doesn't make agents cheaper to run. The cost of an agent isn't primarily in the integration layer. It's in the model calls, the retry logic, the human oversight, and the error handling. A standardized protocol doesn't change any of that math.
## The reliability gap is the real bottleneck
The MCP-Universe evaluation framework demonstrated something that practitioners already know: long-context challenges, unfamiliar tool behaviors, and multi-step reasoning failures aren't edge cases. They're systemic. When you give an agent access to 50 tools through MCP, you haven't made it more capable. You've made the probability space of failure much larger.
Google's developer team documented this concretely when they refactored a monolithic agent into specialized sub-agents. The original agent, which had access to all the tools it needed, failed silently when any sub-task hit an API timeout or hallucination. Their fix wasn't better tool connectivity. It was separation of concerns: specialized agents with narrow tasks that run more reliably than a single model trying to execute a massive, multi-step prompt.
This maps to a principle that keeps proving itself: one agent, one job. MCP makes it easier to wire agents to tools, but the agent still needs to know which tool and when. Giving a single agent access to everything through MCP is like giving an intern the keys to every system in your company. The access isn't the problem. The judgment is.
## The API economy parallel
We've been here before, just without the AI framing.
In the early 2010s, the API economy was supposed to transform software development. Platforms like Mashape (later RapidAPI) made thousands of APIs discoverable and callable from a single interface. The promise was that having access to every API would let developers build anything faster.
It didn't work out that way. Access to APIs didn't make applications good. Developers still needed to understand which APIs to use, how to handle failures gracefully, how to compose them into coherent user experiences, and how to manage the complexity of multiple external dependencies. The hard part was taste and judgment, not connectivity.
MCP is in the same position. It's solving the connectivity layer, which is necessary infrastructure. But the value of an agent system lives in the layers above: the orchestration logic, the error handling, the guardrails, and the decisions about when to act and when to ask for help.
## The portability question
One of MCP's strongest claims is that it prevents vendor lock-in. Write your integrations once and they work with any MCP-compatible model. The Agentic AI Foundation governance structure reinforces this, it's not owned by any single company.
But there's a subtler lock-in happening at a different layer. As agents collect context, preferences, conversation history, and task patterns, that accumulated context becomes the real moat, not the protocol layer. Researchers at New America have pointed out that "context, not model performance, is the true source of monopoly power." MCP can make agents technically portable, but if your context is locked into one platform's memory system, switching providers means starting over.
This is the lock-in that matters, and MCP doesn't address it. The protocol standardizes how agents call tools, not how they store and transfer what they've learned. Until context portability is solved at the same level as tool portability, the vendor lock-in problem is only partially addressed.
## Calibrating expectations
None of this is a case against MCP. The protocol is good infrastructure. It reduces boilerplate, makes integrations portable, and creates a shared standard that benefits everyone. The ecosystem is real, the governance is sound, and the roadmap addresses genuine enterprise needs.
But MCP is a necessary layer, not a sufficient one. The companies that will build effective agent systems are the ones investing in the harder problems: reliability engineering, evaluation frameworks, graceful degradation, human-in-the-loop patterns, and the kind of careful orchestration that makes agents actually useful rather than just technically impressive.
Standards help. They don't solve. The real work is still ahead.
## References
1. [One Year of MCP: November 2025 Spec Release](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/) - Model Context Protocol Blog
2. [The 2026 MCP Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/) - Model Context Protocol Blog
3. [The Rise of MCP: Protocol Adoption in 2026 and Emerging Monetization Models](https://medium.com/mcp-server/the-rise-of-mcp-protocol-adoption-in-2026-and-emerging-monetization-models-cb03438e985c) - Gary Weiss, Medium
4. [Only 11% of AI Agents Make It to Production](https://medium.com/data-science-collective/only-11-of-ai-agents-make-it-to-production-dddde4c684d6) - Kaushik Rajan, Data Science Collective
5. [State of Agent Engineering](https://www.langchain.com/state-of-agent-engineering) - LangChain
6. [MCP-Universe: Why AI Agent Reliability Matters More Than Performance](https://medium.com/@oracle_43885/mcp-universe-why-ai-agent-reliability-matters-more-than-performance-2ce316296c5e) - Valdez Ladd, Medium
7. [Production-Ready AI Agents: 5 Lessons from Refactoring a Monolith](https://developers.googleblog.com/production-ready-ai-agents-5-lessons-from-refactoring-a-monolith/) - Google Developers Blog
8. [Is MCP enough for production-ready AI agent integrations?](https://composio.dev/content/mcp-production-ready-integrations) - Composio
9. [The Model Context Protocol's impact on 2025](https://www.thoughtworks.com/en-us/insights/blog/generative-ai/model-context-protocol-mcp-impact-2025) - Thoughtworks
10. [AI Agents and Memory: Privacy and Power in the MCP Era](https://www.newamerica.org/insights/ai-agents-and-memory/) - New America
11. [GraphQL is Finally Boring](https://wundergraph.com/blog/graphql-is-finally-boring) - WunderGraph
12. [A Deep Dive Into MCP and the Future of AI Tooling](https://a16z.com/a-deep-dive-into-mcp-and-the-future-of-ai-tooling/) - Andreessen Horowitz
