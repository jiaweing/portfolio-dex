---
order: 6
title: "Color by Number"
description: "AI-powered color-by-number app using Google Gemini for image generation"
github: "https://github.com/jiaweing/color-by-number"
techStack: ["nextjs","react","open source"]
badges: []
status: "Open Source"
year: "2025"
screenshots: []
lastEdited: "2026-01-03T17:21:00.000Z"
---

A Next.js application that generates images using Google Gemini AI, converts them into color-by-number templates, and provides interactive coloring.
### Features
- Generate images using Google Gemini AI from text prompts
- Automatic conversion to color-by-number templates
- Interactive coloring with color palette
- Checkerboard pattern highlighting for selected colors
- Adjustable difficulty levels (number of colors)
- Export finished artwork
### How to Use
1. Enter a prompt (e.g., "a cozy forest cabin")
2. Click "Generate" to create an image
3. Select a color from the palette
4. Click numbered regions to color them
5. Toggle template view, get hints, or reset
6. Export finished artwork
### Tech Stack
- **Framework:** Next.js 15
- **React:** React 19
- **AI:** Google Gemini API
- **Rendering:** Canvas API
- **Styling:** Tailwind CSS
### Installation
```bash
git clone https://github.com/jiaweing/color-by-number.git
cd color-by-number
pnpm install
```
Create `.env.local` with your Gemini API key:
```javascript
GEMINI_API_KEY=your_api_key_here
```
Run development server:
```bash
pnpm dev
```
### Links
- **GitHub:** [jiaweing/color-by-number](https://github.com/jiaweing/color-by-number)
