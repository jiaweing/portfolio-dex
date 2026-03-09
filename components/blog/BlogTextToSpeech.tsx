"use client";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import * as React from "react";
import { SpeechHighlightProvider } from "@/components/notion/SpeechHighlightContext";
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis";
import { TextToSpeechControls } from "./TextToSpeechControls";

interface BlogTextToSpeechProps {
  blocks: BlockObjectResponse[];
  children: React.ReactNode;
}

function extractTextFromBlocks(blocks: BlockObjectResponse[]): string {
  let text = "";

  for (const block of blocks) {
    // Stop reading at the References section (and anything after it)
    if (
      block.type === "heading_1" ||
      block.type === "heading_2" ||
      block.type === "heading_3"
    ) {
      const headingText = (block as any)[block.type].rich_text
        .map((t: any) => t.plain_text)
        .join("")
        .trim()
        .toLowerCase();
      if (headingText === "references") break;
    }

    switch (block.type) {
      case "paragraph": {
        const rt = block.paragraph.rich_text;
        text += rt.map((t) => t.plain_text).join("") + "\n\n";
        break;
      }
      case "heading_1": {
        const rt = block.heading_1.rich_text;
        text += rt.map((t) => t.plain_text).join("") + "\n\n";
        break;
      }
      case "heading_2": {
        const rt = block.heading_2.rich_text;
        text += rt.map((t) => t.plain_text).join("") + "\n\n";
        break;
      }
      case "heading_3": {
        const rt = block.heading_3.rich_text;
        text += rt.map((t) => t.plain_text).join("") + "\n\n";
        break;
      }
      case "bulleted_list_item": {
        const rt = block.bulleted_list_item.rich_text;
        text += "- " + rt.map((t) => t.plain_text).join("") + "\n";
        break;
      }
      case "numbered_list_item": {
        const rt = block.numbered_list_item.rich_text;
        text += rt.map((t) => t.plain_text).join("") + "\n";
        break;
      }
      case "quote": {
        const rt = block.quote.rich_text;
        text += '"' + rt.map((t) => t.plain_text).join("") + '"\n\n';
        break;
      }
      case "callout": {
        const rt = block.callout.rich_text;
        text += rt.map((t) => t.plain_text).join("") + "\n\n";
        break;
      }
      case "to_do": {
        const rt = block.to_do.rich_text;
        text += "[ ] " + rt.map((t) => t.plain_text).join("") + "\n";
        break;
      }
      case "table": {
        const rows: any[] = (block as any).children || [];
        for (const row of rows) {
          if (row.type === "table_row") {
            const cells = row.table_row.cells as any[][];
            text +=
              cells
                .map((cell) => cell.map((t) => t.plain_text).join(""))
                .join(" | ") + "\n";
          }
        }
        text += "\n";
        break;
      }
      case "column_list": {
        const columns: any[] = (block as any).children || [];
        for (const col of columns) {
          const children: any[] = (col as any).children || [];
          text += extractTextFromBlocks(children);
        }
        break;
      }
      default:
        break;
    }
  }

  return text.trim();
}

export function BlogTextToSpeech({ blocks, children }: BlogTextToSpeechProps) {
  const text = extractTextFromBlocks(blocks);
  const [autoScroll, setAutoScrollState] = React.useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const saved = localStorage.getItem("tts-autoscroll");
      return saved === null ? true : saved === "true";
    } catch {
      return true;
    }
  });

  const setAutoScroll = React.useCallback((v: boolean) => {
    setAutoScrollState(v);
    try {
      localStorage.setItem("tts-autoscroll", String(v));
    } catch {}
  }, []);

  const {
    setText,
    speak,
    cancel,
    pause,
    resume,
    seek,
    speaking,
    paused,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    volume,
    setVolume,
    isSupported,
    progress,
    elapsedSeconds,
    totalSeconds,
    currentCharIndex,
  } = useSpeechSynthesis();

  React.useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  React.useEffect(() => {
    setText(text);
  }, [text, setText]);

  if (!isSupported) {
    return <>{children}</>;
  }

  return (
    <SpeechHighlightProvider
      autoScroll={autoScroll}
      currentCharIndex={currentCharIndex}
      isPaused={paused}
      isSpeaking={speaking}
    >
      {text && (
        <TextToSpeechControls
          autoScroll={autoScroll}
          cancel={cancel}
          elapsedSeconds={elapsedSeconds}
          isSupported={isSupported}
          pause={pause}
          paused={paused}
          progress={progress}
          rate={rate}
          resume={resume}
          seek={seek}
          selectedVoice={selectedVoice}
          setAutoScroll={setAutoScroll}
          setRate={setRate}
          setSelectedVoice={setSelectedVoice}
          setVolume={setVolume}
          speak={() => speak(text)}
          speaking={speaking}
          text={text}
          totalSeconds={totalSeconds}
          voices={voices}
          volume={volume}
        />
      )}
      {children}
    </SpeechHighlightProvider>
  );
}
