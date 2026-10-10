---
order: 43
title: "1 vs All Respawn"
description: "Respawn feature for boss gamemodes like Deathrun, VSH, and Freak Fortress"
github: "https://github.com/titantf/1-vs-All-Respawn"
techStack: ["open source","sourcemod","source engine"]
badges: []
status: "Open Source"
year: "2019"
screenshots: []
lastEdited: "2026-01-07T14:01:00.000Z"
---

## Overview
Adds a respawn feature to 1-vs-all boss gamemodes like Deathrun, VSH (Versus Saxton Hale), and Freak Fortress. Gives players a second chance after dying.
---
## Features
- **Scaled Respawn Timer** — Base time + additional time per player
- **HUD Display** — Shows respawn countdown and next respawns leaderboard
- **Customizable** — Fully configurable via ConVars
- **Compatible** — Works with Deathrun, VSH, Freak Fortress
---
## Key ConVars
<table header-row="true">
<tr>
<td>ConVar</td>
<td>Description</td>
<td>Default</td>
</tr>
<tr>
<td>`sm_1vA_respawntime`</td>
<td>Base respawn time (seconds)</td>
<td>20</td>
</tr>
<tr>
<td>`sm_1vA_respawnperplayertime`</td>
<td>Additional time per player</td>
<td>15</td>
</tr>
<tr>
<td>`sm_1vA_leaderboards`</td>
<td>Show next respawns</td>
<td>1</td>
</tr>
<tr>
<td>`sm_1vA_preparetime`</td>
<td>"Prepare to Respawn" warning</td>
<td>10</td>
</tr>
</table>
---
## Requirements
- MoreColors (for recompile only)
---
## Tech Stack
- SourceMod
- SourcePawn
