---
title: "Vanilla macOS sucks"
date: "2026-03-25T13:40:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Every Mac ships with a full suite of built-in apps. Mail, Safari, Terminal, Calendar, Spotlight, Finder. Apple wants you to believe this is all you need. In practice, almost nobody uses them as-is. The moment you start doing real work, you start replacing things.
I'm a software developer who works across macOS and Windows. Here's the truth: vanilla macOS is not a productive operating system. The hardware is incredible, but the software that comes preinstalled is, at best, a starting point, and at worst, actively in your way.
## The replacement list
Let me walk you through what my actual daily setup looks like. Almost none of it is stock Apple.
**Raycast instead of Spotlight.** Spotlight is fine for opening apps and doing basic math. Raycast is a full-blown command center. I launch terminals, manage clipboard history, run scripts, convert data formats, and trigger custom workflows, all from one keystroke. Going back to Spotlight after using Raycast feels like switching from a search engine to a phone book.
**Outlook instead of Apple Mail.** Apple Mail has had years to get good. It hasn't. Outlook handles multiple accounts better, has a proper focused inbox, and plays nicely with the calendar integrations I rely on. It also actually works with Exchange, which matters if you deal with any enterprise environment at all.
**Warp instead of Terminal.** The default Terminal app on macOS feels like it hasn't been updated in a decade. Warp gives me inline AI assistance, command completions, and a modern editing experience. It's built in Rust and it's fast. Default Terminal is functional, but Warp makes me faster.
**VS Code instead of Xcode.** Unless I'm building a native iOS or macOS app, there is zero reason to open Xcode. VS Code is lighter, has an enormous extension ecosystem, and works across every language and framework I touch. Xcode is a 12 GB download that crashes if you look at it wrong.
**Karabiner Elements for keyboard remapping.** This one is personal. I'm primarily a Windows user, and the macOS keyboard layout makes no sense to me. Why is Command where Ctrl should be? Why is the Option key where Alt should be? Karabiner lets me remap everything so my muscle memory carries over. The fact that I need a third-party app to make a keyboard layout feel sane says something.
**Zen Browser instead of Safari.** Safari is fast and energy-efficient, I'll give it that. But extension support is limited compared to Chromium-based browsers, and cross-platform sync is nonexistent if you also use Windows. Zen gives me the privacy focus I want with the flexibility Safari refuses to offer.
**Telegram and WhatsApp instead of iMessage.** iMessage only works within the Apple ecosystem. If you message anyone on Android or Windows, you're sending SMS like it's 2008. Most of the world uses WhatsApp or Telegram, and those apps work everywhere. Apple's refusal to adopt RCS properly for years made this choice easy.
**LocalSend and Blip instead of AirDrop.** AirDrop is supposed to be one of Apple's killer features. In reality, it fails more often than it works. Devices don't discover each other. Transfers hang. And it only works between Apple devices. LocalSend is open-source, works across every platform, and just transfers the file without drama.
**Notion Calendar instead of Apple Calendar.** Apple Calendar doesn't sync well with Windows. If you work across both operating systems, that's a dealbreaker. Notion Calendar gives me a unified view across all my calendars with better scheduling tools.
## The Mac-first problem
Here's another thing that drives me crazy, but from the other side of the fence. As someone whose primary workflow is on Windows, I watch app after app launch on Mac first and treat Windows as an afterthought.
Small indie developers almost always ship Mac first. Sometimes Windows support never comes at all. Tools like Raycast are Mac-only. When OpenAI launched their desktop app, it was Mac first. It's a pattern that repeats constantly.
The reason is simple: a disproportionate number of developers use Macs. So the tools developers build are for the platform developers use. It's a self-reinforcing cycle. But if you're someone who lives in Windows and switches to Mac for certain tasks, this asymmetry is endlessly frustrating.
If more developers chose something like Rust over Swift for their projects, they could ship cross-platform from day one. Swift locks you into Apple's ecosystem. Rust, Go, or even Electron give you reach across platforms. The tradeoff is you lose some of that native macOS polish, but you gain an audience that's been ignored.
## Apple's software has been slipping
This isn't just my opinion. There's been a growing chorus of criticism about Apple's software quality over the past few years. Blog posts with titles like "Apple's Software Quality Crisis" have gone viral on Hacker News and Reddit, resonating with thousands of users who feel the same frustration.
macOS has had shipped versions with broken networking stacks, unreliable FAT32 support, and frameworks that break between updates. iOS still can't close all apps at once in the multitasking view, a feature Android has had for years. The keyboard autocorrect on iOS is notoriously bad, often changing correctly spelled words into nonsense.
The hardware is still the best in the business. Apple Silicon changed the game for performance and battery life. The build quality of MacBooks and iPhones is hard to match. But somewhere along the way, Apple decided that shipping new features every year mattered more than making the existing ones work properly.
Cross-device features like Universal Clipboard and Continuity sound amazing in keynotes. In daily use, I've used cross-device copy-paste maybe twice. AirDrop a handful of times. Continuity features once in a while. They have cool technology, but it's the kind of cool that works in a demo and fails in your living room.
## The real takeaway
Apple makes the best hardware you can buy for a portable computer. That's not changing anytime soon. But the software that runs on that hardware? It's a starting point, not a destination.
If you're a developer, a power user, or someone who works across platforms, you're going to replace almost every default app on your Mac. That's not a failure of the user. That's a failure of the software.
The irony is that macOS is at its best when you fill it with third-party apps that fix everything Apple couldn't be bothered to get right. Vanilla macOS isn't a complete experience. It's a foundation that only becomes productive once you've rebuilt half of it.
## References
1. "8 Complete Alternatives to Native macOS Apps for 2025," [Dev.to](http://Dev.to), [https://dev.to/tomastomas/8-complete-alternatives-to-native-macos-apps-for-2025-rapidly-reshape-your-mac-workflow-22kh](https://dev.to/tomastomas/8-complete-alternatives-to-native-macos-apps-for-2025-rapidly-reshape-your-mac-workflow-22kh)
2. "My Complete Productivity MacOS Stack for 2025," Mac O'Clock, [https://medium.com/macoclock/my-complete-native-macos-stack-replacement-for-2025-48c2da16e7b1](https://medium.com/macoclock/my-complete-native-macos-stack-replacement-for-2025-48c2da16e7b1)
3. "Apple's Software Quality Crisis: When Premium Hardware Meets Subpar Software," Eliseo Martelli, [https://www.eliseomartelli.it/blog/2025-03-02-apple-quality](https://www.eliseomartelli.it/blog/2025-03-02-apple-quality)
4. "The Death of macOS: Why Apple's Once-Perfect OS Is Now a Mess," Medium, [https://medium.com/software-testing-break-and-improve/the-death-of-macos-why-apples-once-perfect-os-is-now-a-mess-652e3f1bf56a](https://medium.com/software-testing-break-and-improve/the-death-of-macos-why-apples-once-perfect-os-is-now-a-mess-652e3f1bf56a)
5. "Apple's Software Quality Crisis," Hacker News discussion, [https://news.ycombinator.com/item?id=43243075](https://news.ycombinator.com/item?id=43243075)
6. "The Decline of Apple's Software Quality," The Capslock Blog, [https://capslockblog.substack.com/p/the-decline-of-apples-software-quality](https://capslockblog.substack.com/p/the-decline-of-apples-software-quality)
