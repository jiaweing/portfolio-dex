---
title: "ChatGPT forgot how to search"
date: "2026-04-11"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Something strange is happening with ChatGPT. It's searching the web less, not more.
In late 2024, Semrush analyzed 80 million clickstream records and found that about 46% of ChatGPT queries triggered a web search. By February 2026, that number had fallen to roughly 34.5%. The model that millions of people trust for up-to-date answers is increasingly choosing to answer from stale training data instead of checking the internet.
This isn't a bug. It's a structural tension baked into how large language models work, and it has implications for everyone who uses or builds on top of them.
## The data tells a clear story
The decline didn't happen overnight. SISTRIX, which tracks ChatGPT's search behavior across millions of responses, reported a sharp drop in September 2025. For anonymous users, the percentage of prompts that triggered a live web search fell from above 15% to below 2.5% in just two weeks. By December 2025, SISTRIX found that only 7.6% of prompts in the public version of ChatGPT resulted in a web search.
Semrush's clickstream data, drawn from over a billion lines of anonymized browsing behavior, paints the broader trend. The proportion of queries answered with live web data has been steadily shrinking. ChatGPT is getting more confident in its own internal knowledge, even as that knowledge ages.
At the same time, ChatGPT Search started citing fewer external sources. Search Engine Journal reported a 20% drop in the number of unique domains cited per response following a model transition in early March 2025. Fewer searches, fewer sources, fewer checks against reality.
## Why this is happening
To understand the decline, you need to understand the economics.
Every time ChatGPT performs a web search, it costs OpenAI money. The search API is expensive, roughly \$30 per thousand searches according to developer community reports. Compare that to Perplexity, which offers search at around \$5 per thousand queries. Web search also adds latency. A response that pulls from training data can arrive in seconds. One that searches the web first takes noticeably longer.
OpenAI has every incentive to minimize search usage. If the model can generate a plausible-sounding answer from its training data, that's cheaper and faster than hitting the web. The problem is that "plausible-sounding" and "correct" are not the same thing.
GPT-4o's training data cutoff was extended to June 2024 in a January 2025 update. Anything that happened after that date, any price change, any policy shift, any breaking news, exists in a blind spot unless the model actively searches for it. And it's searching less.
## The confidence trap
This is where things get genuinely dangerous. Large language models don't know what they don't know. They don't experience uncertainty the way humans do. When an LLM encounters a question about something outside its training data, it doesn't say "I'm not sure." It generates the most statistically likely continuation of the text, which often looks like a confident, authoritative answer.
Researchers at Carnegie Mellon University published findings showing that AI chatbots remain confident even when they're wrong. The models struggle to accurately judge their own uncertainty. When asked how confident they are, they tend to overestimate, especially on questions where their training data is thin or outdated.
This creates a paradox. As models get "smarter" and more capable, they become better at generating convincing-sounding answers. But if they're simultaneously searching the web less, they're generating those convincing answers from increasingly stale information. The output looks more authoritative while becoming less reliable.
Users don't see this happening. When ChatGPT answers a question about a recent event without searching the web, there's no indicator that the response came from months-old training data rather than a live source. The interface looks the same either way.
## Search as a product vs. search as a feature
The contrast with Google is instructive. For Google, search is the product. The entire business model depends on delivering current, relevant results. Every query is a web search by definition. There's no tension between answering from cached knowledge and checking the live web, because checking the live web is the only option.
ChatGPT bolted search onto a chat interface. It's fundamentally a language model that sometimes searches, not a search engine that sometimes generates text. The architecture reflects different priorities: conversation first, retrieval second.
This is also why the Perplexity comparison matters. Perplexity was built as a search-first AI. Every query triggers a web lookup. Sources are cited inline. The entire product is designed around retrieval-augmented generation, grounding every response in live data. It's a different architecture with different incentives.
The distinction isn't just technical. It shapes what users can trust. A dedicated search AI that always grounds its answers in current sources offers a fundamentally different reliability profile than a chat AI that decides, query by query, whether checking the web is worth the cost.
## What this means for builders
If you're building applications on top of ChatGPT's API, you can't assume the model will search the web when it should. The decision to search or not search is opaque. You don't control it, and the trend line suggests it will happen less over time.
This has practical consequences. A customer-facing chatbot powered by ChatGPT might confidently serve outdated pricing, discontinued products, or superseded policies. A research assistant might cite facts that were true six months ago but aren't anymore. An internal tool might miss critical regulatory changes.
The mitigation is straightforward but adds cost and complexity: force search. Use retrieval-augmented generation pipelines that always pull from current sources before generating a response. Don't rely on the model's judgment about when to search, because its judgment is optimized for efficiency, not accuracy.
## The bigger picture
This isn't really a story about ChatGPT being bad. The model is remarkably capable, and 34.5% web search usage still represents hundreds of millions of grounded queries.
The real story is an architectural tension that affects all chat-first AI. When you build a product around a language model and add search as an optional layer, you create a system with competing incentives. Search makes answers better but costs more and takes longer. The path of least resistance is always to skip it.
Google's AI Mode, which had over 100 million monthly active users by mid-2025, takes the opposite approach by integrating AI generation into a search-first workflow. Perplexity does the same from a startup perspective. Both bet that grounding comes first, generation second.
The market seems to be noticing. ChatGPT's app market share fell from 69.1% in January 2025 to 45.3% by early 2026, according to Apptopia data reported by Fortune. Google's Gemini climbed from 14.7% to 25.2% over the same period. Users may not articulate the search-grounding distinction, but they feel it when answers start to feel stale.
The question isn't whether ChatGPT will fix this. OpenAI is clearly aware of the tension and continues to invest in search capabilities. The question is whether the chat-first architecture can ever fully resolve it, or whether the incentive to skip search will always be baked into the economics.
For now, the safest assumption is simple: if you need current information, don't trust any AI to decide whether to check. Make it check.
## References
1. [Semrush, "Investigating ChatGPT Search: Insights from 80 Million Clickstream Records"](https://www.semrush.com/blog/chatgpt-search-insights/)
2. [SISTRIX, "ChatGPT Using Web Searches Less Frequently"](https://www.sistrix.com/blog/chatgpt-using-web-searches-less-frequently/)
3. [SISTRIX, "ChatGPT's Weakness in AI Search"](https://www.sistrix.com/blog/chatgpts-weakness-in-ai-search/)
4. [Search Engine Journal, "SISTRIX Reports Sharp Drop in ChatGPT Web Searches"](https://www.searchenginejournal.com/sistrix-reports-sharp-drop-in-chatgpt-web-searches/556835/)
5. [Search Engine Journal, "ChatGPT Search Is Citing Fewer Sites, Data Shows"](https://www.searchenginejournal.com/chatgpt-search-is-citing-fewer-sites-data-shows/571219/)
6. [OpenAI, "Model Release Notes"](https://help.openai.com/en/articles/9624314-model-release-notes)
7. [OpenAI Developer Community, "How Can I Use the Search API?"](https://community.openai.com/t/how-can-i-use-the-search-api/1003091?page=2)
8. [Carnegie Mellon University, "AI Chatbots Remain Confident, Even When They're Wrong"](https://www.cmu.edu/news/stories/archives/2025/july/ai-chatbots-remain-confident-even-when-theyre-wrong)
9. [Fortune, "ChatGPT's Market Share Is Slipping as Google and Rivals Close the Gap"](https://fortune.com/2026/02/05/chatgpt-openai-market-share-app-slip-google-rivals-close-the-gap/)
10. [SISTRIX, "AI Search: How the Data Shows That Google Is Winning"](https://www.sistrix.com/blog/ai-search-how-data-shows-that-google-is-winning/)
