import {
  BoxGeometry,
  type BufferGeometry,
  CatmullRomCurve3,
  CircleGeometry,
  type Color,
  CylinderGeometry,
  DoubleSide,
  Group,
  type Material,
  Mesh,
  MeshBasicMaterial,
  type Object3D,
  OctahedronGeometry,
  PlaneGeometry,
  type Texture,
  TubeGeometry,
  Vector3,
} from "three";
import {
  arc,
  ball,
  box,
  cyl,
  easeBack,
  easeInOut,
  easeOut,
  foilSlice,
  INK,
  INK_LIST,
  type Mats,
  oklch,
  shape,
  weld,
} from "./kit";
import type { Screens } from "./screens";
import { softBox, softPlane } from "./soft";

/* The room itself. It follows the real one, wall by wall. The window wall
   has both desks in one line: the main desk on the left with its two
   monitors, the tall third one and the stream light over them, then the
   second desk in front of the curtain with the white chair, running all the
   way into the corner. The high shelf and the air conditioner sit above.
   The wardrobe stands on the next wall, just past the end of that desk, with
   the neon on top. Then straight to the bed, which runs along the far wall
   with its row of plush toys under the wavy light. The TV and the
   door close the loop, and the white cabinets, one long and two short, run
   along the left wall past the main desk. The mess is left out. Sizes are in metres, more or less. */

export const ROOM = { w: 4.4, d: 3.5, h: 2.7 };
/** Where the camera rests: on the window wall, a little from the left */
export const HOME_AZ = (-26 * Math.PI) / 180;
/** The window, on the window wall: its centre and the size of the glass */
export const WINDOW = { x: 3.14, y: 1.6, w: 1.14, h: 1.24 };

/** n is the window wall. The rest follow clockwise, as the room is walked. */
export type WallId = "n" | "e" | "s" | "w";

export interface Wall {
  id: WallId;
  node: Group;
  /** Points out of the room */
  nx: number;
  nz: number;
  /** False once the camera has come round behind it */
  stand: boolean;
  /** 1 when it stands, 0 when it has dropped out of the camera's way */
  up: number;
}

export type V3 = [number, number, number];

export interface Actor {
  id: string;
  /** Counts toward the collection; the rest are toys */
  collect: boolean;
  root: Object3D;
  baseY: number;
  hit: Mesh;
  /** Where its marker floats, in the room */
  anchor: Vector3;
  /** Where the camera looks when it is picked, and how close it gets */
  focus: Vector3;
  zoom: number;
  /** The side the camera swings to, so the thing shows its face */
  az: number;
  /** The wall it hangs on, if any: it goes when the wall goes */
  wall?: WallId;
  /** Seconds its reaction lasts */
  dur: number;
  /** p runs 0 to 1 over the reaction, t is seconds since the click */
  react?: (p: number, t: number) => void;
  hover: number;
  clickedAt: number;
}

export const C = {
  wall: oklch(0.945, 0.028, 88),
  trim: oklch(0.985, 0.012, 90),
  floor: oklch(0.82, 0.022, 78),
  plinth: oklch(0.3, 0.024, 62),
  wood: oklch(0.74, 0.1, 68),
  woodDark: oklch(0.56, 0.09, 58),
  white: oklch(0.97, 0.008, 90),
  cream: oklch(0.93, 0.03, 88),
  black: oklch(0.27, 0.014, 285),
  coal: oklch(0.36, 0.014, 280),
  grey: oklch(0.66, 0.012, 265),
  curtain: oklch(0.45, 0.03, 165),
  sheet: oklch(0.42, 0.04, 300),
  duvet: oklch(0.88, 0.06, 192),
  duvet2: oklch(0.8, 0.07, 198),
  leaf: oklch(0.7, 0.15, 150),
  teal: oklch(0.62, 0.09, 215),
  sky: oklch(0.78, 0.1, 235),
  yellow: oklch(0.88, 0.17, 98),
  red: oklch(0.63, 0.21, 25),
};

/** The same room every time: a small seeded dice */
function dice(seed: number) {
  let a = seed;
  return () => {
    a = (a * 9301 + 49_297) % 233_280;
    return a / 233_280;
  };
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/** A slice of the reaction, stretched back out to 0 to 1 */
const part = (p: number, from: number, to: number) =>
  clamp01((p - from) / (to - from));

export function group(parent: Object3D, at: V3 = [0, 0, 0], own = false) {
  const g = new Group();
  g.position.set(...at);
  g.userData.own = own;
  parent.add(g);
  return g;
}

/** A mesh with its own material, left out of the weld */
export function plain(
  parent: Object3D,
  geo: BufferGeometry,
  mat: Material,
  at: V3,
  rot?: V3
) {
  const mesh = new Mesh(geo, mat);
  mesh.position.set(...at);
  if (rot) {
    mesh.rotation.set(...rot);
  }
  parent.add(mesh);
  return mesh;
}

/** A flat picture. It faces +z until it is turned. `round` is the radius of
    its corners, for a screen that sits in a rounded case. */
function picture(
  parent: Object3D,
  tex: Texture,
  w: number,
  h: number,
  at: V3,
  rotY = 0,
  cutout = false,
  round = 0
) {
  const mat = new MeshBasicMaterial({
    map: tex,
    transparent: cutout,
    depthWrite: !cutout,
  });
  if (cutout) {
    mat.side = DoubleSide;
  }
  const geo = round > 0 ? softPlane(w, h, round) : new PlaneGeometry(w, h);
  return plain(parent, geo, mat, at, [0, rotY, 0]);
}

/** A screen on a stand, facing +z, standing on `at` */
function monitor(
  parent: Object3D,
  at: V3,
  w: number,
  h: number,
  tex: Texture,
  rotY: number,
  neck = 0.14
) {
  const g = group(parent, at, true);
  g.rotation.y = rotY;
  cyl(g, C.black, [0.09, 0.11, 0.02], [0, 0, -0.04]);
  box(g, C.black, [0.035, neck + h / 2, 0.035], [0, 0.02, -0.045]);
  const head = group(g, [0, neck, 0], true);
  box(head, C.black, [w + 0.04, h + 0.04, 0.03], [0, 0, 0], { corner: 0.03 });
  picture(head, tex, w, h, [0, (h + 0.04) / 2, 0.0165], 0, false, 0.014);
  return { g, head };
}

/** A Secretlab gaming chair, facing +z, like the two in the room. The seat
    spins on its base. A tall backrest with wide shoulder wings and side
    bolsters, a bucket seat with raised edges, a black head pillow on a strap,
    and the name on the backrest and the pillow. Every part is a fat cushion:
    nothing on it is thinner than a hand. */
function chair(
  parent: Object3D,
  at: V3,
  rotY: number,
  shell: Color,
  pad: Color,
  logos: { back: Texture; pillow: Texture }
) {
  const g = group(parent, at, true);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const leg = box(g, C.black, [0.32, 0.05, 0.07], [0, 0.03, 0], { r: 0.024 });
    leg.position.x = Math.cos(a) * 0.16;
    leg.position.z = Math.sin(a) * 0.16;
    leg.rotation.y = -a;
    ball(g, C.coal, 0.042, [Math.cos(a) * 0.3, 0.042, Math.sin(a) * 0.3]);
  }
  cyl(g, C.black, [0.04, 0.05, 0.3], [0, 0.07, 0]);
  const top = group(g, [0, 0, 0], true);
  top.rotation.y = rotY;

  // The bucket seat: a base, a softer middle and two raised edges
  box(top, C.black, [0.5, 0.08, 0.46], [0, 0.33, -0.01], { r: 0.035 });
  box(top, shell, [0.56, 0.12, 0.52], [0, 0.38, 0], { r: 0.06, corner: 0.14 });
  box(top, pad, [0.36, 0.05, 0.42], [0, 0.49, 0.02], { r: 0.024, corner: 0.1 });
  for (const side of [-1, 1]) {
    box(top, shell, [0.1, 0.08, 0.46], [side * 0.235, 0.47, 0.02], {
      r: 0.04,
      corner: 0.06,
    });
  }

  // The backrest leans back on its own hinge. Its parts are placed in its
  // own space: up is up the backrest, +z is out of its face.
  const back = group(top, [0, 0.5, -0.27], true);
  back.rotation.x = -0.14;
  box(back, shell, [0.44, 0.86, 0.14], [0, 0, 0], { r: 0.06, corner: 0.16 });
  // Wide shoulders, the Secretlab wings
  box(back, shell, [0.6, 0.24, 0.15], [0, 0.5, -0.005], {
    r: 0.065,
    corner: 0.1,
  });
  // Side bolsters that hug the back
  for (const side of [-1, 1]) {
    box(back, shell, [0.1, 0.5, 0.17], [side * 0.215, 0.02, 0.02], {
      r: 0.045,
      corner: 0.05,
    });
  }
  // The soft middle, in the second colour
  box(back, pad, [0.28, 0.42, 0.03], [0, 0.05, 0.07], {
    r: 0.014,
    corner: 0.08,
  });
  // The lumbar pillow at the small of the back
  box(back, C.black, [0.3, 0.13, 0.08], [0, 0.1, 0.1], {
    r: 0.04,
    corner: 0.06,
  });
  // The black head pillow on its strap
  box(back, C.black, [0.34, 0.15, 0.1], [0, 0.56, 0.1], {
    r: 0.045,
    corner: 0.07,
  });
  picture(back, logos.pillow, 0.14, 0.056, [0, 0.637, 0.152], 0, true);
  // The name across the top of the backrest
  picture(back, logos.back, 0.15, 0.06, [0, 0.79, 0.072], 0, true);

  // The armrests
  for (const side of [-1, 1]) {
    box(top, C.black, [0.045, 0.19, 0.045], [side * 0.31, 0.44, 0.0]);
    box(top, C.black, [0.09, 0.05, 0.3], [side * 0.31, 0.62, 0.04], {
      r: 0.024,
      corner: 0.04,
    });
  }
  return { g, top };
}

/** A round plush toy: no one in particular. A big head on a fat body, with
    stubby arms and feet. */
function plush(
  parent: Object3D,
  at: V3,
  r: number,
  fur: Color,
  belly: Color,
  rotY = 0,
  pointy = false
) {
  const g = group(parent, at, true);
  g.rotation.y = rotY;
  ball(g, fur, r, [0, r * 0.85, 0], { squash: [1.14, 0.92, 1.04] });
  ball(g, belly, r * 0.62, [0, r * 0.78, r * 0.66], { squash: [1, 1, 0.5] });
  ball(g, fur, r * 0.8, [0, r * 1.95, 0]);
  for (const side of [-1, 1]) {
    if (pointy) {
      cyl(g, fur, [0, r * 0.24, r * 0.55], [side * r * 0.44, r * 2.48, 0]);
    } else {
      ball(g, fur, r * 0.28, [side * r * 0.54, r * 2.6, 0]);
    }
    ball(g, C.black, r * 0.08, [side * r * 0.27, r * 2.06, r * 0.74]);
    ball(g, fur, r * 0.3, [side * r * 1.02, r * 1.02, r * 0.3], {
      squash: [0.9, 1.2, 0.9],
    });
    ball(g, fur, r * 0.32, [side * r * 0.52, r * 0.22, r * 0.72], {
      squash: [1, 0.7, 1.25],
    });
  }
  return g;
}

/** One letter in its envelope, lying flat on `at` */
function envelope(parent: Object3D, at: V3, rot: V3, own = false) {
  const g = group(parent, at, own);
  g.rotation.set(...rot);
  box(g, C.cream, [0.27, 0.014, 0.18], [0, 0, 0]);
  box(g, INK.pink, [0.045, 0.004, 0.045], [0.09, 0.014, -0.05]);
  return g;
}

export interface Kit {
  root: Group;
  /** True in December, when the room is dressed up */
  festive: boolean;
  /** Things a later builder may want to dress up */
  refs: { bigPlush?: Group; monitor?: Group };
  mats: Mats;
  screens: Screens;
  logos: Logos;
  walls: Record<WallId, Wall>;
  rand: () => number;
  idles: ((time: number, dt: number) => void)[];
  /** Pieces of foil: each shows a slice of the gradient, and it all drifts */
  foil: (
    parent: Object3D,
    geo: BufferGeometry,
    at: V3,
    from: number,
    to: number,
    rot?: V3
  ) => Mesh;
  /** Makes a thing in the room something you can press */
  add: (id: string, node: Object3D, o: Press) => void;
}

interface Press {
  collect?: boolean;
  /** Size and centre of the part you can press, in its own space */
  hit: V3;
  hitAt: V3;
  /** Height of its marker, in its own space */
  top: number;
  /** Where the marker floats, if not straight above */
  markAt?: V3;
  zoom: number;
  /** Degrees round the room, if the home view shows its back */
  az?: number;
  wall?: WallId;
  dur?: number;
  react?: Actor["react"];
}

const { w: W, d: D, h: H } = ROOM;
const TURN = Math.PI / 2;
/** Thickness of a wall */
const T = 0.16;
/** How far the top of a wall is rolled over, and how round the outside
    corners of the room are */
const EDGE = 0.04;
const CORNER = T - EDGE;

/** How round a chest of drawers or a cupboard is */
const CHEST = { r: 0.04, corner: 0.07 };

/** A holder that turns a thing built to face +x */
function turned(parent: Object3D, at: V3, rotY: number) {
  const g = group(parent, at, true);
  g.rotation.y = rotY;
  return g;
}

/* CJ Hendry's plush flowers, from her Flower Market: fat felt stems with a
   leaf, and soft stuffed heads. A spiky chrysanthemum, a tulip cup, a rose
   and a fluffy pompom, the mix in the vase in the real room. */
type Bloom = "mum" | "tulip" | "rose" | "pom";

const STEM = oklch(0.56, 0.13, 148);

/** A spiky chrysanthemum: two rings of long petals round a small heart */
function mum(g: Object3D, petal: Color, heart: Color) {
  ball(g, heart, 0.022, [0, 0.012, 0], { squash: [1, 0.7, 1] });
  for (const [n, reach, lift, tip, turn] of [
    [11, 0.046, 0.008, 0.32, 0],
    [9, 0.034, 0.022, 0.75, 0.3],
  ]) {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + turn;
      const p = ball(
        g,
        petal,
        0.03,
        [Math.cos(a) * reach, lift, Math.sin(a) * reach],
        { squash: [1, 0.26, 0.34] }
      );
      p.rotation.set(0, -a, tip);
    }
  }
}

/** A tulip: three fat petals closed into a cup */
function tulip(g: Object3D, petal: Color, heart: Color) {
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const p = ball(
      g,
      petal,
      0.032,
      [Math.cos(a) * 0.018, 0.04, Math.sin(a) * 0.018],
      { squash: [0.62, 1.35, 0.9] }
    );
    p.rotation.set(0, -a, -0.2);
  }
  ball(g, heart, 0.02, [0, 0.03, 0]);
}

/** A rose: a round bud wrapped in five soft outer petals */
function rose(g: Object3D, petal: Color, heart: Color) {
  ball(g, petal, 0.042, [0, 0.03, 0], { squash: [1, 0.82, 1] });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const p = ball(
      g,
      petal,
      0.026,
      [Math.cos(a) * 0.034, 0.024, Math.sin(a) * 0.034],
      { squash: [0.5, 0.9, 1] }
    );
    p.rotation.y = -a;
  }
  ball(g, heart, 0.022, [0, 0.058, 0], { squash: [1, 0.7, 1] });
}

/** A fluffy pompom: a ball covered in little tufts */
function pom(g: Object3D, petal: Color, heart: Color) {
  ball(g, petal, 0.044, [0, 0.04, 0]);
  for (let i = 0; i < 16; i++) {
    // Spread evenly over the ball, a golden-angle spiral
    const yy = 1 - (i + 0.5) / 8;
    const r = Math.sqrt(Math.max(0, 1 - yy * yy));
    const a = i * 2.4;
    ball(g, i % 3 ? petal : heart, 0.016, [
      Math.cos(a) * r * 0.044,
      0.04 + yy * 0.044,
      Math.sin(a) * r * 0.044,
    ]);
  }
}

/** Each plush flower head, built facing up from its own origin */
const BLOOMS: Record<Bloom, (g: Object3D, petal: Color, heart: Color) => void> =
  { mum, tulip, rose, pom };

/** A white vase of CJ Hendry plush flowers, standing on `at` */
function flowers(parent: Object3D, at: V3) {
  const [x, y, z] = at;
  cyl(parent, C.trim, [0.048, 0.04, 0.17], [x, y, z]);
  cyl(parent, C.cream, [0.05, 0.05, 0.02], [x, y + 0.16, z]);
  const heads: [Bloom, Color, Color, number, number, number][] = [
    // kind, petal, heart, angle round the vase, lean, height
    ["mum", C.red, INK.amber, 0.3, 0.32, 0.36],
    ["tulip", INK.pink, C.yellow, 2.2, 0.26, 0.31],
    ["pom", C.cream, INK.pink, 4.1, 0.2, 0.28],
    ["rose", oklch(0.58, 0.2, 18), oklch(0.5, 0.19, 18), 5.3, 0.12, 0.4],
  ];
  for (const [kind, petal, heart, a, lean, tall] of heads) {
    const g = group(parent, [x, y + 0.08, z], false);
    g.rotation.set(Math.sin(a) * lean, 0, -Math.cos(a) * lean);
    cyl(g, STEM, [0.009, 0.011, tall], [0, 0, 0]);
    const leaf = ball(g, STEM, 0.03, [0.024, tall * 0.5, 0], {
      squash: [0.9, 0.3, 0.5],
    });
    leaf.rotation.z = 0.7;
    const head = group(g, [0, tall, 0], false);
    BLOOMS[kind](head, petal, heart);
  }
}

/** A fan on a stem, blowing toward +x. Its blades turn on their own group. */
function fan(parent: Object3D, at: V3, stem: number, r: number) {
  const g = group(parent, at, true);
  cyl(g, C.black, [r * 0.55, r * 0.65, 0.03], [0, 0, 0]);
  box(g, C.black, [0.035, stem, 0.035], [0, 0.03, 0]);
  const cage = cyl(g, C.coal, [r, r, 0.07], [0, 0, 0], {
    rot: [0, 0, TURN],
  });
  cage.position.set(0.02, stem + r, 0);
  const blades = group(g, [0.062, stem + r, 0], true);
  for (let i = 0; i < 3; i++) {
    const blade = box(blades, C.grey, [0.008, r * 0.82, r * 0.36], [0, 0, 0], {
      corner: r * 0.17,
    });
    const a = (i / 3) * Math.PI * 2;
    blade.position.set(0, Math.cos(a) * r * 0.44, Math.sin(a) * r * 0.44);
    blade.rotation.x = a;
  }
  cyl(blades, C.black, [0.03, 0.03, 0.016], [0, 0, 0], {
    rot: [0, 0, TURN],
  }).position.set(0.004, 0, 0);
  return { g, blades };
}

/* The shell: a floor and four walls. Each wall carries its own cove, light
   strip and skirting, so it can drop out of the camera's way in one piece. */
function buildShell(k: Kit) {
  const { root, foil, walls } = k;

  // The slab the room stands on. Its corners turn with the walls above them.
  const slab = { r: 0.05, corner: CORNER };
  box(root, C.floor, [W + T * 2, 0.3, D + T * 2], [W / 2, -0.3, D / 2], {
    ...slab,
    flush: true,
  });
  box(
    root,
    C.plinth,
    [W + T * 2, 0.14, D + T * 2],
    [W / 2, -0.44, D / 2],
    slab
  );

  // The window wall and the door wall run the full width and own the corners
  // A wall is a soft slab: its top is rolled over, and the two long ones
  // turn the outside corners of the room
  const long = (id: WallId, z: number, inward: number, from: number) => {
    const g = walls[id].node;
    box(g, C.wall, [W + T * 2, H, T], [W / 2, 0, z - (inward * T) / 2], {
      axis: "y",
      r: EDGE,
      flush: true,
      corner:
        inward > 0
          ? [EDGE, EDGE, CORNER, CORNER]
          : [CORNER, CORNER, EDGE, EDGE],
    });
    box(g, C.trim, [W, 0.09, 0.07], [W / 2, H - 0.12, z + inward * 0.035]);
    foil(
      g,
      softBox([W - 0.08, 0.035, 0.03]),
      [W / 2, H - 0.15, z + inward * 0.05],
      from,
      from + 1.2
    );
    box(g, C.trim, [W, 0.09, 0.03], [W / 2, 0, z + inward * 0.015]);
  };
  const short = (id: WallId, x: number, inward: number, from: number) => {
    const g = walls[id].node;
    box(g, C.wall, [T, H, D], [x - (inward * T) / 2, 0, D / 2], {
      axis: "y",
      r: EDGE,
      flush: true,
    });
    box(g, C.trim, [0.07, 0.09, D], [x + inward * 0.035, H - 0.12, D / 2]);
    foil(
      g,
      softBox([0.03, 0.035, D - 0.08]),
      [x + inward * 0.05, H - 0.15, D / 2],
      from,
      from + 1
    );
    box(g, C.trim, [0.03, 0.09, D], [x + inward * 0.015, 0, D / 2]);
  };
  long("n", 0, 1, 0);
  short("e", W, -1, 1.2);
  long("s", D, -1, 2.2);
  short("w", 0, 1, 3.4);
}

/** One fabric curtain from x0 to x1 on the window wall: a single sheet in
    soft pleats, a little deeper at the hem where it falls loose */
function drape(
  parent: Object3D,
  x0: number,
  x1: number,
  z: number,
  deep: number
) {
  const w = x1 - x0;
  const h = 2.26;
  const pleats = Math.max(3, Math.round(w / 0.1));
  const geo = new PlaneGeometry(w, h, pleats * 10, 4);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) + w / 2) / w;
    const v = (pos.getY(i) + h / 2) / h;
    const fall = deep * (1 + 0.5 * (1 - v));
    pos.setZ(i, Math.sin(u * pleats * Math.PI * 2) * fall);
  }
  geo.translate(w / 2, h / 2, 0);
  geo.computeVertexNormals();
  shape(parent, geo, C.curtain, [x0, 0.18, z]);
  // The heading tape along the top
  box(parent, oklch(0.4, 0.03, 165), [w, 0.06, 0.03], [x0 + w / 2, 2.38, z]);
}

/* The window wall: the curtained window behind the second desk, the air
   conditioner, and the high shelf over the main desk */
function buildWindowWall(k: Kit) {
  const { screens, walls } = k;
  const n = walls.n.node;
  const cx = WINDOW.x;

  box(n, C.trim, [1.3, 1.4, 0.05], [cx, 0.9, 0.025], { corner: 0.09 });
  const glass = picture(
    n,
    screens.day.tex,
    WINDOW.w,
    WINDOW.h,
    [cx, WINDOW.y, 0.052],
    0,
    false,
    0.04
  );
  box(n, C.trim, [0.04, 1.24, 0.03], [cx, 0.98, 0.055]);
  box(n, C.trim, [1.14, 0.04, 0.03], [cx, 1.58, 0.055]);
  cyl(n, C.black, [0.014, 0.014, 1.62], [cx, 2.44, 0.13], {
    rot: [0, 0, TURN],
  }).position.y = 2.44;
  // Full-height fabric curtains, one soft pleated drape on each side, drawn
  // almost shut. In December they are pulled back a little, to watch the
  // snow, and bunch up deeper.
  const [l0, l1, r0, r1] = k.festive
    ? [2.36, 2.86, 3.5, 3.92]
    : [2.38, 3.25, 3.31, 3.92];
  const deep = k.festive ? 0.045 : 0.03;
  drape(n, l0, l1, 0.12, deep);
  drape(n, r0, r1, 0.12, deep);

  // The air conditioner
  box(n, C.white, [0.92, 0.28, 0.2], [1.92, 2.14, 0.1], {
    axis: "x",
    r: 0.035,
    corner: 0.08,
  });
  box(n, C.grey, [0.8, 0.02, 0.03], [1.92, 2.17, 0.2]);
  box(n, C.cream, [0.84, 0.05, 0.02], [1.92, 2.3, 0.2]);

  return glass;
}

/* The main desk (window wall, left) */
function buildMainDesk(k: Kit) {
  const { root, screens, add, foil } = k;

  // It runs left almost to the wall
  box(root, C.wood, [2.38, 0.05, 0.8], [1.25, 0.72, 0.47], { corner: 0.08 });
  for (const x of [0.16, 2.28]) {
    box(root, C.black, [0.1, 0.72, 0.08], [x, 0, 0.44]);
    box(root, C.black, [0.1, 0.03, 0.7], [x, 0, 0.46]);
  }
  // The glow behind the monitors
  foil(root, softBox([1.36, 0.06, 0.05]), [1.42, 0.8, 0.11], 0.1, 0.5);
  // Two light bars, left of the monitors
  for (const [i, x] of [0.56, 0.64].entries()) {
    box(root, C.black, [0.06, 0.02, 0.06], [x, 0.77, 0.13]);
    foil(
      root,
      softBox([0.035, 0.9, 0.035], { r: 0.017 }),
      [x, 1.24, 0.13],
      0.1 + i * 0.45,
      0.16 + i * 0.45
    );
  }
  // Keyboard, desk mat, mouse and a cup
  box(root, C.grey, [0.44, 0.022, 0.17], [1.32, 0.77, 0.68]);
  box(root, C.cream, [0.4, 0.012, 0.13], [1.32, 0.792, 0.68]);
  box(root, INK.pink, [0.03, 0.014, 0.03], [1.13, 0.792, 0.725]);
  box(root, INK.cyan, [0.06, 0.014, 0.03], [1.5, 0.792, 0.725]);
  box(root, C.coal, [0.3, 0.006, 0.27], [1.86, 0.77, 0.68]);
  ball(root, C.black, 0.035, [1.86, 0.795, 0.68], {
    squash: [1, 0.6, 1.5],
  });
  cyl(root, C.cream, [0.04, 0.032, 0.11], [2.1, 0.77, 0.56]);

  // The two monitors
  const monA = monitor(root, [1.04, 0.77, 0.3], 0.64, 0.36, screens.left, 0.14);
  const monB = monitor(
    root,
    [1.72, 0.77, 0.3],
    0.64,
    0.36,
    screens.right,
    -0.14
  );
  k.refs.monitor = monA.head;
  const monitors = group(root, [1.38, 0.77, 0.3], true);
  add("monitors", monitors, {
    hit: [1.45, 0.6, 0.3],
    hitAt: [0, 0.36, 0.03],
    top: 0.72,
    zoom: 2.5,
    dur: 1.5,
    react: (p) => {
      screens.drawMonitors(easeOut(p));
      const s = 1 + 0.07 * arc(part(p, 0, 0.35));
      monA.head.scale.setScalar(s);
      monB.head.scale.setScalar(s);
    },
  });
  // The monitors lift with their marker's group
  monitors.attach(monA.g);
  monitors.attach(monB.g);

  // The third screen, stood on its end at the right of the desk and turned in
  monitor(root, [2.29, 0.77, 0.36], 0.36, 0.62, screens.code.tex, -0.5, 0.16);
  // The tablet on its arm, in front of it
  box(root, C.black, [0.025, 0.2, 0.025], [2.3, 0.77, 0.76]);
  box(root, C.coal, [0.3, 0.21, 0.016], [2.26, 0.94, 0.76], {
    rot: [-0.3, -0.5, 0],
  });

  // The phone on its stand
  const phone = group(root, [1.63, 0.77, 0.52], true);
  box(phone, C.coal, [0.09, 0.02, 0.09], [0, 0, 0]);
  const handset = group(phone, [0, 0.02, 0], true);
  handset.rotation.set(0, -0.2, 0);
  box(handset, C.black, [0.095, 0.19, 0.014], [0, 0, 0], {
    rot: [-0.22, 0, 0],
    corner: 0.018,
  });
  const phoneScreen = picture(
    handset,
    screens.phone.tex,
    0.08,
    0.165,
    [0, 0.096, 0.012],
    0,
    false,
    0.012
  );
  phoneScreen.rotation.x = -0.22;
  add("phone", phone, {
    hit: [0.24, 0.34, 0.24],
    hitAt: [0, 0.14, 0],
    top: 0.34,
    zoom: 1.7,
    react: (p) => {
      handset.position.y = 0.02 + arc(p) * 0.22;
      handset.rotation.y = -0.2 + easeInOut(p) * Math.PI * 2;
    },
  });
}

/* The PC under the main desk */
function buildPC(k: Kit) {
  const { root, add, foil, idles } = k;

  const pc = group(root, [2.04, 0.03, 0.5], true);
  box(pc, C.black, [0.24, 0.5, 0.5], [0, 0, 0], { r: 0.03, corner: 0.05 });
  box(pc, C.coal, [0.18, 0.42, 0.03], [0, 0.04, 0.245]);
  const fans: Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    fans.push(
      foil(
        pc,
        new CylinderGeometry(0.058, 0.058, 0.012, 20),
        [0, 0.11 + i * 0.14, 0.262],
        i * 0.3,
        i * 0.3 + 0.25,
        [TURN, 0, 0]
      )
    );
  }
  let pcSpin = 1.4;
  idles.push((_time, dt) => {
    pcSpin += (1.4 - pcSpin) * Math.min(1, dt * 0.8);
    for (const blade of fans) {
      blade.rotation.y += dt * pcSpin;
    }
  });
  add("pc", pc, {
    collect: false,
    hit: [0.3, 0.54, 0.56],
    hitAt: [0, 0.26, 0.02],
    top: 0.62,
    zoom: 2.4,
    dur: 0.9,
    react: (p, t) => {
      pcSpin = 26;
      pc.rotation.x = Math.sin(t * 46) * 0.03 * (1 - p);
    },
  });
}

/* The stream light: one straight pole fixed flat to the left wall, leaning
   out of the corner, with the panel at its top pointing down across the
   main desk */
function buildStreamLight(k: Kit) {
  const { root, screens, add } = k;
  const tilt = 0.85;

  // The pole, from just over the desk up the wall, with two wall clips
  const from = new Vector3(0.035, 1.0, 0.18);
  const to = new Vector3(0.035, 1.9, 0.56);
  const run = to.clone().sub(from);
  const mid = from.clone().add(to).multiplyScalar(0.5);
  const long = run.length();
  box(root, C.black, [0.032, long, 0.032], [mid.x, mid.y - long / 2, mid.z], {
    r: 0.014,
    rot: [Math.atan2(run.z, run.y), 0, 0],
  });
  for (const f of [0.2, 0.8]) {
    const at = from.clone().lerp(to, f);
    box(root, C.coal, [0.03, 0.05, 0.07], [0.015, at.y - 0.025, at.z], {
      r: 0.01,
    });
  }
  // The knuckle at the top, and the panel off it
  ball(root, C.black, 0.035, [0.06, 1.9, 0.56]);
  box(root, C.black, [0.2, 0.03, 0.03], [0.15, 1.885, 0.56], { r: 0.012 });
  const light = group(root, [0.3, 1.84, 0.56], true);
  light.rotation.set(0, 0, tilt);
  box(light, C.black, [0.64, 0.16, 0.56], [0, -0.08, 0], {
    r: 0.045,
    corner: 0.09,
  });
  const diffuser = plain(
    light,
    softPlane(0.55, 0.47, 0.06),
    new MeshBasicMaterial({ map: screens.softbox.tex }),
    [0, -0.084, 0],
    [TURN, 0, 0]
  );
  const beam = plain(
    light,
    new CylinderGeometry(0.3, 0.72, 1.05, 24, 1, true),
    new MeshBasicMaterial({
      color: INK.amber,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: DoubleSide,
    }),
    [0, -0.62, 0],
    [0, Math.PI / 4, 0]
  );
  beam.visible = false;
  add("light", light, {
    hit: [0.7, 0.4, 0.66],
    hitAt: [0, -0.02, 0],
    top: 0.42,
    zoom: 2.9,
    dur: 1,
    react: (p) => {
      const on = p > 0.12;
      screens.softbox.draw(on ? 1 : 0);
      beam.visible = on;
      (beam.material as MeshBasicMaterial).opacity =
        0.13 * easeOut(part(p, 0.12, 0.7));
      diffuser.scale.setScalar(1 + 0.06 * arc(part(p, 0.1, 0.5)));
      light.rotation.z = tilt + 0.12 * arc(part(p, 0, 0.4));
    },
  });
}

/* The high shelf in the corner over the main desk, and its trophies */
function buildHighShelfAndItsTrophies(k: Kit) {
  const { screens, logos, add, walls } = k;
  const n = walls.n.node;
  const w = walls.w.node;

  box(n, C.trim, [1.42, 0.04, 0.28], [0.71, 2.2, 0.14]);
  for (const x of [0.34, 0.84, 1.34]) {
    box(n, C.trim, [0.03, 0.12, 0.2], [x, 2.08, 0.1]);
  }
  // It turns the corner and runs on a little way
  box(w, C.trim, [0.28, 0.04, 1.0], [0.14, 2.2, 0.78]);
  box(w, C.trim, [0.2, 0.12, 0.03], [0.1, 2.08, 1.2]);
  [C.sky, C.red, C.teal, INK.magenta].forEach((fur, i) => {
    ball(w, fur, 0.045, [0.14, 2.285, 0.5 + i * 0.2], {
      squash: [1, 1.15, 1],
    });
    ball(w, fur, 0.03, [0.14, 2.35, 0.5 + i * 0.2]);
  });

  const yellow = plush(
    n,
    [0.17, 2.24, 0.16],
    0.085,
    C.yellow,
    C.cream,
    0.3,
    true
  );
  add("yellow", yellow, {
    collect: false,
    hit: [0.26, 0.3, 0.26],
    hitAt: [0, 0.13, 0],
    top: 0.34,
    zoom: 1.9,
    wall: "n",
    dur: 0.7,
    react: (p) => {
      yellow.scale.set(1 + 0.2 * arc(p), 1 - 0.25 * arc(p), 1 + 0.2 * arc(p));
    },
  });

  // BLOCK71: the cup
  const cup = group(turned(n, [0.52, 2.24, 0.15], -TURN), [0, 0, 0], true);
  box(cup, C.black, [0.13, 0.035, 0.13], [0, 0, 0]);
  cyl(cup, INK.lime, [0.025, 0.04, 0.08], [0, 0.035, 0]);
  cyl(cup, INK.lime, [0.085, 0.04, 0.13], [0, 0.115, 0]);
  for (const side of [-1, 1]) {
    box(cup, INK.lime, [0.02, 0.07, 0.02], [0, 0.15, side * 0.1]);
    box(cup, INK.lime, [0.02, 0.02, 0.05], [0, 0.2, side * 0.08]);
  }
  picture(cup, screens.n71.tex, 0.075, 0.075, [0.071, 0.18, 0], TURN);
  add("cup", cup, {
    hit: [0.26, 0.34, 0.3],
    hitAt: [0, 0.14, 0],
    top: 0.36,
    zoom: 1.8,
    wall: "n",
    react: (p) => {
      cup.position.y += arc(p) * 0.26;
      cup.rotation.y = easeInOut(p) * Math.PI * 4;
    },
  });

  // Anthropic partner: the plaque
  const plaque = group(turned(n, [0.86, 2.24, 0.15], -TURN), [0, 0, 0], true);
  box(plaque, C.woodDark, [0.1, 0.03, 0.26], [0, 0, 0]);
  const slab = group(plaque, [-0.01, 0.03, 0], true);
  slab.rotation.z = 0.16;
  box(slab, C.woodDark, [0.03, 0.24, 0.24], [0, 0, 0]);
  box(slab, C.cream, [0.006, 0.19, 0.19], [0.017, 0.025, 0]);
  if (logos.claude) {
    picture(slab, logos.claude, 0.13, 0.13, [0.0215, 0.12, 0], TURN, true);
  }
  add("plaque", plaque, {
    hit: [0.26, 0.34, 0.32],
    hitAt: [0, 0.14, 0],
    top: 0.36,
    zoom: 1.8,
    wall: "n",
    react: (p, t) => {
      plaque.position.y += arc(part(p, 0, 0.5)) * 0.16;
      slab.rotation.z = 0.16 + Math.sin(t * 11) * 0.22 * (1 - p);
    },
  });

  // Comebck mentor: the medal on its hook
  const medal = group(turned(n, [1.2, 2.24, 0.15], -TURN), [0, 0, 0], true);
  box(medal, C.black, [0.12, 0.03, 0.12], [0, 0, 0]);
  box(medal, C.black, [0.02, 0.3, 0.02], [-0.03, 0.03, 0]);
  box(medal, C.black, [0.09, 0.02, 0.02], [0.005, 0.31, 0]);
  const swing = group(medal, [0.04, 0.31, 0], true);
  box(swing, INK.indigo, [0.012, 0.14, 0.035], [0, -0.13, -0.022], {
    rot: [0.28, 0, 0],
  });
  box(swing, INK.indigo, [0.012, 0.14, 0.035], [0, -0.13, 0.022], {
    rot: [-0.28, 0, 0],
  });
  cyl(swing, INK.amber, [0.058, 0.058, 0.018], [0, -0.19, 0], {
    rot: [0, 0, TURN],
  }).position.set(0, -0.18, 0);
  add("medal", medal, {
    hit: [0.26, 0.4, 0.28],
    hitAt: [0, 0.17, 0],
    top: 0.42,
    zoom: 1.8,
    wall: "n",
    dur: 1.8,
    react: (p, t) => {
      swing.rotation.x = Math.sin(t * 8.5) * 0.75 * (1 - p) ** 1.5;
    },
  });
}

/* The white cabinets along the left wall, past the end of the main desk:
   one long chest of drawers with the flowers on top, then two short ones.
   They face into the room, away from the wall. The desk fan stands on the
   left end of the desk. */
function buildDrawersAndTheFan(k: Kit) {
  const { root, add, idles } = k;

  /** One drawer front, `w` wide, at height `y`, slid along the unit by `z` */
  const front = (parent: Object3D, y: number, z: number, w: number) => {
    const g = group(parent, [0.3, y, z], true);
    box(g, C.white, [0.03, 0.2, w], [0.015, 0, 0]);
    box(g, C.grey, [0.02, 0.025, Math.min(0.16, w * 0.4)], [0.04, 0.13, 0]);
    box(g, C.cream, [0.26, 0.16, w - 0.04], [-0.13, 0.01, 0]);
    return g;
  };

  // The two short ones stay shut
  for (const z of [1.98, 2.4]) {
    const short = group(root, [0.31, 0, z]);
    box(short, C.white, [0.6, 0.5, 0.4], [0, 0, 0], CHEST);
    for (let i = 0; i < 2; i++) {
      front(short, 0.05 + i * 0.225, 0, 0.36).userData.own = false;
    }
  }

  // The long one
  const drawers = group(root, [0.31, 0, 1.35], true);
  box(drawers, C.white, [0.6, 0.72, 0.8], [0, 0, 0], CHEST);
  const fronts = [0, 1, 2].flatMap((i) =>
    [-0.195, 0.195].map((z) => front(drawers, 0.05 + i * 0.225, z, 0.37))
  );
  const stars: Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const star = plain(
      drawers,
      new OctahedronGeometry(0.05, 0),
      new MeshBasicMaterial({ color: i % 2 ? INK.amber : INK.lime }),
      [0.42, 0.6, 0]
    );
    star.visible = false;
    stars.push(star);
  }
  flowers(drawers, [-0.06, 0.72, -0.2]);
  add("drawers", drawers, {
    hit: [0.7, 0.76, 0.84],
    hitAt: [0.03, 0.38, 0],
    top: 1,
    markAt: [0.1, 1.0, 0.12],
    zoom: 2.6,
    az: 38,
    dur: 1.6,
    react: (p, t) => {
      fronts.forEach((f, i) => {
        const order = 2 - Math.floor(i / 2);
        f.position.x =
          0.3 + 0.2 * easeBack(part(p, order * 0.1, order * 0.1 + 0.35));
      });
      stars.forEach((star, i) => {
        const q = part(p, 0.18 + i * 0.05, 0.75 + i * 0.05);
        star.visible = q > 0 && q < 1;
        const a = (i / stars.length) * Math.PI * 2 + 0.6;
        star.position.set(
          0.42 + Math.cos(a) * 0.32 * q,
          0.62 + arc(q) * (0.5 + (i % 3) * 0.14),
          Math.sin(a) * 0.36 * q
        );
        star.rotation.y = t * 6 + i;
        star.scale.setScalar(0.6 + arc(q) * 0.7);
      });
    },
  });

  // The desk fan, on the left end of the desk by the wall
  const desk = fan(
    turned(root, [0.24, 0.77, 0.6], -0.5),
    [0, 0, 0],
    0.16,
    0.17
  );
  let fanSpin = 2.2;
  idles.push((_time, dt) => {
    fanSpin += (2.2 - fanSpin) * Math.min(1, dt * 0.6);
    desk.blades.rotation.x += dt * fanSpin;
  });
  add("fan", desk.g, {
    collect: false,
    hit: [0.3, 0.52, 0.4],
    hitAt: [0.02, 0.26, 0],
    top: 0.6,
    zoom: 2.2,
    dur: 0.6,
    react: (p) => {
      fanSpin = 30;
      desk.g.rotation.y = Math.sin(p * Math.PI * 2) * 0.5;
    },
  });
}

/* The second desk (window wall, right, in front of the curtain). It runs all
   the way into the corner, and the wardrobe stands just past its end. */
function buildSecondDesk(k: Kit) {
  const { root, screens, add } = k;
  const right = W - 0.015;

  box(
    root,
    C.wood,
    [right - 2.52, 0.05, 0.72],
    [(right + 2.52) / 2, 0.72, 0.43],
    {
      corner: 0.08,
    }
  );
  for (const x of [2.58, right - 0.06]) {
    for (const z of [0.14, 0.72]) {
      box(root, C.white, [0.05, 0.72, 0.05], [x, 0, z]);
    }
  }
  // The wide screen: posts on the blog
  const wide = monitor(
    root,
    [3.07, 0.77, 0.28],
    0.56,
    0.33,
    screens.posts.tex,
    0.06
  );
  add("posts", wide.g, {
    hit: [0.66, 0.56, 0.2],
    hitAt: [0, 0.3, 0],
    top: 0.62,
    zoom: 2.3,
    dur: 1.5,
    react: (p) => {
      screens.posts.draw(easeOut(p));
      wide.head.scale.setScalar(1 + 0.07 * arc(part(p, 0, 0.3)));
    },
  });
  // The tall screen: the green hills
  monitor(root, [3.55, 0.77, 0.3], 0.31, 0.55, screens.hills.tex, -0.22, 0.1);
  // The white keyboard on its wooden rest
  box(root, C.woodDark, [0.46, 0.015, 0.2], [3.1, 0.77, 0.64]);
  box(root, C.white, [0.4, 0.025, 0.13], [3.1, 0.785, 0.64]);
  // A row of small toys, one in each ink of the year
  box(root, C.woodDark, [0.52, 0.035, 0.08], [3.1, 0.77, 0.48]);
  INK_LIST.forEach((ink, i) => {
    ball(root, ink, 0.03, [2.88 + i * 0.073, 0.835, 0.48]);
  });
  flowers(root, [2.64, 0.77, 0.2]);
  // The small fan
  fan(turned(root, [3.6, 0.77, 0.62], -1.3), [0, 0, 0], 0.05, 0.08);
  // The Mac mini, on the left of the desk beside the screen: a small silver
  // square with round corners, its dark foot, and the white power light
  const mini = turned(root, [2.7, 0.77, 0.5], -TURN + 0.15);
  box(mini, C.coal, [0.14, 0.008, 0.14], [0, 0, 0], { corner: 0.03 });
  box(mini, oklch(0.88, 0.006, 250), [0.17, 0.055, 0.17], [0, 0.008, 0], {
    r: 0.012,
    corner: 0.035,
  });
  box(mini, oklch(0.8, 0.008, 250), [0.004, 0.014, 0.05], [0.086, 0.025, 0.03]);
  ball(mini, C.white, 0.0045, [0.087, 0.03, -0.055], { glow: true });

  // The white chair, turned to the desk, with its blanket and blue cushion
  const spin = Math.PI + 0.6;
  const guest = chair(root, [3.2, 0, 1.44], spin, C.white, C.cream, {
    back: screens.secretlabInk.tex,
    pillow: screens.secretlab.tex,
  });
  ball(guest.top, oklch(0.87, 0.04, 75), 0.25, [0, 0.42, 0.06], {
    squash: [1, 0.5, 1.05],
  });
  ball(guest.top, C.sky, 0.17, [0, 0.6, 0.04], { squash: [1.1, 0.8, 1] });
  for (const side of [-1, 1]) {
    ball(guest.top, C.sky, 0.05, [side * 0.12, 0.74, 0.04]);
  }
  add("guest", guest.g, {
    collect: false,
    hit: [0.66, 1.2, 0.66],
    hitAt: [0, 0.6, 0],
    top: 1.3,
    zoom: 2.8,
    dur: 1.4,
    react: (p) => {
      guest.top.rotation.y = spin + easeInOut(p) * Math.PI * 2;
    },
  });
}

/* The wardrobe, all white with sliding doors, along the right-hand wall just
   past the end of the second desk. Then comes the bed. */
function buildWardrobe(k: Kit) {
  const { root, screens } = k;
  const face = W - 0.61;
  // How far along the wall it starts: just clear of the desk
  const z0 = 0.82;

  box(root, C.white, [0.6, 2.1, 1.0], [W - 0.3, 0, z0 + 0.5], CHEST);
  // Two white sliding doors on their tracks, the front one overlapping the
  // back one, each with a long recessed pull
  box(root, C.trim, [0.035, 0.03, 0.96], [face - 0.012, 2.02, z0 + 0.5]);
  box(root, C.trim, [0.035, 0.03, 0.96], [face - 0.012, 0.06, z0 + 0.5]);
  const doors: [number, number][] = [
    [z0 + 0.27, 0],
    [z0 + 0.73, -0.022],
  ];
  for (const [z, out] of doors) {
    box(root, C.white, [0.02, 1.92, 0.5], [face + out, 0.09, z], {
      r: 0.008,
      corner: 0.02,
    });
  }
  box(root, C.cream, [0.008, 0.7, 0.025], [face - 0.012, 0.7, z0 + 0.045]);
  box(root, C.cream, [0.008, 0.7, 0.025], [face - 0.034, 0.7, z0 + 0.955]);
  // On top: the neon and two more toys
  const dream = picture(
    root,
    screens.dream.tex,
    0.62,
    0.27,
    [W - 0.36, 2.27, z0 + 0.54],
    -1.05,
    true
  );
  plush(
    root,
    [W - 0.2, 2.1, z0 + 0.12],
    0.085,
    C.woodDark,
    C.cream,
    -TURN + 0.5
  );
  plush(root, [W - 0.2, 2.1, z0 + 0.9], 0.08, C.red, C.cream, -0.6);
  return dream;
}

/* The far end of the second desk, in the corner: the stack of mail and the
   big fan. There are no drawers by the bed: the wardrobe comes straight
   before it. */
function buildDeskEnd(k: Kit) {
  const { root, add, rand, idles } = k;

  // The mail: a neat stack in a tray
  const mail = turned(root, [W - 0.38, 0.77, 0.5], TURN);
  box(mail, C.grey, [0.34, 0.03, 0.25], [0, 0, 0]);
  let top = 0.03;
  for (let i = 0; i < 13; i++) {
    envelope(
      mail,
      [(rand() - 0.5) * 0.02, top, (rand() - 0.5) * 0.02],
      [0, (rand() - 0.5) * 0.16, 0]
    );
    top += 0.016;
  }
  const flyers = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2 + 0.4;
    const home: V3 = [0, top + i * 0.016, 0];
    const turn = (rand() - 0.5) * 0.16;
    return {
      node: envelope(mail, home, [0, turn, 0], true),
      home,
      turn,
      a,
      reach: 0.3 + rand() * 0.3,
      high: 0.5 + rand() * 0.5,
    };
  });
  add("mail", mail, {
    hit: [0.4, 0.46, 0.32],
    hitAt: [0, 0.2, 0],
    top: 0.5,
    zoom: 2.4,
    dur: 1.7,
    react: (p) => {
      flyers.forEach((f, i) => {
        const q = part(p, i * 0.03, 0.72 + i * 0.03);
        const out = arc(q) * f.reach;
        f.node.position.set(
          f.home[0] + Math.cos(f.a) * out,
          f.home[1] + arc(q) * f.high,
          f.home[2] + Math.sin(f.a) * out
        );
        f.node.rotation.set(
          easeInOut(q) * Math.PI * 2,
          f.turn + easeInOut(q) * Math.PI * 2,
          0
        );
      });
    },
  });

  // The big fan, in the corner, blowing into the room
  const tall = fan(
    turned(root, [W - 0.17, 0.77, 0.2], -(Math.PI - 0.7)),
    [0, 0, 0],
    0.2,
    0.17
  );
  idles.push((_time, dt) => {
    tall.blades.rotation.x += dt * 1.6;
  });
}

/* The bed along the far wall, head to the wardrobe side, with its row of
   plush toys and the lights on the wall over its head */
function buildBed(k: Kit, dream: Mesh) {
  const { root, screens, add } = k;
  // Flush into the corner, against both walls
  const bx = W - 1.025;
  const bz = D - 0.725;

  // A padded base, a fat mattress, a headboard with round shoulders, and
  // bedding that looks filled
  box(root, C.coal, [2.05, 0.26, 1.45], [bx, 0, bz], { r: 0.05, corner: 0.12 });
  box(root, C.sheet, [2.0, 0.2, 1.41], [bx, 0.26, bz], {
    r: 0.08,
    corner: 0.14,
  });
  box(root, C.grey, [0.14, 0.98, 1.45], [W - 0.07, 0, bz], {
    r: 0.055,
    corner: 0.18,
  });
  const bed = group(root, [bx, 0.46, bz], true);
  box(bed, C.white, [0.38, 0.14, 0.64], [0.7, -0.02, -0.28], {
    r: 0.066,
    corner: 0.15,
  });
  const duvet = group(bed, [-0.32, 0, -0.14], true);
  box(duvet, C.duvet, [1.42, 0.13, 1.16], [0, -0.01, 0], {
    r: 0.06,
    corner: 0.16,
  });
  box(duvet, C.duvet2, [0.28, 0.07, 1.16], [0.57, 0.105, 0], {
    r: 0.034,
    corner: 0.13,
  });
  const zeds: Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const z = picture(
      bed,
      screens.zed.tex,
      0.26,
      0.26,
      [0.72, 0.5, -0.28],
      HOME_AZ,
      true
    );
    z.visible = false;
    zeds.push(z);
  }
  add("bed", bed, {
    hit: [2.0, 0.5, 1.4],
    hitAt: [0, 0.05, 0],
    top: 0.75,
    markAt: [-0.2, 0.62, -0.3],
    zoom: 3.4,
    dur: 2.2,
    react: (p) => {
      duvet.scale.y = 1 + 0.7 * arc(part(p, 0, 0.35));
      zeds.forEach((z, i) => {
        const q = part(p, 0.1 + i * 0.16, 0.62 + i * 0.16);
        z.visible = q > 0 && q < 1;
        z.position.set(0.72 - q * 0.3 - i * 0.05, 0.4 + q * 1.0, -0.28);
        z.scale.setScalar((0.55 + i * 0.28) * easeBack(Math.min(1, q * 3)));
        (z.material as MeshBasicMaterial).opacity = 1 - part(q, 0.7, 1);
      });
    },
  });

  // The plush toys along the wall side of the bed, dropped there any old
  // way: uneven gaps, some forward, some back, each looking somewhere else
  // and a few leaning
  const pile = group(root, [bx, 0.46, D - 0.3], true);
  const look = -1.9;
  const toys = [
    plush(pile, [-0.8, 0, -0.04], 0.2, C.teal, C.cream, look + 0.45),
    plush(pile, [-0.47, 0, -0.16], 0.12, C.trim, INK.pink, look - 0.75),
    plush(pile, [-0.24, 0, 0.05], 0.1, C.black, C.grey, look + 0.9, true),
    plush(pile, [0.02, 0, -0.1], 0.13, C.sky, C.trim, look - 0.35),
    plush(pile, [0.37, 0, 0.04], 0.1, C.red, C.cream, look + 1.4),
    plush(pile, [0.5, 0, -0.2], 0.11, INK.amber, C.trim, look - 1.1, true),
    plush(pile, [0.84, 0, -0.02], 0.12, INK.pink, C.cream, look + 0.25),
  ];
  // Leans, as [forward, sideways]
  const leans: [number, number][] = [
    [0.08, -0.1],
    [0, 0.22],
    [-0.12, 0],
    [0.1, 0.14],
    [0, -0.3],
    [0.16, 0.06],
    [-0.06, -0.16],
  ];
  toys.forEach((toy, i) => {
    toy.rotation.x = leans[i][0];
    toy.rotation.z = leans[i][1];
  });
  k.refs.bigPlush = toys[0];
  add("plush", pile, {
    collect: false,
    hit: [2.0, 0.6, 0.5],
    hitAt: [0, 0.28, 0],
    top: 0.82,
    zoom: 2.8,
    dur: 1.1,
    react: (p) => {
      toys.forEach((toy, i) => {
        const q = arc(part(p, i * 0.07, 0.5 + i * 0.07));
        toy.scale.set(1 + 0.16 * q, 1 - 0.2 * q, 1 + 0.16 * q);
        toy.position.y =
          Math.sin(part(p, i * 0.07 + 0.2, 0.7 + i * 0.07) * Math.PI) * 0.14;
      });
    },
  });

  buildOverTheBed(k, dream, bz);
}

/* On the wall over the head of the bed: the wavy light, the speech bubble
   and the frames */
function buildOverTheBed(k: Kit, dream: Mesh, bz: number) {
  const { screens, add, foil, walls } = k;
  const e = walls.e.node;

  const wave = new CatmullRomCurve3(
    Array.from(
      { length: 9 },
      (_, i) =>
        new Vector3(
          W - 0.03,
          1.8 + Math.sin(i * 1.5) * 0.14 + i * 0.012,
          bz - 0.66 + i * 0.105
        )
    )
  );
  foil(e, new TubeGeometry(wave, 48, 0.02, 8), [0, 0, 0], 0, 0.9);
  const neon = turned(e, [W - 0.02, 1.9, bz + 0.46], -TURN);
  const bubble = picture(
    neon,
    screens.bubble.tex,
    0.42,
    0.42,
    [0, 0, 0],
    0,
    true
  );
  add("neon", neon, {
    collect: false,
    hit: [0.44, 0.44, 0.1],
    hitAt: [0, 0, 0.03],
    top: 0.3,
    zoom: 2.2,
    az: -52,
    wall: "e",
    dur: 0.9,
    react: (p, t) => {
      bubble.visible = p >= 1 || Math.sin(t * 38) > -0.2;
      dream.visible = bubble.visible;
    },
  });

  // The certificate
  const diploma = group(
    turned(e, [W - 0.02, 1.4, bz - 0.2], -TURN),
    [0, 0, 0],
    true
  );
  box(diploma, C.woodDark, [0.5, 0.39, 0.03], [0, -0.195, 0]);
  picture(
    diploma,
    screens.diploma.tex,
    0.42,
    0.32,
    [0, 0, 0.0165],
    0,
    false,
    0.018
  );
  const cap = group(diploma, [0.2, 0.2, 0.05], true);
  cap.rotation.set(0.2, 0.5, -0.3);
  cyl(cap, C.black, [0.07, 0.075, 0.06], [0, -0.06, 0]);
  box(cap, C.black, [0.24, 0.016, 0.24], [0, 0, 0]);
  box(cap, INK.amber, [0.012, 0.11, 0.012], [0.11, -0.1, 0.11]);
  add("diploma", diploma, {
    hit: [0.6, 0.56, 0.2],
    hitAt: [0, 0.02, 0.04],
    top: 0.42,
    zoom: 2.2,
    az: -52,
    wall: "e",
    dur: 1.4,
    react: (p, t) => {
      diploma.rotation.z = Math.sin(t * 9) * 0.1 * (1 - p);
      const q = part(p, 0, 0.8);
      cap.position.set(0.2, 0.2 + arc(q) * 0.42, 0.05 + arc(q) * 0.2);
      cap.rotation.set(0.2 + easeInOut(q) * Math.PI * 2, 0.5, -0.3);
    },
  });
  // The small frame beside it
  box(e, C.black, [0.025, 0.2, 0.24], [W - 0.02, 1.34, bz + 0.34]);
  box(e, INK.cyan, [0.006, 0.15, 0.19], [W - 0.035, 1.365, bz + 0.34]);
}

/* The door wall: the TV on its arm by the foot of the bed, then the door,
   with the name on the shelf over it */
function buildDoorWall(k: Kit) {
  const { screens, add, walls } = k;
  const s = walls.s.node;

  box(s, C.trim, [1.02, 2.08, 0.03], [0.66, 0, D - 0.015]);
  box(s, C.white, [0.86, 2.0, 0.05], [0.66, 0, D - 0.04]);
  box(s, C.cream, [0.6, 0.7, 0.012], [0.66, 1.1, D - 0.068]);
  box(s, C.cream, [0.6, 0.7, 0.012], [0.66, 0.22, D - 0.068]);
  box(s, C.grey, [0.12, 0.03, 0.05], [0.98, 1.0, D - 0.09]);
  // The shelf over the door, and the name
  box(s, C.trim, [1.02, 0.04, 0.22], [0.66, 2.12, D - 0.11]);
  box(s, C.trim, [0.86, 0.22, 0.03], [0.66, 2.16, D - 0.13]);
  picture(
    s,
    screens.sign.tex,
    0.8,
    0.19,
    [0.66, 2.27, D - 0.1465],
    Math.PI,
    false,
    0.03
  );

  box(s, C.black, [0.06, 0.06, 0.2], [1.66, 1.4, D - 0.1]);
  const tv = group(
    turned(s, [1.66, 1.12, D - 0.22], TURN - 0.12),
    [0, 0, 0],
    true
  );
  box(tv, C.black, [0.04, 0.62, 1.06], [0, 0, 0], { corner: 0.04 });
  picture(tv, screens.tv.tex, 1.0, 0.56, [0.0215, 0.31, 0], TURN, false, 0.02);
  add("tv", tv, {
    hit: [0.2, 0.7, 1.14],
    hitAt: [0.03, 0.31, 0],
    top: 0.8,
    zoom: 2.6,
    az: -150,
    wall: "s",
    dur: 1.5,
    react: (p) => {
      screens.tv.draw(easeOut(p));
      tv.scale.setScalar(1 + 0.05 * arc(part(p, 0, 0.3)));
    },
  });
}

/* The boss chair, at the main desk */
function buildBossChair(k: Kit) {
  const { root, add } = k;
  const spin = -2.0;

  const boss = chair(root, [1.5, 0, 1.52], spin, C.black, C.coal, {
    back: k.screens.secretlab.tex,
    pillow: k.screens.secretlab.tex,
  });
  const crown = group(boss.top, [0, 1.42, -0.39], true);
  cyl(crown, INK.amber, [0.11, 0.1, 0.06], [0, 0, 0]);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    cyl(
      crown,
      INK.amber,
      [0, 0.035, 0.085],
      [Math.cos(a) * 0.085, 0.055, Math.sin(a) * 0.085]
    );
  }
  crown.visible = false;
  add("chair", boss.g, {
    hit: [0.7, 1.3, 0.7],
    hitAt: [0, 0.65, 0],
    top: 1.42,
    zoom: 2.9,
    dur: 1.7,
    react: (p) => {
      boss.top.rotation.y = spin + easeInOut(part(p, 0, 0.8)) * Math.PI * 4;
      crown.visible = p > 0.25;
      const q = part(p, 0.25, 1);
      crown.position.y = 2.04 - 0.62 * easeOut(q) + 0.06 * arc(part(q, 0.6, 1));
      crown.rotation.y = q * Math.PI * 2;
    },
  });
}

/* The supply crate, the one thing on the floor */
function buildSupplyCrate(k: Kit) {
  const { root, logos, add, foil, idles } = k;

  const crate = group(root, [1.12, 0, 2.62], true);
  crate.rotation.y = -0.3;
  const band = { axis: "x" as const, r: 0.02, corner: 0.05 };
  box(crate, INK.amber, [0.74, 0.5, 0.74], [0, 0, 0], {
    r: 0.045,
    corner: 0.1,
  });
  for (const x of [-0.2, 0.2]) {
    box(crate, C.trim, [0.11, 0.51, 0.76], [x, 0, 0], band);
  }
  box(crate, C.black, [0.16, 0.14, 0.03], [0, 0.26, 0.38]);
  const lid = group(crate, [0, 0.5, -0.39], true);
  box(lid, INK.amber, [0.8, 0.12, 0.8], [0, 0, 0.39], {
    r: 0.05,
    corner: 0.12,
  });
  for (const x of [-0.2, 0.2]) {
    box(lid, C.trim, [0.11, 0.13, 0.82], [x, 0, 0.39], band);
  }
  const prize = group(crate, [0, 0.3, 0], true);
  prize.rotation.y = HOME_AZ + 0.3;
  foil(prize, new CircleGeometry(0.32, 28), [0, 0, -0.01], 0.05, 0.5);
  plain(
    prize,
    new CircleGeometry(0.27, 28),
    new MeshBasicMaterial({ color: INK.paper3 }),
    [0, 0, 0]
  );
  if (logos.ryu) {
    picture(prize, logos.ryu, 0.38, 0.38, [0, 0, 0.01], 0, true);
  }
  prize.visible = false;
  const cubes = INK_LIST.concat(INK.paper3, INK.pink).map((ink, i) => {
    const cube = group(crate, [0, 0.3, 0], true);
    box(cube, ink, [0.1, 0.1, 0.1], [0, -0.05, 0]);
    cube.visible = false;
    return { cube, a: (i / 9) * Math.PI * 2 };
  });
  let crateOpen = 0;
  idles.push((time) => {
    if (crateOpen <= 0) {
      return;
    }
    cubes.forEach(({ cube, a }, i) => {
      const turn = a + time * 0.35;
      cube.position.set(
        Math.cos(turn) * 0.62 * crateOpen,
        0.3 + (0.72 + Math.sin(time * 1.6 + i) * 0.07) * crateOpen,
        Math.sin(turn) * 0.62 * crateOpen
      );
      cube.rotation.set(time * 0.7 + i, time * 0.5 + i, 0);
    });
    prize.position.y = 0.3 + 0.95 * crateOpen + Math.sin(time * 1.3) * 0.03;
  });
  add("crate", crate, {
    hit: [0.9, 0.9, 0.9],
    hitAt: [0, 0.42, 0],
    top: 1.02,
    zoom: 3,
    dur: 1.5,
    react: (p) => {
      lid.rotation.x = -1.95 * easeBack(part(p, 0, 0.45));
      crateOpen = easeOut(part(p, 0.2, 1));
      prize.visible = p > 0.2;
      prize.scale.setScalar(Math.max(0.01, easeBack(part(p, 0.2, 0.75))));
      for (const { cube } of cubes) {
        cube.visible = p > 0.2;
        cube.scale.setScalar(Math.max(0.01, crateOpen));
      }
    },
  });
}

export function buildRoom(
  mats: Mats,
  screens: Screens,
  logos: Logos,
  /** Dresses the room up before it is welded: the December decorations */
  decorate?: (k: Kit) => void
) {
  const root = new Group();
  const actors: Actor[] = [];
  const idles: ((time: number, dt: number) => void)[] = [];
  const marked = new Set<string>();
  const rand = dice(2026);

  const wall = (id: WallId, nx: number, nz: number): Wall => ({
    id,
    node: group(root, [0, 0, 0], true),
    nx,
    nz,
    stand: true,
    up: 1,
  });
  const walls: Record<WallId, Wall> = {
    n: wall("n", 0, -1),
    e: wall("e", 1, 0),
    s: wall("s", 0, 1),
    w: wall("w", -1, 0),
  };

  /** Pieces of foil: each shows a slice of the gradient, and it all drifts */
  const foil = (
    parent: Object3D,
    geo: BufferGeometry,
    at: V3,
    from: number,
    to: number,
    rot?: V3
  ) => plain(parent, foilSlice(geo, from, to), mats.foil, at, rot);

  const add = (id: string, node: Object3D, o: Press) => {
    if (o.markAt) {
      marked.add(id);
    }
    const hit = new Mesh(new BoxGeometry(...o.hit));
    hit.position.set(...o.hitAt);
    hit.layers.set(1);
    hit.userData.actor = id;
    node.add(hit);
    actors.push({
      id,
      collect: o.collect ?? true,
      root: node,
      baseY: node.position.y,
      hit,
      // Both are turned into room space once everything is in place
      anchor: o.markAt
        ? new Vector3(...o.markAt)
        : new Vector3(0, o.top - o.hitAt[1], 0),
      focus: new Vector3(...o.hitAt),
      zoom: o.zoom,
      az: o.az === undefined ? HOME_AZ : (o.az * Math.PI) / 180,
      wall: o.wall,
      dur: o.dur ?? 1.2,
      react: o.react,
      hover: 0,
      clickedAt: -1,
    });
  };

  const k: Kit = {
    root,
    festive: Boolean(decorate),
    refs: {},
    mats,
    screens,
    logos,
    walls,
    rand,
    idles,
    foil,
    add,
  };
  buildShell(k);
  const glass = buildWindowWall(k);
  buildMainDesk(k);
  buildPC(k);
  buildStreamLight(k);
  buildHighShelfAndItsTrophies(k);
  buildDrawersAndTheFan(k);
  buildSecondDesk(k);
  const dream = buildWardrobe(k);
  buildDeskEnd(k);
  buildBed(k, dream);
  buildDoorWall(k);
  buildBossChair(k);
  buildSupplyCrate(k);
  decorate?.(k);

  weld(root, mats);

  /* Work out where each marker floats and where the camera should look */
  root.updateMatrixWorld(true);
  for (const actor of actors) {
    actor.root.localToWorld(actor.focus);
    if (marked.has(actor.id)) {
      actor.root.localToWorld(actor.anchor);
    } else {
      // Straight above, whichever way the thing itself is turned
      actor.anchor.set(
        actor.focus.x,
        actor.focus.y + actor.anchor.y,
        actor.focus.z
      );
    }
  }

  return {
    root,
    actors,
    walls: Object.values(walls),
    glass,
    /** Things that move without being asked */
    idle: (time: number, dt: number) => {
      for (const fn of idles) {
        fn(time, dt);
      }
    },
  };
}

export interface Logos {
  ryu?: Texture;
  claude?: Texture;
}

export type Room = ReturnType<typeof buildRoom>;
