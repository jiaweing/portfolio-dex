---
order: 3
title: "Lemon8 Travel Agent"
description: "AI agents that scrape Lemon8 and generate comprehensive travel guides"
github: "https://github.com/jiaweing/lemon8-travel-research-agent"
techStack: ["open source"]
badges: []
status: "Open Source"
year: "2025"
screenshots: []
lastEdited: "2026-01-03T17:22:00.000Z"
---

## Overview
AI-powered travel companion that turns authentic Lemon8 experiences into comprehensive guides. A team of agents scrapes and analyzes real user experiences from Lemon8 to create detailed, practical travel guides with local insights and genuine recommendations.
## Features
- **Smart Content Analysis** — Advanced filtering, relevance scoring, and cross-validation across multiple sources
- **Comprehensive Coverage** — Accommodations, food & dining, activities, transport, culture, and costs
- **Rich Visual Content** — 16:9 optimized location photos organized by category
- **Local Expertise** — Authentic recommendations, insider tips, seasonal considerations
- **Travel Insights** — Local warnings, peak/off-peak timing, cultural considerations, safety tips
## Architecture
Multi-agent system with specialized roles:
1. **Scraper Agent** — Content discovery, screenshot capture, recommendation processing
2. **Relevance Agent** — Real-time scoring, travel relevance check, queue management
3. **Analyzer Agent** — Content categorization, information extraction
4. **Aggregator Agent** — Content merging, cross-validation, guide structuring
## Tech Stack
- **Python 3.11+** with Poetry
- **crewAI** — Agent orchestration
- **crawl4ai** — Web crawling
- **langchain + langchain-openai** — LLM integration
- **beautifulsoup4** — HTML parsing
- **Pillow** — Image processing
## Usage
```bash
# Install
git clone https://github.com/jiaweing/lemon8-travel-research-agent.git
poetry install

# Configure
cp .env.example .env

# Run
python src/main.py
```
Choose content focus (Everything, Food, Activities, Accommodation, Transport, Culture) and coverage level (5-15+ sources) to generate comprehensive travel guides.
