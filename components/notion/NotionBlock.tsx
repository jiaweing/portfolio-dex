"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import { Frame } from "@/components/ui/frame";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSpeechHighlight } from "./SpeechHighlightContext";

interface HighlightTracker {
  currentOffset: number;
}

function renderRichText(
  richText: any[],
  tracker: HighlightTracker,
  highlightIndex: number
): React.ReactNode {
  return richText.map((t, i) => {
    const { bold, italic, strikethrough, underline, code } =
      t.annotations || {};
    const plainText = t.plain_text;
    const startIndex = tracker.currentOffset;
    const endIndex = startIndex + plainText.length;
    tracker.currentOffset = endIndex;

    let content: React.ReactNode;

    // Check if we need to highlight within this text segment
    if (
      highlightIndex >= startIndex &&
      highlightIndex < endIndex &&
      highlightIndex >= 0
    ) {
      // Find word boundaries around the highlight position
      const localIndex = highlightIndex - startIndex;
      const beforeHighlight = plainText.slice(0, localIndex);
      const remaining = plainText.slice(localIndex);

      // Find start of current word
      const wordStartInRemaining = remaining.search(/\S/);
      if (wordStartInRemaining === -1) {
        content = plainText;
      } else {
        const wordStart = localIndex + wordStartInRemaining;
        const wordEndMatch = plainText.slice(wordStart).match(/^(\S+)/);
        const wordEnd = wordStart + (wordEndMatch ? wordEndMatch[1].length : 0);

        content = (
          <>
            {plainText.slice(0, wordStart)}
            <mark className="animate-pulse rounded bg-primary/20 px-0.5 text-foreground">
              {plainText.slice(wordStart, wordEnd)}
            </mark>
            {plainText.slice(wordEnd)}
          </>
        );
      }
    } else {
      content = plainText;
    }

    if (code)
      content = (
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
          {content}
        </code>
      );
    if (bold) content = <strong>{content}</strong>;
    if (italic) content = <em>{content}</em>;
    if (strikethrough) content = <s>{content}</s>;
    if (underline && !t.href) content = <u>{content}</u>;

    if (t.href) {
      content = (
        <a
          className="underline underline-offset-2 transition-opacity hover:opacity-70"
          href={t.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {content}
        </a>
      );
    }

    return <React.Fragment key={i}>{content}</React.Fragment>;
  });
}

function useBlockCharOffset(
  blocks: BlockObjectResponse[],
  targetBlockId: string
): number {
  return React.useMemo(() => {
    let offset = 0;
    for (const block of blocks) {
      if (block.id === targetBlockId) break;
      offset += getBlockTextLength(block);
    }
    return offset;
  }, [blocks, targetBlockId]);
}

function getBlockTextLength(block: BlockObjectResponse): number {
  switch (block.type) {
    case "paragraph":
      return (
        block.paragraph.rich_text.reduce(
          (sum, t) => sum + t.plain_text.length,
          0
        ) + 2
      );
    case "heading_1":
      return (
        block.heading_1.rich_text.reduce(
          (sum, t) => sum + t.plain_text.length,
          0
        ) + 2
      );
    case "heading_2":
      return (
        block.heading_2.rich_text.reduce(
          (sum, t) => sum + t.plain_text.length,
          0
        ) + 2
      );
    case "heading_3":
      return (
        block.heading_3.rich_text.reduce(
          (sum, t) => sum + t.plain_text.length,
          0
        ) + 2
      );
    case "bulleted_list_item":
      return (
        2 +
        block.bulleted_list_item.rich_text.reduce(
          (sum, t) => sum + t.plain_text.length,
          0
        ) +
        1
      ); // +2 for "- ", +1 for "\n"
    case "numbered_list_item":
      return (
        block.numbered_list_item.rich_text.reduce(
          (sum, t) => sum + t.plain_text.length,
          0
        ) + 1
      ); // +1 for "\n"
    case "quote":
      return (
        2 +
        block.quote.rich_text.reduce((sum, t) => sum + t.plain_text.length, 0) +
        2
      ); // +2 for quotes
    case "callout":
      return (
        block.callout.rich_text.reduce(
          (sum, t) => sum + t.plain_text.length,
          0
        ) + 2
      );
    case "to_do":
      return (
        4 +
        block.to_do.rich_text.reduce((sum, t) => sum + t.plain_text.length, 0) +
        1
      ); // +4 for "[ ] ", +1 for "\n"
    case "code":
      return 0; // code blocks are skipped in extractTextFromBlocks
    case "table": {
      // Calculate text length for table cells
      const rows: any[] = (block as any).children || [];
      let tableLength = 0;
      for (const row of rows) {
        if (row.type === "table_row") {
          const cells = row.table_row.cells as any[][];
          const cellsTextLength = cells.reduce(
            (sum, cell) =>
              sum +
              cell.reduce((s: number, t: any) => s + t.plain_text.length, 0),
            0
          );
          const separatorLength = Math.max(0, cells.length - 1) * 3; // " | " between cells only
          tableLength += cellsTextLength + separatorLength + 1; // +1 for "\n"
        }
      }
      return tableLength + 1; // +1 for extra "\n" after all rows
    }
    case "column_list": {
      const columns: any[] = (block as any).children || [];
      let columnLength = 0;
      for (const col of columns) {
        const children: any[] = (col as any).children || [];
        for (const child of children) {
          columnLength += getBlockTextLength(child);
        }
      }
      return columnLength;
    }
    default:
      return 0;
  }
}

const CALLOUT_COLORS: Record<string, { frame: string; panel: string }> = {
  gray_background: {
    frame: "bg-gray-200/80 dark:bg-gray-700/40",
    panel: "bg-gray-50 dark:bg-gray-800/60",
  },
  brown_background: {
    frame: "bg-stone-200/80 dark:bg-stone-800/40",
    panel: "bg-stone-50 dark:bg-stone-900/60",
  },
  orange_background: {
    frame: "bg-orange-200/80 dark:bg-orange-900/40",
    panel: "bg-orange-50 dark:bg-orange-950/60",
  },
  yellow_background: {
    frame: "bg-yellow-200/80 dark:bg-yellow-900/40",
    panel: "bg-yellow-50 dark:bg-yellow-950/60",
  },
  green_background: {
    frame: "bg-green-200/80 dark:bg-green-900/40",
    panel: "bg-green-50 dark:bg-green-950/60",
  },
  blue_background: {
    frame: "bg-blue-200/80 dark:bg-blue-900/40",
    panel: "bg-blue-50 dark:bg-blue-950/60",
  },
  purple_background: {
    frame: "bg-purple-200/80 dark:bg-purple-900/40",
    panel: "bg-purple-50 dark:bg-purple-950/60",
  },
  pink_background: {
    frame: "bg-pink-200/80 dark:bg-pink-900/40",
    panel: "bg-pink-50 dark:bg-pink-950/60",
  },
  red_background: {
    frame: "bg-red-200/80 dark:bg-red-900/40",
    panel: "bg-red-50 dark:bg-red-950/60",
  },
};

export function NotionBlock({
  block,
  allBlocks,
}: {
  block: BlockObjectResponse;
  allBlocks?: BlockObjectResponse[];
}) {
  const { currentCharIndex, isSpeaking, autoScroll } = useSpeechHighlight();
  const blockOffset = allBlocks ? useBlockCharOffset(allBlocks, block.id) : 0;

  // Calculate the highlight position relative to this block
  const localHighlightIndex = isSpeaking ? currentCharIndex - blockOffset : -1;

  // Auto-scroll: scroll this block into view when it becomes the active block
  const blockLength = getBlockTextLength(block);
  const isActive =
    isSpeaking && localHighlightIndex >= 0 && localHighlightIndex < blockLength;

  React.useEffect(() => {
    if (!(isActive && autoScroll)) return;
    const el = document.querySelector(`[data-block-id="${block.id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isActive, autoScroll, block.id]);

  // Create a tracker for this block's rendering
  const tracker: HighlightTracker = { currentOffset: 0 };

  switch (block.type) {
    case "paragraph": {
      const rt = block.paragraph.rich_text;
      return (
        <p className="mb-4 text-muted-foreground leading-7">
          {renderRichText(rt, tracker, localHighlightIndex)}
        </p>
      );
    }

    case "heading_1": {
      const rt = block.heading_1.rich_text;
      return (
        <h1 className="mt-8 mb-4 font-medium text-2xl">
          {renderRichText(rt, tracker, localHighlightIndex)}
        </h1>
      );
    }

    case "heading_2": {
      const rt = block.heading_2.rich_text;
      return (
        <h2 className="mt-6 mb-3 font-medium text-xl">
          {renderRichText(rt, tracker, localHighlightIndex)}
        </h2>
      );
    }

    case "heading_3": {
      const rt = block.heading_3.rich_text;
      return (
        <h3 className="mt-4 mb-2 font-medium text-lg">
          {renderRichText(rt, tracker, localHighlightIndex)}
        </h3>
      );
    }

    case "bulleted_list_item": {
      const rt = block.bulleted_list_item.rich_text;
      tracker.currentOffset = 2; // skip "- " prefix in extracted text
      return (
        <li className="mt-2 text-muted-foreground">
          {renderRichText(rt, tracker, localHighlightIndex)}
        </li>
      );
    }

    case "numbered_list_item": {
      const rt = block.numbered_list_item.rich_text;
      return (
        <li className="mt-2 list-decimal text-muted-foreground">
          {renderRichText(rt, tracker, localHighlightIndex)}
        </li>
      );
    }

    case "quote": {
      const rt = block.quote.rich_text;
      tracker.currentOffset = 1; // skip opening `"` in extracted text
      return (
        <blockquote className="my-4 border-primary border-l-4 pl-4 italic">
          {renderRichText(rt, tracker, localHighlightIndex)}
        </blockquote>
      );
    }

    case "callout": {
      const rt = block.callout.rich_text;
      const children: any[] = (block as any).children || [];
      const calloutColor = CALLOUT_COLORS[block.callout.color] ?? {
        frame: "",
        panel: "",
      };
      return (
        <div
          className={`my-4 flex items-start gap-3 leading-relaxed ${calloutColor.panel} rounded-md p-4`}
        >
          {block.callout.icon?.type === "emoji" && (
            <span className="text-base">{block.callout.icon.emoji}</span>
          )}
          <div className="flex-1 text-muted-foreground">
            {rt.length > 0 && (
              <div>{renderRichText(rt, tracker, localHighlightIndex)}</div>
            )}
            {children.length > 0 && (
              <div className="[counter-reset:list-item] [&_li]:ml-5">
                {children.map((child: any) => (
                  <NotionBlock block={child} key={child.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    case "code": {
      const code = block.code.rich_text.map((t: any) => t.plain_text).join("");
      return (
        <pre className="my-4 overflow-x-auto rounded-md bg-muted p-4">
          <code>{code}</code>
        </pre>
      );
    }

    case "image": {
      const imageUrl =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.type === "file"
            ? block.image.file.url
            : "";
      const caption = block.image.caption?.[0]?.plain_text || "";

      if (!imageUrl) return null;

      return (
        <figure className="my-6">
          <img
            alt={caption || "Notion Image"}
            className="h-auto w-full rounded-lg"
            src={imageUrl}
          />
          {caption && (
            <figcaption className="mt-2 text-center text-muted-foreground text-sm">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "to_do": {
      const rt = block.to_do.rich_text;
      const checked = block.to_do.checked;
      tracker.currentOffset = 4; // skip "[ ] " prefix in extracted text
      return (
        <div className="my-1 flex items-center space-x-2">
          <input
            checked={checked}
            className="h-4 w-4"
            readOnly
            type="checkbox"
          />
          <span className={checked ? "text-muted-foreground line-through" : ""}>
            {renderRichText(rt, tracker, localHighlightIndex)}
          </span>
        </div>
      );
    }

    case "table": {
      const hasColumnHeader = block.table.has_column_header;
      const hasRowHeader = block.table.has_row_header;
      const rows: any[] = (block as any).children || [];

      // Create a shared tracker for the entire table to maintain character offsets
      const tableTracker: HighlightTracker = { currentOffset: 0 };

      // Pre-render all rows in document order so the tracker advances correctly:
      // cell text → " | " separator (3 chars) → next cell → ... → "\n" at row end
      const allTableRows = rows.filter((row: any) => row.type === "table_row");
      const preRendered: React.ReactNode[][] = allTableRows.map((row: any) => {
        const cells = row.table_row.cells as any[][];
        const renderedCells = cells.map((cell, cellIndex) => {
          const content = renderRichText(
            cell,
            tableTracker,
            localHighlightIndex
          );
          if (cellIndex < cells.length - 1) {
            tableTracker.currentOffset += 3; // advance past " | "
          }
          return content;
        });
        tableTracker.currentOffset += 1; // advance past "\n"
        return renderedCells;
      });

      const preRenderedHeader = hasColumnHeader ? preRendered[0] : null;
      const preRenderedBody = hasColumnHeader
        ? preRendered.slice(1)
        : preRendered;

      return (
        <Frame className="w-full overflow-hidden py-0">
          <Table className="!mt-1.5 mb-1">
            {preRenderedHeader && (
              <TableHeader>
                <TableRow>
                  {preRenderedHeader.map((cellContent, cellIndex) => (
                    <TableHead
                      className="whitespace-normal break-words"
                      key={cellIndex}
                    >
                      {cellContent}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {preRenderedBody.map((rowCells, rowIndex) => (
                <TableRow key={rowIndex}>
                  {rowCells.map((cellContent, cellIndex) => (
                    <TableCell
                      className={
                        hasRowHeader && cellIndex === 0
                          ? "whitespace-normal break-words font-medium"
                          : "whitespace-normal break-words"
                      }
                      key={cellIndex}
                    >
                      {cellContent}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Frame>
      );
    }

    case "column_list": {
      const columns: any[] = (block as any).children || [];
      return (
        <div
          className="my-4 grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((col: any) => (
            <div key={col.id}>
              {(col.children || []).map((child: any) => (
                <NotionBlock block={child} key={child.id} />
              ))}
            </div>
          ))}
        </div>
      );
    }

    case "column": {
      const children: any[] = (block as any).children || [];
      return (
        <div>
          {children.map((child: any) => (
            <NotionBlock block={child} key={child.id} />
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}
