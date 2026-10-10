"use client";

import { useEffect } from "react";
import { Glitchy404 } from "@/components/glitchy-404-1";
import { findEgg } from "@/lib/easter-eggs";

export default function NotFound() {
  useEffect(() => {
    findEgg("lost");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Glitchy404 />
    </div>
  );
}
