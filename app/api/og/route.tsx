import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Jia Wei Ng";
    const subtitle =
      searchParams.get("subtitle") ||
      "a serial entrepreneur, designer & software engineer";
    const type = searchParams.get("type") || ""; // "blog" | "project" | ""

    const CELL = 48;
    const COLS = Math.ceil(1200 / CELL) + 1;
    const ROWS = Math.ceil(630 / CELL) + 1;

    const gridLines: React.ReactNode[] = [];
    for (let c = 0; c <= COLS; c++) {
      gridLines.push(
        <div
          key={`v${c}`}
          style={{
            position: "absolute",
            left: c * CELL,
            top: 0,
            width: 1,
            height: "100%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
      );
    }
    for (let r = 0; r <= ROWS; r++) {
      gridLines.push(
        <div
          key={`h${r}`}
          style={{
            position: "absolute",
            top: r * CELL,
            left: 0,
            height: 1,
            width: "100%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
      );
    }

    const dotPositions = [
      { left: 0, top: 0 },
      { left: CELL * 3, top: CELL * 3 },
      { right: 0, top: 0 },
      { right: CELL * 3, top: CELL * 3 },
      { left: 0, bottom: 0 },
      { right: 0, bottom: 0 },
      { left: CELL * 6, bottom: CELL * 2 },
      { right: CELL * 6, top: CELL * 2 },
    ];

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0a0a",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* grid */}
        {gridLines}

        {/* accent dot nodes */}
        {dotPositions.map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              ...pos,
            }}
          />
        ))}

        {/* top-left corner bracket */}
        <div
          style={{
            position: "absolute",
            left: 48,
            top: 48,
            width: 32,
            height: 32,
            borderLeft: "2px solid rgba(255,255,255,0.4)",
            borderTop: "2px solid rgba(255,255,255,0.4)",
          }}
        />
        {/* top-right corner bracket */}
        <div
          style={{
            position: "absolute",
            right: 48,
            top: 48,
            width: 32,
            height: 32,
            borderRight: "2px solid rgba(255,255,255,0.4)",
            borderTop: "2px solid rgba(255,255,255,0.4)",
          }}
        />
        {/* bottom-left corner bracket */}
        <div
          style={{
            position: "absolute",
            left: 48,
            bottom: 48,
            width: 32,
            height: 32,
            borderLeft: "2px solid rgba(255,255,255,0.4)",
            borderBottom: "2px solid rgba(255,255,255,0.4)",
          }}
        />
        {/* bottom-right corner bracket */}
        <div
          style={{
            position: "absolute",
            right: 48,
            bottom: 48,
            width: 32,
            height: 32,
            borderRight: "2px solid rgba(255,255,255,0.4)",
            borderBottom: "2px solid rgba(255,255,255,0.4)",
          }}
        />

        {/* content */}
        <div
          style={{
            position: "absolute",
            inset: 96,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* type tag */}
          {type ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 4,
                  padding: "4px 12px",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {type}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}

          {/* main text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: title.length > 50 ? 44 : title.length > 30 ? 54 : 64,
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                maxWidth: 900,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  fontSize: 22,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.4,
                  maxWidth: 700,
                  fontWeight: 400,
                }}
              >
                {subtitle}
              </div>
            )}
          </div>

          {/* footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#0a0a0a",
                  letterSpacing: "-0.04em",
                }}
              >
                JW
              </div>
              <span
                style={{
                  fontSize: 18,
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 500,
                }}
              >
                jiaweing.com
              </span>
            </div>

            {/* decorative horizontal rule */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 1,
                  background: "rgba(255,255,255,0.2)",
                }}
              />
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.3)",
                }}
              />
            </div>
          </div>
        </div>
      </div>,
      { width: 1200, height: 630 }
    );
  } catch (e) {
    console.error("OG image generation failed:", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
