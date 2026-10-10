---
order: 49
title: "Server Refresh"
description: "All-inclusive server restart features plugin for Source servers"
github: "https://github.com/titantf/Server-Refresh"
techStack: ["open source","sourcemod","source engine"]
badges: []
status: "Open Source"
year: "2019"
screenshots: []
lastEdited: "2026-01-07T13:20:00.000Z"
---

## Overview
All-inclusive server restart features in one SourceMod plugin. Ensures your Source game server is always refreshed and prepared for the next load. Originally developed for [Titan.TF](http://Titan.TF).
---
## Features
- **Scheduled Restarts** — Hourly, daily, and weekly restart options
- **Empty Server Detection** — Auto-restart when server empties
- **Custom Messages** — Configurable restart notifications
- **Flexible Timing** — Set exact times for scheduled restarts
- **Player Awareness** — Optional wait time before restarting
---
## Restart Types
<table header-row="true">
<tr>
<td>Type</td>
<td>Description</td>
</tr>
<tr>
<td>Empty</td>
<td>Restart when no players are connected</td>
</tr>
<tr>
<td>Hourly</td>
<td>Restart at a specific minute each hour</td>
</tr>
<tr>
<td>Daily</td>
<td>Restart at a specific time each day</td>
</tr>
<tr>
<td>Weekly</td>
<td>Restart on a specific day and time</td>
</tr>
</table>
---
## Key ConVars
<table header-row="true">
<tr>
<td>ConVar</td>
<td>Description</td>
<td>Default</td>
</tr>
<tr>
<td>`sm_restart_empty`</td>
<td>Enable restart when empty</td>
<td>1</td>
</tr>
<tr>
<td>`sm_restart_hourly`</td>
<td>Enable hourly restart</td>
<td>1</td>
</tr>
<tr>
<td>`sm_restart_daily`</td>
<td>Enable daily restart</td>
<td>1</td>
</tr>
<tr>
<td>`sm_restart_daily_time`</td>
<td>Daily restart time (HHMM)</td>
<td>"0500"</td>
</tr>
<tr>
<td>`sm_restart_weekly`</td>
<td>Enable weekly restart</td>
<td>0</td>
</tr>
</table>
---
## Installation
1. Download `server_refresh.smx`
2. Place in `tf/addons/sourcemod/plugins/`
3. Configure ConVars in `cfg/sourcemod/`
4. Restart server
---
## Tech Stack
- SourceMod
- SourcePawn
