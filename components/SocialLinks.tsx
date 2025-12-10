"use client";
import profileData from "@/data/profile.json";
import Image from "next/image";
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
      href={href as any}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="text-muted-foreground hover:text-primary text-center w-6 h-6 flex items-center justify-center"
    >
      <Image
        className="h-5 w-5 dark:invert hover:opacity-100 opacity-50 transition-colors duration-300 grayscale"
        src={imgSrc}
        alt={alt}
        height={16}
        width={16}
      />
    </Link>
  );
}
