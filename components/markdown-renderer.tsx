"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionBlock } from "@/components/notion/NotionBlock";

interface NotionRendererProps {
  blocks: BlockObjectResponse[];
  highlightedCodeMap?: Record<string, string>;
}

export function NotionRenderer({
  blocks,
  highlightedCodeMap,
}: NotionRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      {blocks.map((block) => (
        <div key={block.id}>
          <NotionBlock block={block} highlightedCodeMap={highlightedCodeMap} />
        </div>
      ))}
    </div>
  );
}
