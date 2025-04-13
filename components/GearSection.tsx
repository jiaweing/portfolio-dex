"use client";
import { InView } from "@/components/core/in-view";
import profileData from "@/data/profile.json";
import Link from "next/link";

type GearItem = {
  name: string;
  description: string;
  url: string;
  category: string;
};

export function GearSection() {
  return (
    <div>
      <InView
        variants={{
          hidden: { opacity: 0, x: -30, y: 10, filter: "blur(4px)" },
          visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewOptions={{ once: true, amount: 0.1 }}
      >
        <h3 className="font-semibold mb-2">setup & gear</h3>
      </InView>
      <div className="space-y-1 text-sm">
        {profileData.gear &&
          profileData.gear.map((item: GearItem, index: number) => (
            <InView
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20, y: 10, filter: "blur(3px)" },
                visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.1 + index * 0.08,
              }}
              viewOptions={{ once: true, amount: 0.1 }}
            >
              <GearListItem item={item} />
            </InView>
          ))}
      </div>
    </div>
  );
}

function GearListItem({ item }: { item: GearItem }) {
  return (
    <p>
      {item.url && item.url !== "#" ? (
        <Link href={item.url} className="text-blue-500" target="_blank">
          {item.name}
        </Link>
      ) : (
        <span className="text-muted-foreground">{item.name}</span>
      )}{" "}
      <span className="text-muted-foreground">- {item.description}</span>
    </p>
  );
}
