---
title: "Monorepos are a cult"
date: "2026-04-08"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Somewhere along the way, choosing a repository structure became a personality trait. Monorepo evangelists don't just prefer a single repository, they *believe* in it. They have conference talks, dedicated toolchains, and a near-allergic reaction to anyone who suggests that maybe, just maybe, multiple repositories might be fine.
I get the appeal. Monorepos solve real problems. But the discourse around them has drifted so far from engineering pragmatism that it's worth pulling it back to earth.
## The origin story matters more than people think
The modern monorepo movement traces back to Google. Their single repository holds over 2 billion lines of code, 86 terabytes of data, and roughly 35 million commits spanning more than two decades. Google built an entire custom toolchain around this, including Piper (their version control system) and Bazel (their build system), because off-the-shelf tools simply couldn't handle the scale.
Meta followed a similar path with Mercurial. Uber built around Buck and Bazel. Microsoft adopted a hybrid approach for projects like TypeScript and Azure.
These are companies with thousands of engineers shipping tightly coupled services across massive codebases. For them, the monorepo solved a very specific coordination problem: how do you make atomic changes across dozens of services without orchestrating a synchronized deployment across a dozen repositories?
That's a real problem. It's just not *your* problem.
## Most teams aren't Google
The typical team advocating for a monorepo has somewhere between three and twenty developers, a handful of services, and a deployment cadence measured in days, not minutes. The coordination overhead of separate repositories at this scale is minimal. You're not making atomic cross-service changes five times a day. You're probably not making them five times a month.
But the tooling ecosystem, Turborepo, Nx, Lerna, Rush, has made monorepos feel accessible. And accessible is dangerous when it comes with hidden costs that only surface later.
Here's what the getting-started guides tend to skip:
**CI complexity scales faster than you expect.** In a monorepo, a single commit can trigger builds across the entire repository. Smart build systems with path-based filtering, caching, and selective testing can mitigate this, but they add their own layer of complexity. One team at a mid-sized company documented cutting their monorepo CI time in half, and it took Docker build optimization, test duration enforcement, stale dependency cleanup, and months of systematic work. That's engineering effort spent on the build system, not the product.
**Implicit coupling creeps in quietly.** When everything lives in one repository, the boundary between "shared utility" and "tight coupling" blurs. Teams start importing across service boundaries because it's easy, not because it's right. Over time, you end up with services that can't be deployed independently, which defeats the purpose of having separate services in the first place.
**Access control gets coarser.** Repository-level permissions mean more people can see everything. If you have contractors, sensitive systems, or vendor-specific code, fine-grained isolation is harder in a monorepo. Not impossible, but harder.
**History and noise compound.** Git history becomes a firehose. Notifications from unrelated changes pile up. Small, focused changes get buried in a stream of commits from teams working on entirely different things.
## The case for boundaries
Polyrepos, repositories scoped to a single project or service, get dismissed as the "old way" in monorepo circles. But they have an underappreciated architectural benefit: they force you to think about interfaces.
When your services live in separate repositories, sharing code between them requires publishing a package with a versioned API. That friction is a feature. It means you have to define contracts, think about backwards compatibility, and design interfaces that are intentionally stable. These are the exact practices that produce maintainable systems at any scale.
Monorepos, by removing that friction, make it easy to skip this step. You can import directly from another service's internals because there's nothing stopping you. The convenience is real, but what you gain in speed you often lose in architectural clarity.
This doesn't mean polyrepos are strictly better. Managing dependency versions across repositories has its own pain. Coordinating breaking changes requires discipline. But these are solvable problems with well-understood tooling: semantic versioning, automated dependency updates, CI pipelines per repository.
## Convenience disguised as engineering
I think the real reason many teams adopt monorepos has less to do with atomic commits and more to do with convenience. It's easier to share code when everything is in one place. It's easier to manage dependencies when there's a single lockfile. It's easier to onboard new developers when there's one repository to clone.
These are legitimate benefits. But framing convenience as an engineering principle is where things go sideways. "We use a monorepo because it simplifies dependency management" is really saying "we don't want to invest in proper dependency management tooling." That's a valid trade-off to make, but it should be acknowledged as a trade-off, not dressed up as best practice.
The tooling ecosystem reinforces this. Turborepo and Nx are excellent products that solve real problems. But their marketing naturally emphasizes the benefits of monorepos while downplaying the costs. When your business model depends on monorepo adoption, you're not going to lead with "you might not need this."
## The cult test
Here's how you know a technical decision has crossed from pragmatism into identity: suggest the alternative and watch the reaction.
Try mentioning polyrepos in a team that's committed to a monorepo. The response is rarely "interesting, what trade-offs are you thinking about?" It's more often a visceral defense of the monorepo, complete with links to the Google research paper and a reminder that Meta does it too.
This is the hallmark of a cult: the inability to engage with alternatives without treating them as threats. Good engineering decisions should be defensible on their merits in the specific context where they're applied, not by appeal to authority.
## What actually matters
The right repository structure depends on factors that have nothing to do with what Google does:
- **Team size.** Small teams (under ten developers) rarely benefit from monorepo complexity. The coordination overhead they're trying to eliminate barely exists.
- **Service coupling.** If your services genuinely share a lot of code and change together frequently, a monorepo might reduce friction. If they're independently deployable with stable APIs, separate repositories reinforce that independence.
- **Deployment cadence.** High-frequency deployers who need atomic cross-service changes have a stronger case for monorepos. Teams shipping weekly can coordinate across repositories without much pain.
- **CI maturity.** Monorepos demand sophisticated build infrastructure. If you don't have the engineering bandwidth to maintain smart caching, selective builds, and path-based triggers, you'll spend more time fighting your build system than building your product.
- **Trust in your pipeline.** If you trust your CI to handle the complexity, a monorepo can work well. If your pipeline is already fragile, adding more code to it won't help.
None of these factors point to a universal answer. And that's exactly the point. The right choice is contextual, not ideological.
## The pragmatic path
If you're starting a new project, start with separate repositories. They're simpler, they enforce good boundaries, and they scale linearly. You can always consolidate later if you genuinely hit coordination problems that a monorepo would solve.
If you're already in a monorepo and it's working, great. Keep going. But be honest about why it's working. Is it because the monorepo architecture is genuinely the right fit, or is it because you've invested so much in tooling that switching would be painful regardless of whether it's the better choice?
And if someone on your team suggests trying polyrepos, don't treat it as heresy. Treat it as what it is: a different engineering trade-off worth evaluating on its merits.
The best repository structure is the one that helps your specific team ship reliable software with the least overhead. That's not a bumper sticker. It's not a conference talk. It's just good engineering.
## References
1. Rachel Potvin and Josh Levenberg, "Why Google Stores Billions of Lines of Code in a Single Repository," Communications of the ACM, 2016. [https://cacm.acm.org/research/why-google-stores-billions-of-lines-of-code-in-a-single-repository/](https://cacm.acm.org/research/why-google-stores-billions-of-lines-of-code-in-a-single-repository/)
2. "Monorepo vs. Polyrepo: How to Choose Between Them," Buildkite. [https://buildkite.com/resources/blog/monorepo-polyrepo-choosing/](https://buildkite.com/resources/blog/monorepo-polyrepo-choosing/)
3. "Benefits and challenges of monorepo development practices," CircleCI. [https://circleci.com/blog/monorepo-dev-practices/](https://circleci.com/blog/monorepo-dev-practices/)
4. "Scaling CI for monorepos: Challenges and how to overcome them," Buildkite. [https://buildkite.com/resources/blog/scaling-ci-for-monorepos-challenges-and-how-to-overcome-them/](https://buildkite.com/resources/blog/scaling-ci-for-monorepos-challenges-and-how-to-overcome-them/)
5. "The pros and cons of using monorepos," TechTarget. [https://www.techtarget.com/searchapparchitecture/tip/The-pros-and-cons-of-using-monorepos](https://www.techtarget.com/searchapparchitecture/tip/The-pros-and-cons-of-using-monorepos)
6. "EP62: Why Does Google Use Monorepo?" ByteByteGo Newsletter. [https://blog.bytebytego.com/p/ep62-why-does-google-use-monorepo](https://blog.bytebytego.com/p/ep62-why-does-google-use-monorepo)
