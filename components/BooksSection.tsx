"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Book } from "@/components/ui/book";
import profileData from "@/data/profile.json";

type BookItem = {
  title: string;
  author: string;
  lastHighlighted?: string;
  highlights?: number;
  status: string;
  url: string;
  invertFavicon?: boolean | "light" | "dark" | "always";
  hideFavicon?: boolean;
  color?: string;
  coverImage?: string;
};

interface BooksSectionProps {
  books?: BookItem[];
}

// Matches CircularGallery's plane proportions (700:900) at ~580px container height
const BOOK_WIDTH = 220;
const GAP = 40;
const ITEM_STEP = BOOK_WIDTH + GAP;
// Arc depth in px — how far edge items dip below center items
const BEND_PX = 130;
const CONTAINER_HEIGHT = 680;
// Padding so center books sit at the vertical midpoint of the container
// (accounts for ~330px book + 50px text at 2:3 cover ratio, plus BEND_PX room at bottom)
const PADDING_TOP = 150;

export function BooksSection({ books }: BooksSectionProps) {
  const data = (books || profileData.books) as BookItem[];
  // Triple the array so we always have content to scroll into on both sides
  const displayed = [...data, ...data, ...data];
  const N = data.length;

  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  // Drag state
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);
  const lastDragX = useRef(0);
  const velocityRef = useRef(0);
  const momentumRaf = useRef(0);

  // Start scrolled to the middle copy so there's room to go left and right
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = N * ITEM_STEP;
    }
  }, [N]);

  // Arc + seamless infinite loop — runs every frame
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const oneSet = N * ITEM_STEP;

    const update = () => {
      // Jump back into the middle copy when drifting into the first or third copy
      if (container.scrollLeft < oneSet) {
        container.scrollLeft += oneSet;
      } else if (container.scrollLeft >= oneSet * 2) {
        container.scrollLeft -= oneSet;
      }

      const sl = container.scrollLeft;
      const W = container.clientWidth;
      const H = W / 2;
      // Circular arc radius from the chord (viewport width) and sagitta (BEND_PX)
      const R = (H * H + BEND_PX * BEND_PX) / (2 * BEND_PX);

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const x = i * ITEM_STEP - sl;
        const effectiveX = Math.min(Math.abs(x), H);
        const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
        el.style.transform = `translateY(${arc}px)`;
      });

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [N]);

  // Pointer drag + mouse wheel — overflow:hidden so we drive scrollLeft ourselves
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      hasDragged.current = false;
      dragStartX.current = e.clientX;
      scrollStartLeft.current = container.scrollLeft;
      lastDragX.current = e.clientX;
      velocityRef.current = 0;
      cancelAnimationFrame(momentumRaf.current);
      container.setPointerCapture(e.pointerId);
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const delta = dragStartX.current - e.clientX;
      if (Math.abs(delta) > 4) hasDragged.current = true;
      velocityRef.current = lastDragX.current - e.clientX;
      lastDragX.current = e.clientX;
      container.scrollLeft = scrollStartLeft.current + delta;
    };

    const onPointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      container.style.cursor = "grab";
      let v = velocityRef.current;
      const momentum = () => {
        if (Math.abs(v) < 0.3) return;
        container.scrollLeft += v;
        v *= 0.93;
        momentumRaf.current = requestAnimationFrame(momentum);
      };
      momentum();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cancelAnimationFrame(momentumRaf.current);
      container.scrollLeft += e.deltaX + e.deltaY;
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{
        width: "100vw",
        flexShrink: 0,
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        height: CONTAINER_HEIGHT,
        overflow: "hidden",
        cursor: "grab",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: GAP,
          paddingLeft: `calc(50vw - ${BOOK_WIDTH / 2}px)`,
          paddingRight: `calc(50vw - ${BOOK_WIDTH / 2}px)`,
          paddingTop: PADDING_TOP,
        }}
      >
        {displayed.map((book, index) => (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            style={{ width: BOOK_WIDTH, flexShrink: 0 }}
          >
            {book.url && book.url !== "#" ? (
              <Link
                className="group block no-underline"
                draggable={false}
                href={book.url as any}
                onClick={(e) => {
                  if (hasDragged.current) e.preventDefault();
                }}
                target="_blank"
              >
                <Book
                  author={book.author}
                  color={book.color}
                  coverImage={book.coverImage}
                  textured
                  title={book.title}
                  variant="stripe"
                  width={BOOK_WIDTH}
                />
              </Link>
            ) : (
              <Book
                author={book.author}
                color={book.color}
                coverImage={book.coverImage}
                textured
                title={book.title}
                variant="stripe"
                width={BOOK_WIDTH}
              />
            )}
            <div className="mt-3 text-center" style={{ width: BOOK_WIDTH }}>
              <p className="truncate font-semibold text-sm leading-tight">
                {book.title}
              </p>
              <p className="text-xs opacity-50">{book.author}</p>
              {book.status === "in-progress" && (
                <span className="mt-1.5 inline-block rounded-full bg-sky-500 px-2 py-0.5 font-semibold text-[10px] text-white">
                  reading
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
