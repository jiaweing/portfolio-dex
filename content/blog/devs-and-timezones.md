---
title: "Devs and timezones"
date: "2026-03-18T03:03:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Ask any developer what keeps them up at night and you will hear the usual suspects: authentication, caching, deployment. But there is one quietly brutal problem that almost every developer underestimates until it bites them: **timezones**.
They seem simple on the surface. The world has clocks, clocks have offsets, just do some math. But timezones are not a math problem. They are a political, historical, and deeply human problem that happens to land in your codebase.
## Why timezones are so painful
Timezones feel like they should be straightforward, but the reality is anything but. Countries change their UTC offsets for political reasons, sometimes with just weeks of notice. Daylight Saving Time (DST) shifts create ambiguous hours where the same local time occurs twice, or where an hour simply does not exist. Arizona does not observe DST, but the Navajo Nation within Arizona does. Samoa once skipped an entire day by jumping across the International Date Line.
The IANA timezone database (commonly called `tzdata` or the Olson database) tracks all of these rules. It gets updated multiple times a year. If your application is not using an up-to-date copy, your time conversions could be silently wrong.
A compiled list of "falsehoods programmers believe about time" has been circulating for years, and it is long. Developers assume UTC offsets are whole hours (they are not, India is UTC+5:30, Nepal is UTC+5:45). They assume time zones do not change (they do, frequently). They assume two clocks in the same country show the same time (not always true). Every one of these assumptions becomes a bug.
## The golden rule: store UTC, display local
The single most important principle for handling time in software is this: **store timestamps in UTC, convert to local time only at the display layer**.
UTC (Coordinated Universal Time) is an absolute reference point. It does not shift with DST, it does not vary by region, and it gives every event in your system a single unambiguous timestamp. When you store UTC, your backend stays clean. Sorting, comparing, and computing durations all become straightforward operations.
The conversion to a human-friendly local time should happen as late as possible, ideally in the client. Browsers expose the user's timezone through the `Intl` API. Mobile devices know their locale. The pattern is simple:
1. **Receive** a timestamp from the user (with their timezone context)
2. **Convert** it to UTC immediately
3. **Store** it as UTC in your database, in ISO 8601 format (`YYYY-MM-DDTHH:mm:ssZ`)
4. **Serve** UTC to the client
5. **Display** the converted local time in the UI
This is not just a best practice, it is the standard recommendation across virtually every language and framework ecosystem.
## When "just use UTC" is not enough
There is an important caveat. Storing UTC works perfectly for events that have already happened, but **future events are trickier**.
Imagine a user schedules a meeting for 3:00 PM Tokyo time next March. You convert it to UTC and store it. But then Japan decides to adopt DST before that date (unlikely for Japan, but it has happened in other countries). Your stored UTC value is now wrong because the offset changed.
For future-facing times, the safer approach is to store the **local time plus the IANA timezone identifier** (like `Asia/Tokyo`), and compute the UTC equivalent on the fly using the latest timezone database. This way, if the rules change, your conversion updates automatically.
## Lessons from running 50 game servers worldwide
I learned all of this the hard way. I used to run [titan.tf](http://titan.tf), a platform with around 50 game servers spread across multiple regions. When I first started, all my servers were in Singapore, so naturally I stored every timestamp in Singapore time. It worked fine, until I expanded.
Once I had servers in Europe, North America, and other parts of Asia, things got messy fast. Event logs from different regions could not be compared directly. Scheduled tasks would fire at the wrong time. Player statistics that spanned multiple regions had subtle off-by-one-day errors at the date boundary.
The fix was migrating everything to UTC as the canonical time, and then translating to each region's local time only when displaying to players. Server-to-server communication always used UTC. Once that was in place, synchronization across regions became dramatically simpler.
## Server sync and distributed systems
When you have multiple servers across different regions, **time synchronization** becomes critical. Each server's system clock can drift, and even small differences can cause problems for distributed systems that rely on timestamp ordering.
NTP (Network Time Protocol) is the standard solution for keeping clocks in sync, but it is worth understanding its limits. NTP typically synchronizes clocks to within a few milliseconds over the internet, which is good enough for most applications but not for systems that need strict ordering guarantees.
For distributed databases and coordination services, protocols like Google's TrueTime (used in Spanner) go further by providing bounded clock uncertainty. But for the vast majority of applications, the practical advice is simpler:
- Run NTP on every server
- Always use UTC for inter-server communication
- Never rely on wall-clock ordering for critical operations, use logical clocks or sequence numbers instead
## The .NET perspective: DateTime vs DateTimeOffset
If you work in the .NET ecosystem, you have probably encountered the choice between `DateTime` and `DateTimeOffset`. It is a common source of confusion.
`DateTime` has a `Kind` property that can be `Utc`, `Local`, or `Unspecified`. The problem is that `Unspecified` is the default, and it carries no timezone information at all. When you pull a `DateTime` from a database, it often comes back as `Unspecified`, and now any conversion you do is a guess.
`DateTimeOffset` solves this by always storing the UTC offset alongside the time value. A `DateTimeOffset` of `2026-03-17T14:00:00+08:00` tells you both the local time and exactly how it relates to UTC. It is self-describing.
The general recommendation in modern .NET development is to **prefer ****`DateTimeOffset`**** over ****`DateTime`** whenever timezone context matters, which is most of the time. It does not replace the need for IANA timezone identifiers for future events, but for recording when something happened, it is the right tool.
For more advanced timezone work in .NET, libraries like **NodaTime** (created by Jon Skeet) provide a much richer model that separates concepts like instants, local times, and zoned times into distinct types. It forces you to be explicit about what kind of time you are working with, which eliminates entire categories of bugs.
## Beyond time: currencies and localization
Timezones are just one piece of the larger internationalization puzzle. Once your application serves users across regions, you will also hit **currency** and **localization** challenges.
### Currency
Displaying prices seems simple until you realize you need to handle:
- **Display currency vs charge currency**: A user in Japan might browse prices in JPY but you charge in USD on the backend
- **Exchange rate timing**: When do you lock the rate? At display time? At checkout?
- **Formatting rules**: Japan uses no decimal places for yen (¥1,000), while the US uses two (\$10.00). India uses a unique grouping system (₹1,00,000 instead of ₹100,000)
- **Rounding**: Different currencies have different rounding conventions
Payment processors like Stripe abstract much of this away, but if you are building the currency layer yourself (as I had to with [titan.tf](http://titan.tf)), you need to carefully separate what you display from what you store and what you charge. The same UTC-first principle applies here: **pick a canonical currency for storage, convert for display**.
### Localization goes deeper than language
Most developers think of localization as translation, swapping English strings for Japanese or German ones. But true localization also includes:
- **Date and time formats**: MM/DD/YYYY (US) vs DD/MM/YYYY (most of the world) vs YYYY-MM-DD (ISO, East Asia)
- **Number formatting**: Decimals and thousands separators vary (1,000.50 vs 1.000,50)
- **Text direction**: Right-to-left languages like Arabic and Hebrew require mirrored UI layouts
- **Text expansion**: German text can be 30% longer than English, which breaks fixed-width layouts
- **Name formats**: Not everyone has a first name and last name. Some cultures use a single name, others put the family name first
- **Address formats**: The order and presence of fields (state, province, postal code) varies wildly by country
The key lesson is the same one that applies to timezones: **separate the canonical data from the presentation**. Store data in a normalized, locale-independent format. Transform it for display as late as possible. Use established libraries (`Intl` in JavaScript, `ICU` in C/C++, `CLDR` data) rather than building your own formatting logic.
## Practical takeaways
If you are building anything that touches time, currency, or international users, keep these principles close:
1. **Store UTC, display local.** This is the single most impactful rule for timezone handling.
2. **Use ISO 8601 everywhere.** It is unambiguous and universally supported.
3. **For future events, store the local time plus the IANA timezone ID.** Do not rely on a precomputed UTC value that might become stale.
4. **Never build your own date/time library.** Use what your platform provides, or reach for well-maintained libraries like NodaTime, Luxon, or java.time.
5. **Keep your timezone database updated.** Timezone rules change multiple times a year.
6. **Separate canonical data from display.** This applies to time, currency, numbers, and text.
7. **Test around DST boundaries.** This is where the most subtle bugs hide.
8. **Treat localization as more than translation.** Dates, numbers, currencies, and layouts all need adapting.
Timezones are humbling. They remind us that software does not exist in a vacuum, it exists in a messy, political, ever-changing world. The developers who handle them well are not the ones who memorize every edge case, but the ones who build systems that respect the complexity and keep it contained at the edges.
## References
1. IANA Time Zone Database, [https://www.iana.org/time-zones](https://www.iana.org/time-zones)
2. "Falsehoods programmers believe about time," Zain Rizvi, [https://www.zainrizvi.io/blog/falsehoods-programmers-believe-about-time-zones/](https://www.zainrizvi.io/blog/falsehoods-programmers-believe-about-time-zones/)
3. "How to Handle Date and Time Correctly to Avoid Timezone Bugs," DEV Community, [https://dev.to/kcsujeet/how-to-handle-date-and-time-correctly-to-avoid-timezone-bugs-4o03](https://dev.to/kcsujeet/how-to-handle-date-and-time-correctly-to-avoid-timezone-bugs-4o03)
4. "Best practices for timestamps and time zones in databases," Tinybird, [https://www.tinybird.co/blog/database-timestamps-timezones](https://www.tinybird.co/blog/database-timestamps-timezones)
5. "Just store UTC? Not so fast! Handling Time zones is complicated," CodeOpinion, [https://codeopinion.com/just-store-utc-not-so-fast-handling-time-zones-is-complicated/](https://codeopinion.com/just-store-utc-not-so-fast-handling-time-zones-is-complicated/)
6. "Choose between DateTime, DateOnly, DateTimeOffset, TimeSpan, TimeOnly, and TimeZoneInfo," Microsoft .NET Documentation, [https://learn.microsoft.com/en-us/dotnet/standard/datetime/choosing-between-datetime](https://learn.microsoft.com/en-us/dotnet/standard/datetime/choosing-between-datetime)
7. "DateTime and DateTimeOffset in .NET: Good practices and common pitfalls," David Rickard, [https://engy.us/blog/2012/04/06/datetime-and-datetimeoffset-in-net-good-practices-and-common-pitfalls/](https://engy.us/blog/2012/04/06/datetime-and-datetimeoffset-in-net-good-practices-and-common-pitfalls/)
8. "A Practical Guide to Timezones for Developers," Ryan Thomson, [https://www.ryanthomson.net/articles/practical-guide-timezones/](https://www.ryanthomson.net/articles/practical-guide-timezones/)
9. "10 Common Mistakes in Software Localization," Phrase, [https://phrase.com/blog/posts/10-common-mistakes-in-software-localization/](https://phrase.com/blog/posts/10-common-mistakes-in-software-localization/)
