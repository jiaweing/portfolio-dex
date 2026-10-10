---
title: "Your tests are lying to you"
date: "2026-04-04"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

You ship with confidence. Every test is green. Coverage sits at a comfortable 95%. CI passes without a hitch. Then, forty minutes after deploy, a customer hits a bug that none of your 2,000 tests caught.
This isn't a hypothetical. It's a pattern that plays out in teams of every size, across every stack. The problem isn't a lack of testing. It's a misplaced faith in what tests are actually telling you.
## The coverage trap
Code coverage is one of the most widely tracked metrics in software engineering, and one of the most misleading. Coverage tells you one thing: whether a line of code was *executed* during a test run. It says nothing about whether the test made a meaningful assertion, whether it checked edge cases, or whether it verified the right behavior.
You can hit 100% coverage with tests that assert nothing. You can exercise every branch of a function without ever checking that the output is correct. Coverage measures execution, not verification.
Teams optimize for coverage because it's easy to measure. Dashboards light up green. Pull request checks pass. It becomes a vanity metric, a number that makes everyone feel safe without actually making anything safer. As one analysis put it, coverage is a useful *negative* indicator, meaning low coverage reliably signals weak testing, but a high score tells you almost nothing about quality.
The real question isn't "how much code did your tests touch?" It's "if I introduced a bug right now, would your tests catch it?"
That's the premise behind mutation testing, an approach where small, deliberate faults are injected into the codebase to see if existing tests detect them. If a test suite has high coverage but low mutation scores, it means the tests are running code without actually verifying its behavior. The tests are lying.
## Unit tests mock everything interesting away
Unit tests are fast, focused, and easy to write. They're also the testing layer most likely to give you a false sense of security.
The classic unit test isolates a function by mocking its dependencies. The database call returns a canned response. The HTTP client never hits the network. The event bus is a no-op. What you're left with is a test that verifies your logic in a vacuum, stripped of the exact conditions that cause real failures.
The bugs that wake people up at 2 AM rarely live inside a single function. They live in the seams: a misconfigured database connection, a race condition between two services, a payload shape that doesn't match what the other side expects, a timeout that only triggers under load.
Unit tests can't see those seams. By design, they mock them away.
This doesn't mean unit tests are useless. They're excellent for verifying pure logic, algorithms, transformations, and calculations. But when teams treat unit tests as the *primary* safety net, they end up with a test suite that's fast and comprehensive on paper but blind to the failures that matter most.
## The vibe coding problem
The rise of AI-assisted coding has made this worse. When an AI agent generates both the implementation and the tests, you get something that looks thorough but often isn't.
A March 2026 study from METR examined AI-generated pull requests that passed the SWE-bench automated grading suite. When actual open-source maintainers reviewed the same code, roughly half of those "passing" PRs were rejected. Many rejections weren't about style or formatting. They were about fundamental functional errors, the AI had managed to pass the tests without actually fixing the underlying problem.
This gets at a deeper issue with AI-generated tests. The model that wrote the code also wrote the tests, which means the tests encode the same assumptions and blind spots as the implementation. If the code misunderstands the requirement, the test will too. Both look plausible. Both are wrong.
Research from CodeRabbit found that AI-assisted pull requests contain 1.7 times more issues than human-authored ones, and a Sonar survey found that 38% of developers say reviewing AI-generated code requires more effort than reviewing code from colleagues. The code passes CI. The coverage is high. But the quality problems only surface later, in production incidents, integration failures, and mounting technical debt.
When the person writing the test doesn't understand the code, testing becomes theater.
## What actually catches bugs
If unit tests miss the seams and coverage metrics miss the gaps, what does work?
**Integration tests on critical paths.** Not everything needs an integration test. But the paths that matter most, user sign-up, payment processing, data sync between services, should be tested with real dependencies. These tests are slower and harder to maintain, but they catch the class of bugs that unit tests structurally cannot.
**Contract tests between services.** In a microservices architecture, contract testing validates that two services agree on the shape of their communication: request formats, response structures, status codes. Tools like Pact let each service test its side of the contract independently, catching breaking API changes before they hit production. This is often more valuable than end-to-end tests that are brittle and slow.
**Error monitoring in production.** No test suite catches everything. The final layer of defense is observability: structured logging, error tracking, alerting on anomalies. The goal isn't to replace pre-deploy testing but to accept that some failures will only manifest in production and to detect them fast when they do.
**Mutation testing for test quality.** If you want to know whether your tests are actually verifying behavior, mutation testing gives you a real answer. Tools like PIT (for Java) or Stryker (for JavaScript/TypeScript) introduce small faults and report which ones your tests miss. It's more expensive to run than coverage analysis, but it measures what coverage can't: whether your tests would actually catch a bug.
## Fewer, better tests
The instinct when something breaks in production is to add more tests. But volume isn't the fix. A test suite with 5,000 shallow tests and no integration coverage is worse than one with 500 focused tests that exercise real behavior.
This is counterintuitive, especially in organizations where coverage targets are enforced. But consider what a shallow test actually costs: it takes time to write, time to maintain, time to run in CI, and it creates a false signal of confidence. Every test that doesn't protect against a real failure is noise.
The better approach is to be deliberate. Test pure logic with unit tests. Test integration points with integration tests. Use contract tests where services communicate. Monitor production for what slips through. And regularly audit your test suite, if a test hasn't caught a bug or prevented a regression in a year, question whether it's earning its place.
Delete tests that don't protect against real failures. This feels uncomfortable, but a leaner, more targeted suite is genuinely safer than a sprawling one that tests nothing meaningful.
## Green CI is a feeling, not a fact
The whole point of automated testing is to give you confidence that your code works. But confidence and correctness are different things.
Green CI tells you that the tests you wrote, with the assumptions you made, against the mocks you configured, all passed. It doesn't tell you that your system works. That gap between what your tests cover and what your system actually does is where production bugs live.
The fix isn't to stop testing. It's to stop mistaking test results for truth. Know what your tests are actually checking. Know what they're not checking. And build your safety net accordingly, not around coverage dashboards, but around the failures you can't afford.
## References
1. Kostis Kapelonis, "Getting 100% code coverage doesn't eliminate bugs," [Codepipes Blog](https://blog.codepipes.com/testing/code-coverage.html)
2. METR, "Many SWE-bench-Passing PRs Would Not Be Merged into Main," [metr.org](http://metr.org)
3. Chris Stokel-Walker, "AI-generated code passes far more automated tests than human," [LeadDev](https://leaddev.com/software-quality/ai-generated-code-passes-far-more-automated-tests-than-human)
4. Agile Pain Relief, "AI-Generated Code Quality and the Challenges we all face," [agilepainrelief.com](http://agilepainrelief.com)
5. Sonar, "How to Scale Code Quality for AI-Generated Code," [sonarsource.com](http://sonarsource.com)
6. Valentina Jemuović, "Code Coverage vs Mutation Testing," [Optivem Journal](https://journal.optivem.com/p/code-coverage-vs-mutation-testing)
7. Pactflow, "What is Contract Testing?", [pactflow.io](http://pactflow.io)
8. Codecov, "The Case Against 100% Code Coverage," [about.codecov.io](http://about.codecov.io)
