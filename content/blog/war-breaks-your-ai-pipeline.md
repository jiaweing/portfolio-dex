---
title: "War breaks your AI pipeline"
date: "2026-03-26"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

The first satisfying click of a GPU cluster spinning up in a new data center feels like progress. Thousands of chips humming in unison, a model training at scale, an API endpoint responding in milliseconds. It all feels solid, inevitable, unstoppable.
Then a war breaks out 10,000 kilometers away, and you realize your inference pipeline depends on a strait most engineers couldn't find on a map.
The Iran conflict that escalated in late February 2026 is doing something no benchmark or red-team exercise ever could: stress-testing the physical layer of the global AI supply chain. And the results are not flattering.
## The strait that feeds the machine
The Strait of Hormuz is a narrow waterway between Iran and the Arabian Peninsula. In normal times, roughly 20 million barrels of crude oil and about 20% of the world's liquefied natural gas pass through it every day. When the U.S. and Israel launched strikes on Iran on February 28, maritime traffic through the strait slowed to what the International Energy Agency described as "a trickle." Oil prices surged past \$100 a barrel. At least 15 tankers were targeted in the region within weeks.
This matters for AI because the supply chain doesn't start at the data center. It starts at the energy source, the shipping lane, the raw material mine. And all of those are now under pressure simultaneously.
## The dependency chain you didn't audit
Think of the path from a geopolitical event to a failed API call:
War disrupts the Strait of Hormuz. Oil and LNG shipments stall. Energy prices spike across Asia and Europe. Electricity costs rise for chip fabrication plants and data centers. Key chipmaking materials, helium and bromine, stop flowing from the Middle East. Fabs slow production. Cloud providers face higher operating costs. Your AI workload gets more expensive, or worse, gets deprioritized.
Each link in that chain is already showing strain.
## Helium, bromine, and the invisible inputs
Most people think of chips in terms of silicon, lithium, maybe rare earths. But semiconductor manufacturing depends on a range of less glamorous inputs. Helium is used as a cooling and purging agent in chip fabrication. Bromine is essential for flame retardants in circuit boards and certain etching processes. Aluminum goes into packaging and heat sinks.
The Middle East is a major supplier of all three. Qatar alone is one of the world's largest helium producers, and its massive LNG-linked helium extraction plants are now compromised. Iran's attacks damaged QatarEnergy infrastructure that will take years to repair, according to Reuters. Scientific American reported that while a 30% loss of global helium capacity is partially offset by a recent supply overhang, the net result is still an estimated 15% shortage, and the downstream effects haven't hit yet.
South Korea, which produces two-thirds of the world's memory chips through Samsung and SK Hynix, sourced 64% of its helium from Qatar in 2025. Ninety percent of its bromine imports come from Israel. The country's industry ministry has acknowledged heavy reliance on the Middle East for at least 14 raw materials critical to chip production.
## The Taiwan energy problem
TSMC fabricates roughly 90% of the world's most advanced semiconductors. That concentration is well known. What's less discussed is that Taiwan imports nearly all of its energy, and a significant portion of its oil and LNG passes through the same strait that's now contested.
Bloomberg reported in mid-March that the Iran war's chokepoints are casting doubt on global chip supply, particularly through spiking energy costs in Taiwan. Broadcom flagged TSMC capacity as a bottleneck just this week, noting that production limits are "choking the supply chain in 2026." The New York Times published a lengthy investigation in February warning that Silicon Valley has long ignored the looming Taiwan chip disaster.
AI companies talk about multi-region redundancy. But when one company makes 90% of your most critical component, and that company's energy supply runs through a single contested waterway, "multi-region" is a software abstraction layered over a hardware monoculture.
## South Korea's compounding crisis
South Korea gets over 70% of its oil and gas from the Middle East, virtually all of it transiting the Strait of Hormuz. The Carnegie Endowment published an analysis titled "The Iran War Is Also Now a Semiconductor Problem," detailing how the conflict is exposing deep energy vulnerabilities in Korea's chip industry.
The Korean government has already responded with emergency measures: capping fuel exports at 2025 levels, raising production caps on nuclear and coal plants, and preparing a supplementary budget. SK Hynix's chairman warned that a global memory chip shortage could persist for four to five years.
This isn't a hypothetical scenario. It's a rolling disruption that compounds with every week the strait remains contested.
## Europe's grid was already breaking
Even before the Iran conflict, Europe was struggling to accommodate AI's energy appetite. National Grid reported that proposed data centers representing over 30 gigawatts of demand are awaiting connection in England and Wales alone, equivalent to two-thirds of Great Britain's peak electricity demand.
Morgan Stanley projected that U.S. data center demand could reach 74 GW by 2028, with a shortfall of roughly 49 GW in available power access. BloombergNEF's forecast put U.S. data center power demand at 106 GW by 2035, a 36% jump from its previous outlook just seven months earlier.
Now add a supply shock. Oil above \$100. LNG contracts in turmoil. European gas prices spiking. The AI energy crunch isn't a 2030 problem anymore, it's a 2026 problem accelerated by geopolitics.
## Software resilience versus hardware fragility
Here's the uncomfortable asymmetry at the heart of AI infrastructure. Software is infinitely replicable. You can copy a model, deploy it to ten regions, failover in seconds. Code is weightless.
Hardware is not. A chip fab takes three to five years and billions of dollars to build. A shipping route through the Strait of Hormuz can't be rerouted. A helium extraction plant linked to damaged LNG infrastructure takes years to repair. An advanced GPU has a supply chain that spans dozens of countries and multiple contested waterways.
The AI industry has inherited the internet's mental model of resilience, where everything is distributed, redundant, and abstractable, and applied it to a physical supply chain that is concentrated, fragile, and deeply material. The cloud is not a cloud. It's a warehouse full of chips that were fabbed in Taiwan, cooled with helium from Qatar, powered by gas that transited a strait currently under naval blockade.
## The orbital hedge
One response to terrestrial fragility is to leave the ground entirely. On March 19, Blue Origin filed with the FCC to deploy up to 51,600 satellites under "Project Sunrise," a constellation designed to perform computation in orbit. The filing explicitly states the goal is to "ease mounting pressure on U.S. communities and natural resources by shifting energy and water-intensive compute away from terrestrial data centers."
Blue Origin isn't alone. SpaceX and a startup called Starcloud have filed similar applications. The proposals face enormous technical and cost hurdles, not least because they depend on launch systems and inter-satellite optical links that don't yet exist at the required scale.
But the fact that serious companies are filing serious regulatory applications for orbital compute should tell you something about the state of terrestrial infrastructure. When putting data centers in space starts to look like a rational hedge, the ground-level situation is worse than the industry's marketing suggests.
## The Singapore question
Singapore is a useful lens for this problem. It's a small nation with zero chip fabrication capacity, complete dependence on imported energy, and no natural resources to speak of. Yet it's one of the most important data center hubs in Asia Pacific, with a vacancy rate of just 1.4%, the lowest in the region.
The government is actively expanding capacity, launching its second Data Center Capacity Allocation call with at least 200 MW of new capacity. Southeast Asia as a whole attracted over \$55 billion in AI infrastructure commitments in 2025.
But Singapore's resilience isn't built on physical self-sufficiency. It's built on institutional adaptability, diversified supply relationships, and regulatory foresight. The country is investing in floating hydrogen power generation, exploring nuclear energy for data centers, and enforcing stringent green energy requirements for new capacity.
That's a model. Not one that eliminates supply chain risk, but one that acknowledges it honestly and builds systems to manage it rather than pretending it doesn't exist.
## The real AI risk is logistics
The AI safety conversation is dominated by alignment, hallucination, misuse, and job displacement. These are real concerns. But there's a more immediate risk that barely gets discussed in the policy debates or the earnings calls: the physical supply chain that makes AI possible is concentrated, fragile, and exposed to geopolitical disruption in ways the industry has not adequately addressed.
The Iran conflict didn't create these vulnerabilities. It revealed them. One regional war, and suddenly chip materials are scarce, energy prices are spiking, fab capacity is constrained, and the entire infrastructure buildout that was supposed to define the next decade of technology is looking less certain.
Redundancy in software is cheap. Redundancy in hardware is expensive, slow, and sometimes physically impossible. Until the AI industry takes the material layer as seriously as it takes the model layer, every GPU cluster, every training run, every inference endpoint sits on a foundation that a single geopolitical event can shake.
The real AI risk isn't that the models turn against us. It's that the ships stop sailing.
## References
1. [Iran War Threatens AI Chip Supply as Critical Minerals at Risk](https://www.morningstar.com/stocks/iran-war-threatens-ai-chip-supply-critical-minerals-risk), Morningstar
2. [The Tech Download: Chip supply chains and data center risks](https://www.cnbc.com/2026/03/13/tech-download-iran-problem-supply-chains-ai.html), CNBC
3. [The Iran War Is Also Now a Semiconductor Problem](https://carnegieendowment.org/emissary/2026/03/iran-korea-semiconductor-chips-energy-oil-hormuz), Carnegie Endowment for International Peace
4. [The War on Iran Puts Global Chip Supplies and AI Expansion at Risk](https://www.wired.com/story/the-war-on-iran-puts-global-chip-supply-and-ai-expansion-at-risk/), WIRED
5. [The Iran War Just Exposed America's Hidden AI Chokepoint: Helium](https://nationalinterest.org/blog/techland/the-iran-war-just-exposed-americas-hidden-ai-chokepoint-helium), The National Interest
6. [The Iran war disrupts global helium supply and artificial intelligence chipmakers](https://www.scientificamerican.com/article/the-iran-war-disrupts-global-helium-supply-and-artificial-intelligence-chip/), Scientific American
7. [Broadcom flags supply constraints, says TSMC capacity a bottleneck](https://www.reuters.com/world/asia-pacific/broadcom-flags-supply-constraints-says-tsmc-capacity-bottleneck-2026-03-24/), Reuters
8. [Oil execs warn of long-term damage from Iran war as US downplays crisis](https://www.reuters.com/business/energy/ceraweek-oil-execs-warn-long-term-damage-iran-war-us-downplays-crisis-2026-03-23/), Reuters
9. [What Is the Strait of Hormuz and Why Is It at the Center of the Iran War?](https://time.com/article/2026/03/17/what-is-the-strait-of-hormuz-global-trade-oil-flow-iran-war/), TIME
10. [Powering AI: Markets Race to Invest in AI Energy Solutions](https://www.morganstanley.com/insights/articles/powering-ai-energy-market-outlook-2026), Morgan Stanley
11. [Morgan Stanley Warns of Looming 45-Gigawatt US Power Shortage](https://mlq.ai/news/morgan-stanley-warns-of-looming-45-gigawatt-us-power-shortage-driven-by-ai-data-center-boom/), [MLQ.ai](http://MLQ.ai)
12. [The AI Race Is Pressuring Utilities to Squeeze More From Europe's Power Grids](https://www.wired.com/story/europe-squeeze-power-energy-grid-ai-data-center/), WIRED
13. [Blue Origin joins the orbital data center race](https://spacenews.com/blue-origin-joins-the-orbital-data-center-race/), SpaceNews
14. [Jeff Bezos' Blue Origin enters the space data center game](https://techcrunch.com/2026/03/20/jeff-bezos-blue-origin-enters-the-space-data-center-game/), TechCrunch
15. [From Oil to Chips: How the Iran War Is Triggering a Global Semiconductor Crisis](https://underthemarketlens.substack.com/p/iran-war-global-semiconductor-crisis-strait-of-hormuz), Under the Market Lens
16. [Iran war exposes risks to the AI boom](https://www.semafor.com/article/03/23/2026/iran-war-exposes-risks-to-the-ai-boom), Semafor
17. [The Looming Taiwan Chip Disaster That Silicon Valley Has Long Ignored](https://www.nytimes.com/2026/02/24/technology/taiwan-china-chips-silicon-valley-tsmc.html), The New York Times
18. [How Iran Blocking the Strait of Hormuz Affects the U.S.](https://www.factcheck.org/2026/03/how-iran-blocking-the-strait-of-hormuz-affects-the-u-s/), [FactCheck.org](http://FactCheck.org)
19. [Singapore and Southeast Asia emerge as global AI infrastructure hubs](https://introl.com/blog/singapore-southeast-asia-ai-infrastructure-hub-2025), Introl
