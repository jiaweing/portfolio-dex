"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlogLLMMenuProps {
  postTitle: string;
  postMarkdown: string;
  postUrl: string;
}

interface LLMLogoProps {
  alt: string;
  src: string;
}

const createPrompt = ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => `I'm reading this blog post by Jia Wei Ng.\n\nTitle: ${title}\nURL: ${url}\n\nUnderstand the topic and be ready to answer questions I ask about it.\n\nWhen you reply, keep it concise and practical:\n1) Give me a 5-bullet summary\n2) Explain key ideas in plain language\n3) Flag assumptions or trade-offs\n4) Suggest 3 follow-up questions I should ask next`;

function LLMLogo({ alt, src }: LLMLogoProps) {
  return (
    <span className="mr-2 flex h-4 w-5 shrink-0 items-center justify-center">
      <Image
        alt={alt}
        className="h-4 w-auto object-contain dark:invert"
        height={16}
        src={src}
        width={24}
      />
    </span>
  );
}

export function BlogLLMMenu({
  postTitle,
  postMarkdown,
  postUrl,
}: BlogLLMMenuProps) {
  const [copied, setCopied] = useState(false);
  const prompt = useMemo(
    () => createPrompt({ title: postTitle, url: postUrl }),
    [postTitle, postUrl]
  );

  const openMarkdown = () => {
    const blob = new Blob([postMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const openLLM = (baseUrl: string) => {
    const link = `${baseUrl}${encodeURIComponent(prompt)}`;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(postMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Copy page"
          className="h-8 px-2 text-muted-foreground hover:text-foreground"
          size="icon"
          variant="ghost"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={copyMarkdown}>
          <Copy className="mr-2 size-4" />
          Copy Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openMarkdown}>
          <ExternalLink className="mr-2 size-4" />
          Open Markdown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://chatgpt.com/?q=")}>
          <LLMLogo alt="OpenAI" src="/logos/openai.svg" />
          Open in ChatGPT
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://claude.ai/new?q=")}>
          <LLMLogo alt="Claude" src="/logos/claude.svg" />
          Open in Claude
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://gemini.google.com/app?prompt=")}>
          <LLMLogo alt="Gemini" src="/logos/gemini.svg" />
          Open in Gemini
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://t3.chat/?q=")}>
          <LLMLogo alt="T3 Chat" src="/logos/t3.svg" />
          Open in T3 Chat
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
