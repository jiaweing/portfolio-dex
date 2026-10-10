---
title: "Amazon will brick your life"
date: "2026-05-04"
lastEdited: "2026-05-03T08:24:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Hardware","Cloud","Ecosystems","Local-first","Open Source","Regulation","Economics"]
---

You bought a Kindle. You paid for ebooks. You held a physical device in your hands, charged it, read on it for years. And then Amazon sent you an email saying it would stop working.
Starting May 20, 2026, Kindle and Kindle Fire devices released in 2012 and earlier will no longer be able to purchase, borrow, or download new content from the Kindle Store. Amazon says these devices have been supported for 14 to 18 years. They frame it as a natural lifecycle. But here's what actually happened: you paid for hardware and a library of books, and the company that sold them to you decided, remotely, that your device is done.
This isn't a one-off. It's a pattern. And once you start seeing it, you can't unsee it.
## What Amazon is actually doing
Amazon notified affected Kindle owners via email in early 2026. After the May 20 cutoff, older Kindles lose access to the Kindle Store entirely. You can't buy new books, borrow from the library, or download titles you've already purchased. Your account and Kindle Library remain accessible through the Kindle app on other devices and Kindle for Web, but the hardware itself becomes a digital paperweight for anything beyond what's already cached on it.
Amazon offered promotional discounts on newer Kindles to soften the blow. But that framing, "we'll give you a deal on a replacement for the thing we just broke," is part of the problem. The device didn't fail. Amazon withdrew the service layer that made it useful.
To be fair, Amazon isn't wiping books already downloaded to the device. You can still read what's stored locally. Some technically savvy users have found workarounds, including sideloading content and even jailbreaking older Kindles to run open-source reading software. But the average reader who bought a Kindle expecting it to just work? They're out of luck.
## You've seen this before
Amazon isn't the first company to pull this move. The pattern is becoming familiar enough to have its own vocabulary: planned obsolescence, end-of-life, sunsetting. Whatever you call it, the result is the same. Hardware you bought stops doing what it was sold to do, not because it broke, but because the manufacturer decided to stop supporting it.
Sonos drew widespread criticism when it introduced "Recycle Mode," a program that required customers to permanently disable older speakers in exchange for a discount on new ones. The backlash was fierce enough that Sonos eventually reversed course, allowing the old speakers to keep functioning. But the damage was done. Customers learned that Sonos viewed their hardware as temporary, even if they didn't.
Google terminated software updates and cloud connectivity for first and second-generation Nest Learning Thermostats on October 25, 2025. Devices that launched in 2011 and 2012, smart thermostats that customers paid a premium for specifically because of their learning capabilities and remote access, were reduced to basic manual thermostats. The "smart" part was removed with a software update.
Tesla has gone even further. In a widely reported case, Tesla remotely disabled Autopilot and Full Self-Driving features on a used Model S after it was resold through a third-party dealer. The features were active when the dealer purchased the car directly from Tesla at auction. They were advertised as included when the car was sold to its new owner. But after an internal "audit," Tesla pushed a software update that stripped the features. Their justification: the new owner hadn't paid for them, even though the previous transaction included them.
Each of these cases follows the same logic. The company sold you atoms, but retained control of the bits. And when the bits are what make the atoms useful, that distinction matters enormously.
## The business model hiding inside your hardware
What's happening here isn't a bug. It's a business model.
When you buy a Kindle, you're not just buying a screen and a battery. You're buying into an ecosystem, Amazon's store, Amazon's file format, Amazon's DRM, Amazon's servers. The hardware is the entry point, but the value lives in the service layer. And that service layer is entirely controlled by Amazon.
This is true for an increasing number of products. Your smart thermostat relies on cloud connectivity. Your car's advanced features live in software that can be updated, downgraded, or removed over the air. Your speakers need an app to function. Even your doorbell depends on a subscription to store video.
The underlying shift is subtle but profound. Ownership used to mean you had a thing, and the thing did what it did, and nobody could take that away. Now, ownership means you have a thing that does what a company allows it to do, for as long as the company decides to allow it.
California recognized this gap with Assembly Bill 2426, which took effect on January 1, 2025. The law requires companies to clearly disclose when consumers are purchasing a revocable license rather than outright ownership of digital goods. Companies can no longer use terms like "buy" or "purchase" in advertising without clarifying that access can be taken away. It's a small step, but it signals that regulators are starting to catch up to what consumers have been feeling for years: the word "buy" doesn't mean what it used to.
## Ownership was always a spectrum
If you're in Singapore, this tension might feel strangely familiar.
HDB flats, the public housing where over 80% of Singaporeans live, are sold on 99-year leases. You "buy" the flat, you renovate it, you raise a family in it. But when the lease expires, the flat reverts to the state. There's no automatic compensation unless the estate is selected for government redevelopment schemes like SERS. The government's position is clear: leasehold buyers are owners, but ownership has an expiration date.
This model has been debated for decades, and most Singaporeans have made peace with it. But it illustrates something important: we've always accepted that ownership can be conditional. The difference is that with physical property, the terms are explicit. You know the lease is 99 years. You can plan around it.
With digital products and connected hardware, the conditions are buried in terms of service that almost nobody reads. The expiration date isn't 99 years, it's "whenever we decide." And unlike an HDB flat, your Kindle doesn't appreciate in value while you wait.
Tech companies have taken a model that works when the terms are transparent and the timelines are generational, and applied it to consumer goods with no transparency and no predictable timeline. That's the structural problem.
## Right to repair, right to use
The right-to-repair movement has been gaining serious momentum. California, Colorado, Minnesota, New York, Oregon, and several other states have passed comprehensive right-to-repair legislation. A 2024 Consumer Reports survey found that 84% of Americans support right-to-repair laws. John Deere settled a class-action lawsuit over repair restrictions for \$99 million in early 2026.
But right to repair only covers half the problem. You can have every tool and manual in the world, and it won't help if the manufacturer can remotely disable the thing you're trying to fix. Repair assumes the device is still yours to repair. What happens when the company decides it isn't?
That's where right to repair and right to use start converging into the same fight. It's not enough to demand access to parts and schematics. Consumers need guarantees that the products they buy will continue to function, that software updates won't remove features, that cloud dependencies won't become kill switches.
Some legislators are starting to connect these dots. The REPAIR Act introduced in Congress in 2025 focuses on automotive repair access, but the underlying principle, that paying for a product should guarantee meaningful access to it, applies far beyond cars.
## What builders can do
If you're building products, this is worth thinking about carefully. The short-term economics of ecosystem lock-in are obvious. But the long-term cost is trust, and trust is harder to rebuild than revenue.
The local-first software movement offers one alternative. The core idea is straightforward: your data lives on your device first, and the cloud is optional. If the service goes away, your data doesn't. Projects like CRDTs (Conflict-free Replicated Data Types) are making it technically feasible to build collaborative software that doesn't depend on a central server. Tools like Linear, Figma, and Excalidraw have demonstrated that local-first approaches can deliver excellent user experiences.
Open hardware is another path. E-readers don't have to be locked to one store. Some alternatives to Kindle, like Kobo devices, support open ebook formats like EPUB and make it straightforward to sideload content. The hardware works whether or not the company's servers do.
Self-hosted alternatives for smart home devices, media servers, and cloud storage give users an escape hatch from the "service-dependent hardware" model. They require more technical effort, but they offer something increasingly rare: actual ownership.
## The question underneath
The Kindle story isn't really about Kindles. It's about a quiet restructuring of what it means to buy something.
When your e-reader, your car, your thermostat, your speakers, and your doorbell can all be remotely modified or disabled by the companies that sold them to you, the concept of ownership starts to dissolve. You become a subscriber to your own possessions.
The structural incentive for companies is clear. Recurring relationships generate more revenue than one-time sales. Ecosystem lock-in raises switching costs. Cloud dependencies create leverage. None of this is inherently malicious, but the cumulative effect is a world where paying for something doesn't guarantee you'll keep it.
The question isn't whether Amazon or Tesla or Google are bad actors. The question is whether we're comfortable with a world where the things we buy come with an invisible asterisk, and the company that sold them to us holds the eraser.
## References
1. [Amazon Pulls Support for Perfectly Fine Older Kindles](https://www.wired.com/story/amazon-pulls-support-for-perfectly-fine-older-kindles/), WIRED
2. [Amazon Ends Support for Older Kindles, What It Means](https://www.popularmechanics.com/technology/gadgets/a71140721/old-kindle-support-ending/), Popular Mechanics
3. [Amazon's May 20 Kindle Cutoff: Which Models are Affected and How to Keep Reading Anyway](https://www.pcmag.com/news/amazon-may-20-kindle-cutoff-which-models-impacted-how-to-keep-reading), PCMag
4. [Don't panic: Amazon is discontinuing support on these 13 Kindle devices](https://mashable.com/article/amazon-discontinuing-kindle-1st-gen-support), Mashable
5. [Amazon bricking classic Kindles is a sign it learned nothing from Sonos' biggest mistake](https://www.techradar.com/tablets/ereaders/amazon-bricking-classic-kindles-is-a-sign-it-learned-nothing-from-sonos-biggest-mistake), TechRadar
6. [Sonos Ends 'Recycling' Program That Disabled Older Devices](https://www.consumerreports.org/speakers/sonos-ends-recycling-program-that-disabled-older-devices/), Consumer Reports
7. [End of support for Nest Learning Thermostats (1st & 2nd gen)](https://support.google.com/googlenest/answer/16233096), Google Nest Help
8. [Google Kills Old Nest Smart Features, Here's Why](https://android.gadgethacks.com/news/google-kills-old-nest-smart-features-heres-why/), Gadget Hacks
9. [Tesla remotely disables Autopilot on used Model S after it was sold](https://www.theverge.com/2020/2/6/21127243/tesla-model-s-autopilot-disabled-remotely-used-car-update), The Verge
10. [Tesla Remotely Removes Autopilot Features From Customer's Used Tesla Without Any Notice](https://www.jalopnik.com/tesla-remotely-removes-autopilot-features-from-customer-1841472617/), Jalopnik
11. [The Evolving Landscape of Digital Goods Ownership: California's Digital Marketplace Law AB 2426](https://www.morganlewis.com/pubs/2024/10/the-evolving-landscape-of-digital-goods-ownership-californias-digital-marketplace-law-ab-2426), Morgan Lewis
12. [A populist consumer movement is rising to end 'captive' repair economy](https://www.cnbc.com/2026/04/25/right-to-repair-consumer-prices-affordability-economy-elections.html), CNBC
13. [Right to Repair Legislation](https://www.repair.org/legislation), The Repair Association
14. [Do HDB flat buyers own their flat?](https://www.gov.sg/explainers/do-hdb-flat-buyers-own-their-flat/), [Gov.sg](http://Gov.sg)
15. [Local-first software: You own your data, in spite of the cloud](https://www.inkandswitch.com/essay/local-first/), Ink & Switch
