---
title: "Nineteen models in seventeen days"
date: "2026-04-26"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["Models","OpenAI","Google","Anthropic","Claude","Meta","xAI","Agents","Safety","Security","Economics","Regulation","Layoffs","Pricing","Cloud","Chips","Ecosystems"]
---

On April 1, 2026, there were maybe five frontier AI models worth knowing about. By April 17, there were at least nineteen new ones. GPT-5.4 in three flavors. Gemini 3.1 Pro. Grok 4.20 with its four-agent system. Claude Opus 4.7. Meta's Muse Spark. And somewhere in the background, a model so powerful that its own creators refused to release it, only for it to leak anyway.
This isn't a story about which model is best. That question stopped being useful somewhere around day five. This is a story about what happens when the pace of change outstrips everyone's ability to process it.
## The seventeen-day pile-up
The compression started in early March. OpenAI launched GPT-5.4 on March 5 with Standard, Thinking, and Pro variants, followed by mini and nano versions on March 17. The week of March 10-16 alone saw twelve major model releases from OpenAI, Google, xAI, and others, a density that had never happened before.
Then April hit. Google DeepMind shipped Gemini 3.1 Pro with native multimodal reasoning. xAI dropped Grok 4.20, built around a novel four-agent architecture where specialized sub-agents handle research, math, code, and creative tasks under a captain agent. On April 8, Meta released Muse Spark. On April 16, Anthropic shipped Claude Opus 4.7.
Each one of these would have been a headline in 2024. In April 2026, they blurred together.
## When benchmarks become noise
Here's the uncomfortable truth about nineteen models in seventeen days: nobody can properly evaluate any of them.
The benchmark landscape tells an interesting story. On Visual Capitalist's tracking of the Mensa Norway IQ benchmark, Grok 4.20 Expert Mode and GPT-5.4 Pro tied at the top with scores of 145. The gap between the top dozen models has compressed to just a few points. Stanford's AI Index reports that on Humanity's Last Exam, a benchmark of expert-level questions designed to be unsolvable by AI, the best models went from 8.8% accuracy in early 2025 to over 50% by April 2026.
These numbers are impressive in isolation. But when every model claims state-of-the-art performance on different benchmarks measured in different ways, the signal dissolves. As Stanford HAI researchers put it, the era of AI evangelism is giving way to an era of AI evaluation. The question is no longer "Can AI do this?" but "How well, at what cost, and for whom?"
The problem is that evaluation takes time, and time is exactly what this pace doesn't allow.
## Meta closes the door
The most significant shift in April wasn't a model launch. It was a philosophy change.
On April 8, Meta released Muse Spark, the first model from Meta Superintelligence Labs, a new division led by Alexandr Wang, who joined through Meta's \$14.3 billion acquisition of a stake in Scale AI. Muse Spark is natively multimodal, processes text, images, video, and audio, and operates in three distinct reasoning modes.
But the headline isn't the architecture. It's the license. Muse Spark is proprietary. No open weights. No community access to the underlying model. Available only through Meta's platforms: the Meta AI app, Instagram, Facebook, WhatsApp, Messenger, and Ray-Ban Meta AI glasses.
For three years, Meta was the loudest champion of open-weight AI. Llama models powered thousands of startups, research labs, and independent projects. Developers built entire companies on the assumption that Meta would keep shipping open weights. That assumption died on April 8.
The pivot had been telegraphed. Llama 4's disappointing reception in early 2025 led to internal reshuffling. Zuckerberg signaled in mid-2025 that Meta might not open-source all of its "superintelligence" models. By December 2025, Bloomberg reported on a proprietary model codenamed Avocado. But seeing it actually happen, seeing the pricing page where there used to be a download link, still landed differently.
The economic logic is straightforward. OpenAI, Google, and Anthropic charge for access to their best models. Meta needed to find new revenue from its massive AI investment. Open source, it turned out, was a strategy for a different era.
## The most dangerous model nobody was supposed to see
And then there's Claude Mythos.
On March 25, two security researchers discovered roughly 3,000 unpublished Anthropic assets sitting in a publicly searchable database. A misconfigured CMS, no hack, no whistleblower, just a default setting nobody changed. Among the leaked files were draft announcements for a model called Claude Mythos, internally codenamed Capybara, described as "by far the most powerful AI model we've ever developed."
Anthropic confirmed the model was real and called it "a step change" in capabilities. The leaked documents described a system that is, in their own words, "currently far ahead of any other AI model in cyber capabilities." Internal testing showed that engineers with no formal security training could ask Mythos to find remote code execution vulnerabilities overnight and wake up to a complete, working exploit.
Anthropic decided not to release it publicly. Instead, they launched Project Glasswing, a coalition with Google, Cisco, Broadcom, and the Linux Foundation, committing up to \$100 million in Claude usage credits to help secure open-source and private infrastructure before models like Mythos become widespread.
The irony writes itself. A company that branded itself as the safety-first AI lab had its most dangerous model leaked through a configuration error. Then, on the same day Anthropic announced it would offer Mythos to a select group of companies for controlled testing, a small group of unauthorized users gained access anyway, using a mix of contractor credentials and basic internet sleuthing.
This created a new pattern: capability as announcement, withholding as virtue, leaking as inevitability.
## Model selection is now a tax
For anyone building products on top of these models, the pace creates a specific kind of problem. It's not that the models aren't good. They're remarkably good. The problem is that choosing between them has become a meaningful cost.
Every week there's a new "best" model. Switching costs are real: different APIs, different context window behaviors, different strengths and failure modes. The frontier models, GPT-5.4 Pro, Gemini 3.1 Pro, Claude Opus 4.7, are separated by single-digit percentage points on most benchmarks. The practical differences often come down to pricing, latency, and which specific tasks a team cares about most.
This compression at the top means the decision about which model to use is increasingly a function of ecosystem lock-in, not raw capability. Do you use Azure? You're probably on GPT-5.4. Google Cloud? Gemini 3.1. Building agents? Claude might have the edge. The "best model" changes weekly; your infrastructure shouldn't.
The practical advice, unfashionable as it sounds, is to pick a tier (frontier, mid, small), pick a provider, and ship. Optimize later. The cost of perpetual model evaluation is higher than the cost of being on last week's best model.
## The consolidation question
There's a reasonable counter-argument that this pace is unsustainable. Nineteen models in seventeen days requires enormous capital expenditure, and most of these companies aren't profitable on their AI products. Meta is laying off 10% of its workforce while pouring billions into AI infrastructure. Anthropic is raising round after round of funding. OpenAI's costs continue to climb.
At some point, the economics have to resolve. Either these models start generating enough revenue to justify the investment, or the release cadence slows. The semiconductor supply chain adds its own constraints: training these models requires chips that don't exist in unlimited quantities.
But even if consolidation comes, and it likely will, the current moment is important because it's setting the competitive landscape. The companies that establish themselves as essential infrastructure now will have durable advantages when the dust settles. Meta going closed-source isn't just a licensing decision. It's a bet that the proprietary model business will sustain, and that open source was a market-building strategy, not a permanent identity.
## What this pace actually means
The gap between announcement and obsolescence is now measured in days, not months. A model that is state-of-the-art on Monday may be second-best by Friday. This has downstream effects that go beyond benchmarks.
For researchers, it means publishing cycles can't keep up. A paper analyzing GPT-5.4's capabilities is out of date before peer review.
For regulators, it means policy frameworks designed around annual model assessments are inadequate. The EU AI Act's risk classification system assumes a pace of change that no longer exists.
For users, it means the AI assistant in your phone might meaningfully change its behavior three or four times a quarter, with no changelog you'd ever read.
And for the companies building these models, it means the competition isn't really about who has the best model at any given moment. It's about who can sustain the pace, who can convert capability into revenue, and who can do both without a security breach making headlines.
Nineteen models in seventeen days. Not a release cadence. A pile-up.
## References
1. [OpenAI: Introducing GPT-5.4](https://openai.com/index/introducing-gpt-5-4/)
2. [Medium: April 2026 AI Models, Every Major Release Reviewed](https://medium.com/@sanjeevpatel3007/april-2026-ai-models-every-major-release-reviewed-6ea03d7bc0b7)
3. [Fortune: Anthropic 'Mythos' AI model representing 'step change' in power revealed in data leak](https://fortune.com/2026/03/26/anthropic-says-testing-mythos-powerful-new-ai-model-after-data-leak-reveals-its-existence-step-change-in-capabilities/)
4. [The New York Times: Anthropic Claims Its New A.I. Model, Mythos, Is a Cybersecurity 'Reckoning'](https://www.nytimes.com/2026/04/07/technology/anthropic-claims-its-new-ai-model-mythos-is-a-cybersecurity-reckoning.html)
5. [The Verge: Anthropic's most dangerous AI model just fell into the wrong hands](https://www.theverge.com/ai-artificial-intelligence/916501/anthropic-mythos-unauthorized-users-access-security)
6. [Meta AI: Introducing Muse Spark, Scaling Towards Personal Superintelligence](https://ai.meta.com/blog/introducing-muse-spark-msl/)
7. [Towards AI: Meta Muse Spark, Why Meta Abandoned Open-Source AI](https://pub.towardsai.net/meta-muse-spark-why-meta-abandoned-open-source-ai-and-what-it-means-277dee4d5b3b)
8. [WIRED: Meta's New AI Model Gives Mark Zuckerberg a Seat at the Big Kid's Table](https://www.wired.com/story/muse-spark-meta-open-source-closed-source/)
9. [Anthropic: Claude Mythos Preview](https://red.anthropic.com/2026/mythos-preview/)
10. [Visual Capitalist: Ranked, The Smartest AI Models of 2026](https://www.visualcapitalist.com/ranked-the-smartest-ai-models-in-2026/)
11. [Stanford HAI: AI Experts Predict What Will Happen in 2026](https://hai.stanford.edu/news/stanford-ai-experts-predict-what-will-happen-in-2026)
12. [IEEE Spectrum: Stanford's AI Index for 2026 Shows the State of AI](https://spectrum.ieee.org/state-of-ai-index-2026)
13. [Reddit: 12 AI models in one week, March 2026 model avalanche breaks all records](https://www.reddit.com/r/AIToolsPerformance/comments/1s7le3v/12_ai_models_in_one_week_march_2026_model/)
14. [CNBC: Meta's long-awaited AI model is finally here, but can it make money?](https://www.cnbc.com/2026/04/09/metas-long-awaited-ai-model-is-finally-here-but-can-it-make-money.html)
15. [Spiceworks: Anthropic's Claude Mythos, Breakthrough or Hype Machine?](https://www.spiceworks.com/ai/anthropics-claude-mythos-breakthrough-or-hype-machine/)
