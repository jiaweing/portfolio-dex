"use client";
import Image from "next/image";
import Link from "next/link";
import profileData from "@/data/profile.json";

type SocialItem = {
  name: string;
  url: string;
  icon: string;
};

export function SocialLinks() {
  return (
    <div className="mt-4 flex flex-row flex-wrap items-center justify-start gap-6">
      {profileData.social.map((item: SocialItem, index: number) => (
        <SocialLink
          alt={`${item.name} Logo`}
          ariaLabel={item.name}
          href={item.url}
          imgSrc={item.icon}
          key={index}
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
};

function SocialLink({ href, ariaLabel, imgSrc, alt }: SocialLinkProps) {
  return (
    <Link
      aria-label={ariaLabel}
      className="flex h-6 w-6 items-center justify-center text-center text-muted-foreground hover:text-primary"
      href={href as any}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        alt={alt}
        className="h-5 w-5 opacity-50 grayscale transition-colors duration-300 hover:opacity-100 dark:invert"
        height={16}
        src={imgSrc}
        width={16}
      />
    </Link>
  );
}
