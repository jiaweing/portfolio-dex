---
title: "pnpm on external disk"
date: "2024-02-01"
lastEdited: "2026-04-29T15:51:00.000Z"
tags: ["Note"]
tagColors: {"Note":"brown"}
postTags: []
---

If you are trying `pnpm install` on a project stored on an external disk, you might have realized it does not work.
This was a solution posted by Anthony Fu in July 2023, which was supposed to fix the issue.
[https://antfu.me/posts/pnpm-external-disk](https://antfu.me/posts/pnpm-external-disk)
This didn’t work for me.
I went to investigate the other configurations available on pnpm and I found that these 2 additional configurations below I found worked. If you are having the same issue, try these configurations below and see if it helps you.
```bash
package-import-method=copy
prefer-symlinked-executables=false
symlink=false
node-linker=hoisted
```
