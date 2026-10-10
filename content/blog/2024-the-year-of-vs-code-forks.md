---
title: "2024, the year of VS Code forks"
date: "2026-01-28"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Something interesting happened in 2024. Visual Studio Code, the editor that had quietly become the default for most developers, started spawning forks at an unprecedented rate. Not hobbyist forks or theme tweaks, but fully funded, venture-backed products with serious ambitions to reshape how we write software.
The catalyst? AI. Specifically, the realization that VS Code's extension API wasn't flexible enough to build the kind of deep, agentic AI experiences that a new generation of startups wanted to deliver.
## The fork that started it all: Cursor
Cursor was the first major VS Code fork to gain real traction. Built by Anysphere, a San Francisco startup founded in 2022 by four MIT graduates, Cursor launched its initial version in March 2023. But it was in 2024 that the product truly exploded.
The pitch was simple: take the editor developers already know and love, and rebuild the AI layer from the ground up. Instead of being constrained by VS Code's extension API, Cursor could modify the editor core directly, enabling inline code generation, multi-file edits, and a chat sidebar with full codebase awareness.
By late 2024, Cursor had become the default recommendation in AI-coding circles. Developers praised its tab-completion, its ability to understand project context, and its surprisingly good code generation. The growth was staggering. By November 2025, the company had crossed \$1 billion in annualized revenue, raised \$2.3 billion at a \$29.3 billion valuation, and counted most of the Fortune 500 as customers.
Cursor proved that forking VS Code wasn't just viable, it was potentially one of the fastest paths to building a billion-dollar developer tool.
## Windsurf enters the race
If Cursor opened the door, Windsurf kicked it wide open. Launched in November 2024 by Codeium (a company already well-known for its free AI code completion extension), Windsurf branded itself as "the first agentic IDE."
Codeium had a strategic reason for forking rather than staying as an extension. As the team explained in their launch blog post, building a fork gave them "flexibility in UX by not being constrained by the APIs for VS Code extensions, while simultaneously not having to rebuild all of the core internals of an IDE."
Windsurf introduced the concept of "Flows," a paradigm that blended copilot-style suggestions with agent-style autonomous actions. Its Cascade engine could track developer intent across files, make coordinated edits, and even run terminal commands. Early reviewers noted that Windsurf handled larger codebases particularly well, understanding context better than competitors in some scenarios.
The pricing was aggressive too. At \$10-15 per seat per month compared to Cursor's \$20-40, Windsurf positioned itself as the more accessible option, complete with a free tier.
## Void: the open-source answer
Not everyone was comfortable sending their code through proprietary backends. Enter Void, a YC-backed startup (Summer 2024 batch) that set out to build an open-source alternative to Cursor.
Void's thesis was straightforward: developers should be able to use AI coding tools without routing their private code through someone else's servers. The editor lets you connect directly to any LLM provider, whether that's a frontier model like Claude or GPT-4, or a locally hosted open-source model like DeepSeek or Llama.
As a fork of VS Code, Void maintained the familiar interface and extension compatibility. But it stripped away the proprietary backend, giving developers full control over their data and model choices. The project gained significant attention on GitHub and shipped its beta in 2025.
## Trae: ByteDance joins the party
Perhaps the most surprising entrant was Trae, launched by ByteDance (yes, the TikTok parent company) in January 2025. Trae offered free access to powerful models like GPT-4o and Claude 3.5 Sonnet, making it immediately attractive to cost-conscious developers.
The editor featured a polished UI that borrowed design cues from both VS Code and JetBrains Fleet, along with a "Builder mode" for project-level code generation. It was initially available on macOS, with Windows support following shortly after.
However, Trae also attracted controversy. Security researchers found that early versions consumed significantly more memory than the base VS Code (5.7GB versus 0.9GB) and ran far more background processes. Questions about telemetry and data handling added to the concerns, particularly given ByteDance's ownership. The company acknowledged the resource issues and shipped fixes, but the privacy debate continued.
## Why fork VS Code at all?
The common thread across all these projects is a shared frustration with VS Code's extension API. Extensions in VS Code run in a sandboxed environment with limited access to the editor's internals. You can add sidebar panels and modify some behaviors, but you can't fundamentally change how the editor renders code, handles diffs, or manages file operations.
For AI-powered features like inline multi-file editing, intelligent diff views, and agentic workflows that coordinate across the editor, terminal, and file system, the extension API simply wasn't enough. Forking gave these teams the freedom to modify the editor at any level while still inheriting the massive ecosystem of VS Code themes, keybindings, and (in most cases) extensions.
As one analysis from EclipseSource noted, "Forking VS Code often feels like the fastest path to innovation, especially for those developing AI-powered tools or custom UX features." The tradeoff is a significant maintenance burden, since you now have to keep up with upstream VS Code changes, and potential loss of access to some proprietary Microsoft extensions.
## The bigger picture
What makes 2024 remarkable isn't just that these forks appeared. It's that they collectively signal a fundamental shift in how developers think about their primary tool.
For years, the editor wars felt settled. VS Code had won. It was free, fast enough, infinitely extensible, and backed by Microsoft. The idea of switching editors felt almost quaint.
But AI changed the equation. When your editor can understand your entire codebase, generate code across multiple files, and autonomously execute multi-step tasks, the editor isn't just a text editor anymore. It's becoming an AI-native development environment, and the companies building these forks are betting that the best version of that environment can't be built within VS Code's existing constraints.
By the end of 2024, VS Code had gone from being the one editor to being the *platform* that everyone forks. Microsoft itself seemed to acknowledge this shift, eventually rebranding VS Code as "the open source AI code editor" and doubling down on GitHub Copilot's integration.
The fork wars are far from over. Google launched Antigravity in late 2025, Amazon shipped Kiro in mid-2025, and Zed is betting that a completely separate, non-fork approach built in Rust will outperform them all. The landscape is moving fast.
But 2024 was the year the dam broke. The year that proved VS Code's greatest legacy might not be the editor itself, but the foundation it gave everyone else to build something new.
## References
1. [Cursor Series D announcement](https://cursor.com/blog/series-d), Cursor Blog
2. [CNBC: AI startup Cursor raises \$2.3 billion](https://www.cnbc.com/2025/11/13/cursor-ai-startup-funding-round-valuation.html)
3. [Cursor (code editor)](https://en.wikipedia.org/wiki/Cursor_(code_editor)), Wikipedia
4. [Windsurf Launch](https://windsurf.com/blog/windsurf-launch), Windsurf Blog
5. [Codeium launches Windsurf](https://news.ycombinator.com/item?id=42127877), Hacker News (November 2024)
6. [Codeium launches Windsurf, first agentic IDE](https://analyticsindiamag.com/ai-news-updates/cursor-github-copilot-rival-codeium-launches-windsurf-first-agentic-ide-for-coding/), Analytics India Magazine
7. [Void on Y Combinator](https://www.ycombinator.com/companies/void)
8. [Void Editor](https://voideditor.com/)
9. [Void IDE beta release](https://www.infoq.com/news/2025/06/void-ide-beta-release/), InfoQ
10. [ByteDance launches AI code editor](https://www.scmp.com/tech/big-tech/article/3295644/bytedance-launches-ai-code-editor-based-microsoft-software-tiktok-ban-delayed), South China Morning Post
11. [Trae telemetry and performance analysis](https://www.neowin.net/news/report-bytedances-vs-code-fork-trae-is-a-resource-hog-that-spies-on-you/), Neowin
12. [Is Forking VS Code a Good Idea?](https://eclipsesource.com/blogs/2024/12/17/is-it-a-good-idea-to-fork-vs-code/), EclipseSource
13. [What a Difference a VS Code Fork Makes](https://visualstudiomagazine.com/articles/2026/01/26/what-a-difference-a-vs-code-fork-makes-antigravity-cursor-and-windsurf-compared.aspx), Visual Studio Magazine
14. [Whose VSCode Fork is it anyway?](https://pagecarbajal.com/coding-articles/ai-ide-vscode-forks-comparison/), Page Carbajal
