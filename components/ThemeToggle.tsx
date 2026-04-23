"use client";

import {
  ComputerIcon as Monitor,
  Moon02Icon as Moon,
  Sun01Icon as Sun,
} from "hugeicons-react";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CommandPalette } from "./search/command-palette";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrl = e.metaKey || e.ctrlKey;
      if (ctrl && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (ctrl && !e.shiftKey && e.key === ".") {
        e.preventDefault();
        window.open("mailto:hey@jiaweing.com", "_blank", "noopener,noreferrer");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!mounted) {
    return null;
  }

  const cycleTheme = () => {
    const next =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    if (document.startViewTransition) {
      if (next === "dark") document.documentElement.classList.add("to-dark");
      const transition = document.startViewTransition(() => setTheme(next));
      transition.finished.finally(() => {
        document.documentElement.classList.remove("to-dark");
      });
    } else {
      setTheme(next);
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      default:
        return "System";
    }
  };

  return (
    <>
      <CommandPalette onOpenChange={setIsSearchOpen} open={isSearchOpen} />
      <div className="fixed top-6 right-6 z-50 flex items-center gap-1">
        <button
          aria-label="Search (⌘K)"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          onClick={() => setIsSearchOpen(true)}
          type="button"
        >
          <Search className="h-4 w-4" />
        </button>
        <Button
          aria-label={`Current theme: ${getLabel()}. Click to change theme.`}
          onClick={cycleTheme}
          variant="ghost"
        >
          {getIcon()}
        </Button>
      </div>
    </>
  );
}
