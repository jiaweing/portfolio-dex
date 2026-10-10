---
title: "Quantum just killed your password"
date: "2026-04-11"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Most of the internet runs on a simple bet: that certain math problems are too hard to solve. Your bank login, your encrypted messages, your crypto wallet, all of it rests on the assumption that factoring massive numbers or computing discrete logarithms will take classical computers longer than the age of the universe.
Three papers published in the span of ten months just made that bet look a lot worse.
## The timeline just collapsed
In May 2025, Google researcher Craig Gidney showed that a quantum computer with fewer than one million physical qubits could factor RSA-2048, the encryption standard behind most internet banking, email, and digital certificates, in under a week. His previous estimate from 2019 required 20 million qubits. That is a 20x reduction, achieved purely through algorithmic and architectural improvements, not hardware advances.
In February 2026, Iceberg Quantum, a Sydney-based startup, published an architecture called Pinnacle that uses quantum low-density parity-check (QLDPC) codes instead of surface codes. Their estimate: RSA-2048 could fall with fewer than 100,000 physical qubits. Another 10x drop.
Then in March 2026, Google Quantum AI released the most dramatic result yet. Working with co-authors including Justin Drake of the Ethereum Foundation and Dan Boneh of Stanford, they demonstrated that the elliptic curve cryptography (ECC) protecting Bitcoin, Ethereum, and virtually every major cryptocurrency could be broken with fewer than 500,000 physical qubits, in a runtime of approximately nine minutes.
To put the trajectory in perspective:
- 2012: hundreds of millions to \~1 billion qubits estimated to break RSA-2048
- 2019: \~20 million qubits
- 2025: fewer than 1 million qubits
- 2026: fewer than 100,000 qubits (with newer architectures)
Each step is roughly a 10x to 20x reduction. And every step was driven by better algorithms and error correction, not better hardware.
## Why nine minutes matters
The Google ECC paper deserves special attention because of what it means for blockchain security. Shor's algorithm can be "primed," meaning the first half of the computation, which depends only on fixed curve parameters, can be precomputed. Once a specific public key is revealed (which happens when a Bitcoin transaction is broadcast), the remaining computation takes about nine minutes. Bitcoin's average block time is ten minutes.
Under idealized conditions, Google estimates a roughly 41% probability that a primed quantum computer could derive a private key before a Bitcoin transaction is confirmed. The math that secures over a trillion dollars in cryptocurrency value is built on exactly the problem quantum computers are getting better at solving.
In an unprecedented move for quantum cryptanalysis, Google chose not to publish their actual attack circuits. Instead, they released a zero-knowledge proof, a mathematical verification that the resource estimates are valid without revealing how the attack works. The team consulted with the U.S. government before publishing. As they put it: "Progress in quantum computing has reached the stage where it is prudent to stop publishing details of improved quantum cryptanalysis to avoid misuse."
When researchers start redacting their own findings out of security concerns, the threat has moved past theoretical.
## The "harvest now, decrypt later" problem
Here is the part that should bother everyone, not just crypto holders.
State actors and sophisticated adversaries are already collecting encrypted data with the expectation of decrypting it later. This is called "harvest now, decrypt later" (HNDL), and it means data encrypted with RSA or ECC today could be readable within a few years. Medical records, legal communications, trade secrets, government intelligence, anything that needs to stay confidential into the 2030s is potentially at risk right now.
The Federal Reserve published a paper specifically analyzing HNDL risks to Bitcoin nodes. Their framework uses Mosca's Theorem: if the shelf life of your data (X) plus the time to migrate to new cryptography (Y) exceeds the time until quantum computers can break current encryption (Z), you are already too late. For many organizations, X + Y is already dangerously close to Z.
## The standards exist, almost nobody uses them
NIST finalized its first three post-quantum cryptography (PQC) standards in August 2024: ML-KEM for key encapsulation, ML-DSA for digital signatures, and SLH-DSA as a hash-based backup. A fifth algorithm, HQC, was selected in March 2025. The standards are real, published, and available.
NIST's deprecation timeline calls for quantum-vulnerable algorithms to be deprecated after 2030 and disallowed after 2035. RSA-2048 and ECDSA with P-256 are explicitly in scope.
The UK's National Cyber Security Centre has set three milestones: define your migration goals by 2028, carry out high-priority PQC migration by 2031, and complete migration of all systems by 2035. NSA's CNSA 2.0 framework mandates that all new U.S. national security systems be quantum-safe by January 2027.
Google has set a 2029 internal deadline for its own post-quantum migration. OpenSSH and OpenSSL already support ML-KEM. Chrome and Android are deploying PQC. The infrastructure is being built.
But adoption outside of big tech and government is almost nonexistent. Most companies have not conducted a cryptographic inventory. Most developers have never touched a post-quantum library. The gap between the urgency of the research and the pace of corporate migration is the real vulnerability.
## Meanwhile, a Norwegian lab just solved a foundational problem
While the cryptanalysis papers grabbed headlines, a quieter breakthrough landed in early April 2026. Researchers at the Norwegian University of Science and Technology (NTNU), collaborating with an international team led by the Niels Bohr Institute, developed a measurement technique that tracks how quickly quantum information disappears from superconducting qubits, more than 100 times faster than previous methods.
This matters because qubit instability, the tendency for quantum information to vanish unpredictably, is the single biggest obstacle to building reliable quantum computers. The standard measurement took about one second. The new method does it in roughly 10 milliseconds, essentially in real time.
"This will in turn make it easier to identify the underlying causes that make the information disappear," said Jeroen Danon, professor at NTNU.
It is a hardware stability breakthrough landing at the same moment the algorithmic breakthroughs are making the qubit targets smaller. The research-to-product pipeline is compressing from both ends.
## What you should actually do
If you are a developer or run a small company, the practical steps are clearer than you might expect.
**Start with a cryptographic inventory.** Find everywhere your systems use RSA, ECC, or Diffie-Hellman. This includes TLS certificates, SSH keys, VPN configurations, database encryption, code signing, and API authentication. You cannot migrate what you have not mapped.
**Upgrade TLS.** Move to TLS 1.3 with Perfect Forward Secrecy if you have not already. This does not make you quantum-safe, but it limits the exposure window for intercepted sessions.
**Pilot NIST PQC algorithms.** ML-KEM (FIPS 203) is already supported in OpenSSH, OpenSSL, and several cloud platforms. Start with key encapsulation for internal systems where you control both ends of the connection.
**Build crypto-agility.** Design new systems so that swapping cryptographic algorithms does not require a full rebuild. Abstract your cryptographic calls. Certificate lifespans are expected to shrink to as short as 47 days by 2029, so manual certificate management is already becoming untenable.
**If you hold cryptocurrency,** migrate to modern address types (Native SegWit bc1 addresses for Bitcoin), stop reusing addresses (every spend exposes your public key), and monitor proposals like BIP-360 that introduce quantum-resistant address types.
**Pay attention to compliance timelines.** NIST deprecation in 2030 and disallowance in 2035 may feel distant, but migration at enterprise scale takes years, not months. Companies that begin inventories now will have a significant advantage.
## The real story
The quantum threat is not about physics lectures or sci-fi scenarios. It is a systems problem. The math is moving faster than the migration. The standards exist but the adoption does not. And the irony is hard to miss: we are pouring hundreds of billions into AI while quantum computing quietly undermines the cryptographic foundations that keep all of it secure.
The "quantum is decades away" narrative used to be reasonable. Three papers in ten months, each cutting the required resources by an order of magnitude, have made it irresponsible. The question is no longer whether quantum computers will break current encryption. It is whether organizations will finish migrating before that happens.
## References
1. [Q-Day just got closer: three papers in three months are rewriting the quantum threat timeline](https://thequantuminsider.com/2026/03/31/q-day-just-got-closer-three-papers-in-three-months-are-rewriting-the-quantum-threat-timeline/) (The Quantum Insider, March 2026)
2. [Quantum computers need vastly fewer resources than thought to break vital encryption](https://arstechnica.com/security/2026/03/new-quantum-computing-advances-heighten-threat-to-elliptic-curve-cryptosystems/) (Ars Technica, March 2026)
3. [Google warns quantum computers could hack encrypted systems by 2029](https://www.theguardian.com/technology/2026/mar/26/google-quantum-computers-crack-encryption-2029) (The Guardian, March 2026)
4. [Quantum frontiers may be closer than they appear](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) (Google Blog)
5. [Quantum computers keep losing data: this breakthrough finally tracks it](https://www.sciencedaily.com/releases/2026/04/260407193857.htm) (ScienceDaily, April 2026)
6. [Timelines for migration to post-quantum cryptography](https://www.ncsc.gov.uk/guidance/pqc-migration-timelines) (UK National Cyber Security Centre)
7. [NIST releases first 3 finalized post-quantum encryption standards](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards) (NIST, August 2024)
8. [The complete US post-quantum cryptography regulatory framework in 2026](https://postquantum.com/security-pqc/us-pqc-regulatory-framework-2026/) (Post-Quantum)
9. [How quantum computing affects cryptography](https://thequantuminsider.com/2026/04/06/how-quantum-computing-affects-cryptography/) (The Quantum Insider, April 2026)
10. [Meet Willow, our state-of-the-art quantum chip](https://blog.google/innovation-and-ai/technology/research/google-willow-quantum-chip/) (Google Blog, December 2024)
