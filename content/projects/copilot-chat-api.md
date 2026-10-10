---
order: 4
title: "Copilot Chat API"
description: "OpenAI-compatible HTTP API for GitHub Copilot with native auth"
github: "https://github.com/jiaweing/copilot-chat-api"
techStack: ["open source"]
badges: []
status: "Open Source"
year: "2025"
screenshots: []
lastEdited: "2026-01-03T17:22:00.000Z"
---

## Overview
Simple HTTP API to interface with GitHub Copilot, including native GitHub authentication. Provides OpenAI-compatible endpoints for chat completions and code completion. Forked from [Copilot API](https://github.com/B00TK1D/copilot-api) to include chat endpoint.
## Features
- **OpenAI Compatible** — Drop-in replacement for OpenAI API
- **Cline Support** — Works with Cline by setting provider to OpenAI Compatible
- **Native GitHub Auth** — Uses GitHub authentication for Copilot access
- **Streaming Support** — Both streaming and non-streaming responses
- **Multiple Models** — Supports claude-3.5-sonnet and other Copilot-supported models
## Endpoints
### Chat Completions
`POST /v1/chat/completions`
```json
{
  "model": "claude-3.5-sonnet",
  "messages": [{ "role": "user", "content": "Hello" }],
  "temperature": 0.7,
  "max_tokens": 1000,
  "stream": true
}
```
### Code Completion
`POST /v1/code/completions`
```json
{
  "prompt": "# hello world function\n\n",
  "language": "python"
}
```
## Usage
```bash
# Install dependencies
pip install -r requirements.txt

# Run server
python api.py [port]

# Or use scripts
./mac-linux.sh  # macOS/Linux
windows.bat     # Windows
```
For Cline integration, set API provider to "OpenAI Compatible" with Base URL pointing to this server. API key can be anything.
