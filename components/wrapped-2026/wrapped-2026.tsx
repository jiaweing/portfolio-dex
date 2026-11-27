"use client";

import { useState } from "react";
import { AppsSection } from "./apps-section";
import { CodeSection, type Day } from "./code-section";
import { Finale } from "./finale";
import { Hero } from "./hero";
import { Milestones } from "./milestones";
import { PlotTwist } from "./plot-twist";
import { type SocialSeries, SocialsSection } from "./socials-section";
import { type PostTitle, WritingSection } from "./writing-section";

// Lives inside the normal site layout, so it keeps the header, the theme
// toggle and the same type, greys and cards as every other page
export function Wrapped2026({
  days,
  posts,
  postTotal,
  perMonth,
  social,
  socialSince,
}: {
  days: Day[];
  posts: PostTitle[];
  postTotal: number;
  perMonth: number[];
  social: SocialSeries[];
  socialSince: string;
}) {
  // Bumping this spins the year in the hero again
  const [spin, setSpin] = useState(0);
  const again = () => setSpin((s) => s + 1);

  return (
    <div className="space-y-32">
      <Hero onSpin={again} spin={spin} />
      <PlotTwist />
      <Milestones />
      <CodeSection days={days} />
      <AppsSection />
      <WritingSection perMonth={perMonth} posts={posts} total={postTotal} />
      <SocialsSection series={social} since={socialSince} />
      <Finale onReplay={again} />
    </div>
  );
}
