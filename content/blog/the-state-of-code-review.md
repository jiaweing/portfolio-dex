---
title: "The state of code review"
date: "2026-04-08T17:36:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

In my last post, I wrote about how AI coding tools have moved the bottleneck of software engineering from writing code to reviewing it. Pull request volume is up 98%. Review time is up 91%. Senior engineers are drowning in AI-generated diffs they did not write and do not fully trust.
The obvious next question is: can AI fix its own mess?
A wave of AI code review tools now promises to do exactly that. They will catch your bugs, enforce your standards, and clear the review backlog. Some of them are genuinely useful. Some of them are selling you a solution to a problem that only exists because of the last tool you bought. And a few are just asking Claude to read your diff and hoping for the best.
Here is where things actually stand.
## The promise and the paradox
There is something deeply ironic about the current state of AI code review. AI coding tools generate enormous volumes of code that humans struggle to review. So now we need AI review tools to check the AI-generated code. We are building AI to verify AI, and then we will presumably need AI to verify that verification.
At some point you have to ask: if the code requires this much oversight, should it have been generated in the first place?
CodeRabbit's own research found that AI-written code surfaces 1.7x more issues than human-written code. Sonar's 2025 survey reported that nine out of ten developers said AI contributed unnecessary or duplicative code to their codebase. The tools that generate the mess are now selling you the cleanup crew.
That does not mean AI code review is useless. It means you should understand what you are buying and why.
## How AI code review actually works
AI code review tools fall into a few broad categories based on how they analyze your code.
**Diff-based reviewers** look at what changed in a pull request. They analyze the lines you added or modified, compare against known patterns, and flag potential issues. GitHub Copilot Code Review, CodeRabbit, and DeepSource work this way. The advantage is speed. The limitation is that they cannot see how your changes interact with the rest of the codebase.
**Codebase-aware reviewers** index your entire repository and build a graph of how everything connects. When they review a PR, they understand the broader context, which functions call which, what modules depend on what, and how a change in one file ripples across the system. Greptile and Graphite Agent take this approach. The advantage is depth. The tradeoff is higher noise, because more context means more opinions.
**Hybrid and security-focused platforms** combine AI analysis with static analysis engines or even human reviewers. Snyk Code uses a mix of symbolic AI and machine learning focused on security vulnerabilities. DeepSource runs AI alongside its static analysis engine to reduce false positives. These tools prioritize catching things that matter in production, not style nitpicks.
**General-purpose AI models** like Claude are increasingly being used directly for code review. Anthropic now ships Claude Code with a `/security-review` command and a GitHub Actions integration that analyzes PRs automatically. Many third-party review tools, including Graphite and CodeRabbit, use Claude under the hood.
## The tools, compared
I looked at the AI code review tools that keep coming up in developer conversations: Macroscope, Greptile, CodeRabbit, DeepSource, Snyk Code, and Claude's native review capabilities. I also included Graphite Agent and Cursor's BugBot, which have gained significant traction. Here is how they compare.
<table fit-page-width="true" header-row="true" header-column="true">
<tr>
<td>**Tool**</td>
<td>**Approach**</td>
<td>**Platform Support**</td>
<td>**Bug Detection**</td>
<td>**Pricing**</td>
<td>**Best For**</td>
</tr>
<tr>
<td>**Macroscope**</td>
<td>AST-based graph + ticket context</td>
<td>GitHub, GitLab</td>
<td>48%</td>
<td>From \$30/mo (hybrid seats + activity)</td>
<td>High-signal reviews with low false positives</td>
</tr>
<tr>
<td>**CodeRabbit**</td>
<td>Diff-based + 40+ linters/SAST</td>
<td>GitHub, GitLab, Bitbucket, Azure DevOps</td>
<td>46%</td>
<td>Free (OSS), \$24-30/user/mo (Pro)</td>
<td>Multi-platform teams needing broad integration</td>
</tr>
<tr>
<td>**Greptile**</td>
<td>Full codebase indexing + code graph</td>
<td>GitHub, GitLab</td>
<td>24%</td>
<td>\$30/dev/mo</td>
<td>Deep, codebase-aware architectural analysis</td>
</tr>
<tr>
<td>**DeepSource**</td>
<td>Hybrid static analysis + AI</td>
<td>GitHub, GitLab, Bitbucket, Azure DevOps</td>
<td>N/A</td>
<td>Per-seat + pay-as-you-go AI usage</td>
<td>Mature static analysis enhanced by AI</td>
</tr>
<tr>
<td>**Snyk Code**</td>
<td>Symbolic + generative AI (security-focused)</td>
<td>GitHub, GitLab, Bitbucket, Azure DevOps</td>
<td>N/A</td>
<td>Enterprise pricing (multi-module)</td>
<td>Security-conscious and regulated industries</td>
</tr>
<tr>
<td>**Claude (Anthropic)**</td>
<td>General-purpose LLM + security review</td>
<td>GitHub (via Claude Code Action)</td>
<td>N/A</td>
<td>Claude Code subscription</td>
<td>Teams already using Claude Code</td>
</tr>
<tr>
<td>**Graphite Agent**</td>
<td>Stacked PR workflow + AI review</td>
<td>GitHub only</td>
<td>18%</td>
<td>\$40/user/mo (unlimited reviews)</td>
<td>Teams willing to adopt stacked PR workflows</td>
</tr>
<tr>
<td>**Cursor BugBot**</td>
<td>8 parallel review passes, randomized diff</td>
<td>GitHub only (requires Cursor)</td>
<td>42%</td>
<td>\$40/user/mo + Cursor sub</td>
<td>Teams already using Cursor as primary editor</td>
</tr>
</table>
### Macroscope
Macroscope uses Abstract Syntax Trees to build a graph-based representation of your codebase, which helps it find hard-to-detect bugs while avoiding false positives. It also pulls context from your issue management systems (Jira, Linear) to understand the "why" behind each change, reviewing PRs against their linked tickets.
In Macroscope's own benchmark against a curated dataset of real production bugs, it achieved a 48% bug detection rate, the highest among the tools tested. CodeRabbit came in at 46%, Cursor BugBot at 42%, Greptile at 24%, and Graphite Diamond at 18%. These numbers come with caveats: the benchmark only evaluated self-contained runtime bugs with default configurations. Teams that tune their rulesets may see different results.
Macroscope recently released v3 of their code review engine, claiming 3.5x more critical bug catches with higher precision and less noise. Pricing starts at \$30 per month with a hybrid model that accounts for both developer seats and activity volume, acknowledging that AI agents now generate a meaningful share of commits.
**Best for:** Teams that want high-signal reviews with ticket context and low false positive rates.
### CodeRabbit
CodeRabbit is the most widely installed AI code review app on GitHub and GitLab, with over 2 million repositories connected and more than 13 million PRs processed. It runs automatically on new PRs, leaving line-by-line comments with severity rankings and one-click fixes.
The big advantage is platform breadth. CodeRabbit supports GitHub, GitLab, Bitbucket, and Azure DevOps. It integrates over 40 linters and SAST scanners. It also now offers a CLI tool and IDE extensions for VS Code, Cursor, and Windsurf, making it the most comprehensive option in terms of where it can run.
The limitation is that it is primarily diff-based. It sees what changed in the PR, not how those changes interact with your broader codebase. Independent benchmarks gave it a 1/5 completeness score for catching systemic issues. It is also the most "talkative" tool in benchmarks, leaving the highest number of comments per PR, which can become noise if not tuned.
CodeRabbit is free for open source projects. The Pro plan runs \$24 to \$30 per user per month, with enterprise plans available for self-hosted deployment.
**Best for:** Multi-platform teams that need broad integration support and want reviews everywhere, in PRs, the terminal, and the IDE.
### Greptile
Greptile indexes your entire repository and builds a code graph of functions, variables, classes, files, and directories. It uses multi-hop investigation to trace dependencies, check git history, and follow leads across files. Version 3 uses the Anthropic Claude Agent SDK for autonomous investigation, showing evidence from your codebase for every flagged issue.
Greptile's founder has been upfront about the pricing philosophy: \$30 per developer per month is expensive for an AI code review bot, but the costs are high because Greptile always uses state-of-the-art models, chains them in multiple steps, and maintains a real-time index of your codebase. The argument is that \$30 per month to find minor issues is not worth it, but \$50 per month to surface critical issues even once a month is.
The tradeoff is noise. In Macroscope's benchmark, Greptile had a 24% bug detection rate on the specific test set used, lower than diff-based competitors. But Greptile's strength is finding architectural and cross-file issues that diff-based tools miss entirely. It also learns from your team's comments over time, inferring your coding standards from every engineer's PR feedback.
**Best for:** Teams that prioritize deep, codebase-aware analysis and are willing to tolerate more noise in exchange for catching architectural issues.
### DeepSource
DeepSource combines traditional static analysis with a newer AI review engine that runs alongside it on every pull request. The hybrid approach lets AI catch novel quality and security issues that static analyzers miss, while the static analysis results improve with fewer false positives thanks to AI filtering.
DeepSource supports GitHub, GitLab, Bitbucket, and Azure DevOps. It categorizes issues into Bug Risk, Anti-pattern, Security, Performance, and Style, with severity levels for each. The platform has been around longer than many AI-native competitors, which means its static analysis rules are mature and well-tested.
The AI Review feature launched in early 2026 and is enabled by default for new customers. Existing customers can opt in through their dashboard. Pricing is per-seat with a pay-as-you-go component for AI Review usage.
**Best for:** Teams that want a mature static analysis foundation enhanced by AI, rather than a purely AI-driven approach.
### Snyk Code
Snyk Code started as a security platform and has expanded into broader code quality, but security remains its core strength. It uses DeepCode AI, a hybrid of symbolic and generative AI, to enable precise code-path analysis and targeted fix generation.
The platform covers SAST, SCA, container scanning, infrastructure-as-code security, and application risk management. Its transitive reachability analysis cuts noise in dependency scanning by determining whether a vulnerable dependency is actually reachable from your code.
Snyk integrates with GitHub, GitLab, Bitbucket, and Azure DevOps. It offers a self-hosted option for teams that need to keep code on-premises.
The limitations: SAST capabilities are still maturing compared to dedicated code review vendors, there is no native pipeline or supply chain security, and pricing escalates at enterprise scale when you add multiple modules.
**Best for:** Security-conscious teams and regulated industries where vulnerability detection matters more than style feedback.
### Claude (Anthropic)
Claude is not a dedicated code review product in the traditional sense, but it has become a significant player in this space from two directions.
First, many third-party review tools use Claude as their underlying model. Graphite's Diamond and CodeRabbit both cite Claude as powering their review capabilities. When you use these tools, you are often getting Claude's analysis with a specialized wrapper.
Second, Anthropic now offers first-party code review capabilities through Claude Code. The `/security-review` terminal command scans your repository for standard vulnerability classes (SQL injection, XSS, auth flaws, insecure data handling, dependency risks) and proposes fixes with step-by-step explanations. The Claude Code GitHub Action auto-analyzes every new PR, filters likely false positives with configurable rules, and posts inline comments with remediation guidance.
Anthropic reported that using Claude Opus 4.6, their team found over 500 vulnerabilities in production open-source codebases, bugs that had gone undetected for decades despite years of expert review.
The Claude Code approach is different from dedicated tools because it is more flexible and less opinionated. You get powerful analysis without a proprietary workflow, but you also get less structure and team-level features.
**Best for:** Teams already using Claude Code in their workflow who want integrated security review, or teams that want to build custom review automation.
### Graphite Agent
Graphite Agent deserves mention because it takes a fundamentally different approach. Instead of just adding an AI reviewer to your existing workflow, it redesigns the workflow itself around stacked PRs, small, dependent pull requests that merge in sequence.
Shopify reported 33% more PRs merged per developer after adoption. Asana saw engineers save 7 hours weekly and ship 21% more code. Graphite Agent maintains an unhelpful comment rate under 3%, and when it flags an issue, developers change the code 55% of the time (compared to 49% for human reviewers).
The constraint is that it is GitHub-only and your entire team needs to adopt stacked workflows. For teams that commit to this change, median PR merge time drops from 24 hours to 90 minutes.
Pricing is \$40 per user per month with unlimited reviews.
**Best for:** Teams willing to change how they work, not just add a bot.
### Cursor BugBot
BugBot is built into Cursor, the AI-first code editor. It runs 8 parallel review passes with randomized diff order on every PR, catching bugs that single-pass reviewers miss. Discord's engineering team reported BugBot finding real bugs on human-approved PRs, and over 70% of flagged issues get resolved before merge.
The "Fix in Cursor" button jumps you from a review comment to the editor with the fix pre-loaded, creating a tight feedback loop.
The constraint is tight coupling to Cursor. You need a Cursor subscription, it only works with GitHub, and some users have reported unexpected consumption of their paid usage quota when BugBot runs on PRs.
Pricing is \$40 per user per month plus the Cursor subscription.
**Best for:** Teams already using Cursor as their primary editor.
## The benchmark problem
Every AI code review tool has benchmarks showing it catches bugs. The challenge is that these benchmarks rarely test the same things.
Macroscope's benchmark focused on self-contained runtime bugs using default configurations. It found that the top tools detected roughly 42-48% of real-world bugs. That is genuinely impressive compared to traditional linters, but it also means more than half of real bugs slip through.
What the benchmarks do not measure is often more important: architectural coherence, unnecessary complexity, code that works but should not exist, performance implications that only surface at scale. These are the things experienced human reviewers catch, and they are exactly the issues that matter most when reviewing AI-generated code.
The key takeaway from Macroscope's benchmark is that no tool is flawless. The leading tools are catching roughly half of real-world bugs in automated reviews, a significant step forward, but not a replacement for human judgment.
## What actually works
After looking at all of these tools, a few patterns emerge.
**Smaller PRs get better results from every tool.** Research shows 30-40% cycle time improvements for PRs under 500 lines, with diminishing returns above that threshold. The same AI reviewer that produces signal on a 150-line diff produces noise on a 1,000-line one. The tool did not change. The workflow gave it a solvable problem.
**Codebase context matters, but so does noise management.** Greptile's full-codebase indexing finds issues that diff-based tools miss, but it also generates more false positives. The right choice depends on whether your team has the patience to filter signal from noise, or whether you need a quieter tool that catches fewer things but wastes less of your time.
**Security-focused tools solve a different problem.** Snyk Code and Claude's security review are not trying to be your primary code reviewer. They are catching vulnerability classes that general-purpose reviewers miss. If you are in a regulated industry, these are complementary tools, not alternatives to CodeRabbit or Greptile.
**The workflow matters more than the tool.** Graphite's results did not come from better AI. They came from making PRs smaller so that any reviewer, human or AI, could do a better job. If you change nothing about how your team writes and submits code, no AI reviewer will save you.
## The uncomfortable question
The AI code review market is booming precisely because AI coding tools created a review crisis. We are spending money on AI tools to check the output of other AI tools, and the companies selling both sides of this equation are doing very well.
I do not think this is entirely cynical. AI-generated code is not going away, and humans genuinely cannot review it all manually. AI code review tools provide real value, especially for security scanning, catching common bug patterns, and enforcing consistency.
But it is worth being honest about what is happening. The ideal solution is not more tools in the pipeline. It is generating less unnecessary code in the first place, writing smaller PRs, and maintaining the human judgment to know when AI output is worth keeping and when it should be deleted.
The best code review tool is still an experienced engineer who can look at a pull request and say, "We don't need half of this." No AI can do that yet. What AI can do is handle the tedious parts, the null checks, the security scans, the style enforcement, so that human reviewers have the bandwidth to focus on what actually matters: whether the code should exist at all.
## So which one should you pick?
There is no single "best" tool, but there are clear winners depending on what you care about most.
**If you want the highest bug detection rate,** Macroscope leads the pack at 48%, with CodeRabbit close behind at 46%. Both are strong choices if catching real bugs in production code is your primary concern. Macroscope edges ahead on precision and low false positives, while CodeRabbit wins on platform breadth and ecosystem integration.
**If price is your main constraint,** CodeRabbit is hard to beat. It is free for open source, starts at \$24 per user per month for teams, and runs on every major platform. For what you get, the coverage, the linter integrations, the IDE extensions, it offers the most value per dollar.
**If you care about deep, architectural analysis,** Greptile is the only tool that truly indexes your entire codebase and traces cross-file dependencies. Its bug detection rate on isolated benchmarks is lower, but the issues it catches are the kind that diff-based tools miss entirely. At \$30 per developer per month, it is priced fairly for teams that need that depth.
**If security is non-negotiable,** Snyk Code is purpose-built for it. Enterprise pricing makes it expensive, but for regulated industries or teams handling sensitive data, the specialized vulnerability detection justifies the cost.
**If you are willing to change your workflow,** Graphite Agent delivers the best outcomes, not because of superior AI, but because stacked PRs make every reviewer more effective. The 90-minute median merge time speaks for itself.
For most teams starting out with AI code review, **CodeRabbit is the safest first choice.** It has the widest platform support, competitive bug detection, a generous free tier, and the lowest barrier to adoption. Pair it with Claude's security review for vulnerability scanning, and you cover the two biggest gaps in manual code review: volume and security.
But the real answer, as with most things in software, is that the tool matters less than the practice. Smaller PRs, clear standards, and engaged human reviewers will outperform any AI tool running on a chaotic workflow. Pick the tool that fits how your team already works, or better yet, pick the one that nudges your team toward working better.
## References
1. Macroscope, "Code Review Benchmark," 2025. [https://blog.macroscope.com/blog/code-review-benchmark](https://blog.macroscope.com/blog/code-review-benchmark)
2. CodeRabbit, "State of AI vs Human Code Generation Report," 2025. [https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)
3. Sonar, "State of Code Developer Survey," 2025. [https://www.sonarsource.com/](https://www.sonarsource.com/)
4. Aniket Bhattacharyea, "The Best AI Code Review Tools of 2026," DEV Community, February 2026. [https://dev.to/heraldofsolace/the-best-ai-code-review-tools-of-2026-2mb3](https://dev.to/heraldofsolace/the-best-ai-code-review-tools-of-2026-2mb3)
5. Ankur Tyagi, "State of AI Code Review Tools in 2025," DevTools Academy, October 2025. [https://www.devtoolsacademy.com/blog/state-of-ai-code-review-tools-2025/](https://www.devtoolsacademy.com/blog/state-of-ai-code-review-tools-2025/)
6. Anthropic, "Making frontier cybersecurity capabilities available to defenders," 2026. [https://www.anthropic.com/news/claude-code-security](https://www.anthropic.com/news/claude-code-security)
7. Anthropic, "Introducing Claude Opus 4.6," February 2026. [https://www.anthropic.com/news/claude-opus-4-6](https://www.anthropic.com/news/claude-opus-4-6)
8. Daksh Gupta (@dakshgup), Greptile pricing philosophy, X, February 2025. [https://x.com/dakshgup/status/1887397761437594028](https://x.com/dakshgup/status/1887397761437594028)
9. Faros AI, "How AI affects pull requests and code reviews," 2026. [https://www.faros.ai/blog/best-ai-coding-agents-2026](https://www.faros.ai/blog/best-ai-coding-agents-2026)
10. DeepSource, "Introducing AI Review," Changelog, February 2026. [https://deepsource.com/changelog/2026-02-23](https://deepsource.com/changelog/2026-02-23)
11. Verdent Guides, "Best AI for Code Review 2026," 2026. [https://www.verdent.ai/guides/best-ai-for-code-review-2026](https://www.verdent.ai/guides/best-ai-for-code-review-2026)
12. Macroscope, "Code Review v3," 2026. [https://macroscope.com/code-review](https://macroscope.com/code-review)
