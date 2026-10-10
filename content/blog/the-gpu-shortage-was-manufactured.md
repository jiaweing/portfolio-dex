---
title: "The GPU shortage was manufactured"
date: "2026-04-03"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Somewhere around 2023, a narrative took hold: GPUs are impossibly scarce, and if you don't spend billions right now, you'll be locked out of the AI future. That story drove one of the largest infrastructure buildouts in history. Hyperscalers pledged hundreds of billions in capital expenditure. Startups scrambled for allocation. NVIDIA's revenue went from \$27 billion in fiscal 2023 to \$131 billion in fiscal 2025 to \$216 billion in fiscal 2026.
But here's the thing: NVIDIA was shipping record volumes the entire time. The shortage was real in some dimensions, but the scarcity narrative was amplified, weaponized, and in key respects, manufactured.
This isn't a conspiracy theory. It's a systems story about how supply narratives, allocation games, and FOMO-driven spending created artificial scarcity on top of genuine constraints.
## The numbers don't match the narrative
The "GPU shortage" story implies that there simply aren't enough chips to go around. But NVIDIA's own earnings tell a different story.
In fiscal Q2 2024 (reported August 2023), NVIDIA posted record data center revenue and CEO Jensen Huang declared that "accelerated computing and generative AI have hit the tipping point. Demand is surging worldwide." Revenue for fiscal 2024 hit \$60.9 billion, more than doubling the prior year. By fiscal 2026, it reached \$215.9 billion, with Q4 alone delivering a record \$68.1 billion.
More than 251 million GPUs shipped globally in 2024, according to Jon Peddie Research. NVIDIA wasn't failing to produce, it was producing at unprecedented scale. The company's data center business went from 60% of total revenue in 2023 to 91% by early 2025.
So if chips were flowing at record rates, why did everyone feel like they couldn't get any?
## Allocation is the real game
The answer lies not in total supply but in who gets what. NVIDIA doesn't operate like a commodity market where anyone can buy at a posted price. GPU allocation is a relationship business, and the biggest buyers get priority.
Hyperscalers like Microsoft, Google, Meta, and Amazon secured multi-year commitments, effectively reserving capacity years ahead. Jensen Huang himself has spoken of \$1 trillion in cumulative orders for Blackwell and Rubin GPUs through 2027. When you pre-commit at that scale, you're not just buying chips, you're removing them from the available pool for everyone else.
CoreWeave, the GPU cloud provider that went from crypto mining to AI infrastructure darling, signed a \$6.3 billion capacity deal with NVIDIA. The arrangement goes both ways: NVIDIA invested \$2 billion in CoreWeave to help it add 5 gigawatts of AI compute capacity, while CoreWeave agreed to host NVIDIA's chips in AI-optimized data centers. This isn't a traditional vendor-customer relationship. It's a vertically integrated supply chain where NVIDIA picks winners.
For startups, mid-sized companies, and researchers without these relationships, the result was genuine scarcity, not because chips didn't exist, but because they were already spoken for.
## The OPEC parallel
There's a useful analogy here: OPEC. The Organization of the Petroleum Exporting Countries doesn't necessarily restrict total oil production to crisis levels. Instead, it manages supply narratives and allocation to maintain pricing power and strategic leverage.
NVIDIA occupies a similar position. With roughly 85% market share in AI accelerators and a 95% share in discrete gaming GPUs, it has near-monopoly control over the compute that powers AI. When NVIDIA's CFO warns of "supply constraints" extending into 2027 or 2028, that's not just a logistics update, it's a signal that shapes billions in purchasing decisions.
The parallel isn't perfect. OPEC is a cartel of nation-states. NVIDIA is a single company with genuine engineering constraints. But the market dynamics rhyme: control the supply narrative, and you control the market. Every warning about scarcity triggers a wave of pre-orders, which creates more scarcity, which justifies more warnings.
## Hyperscaler hoarding and the FOMO cycle
The biggest AI companies aren't just buying what they need. They're buying what they might need, plus a buffer, plus enough to ensure competitors can't get it.
Morgan Stanley estimates approximately \$2.9 trillion in global data center construction costs through 2028. Hyperscalers are expected to commit more than \$1 trillion in spending in just the 2025-2026 period. BloombergNEF reports that capital expenditure from the 14 largest publicly owned data center operators hit nearly \$750 billion in 2025, up from \$450 billion the year before.
This spending isn't purely driven by current demand. It's driven by the fear that if you don't lock in capacity now, you'll be left behind when the next model generation arrives. It's speculative demand dressed up as strategic necessity.
The LA Times reported in early 2026 that AI giants are hoarding high-bandwidth memory chips, pushing prices to "hyperinflation levels." Each NVIDIA Blackwell chip requires 192 gigabytes of HBM. An NVL72 rack needs 13.4 terabytes. When the world's largest companies stockpile these components, the downstream effects cascade through the entire supply chain.
This is a textbook coordination problem. Individually, every hyperscaler's decision to over-buy is rational. Collectively, it creates the very scarcity they're trying to hedge against.
## Export controls add real scarcity on top
U.S. export controls on AI chips to China, first imposed in October 2022 and expanded through 2023 and 2024, introduced a layer of genuine, policy-driven scarcity.
The controls cut China off from NVIDIA's most advanced products. Reuters reported in April 2026 that Chinese GPU and AI chip makers captured nearly 41% of China's AI accelerator market in 2025, eroding NVIDIA's once-dominant position. Huawei has responded with its Ascend 910c and 910d chips, and Chinese firms shipped approximately 4 million AI accelerator cards domestically last year.
But the export controls also had a boomerang effect on global supply. By restricting one of the world's largest markets, the controls concentrated demand on the remaining available pool. Meanwhile, Chinese companies that could still access chips through indirect channels had even more incentive to stockpile.
The result is a strange dual reality: manufactured scarcity from allocation games layered on top of policy-induced scarcity from export controls layered on top of genuine production constraints from memory supply and advanced packaging.
## The cloud rental market tells the real story
If GPUs were truly as scarce as the narrative suggested, rental prices would stay high. But the GPU cloud market tells a different story.
H100 rental prices dropped from \$8 per hour at their peak to \$2.85-3.50 per hour by late 2025, a 64% decline. The Silicon Data H100 Rental Index fell 23% in less than a year. By early 2026, more than 300 providers had entered the GPU cloud market, and supply chain improvements had largely eliminated the availability constraints that plagued 2023-2024.
A100 80GB GPUs now rent for as low as \$0.78 per hour. H100s start around \$1.38 per hour on some platforms. The market that was supposed to be in permanent shortage has, for many use cases, become a buyer's market.
This price collapse is the clearest evidence that the shortage narrative was overstated. Prices fall when supply catches demand. And supply caught demand faster than the scarcity story would have predicted.
## The trillion-dollar question
All those data centers currently under construction represent a massive bet on future demand. Morgan Stanley projects a U.S. power shortfall of 9 to 18 gigawatts through 2028. Over 23 gigawatts of data center capacity was under construction globally at the end of September 2025.
But there are warning signs. Ares Management has flagged risks of overcapacity. Up to half of data center projects slated for 2026 face delays due to power constraints, grid equipment shortages, and community opposition. China already faces AI computing overcapacity with utilization rates of only 20-30%, and has cancelled more than 100 data center projects in the last 18 months.
Man Group's analysis draws an explicit parallel to the telecom fiber bust, where only 5% of installed fiber-optic capacity was in use by 2001. The AI infrastructure cycle shows similar dynamics: exponential investment driven by projections of exponential demand, with massive capital deployed before the revenue models are proven.
The key difference, as KKR and others have argued, is that today's data center contracts are backed by the world's most creditworthy companies with long-term leases. The telecom bust was fueled by leveraged startups building into speculative demand. The AI buildout is funded by companies with trillion-dollar balance sheets.
But that doesn't eliminate risk. It just means the losses, if demand disappoints, will be absorbed by different balance sheets.
## What this means
The GPU shortage was never a simple supply story. It was a complex system of genuine constraints, strategic allocation, FOMO-driven hoarding, and narrative management that collectively created a self-reinforcing scarcity cycle.
NVIDIA shipped more chips than ever before and made more money than almost any company in history. Hyperscalers locked in capacity years ahead, creating artificial scarcity for everyone else. Export controls added real restrictions on top. And the narrative that GPUs are impossibly scarce drove trillions in infrastructure spending.
Some of that spending will prove justified. AI is genuinely transformative, and compute demand may well grow to fill the capacity being built. But some of it was driven by a scarcity story that was, at best, incomplete, and at worst, deliberately amplified by the parties who benefited most from the buying frenzy.
The lesson isn't that the shortage was fake. Real constraints existed and continue to exist, particularly in advanced memory and packaging. The lesson is that scarcity narratives are powerful tools, and when the entity controlling supply is also the primary narrator of scarcity, it's worth asking who benefits from the panic.
## References
1. [NVIDIA Announces Financial Results for Fourth Quarter and Fiscal 2026](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-fourth-quarter-and-fiscal-2026), NVIDIA Newsroom
2. [NVIDIA Revenue 2012-2026](https://www.macrotrends.net/stocks/charts/NVDA/nvidia/revenue), MacroTrends
3. [More than 251 million GPUs shipped in 2024](https://www.tomshardware.com/tech-industry/more-than-251-million-gpus-shipped-in-2024-according-to-new-research), Tom's Hardware
4. [NVIDIA's gaming GPU sales declined 11% while data center hit 91% of revenue](https://www.reddit.com/r/pcmasterrace/comments/1iz27fb/nvidias_gpu_sales_declined_11_on_an_annual_basis/), CNBC via Reddit
5. [CoreWeave and NVIDIA's \$6.3B Capacity Deal](https://www.datacenters.com/news/coreweave-nvidia-s-6-3b-capacity-deal), [Datacenters.com](http://Datacenters.com)
6. [NVIDIA invests \$2B to help CoreWeave add 5GW of AI compute](https://techcrunch.com/2026/01/26/nvidia-invests-2b-to-help-debt-ridden-coreweave-add-5gw-of-ai-compute/), TechCrunch
7. [Powering AI: Energy Market Outlook 2026](https://www.morganstanley.com/insights/articles/powering-ai-energy-market-outlook-2026), Morgan Stanley
8. [AI Is Now a Macro Variable](https://www.morganstanley.com/insights/articles/ai-market-trends-institute-2026), Morgan Stanley Research
9. [AI Data Center Build Advances at Full Speed](https://about.bnef.com/insights/commodities/ai-data-center-build-advances-at-full-speed-five-things-to-know/), BloombergNEF
10. [AI giants are hoarding memory chips, pushing prices to hyperinflation levels](https://www.latimes.com/business/story/2026-02-17/ai-giants-are-hoarding-memory-chips-pushing-prices-to-hyperinflation-levels), Los Angeles Times
11. [GPU Cloud Prices Collapse: H100 Rental Drops 64%](https://introl.com/blog/gpu-cloud-price-collapse-h100-market-december-2025), Introl Blog
12. [AI GPU Rental Market Trends, March 2026](https://www.thundercompute.com/blog/ai-gpu-rental-market-trends), Thunder Compute
13. [Chinese chipmakers claim nearly half of local market as NVIDIA's lead shrinks](https://www.reuters.com/world/china/chinese-chipmakers-claim-nearly-half-of-local-market-nvidias-lead-shrinks-idc-2026-04-01/), Reuters
14. [U.S. Export Controls on AI and Semiconductors](https://laweconcenter.org/resources/us-export-controls-on-ai-and-semiconductors/), International Center for Law and Economics
15. [Data center boom brings risks of overbuilding](https://fortune.com/2025/10/07/is-there-an-ai-bubble-data-center-overbuilding-ares/), Fortune
16. [Global AI data center boom hits delays](https://www.axios.com/2026/02/24/ai-data-center-boom-projects-numbers), Axios
17. [The AI Bubble: Hidden Risks and Opportunities](https://www.man.com/insights/the-ai-bubble), Man Group
18. [Beyond the Bubble: Why AI Infrastructure Will Compound Long after the Hype](https://www.kkr.com/insights/ai-infrastructure), KKR
19. [GPU Scarcity Is Changing How AI Systems Are Designed](https://www.datacenters.com/news/why-gpu-scarcity-is-changing-how-ai-systems-are-designed), [Datacenters.com](http://Datacenters.com)
20. [The Hidden GPU Crisis: How Data Centers Are Leaving Consumers Behind](https://www.arizton.com/blog/gpu-crisis-datacenters-leaving-consumers-behind), Arizton
