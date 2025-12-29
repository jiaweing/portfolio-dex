"use client";

import clsx from "clsx";
import type React from "react";
import { useResponsive } from "@/hooks/use-responsive";

const DefaultIllustration = (
  <svg
    fill="none"
    height="56"
    viewBox="0 0 36 56"
    width="36"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M3.03113 28.0005C6.26017 23.1765 11.7592 20.0005 18 20.0005C24.2409 20.0005 29.7399 23.1765 32.9689 28.0005C29.7399 32.8244 24.2409 36.0005 18 36.0005C11.7592 36.0005 6.26017 32.8244 3.03113 28.0005Z"
      fill="#0070F3"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M32.9691 28.0012C34.8835 25.1411 36 21.7017 36 18.0015C36 8.06034 27.9411 0.00146484 18 0.00146484C8.05887 0.00146484 0 8.06034 0 18.0015C0 21.7017 1.11648 25.1411 3.03094 28.0012C6.25996 23.1771 11.7591 20.001 18 20.001C24.2409 20.001 29.74 23.1771 32.9691 28.0012Z"
      fill="#45DEC4"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M32.9692 28.0005C29.7402 32.8247 24.241 36.001 18 36.001C11.759 36.001 6.25977 32.8247 3.03077 28.0005C1.11642 30.8606 0 34.2999 0 38C0 47.9411 8.05887 56 18 56C27.9411 56 36 47.9411 36 38C36 34.2999 34.8836 30.8606 32.9692 28.0005Z"
      fill="#E5484D"
      fillRule="evenodd"
    />
  </svg>
);

interface ResponsiveProp<T> {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

interface BookProps {
  title: string;
  author: string;
  variant?: "simple" | "stripe";
  width?: number | ResponsiveProp<number>;
  color?: string;
  textColor?: string;
  illustration?: React.ReactNode;
  textured?: boolean;
  coverImage?: string;
}

export const Book = ({
  title,
  author,
  variant = "stripe",
  width = 196,
  color,
  textColor = "var(--ds-gray-1000)",
  illustration,
  textured = false,
  coverImage,
}: BookProps) => {
  const _width = useResponsive(width);
  const _color = color
    ? color
    : variant === "simple"
      ? "var(--ds-background-200)"
      : "var(--ds-amber-600)";
  const _illustration = illustration ? illustration : DefaultIllustration;

  return (
    <div className="inline-block w-fit" style={{ perspective: 900 }}>
      <div
        className={clsx(
          "book-rotate relative w-fit rotate-0 duration-[250ms]",
          !coverImage && "aspect-[49/60]"
        )}
        style={{
          transformStyle: "preserve-3d",
          minWidth: _width,
          containerType: "inline-size",
        }}
      >
        <div
          className="relative flex h-full translate-x-0 flex-col overflow-hidden rounded-r rounded-l-md bg-background-200 shadow-book after:absolute after:h-full after:w-full after:rounded-r after:rounded-l-md after:border after:border-gray-alpha-400 after:shadow-book-border"
          style={{ width: _width }}
        >
          <div
            className={clsx(
              "relative w-full overflow-hidden",
              variant === "stripe" && "flex-1",
              coverImage && "h-full" // Ensure full height if cover image is present
            )}
            style={{ background: _color }}
          >
            {variant === "stripe" && illustration && !coverImage && (
              <div className="absolute h-full w-full">{_illustration}</div>
            )}
            {variant === "stripe" && coverImage && (
              <div className="w-full">
                <img
                  alt={title}
                  className="block h-auto w-full object-cover"
                  src={coverImage}
                />
              </div>
            )}
            <div
              className="absolute h-full w-[8.2%] mix-blend-overlay"
              style={{ background: "var(--ds-book-bind)" }}
            />
          </div>
          <div
            className={clsx(
              "relative flex-1",
              (variant === "stripe" ||
                (variant === "simple" && color === undefined)) &&
                "bg-book-gradient",
              coverImage && "hidden" // Hide bottom part if cover image is present
            )}
            style={{
              background:
                variant === "simple" && color !== undefined
                  ? _color
                  : undefined,
            }}
          >
            <div
              className="absolute h-full w-[8.2%] opacity-20"
              style={{ background: "var(--ds-book-bind)" }}
            />
            <div
              className={clsx(
                "flex w-full flex-col p-[6.1%] pl-[14.3%]",
                variant === "simple" ? "gap-4" : "justify-between"
              )}
              style={{
                containerType: "inline-size",
                gap: `calc((24px / 196) * ${_width})`,
              }}
            >
              <span
                className={clsx(
                  "text-balance font-semibold leading-[1.25em] tracking-[-.02em]",
                  variant === "simple" ? "text-[12cqw]" : "text-[10.5cqw]",
                  coverImage && "hidden" // Hide text if cover image is present
                )}
                style={{ color: textColor }}
              >
                {title}
                <br />
                <span className="mt-1 block font-normal text-xs opacity-75">
                  {author}
                </span>
              </span>
              {variant === "stripe" ? null : _illustration}
            </div>
          </div>
          {textured && (
            <div className="pointer-events-none absolute inset-0 top-0 left-0 rotate-180 rounded-r rounded-l-md bg-[url('https://assets.vercel.com/image/upload/v1720554484/front/design/book-texture.avif')] bg-cover bg-no-repeat opacity-50 mix-blend-hard-light brightness-110" />
          )}
        </div>

        <div
          className="absolute top-[3px] h-[calc(100%_-_2_*_3px)] w-[calc(29cqw_-_2px)]"
          style={{
            background:
              "linear-gradient(90deg, #eaeaea, transparent 70%), linear-gradient(#fff, #fafafa)",
            transform: `translateX(calc(${_width} * 1px - 29cqw / 2 - 3px)) rotateY(90deg) translateX(calc(29cqw / 2))`,
          }}
        />
        <div
          className="absolute top-0 left-0 h-full rounded-r rounded-l-md bg-gray-200"
          style={{ width: _width, transform: "translateZ(calc(-1 * 29cqw))" }}
        />
      </div>
    </div>
  );
};
