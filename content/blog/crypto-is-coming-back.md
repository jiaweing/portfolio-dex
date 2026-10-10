---
title: "Crypto is coming back"
date: "2026-03-21T20:16:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

We entered the era of AI agents, and the first thing we did was give them credit cards.
Not wallets. Not stablecoin accounts. Credit cards. The same plastic rails humans have been swiping since the 1950s. And somehow, that might be the thing that brings crypto roaring back.
## Agents need to spend
AI agents are no longer just answering questions or summarizing documents. They book flights, reorder inventory, purchase API credits, and negotiate prices, all without a human touching the keyboard. But to do any of that, they need money. Specifically, they need a way to pay.
The problem is that agents can't open bank accounts. Banks require identity verification that software simply cannot provide. No KYC, no account. So the industry improvised. Companies like [Ramp](https://agents.ramp.com/cards) launched Agent Cards, programmable corporate cards with custom spend limits, merchant locks, and full transaction visibility. [AgentCard.ai](http://AgentCard.ai) took it further, letting anyone spin up a prepaid virtual Visa for an AI agent in seconds. Visa rolled out its Trusted Agent Protocol and launched [Visa CLI](https://visacli.sh), a command-line tool that lets developers give agents the ability to make programmatic card payments directly from the terminal, no checkout page, no API key juggling. Mastercard completed Europe's first live AI agent bank payment through Santander.
The message is clear: agents are becoming economic actors, and the payments industry is scrambling to keep up.
## Why card rails break down
Traditional payment infrastructure was designed for humans buying things a few times a day. An AI agent operates differently. When an agent researches a topic, it might call dozens of APIs in a single session, each costing fractions of a cent. It pays for compute time, data feeds, web scraping, sub-agent services.
Here's the math that matters: Stripe's minimum processing fee on a single transaction is around \$0.30. If an agent makes six micropayments totaling two cents, running them through card rails would cost more than 100 times the value of the payments themselves. That's not a rounding error. That's a broken model.
Visa and Mastercard charge 2-3% interchange fees on every transaction. For a human buying groceries, that's invisible. For an agent making thousands of sub-cent transactions per hour, it's a dealbreaker.
The industry knows this is unsustainable. Stripe and Tempo co-authored the [Machine Payments Protocol](https://mpp.dev/) (MPP), an open standard that embeds payments directly into HTTP requests using the long-dormant [402 status code](https://stripe.com/blog/machine-payments-protocol). An agent hits a paid endpoint, the server responds with a payment challenge, the agent authorizes it, and the resource is delivered, all in a single round-trip. Stripe users can accept MPP payments in a few lines of code, and companies like Browserbase and PostalForm are already letting agents pay per browser session and per task. OpenAI followed with its own [Agentic Commerce Protocol](https://developers.openai.com/commerce) (ACP), a framework for product discovery, checkout, and fulfillment built directly into its developer platform.
## Enter stablecoins
This is where crypto re-enters the picture, not as a speculative asset, but as infrastructure.
Stablecoin transaction volume reached \$33 trillion in 2025, up 72% year-over-year. Crypto card spending hit \$18 billion on an annualized basis. And the thesis driving all of it is simple: AI agents need fast, cheap, programmable money, and stablecoins deliver exactly that.
Coinbase launched x402, an open payment protocol that embeds stablecoin payments directly into HTTP requests. An agent hits a paywall, pays in USDC, and continues its task in the same interaction. No checkout page, no card number, no human required. Cloudflare, Circle, AWS, and Stripe are all backing it.
Google went broader. Its [Agent Payments Protocol](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol) (AP2), backed by over 60 organizations including Adyen, American Express, Mastercard, PayPal, and Coinbase, is designed as a universal protocol that supports everything from credit cards to stablecoins to real-time bank transfers. AP2 uses cryptographically-signed digital contracts called Mandates, tamper-proof records that capture a user's intent and cart details as verifiable proof of authorization. When a user tells an agent to "buy concert tickets the moment they go on sale," the signed mandate specifies price limits, timing, and conditions, giving the agent pre-authorized proof to transact autonomously. Google includes x402 as a settlement layer within AP2, bridging the crypto and traditional rails in a single framework.
Coinbase founder Brian Armstrong thinks there will soon be more AI agents than humans making transactions on the internet. Binance founder Changpeng Zhao went further, predicting agents will make one million times more payments than people, all in crypto.
## The trillion-dollar split
The most likely outcome isn't that stablecoins replace card networks entirely. It's a split.
What's telling is that the protocols themselves reflect this. Stripe's MPP supports both fiat and stablecoins. Google's AP2 is explicitly payment-agnostic. Even Visa is hedging, building CLI tools for developers while card networks still collect interchange. The infrastructure is being designed to straddle both worlds.
Regulated human commerce stays on card rails, Visa, Mastercard, the infrastructure we know. But machine-to-machine payments, agents hiring agents, paying per API call, buying compute on demand, migrate to stablecoins because the economics demand it.
A widely circulated February 2026 report from Citrini Research modeled a scenario where AI agents, optimizing around the clock, identify interchange fees as a cost to eliminate and migrate to stablecoin rails where transactions cost fractions of a penny. The report wiped billions off Visa, Mastercard, and American Express in a single day.
Morgan Stanley projects agentic commerce could capture \$385 billion in U.S. e-commerce by 2030. World, Sam Altman's identity project, estimates agentic commerce could reach \$3 to \$5 trillion by 2030, with agents accounting for up to 25% of U.S. e-commerce.
The open question is which side of the split ends up bigger.
## Crypto's new narrative
For years, crypto struggled to find a use case that stuck beyond speculation. NFTs peaked and faded. DeFi remained niche. But AI agent payments might be different because the demand isn't manufactured, it's structural.
Agents can't open bank accounts, but they can hold crypto wallets. Agents can't afford card fees on micropayments, but they can settle on stablecoin rails for fractions of a penny. Agents don't care about banking hours or compliance reviews, and blockchain settles 24/7.
The AI agent sector in crypto grew from basically nothing to over \$15 billion in a matter of months, with predictions of reaching \$250 billion. Over 11,000 agents operate on the Virtuals Protocol platform alone. AI agents processed over 115 million crypto micropayments in early 2026.
[AgentCard.ai](http://AgentCard.ai) is already teasing on-chain payments and DeFi integrations. The convergence is not coincidental, it's inevitable. When you build autonomous software that needs to spend money at machine speed, you end up reinventing programmable money. And programmable money already exists. It's called crypto.
## What this actually means
We're watching a strange loop play out. AI agents need to transact. Traditional finance can't handle the volume or the economics. So agents are pulling crypto into the mainstream, not because anyone decided crypto was cool again, but because the infrastructure demands it.
The first thing we gave AI agents was credit cards. The next thing they'll ask for is a wallet.
## References
1. CoinDesk, "Visa is ready for AI agents. So is Coinbase. They're building very different internets" (March 2026) — [coindesk.com](http://coindesk.com)
2. Forbes, "Stripe, Visa and Mastercard Race to Build AI Agent Payment Rails" (March 2026) — [forbes.com](http://forbes.com)
3. Bloomberg, "AI's Money Bots Are Here and Everyone Wants to Handle Their Cash" (March 2026) — [bloomberg.com](http://bloomberg.com)
4. Yahoo Finance, "Crypto card spending hits \$18 billion annualized as stablecoin use shifts to everyday payments" — [yahoo.com](http://yahoo.com)
5. CoinMarketCap, "2025's First Major Trend: Why AI Agents Are Taking Over Crypto" — [coinmarketcap.com](http://coinmarketcap.com)
6. Chainlink, "AI Agent Payments: The Future of Autonomous Commerce" (February 2026) — [chain.link](http://chain.link)
7. Ramp Agent Cards — [agents.ramp.com](http://agents.ramp.com)
8. AgentCard — [agentcard.ai](http://agentcard.ai)
9. Yahoo Finance, "Stablecoin firms bet big on AI agent payments that barely exist" — [yahoo.com](http://yahoo.com)
10. Aurpay, "AI Agents That Spend Crypto: Why Autonomous Commerce Needs Non-Custodial Rails" (March 2026) — [aurpay.net](http://aurpay.net)
11. Stripe, "Introducing the Machine Payments Protocol" (2026) — [stripe.com](http://stripe.com)
12. MPP, "Machine Payments Protocol" — [mpp.dev](http://mpp.dev)
13. Visa, "Visa CLI, Command Line Commerce" — [visacli.sh](http://visacli.sh)
14. Google Cloud, "Powering AI commerce with the new Agent Payments Protocol (AP2)" (2025) — [cloud.google.com](http://cloud.google.com)
15. OpenAI, "Agentic Commerce Protocol" — [developers.openai.com](http://developers.openai.com)
