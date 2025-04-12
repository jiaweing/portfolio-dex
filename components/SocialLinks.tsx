"use client";
import { InView } from "@/components/core/in-view";
import profileData from "@/data/profile.json";
import Link from "next/link";

type SocialItem = {
  name: string;
  url: string;
  icon: string;
};

export function SocialLinks() {
  return (
    <div className="flex flex-row flex-wrap justify-start items-center gap-6 mt-4">
      {profileData.social.map((item: SocialItem, index: number) => (
        <SocialLink
          key={index}
          href={item.url}
          ariaLabel={item.name}
          imgSrc={item.icon}
          alt={`${item.name} Logo`}
          delay={0.1 + index * 0.08}
        />
      ))}
    </div>
  );
}

type SocialLinkProps = {
  href: string;
  ariaLabel: string;
  imgSrc: string;
  alt: string;
  delay: number;
};

function SocialLink({ href, ariaLabel, imgSrc, alt, delay }: SocialLinkProps) {
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 15, scale: 0.8, filter: "blur(4px)" },
        visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      }}
      transition={{
        duration: 0.4,
        ease: [0.175, 0.885, 0.32, 1.275], // Custom easing for a slight bounce
        delay,
      }}
      viewOptions={{ once: true, amount: 0.3 }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="text-muted-foreground hover:text-primary text-center w-6 h-6 flex items-center justify-center"
      >
        <img
          className="h-5 w-5 dark:invert hover:opacity-100 opacity-50 transition-colors duration-300 grayscale"
          src={imgSrc}
          alt={alt}
          height="16"
          width="16"
        />
      </Link>
    </InView>
  );
}
