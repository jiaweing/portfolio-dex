// Content types and the markdown to block parser used by the renderer.
// Blocks keep the shape the renderer, text to speech and table of contents
// are built around.

export type RichText = {
  type?: string;
  plain_text: string;
  href?: string | null;
  text?: { content: string; link?: { url: string } | null };
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
};

type BlockBase = {
  object?: "block";
  id: string;
  has_children?: boolean;
  children?: Block[];
};

type TextPayload = {
  rich_text: RichText[];
  color?: string;
  is_toggleable?: boolean;
  children?: Block[];
};

type TextBlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "quote";

type TextBlock = {
  [T in TextBlockType]: BlockBase & { type: T } & Record<T, TextPayload>;
}[TextBlockType];

type ImageSource =
  | { type: "external"; external: { url: string } }
  | { type: "file"; file: { url: string } };

export type Block =
  | TextBlock
  | (BlockBase & {
      type: "to_do";
      to_do: TextPayload & { checked: boolean };
    })
  | (BlockBase & {
      type: "callout";
      callout: TextPayload & {
        icon?: { type: "emoji"; emoji: string };
      };
    })
  | (BlockBase & {
      type: "code";
      code: { rich_text: RichText[]; language: string; caption: RichText[] };
    })
  | (BlockBase & { type: "divider"; divider: Record<string, never> })
  | (BlockBase & {
      type: "table";
      table: {
        table_width: number;
        has_column_header: boolean;
        has_row_header: boolean;
      };
    })
  | (BlockBase & { type: "table_row"; table_row: { cells: RichText[][] } })
  | (BlockBase & {
      type: "image";
      image: ImageSource & { caption?: RichText[] };
    })
  | (BlockBase & { type: "column_list" | "column" });

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
  blocks: Block[],
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
export function calculateReadingTime(blocks: Block[]): number {
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

  // Normalize custom block tags (callouts, tables) into predictable block boundaries.
  normalized = normalized.replace(/\s*<empty-block\s*\/>\s*/gi, "\n\n");
  normalized = normalized.replace(
    /([^\n])(\s*<callout\b)/gi,
    (_, before, tag) => `${before}\n\n${tag.trimStart()}`
  );
  normalized = normalized.replace(
    /(<\/callout>)(\s*)([^\n])/gi,
    (_, closeTag, _ws, after) => `${closeTag}\n\n${after}`
  );

  // Content may have <table> directly after paragraph text on the
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

export function markdownToBlocks(markdown: string): Block[] {
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

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)\s]*)\)$/);
    if (imageMatch) {
      const [, alt, url] = imageMatch;
      if (url) {
        blocks.push({
          object: "block",
          id: `md-image-${blocks.length}`,
          type: "image",
          has_children: false,
          image: {
            type: "external",
            external: { url },
            caption: alt ? makeRichText(alt) : [],
          },
        });
      }
      i++;
      continue;
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
      !/^!\[[^\]]*\]\([^)\s]*\)$/.test(lines[i].trim()) &&
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

  return blocks as Block[];
}
