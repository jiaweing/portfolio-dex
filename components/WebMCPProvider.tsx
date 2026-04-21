"use client";

import { useEffect } from "react";
import profileData from "@/data/profile.json";

export function WebMCPProvider() {
  useEffect(() => {
    if (!("modelContext" in navigator)) return;

    const mc = (navigator as any).modelContext;

    mc.registerTool({
      name: "get_profile",
      description:
        "Get Jia Wei Ng's profile info, current roles, and social links",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        const present = (profileData as any).present;
        const social = (profileData as any).social;
        return {
          name: "Jia Wei Ng",
          bio: "a serial entrepreneur, designer & software engineer",
          currentRoles: present,
          social,
        };
      },
    });

    mc.registerTool({
      name: "list_projects",
      description: "List projects from Jia Wei Ng's portfolio",
      inputSchema: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Max results" },
        },
      },
      execute: async ({ limit = 20 }: { limit?: number }) => {
        const res = await fetch("/api/mcp/projects");
        const data = await res.json();
        return data.slice(0, limit);
      },
    });

    mc.registerTool({
      name: "list_blog_posts",
      description: "List recent blog posts from Jia Wei Ng's blog",
      inputSchema: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Max results" },
        },
      },
      execute: async ({ limit = 20 }: { limit?: number }) => {
        const res = await fetch("/api/mcp/blog");
        const data = await res.json();
        return data.slice(0, limit);
      },
    });
  }, []);

  return null;
}
