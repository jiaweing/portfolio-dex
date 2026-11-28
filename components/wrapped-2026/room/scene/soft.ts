import {
  BufferGeometry,
  Float32BufferAttribute,
  Shape,
  ShapeGeometry,
} from "three";

/* Soft shapes. Nothing in the room has a hard corner: a box is a slab with
   rounded corners and rolled edges, a cylinder has rolled rims. Each shape
   carries its own normals, so a flat face stays flat and an edge shades like
   a curve, and each is only as fine as its size needs. */

export type Axis = "x" | "y" | "z";

export interface SoftBox {
  /** How far every edge is rolled over */
  r?: number;
  /** The four corners seen along `axis`, or one each, going round from +x +z.
      Never tighter than `r`. */
  corner?: number | [number, number, number, number];
  /** The way the slab faces. Left out, a thin box faces its thin way. */
  axis?: Axis;
  /** Keep the edge on the far side of `axis` square, to stand flush */
  flush?: boolean;
}

const QUARTER = Math.PI / 2;

const arcSteps = (radius: number) => {
  if (radius < 0.012) {
    return 2;
  }
  if (radius < 0.05) {
    return 4;
  }
  return radius < 0.12 ? 6 : 8;
};

const rollSteps = (radius: number) => {
  if (radius < 0.008) {
    return 1;
  }
  return radius < 0.03 ? 2 : 3;
};

class Mesher {
  pos: number[] = [];
  nor: number[] = [];
  idx: number[] = [];

  get count() {
    return this.pos.length / 3;
  }

  vert(x: number, y: number, z: number, nx: number, ny: number, nz: number) {
    this.pos.push(x, y, z);
    this.nor.push(nx, ny, nz);
    return this.count - 1;
  }

  /** Joins two rings of `n` points, the first one above the second */
  band(upper: number, lower: number, n: number) {
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      this.idx.push(upper + i, upper + j, lower + i);
      this.idx.push(upper + j, lower + j, lower + i);
    }
  }

  /** Closes a ring with a fan. `up` says which way the lid faces. */
  lid(centre: number, ring: number, n: number, up: boolean) {
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      if (up) {
        this.idx.push(centre, ring + j, ring + i);
      } else {
        this.idx.push(centre, ring + i, ring + j);
      }
    }
  }

  build(turn: (v: number[], i: number) => void, size: number[]) {
    for (let i = 0; i < this.pos.length; i += 3) {
      turn(this.pos, i);
      turn(this.nor, i);
    }
    // One strip of texture along the longest side, for the foil
    const long = size.indexOf(Math.max(...size));
    const uv: number[] = [];
    for (let i = 0; i < this.pos.length; i += 3) {
      uv.push(this.pos[i + long] / size[long] + 0.5, 0.5);
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(this.pos, 3));
    geo.setAttribute("normal", new Float32BufferAttribute(this.nor, 3));
    geo.setAttribute("uv", new Float32BufferAttribute(uv, 2));
    geo.setIndex(this.idx);
    return geo;
  }
}

const TURNS: Record<Axis, (v: number[], i: number) => void> = {
  y: () => undefined,
  // The slab is built facing up, then turned to face along x or z
  x: (v, i) => {
    const [a, b, c] = [v[i], v[i + 1], v[i + 2]];
    v[i] = b;
    v[i + 1] = c;
    v[i + 2] = a;
  },
  z: (v, i) => {
    const [a, b, c] = [v[i], v[i + 1], v[i + 2]];
    v[i] = c;
    v[i + 1] = a;
    v[i + 2] = b;
  },
};

function pickAxis(size: [number, number, number]): Axis {
  const [w, h] = size;
  const sorted = [...size].sort((p, q) => p - q);
  if (sorted[0] >= sorted[1] * 0.45 || sorted[0] === h) {
    return "y";
  }
  return sorted[0] === w ? "x" : "z";
}

/** A box as its slab sees it: how thick, then half of each side of its face */
function slabOf([w, h, d]: [number, number, number], axis: Axis) {
  if (axis === "x") {
    return { tall: w, a: d / 2, c: h / 2 };
  }
  if (axis === "z") {
    return { tall: d, a: h / 2, c: w / 2 };
  }
  return { tall: h, a: w / 2, c: d / 2 };
}

/** The outline of a rounded rectangle: for each point its place, then the
    way it faces */
function outline(a: number, c: number, radii: number[], steps: number) {
  const ring: number[] = [];
  for (let k = 0; k < 4; k++) {
    const sx = k === 0 || k === 3 ? 1 : -1;
    const sz = k < 2 ? 1 : -1;
    for (let j = 0; j <= steps; j++) {
      const t = (k + j / steps) * QUARTER;
      const nx = Math.cos(t);
      const nz = Math.sin(t);
      ring.push(
        sx * (a - radii[k]) + radii[k] * nx,
        sz * (c - radii[k]) + radii[k] * nz,
        nx,
        nz
      );
    }
  }
  return ring;
}

/** A box with rounded corners and rolled edges, centred on the origin */
export function softBox(size: [number, number, number], o: SoftBox = {}) {
  const axis = o.axis ?? pickAxis(size);
  const { tall, a, c } = slabOf(size, axis);
  const face = Math.min(a, c);
  const r = Math.min(
    o.r ?? Math.min(0.03, Math.min(...size) * 0.42),
    tall / 2,
    face * 0.98
  );
  const want = o.corner ?? Math.min(0.05, face * 0.36);
  const each = Array.isArray(want);
  // Corners that differ only have to fit beside each other
  const most = each ? face * 2 - r : face * 0.98;
  const radii = (each ? want : [want, want, want, want]).map((n) =>
    Math.min(Math.max(n, r), most)
  );
  const steps = arcSteps(Math.max(...radii));
  const n = 4 * (steps + 1);
  const ring = outline(a, c, radii, steps);

  const mesh = new Mesher();
  const rows: number[] = [];
  const row = (inset: number, y: number, out: number, up: number) => {
    rows.push(mesh.count);
    for (let i = 0; i < n; i++) {
      const [x, z, nx, nz] = ring.slice(i * 4, i * 4 + 4);
      mesh.vert(x - nx * inset, y, z - nz * inset, nx * out, up, nz * out);
    }
  };
  const roll = (radius: number, side: 1 | -1) => {
    const count = rollSteps(radius);
    for (let k = 0; k <= count; k++) {
      const step = side === 1 ? k : count - k;
      const t = (step / count) * QUARTER;
      row(
        radius * (1 - Math.sin(t)),
        side * (tall / 2 - radius * (1 - Math.cos(t))),
        Math.sin(t),
        side * Math.cos(t)
      );
    }
  };
  roll(r, 1);
  roll(o.flush ? 0 : r, -1);
  for (let i = 0; i + 1 < rows.length; i++) {
    mesh.band(rows[i], rows[i + 1], n);
  }
  mesh.lid(mesh.vert(0, tall / 2, 0, 0, 1, 0), rows[0], n, true);
  mesh.lid(mesh.vert(0, -tall / 2, 0, 0, -1, 0), rows.at(-1) ?? 0, n, false);
  return mesh.build(TURNS[axis], size);
}

/** A cylinder or cone with rolled rims, centred on the origin */
export function softCyl(
  top: number,
  bottom: number,
  height: number,
  roll?: number
) {
  // A cone ends in a small round tip, not a point
  const rt = Math.max(top, bottom * 0.12);
  const rb = Math.max(bottom, top * 0.12);
  const wide = Math.max(rt, rb);
  const want = roll ?? Math.min(0.025, wide * 0.4, height * 0.42);
  const bt = Math.min(want, rt * 0.9, height * 0.48);
  const bb = Math.min(want, rb * 0.9, height * 0.48);
  const sides = Math.round(Math.min(28, Math.max(9, 8 + wide * 120)));
  // The centres the two rims turn about, and the lean of the side between
  const ct = rt - bt;
  const cb = rb - bb;
  const lean = Math.atan2(cb - ct, height - bt - bb);

  const mesh = new Mesher();
  const rows: number[] = [];
  const row = (radius: number, y: number, t: number) => {
    rows.push(mesh.count);
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2;
      const nx = Math.cos(a);
      const nz = Math.sin(a);
      mesh.vert(
        radius * nx,
        y,
        radius * nz,
        nx * Math.cos(t),
        Math.sin(t),
        nz * Math.cos(t)
      );
    }
  };
  const upper = rollSteps(bt);
  for (let k = 0; k <= upper; k++) {
    const t = QUARTER + (lean - QUARTER) * (k / upper);
    row(ct + bt * Math.cos(t), height / 2 - bt + bt * Math.sin(t), t);
  }
  const lower = rollSteps(bb);
  for (let k = 0; k <= lower; k++) {
    const t = lean + (-QUARTER - lean) * (k / lower);
    row(cb + bb * Math.cos(t), -height / 2 + bb + bb * Math.sin(t), t);
  }
  for (let i = 0; i + 1 < rows.length; i++) {
    mesh.band(rows[i], rows[i + 1], sides);
  }
  mesh.lid(mesh.vert(0, height / 2, 0, 0, 1, 0), rows[0], sides, true);
  mesh.lid(
    mesh.vert(0, -height / 2, 0, 0, -1, 0),
    rows.at(-1) ?? 0,
    sides,
    false
  );
  return mesh.build(TURNS.y, [wide * 2, height, wide * 2]);
}

/** A flat picture with rounded corners, facing +z */
export function softPlane(w: number, h: number, radius: number) {
  const r = Math.min(radius, w / 2, h / 2);
  const x = w / 2;
  const y = h / 2;
  const outline = new Shape();
  outline.moveTo(-x + r, -y);
  outline.lineTo(x - r, -y);
  outline.absarc(x - r, -y + r, r, -QUARTER, 0, false);
  outline.lineTo(x, y - r);
  outline.absarc(x - r, y - r, r, 0, QUARTER, false);
  outline.lineTo(-x + r, y);
  outline.absarc(-x + r, y - r, r, QUARTER, Math.PI, false);
  outline.lineTo(-x, -y + r);
  outline.absarc(-x + r, -y + r, r, Math.PI, Math.PI * 1.5, false);
  const geo = new ShapeGeometry(outline, 5);
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, uv.getX(i) / w + 0.5, uv.getY(i) / h + 0.5);
  }
  return geo;
}
