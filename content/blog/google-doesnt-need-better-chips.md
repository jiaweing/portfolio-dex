---
title: "Google doesn't need better chips"
date: "2026-04-23"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Google","Chips","Hardware","Cloud","Startups","Moats"]
---

Google just announced a new generation of inference-optimized AI chips, built in partnership with Marvell, Broadcom, and MediaTek. The headlines frame it as Google taking on Nvidia. Bloomberg calls it a challenge. Analysts are comparing chip specs. But this framing misses the point entirely.
Google doesn't need better chips to win the AI war. They already own the distribution.
## The chip race is a distraction
Every time a hyperscaler announces a new AI chip, the media slots it into a familiar narrative: who's beating Nvidia? The answer, for now, is nobody, at least not on training. Nvidia commands roughly 80% of the AI chip market. Its CUDA ecosystem is deeply entrenched, with over 15 years of developer tools, libraries, and accumulated expertise baked into the way researchers and engineers write AI code. Universities teach CUDA. Research papers benchmark on CUDA. Rewriting CUDA-based systems for alternatives isn't just a technical challenge, it's an organizational one.
But here's the thing: Google isn't trying to win that game.
Google's new inference chips, including the Ironwood TPU (its seventh generation) and the upcoming TPUv8 lineup with codenames like "Sunfish" for training and "Zebrafish" for inference, aren't designed to out-benchmark Nvidia's H100 or Blackwell. They're designed to make Google's own services cheaper to run. That's a fundamentally different objective, and it's the one that actually matters.
## Inference is where the money lives
The AI industry spent years obsessing over training costs. Building a frontier model requires hundreds of millions of dollars, months of compute, and a team of researchers most companies can't afford. That was the constraint everyone worried about.
Then inference quietly became the bigger problem.
Training happens once. Inference happens every time someone asks a question, runs a search, generates an image, or triggers an AI agent. Industry estimates now put inference at 60 to 80% of an AI system's total lifecycle cost. Deloitte estimated that inference workloads account for nearly two-thirds of all AI compute in 2026, up from just one-third in 2023. One analysis suggests inference costs 15x more than training over a model's lifetime.
The math is simple: training hurts once, inference bleeds forever.
When OpenAI shut down Sora in early 2026, the numbers told the story. The platform was reportedly burning \$15 million per day in inference costs while generating roughly \$2.1 million in lifetime revenue. That's not a pricing problem. That's a structural one.
Google processes billions of queries per day across Search, YouTube, Maps, Gmail, and now Gemini. Every one of those interactions is an inference call. If you can shave even a small percentage off the cost of each call, the savings at Google's scale are enormous. That's what these chips are for.
## Vertical integration, not chip competition
The right comparison for Google's chip strategy isn't Nvidia. It's Apple.
Apple doesn't make chips to sell chips. Apple makes chips to serve its ecosystem. The M-series silicon exists so that MacBooks are thinner, faster, and more power-efficient than they'd be with off-the-shelf processors. Apple's chips don't need to win every benchmark. They need to make Apple products better.
Google is doing the same thing, just at data center scale. Its TPUs exist to make Search faster, Cloud cheaper, and Gemini more affordable to run. The Ironwood TPU delivers 4.6 petaFLOPS of FP8 performance per chip, comparable to Nvidia's B200. But the real story is the system-level design: up to 9,216 chips connected in a single pod, with 192 GB of HBM3E per chip and 7.2 TBps of memory bandwidth. Google is designing at the rack level, not the chip level, tightly integrating hardware, networking, and software.
This is vertical integration at a depth that almost no other AI company can match. Google owns the models (Gemini), the chips (TPUs), the cloud infrastructure (GCP), the developer tools, and the consumer products that generate the demand. When TPU architecture informs model design, and model behavior shapes serving optimizations, and product usage feeds back into training, the whole stack compounds. That's a flywheel, not a chip.
## Different moats, different games
Nvidia's moat is CUDA and training workloads. It's a developer ecosystem moat, built over decades of making GPUs indispensable to researchers. It's real and it's deep.
Google's moat is billions of users who never switch. Search handles over 8.5 billion queries per day. YouTube has over 2 billion monthly active users. Android runs on roughly 3 billion devices. Chrome dominates browser market share. These aren't products people use because of what chips power them. They're products people use because of habit, convenience, and network effects.
The chip announcement doesn't change this equation. It reinforces it. Google's chips make Google's services cheaper to operate, which means better margins, which means more capital to invest in models and infrastructure, which means better products, which means more users. The flywheel spins.
Nvidia is winning the "sell picks and shovels" game. Google is winning the "own the gold mine" game. They're not competing for the same thing.
## The supply chain tells the real story
Look at how Google is structuring its chip partnerships. Broadcom handles the training variant of TPUv8. MediaTek handles the inference variant. Marvell is involved in a two-chip TPU plan. Each partner knows the other exists, which gives Google negotiating leverage while distributing risk.
This isn't how you build a chip business. This is how you build a supply chain for an internal platform. Google isn't trying to become a chip company. It's trying to ensure it never depends on one.
Meanwhile, the demand signals are telling. Meta signed a multibillion-dollar deal to rent Google's TPUs. Anthropic expanded its TPU access to as many as one million chips and signed a separate deal with Broadcom for roughly 3.5 gigawatts of computing capacity starting in 2027. Google's cloud revenue hit \$15.15 billion in Q3 2025, up 34% year over year, with TPU demand as one of the key growth drivers.
Google is becoming an infrastructure provider almost by accident, simply because its internal chips turned out to be good enough that other companies want access too.
## What this means for startups
If you're a startup building on cloud GPU providers, this matters. The long-term trend is clear: the hyperscalers are building their own silicon, optimized for their own workloads. Nvidia GPUs aren't going away, but the pricing dynamics will shift as Google, Amazon, and others offer increasingly competitive alternatives through their clouds.
The implication is that your choice of cloud provider becomes a deeper commitment than it used to be. If you build on GCP and optimize for TPUs, you get Google's cost advantages but you're locked into Google's ecosystem. If you stay on Nvidia GPUs, you keep portability but may pay a premium as the hyperscalers route their best hardware and pricing to their own custom silicon.
The "chip race" framing suggests that the best chip wins. The reality is that the best ecosystem wins. And ecosystems are built on distribution, not transistors.
## The real takeaway
Google's chip announcement isn't about challenging Nvidia. It's about cost structure. It's about owning every layer of the stack so that the marginal cost of serving an AI query trends toward zero. It's about making sure that when inference demand grows 10x (and it will), Google's economics scale better than everyone else's.
Nvidia is the most important company in AI hardware. Google might be the most important company in AI infrastructure. Those sound like the same thing, but they're not. Hardware is a component. Infrastructure is a system. And systems beat components, every time.
## References
1. [Bloomberg: Google Eyes New Chips to Speed Up AI Results, Challenging Nvidia](https://www.bloomberg.com/news/features/2026-04-20/google-eyes-new-chips-to-speed-up-ai-results-challenging-nvidia)
2. [Google Blog: Ironwood, The First Google TPU for the Age of Inference](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/ironwood-tpu-age-of-inference/)
3. [The Next Web: Google Assembles Four-Partner Chip Supply Chain to Challenge Nvidia in Inference](https://thenextweb.com/news/google-inference-chips-nvidia-challenge-supply-chain)
4. [WCCFTech: Google Splits TPUv8 Strategy Into Two Chips](https://wccftech.com/google-splits-tpuv8-strategy-two-chips-broadcom-training-mediatek-inference-duties/)
5. [Forbes: The Inference Ceiling, Managing the Marginal Costs of AI](https://www.forbes.com/councils/forbesbusinesscouncil/2026/03/03/the-inference-ceiling-managing-the-marginal-costs-of-ai/)
6. [MindStudio: Inference Costs Are the New AI Wall, What Sora's Shutdown Tells Us](https://www.mindstudio.ai/blog/inference-costs-ai-wall-sora-shutdown/)
7. [CNBC: Google's Decade-Long Bet on Custom Chips Is Turning Into Company's Secret Weapon](https://www.cnbc.com/2025/11/07/googles-decade-long-bet-on-tpus-companys-secret-weapon-in-ai-race.html)
8. [HPCwire: Google Aims to Flip the Script on AI Inference with New Ironwood TPUs](https://www.hpcwire.com/2025/11/10/google-aims-to-flip-the-script-on-ai-inference-with-new-ironwood-tpus/)
9. [Reuters: Broadcom Signs Long-Term Deal to Develop Google's Custom AI Chips](https://www.reuters.com/business/broadcom-signs-long-term-deal-develop-googles-custom-ai-chips-2026-04-06/)
10. [Stephen Smith: Why Google's Vertical Integration Creates a Formidable Moat in the AI Race](https://www.smithstephen.com/p/why-googles-vertical-integration)
11. [Medium: NVIDIA's CUDA Moat, How Developer Lock-In Built a Trillion-Dollar AI Empire](https://medium.com/@productbrief/nvidias-cuda-moat-how-developer-lock-in-built-a-trillion-dollar-ai-empire-40d2f7f7dca2)
12. [Quartz: Google Developing Inference AI Chips with Marvell to Challenge Nvidia](https://qz.com/google-marvell-inference-ai-chips-nvidia-042026)
