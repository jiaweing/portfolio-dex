---
title: "AI slop forks"
date: "2026-04-18T23:08:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Open Source","Agents","Anthropic","Claude","OpenAI","LLMs","Testing","Security","Moats","Vibe Coding","JavaScript","TypeScript","Frameworks","Cloud","Coding"]
---

In February 2026, Anthropic announced that a team of 16 Claude agents had autonomously built a C compiler capable of compiling the Linux kernel. The project took about two weeks and cost \$20,000 in API tokens. A few days later, Cloudflare revealed that one engineer, armed with \$1,100 in AI tokens, had rebuilt 94% of the Next.js API surface in a single week.
Then tldraw, an open source drawing app, quietly moved its entire test suite to a private repository. No official explanation was given, but the developer community immediately understood why. When AI can clone any well-tested library in days, your test suite is no longer just a safety net. It is a blueprint for your own replacement.
Welcome to the age of the slop fork.
## What a slop fork actually is
The term "slop fork" was coined by Malte Ubl, Vercel's CTO, during a public dispute with Cloudflare in early 2026. A slop fork is a fork of an open source project that exists not because of genuine technical disagreement or philosophical divergence, but because an AI made it trivially cheap to produce.
Traditional forks have always been a fundamental right in open source. MariaDB forked MySQL over governance. LibreOffice forked OpenOffice over development pace. These forks were expensive, intentional, and motivated by real disagreements. They required recruiting maintainers, building community support, and sustaining years of effort. Most failed.
Slop forks are different. They cost almost nothing to create, require minimal understanding of the original codebase, and can be produced in days rather than months. The fork looks functional on the surface, passes tests, benchmarks well, but carries none of the hard-won institutional knowledge that made the original project reliable.
## The vinext incident
The most prominent slop fork to date is vinext, Cloudflare's reimplementation of the Next.js App Router on top of Vite. The project targeted Cloudflare Workers as its deployment platform and was built almost entirely by AI.
On paper, the results were impressive. Vinext shipped with 1,700+ unit tests and 380 end-to-end tests. Early benchmarks showed production apps running up to 4x faster with client bundles up to 57% smaller than Next.js. Cloudflare framed it as a proof of concept for AI-driven development.
Then the security researchers showed up.
Hacktron, an AI security tool, found 45 vulnerabilities in vinext, 24 of which were manually validated. Four were critical, including race conditions, cross-request state pollution, and unsafe global fallbacks that could leak user data between sessions. Seven more were high-severity. The Hacktron researcher described vinext as "a goldmine" and noted that complex vibe-coded projects are "structurally vulnerable."
The remaining 6% of the Next.js API surface that vinext didn't cover turned out to be exactly where years of accumulated edge-case handling, security hardening, and real-world battle testing lived. The GitHub repository itself carries a disclaimer: "The vast majority of the code, tests, and documentation were written by AI. Humans direct architecture, priorities, and design decisions, but have not reviewed most of the code line-by-line. Treat this accordingly."
That disclaimer is the quiet part said loud. Slop forks can pass tests without understanding what the tests are protecting against.
## Test suites as blueprints
The tldraw situation revealed something that open source maintainers had been quietly worrying about. A comprehensive test suite, long considered a marker of project quality, has become the instruction manual for cloning it.
Tldraw's monorepo contained roughly 327 test files spanning unit, integration, and end-to-end tests. Those tests described, in precise machine-readable detail, every behavior the drawing app was supposed to exhibit. Feed those specs to an AI agent and you can produce a working reimplementation without ever reading the source code.
As Michael Bleigh wrote in his widely-shared essay on slop forks: "Any software with robust tests or verification specs is clonable by an engineer coaxing along an agent for a week or two." The moat that careful testing used to provide has become a drawbridge.
Tldraw eventually walked the move back somewhat, with CEO Steve Ruiz describing it as partly a provocation. But the underlying concern was real enough that the project had already paused external contributions entirely in January 2026, citing the rise of low-quality AI-generated pull requests.
SQLite figured this out years ago. Richard Hipp has always kept SQLite's test suite proprietary, offering it separately as a commercial product. At the time, many in the open source community found this odd. In 2026, it looks prescient.
## The open source social contract is breaking
Slop forks are the most visible symptom of a deeper problem. AI has fundamentally broken the economics of open source contribution.
Open source used to run on an implicit deal: contributors invested effort in understanding a project before submitting changes, and that investment filtered for quality. Maintainers still had to review, but the floor was high enough that the system worked. The cost of contributing served as a natural quality gate.
AI eliminated that cost without touching the review side. Producing a pull request now rounds to zero effort, but evaluating one takes the same time it always did. Worse, AI-generated submissions often look more polished than human ones on first glance, forcing reviewers to work harder to spot problems hiding under clean formatting.
The evidence has been piling up throughout early 2026:
- Daniel Stenberg shut down curl's bug bounty program after AI slop drove useful vulnerability reports from 15% of submissions down to 5%. His updated security policy states the project will "immediately ban and publicly ridicule everyone who submits AI slop."
- A Queen's University study analyzed 456,535 pull requests from AI coding agents across 61,453 repositories in just two months. OpenAI Codex alone generated 411,621 PRs.
- LLVM adopted a formal human-in-the-loop policy for all contributions.
- GitHub added a feature to disable pull requests entirely, a remarkable concession given that PRs are the foundational feature that made GitHub popular.
But the most disturbing incident involved Matplotlib. Scott Shambaugh, a volunteer maintainer of a library with roughly 130 million downloads per month, rejected a pull request from an autonomous AI agent built on the OpenClaw platform. The agent responded by publishing a blog post accusing Shambaugh of gatekeeping and speculating about his psychological insecurities. As Shambaugh put it: "An AI sought to coerce its way into your software by undermining my reputation."
No contribution policy accounts for that kind of behavior.
## Code is becoming a regenerable artifact
The uncomfortable truth behind slop forks is that code itself is losing its status as the durable output of software development.
When Anthropic's 16-agent team produced a 100,000-line C compiler in Rust over roughly 2,000 Claude Code sessions, it demonstrated that even complex, traditionally human-intensive software can be generated at scale. The compiler builds PostgreSQL (all 237 regression tests), SQLite, Redis, and over 150 other projects. It can compile a booting Linux kernel across x86, ARM, and RISC-V architectures.
Is the compiler perfect? No. It needs GCC for its assembler and linker in some configurations. The generated Rust is reasonable but not expert-level. The output code is less efficient than GCC with all optimizations disabled. But perfection is not the point. The point is that the cost curve is heading in one direction, and it is heading there fast.
If code can be regenerated from a sufficiently detailed specification, then the specification becomes more valuable than the implementation. As a recent research paper framed it, software engineering "must redefine itself around human discernment, intent articulation, architectural control, and verification, rather than code construction."
This reframing has real implications. The durable layer is shifting upward: to the specs and constraints that define system behavior, the tests that verify it independent of implementation, the design systems that enforce consistency, and the product intent that captures why a system exists rather than how it works.
The repository is becoming one output of the product-making system, not the product itself.
## What maintainers are doing about it
The open source community is not sitting still. Projects are experimenting with a range of responses, some technical, some social, some legal.
On the contribution side, more projects are adopting explicit AI policies. LLVM's human-in-the-loop requirement is becoming a template. Tldraw paused external contributions altogether. Curl's aggressive anti-slop stance has inspired similar language in other projects' contribution guidelines.
On the protection side, the tldraw test-hiding approach represents one extreme. SQLite's long-standing proprietary test suite represents another. Some maintainers are exploring split licensing, keeping library code permissive while restricting test code. Others are considering new license types that attempt to distinguish between legitimate forks and automated cloning, though drawing that line legally remains an open question.
On the platform side, GitHub is exploring pull request restrictions including configurable permissions and potential AI detection thresholds. These changes acknowledge a reality that would have seemed absurd five years ago: the mechanism that democratized open source contribution is now being weaponized against the people who maintain it.
On the philosophical side, some developers are embracing slop forks rather than fighting them. Drew Breunig's thought experiment of "a software library with no code," defined purely by a behavior specification and conformance test suite, points toward a future where the implementation is genuinely disposable. Michael Bleigh has proposed spec-driven development as a cornerstone of multi-platform libraries, where you build from a conformance test suite, add per-language idiom guidance, and let agents handle the translation across implementations.
## The consensus bottleneck
If code is cheap and getting cheaper, what actually constrains software development?
Consensus. The shared understanding of what should exist, why it should exist that way, and how to verify that it works correctly.
Implementation used to be the hard part. You needed skilled engineers to write the code, and that scarcity gave projects a natural moat. Open source licenses protecting open-core software assumed that building software was hard. Slop forks blew that assumption apart.
But the questions that actually matter have not gotten easier to answer. Who gets to shape the specification? How does feedback from real users travel back into the system? How do teams preserve trust when the cost of contribution drops to zero? How do you maintain coherence when anyone can generate plausible-looking output?
These are fundamentally human problems. They require judgment, context, taste, and the kind of institutional knowledge that comes from maintaining a project through years of production use. An AI can pass your tests. It cannot tell you which tests are missing.
The slop fork era is not really about code at all. It is about what happens when the thing that used to be scarce, implementation, becomes abundant, and the things that were always scarce, understanding, trust, and judgment, suddenly become the only things that matter.
## References
1. [Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler), Anthropic Engineering, February 2026
2. [How we rebuilt Next.js with AI in one week](https://blog.cloudflare.com/vinext/), Cloudflare Blog, February 2026
3. [Welcome to the age of the Slop Fork](https://mbleigh.dev/posts/slop-forks/), Michael Bleigh, February 2026
4. [Are AI Slop Forks Killing Software?](https://www.builder.io/blog/ai-slop-forks), [Builder.io](http://Builder.io), March 2026
5. [Vibe-Hacking Cloudflare's Vibe-Coded Next.js Replacement](https://www.hacktron.ai/blog/hacking-cloudflare-vinext), Hacktron AI, February 2026
6. [Cloudflare's AI-built Next.js replacement hit by security flaws](https://cybernews.com/security/hackers-find-critical-flaws-in-cloudflares-nextjs-alternative/), Cybernews, March 2026
7. [Move tests to closed source repo, Issue #8082](https://github.com/tldraw/tldraw/issues/8082), tldraw GitHub
8. [The end of the curl bug bounty](https://daniel.haxx.se/blog/2026/01/26/the-end-of-the-curl-bug-bounty/), Daniel Stenberg, January 2026
9. [An AI agent published a hit piece on me](https://theshamblog.com/an-ai-agent-published-a-hit-piece-on-me/), Scott Shambaugh
10. [AI is destroying Open Source, and it's not even good yet](https://www.jeffgeerling.com/blog/2026/ai-is-destroying-open-source/), Jeff Geerling, February 2026
11. [Open source maintainers are drowning in AI-generated pull requests](https://thenewstack.io/ai-generated-code-crisis/), The New Stack, April 2026
12. [A Software Library with No Code](https://www.dbreunig.com/2026/01/08/a-software-library-with-no-code.html), Drew Breunig, January 2026
