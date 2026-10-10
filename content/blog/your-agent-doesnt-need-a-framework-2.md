---
title: "Your agent doesn't need a framework"
date: "2026-03-18"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

The agent framework ecosystem is exploding. LangGraph, CrewAI, AutoGen, Semantic Kernel, Pydantic AI, Strands, Agno, and more. New ones every week. Each promises to make building agents "easy," and each adds layers of abstraction between you and what's actually happening.
Most of them are solving problems you don't have yet.
I've built agents for various tasks, and the pattern I keep coming back to is embarrassingly simple: an LLM call, a tool, and a loop. That's it. That's an agent. You don't need an orchestration framework to get there.
## One agent, one job
At its core, an agent is just a program that calls an LLM in a loop, gives it tools, and lets it decide what to do next. You send a prompt with a list of available tools. The model either responds directly or requests a tool call. You execute the tool, feed the result back, and repeat until the model says it's done.
That's the entire pattern. You can implement it in about 50 lines of Python with nothing but an API client.
The moment you understand this, the mystique around agent frameworks starts to dissolve. The "agentic loop" that frameworks wrap in abstractions is just a while loop with a function call inside. When your agent has one job, like researching a topic, drafting a document, or processing a queue of items, you don't need a framework to coordinate that. A focused script does the job better, and you can read every line of it.
## The real problem isn't architecture
When an agent fails, the instinct is to reach for better tooling. A more sophisticated framework. A fancier orchestration graph. But in my experience, most agent failures are prompt failures, not architecture failures.
The model didn't call the right tool because the tool description was ambiguous. It hallucinated an answer instead of searching because the system prompt didn't set clear boundaries. It got stuck in a loop because there was no exit condition in the instructions.
These are problems you fix by iterating on prompts and refining your tool definitions. No framework solves this for you. In fact, frameworks can make it harder to diagnose because the prompt construction is buried under layers of abstraction. When something goes wrong at 2 AM in production, you need to see exactly what was sent to the model and what came back. Abstractions become walls at that point.
## What frameworks actually abstract
Let's be concrete about what frameworks give you. Most of them provide some combination of:
- **Prompt templating** to inject variables into system and user messages
- **Tool registration** to define callable functions with schemas
- **Output parsing** to extract structured data from model responses
- **Chain or graph composition** to wire steps together declaratively
- **Memory management** to persist conversation state across turns
These are real features. But here's the thing: prompt templating is an f-string. Tool registration is a JSON schema. Output parsing is a few lines of response handling. Memory is a list you append to.
One engineering team at Octomind used LangChain in production for over 12 months before removing it entirely. Their conclusion was that LangChain's high-level abstractions made their code *harder* to understand and more frustrating to maintain. Once they removed it, they could "just code" without translating their requirements into framework-appropriate solutions. They found that what a good abstraction should do is simplify your code and reduce cognitive load, and the framework was doing the opposite.
The comparison becomes clearer when you look at real code. A simple LLM call with the OpenAI package is one class and one function call. The same call through a framework introduces multiple new abstractions: chains, output parsers, prompt templates, custom operators. The framework version isn't shorter or clearer. It's just different, and now you have to learn a whole new vocabulary to do something you already knew how to do.
## The complexity that actually matters
The hard parts of building agents aren't the parts frameworks focus on. The real complexity lives in:
- **Error handling**: What happens when a tool call fails? When the model returns malformed JSON? When an external API times out?
- **Retries and recovery**: How do you retry gracefully without losing context? How do you handle partial failures in multi-step workflows?
- **Knowing when to stop**: How do you prevent infinite loops? How do you set token budgets? How do you detect when the model is going in circles?
- **Evaluation**: How do you know if your agent is actually getting better? How do you measure quality across hundreds of runs?
None of these are magically solved by picking the right framework. They're engineering problems that require thoughtful, domain-specific solutions. And they're much easier to solve when you can see and control every part of your system.
## When frameworks do make sense
I'm not anti-framework. I'm anti-premature-framework. There are legitimate cases where a framework earns its complexity:
**Multi-agent coordination.** When you genuinely need multiple specialized agents passing messages to each other, managing shared state, and coordinating on a task, the orchestration overhead is real. A framework that handles message routing and agent lifecycle can save significant effort.
**Complex state machines.** If your workflow has many branching paths, conditional logic, and rollback scenarios, a graph-based framework can make the flow easier to visualize and maintain than a pile of nested if statements.
**Production observability.** When you need structured tracing, cost tracking, and evaluation pipelines across hundreds of agent runs, frameworks that integrate with observability platforms can provide genuine value.
But here's the honest truth: most people building agents today aren't at any of these stages. They have one agent doing one thing. Maybe two agents doing two things. The overhead of learning and maintaining a framework at that scale doesn't pay for itself.
## The premature abstraction trap
There's a well-known concept in software engineering: premature abstraction. It's the tendency to introduce generalized solutions before you understand the specific problem. Agent frameworks are, for many developers, a textbook example.
Reaching for a framework feels productive. You're importing libraries, wiring up components, following tutorials. It looks like progress. But if you haven't yet figured out what your agent should *do*, how its prompts should be structured, or what failure modes you need to handle, you're optimizing the wrong layer.
The abstractions that frameworks introduce aren't free. Every layer you add is a layer you have to debug, update when the framework releases a breaking change, and work around when your requirements don't fit the framework's assumptions. The AI space is evolving so rapidly that framework abstractions designed around today's patterns may not survive contact with next month's best practices.
## Start simple, add structure when it hurts
My recommendation is boring but effective: start with raw API calls and a simple loop.
1. **Pick your LLM provider's SDK.** OpenAI, Anthropic, or whatever you prefer. Learn the native API. It's not complicated.
2. **Define your tools as functions.** Write a JSON schema for each one. Pass them in the API call. Handle the tool calls in your loop.
3. **Build your agent loop.** Send a message, check if the model wants to call a tool, execute it, feed the result back. Repeat until done.
4. **Add error handling.** Wrap tool calls in try/catch. Set a maximum iteration count. Log everything.
5. **Iterate on prompts.** This is where you'll spend 80% of your time, and it's where 80% of the improvement comes from.
This approach gives you complete visibility into what your agent is doing and why. When something breaks, you know exactly where to look. When you need to change behavior, you change the prompt or the tool, not a framework configuration you barely understand.
Only add structure when you hit a real wall. When your single-file agent gets too long to navigate, refactor it. When you're copy-pasting the same loop across projects, extract a helper. When you genuinely need multi-agent coordination, *then* evaluate frameworks with a clear understanding of what problem they need to solve for you.
## The bottom line
The agent framework explosion is a sign that this space is exciting and full of potential. But excitement shouldn't drive your architecture decisions. The best agent you can build today is one you fully understand, can debug quickly, and can iterate on without friction.
A focused script with an LLM call, a tool, and a loop is already an agent. Start there. You might be surprised how far it takes you.
## References
1. "Why we no longer use LangChain for building our AI agents," Octomind Blog, [https://octomind.dev/blog/why-we-no-longer-use-langchain-for-building-our-ai-agents](https://octomind.dev/blog/why-we-no-longer-use-langchain-for-building-our-ai-agents)
2. "Building AI Agents Without Frameworks: What LangChain Won't Teach You," Can Demir, Towards AI, February 2026, [https://medium.com/@candemir13/building-ai-agents-without-frameworks-what-langchain-wont-teach-you-035a11d9d80c](https://medium.com/@candemir13/building-ai-agents-without-frameworks-what-langchain-wont-teach-you-035a11d9d80c)
3. "Everyone's Building AI Agent Frameworks, Most Are Getting It Wrong," Artiquare, November 2025, [https://www.artiquare.com/ai-agent-frameworks-critical-analysis](https://www.artiquare.com/ai-agent-frameworks-critical-analysis)
4. "Comparing Open-Source AI Agent Frameworks," Langfuse Blog, March 2025, [https://langfuse.com/blog/2025-03-19-ai-agent-comparison](https://langfuse.com/blog/2025-03-19-ai-agent-comparison)
5. "Build Multi-Agent AI Systems Without Frameworks," ScrapeGraphAI, March 2026, [https://scrapegraphai.com/blog/how-to-create-agent-without-frameworks](https://scrapegraphai.com/blog/how-to-create-agent-without-frameworks)
