import {
  blog as blogCollection,
  pages as pagesCollection,
  projects as projectsCollection,
} from "collections/server";
import stackData from "@/content/stack.json";
import {
  type Block,
  type BlogPost,
  calculateReadingTime,
  markdownToBlocks,
  type Page,
  type Project,
  type StackItem,
} from "@/lib/blocks";

export type { Block, BlogPost, Page, Project, StackItem } from "@/lib/blocks";
export {
  blockToPlainText,
  calculateReadingTime,
  extractDescriptionFromBlocks,
} from "@/lib/blocks";

// All content lives in /content as markdown, collected by Fumadocs at build time

type Entry = {
  info: { path: string };
  getText: (type: "raw") => Promise<string>;
};

const slugOf = (entry: Entry) => entry.info.path.replace(/\.mdx?$/, "");

const stripFrontmatter = (raw: string) =>
  raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");

async function loadBlocks(entry: Entry): Promise<Block[]> {
  return markdownToBlocks(stripFrontmatter(await entry.getText("raw")));
}

const todayStr = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

// --- Blog Posts ---

type BlogEntry = (typeof blogCollection)[number];

function toPost(entry: BlogEntry): BlogPost {
  const slug = slugOf(entry);
  return {
    id: slug,
    slug,
    title: entry.title,
    date: entry.date,
    lastEdited: entry.lastEdited,
    description: entry.description,
    tags: entry.tags,
    tagColors: entry.tagColors,
    postTags: entry.postTags,
    cover: entry.cover,
    readingTime: 0, // calculated on individual post page
    pinned: entry.pinned,
  };
}

// Drafts and future dated posts stay hidden unless OG generation opts in
function isVisible(entry: BlogEntry, includeHidden: boolean) {
  if (includeHidden) return true;
  if (entry.draft) return false;
  return !entry.date || entry.date.slice(0, 10) <= todayStr();
}

const byDateDesc = (a: BlogEntry, b: BlogEntry) =>
  b.date.localeCompare(a.date) ||
  (b.lastEdited ?? "").localeCompare(a.lastEdited ?? "");

export async function getBlogPosts(options?: {
  includeAll?: boolean;
}): Promise<BlogPost[]> {
  return [...blogCollection]
    .filter((entry) => isVisible(entry, Boolean(options?.includeAll)))
    .sort(byDateDesc)
    .map(toPost);
}

export async function getBlogPost(
  slug: string
): Promise<{ post: BlogPost | null; blocks: Block[] }> {
  const entry = blogCollection.find((e) => slugOf(e) === slug);
  const includeHidden = process.env.OG_BUILD_INCLUDE_UNPUBLISHED === "true";
  if (!(entry && isVisible(entry, includeHidden))) {
    return { post: null, blocks: [] };
  }
  const blocks = await loadBlocks(entry);
  return {
    post: { ...toPost(entry), readingTime: calculateReadingTime(blocks) },
    blocks,
  };
}

// --- Generic Pages ---

type PageEntry = (typeof pagesCollection)[number];

function toPage(entry: PageEntry): Page {
  const slug = slugOf(entry);
  return {
    id: slug,
    slug,
    title: entry.title,
    lastEdited: entry.lastEdited,
    cover: entry.cover,
    description: entry.description,
  };
}

export async function getPages(): Promise<Page[]> {
  return pagesCollection.map(toPage);
}

export async function getPage(
  slug: string
): Promise<{ page: Page | null; blocks: Block[] }> {
  const entry = pagesCollection.find((e) => slugOf(e) === slug);
  if (!entry) return { page: null, blocks: [] };
  return { page: toPage(entry), blocks: await loadBlocks(entry) };
}

// --- Projects ---

type ProjectEntry = (typeof projectsCollection)[number];

function toProject(entry: ProjectEntry): Project {
  const slug = slugOf(entry);
  return {
    id: slug,
    slug,
    title: entry.title,
    description: entry.description,
    url: entry.url,
    github: entry.github,
    techStack: entry.techStack,
    badges: entry.badges,
    status: entry.status,
    year: entry.year,
    logo: entry.logo,
    cover: entry.cover,
    screenshots: entry.screenshots,
    lastEdited: entry.lastEdited,
  };
}

export async function getProjects(): Promise<Project[]> {
  return [...projectsCollection]
    .sort((a, b) => a.order - b.order)
    .map(toProject);
}

export async function getProject(
  slug: string
): Promise<{ project: Project | null; blocks: Block[] }> {
  const entry = projectsCollection.find((e) => slugOf(e) === slug);
  if (!entry) return { project: null, blocks: [] };
  return { project: toProject(entry), blocks: await loadBlocks(entry) };
}

// --- Stack Items ---

export async function getStackItems(): Promise<StackItem[]> {
  return (stackData as Omit<StackItem, "id">[]).map((item) => ({
    id: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    ...item,
  }));
}
