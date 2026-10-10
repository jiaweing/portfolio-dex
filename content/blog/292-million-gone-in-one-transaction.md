---
title: "$292 million gone in one transaction"
date: "2026-04-20"
lastEdited: "2026-04-29T12:31:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: ["Blockchain","Security"]
---

On Saturday, an attacker drained 116,500 rsETH from Kelp DAO's LayerZero-powered cross-chain bridge. That's roughly \$292 million, about 18 percent of rsETH's entire circulating supply, gone in a single transaction. It's now the largest DeFi exploit of 2026.
The fallout was immediate. Aave, SparkLend, Fluid, and Upshift all triggered emergency freezes. Aave V3 is sitting on bad debt it can't liquidate. AAVE's token dropped 10 percent. And rsETH holders across more than 20 networks are left wondering what backs their tokens now.
This isn't a new story. It's the same story, replayed at a larger scale, because the architecture hasn't changed.
## What happened
At 17:35 UTC on April 18, an attacker-controlled wallet called `lzReceive` on LayerZero's EndpointV2 contract. That call triggered Kelp's bridge contract to release all 116,500 rsETH to a separate attacker address. The wallet had been funded roughly 10 hours earlier through Tornado Cash's 1 ETH pool, a standard obfuscation step in DeFi exploits.
The attacker didn't stop at the drain. They deposited the stolen rsETH as collateral on Aave V3 and borrowed over \$236 million in WETH against it. Because the rsETH is now unbacked, those positions are effectively unliquidatable. Aave is left holding WETH obligations it cannot recover through normal liquidation mechanics.
As Solidity developer and auditor 0xQuit put it: "Wish I had better news but looks like WETH on Aave is fucked. Withdraw if you can but likely too late."
Aave has since frozen rsETH markets on both V3 and V4. The protocol says it will use its Umbrella backstop module and reserves to offset the bad debt. Kelp DAO paused rsETH contracts across mainnet and several L2s.
## Bridges are the weakest link
Cross-chain bridges are, by design, high-value honeypots. They hold pooled reserves backing wrapped tokens across multiple networks. Compromise the bridge, and you compromise every token it backs on every chain it serves.
This isn't theoretical. The track record is damning:
- **Ronin Bridge (2022):** \$625 million stolen via compromised validator keys
- **BSC Token Hub (2022):** \$568 million drained through a proof verifier flaw
- **Wormhole (2022):** \$326 million lost when an attacker minted 120,000 wETH on Solana without collateral
- **Nomad (2022):** \$190 million drained after a smart contract failed to validate transaction inputs
- **Horizon (2022):** \$100 million stolen, later attributed to North Korea's Lazarus Group
By August 2022, Chainalysis estimated that \$2 billion had been stolen across 13 bridge hacks, accounting for 69 percent of all crypto theft that year. Four years later, bridges are still the primary attack surface. Kelp's \$292 million loss just overtook the Drift protocol exploit (\$285 million on April 1) as 2026's largest.
The pattern is consistent: bridges concentrate risk into a single point of failure. Whether the vector is a private key compromise, a logic error in verification, or a flawed cross-chain message validation path, the outcome is the same. One breach, catastrophic loss.
## More connections, more attack surface
LayerZero's value proposition is connectivity. Connect any chain to any chain. Make cross-chain messaging seamless. The problem is that each new connection is a new trust boundary, and every trust boundary is a potential exploit vector.
Kelp's bridge held reserves backing rsETH on more than 20 networks. That means a single vulnerability in the bridge contract didn't just affect one chain, it propagated across all of them. Every rsETH holder on every L2 is now exposed to the same underlying failure.
This is the fundamental tension in cross-chain architecture. Traditional bridges rely on a single, global validator set to secure all transfers. As LayerZero's own documentation acknowledges, this creates a concentration of risk where any attack compromises the entire pool rather than a specific transfer.
LayerZero V2 introduced per-pathway security isolation, where security measures scale with the value in each channel. But that architectural improvement didn't prevent Kelp's bridge contract from being exploited through the `lzReceive` call path. The messaging layer can be well-designed and the application layer can still be the weak link.
## Centralized kill switches on "decentralized" protocols
The emergency response is revealing. Within hours of the exploit, Aave froze rsETH markets. SparkLend, Fluid, and Upshift did the same. Kelp paused contracts across mainnet and L2s.
These are protocols that market themselves as decentralized, permissionless, and censorship-resistant. And yet the first response to a crisis is a centralized freeze, a kill switch pulled by a small group of actors.
This isn't necessarily wrong. In fact, it's arguably the right call. Without the freeze, the damage would have cascaded further. Aave's bad debt would have grown as more users tried to borrow against worthless rsETH collateral.
But it exposes a contradiction that the DeFi ecosystem has never resolved. The protocols need centralized emergency controls to survive, yet their entire value proposition rests on not having centralized controls. The kill switch is the safety net that proves the system isn't what it claims to be.
For anyone building systems that span trust boundaries, this is the real lesson. You need circuit breakers. You need the ability to halt operations when something goes wrong. And you need to be honest about the fact that those controls exist.
## The security lesson beyond DeFi
Strip away the crypto specifics and the Kelp exploit is a textbook case of a pattern that shows up everywhere in software architecture: any system with bridges or integrations between trust boundaries faces this class of risk.
The bridge is an adapter between two systems that don't natively trust each other. It holds state (pooled reserves) that both sides depend on. It processes messages from external sources (`lzReceive` from LayerZero's endpoint). And it has to validate those messages correctly every single time, because one failure means total loss.
This is the same risk profile as:
- API gateways that bridge internal services with external clients
- Payment processors that sit between merchants and banking networks
- Identity providers that federate authentication across organizations
- Supply chain integrations that connect vendor systems to internal ERP
The principles that would have helped are the same ones that apply to any integration boundary:
1. **Least privilege.** The bridge contract shouldn't have been able to release the entire reserve pool in a single call. Rate limits, per-transaction caps, and time-delayed withdrawals for large amounts are basic controls that would have bounded the damage.
2. **Defense in depth.** A single validation check on `lzReceive` was the only barrier between the attacker and \$292 million. Multiple independent verification steps, each with different failure modes, would have made the exploit exponentially harder.
3. **Blast radius containment.** Backing rsETH across 20+ networks from a single reserve pool means one failure affects everything. Segmented reserves, per-chain backing, or insurance mechanisms would have limited the fallout.
4. **Assume breach.** The emergency freeze worked, but it was reactive. Proactive monitoring with automated circuit breakers triggered by anomalous withdrawal patterns could have caught this before the full 116,500 rsETH was drained.
## Why this keeps happening
The incentive structure in DeFi rewards speed to market over security. Launch fast, attract deposits, capture TVL. The bridge that connects to the most chains wins, even if that connectivity comes at the cost of a larger attack surface.
Security audits exist, and Kelp DAO even had a bug bounty program on Immunefi. But audits are point-in-time checks, and bounty programs only work when the potential payout exceeds what an attacker can steal. When a bridge holds \$292 million in reserves, the bounty would need to be astronomically large to make ethical disclosure more attractive than exploitation.
The deeper problem is architectural. Bridges are inherently high-value targets with concentrated risk, and the DeFi ecosystem keeps building more of them. Every new liquid staking derivative, every new restaking protocol, every new cross-chain wrapper adds another layer of abstraction between users and the underlying assets. Each layer is another potential point of failure.
Until the economics change, until the cost of a security failure is borne by the builders rather than the users, this cycle will continue. Kelp DAO's \$292 million loss is not the last bridge exploit. It's just the latest.
## References
1. [Kelp DAO's rsETH bridge apparently exploited for roughly \$292 million in LayerZero-based attack](https://www.theblock.co/post/397988/kelp-daos-rseth-bridge-apparently-exploited-for-roughly-292-million-in-layerzero-based-attack) , The Block
2. [2026's biggest crypto exploit: Kelp DAO hit for \$292 million with wrapped ether stranded across 20 chains](https://www.coindesk.com/tech/2026/04/19/2026-s-biggest-crypto-exploit-kelp-dao-hit-for-usd292-million-with-wrapped-ether-stranded-across-20-chains) , CoinDesk
3. [Aave WETH Suppliers Urged to Withdraw After KelpDAO rsETH Exploit](https://beincrypto.com/aave-weth-rseth-exploit-withdraw-warning/) , BeInCrypto
4. [Hackers target DeFi protocol Kelp DAO in massive \$300m exploit](https://www.dlnews.com/articles/defi/kelp-dao-defi-protocol-hacked-for-300-million/) , DL News
5. [KelpDAO Exploiter Deposits Stolen rsETH, Borrows \$236M in WETH](https://phemex.com/news/article/kelpdao-exploiter-deposits-stolen-rseth-borrows-236m-in-weth-74250) , Phemex
6. [KelpDAO rsETH Exploit Creates \$290M Bad Debt on Aave](https://startupfortune.com/kelpdao-rseth-exploit-creates-290m-bad-debt-on-aave/) , Startup Fortune
7. [Cross-Chain Bridge Hacks Emerge as Top Security Risk](https://www.chainalysis.com/blog/cross-chain-bridge-hacks-2022/) , Chainalysis
8. [Seven Key Cross-Chain Bridge Vulnerabilities Explained](https://chain.link/education-hub/cross-chain-bridge-vulnerabilities) , Chainlink
9. [Message Channel Security, LayerZero V2 Documentation](https://docs.layerzero.network/v2/concepts/protocol/message-security) , LayerZero
