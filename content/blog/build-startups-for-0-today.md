---
title: "Build startups for $0 today"
date: "2026-04-22T17:48:00.000+08:00"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Business"]
tagColors: {"Business":"red"}
postTags: ["Startups","SaaS","JavaScript","TypeScript","Frameworks","CLI","DevTools","Documentation","Coding","Agents","LLMs","Claude","Anthropic","Google","OpenAI","Open Source","Cloud","VPS","Pricing"]
---

The cost of shipping software has never been lower. With AI-native tooling, open-source infrastructure, and dirt-cheap hosting, you can go from idea to production for about \$20 a month. Not \$20k. Not \$2k. Twenty dollars.
This isn't theoretical. This is the stack I'm using right now, and it's the stack that AI defaults to when you ask it to build something. That's not a coincidence, it's signal.
## The AI-native stack thesis
Here's the idea: the best tech stack in 2026 is whatever AI is best at writing. If you ask any coding agent to build something without specifying a framework, it will almost certainly reach for TypeScript and React. The training data is there. The ecosystem is there. The community is massive.
This means the tooling around TypeScript and React has become the default path of least resistance. Libraries like [shadcn/ui](https://ui.shadcn.com/) are everywhere because AI knows them inside and out. When your AI coding assistant can scaffold a full feature in minutes using these tools, that's a compounding advantage you can't ignore.
**What AI is good at is what will help you move fast.** And moving fast is everything when you're building a startup.
## My stack
Here's what I'm running across web, mobile, docs, and browser extensions.
### Framework and runtime
- [**Next.js**](https://nextjs.org/) for the web app. Still the most mature full-stack React framework with server components, API routes, and edge support baked in.
- [**React Native**](https://reactnative.dev/)** + **[**NativeWind**](https://www.nativewind.dev/) for mobile. NativeWind brings Tailwind CSS to React Native, so you can share mental models (and sometimes actual components) between web and mobile.
- [**Hono**](https://hono.dev/) as a lightweight API framework. It runs anywhere, from Bun to Cloudflare Workers to Node, and it's incredibly fast.
- [**Bun**](https://bun.sh/) as the JavaScript runtime and package manager. Faster installs, faster scripts, faster everything compared to Node + npm.
### Authentication and payments
- [**Better Auth**](https://www.better-auth.com/) for authentication. It's a TypeScript-first, open-source auth library that runs directly inside your app. No external identity provider needed. It supports social login, two-factor auth, passkeys, and organizations through a clean plugin system. Trusted by companies like OpenAI and Databricks.
- [**Polar**](https://polar.sh/) for payments and billing. Polar is a merchant of record, which means it handles global tax compliance, subscriptions, usage-based billing, and customer portals for you. The pricing is 4% + 40¢ per transaction with no monthly fees. For an indie startup, not having to think about VAT and sales tax across 100+ countries is a massive win.
### Documentation and tooling
- [**Fumadocs**](https://fumadocs.dev/) for documentation. A React-native (not React Native) documentation framework that works on top of Next.js and other React frameworks. It supports MDX, full-text search, and has a beautiful default theme out of the box.
- [**Biome**](https://biomejs.dev/) for linting and formatting. It's a Rust-based, all-in-one replacement for ESLint and Prettier that runs in milliseconds.
- [**Ultracite**](https://ultracite.ai/) for zero-config linting presets. It layers on top of Biome (or ESLint + Prettier) with hundreds of preconfigured rules optimized for TypeScript projects. It even generates rules for AI agents so your coding assistants follow the same style as your team.
- [**Husky**](https://typicode.github.io/husky/) for Git hooks. Runs your linter and formatter before every commit so bad code never hits the repo.
### Browser extensions
- [**WXT**](https://wxt.dev/) for building browser extensions. It's the leading framework for Manifest V3 extensions with first-class TypeScript support, hot module reloading, and cross-browser compatibility. If your product needs a Chrome extension, WXT is the clear choice in 2026.
## The coding setup
This is where the \$20 figure comes from.
**Primary: **[**Claude**](https://claude.ai/)** subscription at \$20/month.** Claude's coding capabilities, especially with Claude Code, are best-in-class for agentic software development. You give it a task, it analyzes your codebase, maps dependencies, and builds the feature. It's like having a fast, tireless pair programmer.
**Fallback: **[**Google Antigravity**](https://idx.google.com/)** at \$0.** Antigravity is Google's AI-powered development environment, currently in free public preview. It uses Gemini 3 Pro by default but is model-agnostic, so you can plug in other models. Generous rate limits make it a solid free option when you need a break from your Claude budget.
**Second fallback: **[**Gemini CLI**](https://github.com/google-gemini/gemini-cli)** / **[**Codex CLI**](https://github.com/openai/codex)** at \$0.** Terminal-based AI coding tools that work directly in your workflow. Both are free or have generous free tiers, and they're excellent for quick tasks.
The point is this: your primary coding tool costs \$20/month, and you have two free fallbacks. The marginal cost of writing software is approaching zero.
## Hosting and infrastructure
- [**Hetzner**](https://www.hetzner.com/) for servers. European cloud provider with some of the best price-to-performance ratios in the industry. A capable VPS starts at a few dollars per month.
- [**Coolify**](https://coolify.io/) for deployment. It's an open-source, self-hosted alternative to Vercel, Heroku, and Netlify. You install it on your Hetzner VPS and get push-to-deploy, free SSL certificates, database management, and no vendor lock-in. Teams have reported replacing \$600/month Vercel bills with \$17-90/month on Hetzner + Coolify.
- [**Spaceship**](https://www.spaceship.com/)** or **[**Namecheap**](https://www.namecheap.com/) for domains. A .com domain runs about \$10/year.
Total infrastructure cost? Somewhere between \$5 and \$20 per month, depending on your traffic.
## The full cost breakdown
<table header-row="true">
<tr>
<td>Category</td>
<td>Tool</td>
<td>Monthly cost</td>
</tr>
<tr>
<td>AI coding</td>
<td>Claude subscription</td>
<td>\$20</td>
</tr>
<tr>
<td>AI coding (fallback)</td>
<td>Antigravity, Gemini CLI</td>
<td>\$0</td>
</tr>
<tr>
<td>Server</td>
<td>Hetzner VPS + Coolify</td>
<td>\~\$5-10</td>
</tr>
<tr>
<td>Domain</td>
<td>Spaceship or Namecheap</td>
<td>\~\$1 (annualized)</td>
</tr>
<tr>
<td>Auth</td>
<td>Better Auth (self-hosted)</td>
<td>\$0</td>
</tr>
<tr>
<td>Payments</td>
<td>Polar (4% + 40¢ per tx)</td>
<td>\$0 upfront</td>
</tr>
<tr>
<td>Linting and tooling</td>
<td>Biome, Ultracite, Husky</td>
<td>\$0</td>
</tr>
<tr>
<td>Docs</td>
<td>Fumadocs</td>
<td>\$0</td>
</tr>
<tr>
<td>**Total**</td>
<td></td>
<td>**\~\$21-31/month**</td>
</tr>
</table>
That's it. You're running a full-stack web app, mobile app, documentation site, and browser extension for roughly the cost of a single lunch.
## Why this matters
Three years ago, building a startup required a team, runway, and months of development time. Today, a single developer with \$20/month and the right AI tools can ship production software in days.
The barrier to entry hasn't just lowered, it's nearly disappeared. The ecosystem built around TypeScript and React is so mature, so well-understood by AI, that the hard parts of software development are becoming commoditized.
This doesn't mean building a *successful* startup is free. You still need a good idea, distribution, and the ability to solve real problems. But the excuse of "I can't afford to build it" no longer holds up.
So what's stopping you?
## References
1. Better Auth, official documentation and homepage. [https://www.better-auth.com/](https://www.better-auth.com/)
2. Polar, open-source payments infrastructure for developers. [https://polar.sh/](https://polar.sh/)
3. Coolify, open-source self-hosted deployment platform. [https://coolify.io/](https://coolify.io/)
4. Fumadocs, the React.js documentation framework. [https://fumadocs.dev/](https://fumadocs.dev/)
5. WXT, next-generation web extension framework. [https://wxt.dev/](https://wxt.dev/)
6. Ultracite, zero-configuration linting and formatting preset. [https://ultracite.ai/](https://ultracite.ai/)
7. Hono, ultrafast web framework for the edge. [https://hono.dev/](https://hono.dev/)
8. Bun, fast all-in-one JavaScript runtime. [https://bun.sh/](https://bun.sh/)
9. Biome, one toolchain for your web project. [https://biomejs.dev/](https://biomejs.dev/)
10. MassiveGRID, "Vercel vs Self-Hosted Coolify: The True Cost Comparison for 2026." [https://www.massivegrid.com/blog/vercel-vs-self-hosted-coolify-cost-comparison/](https://www.massivegrid.com/blog/vercel-vs-self-hosted-coolify-cost-comparison/)
11. Google Antigravity, AI-powered development environment. [https://idx.google.com/](https://idx.google.com/)
12. Hetzner, cloud hosting provider. [https://www.hetzner.com/](https://www.hetzner.com/)
