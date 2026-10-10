---
title: "Prompt injection is still a thing"
date: "2026-01-25"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

We're deep into the age of autonomous AI agents, and one problem refuses to go away: **prompt injection**. It was a concern when ChatGPT first launched, and it's still a concern now that agents can read your email, query your databases, and take actions on your behalf. If anything, the stakes have gotten dramatically higher.
The uncomfortable truth is that no one has figured out how to reliably stop it. Not OpenAI, not Google, not Microsoft. And the architectural reasons why suggest this isn't getting solved anytime soon.
## The core problem hasn't changed
Large language models process all input tokens the same way. System instructions, retrieved documents, user queries, they all flow through the same attention mechanism as one undifferentiated sequence. There's no hardware-enforced boundary, no cryptographic separation, nothing that lets the model reliably distinguish "this is a trusted instruction" from "this is untrusted data."
Traditional computing solved this decades ago. Operating systems have privilege rings. Databases have parameterized queries that cleanly separate code from data. Web browsers enforce same-origin policies. But LLMs? Everything is just text in the same vector space.
This isn't a bug you can patch. It's a fundamental property of how transformers work. OpenAI has acknowledged this directly, calling it a "frontier security challenge" and noting that their own research going back several years hasn't cracked it.
## Agents made everything worse
When LLMs were just chatbots, prompt injection was mostly an embarrassment. You could trick a customer service bot into saying something weird. Not great, but not catastrophic.
Autonomous agents changed the calculus entirely. Simon Willison coined the term **"the Lethal Trifecta"** to describe the three conditions that make an agentic system truly dangerous:
1. **Access to private data**, the agent can read your emails, documents, and databases
2. **Exposure to untrusted tokens**, the agent processes input from external sources like emails, shared docs, and web content
3. **An exfiltration vector**, the agent can make external requests, render images, call APIs, or generate links
If your agentic system has all three, it's vulnerable. Period. And most useful agent setups have all three by design.
## Real attacks, not hypotheticals
This stopped being theoretical in 2025. Two high-profile attacks demonstrated the pattern clearly.
**EchoLeak** targeted Microsoft 365 Copilot. An attacker sends a crafted email with a hidden prompt injection. Later, when any user asks Copilot an unrelated question, its retrieval system pulls in the poisoned email as context. The embedded instructions tell Copilot to search for sensitive data and encode the results in an image URL request to the attacker's server. The browser "loads the image," and the data is gone. Zero clicks required from the victim.
**GeminiJack** was essentially the same attack against Google's stack. An attacker shares a Google Doc or sends a calendar invite with hidden instructions. These get indexed by Gemini Enterprise's retrieval system. When any employee runs a routine search, the agent executes those instructions, searches across Gmail, Calendar, and Docs for sensitive data, and exfiltrates it the same way.
Palo Alto's Unit 42 team has also documented indirect prompt injections in the wild, including cases where injected scripts attempted to force AI agents into making unauthorized purchases and destroying databases.
## The security testing results are bleak
VerSprite published detailed testing results against major AI platforms in 2025, and the findings are sobering. They tested NotebookLM, Perplexity, Gemini 2.5 Flash, ChatGPT-4o, and Microsoft 365 Copilot using documents with hidden prompt injections embedded in white text.
**No model was completely immune.**
NotebookLM was the most vulnerable, consistently executing hidden instructions from uploaded documents. Gemini 2.5 Flash, once successfully injected, stayed locked in the hijacked behavior and couldn't recover even when prompted with meta-questions. ChatGPT-4o showed stronger resistance when multiple files were present, but still followed injected instructions when the tampered file was processed alone. Microsoft 365 Copilot applied pre-processing filters that blocked many attempts, but injections placed at the beginning of a file could still slip through.
In most cases, there was no visible warning to the user that the assistant's behavior had been altered.
## The impossible tradeoff
This is where the real tension lives, and it's the reason this problem feels so stuck.
**Restrict agents too much, and they become useless.** The whole point of an autonomous agent is that it can act on your behalf without you micromanaging every step. If it needs approval for every action, or can only access a tiny slice of your data, you've built an expensive autocomplete tool.
**Give agents too much access, and they become a massive security risk.** Every additional data source, every new tool, every API connection expands the attack surface. And the behavior of these systems is fundamentally unpredictable, you can't test every possible input combination, and a clever attacker only needs to find one path through.
Traditional guardrails don't solve this. Input filtering catches yesterday's attacks but gets bypassed by encoding tricks, synonym substitution, or multi-turn manipulation. Prompt hardening (telling the model to resist injection via the system prompt) is fighting text with text, and sophisticated attackers can reason their way around it. Output filtering helps catch some leaks but introduces false positives that degrade the user experience.
## Why this might be a billion-dollar problem
The OWASP Top 10 for LLM Applications ranks prompt injection as the number one threat. Every enterprise deploying AI agents, and that's increasingly all of them, faces this risk. Yet there's no clean solution on the market.
The companies and researchers working on this are exploring several directions:
**Architectural separation.** Training models with explicit privilege signals so they learn that system context supersedes user context. This is promising but unproven at scale.
**Constitutional AI.** Anthropic's approach of training models to self-critique against a set of principles. It adds a reasoning layer that simple safety training lacks, but sophisticated attackers can still exploit the model's own reasoning.
**Formal verification.** Developing mathematical frameworks to prove security properties of LLM behavior. The challenge is that LLM behavior is probabilistic and context-dependent, making formal guarantees extraordinarily difficult.
**Independent validation layers.** Moving critical decisions out of the LLM entirely and into hardened, rule-based systems that don't trust the model's output. This is the most practical approach today, but it adds complexity and latency.
None of these are complete solutions. Whoever cracks this, truly cracks it, will have built something the entire industry needs.
## What you can do today
Perfect protection isn't possible, but layered defenses raise the cost of attacks and limit the blast radius.
**Map your blast radius.** Know exactly what data sources your agents can access and what the maximum damage looks like if one gets compromised.
**Apply least privilege aggressively.** Your agent probably doesn't need access to all of Gmail, all of Slack, and all of your databases simultaneously. Segment access to what's actually needed for each workflow.
**Control exfiltration vectors.** Block or restrict external image loading in AI-generated responses. Implement content security policies. Monitor for unusual patterns of external requests.
**Treat agents like privileged infrastructure.** Audit access patterns, log all queries and responses, alert on anomalous behavior, and conduct regular security assessments.
**Require human approval for irreversible actions.** For anything high-impact, like financial transactions, customer communications, or code deployments, route the agent's proposal to a human reviewer first.
**Keep context windows short.** Trim old conversation turns, summarize large documents offline, and cap token counts. Less text means fewer hiding spots for malicious instructions.
**Red-team regularly.** Schedule professional testing that attempts direct and indirect injections, encoding tricks, document poisoning, and multi-turn manipulation.
## The bottom line
We're building increasingly powerful autonomous systems on architecturally insecure foundations. The shift from asking "can we eliminate prompt injection?" to "how do we live safely with it?" is essential. Prompt injection isn't a bug to be fixed. It's a fundamental characteristic of current AI systems that we have to design around.
The agents are here. The threats are real. And whoever figures out how to make these systems genuinely trustworthy won't just have a good product, they'll have defined the next era of AI security.
## References
1. Airia, "AI Security in 2026: Prompt Injection, the Lethal Trifecta, and How to Defend" (January 2026), [airia.com](http://airia.com)
2. VerSprite, "Prompt Injection in AI: Why LLMs Remain Vulnerable in 2025" (August 2025), [versprite.com](http://versprite.com)
3. Shashwata Bhattacharjee, "The Unsolvable Problem: Why Prompt Injection May Define the AI Security Era" (December 2025), [medium.com](http://medium.com)
4. Bernard Marr, "When AI Agents Turn Against You: The Prompt Injection Threat Every Business Leader Must Understand," Forbes (January 2026), [forbes.com](http://forbes.com)
5. OWASP, "LLM01:2025 Prompt Injection," OWASP Gen AI Security Project, [genai.owasp.org](http://genai.owasp.org)
6. Palo Alto Networks Unit 42, "Fooling AI Agents: Web-Based Indirect Prompt Injection Observed in the Wild," [unit42.paloaltonetworks.com](http://unit42.paloaltonetworks.com)
7. Simon Willison, "The Lethal Trifecta" (June 2025), [simonwillison.net](http://simonwillison.net)
8. NVIDIA, "Securing LLM Systems Against Prompt Injection," [developer.nvidia.com](http://developer.nvidia.com)
9. McKinsey, "Deploying Agentic AI with Safety and Security: A Playbook for Technology Leaders" (October 2025), [mckinsey.com](http://mckinsey.com)
10. OWASP, "LLM Prompt Injection Prevention Cheat Sheet," [cheatsheetseries.owasp.org](http://cheatsheetseries.owasp.org)
