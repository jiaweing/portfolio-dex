---
title: "How I do OG images"
date: "2026-03-17T17:10:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Guide"]
tagColors: {"Guide":"yellow"}
postTags: []
---

When you share a link on social media, the preview image that appears is called the Open Graph (OG) image. It's essentially free advertising, a chance to catch someone's eye before they even click through. Most sites either use a generic logo or rely on a paid service to generate these dynamically. I do neither. I take a screenshot of every page on my website and use that as the OG image, for free.
Here's how it works and why I think it's a great approach for personal sites.
## What are OG images and why they matter
Open Graph images are the visual previews that show up when a URL is shared on platforms like X, Facebook, LinkedIn, or messaging apps like WhatsApp and iMessage. They're defined by a `<meta>` tag in the page's HTML:
```html
<meta property="og:image" content="https://yoursite.com/og/page-name.png" />
```
A good OG image makes the difference between someone scrolling past your link and actually clicking on it. It takes less than two seconds for someone to decide whether a social media post is worth their attention, so the preview image matters more than you might think.
## The typical approaches (and what they cost)
There are a handful of common ways to handle OG images:
**Static, one-size-fits-all image.** Many sites just slap their logo on a solid background and call it a day. It works, but every page looks the same when shared. Not exactly compelling.
**Dynamic generation with a framework.** Tools like Vercel's `@vercel/og` library let you generate images on the fly using JSX-like templates. This is powerful but requires setting up API routes and designing templates in code. If you're using a static export (`output: 'export'` in Next.js), you can't use API routes at all.
**Third-party OG image services.** There's a growing market of SaaS tools that handle OG image generation for you:
- [**OpenGraph.xyz**](http://OpenGraph.xyz) starts at \$29/month for 1,000 image generations
- **OG Kit** ranges from free (25 pages) to \$299/year (10,000 pages)
- **OGSocial** starts at \$9/month
- **Bannerbear** offers dynamic image and video generation with Zapier integrations
- **Cloudinary** can handle OG images as part of its broader image platform, with paid plans starting at \$99/month
- **og:screen** takes live screenshots on demand when a social media bot requests the image
These services work well, but they cost money, and for a personal site they're hard to justify.
## My approach: screenshot everything at build time
My solution is simple. I have a build script that uses a headless browser to visit every page on my site, take a screenshot, and save it to a folder. Then each page references its own screenshot as the OG image.
The command is just:
```bash
bun run build:og
```
That's it. The script spins up a headless browser (think Puppeteer or Playwright), navigates to each page including dynamic ones like individual blog posts, captures a screenshot at the right dimensions (typically 1200x630px, the recommended OG image size), and saves it.
You can see how this is wired up in the [source code for my portfolio site](https://github.com/jiaweing/portfolio-dex).
### Why screenshots work so well
The OG image ends up being a live preview of what the page actually looks like. When someone sees the link shared on social media, they get a real glimpse of the content and design rather than a generic template. It's like a thumbnail that says "here's what you'll get if you click."
If your site has a clean design, the screenshots are genuinely enticing. Even if the design isn't award-winning, it still gives people a concrete sense of what they're clicking into, which beats a plain logo every time.
### The technical flow
Here's a simplified breakdown of what happens under the hood:
1. **Collect all routes.** The script gathers every page URL on the site, both static pages and dynamic ones (like `/blog/some-post`).
2. **Launch a headless browser.** Using a tool like Puppeteer or Playwright, a headless Chrome instance spins up.
3. **Visit each page.** The browser navigates to each URL, waits for the page to fully render, then takes a screenshot.
4. **Resize and save.** The screenshot is cropped or resized to 1200x630px and saved to an output folder (e.g., `/public/og/`).
5. **Reference in meta tags.** Each page's `<head>` includes an `og:image` meta tag pointing to its corresponding screenshot file.
The whole process runs as part of the build pipeline, so the images are always up to date with whatever the site looks like at deploy time.
### Tools that make this possible
The headless browser ecosystem has matured a lot. Two libraries dominate:
- **Puppeteer** is the original Node.js library for controlling headless Chrome. It's battle-tested and widely used for screenshot automation.
- **Playwright** is a newer alternative from Microsoft that supports Chromium, Firefox, and WebKit. It has a clean API and solid documentation for taking full-page or element-level screenshots.
Both support setting custom viewport sizes, waiting for elements to load, and saving screenshots in various formats. A basic Playwright screenshot looks like this:
```javascript
const { chromium } = require('playwright');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.goto('https://yoursite.com/some-page');
await page.screenshot({ path: 'og/some-page.png' });
await browser.close();
```
Since the script runs with Bun, the execution is fast and integrates neatly into the existing build toolchain.
## The trade-off: dynamic pages need advance builds
There's one caveat with this approach. Because the screenshots are generated at build time, any new content that hasn't been built yet won't have an OG image.
For a blog, this means if you publish a new post but don't rebuild and redeploy, that post will be missing its OG image until the next build. Dynamic pages that are created after the last build, like a brand new blog entry, simply won't have a screenshot yet.
You have a few options to handle this:
- **Always rebuild before publishing.** Make it part of your workflow to run the OG build step before deploying new content.
- **Set a fallback image.** Use a default OG image as a fallback so new pages still have *something* when shared.
- **Automate it in CI/CD.** Add the `bun run build:og` step to your deployment pipeline so it runs automatically on every deploy.
If rebuilding every time feels like too much friction, that's where the paid services come in handy. Services like og:screen generate screenshots on demand when a social bot requests the image, so there's no build step needed. But again, that comes at a cost.
## When this approach makes sense
This screenshot-based method is ideal for:
- **Personal sites and portfolios** where you control the build and deploy pipeline
- **Blogs with a manageable number of pages** where build times stay reasonable
- **Sites with a strong visual design** where the screenshot itself is compelling
- **Projects where you want zero ongoing costs** for OG image generation
It's less ideal for large-scale sites with thousands of pages (build times add up), sites with frequently changing content that can't always be rebuilt, or teams where the build process is complex and adding a headless browser step isn't practical.
## Wrapping up
OG images don't have to be complicated or expensive. If you have a personal site with a decent design, taking screenshots of your own pages is a free, effective, and surprisingly elegant solution. You get real page previews as your social share images, no third-party dependency, and full control over the process.
The only cost is a few extra seconds in your build step. That's a trade-off I'm happy to make.
## References
1. Open Graph Protocol specification, [https://ogp.me/](https://ogp.me/)
2. Vercel OG Image Generation documentation, [https://vercel.com/docs/og-image-generation](https://vercel.com/docs/og-image-generation)
3. Playwright Screenshots documentation, [https://playwright.dev/docs/screenshots](https://playwright.dev/docs/screenshots)
4. Puppeteer documentation, [https://pptr.dev/](https://pptr.dev/)
5. [OpenGraph.xyz](http://OpenGraph.xyz) pricing, [https://www.opengraph.xyz/pricing](https://www.opengraph.xyz/pricing)
6. OG Kit pricing, [https://ogkit.dev/pricing](https://ogkit.dev/pricing)
7. Generate dynamic OG Images with Puppeteer in Next.js, [https://10xstudio.ai/blog/generate-dynamic-og-images-with-puppeteer-in-next-js](https://10xstudio.ai/blog/generate-dynamic-og-images-with-puppeteer-in-next-js)
8. PostHog, Using Gatsby and Puppeteer to create dynamic Open Graph images, [https://posthog.com/blog/dynamic-open-graph-images](https://posthog.com/blog/dynamic-open-graph-images)
