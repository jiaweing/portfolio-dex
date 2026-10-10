---
title: "iPhone UX sucks"
date: "2026-04-11T16:25:00.000+08:00"
lastEdited: "2026-05-05T04:37:00.000Z"
tags: ["Tech"]
tagColors: {"Tech":"orange"}
postTags: []
---

It's 2026 and I'm still fighting my iPhone to do basic things. Not complex workflows, not power-user edge cases, just ordinary stuff like setting a ringtone, dismissing a notification, or figuring out which volume slider actually controls what. For a company that built its reputation on "it just works," Apple has quietly accumulated a staggering number of UX paper cuts that make the daily iPhone experience genuinely frustrating.
This isn't about hating Apple. I use an iPhone every day. But somewhere along the way, iOS stopped prioritizing clarity and simplicity, and started burying basic functionality under layers of menus, gestures, and workarounds.
## The ringtone saga
Let's start with the one that inspired this post. Want to set a custom ringtone on your iPhone? Here's what Apple expected you to do until very recently:
1. Download GarageBand (a 2GB app)
2. Open GarageBand and create a new project
3. Use the audio recorder instrument
4. Import your audio file into the timeline
5. Trim it to under 30 seconds
6. Export the project as a ringtone
7. Navigate to Settings \> Sounds & Haptics \> Ringtone
8. Select your new tone
On Android, you drop an MP3 into a folder and pick it from a list. On iPhone, you needed a full digital audio workstation to accomplish something that phones have done since the early 2000s. Apple's own support video for this process racked up millions of views, and the comments are a goldmine of disbelief. "It's insane such a simple function requires so much actions," one commenter wrote. "Why would I download a 2GB app for custom ringtones? This should be integrated natively in the settings app," said another.
To Apple's credit, iOS 26 finally added a "Use as Ringtone" option in the Files app's share menu. But the fact that it took until 2025 for this to happen is the point. A feature this basic was treated as a nice-to-have for over a decade.
## Volume controls that make no sense
The iPhone has two volume buttons on the side. Simple enough. Except those buttons control different things depending on what you're doing, and the logic is maddening.
If you're playing music, the buttons control media volume. If you're not, they control the ringer volume. If you have "Change with Buttons" turned off in Settings \> Sounds & Haptics, they always control media volume. But if you're on a phone call, they control call volume. And alarm volume? That's tied to the ringer volume, unless you've changed it, in which case it might not be.
The result is a daily game of "which volume am I adjusting right now?" You turn down the volume before a meeting, thinking you've silenced your phone, only to have your alarm blare at full volume the next morning because you adjusted media volume, not ringer volume. Or the reverse: you crank up the volume to watch a video and accidentally set your ringtone to maximum.
There is no unified volume mixer. No simple screen that shows you all your volume levels at once. Just a single ambiguous slider in Control Center that leaves you guessing.
## Notification chaos
Notifications on iOS have been a sore spot for years, and they're still not great. The inconsistencies start with something as basic as dismissing them.
If your screen is locked, you swipe a notification to the left to dismiss it. But if your screen is unlocked and a banner appears at the top, you swipe it up to dismiss it. Two different gestures for the same action, depending on a state you didn't consciously choose. And on the lock screen, if you don't swipe far enough to the left, the notification doesn't disappear. Instead it slides over to reveal a button asking if you want to clear it. It's a confirmation dialog for dismissing a notification.
Then there's the status bar. On Samsung Android, notification icons sit right in the status bar at the top of the screen, giving you a passive, always-visible summary of what's waiting for you. A quick glance tells you if you have a message, an email, or a missed call. iPhone shows you nothing up there. Instead, you get a red badge number buried on an app icon somewhere on your home screen. The result is that you stop checking altogether. You see the first few notifications on your lock screen, maybe the top five, and the rest just pile up ignored. There's no ambient awareness of what's pending, just a wall of alerts you have to actively seek out.
Grouping is another mess. iOS technically groups notifications, but not as intuitively as it could. Multiple messages from the same group chat sometimes appear as separate entries. The "Scheduled Summary" feature buries important alerts with marketing spam. And notification settings are scattered across individual app pages in Settings, so there's no single view to manage everything at once.
## The Liquid Glass disaster
Then there's iOS 26's redesign, codenamed "Liquid Glass." Apple overhauled the entire visual language of iOS with translucent, glassy UI elements that blur the content behind them. It looks gorgeous in marketing screenshots. In practice, it's a readability nightmare.
Text contrast suffers when the background shifts behind transparent elements. Toolbar buttons in Safari are harder to identify because they blend into the page content. The URL bar got squeezed between icons to the point where you can't tell what site you're on. Tabs, once a single tap away, are now hidden behind an ellipsis overflow menu.
The Nielsen Norman Group, one of the most respected voices in usability research, published an analysis titled "Liquid Glass Is Cracked, and Usability Suffers in iOS 26." They noted that hiding tabs behind an overflow menu violates best practices that say only non-essential actions should be buried there. Every extra tap to switch tabs, multiplied by millions of users doing it thousands of times, adds up to an enormous amount of wasted time.
Accessibility advocates have been even more pointed. The transparency effects make elements harder to distinguish for users with low vision. Contrast ratios frequently fall below WCAG 2.1 standards. Apple's own Human Interface Guidelines emphasize legibility and strong contrast, and yet their flagship OS update undermines both.
The community response has been scathing. One Reddit user on r/Design wrote: "Everything now has elements floating over other elements. Where there used to be dedicated white space, this now floats over everything else and is genuinely distracting." An NPR segment covered how "ordinary users and tech experts" alike are grumbling about the update.
The most telling detail? Users discovered that turning on "Reduce Motion" in Accessibility settings and then selectively disabling it per app produces a cleaner, more usable interface than the default. When an accessibility workaround looks better than the intended design, something has gone wrong.
## Safari's identity crisis
Safari on iOS 26 deserves its own section. The browser toolbar was redesigned so that the URL bar competes for space with navigation icons, making it almost impossible to see the full address of the page you're on. For a browser, obscuring the URL is a security concern, not just a cosmetic one.
Tab management went backwards. The old interface had a visible tab button with a count right in the toolbar. Now you need to tap an ellipsis menu to access your tabs, adding friction to one of the most common browser interactions. A post on r/UI_Design summed it up: "Every day, I find it incredibly challenging to locate the history tab. The tab groups are hidden, and the tab organization is quite poor. It's not expected from a mature product from a trillion-dollar company."
## The hidden "Decline" button
Here's one that still catches people off guard. When someone calls your iPhone and the screen is unlocked, you see a big green "Accept" button, plus small "Remind Me" and "Message" options. But there's no "Decline" button anywhere on the screen. To reject the call, you have to press the side button, a gesture that's completely undiscoverable unless someone tells you about it. If the screen is locked, you get both Accept and Decline buttons. Unlocked? Just Accept. The inconsistency is baffling.
On Samsung Android, both Accept and Decline are right there on the call screen, every time, regardless of lock state. No hidden gestures, no guessing. It's a solved problem that Apple has chosen not to solve, and it's been this way for years. New iPhone users coming from Android are especially blindsided, left swiping around in a panic while their phone keeps ringing.
## The alarm clock UX
Here's one that bites people every morning. The Clock app has two features that look almost identical but behave differently: alarms and timers. When a timer goes off, you get a "Stop" button. When an alarm goes off, you get a "Snooze" button in the same position, and the "Stop" action requires a swipe instead. Same app, same kind of alert, opposite interaction patterns.
And you still can't change the default alarm sound globally. Every new alarm defaults to "Radar." If you want a different sound, you have to change it manually for each alarm you create. There's no setting to pick a new default. Users have been asking for this for years on Apple Support Communities, and the answer is always the same: it's not possible.
## File management theater
The Files app exists, and it's more capable than most people realize. But Apple has done, as one Medium writer put it, "an impressively bad job of communicating what it can actually do." Most users open it once, scroll around confused, and never return.
Part of the problem is that iOS still abstracts away the file system to the point of confusion. Apps silo their data. Moving a file from one app to another requires the Share Sheet, which has its own usability issues (the list of apps and actions changes depending on context, and the ordering feels random). There's no universal "open with" that works the way desktop users expect.
## Why this keeps happening
The common thread in all of these issues is that Apple has been prioritizing visual polish over functional clarity. iOS 26's Liquid Glass is the most visible symptom, but the pattern goes back years. Features get added to Settings without a coherent information architecture. Gestures replace buttons without adequate discoverability cues. Basic customization options that exist on every other platform get treated as low-priority feature requests.
OSnews captured the institutional nature of the problem: "Apple's inability to design and build quality user interfaces is not the fault of just one fall guy, but an institutional problem." When the design lead left Apple, some expected a course correction. Instead, iOS 26 doubled down on aesthetics at the expense of usability.
There's also a philosophical issue. Apple's design ethos has always leaned toward making choices for the user, reducing options to create a simpler experience. That works when the defaults are good. But when the defaults are bad, like a ringtone system that requires GarageBand, or a volume control that silently switches contexts, the lack of user control becomes a cage rather than a convenience.
## What good would look like
None of these problems are unsolvable. A unified volume mixer, visible in Control Center, would eliminate the guessing game. A global default alarm sound setting would save millions of taps per day. Consistent notification gestures would reduce cognitive load. And a design language that prioritizes readability over transparency effects would serve every user better, especially those with accessibility needs.
The ringtone fix in iOS 26 proves Apple can address these things when they choose to. The question is why it takes so long, and why so many basic UX issues are allowed to accumulate while engineering resources go toward visual redesigns that make the experience worse.
I like my iPhone. I'm not switching. But "it just works" hasn't been true for a while now, and pretending otherwise doesn't help anyone, least of all Apple.
## References
1. [Liquid Glass Is Cracked, and Usability Suffers in iOS 26](https://www.nngroup.com/articles/liquid-glass/) - Nielsen Norman Group
2. [Why the latest iPhone update is leaving ordinary users and tech experts grumbling](https://www.npr.org/2026/01/25/nx-s1-5686514/why-the-latest-iphone-update-is-leaving-ordinary-users-and-tech-experts-grumbling) - NPR
3. [Apple's terrible UI design is not the fault of just one fall guy](https://www.osnews.com/story/144083/apples-terrible-ui-design-is-not-the-fault-of-just-one-fall-guy/) - OSnews
4. [How Apple's New iOS Design Fails at Accessibility](https://medium.com/design-bootcamp/how-apples-new-ios-design-fails-at-accessibility-0c51151d645e) - Bootcamp / Medium
5. [Did Apple abandon its own design heuristics & accessibility principles?](https://uxdesign.cc/did-apple-abandoned-its-own-design-heuristics-accessibility-principles-2d616ed7ace5) - UX Collective
6. [The iOS 26 UI/UX disaster is a consequence of Figma](https://okcomputer.substack.com/p/the-ios-26-uiux-disaster-is-a-consequence) - OK Computer / Substack
7. [iOS 26 finally makes it super simple to assign a custom iPhone ringtone](https://www.macworld.com/article/2813620/ios-26-finally-makes-it-super-simple-to-assign-a-custom-iphone-ringtone.html) - Macworld
8. [iOS 26: Set a Custom iPhone Ringtone in Seconds](https://www.macrumors.com/how-to/ios-set-custom-iphone-ringtone/) - MacRumors
9. [Case study: Fixing iPhone's weird UX for alarm and timer apps](https://medium.com/design-bootcamp/weird-ux-iphone-alarm-and-timer-apps-34062105e0f4) - Bootcamp / Medium
10. [Why the iPhone UX Sucks](https://effectiveproductmanagement.com/why-the-iphone-ux-sucks/) - Effective Product Management
