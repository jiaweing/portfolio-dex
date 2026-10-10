---
title: "2025, the year of browser forks"
date: "2026-02-19"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Something shifted in 2025. For years, the browser landscape felt frozen: Chrome dominated, Firefox clung to a shrinking slice, and Safari did its own thing behind Apple's walled garden. But over the course of 2025, a wave of browser forks, indie projects, and from-scratch engines emerged that made the browser space feel alive again. If you weren't paying attention, you might have missed it. If you were, it felt like the beginning of something important.
## The state of play before the fork boom
To understand why 2025 became the year of browser forks, you need to understand how stale things had become. Three browser engines power essentially the entire web:
- **Blink** (Chromium), maintained primarily by Google, powering Chrome, Edge, Brave, Opera, Arc, Vivaldi, and dozens more
- **Gecko**, maintained by Mozilla, powering Firefox and its forks
- **WebKit**, maintained by Apple, powering Safari (and, until recently, every browser on iOS due to Apple's platform rules)
Chrome alone held roughly 65 to 70% of global browser market share heading into 2025. Firefox had dipped below 3%. The term "Chromium monoculture" had become a common refrain among web developers and privacy advocates, and for good reason: when one engine controls the web, its maker controls the standards.
## Mozilla's turbulent year
Mozilla, long seen as the scrappy defender of the open web, had a rough 2025. A string of decisions alienated the very users who had kept the faith since the Phoenix days of 2002.
Early in the year, Mozilla updated Firefox's Terms of Use in a way that appeared to grant broad rights over user data. The backlash was swift, and Mozilla rewrote the terms within days, but the damage to trust was real. Throughout the year, Mozilla leaned harder into AI features, integrated advertising technology (including acquiring an ad-tech company founded by former Meta engineers), and continued to push ancillary services that many users felt had nothing to do with building a great browser.
The frustration wasn't just philosophical. Firefox's market share continued to slide, hovering just above 2%. Many longtime users felt that Mozilla had lost sight of what made Firefox special: a lightweight, privacy-respecting, standards-compliant browser that simply got out of the way.
By late 2025, prominent voices in the tech community were publicly announcing their departure from Firefox, not because they wanted to, but because they felt Mozilla had left them no choice.
## The Firefox forks step up
Where Mozilla stumbled, the community stepped in. 2025 saw a significant rise in Firefox-based forks, each carving out a distinct identity:
- **LibreWolf** continued to build its reputation as the privacy-hardened Firefox. It strips out telemetry, disables DRM by default, and removes Mozilla's sponsored content and AI features. For users who wanted Firefox without the Mozilla baggage, LibreWolf became the go-to option.
- **Waterfox**, based on Firefox ESR, offered a more familiar experience with all of Mozilla's telemetry turned off. It attracted users who wanted stability and simplicity without the ideological battles.
- **Zen Browser** emerged as arguably the most exciting Firefox fork of the year. Built with a focus on calm, beautiful design and productivity, Zen shipped features like Workspaces, Compact Mode, Split View, and a "Glance" feature for quickly switching between frequently used tabs. It felt like what Firefox could have been if Mozilla had focused on the browsing experience rather than AI and advertising. Zen entered beta in 2025 and quickly built a passionate community.
- **Floorp** and **Mercury** also gained traction, offering their own takes on what a modern Gecko-based browser should look like.
A notable development was the release of **Surfer**, a tool by the Zen Browser team that simplifies the process of building Firefox forks. By lowering the barrier to creating Gecko-based browsers, Surfer may have quietly done more for browser diversity than any single fork.
## Chromium forks: a crowded but important field
On the Chromium side, forks were nothing new, but 2025 brought sharper differentiation. Google's controversial Manifest V3 extension API, which effectively neutered full ad-blocking capabilities in Chrome, drove users toward Chromium forks that maintained support for the more powerful Manifest V2 extensions.
- **Brave** continued to position itself as the privacy-first Chromium browser, maintaining MV2 support and building in native ad-blocking and Tor integration.
- **Vivaldi** leaned into power-user customization, offering an almost overwhelming set of configuration options that felt like a spiritual successor to classic Opera.
- **Arc** from The Browser Company made waves with its radical UI rethinking, though its long-term direction remained an open question as the company shifted focus toward new products.
In January 2025, Google acknowledged the growing ecosystem by partnering with The Linux Foundation to launch the **Supporters of Chromium-Based Browsers** initiative, aimed at sustaining open-source contributions to the Chromium project. With nearly 30 Chromium-based browsers in the wild, the initiative was both a recognition of how dependent the web had become on Chromium and an attempt to share the maintenance burden.
## Beyond forks: building from scratch
Perhaps the most ambitious development of 2025 was the growing momentum behind entirely new browser engines, projects that rejected forking altogether.
**Ladybird** emerged as the most closely watched. Originally part of the SerenityOS hobby project, Ladybird forked into its own standalone project with a clear mission: build a truly independent browser engine from scratch. No code from Blink, WebKit, or Gecko. No search deals, no crypto tokens, no user monetization. Funded entirely by donations and sponsorships, backed by a 501(c)(3) non-profit, and staffed by a small team of full-time engineers alongside a large community of volunteers.
By early 2026, Ladybird had attracted platinum sponsors including Shopify and Cloudflare, was making monthly progress on real-world site compatibility (including work on Gmail and YouTube performance), and had even begun adopting Rust as its C++ successor language. The project is targeting an alpha release for Linux and macOS in 2026.
**Servo**, originally a Mozilla research project, also saw renewed activity. While not yet a daily-driver browser, Servo's embeddable engine approach and its focus on modern rendering architecture made it a promising piece of the long-term puzzle.
These from-scratch projects matter because they represent the only path to genuine engine diversity. Every Chromium fork, no matter how privacy-focused, still relies on Google's engine. Every Firefox fork still depends on Mozilla's Gecko. Ladybird and Servo are bets on a future where the web doesn't have to be shaped by just two or three corporate engines.
## Why does any of this matter?
If you have ever written JavaScript with separate code paths to handle different browsers' quirks, you know why browser diversity matters. The early 2000s browser wars, where Microsoft used Internet Explorer's dominance to shape the web in its favor, taught us that monocultures are dangerous.
In 2025, we are in an analogous situation with Google. Chrome and Blink's dominance means Google has enormous power over web standards. Features that benefit Google's ad business get prioritized. Features that don't may languish. The web becomes what Chrome says it is.
A healthy ecosystem of forks and independent engines pushes back against this. Even if most users never switch away from Chrome, the existence of viable alternatives keeps the standards process honest and gives developers a reason to write interoperable code.
## What comes next
The fork boom of 2025 is not a silver bullet. Most of these projects face real sustainability challenges. Maintaining a browser is enormously expensive, and community goodwill doesn't pay full-time engineers. Many forks will fade. Some will merge. A few will thrive.
But the energy is real. The combination of Mozilla's missteps, Google's tightening grip on extensions, growing public awareness of browser privacy, and the emergence of genuinely new engines like Ladybird has created a moment of possibility that hasn't existed in the browser space for over a decade.
2025 was the year the browser started to fork. What happens next depends on whether enough people care to use, build, and fund the alternatives.
## References
1. [Hackaday, "So Long, Firefox, Part One" (November 2025)](https://hackaday.com/2025/11/20/so-long-firefox-part-one/) , a detailed account of one longtime user's departure from Firefox and the state of browser alternatives
2. [Alexandru Nedelcu, "Use Firefox in 2025" (March 2025)](https://alexn.org/blog/2025/03/03/use-firefox/) , a comprehensive case for Firefox as a user agent, covering technical and political dimensions
3. [Ladybird Browser official site](https://ladybird.org/) , details on the project's mission, funding model, sponsors, and development progress
4. [Zen Browser official site](https://zen-browser.app/) , overview of the Firefox-based browser's features and design philosophy
5. [Chromium Blog, "Supporters of Chromium-Based Browsers" announcement (January 2025)](https://blog.chromium.org/2025/01/announcing-supporters-of-chromium-based.html) , Google's partnership with The Linux Foundation
6. [Ladybird, "Ladybird forks from SerenityOS"](https://ladybird.org/posts/fork/) , announcement of the project becoming a standalone effort
7. [Zen Browser Surfer tool on GitHub](https://github.com/zen-browser/surfer) , the tool for simplifying Firefox fork creation
8. [OSnews, "A look at Firefox forks"](https://www.osnews.com/story/141933/a-look-at-firefox-forks/) , survey of the Firefox fork landscape
9. [Hackaday, "So Long Firefox, Hello Vivaldi" (November 2025)](https://hackaday.com/2025/11/25/so-long-firefox-part-two/) , the follow-up exploring Gecko alternatives, Servo, and Ladybird
