"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Snowfall from "react-snowfall";
import { useSeasonalEffect } from "@/hooks/use-seasonal-effect";

export { SEASONAL_EVENT } from "@/hooks/use-seasonal-effect";

export function SeasonalEffects() {
  const effect = useSeasonalEffect();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (effect === "snow") {
    return (
      <Snowfall
        snowflakeCount={50}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 50,
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
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
          zIndex: 100,
        }}
      >
        <Confetti
          colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
          height={windowSize.height}
          numberOfPieces={50}
          recycle={true}
          width={windowSize.width}
        />
      </div>
    );
  }

  return null;
}
