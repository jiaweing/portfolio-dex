"use client";

import { Gift } from "lucide-react";

export function WrappedGiftIcon({
  className,
  strokeWidth = 3,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <div className={`relative ${className || ""}`}>
      <svg
        className="overflow-visible"
        height="100%"
        viewBox="0 0 24 24"
        width="100%"
      >
        <defs>
          <linearGradient
            gradientTransform="rotate(30 12 12)"
            gradientUnits="userSpaceOnUse"
            id="wrapped-icon-gradient"
            spreadMethod="repeat"
            x1="0"
            x2="48"
            y1="0"
            y2="0"
          >
            <stop offset="0" stopColor="rgb(59, 130, 246)" />
            <stop offset="0.25" stopColor="rgb(168, 85, 247)" />
            <stop offset="0.5" stopColor="rgb(239, 68, 68)" />
            <stop offset="0.75" stopColor="rgb(249, 115, 22)" />
            <stop offset="1" stopColor="rgb(59, 130, 246)" />
            <animateTransform
              additive="sum"
              attributeName="gradientTransform"
              dur="4s"
              from="0 0"
              repeatCount="indefinite"
              to="-48 0"
              type="translate"
            />
          </linearGradient>
          <mask id="icon-mask" maskUnits="userSpaceOnUse">
            <Gift
              className="h-full w-full"
              height="24"
              stroke="white"
              /* Ensure the inner SVG scales to fit our parent SVG viewBox */
              strokeWidth={strokeWidth}
              width="24"
            />
          </mask>
        </defs>
        {/* The Gradient Rect, revealed only where the Icon Mask is white (the strokes) */}
        <rect
          fill="url(#wrapped-icon-gradient)"
          height="300%"
          mask="url(#icon-mask)"
          width="300%"
          x="-50%"
          y="-50%"
        />
      </svg>
    </div>
  );
}
