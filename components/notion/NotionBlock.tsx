"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import React from "react";

function renderRichText(richText: any[]): React.ReactNode {
  return richText.map((t, i) => {
    const { bold, italic, strikethrough, underline, code } =
      t.annotations || {};
    let content: React.ReactNode = t.plain_text;

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

export function NotionBlock({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case "paragraph": {
      const rt = block.paragraph.rich_text;
      return (
        <p className="mb-4 text-muted-foreground leading-7">
          {renderRichText(rt)}
        </p>
      );
    }

    case "heading_1": {
      const rt = block.heading_1.rich_text;
      return (
        <h1 className="mt-8 mb-4 font-medium text-2xl">{renderRichText(rt)}</h1>
      );
    }

    case "heading_2": {
      const rt = block.heading_2.rich_text;
      return (
        <h2 className="mt-6 mb-3 font-medium text-xl">{renderRichText(rt)}</h2>
      );
    }

    case "heading_3": {
      const rt = block.heading_3.rich_text;
      return (
        <h3 className="mt-4 mb-2 font-medium text-lg">{renderRichText(rt)}</h3>
      );
    }

    case "bulleted_list_item": {
      const rt = block.bulleted_list_item.rich_text;
      return (
        <li className="mt-2 ml-6 list-disc text-muted-foreground">
          {renderRichText(rt)}
        </li>
      );
    }

    case "numbered_list_item": {
      const rt = block.numbered_list_item.rich_text;
      return (
        <li className="mt-2 ml-4 list-decimal text-muted-foreground">
          {renderRichText(rt)}
        </li>
      );
    }

    case "quote": {
      const rt = block.quote.rich_text;
      return (
        <blockquote className="my-4 border-primary border-l-4 pl-4 italic">
          {renderRichText(rt)}
        </blockquote>
      );
    }

    case "callout": {
      const rt = block.callout.rich_text;
      return (
        <div className="my-4 flex items-start rounded-md border bg-muted/50 p-4">
          {block.callout.icon?.type === "emoji" && (
            <span className="mr-3 text-xl">{block.callout.icon.emoji}</span>
          )}
          <div>{renderRichText(rt)}</div>
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
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              alt={caption || "Notion Image"}
              className="object-cover"
              fill
              src={imageUrl}
            />
          </div>
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
      return (
        <div className="my-1 flex items-center space-x-2">
          <input
            checked={checked}
            className="h-4 w-4"
            readOnly
            type="checkbox"
          />
          <span className={checked ? "text-muted-foreground line-through" : ""}>
            {renderRichText(rt)}
          </span>
        </div>
      );
    }

    case "table": {
      const hasColumnHeader = block.table.has_column_header;
      const hasRowHeader = block.table.has_row_header;
      const rows: any[] = (block as any).children || [];

      const headerRow = hasColumnHeader ? rows[0] : null;
      const bodyRows = hasColumnHeader ? rows.slice(1) : rows;

      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            {headerRow && (
              <thead>
                <tr>
                  {headerRow.table_row.cells.map(
                    (cell: any[], cellIndex: number) => (
                      <th
                        className="border border-border bg-muted px-3 py-2 text-left font-medium"
                        key={cellIndex}
                      >
                        {renderRichText(cell)}
                      </th>
                    )
                  )}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row: any, rowIndex: number) => (
                <tr
                  className={rowIndex % 2 !== 0 ? "bg-muted/30" : ""}
                  key={rowIndex}
                >
                  {row.table_row.cells.map((cell: any[], cellIndex: number) => (
                    <td
                      className={`border border-border px-3 py-2${hasRowHeader && cellIndex === 0 ? "bg-muted font-medium" : ""}`}
                      key={cellIndex}
                    >
                      {renderRichText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    default:
      return null;
  }
}
