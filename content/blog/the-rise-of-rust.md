---
title: "The rise of rust"
date: "2026-03-24T22:14:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Everyone seemed to discover Rust at the same time. Somewhere around mid-2025, my feed shifted. Developers weren't just talking about Rust anymore, they were *building* in it. Side projects, production services, desktop apps. The tone changed from "I should learn Rust someday" to "I just rewrote this in Rust and it uses 10MB of RAM."
It felt sudden, but the momentum had been building for years. Rust has topped Stack Overflow's "most admired language" survey every single year since the question was introduced. What changed recently is that admiration finally started converting into real adoption, and the use cases expanded well beyond systems programming.
## The numbers tell the story
Rust's commercial adoption grew by nearly 69% between 2021 and 2025. According to the 2025 State of Rust survey, 38% of Rust developers now use it at work for the majority of their coding, up from 34% the year before. Around 45% of organizations run Rust in non-trivial production systems.
But it's not just professionals driving adoption. JetBrains' ecosystem report found that 65% of respondents use Rust for side or hobby projects, while 52% are actively learning the language. That mix of professional use and grassroots enthusiasm is what makes the growth feel organic rather than hype-driven.
GitHub saw Rust-related repositories grow by 15% in 2024. Stack Overflow reported 12% professional usage, up from 9% in 2022. The trend line has been consistent and upward for years.
## Why Rust and not C
If you need low-level control and high performance, C has been the default answer for decades. So why are developers reaching for Rust instead?
The biggest reason is memory safety without a garbage collector. Rust's ownership model catches entire categories of bugs, null pointer dereferences, use-after-free errors, data races, at compile time. In C, these bugs compile just fine and show up at runtime, often in production, often catastrophically.
But it goes beyond safety. Rust's developer experience is genuinely modern in a way that C never aimed to be. Cargo, Rust's package manager and build system, handles dependency management, building, testing, and documentation in one tool. Compare that to the fragmented world of Makefiles, CMake, and manually managed header files in C. The tooling alone removes a massive source of friction.
The type system is another differentiator. Rust's enums with pattern matching, traits, and generics give you expressive abstractions without runtime cost. Error handling through `Result` and `Option` types makes failure paths explicit in a way that C's error codes and errno conventions never achieved.
There are other low-level contenders. C++ offers similar performance characteristics and has been modernizing steadily, but it carries decades of legacy complexity. Go is excellent for networked services but uses garbage collection and doesn't target the same bare-metal niche. Zig is promising but still maturing. For developers who want systems-level control with modern ergonomics, Rust currently sits in a unique sweet spot.
## The Cloudflare incident
No honest assessment of Rust can skip what happened at Cloudflare on November 18, 2025. A single `.unwrap()` call in their Rust-based FL2 proxy triggered a panic that cascaded across 330+ data centers, taking down a significant chunk of internet traffic.
The irony was hard to miss. Rust is supposed to prevent exactly these kinds of failures. And technically, it did, the `Option` type correctly signaled that a value might be absent. The problem was that the developer used `.unwrap()` to bypass that safety check, essentially telling the compiler "trust me, this can't fail." When a malformed bot management configuration file made it into production without staging validation, it failed spectacularly.
The real lesson wasn't about Rust's shortcomings. It was about how even the best type system can't save you from ignoring its warnings. The root cause was a configuration change that went straight to production without being tested in a staging environment. In C, the same bug would have been a segfault or silent corruption, likely harder to diagnose. Rust at least made the failure loud and traceable.
Then in December 2025, Cloudflare had *another* outage. This time the culprit was a nil pointer in Lua code, not Rust. The internet briefly blamed Rust again anyway, which says more about the discourse than the language.
## Desktop is where it gets interesting
I picked up Rust in October last year to build my first desktop app. At that point, the AI landscape was still mostly about coding agents and tools like Claude Code. Desktop apps felt like an afterthought.
But the trajectory was already pointing toward native experiences. OpenAI had been expanding its desktop presence, and in March 2026 they confirmed plans for a desktop "superapp" combining ChatGPT, Codex, and the Atlas browser into a single native application. The signal was clear: the future of AI interaction is moving to the desktop, not staying in browser tabs.
This is where Rust's versatility really shines. Tauri, the Rust-based framework for building desktop and mobile apps, has become a serious alternative to Electron. Where an Electron app bundles an entire Chromium instance (easily 150MB+), a Tauri app uses the operating system's native web renderer and can ship at as little as 600KB. It supports Linux, macOS, Windows, Android, and iOS from a single codebase.
The developer experience is compelling. You write your frontend in whatever JavaScript framework you prefer, your application logic in Rust, and you get cross-platform distribution without the bloat. For anyone building desktop tools, especially in the AI space where responsiveness matters, the Rust + Tauri stack is hard to beat.
## Beyond the desktop
Rust's reach extends far beyond desktop apps. It's become a go-to for:
- **Web servers and APIs**: Frameworks like Actix Web and Axum deliver throughput that rivals C++ web servers with far less unsafe code.
- **Command-line tools**: The ecosystem of Rust CLI tools has exploded. Ripgrep, fd, bat, delta, and dozens of others have replaced traditional Unix utilities with faster, more user-friendly alternatives.
- **WebAssembly**: Rust is one of the best-supported languages for compiling to Wasm, making it a natural fit for high-performance browser applications.
- **Embedded systems and IoT**: Rust's zero-cost abstractions and no-runtime requirements make it viable for resource-constrained devices.
- **TUI applications**: Libraries like Ratatui have made terminal user interfaces in Rust surprisingly pleasant to build.
This breadth is unusual for a systems language. Most developers who learn Rust find they can apply it across their entire stack, from a firmware project to a web backend to a desktop app.
## Is it overhyped?
Probably a little. The "rewrite it in Rust" meme exists for a reason, and not every project benefits from Rust's particular tradeoffs. The learning curve is real. The borrow checker will humble you. Compile times, while improving, are still a common complaint in the 2025 survey.
Rust is also rarely used in isolation. The JetBrains data shows that developers increasingly use Rust alongside Python, JavaScript, and TypeScript in multi-language environments. It's becoming a specialist tool within broader stacks rather than a replacement for everything.
But overhyped and genuinely good are not mutually exclusive. The adoption numbers are real. The performance characteristics are real. The safety guarantees, when you don't `.unwrap()` your way around them, are real. And the ecosystem is maturing rapidly, with long-awaited features like `let chains` and `async closures` landing in 2025.
For anyone thinking about picking up a new language, Rust is a strong bet. Not because it's trendy, but because it solves real problems in a way that few other languages can match. The hype will fade eventually. The language won't.
## References
1. JetBrains, "The State of Rust Ecosystem 2025," [https://blog.jetbrains.com/rust/2026/02/11/state-of-rust-2025/](https://blog.jetbrains.com/rust/2026/02/11/state-of-rust-2025/)
2. Rust Blog, "2025 State of Rust Survey Results," [https://blog.rust-lang.org/2026/03/02/2025-State-Of-Rust-Survey-results/](https://blog.rust-lang.org/2026/03/02/2025-State-Of-Rust-Survey-results/)
3. Yalantis, "Rust Programming Language Adoption and Usage Trends," [https://yalantis.com/blog/rust-market-overview/](https://yalantis.com/blog/rust-market-overview/)
4. Cloudflare Blog, "Cloudflare outage on November 18, 2025," [https://blog.cloudflare.com/18-november-2025-outage/](https://blog.cloudflare.com/18-november-2025-outage/)
5. Cloudflare Blog, "Cloudflare outage on December 5, 2025," [https://blog.cloudflare.com/5-december-2025-outage/](https://blog.cloudflare.com/5-december-2025-outage/)
6. Tauri, "What is Tauri?" [https://v2.tauri.app/start/](https://v2.tauri.app/start/)
7. Reuters, "OpenAI plans desktop 'superapp' to streamline user experience," [https://www.reuters.com/technology/openai-plans-desktop-superapp-simplify-user-experience-wsj-reports-2026-03-19/](https://www.reuters.com/technology/openai-plans-desktop-superapp-simplify-user-experience-wsj-reports-2026-03-19/)
8. Stack Overflow, "What is Rust and why is it so popular?" [https://stackoverflow.blog/2020/01/20/what-is-rust-and-why-is-it-so-popular/](https://stackoverflow.blog/2020/01/20/what-is-rust-and-why-is-it-so-popular/)
