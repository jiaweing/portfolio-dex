"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionBlock } from "@/components/notion/NotionBlock";
import {
  SpeechHighlightProvider,
  useSpeechHighlight,
} from "@/components/notion/SpeechHighlightContext";

interface NotionRendererProps {
  blocks: BlockObjectResponse[];
}

function NotionRendererInner({ blocks }: NotionRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      {blocks.map((block) => (
        <div data-block-id={block.id} key={block.id}>
          <NotionBlock allBlocks={blocks} block={block} />
        </div>
      ))}
    </div>
  );
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  // This component wraps the inner renderer with the highlight context
  // The actual highlight state comes from BlogTextToSpeech via context
  return <NotionRendererInner blocks={blocks} />;
}

// Export the provider so BlogTextToSpeech can wrap everything
export { SpeechHighlightProvider, useSpeechHighlight };
