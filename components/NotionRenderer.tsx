"use client";

import { NotionBlock } from "@/components/notion/NotionBlock";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface NotionRendererProps {
  blocks: BlockObjectResponse[];
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      {blocks.map((block) => (
        <div key={block.id}>
          <NotionBlock block={block} />
        </div>
      ))}
    </div>
  );
}
