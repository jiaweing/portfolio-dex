"use client";

import { SantaAvatar } from "@/components/SantaAvatar";

export function ProfileHeader() {
  return (
    <div className="space-y-4">
      <SantaAvatar className="size-10" />

      <div>
        <h1 className="text-2xl font-medium tracking-tighter">
          Jia Wei Ng{" "}
          <span className="text-xl text-muted-foreground">(Jay)</span>
        </h1>

        <p className="text-sm text-muted-foreground">25 y/o, singapore</p>
      </div>
    </div>
  );
}
