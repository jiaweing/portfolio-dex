---
title: " The state of renting GPUs"
date: "2026-05-18T13:04:00.000+08:00"
lastEdited: "2026-05-17T16:04:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["GPU","Cloud","Hardware","Pricing","Data Centers"]
---

If you're training models, running inference, or just experimenting with AI, you've probably noticed that GPU costs can spiral fast. The good news is that the market for renting GPUs has exploded over the past couple of years, and prices have dropped significantly. The bad news is that the number of providers, pricing models, and hardware options can make comparison shopping genuinely confusing.
This post breaks down the current state of renting GPUs across several popular providers, including Thunder Compute, Vultr, CoreWeave, Hetzner, and a handful of others worth knowing about.
## The overview
Before diving into each provider, here's a side-by-side look at on-demand pricing for the most commonly rented GPU models. All prices are per GPU per hour, based on publicly listed on-demand rates as of early 2026.
<table fit-page-width="true" header-row="true" header-column="true">
<tr>
<td>**Provider**</td>
<td>**A100 80GB**</td>
<td>**H100**</td>
<td>**L40S**</td>
<td>**RTX A6000**</td>
<td>**Billing**</td>
<td>**Pricing model**</td>
</tr>
<tr>
<td>**Thunder Compute**</td>
<td>\$0.78</td>
<td>\$1.38</td>
<td>N/A</td>
<td>\$0.27</td>
<td>Per minute</td>
<td>All-inclusive</td>
</tr>
<tr>
<td>**Vultr**</td>
<td>\$2.40 (PCIe) / \$2.80 (SXM)</td>
<td>\$2.99 (SXM)</td>
<td>\$1.67</td>
<td>N/A</td>
<td>Hourly</td>
<td>All-inclusive</td>
</tr>
<tr>
<td>**CoreWeave**</td>
<td>\$2.21 (GPU only)</td>
<td>\$4.76 (GPU only)</td>
<td>\$2.25</td>
<td>N/A</td>
<td>Hourly</td>
<td>À la carte</td>
</tr>
<tr>
<td>**Hetzner**</td>
<td>N/A</td>
<td>N/A</td>
<td>N/A</td>
<td>N/A</td>
<td>Monthly</td>
<td>Fixed server</td>
</tr>
<tr>
<td>**Lambda Labs**</td>
<td>\$1.29 (40GB)</td>
<td>\$2.49 (PCIe) / \$3.29 (SXM)</td>
<td>N/A</td>
<td>\$0.80</td>
<td>Hourly</td>
<td>All-inclusive</td>
</tr>
<tr>
<td>**RunPod**</td>
<td>\$1.19 (community)</td>
<td>\$2.79 (community)</td>
<td>N/A</td>
<td>N/A</td>
<td>Hourly</td>
<td>All-inclusive</td>
</tr>
<tr>
<td>[**Vast.ai**](http://Vast.ai)</td>
<td>From \~\$0.52</td>
<td>From \~\$1.65</td>
<td>Varies</td>
<td>Varies</td>
<td>Hourly</td>
<td>Marketplace</td>
</tr>
</table>
A few things jump out. Thunder Compute's prototyping-tier pricing is significantly below everyone else for A100 and H100 instances. Hetzner doesn't offer data center GPUs like the A100 or H100 at all, opting instead for workstation-class RTX cards in dedicated servers. CoreWeave's listed GPU prices don't include CPU, RAM, or storage, which inflates the real cost. And marketplace providers like [Vast.ai](http://Vast.ai) can be cheaper still, but with reliability trade-offs.
## Thunder Compute
Thunder Compute has positioned itself as the cheapest on-demand GPU cloud for developers. Its headline prices are hard to beat: \$0.78/hr for an A100 80GB and \$1.38/hr for an H100 PCIe, both in "prototyping" mode. For production workloads with NVLink and stronger performance guarantees, the prices go up to \$1.79/hr (A100 80GB NVLink) and \$2.49/hr (H100 PCIe NVLink), which is still competitive.
### What makes it cheap
Thunder Compute uses proprietary software optimizations to improve scheduling efficiency on their infrastructure. The result is that they waste less capacity and pass the savings along. You get the same GPU hardware, just at a lower price point.
### The fine print
The prototyping tier comes with a caveat: performance may vary. Thunder Compute is upfront about this. If you're doing development, experimentation, or fine-tuning runs where occasional variability is acceptable, prototyping mode is a great deal. For inference servers or long-running production jobs, the production tier is the better fit.
Billing is per minute, which is a nice touch for short tasks. Storage is \$0.10/GB/month for active instances and \$0.05/GB/month for snapshots. Additional vCPUs run \$0.06/GB/month. Instances come with 4 vCPUs, 32GB RAM, and 100GB storage by default, all expandable.
Thunder Compute currently operates from North American data centers only, which could be a limitation if you need low-latency access from Europe or Asia.
## Vultr
Vultr is a well-established cloud provider that has steadily expanded its GPU lineup. It now offers everything from NVIDIA L40S and A100s all the way up to H100 SXM nodes, plus AMD Instinct MI300X, MI325X, and MI355X accelerators. That's a wider hardware selection than most competitors.
### Pricing breakdown
Vultr's on-demand pricing for VMs is straightforward and all-inclusive (GPU, vCPUs, RAM, storage, and bandwidth bundled together):
- **L40S**: \$1.671/GPU/hr (1 to 8 GPUs)
- **A100 80GB PCIe**: \$2.397/hr (single GPU)
- **A100 80GB SXM** (HGX, 8-GPU node): \$2.80/GPU/hr
- **H100 SXM** (HGX, 8-GPU node): \$2.99/GPU/hr
For bare metal servers, prepaid contract pricing brings costs down considerably. A 36-month commitment on L40S bare metal drops to \$0.848/GPU/hr, and A100 PCIe bare metal starts at \$1.29/GPU/hr. H100 SXM bare metal starts at \$2.30/GPU/hr with a 36-month prepaid term.
### Strengths
Vultr's biggest advantage is its global footprint. With data centers across North America, Europe, Asia, and beyond, latency-sensitive workloads have plenty of options. The platform is also easy to use, instances spin up in minutes, and the pricing is transparent with no hidden resource charges.
### Considerations
On-demand GPU pricing at Vultr is not the cheapest in the market. For single A100 or H100 instances, you're paying a premium over providers like Thunder Compute or Lambda Labs. The value proposition improves significantly with longer-term commitments or bare metal configurations, but if you're looking for pay-as-you-go flexibility at the lowest possible rate, there are cheaper options.
## CoreWeave
CoreWeave built its reputation as a GPU-first cloud provider and remains a popular choice for large-scale AI workloads. It offers a wide range of NVIDIA hardware, including A100, H100, L40S, B200, and custom HGX node configurations.
### The à la carte pricing model
The most important thing to understand about CoreWeave is that its pricing is component-based. You pay separately for the GPU, CPU cores, RAM, and storage. The published prices you'll see on their pricing page, like \$2.21/hr for an A100 80GB or \$4.76/hr for an H100 PCIe, reflect the GPU cost alone.
In practice, once you add the CPU, RAM, and storage needed to actually run a workload, the total hourly cost is meaningfully higher. For an A100 80GB setup with adequate resources, expect to pay closer to \$3.00/hr or more. For 8x H100 HGX nodes, the published rate is roughly \$49.24/hr for the full node (about \$6.15 per GPU when bundled).
### When CoreWeave makes sense
CoreWeave's strength is in large-scale, sustained workloads. Reserved capacity agreements can reduce costs by up to 60% compared to on-demand, and the platform is built for high-performance multi-GPU training. It also charges no data transfer fees, which is a meaningful advantage for data-heavy pipelines.
For smaller or more price-sensitive workloads, the à la carte pricing model can be frustrating. It's harder to predict your monthly bill, and the base GPU price can be misleading if you're comparing it directly against all-inclusive providers.
## Hetzner
Hetzner is the outlier on this list. It's not a GPU cloud platform in the same sense as the others. Instead, it offers dedicated physical servers with workstation-class NVIDIA GPUs, hosted in European data centers.
### What's available
Hetzner currently offers two GPU server configurations:
- **GEX44**: Intel Core i5-13500, 64GB DDR4 RAM, NVIDIA RTX 4000 SFF Ada (20GB VRAM). Priced at approximately \$205/month (\~\$0.28/hr).
- **GEX131**: Intel Xeon Gold 5412U, 256GB DDR5 ECC RAM, NVIDIA RTX PRO 6000 Blackwell Max-Q (96GB VRAM). Starting from approximately \$988/month (\~\$1.37/hr).
Neither server offers multi-GPU configurations. There are no A100 or H100 options.
### The Hetzner use case
Hetzner is not competing with cloud GPU providers on raw AI training performance. Its appeal is price stability and simplicity. You get a fixed monthly cost for a dedicated server with root access, IPMI, and no shared resources. For workloads like running inference on smaller models, hosting AI-powered applications, or experimenting with diffusion models, the GEX44 at roughly \$205/month is hard to beat on value.
The trade-offs are clear. No data center GPUs, European locations only (Germany and Finland), single-GPU configurations, and setup fees (\$312 for the GEX44, \$1,835 for the GEX131). Hetzner is also raising prices as of April 2026 due to rising hardware costs, with GPU server prices increasing by roughly 15-16%.
For teams that need H100s or A100s, or multi-GPU setups for training, Hetzner is not the right fit. For budget inference and development, especially in Europe, it remains an excellent option.
## Other providers worth considering
### Lambda Labs
Lambda offers a clean, developer-friendly experience with pre-configured ML environments. Pricing is straightforward: \$1.29/hr for an A100 40GB, \$2.49/hr for an H100 PCIe, and \$3.29/hr for an H100 SXM. No hidden fees. The main drawback is availability. Lambda frequently runs out of capacity for popular GPU types, which can be a blocker for time-sensitive work.
### RunPod
RunPod offers a two-tier model. Its Community Cloud uses shared infrastructure at lower prices (A100 80GB from \$1.19/hr, H100 from \$2.79/hr), while Secure Cloud adds enterprise features at a premium. RunPod also has a serverless option for inference workloads where you pay only when your code runs. It's popular with AI developers thanks to 50+ pre-configured templates for tools like Stable Diffusion and ComfyUI.
### [Vast.ai](http://Vast.ai)
[Vast.ai](http://Vast.ai) operates as a peer-to-peer GPU marketplace where individual hosts rent out their hardware. This produces the lowest prices in the market, with A100s sometimes available from \$0.52/hr and H100s from around \$1.65/hr for interruptible instances. The trade-off is reliability. Hardware quality, network speed, and uptime vary by host. [Vast.ai](http://Vast.ai) is best for research and experimentation where you can checkpoint your work and tolerate interruptions.
### TensorDock
TensorDock offers marketplace pricing with better security guarantees than [Vast.ai](http://Vast.ai), using KVM isolation instead of containers. H100 SXM5 instances start at \$2.25/hr on-demand, with spot pricing from \$1.91/hr. It's a solid middle ground between marketplace pricing and enterprise reliability.
## How to think about pricing
Raw hourly rates don't tell the whole story. Here are the factors that actually determine your effective cost:
### All-inclusive vs. à la carte
Providers like Thunder Compute, Vultr, and Lambda bundle CPU, RAM, and storage into the GPU price. CoreWeave does not. When comparing, always calculate the total hourly cost for a usable instance, not just the GPU line item. An A100 at \$2.21/hr (GPU only) with \$0.80/hr in added resources is really \$3.01/hr.
### Billing granularity
Per-minute billing (Thunder Compute) saves money on short tasks compared to per-hour billing. If you frequently run 20-minute experiments, you'll pay for 20 minutes instead of a full hour.
### Commitment discounts
Vultr's 36-month prepaid pricing drops L40S bare metal to \$0.848/GPU/hr, roughly half the on-demand rate. CoreWeave's reserved capacity can save up to 60%. If you have predictable, sustained workloads, these commitments are worth exploring.
### Reliability and availability
The cheapest option isn't useful if the instance gets interrupted or is never available. Marketplace providers ([Vast.ai](http://Vast.ai), TensorDock) and community tiers (RunPod) carry more risk than dedicated cloud providers. Factor in the cost of lost compute time from interruptions.
### Data transfer
Most GPU cloud providers don't charge for data transfer, but some do. Check before committing, especially for data-heavy workloads.
## The bottom line
The GPU rental market in 2026 is more competitive than it has ever been. H100 prices have fallen from \$8+/hr to under \$3/hr at most providers, and A100s are available for under \$1/hr if you know where to look.
For pure on-demand pricing with no commitment, **Thunder Compute is the cheapest mainstream option** for A100 and H100 instances. Its prototyping tier at \$0.78/hr (A100) and \$1.38/hr (H100) undercuts everyone else significantly, though with the understanding that performance guarantees are lighter than production-tier offerings.
**Vultr** is a strong choice if you want a traditional cloud experience with global reach and a wide GPU selection, especially at committed pricing tiers. **CoreWeave** remains the go-to for large-scale, multi-GPU training workloads where reserved capacity agreements bring costs in line. **Hetzner** is the budget pick for inference and development in Europe, as long as you don't need data center GPUs. And [**Vast.ai**](http://Vast.ai) is unbeatable on raw price if you can handle the variability of a marketplace.
The right provider depends on your workload, your tolerance for complexity, and how much you value price stability over raw cost. But the trend is clear: renting GPUs is getting cheaper, and the options are better than ever.
## References
1. Thunder Compute pricing, [https://www.thundercompute.com/pricing](https://www.thundercompute.com/pricing)
2. Vultr Cloud GPU pricing, [https://www.vultr.com/pricing/](https://www.vultr.com/pricing/)
3. CoreWeave classic GPU pricing, [https://www.coreweave.com/pricing/classic](https://www.coreweave.com/pricing/classic)
4. Hetzner dedicated GPU servers, [https://www.hetzner.com/dedicated-rootserver/matrix-gpu/](https://www.hetzner.com/dedicated-rootserver/matrix-gpu/)
5. GetDeploying GPU price comparison, [https://getdeploying.com/gpus](https://getdeploying.com/gpus)
6. Northflank, "7 cheapest cloud GPU providers in 2026," [https://northflank.com/blog/cheapest-cloud-gpu-providers](https://northflank.com/blog/cheapest-cloud-gpu-providers)
7. Thunder Compute, "CoreWeave GPU pricing guide (February 2026)," [https://www.thundercompute.com/blog/coreweave-gpu-pricing-review](https://www.thundercompute.com/blog/coreweave-gpu-pricing-review)
8. Hetzner price adjustment documentation, [https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/](https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/)
