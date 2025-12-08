"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
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
      {/* Desktop: Top-right fixed button */}
      <Button
        onClick={cycleTheme}
        className="hidden md:flex fixed top-6 right-6 z-50"
        variant="ghost"
        aria-label={`Current theme: ${getLabel()}. Click to change theme.`}
      >
        {getIcon()}
      </Button>

      {/* Mobile: Bottom-right floating button */}
      <Button
        onClick={cycleTheme}
        variant="secondary"
        className="flex md:hidden fixed bottom-6 right-6 z-50 items-center justify-center 
          w-12 h-12 rounded-full"
        aria-label={`Current theme: ${getLabel()}. Click to change theme.`}
      >
        {getIcon()}
      </Button>
    </>
  );
}
