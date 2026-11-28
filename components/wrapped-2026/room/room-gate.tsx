"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { WrappedData } from "../types";

/* The door to the room. This is the only part of the immersive mode the page
   loads up front: it watches for #room in the address, and only then fetches
   the room's interface, three.js and the scene. Any link to #room opens it,
   and the browser's back button closes it. */

const HASH = "#room";

function Veil() {
  return (
    <output className="u26-room-veil">
      <span className="u26-hand">tidying up the room...</span>
    </output>
  );
}

const RoomMode = dynamic(() => import("./room-mode").then((m) => m.RoomMode), {
  ssr: false,
  loading: Veil,
});

export function RoomGate({
  data,
  fonts,
}: {
  data: WrappedData;
  /** The page's font classes, so the room can use the same faces */
  fonts: string;
}) {
  const [open, setOpen] = useState(false);
  // True when the visitor walked in from the page, so "back" is the way out
  const walkedIn = useRef(false);

  useEffect(() => {
    const sync = (e?: HashChangeEvent) => {
      const here = window.location.hash === HASH;
      if (here && e) {
        walkedIn.current = !e.oldURL.endsWith(HASH);
      }
      setOpen(here);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = useCallback(() => {
    if (walkedIn.current) {
      walkedIn.current = false;
      window.history.back();
      return;
    }
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
    setOpen(false);
  }, []);

  // While the room is open the page behind it stays put and out of reach
  useEffect(() => {
    if (!open) {
      return;
    }
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = "hidden";
    const hushed: HTMLElement[] = [];
    for (const el of Array.from(document.body.children)) {
      if (
        el instanceof HTMLElement &&
        !el.inert &&
        !el.classList.contains("u26-room-root")
      ) {
        el.inert = true;
        hushed.push(el);
      }
    }
    return () => {
      html.style.overflow = before;
      for (const el of hushed) {
        el.inert = false;
      }
    };
  }, [open]);

  return open
    ? createPortal(
        <div
          aria-label="My room"
          aria-modal="true"
          className={`u26 u26-room-root ${fonts}`}
          data-lenis-prevent=""
          role="dialog"
        >
          <RoomMode data={data} onClose={close} />
        </div>,
        document.body
      )
    : null;
}
