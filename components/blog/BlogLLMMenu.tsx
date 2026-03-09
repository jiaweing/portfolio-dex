"use client";

import { Check, ChevronDown, Copy, ExternalLink } from "lucide-react";
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

const createPrompt = ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => `I'm reading this blog post by Jia Wei Ng.\n\nTitle: ${title}\nURL: ${url}\n\nUnderstand the topic and be ready to answer questions I ask about it.\n\nWhen you reply, keep it concise and practical:\n1) Give me a 5-bullet summary\n2) Explain key ideas in plain language\n3) Flag assumptions or trade-offs\n4) Suggest 3 follow-up questions I should ask next`;

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
        <Button className="h-8 gap-1.5 px-2.5 text-xs" size="sm" variant="ghost">
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          Copy page
          <ChevronDown className="size-3.5" />
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
          <Image alt="OpenAI" className="mr-2" height={16} src="/logos/openai.svg" width={16} />
          Open in ChatGPT
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://claude.ai/new?q=")}>
          <Image alt="Claude" className="mr-2" height={16} src="/logos/claude.svg" width={16} />
          Open in Claude
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://gemini.google.com/app?prompt=")}>
          <Image alt="Gemini" className="mr-2" height={16} src="/logos/gemini.svg" width={16} />
          Open in Gemini
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://t3.chat/?q=")}>
          <Image alt="T3 Chat" className="mr-2" height={16} src="/logos/t3.svg" width={16} />
          Open in T3 Chat
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
