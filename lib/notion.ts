import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";

let notion: any = null; // Typing as any to support dataSources

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
  authors: string[];
  tags: string[];
  cover?: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content?: string;
  cover?: string;
  lastEdited: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  url?: string;
  github?: string;
  techStack: string[];
  cover?: string;
  date: string;
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

// --- Fetching Logic ---

// Transform Helper
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
    | "select"
    | "url"
    | "people" = "rich_text"
) => {
  const p = page.properties?.[prop];
  if (!p) return null;

  if (type === "title") return getRichText(p.title);
  if (type === "rich_text") return getRichText(p.rich_text);
  if (type === "date") return p.date?.start || "";
  if (type === "multi_select")
    return p.multi_select?.map((o: any) => o.name) || [];
  if (type === "select") return p.select?.name || "";
  if (type === "url") return p.url || "";
  if (type === "people")
    return p.people?.map((person: any) => person.name).filter(Boolean) || [];

  return "";
};

export const getBlogPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    const notion = getNotionClient();
    const databaseId = process.env.NOTION_BLOG_DATABASE_ID;

    if (!databaseId) return [];

    try {
      // Attempting dataSources.query based on user feedback
      let response;

      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          filter: {
            property: "Status",
            status: {
              equals: "Published",
            },
          },
          sorts: [
            {
              property: "Date",
              direction: "descending",
            },
          ],
        });
      } else {
        // Fallback for standard client
        response = await notion.databases.query({
          database_id: databaseId,
          filter: {
            property: "Status",
            status: {
              equals: "Published",
            },
          },
          sorts: [
            {
              property: "Date",
              direction: "descending",
            },
          ],
        });
      }

      return response.results
        .map((page: any) => {
          // robust title extraction
          const title =
            getProperty(page, "Name", "title") ||
            getProperty(page, "Page", "title") ||
            getProperty(page, "Title", "title") ||
            "Untitled";

          const tags = getProperty(page, "Tag", "select")
            ? [getProperty(page, "Tag", "select")]
            : getProperty(page, "Tags", "multi_select") || [];

          const banner =
            page.properties?.Banner?.files?.[0]?.file?.url ||
            page.properties?.Banner?.files?.[0]?.external?.url ||
            page.cover?.external?.url ||
            page.cover?.file?.url ||
            undefined;

          return {
            id: page.id,
            slug: getProperty(page, "Slug", "rich_text") || "",
            title: title,
            date: getProperty(page, "Date", "date") || page.created_time,
            description: getProperty(page, "Description", "rich_text") || "",
            authors: getProperty(page, "Authors", "people") || [],
            tags: tags,
            cover: banner,
          } as BlogPost;
        })
        .filter((post: BlogPost) => post.slug);
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
      return [];
    }
  },
  ["blog-posts"],
  { revalidate: 3600 }
);

export const getBlogPost = unstable_cache(
  async (
    slug: string
  ): Promise<{ post: BlogPost | null; blocks: BlockObjectResponse[] }> => {
    const notion = getNotionClient();
    const databaseId = process.env.NOTION_BLOG_DATABASE_ID;

    if (!databaseId) return { post: null, blocks: [] };

    try {
      let response;
      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          filter: {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          filter: {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
        });
      }

      if (response.results.length === 0) return { post: null, blocks: [] };

      const page: any = response.results[0];

      // robust title extraction
      const title =
        getProperty(page, "Name", "title") ||
        getProperty(page, "Page", "title") ||
        getProperty(page, "Title", "title") ||
        "Untitled";

      const tags = getProperty(page, "Tag", "select")
        ? [getProperty(page, "Tag", "select")]
        : getProperty(page, "Tags", "multi_select") || [];

      const banner =
        page.properties?.Banner?.files?.[0]?.file?.url ||
        page.properties?.Banner?.files?.[0]?.external?.url ||
        page.cover?.external?.url ||
        page.cover?.file?.url ||
        undefined;

      const post: BlogPost = {
        id: page.id,
        slug: getProperty(page, "Slug", "rich_text") || "",
        title: title,
        date: getProperty(page, "Date", "date") || page.created_time,
        description: getProperty(page, "Description", "rich_text") || "",
        authors: getProperty(page, "Authors", "people") || [],
        tags: tags,
        cover: banner,
      };

      const blocks = await notion.blocks.children.list({
        block_id: page.id,
      });

      return { post, blocks: blocks.results as BlockObjectResponse[] };
    } catch (error) {
      console.error(`Failed to fetch blog post ${slug}:`, error);
      return { post: null, blocks: [] };
    }
  },
  ["blog-post"],
  { revalidate: 3600 }
);

export const getPages = unstable_cache(
  async (): Promise<Page[]> => {
    const notion = getNotionClient();
    const databaseId = process.env.NOTION_PAGES_DATABASE_ID;
    if (!databaseId) return [];

    try {
      let response;
      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          filter: {
            property: "Status",
            status: {
              equals: "Published",
            },
          },
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          filter: {
            property: "Status",
            status: {
              equals: "Published",
            },
          },
        });
      }

      return response.results
        .map((page: any) => ({
          id: page.id,
          slug: getProperty(page, "Slug", "rich_text") || "",
          title: getProperty(page, "Name", "title") || "Untitled",
          lastEdited: page.last_edited_time,
          cover:
            page.cover?.external?.url || page.cover?.file?.url || undefined,
        }))
        .filter((p: Page) => p.slug);
    } catch (e) {
      console.error("Failed to fetch pages", e);
      return [];
    }
  },
  ["pages"],
  { revalidate: 3600 }
);

export const getPage = unstable_cache(
  async (
    slug: string
  ): Promise<{ page: Page | null; blocks: BlockObjectResponse[] }> => {
    const notion = getNotionClient();
    const databaseId = process.env.NOTION_PAGES_DATABASE_ID;

    if (!databaseId) return { page: null, blocks: [] };

    try {
      let response;
      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          filter: {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          filter: {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
        });
      }

      if (response.results.length === 0) return { page: null, blocks: [] };

      const pageData: any = response.results[0];
      const page: Page = {
        id: pageData.id,
        slug: getProperty(pageData, "Slug", "rich_text") || "",
        title: getProperty(pageData, "Name", "title") || "Untitled",
        lastEdited: pageData.last_edited_time,
        cover:
          pageData.cover?.external?.url ||
          pageData.cover?.file?.url ||
          undefined,
      };

      const blocks = await notion.blocks.children.list({
        block_id: pageData.id,
      });
      return { page, blocks: blocks.results as BlockObjectResponse[] };
    } catch (e) {
      console.error(`Failed to fetch page ${slug}`, e);
      return { page: null, blocks: [] };
    }
  },
  ["page"],
  { revalidate: 3600 }
);

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const notion = getNotionClient();
    const databaseId = process.env.NOTION_PROJECTS_DATABASE_ID;

    if (!databaseId) return [];

    try {
      let response;
      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          sorts: [
            {
              property: "Date",
              direction: "descending",
            },
          ],
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          sorts: [
            {
              property: "Date",
              direction: "descending",
            },
          ],
        });
      }

      return response.results
        .map((page: any) => ({
          id: page.id,
          slug: getProperty(page, "Slug", "rich_text") || "",
          title: getProperty(page, "Name", "title") || "Untitled",
          description: getProperty(page, "Description", "rich_text") || "",
          url: getProperty(page, "URL", "url") || "",
          github: getProperty(page, "GitHub", "url") || "",
          techStack: getProperty(page, "Tech Stack", "multi_select") || [],
          date: getProperty(page, "Date", "date") || page.created_time,
          cover:
            page.cover?.external?.url || page.cover?.file?.url || undefined,
        }))
        .filter((p: Project) => p.title);
    } catch (e) {
      console.error("Failed to fetch projects", e);
      return [];
    }
  },
  ["projects"],
  { revalidate: 3600 }
);
