---
title: "Everyone’s building the same thing"
date: "2026-03-14T01:41:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

If you've been paying attention to the tech industry for more than a few years, you've probably noticed the pattern. A new category emerges, one or two products gain traction, and then suddenly everyone is building the same thing. Over and over again.
It's not that these ideas are bad. Most of them solve real problems. But the sheer volume of identical products that flood each wave is remarkable. Let's walk through the greatest hits.
## The JavaScript framework era
This is the original sin. React, Vue, Angular, Svelte, Solid, Qwik, Astro, Fresh, Marko, Lit, Alpine, HTMX, Stencil. At one point it felt like a new JavaScript framework dropped every week, each promising to fix what the last one got wrong. The running joke in the developer community was that by the time you finished learning one framework, three more had already launched.
The irony is that most web apps don't need the complexity these frameworks introduce. Routing, state management, hydration, bundling, dev tooling, build pipelines, dependency hell. For small teams or solo developers, this can be a productivity killer rather than an accelerator.
## VS Code forks
Then came the wave of AI-powered code editors, all built on the same foundation: Visual Studio Code. Cursor, Windsurf, Antigravity, and others all forked VS Code and layered AI features on top. They all promised a smarter coding experience, just with slightly different philosophies.
Cursor emphasizes speed and visual polish. Windsurf leans toward dynamic behavior with runtime assumptions. Antigravity prioritizes planning artifacts and process transparency. Different visions, same substrate. According to the 2025 Stack Overflow Developer Survey, VS Code and Visual Studio still maintained their top spots for the fourth consecutive year, while all these AI-powered forks competed for the remaining market share.
The biggest differences now lie less in raw code generation and more in autonomy, workflow design, and how much control developers retain. But from the outside, they all look suspiciously similar.
## AI browsers
The Browser Company built Arc, gained a passionate following, and then pivoted to Dia, an AI-native browser. The reasoning was clear: five years from now, the most-used AI interfaces on desktop will replace the default browsers of today. Atlassian apparently agreed, acquiring The Browser Company for \$610 million.
But Arc and Dia weren't alone. Suddenly everyone wanted to build "the browser for the AI era," each promising contextual automation, conversational interaction with web content, and intelligent assistance baked into the browsing experience. The pitch was always the same: your browser should be smarter.
## AI meeting note takers
This one might be the most crowded wave of them all. Otter, Fireflies, Granola, Jamie, Fathom, Krisp, Avoma, tl;dv, Fellow, Read AI, Bluedot, Superpowered, Tactiq, Sonnet, Sona Insight, Tablo. The list goes on. PCMag alone tested enough to fill a lengthy roundup, and Reddit threads comparing 25+ options became common.
They all do roughly the same thing: join your meeting (or listen through your microphone), transcribe the conversation, generate a summary, and extract action items. The differentiators are thin. Some use bots that join the call, some capture audio locally. Some focus on collaboration, some on privacy. But the core product is identical.
The speech recognition market reached \$8.49 billion in 2024 and is projected to grow to \$23.11 billion by 2030. That's a big pie, which explains why so many companies want a slice. But it doesn't explain why they all baked the same flavor.
## Speech to text apps
Closely related but distinct from meeting note takers, the speech-to-text app category also exploded. SuperWhisper, DictaFlow, WisperFlow, and many others all built on top of OpenAI's Whisper model to offer voice-to-text dictation. The pitch: stop typing, start talking, write 5x faster.
SuperWhisper runs locally on your Mac with offline transcription. DictaFlow offers a hybrid model with local and cloud options. They're all solving the same problem with the same underlying technology. The global speech-to-text API market was valued at \$5 billion in 2024 and is projected to reach \$21 billion by 2034. Big market, same product.
## Desktop apps (again)
Web developers rediscovered desktop apps, and the Electron versus Tauri debate became the new React versus Vue. Electron bundles Chromium and Node.js, resulting in 80 to 200MB apps. Tauri uses native webviews and Rust, shipping apps at 2 to 10MB. Every developer blog seemed to publish their own "I built the same app in Electron and Tauri, here's what happened" post.
The frustration is real. As one developer put it, Electron "normalizes waste" by making "just spin up another Chromium instance" the default answer to everything. But the wave of developers all simultaneously deciding to build desktop apps, all having the same Electron versus Tauri debate, all writing the same comparison blog posts, is itself part of the pattern.
## General agent builders
And now we arrive at the current wave. OpenClaw, the open-source AI agent that "actually does things," hit 9,000 GitHub stars in its first 24 hours and surpassed 214,000 stars by February 2026. That's faster growth than Docker, Kubernetes, or React ever saw. And predictably, everyone is now building their own version of it.
Nvidia announced NemoClaw, an open-source platform for AI agents aimed at enterprises. The concept is the same everywhere: an AI that doesn't just respond but acts. It runs commands, manages files, browses the web, handles email, connects to your messaging apps. Every new entrant promises the same three things: persistent memory, proactive notifications, and actual task execution.
## Why does this keep happening?
The pattern isn't random. It follows a predictable cycle:
1. **A new technology or capability emerges** (large language models, WebViews, speech recognition)
2. **One or two products demonstrate product-market fit** (Arc proves browsers can be reimagined, Otter proves meetings can be transcribed)
3. **The market floods with copies** because the technology is accessible and the demand is validated
4. **Most of them die or merge**, leaving two or three winners
5. **A new capability emerges**, and the cycle restarts
The underlying driver is that the hard part of building a product has shifted. The technology is increasingly commoditized. Whisper is open source. Electron and Tauri are open source. LLM APIs are available to anyone with a credit card. When the building blocks are free and the playbook is public, the barrier to entry drops to near zero.
The question isn't whether the next wave will come. It will. The question is whether you'll be the one who builds something meaningfully different within it, or just another entry in a crowded comparison blog post.
## References
1. "Trends That Defined JavaScript in 2025," The New Stack, [https://thenewstack.io/trends-that-defined-javascript-in-2025/](https://thenewstack.io/trends-that-defined-javascript-in-2025/)
2. "What a Difference a VS Code Fork Makes: Antigravity, Cursor and Windsurf Compared," Visual Studio Magazine, January 2026, [https://visualstudiomagazine.com/articles/2026/01/26/what-a-difference-a-vs-code-fork-makes-antigravity-cursor-and-windsurf-compared.aspx](https://visualstudiomagazine.com/articles/2026/01/26/what-a-difference-a-vs-code-fork-makes-antigravity-cursor-and-windsurf-compared.aspx)
3. "Technology," 2025 Stack Overflow Developer Survey, [https://survey.stackoverflow.co/2025/technology](https://survey.stackoverflow.co/2025/technology)
4. "Letter to Arc members 2025," The Browser Company, [https://browsercompany.substack.com/p/letter-to-arc-members-2025](https://browsercompany.substack.com/p/letter-to-arc-members-2025)
5. "Atlassian targets AI browser for future of work with \$610M acquisition of The Browser Company," UNLEASH, [https://www.unleash.ai/artificial-intelligence/atlassian-targets-ai-browser-for-future-of-work-with-610m-acquisition-of-the-browser-company/](https://www.unleash.ai/artificial-intelligence/atlassian-targets-ai-browser-for-future-of-work-with-610m-acquisition-of-the-browser-company/)
6. "The 9 best AI meeting assistants," Zapier, [https://zapier.com/blog/best-ai-meeting-assistant/](https://zapier.com/blog/best-ai-meeting-assistant/)
7. "Whisper Statistics," Quantumrun Foresight, [https://www.quantumrun.com/consulting/whisper-statistics/](https://www.quantumrun.com/consulting/whisper-statistics/)
8. "Speech-to-Text API Market Size, Share & Forecast 2034," Allied Market Research, [https://www.alliedmarketresearch.com/speech-to-text-api-market-A09527](https://www.alliedmarketresearch.com/speech-to-text-api-market-A09527)
9. "Best Desktop App Frameworks in 2026: Electron vs Tauri vs Neutralino," PkgPulse, March 2026, [https://www.pkgpulse.com/blog/best-desktop-app-frameworks-2026](https://www.pkgpulse.com/blog/best-desktop-app-frameworks-2026)
10. "I'm sick of every PC program turning into an Electron app," XDA Developers, [https://www.xda-developers.com/sick-every-pc-program-electron-app/](https://www.xda-developers.com/sick-every-pc-program-electron-app/)
11. "What Is OpenClaw? The Open-Source AI Agent That Actually Does Things," MindStudio, February 2026, [https://www.mindstudio.ai/blog/what-is-openclaw-ai-agent/](https://www.mindstudio.ai/blog/what-is-openclaw-ai-agent/)
12. "Nvidia Is Planning to Launch an Open-Source AI Agent Platform," WIRED, [https://www.wired.com/story/nvidia-planning-ai-agent-platform-launch-open-source/](https://www.wired.com/story/nvidia-planning-ai-agent-platform-launch-open-source/)
