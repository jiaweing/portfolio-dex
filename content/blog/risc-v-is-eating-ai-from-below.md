---
title: "RISC-V is eating AI from below"
date: "2026-04-13"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

In April 2026, SiFive closed a \$400 million Series G at a \$3.65 billion valuation. The round was led by Atreides Management, with backing from Apollo Global Management, T. Rowe Price, and, notably, Nvidia. CEO Patrick Little called it the company's last private round before an IPO.
This is worth pausing on. Nvidia, the company that dominates AI infrastructure with proprietary GPUs, is investing hundreds of millions into an open-source chip architecture company. Everyone in AI is arguing about whether Llama or Mistral counts as "truly open." Meanwhile, the real open-source play, the one that could reshape who gets to build and run AI, is happening one layer deeper: at the silicon level.
## The Linux of hardware
RISC-V is an open-standard instruction set architecture (ISA) originally developed at UC Berkeley in 2010. Unlike Arm or x86, RISC-V is royalty-free and modular. Anyone can use it, extend it, and build chips on top of it without paying licensing fees or asking permission.
For years, skeptics dismissed it as an academic curiosity. That era is over. By early 2026, RISC-V had reached an estimated 25% global market penetration across microprocessors, according to SHD Group research cited by RISC-V International. The market is projected to grow from roughly \$2.5 billion in 2025 to over \$10 billion by 2030. Meta, Qualcomm, Google, and Intel are all deploying RISC-V cores in production. SiFive alone has shipped IP featured in over 500 chip designs with more than 10 billion cores in the field.
The analogy to Linux is not hyperbole. Linux took decades to move from hobbyist curiosity to dominant server OS. RISC-V is following the same arc, just in hardware. The difference is that hardware adoption cycles are slower, which means the inflection point is harder to see in real time.
## Open models on closed rails
The current discourse around AI openness focuses almost entirely on models. Is Meta's Llama truly open? Does Mistral's licensing count? These are valid questions, but they miss a structural problem.
If every "open" model runs on proprietary silicon, the openness is conditional. You can download the weights, but you still need Nvidia's GPUs or Arm-licensed chips to run inference at scale. The hardware layer sets the floor for how accessible AI actually is. Open weights on closed rails is a form of openness that only extends as far as the chip vendor allows.
RISC-V challenges this by opening up the layer beneath the models. When chip designers can customize instruction sets for specific AI workloads without licensing fees, the cost of building inference hardware drops. That matters enormously for startups, smaller companies, and developers in regions where cutting-edge GPUs are expensive or unavailable.
## Why Nvidia would fund its own disruptor
This is the question that makes the SiFive deal interesting. Why would Nvidia back a technology that could, in theory, erode its dominance?
The answer is strategic. Nvidia announced in January 2026 that SiFive would be the first RISC-V company to integrate NVLink Fusion, Nvidia's high-bandwidth interconnect for linking CPUs, GPUs, and custom accelerators. In plain terms, Nvidia is making it possible for RISC-V chips to plug directly into Nvidia's AI infrastructure.
This is not altruism. It is a classic platform play. If RISC-V adoption is inevitable, Nvidia would rather have RISC-V CPUs tightly coupled to Nvidia GPUs via NVLink than watch chip designers build entirely independent stacks. By investing in SiFive and opening NVLink Fusion, Nvidia positions itself as the connective tissue of a heterogeneous computing future rather than a vertically integrated incumbent that gets routed around.
Jensen Huang put it directly: "This provides the flexibility to combine customizable RISC-V CPUs with NVIDIA accelerators to build scalable, power-efficient and specialized AI infrastructure."
Controlling the disruption is better than being disrupted.
## The export controls angle
RISC-V's open nature has become a flashpoint in the US-China technology rivalry. Because the ISA is freely available and RISC-V International moved its legal registration to Switzerland in 2020 to signal neutrality, Chinese firms have adopted RISC-V aggressively as a path around US export controls on advanced semiconductors.
By late 2025, China accounted for nearly 50% of global RISC-V shipments. Alibaba's research arm, DAMO Academy, unveiled the XuanTie C950 in March 2026, a 5nm, 3.2 GHz RISC-V processor billed as the highest-performing RISC-V CPU in the world, specifically targeting AI inference workloads. The Chinese government has mandated RISC-V integration into critical infrastructure including finance, energy, and telecommunications.
Some US lawmakers have pushed to restrict Chinese access to RISC-V, but as Berkeley co-creator Krste Asanović has pointed out, export-controlling an open standard that is freely available online is practically impossible. And even if it were possible, China would simply develop its own open-standard architecture. The CSIS and Georgetown's Center for Security and Emerging Technology have both argued that the better US strategy is to invest more heavily in domestic RISC-V development rather than attempt to restrict it.
This creates a fascinating geopolitical dynamic. The same openness that makes RISC-V powerful for democratizing AI also makes it impossible to weaponize through trade policy. It is a technology that, by design, resists the logic of export controls.
## Cheaper inference for everyone
The most practical implication of open-source silicon is cost. Arm charges licensing fees and per-chip royalties. RISC-V charges neither. For companies building custom AI inference chips, this difference compounds at scale.
The modularity matters too. RISC-V's extensible architecture lets designers add custom instructions optimized for specific workloads, whether that is tensor operations, vector processing, or memory access patterns tailored to large language models. SiFive's Intelligence X series, for example, includes configurable vector and matrix extensions designed specifically for AI data center workloads.
For indie developers, startups, and companies in emerging markets, this translates to a future where running AI inference does not require buying into a single vendor's ecosystem. Open chips mean more competition, more options, and ultimately lower costs per inference. It is the same dynamic that made cloud computing accessible once Linux eliminated OS licensing as a cost center.
## What is still early
It is important not to overstate where RISC-V is today. The x86 ecosystem carries decades of software optimization and toolchain maturity. Arm has made extraordinary inroads in data centers through AWS Graviton, Ampere Computing, and Nvidia's own Grace CPU. Arm also launched its first complete chip, the AGI CPU, in 2026, built on 3nm process technology and already sampled by Meta and OpenAI.
SiFive's CEO has acknowledged that chip designs with NVLink Fusion support likely will not be available before 2027. The RISC-V data center story is still largely about IP licensing and design partnerships, not finished chips competing head-to-head with established products at scale.
But that is exactly how Linux looked in 1998. The software was not yet enterprise-ready, the ecosystem was immature, and the incumbents seemed unassailable. The trajectory mattered more than the snapshot.
## The layer that matters most
The AI industry spends enormous energy debating openness at the model layer. That debate matters. But the chip layer is where the structural economics of AI get determined. Who can build inference hardware, at what cost, and with what degree of customization, these questions will shape who actually gets to deploy AI at scale over the next decade.
RISC-V is not going to replace Nvidia GPUs or eliminate Arm overnight. But it is opening up the foundation layer in a way that no amount of open-source model releases can. SiFive's \$3.65 billion valuation, backed by the very company that dominates proprietary AI hardware, is the clearest signal yet that the industry sees where this is heading.
The real open-source AI play is not about weights. It is about silicon.
## References
1. [SiFive raises \$400 million to accelerate high-performance RISC-V data center solutions](https://www.sifive.com/press/sifive-raises-400-million-to-accelerate-high-performance-risc-v-data-center-solutions)
2. [SiFive raises \$400 million from Atreides, Nvidia for data-center chip technology (Reuters)](https://www.reuters.com/business/sifive-raises-400-million-atreides-nvidia-data-center-chip-technology-2026-04-09/)
3. [SiFive to power next-gen RISC-V AI data centers with NVIDIA NVLink Fusion](https://www.sifive.com/press/sifive-nvidia-nvlinkfusion-datacenter)
4. [Meta and Qualcomm push RISC-V market share towards 25% (eeNews Europe)](https://www.eenewseurope.com/en/meta-qualcomm-risc-v-market-share-25-2/)
5. [RISC-V Annual Report 2025 (RISC-V International)](https://riscv.org/wp-content/uploads/2026/01/RISC-V-Annual-Report-2025.pdf)
6. [Alibaba unveils next-gen chip for agentic AI (Reuters)](https://www.reuters.com/world/asia-pacific/alibaba-develops-next-gen-chip-agentic-ai-chinese-media-says-2026-03-24/)
7. [Sustaining standards leadership: the United States cannot disengage from RISC-V (CSIS)](https://www.csis.org/analysis/sustaining-standards-leadership-united-states-cannot-disengage-risc-v)
8. [Amid US-China chip rivalry, open-standard designers warn their vision is at risk (NPR)](https://www.npr.org/2026/03/11/nx-s1-5719502/amid-u-s-china-chip-rivalry-open-standard-designers-warn-their-vision-is-at-risk)
9. [SiFive's \$400M round signals a RISC-V moment in AI data centers (Forbes)](https://www.forbes.com/sites/davealtavilla/2026/04/09/sifives-400m-round-signals-a-risc-v-moment-in-ai-data-centers/)
10. [The open silicon revolution: RISC-V hits 25% global market share](https://markets.financialcontent.com/wral/article/tokenring-2026-1-1-the-open-silicon-revolution-risc-v-hits-25-global-market-share-as-the-third-pillar-of-computing)
11. [Arm steps deeper into silicon: implications for the semiconductor value chain (Omdia)](https://omdia.tech.informa.com/blogs/2026/apr/arm-steps-deeper-into-silicon-implications-for-the-semiconductor-value-chain)
12. [Reduced Instruction Set Computer V (RISC-V) market report 2026 (Yahoo Finance)](https://finance.yahoo.com/sectors/technology/articles/alibaba-unveils-risc-v-ai-170308644.html)
