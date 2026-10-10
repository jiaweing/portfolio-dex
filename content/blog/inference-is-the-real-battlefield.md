---
title: "Inference is the real battlefield"
date: "2026-04-01"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Everyone is still talking about training. Which lab has the biggest cluster. How many billions the next model cost. Whether scaling laws are holding or plateauing. Meanwhile, the economics of AI quietly shifted underneath all of it.
At GTC 2026, Jensen Huang stood in front of 18,000 people and projected \$1 trillion in purchase orders for NVIDIA's Blackwell and Vera Rubin platforms through 2027, up from \$500 billion just months earlier. The number was staggering, but the subtext mattered more than the headline. NVIDIA's entire new platform architecture, from the Vera Rubin NVL72 racks to the newly integrated Groq 3 LPX inference accelerator, is designed around one thesis: the future of AI compute is inference, not training.
Training was the arms race. Inference is the actual war.
## Training is a one-time cost, inference is forever
The distinction sounds simple, but its implications are enormous. Training a model is expensive, sometimes extraordinarily so. GPT-4 reportedly cost somewhere between \$100 million and \$200 million to train. But training is a burst of compute. You do it once, maybe a few times, and then you deploy.
Inference is what happens after deployment. Every query, every API call, every agent action, every token generated for every user. It runs 24/7. It scales with adoption. Multiple industry reports now estimate that inference accounts for 80 to 90 percent of the total lifetime cost of a production AI system. GPT-4's inference bill alone was projected at \$2.3 billion in 2024, roughly 15 times its training cost.
This is the fundamental asymmetry. Training is a capital expenditure. Inference is an operational expenditure that compounds with every user you add, every feature you ship, every agent you deploy. The companies that win the AI era won't just be the ones that train the best models. They'll be the ones that can serve those models at scale, cheaply and reliably.
## Hardware vendors already pivoted
NVIDIA's GTC 2026 keynote made the pivot explicit. The Vera Rubin platform isn't just another GPU generation. It's a full-stack inference factory architecture, tying together Vera CPUs, Rubin GPUs, NVLink 6 switches, BlueField-4 DPUs, and Spectrum-6 Ethernet switches into integrated rack-scale systems designed for massive inference throughput.
But the most telling move was the Groq deal. NVIDIA paid \$20 billion to license Groq's inference technology and hire most of its technical team, structured as a licensing agreement rather than a full acquisition to sidestep antitrust review. Within four months, the result was already integrated: the Groq 3 LPX inference accelerator, combining Groq's high memory bandwidth with NVIDIA's processing power, slotted directly into the Vera Rubin inference stack.
This wasn't a defensive acquisition. It was NVIDIA acknowledging that inference workloads are different enough from training workloads that they need purpose-built silicon. SemiAnalysis described it plainly: NVIDIA is building an inference kingdom. The hardware roadmap tells you where the money is going.
## The economics that actually matter
Morgan Stanley's latest research models the economics of "AI inference factories" and finds something remarkable: a standard inference factory running NVIDIA's GB200 NVL72 achieves a profit margin of nearly 78 percent. Google's TPU v6e follows at 74.9 percent. These are not speculative projections. They're modeled returns on deployed infrastructure.
The profitability explains the frenzy. Morgan Stanley estimates nearly \$3 trillion in AI-related infrastructure investment will flow through the global economy by 2028, with more than 80 percent of that spending still ahead. The firms making that investment are increasingly optimizing for inference throughput, not training capacity.
Meanwhile, Gartner predicts that by 2030, performing inference on a trillion-parameter model will cost providers over 90 percent less than in 2025. LLMs will be up to 100 times more cost-efficient than the earliest models of similar size. The cost curve is collapsing.
But here's the thing about collapsing costs.
## Cheaper inference does not mean less spending
William Stanley Jevons observed in 1865 that more efficient steam engines didn't reduce coal consumption. They increased it. Cheaper energy made new applications viable, and total demand overwhelmed the efficiency gains.
The same dynamic is playing out with inference. When Satya Nadella saw DeepSeek dramatically undercut competitors on cost, he didn't worry. He posted: "Jevons paradox strikes again! As AI gets more efficient and accessible, we will see its use skyrocket, turning it into a commodity we just can't get enough of."
The data confirms it. Cloud computing bills climbed 19 percent in 2025, driven largely by generative AI workloads. Per-token costs are falling, but total inference spending is rising because workloads are expanding faster than prices are declining. Reasoning models consume thousands of internal tokens before producing a response. Agentic workflows chain multiple model calls together, multiplying token consumption per user action. Every improvement in cost efficiency unlocks new use cases that consume more aggregate compute.
As Huang himself put it at GTC: "If they could just get more capacity, they could generate more tokens, their revenues would go up." The constraint isn't demand. It's supply.
## Every inference endpoint is an attack vector
A trillion-dollar inference market is also a trillion-dollar attack surface. This is the dimension that gets the least attention and arguably matters the most.
Inference endpoints are exposed APIs. They accept external input, process it through complex models, and return outputs, often in real time. Every one of those endpoints is a potential vector for prompt injection, denial-of-service attacks, credential abuse, excessive token consumption, and data exfiltration.
The vulnerabilities are already materializing. In March 2026 alone, NVIDIA disclosed vulnerabilities across its Triton Inference Server, Megatron LM, and NeMo Framework. A critical CVE was found in the vLLM inference engine that allowed attackers to crash servers using crafted inputs. The OWASP LLM Top 10 framework now catalogs attack patterns specific to inference workloads, from prompt injection to model theft.
Darktrace's 2026 State of AI Cybersecurity report found that 92 percent of security professionals are concerned about the impact of AI agents, systems that rely on continuous inference to operate. As agentic AI scales, the number of always-on inference endpoints multiplies. Each agent running autonomously is a persistent inference consumer and a persistent attack surface.
A10 Networks highlights a specific risk category: abuse of inference APIs, where attackers exploit endpoints through excessive token consumption to inflict financial damage. When AI workloads are computationally expensive, a well-targeted attack doesn't need to steal data. It just needs to run up the bill.
## The battlefield fragments
Inference isn't just a cloud problem. It's fragmenting across every computing surface.
Edge inference, running models directly on phones, browsers, IoT devices, and local hardware, is emerging as a distinct arena. IDC predicts that as the focus of AI shifts from training to inference, edge computing will be required to address latency and privacy demands. The AI edge computing market is projected to surpass \$65 billion by 2030.
The logic is straightforward. A self-driving car can't wait for a round trip to the cloud. A medical device processing patient data can't send it to a remote server. A factory floor running real-time quality inspection needs sub-millisecond responses. These workloads demand local inference.
But edge inference introduces its own complexities. Devices have limited compute, constrained memory, and battery limitations. Models need to be compressed, quantized, and optimized for hardware that bears no resemblance to a data center GPU. The result is a fragmented landscape where inference runs on everything from NVIDIA's purpose-built accelerators to Qualcomm's mobile NPUs to custom ASICs in embedded systems.
The companies that master inference won't just optimize for one deployment target. They'll need to serve models across cloud, edge, and hybrid architectures simultaneously.
## The startups that might matter more than model labs
The inference shift is reshaping which companies in the AI ecosystem actually matter.
Fireworks AI raised \$250 million at a \$4 billion valuation to build its inference platform, and recently partnered with Microsoft to bring optimized open-model inference to Azure Foundry. Together AI announced its Inference Engine 2.0, claiming 4x faster throughput than open-source vLLM and outperforming commercial solutions from Amazon, Azure, and others by 1.3x to 2.5x.
Groq, before being absorbed into NVIDIA's orbit, demonstrated that purpose-built inference hardware could deliver dramatically lower latency and cost. Customers like Fintool reported 7.4x speed improvements and 89 percent cost reductions after switching to GroqCloud.
A new tier of GPU cloud providers, CoreWeave, Lambda, RunPod, and others, has emerged to serve inference-heavy workloads with specialized infrastructure and pricing that undercuts traditional hyperscalers. GPU marketplaces are aggregating supply from distributed providers, with reserved capacity delivering 40 to 70 percent savings over on-demand pricing.
This ecosystem barely existed three years ago. Now it's attracting billions in investment. The pattern is clear: whoever controls the inference layer controls the economics of deployed AI.
## Training still matters, but differently
None of this means training is irrelevant. Frontier capabilities still require massive training runs. The models that Vera Rubin will serve at inference time still need to be created somewhere, and that somewhere still demands enormous compute.
But the strategic calculus has shifted. Training produces the asset. Inference monetizes it. And increasingly, the bottleneck to value creation isn't whether you can build a good model. It's whether you can deploy it at a cost structure that works.
The labs that train frontier models will continue to matter. But the companies that build the infrastructure, tooling, and optimization layers for inference may capture more of the long-term value. NVIDIA clearly believes this, which is why it spent \$20 billion on Groq's inference technology rather than another training accelerator.
## Where value accrues now
The \$1 trillion figure Huang cited at GTC isn't about training bigger models. It's about serving inference to billions of users, agents, and devices. It's about the recurring revenue that comes from every token generated, every API call served, every autonomous agent running 24/7.
The companies that understand this shift are already positioning. The ones still focused exclusively on training costs and model sizes are optimizing for the last war.
Inference is where the margin is. Inference is where the security risk is. Inference is where the engineering complexity is. And inference is where the trillion dollars will be spent.
The arms race was training. The war is inference. And it's already underway.
## References
1. CNBC, "Nvidia GTC 2026: CEO Jensen Huang sees \$1 trillion in orders for Blackwell and Vera Rubin through 2027," March 16, 2026. [Link](https://www.cnbc.com/2026/03/16/nvidia-gtc-2026-ceo-jensen-huang-keynote-blackwell-vera-rubin.html)
2. Reuters, "Nvidia bets on AI inference as chip revenue opportunity hits \$1 trillion," March 16, 2026. [Link](https://www.reuters.com/world/asia-pacific/nvidia-ceo-set-reveal-new-chips-software-ai-megaconference-gtc-2026-03-16/)
3. NVIDIA Newsroom, "NVIDIA Vera Rubin Opens Agentic AI Frontier," March 16, 2026. [Link](https://nvidianews.nvidia.com/news/nvidia-vera-rubin-platform)
4. SemiAnalysis, "Nvidia, The Inference Kingdom Expands, GTC 2026." [Link](https://newsletter.semianalysis.com/p/nvidia-the-inference-kingdom-expands)
5. EE Times, "How 'Why Not' Led to a \$20 Billion Deal For Groq," March 24, 2026. [Link](https://www.eetimes.com/how-why-not-led-to-a-20-billion-deal-for-groq/)
6. The Motley Fool, "Nvidia's \$20 Billion Groq Acquisition Just Paid Off," March 24, 2026. [Link](https://www.fool.com/investing/2026/03/24/nvidias-20-billion-groq-acquisition-just-paid-off/)
7. Futunn, "Morgan Stanley's modeling of the AI Inference Factory," 2026. [Link](https://news.futunn.com/en/post/60704991/morgan-stanley-s-modeling-of-the-ai-inference-factory-whether)
8. Morgan Stanley, "AI Market Trends 2026: Global Investment, Risks, and Buildout." [Link](https://www.morganstanley.com/insights/articles/ai-market-trends-institute-2026)
9. Morgan Stanley Australia, "AI Enters a New Phase: The Rise of Inference and Data Infrastructure." [Link](https://www.morganstanley.com.au/ideas/ai-enters-a-new-phase-of-inference)
10. Gartner, "By 2030, Performing Inference on an LLM With 1 Trillion Parameters Will Cost GenAI Providers Over 90% Less Than in 2025," March 25, 2026. [Link](https://www.gartner.com/en/newsroom/press-releases/2026-03-25-gartner-predicts-that-by-2030-performing-inference-on-an-llm-with-1-trillion-parameters-will-cost-genai-providers-over-90-percent-less-than-in-2025)
11. Forbes, "The Jevons Paradox: Flawed Consensus View On Efficiency," January 27, 2026. [Link](https://www.forbes.com/sites/jonmarkman/2026/01/27/the-jevons-paradox-flawed-consensus-view-on-efficiency/)
12. Introl, "AI Inference vs Training Infrastructure: Why the Economics Diverge." [Link](https://introl.com/blog/ai-inference-vs-training-infrastructure-economics-diverging)
13. Darktrace, "State of AI Cybersecurity 2026," March 26, 2026. [Link](https://www.darktrace.com/blog/state-of-ai-cybersecurity-2026-92-of-security-professionals-concerned-about-the-impact-of-ai-agents)
14. A10 Networks, "Top 9 Generative AI Security Risks in 2026." [Link](https://www.a10networks.com/blog/generative-ai-security-risks/)
15. R&D World, "2026 AI story: Inference at the edge, not just scale in the cloud." [Link](https://www.rdworldonline.com/2026-ai-story-inference-at-the-edge-not-just-scale-in-the-cloud/)
16. Wall Street Journal, "AI Inference Startup Fireworks AI Is Valued at \$4 Billion," October 28, 2025. [Link](https://www.wsj.com/articles/ai-inference-startup-fireworks-ai-is-valued-at-4-billion-in-funding-round-758885c8)
17. Together AI, "Announcing Together Inference Engine 2.0." [Link](https://www.together.ai/blog/together-inference-engine-2)
18. Compute Exchange, "The Rise of GPU Marketplaces in 2026." [Link](https://compute.exchange/blogs/the-rise-of-gpu-marketplaces-in-2026)
