---
title: "Nobody reads your README"
date: "2026-05-03"
lastEdited: "2026-05-02T05:52:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: ["Documentation","Marketing","Open Source","CLI","LLMs","OpenAI"]
---

You shipped a CLI tool last weekend. It's fast, it solves a real problem, and the code is clean. You push it to GitHub, tweet about it, and wait.
Nothing happens.
Someone lands on your repo, scrolls for three seconds, and bounces. They didn't read your README. They didn't install your tool. They didn't even understand what it does. And it's not because your tool is bad. It's because your README is.
## The README is the landing page
For most open source projects, the README is the entire funnel. It's the homepage, the pitch deck, and the onboarding flow rolled into one Markdown file. GitHub renders it front and center when anyone visits your repo. There's no second page. No "learn more" button. No sales call.
If a developer can't figure out what your project does, how to install it, and how to get a basic result within about 30 seconds, they're gone. The back button is always one click away, and there are always alternatives.
This isn't a documentation problem. It's a distribution problem.
## Most READMEs are written for the wrong audience
Here's the uncomfortable truth: most open source READMEs are written by the author, for the author. The person who built the tool knows exactly what it does, why it exists, and how all the pieces fit together. So the README reflects that internal mental model, not the confused newcomer's perspective.
You see this pattern everywhere. The README opens with an architecture diagram. Or it dives straight into configuration flags. Or it lists every feature in alphabetical order without ever explaining the core use case. The author assumes context that the reader simply doesn't have.
This is the curse of knowledge at work. Once you understand something deeply, it becomes nearly impossible to remember what it felt like not to understand it. The person who built the tool is, paradoxically, the worst person to explain it to a stranger.
## The 30-second test
A good README passes what you might call the 30-second test. A developer who has never heard of your project should be able to land on the page and, within half a minute, answer three questions:
1. What does this do?
2. How do I install it?
3. How do I get my first result?
Everything else, the advanced configuration, the plugin system, the architectural philosophy, is secondary. It can live in a docs site, a wiki, or further down the page. But those first three answers need to be immediate and obvious.
The practical structure looks like this:
- **One-liner**: a single sentence that explains what the project does and why someone would care
- **Install**: copy-pasteable command to get it running
- **Hello world**: the simplest possible example that produces a visible result
- **Why this exists**: a short paragraph on the motivation, if it's not obvious from the one-liner
Everything after that is optional. Not unimportant, but optional for the first encounter.
## Good versus bad: a real comparison
Compare the README of a project like Hono, the JavaScript web framework, with the average npm package.
Hono's README opens with a clear tagline: a small, simple, ultrafast web framework built on Web Standards. Within seconds you know what it is, what makes it different, and who it's for. A quick-start code example follows immediately. You can copy it, run it, and see a result.
Now think about the typical npm package with three lines of text, a broken CI badge, and an install command that leads to a blank terminal. There's no explanation of what the package does, no example, and no reason to trust it. The code might be perfectly fine, but you'll never find out because the README gave you nothing to work with.
The difference isn't effort. Hono's README isn't long. It's that every line is written for the person arriving, not the person who already knows.
## AI made this urgent
This used to be a "nice to have" problem. Write a decent README when you get around to it. Maybe add some badges. Ship the real work first.
That calculus has changed. AI coding assistants like GitHub Copilot, Cursor, and ChatGPT now read READMEs and documentation to decide which libraries to recommend. When a developer asks an AI to suggest a framework for building a REST API, the AI's answer is shaped by what it can find and parse about each candidate. Your README is, quite literally, your SEO for the age of AI-generated code.
If your README is sparse, confusing, or poorly structured, AI tools will either skip your project or hallucinate incorrect usage patterns. Neither outcome is good. On the other hand, a clear, well-structured README with working examples gives AI models exactly what they need to recommend your tool accurately.
This isn't speculation. Developers are already building tools that index README files to provide context to large language models. Projects like Context7 exist specifically to feed library documentation into AI coding assistants. The README has become the machine-readable interface for your project, not just the human-readable one.
## Documentation is marketing
Developer tools have a unique distribution challenge. You can't really advertise a CLI tool the way you'd advertise a SaaS product. There's no Google Ad that convinces a programmer to use your parsing library. The funnel for developer tools almost always starts with someone landing on your repo, either through a search, a recommendation, or an AI suggestion.
That makes the README your primary marketing asset. Not a blog post. Not a landing page. The README.
This is counterintuitive for most developers because documentation feels like the opposite of marketing. Documentation is dry, technical, and tedious. Marketing is flashy, persuasive, and creative. But for developer tools, the two are the same thing. A README that clearly communicates value, reduces friction to first use, and builds confidence through working examples is doing everything a good landing page does.
The projects that understand this tend to win. They might not have the best implementation, but they have the clearest communication. And in an ecosystem where hundreds of packages solve similar problems, clarity is the differentiator.
## When anyone can build, communication wins
We're living in an era where the cost of building software is dropping fast. AI tools can scaffold a project in minutes. The barrier to creating a new library or CLI tool is lower than it has ever been. That means the supply of tools is exploding.
When supply goes up, the bottleneck shifts. It's no longer about whether you can build the thing. It's about whether anyone can understand it, trust it, and adopt it. The README is where that happens.
Writing code has become the easy part. Communicating what your code does, why it matters, and how to use it, that's the hard part now. And it's the part most developers still skip.
## How to actually fix your README
If your project's README currently fails the 30-second test, here's a straightforward process to fix it:
1. **Ask someone unfamiliar with your project to read the README** and tell you what they think the tool does. If they get it wrong or can't answer, that's your signal.
2. **Write the one-liner first.** Force yourself into a single sentence. If you can't explain your project in one sentence, you don't understand your own positioning.
3. **Add a working example that fits on one screen.** No setup, no prerequisites beyond the install command. Just input and output.
4. **Remove everything that isn't essential for a first-time visitor.** Move advanced docs elsewhere. The README is not the manual. It's the front door.
5. **Test your examples regularly.** A broken code sample in a README is worse than no code sample at all. It actively damages trust.
This isn't glamorous work. It won't feel as productive as shipping a new feature. But for an open source project, a README rewrite can do more for adoption than any amount of code optimization.
## The README is the product
The instinct for most developers is to treat the README as an afterthought, something you write after the "real" work is done. But the README is the real work, or at least an essential part of it. A tool that nobody can understand is a tool that nobody uses. And a tool that nobody uses might as well not exist.
Your README isn't documentation. It's the product's first impression. Treat it that way.
## References
1. [About READMEs, GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
2. [Hono, web framework built on Web Standards](https://hono.dev/)
3. [Curse of knowledge, Wikipedia](https://en.wikipedia.org/wiki/Curse_of_knowledge)
4. [Make a README](https://www.makeareadme.com/)
5. [The Impact of Not Including a README File, Andy Crouch](https://amcrouch.medium.com/the-impact-of-not-including-a-readme-file-b5bfcb84c81e)
6. [Providing library documentation to AI coding assistants, VirtusLab](https://virtuslab.com/blog/ai/providing-library-documentation/)
7. [The Curse of Knowledge in Technical Documentation, Elbo.DevOps](https://www.elbodevops.net/posts/curse-of-knowledge-technical-documentation/)
8. [What Every Good README Should Contain, Tyler Hawkins](https://levelup.gitconnected.com/what-every-good-readme-should-contain-d6a07d1b39f)
