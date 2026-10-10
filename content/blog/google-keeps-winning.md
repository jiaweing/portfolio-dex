---
title: "Google keeps winning"
date: "2026-03-12T01:52:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Everyone loves a comeback story. A couple of years ago, Google looked like it was fumbling the AI race. Bard launched to mass ridicule, OpenAI had all the momentum, and the narrative was set: Google was too slow, too bureaucratic, too afraid of cannibalizing Search to compete.
That narrative is dead now.
Google isn't just competing in AI. It's winning, and it's winning at almost every layer of the stack. From custom silicon to frontier models to multimodal capabilities no one else can match, Google has assembled something no other company has: full vertical integration across the entire AI value chain.
## They make their own chips
The most underrated part of Google's AI story is the hardware. While nearly every other AI lab is scrambling to buy Nvidia GPUs, Google has been quietly building its own custom silicon for over a decade.
Google's Tensor Processing Units (TPUs) are application-specific chips designed from the ground up for machine learning workloads. The first TPU was deployed internally in 2015, years before the current AI boom. Today, Google is on its seventh generation, called Ironwood, and these chips power everything from Gemini to AlphaFold.
This matters for a few reasons. First, it gives Google independence from the GPU supply chain that bottlenecks everyone else. Second, it allows tighter integration between hardware and software, meaning Google can optimize its models and infrastructure together in ways competitors simply cannot. Third, it's a massive cost advantage. Companies like Midjourney have reported 65% cost reductions after migrating to TPUs, and Cohere has seen 3x throughput improvements.
The proof is in the results. Every version of Gemini, including the state-of-the-art Gemini 3, was trained entirely on TPUs. Anthropic announced plans to access up to one million TPUs from Google Cloud in 2026 to train future generations of Claude. When your competitors are renting your hardware, that tells you something about who owns the infrastructure layer.
## The Bard-to-Gemini turnaround
Remember Bard? Google's hasty answer to ChatGPT launched in March 2023 to a wave of embarrassment. It hallucinated facts in its very first public demo. The stock dropped. The memes wrote themselves.
But Google did something that big companies rarely do well: it learned fast and adapted faster. Behind the scenes, organizational changes and a relentless focus on model quality turned the ship around. Bard was rebranded to Gemini in February 2024, powered by the new Gemini model family. By late 2024, the conversation had shifted. People stopped saying "Google is losing" and started noticing that Gemini was genuinely useful for daily work.
Then came Gemini 3, and the narrative flipped completely. Analysts who had written off Alphabet in the AI race called it short-sighted. Alphabet posted its first \$100 billion revenue quarter, with Search up 15%, Cloud up 35%, and YouTube growing double digits. CEO Sundar Pichai called the Gemini 3 launch "a major milestone," and he wasn't exaggerating.
The lesson here is structural. Google's comeback wasn't about one clever product launch. It was about the compounding advantage of owning the full stack: the data, the chips, the models, the distribution, and the products with billions of users already built in.
## Gemini Embedding 2 and the multimodal gap
The latest example of Google pulling ahead is Gemini Embedding 2, released on March 10, 2026. It's Google's first natively multimodal embedding model, and it does something no other embedding model can do at this scale.
Embeddings are the numerical representations that let AI systems understand and compare content. They're the backbone of search, recommendations, and retrieval-augmented generation (RAG). Most embedding models work with text only. Some handle text and images. Gemini Embedding 2 handles text, images, video, audio, and PDFs, all mapped into a single unified embedding space.
That means you can search for a video clip using a text description, or find a PDF based on an audio query, or compare an image against a document. All of these modalities live in the same semantic space, which opens up applications that were previously impractical or impossible.
The model generates 3072-dimensional vectors with support for flexible dimensionality (you can scale down to 128 dimensions for efficiency), and it outperforms leading models across text, image, and video benchmarks. It's particularly notable for its speech capabilities, which are a first for an embedding model at this level.
Google is currently the only company offering native multimodal embeddings that include video. Others have made progress on text-and-image embeddings, but the gap in video and audio understanding remains wide. This isn't a small lead, it's a structural one built on years of multimodal research and the infrastructure to train these models at scale.
## Vertical integration is the moat
![](/content/blog/google-keeps-winning/image-1.webp)
The pattern across all of these developments is the same: vertical integration. Google controls the chips (TPUs), the training infrastructure, the models (Gemini), the embedding layer, the cloud platform (Google Cloud and Vertex AI), and the consumer products (Search, YouTube, Gmail, Android).
No other company has this. OpenAI makes great models but depends on Microsoft for infrastructure and distribution. Anthropic builds impressive technology but relies on AWS, Google Cloud, and Nvidia for compute. Meta has strong models and distribution but doesn't make its own chips. Apple has custom silicon and distribution but is behind on frontier models.
Google is the only company where a single query can flow from a user's phone through custom hardware, a proprietary model, and a purpose-built embedding layer, all owned and optimized end to end.
Alphabet's financials reflect this advantage. Revenue grew from \$182.5 billion in 2020 to \$350 billion in 2024, with operating margins expanding from 23% to 32%. This isn't just AI hype translating to stock price. It's the flywheel of vertical integration producing real, compounding returns.
## What this means going forward
Google was late. It stumbled publicly. And now it's arguably in the strongest position of any company in the AI race, not because of any single breakthrough, but because it built the entire stack.
The companies that win in AI long-term won't be the ones with the best model on a single benchmark. They'll be the ones that control the most layers: chips, infrastructure, models, data, and distribution. Right now, Google controls more layers than anyone else.
The Bard days feel like ancient history. Google is rolling.
## References
1. Google Cloud, "Tensor Processing Units (TPUs)," [https://cloud.google.com/tpu](https://cloud.google.com/tpu)
2. CNBC, "Google's decade-long bet on custom chips is turning into company's secret weapon in AI race," November 2025, [https://www.cnbc.com/2025/11/07/googles-decade-long-bet-on-tpus-companys-secret-weapon-in-ai-race.html](https://www.cnbc.com/2025/11/07/googles-decade-long-bet-on-tpus-companys-secret-weapon-in-ai-race.html)
3. SemiAnalysis, "Google TPUv7: The 900lb Gorilla In the Room," [https://newsletter.semianalysis.com/p/tpuv7-google-takes-a-swing-at-the](https://newsletter.semianalysis.com/p/tpuv7-google-takes-a-swing-at-the)
4. Google Blog, "Gemini Embedding 2: Our first natively multimodal embedding model," March 2026, [https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-embedding-2/](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-embedding-2/)
5. Google AI for Developers, "Embeddings: Multimodal embeddings," [https://ai.google.dev/gemini-api/docs/embeddings](https://ai.google.dev/gemini-api/docs/embeddings)
6. Google Blog, "Gemini 3: Introducing the latest Gemini AI model from Google," [https://blog.google/products-and-platforms/products/gemini/gemini-3/](https://blog.google/products-and-platforms/products/gemini/gemini-3/) and 
7. Stephen Smith, "Why Google's Vertical Integration Creates a Formidable Moat in the AI Race," [https://www.smithstephen.com/p/why-googles-vertical-integration](https://www.smithstephen.com/p/why-googles-vertical-integration)
8. New Scientist, "Why Google's custom AI chips are shaking up the tech industry," [https://www.newscientist.com/article/2506354-why-googles-custom-ai-chips-are-shaking-up-the-tech-industry/](https://www.newscientist.com/article/2506354-why-googles-custom-ai-chips-are-shaking-up-the-tech-industry/)
9. NDTV, "Google's AI Comeback: A Year After Bard, Gemini Shines," September 2025, [https://www.ndtv.com/world-news/googles-ai-comeback-a-year-after-bard-gemini-shines-9334624](https://www.ndtv.com/world-news/googles-ai-comeback-a-year-after-bard-gemini-shines-9334624)
10. Observer, "Google's New A.I. Chip Is Shaking Nvidia's Dominance," December 2025, [https://observer.com/2025/12/google-ai-chip-tpu-nvidia-challenge/](https://observer.com/2025/12/google-ai-chip-tpu-nvidia-challenge/)
