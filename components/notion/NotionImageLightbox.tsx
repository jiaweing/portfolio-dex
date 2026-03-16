"use client";

import { Minus, Plus, RotateCcw, X } from "lucide-react";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

interface Point {
  x: number;
  y: number;
}

export function NotionImageLightbox({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);
  const [offset, setOffset] = React.useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartRef = React.useRef<Point>({ x: 0, y: 0 });

  const resetView = React.useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const clampZoom = React.useCallback((value: number) => {
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
  }, []);

  const handleZoom = React.useCallback(
    (delta: number) => {
      setZoom((current) => {
        const next = clampZoom(current + delta);
        if (next === 1) {
          setOffset({ x: 0, y: 0 });
        }
        return next;
      });
    },
    [clampZoom]
  );

  const startDrag = (point: Point) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: point.x - offset.x,
      y: point.y - offset.y,
    };
  };

  const updateDrag = (point: Point) => {
    if (!isDragging || zoom <= 1) return;
    setOffset({
      x: point.x - dragStartRef.current.x,
      y: point.y - dragStartRef.current.y,
    });
  };

  const stopDrag = () => setIsDragging(false);

  React.useEffect(() => {
    if (!open) {
      resetView();
    }
  }, [open, resetView]);

  return (
    <>
      <button
        className="group relative block w-full overflow-hidden rounded-lg"
        onClick={() => setOpen(true)}
        type="button"
      >
        <img
          alt={alt}
          className={cn(
            "h-auto w-full rounded-lg transition-transform duration-300 group-hover:scale-[1.01]",
            className
          )}
          src={src}
        />
      </button>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="inset-0 top-0 left-0 z-[220] h-dvh max-h-dvh w-screen max-w-none translate-x-0 translate-y-0 border-none bg-background/95 p-0 backdrop-blur-xs sm:rounded-none [&>button]:hidden">
          <DialogTitle className="sr-only">{alt || "Image preview"}</DialogTitle>

          <div
            className="absolute top-3 right-3 z-30 flex items-center gap-2 sm:top-4 sm:right-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-1 rounded-full bg-background/80 p-1 shadow-md backdrop-blur-sm">
              <button
                aria-label="Zoom out"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => handleZoom(-ZOOM_STEP)}
                type="button"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-12 text-center font-medium text-xs tabular-nums">
                {Math.round(zoom * 100)}%
              </span>
              <button
                aria-label="Zoom in"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => handleZoom(ZOOM_STEP)}
                type="button"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                aria-label="Reset zoom"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={resetView}
                type="button"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            <button
              aria-label="Close image preview"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-background/80 text-muted-foreground shadow-md transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            className={cn(
              "flex h-full w-full items-center justify-center overflow-hidden p-4 pt-20 sm:p-8 sm:pt-24",
              zoom > 1 && "touch-none"
            )}
            onClick={() => setOpen(false)}
            onMouseMove={(event) =>
              updateDrag({ x: event.clientX, y: event.clientY })
            }
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchEnd={stopDrag}
            onTouchMove={(event) => {
              const touch = event.touches[0];
              if (!touch) return;
              updateDrag({ x: touch.clientX, y: touch.clientY });
            }}
            onWheel={(event) => {
              event.preventDefault();
              handleZoom(event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP);
            }}
          >
            <img
              alt={alt}
              className={cn(
                "max-h-full max-w-full select-none object-contain transition-transform duration-150",
                zoom > 1 && "cursor-grab",
                isDragging && "cursor-grabbing"
              )}
              draggable={false}
              onClick={(event) => event.stopPropagation()}
              onMouseDown={(event) =>
                startDrag({ x: event.clientX, y: event.clientY })
              }
              onMouseUp={stopDrag}
              onTouchStart={(event) => {
                const touch = event.touches[0];
                if (!touch) return;
                startDrag({ x: touch.clientX, y: touch.clientY });
              }}
              src={src}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
