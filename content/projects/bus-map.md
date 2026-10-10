---
order: 10
title: "Singapore Bus Map"
description: "Real-time Singapore bus tracker using LTA DataMall"
url: "https://github.com/jiaweing/bus-map"
github: "https://github.com/jiaweing/bus-map"
techStack: ["nextjs","react","open source","remake in 2026"]
badges: []
status: "Open Source"
year: "2025"
cover: "/content/projects/bus-map/cover.webp"
screenshots: ["/content/projects/bus-map/screenshot-1.webp","/content/projects/bus-map/screenshot-2.webp"]
lastEdited: "2026-04-26T10:47:00.000Z"
---

## Overview
An interactive web application that displays real-time Singapore bus locations and bus stops around the user's current location. Provides live updates of bus arrivals and their statuses.
## Features
- 📍 **Current Location** — Shows the user's current location on the map
- 🚏 **Nearby Bus Stops** — Displays all bus stops within a configurable radius
- 🚌 **Live Bus Locations** — Shows real-time positions of buses on the map
- ⏱️ **Arrival Times** — Provides estimated arrival times for upcoming buses
- 📱 **Responsive Design** — Works on both mobile and desktop devices
- 🔄 **Real-time Updates** — Refreshes bus positions automatically every 15 seconds
## Usage
1. Allow location access when prompted
2. Adjust the radius to see more or fewer bus stops
3. Click on bus stops or buses to see more information
4. The map will automatically update with new bus positions
## APIs Used
- **Bus Stops** — Retrieves all bus stop locations
- **Bus Arrivals** — Gets real-time bus arrival information
- **Bus Services** — Provides information about bus service routes
## Tech Stack
- Next.js 15, React 19, TypeScript
- Leaflet for interactive maps
- LTA DataMall APIs
- Tailwind CSS, SWR for data fetching
