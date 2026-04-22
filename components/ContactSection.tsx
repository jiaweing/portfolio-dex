"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "./SocialLinks";

export function ContactSection() {
  return (
    <div className="space-y-4">
      <Link className={buttonVariants()} href="mailto:hey@jiaweing.com">
        <span className="btn-label">contact me</span>
      </Link>
      <SocialLinks />
    </div>
  );
}
