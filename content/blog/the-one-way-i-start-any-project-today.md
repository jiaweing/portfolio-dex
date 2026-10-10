---
title: "The one way I start any project today"
date: "2026-03-04"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Guide"]
tagColors: {"Guide":"yellow"}
postTags: []
---

Every new project starts the same way. You open a terminal, scaffold something, and then spend the next hour or two wiring up a database, configuring auth, setting up Tailwind, and making sure TypeScript is happy across the entire stack. By the time the plumbing is done, the creative energy that made you want to build the thing in the first place has already faded.
I got tired of that loop. So I changed how I start projects entirely. Now I use one tool: **Better-T Stack**.
## What is Better-T Stack?
[Better-T Stack](https://better-t-stack.dev) is an open-source CLI tool created by Aman Varshney that scaffolds end-to-end type-safe TypeScript projects in minutes. You run a single command, answer a few prompts, and walk away with a fully configured monorepo, ready to build on.
```bash
bun create better-t-stack@latest
```
That's it. One command kicks off an interactive wizard that asks you what you actually need, then generates the entire project scaffold with everything wired together. As of v3.23, the options have expanded massively, covering everything from frontend frameworks to payments, browser extensions, and AI tooling.
## Why it works for me
### It is opinionated where it matters
The tool makes strong default choices around type safety (TypeScript everywhere) while still letting you swap out the parts you care about. You are not locked into a single frontend framework, database, ORM, or API layer. You pick from options that are known to work well together. The current set of options is huge:
- **Frontend**: TanStack Router, React Router, TanStack Start (SSR), Next.js, SvelteKit, Nuxt, SolidJS, Astro, React Native with NativeWind, React Native with Unistyles, or none
- **Backend**: Hono, Express, Fastify, Elysia, Convex, or none
- **API layer**: oRPC (OpenAPI-compatible type-safe APIs), tRPC, or none (direct HTTP calls)
- **Runtime**: Bun, Node.js, Cloudflare Workers, or none
- **Database**: SQLite, PostgreSQL, MySQL, MongoDB, or none
- **ORM**: Drizzle, Prisma, Mongoose, or none
- **Database setup**: Turso, Cloudflare D1, Neon, Supabase, Prisma Postgres, PlanetScale, MongoDB Atlas, Docker, or none
- **Auth**: Better Auth, Clerk, or none
- **Payments**: Polar, or none
- **Addons**: Turborepo, Nx, PWA, Tauri, Biome, Oxlint, Lefthook, Husky, Starlight, Fumadocs, Ultracite, Ruler, MCP, OpenTUI, WXT, Skills, or none
- **Examples**: Todo app, AI chat (Vercel AI SDK), or none
### The interactive CLI removes decision fatigue
When you run the command, the CLI walks you through all of those choices step by step. But I skip the prompts entirely and pass flags directly. Here is the exact command I use:
```bash
bun create better-t-stack@latest app-name \
  --frontend next native-uniwind \
  --backend hono \
  --runtime bun \
  --api none \
  --auth better-auth \
  --payments polar \
  --database mongodb \
  --orm mongoose \
  --db-setup none \
  --package-manager bun \
  --git \
  --web-deploy none \
  --server-deploy none \
  --install \
  --addons biome fumadocs husky mcp ruler skills turborepo ultracite wxt \
  --examples ai
```
That gives me everything I need in one shot. You can also use the visual Stack Builder on the website to generate a command like this if you prefer a GUI.
### Why I scaffold everything upfront
You might notice I include React Native, Fumadocs, and WXT in every project, even when I am just building a website. That is intentional.
Better-T Stack only lets you add **addons** after scaffolding using the `add` command. Core scaffolding like mobile (React Native), documentation sites, and browser extensions cannot be added later. If you have been working on a project for months and suddenly want a mobile app or a Chrome extension, you cannot just run a command to bolt it on. You would have to start a new project and migrate everything over.
So I scaffold the full monorepo from day one: web, mobile, docs, and browser extension. The unused apps sit there with minimal overhead. They do not slow anything down, they do not add complexity to the parts I am actively working on, and they do not cost anything to keep around.
When the time comes to expand, everything is already wired up. The shared packages, the auth flow, the database layer, it is all connected. I can point an AI agent at the existing web app and say "replicate this for mobile" or "build a companion Chrome extension," and it just works because the scaffolding is already there. No re-architecting, no migration headaches, no starting from scratch.
This is the real power of starting with a monorepo that has everything in it. The cost of including unused scaffolds at the start is near zero. The cost of trying to add them later is enormous.
### Everything is wired together from the start
This is the part that saves the most time. After scaffolding, you don't have to:
- Manually connect your frontend to your backend
- Set up MongoDB with Mongoose schemas
- Wire up Better Auth flows
- Configure Polar for payments
- Set up Turborepo for the monorepo
- Configure linting with Biome and Ultracite
All of that is done. The project comes with a working auth flow, database connection, payments integration, and a docs site powered by Fumadocs. You write your first feature, not your first config file.
### Monorepo by default
Better-T Stack generates a Turborepo-powered monorepo with clear separation between packages:
- `apps/web` for the frontend
- `apps/server` for the backend API
- Shared packages for types, config, and utilities
This structure scales well. You start with a clean architecture instead of having to refactor later when things get messy.
## What my typical project looks like
Here is what I get after running that command:
- **Next.js** on the web frontend
- **React Native with NativeWind** for mobile
- **Hono** as the backend framework, lightweight and fast
- **MongoDB + Mongoose** for the database layer
- **Better Auth** handling sign-up, login, sessions
- **Polar** for payments and subscriptions
- **Bun** as the runtime and package manager, keeping everything fast
- **Turborepo** managing the monorepo
- **Biome + Ultracite** for linting and formatting
- **Fumadocs** for documentation
- **Husky** for git hooks
- **WXT** for browser extension support
- **MCP, Ruler, Skills** for additional tooling
- **AI example** included as a starting point
The whole thing runs with `bun dev` and hot-reloads across the stack.
## How it compares to other starters
If you have used **create-t3-app** before, Better-T Stack feels like its spiritual successor, but more flexible. T3 was tightly coupled to Next.js and a specific set of tools like tRPC and Prisma. Better-T Stack lets you mix and match. I use Next.js on the web but also get React Native for mobile in the same monorepo. I use MongoDB with Mongoose instead of a SQL database with Drizzle. I skip the API layer entirely and just use direct HTTP calls. The flexibility is real.
On the API layer specifically, Better-T Stack now supports **oRPC** as an alternative to tRPC. oRPC is a newer, lighter approach to type-safe APIs that also generates OpenAPI documentation automatically. That means your same endpoints are available as both an RPC interface and a REST-compliant OpenAPI service, without extra setup. It also has native file upload and download support built in, which tRPC lacks. If you want neither, you can set the API layer to `none` and handle HTTP calls yourself, which is what I do.
It also goes further than most starters by including auth (Better Auth or Clerk), payments (Polar), database setup, documentation (Fumadocs or Starlight), browser extension scaffolding (WXT), AI tooling (MCP, Skills), linting (Biome, Ultracite, Oxlint), and monorepo orchestration (Turborepo or Nx) out of the box. Most scaffolding tools give you a folder structure and leave the integration work to you.
## The numbers
The project has gained significant traction in a short time:
- Over **5,000 GitHub stars**
- More than **40,000 projects scaffolded**
- **475+ published versions** on npm, with new releases almost daily
- Sponsors include **Neon**, **Clerk**, **Convex**, **Novu**, and **Guillermo Rauch** (CEO of Vercel)
That kind of adoption and backing signals that the developer community was hungry for exactly this kind of tool. The pace of development is wild, with new addons and framework support landing almost every week.
## When I would not use it
Better-T Stack is optimized for TypeScript-first web applications. If you are building something outside that scope, like a Python ML pipeline, a Go microservice, or a static site with no backend, this is not the right tool.
But for the kind of project I start most often, a full-stack web app with auth, payments, a database, and a modern frontend across web and mobile, it removes almost all of the setup friction.
## The real takeaway
The best project starter is the one that gets out of your way. Better-T Stack does exactly that. It makes strong, modern choices, wires everything together, and lets you focus on the thing you actually want to build.
If you are still spending your first hour on boilerplate every time you start something new, give it a try. You will not go back.
## References
1. [Better-T Stack Official Website](https://better-t-stack.dev)
2. [GitHub Repository: create-better-t-stack](https://github.com/AmanVarshney01/create-better-t-stack)
3. [npm Package: create-better-t-stack](https://www.npmjs.com/package/create-better-t-stack)
4. [Better-T Stack: The Minimalist Stack Builder for Lightning-Fast Web Development (Medium)](https://medium.com/@raelsei/better-t-stack-the-minimalist-stack-builder-for-lightning-fast-web-development-d90b9e68d313)
5. [From Zero to Production-Ready Application with the Better-T Stack CLI (Medium)](https://medium.com/frontendweb/from-zero-to-production-ready-application-with-the-better-t-stack-cli-f53c7d892d81)
6. [Better-T Stack on Best of JS](https://bestofjs.org/projects/create-better-t-stack)
