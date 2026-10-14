"use client";

import { motion, useMotionValue } from "framer-motion";
import { PenLine, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  type InkStroke,
  SignaturePad,
  strokePath,
} from "@/components/arc/signature-pad/signature-pad";
import { SeasonalEmoji } from "@/components/SeasonalEmoji";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { GuestbookEntry } from "@/lib/guestbook";
import { cn } from "@/lib/utils";

const OWNED_KEY = "guestbook:owned";
const BOARD_HEIGHT = 1400;
const SIGNATURE_WIDTH = 180;

// Pad ink colours, lifted so they read on both themes. Black follows the text colour.
const INK_FILL: Record<GuestbookEntry["paths"][number]["color"], string> = {
  black: "currentColor",
  blue: "#4f7cff",
  violet: "#8b5cf6",
};

type Owned = Record<string, string>;

function readOwned(): Owned {
  try {
    return JSON.parse(localStorage.getItem(OWNED_KEY) ?? "{}") as Owned;
  } catch {
    return {};
  }
}

function writeOwned(owned: Owned) {
  try {
    localStorage.setItem(OWNED_KEY, JSON.stringify(owned));
  } catch {
    // Storage blocked, ownership lasts for this visit only
  }
}

// Tight, padded bounds of the ink so stored signatures are cropped
function inkBounds(strokes: InkStroke[]): [number, number, number, number] {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (const stroke of strokes) {
    for (const p of stroke.points) {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }
  }
  const pad = 12;
  return [
    Math.floor(minX - pad),
    Math.floor(minY - pad),
    Math.ceil(maxX - minX + pad * 2),
    Math.ceil(maxY - minY + pad * 2),
  ];
}

const clamp = (v: number) => Math.min(0.95, Math.max(0.05, v));

function Signature({
  entry,
  owned,
  boardRef,
  onMove,
  onDelete,
}: {
  entry: GuestbookEntry;
  owned: boolean;
  boardRef: React.RefObject<HTMLDivElement | null>;
  onMove: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
}) {
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [, , w, h] = entry.viewBox;
  const height = (SIGNATURE_WIDTH * h) / w;

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "group absolute text-foreground",
        owned ? "z-20 cursor-grab active:cursor-grabbing" : "z-10"
      )}
      drag={owned}
      dragConstraints={boardRef}
      dragElastic={0.05}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.9 }}
      onDragEnd={() => {
        const board = boardRef.current?.getBoundingClientRect();
        const self = ref.current?.getBoundingClientRect();
        if (!(board && self)) return;
        const x = clamp(
          (self.left + self.width / 2 - board.left) / board.width
        );
        const y = clamp(
          (self.top + self.height / 2 - board.top) / board.height
        );
        // Commit the new spot, then drop the drag offset so it doesn't double up
        onMove(entry.id, x, y);
        dx.set(0);
        dy.set(0);
      }}
      ref={ref}
      style={{
        left: `${entry.x * 100}%`,
        top: `${entry.y * 100}%`,
        x: dx,
        y: dy,
        translateX: "-50%",
        translateY: "-50%",
        rotate: entry.rotation,
      }}
      whileDrag={{ scale: 1.05 }}
    >
      <div
        className={cn(
          "relative rounded-xl px-2 pt-1 pb-1.5 transition-colors",
          owned &&
            "ring-1 ring-dashed ring-foreground/10 hover:bg-muted/40 group-active:bg-muted/40"
        )}
      >
        <svg
          aria-label={entry.name ? `Signed by ${entry.name}` : "Signature"}
          height={height}
          role="img"
          viewBox={entry.viewBox.join(" ")}
          width={SIGNATURE_WIDTH}
        >
          {entry.paths.map((p, i) => (
            <path d={p.d} fill={INK_FILL[p.color]} key={`${entry.id}-${i}`} />
          ))}
        </svg>
        {entry.name && (
          <p className="text-center text-muted-foreground text-xs">
            {entry.name}
          </p>
        )}
        {owned && (
          <button
            aria-label="Remove my signature"
            className="absolute -top-2 -right-2 hidden size-5 items-center justify-center rounded-full bg-foreground text-background group-hover:flex"
            onClick={() => onDelete(entry.id)}
            onPointerDown={(e) => e.stopPropagation()}
            type="button"
          >
            <X className="size-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function GuestbookBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [owned, setOwned] = useState<Owned>({});
  const [status, setStatus] = useState<"loading" | "ready" | "offline">(
    "loading"
  );
  const [open, setOpen] = useState(false);
  const [strokes, setStrokes] = useState<InkStroke[]>([]);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setOwned(readOwned());
    fetch("/api/guestbook")
      .then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { entries: GuestbookEntry[] };
        setEntries(data.entries);
        setStatus("ready");
      })
      .catch(() => setStatus("offline"));
  }, []);

  const onMove = useCallback(
    (id: string, x: number, y: number) => {
      setEntries((list) => list.map((e) => (e.id === id ? { ...e, x, y } : e)));
      const token = owned[id];
      if (!token) return;
      fetch(`/api/guestbook/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, x, y }),
      }).catch(() => {
        // Position stays local until the next successful move
      });
    },
    [owned]
  );

  const onDelete = useCallback(
    (id: string) => {
      const token = owned[id];
      if (!token) return;
      setEntries((list) => list.filter((e) => e.id !== id));
      fetch(`/api/guestbook/${id}`, {
        method: "DELETE",
        headers: { "x-guestbook-token": token },
      }).then((res) => {
        if (!res.ok) return;
        const next = { ...owned };
        delete next[id];
        setOwned(next);
        writeOwned(next);
      });
    },
    [owned]
  );

  const submit = async () => {
    if (!strokes.length) return;
    setSaving(true);
    setError(null);

    // Land the new signature in the middle of what the visitor is looking at
    const board = boardRef.current?.getBoundingClientRect();
    const centerY = board
      ? (window.innerHeight / 2 - board.top) / board.height
      : 0.5;
    const jitter = () => (Math.random() - 0.5) * 0.12;

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          // Taps too small to outline come back empty, so leave them out
          paths: strokes
            .map((s) => ({ d: strokePath(s), color: s.color }))
            .filter((p) => p.d.length > 0),
          viewBox: inkBounds(strokes),
          x: clamp(0.5 + jitter()),
          y: clamp(centerY + jitter()),
        }),
      });
      const data = (await res.json()) as {
        entry?: GuestbookEntry;
        token?: string;
        error?: string;
      };
      if (!(res.ok && data.entry && data.token)) {
        throw new Error(data.error ?? "Could not save your signature");
      }
      const next = { ...owned, [data.entry.id]: data.token };
      setOwned(next);
      writeOwned(next);
      setEntries((list) => [...list, data.entry as GuestbookEntry]);
      setOpen(false);
      setStrokes([]);
      setName("");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not save your signature"
      );
    } finally {
      setSaving(false);
    }
  };

  const mine = entries.filter((e) => owned[e.id]).length;

  return (
    <>
      {/* The whole page is the wall: full bleed, starting under the site header */}
      <div
        className="relative -mt-20 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:18px_18px]"
        ref={boardRef}
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          height: BOARD_HEIGHT,
          minHeight: "100svh",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pt-24">
          <div className="pointer-events-auto mx-auto max-w-2xl space-y-1">
            <h1 className="flex items-center gap-1.5 font-semibold">
              guestbook
              <SeasonalEmoji size={16} />
            </h1>
            <p className="text-muted-foreground text-sm">
              Leave your mark. Sign, then drag your signature anywhere on the
              page.
              {mine > 0 &&
                ` You have ${mine} here, they stay movable from this browser.`}
            </p>
          </div>
        </div>

        {status === "loading" && (
          <p className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            Loading signatures...
          </p>
        )}
        {status === "offline" && (
          <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-muted-foreground text-sm">
            The guestbook isn't open yet. Check back soon.
          </p>
        )}
        {status === "ready" && entries.length === 0 && (
          <p className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            No signatures yet. Be the first.
          </p>
        )}
        {entries.map((entry) => (
          <Signature
            boardRef={boardRef}
            entry={entry}
            key={entry.id}
            onDelete={onDelete}
            onMove={onMove}
            owned={Boolean(owned[entry.id])}
          />
        ))}
      </div>

      {/* Always reachable while scrolling around the wall */}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center lg:bottom-8">
        <Button
          className="pointer-events-auto shadow-lg"
          disabled={status !== "ready"}
          onClick={() => setOpen(true)}
        >
          <PenLine />
          Sign the guestbook
        </Button>
      </div>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="sm:max-w-xl">
          <DialogTitle>Sign the guestbook</DialogTitle>
          <DialogDescription>
            Your signature goes on the wall for everyone to see.
          </DialogDescription>
          <SignaturePad onChange={setStrokes} />
          <Input
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            value={name}
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button disabled={!strokes.length || saving} onClick={submit}>
            {saving ? "Adding..." : "Add to the wall"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
