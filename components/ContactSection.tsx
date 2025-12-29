"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "./SocialLinks";

export function ContactSection() {
  return (
    <div className="space-y-4">
      <Button asChild>
        <Link href="mailto:hey@jiaweing.com">
          <span className="btn-label">contact me</span>
        </Link>
      </Button>
      <SocialLinks />
    </div>
  );
}
