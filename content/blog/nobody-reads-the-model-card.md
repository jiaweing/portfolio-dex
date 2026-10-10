---
title: "Nobody reads the model card"
date: "2026-04-12"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Every major AI model ships with a model card. It is the most honest document about what the model can and cannot do, covering its limitations, biases, intended uses, and performance benchmarks. And almost nobody reads them.
The gap between AI safety documentation and actual deployment practice is the real alignment problem, not the philosophical one. We spend enormous energy debating whether models might become sentient or misalign with human values at some future date, while ignoring the misalignment happening right now: the humans deploying these models don't bother to read the instructions.
## What model cards actually are
In 2019, researchers Margaret Mitchell, Timnit Gebru, and colleagues at Google proposed "model cards" as a framework for transparent model reporting. The idea was straightforward: every trained machine learning model should ship with a short document detailing its performance characteristics, intended use cases, limitations, and potential biases. Think of it as a nutrition label for AI.
The original paper, presented at the ACM Conference on Fairness, Accountability, and Transparency, argued that model cards should include benchmarked evaluations across different demographic and cultural groups. The goal was to help downstream users understand not just what a model could do, but where it would fail.
The concept stuck. Today, every major AI lab publishes some version of this documentation:
- **OpenAI** publishes system cards for GPT models, detailing safety evaluations, capability assessments, and preparedness framework results.
- **Anthropic** releases system cards for Claude models, covering responsible scaling policy evaluations, safety tests, and behavioral assessments.
- **Google DeepMind** maintains model cards for Gemini and other models.
- **Meta** provides model cards for Llama, including details on training methodology, intended uses, and out-of-scope applications.
- **Hugging Face** has made model cards a standard part of their model hub, with a template that any developer can use.
These aren't buried in obscure corners of corporate websites. They're public, detailed, and often quite candid about what can go wrong.
## The biggest lie in AI development
Nobody reads them.
This isn't speculation. It's the pattern you see in every developer community, every hackathon, every startup sprint. The workflow looks like this: find a model that seems to work, copy the API call from a tutorial or quickstart guide, integrate it into your application, ship it. The model card never enters the picture.
A 2025 study catalogued in the AI Model Risk Catalog found that risk reporting in model cards is "too thin, too biased toward technical/bias issues, and not nearly structured or candid enough about the harms we actually see." But even the information that is there goes unread. The documentation sits in PDFs and web pages that developers scroll past on their way to the API reference.
This is the software equivalent of nobody reading Terms of Service, except the stakes are considerably higher. When you skip Apple's ToS, you might miss a clause about data collection. When you skip a model card, you might miss that the model you're using for medical triage has known failure modes with certain demographic groups, or that the coding assistant you've deployed hallucinates plausible but incorrect security configurations.
Research has consistently confirmed this pattern in software more broadly. A well-known 2017 experiment by York University researchers found that virtually nobody reads online contracts, calling the habitual "I agree" click "the biggest lie on the internet." Model cards have inherited the same fate.
## The open source license parallel
This isn't a new problem wearing a new hat. The open source world has been dealing with exactly this dynamic for decades.
Every open source project has a license. The license dictates what you can and can't do with the code: whether you can use it commercially, whether modifications must be shared, whether you need to include attribution. These licenses are legally binding. Courts have enforced them.
And yet, as the Linux Foundation has documented, compliance remains a persistent challenge. Developers pull packages from npm, pip, and cargo without checking licenses. Companies discover during acquisition due diligence that their codebase contains GPL-licensed code they never intended to ship under those terms. The hidden chaos of open source compliance only surfaces when the stakes become tangible, during an audit, a lawsuit, or an IPO.
Model cards face the same dynamic, but with an added layer of complexity. An open source license violation might cost you money or force a code rewrite. Deploying a model outside its intended use could cause real harm to real people, whether through biased hiring decisions, flawed medical assessments, or unreliable safety systems.
## When safety commitments bend under pressure
The model card problem becomes even more acute when the organizations producing them are themselves under pressure to move fast.
Anthropic, the company that built its identity around AI safety, made headlines in February 2026 when it revised its Responsible Scaling Policy (RSP v3.0). The revision removed Anthropic's previous commitment to "pause the scaling and/or delay the deployment of new models" when safety measures hadn't kept pace with capabilities. As Business Insider reported, the company acknowledged that heightened competition and a lack of government regulation drove the change.
This is significant context for the model card discussion. If even the most safety-focused lab is loosening its commitments under competitive pressure, what happens downstream? The model card might say "not recommended for high-stakes medical decisions," but the startup building a diagnostic tool doesn't read the card. And the lab that wrote the card is now less likely to enforce that boundary through technical safeguards.
The line between "documented limitation" and "deployed capability" only holds if someone on the deployment side is actually reading the documentation.
## What regulation is trying to do about it
The EU AI Act, which became fully applicable in August 2026, represents the most ambitious attempt to turn model cards from suggestions into requirements. Under Article 53, providers of general-purpose AI models must maintain detailed technical documentation, provide it to downstream deployers, and comply with transparency obligations.
For high-risk AI systems, the requirements go further. The Act demands that deployers actually understand the systems they're using, conduct impact assessments, and maintain documentation of their own. The Practical AI Act Guide notes that the structure of model cards "greatly overlaps with the information required for the technical documentation of high-risk AI systems."
NIST has also weighed in. A March 2026 report on challenges to monitoring deployed AI systems identified "insufficient research on human-AI feedback loops" and "fragmented logging across distributed infrastructure" as key gaps. The report essentially confirms what builders already know: the distance between model documentation and deployed behavior is vast and poorly tracked.
But regulation can only do so much. The EU AI Act creates legal obligations, but compliance culture takes years to develop. And for the vast majority of AI applications being built today, outside the EU or below the high-risk threshold, the model card remains a voluntary artifact that gets voluntarily ignored.
## What you should actually check before shipping
Complaining about documentation going unread is easy. More useful is asking: if you had 15 minutes before deploying a model, what should you actually look for?
Here's a practical minimum:
1. **Intended use and out-of-scope applications.** Every model card lists what the model was designed for and what it wasn't. If your use case appears in the "out of scope" section, that's a red flag worth taking seriously.
2. **Known limitations and failure modes.** Models fail in predictable ways. The card usually documents these. Check whether any known failure modes overlap with your application's critical paths.
3. **Evaluation data and benchmarks.** Look at what the model was tested on. If your users or data look nothing like the evaluation set, expect degraded performance.
4. **Bias and fairness assessments.** If your application affects people differently based on demographic characteristics, check whether the model has been evaluated across those groups.
5. **Safety evaluations and red-team results.** For frontier models, system cards often include detailed safety testing. Skim the risk categories relevant to your use case.
6. **License and usage restrictions.** Some models have restrictions on commercial use, specific industries, or geographic regions. These are legally binding, even if nobody reads them.
7. **Training data provenance.** Understanding what the model was trained on helps you anticipate where it will be confident and where it will hallucinate.
None of this takes long. The problem isn't that model cards are impossibly dense. It's that the developer workflow doesn't include a step for reading them.
## Aligning the humans
The philosophical alignment debate asks: how do we ensure AI systems pursue goals that are beneficial to humanity? It's an important question. But it assumes we've solved a more immediate one: how do we ensure the humans deploying AI systems bother to understand what they're deploying?
Model cards are the closest thing we have to a shared contract between model creators and model deployers. They represent an honest attempt at transparency, the lab saying "here's what we know about this system, including the parts that worry us."
The problem isn't the documentation. The problem is the culture. We've built an industry where speed to deployment is rewarded and due diligence is friction. Where the fastest path from idea to production runs straight past the model card without stopping.
Changing this doesn't require a philosophical breakthrough. It requires the same boring, practical work that eventually improved (somewhat) software security practices: checklists, code review gates, organizational norms, and yes, regulation that creates consequences for negligence.
The model card is already written. Someone just has to read it.
## References
1. Mitchell, M., Wu, S., Zaldivar, A., Barnes, P., Vasserman, L., Hutchinson, B., Spitzer, E., Raji, I.D. & Gebru, T. (2019). "Model Cards for Model Reporting." Proceedings of the Conference on Fairness, Accountability, and Transparency. [https://arxiv.org/abs/1810.03993](https://arxiv.org/abs/1810.03993)
2. Quercia, D. "The Model Card Mirage: The AI Model Risk Catalog paints an uncomfortable portrait." SocialDynamics, Medium. [https://medium.com/socialdynamics/the-model-card-mirage-the-ai-model-risk-catalog-paints-an-uncomfortable-portrait-df57c8f20ac1](https://medium.com/socialdynamics/the-model-card-mirage-the-ai-model-risk-catalog-paints-an-uncomfortable-portrait-df57c8f20ac1)
3. OpenAI. "GPT-4o System Card." [https://openai.com/index/gpt-4o-system-card/](https://openai.com/index/gpt-4o-system-card/)
4. Anthropic. "System Card: Claude Opus 4 & Claude Sonnet 4." [https://www.anthropic.com/claude-4-system-card](https://www.anthropic.com/claude-4-system-card)
5. Anthropic. "Responsible Scaling Policy Version 3.0." [https://www.anthropic.com/news/responsible-scaling-policy-v3](https://www.anthropic.com/news/responsible-scaling-policy-v3)
6. "Anthropic Downgrades its AI Safety Policy Amid Market Pressures." AI Business, February 2026. [https://aibusiness.com/generative-ai/anthropic-downgrades-its-ai-safety-policy](https://aibusiness.com/generative-ai/anthropic-downgrades-its-ai-safety-policy)
7. EU Artificial Intelligence Act. [https://artificialintelligenceact.eu/](https://artificialintelligenceact.eu/)
8. NIST. "Challenges to the Monitoring of Deployed AI Systems." NIST AI 800-4, March 2026. [https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.800-4.pdf](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.800-4.pdf)
9. Obar, J.A. & Oeldorf-Hirsch, A. "The Biggest Lie on the Internet: Ignoring the Privacy Policies and Terms of Service Policies of Social Networking Services." The Guardian, 2017. [https://www.theguardian.com/technology/2017/mar/03/terms-of-service-online-contracts-fine-print](https://www.theguardian.com/technology/2017/mar/03/terms-of-service-online-contracts-fine-print)
10. NVIDIA. "Enhancing AI Transparency and Ethical Considerations with Model Card++." [https://developer.nvidia.com/blog/enhancing-ai-transparency-and-ethical-considerations-with-model-card/](https://developer.nvidia.com/blog/enhancing-ai-transparency-and-ethical-considerations-with-model-card/)
11. Hugging Face. "Model Cards." [https://huggingface.co/docs/hub/model-cards](https://huggingface.co/docs/hub/model-cards)
12. "Model cards." Practical AI Act Guide. [https://practical-ai-act.eu/latest/engineering-practice/model-cards/](https://practical-ai-act.eu/latest/engineering-practice/model-cards/)
