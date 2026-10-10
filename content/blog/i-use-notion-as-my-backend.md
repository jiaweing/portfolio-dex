---
title: "I use Notion as my backend"
date: "2026-03-10T13:53:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Guide"]
tagColors: {"Guide":"yellow"}
postTags: []
---

Most personal blogs run on a traditional CMS or render from markdown files in a Git repo. Mine doesn't. I use Notion as my content management system, Next.js as the frontend, and Vercel for hosting. There's no separate backend, no markdown files to manage, and no redeployment needed when I publish a new post. Even this blog post was written in Notion with the help of Notion AI and published on this very website.
Let me walk you through how and why I set this up.
## Why Notion as a CMS
I was already spending most of my day in Notion for notes, planning, and project management. The idea of writing blog content in yet another tool felt unnecessary. Traditional CMS platforms like WordPress come with their own dashboards, editors, and maintenance overhead. Markdown-in-Git workflows are lightweight, but they add friction: open an editor, commit, push, wait for a build.
Notion removes all of that. I write in a familiar, rich-text editor with great formatting tools. I can draft from my phone or laptop. And when I'm ready to publish, I just update a status field in my database. No redeploy, no terminal commands.
In a very real sense, **Notion is my backend**.
## The tech stack
The setup is surprisingly minimal:
- **Notion** as the content database and editor
- **Next.js** as the frontend framework
- **Vercel** for deployment and hosting
- **Notion API** (`@notionhq/client`) to fetch content at build or request time
That's it. No dedicated backend server, no database to maintain, no hosting costs. Vercel's free tier handles everything I need.
## How the Notion database works
In Notion, I have a database called "Blog" with properties like **Title**, **Slug**, **Status**, **Date**, **Tag**, and **Author**. Each row is a blog post page where I write the actual content.
The key property is **Status**. I use it to control the publishing workflow:
- **Post Idea** for rough concepts
- **Draft** while I'm writing
- **Ready for Review** when I want to proofread
- **Published** when it's live
My Next.js app only fetches posts marked as "Published," so I can safely keep drafts and ideas in the same database without worrying about them appearing on the site.
## Connecting Notion to Next.js
The Notion API makes it straightforward to pull content into a Next.js app. Here's the general approach:
**1. Create a Notion Integration**
First, you create an internal integration at the Notion developer portal. This gives you an API token. You then share your blog database with the integration so it has access.
**2. Install the Notion Client**
```javascript
npm install @notionhq/client
```
**3. Query the Database**
The client lets you query your Notion database with filters and sorts. For example, fetching only published posts sorted by date:
```javascript
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const response = await notion.databases.query({
  database_id: process.env.DATABASE_ID,
  filter: {
    property: "Status",
    status: { equals: "Published" },
  },
  sorts: [{ property: "Date", direction: "descending" }],
});
```
**4. Convert Blocks to Renderable Content**
Notion stores content as blocks (paragraphs, headings, lists, code blocks, images, etc.). You need to convert these into something your frontend can render. A popular approach uses the `notion-to-md` library to convert Notion blocks into Markdown, then a library like `react-markdown` or `markdown-to-jsx` to render that Markdown as React components.
```javascript
const { NotionToMarkdown } = require("notion-to-md");
const n2m = new NotionToMarkdown({ notionClient: notion });

const mdBlocks = await n2m.pageToMarkdown(pageId);
const markdown = n2m.toMarkdownString(mdBlocks);
```
This two-step conversion, Notion blocks to Markdown to React, keeps things simple and gives you full control over styling.
## Deploying on Vercel
Deployment is the easiest part. Push your Next.js project to GitHub, connect it to Vercel, add your environment variables (`NOTION_TOKEN` and `DATABASE_ID`), and you're done.
Vercel handles builds, CDN distribution, and HTTPS automatically. With **Incremental Static Regeneration (ISR)**, you can set your pages to revalidate on a schedule, say every 60 seconds, so new or updated posts appear without a full rebuild.
```javascript
export const getStaticProps = async () => {
  const posts = await getAllPublished();
  return {
    props: { posts },
    revalidate: 60,
  };
};
```
This means I write a post in Notion, set the status to "Published," and within a minute it's live on my site. No git push, no CI pipeline, no waiting.
## Things to watch out for
This approach isn't without trade-offs. Here are a few things I've learned:
**Image URL expiration.** Notion serves images from temporary S3 URLs that expire after about an hour. If you're statically generating pages, those image URLs will eventually break. The workaround is to download images to your own storage or use a proxy that refreshes the URLs.
**API rate limits.** Notion's API has rate limits, so you'll want to cache responses aggressively. A simple in-memory cache with a "stale while revalidate" pattern works well for most personal blogs.
**Rendering fidelity.** Not every Notion block type maps perfectly to Markdown. Tables, for instance, need the `remark-gfm` plugin if you're using `react-markdown`. Some block types like synced blocks or databases within pages may need custom handling.
**API response speed.** The Notion API can be slower than querying a local database. Caching and static generation help here, but expect initial build times to be longer than a pure markdown-based blog.
## Why I love this workflow
I've always loved writing, but this setup made me enjoy it even more. The reason is simple: **it removes friction**. I don't switch contexts between "writing mode" and "publishing mode." I write where I already think and plan. The technical plumbing is invisible.
A few things that make it genuinely pleasant:
- **Writing in Notion feels natural.** The editor is fast, supports rich formatting, and works great on mobile.
- **Notion AI helps with drafting.** I can brainstorm, outline, and polish posts without leaving the app.
- **No deployment step.** Publishing is just a status change. The site updates itself.
- **Everything lives in one place.** My blog ideas, drafts, and published posts are all in the same database, easy to search, filter, and organize.
## Practical takeaways
If you're considering using Notion as a CMS for your own site, here's what I'd suggest:
1. **Start with a clean database schema.** Define your properties upfront: title, slug, status, date, tags. Keep it simple.
2. **Use the official Notion API and client.** The `@notionhq/client` package is well-maintained and straightforward.
3. **Convert Notion content to Markdown as an intermediate step.** It gives you flexibility and avoids vendor lock-in.
4. **Cache aggressively.** Don't hit the Notion API on every page request. Use ISR or server-side caching.
5. **Handle images separately.** Download them to your own hosting to avoid expiration issues.
6. **Deploy on Vercel or Netlify.** Both offer free tiers that are more than enough for a personal blog.
The best part? If you ever want to move away from Notion, your content can be exported to Markdown files. You're not locked in.
## References
1. Notion API documentation, [https://developers.notion.com](https://developers.notion.com)
2. Jordan Eldredge, "Using Notion as my CMS with Next.js," [https://jordaneldredge.com/notion-cms/](https://jordaneldredge.com/notion-cms/)
3. Mary Gathoni, "How to Create Next.js Blog Using Notion as a CMS," Bejamas, [https://bejamas.com/hub/guides/how-to-create-next-js-blog-using-notion-as-a-cms](https://bejamas.com/hub/guides/how-to-create-next-js-blog-using-notion-as-a-cms)
4. ppaanngggg, "Notion as a Headless CMS for Next.js 15 in 2025," Medium, [https://ppaanngggg.medium.com/notion-as-a-headless-cms-for-next-js-15-in-2025-f08207280e67](https://ppaanngggg.medium.com/notion-as-a-headless-cms-for-next-js-15-in-2025-f08207280e67)
5. Vercel, "Notion-Powered Next.js Blog Template," [https://vercel.com/templates/next.js/notion-powered-blog](https://vercel.com/templates/next.js/notion-powered-blog)
6. notion-to-md package, [https://github.com/souvikinator/notion-to-md](https://github.com/souvikinator/notion-to-md)
