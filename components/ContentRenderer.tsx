"use client";

import { ContentBlock } from "@/components/content/ContentBlock";
import {
  SpeechHighlightProvider,
  useSpeechHighlight,
} from "@/components/content/SpeechHighlightContext";
import type { Block } from "@/lib/blocks";

interface ContentRendererProps {
  blocks: Block[];
  highlightedCodeMap?: Record<string, string>;
}

type BlockGroup =
  | { type: "numbered_list"; blocks: Block[] }
  | { type: "bulleted_list"; blocks: Block[] }
  | { type: "single"; blocks: [Block] };

function groupBlocks(blocks: Block[]): BlockGroup[] {
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

function ContentRendererInner({
  blocks,
  highlightedCodeMap,
}: ContentRendererProps) {
  const groups = groupBlocks(blocks);
  return (
    <div className="prose dark:prose-invert max-w-none">
      {groups.map((group, i) => {
        if (group.type === "numbered_list") {
          return (
            <ol className="my-4 ml-1 list-decimal space-y-1" key={i}>
              {group.blocks.map((block) => (
                <div data-block-id={block.id} key={block.id}>
                  <ContentBlock
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
                  <ContentBlock
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
            <ContentBlock
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

export function ContentRenderer({
  blocks,
  highlightedCodeMap,
}: ContentRendererProps) {
  return (
    <ContentRendererInner
      blocks={blocks}
      highlightedCodeMap={highlightedCodeMap}
    />
  );
}

// Export the provider so BlogTextToSpeech can wrap everything
export { SpeechHighlightProvider, useSpeechHighlight };
