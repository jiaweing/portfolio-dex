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
  weld,
} from "./kit";
import type { Screens } from "./screens";

/* The room itself. It follows the real one: the wooden desk with two
   monitors and a third in the corner, the stream light over them, the high
   shelf, the white drawers with the fan, the TV on its arm, the second desk
   under the curtain with the white chair, the wardrobe with the neon on top,
   and the bed with its pile of plush toys under the wavy light. The mess is
   left out. Sizes are in metres, more or less. */

export const ROOM = { w: 5.6, d: 4.8, h: 2.8 };

type V3 = [number, number, number];

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
  /** Seconds its reaction lasts */
  dur: number;
  /** p runs 0 to 1 over the reaction, t is seconds since the click */
  react?: (p: number, t: number) => void;
  hover: number;
  clickedAt: number;
}

const C = {
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

function group(parent: Object3D, at: V3 = [0, 0, 0], own = false) {
  const g = new Group();
  g.position.set(...at);
  g.userData.own = own;
  parent.add(g);
  return g;
}

/** A mesh with its own material, left out of the weld */
function plain(
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

/** A flat picture. It faces +z until it is turned. */
function picture(
  parent: Object3D,
  tex: Texture,
  w: number,
  h: number,
  at: V3,
  rotY = 0,
  cutout = false
) {
  const mat = new MeshBasicMaterial({
    map: tex,
    transparent: cutout,
    depthWrite: !cutout,
  });
  if (cutout) {
    mat.side = DoubleSide;
  }
  return plain(parent, new PlaneGeometry(w, h), mat, at, [0, rotY, 0]);
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
  cyl(g, C.black, [0.09, 0.11, 0.02, 10], [0, 0, -0.04]);
  box(g, C.black, [0.035, neck + h / 2, 0.035], [0, 0.02, -0.045]);
  const head = group(g, [0, neck, 0], true);
  box(head, C.black, [w + 0.04, h + 0.04, 0.03], [0, 0, 0]);
  picture(head, tex, w, h, [0, (h + 0.04) / 2, 0.0165]);
  return { g, head };
}

/** A gaming chair, facing +z. The seat spins on its base. */
function chair(
  parent: Object3D,
  at: V3,
  rotY: number,
  shell: Color,
  pad: Color
) {
  const g = group(parent, at, true);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const leg = box(g, C.black, [0.3, 0.035, 0.05], [0, 0.03, 0]);
    leg.position.x = Math.cos(a) * 0.15;
    leg.position.z = Math.sin(a) * 0.15;
    leg.rotation.y = -a;
    ball(g, C.coal, 0.035, [Math.cos(a) * 0.29, 0.035, Math.sin(a) * 0.29], {
      detail: 0,
      edges: false,
    });
  }
  cyl(g, C.black, [0.03, 0.03, 0.32, 8], [0, 0.06, 0]);
  const top = group(g, [0, 0, 0], true);
  top.rotation.y = rotY;
  box(top, shell, [0.54, 0.1, 0.5], [0, 0.38, 0]);
  box(top, pad, [0.44, 0.035, 0.42], [0, 0.48, 0.02]);
  box(top, shell, [0.52, 0.8, 0.1], [0, 0.46, -0.25], { rot: [-0.13, 0, 0] });
  box(top, pad, [0.36, 0.22, 0.05], [0, 0.6, -0.18], { rot: [-0.13, 0, 0] });
  box(top, pad, [0.3, 0.14, 0.06], [0, 1.02, -0.24], { rot: [-0.13, 0, 0] });
  for (const side of [-1, 1]) {
    box(top, C.black, [0.04, 0.17, 0.04], [side * 0.3, 0.46, 0.02]);
    box(top, C.black, [0.07, 0.035, 0.3], [side * 0.3, 0.63, 0.04]);
  }
  return { g, top };
}

/** A round plush toy: no one in particular */
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
  ball(g, fur, r, [0, r * 0.85, 0], { squash: [1.12, 0.92, 1] });
  ball(g, belly, r * 0.62, [0, r * 0.78, r * 0.62], { squash: [1, 1, 0.5] });
  ball(g, fur, r * 0.74, [0, r * 1.95, 0]);
  for (const side of [-1, 1]) {
    if (pointy) {
      cyl(g, fur, [0, r * 0.2, r * 0.55, 5], [side * r * 0.42, r * 2.45, 0]);
    } else {
      ball(g, fur, r * 0.26, [side * r * 0.52, r * 2.58, 0]);
    }
    ball(g, C.black, r * 0.075, [side * r * 0.26, r * 2.06, r * 0.66], {
      detail: 0,
      edges: false,
    });
  }
  return g;
}

/** One letter in its envelope, lying flat on `at` */
function envelope(parent: Object3D, at: V3, rot: V3, own = false) {
  const g = group(parent, at, own);
  g.rotation.set(...rot);
  box(g, C.cream, [0.27, 0.014, 0.18], [0, 0, 0]);
  box(g, INK.pink, [0.045, 0.004, 0.045], [0.09, 0.014, -0.05], {
    edges: false,
  });
  return g;
}

interface Kit {
  root: Group;
  mats: Mats;
  screens: Screens;
  logos: Logos;
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
  dur?: number;
  react?: Actor["react"];
}

const { w: W, d: D, h: H } = ROOM;

/* The shell */
function buildShell(k: Kit) {
  const { root, foil, rand } = k;

  box(
    root,
    C.floor,
    [W + 0.16, 0.3, D + 0.16],
    [W / 2 - 0.08, -0.3, D / 2 - 0.08]
  );
  box(
    root,
    C.plinth,
    [W + 0.16, 0.14, D + 0.16],
    [W / 2 - 0.08, -0.44, D / 2 - 0.08]
  );
  box(root, C.wall, [0.16, H, D + 0.16], [-0.08, 0, D / 2 - 0.08]);
  box(root, C.wall, [W, H, 0.16], [W / 2, 0, -0.08]);
  // The cove under the ceiling, and the light strip that runs along it
  box(root, C.trim, [0.07, 0.09, D], [0.035, H - 0.12, D / 2]);
  box(root, C.trim, [W - 0.07, 0.09, 0.07], [W / 2 + 0.035, H - 0.12, 0.035]);
  foil(
    root,
    new BoxGeometry(0.03, 0.035, D - 0.08),
    [0.05, H - 0.15, D / 2 + 0.04],
    0,
    1.2
  );
  foil(
    root,
    new BoxGeometry(W - 0.08, 0.035, 0.03),
    [W / 2 + 0.04, H - 0.15, 0.05],
    1.2,
    2.5
  );
  // Skirting
  box(root, C.trim, [0.03, 0.09, D], [0.015, 0, D / 2], { edges: false });
  box(root, C.trim, [W, 0.09, 0.03], [W / 2, 0, 0.015], { edges: false });

  // Terrazzo chips in the floor
  const chips = [C.coal, C.trim, C.woodDark, C.grey, C.grey, C.trim];
  for (let i = 0; i < 110; i++) {
    const s = 0.035 + rand() * 0.05;
    const chip = box(
      root,
      chips[Math.floor(rand() * chips.length)],
      [s, 0.003, s * (0.6 + rand() * 0.6)],
      [0.2 + rand() * (W - 0.4), 0.0005, 0.2 + rand() * (D - 0.4)],
      { edges: false }
    );
    chip.rotation.y = rand() * Math.PI;
  }
}

/* The window and its curtain (back wall) */
function buildWindowAndItsCurtain(k: Kit) {
  const { root, screens } = k;

  box(root, C.trim, [1.6, 1.3, 0.05], [1.95, 0.95, 0.025]);
  const glass = picture(root, screens.day.tex, 1.44, 1.14, [1.95, 1.6, 0.052]);
  box(root, C.trim, [0.04, 1.14, 0.03], [1.95, 1.03, 0.055], { edges: false });
  box(root, C.trim, [1.44, 0.04, 0.03], [1.95, 1.58, 0.055], { edges: false });
  cyl(root, C.black, [0.014, 0.014, 2.1, 6], [1.95, 2.38, 0.13], {
    rot: [0, 0, Math.PI / 2],
    edges: false,
  }).position.y = 2.38;
  const slat = (x: number, i: number) =>
    box(
      root,
      i % 2 ? C.curtain : oklch(0.4, 0.03, 165),
      [0.125, 2.02, 0.05],
      [x, 0.34, i % 2 ? 0.1 : 0.14]
    );
  for (let i = 0; i < 5; i++) {
    slat(0.98 + i * 0.12, i);
  }
  for (let i = 0; i < 3; i++) {
    slat(2.62 + i * 0.12, i + 1);
  }
  return glass;
}

/* The main desk (left wall) */
function buildMainDesk(k: Kit) {
  const { root, screens, add, foil, idles } = k;

  box(root, C.wood, [0.82, 0.05, 2.2], [0.48, 0.72, 1.45]);
  for (const z of [0.6, 2.3]) {
    box(root, C.black, [0.08, 0.72, 0.1], [0.44, 0, z]);
    box(root, C.black, [0.72, 0.03, 0.1], [0.46, 0, z], { edges: false });
  }
  // The glow behind the monitors
  foil(root, new BoxGeometry(0.05, 0.06, 1.5), [0.1, 0.8, 1.55], 0.5, 0.1);
  // Keyboard, mouse and a cup
  box(root, C.grey, [0.17, 0.022, 0.44], [0.62, 0.77, 1.5]);
  box(root, C.cream, [0.13, 0.012, 0.4], [0.62, 0.792, 1.5], { edges: false });
  box(root, INK.pink, [0.03, 0.014, 0.03], [0.665, 0.792, 1.31], {
    edges: false,
  });
  box(root, INK.cyan, [0.03, 0.014, 0.06], [0.665, 0.792, 1.68], {
    edges: false,
  });
  box(root, C.coal, [0.27, 0.006, 0.3], [0.62, 0.77, 2.0]);
  ball(root, C.black, 0.035, [0.62, 0.795, 2.0], {
    squash: [1, 0.6, 1.5],
    detail: 0,
  });
  cyl(root, C.cream, [0.04, 0.032, 0.11, 8], [0.3, 0.77, 2.42]);
  // The mic on its arm
  box(root, C.black, [0.025, 0.46, 0.025], [0.12, 0.77, 2.46]);
  box(root, C.black, [0.34, 0.025, 0.025], [0.27, 1.22, 2.42], {
    rot: [0, 0.35, 0],
  });
  cyl(root, C.coal, [0.04, 0.04, 0.13, 8], [0.42, 1.08, 2.36]);

  // The two monitors
  const monA = monitor(
    root,
    [0.24, 0.77, 1.2],
    0.64,
    0.36,
    screens.right,
    Math.PI / 2 - 0.14
  );
  const monB = monitor(
    root,
    [0.24, 0.77, 1.9],
    0.64,
    0.36,
    screens.left,
    Math.PI / 2 + 0.14
  );
  // (the picture runs left to right as you sit at the desk)
  const monitors = group(root, [0.24, 0.77, 1.55], true);
  add("monitors", monitors, {
    hit: [0.3, 0.6, 1.45],
    hitAt: [0.05, 0.36, 0],
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

  // The third screen, turned in from the corner
  monitor(root, [0.36, 0.77, 0.6], 0.56, 0.32, screens.code.tex, 0.72, 0.2);

  // The phone on its stand
  const phone = group(root, [0.64, 0.77, 2.32], true);
  box(phone, C.coal, [0.09, 0.02, 0.09], [0, 0, 0]);
  const handset = group(phone, [0, 0.02, 0], true);
  handset.rotation.set(0, Math.PI / 2 - 0.3, 0);
  box(handset, C.black, [0.095, 0.19, 0.014], [0, 0, 0], {
    rot: [-0.22, 0, 0],
  });
  const phoneScreen = picture(
    handset,
    screens.phone.tex,
    0.08,
    0.165,
    [0, 0.096, 0.012]
  );
  phoneScreen.rotation.x = -0.22;
  add("phone", phone, {
    hit: [0.26, 0.34, 0.26],
    hitAt: [0, 0.14, 0],
    top: 0.34,
    zoom: 1.7,
    react: (p) => {
      handset.position.y = 0.02 + arc(p) * 0.22;
      handset.rotation.y = Math.PI / 2 - 0.3 + easeInOut(p) * Math.PI * 2;
    },
  });

  // The PC under the desk
  const pc = group(root, [0.46, 0.03, 2.05], true);
  box(pc, C.black, [0.5, 0.5, 0.24], [0, 0, 0]);
  box(pc, C.coal, [0.03, 0.42, 0.18], [0.245, 0.04, 0], { edges: false });
  const fans: Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const fan = foil(
      pc,
      new CylinderGeometry(0.058, 0.058, 0.012, 6),
      [0.262, 0.11 + i * 0.14, 0],
      i * 0.3,
      i * 0.3 + 0.25,
      [0, 0, Math.PI / 2]
    );
    fans.push(fan);
  }
  let pcSpin = 1.4;
  idles.push((_time, dt) => {
    pcSpin += (1.4 - pcSpin) * Math.min(1, dt * 0.8);
    for (const fan of fans) {
      fan.rotation.x += dt * pcSpin;
    }
  });
  add("pc", pc, {
    collect: false,
    hit: [0.56, 0.54, 0.3],
    hitAt: [0.02, 0.26, 0],
    top: 0.62,
    zoom: 2.4,
    dur: 0.9,
    react: (p, t) => {
      pcSpin = 26;
      pc.rotation.z = Math.sin(t * 46) * 0.03 * (1 - p);
    },
  });
}

/* The stream light */
function buildStreamLight(k: Kit) {
  const { root, screens, add, foil } = k;

  box(root, C.black, [0.03, 1.2, 0.03], [0.07, 0.77, 1.55], { edges: false });
  box(root, C.black, [0.3, 0.03, 0.03], [0.2, 1.95, 1.55], { edges: false });
  const light = group(root, [0.4, 1.84, 1.55], true);
  light.rotation.z = 0.95;
  box(light, C.black, [0.56, 0.16, 0.64], [0, -0.08, 0]);
  const diffuser = plain(
    light,
    new PlaneGeometry(0.5, 0.58),
    new MeshBasicMaterial({ map: screens.softbox.tex }),
    [0, -0.084, 0],
    [Math.PI / 2, 0, 0]
  );
  const beam = plain(
    light,
    new CylinderGeometry(0.3, 0.72, 1.05, 4, 1, true),
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
    hit: [0.66, 0.4, 0.7],
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
      light.rotation.z = 0.95 + 0.12 * arc(part(p, 0, 0.4));
    },
  });

  // Two light bars on the wall beside the desk
  foil(root, new BoxGeometry(0.035, 1.0, 0.035), [0.04, 1.45, 2.61], 0.1, 0.16);
  foil(
    root,
    new BoxGeometry(0.035, 1.0, 0.035),
    [0.04, 1.45, 2.68],
    0.55,
    0.61
  );
}

/* The high shelf and its trophies */
function buildHighShelfAndItsTrophies(k: Kit) {
  const { root, screens, logos, add } = k;

  box(root, C.trim, [0.28, 0.04, 4.4], [0.14, 2.2, 2.5]);
  for (const z of [0.6, 1.6, 2.6, 3.6, 4.5]) {
    box(root, C.trim, [0.2, 0.12, 0.03], [0.1, 2.08, z], { edges: false });
  }
  const yellow = plush(
    root,
    [0.15, 2.24, 0.66],
    0.085,
    C.yellow,
    C.cream,
    Math.PI / 2 - 0.3,
    true
  );
  add("yellow", yellow, {
    collect: false,
    hit: [0.26, 0.3, 0.26],
    hitAt: [0, 0.13, 0],
    top: 0.34,
    zoom: 1.9,
    dur: 0.7,
    react: (p) => {
      yellow.scale.set(1 + 0.2 * arc(p), 1 - 0.25 * arc(p), 1 + 0.2 * arc(p));
    },
  });

  // BLOCK71: the cup
  const cup = group(root, [0.15, 2.24, 1.3], true);
  box(cup, C.black, [0.13, 0.035, 0.13], [0, 0, 0]);
  cyl(cup, INK.lime, [0.025, 0.04, 0.08, 8], [0, 0.035, 0]);
  cyl(cup, INK.lime, [0.085, 0.04, 0.13, 8], [0, 0.115, 0]);
  for (const side of [-1, 1]) {
    box(cup, INK.lime, [0.02, 0.07, 0.02], [0, 0.15, side * 0.1]);
    box(cup, INK.lime, [0.02, 0.02, 0.05], [0, 0.2, side * 0.08], {
      edges: false,
    });
  }
  picture(cup, screens.n71.tex, 0.075, 0.075, [0.071, 0.18, 0], Math.PI / 2);
  add("cup", cup, {
    hit: [0.26, 0.34, 0.3],
    hitAt: [0, 0.14, 0],
    top: 0.36,
    zoom: 1.8,
    react: (p) => {
      cup.position.y += arc(p) * 0.26;
      cup.rotation.y = easeInOut(p) * Math.PI * 4;
    },
  });

  // Anthropic partner: the plaque
  const plaque = group(root, [0.15, 2.24, 1.92], true);
  box(plaque, C.woodDark, [0.1, 0.03, 0.26], [0, 0, 0]);
  const slab = group(plaque, [-0.01, 0.03, 0], true);
  slab.rotation.z = 0.16;
  box(slab, C.woodDark, [0.03, 0.24, 0.24], [0, 0, 0]);
  box(slab, C.cream, [0.006, 0.19, 0.19], [0.017, 0.025, 0], { edges: false });
  if (logos.claude) {
    picture(
      slab,
      logos.claude,
      0.13,
      0.13,
      [0.0215, 0.12, 0],
      Math.PI / 2,
      true
    );
  }
  add("plaque", plaque, {
    hit: [0.26, 0.34, 0.32],
    hitAt: [0, 0.14, 0],
    top: 0.36,
    zoom: 1.8,
    react: (p, t) => {
      plaque.position.y += arc(part(p, 0, 0.5)) * 0.16;
      slab.rotation.z = 0.16 + Math.sin(t * 11) * 0.22 * (1 - p);
    },
  });

  // Comebck mentor: the medal on its hook
  const medal = group(root, [0.15, 2.24, 2.5], true);
  box(medal, C.black, [0.12, 0.03, 0.12], [0, 0, 0]);
  box(medal, C.black, [0.02, 0.3, 0.02], [-0.03, 0.03, 0], { edges: false });
  box(medal, C.black, [0.09, 0.02, 0.02], [0.005, 0.31, 0], { edges: false });
  const swing = group(medal, [0.04, 0.31, 0], true);
  box(swing, INK.indigo, [0.012, 0.14, 0.035], [0, -0.13, -0.022], {
    rot: [0.28, 0, 0],
  });
  box(swing, INK.indigo, [0.012, 0.14, 0.035], [0, -0.13, 0.022], {
    rot: [-0.28, 0, 0],
  });
  cyl(swing, INK.amber, [0.058, 0.058, 0.018, 10], [0, -0.19, 0], {
    rot: [0, 0, Math.PI / 2],
  }).position.set(0, -0.18, 0);
  add("medal", medal, {
    hit: [0.26, 0.4, 0.28],
    hitAt: [0, 0.17, 0],
    top: 0.42,
    zoom: 1.8,
    dur: 1.8,
    react: (p, t) => {
      swing.rotation.x = Math.sin(t * 8.5) * 0.75 * (1 - p) ** 1.5;
    },
  });

  // A few small figures at the far end of the shelf
  [C.sky, C.red, C.teal, INK.magenta].forEach((fur, i) => {
    ball(root, fur, 0.045, [0.14, 2.285, 3.05 + i * 0.16], {
      squash: [1, 1.15, 1],
    });
    ball(root, fur, 0.03, [0.14, 2.35, 3.05 + i * 0.16]);
  });
  // The name over the TV
  box(root, C.trim, [0.03, 0.22, 0.86], [0.2, 2.24, 4.15]);
  picture(root, screens.sign.tex, 0.8, 0.2, [0.2165, 2.35, 4.15], Math.PI / 2);
}

/* The drawers and the fan */
function buildDrawersAndTheFan(k: Kit) {
  const { root, add, idles } = k;

  const drawers = group(root, [0.36, 0, 3.08], true);
  box(drawers, C.white, [0.6, 0.72, 0.66], [0, 0, 0]);
  const fronts: Group[] = [];
  for (let i = 0; i < 3; i++) {
    const front = group(drawers, [0.3, 0.05 + i * 0.225, 0], true);
    box(front, C.white, [0.03, 0.2, 0.6], [0.015, 0, 0]);
    box(front, C.grey, [0.02, 0.025, 0.16], [0.04, 0.13, 0], { edges: false });
    box(front, C.cream, [0.26, 0.16, 0.56], [-0.13, 0.01, 0], {
      edges: false,
    });
    fronts.push(front);
  }
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
  add("drawers", drawers, {
    hit: [0.7, 0.76, 0.7],
    hitAt: [0.03, 0.38, 0],
    top: 1,
    markAt: [0.24, 0.98, 0.22],
    zoom: 2.6,
    dur: 1.6,
    react: (p, t) => {
      fronts.forEach((front, i) => {
        const order = 2 - i;
        front.position.x =
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

  const fan = group(root, [0.32, 0.72, 2.95], true);
  cyl(fan, C.black, [0.09, 0.11, 0.03, 10], [0, 0, 0]);
  box(fan, C.black, [0.035, 0.16, 0.035], [0, 0.03, 0], { edges: false });
  const cage = cyl(fan, C.coal, [0.17, 0.17, 0.07, 12], [0, 0, 0], {
    rot: [0, 0, Math.PI / 2],
  });
  cage.position.set(0.02, 0.33, 0);
  const blades = group(fan, [0.062, 0.33, 0], true);
  for (let i = 0; i < 3; i++) {
    const blade = box(blades, C.grey, [0.008, 0.14, 0.06], [0, 0, 0], {
      edges: false,
    });
    const a = (i / 3) * Math.PI * 2;
    blade.position.set(0, Math.cos(a) * 0.075, Math.sin(a) * 0.075);
    blade.rotation.x = a;
  }
  cyl(blades, C.black, [0.03, 0.03, 0.016, 8], [0, 0, 0], {
    rot: [0, 0, Math.PI / 2],
    edges: false,
  }).position.set(0.004, 0, 0);
  let fanSpin = 2.2;
  idles.push((_time, dt) => {
    fanSpin += (2.2 - fanSpin) * Math.min(1, dt * 0.6);
    blades.rotation.x += dt * fanSpin;
  });
  add("fan", fan, {
    collect: false,
    hit: [0.3, 0.52, 0.4],
    hitAt: [0.02, 0.26, 0],
    top: 0.6,
    zoom: 2.2,
    dur: 0.6,
    react: (p) => {
      fanSpin = 30;
      fan.rotation.y = Math.sin(p * Math.PI * 2) * 0.5;
    },
  });
}

/* The TV */
function buildTV(k: Kit) {
  const { root, screens, add } = k;

  box(root, C.white, [0.4, 0.5, 0.9], [0.22, 0, 4.15]);
  box(root, C.cream, [0.02, 0.4, 0.38], [0.425, 0.05, 3.95], { edges: false });
  box(root, C.cream, [0.02, 0.4, 0.38], [0.425, 0.05, 4.35], { edges: false });
  box(root, C.black, [0.14, 0.06, 0.06], [0.07, 1.42, 4.15], { edges: false });
  const tv = group(root, [0.17, 1.14, 4.15], true);
  tv.rotation.y = -0.1;
  box(tv, C.black, [0.04, 0.62, 1.06], [0, 0, 0]);
  picture(tv, screens.tv.tex, 1.0, 0.56, [0.0215, 0.31, 0], Math.PI / 2);
  add("tv", tv, {
    hit: [0.2, 0.7, 1.14],
    hitAt: [0.03, 0.31, 0],
    top: 0.8,
    zoom: 2.6,
    dur: 1.5,
    react: (p) => {
      screens.tv.draw(easeOut(p));
      tv.scale.setScalar(1 + 0.05 * arc(part(p, 0, 0.3)));
    },
  });
}

/* The second desk (back wall) */
function buildSecondDesk(k: Kit) {
  const { root, screens, add } = k;

  box(root, C.wood, [1.6, 0.05, 0.72], [1.95, 0.72, 0.44]);
  for (const x of [1.22, 2.68]) {
    for (const z of [0.14, 0.74]) {
      box(root, C.white, [0.05, 0.72, 0.05], [x, 0, z]);
    }
  }
  monitor(root, [1.68, 0.77, 0.3], 0.6, 0.34, screens.hills.tex, 0.06);
  const tall = monitor(
    root,
    [2.36, 0.77, 0.32],
    0.34,
    0.58,
    screens.posts.tex,
    -0.16,
    0.1
  );
  add("posts", tall.g, {
    hit: [0.46, 0.76, 0.2],
    hitAt: [0, 0.4, 0],
    top: 0.84,
    zoom: 2.3,
    dur: 1.5,
    react: (p) => {
      screens.posts.draw(easeOut(p));
      tall.head.scale.setScalar(1 + 0.07 * arc(part(p, 0, 0.3)));
    },
  });
  box(root, C.woodDark, [0.46, 0.015, 0.2], [1.72, 0.77, 0.62], {
    edges: false,
  });
  box(root, C.white, [0.4, 0.025, 0.13], [1.72, 0.785, 0.62]);
  // A row of small toys, one in each ink of the year
  box(root, C.woodDark, [0.52, 0.035, 0.08], [1.72, 0.77, 0.47]);
  INK_LIST.forEach((ink, i) => {
    ball(root, ink, 0.03, [1.5 + i * 0.073, 0.835, 0.47], { detail: 0 });
  });
  // Flowers
  cyl(root, C.trim, [0.045, 0.035, 0.16, 8], [1.3, 0.77, 0.3]);
  [INK.amber, INK.pink, C.yellow].forEach((petal, i) => {
    const a = i * 2.1;
    box(
      root,
      C.leaf,
      [0.012, 0.16, 0.012],
      [1.3 + Math.cos(a) * 0.03, 0.9, 0.3 + Math.sin(a) * 0.03],
      { edges: false }
    );
    ball(
      root,
      petal,
      0.05,
      [1.3 + Math.cos(a) * 0.05, 1.09 + i * 0.03, 0.3 + Math.sin(a) * 0.05],
      { detail: 0 }
    );
  });

  // The white chair, with its blue cushion
  const guest = chair(
    root,
    [2.3, 0, 1.32],
    Math.PI / 2 + 0.25,
    C.white,
    C.cream
  );
  ball(guest.top, C.sky, 0.17, [0, 0.62, 0.02], { squash: [1.1, 0.8, 1] });
  for (const side of [-1, 1]) {
    ball(guest.top, C.sky, 0.05, [side * 0.12, 0.76, 0.02]);
  }
  add("guest", guest.g, {
    collect: false,
    hit: [0.66, 1.2, 0.66],
    hitAt: [0, 0.6, 0],
    top: 1.3,
    zoom: 2.8,
    dur: 1.4,
    react: (p) => {
      guest.top.rotation.y = Math.PI / 2 + 0.25 + easeInOut(p) * Math.PI * 2;
    },
  });
}

/* The wardrobe */
function buildWardrobe(k: Kit) {
  const { root, screens } = k;

  box(root, C.white, [1.0, 2.1, 0.6], [3.5, 0, 0.36]);
  for (const side of [-1, 1]) {
    box(root, C.trim, [0.46, 1.94, 0.02], [3.5 + side * 0.245, 0.08, 0.665]);
    box(root, C.grey, [0.02, 0.14, 0.02], [3.5 + side * 0.05, 1.0, 0.68], {
      edges: false,
    });
  }
  // The black tee on its hanger
  box(root, C.black, [0.34, 0.42, 0.02], [3.27, 1.22, 0.7]);
  for (const side of [-1, 1]) {
    box(root, C.black, [0.16, 0.12, 0.02], [3.27 + side * 0.21, 1.5, 0.7], {
      rot: [0, 0, side * 0.5],
      edges: false,
    });
  }
  box(root, C.grey, [0.012, 0.1, 0.012], [3.27, 1.64, 0.7], { edges: false });
  // On top: the neon and two more toys
  const dream = picture(
    root,
    screens.dream.tex,
    0.62,
    0.27,
    [3.5, 2.27, 0.5],
    0,
    true
  );
  plush(root, [3.14, 2.1, 0.4], 0.09, C.woodDark, C.cream, 0.3);
  plush(root, [3.86, 2.1, 0.4], 0.085, C.red, C.cream, -0.3);
  return dream;
}

/* The bed */
function buildBed(k: Kit, dream: Mesh) {
  const { root, screens, add, foil } = k;

  box(root, C.coal, [1.5, 0.26, 2.1], [4.8, 0, 1.22]);
  box(root, C.sheet, [1.46, 0.2, 2.04], [4.8, 0.26, 1.22]);
  box(root, C.grey, [1.5, 0.98, 0.12], [4.8, 0, 0.12]);
  const bed = group(root, [4.8, 0.46, 1.22], true);
  box(bed, C.white, [0.62, 0.1, 0.36], [-0.36, 0, -0.68]);
  const duvet = group(bed, [0, 0, 0.36], true);
  box(duvet, C.duvet, [1.52, 0.12, 1.34], [0, 0, 0]);
  box(duvet, C.duvet2, [1.52, 0.06, 0.26], [0, 0.12, -0.54]);
  const zeds: Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const z = picture(
      bed,
      screens.zed.tex,
      0.26,
      0.26,
      [-0.36, 0.5, -0.68],
      Math.PI / 4,
      true
    );
    z.visible = false;
    zeds.push(z);
  }
  add("bed", bed, {
    hit: [1.5, 0.5, 2.0],
    hitAt: [0, 0.05, 0],
    top: 0.75,
    zoom: 3.4,
    dur: 2.2,
    react: (p) => {
      duvet.scale.y = 1 + 0.7 * arc(part(p, 0, 0.35));
      zeds.forEach((z, i) => {
        const q = part(p, 0.1 + i * 0.16, 0.62 + i * 0.16);
        z.visible = q > 0 && q < 1;
        z.position.set(-0.36 + q * 0.3 + i * 0.05, 0.4 + q * 1.0, -0.68);
        z.scale.setScalar((0.55 + i * 0.28) * easeBack(Math.min(1, q * 3)));
        (z.material as MeshBasicMaterial).opacity = 1 - part(q, 0.7, 1);
      });
    },
  });

  // The plush pile at the head of the bed
  const pile = group(root, [4.8, 0.46, 0.34], true);
  const toys = [
    plush(pile, [0.44, 0, 0.1], 0.2, C.teal, C.cream, -0.1),
    plush(pile, [0.14, 0, 0.02], 0.13, C.trim, INK.pink, 0.2),
    plush(pile, [-0.02, 0, 0.26], 0.1, C.black, C.grey, -0.2, true),
    plush(pile, [0.3, 0, 0.34], 0.11, C.sky, C.trim, 0.3),
    plush(pile, [0.58, 0, 0.46], 0.1, C.red, C.cream, -0.4),
    plush(pile, [0.14, 0, 0.52], 0.09, INK.amber, C.trim, 0.1, true),
  ];
  add("plush", pile, {
    collect: false,
    hit: [1.0, 0.6, 0.8],
    hitAt: [0.28, 0.28, 0.24],
    top: 0.82,
    zoom: 2.8,
    dur: 1.1,
    react: (p) => {
      toys.forEach((toy, i) => {
        const q = arc(part(p, i * 0.08, 0.5 + i * 0.08));
        toy.scale.set(1 + 0.16 * q, 1 - 0.2 * q, 1 + 0.16 * q);
        toy.position.y =
          Math.sin(part(p, i * 0.08 + 0.2, 0.7 + i * 0.08) * Math.PI) * 0.14;
      });
    },
  });

  // The wavy light, the speech bubble and the frames over the bed
  const wave = new CatmullRomCurve3(
    Array.from(
      { length: 9 },
      (_, i) =>
        new Vector3(
          4.2 + i * 0.105,
          1.5 + Math.sin(i * 1.5) * 0.14 + i * 0.012,
          0.03
        )
    )
  );
  foil(root, new TubeGeometry(wave, 40, 0.02, 5), [0, 0, 0], 0, 0.9);
  const neon = group(root, [5.2, 2.08, 0.02], true);
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
    dur: 0.9,
    react: (p, t) => {
      bubble.visible = p >= 1 || Math.sin(t * 38) > -0.2;
      dream.visible = bubble.visible;
    },
  });

  // The certificate
  const diploma = group(root, [4.52, 2.06, 0.02], true);
  box(diploma, C.woodDark, [0.5, 0.39, 0.03], [0, -0.195, 0]);
  picture(diploma, screens.diploma.tex, 0.42, 0.32, [0, 0, 0.0165]);
  const cap = group(diploma, [0.2, 0.2, 0.05], true);
  cap.rotation.set(0.2, 0.5, -0.3);
  cyl(cap, C.black, [0.07, 0.075, 0.06, 8], [0, -0.06, 0]);
  box(cap, C.black, [0.24, 0.016, 0.24], [0, 0, 0]);
  box(cap, INK.amber, [0.012, 0.11, 0.012], [0.11, -0.1, 0.11], {
    edges: false,
  });
  add("diploma", diploma, {
    hit: [0.6, 0.56, 0.2],
    hitAt: [0, 0.02, 0.04],
    top: 0.42,
    zoom: 2.2,
    dur: 1.4,
    react: (p, t) => {
      diploma.rotation.z = Math.sin(t * 9) * 0.1 * (1 - p);
      const q = part(p, 0, 0.8);
      cap.position.set(0.2, 0.2 + arc(q) * 0.42, 0.05 + arc(q) * 0.2);
      cap.rotation.set(0.2 + easeInOut(q) * Math.PI * 2, 0.5, -0.3);
    },
  });
  box(root, C.black, [0.24, 0.2, 0.025], [5.3, 1.46, 0.02]);
  box(root, INK.cyan, [0.19, 0.15, 0.006], [5.3, 1.485, 0.035], {
    edges: false,
  });
}

/* The boss chair */
function buildBossChair(k: Kit) {
  const { root, add } = k;

  const boss = chair(root, [1.4, 0, 1.92], 0.95, C.black, C.coal);
  const crown = group(boss.top, [0, 1.3, -0.3], true);
  cyl(crown, INK.amber, [0.11, 0.1, 0.06, 8], [0, 0, 0]);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    cyl(
      crown,
      INK.amber,
      [0, 0.035, 0.085, 4],
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
      boss.top.rotation.y = 0.95 + easeInOut(part(p, 0, 0.8)) * Math.PI * 4;
      crown.visible = p > 0.25;
      const q = part(p, 0.25, 1);
      crown.position.y = 1.9 - 0.62 * easeOut(q) + 0.06 * arc(part(q, 0.6, 1));
      crown.rotation.y = q * Math.PI * 2;
    },
  });
}

/* The pile of mail */
function buildPileOfMail(k: Kit) {
  const { root, add, rand } = k;

  const mail = group(root, [1.75, 0, 3.72], true);
  let top = 0;
  for (let i = 0; i < 52; i++) {
    const layer = Math.floor(i / 6);
    const spread = 0.4 - layer * 0.045;
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * spread;
    top = 0.01 + layer * 0.07;
    envelope(
      mail,
      [Math.cos(a) * r, top + rand() * 0.03, Math.sin(a) * r],
      [(rand() - 0.5) * 0.5, rand() * Math.PI, (rand() - 0.5) * 0.5]
    );
  }
  const flyers = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 + 0.4;
    const home: V3 = [
      Math.cos(a) * 0.12,
      top + 0.06 + i * 0.012,
      Math.sin(a) * 0.12,
    ];
    return {
      node: envelope(mail, home, [0.1, a, -0.1], true),
      home,
      a,
      reach: 0.5 + rand() * 0.5,
      high: 0.8 + rand() * 0.7,
    };
  });
  add("mail", mail, {
    hit: [1.0, 0.7, 1.0],
    hitAt: [0, 0.3, 0],
    top: 0.82,
    zoom: 2.8,
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
          0.1 + easeInOut(q) * Math.PI * 2,
          f.a + q * 3,
          -0.1 + easeInOut(q) * Math.PI * 2 * (i % 2 ? 1 : -1)
        );
      });
    },
  });
}

/* The supply crate */
function buildSupplyCrate(k: Kit) {
  const { root, logos, add, foil, idles } = k;

  const crate = group(root, [3.72, 0, 3.5], true);
  crate.rotation.y = 0.28;
  box(crate, INK.amber, [0.74, 0.5, 0.74], [0, 0, 0]);
  for (const x of [-0.2, 0.2]) {
    box(crate, C.trim, [0.11, 0.51, 0.76], [x, 0, 0]);
  }
  box(crate, C.black, [0.16, 0.14, 0.03], [0, 0.26, 0.38]);
  const lid = group(crate, [0, 0.5, -0.39], true);
  box(lid, INK.amber, [0.8, 0.11, 0.8], [0, 0, 0.39]);
  for (const x of [-0.2, 0.2]) {
    box(lid, C.trim, [0.11, 0.12, 0.82], [x, 0, 0.39]);
  }
  const prize = group(crate, [0, 0.3, 0], true);
  prize.rotation.y = Math.PI / 4 - 0.28;
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
    top: 1.75,
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

export function buildRoom(mats: Mats, screens: Screens, logos: Logos) {
  const root = new Group();
  const actors: Actor[] = [];
  const idles: ((time: number, dt: number) => void)[] = [];
  const marked = new Set<string>();
  const rand = dice(2026);

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
      dur: o.dur ?? 1.2,
      react: o.react,
      hover: 0,
      clickedAt: -1,
    });
  };

  const k: Kit = { root, mats, screens, logos, rand, idles, foil, add };
  buildShell(k);
  const glass = buildWindowAndItsCurtain(k);
  buildMainDesk(k);
  buildStreamLight(k);
  buildHighShelfAndItsTrophies(k);
  buildDrawersAndTheFan(k);
  buildTV(k);
  buildSecondDesk(k);
  const dream = buildWardrobe(k);
  buildBed(k, dream);
  buildBossChair(k);
  buildPileOfMail(k);
  buildSupplyCrate(k);

  weld(root, mats);

  /* Work out where each marker floats and where the camera should look */
  root.updateMatrixWorld(true);
  for (const actor of actors) {
    actor.root.localToWorld(actor.focus);
    if (marked.has(actor.id)) {
      actor.root.localToWorld(actor.anchor);
    } else {
      actor.anchor.add(actor.focus);
    }
  }

  return {
    root,
    actors,
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
