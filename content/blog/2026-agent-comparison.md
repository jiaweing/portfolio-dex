---
title: "All claws compared"
date: "2026-04-01T00:05:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
pinned: true
---

The AI agent landscape exploded in early 2026. What started with a single open-source project, OpenClaw, has fragmented into dozens of specialized alternatives, each optimizing for a different constraint: size, security, cloud hosting, multi-agent orchestration, or autonomous operation.
If you're trying to figure out which agent to use, the sheer number of options is overwhelming. I've been tracking these projects since the original Moltbot days, and this post is my attempt to map the entire ecosystem as it stands in March 2026. Every agent here is compared on architecture, deployment model, key strengths, and where it falls short.
## The original: OpenClaw
OpenClaw is where it all started. Created by Peter Steinberger and originally called Clawdbot (then Moltbot), it launched on January 25, 2026 and hit 320,000+ GitHub stars in record time. It's a self-hosted personal AI agent that connects to messaging platforms like WhatsApp, Telegram, Slack, and Discord through a gateway architecture. A modular Skills system lets you extend what it can do, from browsing the web to managing your calendar.
OpenClaw's strength is breadth. It does a little bit of everything and has the largest community and skill ecosystem. But its weaknesses are structural: roughly 430,000 lines of code, a 28MB+ binary, 1.52GB memory usage, and a 5.98-second startup time. The unrestricted host access model also raises serious security concerns, which is exactly what spawned most of the alternatives below.
## The lightweight claws
These projects strip OpenClaw down to its essentials, trading features for performance, auditability, or both.
**ZeroClaw** is the performance king. Written entirely in Rust with a "zero compromise" philosophy, it compiles to a 3.4MB binary, starts in under 10 milliseconds, and idles at roughly 7.8MB of memory, making it 194 times lighter than OpenClaw. It maintains functional parity with 943 passing tests and uses a trait-based modular architecture. If you want a stable, fast agent and don't mind a smaller ecosystem, ZeroClaw is the benchmark.
**NanoClaw** takes a security-first approach. Built by qwibitai, it uses strict containerization (Docker or Apple sandbox) to ensure OS-level isolation. Instead of OpenClaw's sprawling codebase, NanoClaw keeps things minimal, which means fewer places for vulnerabilities to hide. It's completely free and ideal for security-conscious users.
**PicoClaw** from Sipeed targets embedded and resource-constrained environments. It's the smallest of the bunch, designed for developers who want an agent running on minimal hardware.
**Nanobot** is the readable agent. Built by HKUDS in roughly 4,000 lines of Python, it's designed so a single developer can understand the entire system without spending a week reading code. It runs on weak hardware and is excellent for learning how agent loops, tool calls, memory, and messaging actually fit together. The trade-off is that you'll be building your own guardrails.
**TinyClaw** and **NullClaw** round out the lightweight category. TinyClaw focuses on minimal footprint, while NullClaw occupies a similar niche with its own implementation choices. Both are part of the growing ecosystem of micro-alternatives that prioritize simplicity over feature completeness.
## The security-focused agents
**IronClaw** from NEAR AI is the most architecturally distinct security play. Your credentials live in an AES-256-GCM encrypted vault and are injected only at the network boundary, only to pre-approved endpoints. The AI never sees raw values. Every tool runs in its own WebAssembly sandbox with strict resource limits, and all outbound traffic is scanned in real time for credential leakage. Built in Rust and running inside a Trusted Execution Environment on NEAR AI Cloud, IronClaw is OpenClaw with enterprise-grade security baked into the architecture, not bolted on.
**NemoClaw** is NVIDIA's answer, announced at GTC 2026 on March 16. It's an open-source stack that layers privacy and security controls on top of OpenClaw using the NVIDIA Agent Toolkit. It installs OpenShell to enforce kernel-level isolation and declarative YAML policy-based guardrails. NemoClaw also evaluates available compute to run NVIDIA Nemotron models locally for enhanced privacy. The catch is that it's designed for dedicated NVIDIA hardware and is still in early preview.
## The cloud-hosted platforms
These remove the self-hosting burden entirely, letting you deploy an OpenClaw-based agent with a single click.
**MaxClaw** by MiniMax launched February 25, 2026 and is arguably the easiest entry point. Powered by MiniMax's M2.7 model, it deploys in under 10 seconds with zero infrastructure management. It features persistent memory spanning 200,000+ tokens, customizable agent personas, and multi-platform support across Telegram, Discord, and Slack. MiniMax also launched a SkillHub marketplace. The downside is vendor lock-in to MiniMax's ecosystem.
**KiloClaw** from Kilo (backed by GitLab co-founder Sid Sijbrandij) deploys production-ready OpenClaw agents in under 60 seconds. It supports 500+ AI models via Kilo Gateway and integrates with 50+ chat platforms. It runs on [Fly.io](http://Fly.io) multi-tenant VMs and leverages Kilo's existing infrastructure serving 1.5 million Kilo Code users. The PinchBench benchmark they published tests models on 23 real-world OpenClaw tasks.
**KimiClaw** from Moonshot AI brings OpenClaw natively to [kimi.com](http://kimi.com) with 5,000 community-contributed skills and 40GB of cloud storage. Powered by Kimi K2.5, which supports agent swarm orchestration of up to 100 specialized agents working simultaneously, it's a cloud-native powerhouse that moved the project from local setup to fully managed infrastructure.
**Moltworker** is Cloudflare's middleware solution, released January 2026. It enables running OpenClaw agents on Cloudflare's Developer Platform instead of dedicated hardware. If you're already in Cloudflare's ecosystem, this is the natural path, leveraging Workers, R2 storage, and their global edge network.
**QClaw** is Tencent's entry, putting OpenClaw inside WeChat and QQ with a one-click installer. Internal testing started March 9, 2026. Alongside QClaw for consumers, Tencent launched Lighthouse for developers and WorkBuddy for enterprises. Given WeChat's billion-plus monthly active users, this could become the largest agent deployment surface in the world.
## The China wave
China's adoption of OpenClaw has been explosive, arguably surpassing every other market in speed and scale. Beyond QClaw and KimiClaw (covered above), nearly every major Chinese tech company launched its own OpenClaw derivative or deployment platform in early 2026. Workshops teaching people how to use AI agents popped up in cities across the country, drawing hundreds of attendees. Local governments announced subsidies for entrepreneurs building products with OpenClaw. Nearly 1,000 people lined up outside Tencent's Shenzhen headquarters on a single Friday just to install it. On OpenRouter, the top three tools used by OpenClaw users in March 2026 were all from Chinese companies, with combined usage double that of the most-used Google and Anthropic models.
**DuClaw** from Baidu launched on March 11, 2026 as a zero-deployment service on Baidu AI Cloud. Users access a fully managed OpenClaw environment through a web browser with no server configuration, no API key setup, and no technical knowledge required. It ships with pre-built Baidu skills including Baidu Search, Baidu Baike, and Baidu Scholar, giving the agent access to trusted Chinese-language information sources. DuClaw supports multiple foundation models and plans to integrate with enterprise platforms like WeCom, DingTalk, and Feishu. First-time subscribers can access it for RMB 17.8 (roughly \$2.50) per month. Baidu also integrated OpenClaw directly into its main search app for 700 million users ahead of Lunar New Year, making it one of the largest agent deployment surfaces in the world.
**ArkClaw** from ByteDance's Volcano Engine launched on March 10, 2026 as a cloud-native SaaS version of OpenClaw. Marketed as "out-of-the-box," it runs entirely in the cloud and eliminates local environment configuration. ArkClaw is deeply integrated with Lark (Feishu) plugins and comes bundled with ByteDance's ModelArk Coding Plan, which provides access to ByteDance's own models. It offers 24/7 online access with a dedicated cloud virtual machine. ByteDance also rolled out **ByteClaw** separately, an open-source agent framework focused on security that runs locally and lets companies build agents with tighter controls, part of ByteDance's broader push to address the security concerns that come with always-on AI agents.
**AutoClaw** from GLM / [Z.ai](http://Z.ai) (formerly Zhipu AI) bills itself as the first "one-click install" local version of OpenClaw in China. It ships with over 50 pre-installed skills and recommends integration with GLM models, as well as DeepSeek, Moonshot AI's Kimi, and others. After launching on March 10, 2026, the company's stock surged nearly 13% in Hong Kong, reflecting investor enthusiasm for the OpenClaw ecosystem.
**MiClaw** from Xiaomi takes a fundamentally different approach by operating at the mobile operating system level. Instead of running as a standalone app or cloud service, MiClaw is embedded directly into Xiaomi's device software, turning Xiaomi phones into native AI agent platforms. This makes it the only major OpenClaw derivative designed for mobile-first, system-level integration.
**Wukong** is Alibaba's flagship enterprise agent platform, launched March 17, 2026 under the newly established Alibaba Token Hub (ATH) business group. Named after the Monkey King from Journey to the West, Wukong coordinates multiple AI agents through a single interface to handle complex enterprise tasks like document editing, approvals, meeting transcription, and research. It's available as a standalone desktop app or through DingTalk (Alibaba's collaboration platform serving 20+ million corporate users), with planned integrations for Slack, Microsoft Teams, and WeChat. Built on enterprise-grade security infrastructure, Wukong represents Alibaba's bet that the future of AI agents is enterprise multi-agent orchestration, not consumer chatbots.
**AgentArts** is Huawei's enterprise agent development platform, announced at the Huawei China Partner Conference in March 2026. Scheduled for public beta on April 30 and open-source release on May 30, it's designed to cut AI agent delivery time by over 60%. Huawei is capitalizing on the OpenClaw frenzy by pairing AgentArts with its Kunpeng and Ascend compute offerings, betting that surging demand for agentic AI will drive adoption of its own chip ecosystem as an alternative to NVIDIA.
**360 SafeClaw (360安全龙)** from Qihoo 360 is the security-focused consumer derivative. True to 360's brand as China's largest cybersecurity company, it wraps OpenClaw in additional security controls while dramatically lowering the technical barrier for everyday users. Part of 360's broader "safe lobster" product line, it targets the mass-market audience that wants OpenClaw capabilities without the security risks and configuration complexity.
**Feishu Aily** is ByteDance's enterprise play, updated in March 2026 to match OpenClaw-style capabilities but tailored for business scenarios. Users get an exclusive AI agent that understands their business context with a single click. It accumulates work memory, learns communication preferences, and can install officially certified professional skills. The permission system is strictly consistent with users, operations are traceable, and sensitive actions require manual confirmation, making it one of the more governance-aware agents in the ecosystem.
## The multi-agent orchestrators
These go beyond single-agent architectures, coordinating teams of agents to tackle complex workflows.
**DeerFlow 2.0** from ByteDance is a ground-up rewrite of the original deep research framework. It's a "SuperAgent harness" that orchestrates sub-agents, memory, and sandboxed environments. The key innovation is that agents don't just suggest commands, they execute them inside isolated Docker containers with full filesystem and bash access. Built on LangGraph and LangChain, DeerFlow uses progressive skill-loading to keep context windows manageable. It also integrates directly with Claude Code for terminal-based tasks. MIT licensed and actively developed.
**HiClaw** from Alibaba is a Collaborative Multi-Agent OS built on Matrix rooms. A Manager Agent coordinates multiple Worker Agents, and every conversation is visible in real time with human intervention capability at any point. It's designed for the "One Person One Company" use case, where a single operator manages a team of AI workers. Apache 2.0 licensed, with CoPaw Worker support added in v1.0.4 for 80% less memory.
**CoPaw**, also from Alibaba's Tongyi team, is a personal agent workstation rather than an orchestrator. It supports multi-agent collaboration where independent agents each have their own role and can communicate to tackle complex tasks. Multi-channel support spans DingTalk, Feishu, WeChat, Discord, and Telegram. Deployable locally or in the cloud, it hit 13,000+ GitHub stars since its February 2026 release.
**Paperclip** is the most ambitious of the lot. It's an open-source orchestration system for running "zero-human companies" where AI agents are organized into an actual company structure with roles, goals, and budgets. A board-level agent delegates to specialized agents (CEO, CTO, marketer), each with their own skills and spending limits. Heartbeat scheduling means agents wake on a schedule, check their work queue, and act without babysitting. It hit 30,000+ GitHub stars and uses Claude Code as its primary execution engine.
## The self-improving agents
**Hermes Agent** from Nous Research, released February 2026, tackles the biggest weakness of every other agent on this list: memory decay. Built on the Hermes-3 model family, it features a multi-level persistent memory system where conversations become fine-tuning data. The agent creates skills from experience, improves them during use, and builds a deepening model of who you are across sessions. It can run on a \$5 VPS and supports Telegram, Discord, Slack, WhatsApp, and CLI from a single gateway. The local model routing is solid, but the real differentiator is that it's the only agent that gets better the longer you use it.
**MetaClaw** is a continual meta-learning framework from academia (paper published March 2026). It works as a transparent proxy in front of any personal agent, analyzing failure trajectories to synthesize new skills with zero downtime. The SkillRL system enables online reinforcement learning without GPU clusters. It's more of a research tool than a consumer product, but the ideas are significant.
## The architectural outliers
**OpenFang** went open-source in March 2026 with 137,000 lines of Rust compiled into a single 32MB binary. It calls itself an "Agent Operating System," and the label is earned. Unlike frameworks that are essentially chatbot wrappers, OpenFang provides a full runtime with WASM dual-metered sandbox, Ed25519 manifest signing, Merkle audit trails, taint tracking, and 16 security systems total. It ships with pre-built autonomous capability packages (Clip, Lead, Collector, Predictor, Researcher, Twitter, Browser). Cold start is 180ms, warm start is 12ms, idle memory per agent is 40MB. It handles 100 concurrent agents at roughly 1.2GB total, where OpenClaw would OOM.
**DroidClaw** takes agents mobile by turning old Android phones into AI agents via ADB. Give it a goal in plain English, it reads the screen, decides what to tap and type, and repeats until the job is done. No APIs, no code. It's a niche but clever project that repurposes hardware most people have sitting in a drawer.
**Genspark Claw** is Genspark's "AI Employee" product, launched March 12, 2026 alongside Genspark AI Workspace 3.0. Unlike self-hosted alternatives, each user gets a dedicated, preconfigured cloud computer with Genspark Claw preinstalled for one-click setup and privacy-by-isolation. It connects to WhatsApp, LINE, Slack, Teams, Telegram, and Discord, and can execute multi-step work across real interfaces: research, slides, docs, calendar, code, all delivered back to you. Genspark surpassed \$200M ARR in 11 months (doubling in the last two months alone) and extended its Series B to \$385M at nearly \$1.6B valuation. The cloud computer model means your data stays on your own isolated machine, not shared infrastructure. It's the most commercially successful OpenClaw-style agent that isn't actually built on OpenClaw.
**Craft Agents** from [Craft.do](http://Craft.do) is an open-source desktop app (Apache 2.0) for working with AI agents, released in early 2026. Built on the Claude Agent SDK and Pi SDK side-by-side, it provides a document-centric, beautiful interface designed for how agents actually work, not another terminal or code editor with AI bolted on. Key features include intuitive multitasking across parallel agent sessions, no-fluff connection to any API or MCP server, session sharing, and a highly customizable UI. The team at Craft built Craft Agents using Craft Agents itself (no code editors), so any customization is just a prompt away. Sources let you connect GitHub, local filesystems, and external services via MCP. It's positioned as the open-source GUI alternative to Claude Code's terminal interface.
**Claude Code** from Anthropic is the odd one out on this list because it's not an OpenClaw derivative. It's a terminal-first coding agent that operates directly in your development environment, but as of March 2026, it has evolved far beyond a coding assistant into something closer to a full agent platform. The core product still runs in your terminal, reading codebases, executing commands, and shipping code. But the wave of features shipped in February and March 2026 changed what Claude Code actually is.
**Auto Mode** (launched March 24) delegates permission decisions to an AI classifier instead of requiring you to click "approve" on every file edit and bash command. Anthropic's internal data showed users were rubber-stamping 93% of prompts anyway, which is arguably worse than having an AI make the call. **Dispatch** lets you control Claude Cowork from your phone, assigning tasks remotely that execute on your desktop. You message Claude a task from your phone, and the agent completes it on your computer. **Channels** (research preview, v2.1.80+) are MCP servers that push external events into a running Claude Code session, starting with Telegram, Discord, and iMessage. Claude reads the event and replies back through the same channel, making it a two-way chat bridge. You can forward CI results, monitoring alerts, or chat messages so Claude can react while you're away. **Remote Control** lets you connect to a running local session from any device via a URL and QR code. Your full environment, filesystem, MCP servers, tools, and project configuration, stays local. Nothing moves to the cloud. **/loop** adds cron-style scheduled task execution for PR inspection, deployment monitoring, and recurring workflows. **Voice Mode** lets you hold spacebar and speak instead of typing, with the transcript streaming inline at your cursor position. And **Computer Use** (research preview) brings remote desktop control to Mac, letting Claude click, browse, and manipulate files visually.
Taken together, these features position Claude Code as a direct competitor to OpenClaw for always-on, remotely-controllable AI agent workflows, not just coding. One popular Substack post noted that Channels alone made "about 90% of OpenClaw setup unnecessary for 99% of people." At \$20/month for Pro (with Max plans for heavier usage), it's the most polished commercial option.
## How to choose
The right agent depends on what you're optimizing for:
- **Broadest ecosystem and community**: OpenClaw. It's the default for a reason.
- **Raw performance on minimal hardware**: ZeroClaw. Nothing else comes close on startup time and memory.
- **Security without sacrificing capability**: IronClaw for credential protection, NemoClaw for NVIDIA hardware environments.
- **Zero-setup cloud deployment**: MaxClaw for the fastest path, KiloClaw for multi-model flexibility.
- **Multi-agent workflows**: DeerFlow 2.0 for research and execution, HiClaw for human-in-the-loop coordination, Paperclip for autonomous company simulation.
- **Learning and improving over time**: Hermes Agent. The persistent memory and self-improvement loop is unique.
- **Production-grade autonomous agents**: OpenFang. The security and isolation model is the most mature.
- **Software development and beyond**: Claude Code. Purpose-built for coding, but Dispatch, Channels, and Remote Control now make it a remotely-controllable agent platform that competes directly with OpenClaw.
- **Mobile automation**: DroidClaw. The only agent that works by controlling a phone's screen.
- **Commercially-backed AI employee**: Genspark Claw. Cloud computer isolation, \$200M+ ARR, multi-platform messaging.
- **Open-source agent GUI**: Craft Agents. Document-centric desktop app, Claude Agent SDK + Pi SDK, Apache 2.0.
- **Massive user reach in China**: QClaw (WeChat/QQ), DuClaw (Baidu Search app, 700M users), KimiClaw ([kimi.com](http://kimi.com)), MaxClaw (MiniMax ecosystem), ArkClaw (ByteDance/Lark).
- **Mobile-native agent**: MiClaw. The only OS-level agent designed for smartphones.
- **Enterprise agent in China**: Feishu Aily for Lark workflows, Wukong for DingTalk/multi-agent enterprise orchestration.
- **Enterprise agent development**: AgentArts (Huawei). Cuts delivery time 60%, pairs with Kunpeng/Ascend compute.
- **Security-focused consumer agent in China**: 360 SafeClaw. Cybersecurity-first, low technical barrier.
## Summary
<table fit-page-width="true" header-row="true">
<tr>
<td>Agent</td>
<td>Built by</td>
<td>Category</td>
<td>Language</td>
<td>Key strength</td>
</tr>
<tr>
<td>OpenClaw</td>
<td>Peter Steinberger</td>
<td>General-purpose</td>
<td>TypeScript</td>
<td>Largest ecosystem, 320K+ stars</td>
</tr>
<tr>
<td>ZeroClaw</td>
<td>ZeroClaw Labs</td>
<td>Lightweight</td>
<td>Rust</td>
<td>3.4MB binary, \<10ms startup</td>
</tr>
<tr>
<td>NanoClaw</td>
<td>Qwibitai</td>
<td>Security</td>
<td>Various</td>
<td>Strict container isolation</td>
</tr>
<tr>
<td>IronClaw</td>
<td>NEAR AI</td>
<td>Security</td>
<td>Rust</td>
<td>Encrypted vault, WASM sandbox, TEE</td>
</tr>
<tr>
<td>PicoClaw</td>
<td>Sipeed</td>
<td>Lightweight</td>
<td>Various</td>
<td>Embedded/constrained environments</td>
</tr>
<tr>
<td>DeerFlow 2.0</td>
<td>ByteDance</td>
<td>Multi-agent</td>
<td>Python/TS</td>
<td>Sub-agent orchestration, sandboxed execution</td>
</tr>
<tr>
<td>HiClaw</td>
<td>Alibaba</td>
<td>Multi-agent</td>
<td>Various</td>
<td>Manager-Worker via Matrix rooms</td>
</tr>
<tr>
<td>Hermes Agent</td>
<td>Nous Research</td>
<td>Self-improving</td>
<td>Various</td>
<td>Persistent memory, conversations as training data</td>
</tr>
<tr>
<td>CoPaw</td>
<td>Alibaba (Tongyi)</td>
<td>Personal agent</td>
<td>Python</td>
<td>Multi-channel workstation, local/cloud deploy</td>
</tr>
<tr>
<td>Nanobot</td>
<td>HKUDS</td>
<td>Lightweight</td>
<td>Python</td>
<td>\~4K lines, fully auditable</td>
</tr>
<tr>
<td>DroidClaw</td>
<td>UnitedByAI</td>
<td>Mobile</td>
<td>Python</td>
<td>Turns old Android phones into agents</td>
</tr>
<tr>
<td>MetaClaw</td>
<td>AIMING Lab</td>
<td>Self-improving</td>
<td>Python</td>
<td>Continual meta-learning, SkillRL</td>
</tr>
<tr>
<td>TinyClaw</td>
<td>TinyAGI</td>
<td>Lightweight</td>
<td>Various</td>
<td>Minimal footprint</td>
</tr>
<tr>
<td>NullClaw</td>
<td>NullClaw</td>
<td>Lightweight</td>
<td>Various</td>
<td>Micro-alternative to OpenClaw</td>
</tr>
<tr>
<td>Moltworker</td>
<td>Cloudflare</td>
<td>Cloud-hosted</td>
<td>TypeScript</td>
<td>Edge deployment, no hardware needed</td>
</tr>
<tr>
<td>KiloClaw</td>
<td>Kilo</td>
<td>Cloud-hosted</td>
<td>Various</td>
<td>60-second deploy, 500+ models</td>
</tr>
<tr>
<td>MaxClaw</td>
<td>MiniMax</td>
<td>Cloud-hosted</td>
<td>Various</td>
<td>10-second deploy, M2.7 model, 200K+ token memory</td>
</tr>
<tr>
<td>KimiClaw</td>
<td>Moonshot AI</td>
<td>Cloud-hosted</td>
<td>Various</td>
<td>5,000 skills, K2.5 agent swarm</td>
</tr>
<tr>
<td>QClaw</td>
<td>Tencent</td>
<td>Cloud-hosted</td>
<td>Various</td>
<td>WeChat/QQ integration, 1B+ user reach</td>
</tr>
<tr>
<td>DuClaw</td>
<td>Baidu</td>
<td>Cloud-hosted (China)</td>
<td>Various</td>
<td>Zero-deployment, Baidu skills, 700M search app users</td>
</tr>
<tr>
<td>ArkClaw</td>
<td>ByteDance (Volcano Engine)</td>
<td>Cloud-hosted (China)</td>
<td>Various</td>
<td>Cloud-native SaaS, Lark integration, ModelArk bundled</td>
</tr>
<tr>
<td>ByteClaw</td>
<td>ByteDance</td>
<td>Security (China)</td>
<td>Various</td>
<td>Open-source, local-first, enterprise security controls</td>
</tr>
<tr>
<td>AutoClaw</td>
<td>GLM / [Z.ai](http://Z.ai)</td>
<td>Local install (China)</td>
<td>Various</td>
<td>One-click install, 50+ pre-installed skills, GLM models</td>
</tr>
<tr>
<td>MiClaw</td>
<td>Xiaomi</td>
<td>Mobile (China)</td>
<td>Various</td>
<td>OS-level mobile agent on Xiaomi devices</td>
</tr>
<tr>
<td>Wukong</td>
<td>Alibaba (ATH)</td>
<td>Enterprise (China)</td>
<td>Various</td>
<td>Multi-agent orchestration, DingTalk/Slack/Teams integration</td>
</tr>
<tr>
<td>AgentArts</td>
<td>Huawei</td>
<td>Enterprise dev (China)</td>
<td>Various</td>
<td>60% faster delivery, Kunpeng/Ascend compute pairing</td>
</tr>
<tr>
<td>360 SafeClaw</td>
<td>Qihoo 360</td>
<td>Security (China)</td>
<td>Various</td>
<td>Cybersecurity-first, mass-market consumer agent</td>
</tr>
<tr>
<td>Feishu Aily</td>
<td>ByteDance (Feishu)</td>
<td>Enterprise (China)</td>
<td>Various</td>
<td>Work memory, certified skills, governance-aware</td>
</tr>
<tr>
<td>Genspark Claw</td>
<td>Genspark</td>
<td>Cloud-hosted</td>
<td>Various</td>
<td>Dedicated cloud computer per user, \$200M+ ARR, multi-platform</td>
</tr>
<tr>
<td>Craft Agents</td>
<td>[Craft.do](http://Craft.do) (Luki Labs)</td>
<td>Agent GUI (OSS)</td>
<td>Various</td>
<td>Document-centric desktop app, Claude + Pi SDK, Apache 2.0</td>
</tr>
<tr>
<td>Claude Code</td>
<td>Anthropic</td>
<td>Agent platform</td>
<td>Various</td>
<td>Dispatch, Channels, Remote Control, Auto Mode, /loop, Voice</td>
</tr>
<tr>
<td>OpenFang</td>
<td>RightNow AI</td>
<td>Agent OS</td>
<td>Rust</td>
<td>137K lines Rust, 16 security systems, autonomous packages</td>
</tr>
<tr>
<td>Paperclip</td>
<td>Dotta (pseudonymous)</td>
<td>Multi-agent</td>
<td>Various</td>
<td>Zero-human company orchestration</td>
</tr>
<tr>
<td>NemoClaw</td>
<td>NVIDIA</td>
<td>Security</td>
<td>Various</td>
<td>OpenShell runtime, Nemotron models, GTC 2026 launch</td>
</tr>
</table>
## References
1. OpenClaw GitHub repository, [https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
2. ZeroClaw GitHub repository, [https://github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
3. EvoAI Labs, "OpenClaw, NanoBot, PicoClaw, IronClaw, ZeroClaw, NullClaw: This Claw Craziness Is Continuing," Medium, February 2026, [https://evoailabs.medium.com/openclaw-nanobot-picoclaw-ironclaw-and-zeroclaw-this-claw-craziness-is-continuing-87c72456e6dc](https://evoailabs.medium.com/openclaw-nanobot-picoclaw-ironclaw-and-zeroclaw-this-claw-craziness-is-continuing-87c72456e6dc)
4. NEAR AI, "IronClaw: Take OpenClaw Security to the Next Level," [https://near.ai/openclaw](https://near.ai/openclaw)
5. Forbes, "There's A New Claw In Town: IronClaw And AI Agent Security," March 2026, [https://www.forbes.com/sites/digital-assets/2026/03/04/theres-a-new-claw-in-town-ironclaw-and-ai-agent-security/](https://www.forbes.com/sites/digital-assets/2026/03/04/theres-a-new-claw-in-town-ironclaw-and-ai-agent-security/)
6. NVIDIA, "NVIDIA Announces NemoClaw for the OpenClaw Community," March 2026, [https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw](https://nvidianews.nvidia.com/news/nvidia-announces-nemoclaw)
7. ByteDance, DeerFlow 2.0 GitHub repository, [https://github.com/bytedance/deer-flow](https://github.com/bytedance/deer-flow)
8. VentureBeat, "What is DeerFlow 2.0 and what should enterprises know about this new, powerful local AI agent orchestrator?," March 2026, [https://venturebeat.com/orchestration/what-is-deerflow-and-what-should-enterprises-know-about-this-new-local-ai](https://venturebeat.com/orchestration/what-is-deerflow-and-what-should-enterprises-know-about-this-new-local-ai)
9. Alibaba, HiClaw GitHub repository, [https://github.com/alibaba/hiclaw](https://github.com/alibaba/hiclaw)
10. Nous Research, Hermes Agent GitHub repository, [https://github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
11. MarkTechPost, "Nous Research Releases 'Hermes Agent' to Fix AI Forgetfulness," February 2026, [https://www.marktechpost.com/2026/02/26/nous-research-releases-hermes-agent-to-fix-ai-forgetfulness-with-multi-level-memory-and-dedicated-remote-terminal-access-support/](https://www.marktechpost.com/2026/02/26/nous-research-releases-hermes-agent-to-fix-ai-forgetfulness-with-multi-level-memory-and-dedicated-remote-terminal-access-support/)
12. Alibaba, CoPaw GitHub repository, [https://github.com/agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)
13. DroidClaw GitHub repository, [https://github.com/unitedbyai/droidclaw](https://github.com/unitedbyai/droidclaw)
14. MetaClaw, "Just Talk, An Agent That Meta-Learns and Evolves in the Wild," arXiv, March 2026, [https://arxiv.org/abs/2603.17187](https://arxiv.org/abs/2603.17187)
15. MiniMax, MaxClaw product page, [https://maxclaw.ai/](https://maxclaw.ai/)
16. Analytics Vidhya, "A Beginner's Guide to Building Autonomous AI Agents with MaxClaw," March 2026, [https://www.analyticsvidhya.com/blog/2026/03/maxclaw-cloud-ai-agent-for-autonomous-workflows/](https://www.analyticsvidhya.com/blog/2026/03/maxclaw-cloud-ai-agent-for-autonomous-workflows/)
17. VentureBeat, "Kilo launches KiloClaw, allowing anyone to deploy hosted OpenClaw agents into production in 60 seconds," February 2026, [https://venturebeat.com/orchestration/kilo-launches-kiloclaw-allowing-anyone-to-deploy-hosted-openclaw-agents-into](https://venturebeat.com/orchestration/kilo-launches-kiloclaw-allowing-anyone-to-deploy-hosted-openclaw-agents-into)
18. MarkTechPost, "Moonshot AI Launches Kimi Claw: Native OpenClaw on [Kimi.com](http://Kimi.com)," February 2026, [https://www.marktechpost.com/2026/02/15/moonshot-ai-launches-kimi-claw-native-openclaw-on-kimi-com-with-5000-community-skills-and-40gb-cloud-storage-now/](https://www.marktechpost.com/2026/02/15/moonshot-ai-launches-kimi-claw-native-openclaw-on-kimi-com-with-5000-community-skills-and-40gb-cloud-storage-now/)
19. Cloudflare, "Introducing Moltworker: a self-hosted personal AI agent, minus the minis," January 2026, [https://blog.cloudflare.com/moltworker-self-hosted-ai-agent/](https://blog.cloudflare.com/moltworker-self-hosted-ai-agent/)
20. Beam AI, "Tencent Launches QClaw: What It Means for Enterprise," March 2026, [https://beam.ai/agentic-insights/tencent-launches-qclaw-what-the-ai-agent-mainstream-moment-means-for-enterprise](https://beam.ai/agentic-insights/tencent-launches-qclaw-what-the-ai-agent-mainstream-moment-means-for-enterprise)
21. Reuters, "Tencent integrates WeChat with OpenClaw AI agent amid China tech battle," March 2026, [https://www.reuters.com/technology/tencent-integrates-wechat-with-openclaw-ai-agent-amid-china-tech-battle-2026-03-22/](https://www.reuters.com/technology/tencent-integrates-wechat-with-openclaw-ai-agent-amid-china-tech-battle-2026-03-22/)
22. RightNow AI, OpenFang GitHub repository, [https://github.com/RightNow-AI/openfang](https://github.com/RightNow-AI/openfang)
23. HackerNoon, "OpenFang, The Game-Changing Open Source Agent Operating System," March 2026, [https://hackernoon.com/openfangthe-game-changing-open-source-agent-operating-system-that-replaces-openclaw](https://hackernoon.com/openfangthe-game-changing-open-source-agent-operating-system-that-replaces-openclaw)
24. Paperclip, "The Open-Source Platform Turning AI Agents into an Actual Company," Medium, March 2026, [https://medium.com/@creativeaininja/paperclip-the-open-source-platform-turning-ai-agents-into-an-actual-company-7348015c5bf7](https://medium.com/@creativeaininja/paperclip-the-open-source-platform-turning-ai-agents-into-an-actual-company-7348015c5bf7)
25. Anthropic, Claude Code overview, [https://code.claude.com/docs/en/overview](https://code.claude.com/docs/en/overview)
26. Kevin Simback, "The Claw Ecosystem Breakdown," X, February 2026, [https://x.com/KSimback/status/2027812237390512631](https://x.com/KSimback/status/2027812237390512631)
27. Reddit r/SelfHosting, "OpenClaw and Friends: Claw, Nano, Zero, Pico, So Many Overlapping Projects," [https://www.reddit.com/r/SelfHosting/comments/1r7z4wf/openclaw_and_friends_claw_nano_zero_pico_so_many/](https://www.reddit.com/r/SelfHosting/comments/1r7z4wf/openclaw_and_friends_claw_nano_zero_pico_so_many/)
28. PR Newswire, "Baidu Launches DuClaw, Enables Zero-Deployment Access to OpenClaw," March 2026, [https://www.prnewswire.com/news-releases/baidu-launches-duclaw-enables-zero-deployment-access-to-openclaw-302710924.html](https://www.prnewswire.com/news-releases/baidu-launches-duclaw-enables-zero-deployment-access-to-openclaw-302710924.html)
29. CNBC, "China's Baidu adds OpenClaw AI into search app for 700 million users," February 2026, [https://www.cnbc.com/2026/02/13/baidu-openclaw-ai-search-app-integration-china-lunar-new-year.html](https://www.cnbc.com/2026/02/13/baidu-openclaw-ai-search-app-integration-china-lunar-new-year.html)
30. BytePlus, "Meet ArkClaw, your first cloud-native AI agent," March 2026, [https://www.byteplus.com/en/blog/arkclaw](https://www.byteplus.com/en/blog/arkclaw)
31. Tech in Asia, "ByteDance rolls out ByteClaw to curb OpenClaw AI security risks," March 2026, [https://www.techinasia.com/news/bytedance-rolls-byteclaw-curb-openclaw-ai-security-risks](https://www.techinasia.com/news/bytedance-rolls-byteclaw-curb-openclaw-ai-security-risks)
32. Yicai Global, "Zhipu, ByteDance, Other Chinese Internet Giants Launch OpenClaw Versions," March 2026, [https://www.yicaiglobal.com/news/zhipu-ai-bytedance-tencent-10-other-chinese-internet-giants-launch-openclaw-versions](https://www.yicaiglobal.com/news/zhipu-ai-bytedance-tencent-10-other-chinese-internet-giants-launch-openclaw-versions)
33. Yicai Global, "ByteDance's Feishu Updates OpenClaw-Style AI Agent," March 2026, [https://www.yicaiglobal.com/news/bytedances-feishu-updates-openclaw-style-ai-agent](https://www.yicaiglobal.com/news/bytedances-feishu-updates-openclaw-style-ai-agent)
34. South China Morning Post, "Chinese tech giants offer cheap, easy access to OpenClaw amid 'lobster fever'," March 2026, [https://www.scmp.com/tech/article/3346090/chinese-tech-giants-offer-cheap-easy-access-openclaw-amid-lobster-fever](https://www.scmp.com/tech/article/3346090/chinese-tech-giants-offer-cheap-easy-access-openclaw-amid-lobster-fever)
35. CNBC, "China's tech firms feast on OpenClaw as companies race to deploy AI agents," March 2026, [https://www.cnbc.com/2026/03/12/china-openclaw-ai-agent-adoption-tech-companies-government-support-lobster-shrimp.html](https://www.cnbc.com/2026/03/12/china-openclaw-ai-agent-adoption-tech-companies-government-support-lobster-shrimp.html)
36. WIRED, "China's OpenClaw Boom Is a Gold Rush for AI Companies," March 2026, [https://www.wired.com/story/china-is-going-all-in-on-openclaw/](https://www.wired.com/story/china-is-going-all-in-on-openclaw/)
37. Anthropic, "Auto Mode," Claude Code Blog, March 2026, [https://claude.com/blog/auto-mode](https://claude.com/blog/auto-mode)
38. Anthropic, "Push events into a running session with channels," Claude Code Docs, [https://code.claude.com/docs/en/channels](https://code.claude.com/docs/en/channels)
39. MindStudio, "Claude Code Channels vs Dispatch vs Remote Control: What's the Difference?," March 2026, [https://www.mindstudio.ai/blog/claude-code-channels-vs-dispatch-vs-remote-control/](https://www.mindstudio.ai/blog/claude-code-channels-vs-dispatch-vs-remote-control/)
40. Forbes, "Claude Dispatch Lets You Control Claude Cowork With Your Phone," March 2026, [https://www.forbes.com/sites/ronschmelzer/2026/03/20/claude-dispatch-lets-you-control-claude-cowork-with-your-phone/](https://www.forbes.com/sites/ronschmelzer/2026/03/20/claude-dispatch-lets-you-control-claude-cowork-with-your-phone/)
41. Reuters, "Alibaba launches AI platform for enterprises as agent craze sweeps China," March 2026, [https://www.reuters.com/world/asia-pacific/alibaba-launches-new-ai-agent-platform-enterprises-2026-03-17/](https://www.reuters.com/world/asia-pacific/alibaba-launches-new-ai-agent-platform-enterprises-2026-03-17/)
42. Alibaba Group, "Alibaba Launches Wukong: An AI-Native Agentic Platform for Enterprises," March 2026, [https://www.alibabagroup.com/document-1971078136456019968](https://www.alibabagroup.com/document-1971078136456019968)
43. South China Morning Post, "Huawei capitalises on OpenClaw frenzy to boost computing demand for its chips," March 2026, [https://www.scmp.com/tech/tech-trends/article/3347160/huawei-capitalises-openclaw-frenzy-boost-computing-demand-its-chips](https://www.scmp.com/tech/tech-trends/article/3347160/huawei-capitalises-openclaw-frenzy-boost-computing-demand-its-chips)
44. 21世纪经济报道, "13家互联网大厂跟进OpenClaw," March 2026, [https://finance.sina.com.cn/stock/marketresearch/2026-03-09/doc-inhqmcpn0565386.shtml](https://finance.sina.com.cn/stock/marketresearch/2026-03-09/doc-inhqmcpn0565386.shtml)
45. Business Wire, "Genspark Claw Launches as Genspark's First 'AI Employee'," March 2026, [https://www.businesswire.com/news/home/20260312641003/en/](https://www.businesswire.com/news/home/20260312641003/en/)
46. [Craft.do](http://Craft.do), "Introducing Craft Agents, The Open Source Agent Interface," [https://www.craft.do/blog/introducing-craft-agents](https://www.craft.do/blog/introducing-craft-agents)
47. GitHub, Craft Agents OSS repository, [https://github.com/lukilabs/craft-agents-oss](https://github.com/lukilabs/craft-agents-oss)
