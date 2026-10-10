---
order: 38
title: "Auto Swiper"
description: "Browser console scripts for auto-swiping on dating apps"
url: "https://github.com/jiaweing/Tinder-OkCupid-Bumble-Auto-Swipe"
github: "https://github.com/jiaweing/Tinder-OkCupid-Bumble-Auto-Swipe"
techStack: ["open source"]
badges: []
status: "Open Source"
year: "2020"
screenshots: []
lastEdited: "2026-01-03T17:09:00.000Z"
---

## Overview
JavaScript scripts for auto-swiping on Tinder, OkCupid, and Bumble via browser developer console.
## Usage
1. Go to the website and press `F12`
2. Copy and paste the corresponding script below into your browser developer console
3. Press `ENTER`
## Scripts
### Tinder
```javascript
setInterval(function() {
  var likeBtn = document.querySelector('[class="button Lts($ls-s)..."]');
  likeBtn.click()
}, 100)
```
### OkCupid
```javascript
setInterval(function() {
  var likeBtn = document.querySelector('.dt-action-buttons-button');
  likeBtn.click()
}, 100)
```
### Bumble
`broken`
> ⚠️ Scripts may break when websites update their UI. Class selectors need to be updated accordingly.
