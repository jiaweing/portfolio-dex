import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { blockToPlainText } from "@/lib/notion";

function renderBlocks(blocks: BlockObjectResponse[], depth = 0): string[] {
  const lines: string[] = [];

  for (const block of blocks) {
    const children =
      "children" in block
        ? (block.children as BlockObjectResponse[] | undefined)
        : undefined;

    switch (block.type) {
      case "heading_1":
        lines.push(`# ${blockToPlainText(block)}`);
        break;
      case "heading_2":
        lines.push(`## ${blockToPlainText(block)}`);
        break;
      case "heading_3":
        lines.push(`### ${blockToPlainText(block)}`);
        break;
      case "paragraph": {
        const text = blockToPlainText(block);
        if (text) lines.push(text);
        break;
      }
      case "bulleted_list_item": {
        const text = blockToPlainText(block);
        if (text) lines.push(`${"  ".repeat(depth)}- ${text}`);
        break;
      }
      case "numbered_list_item": {
        const text = blockToPlainText(block);
        if (text) lines.push(`${"  ".repeat(depth)}1. ${text}`);
        break;
      }
      case "quote": {
        const text = blockToPlainText(block);
        if (text) lines.push(`> ${text}`);
        break;
      }
      case "code": {
        const code = blockToPlainText(block);
        const language = block.code.language || "text";
        lines.push(`\`\`\`${language}\n${code}\n\`\`\``);
        break;
      }
      case "divider":
        lines.push("---");
        break;
      default: {
        const text = blockToPlainText(block);
        if (text) lines.push(text);
      }
    }

    if (children && children.length > 0) {
      lines.push(...renderBlocks(children, depth + 1));
    }

    lines.push("");
  }

  return lines;
}

export function createBlogMarkdown(params: {
  title: string;
  description?: string;
  date: string;
  tags: string[];
  url: string;
  blocks: BlockObjectResponse[];
}): string {
  const frontmatter = [
    "---",
    `title: "${params.title.replaceAll('"', '\\"')}"`,
    `date: "${params.date}"`,
    `url: "${params.url}"`,
    params.tags.length
      ? `tags: [${params.tags.map((tag) => `"${tag.replaceAll('"', '\\"')}"`).join(", ")}]`
      : undefined,
    "---",
    "",
  ].filter(Boolean) as string[];

  const body = renderBlocks(params.blocks).join("\n").trim();
  const description = params.description ? `${params.description}\n\n` : "";

  return [...frontmatter, `# ${params.title}`, "", description, body]
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
