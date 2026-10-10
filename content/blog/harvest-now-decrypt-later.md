---
title: "Harvest now, decrypt later"
date: "2026-04-06T21:39:00.000+08:00"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

Somewhere right now, an adversary is copying your encrypted traffic. They can't read it yet. They don't need to. They're betting that in a few years, a quantum computer will do it for them.
This strategy has a name: harvest now, decrypt later (HNDL). It's not a theoretical exercise or a sci-fi scenario. It's an active surveillance practice, and it's one of the most underappreciated threats in cybersecurity today.
## The basic idea
HNDL is deceptively simple. An attacker intercepts encrypted data in transit, things like emails, financial transactions, health records, classified communications, and stores it. The data is unreadable today because modern encryption algorithms like RSA and elliptic curve cryptography (ECC) are computationally infeasible to break with classical computers.
But quantum computers play by different rules. In 1994, mathematician Peter Shor proved that a sufficiently powerful quantum computer could factor large integers exponentially faster than any classical machine. That's the same mathematical problem that underpins RSA. A cryptographically relevant quantum computer (CRQC) running Shor's algorithm could crack RSA-2048 in hours or minutes, not the billions of years it would take a classical supercomputer.
So the attacker doesn't need to break anything today. They just need to wait.
## Why the threat is already real
The instinct is to dismiss this as a future problem. Quantum computers can't break RSA yet. The largest number factored using a pure implementation of Shor's algorithm is still just 21 (that's 3 times 7, demonstrated back in 2012). Current quantum hardware is nowhere near cracking real-world keys.
But this framing misses the point entirely. The risk doesn't begin when quantum computers arrive. It begins the moment encrypted data is collected.
Consider data that needs to remain confidential for 10, 20, or 30 years: diplomatic cables, trade secrets, medical records, intelligence reports, long-term business strategies. If that data is intercepted today and a CRQC becomes available in 2035, the breach effectively happened in 2025, it just wasn't visible yet.
NIST has been explicit about this: "Encrypted data remains at risk because adversaries collect encrypted data now with the goal of decrypting it once quantum technology matures. Since sensitive data often retains its value for many years, starting the transition to post-quantum cryptography now is critical to preventing these future breaches."
Nation-states are widely believed to be the primary actors behind HNDL campaigns. The targets are predictable: government communications, defense networks, critical infrastructure, financial systems, and intellectual property. But the threat extends to any organization handling data with a long confidentiality window.
## The timeline is compressing
For years, the comfortable assumption was that Q-Day, the day a quantum computer can break current encryption, was decades away. That buffer is shrinking.
In early 2026, a series of research breakthroughs sent shockwaves through the cryptography community. The JVG algorithm, announced by the Advanced Quantum Technologies Institute in March 2026, claims to reduce the quantum resources needed to break RSA and ECC by a factor of a thousand, potentially requiring fewer than 5,000 qubits. Separately, a February 2026 paper showed that breaking RSA encryption may require only around 100,000 qubits, down from previous estimates of millions.
Google revised its own timeline in March 2026, introducing a 2029 target for completing post-quantum cryptography (PQC) migration across its systems. The Global Risk Institute estimates a greater than 50% probability that RSA-2048 will be breakable within 15 years. Some researchers now place Q-Day as early as 2030.
Even with conservative estimates, data encrypted today using RSA could be decryptable by 2035 or 2040. For long-lived secrets, that's well within the danger zone.
## What's being done about it
The good news is that the cryptography community hasn't been sitting idle. In August 2024, NIST finalized its first three post-quantum cryptography standards after an eight-year evaluation process:
- **FIPS 203 (ML-KEM):** A key encapsulation mechanism based on module lattice problems, derived from the CRYSTALS-Kyber algorithm. It's designed to replace key exchange protocols like Diffie-Hellman and RSA key transport.
- **FIPS 204 (ML-DSA):** A digital signature algorithm based on module lattice problems, derived from CRYSTALS-Dilithium. It replaces RSA and ECDSA signatures.
- **FIPS 205 (SLH-DSA):** A stateless hash-based digital signature standard, derived from SPHINCS+. It offers an alternative approach to digital signatures that doesn't rely on lattice math.
These algorithms are believed to be secure against both classical and quantum attacks. Two of the three were developed by IBM in collaboration with industry partners. A fourth standard based on the FALCON algorithm (to be called FN-DSA) is expected to follow.
On the regulatory side, the NSA's CNSA 2.0 suite mandates quantum-resistant algorithms for all new National Security System acquisitions by January 1, 2027. NIST's IR 8547 lays out a transition roadmap for moving away from quantum-vulnerable cryptography.
## What organizations should do now
The uncomfortable reality is that cryptographic migrations are massive, slow, and expensive. They touch every system that encrypts, signs, or authenticates. Waiting for Q-Day to start planning is like waiting for the flood to start building the ark.
Here's what matters right now:
**Build a cryptographic inventory.** You can't migrate what you can't find. Map every use of RSA, ECC, and Diffie-Hellman across your environment. Identify which systems handle data with long confidentiality requirements. A Cryptographic Bill of Materials (CBOM) is the starting point for any serious migration effort.
**Adopt crypto-agility.** Design systems so that cryptographic algorithms and keys can be swapped without rebuilding the architecture. Hard-coded cryptography locks you into today's vulnerabilities. Crypto-agility should extend to certificate management, key rotation, and protocol negotiation.
**Start hybrid deployments.** Many organizations are adopting a hybrid approach, running classical and post-quantum algorithms in parallel during the transition. This provides backward compatibility while adding a layer of quantum resistance. Chrome, Cloudflare, and other major platforms have already begun deploying hybrid key exchange using ML-KEM alongside classical ECDH.
**Shorten data retention.** Data that no longer exists can't be decrypted later. Review archival policies and delete what you don't need. This is the simplest and most immediate defense against HNDL.
**Engage vendors and regulators.** Align migration plans with compliance requirements and industry timelines. Follow NIST's transition guidance and monitor vendor roadmaps for PQC-capable hardware like HSMs, which have procurement cycles running through 2025 and 2026.
## The patience of the adversary
What makes HNDL uniquely unsettling is that it inverts the usual dynamics of a cyberattack. There's no immediate breach to detect, no ransom note, no disrupted service. The attacker simply copies encrypted traffic and waits. The victim may never know data was harvested until years later, when the encryption protecting it collapses.
This is a threat built on patience, and it exploits the gap between when data is captured and when it can be read. The longer an organization delays migration, the wider that gap grows, and the more data falls into the harvest window.
The quantum threat to encryption isn't a distant hypothetical. It's a present-tense data collection problem with a future-tense decryption payoff. The breach is already happening. We just can't see it yet.
## References
1. [NIST Releases First 3 Finalized Post-Quantum Encryption Standards](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
2. [NIST IR 8547, Transition to Post-Quantum Cryptography Standards](https://csrc.nist.gov/pubs/ir/8547/ipd)
3. [Harvest Now, Decrypt Later (HNDL): The Quantum-Era Threat, Palo Alto Networks](https://www.paloaltonetworks.com/cyberpedia/harvest-now-decrypt-later-hndl)
4. [Harvest now, decrypt later: Why today's encrypted data isn't safe forever, HashiCorp](https://www.hashicorp.com/en/blog/harvest-now-decrypt-later-why-today-s-encrypted-data-isn-t-safe-forever)
5. [Q-Day Just Got Closer: Three Papers in Three Months Are Rewriting the Quantum Threat Timeline, The Quantum Insider](https://thequantuminsider.com/2026/03/31/q-day-just-got-closer-three-papers-in-three-months-are-rewriting-the-quantum-threat-timeline/)
6. [Breaking encryption with a quantum computer just got 10 times easier, New Scientist](https://www.newscientist.com/article/2516404-breaking-encryption-with-a-quantum-computer-just-got-10-times-easier/)
7. [Quantum Decryption of RSA is Much Closer than Expected, SecurityWeek](https://www.securityweek.com/quantum-decryption-of-rsa-is-much-closer-than-expected/)
8. ["Harvest Now Decrypt Later": Examining Post-Quantum Cryptography and the Data Privacy Risks for Distributed Ledger Networks, Federal Reserve](https://www.federalreserve.gov/econres/feds/harvest-now-decrypt-later-examining-post-quantum-cryptography-and-the-data-privacy-risks-for-distributed-ledger-networks.htm)
9. [FIPS 203, Module-Lattice-Based Key-Encapsulation Mechanism Standard, NIST](https://csrc.nist.gov/pubs/fips/203/final)
10. [IBM-Developed Algorithms Announced as NIST's First Published Post-Quantum Cryptography Standards](https://newsroom.ibm.com/2024-08-13-ibm-developed-algorithms-announced-as-worlds-first-post-quantum-cryptography-standards)
11. [Harvest now, decrypt later attacks and the quantum threat, Sectigo](https://www.sectigo.com/blog/harvest-now-decrypt-later-quantum-threat)
12. [Harvest now, decrypt later: The Quiet Crisis in Post-Quantum Cryptography, Petronella Technology Group](https://petronellatech.com/quantum-computing/harvest-now-decrypt-later/)
