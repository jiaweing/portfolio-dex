"use client";

import { useEffect, useState } from "react";
import Snowfall from "react-snowfall";

export function SnowfallWrapper() {
  const [isDecember, setIsDecember] = useState(false);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    if (currentMonth === 11) {
      setIsDecember(true);
    }
  }, []);

  if (!isDecember) {
    return null;
  }

  return (
    <Snowfall
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 1, // Low z-index so it's behind modals but visible
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
      snowflakeCount={100}
    />
  );
}
