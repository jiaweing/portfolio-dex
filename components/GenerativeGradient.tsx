"use client";

import { useMemo } from "react";

interface GenerativeGradientProps {
  title: string;
  className?: string;
}

export function GenerativeGradient({
  title,
  className,
}: GenerativeGradientProps) {
  // Deterministic random number generator based on string seed
  const seededRandom = (seed: string) => {
    let h = 0x81_1c_9d_c5;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 0x01_00_01_93);
    }
    return () => {
      h = Math.imul(h ^ (h >>> 16), 2_246_822_507);
      h = Math.imul(h ^ (h >>> 13), 3_266_489_909);
      return (h >>> 0) / 4_294_967_296;
    };
  };

  const params = useMemo(() => {
    const rng = seededRandom(title);

    // Expanded color palettes - harmonious combinations
    const palettes = [
      // Blues & Teals
      ["#92B3C9", "#C6D1D1", "#A8D5E2", "#F3F4EC", "#D4E7ED", "#E8F4F8"],
      ["#A0C4FF", "#CAF0F8", "#90E0EF", "#ADE8F4", "#48CAE4", "#E0FBFC"],
      ["#023E8A", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8", "#E8F6FA"],
      // Pinks & Corals
      ["#FFD1DC", "#FFAFCC", "#FFC8DD", "#FFE5EC", "#FFCAD4", "#F8EDEB"],
      ["#F66E56", "#F96656", "#FFB5A7", "#FCD5CE", "#F8EDEB", "#FEC89A"],
      ["#FF6B6B", "#EE6C4D", "#F4A261", "#E9C46A", "#FFEEDD", "#FFF3E4"],
      // Greens & Mints
      ["#98FB98", "#90EE90", "#B5EAD7", "#C7F9CC", "#80ED99", "#E9F5DB"],
      ["#7B8E54", "#A7C957", "#BFD200", "#D4E09B", "#E6F0DC", "#F7FCE5"],
      ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#95D5B2", "#D8F3DC"],
      // Lavenders & Purples
      ["#E6E6FA", "#D8B4FE", "#C4B5FD", "#DDD6FE", "#EDE9FE", "#F3E8FF"],
      ["#BDB2FF", "#A0C4FF", "#C7CEEA", "#E2E0F7", "#F0EFFF", "#E8E4F8"],
      ["#7B2CBF", "#9D4EDD", "#C77DFF", "#E0AAFF", "#F3D5FF", "#FBF0FF"],
      // Warm Peaches & Oranges
      ["#FFDAC1", "#FFE5B4", "#FFECD2", "#FCE1CF", "#FAD7A0", "#FFF2E6"],
      ["#FFB347", "#FFCC80", "#FFD699", "#FFE4B5", "#FFEFD5", "#FFF8DC"],
      ["#F4A261", "#E9C46A", "#FFD166", "#EF8354", "#FFE0B3", "#FFF5EB"],
      // Mixed/Rainbow Pastels
      ["#C7CEEA", "#B5EAD7", "#FF9AA2", "#FFDAC1", "#E2F0CB", "#F0FFFF"],
      ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#F5E6FF"],
      // Dusty/Muted Tones
      ["#D4A5A5", "#A5C9CA", "#E7D4C0", "#CCB7AE", "#D6CDA4", "#EEE3CB"],
      ["#B8C4BB", "#A7BDA4", "#D4DFC7", "#C9D8B6", "#E8F0E3", "#F5F7F2"],
      // Earth Tones
      ["#8B4513", "#A0522D", "#CD853F", "#DEB887", "#F5DEB3", "#FDF5E6"],
      ["#BC6C25", "#DDA15E", "#FEFAE0", "#606C38", "#283618", "#F4F1DE"],
      // Deep Jewel Tones
      ["#2C3E50", "#34495E", "#5D6D7E", "#85929E", "#ABB2B9", "#D5D8DC"],
      ["#1A535C", "#4ECDC4", "#F7FFF7", "#FF6B6B", "#FFE66D", "#FFF9E6"],
      // Sunset Vibes
      ["#FF7B00", "#FF8800", "#FF9500", "#FFA200", "#FFAA00", "#FFD580"],
      // Ocean & Sky
      ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8", "#E8F8FA"],
      ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51", "#FFEBE5"],
      // Soft Neutrals
      ["#F5F5F5", "#E8E8E8", "#D3D3D3", "#BEBEBE", "#A9A9A9", "#FAFAFA"],
      ["#FAF9F6", "#E8E4E1", "#D4CFC9", "#BBB5AD", "#96918B", "#FDF8F5"],
      // Candy Pop
      ["#FF69B4", "#FF1493", "#C71585", "#DB7093", "#FFC0CB", "#FFE4EC"],
      ["#00CED1", "#20B2AA", "#48D1CC", "#40E0D0", "#7FFFD4", "#E0FFFF"],
      // Vintage
      ["#CB997E", "#DDBEA9", "#FFE8D6", "#B7B7A4", "#A5A58D", "#F0EBE3"],
      ["#6B705C", "#A5A58D", "#B7B7A4", "#FFE8D6", "#DDBEA9", "#F2EDE9"],
      // Rose Gold & Blush
      ["#B76E79", "#E8B4B8", "#EED6D3", "#F9F1F0", "#FADCD9", "#FFF0F0"],
      ["#D4A5A5", "#E8C4C4", "#F2DCDC", "#FBF0F0", "#F5E6E6", "#FFFAFA"],
      // Sage & Olive
      ["#5F7161", "#6D8B74", "#EFEAD8", "#D0C9C0", "#F0EBE3", "#FAFAF5"],
      ["#606C38", "#283618", "#FEFAE0", "#DDA15E", "#BC6C25", "#FDF8EE"],
      // Moody Blues
      ["#1B2838", "#2A3F54", "#3A5A7C", "#6B8CAE", "#A4C3D2", "#D4E5ED"],
      ["#16213E", "#0F3460", "#533483", "#E94560", "#F5E6CC", "#FBF5EE"],
      // Terracotta
      ["#C4704D", "#D49B7A", "#E5C4B0", "#F2E0D5", "#C9B8AD", "#F8F4F0"],
      ["#A0522D", "#CD853F", "#DEB887", "#F5DEB3", "#FAEBD7", "#FFF8F0"],
      // Forest
      ["#1B4332", "#2D6A4F", "#40916C", "#52B788", "#74C69D", "#B7E4C7"],
      ["#344E41", "#3A5A40", "#588157", "#A3B18A", "#DAD7CD", "#F0EDE8"],
      // Mauve & Plum
      ["#4A0E4E", "#81267C", "#B24F9E", "#D17AB3", "#E6A3C4", "#F5D4E5"],
      ["#5C374C", "#985277", "#CE7DA5", "#E5A4CB", "#F0C9DE", "#FBE8F0"],
      // Teal & Turquoise
      ["#006D77", "#83C5BE", "#EDF6F9", "#FFDDD2", "#E29578", "#FFF5F0"],
      ["#0D5C63", "#44A1A0", "#78CDD7", "#C4F5FC", "#ECFFFF", "#F8FFFF"],
      // Copper & Bronze
      ["#6E3B3B", "#8B5A5A", "#B87333", "#CD7F32", "#D4A574", "#F0DCC9"],
      ["#7A4419", "#A65D1B", "#C47D2C", "#E4A853", "#F2C879", "#FFF2D9"],
      // Arctic
      ["#A8DADC", "#457B9D", "#1D3557", "#E8F4F8", "#C5DEE3", "#F5FBFC"],
      ["#CAF0F8", "#90E0EF", "#00B4D8", "#0077B6", "#023E8A", "#E0F7FA"],
      // Warm Sunset
      ["#FFE5D9", "#FFD7BA", "#FEC89A", "#FFB482", "#FF9B54", "#FFF4EC"],
      ["#FFBE98", "#FF9F6C", "#FF8055", "#FF6B6B", "#FF5252", "#FFF0EB"],
      // Cool Mint
      ["#D4EDDA", "#C3E6CB", "#A5D6A7", "#81C784", "#66BB6A", "#E8F5E9"],
      ["#B2F2BB", "#8CE99A", "#69DB7C", "#51CF66", "#40C057", "#E6FBE9"],
      // Lavender Fields
      ["#E9D5FF", "#D8B4FE", "#C084FC", "#A855F7", "#9333EA", "#F5EEFF"],
      ["#DDD6FE", "#C4B5FD", "#A78BFA", "#8B5CF6", "#7C3AED", "#F0EBFF"],
      // Peachy Keen
      ["#FFE4C9", "#FFD4A8", "#FFC489", "#FFB56B", "#FFA54E", "#FFF6EC"],
      ["#FFDAB9", "#FFCB9A", "#FFBC7B", "#FFAD5C", "#FF9E3D", "#FFF8F0"],
      // Steel & Slate
      ["#4A5568", "#5A6677", "#6B7890", "#7C8AA8", "#8D9CBB", "#E6EAF0"],
      ["#2C3E50", "#3D5265", "#4E6679", "#5F7B8D", "#708FA1", "#E0E8EE"],
      // Cherry Blossom
      ["#FFB7C5", "#FFA4B8", "#FF91AB", "#FF7E9E", "#FF6B91", "#FFF0F3"],
      ["#FADADD", "#F5C6CB", "#F0B2B8", "#EB9EA5", "#E68A92", "#FFF5F6"],
    ];

    // Shuffle palettes array using seeded RNG to avoid sequential patterns
    const shuffledPalettes = [...palettes];
    for (let i = shuffledPalettes.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffledPalettes[i], shuffledPalettes[j]] = [
        shuffledPalettes[j],
        shuffledPalettes[i],
      ];
    }

    const palette =
      shuffledPalettes[Math.floor(rng() * shuffledPalettes.length)];

    // Generate color stop positions for smooth blending
    const colorStops = palette.slice(0, 4).map((color, i) => ({
      color,
      x: 10 + rng() * 80, // Position within 10-90% range
      y: 10 + rng() * 80,
    }));

    const noiseSeed = Math.floor(rng() * 1000);

    return { palette, colorStops, noiseSeed };
  }, [title]);

  const idSuffix = params.noiseSeed;

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: params.palette[params.palette.length - 1] }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Heavy blur for soft blending */}
          <filter id={`blur-${idSuffix}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>

          {/* Subtle noise overlay */}
          <filter id={`noise-${idSuffix}`}>
            <feTurbulence
              baseFrequency="0.9"
              numOctaves="4"
              seed={params.noiseSeed}
              stitchTiles="stitch"
              type="fractalNoise"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA slope="0.08" type="linear" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
        </defs>

        {/* Background fill */}
        <rect
          fill={params.palette[params.palette.length - 1]}
          height="100"
          width="100"
        />

        {/* Blurred color blobs */}
        <g filter={`url(#blur-${idSuffix})`}>
          {params.colorStops.map((stop, i) => (
            <ellipse
              cx={stop.x}
              cy={stop.y}
              fill={stop.color}
              key={i}
              opacity="0.85"
              rx={25 + (i % 2) * 15}
              ry={30 + ((i + 1) % 2) * 10}
            />
          ))}
        </g>

        {/* Noise texture overlay */}
        <rect
          fill="transparent"
          filter={`url(#noise-${idSuffix})`}
          height="100"
          width="100"
        />
      </svg>
    </div>
  );
}
