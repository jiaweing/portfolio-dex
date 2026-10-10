---
title: "AI is prescribing your pills"
date: "2026-04-09"
lastEdited: "2026-04-30T09:28:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

In January 2026, Utah became the first US state to let an AI system renew drug prescriptions without a human doctor in the loop. Not diagnose. Not treat. Just renew the same medication a patient was already taking for a chronic condition.
The discourse around "AI replacing jobs" tends to imagine dramatic scenarios, doctors made obsolete, hospitals run by robots. But that's not what's happening here. Utah's pilot program is quieter and, frankly, more interesting. It reveals a pattern that's playing out across every industry: AI doesn't replace the expert. It replaces the boring parts of being an expert.
And that changes everything.
## What Utah actually approved
The pilot program is a partnership between the Utah Department of Commerce's Office of Artificial Intelligence Policy (OAIP) and Doctronic, a health-tech startup. Under a Regulatory Mitigation Agreement, Doctronic's AI platform can process routine prescription renewals for patients with chronic conditions.
Here's what the AI can do:
- Renew prescriptions from a list of 192 approved drugs
- Cover conditions like hypertension, diabetes, depression, asthma, birth control, and high cholesterol
- Process 30, 60, or 90-day refills of medications previously prescribed by a licensed provider
Here's what it cannot do:
- Write new prescriptions
- Modify existing treatment plans
- Renew controlled substances, painkillers, injectables, or ADHD medications
The safeguards are meaningful. Human physicians hired by Doctronic reviewed the AI's output for the first 250 patients before the system acted autonomously. The next 1,000 patients were reviewed retrospectively. If the AI is uncertain about whether to renew, it refers the patient to a Utah-licensed human physician. Doctronic is also required to disclose to users that they're interacting with AI, not a doctor.
This isn't an AI playing doctor. It's an AI handling the paperwork that doctors hate doing.
## The boring middle of every profession
Prescription renewals are a perfect example of what I think of as the "boring middle" of professional work. They're the tasks that require credentials but not expertise, that take up time but don't require judgment. A patient has been on the same blood pressure medication for three years. Their condition is stable. They need the same prescription renewed. A doctor has to review the request, confirm nothing has changed, and sign off.
It's necessary. It's also mind-numbing. And it creates real bottlenecks.
Medication non-adherence, patients not taking prescribed medications consistently, is one of the biggest problems in healthcare. It contributes to roughly 125,000 preventable deaths annually in the US and costs the healthcare system somewhere between \$100 billion and \$500 billion per year in avoidable spending. A significant chunk of non-adherence happens simply because getting a prescription renewed is inconvenient. You need to schedule an appointment, wait for the doctor, pay for the visit, all to be told to keep taking the same pills.
If an AI can handle that friction in minutes, the patient stays on their medication. The doctor's time is freed for patients who actually need clinical judgment. Everyone wins.
## The vibe coding parallel
This pattern, AI handling the tedious middle, shows up everywhere once you start looking.
Consider software development. The rise of AI coding assistants has generated the same anxious discourse: will AI replace developers? The data suggests something more nuanced. According to a Fastly survey, senior developers ship significantly more AI-assisted code than juniors. Experienced engineers know what to build, how to architect systems, and when the AI's suggestions are wrong. They use AI to skip the boring parts, boilerplate code, repetitive patterns, standard implementations, while focusing their expertise on the hard problems.
Junior developers, who lack the judgment to evaluate AI output, benefit less. Some even get slower on complex tasks when relying on AI tools.
The parallel to healthcare is striking. An experienced doctor doesn't need to personally review every stable prescription renewal any more than a senior engineer needs to hand-write every CRUD endpoint. The expertise matters most at the edges, when something is unusual, when judgment is required, when context changes the answer.
AI is most useful not when it replaces the expert, but when it handles the work the expert was overqualified for in the first place.
## Trust calibration
Here's where it gets personal. Would you trust an AI to renew your blood pressure medication? If you've been on the same statin for five years with stable lab results, probably yes. The decision is algorithmic. Nothing has changed. Renew the prescription.
But what about psychiatric medication? Antidepressant dosages can interact with life changes in ways that aren't captured in a medical record. A patient might be stable on paper but struggling in reality. The AI can check drug interactions and contraindications, but it can't read between the lines of how someone is actually doing.
Utah's pilot wisely excludes controlled substances and includes psychiatric medications only within the 192-drug list for established, stable prescriptions. But the trust question is worth sitting with. Every medication category carries a different risk profile, and our comfort with AI should scale accordingly.
This is the real conversation we need to have. Not "should AI be involved in healthcare" but "which specific tasks, for which specific conditions, with which specific safeguards."
## Who's responsible when things go wrong
The liability question is the elephant in the room. If Doctronic's AI renews a prescription and the patient has an adverse reaction, who's on the hook?
Current legal frameworks weren't built for this. Traditionally, liability in healthcare splits between the prescribing physician, the institution, and sometimes the software vendor. But Doctronic's system is freestanding, it operates outside a traditional medical practice. The Regulatory Mitigation Agreement means Utah has waived certain professional licensure and scope-of-practice laws for the pilot, which creates a novel legal grey area.
The emerging consensus in legal scholarship is that liability will likely be distributed. AI developers can be held accountable if their algorithms are flawed. Healthcare organizations bear responsibility for implementation decisions. And the regulatory framework itself, if it approved a program that caused harm, could face scrutiny.
But there's a deeper tension. As one researcher at UT Austin pointed out, physicians are increasingly expected to know when to override AI recommendations, an "unrealistic expectation" that could ironically increase the risk of burnout and errors among the very professionals AI was supposed to help.
The liability framework for autonomous AI in medicine is still being written. Utah's pilot will generate some of the first real-world data to inform it.
## How Singapore compares
Singapore takes a notably different approach. The Ministry of Health and Health Sciences Authority jointly published updated AI in Healthcare Guidelines (AIHGle 2.0) in early 2026. The core principle: AI should augment and empower healthcare professionals, with patients at the centre.
That's a philosophical difference from Utah's approach. Singapore positions AI as a tool that helps doctors do their jobs better, not one that acts independently of them. Telemedicine in Singapore already restricts what can be prescribed remotely, excluding controlled substances and medications requiring in-person training. The idea of an AI autonomously renewing prescriptions without physician involvement would be a significant departure from Singapore's regulatory posture.
There's also a practical wrinkle. Singapore's Healthcare Services Act doesn't regulate overseas providers, which means prescriptions from foreign AI systems wouldn't be accepted by local pharmacies. If Doctronic-style services proliferate globally, Singapore patients couldn't easily access them.
Both approaches have merit. Utah is running the experiment. Singapore is waiting for the data. The question is which strategy produces better outcomes for patients in the long run.
## The slippery slope that isn't
Critics warn that prescription renewals are just the beginning, that this leads inevitably to AI diagnosis, AI treatment planning, AI surgery.
But that framing misunderstands how trust in automation actually works. Each step up the complexity ladder is a separate decision with separate risk profiles:
1. **Prescription renewals** for stable chronic conditions: low complexity, low risk, high volume
2. **Triage**: moderate complexity, bounded risk, benefits from speed
3. **Diagnosis**: high complexity, high stakes, requires integration of ambiguous information
4. **Treatment planning**: very high complexity, deeply personal, requires understanding patient values
Approving AI for step one doesn't mean we're committed to step four. Each transition requires its own evidence, its own safeguards, its own public debate. The fact that we let autopilot handle cruising altitude doesn't mean we let it handle emergency landings.
Utah's pilot is generating exactly the kind of data we need to evaluate step one properly. If the outcomes are good, safe renewals, better adherence, lower costs, it builds a case for carefully expanding. If problems emerge, the pilot can be adjusted or ended. That's what regulatory sandboxes are for.
## What this means for the rest of us
The broader lesson from Utah's experiment extends well beyond healthcare. AI is systematically colonising the boring middle of every profession, the high-volume, low-judgment tasks that credentials gatekeep but expertise doesn't really require.
Legal document review. Financial compliance checks. Insurance claim processing. Teaching assistants grading multiple-choice exams. The pattern is the same everywhere: the expert's value concentrates around the edges, the unusual cases, the judgment calls, the creative leaps, while AI absorbs the routine.
This has implications for how we train professionals, how we structure careers, and how we think about expertise. If the boring middle disappears, the path from junior to senior changes. If routine work is automated, the skills that matter most are the ones that are hardest to automate: clinical intuition, contextual judgment, creative problem-solving, and the ability to know when the algorithm is wrong.
Utah let an AI renew prescriptions. It sounds small. But it's a concrete example of a much larger shift in what we expect humans and machines to each be responsible for. The interesting question isn't whether AI will do more of this. It will. The interesting question is how we redesign professions, education, and accountability around that reality.
## References
1. Utah Department of Commerce, "Utah and Doctronic Announce Groundbreaking Partnership for AI Prescription Medication Renewals" (January 2026) [https://commerce.utah.gov/2026/01/06/news-release-utah-and-doctronic-announce-groundbreaking-partnership-for-ai-prescription-medication-renewals/](https://commerce.utah.gov/2026/01/06/news-release-utah-and-doctronic-announce-groundbreaking-partnership-for-ai-prescription-medication-renewals/)
2. JAMA Health Forum, "Utah's Experiment With AI-Driven Prescription Renewals" (March 2026) [https://jamanetwork.com/journals/jama-health-forum/fullarticle/2846947](https://jamanetwork.com/journals/jama-health-forum/fullarticle/2846947)
3. FSMB, "Utah Launches AI Pilot Program for Prescription Renewals" (January 2026) [https://www.fsmb.org/siteassets/advocacy/news/january-8-2026.pdf](https://www.fsmb.org/siteassets/advocacy/news/january-8-2026.pdf)
4. Axios Salt Lake City, "Utah allows nation's first AI drug prescriptions" (January 2026) [https://www.axios.com/local/salt-lake-city/2026/01/07/utah-ai-drug-prescriptions-doctronic](https://www.axios.com/local/salt-lake-city/2026/01/07/utah-ai-drug-prescriptions-doctronic)
5. The BMJ, "Algorithm that performs prescription renewals approved in world first" (January 2026) [https://www.bmj.com/content/392/bmj.s44](https://www.bmj.com/content/392/bmj.s44)
6. MobiHealthNews, "Utah allows AI to renew prescription drugs autonomously" (January 2026) [https://www.mobihealthnews.com/news/utah-allows-ai-renew-prescription-drugs-autonomously](https://www.mobihealthnews.com/news/utah-allows-ai-renew-prescription-drugs-autonomously)
7. PharmD Live, "Medication Adherence in 2025: A Hidden Healthcare Crisis" [https://www.pharmdlive.com/blog/medication-adherence-2025/](https://www.pharmdlive.com/blog/medication-adherence-2025/)
8. Duke Health, "Medication Nonadherence Increases Health Costs, Hospital Readmissions" [https://physicians.dukehealth.org/articles/medication-nonadherence-increases-health-costs-hospital-readmissions](https://physicians.dukehealth.org/articles/medication-nonadherence-increases-health-costs-hospital-readmissions)
9. Forbes, "AI Is Breaking Jobs Into Tasks, And That Changes Everything" (February 2026) [https://www.forbes.com/sites/bernardmarr/2026/02/09/ai-is-breaking-jobs-into-tasks-and-that-changes-everything/](https://www.forbes.com/sites/bernardmarr/2026/02/09/ai-is-breaking-jobs-into-tasks-and-that-changes-everything/)
10. Fastly, "Vibe Shift in AI Coding: Senior Developers Ship 2.5x More Than Juniors" [https://www.fastly.com/blog/senior-developers-ship-more-ai-code](https://www.fastly.com/blog/senior-developers-ship-more-ai-code)
11. Singapore Ministry of Health, "Emerging Regulatory Policy Issues: AI in Healthcare" [https://www.moh.gov.sg/others/health-regulation/emerging-regulatory-policy-issues/](https://www.moh.gov.sg/others/health-regulation/emerging-regulatory-policy-issues/)
12. Stanford Health Policy, "Utah Steps into Autonomous AI Medicine with Prescription Renewal Pilot Program" [https://healthpolicy.fsi.stanford.edu/news/utah-steps-autonomous-ai-medicine-prescription-renewal-pilot-program](https://healthpolicy.fsi.stanford.edu/news/utah-steps-autonomous-ai-medicine-prescription-renewal-pilot-program)
13. UT Austin McCombs, "Who's to Blame When AI Makes a Medical Error?" [https://news.mccombs.utexas.edu/research/whos-to-blame-when-ai-makes-a-medical-error/](https://news.mccombs.utexas.edu/research/whos-to-blame-when-ai-makes-a-medical-error/)
