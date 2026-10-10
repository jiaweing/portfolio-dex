---
title: "Oil doesn't care about your GPU"
date: "2026-03-17"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

The war in Iran just shut the Strait of Hormuz, and oil prices are spiking. Crude is up more than 20% since fighting began on February 28. Tankers have stopped transiting the strait entirely. Around one-fifth of the world's oil and liquefied natural gas normally flows through that narrow channel, and right now, almost none of it is moving.
Somehow, nobody in tech is talking about what this means.
We obsess over model architectures, FLOPS, and context windows. We debate scaling laws and benchmark scores. But the infrastructure underneath all of it, the physical supply chain that keeps GPUs running, depends on something far less glamorous: energy. And energy, right now, is in crisis.
## Every GPU-hour is a barrel of oil
Data centers are energy-hungry beasts. Global electricity consumption for data centers is projected to double to roughly 945 terawatt-hours by 2030, according to the International Energy Agency. A single AI-focused hyperscale data center consumes as much electricity as 100,000 households. The larger facilities currently under construction are expected to use 20 times that.
And here's the part that gets overlooked: fossil fuels still provide nearly 60% of the power going into these facilities. Renewables cover about 27%, nuclear another 15%. The AI scaling dream runs, in large part, on oil and gas.
When oil prices spike, that cost doesn't stay contained. It ripples through electricity grids, diesel backup generators, cooling systems, and regional energy markets. Cloud providers like AWS, Azure, and GCP have long-term energy contracts that buffer them from short-term shocks, but sustained disruption is a different story. Higher energy costs eventually show up in spot pricing, in capacity constraints, and in the bills that get passed on to customers.
## The assumption nobody questions
The entire AI scaling roadmap assumes cheap, abundant energy. Every projection about training larger models, running inference at scale, and building out new data center capacity bakes in an energy cost curve that trends flat or downward.
What happens when that assumption breaks?
Goldman Sachs Research estimates that traders are now pricing in roughly \$14 more per barrel than before the conflict to account for supply risk. That's the premium for uncertainty alone. If flows through the Strait of Hormuz remain fully halted for four weeks, the impact could be even larger. And if half of flows are disrupted for a month, the premium still sits around \$4 per barrel. These are not apocalyptic scenarios. They are baseline forecasts from major banks.
JPMorgan has been blunt about the geographic asymmetry: the United States is relatively insulated thanks to domestic production, but import-dependent economies in Asia face a much harder equation. The options for those economies are narrow: pay up, ration, or curb industrial activity.
## Singapore, the canary in the coal mine
This is where the story gets personal. Singapore imports nearly all of its energy. The city-state increased its dependence on Middle Eastern oil to more than 70% in 2025, up from about 50% the year before, largely driven by Exxon Mobil's refinery expansion requiring heavier crude from the Gulf.
Singapore has been making an ambitious push to become a regional AI hub, with new data center parks on Jurong Island that require developers to meet strict efficiency benchmarks and integrate renewable or low-carbon sources. The government is pursuing cross-border clean energy imports, targeting 6 GW of clean power by 2035 to cover a third of the electricity mix. There are even pilot programs for barge-based hydrogen power generation for AI-ready infrastructure.
But all of that planning assumed a stable global energy supply. When your country imports 100% of its crude and 100% of its gas, your status as a digital hub is a privilege granted by the stability of global shipping lanes.
Bloomberg reported that Singapore is already reviewing its GDP outlook and stands ready to aid businesses and households on energy costs. The government has acknowledged that while its energy diversification efforts are paying off, the situation requires close monitoring. For a small, open economy that wants to be the AI capital of Southeast Asia, an oil shock is not an abstract risk. It is a direct threat to the cost structure of every data center on the island.
## The 1973 parallel
We have been here before, sort of. The 1973 oil embargo removed only about 9% of total global supply and 14% of internationally traded oil. But the uncertainty, the scramble for supply, and the breakdown of traditional arrangements sent prices up nearly 300%, from \$3 to almost \$12 per barrel.
The effects lasted years. Stagflation, a toxic combination of stagnant growth and soaring inflation, defined the rest of the decade. But the crisis also forced genuine innovation: fuel efficiency standards, alternative energy research, and a fundamental rethinking of how economies relate to energy supply.
The market value of U.S. corporations was nearly halved during that period. Research has shown that the sharp rise in energy costs made existing capital equipment obsolete, as firms scrambled to adopt energy-saving technologies while the value of their installed infrastructure fell.
Could a sustained energy disruption do something similar to the AI cost curve? The scenarios are not identical, but the underlying dynamic is the same. When the cost of the physical input that your entire industry depends on suddenly becomes unstable, everything built on top of it gets repriced.
## The stack doesn't end at software
We spend enormous energy (pun intended) debating which model architecture will win, which framework is fastest, which cloud provider has the best GPU availability. These are important conversations. But they all take place several layers of abstraction above the thing that actually makes them possible.
Every training run is a megawatt-hour. Every megawatt-hour is a fuel source. Every fuel source is a supply chain. And every supply chain passes through chokepoints, some of them as narrow as the Strait of Hormuz.
The AI industry has built its scaling plans on the assumption that energy is a solved problem, that it is always available, always affordable, always someone else's concern. The current crisis is a reminder that this was never true. The compute stack does not end at software. It extends through power grids, shipping lanes, and geopolitical decisions that no amount of engineering can abstract away.
The question is not whether energy costs will affect AI. They already are. The question is whether we will start building that reality into our plans before the next disruption forces us to.
## References
1. Goldman Sachs, "How Will the Iran Conflict Impact Oil Prices?" (March 3, 2026) [Link](https://www.goldmansachs.com/insights/articles/how-will-the-iran-conflict-impact-oil-prices)
2. NBC News, "Oil prices volatile on conflicting reports about Strait of Hormuz" (March 2026) [Link](https://www.nbcnews.com/business/markets/oil-price-iran-war-markets-rcna262697)
3. Reuters, "Analysts reassess oil price estimates as Iran conflict disrupts markets" (March 13, 2026) [Link](https://www.reuters.com/business/energy/analysts-reassess-oil-price-estimates-iran-conflict-disrupts-markets-2026-03-13/)
4. TheStreet, "JPMorgan's shocking Iran forecast could change oil's next move" (March 2026) [Link](https://www.thestreet.com/economy/jpmorgans-shocking-iran-forecast-could-change-oils-next-move)
5. International Energy Agency, via [OilPrice.com](http://OilPrice.com), "Data Centers, AI, and Energy: Everything You Need to Know" [Link](https://oilprice.com/Energy/Energy-General/Data-Centers-AI-and-Energy-Everything-You-Need-to-Know.html)
6. Pew Research Center, "What we know about energy use at US data centers amid the AI boom" (October 2025) [Link](https://www.pewresearch.org/short-reads/2025/10/24/what-we-know-about-energy-use-at-us-data-centers-amid-the-ai-boom/)
7. Carbon Brief, "AI: Five charts that put data-centre energy use and emissions into context" [Link](https://www.carbonbrief.org/ai-five-charts-that-put-data-centre-energy-use-and-emissions-into-context/)
8. Reuters, "Why is Asia so reliant on Middle Eastern oil?" (March 4, 2026) [Link](https://www.reuters.com/business/energy/why-is-asia-so-reliant-middle-eastern-oil-2026-03-04/)
9. Bloomberg, "Singapore Ready to Act on Energy Impact, Will Review GDP Outlook" (March 13, 2026) [Link](https://www.bloomberg.com/news/articles/2026-03-13/singapore-ready-to-aid-businesses-households-on-energy-needs)
10. Singapore EDB, "Singapore turns to next-generation power systems to scale AI, train future workforce" [Link](https://www.edb.gov.sg/en/business-insights/insights/singapore-turns-to-next-generation-power-systems-to-scale-ai-train-future-workforce.html)
11. Columbia University CGEP, "The 1973 Oil Crisis: Three Crises in One, and the Lessons for Today" [Link](https://www.energypolicy.columbia.edu/publications/the-1973-oil-crisis-three-crises-in-one-and-the-lessons-for-today/)
12. ScienceDirect, "Oil crisis, energy-saving technological change and the stock market crash of 1973-74" [Link](https://www.sciencedirect.com/science/article/pii/S1094202510000190)
13. World Economic Forum, "The global price tag of war in the Middle East" (March 2026) [Link](https://www.weforum.org/stories/2026/03/the-global-price-tag-of-war-in-the-middle-east/)
14. Al Jazeera, "Iran war threatens prolonged impact on energy markets as oil prices rise" (March 8, 2026) [Link](https://www.aljazeera.com/news/2026/3/8/iran-war-threatens-prolonged-impact-on-energy-markets-as-oil-prices-rise)
