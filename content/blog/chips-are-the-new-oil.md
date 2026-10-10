---
title: "Chips are the new oil"
date: "2026-04-27"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Chips","Hardware","GPU","Cloud","Google","Microsoft","Apple"]
---

In April 2026, three headlines landed in the same week. Google split its TPU line into two specialized chips. Intel signed on to Elon Musk's Terafab project to build semiconductor fabs in Texas. And Tesla tripled its annual capital expenditure to over \$25 billion, almost all of it earmarked for AI and robotics infrastructure.
These aren't isolated announcements. They're signals of a deeper shift. The AI race used to be about who had the best model. Now it's about who controls the silicon.
Chips are becoming the new oil.
## The parallel
The analogy is straightforward. In the 20th century, the countries and companies that controlled oil extraction, refining, and distribution shaped the global economy. Today, the same dynamic is playing out with semiconductors.
AI models are the cars. Chips are the fuel. And just like cars commoditized while oil remained scarce, models are becoming increasingly interchangeable while the compute to train and run them stays constrained. Demand for AI compute is projected to quadruple or quintuple annually through 2030, according to Deloitte. The AI infrastructure market is expected to reach \$1.36 trillion in 2026 alone, per Gartner.
Whoever controls the supply of compute controls the pace of AI progress.
## Google's vertical integration play
At Cloud Next 2026, Google announced its eighth-generation TPUs, but with a twist: for the first time, the TPU line was split into two distinct chips. The TPU 8t is optimized for model training. The TPU 8i is built for inference, the ongoing process of actually running models after users submit prompts.
This split matters because inference is now the dominant compute workload. In 2026, inference drives roughly two-thirds of all AI compute, up from one-third in 2023. Google saw this coming and designed silicon specifically for it. The TPU 8i delivers up to 80% better performance-per-dollar for agentic workflows compared to the previous generation.
But the real story isn't the chips themselves. It's the stack. Google now owns the full pipeline: custom silicon (TPUs), the models (Gemini), the cloud platform (Google Cloud), and the applications built on top. That's vertical integration from transistor to API. The only other company with a comparable consumer-side stack is Apple, and Apple isn't selling cloud compute.
This kind of integration gives Google a structural cost advantage that's nearly impossible to replicate by assembling off-the-shelf components.
## Terafab and the return of American chipmaking
In March 2026, Elon Musk announced Terafab, a joint venture between Tesla and SpaceX to build a semiconductor fabrication campus adjacent to Tesla's headquarters in Austin, Texas. The goal: produce 1 terawatt per year of compute to power AI, robotics, autonomous vehicles, and even orbital data centers for SpaceX.
In April, Intel signed on as the manufacturing partner, committing its cutting-edge 14A process node to the project. This is Intel's most significant external foundry contract in its history, and a potential lifeline for a company that has struggled to compete with TSMC in contract manufacturing.
Musk framed the need bluntly: all existing fabrication facilities on Earth produce only about 2% of what Tesla and SpaceX will eventually need. "We either build the Terafab, or we don't have the chips, and we need the chips, so we build the Terafab."
The initial \$3 billion research fab is just the beginning. Tesla's broader 2026 capital expenditure plan exceeds \$25 billion, nearly triple the \$8.5 billion it spent in 2025. This isn't a company hedging its bets. This is a company that has decided its future depends on owning its own compute supply chain.
## National security dressed as industrial policy
Terafab doesn't exist in a vacuum. It sits inside a larger story about the United States spending aggressively to bring semiconductor manufacturing home.
The CHIPS and Science Act of 2022 directed \$50 billion toward domestic semiconductor R&D and manufacturing. Since then, private firms have announced nearly \$400 billion in additional chip investments. Annual U.S. fab spending on equipment and construction is doubling from early-2020s levels to over \$20 billion, and is projected to approach \$50 billion by the 2028-2030 timeframe.
Meanwhile, Congress keeps tightening export controls. In April 2026 alone, the House Foreign Affairs Committee advanced 20 new export control measures to further restrict Chinese access to U.S. semiconductor technology, described as the "largest significant export control mark-up in the history of Congress." The SCALE Act aims to establish objective metrics for determining which chips can be sold to China. The Remote Access Security Act extends restrictions to cloud-based access to AI chips.
This is national security policy wearing an industrial policy costume. The logic is simple: if AI is the most consequential technology of the century, then the chips that power AI are strategic assets. You don't let strategic assets depend on supply chains you can't control.
## What this means for startups
If you're building an AI company and you don't own your compute, you're renting your competitive advantage.
The GPU rental market has exploded in the last two years, with neocloud providers offering alternatives to the big hyperscalers. But it's a fragile arrangement. H100 chip prices have risen roughly 40% since 2025. Finding available GPU compute in early 2026 has been described as "trying to book the last flight out." The best neocloud customers, the ones willing to sign multi-year contracts for large blocks of cutting-edge GPUs, are also the hyperscalers' long-term competitors.
Gross margins for basic GPU rentals hover around 15%, according to McKinsey. That's a thin margin on infrastructure someone else controls. The big AI labs, Meta, OpenAI, Microsoft, and Anthropic, have already locked up years of GPU supply. What's left for everyone else is the scraps.
The structural advantage increasingly belongs to companies that can design their own silicon. ARK Invest estimates that custom ASICs could grow to over a third of the compute market by 2030. Google, Amazon (with its Trainium and Inferentia chips), and Microsoft (with Azure Maia) are all investing heavily in proprietary silicon. The message is clear: at scale, the economics of custom chips beat renting from Nvidia.
## The efficiency race
There's another dimension to this. As chip scarcity persists, the winners won't just be the companies with the most chips. They'll be the ones that extract the most intelligence per watt.
Google's TPU split is a bet on workload specialization, the idea that a chip optimized for inference will dramatically outperform a general-purpose GPU on the tasks that matter most in production. Microsoft's Azure Maia project follows the same logic: design silicon tailored to specific workloads rather than relying on general-purpose hardware.
This is where the oil analogy gets interesting. In the energy industry, efficiency gains, from engine design to refining processes, determined which companies thrived as oil prices fluctuated. The same dynamic is emerging in AI. When compute is scarce and expensive, the ability to do more with less becomes a decisive advantage.
## Power consolidates
The second-order effects of chip scarcity are worth paying attention to.
If chips remain scarce, AI compute stays expensive. If compute stays expensive, only the largest companies can afford to train frontier models. If only the largest companies can train frontier models, power consolidates further. The barriers to entry for AI research and deployment rise, not fall.
This is already happening. The hyperscalers are simultaneously the biggest buyers of chips, the biggest builders of data centers, and increasingly the designers of their own custom silicon. They're not just participants in the AI economy. They're becoming the infrastructure of the AI economy.
For everyone else, the question becomes: where do you sit in this value chain? Are you building on owned infrastructure, or are you a tenant? The answer to that question will increasingly determine who captures value in the AI era and who merely creates it for someone else.
## The multi-polar chip race
It would be a mistake to see this as a simple US-versus-China story. The semiconductor landscape is genuinely multi-polar.
Google is designing its own chips and running them in its own cloud. Intel is pivoting to contract manufacturing and betting its future on Terafab. TSMC still manufactures the vast majority of the world's most advanced chips. Samsung is investing heavily to close the gap. Nvidia dominates the GPU market but faces growing competition from custom silicon at every major cloud provider.
Each of these players has a different strategy, and the outcome depends on which bets pay off. Will Intel's 14A process be competitive with TSMC's most advanced nodes? Will Google's specialized TPUs outcompete general-purpose GPUs for the majority of AI workloads? Will Terafab actually scale to meaningful production volumes?
No single company or country will "win" the chip race outright. But the companies that control their own silicon supply chains will have a structural advantage that compounds over time. Just like oil.
## References
1. [Google Cloud launches two new AI chips to compete with Nvidia](https://techcrunch.com/2026/04/22/google-cloud-next-new-tpu-ai-chips-compete-with-nvidia/) (TechCrunch, April 2026)
2. [Google Splits Its TPU Line to Enter the Era of Agentic Silicon](https://futurumgroup.com/insights/google-splits-its-tpu-line-to-enter-the-era-of-agentic-silicon/) (Futurum Group, April 2026)
3. [260 things we announced at Google Cloud Next '26](https://cloud.google.com/blog/topics/google-cloud-next/google-cloud-next-2026-wrap-up) (Google Cloud Blog, April 2026)
4. [Elon Musk lays out Terafab AI chip project plan](https://www.reuters.com/business/autos-transportation/elon-musk-lays-out-terafab-ai-chip-project-plan-2026-04-23/) (Reuters, April 2026)
5. [Intel signs on to Elon Musk's Terafab chips project](https://techcrunch.com/2026/04/07/intel-signs-on-to-elon-musks-terafab-chips-project/) (TechCrunch, April 2026)
6. [Intel Joins Terafab To Build Elon Musk's \$25 Billion AI Chip Project](https://www.forbes.com/sites/jonmarkman/2026/04/10/intel-joins-terafab-to-build-elon-musks-25b-ai-chip-project/) (Forbes, April 2026)
7. [Terafab](https://en.wikipedia.org/wiki/Terafab) (Wikipedia)
8. [Tesla just increased its spending plan to \$25B, here's where the money is going](https://techcrunch.com/2026/04/22/tesla-just-increased-its-capex-to-25b-heres-where-the-money-is-going/) (TechCrunch, April 2026)
9. [Tesla's \$25 billion spending plan tests investor faith in unproven AI bets](https://www.reuters.com/business/autos-transportation/teslas-25-billion-spending-plan-tests-investor-faith-unproven-ai-bets-2026-04-23/) (Reuters, April 2026)
10. [CHIPS for America](https://www.nist.gov/chips) (NIST)
11. [The CHIPS Act: How U.S. Microchip Factories Could Reshape the Economy](https://www.cfr.org/articles/chips-act-how-us-microchip-factories-could-reshape-economy) (Council on Foreign Relations)
12. [Tech war: US Congress rolls out 'largest' export control upgrade against China](https://www.scmp.com/tech/article/3351199/tech-war-us-congress-rolls-out-largest-export-control-upgrade-against-china) (South China Morning Post, April 2026)
13. [Why AI's Next Phase Will Likely Demand More Computing Power, Not Less](https://deloitte.wsj.com/riskandcompliance/why-ais-next-phase-will-likely-demand-more-computing-powernot-less-b327d666) (Deloitte/WSJ)
14. [The State of AI Cloud Infrastructure](https://io.net/blog/the-state-of-ai-cloud-infrastructure) ([io.net](http://io.net))
15. [The State Of AI Infrastructure: Demand, Costs, And Custom Silicon](https://www.ark-invest.com/articles/analyst-research/the-state-of-ai-infrastructure-demand-costs-custom-silicon) (ARK Invest)
16. [The Rise Of The Neocloud: How Multicloud Strategies Are Evolving](https://www.forbes.com/councils/forbestechcouncil/2026/03/26/the-rise-of-the-neocloud-how-multicloud-strategies-are-evolving/) (Forbes, March 2026)
