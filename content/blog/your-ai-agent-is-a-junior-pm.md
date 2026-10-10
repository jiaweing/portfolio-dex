---
title: "Your AI agent is a junior PM"
date: "2026-03-19"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["AI"]
tagColors: {"AI":"purple"}
postTags: []
---

Premise: Most “AI agent” implementations are really junior PMs: great at turning a vague ask into a plan, but terrible at judging whether the plan should exist.
**Links (optional)**
- OpenAI, “Model Context Protocol” (overview + how tools get invoked)
- Any internal write-up you have on your agent stack (Ryu/OpenClaw/etc.)
**Pointers**
- Define “junior PM behavior”: overconfident decomposition, underpowered judgment.
- The difference between *planning* and *deciding*.
- Why agents look smart in demos: the human already picked the goal.
- What “good supervision” actually is: checklists, budgets, and stop conditions.
- A simple rubric: when to let the agent propose vs when to let it execute.
- Failure mode: agents that optimize for motion (tasks) instead of outcomes.
- The real unlock: agents that can say “no” (or “I’m not sure”) without being punished.
**Avoid / traps**
- Don’t moralize (“humans lazy now”). Keep it systems-y.
- Don’t pretend today’s agents are autonomous employees. They are workflow components.
