"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileHeader() {
  return (
    <div className="space-y-4">
      <Avatar className="size-10 rounded-xl">
        <AvatarImage src="/images/avatars/shadcn.png" alt="logo" />
        <AvatarFallback>JW</AvatarFallback>
      </Avatar>

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
