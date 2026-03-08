"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionBlock } from "@/components/notion/NotionBlock";
import {
  SpeechHighlightProvider,
  useSpeechHighlight,
} from "@/components/notion/SpeechHighlightContext";

interface NotionRendererProps {
  blocks: BlockObjectResponse[];
  highlightedCodeMap?: Record<string, string>;
}

type BlockGroup =
  | { type: "numbered_list"; blocks: BlockObjectResponse[] }
  | { type: "bulleted_list"; blocks: BlockObjectResponse[] }
  | { type: "single"; blocks: [BlockObjectResponse] };

function groupBlocks(blocks: BlockObjectResponse[]): BlockGroup[] {
  const groups: BlockGroup[] = [];
  for (const block of blocks) {
    const last = groups[groups.length - 1];
    if (block.type === "numbered_list_item") {
      if (last?.type === "numbered_list") {
        last.blocks.push(block);
      } else {
        groups.push({ type: "numbered_list", blocks: [block] });
      }
    } else if (block.type === "bulleted_list_item") {
      if (last?.type === "bulleted_list") {
        last.blocks.push(block);
      } else {
        groups.push({ type: "bulleted_list", blocks: [block] });
      }
    } else {
      groups.push({ type: "single", blocks: [block] });
    }
  }
  return groups;
}

function NotionRendererInner({
  blocks,
  highlightedCodeMap,
}: NotionRendererProps) {
  const groups = groupBlocks(blocks);
  return (
    <div className="prose dark:prose-invert max-w-none">
      {groups.map((group, i) => {
        if (group.type === "numbered_list") {
          return (
            <ol className="my-4 ml-1 list-decimal space-y-1" key={i}>
              {group.blocks.map((block) => (
                <div data-block-id={block.id} key={block.id}>
                  <NotionBlock
                    allBlocks={blocks}
                    block={block}
                    highlightedCodeMap={highlightedCodeMap}
                  />
                </div>
              ))}
            </ol>
          );
        }
        if (group.type === "bulleted_list") {
          return (
            <ul className="my-4 ml-1 list-disc space-y-1" key={i}>
              {group.blocks.map((block) => (
                <div data-block-id={block.id} key={block.id}>
                  <NotionBlock
                    allBlocks={blocks}
                    block={block}
                    highlightedCodeMap={highlightedCodeMap}
                  />
                </div>
              ))}
            </ul>
          );
        }
        const block = group.blocks[0];
        return (
          <div data-block-id={block.id} key={block.id}>
            <NotionBlock
              allBlocks={blocks}
              block={block}
              highlightedCodeMap={highlightedCodeMap}
            />
          </div>
        );
      })}
    </div>
  );
}

export function NotionRenderer({
  blocks,
  highlightedCodeMap,
}: NotionRendererProps) {
  return (
    <NotionRendererInner
      blocks={blocks}
      highlightedCodeMap={highlightedCodeMap}
    />
  );
}

// Export the provider so BlogTextToSpeech can wrap everything
export { SpeechHighlightProvider, useSpeechHighlight };
