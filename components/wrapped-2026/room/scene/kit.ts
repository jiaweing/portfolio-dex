import {
  BufferGeometry,
  Color,
  DataTexture,
  Float32BufferAttribute,
  LinearFilter,
  LinearSRGBColorSpace,
  Matrix3,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshToonMaterial,
  type Object3D,
  RedFormat,
  RepeatWrapping,
  RGBAFormat,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
} from "three";
import { type SoftBox, softBox, softCyl } from "./soft";

/* The building kit for the room. Everything in the scene is made from a few
   soft shapes with one flat colour each: no hard corners and no outlines.
   Shapes that never move on their own are welded into a single mesh per
   group, so the whole room draws in well under a hundred calls and stays
   light on a laptop GPU. */

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** An OKLCH colour, as written in the page's stylesheet */
export function oklch(l: number, c: number, hDeg: number) {
  const h = (hDeg * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);
  const l1 = (l + 0.396_337_777_4 * a + 0.215_803_757_3 * b) ** 3;
  const m1 = (l - 0.105_561_345_8 * a - 0.063_854_172_8 * b) ** 3;
  const s1 = (l - 0.089_484_177_5 * a - 1.291_485_548 * b) ** 3;
  return new Color().setRGB(
    clamp01(4.076_741_662_1 * l1 - 3.307_711_591_3 * m1 + 0.230_969_929_2 * s1),
    clamp01(
      -1.268_438_004_6 * l1 + 2.609_757_401_1 * m1 - 0.341_319_396_5 * s1
    ),
    clamp01(-0.004_196_086_3 * l1 - 0.703_418_614_7 * m1 + 1.707_614_701 * s1),
    LinearSRGBColorSpace
  );
}

/* The seven spot inks: the stops of the 2026 gradient */
const STOPS: [number, number, number][] = [
  [0.831, 0.139, 72],
  [0.699, 0.226, 351.9],
  [0.674, 0.289, 320.6],
  [0.649, 0.189, 276],
  [0.878, 0.138, 202.9],
  [0.896, 0.184, 152.9],
  [0.938, 0.2, 122.8],
];

export const INK = {
  amber: oklch(...STOPS[0]),
  pink: oklch(...STOPS[1]),
  magenta: oklch(...STOPS[2]),
  indigo: oklch(...STOPS[3]),
  cyan: oklch(...STOPS[4]),
  green: oklch(...STOPS[5]),
  lime: oklch(...STOPS[6]),
  ink: oklch(0.2, 0.02, 62),
  ink2: oklch(0.255, 0.022, 62),
  paper: oklch(0.955, 0.032, 88),
  paper2: oklch(0.915, 0.042, 86),
  paper3: oklch(0.985, 0.016, 90),
};

export const INK_LIST = [
  INK.amber,
  INK.pink,
  INK.magenta,
  INK.indigo,
  INK.cyan,
  INK.green,
  INK.lime,
];

/** The 2026 gradient at t (0 to 1, loops), blended in OKLCH like the CSS one */
export function foilAt(t: number) {
  const n = STOPS.length;
  const x = (((t % 1) + 1) % 1) * n;
  const i = Math.floor(x) % n;
  const f = x - Math.floor(x);
  const a = STOPS[i];
  const b = STOPS[(i + 1) % n];
  let dh = b[2] - a[2];
  if (dh > 180) {
    dh -= 360;
  }
  if (dh < -180) {
    dh += 360;
  }
  return oklch(
    a[0] + (b[0] - a[0]) * f,
    a[1] + (b[1] - a[1]) * f,
    a[2] + dh * f
  );
}

/** The gradient as a strip texture that can slide for ever without a seam */
export function foilTexture(size = 256) {
  const data = new Uint8Array(size * 4);
  for (let i = 0; i < size; i++) {
    const c = foilAt(i / size).convertLinearToSRGB();
    data[i * 4] = Math.round(c.r * 255);
    data[i * 4 + 1] = Math.round(c.g * 255);
    data[i * 4 + 2] = Math.round(c.b * 255);
    data[i * 4 + 3] = 255;
  }
  const tex = new DataTexture(data, size, 1, RGBAFormat);
  tex.colorSpace = SRGBColorSpace;
  tex.wrapS = RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

/** Four tones of light, like a print, that melt into each other where they
    meet, so a rolled edge shades softly and never shows a hard band */
function toonSteps() {
  const tones = [124, 180, 228, 255];
  const size = 128;
  const data = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    const x = (i / (size - 1)) * tones.length - 0.5;
    const at = Math.min(tones.length - 2, Math.max(0, Math.floor(x)));
    // Flat through the middle of each tone, blended across the joins
    const t = Math.min(1, Math.max(0, (x - at - 0.5) / 0.42 + 0.5));
    const blend = t * t * (3 - 2 * t);
    data[i] = Math.round(tones[at] + (tones[at + 1] - tones[at]) * blend);
  }
  const tex = new DataTexture(data, size, 1, RedFormat);
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

export interface Mats {
  solid: MeshToonMaterial;
  /** The same paint with a warm lift, for whatever the pointer is on */
  hot: MeshToonMaterial;
  glow: MeshBasicMaterial;
  foil: MeshBasicMaterial;
  steps: DataTexture;
}

export function createMats(): Mats {
  const steps = toonSteps();
  const solid = new MeshToonMaterial({
    vertexColors: true,
    gradientMap: steps,
  });
  const hot = solid.clone();
  hot.emissive = INK.amber.clone();
  hot.emissiveIntensity = 0.16;
  return {
    steps,
    solid,
    hot,
    glow: new MeshBasicMaterial({ vertexColors: true }),
    foil: new MeshBasicMaterial({ map: foilTexture() }),
  };
}

interface PartOpts {
  /** Lit by nothing: screens, neon, LEDs */
  glow?: boolean;
  rot?: [number, number, number];
}

type Tint = Color | string;
const tint = (c: Tint) => (typeof c === "string" ? new Color(c) : c);

function place(mesh: Mesh, at: [number, number, number], lift: number) {
  mesh.position.set(at[0], at[1] + lift, at[2]);
}

function tag(geo: BufferGeometry, color: Tint, opts: PartOpts = {}) {
  const mesh = new Mesh(geo);
  mesh.userData.part = { color: tint(color), ...opts };
  if (opts.rot) {
    mesh.rotation.set(...opts.rot);
  }
  return mesh;
}

/** A soft box. `at` is the centre of its base. */
export function box(
  parent: Object3D,
  color: Tint,
  size: [number, number, number],
  at: [number, number, number],
  opts?: PartOpts & SoftBox
) {
  const mesh = tag(softBox(size, opts), color, opts);
  place(mesh, at, size[1] / 2);
  parent.add(mesh);
  return mesh;
}

/** A cylinder or cone with rolled rims, standing on `at` */
export function cyl(
  parent: Object3D,
  color: Tint,
  size: [top: number, bottom: number, height: number],
  at: [number, number, number],
  opts?: PartOpts & { r?: number }
) {
  const mesh = tag(softCyl(size[0], size[1], size[2], opts?.r), color, opts);
  place(mesh, at, size[2] / 2);
  parent.add(mesh);
  return mesh;
}

/** How finely a ball is cut: the bigger it is, the rounder it has to look */
function ballCut(radius: number): [number, number] {
  if (radius < 0.02) {
    return [8, 6];
  }
  if (radius < 0.06) {
    return [14, 10];
  }
  return radius < 0.12 ? [20, 14] : [28, 18];
}

/** A ball. `at` is its centre. */
export function ball(
  parent: Object3D,
  color: Tint,
  radius: number,
  at: [number, number, number],
  opts?: PartOpts & { squash?: [number, number, number] }
) {
  const mesh = tag(new SphereGeometry(radius, ...ballCut(radius)), color, opts);
  mesh.position.set(...at);
  if (opts?.squash) {
    mesh.scale.set(...opts.squash);
  }
  parent.add(mesh);
  return mesh;
}

/** Any other shape, tagged so it welds with the rest */
export function shape(
  parent: Object3D,
  geo: BufferGeometry,
  color: Tint,
  at: [number, number, number],
  opts?: PartOpts
) {
  const mesh = tag(geo, color, opts);
  mesh.position.set(...at);
  parent.add(mesh);
  return mesh;
}

class Weld {
  pos: number[] = [];
  nor: number[] = [];
  col: number[] = [];
  idx: number[] = [];

  /** Each shape keeps its own normals: flat where it is flat, soft where it
      curves */
  add(geo: BufferGeometry, matrix: Matrix4, color: Color) {
    const p = geo.attributes.position;
    const n = geo.attributes.normal;
    const base = this.pos.length / 3;
    const nm = new Matrix3().getNormalMatrix(matrix);
    const v = new Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).applyMatrix4(matrix);
      this.pos.push(v.x, v.y, v.z);
      v.fromBufferAttribute(n, i).applyMatrix3(nm).normalize();
      this.nor.push(v.x, v.y, v.z);
      this.col.push(color.r, color.g, color.b);
    }
    const count = geo.index ? geo.index.count : p.count;
    for (let i = 0; i < count; i++) {
      this.idx.push(base + (geo.index ? geo.index.getX(i) : i));
    }
  }

  build() {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(this.pos, 3));
    geo.setAttribute("normal", new Float32BufferAttribute(this.nor, 3));
    geo.setAttribute("color", new Float32BufferAttribute(this.col, 3));
    geo.setIndex(this.idx);
    return geo;
  }
}

/**
 * Welds every tagged shape under `root` into one lit mesh and one unlit
 * mesh. A child marked `userData.own` is welded on its own, so it can still
 * move by itself.
 */
export function weld(root: Object3D, mats: Mats) {
  root.updateMatrixWorld(true);
  const inv = new Matrix4().copy(root.matrixWorld).invert();
  const solid = new Weld();
  const glow = new Weld();
  const used: Mesh[] = [];
  const m = new Matrix4();

  interface Part {
    color: Color;
    glow?: boolean;
  }

  const walk = (node: Object3D) => {
    for (const child of [...node.children]) {
      const data = child.userData.part as Part | undefined;
      const mesh = child as Mesh;
      if (child.userData.own) {
        weld(child, mats);
      } else if (data && mesh.isMesh) {
        m.multiplyMatrices(inv, mesh.matrixWorld);
        (data.glow ? glow : solid).add(mesh.geometry, m, data.color);
        used.push(mesh);
      } else {
        walk(child);
      }
    }
  };
  walk(root);

  for (const mesh of used) {
    mesh.removeFromParent();
    mesh.geometry.dispose();
  }
  if (solid.pos.length > 0) {
    const mesh = new Mesh(solid.build(), mats.solid);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
  }
  if (glow.pos.length > 0) {
    root.add(new Mesh(glow.build(), mats.glow));
  }
}

/** Squeezes a shape's texture into one slice of the gradient strip */
export function foilSlice(geo: BufferGeometry, from: number, to: number) {
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    uv.setX(i, from + (to - from) * uv.getX(i));
  }
  uv.needsUpdate = true;
  return geo;
}

export const easeOut = (t: number) => 1 - (1 - t) ** 3;
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
/** Overshoots a little before it settles */
export const easeBack = (t: number) => {
  const c = 1.9;
  return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
};
/** 0 to 1 and back to 0 */
export const arc = (t: number) => Math.sin(Math.PI * clamp01(t));
