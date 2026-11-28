"use client";

import "./room.css";
import {
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Vars } from "../parts";
import type { WrappedData } from "../types";
import { type RoomItem, roomItems } from "./items";
import type { RoomHandle } from "./scene";
import { createSound, type Sound } from "./scene/sound";
import { isFestive } from "./season";

/* The room's interface: the way out, the counter, the tray of finds, the
   card for whatever was just picked up, and the canvas the scene draws on.
   The scene itself (and three.js) is fetched here, once the room is open. */

type Status = "loading" | "ready" | "failed";

const STORE = "u26-room-found";

// The things that only play, and what their tags say
const TOYS: Record<string, string> = {
  pc: "The PC",
  fan: "The fan",
  yellow: "The shelf plush",
  guest: "The other chair",
  plush: "The plush pile",
  neon: "The neon",
  tree: "The tree",
};
const STORE_SOUND = "u26-room-sound";

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// One small drawing for each find, by its id
const GLYPHS: Record<string, ReactNode> = {
  mail: (
    <>
      <rect {...line} height="14" rx="2" width="20" x="2" y="5" />
      <path {...line} d="M2.5 6.5 L12 13.5 L21.5 6.5" />
    </>
  ),
  diploma: (
    <>
      <path d="M1.5 9.5 L12 5 L22.5 9.5 L12 14Z" fill="currentColor" />
      <path {...line} d="M6.5 13 V17 C6.5 19.6 17.5 19.6 17.5 17 V13" />
      <path {...line} d="M22 9.5 V15.5" />
    </>
  ),
  phone: (
    <>
      <rect {...line} height="19" rx="3" width="11.5" x="6.25" y="2.5" />
      <path {...line} d="M9 12 l2.2 2.2 l4 -4.6" />
    </>
  ),
  chair: (
    <>
      <path
        {...line}
        d="M3.5 17.5 L2.5 7.5 L8 11.5 L12 5 L16 11.5 L21.5 7.5 L20.5 17.5Z"
      />
      <path {...line} d="M4.5 20.5 H19.5" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" fill="currentColor" r="3.2" />
      <path {...line} d="M7.2 7.2 a6.8 6.8 0 0 0 0 9.6" />
      <path {...line} d="M16.8 7.2 a6.8 6.8 0 0 1 0 9.6" />
      <path {...line} d="M3.8 4 a11.4 11.4 0 0 0 0 16" />
      <path {...line} d="M20.2 4 a11.4 11.4 0 0 1 0 16" />
    </>
  ),
  cup: (
    <>
      <path {...line} d="M7 3.5 H17 V9 a5 5 0 0 1 -10 0Z" />
      <path {...line} d="M7 5.5 H3.5 V7 a3.5 3.5 0 0 0 3.5 3.5" />
      <path {...line} d="M17 5.5 H20.5 V7 a3.5 3.5 0 0 1 -3.5 3.5" />
      <path {...line} d="M12 14 V17.5 M7.5 20.5 H16.5 M9 17.5 H15" />
    </>
  ),
  plaque: (
    <>
      <path
        {...line}
        d="M12 2.5 L20 5.5 V11.5 C20 16.5 16.5 20 12 21.5 C7.5 20 4 16.5 4 11.5 V5.5Z"
      />
      <path {...line} d="M8.5 11.8 l2.5 2.5 l4.5 -5" />
    </>
  ),
  medal: (
    <>
      <path {...line} d="M8 2.5 L12 10 L16 2.5" />
      <circle {...line} cx="12" cy="15.5" r="5.5" />
      <circle cx="12" cy="15.5" fill="currentColor" r="1.8" />
    </>
  ),
  bed: (
    <>
      <path {...line} d="M2.5 19.5 V5.5 M2.5 16 H21.5 V19.5" />
      <path {...line} d="M2.5 12 H16.5 a5 5 0 0 1 5 4" />
      <rect {...line} height="3.6" rx="1.8" width="6" x="5" y="8" />
    </>
  ),
  crate: (
    <>
      <path {...line} d="M3 8 L12 3.5 L21 8 V16.5 L12 21 L3 16.5Z" />
      <path {...line} d="M3 8 L12 12.5 L21 8 M12 12.5 V21" />
    </>
  ),
  monitors: (
    <>
      <rect fill="currentColor" height="5" rx="1" width="5" x="3" y="3" />
      <rect {...line} height="4.4" rx="1" width="4.4" x="9.8" y="3.3" />
      <rect fill="currentColor" height="5" rx="1" width="5" x="16" y="3" />
      <rect {...line} height="4.4" rx="1" width="4.4" x="3.3" y="9.8" />
      <rect fill="currentColor" height="5" rx="1" width="5" x="9.5" y="9.5" />
      <rect fill="currentColor" height="5" rx="1" width="5" x="16" y="9.5" />
      <rect fill="currentColor" height="5" rx="1" width="5" x="3" y="16" />
      <rect {...line} height="4.4" rx="1" width="4.4" x="9.8" y="16.3" />
      <rect {...line} height="4.4" rx="1" width="4.4" x="16.3" y="16.3" />
    </>
  ),
  drawers: (
    <>
      <rect {...line} height="18" rx="2" width="17" x="3.5" y="3" />
      <path {...line} d="M3.5 9 H20.5 M3.5 15 H20.5" />
      <path {...line} d="M10 6 H14 M10 12 H14 M10 18 H14" />
    </>
  ),
  posts: (
    <path {...line} d="M4.5 20 V13 M9.5 20 V4 M14.5 20 V10 M19.5 20 V15" />
  ),
  tv: (
    <>
      <rect {...line} height="12" rx="2" width="19" x="2.5" y="7.5" />
      <path {...line} d="M8 2.5 L12 7 L16 2.5" />
    </>
  ),
};

function Glyph({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {GLYPHS[id]}
    </svg>
  );
}

function readFound(valid: Set<string>) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORE) ?? "[]");
    return Array.isArray(saved)
      ? saved.filter((id): id is string => valid.has(id))
      : [];
  } catch {
    return [];
  }
}

function Card({
  item,
  fresh,
  onClose,
  onNext,
  nextLabel,
  cardRef,
}: {
  item: RoomItem;
  fresh: boolean;
  onClose: () => void;
  onNext: () => void;
  nextLabel: string;
  cardRef: RefObject<HTMLElement | null>;
}) {
  const vars: Vars = { "--accent": item.ink };
  const outside = item.href?.startsWith("http");
  return (
    <aside
      aria-labelledby="u26-room-card-title"
      className={`u26-card u26-room-card ${item.tier === "Legendary" ? "u26-room-card--foil" : ""}`}
      data-fresh={fresh}
      ref={cardRef}
      style={vars}
    >
      <div className="u26-room-card-top">
        <span className="u26-tag">{item.tier}</span>
        <span className="u26-kicker u26-dim">{item.kicker}</span>
        <button
          aria-label="Put it back"
          className="u26-room-x"
          onClick={onClose}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path {...line} d="M6 6 L18 18 M18 6 L6 18" strokeWidth="3" />
          </svg>
        </button>
      </div>
      <div className="u26-room-card-head">
        <span aria-hidden="true" className="u26-room-pin">
          <Glyph id={item.id} />
        </span>
        <div>
          <p className="u26-hand u26-room-thing">{item.thing}</p>
          <h2 className="u26-display u26-room-title" id="u26-room-card-title">
            {item.title}
          </h2>
        </div>
      </div>
      <p className="u26-room-body">{item.body}</p>
      {item.stats.length > 0 ? (
        <dl className="u26-room-stats">
          {item.stats.map((stat) => (
            <div key={stat.label}>
              <dd className="u26-num">{stat.value}</dd>
              <dt>{stat.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}
      <div className="u26-room-card-foot">
        {item.href ? (
          <a
            className="u26-btn u26-btn--accent"
            href={item.href}
            rel={outside ? "noopener noreferrer" : undefined}
            target={outside ? "_blank" : undefined}
          >
            {item.go} <span aria-hidden="true">{outside ? "↗" : "→"}</span>
          </a>
        ) : null}
        <button className="u26-btn" onClick={onNext} type="button">
          {nextLabel} <span aria-hidden="true">→</span>
        </button>
      </div>
      {fresh ? (
        <span aria-hidden="true" className="u26-room-stamp">
          Unlocked
        </span>
      ) : null}
    </aside>
  );
}

function Meter({
  found,
  total,
  sound,
  onSound,
}: {
  found: number;
  total: number;
  sound: boolean;
  onSound: () => void;
}) {
  const all = found === total && total > 0;
  const meter: Vars = { "--have": found / Math.max(1, total) };
  return (
    <div className="u26-room-bar-right">
      <p
        aria-live="polite"
        className={`u26-room-count ${all ? "u26-room-count--all" : ""}`}
        style={meter}
      >
        <span className="u26-num">
          {found}
          <small> / {total}</small>
        </span>
        <span className="u26-kicker">{all ? "all found" : "found"}</span>
        <i aria-hidden="true" />
      </p>
      <button
        aria-label={sound ? "Turn sound off" : "Turn sound on"}
        aria-pressed={sound}
        className="u26-room-sound"
        onClick={onSound}
        type="button"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M3.5 9.5 H7 L12 5 V19 L7 14.5 H3.5Z" fill="currentColor" />
          {sound ? (
            <path
              {...line}
              d="M15.5 9 a4.5 4.5 0 0 1 0 6 M18 6 a8.5 8.5 0 0 1 0 12"
            />
          ) : (
            <path {...line} d="M16 9.5 L21 14.5 M21 9.5 L16 14.5" />
          )}
        </svg>
      </button>
    </div>
  );
}

/** Everything in the room as a plain list, for when it cannot be drawn */
function Plain({ items }: { items: RoomItem[] }) {
  return (
    <div className="u26-room-plain">
      <p className="u26-tag">My room</p>
      <h2 className="u26-display">The room would not open here</h2>
      <p>
        This browser could not draw it in 3D, so here is everything that was
        inside.
      </p>
      <ul>
        {items.map((item) => {
          const vars: Vars = { "--accent": item.ink };
          return (
            <li className="u26-card" key={item.id} style={vars}>
              <span aria-hidden="true" className="u26-room-pin">
                <Glyph id={item.id} />
              </span>
              <div>
                <p className="u26-kicker u26-dim">{item.kicker}</p>
                <h3 className="u26-head">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** One slot for each find. A slot also takes you to its find. */
function Tray({
  items,
  found,
  selected,
  onPick,
}: {
  items: RoomItem[];
  found: string[];
  selected: string | null;
  onPick: (id: string) => void;
}) {
  return (
    <nav aria-label="What there is to find" className="u26-room-tray">
      <ol>
        {items.map((item, i) => {
          const have = found.includes(item.id);
          const vars: Vars = { "--accent": item.ink };
          return (
            <li key={item.id}>
              <button
                aria-current={selected === item.id}
                aria-label={
                  have
                    ? `${item.thing}: ${item.title}`
                    : `Find number ${i + 1}, not found yet. Press to be taken to it.`
                }
                className="u26-room-slot"
                data-have={have}
                data-item={item.id}
                onClick={() => onPick(item.id)}
                style={vars}
                title={have ? item.thing : "Not found yet"}
                type="button"
              >
                {have ? (
                  <Glyph id={item.id} />
                ) : (
                  <span aria-hidden="true">?</span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** How to play, shown until the first thing is touched */
function Hint() {
  return (
    <p className="u26-hand u26-room-hint">
      <span className="u26-room-hint-mouse">
        drag to look around, scroll to zoom
      </span>
      <span className="u26-room-hint-touch">
        drag to look around, pinch to zoom
      </span>
      <b>then pick up anything with a gem over it</b>
    </p>
  );
}

/** The card for finding every last thing */
function Done({
  total,
  onClose,
  onRestart,
}: {
  total: number;
  onClose: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="u26-card u26-room-card u26-room-done">
      <p className="u26-tag u26-tag--foil">Room cleared</p>
      <h2 className="u26-display">
        {total} of {total}
      </h2>
      <p>You found everything in here. That is the whole year.</p>
      <div className="u26-room-card-foot">
        <button
          className="u26-btn u26-btn--foil"
          onClick={onClose}
          type="button"
        >
          Back to the Wrapped
        </button>
        <button className="u26-btn" onClick={onRestart} type="button">
          Start over
        </button>
      </div>
    </div>
  );
}

/** Tell the camera how much of the screen the card covers */
function useCardInsets(
  handle: RefObject<RoomHandle | null>,
  card: RefObject<HTMLElement | null>,
  selected: string | null,
  ready: boolean
) {
  useEffect(() => {
    const room = handle.current;
    if (!(room && ready)) {
      return;
    }
    const measure = () => {
      const el = card.current;
      if (!(el && selected)) {
        room.setInsets(0, 0);
        return;
      }
      // Layout sizes, so the card's entrance does not skew the reading
      if (window.innerWidth >= 900) {
        room.setInsets(el.offsetLeft + el.offsetWidth, 0);
      } else {
        room.setInsets(0, Math.max(0, window.innerHeight - el.offsetTop));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [handle, card, selected, ready]);
}

/** Escape puts the card back first, then leaves the room */
function useEscape(act: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        act();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [act]);
}

/** What the tag over the pointer says */
function tagFor(items: RoomItem[], id: string | null) {
  if (!id) {
    return "";
  }
  return items.find((i) => i.id === id)?.thing ?? TOYS[id] ?? "";
}

/** What shows in place of the room while it loads, or if it cannot load */
function Standby({ status, items }: { status: Status; items: RoomItem[] }) {
  if (status === "loading") {
    return (
      <output className="u26-room-veil">
        <span className="u26-hand">tidying up the room...</span>
      </output>
    );
  }
  return status === "failed" ? <Plain items={items} /> : null;
}

export function RoomMode({
  data,
  onClose,
}: {
  data: WrappedData;
  onClose: () => void;
}) {
  const items = useMemo(() => roomItems(data), [data]);
  const ids = useMemo(() => new Set(items.map((i) => i.id)), [items]);

  const [status, setStatus] = useState<Status>("loading");
  const [found, setFound] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [fresh, setFresh] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [sound, setSound] = useState(true);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);
  const [festive, setFestive] = useState(false);

  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  const card = useRef<HTMLElement>(null);
  const handle = useRef<RoomHandle | null>(null);
  const audio = useRef<Sound | null>(null);
  const foundRef = useRef<string[]>([]);

  // What was found on an earlier visit
  useEffect(() => {
    const saved = readFound(ids);
    foundRef.current = saved;
    setFound(saved);
    setSound(window.localStorage.getItem(STORE_SOUND) !== "off");
    audio.current = createSound();
    stage.current?.focus({ preventScroll: true });
    return () => audio.current?.dispose();
  }, [ids]);

  useEffect(() => {
    audio.current?.setOn(sound);
  }, [sound]);

  /** Everything that happens when a find is picked up, wherever from */
  const collect = useCallback(
    (id: string) => {
      setTouched(true);
      setSelected(id);
      const have = foundRef.current;
      if (have.includes(id)) {
        setFresh(null);
        audio.current?.pick();
        return;
      }
      const next = [...have, id];
      foundRef.current = next;
      setFound(next);
      setFresh(id);
      try {
        window.localStorage.setItem(STORE, JSON.stringify(next));
      } catch {
        // Private windows may refuse; the count still works for this visit
      }
      handle.current?.setFound(next);
      if (next.length === ids.size) {
        setDone(true);
        audio.current?.fanfare();
        handle.current?.celebrate();
      } else {
        audio.current?.unlock();
      }
    },
    [ids]
  );

  // Fetch three.js and the scene, then build the room
  useEffect(() => {
    const el = canvas.current;
    const tag = label.current;
    const root = stage.current;
    if (!(el && tag && root)) {
      return;
    }
    let live = true;
    let made: RoomHandle | null = null;
    const css = getComputedStyle(root);
    const fonts = {
      display:
        css.getPropertyValue("--font-u26-display").trim() || "sans-serif",
      body: css.getPropertyValue("--font-u26-body").trim() || "sans-serif",
      hand: css.getPropertyValue("--font-u26-hand").trim() || "cursive",
    };
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dressed = isFestive();
    setFestive(dressed);
    const ready = Promise.all([
      import("./scene"),
      ...Object.values(fonts).map((family) =>
        document.fonts.load(`700 40px ${family}`).catch(() => undefined)
      ),
    ]);
    ready
      .then(([scene]) =>
        scene.createRoom({
          canvas: el,
          label: tag,
          data,
          fonts,
          dark: document.documentElement.classList.contains("dark"),
          still,
          festive: dressed,
          found: foundRef.current,
          onHover: setHover,
          onPick: (id, isFind) => {
            if (isFind) {
              collect(id);
            } else {
              setTouched(true);
              audio.current?.poke();
            }
          },
        })
      )
      .then((room) => {
        if (!live) {
          room.dispose();
          return;
        }
        made = room;
        handle.current = room;
        setStatus("ready");
      })
      .catch(() => {
        if (live) {
          setStatus("failed");
        }
      });
    return () => {
      live = false;
      handle.current = null;
      made?.dispose();
    };
  }, [data, collect]);

  // Follow the site's light and dark switch
  useEffect(() => {
    const html = document.documentElement;
    const sync = () => handle.current?.setDark(html.classList.contains("dark"));
    const watch = new MutationObserver(sync);
    watch.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => watch.disconnect();
  }, []);

  useCardInsets(handle, card, selected, status === "ready");

  const pick = useCallback(
    (id: string) => {
      handle.current?.select(id);
      collect(id);
    },
    [collect]
  );

  const putBack = useCallback(() => {
    setSelected(null);
    setFresh(null);
    handle.current?.select(null);
  }, []);

  useEscape(selected ? putBack : onClose);

  const startOver = () => {
    foundRef.current = [];
    setFound([]);
    setDone(false);
    putBack();
    handle.current?.setFound([]);
    try {
      window.localStorage.removeItem(STORE);
    } catch {
      // Nothing was saved, so there is nothing to clear
    }
  };

  const toggleSound = () => {
    setSound((on) => {
      try {
        window.localStorage.setItem(STORE_SOUND, on ? "off" : "on");
      } catch {
        // The switch still works for this visit
      }
      return !on;
    });
  };

  const current = items.find((i) => i.id === selected);
  const missing = items.filter((i) => !found.includes(i.id));
  const next = () => {
    const at = items.findIndex((i) => i.id === selected);
    const after = [...items.slice(at + 1), ...items.slice(0, at + 1)];
    const target = after.find((i) => !found.includes(i.id)) ?? after[0];
    if (target) {
      pick(target.id);
    }
  };
  const tagText = tagFor(items, hover);

  return (
    <div
      className="u26-room"
      data-festive={festive}
      data-status={status}
      ref={stage}
      tabIndex={-1}
    >
      <div aria-hidden="true" className="u26-room-sky" />
      <canvas
        aria-label="A small model of my room. Drag to look around, and press things to pick them up."
        className="u26-room-canvas"
        ref={canvas}
        role="img"
      />
      <p
        aria-hidden="true"
        className="u26-tag u26-tag--paper u26-room-label"
        data-on={Boolean(tagText)}
        ref={label}
      >
        {tagText}
      </p>

      <header className="u26-room-bar">
        <button
          className="u26-home u26-room-back"
          onClick={onClose}
          type="button"
        >
          <span aria-hidden="true">←</span> Back
          <span className="u26-room-back-more">to the Wrapped</span>
        </button>
        {status === "failed" ? null : (
          <Meter
            found={found.length}
            onSound={toggleSound}
            sound={sound}
            total={items.length}
          />
        )}
      </header>

      <Standby items={items} status={status} />

      {status === "ready" ? (
        <>
          {touched || found.length > 0 ? null : <Hint />}

          {current ? (
            <Card
              cardRef={card}
              fresh={fresh === current.id}
              item={current}
              key={current.id}
              nextLabel={missing.length > 0 ? "Find the next one" : "Next"}
              onClose={putBack}
              onNext={next}
            />
          ) : null}

          {done && !current ? (
            <Done
              onClose={onClose}
              onRestart={startOver}
              total={items.length}
            />
          ) : null}

          <Tray found={found} items={items} onPick={pick} selected={selected} />
        </>
      ) : null}
    </div>
  );
}
