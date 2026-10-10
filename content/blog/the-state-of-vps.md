---
title: "The state of VPS"
date: "2026-05-14T13:12:00.000+08:00"
lastEdited: "2026-05-13T16:03:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["VPS","Cloud","Pricing","Hardware","Data Centers","US","Singapore"]
---

The VPS market in 2026 looks very different from a few years ago. Providers have raised prices, acquisitions have reshuffled the landscape, and the gap between budget hosts and hyperscalers has narrowed in some surprising ways. If you're choosing a VPS today, whether for a side project, a production app, or a self-hosted stack, the decision is no longer as straightforward as picking the cheapest option and calling it a day.
This post breaks down the current state of VPS hosting, covering the major independent providers, the big cloud platforms, and the tradeoffs you'll actually care about.
## The budget tier
### Contabo: cheap, but you get what you pay for
Contabo is the provider people recommend when price is the only thing that matters. Their Cloud VPS 10 plan starts at around €3.60/month and gives you 4 vCPUs, 8 GB of RAM, and 75 GB of NVMe storage. On paper, that's absurd value.
In practice, the experience is rougher. Contabo's single-core performance is significantly behind the competition, scoring just 482 on Geekbench 6 compared to Hetzner's 1,442 or DigitalOcean's 954. Users consistently report downtime, packet loss, and sluggish support responses. Their Trustpilot score improved in 2025, climbing from 3.5 to 4.4, but reviews on other platforms still describe frequent outages and unresponsive help when things go wrong.
If you need a throwaway server for testing or a non-critical workload where downtime doesn't matter, Contabo works. For anything you care about keeping online, look elsewhere.
### OVH: solid hardware, frustrating support
OVHcloud is one of the largest hosting companies in Europe, and their VPS plans offer decent specs at competitive prices. Their new 2026 VPS lineup includes plans like the VPS-3 (8 vCores, 24 GB RAM, 200 GB NVMe) starting at \$12.75/month, which is genuinely good value for the resources.
The problem is support. Unless you pay for a premium support tier, response times are slow and answers tend to be vague. When serious issues occur, like server outages, many customers report getting canned responses or no response at all. OVH also recently announced significant price increases, with some customers seeing their VPS costs nearly double. The company attributes this to rising hardware costs, particularly RAM prices that are projected to increase 250% to 300% by end of 2026.
OVH is a reasonable choice if you're technically self-sufficient and don't expect to need help. If you value responsive support, it can be a frustrating experience.
## The mid-tier independents
### Hetzner: the best overall value
Hetzner is the provider I'd recommend to most people. Based in Germany, they operate their own data centers in Germany, Finland, Singapore, and the US (Ashburn, Virginia). Their pricing consistently undercuts the American competitors by 30% to 50% for equivalent resources.
A 2 vCPU, 4 GB RAM shared instance (CX33) currently runs about \$5.99/month. Their Arm-based CAX line starts even lower at \$3.99/month. Performance is excellent, particularly on disk I/O, where their local NVMe storage delivers some of the highest IOPS numbers in benchmark tests. CPU performance is strong too, powered by modern AMD EPYC processors.
There is one caveat: Hetzner announced a price adjustment effective April 1, 2026. The CX23 (their entry-level shared plan) goes from \$3.49/month to \$4.99/month, and the increases apply across the board for both new and existing customers. Even after the increase, Hetzner remains significantly cheaper than DigitalOcean or Linode for comparable specs.
Support is ticket-only and based in Germany, which can mean slower responses outside European business hours. But the infrastructure itself is reliable, the control panel is clean, and the API is well-documented. For European workloads especially, Hetzner is hard to beat.
### DigitalOcean: the developer's classic
DigitalOcean has been the default recommendation for developers for over a decade, and for good reason. The control panel is polished, the documentation is some of the best in the industry, and the ecosystem (App Platform, managed databases, Kubernetes, marketplace images) makes it easy to go from zero to production.
Basic Droplets start at \$4/month for 512 MB of RAM, with the more practical 2 vCPU, 4 GB plan running \$24/month. As of January 2026, they've moved to per-second billing, which is nice for short-lived workloads. Performance is consistently good on KVM with NVMe storage, though disk I/O can vary during peak hours on shared instances.
The downside is price. DigitalOcean is one of the more expensive options for raw compute. A \$24/month Droplet on DigitalOcean gets you roughly the same specs as a \$6 to \$8 Hetzner instance. Support is ticket-only for standard plans, with response times ranging from 30 minutes during business hours to 4 to 8 hours off-peak.
DigitalOcean makes sense if you value developer experience, extensive documentation, and a mature ecosystem. If you're just looking for a Linux box to run things on, you're paying a premium for features you might not use.
### Vultr: global reach, higher price
Vultr's standout feature is coverage. With 32+ data center locations across every inhabited continent, it's the easiest way to deploy a server close to your users no matter where they are. Plans start at \$2.50/month for a minimal instance, with the 2 vCPU, 4 GB plan at \$20/month.
Their High Frequency compute tier uses higher-clock CPUs and NVMe storage for noticeably better performance on CPU-bound workloads. Vultr also offers bare metal servers through the same interface, and their Kubernetes engine provides the control plane free of charge (compared to the \$70+/month most hyperscalers charge).
The weak spots are support and reliability. Ticket response times average 2 to 4 hours during business hours and can stretch to 12 hours on weekends. Some users report network instability in newer data center locations. DDoS protection is included but capped at 10 Gbps, which won't hold up against serious attacks.
Vultr is a good choice when you need a specific geographic location that other providers don't cover. For general use, the price-to-performance ratio isn't as compelling as Hetzner's.
### Linode (Akamai Cloud): the quiet veteran
Linode has been around since 2003 and was acquired by Akamai in 2022. The core product, a straightforward Linux VPS, remains solid. Plans start at \$5/month for a Nanode (1 vCPU, 1 GB RAM), with the 4 GB plan at \$24/month. Performance on AMD EPYC instances is competitive, NVMe storage is standard, and transfer allowances are generous.
The Akamai acquisition brought integration with one of the world's largest CDN and edge networks, which is genuinely useful if you need content delivery alongside your compute. Phone support is available 24/7, a differentiator in a market where most providers are ticket-only.
On the other hand, the Linode brand was effectively retired in 2023, and some longtime users feel the personal touch that defined Linode has faded under Akamai's enterprise umbrella. Hardware costs are also putting pressure on the business, with Akamai noting that server component costs have increased 75% to 200% compared to early 2025. Price adjustments seem likely.
Linode is a reliable, no-surprises VPS. It's not the cheapest, but if you want solid performance with the backing of a major infrastructure company, it's a safe pick.
## Comparison table
Here's how the major independent VPS providers stack up on a comparable plan (approximately 2 vCPUs, 4 GB RAM, NVMe storage):
<table fit-page-width="true" header-row="true">
<tr color="blue_bg">
<td>**Provider**</td>
<td>**Starting price**</td>
<td>**\~2 vCPU / 4 GB plan**</td>
<td>**Data centers**</td>
<td>**Support**</td>
<td>**Notable strength**</td>
</tr>
<tr>
<td>Hetzner</td>
<td>\$3.49/mo (pre-April 2026)</td>
<td>\~\$5.99/mo</td>
<td>5 (DE, FI, SG, US)</td>
<td>Ticket only</td>
<td>Best price-to-performance</td>
</tr>
<tr>
<td>Contabo</td>
<td>\~\$3.60/mo</td>
<td>\~\$3.60/mo (4 vCPU, 8 GB)</td>
<td>7+ (EU, US, SG, IN, AU, UK, JP)</td>
<td>Ticket only</td>
<td>Lowest absolute price</td>
</tr>
<tr>
<td>OVH</td>
<td>\~\$4.50/mo</td>
<td>\~\$12.75/mo (8 vCore, 24 GB)</td>
<td>10+ (EU, NA, APAC)</td>
<td>Ticket (premium tiers available)</td>
<td>High resource-to-price ratio</td>
</tr>
<tr>
<td>Vultr</td>
<td>\$2.50/mo</td>
<td>\~\$20/mo</td>
<td>32+</td>
<td>Ticket only</td>
<td>Widest geographic coverage</td>
</tr>
<tr>
<td>DigitalOcean</td>
<td>\$4/mo</td>
<td>\$24/mo</td>
<td>15+</td>
<td>Ticket only</td>
<td>Developer experience and ecosystem</td>
</tr>
<tr>
<td>Linode (Akamai)</td>
<td>\$5/mo</td>
<td>\$24/mo</td>
<td>25+</td>
<td>Ticket + phone</td>
<td>CDN integration via Akamai</td>
</tr>
</table>
## The hyperscalers: AWS, Azure, and GCP
If you're coming from the indie VPS world, the pricing on AWS, Azure, and Google Cloud can feel like a different universe. These platforms aren't really competing on price for simple VPS workloads. They're selling an ecosystem, and the compute is just one piece.
### Free tiers compared
All three offer free tiers, but they work differently:
- **AWS** gives new accounts 12 months of free access to a t2.micro or t3.micro instance (1 vCPU, 1 GB RAM). After that, you pay. AWS also has an always-free tier for services like Lambda (400,000 GB-seconds/month) and DynamoDB.
- **Azure** provides a \$200 credit for 30 days, plus 12 months of free access to select services including a B1s VM (1 vCPU, 1 GB RAM). The always-free tier covers Azure Functions (1 million requests/month) and other services.
- **Google Cloud** offers \$300 in credits for 90 days, usable across any service. Their always-free tier includes an e2-micro instance (0.25 vCPU, 1 GB RAM) permanently, making it the only hyperscaler with an always-free VM option.
For ongoing compute, **Oracle Cloud** deserves a mention. Their always-free tier includes 4 Arm-based OCPUs plus 24 GB of RAM, which is remarkably generous and genuinely useful for small projects.
### When hyperscalers make sense
The big three aren't great choices for a simple VPS. A comparable instance (2 vCPUs, 4 GB RAM) on AWS runs roughly \$30 to \$50/month depending on the instance type and region, several times more than Hetzner or even DigitalOcean.
Where they earn their premium is in the surrounding ecosystem: managed databases, serverless functions, machine learning infrastructure, global CDNs, identity management, and hundreds of other services that integrate tightly. If you need three or four of those services working together, the convenience can justify the cost. If you just need a box to run Nginx and a database, you're dramatically overpaying.
One practical consideration: egress pricing. All three hyperscalers charge for outbound data transfer, typically \$0.08 to \$0.12 per GB after a small free allowance. Most indie VPS providers include generous transfer allowances (1 TB to 4 TB or more) in the base price. For bandwidth-heavy workloads, this alone can make hyperscalers several times more expensive than the sticker price suggests.
## The price increase trend
A recurring theme across the VPS market in 2025 and 2026 is rising prices. This isn't just providers getting greedy. Hardware costs, particularly for RAM and SSDs, have spiked dramatically due to supply chain constraints and surging demand from AI workloads.
Some notable increases:
- **Hetzner** announced price adjustments effective April 1, 2026, with cloud VPS prices increasing roughly 15% to 35% across the board. Even their entry-level CX23 goes from \$3.49/month to \$4.99/month.
- **OVH** has been raising prices aggressively, with some customers reporting near-100% increases on existing VPS plans. OVH attributes this to RAM costs projected to rise 250% to 300% by end of 2026.
- **Akamai (Linode)** has flagged that server component costs have increased 75% to 200% compared to early 2025, signaling likely price adjustments ahead.
The era of VPS prices consistently going down appears to be over, at least for now. If you find a plan at a price you like, locking it in sooner rather than later might be wise.
## How to choose
The "best" VPS depends entirely on what you're doing with it:
- **Tightest budget, non-critical workloads**: Contabo gives you the most raw resources per dollar, but expect occasional reliability issues.
- **Best overall value**: Hetzner. Even after the April 2026 price increase, nothing else comes close on price-to-performance for most workloads.
- **Developer experience and ecosystem**: DigitalOcean. You pay more for the compute, but the tooling, documentation, and managed services save time.
- **Global coverage**: Vultr. If you need a server in a specific region that others don't cover, Vultr probably has a data center there.
- **CDN integration**: Linode (Akamai). The combination of VPS compute with Akamai's edge network is unique in this market.
- **Enterprise ecosystem**: AWS, Azure, or GCP, but only if you actually need the broader platform services. Don't use a hyperscaler just for a VPS.
For most developers and small teams running web applications, APIs, or self-hosted tools, Hetzner paired with a service like Cloudflare in front gives you excellent performance at a fraction of what the American providers charge. That combination is hard to argue with.
## References
1. Hetzner Cloud pricing, [https://www.hetzner.com/cloud](https://www.hetzner.com/cloud)
2. Hetzner price adjustment documentation (February 2026), [https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/](https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/)
3. DigitalOcean Droplet pricing, [https://www.digitalocean.com/pricing/droplets](https://www.digitalocean.com/pricing/droplets)
4. Akamai Cloud (Linode) pricing, [https://www.akamai.com/cloud/pricing](https://www.akamai.com/cloud/pricing)
5. Vultr pricing, [https://www.vultr.com/pricing/](https://www.vultr.com/pricing/)
6. OVHcloud VPS plans, [https://www.ovhcloud.com/en/vps/](https://www.ovhcloud.com/en/vps/)
7. Contabo VPS review, [EXPERTE.com](http://EXPERTE.com) (2026), [https://www.experte.com/server/contabo](https://www.experte.com/server/contabo)
8. Contabo Wrapped 2025, [https://contabo.com/blog/contabo-wrapped-2025-the-year-of-always-improving/](https://contabo.com/blog/contabo-wrapped-2025-the-year-of-always-improving/)
9. OVH VPS review, [EXPERTE.com](http://EXPERTE.com), [https://www.experte.com/server/ovh](https://www.experte.com/server/ovh)
10. OVH pricing evolution blog post, [https://blog.ovhcloud.com/pricing-evolution-of-public-cloud-bare-metal-and-vps-at-ovhcloud/](https://blog.ovhcloud.com/pricing-evolution-of-public-cloud-bare-metal-and-vps-at-ovhcloud/)
11. Akamai price adjustment details, [StreamingMediaBlog.com](http://StreamingMediaBlog.com) (March 2026), [https://www.streamingmediablog.com/2026/03/akamai-price-adjustments.html](https://www.streamingmediablog.com/2026/03/akamai-price-adjustments.html)
12. AWS vs Azure vs Google Cloud free tier comparison, ProsperOps, [https://www.prosperops.com/blog/google-cloud-vs-aws-vs-azure/](https://www.prosperops.com/blog/google-cloud-vs-aws-vs-azure/)
13. Best always-free compute services (2025), [FreeTiers.com](http://FreeTiers.com), [https://www.freetiers.com/blog/best-always-free-compute-services-in](https://www.freetiers.com/blog/best-always-free-compute-services-in)
14. VPSBenchmarks, DigitalOcean vs Linode vs Vultr comparison, [https://www.vpsbenchmarks.com/compare/docean_vs_linode_vs_vultr](https://www.vpsbenchmarks.com/compare/docean_vs_linode_vs_vultr)
