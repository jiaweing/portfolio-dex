"use client";

export function ProfileBio() {
  const bioLines = [
    "just an ordinary guy who makes software, with unique and original digital experiences.",
    "a designer & software engineer with experience in artificial intelligence, blockchain, non-fungible tokens, business intelligence, and game development.",
    "i love psychology, space, quantum mechanics, strange anomalies and mysteries of the universe.",
  ];

  return (
    <div className="space-y-6">
      {bioLines.map((line, index) => (
        <p className="mx-auto my-8 max-w-2xl" key={index}>
          {line}
        </p>
      ))}
    </div>
  );
}
