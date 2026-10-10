---
title: "Loading screens and error pages"
date: "2026-03-22T18:00:00.000+08:00"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Dev"]
tagColors: {"Dev":"blue"}
postTags: []
---

Nobody talks about the moments between the moments. Your app loads. A page breaks. A file uploads. These transitions, the loading screens and error pages, are the connective tissue of every digital experience. Most teams treat them as afterthoughts. But they shape how people *feel* about your product more than you might expect.
The best products get these details right. The worst ones don't even try.
## Why these moments matter
Users are impatient. Research consistently shows that perceived wait times feel significantly longer than actual wait times. Unoccupied time drags. A 3-second wait can feel like 10 if nothing is happening on screen. But if users are engaged or informed during that same window, they perceive the wait as up to 30% shorter.
The same principle applies to errors. A broken link or missing page doesn't have to feel like a dead end. It can feel like a gentle redirect, or even a moment of delight, if handled with care.
These in-between states are where trust is built or broken. A well-designed loading screen says "we're working on it." A thoughtful error page says "we've got you, here's what to do next." A blank screen or generic error code says nothing at all, and that silence is loud.
## The psychology of waiting
The way people experience time while waiting is deeply subjective. A few principles from psychology and UX research help explain why:
- **Occupied time feels shorter than unoccupied time.** Give people something to look at, read, or interact with, and the wait shrinks in their mind.
- **Known durations feel shorter than unknown ones.** A progress bar that moves forward is more tolerable than a spinner that loops endlessly. Users can mentally plan around a known wait.
- **Explained waits are more tolerable.** When people understand *why* they're waiting, such as "processing your upload" or "connecting to server," they're more patient than when left guessing.
- **Anxiety makes time stretch.** If a user doesn't know whether the system is working or frozen, every second feels longer. Silence breeds doubt.
These aren't just abstract ideas. They directly inform the design choices behind every loading pattern you encounter online.
## Loading screen patterns that work
Not all loading indicators are created equal. The right pattern depends on context: how long the wait is, what's being loaded, and how much you can predict about the duration.
### Skeleton screens
Skeleton screens have become the modern default for full-page loads. Instead of showing a blank page or a spinner, you render a wireframe-like placeholder that mimics the layout of the incoming content. Gray boxes stand in for images, thin lines represent text, and the overall page structure is visible before any real data arrives.
LinkedIn, Facebook, and YouTube all use this approach. The effect is subtle but powerful: users start building a mental model of the page before it fully loads. This reduces cognitive load when the real content appears, because the brain has already started processing the layout.
Some skeleton screens add a shimmer animation, a pulsing gradient that moves across the placeholder shapes. This keeps users visually engaged and communicates that the system is actively working, not stalled.
One important caveat: skeleton screens work best for waits under 10 seconds. Beyond that, users need more explicit feedback about progress.
### Progress bars
For longer, deterministic tasks, progress bars are still the gold standard. They give users a sense of scale, a visible finish line, and the ability to estimate how much longer they'll wait.
A good progress bar always moves forward. Research on perceived performance shows that users strongly dislike a bar that stalls, especially near the end. A common trick is to use an ease-in animation so the bar appears to accelerate, leaving users with a positive impression of speed.
Progress bars work well for uploads, downloads, file conversions, and any process where you can reasonably estimate completion.
### Spinners and when to use them
Spinners, the classic rotating circle, are indeterminate. They say "something is happening" but give no indication of how long it will take. This makes them a poor choice for full-page loads or anything longer than a few seconds.
Where spinners do work: small, contained interactions. A button that briefly shows a spinner after being clicked. A single card loading inside a dashboard. A table row refreshing after an edit. In these micro-contexts, a spinner provides just enough feedback without overpromising.
### Step indicators
For multi-stage processes, step indicators break a long wait into digestible chunks. Instead of one long progress bar, you show the current phase: "Connecting to server," "Processing data," "Generating report." Even if users can't estimate total duration, they can see that the system is making progress through distinct stages.
This pattern works especially well for AI-powered features, where processing times are unpredictable and variable.
### The labor illusion
Sometimes you *want* the system to feel like it's working hard, even when the operation is nearly instantaneous. This is called the labor illusion, or benevolent deception. A brief, deliberate delay paired with a progress animation gives users the impression that something meaningful just happened.
Think of email send confirmations that give you a 5-second window to undo, or financial tools that pause briefly after running a "security check." The wait isn't technically necessary, but it builds confidence in the result.
## Error pages that don't feel like dead ends
Now for the other side of the coin: what happens when something goes wrong.
The default 404 error, "Page Not Found," violates every guideline for good error messages. It's technical, vague, and offers no path forward. According to Nielsen Norman Group's classic analysis, a good error message should be written in plain language, describe the specific problem, and suggest constructive next steps.
### What a good error page does
A well-designed error page should accomplish three things:
1. **Acknowledge the problem clearly.** "We couldn't find that page" is better than "404 Not Found." Skip the jargon.
2. **Explain what might have gone wrong.** Maybe the link is outdated, the URL was mistyped, or the content was moved. Naming likely causes helps users self-diagnose.
3. **Offer a way forward.** This could be a search bar, links to popular pages, a button back to the homepage, or a combination. The goal is to keep people on your site instead of bouncing.
### Creative error pages as brand moments
Some companies treat error pages as opportunities for brand expression. A playful illustration, a clever line of copy, or a mini-game can turn a frustrating moment into a memorable one.
Slack's error page features quirky illustrations. GitHub's shows a parallax Star Wars-inspired scene. Figma leans into its design identity with interactive visuals. These aren't just fun, they communicate that the company cares about details even in places most users rarely visit.
But creativity should never override clarity. The primary job of an error page is still to help the user recover. An elaborate animation means nothing if the user can't figure out how to get back to useful content.
### Error states beyond 404s
Error pages aren't limited to missing URLs. Good error handling covers a range of scenarios:
- **Network failures.** "You seem to be offline. We'll retry when your connection is back."
- **Server errors.** "Something went wrong on our end. We're looking into it."
- **Permission issues.** "You don't have access to this page. Here's who to contact."
- **Empty states.** Not technically errors, but a blank dashboard or empty search result can feel like one. A helpful message and a clear call to action make all the difference.
Each of these deserves the same attention as a 404 page: plain language, honesty about what happened, and a constructive next step.
## Practical takeaways
If you're building or improving a product, here's a quick checklist for these in-between moments:
**For loading screens:**
- Match the indicator to the wait time. Under 1 second, do nothing. 1 to 10 seconds, use skeleton screens or spinners. Over 10 seconds, use progress bars or step indicators.
- Always communicate that the system is working. Silence is the enemy.
- Consider the perceived value of the task. High-stakes operations can benefit from a slight deliberate delay.
- Test on slow connections. Your loading experience might be invisible on fast wifi but critical on mobile data.
**For error pages:**
- Replace default error pages with custom ones. Even a simple improvement helps.
- Write in plain language. No error codes without context.
- Always provide a way forward: search, navigation, or a link to the homepage.
- Treat error pages as a design surface, not an afterthought.
## The details are the product
Loading screens and error pages aren't glamorous. They don't make it into pitch decks or launch announcements. But they're the moments where your product's character shows through.
When someone hits a broken link and finds a helpful, well-designed page that guides them back, that's trust. When someone watches a skeleton screen smoothly transition into real content, that's polish. These small moments compound into the overall feeling of quality that separates good software from great software.
The in-between moments deserve your attention. They're part of the product too.
## References
1. Nielsen Norman Group, "Skeleton Screens 101" [https://www.nngroup.com/articles/skeleton-screens/](https://www.nngroup.com/articles/skeleton-screens/)
2. Nielsen Norman Group, "Improving the Dreaded 404 Error Message" [https://www.nngroup.com/articles/improving-dreaded-404-error-message/](https://www.nngroup.com/articles/improving-dreaded-404-error-message/)
3. Pencil & Paper, "UX Design Patterns for Loading" [https://www.pencilandpaper.io/articles/ux-pattern-analysis-loading-feedback](https://www.pencilandpaper.io/articles/ux-pattern-analysis-loading-feedback)
4. Flowwies Studio, "Psychology of Loading States: Reduce Perceived Wait" [https://flowwies.blog/psychology-of-loading-states-reduce-perceived-wait-c6da1afa2d28](https://flowwies.blog/psychology-of-loading-states-reduce-perceived-wait-c6da1afa2d28)
5. LogRocket Blog, "Users hate waiting: Here's how to make loading screens a bit enjoyable" [https://blog.logrocket.com/ux-design/loading-screens-ux-design/](https://blog.logrocket.com/ux-design/loading-screens-ux-design/)
6. Userpilot, "The Loading Screen: How to Improve UX During Loading Times" [https://userpilot.com/blog/loading-screen/](https://userpilot.com/blog/loading-screen/)
7. UX Collective, "Loading UX: make users not care about having to wait" [https://uxdesign.cc/loading-ux-make-users-not-care-about-having-to-wait-c3b02a0220b5](https://uxdesign.cc/loading-ux-make-users-not-care-about-having-to-wait-c3b02a0220b5)
8. Mejtoft, T., Långström, A., & Söderström, U., "The effect of skeleton screens," Proceedings of the 36th European Conference on Cognitive Ergonomics, 2018
