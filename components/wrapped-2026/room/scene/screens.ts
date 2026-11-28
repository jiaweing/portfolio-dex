import { CanvasTexture, SRGBColorSpace } from "three";
import { CODE_STATS } from "@/lib/wrapped-2026-data";
import type { WrappedData } from "../../types";
import { summarise } from "../items";

/* Everything in the room that shows a picture: the screens, the signs and
   the frame. Each one is a small canvas drawn with the page's own fonts and
   inks. The data screens can be redrawn part way (0 to 1), so they can fill
   in when they are switched on. */

export interface Fonts {
  display: string;
  body: string;
  hand: string;
}

export interface Screen {
  tex: CanvasTexture;
  draw: (p: number) => void;
}

const P = {
  ink: "oklch(0.2 0.02 62)",
  ink2: "oklch(0.255 0.022 62)",
  ink3: "oklch(0.32 0.024 62)",
  paper: "oklch(0.955 0.032 88)",
  paper2: "oklch(0.915 0.042 86)",
  paper3: "oklch(0.985 0.016 90)",
  amber: "oklch(0.831 0.139 72)",
  pink: "oklch(0.699 0.226 351.9)",
  magenta: "oklch(0.674 0.289 320.6)",
  indigo: "oklch(0.649 0.189 276)",
  cyan: "oklch(0.878 0.138 202.9)",
  green: "oklch(0.896 0.184 152.9)",
  lime: "oklch(0.938 0.2 122.8)",
};
const INKS = [P.amber, P.pink, P.cyan, P.lime, P.magenta, P.green, P.indigo];
const LEVELS = [
  P.ink3,
  "oklch(0.46 0.1 135)",
  "oklch(0.63 0.15 130)",
  "oklch(0.8 0.19 126)",
  P.lime,
];

const nf = new Intl.NumberFormat("en-US");
type Ctx = CanvasRenderingContext2D;

function canvas(w: number, h: number) {
  const el = document.createElement("canvas");
  el.width = w;
  el.height = h;
  const ctx = el.getContext("2d");
  if (!ctx) {
    throw new Error("No 2D canvas");
  }
  return [el, ctx] as const;
}

function texture(el: HTMLCanvasElement) {
  const tex = new CanvasTexture(el);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function screen(
  w: number,
  h: number,
  paint: (ctx: Ctx, p: number) => void
): Screen {
  const [el, ctx] = canvas(w, h);
  const tex = texture(el);
  const draw = (p: number) => {
    ctx.clearRect(0, 0, w, h);
    paint(ctx, p);
    tex.needsUpdate = true;
  };
  draw(1);
  return { tex, draw };
}

function round(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/* Snow for the window in December: where each flake starts, how fast it
   falls and how big it is. The same every visit. */
const FLAKES = Array.from({ length: 54 }, (_, i) => {
  const unit = (n: number) =>
    Math.abs((Math.sin(i * 127.1 + n * 311.7) * 43_758.5453) % 1);
  return {
    x: unit(1) * 300,
    y: unit(2),
    fall: 0.045 + unit(3) * 0.06,
    size: 2.6 + unit(4) * 3.4,
    sway: unit(5) * 6.3,
  };
});

/** The sky outside, top and bottom: at night, on a snowy day, on a clear day */
function skyColours(night: boolean, snowy: boolean) {
  if (night) {
    return ["oklch(0.3 0.09 280)", "oklch(0.46 0.14 300)"];
  }
  if (snowy) {
    return ["oklch(0.74 0.09 238)", "oklch(0.92 0.04 225)"];
  }
  return ["oklch(0.86 0.09 215)", "oklch(0.96 0.05 95)"];
}

/** Turns the round moon into a crescent, and puts the stars out */
function nightSky(ctx: Ctx) {
  ctx.fillStyle = "oklch(0.3 0.09 280)";
  ctx.beginPath();
  ctx.arc(226, 66, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = P.paper3;
  for (const [x, y] of [
    [40, 40],
    [96, 92],
    [140, 30],
    [60, 150],
    [262, 160],
    [170, 130],
  ]) {
    ctx.fillRect(x, y, 5, 5);
  }
}

/** The winter view: white hills, three firs and the snow coming down */
function snowscape(ctx: Ctx, night: boolean, time: number) {
  const far = night ? "oklch(0.62 0.07 285)" : "oklch(0.9 0.035 235)";
  const near = night ? "oklch(0.8 0.045 285)" : P.paper3;
  const fir = night ? "oklch(0.36 0.07 200)" : "oklch(0.5 0.1 165)";
  ctx.fillStyle = far;
  ctx.beginPath();
  ctx.moveTo(0, 240);
  ctx.lineTo(0, 176);
  ctx.quadraticCurveTo(70, 132, 150, 170);
  ctx.quadraticCurveTo(230, 204, 300, 150);
  ctx.lineTo(300, 240);
  ctx.fill();
  for (const [x, y, s] of [
    [58, 168, 1],
    [96, 178, 0.7],
    [246, 176, 0.85],
  ]) {
    ctx.fillStyle = fir;
    for (let i = 0; i < 3; i++) {
      const w = (22 - i * 5) * s;
      const top = y - (26 + i * 15) * s;
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x + w, top + 24 * s);
      ctx.lineTo(x - w, top + 24 * s);
      ctx.fill();
    }
    ctx.fillStyle = near;
    ctx.beginPath();
    ctx.moveTo(x, y - 58 * s);
    ctx.lineTo(x + 8 * s, y - 44 * s);
    ctx.lineTo(x - 8 * s, y - 44 * s);
    ctx.fill();
  }
  ctx.fillStyle = near;
  ctx.beginPath();
  ctx.moveTo(0, 240);
  ctx.lineTo(0, 206);
  ctx.quadraticCurveTo(90, 176, 170, 204);
  ctx.quadraticCurveTo(240, 226, 300, 196);
  ctx.lineTo(300, 240);
  ctx.fill();
  ctx.fillStyle = night ? "oklch(0.97 0.02 280)" : "oklch(1 0 0)";
  for (const f of FLAKES) {
    const y = ((f.y + time * f.fall) % 1) * 256 - 8;
    const x = f.x + Math.sin(time * 0.8 + f.sway) * 9;
    ctx.beginPath();
    ctx.arc(x, y, f.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function createScreens(
  data: WrappedData,
  fonts: Fonts,
  /** December: snow outside the window */
  snowy = false
) {
  const display = (px: number) => `${px}px ${fonts.display}, sans-serif`;
  const body = (px: number, weight = 700) =>
    `${weight} ${px}px ${fonts.body}, sans-serif`;
  const hand = (px: number) => `${px}px ${fonts.hand}, cursive`;

  const { best, total } = summarise(data.days);
  const contributions = total || CODE_STATS.contributionsFallback;
  const times = (contributions / CODE_STATS.contributions2025).toFixed(1);

  // The year's calendar, padded so 1 January sits on its weekday row
  const first =
    data.days.length > 0
      ? new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay()
      : 0;
  const cells: (WrappedData["days"][number] | null)[] = [
    ...new Array(first).fill(null),
    ...data.days,
  ];
  const cols = Math.max(1, Math.ceil(cells.length / 7));

  /* The two desk monitors share one picture, cut down the middle */
  const MW = 1440;
  const MH = 408;
  const [master, mctx] = canvas(MW, MH);
  const [leftEl, lctx] = canvas(MW / 2, MH);
  const [rightEl, rctx] = canvas(MW / 2, MH);
  const left = texture(leftEl);
  const right = texture(rightEl);
  const drawMonitors = (p: number) => {
    const ctx = mctx;
    ctx.fillStyle = P.ink;
    ctx.fillRect(0, 0, MW, MH);
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.fillStyle = P.lime;
    ctx.font = display(104);
    ctx.fillText(nf.format(Math.round(contributions * p)), 40, 128);
    ctx.fillStyle = P.paper;
    ctx.font = body(30);
    ctx.fillText("contributions in 2026", 44, 174);

    ctx.textAlign = "right";
    ctx.fillStyle = P.amber;
    ctx.font = display(104);
    ctx.fillText(`${times}x`, MW - 40, 128);
    ctx.fillStyle = P.paper;
    ctx.font = body(30);
    ctx.fillText("last year", MW - 44, 174);

    const pitch = Math.floor((MW - 60) / cols);
    const size = pitch - 5;
    const x0 = Math.round((MW - pitch * cols + 5) / 2);
    const y0 = 206;
    const shown = Math.ceil(cols * p);
    for (let c = 0; c < shown; c++) {
      for (let r = 0; r < 7; r++) {
        const day = cells[c * 7 + r];
        if (!day) {
          continue;
        }
        ctx.fillStyle =
          best && day.date === best.date && day.count > 0
            ? P.pink
            : LEVELS[Math.min(4, Math.max(0, day.level))];
        round(ctx, x0 + c * pitch, y0 + r * pitch, size, size, 4);
        ctx.fill();
      }
    }
    lctx.drawImage(master, 0, 0);
    rctx.drawImage(master, -MW / 2, 0);
    left.needsUpdate = true;
    right.needsUpdate = true;
  };
  drawMonitors(1);

  /* The TV: the channels, biggest first */
  const rows = data.social
    .filter((s) => s.values.length > 0)
    .map((s) => ({ label: s.label, last: s.values.at(-1) ?? 0 }))
    .sort((a, b) => b.last - a.last)
    .slice(0, 5);
  const top = Math.max(1, ...rows.map((r) => r.last));
  const tv = screen(980, 550, (ctx, p) => {
    ctx.fillStyle = P.ink2;
    ctx.fillRect(0, 0, 980, 550);
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.fillStyle = P.paper;
    ctx.font = display(58);
    ctx.fillText("CHANNELS", 40, 86);
    ctx.textAlign = "right";
    ctx.fillStyle = P.paper2;
    ctx.font = body(26, 600);
    ctx.fillText(`followers, since ${data.socialSince}`, 940, 82);
    rows.forEach((row, i) => {
      const y = 132 + i * 80;
      ctx.fillStyle = P.ink3;
      round(ctx, 40, y, 900, 62, 12);
      ctx.fill();
      ctx.fillStyle = INKS[i % INKS.length];
      const w = Math.max(70, 900 * (row.last / top) * p);
      round(ctx, 40, y, w, 62, 12);
      ctx.fill();
      ctx.textAlign = "left";
      ctx.fillStyle = P.ink;
      ctx.font = body(32, 800);
      if (w > 260) {
        ctx.fillText(row.label, 62, y + 43);
      }
      ctx.textAlign = "right";
      ctx.font = display(34);
      ctx.fillStyle = w > 760 ? P.ink : P.paper;
      ctx.fillText(nf.format(Math.round(row.last * p)), 920, y + 44);
      if (w <= 260) {
        ctx.textAlign = "left";
        ctx.fillStyle = P.paper;
        ctx.font = body(32, 800);
        ctx.fillText(row.label, 40 + w + 18, y + 43);
      }
    });
  });

  /* The wide screen on the second desk: posts on the blog, month by month */
  const peak = Math.max(1, ...data.perMonth);
  const peakAt = data.perMonth.indexOf(peak);
  const posts = screen(696, 408, (ctx, p) => {
    ctx.fillStyle = P.ink;
    ctx.fillRect(0, 0, 696, 408);
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.fillStyle = P.pink;
    round(ctx, 30, 30, 132, 44, 8);
    ctx.fill();
    ctx.fillStyle = P.ink;
    ctx.font = body(24, 800);
    ctx.fillText("ON AIR", 46, 61);
    ctx.fillStyle = P.amber;
    ctx.font = display(118);
    ctx.fillText(nf.format(Math.round(data.postTotal * p)), 26, 218);
    ctx.fillStyle = P.paper;
    ctx.font = body(30);
    ctx.fillText("posts on", 30, 272);
    ctx.fillText("the blog", 30, 310);
    const base = 338;
    const span = 270;
    data.perMonth.forEach((n, i) => {
      const h = Math.max(6, (n / peak) * span * p);
      ctx.fillStyle = i === peakAt ? P.pink : P.paper;
      round(ctx, 296 + i * 31.5, base - h, 23, h, 5);
      ctx.fill();
      ctx.fillStyle = P.paper2;
      ctx.font = body(18, 700);
      ctx.textAlign = "center";
      ctx.fillText("JFMAMJJASOND"[i], 307.5 + i * 31.5, base + 32);
    });
  });

  /* The third screen on the main desk, stood on its end: work in progress,
     drawn as bars */
  const code = screen(340, 600, (ctx) => {
    ctx.fillStyle = P.ink2;
    ctx.fillRect(0, 0, 340, 600);
    ctx.fillStyle = P.ink3;
    ctx.fillRect(0, 0, 84, 600);
    const widths = [120, 190, 100, 210, 160, 70, 200, 130, 180, 90];
    for (let i = 0; i < 18; i++) {
      ctx.fillStyle =
        i % 4 === 0 ? INKS[(i / 2) % INKS.length] : "oklch(0.5 0.03 62)";
      round(ctx, 104 + (i % 3) * 18, 36 + i * 30, widths[i % 10], 13, 6);
      ctx.fill();
    }
    for (let i = 0; i < 14; i++) {
      ctx.fillStyle = "oklch(0.45 0.03 62)";
      round(ctx, 14, 38 + i * 30, 36 + ((i * 37) % 24), 11, 5);
      ctx.fill();
    }
  });

  /* The tall screen on the second desk: a wallpaper of hills */
  const hills = screen(340, 600, (ctx) => {
    ctx.fillStyle = P.cyan;
    ctx.fillRect(0, 0, 340, 600);
    ctx.fillStyle = P.paper3;
    ctx.beginPath();
    ctx.arc(236, 132, 44, 0, Math.PI * 2);
    ctx.fill();
    const band = (fill: string, y: number, amp: number, shift: number) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(0, 600);
      for (let x = 0; x <= 340; x += 20) {
        ctx.lineTo(x, y + Math.sin(x / 70 + shift) * amp);
      }
      ctx.lineTo(340, 600);
      ctx.fill();
    };
    band(P.green, 320, 32, 0.4);
    band("oklch(0.74 0.17 150)", 410, 24, 2.2);
    band("oklch(0.56 0.13 152)", 500, 16, 4);
  });

  /* The phone: a job well finished */
  const phone = screen(170, 340, (ctx) => {
    ctx.fillStyle = P.green;
    ctx.fillRect(0, 0, 170, 340);
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(46, 176);
    ctx.lineTo(76, 208);
    ctx.lineTo(128, 142);
    ctx.stroke();
  });

  /* The front of the stream light, off and on */
  const softbox = screen(256, 256, (ctx, p) => {
    ctx.fillStyle = p > 0.5 ? P.paper3 : "oklch(0.5 0.01 80)";
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = "oklch(0.22 0.01 280)";
    ctx.lineWidth = 9;
    for (let i = 0; i <= 6; i++) {
      const v = (256 / 6) * i;
      ctx.beginPath();
      ctx.moveTo(v, 0);
      ctx.lineTo(v, 256);
      ctx.moveTo(0, v);
      ctx.lineTo(256, v);
      ctx.stroke();
    }
  });
  softbox.draw(0);

  /* The name over the door */
  const sign = screen(640, 160, (ctx) => {
    ctx.fillStyle = P.paper3;
    ctx.fillRect(0, 0, 640, 160);
    ctx.fillStyle = P.ink;
    ctx.font = display(96);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JIA WEI", 320, 86);
  });

  /* Two neon signs, drawn as glowing lines on nothing */
  const dream = screen(512, 220, (ctx) => {
    ctx.font = hand(170);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    ctx.shadowColor = P.amber;
    ctx.shadowBlur = 22;
    ctx.strokeStyle = P.amber;
    ctx.lineWidth = 12;
    ctx.strokeText("dream", 256, 104);
    ctx.shadowBlur = 0;
    ctx.fillStyle = P.paper3;
    ctx.fillText("dream", 256, 104);
  });
  const bubble = screen(256, 256, (ctx) => {
    ctx.strokeStyle = P.pink;
    ctx.fillStyle = P.pink;
    ctx.shadowColor = P.pink;
    ctx.shadowBlur = 22;
    ctx.lineWidth = 13;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.roundRect(36, 40, 184, 132, 36);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(84, 172);
    ctx.lineTo(70, 216);
    ctx.lineTo(122, 172);
    ctx.stroke();
    for (const x of [88, 128, 168]) {
      ctx.beginPath();
      ctx.arc(x, 106, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  /* The certificate in the frame */
  const diploma = screen(420, 320, (ctx) => {
    ctx.fillStyle = P.paper3;
    ctx.fillRect(0, 0, 420, 320);
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 5;
    ctx.strokeRect(16, 16, 388, 288);
    ctx.lineWidth = 2;
    ctx.strokeRect(26, 26, 368, 268);
    ctx.fillStyle = P.ink;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.font = body(21, 700);
    ctx.fillText("BSc (Hons) Computing Science", 210, 84);
    ctx.font = display(48);
    ctx.fillText("DISTINCTION", 210, 152);
    ctx.fillStyle = "oklch(0.6 0.02 62)";
    round(ctx, 96, 184, 228, 9, 4);
    ctx.fill();
    round(ctx, 130, 206, 160, 9, 4);
    ctx.fill();
    ctx.fillStyle = P.amber;
    ctx.beginPath();
    ctx.arc(328, 246, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 4;
    ctx.stroke();
  });

  /* The number on the cup */
  const n71 = screen(128, 128, (ctx) => {
    ctx.fillStyle = P.lime;
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = P.ink;
    ctx.font = display(78);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("71", 64, 70);
  });

  /* A letter Z, for the bed */
  const zed = screen(128, 128, (ctx) => {
    ctx.fillStyle = P.paper3;
    ctx.strokeStyle = P.ink;
    ctx.lineWidth = 10;
    ctx.lineJoin = "round";
    ctx.font = display(100);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText("Z", 64, 70);
    ctx.fillText("Z", 64, 70);
  });

  /* What is outside the window, by day and by night */
  const sky = (night: boolean) =>
    // Here the second number is the time, so the snow can fall
    screen(300, 240, (ctx, time) => {
      const g = ctx.createLinearGradient(0, 0, 0, 240);
      const [top, bottom] = skyColours(night, snowy);
      g.addColorStop(0, top);
      g.addColorStop(1, bottom);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 300, 240);
      ctx.fillStyle = night ? P.paper3 : P.amber;
      ctx.beginPath();
      ctx.arc(214, 74, night ? 26 : 34, 0, Math.PI * 2);
      ctx.fill();
      if (night) {
        nightSky(ctx);
      }
      if (snowy) {
        snowscape(ctx, night, time);
      }
    });

  const all = {
    left,
    right,
    drawMonitors,
    tv,
    posts,
    code,
    hills,
    phone,
    softbox,
    sign,
    dream,
    bubble,
    diploma,
    n71,
    zed,
    day: sky(false),
    night: sky(true),
  };

  const dispose = () => {
    left.dispose();
    right.dispose();
    for (const value of Object.values(all)) {
      if (typeof value === "object" && "tex" in value) {
        value.tex.dispose();
      }
    }
  };

  /** Moves the snow on. Does nothing outside December. */
  const snow = (time: number, night: boolean) => {
    if (snowy) {
      (night ? all.night : all.day).draw(time);
    }
  };

  return { ...all, snow, dispose };
}

export type Screens = ReturnType<typeof createScreens>;
