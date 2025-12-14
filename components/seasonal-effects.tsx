"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Snowfall from "react-snowfall";

export function SeasonalEffects() {
  const [effect, setEffect] = useState<"snow" | "confetti" | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Handle window resize for Confetti
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial size
    handleResize();

    window.addEventListener("resize", handleResize);

    // Date Logic
    const now = new Date();
    const month = now.getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
    const date = now.getDate();

    // Snow: Dec 1 - Dec 30
    if (month === 11 && date <= 30) {
      setEffect("snow");
    }
    // // Confetti: Dec 31 OR Jan 1
    else if ((month === 11 && date === 31) || (month === 0 && date === 1)) {
      setEffect("confetti");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!effect) return null;

  if (effect === "snow") {
    return (
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 1, // Behind interactions
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
        snowflakeCount={50}
      />
    );
  }

  if (effect === "confetti") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 100, // Confetti should probably be on top but non-blocking
        }}
      >
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={50}
          colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
        />
      </div>
    );
  }

  return null;
}
