"use client";

import Image from "next/image";
import { useState } from "react";

type OptimizedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/**
 * Enhanced image component with SEO optimizations
 * - Provides blur-up loading effect
 * - Sets appropriate loading attribute based on priority
 * - Includes responsive sizes attribute
 * - Sets high quality for better visual appearance
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        alt={alt}
        className={`duration-700 ease-in-out ${isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"}
        `}
        height={height}
        loading={priority ? "eager" : "lazy"}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
        quality={90}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={src}
        width={width}
      />
    </div>
  );
}

// Export SEOImage as an alias for backward compatibility
export const SEOImage = OptimizedImage;
