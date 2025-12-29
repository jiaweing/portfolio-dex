"use client";

export function WrappedPageBorder() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] h-screen w-screen overflow-hidden">
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="page-glow-grad" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" />
            <stop offset="33%" stopColor="rgb(168, 85, 247)" />
            <stop offset="66%" stopColor="rgb(239, 68, 68)" />
            <stop offset="100%" stopColor="rgb(249, 115, 22)" />
            <animateTransform
              attributeName="gradientTransform"
              dur="5s"
              from="0 .5 .5"
              repeatCount="indefinite"
              to="360 .5 .5"
              type="rotate"
            />
          </linearGradient>

          {/* Filter to blur the mask (creating the feathering) */}
          <filter id="mask-blur">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <filter id="mask-blur-mobile">
            <feGaussianBlur stdDeviation="10" />
          </filter>

          {/* The Mask: White = visible, Black = hidden */}
          <mask id="glow-mask">
            {/* Mobile: Thinner stroke, less blur */}
            <rect
              className="block md:hidden"
              fill="none"
              filter="url(#mask-blur-mobile)"
              height="100%"
              stroke="white"
              strokeWidth="5"
              width="100%"
              x="0"
              y="0"
            />
            {/* Desktop: Thicker stroke, more blur */}
            <rect
              className="hidden md:block"
              fill="none"
              filter="url(#mask-blur)"
              height="100%"
              stroke="white"
              strokeWidth="25"
              width="100%"
              x="0"
              y="0"
            />
          </mask>
        </defs>

        {/* The Gradient Fill, revealed only by the mask */}
        <rect
          fill="url(#page-glow-grad)"
          height="100%"
          mask="url(#glow-mask)"
          opacity="0.8"
          width="100%"
          x="0"
          y="0"
        />
      </svg>
    </div>
  );
}
