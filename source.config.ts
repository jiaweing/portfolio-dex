import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod";

// Content is plain .md exported from the old Notion CMS. Bodies load lazily
// (async) because pages only need frontmatter plus the raw markdown, which
// lib/content.ts turns into blocks for the existing renderer.

export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  async: true,
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    date: z.string(),
    lastEdited: z.string().optional(),
    tags: z.array(z.string()).default([]),
    tagColors: z.record(z.string(), z.string()).default({}),
    postTags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const projects = defineCollections({
  type: "doc",
  dir: "content/projects",
  async: true,
  schema: z.object({
    order: z.number(),
    title: z.string(),
    description: z.string().default(""),
    url: z.string().default(""),
    github: z.string().default(""),
    techStack: z.array(z.string()).default([]),
    badges: z
      .array(z.object({ name: z.string(), color: z.string() }))
      .default([]),
    status: z.string().default(""),
    year: z.string().default(""),
    logo: z.string().optional(),
    cover: z.string().optional(),
    screenshots: z.array(z.string()).default([]),
    lastEdited: z.string().optional(),
  }),
});

export const pages = defineCollections({
  type: "doc",
  dir: "content/pages",
  async: true,
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    lastEdited: z.string(),
    cover: z.string().optional(),
  }),
});

// Bodies are never rendered as MDX, so skip the default preset's image
// imports, Shiki highlighting and search indexing to keep builds fast
export default defineConfig({
  mdxOptions: { preset: "minimal" },
});
