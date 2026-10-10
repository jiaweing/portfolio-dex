---
title: "The state of AI voice"
date: "2026-04-12T23:22:00.000+08:00"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Voice AI is moving fast. In the span of about a year, we've gone from clunky, robotic phone bots to voice agents that can hold genuine conversations, and from cloud-only TTS services to open-source models with 82 million parameters that sound shockingly good running on a laptop. If you're building anything voice-related right now, the landscape looks completely different than it did even twelve months ago.
This post breaks down two sides of that shift: the commercial voice agent platforms competing to own the conversational AI stack, and the wave of lightweight open-source TTS models that are making local, private, high-quality speech synthesis a real option for the first time.
## The voice agent platforms
The commercial voice AI space has consolidated around a handful of platforms, each with a different philosophy. Some want to own the entire stack. Others want to be the glue layer. Understanding the distinction matters, because it shapes what you can build and how much control you have.
### ElevenLabs
ElevenLabs started as a text-to-speech company and has expanded into a full voice agent platform with ElevenAgents. The pitch is an end-to-end stack: TTS, voice cloning, conversational AI, telephony, and analytics all under one roof. If you want consistent production performance without stitching together multiple providers, ElevenLabs is the most integrated option available.
The voice quality is widely regarded as best-in-class among commercial offerings. ElevenLabs supports real-time audio streaming, offers over a thousand voices, and provides instant voice cloning. Their conversational AI platform handles both voice and text interactions, with deployment across telephony systems, web, and mobile.
Pricing starts at \$0.08 per minute on annual business plans, with a free tier offering 10,000 credits per month. The tradeoff is that you're locked into their ecosystem. If you want to swap out the TTS engine or use a different LLM routing strategy, you're working against the grain of the platform rather than with it.
### Vapi
Vapi takes the opposite approach. It's a developer-first orchestration layer that lets you choose your own STT, LLM, and TTS providers for each call. Think of it as the middleware for voice agents: you bring the models, Vapi handles the infrastructure, latency optimization, and telephony integration.
The platform supports over 100 languages, offers a no-code Flow Studio for building conversation flows, and provides API access to everything. Vapi also includes a unified telephony system and analytics dashboards for tracking call metrics.
Base pricing starts at \$0.05 per minute for orchestration, but the real cost depends on which models you plug in. A typical production setup runs between \$0.07 and \$0.25 per minute once you factor in STT, TTS, and LLM costs. The flexibility is the selling point, but it also means you're responsible for managing a more complex stack and tracking costs across multiple providers.
### Retell AI
Retell sits somewhere between ElevenLabs and Vapi. It's purpose-built for businesses that need to automate phone calls at scale, with a focus on customer support and outbound sales. Retell offers a visual flow builder, native telephony integration, and strong analytics including post-call sentiment analysis and success rate tracking.
One of Retell's strengths is its modular pricing. The base platform cost starts at \$0.07 per minute, and you can mix and match TTS providers (including ElevenLabs, Cartesia, OpenAI, and their own platform voices), LLMs, and telephony options. A typical setup with ElevenLabs voice and Claude runs around \$0.14 per minute.
Retell emphasizes low latency and handles both inbound and outbound calls. For teams that want a middle ground between full-stack simplicity and developer flexibility, it's a solid choice.
### Bland AI
Bland AI targets enterprise teams that need granular control over conversation logic. Its standout feature is Conversational Pathways, which lets you mix scripted branches with LLM-generated replies while setting guardrails to prevent hallucinations. You can define conditions, fallbacks, and sentiment-based routing.
The platform is built for scale, handling hundreds of thousands of concurrent calls with self-hosted options for teams that need latency control or compliance in regulated industries. Native integrations are limited and often require custom development, so it's best suited for engineering teams running high-volume call operations. Pricing sits around \$0.09 per minute plus subscription and outbound fees.
### Platform comparison
<table fit-page-width="true" header-row="true">
<tr>
<td></td>
<td>**ElevenLabs**</td>
<td>**Vapi**</td>
<td>**Retell AI**</td>
<td>**Bland AI**</td>
</tr>
<tr>
<td>**Approach**</td>
<td>Full-stack, end-to-end</td>
<td>Modular orchestration layer</td>
<td>Mid-range, modular pricing</td>
<td>Enterprise, granular control</td>
</tr>
<tr>
<td>**Base pricing**</td>
<td>\~\$0.08/min</td>
<td>\~\$0.05/min + model costs</td>
<td>\~\$0.07/min + model costs</td>
<td>\~\$0.09/min + fees</td>
</tr>
<tr>
<td>**Typical cost**</td>
<td>\$0.08/min</td>
<td>\$0.07 - \$0.25/min</td>
<td>\~\$0.14/min</td>
<td>\$0.09/min+</td>
</tr>
<tr>
<td>**BYO models**</td>
<td>No</td>
<td>Yes (STT, LLM, TTS)</td>
<td>Partial (mix TTS/LLM)</td>
<td>Partial</td>
</tr>
<tr>
<td>**Best for**</td>
<td>Small teams wanting simplicity</td>
<td>Developers wanting flexibility</td>
<td>Mid-size teams, phone automation</td>
<td>Enterprise, regulated industries</td>
</tr>
<tr>
<td>**Self-hosted**</td>
<td>No</td>
<td>No</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>**Standout feature**</td>
<td>Best-in-class voice quality</td>
<td>100+ languages, full provider choice</td>
<td>Post-call sentiment analysis</td>
<td>Conversational Pathways with guardrails</td>
</tr>
</table>
### How to think about choosing
The choice between these platforms comes down to a few questions:
- **Do you want a single vendor or a modular stack?** ElevenLabs gives you everything in one place. Vapi gives you maximum flexibility. Retell and Bland fall in between.
- **How much engineering capacity do you have?** Retell and ElevenLabs are friendlier to smaller teams. Vapi and Bland reward teams with strong engineering resources.
- **What's your call volume?** At high volumes, the per-minute cost differences add up. Bland and Retell offer enterprise pricing that can bring costs down significantly.
- **Do you need compliance controls?** Bland's self-hosted options and detailed logging make it the strongest choice for regulated industries.
## The open-source TTS revolution
While the commercial platforms have been competing on features and pricing, something arguably more important has been happening in the open-source world. A new generation of TTS models has emerged that are small enough to run locally, good enough to compete with commercial offerings, and permissively licensed enough to use in production.
What makes this wave remarkable is the parameter count. These aren't billion-parameter behemoths that require expensive GPU clusters. They're models in the tens to hundreds of millions of parameters that run on consumer hardware, sometimes even on CPUs.
### Kokoro-82M
Kokoro is the model that proved small TTS could sound great. With just 82 million parameters, it delivers voice quality that competes with models many times its size. Built on the StyleTTS 2 architecture with an ISTFTNet decoder, Kokoro uses a decoder-only design with no diffusion or encoder components, which keeps it fast and lightweight.
Before its public release on Christmas Day 2024, Kokoro was the number one ranked model on the TTS Spaces Arena on Hugging Face, beating models trained on far more data with far more parameters. It was trained on less than 100 hours of audio data, which is remarkably little by modern standards.
Kokoro ships with 10 voicepacks covering American and British English accents, with community-driven expansion to French, Korean, Japanese, and Mandarin. It runs comfortably on a standard NVIDIA GPU or Apple Silicon via MPS acceleration, and an ONNX version is available for optimized deployment.
The Apache 2.0 license means you can use it commercially without restrictions. For developers who need decent English TTS without cloud dependencies, Kokoro set a new bar for what's possible at this scale.
### Orpheus TTS
If Kokoro proved that small models could sound good, Orpheus proved that LLM-based architectures could make speech sound *human*. Built on the Llama 3B backbone by Canopy Labs, Orpheus is a 3-billion-parameter model that treats speech synthesis as a language modeling problem.
The results are striking. Orpheus produces speech with natural intonation, emotion, and rhythm that rivals closed-source commercial models. It supports zero-shot voice cloning, guided emotion and intonation control through simple tags like `[cheerful]` or `[whisper]`, and streaming latency as low as 200ms (reducible to around 100ms with input streaming).
The architecture uses 7 tokens per audio frame decoded as a single flattened sequence rather than using multiple language model heads, combined with a CNN-based tokenizer. This design keeps inference efficient enough for real-time applications. Orpheus was trained on over 100,000 hours of English speech data and billions of text tokens.
Orpheus is available on platforms like Groq and Together AI for cloud inference, and can be self-hosted. It's licensed under Apache 2.0, making it viable for commercial use.
### Chatterbox
Chatterbox, developed by Resemble AI, is a family of open-source TTS models that has gained serious traction, surpassing a million downloads on Hugging Face. The latest model in the lineup, Chatterbox-Turbo, uses a streamlined 350-million-parameter architecture that reduces compute and VRAM requirements while maintaining high-fidelity output.
What sets Chatterbox apart is its distilled one-step decoder. Where earlier versions required 10 diffusion steps to generate audio, Turbo does it in a single step. This makes it one of the fastest open-source TTS options available. Chatterbox also supports emotion exaggeration control, a feature that's rare in open-source models, and zero-shot voice cloning from roughly 5 seconds of audio.
The model has been benchmarked favorably against ElevenLabs in blind evaluations, which is notable for a free, MIT-licensed model. Chatterbox Multilingual extends support to 23 languages, making it one of the more versatile open-source options.
### Other notable models
The open-source TTS space is moving quickly, and several other models deserve attention:
- **Pocket TTS** is a 100-million-parameter model built on a novel architecture called Continuous Audio Language Models (CALM). It runs faster than real-time on a laptop CPU, making it one of the most efficient options for truly resource-constrained environments.
- **Fish Speech 1.5** excels at multilingual synthesis and code-switching (mixing languages within a single utterance), handling scenarios like Spanglish better than most paid APIs.
- **CosyVoice2-0.5B** from FunAudioLLM uses a dual autoregressive architecture and is consistently ranked among the top open-source models for accuracy across multiple languages.
- **NeuTTS Air** by Neuphonic is built on a 0.5B-parameter LLM backbone and is designed specifically for on-device deployment, running on everything from laptops to Raspberry Pis.
- **Qwen3-TTS** introduces "instructable TTS," where you can control voice characteristics through natural language prompts like "speak with a sarcastic, skeptical tone, accelerating slightly at the end."
### TTS model comparison
<table fit-page-width="true" header-row="true">
<tr>
<td></td>
<td>**Kokoro-82M**</td>
<td>**Orpheus TTS**</td>
<td>**Chatterbox-Turbo**</td>
<td>**Pocket TTS**</td>
<td>**Fish Speech 1.5**</td>
</tr>
<tr>
<td>**Parameters**</td>
<td>82M</td>
<td>3B</td>
<td>350M</td>
<td>100M</td>
<td>N/A</td>
</tr>
<tr>
<td>**Architecture**</td>
<td>StyleTTS 2 + ISTFTNet</td>
<td>Llama 3B backbone</td>
<td>Distilled one-step decoder</td>
<td>CALM</td>
<td>N/A</td>
</tr>
<tr>
<td>**Voice cloning**</td>
<td>No</td>
<td>Yes (zero-shot)</td>
<td>Yes (\~5s audio)</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>**Emotion control**</td>
<td>No</td>
<td>Yes (tags)</td>
<td>Yes (exaggeration control)</td>
<td>No</td>
<td>No</td>
</tr>
<tr>
<td>**Languages**</td>
<td>English + community (FR, KO, JA, ZH)</td>
<td>English</td>
<td>23 (with Multilingual)</td>
<td>English</td>
<td>Multilingual + code-switching</td>
</tr>
<tr>
<td>**Runs on CPU**</td>
<td>Via ONNX</td>
<td>No</td>
<td>No</td>
<td>Yes (faster than real-time)</td>
<td>No</td>
</tr>
<tr>
<td>**License**</td>
<td>Apache 2.0</td>
<td>Apache 2.0</td>
<td>MIT</td>
<td>Open-source</td>
<td>Open-source</td>
</tr>
<tr>
<td>**Streaming latency**</td>
<td>Low</td>
<td>\~100 - 200ms</td>
<td>Very low (single step)</td>
<td>Very low</td>
<td>N/A</td>
</tr>
</table>
## What this means
The convergence of these two trends, capable commercial platforms and increasingly competitive open-source models, is reshaping what's possible with voice AI.
For **product teams building voice agents**, the commercial platforms have matured to the point where deploying a production voice agent is a weeks-long project rather than a months-long one. The main challenge is no longer the technology itself but designing conversations that actually help users and integrating agents into workflows that create business value.
For **developers who need TTS**, the open-source options mean you no longer have to choose between quality and cost. A model like Kokoro or Chatterbox-Turbo can run locally, costs nothing per character, and sounds good enough for most production use cases. The days when high-quality TTS required an expensive API subscription are ending.
For **privacy-conscious applications**, local TTS models eliminate the need to send user data to external services. This opens up use cases in healthcare, legal, and finance that were previously impractical with cloud-only solutions.
The most interesting space to watch is where these trends intersect: voice agent platforms that let you plug in your own open-source TTS models. Vapi's modular architecture already supports this pattern, and as open-source models continue to improve, the economic case for self-hosted TTS within commercial orchestration platforms will only get stronger.
Voice AI is no longer an expensive experiment. It's becoming infrastructure.
## References
1. ElevenLabs Conversational AI Platform, [https://elevenlabs.io/conversational-ai](https://elevenlabs.io/conversational-ai)
2. Vapi Developer Platform, [https://docs.vapi.ai/quickstart/introduction](https://docs.vapi.ai/quickstart/introduction)
3. Retell AI Voice Agent Platform, [https://www.retellai.com](https://www.retellai.com)
4. Bland AI Platform, [https://www.bland.ai](https://www.bland.ai)
5. Kokoro-82M on Hugging Face, [https://huggingface.co/hexgrad/Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M)
6. Orpheus TTS on GitHub, [https://github.com/canopyai/Orpheus-TTS](https://github.com/canopyai/Orpheus-TTS)
7. Chatterbox TTS by Resemble AI, [https://github.com/resemble-ai/chatterbox](https://github.com/resemble-ai/chatterbox)
8. Orpheus TTS on Hugging Face, [https://huggingface.co/canopylabs/orpheus-3b-0.1-ft](https://huggingface.co/canopylabs/orpheus-3b-0.1-ft)
9. "The Best Open-Source Text-to-Speech Models in 2026," BentoML, [https://www.bentoml.com/blog/exploring-the-world-of-open-source-text-to-speech-models](https://www.bentoml.com/blog/exploring-the-world-of-open-source-text-to-speech-models)
10. "The Best Small Text-to-Speech Models in 2026," SiliconFlow, [https://www.siliconflow.com/articles/en/best-small-text-to-speech-models-2025](https://www.siliconflow.com/articles/en/best-small-text-to-speech-models-2025)
11. "Pocket TTS: 100M TTS and Voice Cloning model for CPUs," Medium, [https://medium.com/data-science-in-your-pocket/pocket-tts-100m-tts-and-voice-cloning-model-for-cpus-dfe3185fa0a8](https://medium.com/data-science-in-your-pocket/pocket-tts-100m-tts-and-voice-cloning-model-for-cpus-dfe3185fa0a8)
12. "Top Open-Source Text to Speech Models," Modal, [https://modal.com/blog/open-source-tts](https://modal.com/blog/open-source-tts)
13. "Best AI Voice Agent Platforms (2025 Review & Comparison)," Synthflow, [https://synthflow.ai/blog/8-best-ai-voice-agents-for-business-in-2026](https://synthflow.ai/blog/8-best-ai-voice-agents-for-business-in-2026)
