---
title: "Your deploy script is already an agent"
date: "2026-04-14"
lastEdited: "2026-04-29T12:47:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Agents","LLMs","Anthropic"]
---

Everyone's building AI agents from scratch. New frameworks drop weekly. Twitter threads declare that agents will replace every developer tool in existence. And yet, the most battle-tested agent you own has been running in production for years.
It's your deploy script.
## What even is an agent?
Strip away the hype and an agent is just a system that follows a loop: it reads its environment, decides what to do, takes action, and observes the result. The AI research community formalized this as the Thought-Action-Observation cycle, sometimes called the ReAct pattern. An LLM reasons about a task, calls a tool, checks the output, and decides the next step.
But here's the thing: nothing about that loop requires a large language model. The loop is the pattern. The LLM is just one possible engine inside it.
Your CI/CD pipeline does the same thing. It reads context (a git push, a pull request, environment variables), decides what to do (run tests, lint, build), takes action (executes those steps), and observes results (pass or fail, then proceeds or halts). It even has a primitive form of branching logic: if tests fail, roll back. If a canary deployment shows errors, stop the rollout.
That's an agent. It's just one nobody calls an agent because it was built before the term became fashionable.
## The agentwashing problem, in reverse
The industry has a well-documented "agentwashing" problem, where companies rebrand basic automation as sophisticated AI agents without delivering genuine autonomous reasoning. Thoughtworks, Forbes, and others have written about how the term "agent" gets slapped onto anything with an API call and a chat interface.
But there's a less discussed version of this problem running in the opposite direction. We're so busy inflating the definition of "agent" to sell new tools that we've stopped recognizing the agentic systems we've been operating for over a decade.
Think about it:
- **Cron jobs** observe time, decide it's time to act, execute a task, and handle success or failure.
- **Webhooks** respond to external events, parse context, and trigger downstream actions.
- **Monitoring alerts** watch system metrics, reason about thresholds, and take automated remediation steps.
- **CI/CD pipelines** orchestrate complex multi-step workflows with conditional logic, retries, and rollbacks.
These systems read environment, decide, act, and loop. That's the agent pattern. We just never needed a buzzword for it.
## A GitHub Actions workflow is an agent
Let's make this concrete. Consider a fairly standard GitHub Actions workflow:
1. A developer opens a pull request.
2. The workflow reads the PR context: changed files, commit messages, branch name.
3. It decides which test suites to run based on what changed.
4. It executes those tests, runs linting, and checks for security vulnerabilities.
5. It observes the results. If everything passes and the PR has approvals, it auto-merges.
6. If something fails, it posts a comment explaining what went wrong and notifies the team.
That workflow has perception (reading PR context), reasoning (deciding which tests to run), action (executing builds and tests), and feedback (reporting results and deciding next steps). It even adapts its behavior based on the specific input it receives.
Swap "GitHub Actions" for "AI agent" and that description fits neatly into any agentic framework's marketing page. The only difference is that the reasoning engine is conditional logic instead of an LLM.
## The real unlock isn't new agents
This reframing isn't just philosophical navel-gazing. It has practical consequences.
If the goal is smarter automation, you don't always need to build from scratch. Sometimes the highest-leverage move is bolting intelligence onto the agents you already have. The Red Hat team demonstrated this with cicaddy, a framework for building agentic workflows directly inside existing CI/CD pipelines, no separate agentic platform required. Your CI system is already the scheduler, the executor, and the audit trail.
Here's what that looks like in practice:
- **Smarter test selection.** Instead of running every test on every PR, an LLM reads the diff and predicts which test suites are likely to be affected. Your pipeline already knows how to run tests. Now it just picks better ones.
- **Automated failure triage.** When a build fails, instead of dumping a raw log, an LLM summarizes the error, correlates it with recent changes, and suggests a fix. The pipeline already catches failures. Now it explains them.
- **Intelligent deployment decisions.** An LLM reviews the changelog, assesses risk based on the scope of changes, and recommends a deployment strategy (canary vs. full rollout). The pipeline already deploys. Now it deploys more carefully.
- **Self-healing configuration.** When environment drift causes failures, an LLM diagnoses the mismatch and proposes a config update. The pipeline already retries. Now it retries smarter.
None of these require throwing away your existing infrastructure. They're augmentations, not replacements. As the USENIX article on adding LLMs to CI/CD put it: "It's about augmentation, faster feedback, better documentation, more edge cases caught."
## Why the framing matters
When you see your existing infrastructure as agents, you start designing better ones. You inherit decades of operational wisdom that the AI agent community is painfully rediscovering from first principles.
**Failure modes.** Your deploy script already has circuit breakers, timeouts, and rollback logic. Most LLM agent frameworks are still figuring out what to do when a tool call fails. If you've ever debugged a flaky CI pipeline at 2 AM, you know more about agent reliability than most agent framework READMEs will teach you.
**Observability.** Your pipeline has structured logs, metrics, and alerts. You can trace exactly what happened, when, and why. Meanwhile, the average AI agent's debugging experience is "the LLM decided to do something weird and I don't know why." The best agent systems will look a lot more like your existing CI dashboards than like chat windows.
**Kill switches.** You can stop a deployment mid-rollout. You can revert to a previous version. You can disable a pipeline with a single toggle. These controls exist because people learned the hard way that autonomous systems need guardrails. Every serious guide to deploying AI agents, from Anthropic's measurement framework to AWS's strategic guide, emphasizes the same thing: human oversight, confidence thresholds, and operational guardrails.
**Single responsibility.** A good deploy script does one thing well. It doesn't also handle customer support, write documentation, and manage your calendar. This "one agent, one job" philosophy is something the AI agent world is slowly converging on after watching too many "do everything" agents fail spectacularly. Your deploy script already follows this principle. Don't break it by making it do everything.
## The best agent framework is the one you already run
There's a post on API Evangelist that puts it bluntly: "I have requests, cron jobs, and events to accomplish any automation I encounter. I genuinely do not understand why I would need an 'agent' to do anything for me when I have this robust toolbox."
That's a bit extreme, but the core insight is right. The fundamentals of good agent design, perception, decision-making, action, feedback, aren't new. They're the same principles behind every well-built automation system.
The LLM doesn't change what an agent is. It changes what an agent can reason about. Traditional agents reason about structured data: exit codes, HTTP status codes, JSON payloads. LLM-powered agents can reason about unstructured data: natural language, code semantics, user intent. That's genuinely powerful, but it's an upgrade to the reasoning engine, not a reinvention of the pattern.
So before you reach for the next agent framework, take a look at the automation you already run. Your deploy scripts, your cron jobs, your webhook handlers, your monitoring pipelines. They're agents. They've been agents all along.
The question isn't whether to build agents. You already have. The question is whether to make them smarter.
## References
1. Oracle, ["What Is the AI Agent Loop? The Core Architecture Behind Autonomous AI Systems"](https://blogs.oracle.com/developers/what-is-the-ai-agent-loop-the-core-architecture-behind-autonomous-ai-systems)
2. Thoughtworks, ["The Dangers of AI Agentwashing"](https://www.thoughtworks.com/en-us/insights/blog/generative-ai/Agentwashing-and-how-AI-agents-fail-us)
3. Red Hat Developer, ["How to Develop Agentic Workflows in a CI Pipeline with cicaddy"](https://developers.redhat.com/articles/2026/03/12/how-develop-agentic-workflows-ci-pipeline-cicaddy)
4. USENIX, ["AI in the Pipeline: Reliability Lessons from Adding an LLM to CI/CD"](https://www.usenix.org/publications/loginonline/ai-pipeline-reliability-lessons-adding-llm-cicd)
5. Anthropic, ["Measuring AI Agent Autonomy in Practice"](https://www.anthropic.com/news/measuring-agent-autonomy)
6. AWS, ["AI Agents vs. Automation: A Strategic Guide for Business Leaders"](https://aws.amazon.com/executive-insights/content/agents-vs-automation-a-strategic-guide-for-business-leaders/)
7. API Evangelist, ["Why Do I Need Agents When I Have Requests, CRON Jobs, and Events?"](https://apievangelist.com/2026/02/02/why-do-i-need-agents-when-i-have-requests-cron-jobs-and-events/)
8. Medium, ["Your CI/CD Pipeline Is About to Get an AI Agent, Here's What Changes"](https://medium.com/@Micheal-Lanham/your-ci-cd-pipeline-is-about-to-get-an-ai-agent-heres-what-changes-14374f3f4e5d)
9. Forbes, ["What Is AI Agent Washing, And Why Is It Everywhere?"](https://www.forbes.com/sites/aytekintank/2025/08/20/what-is-ai-agent-washing-and-why-is-it-everywhere/)
