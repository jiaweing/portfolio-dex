---
order: 12
title: "Local LLM API"
description: "OpenAI-compatible API server for local GGUF models"
url: "https://github.com/jiaweing/localLLM-api"
github: "https://github.com/jiaweing/localLLM-api"
techStack: ["open source","remake in 2026"]
badges: []
status: "Open Source"
year: "2025"
screenshots: []
lastEdited: "2026-01-03T17:02:00.000Z"
---

## Overview
An API server that provides OpenAI-compatible endpoints for running GGUF models locally. Designed for easy integration with any system that supports OpenAI's API format.
## Supported Operations
- Chat Completions (like GPT-3.5/4)
- Embeddings Generation
- Document Reranking
## Features
- ✨ OpenAI-compatible API endpoints
- 🚀 Drop-in replacement for OpenAI's client libraries
- 🔒 Run models locally for privacy and cost savings
- 🔄 Auto-loading and unloading of models for memory efficiency
- 📁 Organized model management by type (chat/embedding/reranking)
## API Endpoints
- `POST /v1/chat/completions` — Chat completions
- `POST /v1/embeddings` — Generate embeddings
- `POST /v1/rerank` — Rerank documents
- `POST /v1/models/load` — Pre-load a model
- `POST /v1/models/unload` — Unload a model
- `GET /v1/models` — List available models
## Tech Stack
- TypeScript + Node.js
- pnpm, runs on port 23673
- Models auto-unload after 30 minutes of inactivity
