"use client";

import { useEffect } from "react";

/* Moves the hero's layers with the pointer: writes --px and --py (-1 to 1)
   on the hero, which each layer multiplies by its own depth. Nothing moves
   for touch or when the visitor asks for less motion. */
export function HeroParallax() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-u26-hero]");
    if (
      !hero ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }
    let frame = 0;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      hero.style.setProperty("--px", x.toFixed(4));
      hero.style.setProperty("--py", y.toFixed(4));
      frame =
        Math.abs(tx - x) + Math.abs(ty - y) > 0.001
          ? requestAnimationFrame(tick)
          : 0;
    };
    const move = (e: PointerEvent) => {
      if (hero.getBoundingClientRect().bottom < 0) {
        return;
      }
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
