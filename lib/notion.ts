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
  lastEdited?: string;
  description: string;
  tags: string[];
  tagColors?: Record<string, string>;
  postTags?: string[];
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
  lastEdited?: string;
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
  // Category column (renamed from Tag) — used for dot indicators
  const preferredTagProps = ["Category", "Tag", "Categories"];

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

  return [];
};

const getPostTagsFromNotion = (page: any): string[] => {
  const property = page.properties?.["Tags"];
  if (!property) return [];
  if (property.type === "multi_select" && property.multi_select?.length > 0) {
    return property.multi_select.map((option: any) => option.name as string);
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

function makeRichText(text: string) {
  return text
    ? [{ type: "text", text: { content: text }, plain_text: text }]
    : [];
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function unescapeMarkdownPunctuation(value: string): string {
  return value.replace(/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, "$1");
}

function makeRichTextSegment(
  text: string,
  options?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    href?: string;
  }
) {
  return {
    type: "text",
    text: { content: text, link: options?.href ? { url: options.href } : null },
    plain_text: text,
    href: options?.href ?? null,
    annotations: {
      bold: Boolean(options?.bold),
      italic: Boolean(options?.italic),
      strikethrough: Boolean(options?.strikethrough),
      underline: Boolean(options?.underline),
      code: Boolean(options?.code),
      color: "default",
    },
  };
}

function parseInlineRichText(text: string): any[] {
  const normalized = unescapeMarkdownPunctuation(decodeHtmlEntities(text));
  const richText: any[] = [];
  // Alternatives in priority order:
  // 1. Links [text](url) — checked before bold/italic so nested markers inside link text are handled separately
  // 2. Bold-italic ***text*** — before **bold** to avoid partial match
  // 3. **bold** and __bold__
  // 4. *italic* and _italic_
  // 5. ~~strikethrough~~, `code`, HTML tags
  const pattern =
    /(\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)|\*\*\*([^*]+)\*\*\*|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_|~~([^~]+)~~|`([^`]+)`|<u>(.*?)<\/u>|<em>(.*?)<\/em>|<strong>(.*?)<\/strong>|<code>(.*?)<\/code>|<a\s+href="((?:https?:\/\/|mailto:)[^"]+)"[^>]*>(.*?)<\/a>)/g;

  let cursor = 0;
  let match: RegExpExecArray | null;
  // biome-ignore lint/suspicious/noAssignInExpressions: iterative regex scanning
  while ((match = pattern.exec(normalized)) !== null) {
    if (match.index > cursor) {
      const plain = normalized.slice(cursor, match.index);
      if (plain) richText.push(makeRichTextSegment(plain));
    }

    if (match[2] && match[3]) {
      // [link text](url) — process nested bold/italic inside the link text
      const linkText = match[2];
      const linkUrl = match[3];
      const boldItalicInner = linkText.match(/^\*\*\*(.+)\*\*\*$/);
      const boldInner = linkText.match(/^\*\*(.+)\*\*$|^__(.+)__$/);
      const italicInner = linkText.match(/^\*(.+)\*$|^_(.+)_$/);
      if (boldItalicInner) {
        richText.push(
          makeRichTextSegment(boldItalicInner[1], {
            href: linkUrl,
            bold: true,
            italic: true,
          })
        );
      } else if (boldInner) {
        richText.push(
          makeRichTextSegment(boldInner[1] ?? boldInner[2], {
            href: linkUrl,
            bold: true,
          })
        );
      } else if (italicInner) {
        richText.push(
          makeRichTextSegment(italicInner[1] ?? italicInner[2], {
            href: linkUrl,
            italic: true,
          })
        );
      } else {
        richText.push(makeRichTextSegment(linkText, { href: linkUrl }));
      }
    } else if (match[4]) {
      // ***bold italic***
      richText.push(
        makeRichTextSegment(match[4], { bold: true, italic: true })
      );
    } else if (match[5]) {
      // **bold**
      richText.push(makeRichTextSegment(match[5], { bold: true }));
    } else if (match[6]) {
      // __bold__
      richText.push(makeRichTextSegment(match[6], { bold: true }));
    } else if (match[7]) {
      // *italic*
      richText.push(makeRichTextSegment(match[7], { italic: true }));
    } else if (match[8]) {
      // _italic_
      richText.push(makeRichTextSegment(match[8], { italic: true }));
    } else if (match[9]) {
      // ~~strikethrough~~
      richText.push(makeRichTextSegment(match[9], { strikethrough: true }));
    } else if (match[10]) {
      // `code`
      richText.push(makeRichTextSegment(match[10], { code: true }));
    } else if (match[11]) {
      // <u>underline</u>
      richText.push(makeRichTextSegment(match[11], { underline: true }));
    } else if (match[12]) {
      // <em>italic</em>
      richText.push(makeRichTextSegment(match[12], { italic: true }));
    } else if (match[13]) {
      // <strong>bold</strong>
      richText.push(makeRichTextSegment(match[13], { bold: true }));
    } else if (match[14]) {
      // <code>code</code>
      richText.push(makeRichTextSegment(match[14], { code: true }));
    } else if (match[15] && match[16]) {
      // <a href="url">text</a>
      richText.push(makeRichTextSegment(match[16], { href: match[15] }));
    }

    cursor = pattern.lastIndex;
  }

  if (cursor < normalized.length) {
    const remaining = normalized.slice(cursor);
    if (remaining) richText.push(makeRichTextSegment(remaining));
  }

  return richText.length > 0 ? richText : makeRichText(normalized);
}

function parseMarkdownTableRows(lines: string[]): string[][] | null {
  const rows: string[][] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!(trimmed.startsWith("|") && trimmed.endsWith("|"))) return null;
    const row = trimmed
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());
    rows.push(row);
  }
  return rows.length > 0 ? rows : null;
}

function parseCalloutAttributes(rawAttributes: string): {
  icon: string;
  color: string;
} {
  const iconMatch = rawAttributes.match(/icon\s*=\s*"([^"]+)"/i);
  const colorMatch = rawAttributes.match(/color\s*=\s*"([^"]+)"/i);

  const colorMap: Record<string, string> = {
    gray_bg: "gray_background",
    brown_bg: "brown_background",
    orange_bg: "orange_background",
    yellow_bg: "yellow_background",
    green_bg: "green_background",
    blue_bg: "blue_background",
    purple_bg: "purple_background",
    pink_bg: "pink_background",
    red_bg: "red_background",
  };

  const rawColor = (colorMatch?.[1] || "gray_bg").toLowerCase();

  return {
    icon: iconMatch?.[1] || "💡",
    color: colorMap[rawColor] || "gray_background",
  };
}

function normalizeMarkdownContent(markdown: string): string {
  let normalized = markdown.replace(/\r\n/g, "\n");

  // The markdown endpoint may return escaped newlines as literal "\n".
  // Decode when escaped newlines dominate (or when there are no real newlines)
  // so block parsing still works for headings/lists/callouts/tables.
  const escapedNewlineCount = (normalized.match(/\\n/g) || []).length;
  const actualNewlineCount = (normalized.match(/\n/g) || []).length;
  if (
    escapedNewlineCount > 0 &&
    (actualNewlineCount === 0 || escapedNewlineCount > actualNewlineCount)
  ) {
    normalized = normalized.replace(/\\n/g, "\n");
  }

  // Normalize custom Notion markdown block tags into predictable block boundaries.
  normalized = normalized.replace(/\s*<empty-block\s*\/>\s*/gi, "\n\n");
  normalized = normalized.replace(
    /([^\n])(\s*<callout\b)/gi,
    (_, before, tag) => `${before}\n\n${tag.trimStart()}`
  );
  normalized = normalized.replace(
    /(<\/callout>)(\s*)([^\n])/gi,
    (_, closeTag, _ws, after) => `${closeTag}\n\n${after}`
  );

  // Notion's markdown API may append <table> directly after paragraph text on the
  // same line. Ensure HTML block-level table elements always start on their own line
  // so the block parser can detect them correctly.
  normalized = normalized.replace(
    /([^\n])(\s*<table\b)/gi,
    (_, before, tag) => `${before}\n\n${tag.trimStart()}`
  );
  normalized = normalized.replace(
    /(<\/table>)(\s*)([^\n])/gi,
    (_, closeTag, _ws, after) => `${closeTag}\n\n${after}`
  );

  return normalized;
}

function markdownToBlocks(markdown: string): BlockObjectResponse[] {
  const lines = normalizeMarkdownContent(markdown).split("\n");
  const blocks: any[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (/^```/.test(trimmed)) {
      const language = trimmed.slice(3).trim() || "plain text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++;
      const codeText = codeLines.join("\n");
      blocks.push({
        object: "block",
        id: `md-code-${blocks.length}`,
        type: "code",
        has_children: false,
        code: {
          rich_text: makeRichText(codeText),
          language,
          caption: [],
        },
      });
      continue;
    }

    if (/^<callout\b/i.test(trimmed)) {
      const calloutLines = [line];
      while (
        i + 1 < lines.length &&
        !/<\/callout>\s*$/i.test(calloutLines[calloutLines.length - 1].trim())
      ) {
        i++;
        calloutLines.push(lines[i]);
      }
      if (i < lines.length) i++;

      const calloutRaw = calloutLines.join("\n").trim();
      const calloutMatch = calloutRaw.match(
        /^<callout\b([^>]*)>([\s\S]*?)<\/callout>$/i
      );

      if (calloutMatch) {
        const attrs = parseCalloutAttributes(calloutMatch[1] || "");
        const content = calloutMatch[2].trim();
        blocks.push({
          object: "block",
          id: `md-callout-${blocks.length}`,
          type: "callout",
          has_children: false,
          callout: {
            rich_text: parseInlineRichText(content),
            icon: { type: "emoji", emoji: attrs.icon },
            color: attrs.color,
            children: [],
          },
        });
      }
      continue;
    }

    if (/^<table\b/i.test(trimmed)) {
      const tableLines: string[] = [];
      while (i < lines.length) {
        tableLines.push(lines[i]);
        if (/<\/table>\s*$/i.test(lines[i].trim())) break;
        i++;
      }
      if (i < lines.length) i++;

      const tableRaw = tableLines.join("\n");
      const rowMatches = [
        ...tableRaw.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi),
      ];
      const parsedRows = rowMatches.map((rowMatch) =>
        [...rowMatch[1].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(
          (cellMatch) => cellMatch[1].trim()
        )
      );
      const tableRows = parsedRows.filter((r) => r.length > 0);

      if (tableRows.length > 0) {
        blocks.push({
          object: "block",
          id: `md-table-${blocks.length}`,
          type: "table",
          has_children: true,
          table: {
            table_width: tableRows[0].length,
            has_column_header: true,
            has_row_header: false,
            children: [],
          },
          children: tableRows.map((row, rowIndex) => ({
            object: "block",
            id: `md-table-row-${blocks.length}-${rowIndex}`,
            type: "table_row",
            has_children: false,
            table_row: {
              cells: row.map((cell) => parseInlineRichText(cell)),
            },
          })),
        });
      }
      continue;
    }

    if (trimmed.startsWith("|") && i + 1 < lines.length) {
      const candidate = lines.slice(i, i + 3);
      const hasSeparator = /^\|?[\s:-]+(\|[\s:-]+)+\|?$/.test(
        candidate[1]?.trim() || ""
      );
      if (hasSeparator) {
        const tableBlockLines = [candidate[0]];
        i += 2; // skip header and separator
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          tableBlockLines.push(lines[i]);
          i++;
        }
        const rows = parseMarkdownTableRows(tableBlockLines);
        if (rows?.length) {
          blocks.push({
            object: "block",
            id: `md-table-${blocks.length}`,
            type: "table",
            has_children: true,
            table: {
              table_width: rows[0].length,
              has_column_header: true,
              has_row_header: false,
              children: [],
            },
            children: rows.map((row, rowIndex) => ({
              object: "block",
              id: `md-table-row-${blocks.length}-${rowIndex}`,
              type: "table_row",
              has_children: false,
              table_row: {
                cells: row.map((cell) => parseInlineRichText(cell)),
              },
            })),
          });
          continue;
        }
      }
    }

    if (trimmed === "---") {
      blocks.push({
        object: "block",
        id: `md-divider-${blocks.length}`,
        type: "divider",
        has_children: false,
        divider: {},
      });
      i++;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const type = `heading_${level}`;
      blocks.push({
        object: "block",
        id: `md-heading-${blocks.length}`,
        type,
        has_children: false,
        [type]: {
          rich_text: parseInlineRichText(content),
          color: "default",
          is_toggleable: false,
        },
      });
      i++;
      continue;
    }

    const todoMatch = trimmed.match(/^- \[( |x|X)\]\s+(.+)$/);
    if (todoMatch) {
      blocks.push({
        object: "block",
        id: `md-todo-${blocks.length}`,
        type: "to_do",
        has_children: false,
        to_do: {
          rich_text: parseInlineRichText(todoMatch[2]),
          checked: todoMatch[1].toLowerCase() === "x",
          color: "default",
          children: [],
        },
      });
      i++;
      continue;
    }

    const numberedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numberedMatch) {
      blocks.push({
        object: "block",
        id: `md-ol-${blocks.length}`,
        type: "numbered_list_item",
        has_children: false,
        numbered_list_item: {
          rich_text: parseInlineRichText(numberedMatch[1]),
          color: "default",
          children: [],
        },
      });
      i++;
      continue;
    }

    const bulletedMatch = trimmed.match(/^- (.+)$/);
    if (bulletedMatch) {
      blocks.push({
        object: "block",
        id: `md-ul-${blocks.length}`,
        type: "bulleted_list_item",
        has_children: false,
        bulleted_list_item: {
          rich_text: parseInlineRichText(bulletedMatch[1]),
          color: "default",
          children: [],
        },
      });
      i++;
      continue;
    }

    const quoteMatch = trimmed.match(/^>\s?(.+)$/);
    if (quoteMatch) {
      blocks.push({
        object: "block",
        id: `md-quote-${blocks.length}`,
        type: "quote",
        has_children: false,
        quote: {
          rich_text: parseInlineRichText(quoteMatch[1]),
          color: "default",
          children: [],
        },
      });
      i++;
      continue;
    }

    const paragraphLines = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,3})\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^- /.test(lines[i].trim()) &&
      !/^>\s?/.test(lines[i].trim()) &&
      !/^```/.test(lines[i].trim()) &&
      !/^<table\b/i.test(lines[i].trim()) &&
      lines[i].trim() !== "---"
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    blocks.push({
      object: "block",
      id: `md-p-${blocks.length}`,
      type: "paragraph",
      has_children: false,
      paragraph: {
        rich_text: parseInlineRichText(paragraphLines.join("\n").trim()),
        color: "default",
        children: [],
      },
    });
  }

  return blocks as BlockObjectResponse[];
}

async function fetchPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const notion = getNotionClient();
  if (!notion) return [];

  try {
    if (typeof notion.pages?.retrieveMarkdown === "function") {
      const markdownResponse: any = await notion.pages.retrieveMarkdown({
        page_id: pageId,
      });
      return markdownToBlocks(markdownResponse.markdown || "");
    }

    const response = await fetch(
      `https://api.notion.com/v1/pages/${pageId}/markdown`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2026-03-11",
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch markdown for page ${pageId}:`,
        response.status
      );
      return [];
    }

    const markdownResponse = await response.json();
    return markdownToBlocks(markdownResponse.markdown || "");
  } catch (error) {
    console.error(`Error fetching markdown for page ${pageId}:`, error);
    return [];
  }
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
          lastEdited: page.last_edited_time,
          description: getProperty(page, "Excerpt", "rich_text") || "",
          tags,
          tagColors,
          postTags: getPostTagsFromNotion(page),
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
        tags,
        tagColors,
        postTags: getPostTagsFromNotion(page),
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
        lastEdited: page.last_edited_time,
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

// --- Stack Items ---
export interface StackItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  categoryColor: string;
  platforms: { name: string; color: string }[];
  hideFavicon: boolean;
}

export const fetchStackItems = async (): Promise<StackItem[]> => {
  const notion = getNotionClient();
  const databaseId = process.env.NOTION_SETUP_DATABASE_ID;

  if (!databaseId) return [];

  try {
    const allResults: any[] = [];
    let cursor: string | undefined;

    do {
      let response: any;
      const sorts = [{ property: "Name", direction: "ascending" as const }];

      if (notion.dataSources) {
        response = await notion.dataSources.query({
          data_source_id: databaseId,
          sorts,
          start_cursor: cursor,
          page_size: 100,
        });
      } else {
        response = await notion.databases.query({
          database_id: databaseId,
          sorts,
          start_cursor: cursor,
          page_size: 100,
        });
      }

      allResults.push(...response.results);
      cursor = response.has_more ? response.next_cursor : undefined;
    } while (cursor);

    return allResults.map((page: any) => {
      const categorySelect = page.properties?.Category?.select;
      return {
        id: page.id,
        name: getTitle(page),
        description: getProperty(page, "Description", "rich_text") || "",
        url: getProperty(page, "URL", "url") || "",
        category: categorySelect?.name || "",
        categoryColor: categorySelect?.color || "default",
        platforms: getProperty(page, "Platforms", "multi_select_colored") || [],
        hideFavicon: getProperty(page, "HideFavicon", "checkbox") ?? false,
      };
    });
  } catch (e) {
    console.error("Failed to fetch stack items", e);
    return [];
  }
};

export const getStackItems = unstable_cache(fetchStackItems, ["stack-items"], {
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
