---
title: "Random is not random"
date: "2026-03-16T14:21:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Psychology"]
tagColors: {"Psychology":"pink"}
postTags: []
---

You press shuffle on a playlist with 400 songs and somehow hear the same 20 tracks. You open TikTok for "just a second" and surface 45 minutes later, unsure how you got from cooking videos to conspiracy theories about mattress stores. You browse Netflix and every row feels like it was made for you, because it literally was.
We use the word "random" loosely. We say the algorithm showed us a "random" video, or that shuffle played a "random" song. But almost nothing in our digital lives is random anymore. The feeds, the playlists, the recommendations, they are all carefully constructed by systems designed to keep us engaged. And even the things that *are* random don't feel like it.
## The shuffle problem
In 2005, Apple users started complaining that the iPod's shuffle feature wasn't random. Songs from the same artist kept playing back to back. Albums seemed to cluster together. People were convinced Apple had rigged the system.
The thing is, shuffle *was* completely random. That was the problem.
Steve Jobs addressed it directly: "We're making it less random to make it feel more random." Apple introduced Smart Shuffle, which let users control how likely they were to hear consecutive songs from the same artist or album. The feature made shuffle *less* statistically random but *more* aligned with what people expected randomness to feel like.
Spotify ran into the same issue years later. For five years, their shuffle relied on a standard randomization method called the Mersenne Twister. Every song got a unique value based on a random seed, and the playlist was ordered accordingly. Mathematically fair. Completely unpredictable.
And users hated it.
The complaints were consistent: the same songs kept showing up, certain artists dominated, and the whole thing felt repetitive. Spotify's engineering team identified the core tension: randomness by definition doesn't guarantee even distribution, but human expectations do. Getting five heads in a row when flipping a coin is a perfectly valid random outcome, but it doesn't *feel* random.
Their solution was a system called Fewer Repeats. Instead of generating one random sequence, Spotify now generates multiple random sequences for a playlist, scores each one based on how recently the listener has heard those tracks, and picks the "freshest" version. Songs you just listened to get pushed further down the queue. The underlying math is still random, but the output is filtered through a layer of human perception.
As Spotify's engineering team put it, they are not changing the math behind randomness. They are simply choosing the version that sounds best.
## Everything is a "for you" page
If shuffle is the illusion of randomness, recommendation algorithms are the opposite: the illusion of discovery.
TikTok's For You page is the clearest example. Unlike older social platforms that showed you posts from people you followed in chronological order, TikTok's default screen is entirely algorithmic. You don't need to follow anyone. You don't even need an account history. The system starts recommending content immediately, using signals like how long you watch a video, whether you replay it, what you skip, and what you engage with.
The algorithm ranks videos based on a combination of factors: user interactions, video metadata like captions and hashtags, and device and account settings. As you scroll, the feed adapts in real time. Within minutes, it starts to feel uncannily accurate. Within hours, it can feel like the app knows you better than your friends do.
TikTok didn't invent this, but it perfected the speed. Older platforms needed weeks of data. TikTok's system starts profiling from the first scroll.
Netflix operates on a similar principle, just less visibly. Over 80% of what people watch on Netflix comes from its recommendation engine, not from browsing or searching. The platform splits viewers into more than two thousand "taste groups" and personalizes everything: which titles appear in each row, the order they are shown in, and even which thumbnail image you see for the same show. Two people looking at the same Netflix homepage will see entirely different content, arranged in entirely different ways.
YouTube processes over 80 billion signals daily to decide what to recommend. Its system balances short-term engagement with long-term satisfaction, weighing factors like watch time, click-through rate, and survey responses. The "Up Next" sidebar is not a list of related videos. It is a carefully ranked sequence designed to keep you watching.
The common thread is that none of these systems are showing you a random selection. They are showing you a calculated prediction of what will keep you on the platform longest.
## The gap between random and curated
There is a strange irony in all of this. When things *are* random, like old shuffle algorithms, we complain that they don't feel random enough. And when things are *not* random, like recommendation feeds, we describe them as "randomly" showing us content.
The truth is that we are bad at recognizing actual randomness. Cognitive psychologists have studied this for decades. Humans tend to see patterns in noise and expect random sequences to be more evenly distributed than probability predicts. When a truly random playlist clusters three jazz songs in a row, we assume the system is broken. When an algorithm feeds us increasingly narrow content, we assume we just happened to stumble on it.
This perception gap is what companies exploit, sometimes intentionally and sometimes just as a byproduct of optimizing for engagement. Spotify makes shuffle *less* random so it *feels* more random. TikTok makes its feed *more* curated so it *feels* like discovery.
## What this means in practice
None of this is inherently malicious. Spotify's Fewer Repeats system genuinely improves the listening experience. Netflix's recommendations save people from the paradox of choice. TikTok surfaces creators who would never find an audience on a follower-based platform.
But it is worth being honest about what is happening. The content you consume is not random. Your feed is not a neutral window into the world. It is a mirror, carefully angled to reflect your past behavior back at you, with just enough novelty to keep you engaged.
The next time shuffle plays exactly the song you were in the mood for, or a video appears on your feed that feels eerily relevant, remember: it is not a coincidence. It was never random.
## References
1. Spotify Engineering, "Shuffle: Making Random Feel More Human" (2025) - [engineering.atspotify.com](http://engineering.atspotify.com)
2. Steve Jobs on Smart Shuffle, Lapham's Quarterly - [laphamsquarterly.org](http://laphamsquarterly.org)
3. TikTok Newsroom, "How TikTok Recommends Videos #ForYou" - [newsroom.tiktok.com](http://newsroom.tiktok.com)
4. WIRED, "This Is How Netflix's Top-Secret Recommendation System Works" - [wired.com](http://wired.com)
5. YouTube Help, "How YouTube Recommendations Work" - [support.google.com](http://support.google.com)
6. Seldeslachts et al., "For You vs. For Everyone: The Effectiveness of Algorithmic Personalization in Driving Social Media Engagement," *ScienceDirect* (2025) - [sciencedirect.com](http://sciencedirect.com)
