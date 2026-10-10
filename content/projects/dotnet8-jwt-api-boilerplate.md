---
order: 25
title: "Dotnet 8 JWT API Boilerplate"
description: "Barebones .NET 8 API with JWT auth, MySQL, Swagger, and Serilog"
github: "https://github.com/jiaweing/dotnet8-jwt-api-boilerplate"
techStack: ["open source",".net","c#"]
badges: []
status: "Open Source"
year: "2024"
screenshots: []
lastEdited: "2026-01-04T10:45:00.000Z"
---

## Overview
A simple barebones API boilerplate with JWT authentication and MySQL database setup. No framework lock-ins, zero abstractions, full control over all the code — only dotnet.
---
## Features
- **MySQL Database** with Entity Framework Core
- **JWT Authentication** with refresh tokens
- **Role-based Authorization** (Admin and User roles)
- **Rate Limiting** for API protection
- **Anti-spam Registration** protection
- **Swagger UI** for API documentation
- **Serilog** for structured logging
---
## Getting Started
### Initial Setup
```bash
dotnet ef database update
```
### Run the Project
```bash
dotnet run
```
### Migrations
```bash
# Create new migration
dotnet ef migrations add MigrationName

# Apply migrations
dotnet ef database update

# Remove last migration
dotnet ef migrations remove
```
---
## Tech Stack
- .NET 8
- Entity Framework Core
- MySQL
- JWT Bearer Authentication
- Swagger/OpenAPI
- Serilog
---
## License
MIT License
