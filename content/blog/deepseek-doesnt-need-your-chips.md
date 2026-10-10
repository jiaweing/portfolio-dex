---
title: "DeepSeek doesn't need your chips"
date: "2026-04-26"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["China","Hardware","Chips","Open Source","Models","Geopolitics","Regulation","US","OpenAI","Anthropic","Claude","Google","Coding"]
---

The timing was almost poetic. On April 23, 2026, the White House published a memo accusing China of running "deliberate, industrial-scale campaigns" to distill American AI models. The next day, DeepSeek dropped V4, its most capable model yet, trained on Huawei's Ascend chips.
The message was hard to miss: China's AI ecosystem is decoupling from American hardware faster than anyone in Washington expected. And the export control strategy that was supposed to prevent exactly this outcome may have accelerated it.
## The V4 release
DeepSeek V4 comes in two variants. The Pro version has 1.6 trillion parameters (49 billion active), making it the largest open-weight model available today, more than double the size of its predecessor V3.2. The Flash version, at 284 billion parameters (13 billion active), is designed for cost-sensitive deployments.
Both models show meaningful improvements in reasoning, coding, and agentic capabilities. DeepSeek claims V4-Pro outperforms OpenAI's GPT-5.2 and Google's Gemini 3.0 Pro on select tasks, with coding performance "comparable to GPT-5.4" on competition benchmarks. On world knowledge benchmarks, V4-Pro leads all open-source models and trails only Google's Gemini-Pro-3.1.
The numbers matter, but they're not the real story. The real story is what's running underneath.
## The Huawei pivot
DeepSeek V4 is the first frontier AI model built to run on Chinese semiconductor infrastructure. Huawei confirmed that its Ascend chips were used in parts of V4's training process, and the model has been optimized for Huawei's Ascend Supernode clusters powered by the Ascend 950.
This is a significant departure. DeepSeek's earlier models relied on Nvidia hardware. The shift to Huawei wasn't just a technical decision, it was a strategic one. DeepSeek gave Huawei early access to V4 so the chipmaker could optimize its runtime and tooling, while Nvidia and AMD were reportedly left waiting.
Huawei's Ascend chips aren't H100s. They're slower, less power-efficient, and the software ecosystem is less mature. But DeepSeek's approach shows that with enough engineering effort at the software layer, you can compensate for hardware gaps. This is classic systems engineering: when you can't win on one axis, you optimize across the full stack.
## The distillation accusation
The White House memo, authored by Michael Kratsios, director of the Office of Science and Technology Policy, alleged that Chinese entities were using "tens of thousands of proxy accounts" and jailbreaking techniques to extract capabilities from American frontier models. The State Department followed up by ordering embassies worldwide to raise these concerns with host governments.
This wasn't the first such accusation. In February 2026, Anthropic published evidence that DeepSeek, Moonshot AI, and MiniMax had conducted what it called "industrial-scale" distillation attacks, generating over 16 million exchanges with Claude through roughly 24,000 fraudulent accounts. OpenAI separately warned lawmakers that DeepSeek was targeting ChatGPT for the same purpose.
China's foreign ministry called the claims "groundless" and "a smear against the achievements of China's AI industry."
Distillation itself is a legitimate and widely used technique. Frontier labs routinely distill their own large models into smaller, cheaper versions. The controversy is about who gets to do the distilling and whether doing it across organizational boundaries, especially across geopolitical ones, constitutes theft.
The practical question is harder: even if the accusations are true, what exactly can be done about it? API access can be restricted, but the outputs of open-weight models are, by definition, available to anyone.
## The export control paradox
The US export control strategy was built on a core assumption: that AI capability is bottlenecked by hardware. Control the chips, control the pace of advancement. For a while, this seemed to work. Restrictions on Nvidia's A100 and H100 exports forced Chinese labs to work with older, less capable silicon.
But the strategy created its own countervailing pressures.
First, it supercharged China's domestic chip industry. Huawei accelerated its Ascend roadmap. IDC data shows Huawei and Nvidia were the two main competitors in the 2025 Chinese AI chip market, with Huawei closing the gap. The Council on Foreign Relations argued that the controls were working precisely because Huawei remained behind. The Information Technology and Innovation Foundation argued the opposite, that the controls had backfired by motivating China to build what it otherwise might have simply bought.
Second, the policy itself became incoherent. In December 2025, Trump announced that Nvidia's H200 chips could be exported to China with a 25% fee. In January 2026, the Commerce Department formalized the rules. But then Beijing effectively blocked the imports, directing Chinese companies to buy domestic chips instead. Nvidia eventually halted H200 production for China and shifted its TSMC capacity to next-generation products.
When your adversary declines the leverage you're offering, the leverage is gone.
## What distillation really means
The convergence of these two threads, the distillation accusations and the V4 release, reveals something important about where the AI race actually stands.
Distillation works because frontier model outputs contain an enormous amount of implicit knowledge about reasoning patterns, formatting, and problem-solving strategies. A smaller model trained on those outputs can acquire capabilities that would otherwise require orders of magnitude more compute to develop from scratch. It's a shortcut, and it's devastatingly effective.
If distillation can reliably transfer capability from larger models to smaller ones, then hardware advantages become less decisive over time. You don't need H100s to build a competitive model if you can bootstrap from the outputs of models that were trained on H100s. The knowledge transfers even if the chips don't.
This is the dynamic that should worry policymakers more than any individual model release. AI capability is decoupling from hardware capability. The assumption that controlling chips means controlling AI progress has a shelf life, and that shelf life may already be expiring.
## Second-order effects
For builders outside the US and China, particularly in Southeast Asia, this shift has real implications.
The chip supply landscape is fragmenting. Huawei's Ascend ecosystem is maturing, and DeepSeek's decision to optimize V4 for it sends a strong signal to other labs considering non-Nvidia stacks. More options mean more complexity, but also less dependence on a single supply chain that's subject to the whims of US trade policy.
Open-weight models become more strategically important in this environment. If distillation can transfer capability across hardware platforms, then the models themselves, not the chips they were trained on, become the critical resource. Countries and companies that invest in open-weight model ecosystems gain flexibility. Those that rely solely on proprietary APIs remain dependent on decisions made in San Francisco or Washington.
The US diplomatic push to frame distillation as theft also creates awkward dynamics for countries that use both American and Chinese AI infrastructure. Singapore, for instance, has relationships with both ecosystems. A global campaign to stigmatize distillation could force uncomfortable choices on countries that would rather not choose sides.
## The systems dynamics view
Zoom out, and the pattern is familiar from other technology races. Export controls are a tool of delay, not prevention. They buy time for the controlling party to extend its lead. But if the target responds by building domestic alternatives and finding creative workarounds, the controls eventually become a tax on the controller's own competitiveness.
China's AI strategy is pragmatic. Use whatever works. Distill from American models when you can. Build on domestic hardware when you must. Open-source aggressively to build ecosystem lock-in and attract global developers. DeepSeek's decision to release V4 as open-weight isn't charity, it's strategy. Every developer who builds on DeepSeek's models becomes part of China's AI ecosystem.
The US response so far has been reactive: accuse, restrict, warn. But the fundamental challenge isn't about any single technique or any single model. It's that the relationship between hardware, software, and AI capability is more fluid than the export control framework assumed. You can't embargo knowledge that travels through API calls and model weights.
## What to watch
Three things will determine how this plays out.
First, whether DeepSeek V4's performance claims hold up under independent benchmarking. The model is in preview, and DeepSeek didn't disclose full training hardware or performance telemetry. If V4 genuinely matches GPT-5.2 on reasoning tasks while running on Huawei chips, that's a watershed moment. If the benchmarks tell a more nuanced story, the narrative shifts.
Second, whether Congress moves to criminalize cross-border distillation. Right now, the accusations rely on terms-of-service violations, not legal frameworks. Anthropic and OpenAI want stronger protections. But any law that restricts how model outputs can be used will have implications for the entire open-source AI ecosystem, not just Chinese labs.
Third, whether the Huawei Ascend ecosystem can scale. Running inference is one thing. Training frontier models from scratch on domestic silicon is another. If Huawei's chips can support full training runs at competitive scale, the hardware dependency assumption is definitively broken. If they can't, China's AI progress will still depend on access to Nvidia hardware, whether obtained legally or otherwise.
The export control playbook assumed that chips were the choke point. DeepSeek V4 is a bet that they're not. We're about to find out who's right.
## References
1. Reuters, "China's AI darling DeepSeek previews new model adapted for Huawei chip technology" (April 24, 2026) [reuters.com](http://reuters.com)
2. TechCrunch, "DeepSeek previews new AI model that 'closes the gap' with frontier models" (April 24, 2026) [techcrunch.com](http://techcrunch.com)
3. DW, "China's DeepSeek launches preview of new AI model" (April 24, 2026) [dw.com](http://dw.com)
4. CNN, "White House accuses China of copying American AI models in 'industrial-scale' campaign" (April 23, 2026) [cnn.com](http://cnn.com)
5. Ars Technica, "US accuses China of 'industrial-scale' AI theft. China says it's 'slander.'" (April 2026) [arstechnica.com](http://arstechnica.com)
6. Reuters, "Exclusive: US State Dept orders global warning about alleged China AI thefts by DeepSeek, others" (April 24, 2026) [reuters.com](http://reuters.com)
7. Anthropic, "Detecting and preventing distillation attacks" (February 23, 2026) [anthropic.com](http://anthropic.com)
8. Reuters, "OpenAI says China's DeepSeek trained its AI by distilling US models, memo shows" (February 12, 2026) [reuters.com](http://reuters.com)
9. Fortune, "DeepSeek unveils V4 model, with rock-bottom prices and close integration with Huawei's chips" (April 24, 2026) [fortune.com](http://fortune.com)
10. Tom's Hardware, "White House U-turn on Nvidia H200 AI accelerator exports down to Huawei's powerful new Ascend chips" [tomshardware.com](http://tomshardware.com)
11. Tom's Hardware, "U.S. Commerce Secretary says Nvidia still hasn't sold any H200 AI GPUs to China, Chinese government is blocking imports" [tomshardware.com](http://tomshardware.com)
12. Council on Foreign Relations, "China's AI Chip Deficit: Why Huawei Can't Catch Nvidia and U.S. Export Controls Should Remain" [cfr.org](http://cfr.org)
13. ITIF, "Backfire: Export Controls Helped Huawei and Hurt U.S. Firms" [itif.org](http://itif.org)
14. The New York Times, "DeepSeek's Sequel Set to Extend China's Reach in Open-Source A.I." (April 24, 2026) [nytimes.com](http://nytimes.com)
15. Reuters, "Nvidia halts China-bound H200 output, shifts TSMC capacity to Vera Rubin" (March 5, 2026) [reuters.com](http://reuters.com)
