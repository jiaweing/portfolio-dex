---
title: "The codec cartel just woke up"
date: "2026-04-15"
lastEdited: "2026-04-29T12:40:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Pricing","Moats","Hardware","Economics","Open Source"]
---

You probably streamed something today. A YouTube video over breakfast, a Zoom call, a clip on Instagram. Every single one of those streams was decoded by a piece of invisible infrastructure called a video codec, and the most ubiquitous one on the planet, H.264, just had its licensing fees jacked up by 4,500%.
Not a typo. The annual cap went from \$100,000 to \$4.5 million. And most people have no idea this layer of the internet even exists.
## The invisible tax on every stream
H.264, also known as AVC, is the backbone of internet video. It was finalized in 2003 and has been the default video compression standard for over two decades. When you watch Netflix, join a Google Meet, or scroll through TikTok, there's a very good chance H.264 is doing the heavy lifting under the hood.
Like most modern video standards, H.264 is built on patented technology. Thousands of patents, owned by dozens of companies, pooled together under a licensing administrator called Via Licensing Alliance (formerly MPEG LA). If you want to use H.264 in a commercial product or streaming service, you pay Via LA a royalty.
For years, this was a rounding error. The old fee structure capped annual streaming royalties at \$100,000 for large platforms. For companies pulling in billions in subscription revenue, that number was so small it probably got lost in someone's expense report.
## What changed
As of January 2026, Via LA replaced that flat cap with a tiered fee structure. The new pricing scales based on platform size, and at the top of the table, Tier 1 OTT platforms with 100 million or more subscribers now face a list fee of \$4.5 million per year. That's a 45x increase.
There's an important caveat: existing licensees who had an active agreement by the end of 2025 are grandfathered in under their old terms. Via LA reportedly reached out to unlicensed media companies throughout 2025 to give them a window to lock in the old pricing. The new fees target companies seeking a fresh AVC license from 2026 onward.
But the signal is clear. The era of cheap codec licensing is over. And H.264 isn't the only one getting repriced. H.265 (HEVC) licensing fees were also hiked recently, and the patent landscape for next-generation codecs like VVC is even more fragmented. Taken together, major streaming platforms could be staring at nine-figure annual licensing bills across their codec stack.
## Rent-seeking on foundational infrastructure
This is a pattern we've seen before. When a piece of technology becomes so fundamental that everyone depends on it, the entity controlling the toll booth eventually decides to raise the price.
Domain registrars did it. Verisign's wholesale price for .com domains has climbed steadily for years under a cozy arrangement with ICANN. SSL certificates were another example, until Let's Encrypt came along in 2015 and made them free. Before that, companies were paying hundreds of dollars a year for basic encryption that should have been table stakes for any website. Let's Encrypt celebrated its 10th anniversary in December 2025, having fundamentally changed how the internet thinks about TLS certificates.
The codec licensing play follows the same script. The underlying patents were filed decades ago. The R&D costs have long been recouped. What remains is a toll booth on infrastructure that the entire internet now depends on, and the toll just got a lot more expensive.
## The escape hatch: AV1
This is where things get interesting. AV1, short for AOMedia Video 1, is an open, royalty-free video codec developed by the Alliance for Open Media. The alliance's membership reads like a who's who of tech: Google, Apple, Amazon, Meta, Microsoft, Netflix, Mozilla, Intel, AMD, Nvidia, Samsung, and dozens more.
AV1 was designed from the ground up as a patent-free alternative to the licensing quagmire of H.264 and H.265. It delivers roughly 34% lower bitrates than VP9 and about 50% lower than H.264 at comparable visual quality. In plain terms, it makes video look better while using less bandwidth.
Adoption has been accelerating. Netflix now uses AV1 for about 30% of its total streaming traffic. YouTube has been encoding in AV1 since 2018. Amazon Prime Video adopted it in 2021. Instagram Reels, Microsoft Teams, and Discord all use AV1 in some capacity. The Verge reported that adoption is growing across every major platform.
## The hardware decoder gap
But AV1 isn't a perfect drop-in replacement, and it would be dishonest to pretend otherwise. The biggest bottleneck is hardware.
Decoding video efficiently, especially on mobile devices and TVs, requires dedicated silicon. You can decode AV1 in software using tools like dav1d, but hardware decoders are what make it practical at scale without draining your battery in twenty minutes.
As of mid-2024, roughly 10% of smartphones had hardware AV1 decode support, according to ScientiaMobile. That number is growing fast. Apple added hardware AV1 decoding starting with the iPhone 15 Pro and A17 Pro chip, and it's standard across the entire iPhone 16 and 17 lineups. Samsung's Galaxy S21 and later support it. Modern Qualcomm Snapdragon and MediaTek Dimensity chips include it. On the TV side, most smart TVs shipped in the last couple of years have AV1 silicon.
Netflix's data suggests about 30% of devices in their ecosystem now support AV1 hardware decoding. That's a meaningful threshold, but it still means 70% of devices are relying on software fallback or H.264. Hardware decoder proliferation takes years because it depends on chip design cycles, not software updates. You can't patch in a hardware decoder.
Meta published research showing that software-based AV1 decoding on mobile devices has improved considerably and doesn't necessarily cause excessive battery drain, but it's still not the same as native silicon. The full benefits of AV1, especially at lower power consumption, won't be realized until mid-tier and budget chipsets include hardware decode support as standard.
## The patent cloud
There's another uncomfortable reality. Some industry observers argue that AV1 may not be truly patent-free, despite the Alliance for Open Media's royalty-free licensing terms. Patent assertion entities have filed claims against AV1, and some companies, including Synology, Dell, and HP, have reportedly removed certain next-gen codec support from products to avoid litigation risk.
The argument goes like this: just because AOMedia members have agreed to royalty-free licensing doesn't mean every patent holder with a potentially relevant claim has done the same. The most cautious legal interpretation suggests a codec isn't safely clear of patent risk until at least 20 years after its specification is published, which for AV1 would be around 2038.
That said, AOMedia's membership includes most of the major patent holders in the video space. The practical risk for a company already paying into AV1's ecosystem is much lower than the theoretical maximum. And critically, AV1's patent structure mirrors the W3C model: members agree to royalty-free licensing as a condition of participation. It's not just an open codec. It's a deliberate institutional design to prevent the kind of rent-seeking that H.264 licensing now represents.
## Everyone watches the model war, nobody watches the plumbing
Here's the part that connects to a bigger theme. Right now, the tech world is obsessed with the AI model war. Which foundation model is best? Who has the biggest context window? Will GPT-5 make Claude obsolete or vice versa?
But the infrastructure layer underneath those models, the plumbing, is where the real economic leverage lives. And we've already seen the playbook. OpenAI's API pricing trajectory is a preview: start cheap to build adoption, then gradually increase prices as switching costs rise and dependency deepens. It's the same pattern as codec licensing, SSL certificates, and domain registrars before it.
The H.264 fee hike is a reminder that the most consequential technology battles aren't always the ones making headlines. They're the ones happening in the layers we take for granted. Video codecs, encryption standards, DNS infrastructure, cloud egress pricing, API rate limits. These are the chokepoints where rent-seeking compounds over time.
For smaller markets like Singapore, where bandwidth costs are already significant and streaming infrastructure investment runs lean, these licensing shifts hit disproportionately hard. A 45x fee increase doesn't scale down just because your market is smaller.
## What happens next
The H.264 fee hike will likely accelerate AV1 migration, especially for companies that haven't yet locked in legacy licensing terms. It's a forcing function. When the "good enough" incumbent suddenly becomes expensive, the open alternative looks a lot more attractive.
AV2, the next-generation successor to AV1, is already in development. AOMedia announced its year-end launch timeline, and over half of the alliance's members reportedly plan to adopt it within 12 months of release. The open codec ecosystem is building momentum, not losing it.
But transitions at infrastructure scale take time. H.264 will remain the dominant codec for years, just as COBOL still runs bank mainframes and IPv4 still powers most of the internet. The question isn't whether AV1 wins eventually. It's how much rent gets extracted in the meantime.
The codec cartel just reminded us that invisible infrastructure isn't free. It's just been cheap enough that nobody noticed. Until now.
## References
1. [Tom's Hardware: Firm quietly boosts H.264 streaming license fees from \$100,000 up to staggering \$4.5 million](https://www.tomshardware.com/service-providers/streaming/h264-streaming-license-fees-jump-from-100000-to-4-5-million)
2. [TechSpot: H.264 streaming fees jump from \$100,000 to \$4.5 million a year under new licensing terms](https://www.techspot.com/news/111971-h264-licensing-fees-could-jump-100k-45m-streaming.html)
3. [Streaming Media: H.264 Streaming Fees: What Changed, Who's Affected, and What It Means](https://www.streamingmedia.com/Articles/News/Online-Video-News/H.264-Streaming-Fees-What-Changed-Whos-Affected-and-What-It-Means-173935.aspx)
4. [Via Licensing Alliance: AVC/H.264 Licensing Program](https://via-la.com/licensing-programs/avc-h-264/)
5. [Wikipedia: AV1](https://en.wikipedia.org/wiki/AV1)
6. [Netflix Tech Blog: AV1, Now Powering 30% of Netflix Streaming](https://netflixtechblog.com/av1-now-powering-30-of-netflix-streaming-02f592242d80)
7. [The Verge: AV1 is supposed to make streaming better, so why isn't everyone using it?](https://www.theverge.com/tech/635020/av1-streaming-netflix-youtube-google-adoption)
8. [ScientiaMobile: AV1 Codec Hardware Decode Adoption](https://scientiamobile.com/av1-codec-hardware-decode-adoption/)
9. [Meta: Video Streaming with the AV1 Video Codec in Mobile Devices](https://engineering.fb.com/wp-content/uploads/2025/09/Meta-AV1-White-Paper-FINAL.pdf)
10. [Bitmovin: The State of AV1 Playback Support](https://bitmovin.com/blog/av1-playback-support/)
11. [Alliance for Open Media](https://aomedia.org/)
12. [Let's Encrypt: 10 Years of Let's Encrypt Certificates](https://letsencrypt.org/2025/12/09/10-years)
13. [Heise Online: H.264 licenses, prices increase up to 45 times](https://www.heise.de/en/news/H-264-licenses-Prices-increase-up-to-45-times-11245915.html)
