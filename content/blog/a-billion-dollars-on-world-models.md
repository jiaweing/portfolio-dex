---
title: "A billion dollars on world models"
date: "2026-03-18"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Yann LeCun just raised \$1.03 billion before shipping a single product. Not a Series A. Not a growth round. A *seed* round, the largest ever for a European startup, valuing his company at \$3.5 billion with roughly 12 employees and zero revenue.
If that number doesn't make you pause, it should. It tells you something important about where the AI industry thinks it might be wrong.
## The bet
LeCun left Meta in November 2025 after twelve years as the company's Chief AI Scientist. He'd spent most of that time arguing, publicly and loudly, that large language models are a dead end for achieving human-level intelligence. LLMs predict the next word. They don't understand the world. They can tell you that a glass breaks when it falls off a table, but only because "glass" and "break" appear together in training data, not because they grasp gravity.
His new company, Advanced Machine Intelligence Labs (AMI), is headquartered in Paris with offices in New York, Montreal, and Singapore. The mission: build "world models," AI systems that learn from physical reality instead of text. Systems that understand cause and effect, maintain persistent memory, and can plan actions rather than guess tokens.
According to LeCun, the idea that scaling LLMs will produce human-level intelligence is "complete nonsense." His words, not mine.
## What world models actually are
The technical foundation is something called JEPA, the Joint Embedding Predictive Architecture, which LeCun first proposed in a 2022 paper and developed further at Meta through projects called I-JEPA and V-JEPA.
Here's the simplified version. Instead of predicting the next word (like ChatGPT) or the next pixel (like a video generator), JEPA predicts the next *abstract representation* of reality. It watches video, sensor data, and spatial information, then learns the underlying rules of how the physical world behaves. Not by memorizing specific images, but by building an internal model of cause and effect.
Think of how a toddler learns. A child who has never heard the word "gravity" still knows that a ball dropped from a table will hit the floor. That understanding comes from observation, not from reading about physics. JEPA aims to give machines the same kind of learning.
The key distinction from generative AI is efficiency. JEPA doesn't try to reconstruct every pixel of what it observes. It predicts in an abstract "representation space," ignoring unpredictable noise and focusing on the patterns that matter. Meta's V-JEPA, released in 2024, demonstrated up to 6x more training efficiency than generative approaches for video understanding.
The target applications reveal how different this is from the chatbot race: robotics, industrial process control, autonomous systems, healthcare, and wearable devices. These are domains where hallucinations aren't just embarrassing, they're dangerous.
## Follow the money
The investor list is what makes this story more than an academic argument.
The \$1.03 billion round was co-led by Cathay Innovation, Greycroft, Hiro Capital, HV Capital, and Bezos Expeditions. Strategic backers include Nvidia, Toyota Ventures, Samsung, Temasek, and Sea. Individual investors include Tim Berners-Lee, Jim Breyer, Mark Cuban, Eric Schmidt, and Xavier Niel.
Nvidia's involvement is the most telling signal. Jensen Huang's company makes the chips that power every major LLM on the planet. By backing AMI, Nvidia is hedging. If the industry moves beyond language models, Nvidia wants to supply the compute for whatever comes next. That's not ideology, that's portfolio management.
Temasek and Toyota Ventures point to where world models might first find real applications: manufacturing, robotics, and physical infrastructure in Asia. Samsung's presence suggests wearable and consumer device applications. These aren't investors betting on a research paper. They're companies betting on a technology they might actually use.
The round was reportedly oversubscribed. AMI originally targeted around €500 million but ended up raising nearly double that amount. When a company with no product raises twice what it asked for, that tells you the smart money is at least uncertain about the status quo.
## The team that walked away from big tech
LeCun serves as executive chairman while continuing as a professor at NYU. Running daily operations is Alexandre LeBrun, who previously built Nabla, a medical AI startup where he reached the same conclusion about LLMs from a completely different angle: in healthcare, hallucinations can kill patients.
The rest of the leadership reads like a targeted extraction from the top of the AI research world. Saining Xie, formerly of Google DeepMind, as chief science officer. Pascale Fung, a pioneer in human-centered AI, as chief research and innovation officer. Michael Rabbat, former Meta researcher, as VP of world models. Laurent Solly, Meta's former VP for Europe, as COO.
These aren't people who left cushy jobs because they were bored. They left because they think the current paradigm is wrong and that there's a narrow window to build something better.
## The counterargument is obvious
LLMs *work*. ChatGPT has over 400 million weekly users. Claude powers classified intelligence systems. Gemini is embedded across Google's product suite. OpenAI just closed a \$110 billion round, the largest private investment in history. The entire industry is shipping products, generating revenue, and producing measurable results right now.
World models, by contrast, are years from production use. AMI's own CEO, LeBrun, was refreshingly honest about this: "AMI Labs is a very ambitious project, because it starts with fundamental research. It's not your typical applied AI startup that can release a product in three months, have revenue in six months, and make \$10 million in annual recurring revenue in 12 months."
Dario Amodei thinks current AI architectures will replace all software developers within a year. Sam Altman says we're already past human-level AGI. These aren't fringe voices. They run the companies spending hundreds of billions on the exact approach LeCun is betting against.
LeCun's response has been consistent for years: "The fact that something works doesn't mean it's the right path. Horses worked. That didn't mean we shouldn't have built cars."
## What this actually tells us
I've written before about intelligence becoming a commodity. If that thesis holds, and text-based reasoning becomes cheap and ubiquitous, then the interesting question isn't who builds the best LLM. It's what comes after.
LeCun is making the most expensive bet in AI history that world models are that answer. He might be right. His track record earned it, he invented convolutional neural networks, the architecture that made modern computer vision possible, and won a Turing Award for it. When this particular scientist says the industry is digging in the wrong direction, it's worth taking seriously.
But here's the tension. LLMs are shipping *now*. They're imperfect, they hallucinate, they don't truly understand anything, and yet they're transforming how millions of people work every day. World models are a thesis, backed by a brilliant researcher, a strong team, and a staggering amount of money, but still a thesis.
The investor behavior is the most interesting signal. Nvidia backs both LLMs and world models. Bezos backs both OpenAI and AMI. Schmidt backs both. These aren't people picking a side. They're hedging, which means even the most sophisticated capital allocators in the world aren't sure which paradigm wins.
## The Paris angle
It's worth noting that AMI is headquartered in Paris, not San Francisco. Europe has struggled for years to produce a frontier AI company that can compete with American and Chinese labs. Mistral came closest but hasn't matched the scale of OpenAI or Anthropic.
AMI's approach is clever: don't try to beat the Americans at their own game. Build something different entirely. If world models work, AMI doesn't need to out-scale OpenAI. It needs to solve problems that LLMs fundamentally can't.
LeCun's choice of Paris as headquarters, with satellite offices in New York, Montreal, and Singapore, signals a genuinely global strategy. Deep talent pool, lower costs than the Bay Area, and proximity to industrial clients across Europe and Asia who might be the first real customers for AI that understands the physical world.
## The bottom line
A billion-dollar seed round for a company with no product is either a sign of extraordinary conviction or extraordinary excess. Probably both.
What makes AMI different from the typical AI hype cycle is the specificity of the critique. LeCun isn't saying AI doesn't work. He's saying the *current architecture* can't get to where the industry claims it's going. And he's backed that up by walking away from one of the most prestigious positions in AI research to prove it.
The next few years will tell us whether world models are the real next frontier or the most expensive research bet in startup history. But the fact that Nvidia, Bezos, Schmidt, and Temasek are all hedging against the LLM consensus? That alone makes this worth watching.
LeBrun offered the most honest framing: "We are developing world models that seek to understand the world, and you can't do that locked up in a lab. At some point, we need to put the model in a real-world situation with real data and real evaluations."
Theory is over. Now they have to prove it works.
## References
1. "Yann LeCun's AMI Labs raises \$1.03B to build world models," TechCrunch, March 9, 2026. [Link](https://techcrunch.com/2026/03/09/yann-lecuns-ami-labs-raises-1-03-billion-to-build-world-models/)
2. "Yann LeCun Raises \$1 Billion to Build AI That Understands the Physical World," WIRED, March 10, 2026. [Link](https://www.wired.com/story/yann-lecun-raises-dollar1-billion-to-build-ai-that-understands-the-physical-world/)
3. "Turing Winner LeCun's New 'World Model' AI Lab Raises \$1B In Europe's Largest Seed Round Ever," Crunchbase News, March 10, 2026. [Link](https://news.crunchbase.com/venture/world-model-ai-lab-ami-raises-europes-largest-seed-round/)
4. "Yann LeCun's AI start-up AMI raises \$1.03bn in seed funding," Silicon Republic, March 10, 2026. [Link](https://www.siliconrepublic.com/start-ups/yann-lecun-ai-start-up-ami-raises-seed-funding-world-model)
5. "Yann LeCun's new venture is a contrarian bet against large language models," MIT Technology Review, January 22, 2026. [Link](https://www.technologyreview.com/2026/01/22/1131661/yann-lecuns-new-venture-ami-labs/)
6. "Yann LeCun's AMI Labs raises \$1bn in Europe's biggest seed round," Sifted, March 10, 2026. [Link](https://sifted.eu/articles/yann-lecun-ami-labs-meta-funding-round-nvidia)
7. "AI godfather raises \$1.3 billion for start-up with Singapore as key base," The Straits Times, March 10, 2026. [Link](https://www.straitstimes.com/business/ai-godfather-raises-1-3-billion-for-start-up-with-singapore-as-key-base)
8. "Yann LeCun's New AI Startup Raises \$1 Billion in Seed Funding," Bloomberg, March 10, 2026. [Link](https://www.bloomberg.com/news/articles/2026-03-10/yann-lecun-s-new-ai-startup-raises-1-billion-in-seed-funding)
