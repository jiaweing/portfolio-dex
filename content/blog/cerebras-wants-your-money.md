---
title: "Cerebras wants your money"
date: "2026-04-22"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Business"]
tagColors: {"Business":"red"}
postTags: ["Hardware","Chips","Cloud","OpenAI","Data Centers","Regulation","Geopolitics","China","US"]
---

Cerebras Systems filed to go public on April 17, 2026, targeting a Nasdaq listing under the ticker CBRS. This is the company's second attempt. The first S-1 landed in September 2024, lingered through a painful CFIUS review of its ties to Abu Dhabi-based G42, and was quietly withdrawn in October 2025. Now, armed with a \$20 billion OpenAI contract, \$510 million in 2025 revenue, and a chip that is literally 57 times larger than Nvidia's H100, Cerebras is back.
The pitch is compelling. The valuation target of \$22 to \$25 billion is ambitious. But strip away the headline numbers and you find a company whose commercial story still has some serious open questions.
## The technology is genuinely impressive
Cerebras builds wafer-scale processors. Where Nvidia cuts a silicon wafer into hundreds of individual chips, Cerebras uses the entire wafer as one massive processor. The WSE-3 (Wafer-Scale Engine 3) packs 4 trillion transistors across 46,225 square millimeters of silicon, with 900,000 AI-optimized cores delivering 125 petaflops of compute.
The result is a chip purpose-built to avoid the bottlenecks that plague GPU clusters. Traditional AI inference requires splitting large models across multiple GPUs, each communicating over relatively slow interconnects. Cerebras sidesteps this entirely. One chip, one model, no sharding.
The performance claims are striking. On Meta's Llama 3.1-405B model, Cerebras Inference hit 969 output tokens per second, which third-party benchmarks from Artificial Analysis showed was up to 75 times faster than GPU-based offerings from major hyperscalers. Time to first token clocked in at 240 milliseconds. For inference-heavy workloads, particularly the agentic AI applications that are driving explosive demand for compute in 2026, that speed advantage matters.
This is not vaporware. The technology works. The question has always been whether "works" translates into "sells."
## The customer concentration problem
For most of Cerebras's life as a company, the answer to "who buys this?" has been uncomfortably narrow.
In the first half of 2024, a single customer, G42, accounted for 87% of the company's revenue. G42 is an Abu Dhabi-based AI firm that was both an investor in Cerebras and its dominant buyer. That relationship raised eyebrows everywhere: in the SEC filings, at CFIUS, and among the institutional investors who would need to buy into the IPO.
G42's past ties to China made the arrangement even more fraught. CFIUS spent months reviewing G42's \$335 million investment in Cerebras, a process that dragged well into 2025 and ultimately contributed to the first IPO's withdrawal. The review was eventually cleared, and G42 appears to have exited from the investor list in the latest filing. But the underlying concern, that Cerebras's revenue depended on a customer who was also a stakeholder with its own strategic incentives, was never purely a regulatory issue. It was a commercial one.
The new filing tells a different story, at least on paper. Cerebras now has a multi-year deal with OpenAI worth over \$20 billion, covering 750 megawatts of computing power through 2028, with options to expand to 1.25 gigawatts through 2030. There is also a reported agreement with Amazon Web Services to deploy Cerebras chips in Amazon data centers. Revenue grew 76% year-over-year to \$510 million in 2025, and the company reported \$87.9 million in net income, a sharp reversal from the \$485 million net loss in 2024.
But look at what the S-1 actually says. The company disclosed that the majority of its revenue is still attributable to just two customers. Swapping one dominant customer for two is progress, but it is not diversification. If OpenAI shifts its inference strategy, or if the AWS relationship does not scale as hoped, Cerebras is back to square one.
## What changed between the first and second attempt
The short answer: the OpenAI deal.
When Cerebras withdrew its IPO in October 2025, it had just closed a \$1.1 billion funding round at an \$8.1 billion valuation. The company framed the withdrawal as administrative. Nobody bought that explanation. A company with 87% customer concentration, an unresolved CFIUS review, and a \$485 million net loss does not have a straightforward path to public markets.
The OpenAI partnership changed the math. It gave Cerebras a second anchor customer with enormous credibility, a massive backlog (\$24.6 billion in remaining performance obligations as of December 2025), and a narrative that extends beyond "we sell chips to one company in Abu Dhabi." CEO Andrew Feldman even told the Wall Street Journal that Cerebras had taken the fast inference business at OpenAI away from Nvidia.
That is a bold claim. It is also exactly the kind of claim you make when you are about to ask public market investors to value your company at \$25 billion.
## The AI IPO landscape in 2026
Cerebras is not filing in a vacuum. The AI IPO window is wide open, and the pipeline is stacked.
CoreWeave, the GPU cloud company, went public in March 2025 at \$40 per share. The debut was rocky, with shares dipping below the IPO price on day two, but the stock has since climbed significantly, trading well above its initial price. Arm Holdings has surged roughly 200% since its September 2023 IPO. The 2026 pipeline includes potential listings from SpaceX (targeting a staggering \$1.5 to \$1.75 trillion valuation), Anthropic, and Databricks.
The pattern is clear: investors are hungry for AI infrastructure exposure, and the companies that can credibly claim a piece of the AI compute buildout are being rewarded. But there are cautionary tales too. SailPoint, an AI-adjacent security company, has seen its stock drop more than 30% since its February 2025 IPO. Not every company riding the AI wave reaches shore.
Cerebras is betting that the market's appetite for AI chip plays, combined with its OpenAI anchor and genuine technological differentiation, will carry it through. The mid-May 2026 target for the offering suggests the company wants to move quickly while conditions are favorable.
## The bear case
There are real reasons to be cautious.
First, customer concentration remains the central risk. Two customers generating the majority of revenue is a prospectus landmine, especially when one of those customers (OpenAI) is itself burning through capital at an extraordinary rate and may eventually build or procure its own custom silicon.
Second, Nvidia is not standing still. The Blackwell architecture is shipping, inference performance on Nvidia hardware is improving rapidly, and the CUDA ecosystem creates deep switching costs that Cerebras cannot replicate. Cerebras may be faster on specific benchmarks, but enterprise AI procurement is about more than raw tokens per second. It is about software compatibility, ecosystem support, and the comfort of buying from the market leader.
Third, the valuation is aggressive. At \$22 to \$25 billion on \$510 million in revenue, Cerebras would be trading at roughly 43 to 49 times trailing revenue. For comparison, Nvidia trades at a fraction of that multiple. The premium is justified only if you believe Cerebras can sustain its growth trajectory and expand beyond a handful of customers.
Fourth, wafer-scale manufacturing is inherently difficult. Yields, thermal management, and the sheer complexity of building processors at this scale create operational risks that conventional chipmakers do not face. An academic comparison of the WSE-3 and Nvidia's architectures acknowledged the performance-per-watt advantages but flagged open questions around cost-effectiveness and long-term viability.
## The bull case
The bull case is straightforward: inference is the future, and Cerebras is the fastest.
As AI shifts from training (where Nvidia dominates) to inference (where speed and cost per token matter most), the market opportunity for purpose-built inference hardware expands dramatically. Agentic AI, the autonomous tools that perform tasks independently, is driving demand for computing power that far outstrips current supply. Cerebras's architecture, which eliminates the inter-GPU communication bottleneck entirely, is uniquely suited to this workload.
The \$24.6 billion backlog provides multi-year revenue visibility. The OpenAI and AWS relationships give the company credibility with enterprise buyers. And if Cerebras can convert even a fraction of the inference market away from GPU clusters, the current valuation starts to look reasonable.
## So, should Cerebras have your money?
This is not a stock recommendation. But it is worth being honest about what Cerebras is asking investors to believe.
They are asking you to believe that a company with two major customers, an 18-month history of IPO false starts, and a manufacturing approach that has never been proven at massive commercial scale deserves a \$25 billion valuation. They are asking you to believe that the AI inference market will grow fast enough, and that Nvidia will move slowly enough, to leave room for a challenger with a fundamentally different architecture.
Maybe they are right. The technology is real. The OpenAI deal is real. The demand for faster inference is real.
But so is the pattern of AI infrastructure companies rushing to go public while the hype cycle is still hot. The question is not whether Cerebras builds impressive chips. It does. The question is whether "impressive" is enough to sustain a public company at this valuation, with this customer base, in this market.
The IPO window will not stay open forever. Cerebras knows that. The real question is whether investors should care that the company seems to know it too.
## References
1. [AI chipmaker Cerebras files for IPO after scrapping paperwork in 2025](https://www.cnbc.com/2026/04/17/cerebras-new-ipo-ai-chips.html), CNBC
2. [Nvidia rival Cerebras discloses US IPO filing as AI boom drives listings](https://www.reuters.com/technology/nvidia-rival-cerebras-reveals-us-ipo-filing-ai-boom-drives-listings-2026-04-17/), Reuters
3. [AI chip startup Cerebras files for IPO](https://techcrunch.com/2026/04/18/ai-chip-startup-cerebras-files-for-ipo/), TechCrunch
4. [Cerebras IPO: \$510M Revenue, \$10B OpenAI Deal, \$23B Valuation](https://tech-insider.org/cerebras-ipo-filing-510m-revenue-openai-deal-23b-valuation-2026/), Tech Insider
5. [AI chipmaker Cerebras withdraws IPO](https://www.cnbc.com/2025/10/03/cerebras-withdraws-ipo-ai.html), CNBC
6. [Cerebras IPO further delayed as US national security review drags on](https://www.reuters.com/technology/cerebras-ipo-further-delayed-us-national-security-review-drags-2025-03-25/), Reuters
7. [Is it bad to rely on one customer for 87% of your revenue?](https://sherwood.news/markets/ai-cerebras-ipo-g42-customer-relationship/), Sherwood News
8. [Nvidia rival Cerebras is taking another swing at an IPO](https://www.marketwatch.com/story/nvidia-rival-cerebras-is-taking-another-swing-at-an-ipo-057f4deb), MarketWatch
9. [Cerebras Delivers Record-Breaking Performance with Meta's Llama 3.1-405B Model](https://www.cerebras.ai/press-release/cerebras-inference-llama-405b), Cerebras
10. [A Comparison of the Cerebras Wafer-Scale Integration Technology with Nvidia GPU-based Systems](https://arxiv.org/html/2503.11698v1), arXiv
11. [Cerebras Wafer-Scale Engine product page](https://www.cerebras.ai/chip), Cerebras
12. [CoreWeave Announces Pricing of Initial Public Offering](https://www.coreweave.com/news/coreweave-announces-pricing-of-initial-public-offering), CoreWeave
13. [Cerebras Files for IPO as Demand Surges for More Efficient AI Chips](https://www.wsj.com/tech/chip-startup-cerebras-files-for-initial-public-offering-4aa27ae3), Wall Street Journal
14. [The 2026 IPO Pipeline: Which Tech Giants Are Heading to Public Markets?](https://acquinox.capital/insights/market-insights/the-2026-ipo-pipeline-which-tech-giants-are-heading-to-public-markets-1), Acquinox Capital
