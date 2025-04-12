"use client";
import { InView } from "@/components/core/in-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

export function ContactSection() {
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewOptions={{ once: true, amount: 0.1 }}
    >
      <div className="space-y-6">
        <Button asChild className="my-8">
          <Link href="mailto:hey@jiaweing.com">
            <span className="btn-label">contact me</span>
          </Link>
        </Button>

        <SocialLinks />
      </div>
    </InView>
  );
}
