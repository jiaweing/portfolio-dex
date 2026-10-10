---
title: "Effective vs. Active Parameters"
date: "2026-04-09"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Every time a new model drops, you see numbers like E2B, A4B, 30B-A3B. Most people gloss over them. But if you actually want to understand what you're running on your hardware, these letters matter.
Let's break down what E and A mean, because they're not the same thing, and they're filtering out different things.
## Total parameters
This is the raw number. Every single weight in the model file. If a model has 25.2 billion weights, that's 25.2B total parameters. Simple.
But total parameters alone doesn't tell you how the model actually behaves at inference time. Two models with the same total can perform very differently depending on their architecture.
## E: Effective parameters
Google introduced this with Gemma 4's smaller models (E2B, E4B). The "E" stands for **effective**.
These models use a technique called **Per-Layer Embeddings (PLE)**. Instead of one shared embedding table, PLE gives every decoder layer its own small embedding lookup for each token. This makes the model smarter, but those embedding tables are large in storage while being cheap in compute. They're just lookup tables, not matrix multiplications.
So Google separates them out:
<table header-row="true">
<tr>
<td></td>
<td>Gemma 4 E2B</td>
<td>Gemma 4 E4B</td>
</tr>
<tr>
<td>Total parameters</td>
<td>5.1B</td>
<td>\~8B</td>
</tr>
<tr>
<td>PLE embeddings</td>
<td>\~2.8B</td>
<td>\~4B</td>
</tr>
<tr>
<td>Effective parameters</td>
<td>\~2.3B</td>
<td>\~4B</td>
</tr>
</table>
The "E" prefix is Google saying: *the model file is bigger than you'd expect, but the compute-relevant part is only this much.* It's subtracting the storage-heavy but compute-cheap embedding layers.
These are dense models, so all effective parameters are active on every token. E = A here.
## A: Active parameters
The "A" prefix comes from **Mixture-of-Experts (MoE)** architecture. A MoE model has many specialized sub-networks called experts, but only a few are activated per token. A router decides which experts handle each piece of input.
Take Gemma 4's 26B-A4B:
- **Total parameters:** 25.2B
- **Total experts:** 128 + 1 shared
- **Active experts per token:** 8 + 1 shared
- **Active parameters per token:** 3.8B
So 25.2B parameters exist in the model, but only 3.8B are doing work for any given token. The rest sit idle. Which experts activate can change from token to token, which is why you still need all 25.2B in memory for best performance.
The "A" prefix is saying: *this is how much compute actually fires per forward pass.*
## The key difference
**E** subtracts parameters that are cheap to use (lookup tables from PLE). They exist, they contribute to quality, but they barely cost compute.
**A** subtracts parameters that are dormant (inactive MoE experts). They exist, they'll be used for other tokens, but they're not active right now.
Both prefixes exist because "total parameters" has become a misleading headline number. A 5.1B model that computes like a 2.3B model and a 25.2B model that computes like a 3.8B model are fundamentally different from dense 5B and 25B models.
## The full picture
<table header-row="true">
<tr>
<td>Model</td>
<td>Total</td>
<td>E (Effective)</td>
<td>A (Active)</td>
<td>Architecture</td>
</tr>
<tr>
<td>Gemma 4 E2B</td>
<td>5.1B</td>
<td>\~2.3B</td>
<td>\~2.3B</td>
<td>Dense + PLE</td>
</tr>
<tr>
<td>Gemma 4 E4B</td>
<td>\~8B</td>
<td>\~4B</td>
<td>\~4B</td>
<td>Dense + PLE</td>
</tr>
<tr>
<td>Gemma 4 31B</td>
<td>31B</td>
<td>31B</td>
<td>31B</td>
<td>Dense</td>
</tr>
<tr>
<td>Gemma 4 26B-A4B</td>
<td>25.2B</td>
<td>25.2B</td>
<td>3.8B</td>
<td>MoE (128 experts)</td>
</tr>
</table>
For a plain dense model like the 31B, all three numbers are the same. E and A only diverge when PLE or MoE are in play.
## Why this matters for you
**Memory:** You need enough RAM/VRAM for the **total** parameters (or close to it). Even in MoE, all experts should be in fast memory.
**Speed:** Inference speed correlates with **active** parameters. Lower A = faster token generation, since your GPU processes less data per token.
**Quality:** Scales more with **total** and **effective** parameters. More experts or richer embeddings mean better representations, even if they're not all active simultaneously.
So next time you see a model name with letters and numbers, you'll know exactly what trade-offs are being made. The letters aren't marketing fluff. They're telling you how the model actually runs.
## References
1. [Gemma 4 model card](https://ai.google.dev/gemma/docs/core/model_card_4), Google AI for Developers
2. [Gemma 4: Byte for byte, the most capable open models](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/), Google Blog
3. [Welcome Gemma 4: Frontier multimodal intelligence on device](https://huggingface.co/blog/gemma4), Hugging Face Blog
4. [A Visual Guide to Gemma 4](https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-gemma-4), Maarten Grootendorst
5. [Gemma 4 model overview](https://ai.google.dev/gemma/docs/core), Google AI for Developers
6. [Per-Layer Embeddings: A simple explanation](https://www.reddit.com/r/LocalLLaMA/comments/1sd5utm/perlayer_embeddings_a_simple_explanation_of_the/), r/LocalLLaMA
