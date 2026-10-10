---
title: "War is a routing problem"
date: "2026-04-08"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

The Strait of Hormuz is 58 kilometers wide. At its narrowest navigable channel, it's tighter than the distance between most cloud provider availability zones. And until February 2026, roughly 20 million barrels of oil flowed through it every single day, about 20% of the world's supply. Then Iran declared it closed, and the entire global energy system discovered it had no failover.
This isn't a story about military strategy. It's a story about what happens when critical systems have no redundancy.
## The world's most expensive single point of failure
In systems engineering, a single point of failure (SPOF) is any component whose failure brings down the whole system. No backup, no graceful degradation, just a hard crash. We spend enormous effort eliminating SPOFs in software. We run multi-region deployments, build circuit breakers, and design for eventual consistency. We accept that individual components will fail and architect around that certainty.
The Strait of Hormuz is a SPOF for the global economy. When Iran's Islamic Revolutionary Guard Corps began attacking ships and declared the strait off-limits on March 4, 2026, oil flows dropped from 20 million barrels per day to what the International Energy Agency called "a trickle." Brent crude surged past \$90 per barrel. The disruption was so severe that Politico reported it as the largest oil supply disruption in history.
And the bypass capacity? According to Forbes, the existing pipeline alternatives, three routes built over four decades of investment, cover less than 30% of what normally flows through Hormuz. The insurance policy was cashed, and it covered a fraction of the loss.
## Chokepoints as architecture
The Hormuz crisis is dramatic, but it's not unique. Global trade runs through a surprisingly small number of narrow passages, each one a potential SPOF:
- **Strait of Malacca**: 2.8 km at its narrowest, carrying 23 million barrels of oil per day and roughly 40% of global trade. It handles even higher oil volumes than Hormuz.
- **Suez Canal**: The 2021 Ever Given blockage was a six-day preview of what a longer disruption looks like. The Red Sea crisis in 2024-2025 forced ships around the Cape of Good Hope, adding weeks and billions in costs.
- **Panama Canal**: Drought in 2023-2024 cut transit capacity by nearly half, delaying energy shipments and inflating shipping costs.
A 2025 study published in Nature Communications estimated the expected value of trade disrupted at maritime chokepoints at \$192 billion annually, with economic losses from delays, rerouting, and insurance premiums running around \$10.7 billion per year under normal conditions. That's before a major crisis hits.
The World Economic Forum put it plainly: choke points are no longer just narrow waterways. They also sit inside rare mineral processing chains, server farms, and semiconductor lithography systems. The same fragile topology shows up everywhere.
## Targeting the dependency graph
What makes the Iran conflict especially illustrative is how both sides have instinctively targeted dependencies rather than capabilities.
Iran's closure of the strait wasn't aimed at sinking warships. It was aimed at disrupting the dependency graph of the global economy, cutting a single edge in a network to cascade failures across continents. It's the geopolitical equivalent of a denial-of-service attack: overwhelm the system not by being more powerful, but by exploiting a structural weakness.
On the other side, Trump's threats to strike Iran's bridges, power plants, and desalination infrastructure follow the same logic. As Reuters and The Guardian reported in early April, the U.S. threatened to target civilian infrastructure, not because bridges are military assets, but because they're nodes in a dependency graph that keeps a society running. Cut electricity, and hospitals go dark. Destroy bridges, and supply chains fracture. It's not about defeating an army. It's about collapsing a system.
This pattern maps directly onto how we think about distributed systems. An attacker doesn't need to compromise every server. They need to find the load balancer with no failover, the single database with no replica, the one DNS provider that everything depends on.
## Even the most expensive hardware fails
On April 3, 2026, Iran shot down a U.S. F-15E Strike Eagle over western Iran and damaged an A-10 Warthog near the Strait of Hormuz. According to [Military.com](http://Military.com), these were the first American fighter jets shot down by enemy fire in over 20 years.
An F-15E costs roughly \$90 million. It is, by almost any measure, one of the most advanced pieces of military hardware ever built. And it was brought down by a surface-to-air missile, a fundamentally simpler system exploiting the fact that every aircraft, no matter how capable, has failure modes.
This is a lesson that infrastructure engineers learn early: the cost or sophistication of a component doesn't eliminate its failure modes. A \$90 million jet and a \$5 Raspberry Pi share the same fundamental vulnerability, they are single units that can stop working. What matters is not the unit's capability, but the system's ability to absorb its loss. Redundancy beats unit excellence every time.
The U.S. military understands this at scale, which is why it deploys hundreds of aircraft and has massive logistics chains. But the fact that individual high-value assets can still be taken out reinforces the principle: design for failure at every level.
## No SLA, no fallback
Here's what strikes me about this crisis. We've spent decades learning how to build resilient digital infrastructure. We have SLAs, failover mechanisms, chaos engineering, and entire teams dedicated to site reliability. We test for failure because we know it's coming.
Global trade has none of this. There's no SLA on the Strait of Hormuz. There's no failover for the Suez Canal. There's no chaos engineering team running drills on what happens when the Strait of Malacca goes down, even though 80% of China's oil imports transit through it.
The UN Trade and Development (UNCTAD) analysis of the Hormuz disruption warned that higher energy, fertilizer, and transport costs could increase food costs and intensify cost-of-living pressures globally, hitting the most vulnerable countries hardest. These aren't theoretical risks. They're cascading failures propagating through a system with no circuit breakers.
## The lesson isn't about Iran
It's tempting to view the Hormuz crisis as a story about geopolitics, about Iran and the U.S. and oil markets. But the deeper lesson is structural.
Humanity keeps building systems with zero fault tolerance. We route 20% of global oil through a 58-kilometer corridor and call it a supply chain. We concentrate semiconductor manufacturing in a single region. We build global food systems that depend on fertilizer shipments through contested waterways.
We know how to do better. The principles aren't new: eliminate single points of failure, build in redundancy, design for graceful degradation, test your failover before you need it. These ideas are decades old in software engineering and centuries old in military strategy.
The gap isn't knowledge. It's implementation. Redundancy is expensive. Bypass pipelines cost billions. Alternative shipping routes add weeks. Diversifying supply chains means accepting higher costs during peacetime to avoid catastrophic costs during a crisis.
But as the Hormuz crisis has shown, the cost of not building redundancy is always higher. The only question is when the invoice comes due.
## References
1. [The global chokepoint in the Strait of Hormuz](https://www.reuters.com/graphics/IRAN-CRISIS/MAPS/znpnmelervl/2026-03-02/the-global-chokepoint-in-the-strait-of-hormuz/), Reuters, March 2026
2. [How Iran blocking the Strait of Hormuz affects the U.S.](https://www.factcheck.org/2026/03/how-iran-blocking-the-strait-of-hormuz-affects-the-u-s/), [FactCheck.org](http://FactCheck.org), March 2026
3. [Iran war is the largest oil supply disruption in history, report finds](https://www.politico.com/news/2026/03/12/iran-war-oil-market-disruption-00824791), Politico, March 2026
4. [Hormuz bypass capacity falls catastrophically short](https://www.forbes.com/sites/guneyyildiz/2026/03/23/hormuz-bypass-capacity-falls-catastrophically-short-the-pipelines-cover-less-than-30/), Forbes, March 2026
5. [Iran war's energy impact forces world to pay up, cut consumption](https://www.reuters.com/business/energy/iran-wars-energy-impact-forces-world-pay-up-cut-consumption-2026-03-21/), Reuters, March 2026
6. [Strait of Hormuz disruptions: Implications for global trade and development](https://unctad.org/publication/strait-hormuz-disruptions-implications-global-trade-and-development), UN Trade and Development, 2026
7. [The world's most strategic straits and channels](https://interactive.aljazeera.com/aje/2026/mapping-oil-hormuz-chokepoint/), Al Jazeera, 2026
8. [Systemic impacts of disruptions at maritime chokepoints](https://www.nature.com/articles/s41467-025-65403-w), Nature Communications, 2025
9. [Iran war exposes the fragility of global choke points](https://www.weforum.org/stories/2026/03/war-middle-east-vulnerability-global-choke-points/), World Economic Forum, March 2026
10. [US Military Aircraft Hit in Iran War are First Shot Down by Enemy Fire in Over 20 Years](https://www.military.com/daily-news/2026/04/04/us-military-aircraft-hit-iran-war-are-first-shot-down-enemy-fire-over-20-years.html), [Military.com](http://Military.com), April 2026
11. [Trump threatens to strike Iran's bridges and electric power plants](https://www.reuters.com/world/middle-east/trump-threatens-strike-irans-bridges-electric-power-plants-2026-04-03/), Reuters, April 2026
12. [Trump claims, without proof, Iranians welcome US strikes on infrastructure](https://www.theguardian.com/us-news/2026/apr/06/trump-iranians-strikes-on-infrastructure), The Guardian, April 2026
13. [World Oil Transit Chokepoints](https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints), U.S. Energy Information Administration
