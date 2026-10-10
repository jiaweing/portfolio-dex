---
title: "Tech looks simple"
date: "2026-03-19T22:35:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

You open your laptop, type a URL into your browser, and a webpage appears. It takes less than a second. It feels like nothing happened at all. But behind that moment of apparent simplicity is one of the most intricate chains of engineering ever built, layers upon layers of technology refined over decades so that you never have to think about any of it.
That's the magic of tech. Not that it's simple, but that it *looks* simple.
## Everything is an abstraction
Modern technology runs on abstraction. Each layer hides the complexity of the one below it, presenting a clean interface to the one above. You don't think about radio frequencies when you connect to WiFi. You don't think about IP addresses when you type a domain name. You don't think about TCP handshakes when you click a link.
The computer scientist David Wheeler once said, "All problems in computer science can be solved by another level of indirection." Over time, the industry has taken that idea and run with it. Every major leap in computing, from assembly language to high-level programming languages, from bare metal servers to cloud platforms, from manual deployments to CI/CD pipelines, has been an exercise in hiding complexity behind a simpler interface.
The result is that a developer today can build a full web application without ever thinking about how packets are routed across the internet. A designer can publish a website without knowing what DNS is. A user can video-call someone on the other side of the planet without understanding that their voice is being digitized, compressed, encrypted, split into packets, sent through fiber optic cables under the ocean, reassembled, decrypted, decompressed, and played through a speaker, all in real time.
## What actually happens when you type a URL
Let's trace what happens when you type `example.com` into your browser and press Enter. It feels instant, but the journey is remarkably long.
**Step 1: DNS resolution.** Your browser needs to turn that human-readable domain name into an IP address. First, it checks its own local cache. If it doesn't find it there, it asks the operating system's DNS resolver, which checks its own cache. Still nothing? The request goes to your router, which may have a cached answer. If not, the query is forwarded to your ISP's recursive DNS resolver.
That resolver then begins a chain of lookups. It asks a root nameserver, "Where can I find `.com` domains?" The root server points it to the `.com` TLD (Top Level Domain) nameserver. That server points it to the authoritative nameserver for `example.com`. Finally, that nameserver returns the actual IP address. The recursive resolver caches the result and sends it back to your browser.
**Step 2: The physical journey.** Now your browser has an IP address. It needs to reach the server at that address. Your request leaves your device as an electrical signal (or a radio wave, if you're on WiFi), hits your router, travels through your ISP's network, and enters the broader internet backbone. Depending on where the server is, your data might travel through fiber optic cables running under city streets, across continents, and even along the ocean floor. There are over 500 submarine cables crisscrossing the world's oceans right now, carrying roughly 99% of intercontinental internet traffic.
**Step 3: TCP and TLS.** Before any data is exchanged, your browser and the server perform a TCP three-way handshake to establish a reliable connection. If the site uses HTTPS (and most do), there's an additional TLS handshake where both sides negotiate encryption, exchange certificates, and agree on a shared secret. Only after all of this does your browser actually send the HTTP request for the webpage.
**Step 4: The server responds.** The server processes your request, which might involve querying databases, running application logic, fetching assets from a CDN, and assembling the HTML. It sends back a response, which travels the entire physical route in reverse.
**Step 5: Rendering.** Your browser parses the HTML, fetches CSS and JavaScript files (each requiring their own DNS lookups and connections), builds the DOM, applies styles, executes scripts, and finally paints pixels on your screen.
All of this happens in a fraction of a second. You never see any of it.
## Getting a webpage isn't simple either
Here's where it gets even more interesting. The process above describes what happens when a *human* requests a webpage through a browser. But what if you want to do it programmatically? What if you're building a search engine, a price comparison tool, or an AI training pipeline that needs to read web content at scale?
Suddenly, "getting a webpage" becomes an engineering challenge of its own.
**Bot detection.** Most major websites deploy sophisticated anti-bot systems. They analyze your request headers, your IP address reputation, your browsing behavior, mouse movements, and even how fast you scroll. If something looks off, you're blocked, redirected, or served different content entirely.
**CAPTCHAs.** If a site suspects you're not human, it might throw up a CAPTCHA. Modern systems like reCAPTCHA v3 don't even show you a puzzle. They silently score your behavior and decide whether you're human based on patterns you can't see or control.
**Rate limiting.** Send too many requests too quickly and you'll get throttled or banned. Some bans are temporary, others last months. Some sites don't even tell you, they just start returning fake or incomplete data.
**Authentication walls.** Much of the web's content sits behind login screens. No credentials, no access, no matter how politely your bot asks.
**Dynamic rendering.** Many modern websites don't serve complete HTML. Instead, they send a JavaScript bundle that builds the page in the browser. If you're making a simple HTTP request without executing JavaScript, you get an empty shell.
**LLM and AI blockers.** This is a newer development. As AI companies have scaled their web crawling to build training datasets, many websites have started explicitly blocking known AI crawlers. Updated robots.txt files, new HTTP headers, and legal challenges are all part of a growing pushback against automated content extraction.
**No sitemap, no structure.** Even if you can access a site, there's no guarantee it makes its structure discoverable. Without a sitemap, you're left guessing which URLs exist and how content is organized.
Each of these challenges has spawned its own ecosystem of tools, services, and workarounds. The seemingly simple act of "reading a webpage" can require proxy rotation, browser emulation, CAPTCHA-solving services, session management, and careful rate limiting, a far cry from just typing a URL into a browser.
## Every layer has a history
What makes all of this feel almost magical is that every single layer in this stack has its own deep history of evolution.
DNS was invented in 1983 by Paul Mockapetris because the previous system, a single text file called `HOSTS.TXT` maintained by hand at Stanford, couldn't scale with the growing internet. WiFi started as an obscure IEEE standard (802.11) in 1997 and went through generations of improvements in speed, range, and reliability. TLS evolved from SSL, which was created by Netscape in 1994 to make online credit card transactions safe. HTTP itself has gone from a simple text protocol to the multiplexed, binary, encrypted HTTP/3 running over QUIC.
Each of these technologies went through years of research, standardization, implementation, debugging, and iteration. The people who built them solved problems that most users today will never even know existed. And that's the point. The best infrastructure is invisible.
## The magic is in the invisibility
The real achievement of modern technology isn't any single breakthrough. It's the accumulated result of thousands of engineers making things disappear. Making complexity invisible. Making the hard parts look easy.
When you connect to WiFi without thinking about radio frequency allocation, that's decades of wireless engineering working as intended. When you type a URL and a page appears, that's the entire internet stack, from submarine cables to browser rendering engines, doing its job perfectly.
Tech looks simple. That's not a flaw in our perception. That's the highest compliment you can pay to the people who built it.
## References
1. Cloudflare, "What is DNS? How DNS works" [https://www.cloudflare.com/learning/dns/what-is-dns/](https://www.cloudflare.com/learning/dns/what-is-dns/)
2. Amazon Web Services, "What happens when you type a URL into your browser?" [https://aws.amazon.com/blogs/mobile/what-happens-when-you-type-a-url-into-your-browser/](https://aws.amazon.com/blogs/mobile/what-happens-when-you-type-a-url-into-your-browser/)
3. Wikipedia, "Abstraction layer" [https://en.wikipedia.org/wiki/Abstraction_layer](https://en.wikipedia.org/wiki/Abstraction_layer)
4. Apify, "Anti-scraping techniques" [https://docs.apify.com/academy/anti-scraping/techniques](https://docs.apify.com/academy/anti-scraping/techniques)
5. ScrapingBee, "Top Web Scraping Challenges in 2026" [https://www.scrapingbee.com/blog/web-scraping-challenges/](https://www.scrapingbee.com/blog/web-scraping-challenges/)
6. Bright Data, "Top 7 Anti-Scraping Techniques and How to Bypass Them" [https://brightdata.com/blog/web-data/anti-scraping-techniques](https://brightdata.com/blog/web-data/anti-scraping-techniques)
7. IBM, "What is DNS Lookup?" [https://www.ibm.com/think/topics/dns-lookup](https://www.ibm.com/think/topics/dns-lookup)
