---
title: "The state of cloud agents"
date: "2026-04-20T20:20:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Agents","Cloud","Coding","DevTools","OpenAI","Anthropic","Claude","Google","Microsoft","MCP","CLI","Pricing","Security"]
---

Software development is being reshaped by a new category of tool: cloud coding agents. Unlike the autocomplete assistants and chat sidebars of 2024, these agents operate autonomously in cloud environments, cloning repositories, writing code across multiple files, running tests, and opening pull requests, all while you do something else entirely.
The shift has been dramatic. Cursor reports that over 30% of their internally merged PRs are now created by cloud agents. OpenAI says Codex usage has surged among enterprise customers. Anthropic's Claude Code has become the go-to "escalation path" for developers tackling hard problems. And new entrants like Google's Jules and Cognition's Devin are pushing the boundaries of what autonomous coding looks like.
This post takes a close look at the major cloud coding agents available in early 2026, compares their architectures and trade-offs, and offers a perspective on which might be the best fit depending on how you work.
## What makes a cloud coding agent different
Traditional AI coding assistants live inside your editor. They suggest the next line, answer questions, and help you refactor. Cloud coding agents go further. They run in isolated environments (virtual machines or sandboxes), operate asynchronously in the background, and produce complete artifacts like pull requests, test results, and even video demos of their work.
The key characteristics that define this category:
- **Autonomous execution** in a cloud sandbox or VM, not on your laptop
- **Repository-level understanding**, not just the file you have open
- **Asynchronous workflows** where you assign a task and come back later to review
- **Parallel processing**, running multiple agents on multiple tasks simultaneously
- **Self-validation**, agents that can build, test, and iterate on their own output
## The major cloud coding agents
### GitHub Copilot coding agent
GitHub's coding agent is deeply integrated into the GitHub platform itself. You assign a GitHub issue to Copilot, and it autonomously writes code, creates a pull request, and responds to review feedback, all in the background. Each session runs on GitHub Actions infrastructure.
**How it works:** Assign an issue to Copilot (or ask it in Copilot Chat to create a PR). The agent spins up a secure cloud environment, reads the repository, implements changes, runs security analysis via CodeQL, checks for secrets, and validates dependencies against the GitHub Advisory Database before completing the PR.
**Key strengths:**
- Native GitHub integration means zero setup friction
- Built-in security protections (CodeQL, secret scanning, dependency checks)
- Simple pricing: one premium request per session regardless of complexity
- Works with third-party agents too (Claude, Codex) through the same GitHub interface
**Limitations:**
- Less impressive on complex reasoning compared to Claude Code or Codex
- Tied to the GitHub ecosystem
- Power users often find it less flexible than CLI-based agents
**Pricing:** Available on all Copilot plans including Free (limited), Pro (\$10/month), Pro+ (\$39/month), Business (\$19/user/month), and Enterprise (\$39/user/month). The coding agent uses premium requests, with each session costing exactly one premium request.
### OpenAI Codex
Codex is OpenAI's cloud-based software engineering agent, powered by codex-1 (a version of o3 optimized for coding). It was purpose-built for autonomous, parallel task execution in sandboxed environments.
**How it works:** Through the Codex web interface or CLI, you assign tasks that run in isolated cloud sandboxes preloaded with your repository. Each task gets its own environment, and you can run many in parallel. Codex can read and edit code, run tests, install packages, and produce pull requests. Internet access is toggleable with per-domain allow lists.
**Key strengths:**
- Exceptional code correctness, consistently produces fewer bugs than competitors according to practitioner reports
- Strong deterministic behavior on multi-step tasks
- Secure sandboxing with toggleable internet access
- Parallel task execution across multiple cloud environments
- The new Codex desktop app serves as a "command center" for managing multiple agents
**Limitations:**
- Slower than Claude Code due to less aggressive sub-agent delegation
- Context window management and parallelism are still catching up
- PR descriptions and commit messages tend to be terse
**Pricing:** Included with ChatGPT subscriptions: Plus (\$20/month), Pro (\$200/month), Business (\$25/user/month), and Enterprise (custom). Currently available free for a limited time on ChatGPT Free and Go plans, with 2x rate limits on paid plans.
### Claude Code
Claude Code takes a fundamentally different architectural approach from other cloud agents. Rather than moving your code to the cloud, it keeps everything local. Your code, environment, MCP servers, and project settings all stay on your machine. The recently launched Remote Control feature (February 2026) lets you start a session in your terminal and continue controlling it from your phone or another device through a secure encrypted bridge.
**How it works:** Claude Code runs as a CLI tool in your terminal, directly in your project directory. It reads files, runs commands, edits code, manages git operations, and can orchestrate sub-agents across multiple context windows. The Opus model excels at splitting work across parallel sub-agents using tools like Explore (powered by Haiku for fast token processing) and Task calls.
**Key strengths:**
- Best-in-class context window management and sub-agent orchestration
- Exceptional at planning, debugging, and architectural reasoning
- Superior tool use (git, gh CLI, MCP servers, browser via /chrome)
- "Creative" planning that catches things you might have forgotten
- Human-readable PR descriptions and architecture diagrams
- Remote Control lets you manage sessions from mobile without cloud handoff
**Limitations:**
- Code correctness is slightly behind Codex according to some practitioners
- Runs locally rather than in a cloud VM (a trade-off, not purely a limitation)
- Cost can add up quickly on Max plans for heavy usage
- The local-first model means you need your machine running (though Remote Control helps)
**Pricing:** Pro plan at \$20/month (roughly 40-80 hours of usage per week), Max 5x at \$100/month, Max 20x at \$200/month. API access also available through Anthropic Console with pay-per-use billing.
### Cursor cloud agents
Cursor made a major leap on February 24, 2026, when it launched upgraded cloud agents that give each agent its own virtual machine with a full development environment. These agents can build software, test their own changes, interact with desktop applications, record video demos of their work, and produce merge-ready pull requests.
**How it works:** Cloud agents run in isolated VMs that replicate a full development environment. You can launch them from the Cursor desktop app, web, mobile, Slack, or GitHub. Each agent onboards itself to your codebase, implements changes, and can even use browser and desktop applications to verify its work. You can SSH into the VM or use port forwarding to test changes yourself.
**Key strengths:**
- Full VM isolation means agents can truly build, run, and test software end-to-end
- Computer use capability lets agents interact with browsers, spreadsheets, and desktop apps
- Video and screenshot artifacts for quick validation of agent work
- Available from multiple surfaces (web, mobile, Slack, GitHub)
- MCP server support for extensibility
- Cursor's Bugbot provides automated code review on agent-generated PRs
**Limitations:**
- Pricing tied to API-level model costs, which can be unpredictable for heavy usage
- Still maturing on very large, complex refactors
- Your code runs on Cursor's infrastructure (a consideration for some teams)
**Pricing:** Pro plan includes \$20 of API agent usage, Pro Plus includes \$70, Ultra includes \$400. Cloud agents use Max Mode pricing. Additional usage is charged at model API rates.
### Google Jules
Jules is Google's asynchronous coding agent, currently in public beta. It takes a "remote contractor" approach, running tasks in secure Google Cloud VMs and delivering results as GitHub pull requests.
**How it works:** You describe a task through the Jules web interface or CLI tools. Jules clones your repository into a temporary VM, installs dependencies, runs build scripts, implements changes, and verifies them before creating a pull request with detailed diffs and reasoning. It also supports audio changelogs for team updates.
**Key strengths:**
- Fully asynchronous, works entirely in the background
- Powered by Gemini 3, Google's latest model
- Secure Google Cloud VM execution
- GitHub integration with detailed PR diffs and reasoning
- Multimodal output including audio changelogs
- CLI tools (Jules Tools) make it scriptable and programmable
**Limitations:**
- Still in public beta with regional availability restrictions
- Less battle-tested than Claude Code or Codex in production workflows
- Developer community feedback is still limited compared to more established agents
**Pricing:** Included with Google AI subscriptions. Google AI Ultra provides the highest limits for multi-agent workflows.
### Devin
Devin, built by Cognition Labs, was one of the earliest entrants in the autonomous coding agent space and positions itself as a full "AI software engineer" rather than an assistant. It recently gained additional attention after Cognition acquired Windsurf.
**How it works:** You assign Devin a task through Slack, Microsoft Teams, Linear, Jira, or its web interface. Devin plans the approach, shows you its proposal for review, implements changes in a cloud sandbox, tests them, and creates a pull request. It handles the entire lifecycle from ticket to tested code.
**Key strengths:**
- End-to-end task completion from issue to tested PR
- Deep integrations with project management tools (Jira, Linear, Slack, Teams)
- Devin Wiki and Devin Search provide codebase documentation and Q&A
- Strong focus on enterprise and government use cases
- Mobile coding support via natural language
**Limitations:**
- Higher cost, especially for teams needing API access (\$500/month for Teams plan)
- ACU (Agent Compute Unit) consumption can be unpredictable
- Some developers report it works better on well-defined tasks than ambiguous ones
**Pricing:** Core plan at \$20/month for individuals, Teams at \$500/month with API access, Enterprise with custom pricing.
## Comparison at a glance
<table fit-page-width="true" header-row="true" header-column="true">
<tr color="blue_bg">
<td>**Agent**</td>
<td>**Execution environment**</td>
<td>**Primary interface**</td>
<td>**Best for**</td>
<td>**Starting price**</td>
<td>**Parallel agents**</td>
<td>**Code correctness**</td>
<td>**Context management**</td>
<td>**Speed**</td>
<td>**Self-testing**</td>
<td>**Security model**</td>
</tr>
<tr>
<td>**GitHub Copilot**</td>
<td>GitHub Actions (cloud)</td>
<td>GitHub Issues, Chat</td>
<td>Teams already on GitHub</td>
<td>Free (limited)</td>
<td>Yes</td>
<td>Good</td>
<td>Good</td>
<td>Fast</td>
<td>CodeQL, dependency checks</td>
<td>Cloud (GitHub infrastructure)</td>
</tr>
<tr>
<td>**OpenAI Codex**</td>
<td>Cloud sandbox</td>
<td>Web, CLI, Desktop app</td>
<td>Code correctness, parallel tasks</td>
<td>\$20/mo (ChatGPT Plus)</td>
<td>Yes</td>
<td>Excellent</td>
<td>Good (improving)</td>
<td>Slow</td>
<td>Runs tests in sandbox</td>
<td>Isolated sandbox, toggleable internet</td>
</tr>
<tr>
<td>**Claude Code**</td>
<td>Local machine + Remote Control</td>
<td>CLI (terminal)</td>
<td>Planning, debugging, complex reasoning</td>
<td>\$20/mo (Pro)</td>
<td>Yes (sub-agents)</td>
<td>Very good</td>
<td>Excellent</td>
<td>Fast</td>
<td>Runs tests locally</td>
<td>Local-first (code stays on your machine)</td>
</tr>
<tr>
<td>**Cursor Cloud**</td>
<td>Isolated VMs</td>
<td>IDE, Web, Mobile, Slack</td>
<td>End-to-end feature building with verification</td>
<td>\$20/mo (Pro)</td>
<td>Yes</td>
<td>Very good</td>
<td>Very good</td>
<td>Fast</td>
<td>Full VM with computer use</td>
<td>Isolated VMs</td>
</tr>
<tr>
<td>**Google Jules**</td>
<td>Google Cloud VMs</td>
<td>Web, CLI</td>
<td>Async tasks, Google ecosystem</td>
<td>Free (beta)</td>
<td>Yes</td>
<td>Good</td>
<td>Good</td>
<td>Moderate</td>
<td>Builds and verifies in VM</td>
<td>Google Cloud VMs</td>
</tr>
<tr>
<td>**Devin**</td>
<td>Cloud sandbox</td>
<td>Slack, Jira, Linear, Web</td>
<td>End-to-end autonomous engineering</td>
<td>\$20/mo (Core)</td>
<td>Yes</td>
<td>Good</td>
<td>Good</td>
<td>Moderate</td>
<td>Full lifecycle testing</td>
<td>Cloud sandbox</td>
</tr>
</table>
## The architectural divide: cloud-first vs. local-first
One of the most interesting tensions in this space is the architectural split between cloud-first and local-first approaches.
**Cloud-first agents** (Cursor, Codex, Jules, Devin, GitHub Copilot) move the execution environment to the cloud. Each agent gets its own VM or sandbox. This enables true parallelism, eliminates local resource conflicts, and means your laptop does not need to stay connected. The trade-off is that your code runs on someone else's infrastructure.
**Local-first agents** (Claude Code) keep everything on your machine. Code never leaves your environment. MCP servers, environment variables, and project settings all stay local. The cloud only routes messages between your devices. The trade-off is that you need your machine running, and true cloud-level parallelism requires worktrees and multiple terminal sessions.
Neither approach is strictly superior. For teams with strict data residency requirements or sensitive codebases, local-first is compelling. For teams that want to fire off dozens of tasks and review results in the morning, cloud-first offers clear advantages.
## How practitioners actually use these tools
One of the most revealing perspectives comes from developers who pay for and use multiple agents daily. A common pattern emerging in 2026 is using different agents for different phases of work:
1. **Planning and architecture:** Claude Code (Opus) excels at creating plans, explaining code structure, and catching things you might have forgotten. Its sub-agent orchestration feels fast and natural.
2. **Writing code:** Codex consistently produces fewer bugs. When correctness matters most, practitioners report reaching for Codex over Claude Code, despite it being slower.
3. **Parallel background tasks:** Cursor cloud agents and Codex are popular choices for kicking off multiple tasks before going to bed or stepping away.
4. **Code review:** Cursor's Bugbot and Codex's code review are increasingly trusted for catching subtle bugs that human reviewers miss.
5. **Quick fixes and bug reproduction:** Cursor cloud agents shine here, especially with their ability to record video demos and interact with the actual software.
The idea of picking one tool and using it exclusively is fading. As Calvin French-Owen (who helped launch the Codex web product) puts it: developer time is now the biggest consideration, and the choice of agent is increasingly a function of how much time you have and how long you want it to run autonomously.
## Conclusion: which agent is best?
There is no single best cloud coding agent. The answer depends on your priorities:
- **If you want the most correct code:** OpenAI Codex. Practitioners consistently report fewer bugs in Codex-generated code, though it comes at the cost of speed.
- **If you want the best reasoning and planning:** Claude Code. Opus is unmatched at understanding complex codebases, orchestrating sub-agents, and producing thoughtful plans and explanations. Its local-first architecture is also ideal for privacy-sensitive work.
- **If you want end-to-end autonomy with verification:** Cursor cloud agents. The ability to give each agent a full VM, let it build and test software, and produce video proof of its work is genuinely novel. This is the closest thing to a "self-driving codebase" available today.
- **If you want the least friction on GitHub:** GitHub Copilot coding agent. It is already there, already approved by your company, and the one-premium-request-per-session pricing is hard to beat for predictability.
- **If you want full lifecycle automation from ticket to PR:** Devin. Its deep integrations with Jira, Linear, and Slack make it the most "project-management-aware" agent.
- **If you are in the Google ecosystem:** Jules is promising and rapidly improving with Gemini 3, though still in beta.
The most productive developers in 2026 are not choosing one agent. They are building workflows that leverage the strengths of several, switching between planning in Claude Code, coding in Codex, reviewing with Bugbot, and verifying with Cursor cloud agents. The tools are converging in capability, but their architectural choices and trade-offs still make each one better suited to different parts of the development lifecycle.
The real question is no longer "which agent writes the best code?" It is "how do I orchestrate these agents to ship better software faster?" And that is a question about workflow design, not tool selection.
## References
1. GitHub, "GitHub Copilot: Meet the new coding agent," [https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/](https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/)
2. OpenAI, "Introducing Codex," [https://openai.com/index/introducing-codex/](https://openai.com/index/introducing-codex/)
3. Cursor, "Cursor agents can now control their own computers," [https://cursor.com/blog/agent-computer-use](https://cursor.com/blog/agent-computer-use)
4. Cursor, "Cloud Agents," [https://cursor.com/blog/cloud-agents](https://cursor.com/blog/cloud-agents)
5. Anthropic, Claude Code Remote Control documentation, [https://orbilontech.com/claude-code-remote-control-mobile-coding-2026/](https://orbilontech.com/claude-code-remote-control-mobile-coding-2026/)
6. [DevOps.com](http://DevOps.com), "Claude Code Remote Control Keeps Your Agent Local and Puts it in Your Pocket," [https://devops.com/claude-code-remote-control-keeps-your-agent-local-and-puts-it-in-your-pocket/](https://devops.com/claude-code-remote-control-keeps-your-agent-local-and-puts-it-in-your-pocket/)
7. Google, "Build with Jules, your asynchronous coding agent," [https://blog.google/innovation-and-ai/models-and-research/google-labs/jules/](https://blog.google/innovation-and-ai/models-and-research/google-labs/jules/)
8. Google Developers Blog, "Building with Gemini 3 in Jules," [https://developers.googleblog.com/jules-gemini-3/](https://developers.googleblog.com/jules-gemini-3/)
9. Cognition Labs, "Introducing Devin," [https://cognition.ai/blog/introducing-devin](https://cognition.ai/blog/introducing-devin)
10. Calvin French-Owen, "Coding Agents in Feb 2026," [https://calv.info/agents-feb-2026](https://calv.info/agents-feb-2026)
11. Faros AI, "Best AI Coding Agents for Developers in 2026," [https://www.faros.ai/blog/best-ai-coding-agents-2026](https://www.faros.ai/blog/best-ai-coding-agents-2026)
12. CNBC, "Cursor announces major update as AI coding agent battle heats up," [https://www.cnbc.com/2026/02/24/cursor-announces-major-update-as-ai-coding-agent-battle-heats-up.html](https://www.cnbc.com/2026/02/24/cursor-announces-major-update-as-ai-coding-agent-battle-heats-up.html)
13. Fortune, "OpenAI reports Codex usage is surging," [https://fortune.com/2026/03/04/openai-codex-growth-enterprise-ai-agents/](https://fortune.com/2026/03/04/openai-codex-growth-enterprise-ai-agents/)
14. GitHub, "GitHub Copilot coding agent now uses one premium request per session," [https://github.blog/changelog/2025-07-10-github-copilot-coding-agent-now-uses-one-premium-request-per-session/](https://github.blog/changelog/2025-07-10-github-copilot-coding-agent-now-uses-one-premium-request-per-session/)
15. Cursor, "The third era of AI software development," [https://cursor.com/blog/third-era](https://cursor.com/blog/third-era)
