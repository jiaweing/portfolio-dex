import { Client } from "@notionhq/client";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";

let notion: any = null;

export const REVALIDATE_TIME = 1800; // 30 minutes

export const getNotionClient = () => {
  if (!process.env.NOTION_API_KEY) {
    console.error("❌ NOTION_API_KEY is missing from environment variables!");
  }

  if (!notion) {
    try {
      const client = new Client({
        auth: process.env.NOTION_API_KEY,
      });
      notion = client;
    } catch (e) {
      console.error("Error initializing Notion Client:", e);
    }
  }
  return notion;
};

// Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  authors: { name: string; avatar?: string }[];
  tags: string[];
  tagColors?: Record<string, string>;
  cover?: string;
  readingTime: number; // in minutes
  pinned?: boolean;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content?: string;
  cover?: string;
  lastEdited: string;
  description?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  url?: string;
  github?: string;
  techStack: string[];
  badges: { name: string; color: string }[];
  status: string;
  cover?: string;
  logo?: string;
  year: string;
  screenshots: string[];
}

// Helper: Block to Plain Text
export function blockToPlainText(block: any): string {
  if (!block) return "";
  const type = block.type;
  const blockData = block[type];
  if (!blockData) return "";

  switch (type) {
    case "paragraph":
    case "heading_1":
    case "heading_2":
    case "heading_3":
    case "bulleted_list_item":
    case "numbered_list_item":
    case "quote":
    case "callout":
      return (
        blockData.rich_text?.map((text: any) => text.plain_text).join("") || ""
      );
    case "code":
      return (
        blockData.rich_text?.map((text: any) => text.plain_text).join("") || ""
      );
    default:
      return "";
  }
}

// Helper: Extract plain text description from blocks
export function extractDescriptionFromBlocks(
  blocks: BlockObjectResponse[],
  maxLength = 160
): string {
  const texts: string[] = [];
  for (const block of blocks) {
    const text = blockToPlainText(block).trim();
    if (text) {
      texts.push(text);
      if (texts.join(" ").length >= maxLength) break;
    }
  }
  const combined = texts.join(" ");
  return combined.length > maxLength
    ? `${combined.slice(0, maxLength).trimEnd()}…`
    : combined;
}

// Helper: Calculate reading time from blocks (in minutes)
export function calculateReadingTime(blocks: BlockObjectResponse[]): number {
  const wordsPerMinute = 200;
  let wordCount = 0;

  function countWordsInBlock(block: any): void {
    const text = blockToPlainText(block).trim();
    if (text) {
      wordCount += text.split(/\s+/).filter(Boolean).length;
    }
    // Count words in nested children
    if (block.children) {
      for (const child of block.children) {
        countWordsInBlock(child);
      }
    }
  }

  for (const block of blocks) {
    // Stop at the References section
    if (
      (block.type === "heading_1" ||
        block.type === "heading_2" ||
        block.type === "heading_3") &&
      blockToPlainText(block).trim().toLowerCase() === "references"
    )
      break;
    countWordsInBlock(block);
  }

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// --- Fetching Logic ---

const getRichText = (richText: any[]) =>
  richText?.map((t) => t.plain_text).join("") || "";

const getProperty = (
  page: any,
  prop: string,
  type:
    | "title"
    | "rich_text"
    | "date"
    | "multi_select"
    | "multi_select_colored"
    | "select"
    | "status"
    | "url"
    | "people"
    | "checkbox" = "rich_text"
) => {
  const p = page.properties?.[prop];
  if (!p) return null;

  if (type === "title") return getRichText(p.title);
  if (type === "rich_text") return getRichText(p.rich_text);
  if (type === "date") return p.date?.start || "";
  if (type === "multi_select")
    return p.multi_select?.map((o: any) => o.name) || [];
  if (type === "multi_select_colored")
    return (
      p.multi_select?.map((o: any) => ({ name: o.name, color: o.color })) || []
    );
  if (type === "select") return p.select?.name || "";
  if (type === "status") return p.status?.name || "";
  if (type === "url") return p.url || "";
  if (type === "people")
    return (
      p.people?.map((person: any) => ({
        name: person.name,
        avatar: person.avatar_url,
      })) || []
    );
  if (type === "checkbox") return p.checkbox;

  return "";
};

const getTagsWithColors = (
  page: any
): { name: string; color: string | undefined }[] => {
  const preferredTagProps = ["Tags", "Tag", "Categories", "Category"];

  for (const prop of preferredTagProps) {
    const property = page.properties?.[prop];
    if (!property) continue;

    if (property.type === "select" && property.select?.name) {
      return [
        {
          name: property.select.name,
          color: property.select.color,
        },
      ];
    }

    if (property.type === "multi_select" && property.multi_select?.length > 0) {
      return property.multi_select.map((option: any) => ({
        name: option.name,
        color: option.color,
      }));
    }
  }

  if (!page.properties) return [];

  for (const key in page.properties) {
    const property = page.properties[key];
    if (property?.type === "select" && property.select?.name) {
      return [{ name: property.select.name, color: property.select.color }];
    }
    if (
      property?.type === "multi_select" &&
      property.multi_select?.length > 0
    ) {
      return property.multi_select.map((option: any) => ({
        name: option.name,
        color: option.color,
      }));
    }
  }

  return [];
};

const getTags = (page: any): string[] =>
  getTagsWithColors(page).map((option) => option.name);

const getTagColorMap = (page: any): Record<string, string> =>
  getTagsWithColors(page).reduce(
    (acc, option) => {
      if (option.color) {
        acc[option.name] = option.color;
      }
      return acc;
    },
    {} as Record<string, string>
  );

// Robust Title Getter
const getTitle = (page: any) => {
  if (!page.properties) return "Untitled";

  // 1. Try "Title" property
  if (page.properties["Title"]?.type === "title") {
    return getRichText(page.properties["Title"].title);
  }
  // 2. Try "Name" property
  if (page.properties["Name"]?.type === "title") {
    return getRichText(page.properties["Name"].title);
  }

  // 3. Scan for ANY property of type 'title'
  for (const key in page.properties) {
    if (page.properties[key].type === "title") {
      return getRichText(page.properties[key].title);
    }
  }

  return "Untitled";
};

// Helper: Recursively fetch block children up to a given depth
async function fetchBlockChildren(blockId: string): Promise<any[]> {
  const notion = getNotionClient();
  const allBlocks: any[] = [];
  let cursor: string | undefined;

  do {
    const response: any = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    allBlocks.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return Promise.all(
    allBlocks.map(async (block: any) => {
      if (block.has_children) {
        const children = await fetchBlockChildren(block.id);
        return { ...block, children };
      }
      return block;
    })
  );
}

// Helper: Fetch page blocks with children pre-fetched for nested blocks (tables, columns, etc.)
async function fetchPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const blocks = await fetchBlockChildren(pageId);
  return blocks as BlockObjectResponse[];
}

// --- Blog Posts ---
export const fetchBlogPosts = async (options?: {
  includeAll?: boolean;
}): Promise<BlogPost[]> => {
  const notion = getNotionClient();
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;

  if (!databaseId) return [];

  try {
    const publishedFilter = {
      property: "Status",
      status: { equals: "Published" },
    };

    const sorts = [{ property: "Date", direction: "descending" }];

    const allResults: any[] = [];
    let cursor: string | undefined;

    do {
      let response: any;

      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          ...(options?.includeAll ? {} : { filter: publishedFilter }),
          sorts,
          start_cursor: cursor,
          page_size: 100,
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          ...(options?.includeAll ? {} : { filter: publishedFilter }),
          sorts,
          start_cursor: cursor,
          page_size: 100,
        });
      }

      allResults.push(...response.results);
      cursor = response.has_more ? response.next_cursor : undefined;
    } while (cursor);

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    return allResults
      .map((page: any) => {
        const tags = getTags(page);
        const tagColors = getTagColorMap(page);
        const banner =
          page.properties?.Banner?.files?.[0]?.file?.url ||
          page.properties?.Banner?.files?.[0]?.external?.url ||
          page.properties?.Cover?.files?.[0]?.file?.url ||
          page.properties?.Cover?.files?.[0]?.external?.url ||
          page.cover?.external?.url ||
          page.cover?.file?.url ||
          undefined;

        return {
          id: page.id,
          slug: getProperty(page, "Slug", "rich_text") || "",
          title: getTitle(page),
          date: getProperty(page, "Date", "date") || page.created_time,
          description: getProperty(page, "Excerpt", "rich_text") || "",
          authors: getProperty(page, "Author", "people") || [],
          tags,
          tagColors,
          cover: banner,
          readingTime: 0, // calculated on individual post page
          pinned: getProperty(page, "Pinned", "checkbox"),
        } as BlogPost;
      })
      .filter((post: BlogPost) => {
        if (!post.slug) return false;
        if (options?.includeAll) return true;
        if (!post.date) return true;
        return post.date.slice(0, 10) <= todayStr;
      });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
};

export const getBlogPosts = unstable_cache(fetchBlogPosts, ["blog-posts"], {
  revalidate: REVALIDATE_TIME,
});

export const getBlogPost = unstable_cache(
  async (
    slug: string
  ): Promise<{ post: BlogPost | null; blocks: BlockObjectResponse[] }> => {
    const notion = getNotionClient();
    const databaseId =
      process.env.NOTION_DATABASE_ID || process.env.NOTION_BLOG_DATABASE_ID;

    if (!databaseId) return { post: null, blocks: [] };

    try {
      let response;
      const queryFilter = {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      };

      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          filter: queryFilter,
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          filter: queryFilter,
        });
      }

      if (response.results.length === 0) return { post: null, blocks: [] };

      const page: any = response.results[0];

      const includeHiddenForOg =
        process.env.OG_BUILD_INCLUDE_UNPUBLISHED === "true";

      // Block access to non-published posts unless OG generation explicitly opts in
      const status = getProperty(page, "Status", "status");
      if (!includeHiddenForOg && status && status !== "Published") {
        return { post: null, blocks: [] };
      }

      // Block access to future-dated posts unless OG generation explicitly opts in
      const rawDate =
        getProperty(page, "Date", "date") || page.created_time || "";
      if (!includeHiddenForOg && rawDate) {
        const now = new Date();
        const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        if (rawDate.slice(0, 10) > todayStr) return { post: null, blocks: [] };
      }

      const tags = getTags(page);
      const tagColors = getTagColorMap(page);
      const banner =
        page.properties?.Banner?.files?.[0]?.file?.url ||
        page.properties?.Banner?.files?.[0]?.external?.url ||
        page.properties?.Cover?.files?.[0]?.file?.url ||
        page.properties?.Cover?.files?.[0]?.external?.url ||
        page.cover?.external?.url ||
        page.cover?.file?.url ||
        undefined;

      const post: BlogPost = {
        id: page.id,
        slug: getProperty(page, "Slug", "rich_text") || "",
        title: getTitle(page),
        date: getProperty(page, "Date", "date") || page.created_time,
        description: getProperty(page, "Excerpt", "rich_text") || "",
        authors: getProperty(page, "Author", "people") || [],
        tags,
        tagColors,
        cover: banner,
        readingTime: 0, // placeholder, will be set after fetching blocks
      };

      const blocks = await fetchPageBlocks(page.id);
      post.readingTime = calculateReadingTime(blocks);

      return { post, blocks };
    } catch (error) {
      console.error(`Failed to fetch blog post ${slug}:`, error);
      return { post: null, blocks: [] };
    }
  },
  ["blog-post"],
  { revalidate: REVALIDATE_TIME }
);

// --- Generic Pages ---
export const fetchPages = async (): Promise<Page[]> => {
  const notion = getNotionClient();
  const databaseId = process.env.NOTION_PAGES_DATABASE_ID;
  if (!databaseId) return [];

  try {
    let response;
    const filter = {
      property: "Status",
      status: {
        equals: "Published",
      },
    };

    if (notion.dataSources) {
      response = await notion.dataSources.query({
        data_source_id: databaseId,
        filter,
      });
    } else {
      response = await notion.databases.query({
        database_id: databaseId,
        filter,
      });
    }

    return response.results
      .map((page: any) => ({
        id: page.id,
        slug: getProperty(page, "Slug", "rich_text") || "",
        title: getTitle(page),
        lastEdited: page.last_edited_time,
        cover: page.cover?.external?.url || page.cover?.file?.url || undefined,
        description: getProperty(page, "Description", "rich_text") || "",
      }))
      .filter((p: Page) => p.slug);
  } catch (e) {
    console.error("Failed to fetch pages", e);
    return [];
  }
};

export const getPages = unstable_cache(fetchPages, ["pages"], {
  revalidate: REVALIDATE_TIME,
});

export const getPage = unstable_cache(
  async (
    slug: string
  ): Promise<{ page: Page | null; blocks: BlockObjectResponse[] }> => {
    const notion = getNotionClient();
    const databaseId = process.env.NOTION_PAGES_DATABASE_ID;

    if (!databaseId) return { page: null, blocks: [] };

    try {
      let response;
      const filter = {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      };

      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          filter,
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          filter,
        });
      }

      if (response.results.length === 0) return { page: null, blocks: [] };

      const pageData: any = response.results[0];

      // Block access to non-published pages
      const pageStatus = getProperty(pageData, "Status", "status");
      if (pageStatus && pageStatus !== "Published")
        return { page: null, blocks: [] };
      const page: Page = {
        id: pageData.id,
        slug: getProperty(pageData, "Slug", "rich_text") || "",
        title: getTitle(pageData),
        lastEdited: pageData.last_edited_time,
        cover:
          pageData.cover?.external?.url ||
          pageData.cover?.file?.url ||
          undefined,
        description: getProperty(pageData, "Description", "rich_text") || "",
      };

      const blocks = await fetchPageBlocks(pageData.id);
      return { page, blocks };
    } catch (e) {
      console.error(`Failed to fetch page ${slug}`, e);
      return { page: null, blocks: [] };
    }
  },
  ["page"],
  { revalidate: REVALIDATE_TIME }
);

// --- Projects ---
export const fetchProjects = async (): Promise<Project[]> => {
  const notion = getNotionClient();
  const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID;

  if (!databaseId) return [];

  try {
    let response;
    const sorts = [
      {
        property: "Year",
        direction: "descending" as const,
      },
    ];

    if (notion.dataSources) {
      response = await notion.dataSources.query({
        data_source_id: databaseId,
        sorts,
      });
    } else {
      response = await notion.databases.query({
        database_id: databaseId,
        sorts,
      });
    }

    return response.results
      .map((page: any) => ({
        id: page.id,
        slug: getProperty(page, "Slug", "rich_text") || "",
        title: getTitle(page),
        description: getProperty(page, "Description", "rich_text") || "",
        url: getProperty(page, "Link", "url") || "",
        github: getProperty(page, "GitHub", "url") || "",
        techStack: getProperty(page, "Tech Stack", "multi_select") || [],
        badges: getProperty(page, "Badges", "multi_select_colored") || [],
        status: getProperty(page, "Status", "status") || "",
        year: getProperty(page, "Year", "rich_text") || "",
        logo:
          page.properties?.Logo?.files?.[0]?.file?.url ||
          page.properties?.Logo?.files?.[0]?.external?.url ||
          undefined,
        cover:
          page.properties?.Banner?.files?.[0]?.file?.url ||
          page.properties?.Banner?.files?.[0]?.external?.url ||
          page.properties?.Image?.files?.[0]?.file?.url ||
          page.properties?.Image?.files?.[0]?.external?.url ||
          page.cover?.external?.url ||
          page.cover?.file?.url ||
          undefined,
        screenshots:
          page.properties?.Screenshots?.files?.map(
            (file: any) => file.file?.url || file.external?.url
          ) || [],
      }))
      .filter((p: Project) => p.title);
  } catch (e) {
    console.error("Failed to fetch projects", e);
    return [];
  }
};

export const getProjects = unstable_cache(fetchProjects, ["projects"], {
  revalidate: REVALIDATE_TIME,
});

export const getProject = unstable_cache(
  async (
    slug: string
  ): Promise<{ project: Project | null; blocks: BlockObjectResponse[] }> => {
    const notion = getNotionClient();
    const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID;

    if (!databaseId) return { project: null, blocks: [] };

    try {
      let response;
      const filter = {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      };

      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          filter,
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          filter,
        });
      }

      if (response.results.length === 0) return { project: null, blocks: [] };

      const page: any = response.results[0];

      const project: Project = {
        id: page.id,
        slug: getProperty(page, "Slug", "rich_text") || "",
        title: getTitle(page),
        description: getProperty(page, "Description", "rich_text") || "",
        url: getProperty(page, "Link", "url") || "",
        github: getProperty(page, "GitHub", "url") || "",
        techStack: getProperty(page, "Tech Stack", "multi_select") || [],
        badges: getProperty(page, "Badges", "multi_select_colored") || [],
        status: getProperty(page, "Status", "status") || "",
        year: getProperty(page, "Year", "rich_text") || "",
        logo:
          page.properties?.Logo?.files?.[0]?.file?.url ||
          page.properties?.Logo?.files?.[0]?.external?.url ||
          undefined,
        cover:
          page.properties?.Banner?.files?.[0]?.file?.url ||
          page.properties?.Banner?.files?.[0]?.external?.url ||
          page.properties?.Image?.files?.[0]?.file?.url ||
          page.properties?.Image?.files?.[0]?.external?.url ||
          page.cover?.external?.url ||
          page.cover?.file?.url ||
          undefined,
        screenshots:
          page.properties?.Screenshots?.files?.map(
            (file: any) => file.file?.url || file.external?.url
          ) || [],
      };

      const blocks = await fetchPageBlocks(page.id);

      return { project, blocks };
    } catch (e) {
      console.error(`Failed to fetch project ${slug}`, e);
      return { project: null, blocks: [] };
    }
  },
  ["project"],
  { revalidate: REVALIDATE_TIME }
);
