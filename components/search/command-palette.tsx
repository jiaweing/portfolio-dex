"use client";

import {
  AtSign,
  BookOpen,
  BookText,
  Briefcase,
  Camera,
  Code2,
  Gift,
  Globe,
  Info,
  Laptop,
  LayoutGrid,
  Mail,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { ScrollFadeEffect } from "@/components/scroll-fade-effect";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PAGES = [
  { name: "Home", href: "/", icon: Globe, description: "Back to homepage" },
  {
    name: "2025 Wrapped",
    href: "/wrapped",
    icon: Gift,
    description: "Year in review",
  },
  { name: "About", href: "/about", icon: Info, description: "Who I am" },
  { name: "Writing", href: "/blog", icon: BookOpen, description: "Blog posts" },
  {
    name: "Projects",
    href: "/projects",
    icon: LayoutGrid,
    description: "Things I've built",
  },
  {
    name: "Books",
    href: "/books",
    icon: BookText,
    description: "What I've read",
  },
  {
    name: "Setup",
    href: "/setup",
    icon: Laptop,
    description: "My gear & tools",
  },
];

const ACTIONS = [
  {
    name: "Send an Email",
    href: "mailto:hey@jiaweing.com",
    icon: Mail,
    description: "hey@jiaweing.com",
  },
];

const SOCIAL = [
  {
    name: "X / Twitter",
    href: "https://x.com/jiaweihq",
    icon: AtSign,
    description: "@jiaweihq",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jiaweing",
    icon: Briefcase,
    description: "linkedin.com/in/jiaweing",
  },
  {
    name: "GitHub",
    href: "https://github.com/jiaweing",
    icon: Code2,
    description: "github.com/jiaweing",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/jiaweihq",
    icon: Camera,
    description: "@jiaweihq",
  },
];

function searchFilter(value: string, search: string): number {
  if (!search.trim()) return 1;
  const v = value.toLowerCase();
  const s = search.toLowerCase().trim();
  if (v.includes(s)) return 1;
  const words = s.split(/\s+/);
  if (words.length > 1 && words.every((w) => v.includes(w))) return 0.8;
  let si = 0;
  for (let i = 0; i < v.length && si < s.length; i++) {
    if (v[i] === s[si]) si++;
  }
  return si === s.length ? 0.5 : 0;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme } = useTheme();

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href as any);
    },
    [onOpenChange, router]
  );

  const openExternal = useCallback(
    (href: string) => {
      onOpenChange(false);
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [onOpenChange]
  );

  const runTheme = useCallback(
    (theme: string) => {
      setTheme(theme);
    },
    [setTheme]
  );

  return (
    <CommandDialog
      commandClassName="p-0"
      description="Search pages"
      filter={searchFilter}
      onOpenChange={onOpenChange}
      open={open}
      title="Search"
    >
      <CommandInput placeholder="Search pages..." />
      <CommandList className="relative z-10 -mt-4 max-h-none overflow-y-hidden rounded-2xl border-foreground/10 border-t border-b bg-popover bg-clip-padding [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group]]:p-0 [&_[cmdk-item]]:rounded-none [&_[cmdk-item]]:px-4">
        <ScrollFadeEffect className="scroll-fade-effect-y max-h-[min(60vh,420px)] overflow-y-auto">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            {PAGES.map((page) => {
              const Icon = page.icon;
              return (
                <CommandItem
                  className="gap-3 py-2"
                  key={page.href}
                  onSelect={() => navigate(page.href)}
                  value={`page ${page.name} ${page.description}`}
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate">{page.name}</span>
                    <span className="truncate text-muted-foreground text-xs">
                      {page.description}
                    </span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandGroup heading="Actions">
            {ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <CommandItem
                  className="gap-3 py-2"
                  key={action.href}
                  onSelect={() => openExternal(action.href)}
                  value={`action ${action.name} ${action.description}`}
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate">{action.name}</span>
                    <span className="truncate text-muted-foreground text-xs">
                      {action.description}
                    </span>
                  </div>
                  <CommandShortcut>⌃,</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandGroup heading="Social">
            {SOCIAL.map((link) => {
              const Icon = link.icon;
              return (
                <CommandItem
                  className="gap-3 py-2"
                  key={link.href}
                  onSelect={() => openExternal(link.href)}
                  value={`social ${link.name} ${link.description}`}
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate">{link.name}</span>
                    <span className="truncate text-muted-foreground text-xs">
                      {link.description}
                    </span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandGroup heading="Preferences">
            <CommandItem
              className="gap-3 py-2"
              onSelect={() => runTheme("light")}
              value="theme light mode appearance"
            >
              <Sun className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate">Light Mode</span>
                <span className="truncate text-muted-foreground text-xs">
                  Switch to light theme
                </span>
              </div>
            </CommandItem>
            <CommandItem
              className="gap-3 py-2"
              onSelect={() => runTheme("dark")}
              value="theme dark mode appearance"
            >
              <Moon className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate">Dark Mode</span>
                <span className="truncate text-muted-foreground text-xs">
                  Switch to dark theme
                </span>
              </div>
            </CommandItem>
            <CommandItem
              className="gap-3 py-2"
              onSelect={() => runTheme("system")}
              value="theme system mode appearance auto"
            >
              <Monitor className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate">System Theme</span>
                <span className="truncate text-muted-foreground text-xs">
                  Follow system preference
                </span>
              </div>
            </CommandItem>
          </CommandGroup>
        </ScrollFadeEffect>
      </CommandList>
      <div className="hidden items-center gap-4 px-4 py-2 text-muted-foreground sm:flex">
        <span className="flex items-center gap-1 text-muted-foreground text-xs">
          <kbd className="rounded bg-popover px-1 py-0.5 font-mono text-[10px]">
            ⌃,
          </kbd>
          Send an Email
        </span>
      </div>
    </CommandDialog>
  );
}
