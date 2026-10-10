---
title: "Harness engineering is the new title nobody asked for"
date: "2026-04-25"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","LLMs","Prompt Engineering","OpenAI","Anthropic","Claude","Models"]
---

Sometime in February 2026, Mitchell Hashimoto, the creator of Terraform and Ghostty, wrote a blog post about his AI adoption journey. Buried in it was a principle that resonated with a lot of people: every time you discover an agent has made a mistake, you take the time to engineer a solution so that it can never make that specific mistake again.
He called this practice *harness engineering*.
Days later, OpenAI published a post titled "Harness engineering: leveraging Codex in an agent-first world." Martin Fowler wrote about it. LangChain formalized the equation: Agent = Model + Harness. Thoughtworks featured it as a macro trend in their April 2026 Technology Radar. And just like that, we had a new discipline with a name, a growing body of literature, and inevitably, a LinkedIn discourse cycle.
But here's the thing: harness engineering isn't new. It's the formalization of something practitioners have been doing informally for years. And the fact that it needed a name tells us more about where the industry is than any benchmark ever could.
## The model was never the hard part
I've been saying this for a while now: the hard part isn't the model, it's everything around it.
When you ship an AI agent to production, the model is maybe 20% of the problem. The other 80% is context management, error recovery, validation loops, structured outputs, retry logic, fallback strategies, and all the unglamorous plumbing that turns a demo into something you'd actually trust with real work.
Harness engineering gives this work a name. As LangChain put it, a harness is every piece of code, configuration, and execution logic that isn't the model itself. System prompts, tool definitions, orchestration logic, sandboxes, verification hooks, compaction strategies. If you're not the model, you're the harness.
Martin Fowler's framework breaks this down further into two dimensions. First, there are *guides* (feedforward controls) that steer the agent before it acts, like specifications, coding conventions, and architectural rules. Then there are *sensors* (feedback controls) that observe after the agent acts and help it self-correct, like linters, test suites, and code review agents. Each of these can be either computational (deterministic, fast, run by the CPU) or inferential (semantic, slower, run by an LLM).
This is a genuinely useful mental model. It moves the conversation from "write better prompts" to "design better systems."
## From prompt engineering to harness engineering
The evolution is worth tracing because it reveals how our understanding of AI systems has matured.
**Prompt engineering** was the first wave. The implicit belief was that the model is capable, you just need to ask correctly. Role assignment, style constraints, few-shot examples. This worked because large language models are probabilistic generators highly sensitive to context. But as practitioners quickly learned, prompts optimize *expression*, not *information*. A perfect prompt cannot compensate for missing facts or state.
**Context engineering**, a term Andrej Karpathy popularized in late 2025, was the next step. It shifted focus from how you ask to what the model sees. Retrieval-augmented generation, memory systems, progressive context disclosure. Better inputs, better outputs.
**Harness engineering** goes further still. It's not just about what the model sees or how you prompt it. It's about the entire execution environment: the constraints, the verification loops, the failure recovery, the orchestration logic. It treats the model as one component in a larger system, not the system itself.
The progression makes sense. We started by talking to models. Then we started curating what they see. Now we're engineering the systems they operate within.
## Why this is happening now
Harness engineering didn't emerge because someone had a clever idea. It emerged because AI adoption crossed a threshold where inconsistency became a business problem, not a curiosity.
Thoughtworks captured this well in their April 2026 Technology Radar: "Consistency and reliability have always been significant concerns in AI. However, in the early part of 2026 they appear to have shifted from one of many issues to one of the most critical."
When you're experimenting with AI in a side project, a 70% success rate is exciting. When you're running AI agents in production at scale, a 70% success rate means 30% of your outputs need human intervention. That's not automation, that's a staffing problem with extra steps.
The evidence is compelling. LangChain demonstrated that harness changes alone moved their coding agent from 52.8% to 66.5% on Terminal Bench 2.0. Same model. Better harness. Better results. Anthropic showed that infrastructure configuration can move coding benchmark scores by more than many leaderboard gaps between models. The implication is significant: benchmarks often measure harness quality as much as, or more than, model quality.
This is why the "which model is best?" debate is increasingly beside the point. The gap between Claude, Gemini, and GPT shrinks with every release. The gap between a well-harnessed agent and a poorly-harnessed one is enormous and growing.
## The DevOps parallel
There's a pattern here that anyone who lived through the DevOps revolution will recognize.
We didn't need site reliability engineers until our systems were complex enough to break in production in ways we couldn't predict. We didn't need infrastructure-as-code until deployments became frequent enough that manual processes couldn't keep up. We didn't need observability platforms until distributed systems made "just read the logs" insufficient.
Harness engineering follows the same arc. We didn't need it when AI was a chatbot answering customer questions. We need it now because agents are writing code, making decisions, and operating autonomously across complex workflows.
The parallel goes deeper. DevOps recognized that the wall between "people who write code" and "people who run code" was artificial and counterproductive. Harness engineering recognizes that the wall between "the model" and "everything else" is equally artificial. You can't optimize them independently. The model's performance is inseparable from the system it operates within.
Even the organizational patterns rhyme. Just as mature engineering organizations developed platform teams to provide shared infrastructure, Fowler suggests we'll see *harness templates*: bundled sets of guides and sensors that teams can adopt for common service topologies. The enterprise playbook writes itself.
## One agent, one job
If you follow a "one agent, one job" philosophy, you naturally end up doing harness engineering whether you call it that or not.
When each agent has a narrow, well-defined responsibility, you can build tight constraints around it. You know exactly what tools it needs, what outputs are valid, what failure modes to watch for. The harness becomes specific and therefore effective.
Contrast this with the "god agent" approach: one agent that does everything, with a massive system prompt and dozens of tools. The harness for such an agent is necessarily loose, because you can't anticipate every path through every task. Loose harnesses mean more failures, more unpredictable behavior, more human intervention.
This is why the composability trend in AI systems, breaking complex workflows into specialized agents that hand off to each other, isn't just an architectural preference. It's a reliability strategy. Smaller agents are more harnessable, and more harnessable agents are more reliable.
## The irony nobody is talking about
Here's what I find genuinely funny about this moment: we spent years making AI smarter, and now we spend most of our energy making it predictable.
The entire field of harness engineering is essentially an admission that intelligence alone isn't enough. You can have the most capable model in the world, but without proper constraints, verification, and orchestration, it will still occasionally produce garbage and do so with complete confidence.
We made machines that can reason, and then immediately set about building cages for that reasoning. Not because the reasoning is bad, but because unconstrained reasoning in a production system is terrifying.
This isn't a failure. It's maturity. Every powerful technology goes through this arc. Electricity needed circuit breakers. Cars needed seatbelts. The internet needed firewalls. AI needs harnesses.
## What comes next
Fowler is honest about the gaps. The *maintainability harness*, things like code style, architecture rules, and complexity checks, is relatively mature because we have decades of tooling to draw from. The *architecture fitness harness*, performance requirements and observability standards, is emerging. But the *behaviour harness*, verifying that the agent actually does what you need it to do, is still the elephant in the room.
Most teams today rely on AI-generated test suites to verify AI-generated code, which is circular reasoning dressed up as quality assurance. We need better answers here, and we don't have them yet.
The other open question is cognitive debt. Thoughtworks flagged this in their Technology Radar as a macro concern: AI can accelerate many parts of development, but in doing so it creates greater distance between developers and the software they're responsible for. If you offload everything to a coding agent, what are you avoiding learning? Harness engineering doesn't solve this. It might even exacerbate it by making it easier to operate at a distance from the code.
But these are good problems to have. They're the problems of a maturing discipline, not a failing one.
## Not just a buzzword
It's tempting to dismiss "harness engineering" as another term minted by the AI hype cycle. We've certainly had our share of those. But there's a real discipline forming here, with real practitioners, real frameworks, and real results.
The fact that Thoughtworks, OpenAI, Anthropic, LangChain, and Martin Fowler all converged on the same concept within weeks of each other suggests this isn't manufactured consensus. It's recognition of a practice that already existed but lacked a shared vocabulary.
And that's ultimately what good naming does. It doesn't create something new. It makes something that already exists visible, discussable, and teachable. Harness engineering is the name nobody asked for, but it's the discipline everyone was already building.
## References
1. [Macro trends in the tech industry, April 2026](https://www.thoughtworks.com/en-us/insights/blog/technology-strategy/macro-trends-tech-industry-april-2026) , Thoughtworks
2. [My AI Adoption Journey](https://mitchellh.com/writing/my-ai-adoption-journey) , Mitchell Hashimoto
3. [The Anatomy of an Agent Harness](https://blog.langchain.com/the-anatomy-of-an-agent-harness/) , LangChain
4. [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html) , Martin Fowler
5. [What Is Harness Engineering AI? The Definitive 2026 Guide](https://atlan.com/know/what-is-harness-engineering/) , Atlan
6. [From Prompt Engineering to Harness Engineering](https://levelup.gitconnected.com/from-prompt-engineering-to-harness-engineering-0be55b7d32b7) , Level Up Coding
7. [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) , Anthropic
8. [Building Effective AI Agents](https://www.anthropic.com/research/building-effective-agents) , Anthropic
9. [Beyond vibe coding: The five building blocks of AI-native engineering](https://www.thoughtworks.com/insights/blog/generative-ai/beyond-vibe-coding-the-five-building-blocks-of-aI-native-engineering) , Thoughtworks
10. [As AI Accelerates Software Complexity, Thoughtworks Technology Radar Urges a Return to Engineering Fundamentals](https://www.thoughtworks.com/about-us/news/2026/combat-ai-cognitive-debt-radar-v34) , Thoughtworks
