---
order: 17
title: "Local RAG API"
description: "Local RAG API with semantic search and reranking"
url: "https://github.com/jiaweing/localRAG-api"
github: "https://github.com/jiaweing/localRAG-api"
techStack: ["open source","remake in 2026"]
badges: []
status: "Open Source"
year: "2025"
screenshots: []
lastEdited: "2026-01-03T17:02:00.000Z"
---

## Overview
A lightweight & fully customizable API server for Contextual Retrieval-Augmented Generation (RAG) operations, supporting document chunking with context generation, multi-embedding semantic search, and reranking.
## Modes
1. **Stateless RAG** — Provide documents and chunks in the request
2. **Database RAG** — Complete contextual RAG pipeline using PostgreSQL (PgVector)
## Features
- 🔍 Text chunking with configurable size and overlap
- 🧠 Optional context generation using OpenAI or local models
- 📈 Flexible embedding model selection
- 🎯 Hybrid semantic search with configurable weights (60/40 content/context)
- 🔄 Cross-encoder reranking for better relevance
## Search Pipeline
1. **Initial Retrieval** — Generates query embedding, calculates cosine similarity, applies threshold
2. **Reranking** — Cross-encoder model for more accurate relevance scoring
## API Endpoints
- `POST /v1/chunk` — Process document chunks
- `POST /v1/query` — Search across chunks
- `POST /v1/store` — Store document in database
- `POST /v1/retrieve` — Hybrid semantic search
- `POST /v1/delete` — Delete chunks by file_id
## Tech Stack
- Node.js 18+, PostgreSQL 15+ with pgvector
- Docker support included
