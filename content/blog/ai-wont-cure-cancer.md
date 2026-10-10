---
title: "AI won't cure cancer"
date: "2026-04-18"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: ["OpenAI","LLMs","Models","Regulation","Safety","Google"]
---

OpenAI just announced GPT-Rosalind, a frontier reasoning model built for life sciences research, with Amgen, Moderna, and the Allen Institute as launch partners. Named after Rosalind Franklin, the chemist whose work was essential to discovering the structure of DNA, it promises to accelerate drug discovery by helping scientists explore more possibilities and surface connections that might otherwise be missed.
The announcement follows a now-familiar pattern. Every major AI company eventually pivots its messaging toward healthcare. IBM did it with Watson. Google did it with Google Health. Now OpenAI is doing it with Rosalind. The pitch is always the same: AI will make drug discovery faster, cheaper, and smarter. And the pitch is always partially true, which is exactly what makes it misleading.
## The pipeline problem
Drug discovery is not a single problem. It is a long, sequential gauntlet of problems, most of which have nothing to do with finding molecules.
It takes roughly 10 to 15 years to go from target discovery to regulatory approval for a new drug in the United States. Only about one in ten drugs that enter clinical trials ultimately gets approved. The average cost of bringing a single drug to market, including the cost of failures along the way, is estimated at \$1 to \$2.6 billion.
AI touches a real but narrow slice of this pipeline. It can help identify promising biological targets, generate novel molecular candidates, predict protein structures, and screen compounds computationally instead of physically. These are genuine contributions. But they address maybe the first two or three years of a decade-long process. Clinical trials, regulatory review, manufacturing scale-up, and distribution remain stubbornly human, slow, and expensive.
When OpenAI says it takes 10 to 15 years to bring a drug to market and that "advanced AI systems can help researchers move faster," the implication is that AI compresses the whole timeline. In practice, it compresses the front end.
## The graveyard of AI healthcare promises
OpenAI is not the first tech company to stake its reputation on AI-powered medicine. The track record is instructive.
IBM spent over \$4 billion building Watson Health into what was supposed to be a revolutionary tool for cancer treatment. Watson would ingest medical literature and patient data, then recommend personalized treatment plans. In reality, it struggled with unstructured patient data, made recommendations that contradicted oncologists' expert opinions, and relied on curated guidelines rather than learning dynamically from real cases. By 2022, IBM sold Watson Health's data and analytics products for a reported \$1 billion, a fraction of what it had invested.
Google Health, created in 2018 to consolidate the company's health AI projects, shuttered after just three years. More recently, in early 2026, Google had to pull AI-generated health summaries from search results after an investigation found that roughly 70% of 200 health-related AI Overviews were rated "risky" by an expert panel.
These failures share a common thread. The companies assumed that the hard part of healthcare was information processing, that if you could just analyze enough data fast enough, the answers would follow. But healthcare is not primarily an information problem. It is a regulatory problem, a coordination problem, a trust problem, and a human judgment problem.
## AlphaFold: the best case scenario
If you want to see what genuine AI progress in biology looks like, look at DeepMind's AlphaFold. It solved the protein structure prediction problem, a challenge that had stumped researchers for 50 years, and earned its creators a Nobel Prize in 2024. AlphaFold's database now contains predicted structures for over 200 million proteins, and it has accelerated research across structural biology, target identification, and drug design.
But here is the uncomfortable truth: AlphaFold, arguably the most consequential AI breakthrough in biology to date, has not shipped a drug.
DeepMind spun out Isomorphic Labs specifically to translate AlphaFold's capabilities into actual therapeutics. In early 2024, Isomorphic signed nearly \$3 billion in deals with Eli Lilly and Novartis. In February 2026, the company unveiled its Drug Design Engine, which scientists described as a major advance beyond AlphaFold 3. The technology is real and impressive.
Yet as of April 2026, no AI-discovered drug has received FDA approval. The most advanced AI-designed drug candidates are only now entering Phase III trials, with results expected over the next 18 months. Phase III is where most drugs die. Even the best computational predictions cannot tell you whether a molecule will be safe and effective in thousands of diverse human bodies over months or years of treatment.
AlphaFold is the success story, and even the success story illustrates the gap between discovering a promising compound and delivering an approved treatment to patients.
## Why pharma partnerships are great PR
OpenAI's announcement prominently features Amgen, Moderna, and the Allen Institute. These are credible, respected organizations. But pharma partnerships are not the same as pharma results.
Large pharmaceutical companies sign AI partnerships constantly. Novartis alone has deals with Isomorphic Labs, Microsoft, and now has its CEO sitting on Anthropic's board. Novo Nordisk just partnered with OpenAI to "deploy AI across R&D, manufacturing, and corporate functions." Takeda signed a deal worth over \$1.7 billion with Iambic Therapeutics.
These deals serve multiple purposes beyond advancing science. They signal innovation to investors. They hedge bets across multiple AI providers. They generate positive press coverage. And they are structured with milestone payments, meaning the AI company only gets the headline dollar amount if the drugs actually succeed, which historically most do not.
A partnership announcement tells you that a pharma company thinks AI might help. It does not tell you that AI has helped. The distinction matters enormously when the success rate for drugs entering clinical trials is around 10%.
## What would actually move the needle
The honest case for AI in drug development is more modest and more interesting than the headlines suggest.
AI is genuinely compressing preclinical timelines. One analysis suggests the traditional three-to-four-year process of finding a viable preclinical candidate is being compressed to 13 to 18 months. That is a real and meaningful acceleration, even if it does not touch the years of clinical trials that follow.
The FDA is also paying attention. In December 2025, it qualified its first AI-based tool for use in drug development clinical trials, a cloud-based platform for scoring liver biopsies in NASH/MASH trials. In 2025, the agency announced an "aggressive" timeline for implementing AI across all FDA centers, including in the review and approval process itself.
The areas where AI could have the most practical impact are often the least glamorous. Clinical trial design, where better patient selection and adaptive protocols could reduce the enormous cost of late-stage failures. Regulatory document automation, where AI could help companies navigate the mountain of paperwork required for submissions. Safety monitoring, where pattern recognition across large datasets could catch adverse events earlier.
These applications are not as exciting as "AI discovers a cure for cancer." But they address the actual bottlenecks in drug development, which are not about finding molecules but about proving they work safely in humans and getting them approved.
## The pattern we keep repeating
Every few years, a major technology company announces that AI will transform healthcare. The announcement generates breathless coverage. Pharma companies sign partnerships. Stock prices move. And then, slowly, reality reasserts itself.
This is not because AI is useless in healthcare. It is because the gap between "AI can process biological data faster" and "AI has cured a disease" is not a technology gap. It is a decade-long regulatory and clinical validation gap that no amount of compute can shortcut.
OpenAI's GPT-Rosalind may well be a useful tool for researchers. It may help scientists generate hypotheses faster, analyze genomic data more efficiently, and identify promising drug targets they would have otherwise missed. Those are valuable contributions.
But when the press release lands and the partnership logos line up and the narrative shifts to "AI for science," it is worth remembering: the hard part of curing diseases was never the science alone. It is everything that comes after.
## References
1. [Introducing GPT-Rosalind for life sciences research](https://openai.com/index/introducing-gpt-rosalind/), OpenAI, April 2026
2. [OpenAI launches AI model GPT-Rosalind for life sciences research](https://www.reuters.com/business/healthcare-pharmaceuticals/openai-launches-ai-model-gpt-rosalind-life-sciences-research-2026-04-16/), Reuters, April 2026
3. [OpenAI Takes on Google With New AI Model Aimed at Drug Discovery](https://www.bloomberg.com/news/articles/2026-04-16/openai-takes-on-google-with-new-ai-model-aimed-at-drug-discovery), Bloomberg, April 2026
4. [Case Study: The \$4 Billion AI Failure of IBM Watson for Oncology](https://www.henricodolfing.ch/en/case-study-20-the-4-billion-ai-failure-of-ibm-watson-for-oncology/), Henrico Dolfing
5. [How IBM's Watson Went From the Future of Health Care to Sold Off for Parts](https://slate.com/technology/2022/01/ibm-watson-health-failure-artificial-intelligence.html), Slate, January 2022
6. [Google removes AI Overviews for certain medical queries](https://techcrunch.com/2026/01/11/google-removes-ai-overviews-for-certain-medical-queries/), TechCrunch, January 2026
7. [AlphaFold: Five years of impact](https://deepmind.google/blog/alphafold-five-years-of-impact/), Google DeepMind, November 2025
8. [The Isomorphic Labs Drug Design Engine unlocks a new frontier beyond AlphaFold](https://www.isomorphiclabs.com/articles/the-isomorphic-labs-drug-design-engine-unlocks-a-new-frontier), Isomorphic Labs, February 2026
9. [Isomorphic Labs kicks off 2024 with two pharmaceutical collaborations](https://www.isomorphiclabs.com/articles/isomorphic-labs-kicks-off-2024-with-two-pharmaceutical-collaborations), Isomorphic Labs, January 2024
10. [How AI is Transforming Drug Discovery in 2026](https://medium.com/@unicodeveloper/how-ai-is-transforming-drug-discovery-in-2026-0d8c7c600428), Medium, April 2026
11. [The AI drug revolution is real but the hype around it isn't](https://www.fastcompany.com/91520205/the-ai-drug-revolution-is-real-but-the-hype-around-it-isnt), Fast Company
12. [FDA Announces Completion of First AI-Assisted Scientific Review Pilot](https://www.fda.gov/news-events/press-announcements/fda-announces-completion-first-ai-assisted-scientific-review-pilot-and-aggressive-agency-wide-ai), U.S. Food and Drug Administration, May 2025
13. [AI in drug discovery: predictions for 2026](https://www.drugtargetreview.com/ai-in-drug-discovery-predictions-for-2026/1865962.article), Drug Target Review
14. [Here's how AI is reshaping drug discovery](https://www.weforum.org/stories/2026/01/how-ai-is-reshaping-drug-discovery/), World Economic Forum, January 2026
15. [Novo Nordisk and OpenAI partner to speed drug discovery](https://www.wsj.com/tech/ai/novo-nordisk-and-openai-partner-to-speed-drug-discovery-864929fc), Wall Street Journal, April 2026
