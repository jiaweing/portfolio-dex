"use client";

import { Check, ChevronDown, Copy, ExternalLink } from "lucide-react";
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
        <Button className="gap-1.5" size="sm" variant="outline">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copy page
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={copyMarkdown}>Copy markdown</DropdownMenuItem>
        <DropdownMenuItem onClick={openMarkdown}>Open markdown</DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://chatgpt.com/?q=")}>
          Open in ChatGPT <ExternalLink className="ml-auto size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://claude.ai/new?q=")}>
          Open in Claude <ExternalLink className="ml-auto size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://gemini.google.com/app?prompt=")}>
          Open in Gemini <ExternalLink className="ml-auto size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openLLM("https://t3.chat/?q=")}>
          Open in T3 Chat <ExternalLink className="ml-auto size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
