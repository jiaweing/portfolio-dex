"use client";
import { InView } from "@/components/core/in-view";

export function ProfileBio() {
  const bioLines = [
    "i create unique and original digital experiences.",
    "a designer & software engineer with experience in artificial intelligence, blockchain, non-fungible tokens, business intelligence, and game development.",
    "i am really interested in space, quantum mechanics, strange anomalies and mysteries of the universe.",
  ];

  return (
    <div className="space-y-6">
      {bioLines.map((line, index) => (
        <InView
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20, x: -10, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, x: 0, filter: "blur(0px)" },
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.3 + index * 0.1, // Moderate delay after header
          }}
          viewOptions={{ once: true, amount: 0.4 }}
        >
          <p className="mx-auto my-8 max-w-2xl">{line}</p>
        </InView>
      ))}
    </div>
  );
}
