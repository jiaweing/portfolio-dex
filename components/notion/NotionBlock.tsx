"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";

export function NotionBlock({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case "paragraph": {
      const text = block.paragraph.rich_text
        .map((t: any) => t.plain_text)
        .join("");
      return <p className="mb-4 text-muted-foreground leading-7">{text}</p>;
    }

    case "heading_1": {
      const h1 = block.heading_1.rich_text
        .map((t: any) => t.plain_text)
        .join("");
      return <h1 className="mt-8 mb-4 font-medium text-2xl">{h1}</h1>;
    }

    case "heading_2": {
      const h2 = block.heading_2.rich_text
        .map((t: any) => t.plain_text)
        .join("");
      return <h2 className="mt-6 mb-3 font-medium text-xl">{h2}</h2>;
    }

    case "heading_3": {
      const h3 = block.heading_3.rich_text
        .map((t: any) => t.plain_text)
        .join("");
      return <h3 className="mt-4 mb-2 font-medium text-lg">{h3}</h3>;
    }

    case "bulleted_list_item": {
      const bullet = block.bulleted_list_item.rich_text
        .map((t: any) => t.plain_text)
        .join("");
      return (
        <li className="mt-2 ml-6 list-disc text-muted-foreground">{bullet}</li>
      );
    }

    case "numbered_list_item": {
      const number = block.numbered_list_item.rich_text
        .map((t: any) => t.plain_text)
        .join("");
      return (
        <li className="mt-2 ml-4 list-decimal text-muted-foreground">
          {number}
        </li>
      );
    }

    case "quote": {
      const quote = block.quote.rich_text
        .map((t: any) => t.plain_text)
        .join("");
      return (
        <blockquote className="my-4 border-primary border-l-4 pl-4 italic">
          {quote}
        </blockquote>
      );
    }

    case "callout": {
      const calloutC = block.callout.rich_text
        .map((t: any) => t.plain_text)
        .join("");
      return (
        <div className="my-4 flex items-start rounded-md border bg-muted/50 p-4">
          {block.callout.icon?.type === "emoji" && (
            <span className="mr-3 text-xl">{block.callout.icon.emoji}</span>
          )}
          <div>{calloutC}</div>
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
      const todo = block.to_do.rich_text.map((t: any) => t.plain_text).join("");
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
            {todo}
          </span>
        </div>
      );
    }

    default:
      return null;
  }
}
