"use client";
import { Favicon } from "@/components/ui/Favicon";
import profileData from "@/data/profile.json";
import Link from "next/link";

type GearItem = {
  name: string;
  description: string;
  url: string;
  category: string;
  invertFavicon?: boolean | "light" | "dark" | "always";
  hideFavicon?: boolean;
};

export function GearSection() {
  return (
    <div>
      <h3 className="font-semibold mb-2">setup & gear</h3>
      <div className="space-y-1 text-sm leading-relaxed">
        {profileData.gear &&
          profileData.gear.map((item: GearItem, index: number) => (
            <GearListItem key={index} item={item} />
          ))}
      </div>
    </div>
  );
}

function GearListItem({ item }: { item: GearItem }) {
  return (
    <p className="leading-relaxed">
      {item.url && item.url !== "#" ? (
        <Link href={item.url} className="text-blue-500" target="_blank">
          <Favicon
            url={item.url}
            invert={item.invertFavicon}
            hide={item.hideFavicon}
          />
          {item.name}
        </Link>
      ) : (
        <span className="text-muted-foreground">{item.name}</span>
      )}{" "}
      <span className="text-muted-foreground">· {item.description}</span>
    </p>
  );
}
