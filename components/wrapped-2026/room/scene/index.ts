import {
  CanvasTexture,
  DirectionalLight,
  DoubleSide,
  HemisphereLight,
  InstancedMesh,
  type Material,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OctahedronGeometry,
  OrthographicCamera,
  PCFSoftShadowMap,
  PlaneGeometry,
  PointLight,
  Quaternion,
  Raycaster,
  Scene,
  SRGBColorSpace,
  type Texture,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import type { WrappedData } from "../../types";
import { type Actor, buildRoom, HOME_AZ, type Logos, ROOM } from "./build";
import { createMats, foilAt, foilSlice, INK_LIST, oklch } from "./kit";
import { createScreens, type Fonts } from "./screens";

/* Runs the room: the camera you can drag all the way round, pinch and
   scroll, the walls that drop out of its way, the pointer that finds things,
   the day and night lighting, and the loop that keeps it all moving. With
   `still` set (for people who turn motion off) nothing moves on its own: the
   camera cuts, reactions jump to their end, and a frame is only drawn when
   something changed. */

export interface RoomOptions {
  canvas: HTMLCanvasElement;
  /** A tag that follows the thing under the pointer */
  label: HTMLElement;
  data: WrappedData;
  fonts: Fonts;
  dark: boolean;
  still: boolean;
  found: string[];
  onHover: (id: string | null) => void;
  onPick: (id: string, collect: boolean) => void;
}

export interface RoomHandle {
  /** Look at one thing and set it off, or pass null to step back */
  select: (id: string | null) => void;
  setDark: (dark: boolean) => void;
  setFound: (ids: string[]) => void;
  /** Room taken by the card, in pixels, so the camera can frame around it */
  setInsets: (left: number, bottom: number) => void;
  celebrate: () => void;
  dispose: () => void;
}

const DEG = Math.PI / 180;
const AZ = HOME_AZ;
const EL = 31 * DEG;
/** The same angle as the first, on the turn nearest to the second */
const nearest = (to: number, from: number) =>
  from + Math.atan2(Math.sin(to - from), Math.cos(to - from));
const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

function loadLogo(src: string) {
  return new Promise<Texture | undefined>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const el = document.createElement("canvas");
      el.width = 256;
      el.height = 256;
      const ctx = el.getContext("2d");
      if (!ctx) {
        resolve(undefined);
        return;
      }
      const scale = Math.min(256 / img.width, 256 / img.height) || 1;
      const w = (img.width || 256) * scale;
      const h = (img.height || 256) * scale;
      ctx.drawImage(img, (256 - w) / 2, (256 - h) / 2, w, h);
      const tex = new CanvasTexture(el);
      tex.colorSpace = SRGBColorSpace;
      resolve(tex);
    };
    img.onerror = () => resolve(undefined);
    img.src = src;
  });
}

export async function createRoom(o: RoomOptions): Promise<RoomHandle> {
  const { canvas, label, still } = o;

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x00_00_00, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const [ryu, claude] = await Promise.all([
    loadLogo("/logos/ryu.png"),
    loadLogo("/logos/claude.svg"),
  ]);
  const logos: Logos = { ryu, claude };

  const mats = createMats();
  const screens = createScreens(o.data, o.fonts);
  const room = buildRoom(mats, screens, logos);
  const scene = new Scene();
  scene.add(room.root);

  const byId = new Map<string, Actor>(room.actors.map((a) => [a.id, a]));
  const paint = new Map<string, Mesh[]>();
  for (const actor of room.actors) {
    const list: Mesh[] = [];
    actor.root.traverse((node) => {
      if ((node as Mesh).isMesh && (node as Mesh).material === mats.solid) {
        list.push(node as Mesh);
      }
    });
    paint.set(actor.id, list);
  }

  /* ---------- Markers: a small foil gem over everything not yet found ---------- */

  let found = new Set(o.found);
  const markers = room.actors
    .filter((a) => a.collect)
    .map((actor, i) => {
      const gem = new Mesh(
        foilSlice(new OctahedronGeometry(1, 0), i * 0.07, i * 0.07 + 0.14),
        mats.foil
      );
      gem.scale.setScalar(0.001);
      scene.add(gem);
      return { actor, gem, size: found.has(actor.id) ? 0 : 1 };
    });

  /* ---------- Light ---------- */

  const hemi = new HemisphereLight(0xff_ff_ff, 0xff_ff_ff, 1);
  const sun = new DirectionalLight(0xff_ff_ff, 1);
  sun.target.position.set(ROOM.w / 2, 0, ROOM.d / 2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -6;
  sun.shadow.camera.right = 6;
  sun.shadow.camera.top = 6;
  sun.shadow.camera.bottom = -6;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 30;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.02;
  const strip = new PointLight(0xff_ff_ff, 0, 11, 1.4);
  strip.position.set(ROOM.w * 0.5, 2.45, ROOM.d * 0.45);
  const desk = new PointLight(0xff_ff_ff, 0, 5, 1.5);
  desk.position.set(1.4, 1.05, 0.62);
  scene.add(hemi, sun, sun.target, strip, desk);

  const DAY = {
    sky: oklch(1, 0.01, 90),
    ground: oklch(0.9, 0.05, 80),
    hemi: 1.75,
    sun: oklch(0.98, 0.03, 85),
    sunPower: 2.05,
    strip: 0,
    desk: 0,
  };
  const NIGHT = {
    sky: oklch(0.6, 0.1, 268),
    ground: oklch(0.42, 0.07, 300),
    hemi: 1.1,
    sun: oklch(0.8, 0.05, 262),
    sunPower: 0.85,
    strip: 2.4,
    desk: 2.2,
  };
  let dark = o.dark;
  let night = dark ? 1 : 0;
  const applyLight = (time: number) => {
    hemi.color.copy(DAY.sky).lerp(NIGHT.sky, night);
    hemi.groundColor.copy(DAY.ground).lerp(NIGHT.ground, night);
    hemi.intensity = DAY.hemi + (NIGHT.hemi - DAY.hemi) * night;
    sun.color.copy(DAY.sun).lerp(NIGHT.sun, night);
    sun.intensity = DAY.sunPower + (NIGHT.sunPower - DAY.sunPower) * night;
    strip.intensity = NIGHT.strip * night;
    desk.intensity = NIGHT.desk * night;
    strip.color.copy(foilAt(time * 0.03 + 0.55));
    desk.color.copy(foilAt(time * 0.03 + 0.1));
    const glass = room.glass.material as MeshBasicMaterial;
    const want = night > 0.5 ? screens.night.tex : screens.day.tex;
    if (glass.map !== want) {
      glass.map = want;
      glass.needsUpdate = true;
    }
    mats.line.opacity = 0.6 - 0.15 * night;
  };

  /* ---------- Confetti for the last find ---------- */

  const CONFETTI = 110;
  const confetti = new InstancedMesh(
    new PlaneGeometry(0.07, 0.12),
    new MeshBasicMaterial({ side: DoubleSide }),
    CONFETTI
  );
  const bits = Array.from({ length: CONFETTI }, (_, i) => {
    confetti.setColorAt(i, INK_LIST[i % INK_LIST.length]);
    return {
      x: 0.3 + Math.random() * (ROOM.w - 0.6),
      z: 0.3 + Math.random() * (ROOM.d - 0.6),
      y: 3 + Math.random() * 2.4,
      fall: 0.9 + Math.random() * 0.9,
      spin: 2 + Math.random() * 5,
      sway: Math.random() * 6,
    };
  });
  confetti.visible = false;
  confetti.frustumCulled = false;
  scene.add(confetti);
  let partyAt = -1;

  /* ---------- Camera ---------- */

  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  const centre = new Vector3(ROOM.w / 2, (ROOM.h - 0.44) / 2, ROOM.d / 2);
  const view = { az: AZ, el: EL, size: 8, target: centre.clone() };
  const goal = { az: AZ, el: EL, size: 8, target: centre.clone() };
  let fit = 8;
  let width = 1;
  let height = 1;
  let selected: string | null = null;
  /** The angle to go back to when the card closes */
  let backAz = AZ;
  const insets = { left: 0, bottom: 0 };
  const right = new Vector3();
  const up = new Vector3();
  const dir = new Vector3();

  const axes = (az: number, el: number) => {
    dir.set(
      Math.cos(el) * Math.sin(az),
      Math.sin(el),
      Math.cos(el) * Math.cos(az)
    );
    right.set(Math.cos(az), 0, -Math.sin(az));
    up.crossVectors(dir, right).normalize();
  };

  /** How tall the view must be to hold the room, whichever way it is turned */
  const measure = () => {
    let w = 0;
    let h = 0;
    const p = new Vector3();
    for (let turn = 0; turn < 12; turn++) {
      axes(AZ + (turn * Math.PI) / 12, EL);
      for (const x of [-0.16, ROOM.w + 0.16]) {
        for (const y of [-0.44, ROOM.h]) {
          for (const z of [-0.16, ROOM.d + 0.16]) {
            p.set(x, y, z).sub(centre);
            w = Math.max(w, Math.abs(p.dot(right)));
            h = Math.max(h, Math.abs(p.dot(up)));
          }
        }
      }
    }
    const aspect = width / height;
    // Leave room for the bar at the top and the tray at the bottom
    const clear = Math.max(0.3, 1 - 150 / height);
    fit = Math.max((h * 2) / clear, (w * 2 * 1.06) / aspect);
  };

  const frame = () => {
    const actor = selected ? byId.get(selected) : undefined;
    if (!actor) {
      // Sit the room between the bar at the top and the tray at the bottom
      goal.size = fit;
      axes(goal.az, goal.el);
      const lift = (width < 900 ? 150 : 96) / 2 - 34;
      goal.target.copy(centre).addScaledVector(up, (-lift * fit) / height);
      return;
    }
    const freeW = Math.max(200, width - insets.left);
    const freeH = Math.max(200, height - insets.bottom);
    // A little air round the thing, so its reaction stays in the picture
    const want = actor.zoom * 1.3;
    const size = Math.min(
      fit,
      Math.max(want * (height / freeH), (want * 0.85 * height) / freeW)
    );
    goal.size = size;
    axes(goal.az, goal.el);
    const perPx = size / height;
    goal.target
      .copy(actor.focus)
      .addScaledVector(right, (-insets.left / 2) * perPx)
      .addScaledVector(up, (-insets.bottom / 2) * perPx);
  };

  const placeCamera = () => {
    axes(view.az, view.el);
    const aspect = width / height;
    camera.left = (-view.size * aspect) / 2;
    camera.right = (view.size * aspect) / 2;
    camera.top = view.size / 2;
    camera.bottom = -view.size / 2;
    camera.position.copy(view.target).addScaledVector(dir, 40);
    camera.up.set(0, 1, 0);
    camera.lookAt(view.target);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  };

  const snap = () => {
    view.az = goal.az;
    view.el = goal.el;
    view.size = goal.size;
    view.target.copy(goal.target);
  };

  /* ---------- The loop ---------- */

  type Ease = (rate: number) => number;

  let raf = 0;
  let last = 0;
  let time = 0;
  let dirty = true;
  let dead = false;
  let hovered: string | null = null;
  const projected = new Vector3();
  const matrix = new Matrix4();
  const quat = new Quaternion();
  const scl = new Vector3(1, 1, 1);
  const pos = new Vector3();
  const tilt = new Object3D();

  const moveActor = (actor: Actor, ease: Ease) => {
    const want = actor.id === hovered || actor.id === selected ? 1 : 0;
    actor.hover += (want - actor.hover) * ease(12);
    actor.root.position.y = actor.baseY + actor.hover * 0.05;
    const hot = actor.id === hovered ? mats.hot : mats.solid;
    for (const mesh of paint.get(actor.id) ?? []) {
      mesh.material = hot;
    }
    if (actor.clickedAt < 0 || !actor.react) {
      return;
    }
    const t = still ? actor.dur : time - actor.clickedAt;
    const p = clamp(t / actor.dur, 0, 1);
    actor.react(p, t);
    if (p >= 1) {
      actor.clickedAt = -1;
    }
  };

  const moveMarkers = (ease: Ease) => {
    // Gems keep their size on screen however far the camera is
    const gemSize = (clamp(width / 90, 7, 11) * view.size) / height;
    markers.forEach((m, i) => {
      const want = found.has(m.actor.id) || !shown(m.actor) ? 0 : 1;
      m.size += (want - m.size) * ease(8);
      const big = m.actor.id === hovered ? 1.5 : 1;
      const bob = still ? 0 : Math.sin(time * 2.2 + i) * gemSize * 0.35;
      m.gem.visible = m.size > 0.02;
      m.gem.scale.set(
        gemSize * 0.72 * m.size * big,
        gemSize * m.size * big,
        gemSize * 0.72 * m.size * big
      );
      m.gem.position
        .copy(m.actor.anchor)
        .setY(m.actor.anchor.y + gemSize * 1.6 + m.actor.hover * 0.05 + bob);
      m.gem.rotation.y = still ? 0.6 : time * 1.4 + i;
    });
  };

  const moveConfetti = () => {
    if (partyAt < 0) {
      return;
    }
    const t = time - partyAt;
    confetti.visible = t < 7;
    if (t >= 7) {
      partyAt = -1;
    }
    bits.forEach((b, i) => {
      const y = b.y - t * b.fall;
      tilt.rotation.set(t * b.spin, t * b.spin * 0.7 + i, b.sway);
      quat.copy(tilt.quaternion);
      pos.set(b.x + Math.sin(t * 1.3 + b.sway) * 0.18, y, b.z);
      scl.setScalar(y < 0.02 ? 0.001 : 1);
      confetti.setMatrixAt(i, matrix.compose(pos, quat, scl));
    });
    confetti.instanceMatrix.needsUpdate = true;
  };

  /** A wall drops once the camera comes round behind it, and the sun follows
      the camera, so the room is always lit from the open side */
  const moveWalls = (ease: Ease) => {
    const sx = Math.sin(view.az);
    const cz = Math.cos(view.az);
    for (const wall of room.walls) {
      const behind = wall.nx * sx + wall.nz * cz;
      wall.stand = behind < (wall.stand ? 0.22 : 0.08);
      wall.up += ((wall.stand ? 1 : 0) - wall.up) * ease(9);
      wall.node.visible = wall.up > 0.015;
      wall.node.scale.y = Math.max(0.001, wall.up);
    }
    const lit = view.az - 0.12;
    sun.position.set(
      ROOM.w / 2 + Math.sin(lit) * 6.5,
      9,
      ROOM.d / 2 + Math.cos(lit) * 6.5
    );
  };
  const wallOf = new Map(room.walls.map((wall) => [wall.id, wall]));
  /** False while the wall a thing hangs on is out of the way */
  const shown = (actor: Actor) =>
    !actor.wall || (wallOf.get(actor.wall)?.up ?? 1) > 0.6;

  const moveLabel = () => {
    const actor = hovered ? byId.get(hovered) : undefined;
    if (!actor) {
      return;
    }
    projected.copy(actor.anchor).project(camera);
    const x = (projected.x * 0.5 + 0.5) * width;
    const y = (-projected.y * 0.5 + 0.5) * height;
    label.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
  };

  const step = (dt: number) => {
    time += dt;
    const ease: Ease = (rate) => (still ? 1 : 1 - Math.exp(-dt * rate));

    night += ((dark ? 1 : 0) - night) * ease(3);
    applyLight(time);

    const k = ease(5.5);
    view.az += (goal.az - view.az) * k;
    view.el += (goal.el - view.el) * k;
    view.size += (goal.size - view.size) * k;
    view.target.lerp(goal.target, k);
    placeCamera();
    moveWalls(ease);

    const map = mats.foil.map;
    if (map && !still) {
      map.offset.x = time * 0.035;
    }

    for (const actor of room.actors) {
      moveActor(actor, ease);
    }
    room.idle(time, still ? 0 : dt);
    moveMarkers(ease);
    moveConfetti();
    moveLabel();

    renderer.render(scene, camera);
  };

  const loop = (now: number) => {
    raf = 0;
    if (dead) {
      return;
    }
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;
    if (still) {
      if (dirty) {
        dirty = false;
        snap();
        step(0);
      }
      return;
    }
    step(dt);
    if (!document.hidden) {
      raf = requestAnimationFrame(loop);
    }
  };
  const wake = () => {
    dirty = true;
    if (!(raf || dead)) {
      last = 0;
      raf = requestAnimationFrame(loop);
    }
  };

  /* ---------- Size ---------- */

  const resize = () => {
    const box = canvas.getBoundingClientRect();
    width = Math.max(1, box.width);
    height = Math.max(1, box.height);
    renderer.setSize(width, height, false);
    measure();
    frame();
    wake();
  };
  const sizes = new ResizeObserver(resize);
  sizes.observe(canvas);
  resize();
  snap();
  // Start with the near walls already out of the way
  moveWalls(() => 1);

  /* ---------- Pointer ---------- */

  const ray = new Raycaster();
  ray.layers.set(1);
  const ndc = new Vector2();
  const under = (clientX: number, clientY: number) => {
    const box = canvas.getBoundingClientRect();
    ndc.set(
      ((clientX - box.left) / box.width) * 2 - 1,
      -((clientY - box.top) / box.height) * 2 + 1
    );
    ray.setFromCamera(ndc, camera);
    const hits = room.actors.filter(shown).map((a) => a.hit);
    const hit = ray.intersectObjects(hits, false)[0];
    return (hit?.object.userData.actor as string | undefined) ?? null;
  };

  const setHover = (id: string | null) => {
    if (id === hovered) {
      return;
    }
    hovered = id;
    canvas.style.cursor = id ? "pointer" : "grab";
    o.onHover(id);
    wake();
  };

  const select = (id: string | null) => {
    const was = selected;
    selected = id && byId.has(id) ? id : null;
    const actor = selected ? byId.get(selected) : undefined;
    if (actor) {
      // Swing round to the side the thing shows its face from
      if (!was) {
        backAz = goal.az;
      }
      actor.clickedAt = time;
      goal.az = nearest(actor.az, goal.az);
    } else {
      goal.az = backAz;
    }
    goal.el = EL;
    frame();
    wake();
  };

  const pointers = new Map<number, { x: number; y: number }>();
  let moved = 0;
  let pinch = 0;
  let downAt = 0;

  const limit = () => {
    // All the way round: the walls get out of the way
    goal.el = clamp(goal.el, 17 * DEG, 50 * DEG);
    goal.size = clamp(goal.size, 1.5, fit * 1.15);
    goal.target.x = clamp(goal.target.x, -0.5, ROOM.w + 0.5);
    goal.target.y = clamp(goal.target.y, -1.5, ROOM.h + 0.5);
    goal.target.z = clamp(goal.target.z, -0.5, ROOM.d + 0.5);
  };

  const pan = (dx: number, dy: number) => {
    axes(view.az, view.el);
    const perPx = view.size / height;
    goal.target
      .addScaledVector(right, -dx * perPx)
      .addScaledVector(up, dy * perPx);
  };

  const onDown = (e: PointerEvent) => {
    canvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      moved = 0;
      downAt = performance.now();
    } else {
      moved = 99;
      const [a, b] = [...pointers.values()];
      pinch = Math.hypot(a.x - b.x, a.y - b.y);
    }
    canvas.style.cursor = "grabbing";
  };

  const twoFingers = (dx: number, dy: number) => {
    const [a, b] = [...pointers.values()];
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    if (pinch > 0 && dist > 0) {
      goal.size *= pinch / dist;
    }
    pinch = dist;
    pan(dx / 2, dy / 2);
  };

  const onMove = (e: PointerEvent) => {
    const prev = pointers.get(e.pointerId);
    if (!prev) {
      if (e.pointerType === "mouse") {
        setHover(under(e.clientX, e.clientY));
      }
      return;
    }
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    prev.x = e.clientX;
    prev.y = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    if (pointers.size >= 2) {
      twoFingers(dx, dy);
    } else if (e.shiftKey || e.buttons === 2) {
      pan(dx, dy);
    } else if (moved > 6) {
      goal.az -= dx * 0.006;
      goal.el += dy * 0.004;
    }
    limit();
    wake();
  };

  /** A press that did not turn into a drag */
  const tap = (x: number, y: number) => {
    const id = under(x, y);
    const actor = id ? byId.get(id) : undefined;
    if (!actor) {
      return;
    }
    if (actor.collect) {
      select(actor.id);
    } else {
      actor.clickedAt = time;
      wake();
    }
    o.onPick(actor.id, actor.collect);
  };

  const onUp = (e: PointerEvent) => {
    const had = pointers.delete(e.pointerId);
    if (canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    canvas.style.cursor = hovered ? "pointer" : "grab";
    if (!had || pointers.size > 0) {
      return;
    }
    if (moved < 8 && performance.now() - downAt < 600) {
      tap(e.clientX, e.clientY);
    }
  };

  const onLeave = () => setHover(null);

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    goal.size *= Math.exp(clamp(e.deltaY, -120, 120) * 0.0016);
    limit();
    wake();
  };

  const onMenu = (e: Event) => e.preventDefault();
  const onShow = () => wake();

  canvas.style.cursor = "grab";
  canvas.style.touchAction = "none";
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("wheel", onWheel, { passive: false });
  canvas.addEventListener("contextmenu", onMenu);
  document.addEventListener("visibilitychange", onShow);

  // Let the first frame settle before the room is shown
  if (still) {
    step(0);
  }
  wake();

  return {
    select,
    setDark(value) {
      dark = value;
      if (still) {
        night = value ? 1 : 0;
      }
      wake();
    },
    setFound(ids) {
      found = new Set(ids);
      wake();
    },
    setInsets(left, bottom) {
      if (insets.left === left && insets.bottom === bottom) {
        return;
      }
      insets.left = left;
      insets.bottom = bottom;
      frame();
      wake();
    },
    celebrate() {
      if (still) {
        return;
      }
      partyAt = time;
      wake();
    },
    dispose() {
      dead = true;
      cancelAnimationFrame(raf);
      sizes.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("contextmenu", onMenu);
      document.removeEventListener("visibilitychange", onShow);
      const seen = new Set<Material>();
      scene.traverse((node) => {
        const mesh = node as Mesh;
        mesh.geometry?.dispose();
        const list = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        for (const mat of list) {
          if (mat && !seen.has(mat)) {
            seen.add(mat);
            mat.dispose();
          }
        }
      });
      mats.hot.dispose();
      mats.steps.dispose();
      mats.foil.map?.dispose();
      screens.dispose();
      ryu?.dispose();
      claude?.dispose();
      renderer.dispose();
    },
  };
}
