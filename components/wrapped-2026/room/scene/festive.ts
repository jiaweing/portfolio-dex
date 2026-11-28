import {
  CatmullRomCurve3,
  type Color,
  ExtrudeGeometry,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  type Object3D,
  Shape,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import { C, group, type Kit, ROOM, type V3 } from "./build";
import { arc, ball, box, cyl, INK, INK_LIST, oklch, shape } from "./kit";

/* December in the room. A tree with presents by the door-side wall, fairy
   lights over the window and along the high shelf, a wreath on the door,
   two red hats and a small snowman. Nothing here is a find, and the room
   underneath is left as it is. Only loaded when the room is dressed up. */

const X = {
  pine: oklch(0.5, 0.115, 153),
  pine2: oklch(0.58, 0.13, 148),
  red: oklch(0.6, 0.21, 25),
  snow: oklch(0.985, 0.008, 220),
  carrot: oklch(0.74, 0.17, 55),
};
/** The colours the lamps come in */
const LAMPS = [INK.amber, INK.pink, INK.cyan, INK.lime, X.red];

type Glow = (time: number, rate?: number) => void;

/** Small lamps that take turns to glow. Three draw calls, however many. */
function lamps(parent: Object3D, spots: V3[], r: number): Glow {
  const turns: { at: V3; ink: Color }[][] = [[], [], []];
  spots.forEach((at, i) => {
    turns[i % 3].push({ at, ink: LAMPS[i % LAMPS.length] });
  });
  const m = new Matrix4();
  const paints = turns.map((turn) => {
    const paint = new MeshBasicMaterial();
    const mesh = new InstancedMesh(
      new SphereGeometry(r, 10, 8),
      paint,
      turn.length
    );
    turn.forEach((lamp, i) => {
      mesh.setMatrixAt(i, m.makeTranslation(...lamp.at));
      mesh.setColorAt(i, lamp.ink);
    });
    mesh.frustumCulled = false;
    parent.add(mesh);
    return paint;
  });
  return (time, rate = 1) => {
    paints.forEach((paint, i) => {
      paint.color.setScalar(
        0.66 + 0.34 * Math.sin(time * 2.2 * rate + i * 2.1)
      );
    });
  };
}

/** A string of lamps, pinned up in loops between two points */
function strand(
  parent: Object3D,
  from: V3,
  to: V3,
  loops: number,
  sag: number,
  perLoop: number
) {
  const at = (t: number, drop = 0): V3 => [
    from[0] + (to[0] - from[0]) * t,
    from[1] +
      (to[1] - from[1]) * t -
      sag * Math.abs(Math.sin(t * loops * Math.PI)) -
      drop,
    from[2] + (to[2] - from[2]) * t,
  ];
  const steps = loops * 8;
  const line = new CatmullRomCurve3(
    Array.from({ length: steps + 1 }, (_, i) => new Vector3(...at(i / steps)))
  );
  shape(
    parent,
    new TubeGeometry(line, steps * 2, 0.007, 6),
    C.black,
    [0, 0, 0]
  );
  const count = loops * perLoop;
  return lamps(
    parent,
    Array.from({ length: count }, (_, i) => at((i + 0.5) / count, 0.028)),
    0.026
  );
}

/** A five-pointed star, flat, standing up */
function starShape(outer: number, inner: number, depth: number) {
  const outline = new Shape();
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
    const r = i % 2 ? inner : outer;
    if (i === 0) {
      outline.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    } else {
      outline.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
  }
  outline.closePath();
  const geo = new ExtrudeGeometry(outline, { depth, bevelEnabled: false });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

/** A wrapped box with a ribbon round it and a bow on top */
function present(
  parent: Object3D,
  at: V3,
  size: V3,
  paper: Color,
  ribbon: Color,
  rotY: number
) {
  const g = group(parent, at);
  g.rotation.y = rotY;
  const [w, h, d] = size;
  box(g, paper, size, [0, 0, 0]);
  box(g, ribbon, [w * 0.2, h + 0.006, d + 0.006], [0, 0, 0]);
  box(g, ribbon, [w + 0.006, h + 0.006, d * 0.2], [0, 0, 0]);
  for (const side of [-1, 1]) {
    ball(g, ribbon, w * 0.14, [side * w * 0.13, h + w * 0.07, 0], {
      squash: [1.2, 0.7, 0.8],
    });
  }
  return g;
}

/** A red hat with a white brim, a floppy tip and a bobble */
function hat(parent: Object3D, at: V3, r: number, rot: V3) {
  const g = group(parent, at);
  g.rotation.set(...rot);
  cyl(g, X.snow, [r * 1.14, r * 1.14, r * 0.4], [0, 0, 0]);
  cyl(g, X.red, [r * 0.56, r, r * 0.95], [0, r * 0.38, 0]);
  const tip = group(g, [r * 0.06, r * 1.26, 0]);
  tip.rotation.z = -0.85;
  cyl(tip, X.red, [r * 0.12, r * 0.56, r * 1.05], [0, 0, 0]);
  ball(tip, X.snow, r * 0.3, [0, r * 1.2, 0]);
}

/* A small tree on top of the two short cabinets by the left wall, and what
   is under it */
function buildTree(k: Kit) {
  const { root, add, foil, idles } = k;

  const tree = group(root, [0.3, 0.5, 2.19], true);
  tree.scale.setScalar(0.7);
  cyl(tree, X.red, [0.16, 0.125, 0.18], [0, 0, 0]);
  cyl(tree, C.trim, [0.168, 0.168, 0.035], [0, 0.15, 0]);
  cyl(tree, C.woodDark, [0.04, 0.045, 0.16], [0, 0.18, 0]);

  const spots: V3[] = [];
  for (let i = 0; i < 4; i++) {
    const wide = 0.37 - i * 0.078;
    const tall = 0.42 - i * 0.025;
    const y = 0.3 + i * 0.265;
    cyl(tree, i % 2 ? X.pine2 : X.pine, [wide * 0.2, wide, tall], [0, y, 0], {
      rot: [0, i * 0.5, 0],
    });
    // Where the side of this tier is, a part of the way up
    const side = (a: number, up: number, out = 0): V3 => {
      const r = wide * (1 - 0.8 * up) + out;
      return [Math.cos(a) * r, y + tall * up, Math.sin(a) * r];
    };
    const baubles = 6 - i;
    for (let b = 0; b < baubles; b++) {
      const a = (b / baubles) * Math.PI * 2 + i * 0.9;
      ball(
        tree,
        INK_LIST[(b * 3 + i * 2) % INK_LIST.length],
        0.036,
        side(a, 0.16, 0.012)
      );
    }
    const lit = 6 - i;
    for (let b = 0; b < lit; b++) {
      spots.push(side(((b + 0.5) / lit) * Math.PI * 2 + i * 0.9, 0.5, 0.014));
    }
  }
  const glow = lamps(tree, spots, 0.024);

  const star = foil(tree, starShape(0.105, 0.046, 0.034), [0, 1.52, 0], 0, 0.5);

  present(tree, [0.37, 0, -0.14], [0.22, 0.17, 0.2], INK.pink, C.trim, 0.35);
  present(tree, [0.2, 0, 0.34], [0.18, 0.13, 0.18], INK.cyan, X.red, -0.5);
  present(tree, [-0.06, 0, 0.42], [0.15, 0.24, 0.15], X.red, INK.amber, 0.8);
  present(tree, [0.4, 0.17, -0.15], [0.12, 0.09, 0.12], INK.lime, X.red, -0.2);

  let rush = 1;
  idles.push((time, dt) => {
    rush += (1 - rush) * Math.min(1, dt * 1.2);
    glow(time, rush);
    star.rotation.y += dt * 0.7 * rush;
  });
  add("tree", tree, {
    collect: false,
    hit: [0.52, 1.5, 0.52],
    hitAt: [0, 0.78, 0],
    top: 1.7,
    zoom: 3,
    dur: 1.6,
    react: (p, t) => {
      rush = 7;
      tree.rotation.z = Math.sin(t * 13) * 0.045 * (1 - p);
      star.scale.setScalar(1 + 0.5 * arc(p));
    },
  });
}

/* Fairy lights: over the window, and along the high shelf */
function buildLights(k: Kit) {
  const n = k.walls.n.node;
  const glows = [
    strand(n, [2.34, 2.43, 0.2], [3.94, 2.43, 0.2], 3, 0.13, 5),
    strand(n, [0.03, 2.19, 0.3], [1.42, 2.19, 0.3], 3, 0.1, 4),
  ];
  k.idles.push((time) => {
    glows.forEach((glow, i) => {
      glow(time + i * 0.7);
    });
  });
}

/* The wreath on the door */
function buildWreath(k: Kit) {
  const s = k.walls.s.node;
  const wreath = group(s, [0.66, 1.6, ROOM.d - 0.12]);
  shape(wreath, new TorusGeometry(0.17, 0.056, 10, 28), X.pine, [0, 0, 0]);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.5;
    ball(wreath, i % 3 ? X.red : INK.amber, 0.024, [
      Math.cos(a) * 0.17,
      Math.sin(a) * 0.17,
      -0.05,
    ]);
  }
  for (const side of [-1, 1]) {
    ball(wreath, X.red, 0.055, [side * 0.06, -0.17, -0.06], {
      squash: [1.2, 0.75, 0.6],
    });
    box(wreath, X.red, [0.04, 0.13, 0.012], [side * 0.045, -0.33, -0.06], {
      rot: [0, 0, side * 0.3],
    });
  }
}

/* Two red hats, and the snowman on the second desk */
function buildHatsAndSnowman(k: Kit) {
  const { root, refs } = k;

  if (refs.bigPlush) {
    hat(refs.bigPlush, [0, 0.49, -0.01], 0.118, [-0.12, 0.4, 0.14]);
  }
  if (refs.monitor) {
    hat(refs.monitor, [-0.3, 0.385, 0], 0.085, [0, 0.3, 0.42]);
  }

  const man = group(root, [2.69, 0.77, 0.58]);
  ball(man, X.snow, 0.062, [0, 0.055, 0]);
  ball(man, X.snow, 0.044, [0, 0.145, 0]);
  cyl(man, X.carrot, [0, 0.011, 0.045], [0, 0, 0], {
    rot: [Math.PI / 2, 0, 0],
  }).position.set(0.01, 0.145, 0.06);
  for (const side of [-1, 1]) {
    ball(man, C.black, 0.007, [side * 0.017, 0.16, 0.039]);
  }
  box(man, X.red, [0.1, 0.02, 0.1], [0, 0.098, 0]);
  hat(man, [0, 0.178, 0], 0.036, [0, 0, 0.1]);
}

/** Dresses the finished room, before it is welded */
export function decorate(k: Kit) {
  buildTree(k);
  buildLights(k);
  buildWreath(k);
  buildHatsAndSnowman(k);
}
