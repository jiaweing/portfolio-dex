---
order: 11
title: "DropDrawer"
description: "Responsive dropdown/drawer component for shadcn/ui"
url: "https://dropdrawer.jiaweing.com/"
github: "https://github.com/jiaweing/DropDrawer"
techStack: ["react","open source"]
badges: [{"name":"180 stars","color":"brown"}]
status: "Open Source"
year: "2025"
screenshots: []
lastEdited: "2026-01-03T17:02:00.000Z"
---

## Overview
A responsive component that automatically switches between a dropdown menu on desktop and a drawer on mobile devices for shadcn/ui. A drop-in replacement for shadcn/ui's DropdownMenu component.
## Why DropDrawer?
Traditional dropdown menus don't feel native on mobile devices — they can be difficult to interact with on small screens. DropDrawer solves this by:
- Automatically switching between dropdown menus on desktop
- Using a native-feeling drawer interface on mobile devices
- Providing consistent interaction patterns across all screen sizes
- Using a responsive breakpoint of 768px (configurable)
## Installation
```bash
pnpm dlx shadcn@latest add https://dropdrawer.jiaweing.com/r/dropdrawer.json
```
## Component Mapping
<table header-row="true">
<tr>
<td>DropdownMenu</td>
<td>DropDrawer</td>
</tr>
<tr>
<td>DropdownMenu</td>
<td>DropDrawer</td>
</tr>
<tr>
<td>DropdownMenuTrigger</td>
<td>DropDrawerTrigger</td>
</tr>
<tr>
<td>DropdownMenuContent</td>
<td>DropDrawerContent</td>
</tr>
<tr>
<td>DropdownMenuItem</td>
<td>DropDrawerItem</td>
</tr>
<tr>
<td>DropdownMenuSub</td>
<td>DropDrawerSub</td>
</tr>
</table>
## Credits
- shadcn/ui by shadcn
- Vaul by emilkowalski
- Radix UI by Workos
- Credenza by redpangilinan for inspiration
