---
title: "Protests are just distributed systems"
date: "2026-03-29"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: []
---

On March 28, 2026, over 3,100 protests are scheduled across all 50 states and at least 15 other countries under a single banner: No Kings. Organizers project it will be the largest single day of domestic political protest in US history, potentially surpassing the estimated seven million who turned out in October 2025.
There is no CEO. No single leader. No central command structure issuing orders from the top.
If you work in software, this should sound familiar. What's unfolding isn't just a political movement. It's a distributed system running at massive scale.
## No single point of failure
In distributed systems engineering, one of the first principles you learn is to eliminate single points of failure. If your entire system depends on one node, one server, one leader, then when that node goes down, everything goes down.
The No Kings movement was designed this way from the start. When progressive organizations like Indivisible, 50501, and MoveOn came together to form the coalition, they intentionally chose not to identify a leadership hierarchy. As one organizer put it: "You can't beat a cult of personality with another larger cult of personality. What you need to do is organize people from the ground up, building power by and for and of the people."
This is redundancy by design. There are over 3,000 event hosts across the country. If any single organizer is removed, arrested, or simply has a bad day, the system keeps running. The movement doesn't depend on any single node.
Contrast this with traditional centralized protest models, the top-down union marches or single-leader movements of the past. Those had clear command structures, which made them easier to coordinate but also easier to suppress. Take out the leader and the movement stalls. In distributed systems terms, they had a single point of failure.
## Eventual consistency
One of the trickiest concepts in distributed systems is eventual consistency: the idea that in a system where nodes operate independently, data won't be perfectly synchronized at every moment, but given enough time and communication, all nodes will converge to the same state.
Watch how messaging works in a decentralized protest movement and you see the same pattern. There is no single message that every participant receives simultaneously. Instead, shared values and broad objectives, "no authoritarianism, defend democracy, protect each other," propagate through layers of local organizers, Signal groups, social media posts, and word of mouth. At any given moment, the specific framing might differ from city to city. A rally in rural Arkansas might emphasize community self-reliance. A march in Manhattan might center immigrant rights. But over time, through repeated communication and shared identity, the movement converges on a consistent message.
This is exactly how eventually consistent databases work. Replicas may temporarily diverge, but they converge over time through asynchronous replication. The tradeoff is the same: you sacrifice immediate consistency for availability and partition tolerance. The movement stays alive even when communication channels are disrupted or when individual nodes are temporarily out of sync.
## The orchestration layer
Distributed systems don't run on magic. They need infrastructure: service meshes, message queues, load balancers, health checks. The nodes are autonomous, but the plumbing matters.
Modern protest movements have their own orchestration layer. Mobilize serves as the event coordination platform, where anyone can register to host or attend an event. Signal provides encrypted peer-to-peer communication. Shared Google Docs and spreadsheets function as distributed state stores. Social media acts as the pub/sub messaging layer, broadcasting updates to subscribers who then relay them locally. Reddit threads function as community forums for grassroots coordination. Even physical tools like stickers and QR codes serve as offline broadcast mechanisms.
Critically, these are orchestration layers, not leadership layers. They help nodes discover each other, share state, and coordinate timing. But they don't issue commands. No single platform controls the movement. If Mobilize went down tomorrow, organizers would route around the failure, the same way a well-designed microservice architecture routes around a failed node.
## Local decision-making with shared objectives
In a well-architected distributed system, individual nodes make decisions based on local context while adhering to global constraints. A CDN edge server decides which cached content to serve based on the requesting client's location, but it follows the caching policies set by the origin server.
The No Kings movement operates on the same principle. Each local event is autonomous. Organizers in a small town in Iowa decide their own venue, timing, speakers, and messaging. They know their community better than any central planner could. But they operate within the shared framework of the No Kings coalition: nonviolent, peaceful, open to all ages and backgrounds, united under the same banner.
Anyone can sign up to host an event. The national organizations provide trainings on safety, security, and de-escalation, essentially publishing the "API contract" that local nodes agree to follow. But execution is entirely local. This is the same pattern that makes edge computing powerful: push decisions to where the context is, and trust the nodes to execute within agreed-upon boundaries.
## Failure modes are real
It would be dishonest to push this analogy without acknowledging that distributed systems also have well-known failure modes. And protest movements are no exception.
**Split-brain problems.** When nodes can't communicate effectively, they can diverge in ways that are hard to reconcile. In protest movements, this manifests as message fragmentation. Critics have pointed out that the No Kings movement's broad objectives, while inclusive, can make it harder to drive specific policy outcomes. When everyone is protesting "authoritarianism" in general but different groups prioritize different issues, the system risks losing coherent direction.
**Byzantine faults.** In distributed systems, a Byzantine fault occurs when a node behaves in unpredictable or malicious ways while appearing to function normally. Movements face this too: bad actors infiltrating events, provocateurs undermining peaceful messaging, or co-option by groups with incompatible agendas.
**Coordination overhead.** The more nodes you add, the more communication overhead you introduce. Scaling from 2,000 events in June 2025 to 3,100+ events in March 2026 means exponentially more coordination. At some point, the cost of keeping nodes in sync can overwhelm the system's capacity.
These aren't just theoretical risks. Organizers are actively wrestling with them. The post-March 28 "What's Next" calls and host debrief sessions are essentially the movement's version of incident retrospectives, diagnosing failure modes and iterating on the architecture.
## Self-correcting systems
One of the most interesting properties of the No Kings movement is that it appears to be self-correcting over time. The demographic composition of participants has shifted with each iteration, broadening representation across age, race, and geography. The movement is adapting its own participation topology based on feedback from previous runs.
This mirrors how adaptive distributed systems work. Systems that monitor their own health metrics and adjust, autoscaling based on load, rebalancing partitions based on access patterns, routing around degraded nodes, are more resilient than static architectures. The No Kings movement is doing something similar at a human level: each iteration incorporates lessons from the last, expands the participant base, and adjusts tactics.
The progression tells the story. June 2025: roughly five million participants across 2,100+ events. October 2025: over seven million across 2,700+ events. March 2026: projected to be even larger across 3,100+ events. The system is scaling, and it's scaling by adding nodes, not by centralizing control.
## The builder's takeaway
Whether you're designing software or watching a social movement unfold, the lesson is the same: the most resilient systems are the ones that don't depend on any single node.
Centralized systems are easier to reason about. They're simpler to build, simpler to message-control, simpler to coordinate. But they're fragile. One point of failure and the whole thing collapses.
Distributed systems are harder. They have messier failure modes, higher coordination costs, and they sacrifice consistency for availability. But they're antifragile in ways that centralized systems can never be. You can't shut down a distributed system by taking out one node. You can't suppress a decentralized movement by arresting one leader.
The next time you're architecting a system, whether it's software or something bigger, ask yourself: does this depend on any single node? If the answer is yes, you already know the vulnerability.
## References
1. ["'No Kings' Protests May Draw Biggest, and Most Diverse, Anti-Trump Crowds Ever," TIME, March 24, 2026](https://time.com/article/2026/03/24/no-kings-protests-march-28-biggest-anti-trump-crowds-ever/)
2. ["March 2026 No Kings protests," Wikipedia](https://en.wikipedia.org/wiki/March_2026_No_Kings_protests)
3. ["The third No Kings protests are expected to draw millions. Do they need clearer goals?," The Guardian, March 27, 2026](https://www.theguardian.com/us-news/2026/mar/27/no-kings-protests-goals)
4. ["About No Kings," ](https://www.nokings.org/about-nk)[NoKings.org](http://NoKings.org)
5. ["The Online Tools That Fueled 'No Kings' and the Trump Resistance," WIRED](https://www.wired.com/story/technology-tools-donald-trump-resistance/)
6. ["As No Kings protests grow, a bigger question looms: What comes next?," Stateline, March 26, 2026](https://stateline.org/2026/03/26/as-no-kings-protests-grow-a-bigger-question-looms-what-comes-next/)
7. ["What Is the CAP Theorem?," IBM](https://www.ibm.com/think/topics/cap-theorem)
8. ["Avoiding Single Points of Failures in Distributed Systems," Baeldung](https://www.baeldung.com/cs/distributed-systems-prevent-single-point-failure)
9. ["Here's Which Cities Are Likely to Host the Biggest No Kings Protests," TIME, March 26, 2026](https://time.com/article/2026/03/26/no-kings-protests-cities-where/)
10. ["No Kings on Mobilize," Mobilize](https://www.mobilize.us/nokings/)
