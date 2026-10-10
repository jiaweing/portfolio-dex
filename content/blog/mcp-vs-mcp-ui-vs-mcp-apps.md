---
title: "MCP vs MCP-UI vs MCP Apps"
date: "2026-04-23"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["MCP","Agents","OpenAI","Anthropic","Claude","ChatGPT","Security","IDE","JavaScript","Web"]
---

If you have been anywhere near the agent ecosystem in the last six months, you have heard all three names thrown around as if they were the same thing. They are not. MCP is a protocol. MCP-UI was a community experiment. MCP Apps is the official extension that absorbed that experiment into the spec. Each sits at a different layer, and mixing them up makes it hard to reason about what you are actually building on.
## MCP, the base protocol
The Model Context Protocol is the foundation. It is a JSON-RPC standard, shipped by Anthropic in late 2024, that defines how an AI host (Claude, ChatGPT, VS Code, Goose, Cursor, your own runtime) talks to external servers that expose tools, resources, and prompts. Think of it as the USB-C port for agents. Before MCP, every client had to build its own plugin system and every integration had to be rewritten for each host. After MCP, you write one server and it works everywhere the protocol is supported.
MCP does one thing very well: it moves structured text between the model and the outside world. A tool call goes out, a tool result comes back, the model reasons about it, the loop continues. That is the whole surface. It is deliberately minimal, and that minimalism is what let it spread so fast across the industry. Zapier, Composio, Nango, Linear, GitHub, Stripe, Amplitude, and dozens of others now ship MCP servers. The protocol is boring in the best way.
But boring has a cost. MCP servers can return rich structured data, and the host will flatten it into text for the model to read. If your tool returns a chart, a shopping cart, a calendar picker, or a form, the user sees a wall of JSON or a markdown table. That is fine for a developer poking at an API. It is terrible for an end user who just wants to click a button.
## MCP-UI, the community extension
MCP-UI was the first serious attempt to fix that. It started as an experimental, community-driven project led by Ido Salomon and Liad Yosef. The idea was simple: let MCP servers return UI resources alongside their text output, and let the host render those resources inside the conversation as sandboxed iframes. Instead of the model describing a flight booking in paragraphs, the server ships a tiny HTML widget that the user interacts with directly.
The pitch landed because it matched how humans actually work. Users do not always want to chat. Sometimes they want to drag a slider, pick a date, or tap a button. MCP-UI gave servers a way to say "here is some text for the model, and here is an interactive surface for the human," in the same response.
It was never official. It was a github repo, a community working group, and a handful of early adopters at places like WorkOS and Fractal who wanted to ship interactive agents before the spec caught up. And it worked well enough to prove the pattern. Every demo felt obvious in hindsight: a map tool that returned a map, a chart tool that returned a chart, a commerce tool that returned a checkout flow. Text-only suddenly looked limiting.
The downside of being a community experiment is that every host had to decide whether to support it, and there was no guarantee two clients would render the same widget the same way. It was clearly the right direction, but it needed to become part of the protocol to matter long term.
## MCP Apps, the official answer
That is what happened in November 2025. The MCP core maintainers at Anthropic and OpenAI, together with the MCP-UI creators, submitted SEP-1865: the MCP Apps Extension. It shipped officially in January 2026. The SEP was co-authored by Anton Pidkuiko, Olivier Chafik, Ido Salomon, Liad Yosef, Nick Cooper, Sean Strong, Jerome Swannack, Alexi Christakis, and Bryan Ashley, which is as close to a unified front as this industry gets.
MCP Apps is not a replacement for MCP-UI. It is the standardized version of it, built on the same ideas, with the MCP-UI team in the room. The spec also draws from the OpenAI Apps SDK, which had separately enabled rich UI in ChatGPT. With both lineages feeding in, MCP Apps defines how servers declare UI resources using a `ui://` URI scheme, how those resources link to tools via metadata, and how embedded UI talks back to the host. The clever part is the transport: instead of inventing a new messaging format, UI components communicate with the host using the existing MCP JSON-RPC protocol, tunneled over postMessage. The same @modelcontextprotocol/sdk that servers already use works inside the iframe. Every future MCP feature automatically works with MCP Apps.
The security model is straightforward. UI runs inside a sandboxed iframe with restricted permissions. Hosts can review HTML templates before rendering. All UI-to-host communication goes through auditable JSON-RPC messages. Hosts can require explicit user consent before the UI triggers a tool call. Developers building apps do not have to worry about escaping the sandbox or accessing the parent page, because the iframe boundary is enforced by the browser.
At launch, MCP Apps was supported in Claude (web and desktop), ChatGPT, Visual Studio Code Insiders, and Goose. That is a meaningful client coverage for a one-month-old extension. The tooling is already on npm under @modelcontextprotocol/ext-apps, and the examples repo ships a dozen working apps you can fork.
## How the three layers fit together
The cleanest way to think about it: MCP is the transport, MCP-UI was the prototype for the UI layer, and MCP Apps is the UI layer shipped as an official extension.
<table fit-page-width="true" header-row="true">
<tr>
<td>**Layer**</td>
<td>**MCP**</td>
<td>**MCP-UI**</td>
<td>**MCP Apps**</td>
</tr>
<tr>
<td>Shipped</td>
<td>November 2024</td>
<td>2025</td>
<td>January 2026</td>
</tr>
<tr>
<td>Format</td>
<td>JSON-RPC over stdio or HTTP</td>
<td>HTML in iframe, non-standard</td>
<td>HTML in sandboxed iframe, standard</td>
</tr>
<tr>
<td>Client support</td>
<td>Broad (Claude, ChatGPT, Cursor, VS Code, and more)</td>
<td>Limited, pre-standard</td>
<td>Claude, ChatGPT, VS Code, Goose</td>
</tr>
</table>
If you are building a server today and you want it to work everywhere, target MCP. If you want your server to return interactive UI, target MCP Apps. If you already built something on MCP-UI, the migration path is the point of MCP Apps, the same people who built MCP-UI are now maintaining the official version.
## Why this sequence matters
Protocols almost never arrive fully formed. The useful pattern, when it works, is that a community ships an experiment, adoption validates the shape, and the core team absorbs the experiment into the spec with the original authors still involved. That is what happened here, and it happened in under a year. MCP went from text-only to interactive UI without splintering into competing standards, and without leaving MCP-UI adopters stranded.
This is also why the "MCP is just a fancy REST wrapper" critique does not hold up. REST does not evolve. REST does not grow a UI extension. REST does not have a core maintainer group that can ship a co-authored spec in ten weeks. MCP is a living protocol with a governance model, and MCP Apps is the first big proof that the governance actually works.
## What to watch next
MCP Apps is not the end of the story. A few things worth tracking:
- **Adoption curve.** The interesting question is not whether MCP Apps launches in more clients, it is whether server authors start shipping UI by default or treat it as an optional extra. If MCP Apps becomes the norm instead of the exception, the whole agent surface changes.
- **Competing standards.** A2UI takes a different approach, declarative JSON that maps to native components (React, SwiftUI, Flutter) rather than HTML in an iframe. It trades flexibility for stronger security and better portability outside conversational surfaces. Worth watching if you care about agent UI in contexts beyond chat.
- **The UI-to-agent loop.** Right now MCP Apps is mostly about surfacing UI from servers to users. The more interesting question is how UI events feed back into the model context. The spec has hooks for this (updateModelContext), but the patterns for using it well are still being invented.
- **Security posture.** Iframes are a reasonable sandbox, but running third-party HTML inside your chat client is still a larger attack surface than running plain text. The story around template review, CSP, and consent flows will matter more as MCP Apps adoption grows.
The short version: MCP is the protocol, MCP-UI was the sketch, MCP Apps is the canvas. If you are building anything in this space, build on MCP Apps and keep an eye on the wider agent-UI debate, it is moving fast and the dust has not settled yet.
## References
1. Model Context Protocol, official specification. [https://modelcontextprotocol.io](https://modelcontextprotocol.io)
2. Model Context Protocol Blog, "MCP Apps: Extending servers with interactive user interfaces." [https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/)
3. Model Context Protocol Blog, "MCP Apps, Bringing UI Capabilities To MCP Clients." [https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)
4. SEP-1865, MCP Apps Extension proposal. [https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1865](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1865)
5. MCP Apps official extension repository. [https://github.com/modelcontextprotocol/ext-apps](https://github.com/modelcontextprotocol/ext-apps)
6. Ido Salomon, MCP-UI original project. [https://github.com/idosal/mcp-ui](https://github.com/idosal/mcp-ui)
7. Anthropic, "Introducing the Model Context Protocol." [https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)
8. WorkOS, "MCP-UI: Breaking the Text Wall in AI Interactions." [https://workos.com/blog/mcp-ui-breaking-text-wall-ai-interactions](https://workos.com/blog/mcp-ui-breaking-text-wall-ai-interactions)
9. Block Engineering, "goose Lands MCP Apps." [https://block.github.io/goose/blog/2026/01/06/mcp-apps/](https://block.github.io/goose/blog/2026/01/06/mcp-apps/)
10. Sunpeak, "MCP Apps vs A2UI, Which Agent UI Standard Should You Use?" [https://sunpeak.ai/blogs/mcp-apps-vs-a2ui/](https://sunpeak.ai/blogs/mcp-apps-vs-a2ui/)
