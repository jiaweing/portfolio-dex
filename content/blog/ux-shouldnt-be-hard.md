---
title: "UX shouldn't be hard"
date: "2025-03-30"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Thoughts"]
tagColors: {"Thoughts":"gray"}
postTags: []
---

If it takes an entire course and a certification exam to learn how to use a website, something has gone wrong. Not with you, with the product.
And yet, this is exactly where we are with some of the most widely used software in the world.
## The certification industrial complex
Think about how many products have spawned their own training ecosystems. Not developer tools or programming languages, just products that people need to *use* as part of their jobs:
- **AWS** has 12+ certification paths, from Cloud Practitioner to Solutions Architect Professional. Entire bootcamps and study communities exist just to help people navigate the console.
- **Salesforce** offers certifications across six role tracks: Administrator, Architect, Consultant, Designer, Developer, and Marketer. There are dedicated "Trailhead" learning paths that take weeks to complete.
- **SAP** requires formal training and annual recertification. Reddit users have joked that SAP's interface looks like it was built in 2004, because it was.
- **Google Cloud Platform** mirrors AWS with its own sprawling certification hierarchy.
- **ServiceNow**, **Workday**, and **Oracle** each have their own certification programs, training academies, and consulting ecosystems built around the sheer difficulty of using the product.
- **Jira** has become so notoriously complex that "Jira admin" is a full-time job at many companies, and Atlassian offers its own certification program to prove you can configure it.
When a product needs a multi-week course just to onboard a new user, that is not a feature. That is a failure of design.
## Why does this happen?
It is tempting to blame the products, but the pattern is consistent enough to suggest something structural is going on.
### Feature accumulation without simplification
Most enterprise software starts simple. Then customers ask for more features. Each feature makes sense in isolation. But no one ever goes back to simplify the whole. Over years, you end up with a sprawling interface where every setting has fifteen options, and every option has a submenu.
### Designing for power users, forgetting everyone else
AWS was built by engineers for engineers. Salesforce was built for CRM administrators. When the product succeeds and adoption expands, suddenly a marketing coordinator or a junior developer is staring at the same interface designed for a systems architect. The product never adapts to meet them halfway.
### Complexity becomes a moat
Here is the uncomfortable truth: complexity is profitable. Every certification exam has a fee. Every training course has a price tag. An entire industry of consultants, trainers, and integration partners depends on these products staying difficult. If Salesforce were intuitive enough that anyone could set it up in an afternoon, an enormous consulting ecosystem would collapse.
### No incentive to simplify
Once a product dominates its market, switching costs are enormous. Companies have already invested in training, customizations, and integrations. The vendor has little competitive pressure to simplify, because customers are locked in.
## What good UX actually looks like
Good UX does not mean dumbed down. It means the product meets you where you are and helps you accomplish what you need without requiring a prerequisite course.
A few principles that the best products get right:
**Progressive disclosure.** Show simple options first, and let users access advanced features when they need them. You do not have to expose every configuration knob on the first screen.
**Sensible defaults.** Most users should not have to configure anything to get started. The product should work out of the box with reasonable settings, and let power users override them.
**Consistent mental models.** When something works one way in one part of the product, it should work the same way everywhere. Inconsistency is one of the fastest ways to make a product feel impossible to learn.
**Contextual help, not courses.** If a user needs to understand a feature, the explanation should be *right there*, not in a separate learning portal they have to sign up for.
**Honest information architecture.** If users cannot find a feature, the feature does not exist for them. Good navigation and search are not nice-to-haves. They are the product.
## The real cost of bad UX
Bad UX is not just annoying. It has real costs:
- **Wasted time.** Hours spent in training could be spent doing actual work.
- **Slower onboarding.** New employees take weeks or months to become productive, instead of days.
- **Increased errors.** Confusing interfaces lead to mistakes, some of which can be expensive or even dangerous in the wrong context.
- **Learned helplessness.** When people assume software is "just hard," they stop expecting better. They blame themselves instead of the product.
## We should expect more
The existence of a certification program is not a badge of honor. It is an admission that the product failed to be self-explanatory. There is nothing wrong with offering advanced training for genuinely complex workflows. But when a basic user needs a course just to navigate the dashboard, the product has a design problem.
The best tools feel invisible. You pick them up, you use them, and you get on with your work. That should be the standard, not the exception.
Next time you are struggling with a piece of software, remember: you are not the problem. The design is.
## References
1. [Why does AWS have such poor UX?](https://www.quora.com/Why-does-AWS-have-such-poor-UX), Quora discussion
2. [SAP is worth \$234 billion. Their interface looks like 2004.](https://www.reddit.com/r/Design/comments/1re9h3s/sap_is_worth_234_billion_their_interface_looks/), Reddit r/Design
3. [Why is Salesforce's UX so bad?](https://www.quora.com/Why-is-Salesforces-UX-so-bad), Quora discussion
4. [12 Bad UX Examples: Lessons From the Most Criticized Apps](https://www.eleken.co/blog-posts/bad-ux-examples), Eleken
5. [Why Enterprise Software has such bad UX Design](https://www.youtube.com/watch?v=JYByw5ejiSk), YouTube
6. [10 Bad UI Examples That Hurt UX](https://www.ofspace.co/blog/bad-ui-examples), Ofspace
7. [AWS Certification Difficulty Ranking](https://digitalcloud.training/aws-certification-difficulty-ranking/), Digital Cloud Training
8. [Salesforce Certifications Guide](https://www.cio.com/article/234728/7-salesforce-certifications-that-will-advance-your-career.html), CIO
9. [SAP Certification Portal](https://learning.sap.com/get-certified), SAP Learning
