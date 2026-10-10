---
title: "Your AI runs on rented silicon"
date: "2026-04-24"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["GPU","Chips","Hardware","Cloud","Data Centers","Models","Open Source","Moats","Economics","Regulation","Geopolitics","Google","Microsoft","Apple","Meta","OpenAI","xAI"]
---

Everyone is watching the model war. OpenAI versus Google versus Anthropic versus Meta, each release a new headline. But the war that actually determines who wins, and who gets to play at all, is happening one layer deeper. It's about silicon.
Who makes the chips. Who controls the fabs. Who bundles AI into the hardware you already own. That's where the real power is consolidating, and two recent moves make the stakes impossible to ignore: NVIDIA embedding Google's Gemma 4 directly into its consumer GPU ecosystem, and Elon Musk announcing Terafab, a \$25 billion semiconductor fabrication plant in Texas built with Intel.
The model war is loud. The silicon war is quiet. And the quiet one matters more.
## NVIDIA's play: making local AI the default
On April 2, 2026, Google DeepMind released Gemma 4, its most capable open model family to date. Within hours, NVIDIA announced that Gemma 4 was optimized to run natively on RTX GPUs, DGX Spark, and Jetson edge devices.
This wasn't a coincidence. It was a strategy.
NVIDIA has been steadily turning its consumer hardware into an AI-ready platform. The RTX AI Garage initiative, the TensorRT optimizations, the partnerships with open model providers, it's all building toward the same thing: making local AI inference a first-class experience on hardware people already own.
Gemma 4 is a perfect vehicle for this. The 31B parameter model fits on a single NVIDIA H100 GPU unquantized. At 4-bit quantization, it runs on a consumer RTX 4090. The mixture-of-experts variant activates only 3.8 billion of its 26 billion parameters during inference, delivering reasoning quality competitive with much larger dense models at speeds closer to a 4B model. That's not a research curiosity. That's a product.
The implication is significant. When NVIDIA bundles frontier-class open models into the same ecosystem where people game and edit video, it normalizes local AI. It makes running your own model as unremarkable as running Photoshop. And critically, it makes NVIDIA's CUDA software stack even stickier, because every developer building local AI applications is building on NVIDIA's platform.
## Terafab: the \$25 billion bet on domestic silicon
While NVIDIA is cornering the software and inference layer, the hardware manufacturing layer is getting its own shake-up.
On March 21, 2026, Elon Musk announced Terafab, a vertically integrated semiconductor fabrication plant to be built on Tesla's campus in Austin, Texas. The project is a joint venture between Tesla, SpaceX, xAI, and Intel, with a reported price tag of \$25 billion.
The ambition is staggering. Terafab aims to produce more than one terawatt of AI compute capacity per year. For context, that's roughly 70% of TSMC's current global output, from a single facility. The plant would consolidate chip design, fabrication, lithography, memory production, advanced packaging, and testing under one roof.
Intel's role as the foundry partner is the detail that makes this more than a vanity project. Intel Foundry has been aggressively courting external customers as it tries to reinvent itself, and the Terafab partnership gives it a marquee client with massive volume. Tesla's fifth-generation AI chip, AI5, is among the first products targeted for the facility, with small-batch production anticipated in 2026 and volume production in 2027.
Two separate facilities are planned: one for automotive and robotics chips (Full Self-Driving, Cybercab, Optimus), and a second for high-performance AI data center infrastructure. This isn't just about making chips for Tesla cars. It's about building a parallel compute supply chain.
## The TSMC dependency problem
Terafab makes more sense when you consider the fragility of the current semiconductor supply chain.
TSMC in Taiwan manufactures the vast majority of the world's most advanced chips. NVIDIA's GPUs, Apple's M-series processors, AMD's data center chips, they're all fabbed by TSMC. This creates an extraordinary concentration risk. A single natural disaster, a geopolitical crisis in the Taiwan Strait, or even a prolonged power outage could disrupt the global AI supply chain overnight.
The U.S. government has been trying to address this through the CHIPS Act and export controls. But government incentives move slowly, and export controls create their own complications. The restrictions on selling advanced chips to China have pushed Chinese companies to accelerate their own chip development programs, while simultaneously limiting the revenue that American chipmakers can reinvest in domestic capacity.
Terafab represents a private-sector answer to the same problem. Instead of waiting for government subsidies to build fabs over a decade, Musk is throwing \$25 billion at building one now, with a partner (Intel) that already has the process technology.
Whether Terafab actually delivers on its promises is an open question. Building cutting-edge fabs is one of the hardest industrial challenges on the planet. But the intent signals something important: the people building AI infrastructure no longer trust the existing supply chain to be there when they need it.
## The cloud concentration trap
The silicon war isn't just about who makes chips. It's also about who controls access to the compute those chips provide.
Right now, three companies dominate cloud infrastructure: Amazon Web Services (31% market share), Microsoft Azure (25%), and Google Cloud (10-11%). Together, they control roughly two-thirds of the global cloud market. For most AI startups, these three providers are the only realistic option for training and running models at scale.
This creates what looks like choice but functions like dependency. You can pick AWS or Azure or GCP, but you can't pick "none of the above." If you're building an AI product, your entire stack, your training runs, your inference endpoints, your data pipelines, sits on infrastructure owned by companies that are also your competitors in the AI market.
The October 2025 AWS outage illustrated the risk. When a single cloud provider goes down, it doesn't just affect the companies renting its servers. It cascades through every product built on that infrastructure. AI applications that depend on cloud inference simply stop working.
This isn't a theoretical concern. Andreessen Horowitz has documented that many AI companies spend more than 80% of their total capital raised on compute resources. That's not a technology cost. That's a landlord relationship.
## The real democratization story
This is where the two threads, NVIDIA's bundling strategy and the push for domestic fabrication, converge into something that matters for individual builders.
The conventional narrative about AI democratization focuses on cheaper API prices. Inference costs have dropped dramatically, and that's genuinely helpful. But cheaper rent is still rent. You're still dependent on someone else's infrastructure, someone else's pricing decisions, someone else's terms of service.
The more meaningful form of democratization is local inference on consumer hardware. When a \$750 GPU can run a model that competes with cloud-hosted frontier systems, the economics of AI shift fundamentally. You're not paying per token. You're not subject to rate limits. Your data never leaves your machine.
This is happening faster than most people expected. Gemma 4's mixture-of-experts architecture means you can get quality comparable to much larger models while using a fraction of the compute. Quantization techniques keep improving, fitting larger models into smaller memory footprints. And NVIDIA's optimization work means these models aren't just technically runnable on consumer hardware, they're actually fast.
The r/LocalLLaMA community has been asking whether 2026 is the year local AI becomes the default rather than the alternative. Based on what NVIDIA is doing with model bundling and what the hardware can now support, the answer is increasingly yes, at least for inference.
## What this means for the GPU market
NVIDIA's position looks dominant, but the landscape is shifting.
AMD has secured massive AI deals. OpenAI committed to a 6-gigawatt multi-generation build around AMD's MI450 GPU platform. Meta followed with a \$60 billion five-year supply commitment, including a custom MI450 variant tuned to its internal workloads. Oracle is deploying 50,000 MI450 GPUs starting in Q3 2026. These aren't experimental pilots. They're hyperscale infrastructure commitments that give AMD real credibility in the data center.
Apple Silicon is advancing on a different axis. The M5 chip benchmarks roughly 45% faster in GPU performance than the M4, and Apple's rate of improvement is outpacing NVIDIA's consumer line in some metrics. Apple's ecosystem limitations (Metal instead of CUDA, no Vulkan support) remain significant barriers for AI workloads, but the raw capability is there.
Custom silicon is the dark horse. Google's TPUs, Amazon's Trainium and Inferentia chips, and the growing market for application-specific AI chips are all eating into the general-purpose GPU market from different angles. The AI ASIC market is projected to grow from \$15 billion in 2025 to nearly \$28 billion by 2034.
NVIDIA's moat has always been CUDA, the software ecosystem that makes its hardware the path of least resistance for AI developers. But as models get more efficient and frameworks get better at targeting multiple backends, that moat could narrow.
## Practical takeaways
If you're building AI products, the silicon layer deserves as much attention as the model layer.
**Diversify your compute.** If your entire AI stack runs on a single cloud provider, you have a single point of failure. Explore multi-cloud strategies, and seriously evaluate whether some workloads can move to local or edge inference.
**Watch the hardware, not just the models.** The next breakthrough in AI accessibility is more likely to come from a chip architecture change or a quantization improvement than from a new model release. Hardware determines what's possible. Models determine what's useful.
**Take local inference seriously.** If you're an indie builder or a small team, a consumer GPU running a well-optimized open model might be all you need for inference. The cost savings compound quickly when you're not paying per token.
**Pay attention to supply chain politics.** Export controls, fab locations, and manufacturing partnerships are shaping who gets access to what compute. This isn't just geopolitics. It directly affects chip availability and pricing.
The AI war everyone is watching, the model war, is being fought on rented silicon. The companies that will have lasting power are the ones that own the silicon, build the fabs, and control the hardware stack. That's the war worth paying attention to.
## References
1. [From RTX to Spark: NVIDIA Accelerates Gemma 4 for Local Agentic AI](https://blogs.nvidia.com/blog/rtx-ai-garage-open-models-google-gemma-4/), NVIDIA Blog, April 2026
2. [Bringing AI Closer to the Edge and On-Device with Gemma 4](https://developer.nvidia.com/blog/bringing-ai-closer-to-the-edge-and-on-device-with-gemma-4/), NVIDIA Technical Blog, April 2026
3. [Gemma 4 Arrives: Google Drops Restrictions, Embraces True Open Models](https://www.eweek.com/news/google-gemma-4-apache-2-open-models/), eWeek, April 2026
4. [Intel Joins Terafab To Build Elon Musk's \$25 Billion AI Chip Project](https://www.forbes.com/sites/jonmarkman/2026/04/10/intel-joins-terafab-to-build-elon-musks-25b-ai-chip-project/), Forbes, April 2026
5. [Terafab](https://en.wikipedia.org/wiki/Terafab), Wikipedia
6. [Elon Musk to build advanced chip factories in Austin, Texas, for SpaceX and Tesla](https://www.manufacturingdive.com/news/elon-musk-build-advanced-chip-factories-austin-texas-spacex-tesla-xai/815542/), Manufacturing Dive, March 2026
7. [The Cloud Computing Risk for the Economy That Many Don't See Coming](https://www.investopedia.com/cloud-computing-risk-for-the-economy-11777456), Investopedia
8. [Geopolitical Risks of Over-Reliance on Foreign Cloud Providers](https://www.linkedin.com/pulse/geopolitical-risks-over-reliance-foreign-cloud-andre-oazje), LinkedIn
9. [Navigating the High Cost of AI Compute](https://a16z.com/navigating-the-high-cost-of-ai-compute/), Andreessen Horowitz
10. [U.S. Export Controls and China: Advanced Semiconductors](https://www.congress.gov/crs-product/R48642), Congressional Research Service
11. [AMD's AI Deals Provide Visibility on Future Revenue Through 2027](https://www.investing.com/analysis/amds-ai-deals-provide-visibility-on-future-revenue-through-2027-200678987), [Investing.com](http://Investing.com)
12. [What to Buy for Local LLMs (April 2026)](https://julsimon.medium.com/what-to-buy-for-local-llms-april-2026-a4946a381a6a), Julien Simon, Medium
