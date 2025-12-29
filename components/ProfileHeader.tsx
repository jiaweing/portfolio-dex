"use client";

import { SantaAvatar } from "@/components/SantaAvatar";

export function ProfileHeader() {
  return (
    <div className="space-y-4">
      <SantaAvatar className="size-10" />

      <div>
        <h1 className="font-medium text-2xl tracking-tighter">
          Jia Wei Ng{" "}
          <span className="text-muted-foreground text-xl">(Jay)</span>
        </h1>

        <p className="text-muted-foreground text-sm">25 y/o, singapore</p>
      </div>
    </div>
  );
}
