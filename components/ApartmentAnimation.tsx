"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const LIME = "201,237,118";
const CYCLE_MS = 7600;
const FURNITURE_BASE_DELAY = 1.5;
const FURNITURE_STAGGER = 0.18;
const DROP_HEIGHT = 260;

/* ---------------------------------------------------------------------- */
/* 3D primitives — CSS cuboids                                            */
/* ---------------------------------------------------------------------- */

/* [x, y, w, d, h, z?, tone?] in floor-plan px */
type Part = [number, number, number, number, number, number?, ("light" | "dark")?];

const TONES = {
  default: { top: 0.3, ns: 0.13, ew: 0.09, border: 0.85 },
  light: { top: 0.48, ns: 0.2, ew: 0.15, border: 0.9 },
  dark: { top: 0.1, ns: 0.06, ew: 0.05, border: 0.6 },
  wall: { top: 0.34, ns: 0.1, ew: 0.07, border: 0.95 },
};

function Face({
  t,
  w,
  h,
  alpha,
  border,
}: {
  t: string;
  w: number;
  h: number;
  alpha: number;
  border: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: w,
        height: h,
        transform: t,
        transformOrigin: "0 0",
        background: `rgba(${LIME},${alpha})`,
        border: `1px solid rgba(${LIME},${border})`,
        boxSizing: "border-box",
        backfaceVisibility: "visible",
      }}
    />
  );
}

function Box3D({ p, wall }: { p: Part; wall?: boolean }) {
  const [x, y, w, d, h, z = 0, toneKey] = p;
  const tone = wall ? TONES.wall : toneKey ? TONES[toneKey] : TONES.default;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: d,
        transformStyle: "preserve-3d",
        transform: z ? `translateZ(${z}px)` : undefined,
      }}
    >
      {/* top */}
      <Face t={`translateZ(${h}px)`} w={w} h={d} alpha={tone.top} border={tone.border} />
      {/* north (y=0) */}
      <Face t="rotateX(90deg)" w={w} h={h} alpha={tone.ns} border={tone.border} />
      {/* south (y=d) */}
      <Face t={`translateY(${d}px) rotateX(90deg)`} w={w} h={h} alpha={tone.ns} border={tone.border} />
      {/* west (x=0) */}
      <Face t="rotateZ(90deg) rotateX(90deg)" w={d} h={h} alpha={tone.ew} border={tone.border} />
      {/* east (x=w) */}
      <Face t={`translateX(${w}px) rotateZ(90deg) rotateX(90deg)`} w={d} h={h} alpha={tone.ew} border={tone.border} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Furniture catalog — voxel compositions                                 */
/* ---------------------------------------------------------------------- */

const FURN: Record<string, { w: number; d: number; parts: Part[] }> = {
  bed: {
    w: 76,
    d: 88,
    parts: [
      [0, 0, 76, 8, 26],
      [0, 8, 76, 80, 14],
      [4, 12, 68, 72, 8, 14, "light"],
      [8, 16, 26, 16, 6, 22, "light"],
      [42, 16, 26, 16, 6, 22, "light"],
    ],
  },
  bedH: {
    w: 88,
    d: 76,
    parts: [
      [0, 0, 8, 76, 26],
      [8, 0, 80, 76, 14],
      [12, 4, 72, 68, 8, 14, "light"],
      [16, 8, 16, 26, 6, 22, "light"],
      [16, 42, 16, 26, 6, 22, "light"],
    ],
  },
  sofa: {
    w: 44,
    d: 100,
    parts: [
      [0, 0, 10, 100, 30],
      [10, 8, 30, 84, 16],
      [10, 0, 30, 8, 24],
      [10, 92, 30, 8, 24],
    ],
  },
  coffee: {
    w: 48,
    d: 30,
    parts: [
      [2, 2, 4, 4, 12],
      [42, 2, 4, 4, 12],
      [2, 24, 4, 4, 12],
      [42, 24, 4, 4, 12],
      [0, 0, 48, 30, 3, 12, "light"],
    ],
  },
  dining: {
    w: 96,
    d: 80,
    parts: [
      [20, 20, 5, 5, 22],
      [71, 20, 5, 5, 22],
      [20, 55, 5, 5, 22],
      [71, 55, 5, 5, 22],
      [16, 16, 64, 48, 3, 22, "light"],
      [26, 0, 18, 14, 14],
      [26, 0, 18, 3, 26],
      [54, 0, 18, 14, 14],
      [54, 0, 18, 3, 26],
      [26, 66, 18, 14, 14],
      [26, 77, 18, 3, 26],
      [54, 66, 18, 14, 14],
      [54, 77, 18, 3, 26],
    ],
  },
  tv: {
    w: 80,
    d: 18,
    parts: [
      [0, 6, 80, 12, 12],
      [8, 8, 64, 3, 26, 12, "dark"],
    ],
  },
  kitchen: {
    w: 110,
    d: 26,
    parts: [
      [0, 0, 110, 26, 24],
      [64, 4, 30, 16, 3, 24, "dark"],
    ],
  },
  kitchenette: {
    w: 84,
    d: 26,
    parts: [
      [0, 0, 84, 26, 24],
      [48, 4, 26, 16, 3, 24, "dark"],
    ],
  },
  wardrobe: {
    w: 64,
    d: 26,
    parts: [
      [0, 0, 31, 26, 54],
      [33, 0, 31, 26, 54],
    ],
  },
  nightstand: {
    w: 22,
    d: 22,
    parts: [[0, 0, 22, 22, 16]],
  },
  desk: {
    w: 56,
    d: 26,
    parts: [
      [2, 2, 4, 4, 20],
      [50, 2, 4, 4, 20],
      [2, 20, 4, 4, 20],
      [50, 20, 4, 4, 20],
      [0, 0, 56, 26, 3, 20, "light"],
    ],
  },
  bathtub: {
    w: 80,
    d: 40,
    parts: [
      [0, 0, 80, 40, 18],
      [6, 6, 68, 28, 6, 12, "dark"],
    ],
  },
  toilet: {
    w: 22,
    d: 30,
    parts: [
      [0, 0, 22, 8, 24],
      [0, 8, 22, 22, 14],
    ],
  },
  lavabo: {
    w: 26,
    d: 22,
    parts: [
      [0, 0, 26, 22, 26],
      [4, 4, 18, 14, 3, 26, "dark"],
    ],
  },
  plant: {
    w: 18,
    d: 18,
    parts: [
      [2, 2, 14, 14, 12],
      [0, 0, 18, 18, 14, 12, "light"],
    ],
  },
  rug: {
    w: 64,
    d: 80,
    parts: [[0, 0, 64, 80, 1, 0, "dark"]],
  },
};

/* ---------------------------------------------------------------------- */
/* Pack layouts                                                            */
/* ---------------------------------------------------------------------- */

type WallSeg = [number, number, number, "h" | "v", number];
type Placement = { kind: keyof typeof FURN; x: number; y: number };

type Pack = {
  name: string;
  pieces: string;
  area: string;
  w: number;
  d: number;
  walls: WallSeg[];
  labels: { text: string; x: number; y: number }[];
  furniture: Placement[];
};

const EXT_H = 52;
const INT_H = 30;
const WALL_T = 4;

const extWalls = (w: number, d: number): WallSeg[] => [
  [0, 0, w, "h", EXT_H],
  [0, d - WALL_T, w, "h", EXT_H],
  [0, 0, d, "v", EXT_H],
  [w - WALL_T, 0, d, "v", EXT_H],
];

const PACKS: Pack[] = [
  {
    name: "PACK T2",
    pieces: "2 pièces",
    area: "45 m²",
    w: 300,
    d: 210,
    walls: [
      ...extWalls(300, 210),
      [168, 0, 120, "v", INT_H],
      [168, 118, 132, "h", INT_H],
      [0, 148, 70, "h", INT_H],
    ],
    labels: [
      { text: "SÉJOUR", x: 84, y: 106 },
      { text: "CHAMBRE", x: 232, y: 60 },
      { text: "CUISINE", x: 52, y: 186 },
      { text: "SDB", x: 226, y: 142 },
    ],
    furniture: [
      { kind: "tv", x: 14, y: 10 },
      { kind: "sofa", x: 16, y: 58 },
      { kind: "rug", x: 62, y: 58 },
      { kind: "coffee", x: 70, y: 82 },
      { kind: "plant", x: 142, y: 12 },
      { kind: "kitchen", x: 14, y: 174 },
      { kind: "bed", x: 186, y: 14 },
      { kind: "nightstand", x: 268, y: 14 },
      { kind: "bathtub", x: 184, y: 158 },
      { kind: "toilet", x: 272, y: 126 },
      { kind: "lavabo", x: 270, y: 168 },
    ],
  },
  {
    name: "PACK T3",
    pieces: "3 pièces",
    area: "65 m²",
    w: 340,
    d: 240,
    walls: [
      ...extWalls(340, 240),
      [188, 0, 130, "v", INT_H],
      [188, 128, 152, "h", INT_H],
      [0, 158, 90, "h", INT_H],
      [88, 158, 82, "v", INT_H],
    ],
    labels: [
      { text: "SÉJOUR", x: 48, y: 134 },
      { text: "CUISINE", x: 46, y: 180 },
      { text: "SDB", x: 134, y: 176 },
      { text: "CHAMBRE", x: 250, y: 58 },
      { text: "CHAMBRE", x: 250, y: 152 },
    ],
    furniture: [
      { kind: "tv", x: 10, y: 8 },
      { kind: "sofa", x: 16, y: 60 },
      { kind: "rug", x: 64, y: 60 },
      { kind: "coffee", x: 72, y: 84 },
      { kind: "dining", x: 88, y: 18 },
      { kind: "plant", x: 166, y: 132 },
      { kind: "kitchen", x: 10, y: 204 },
      { kind: "bathtub", x: 96, y: 192 },
      { kind: "lavabo", x: 152, y: 164 },
      { kind: "bed", x: 204, y: 12 },
      { kind: "nightstand", x: 286, y: 12 },
      { kind: "wardrobe", x: 250, y: 98 },
      { kind: "bed", x: 204, y: 140 },
      { kind: "desk", x: 278, y: 206 },
    ],
  },
  {
    name: "PACK T4",
    pieces: "4 pièces",
    area: "85 m²",
    w: 380,
    d: 270,
    walls: [
      ...extWalls(380, 270),
      [208, 0, 270, "v", INT_H],
      [208, 88, 172, "h", INT_H],
      [208, 178, 172, "h", INT_H],
      [0, 188, 100, "h", INT_H],
      [98, 188, 82, "v", INT_H],
    ],
    labels: [
      { text: "SÉJOUR", x: 48, y: 144 },
      { text: "CUISINE", x: 44, y: 212 },
      { text: "SDB", x: 142, y: 202 },
      { text: "CHAMBRE", x: 332, y: 32 },
      { text: "CHAMBRE", x: 332, y: 122 },
      { text: "CHAMBRE", x: 260, y: 250 },
    ],
    furniture: [
      { kind: "tv", x: 14, y: 10 },
      { kind: "sofa", x: 16, y: 64 },
      { kind: "rug", x: 64, y: 64 },
      { kind: "coffee", x: 72, y: 88 },
      { kind: "dining", x: 100, y: 16 },
      { kind: "plant", x: 184, y: 148 },
      { kind: "kitchenette", x: 8, y: 232 },
      { kind: "bathtub", x: 110, y: 222 },
      { kind: "lavabo", x: 172, y: 194 },
      { kind: "bedH", x: 218, y: 6 },
      { kind: "nightstand", x: 312, y: 6 },
      { kind: "bedH", x: 218, y: 96 },
      { kind: "desk", x: 314, y: 146 },
      { kind: "bedH", x: 218, y: 186 },
      { kind: "wardrobe", x: 308, y: 238 },
    ],
  },
];

const DAYS = [
  { t: 1500, label: "Livraison" },
  { t: 2600, label: "Montage" },
  { t: 3600, label: "Finitions" },
  { t: 4600, label: "Prêt à louer" },
];

/* ---------------------------------------------------------------------- */
/* Scene pieces                                                            */
/* ---------------------------------------------------------------------- */

function WallExtrude({ seg, delay, reduced }: { seg: WallSeg; delay: number; reduced: boolean }) {
  const [x, y, len, dir, h] = seg;
  const w = dir === "h" ? len : WALL_T;
  const d = dir === "h" ? WALL_T : len;
  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        transformStyle: "preserve-3d",
        transformOrigin: dir === "h" ? `${x}px ${y + d / 2}px` : `${x + w / 2}px ${y}px`,
      }}
      initial={reduced ? false : { opacity: 0, scaleX: dir === "h" ? 0 : 1, scaleY: dir === "v" ? 0 : 1 }}
      animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <Box3D p={[x, y, w, d, h]} wall />
    </motion.div>
  );
}

function FurnitureDrop({
  placement,
  delay,
  reduced,
}: {
  placement: Placement;
  delay: number;
  reduced: boolean;
}) {
  const f = FURN[placement.kind];
  const flat = f.parts.every(([, , , , h]) => h <= 1);
  return (
    <motion.div
      style={{
        position: "absolute",
        left: placement.x,
        top: placement.y,
        width: f.w,
        height: f.d,
        transformStyle: "preserve-3d",
      }}
      initial={reduced ? false : { z: flat ? 0 : DROP_HEIGHT, opacity: 0 }}
      animate={{ z: 0, opacity: 1 }}
      transition={
        reduced
          ? { duration: 0 }
          : {
              z: { type: "spring", stiffness: 160, damping: 20, mass: 0.9, delay },
              opacity: { duration: 0.25, delay },
            }
      }
    >
      {f.parts.map((p, i) => (
        <Box3D key={i} p={p} />
      ))}
    </motion.div>
  );
}

function FloorFx({ placement, delay, reduced }: { placement: Placement; delay: number; reduced: boolean }) {
  const f = FURN[placement.kind];
  if (reduced) return null;
  const cx = placement.x + f.w / 2;
  const cy = placement.y + f.d / 2;
  const r = Math.max(f.w, f.d) * 0.7;
  return (
    <>
      {/* growing shadow while the piece falls */}
      <motion.div
        style={{
          position: "absolute",
          left: cx - f.w * 0.55,
          top: cy - f.d * 0.55,
          width: f.w * 1.1,
          height: f.d * 1.1,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
        }}
        initial={{ opacity: 0, scale: 1.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
      />
      {/* impact ring on landing */}
      <motion.div
        style={{
          position: "absolute",
          left: cx - r / 2,
          top: cy - r / 2,
          width: r,
          height: r,
          borderRadius: "50%",
          border: `1.5px solid rgba(${LIME},0.7)`,
        }}
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: [0, 0.7, 0], scale: [0.2, 1.7, 2.1] }}
        transition={{ duration: 0.6, ease: "easeOut", delay: delay + 0.32 }}
      />
    </>
  );
}

function Scene3D({ pack, reduced }: { pack: Pack; reduced: boolean }) {
  const { w, d } = pack;
  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: w,
        height: d,
        marginLeft: -w / 2,
        marginTop: -d / 2,
        transformStyle: "preserve-3d",
      }}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
      transition={{ duration: 0.3 }}
    >
      {/* Floor slab, drawn left to right */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            repeating-linear-gradient(90deg, rgba(${LIME},0.12) 0 1px, transparent 1px 24px),
            repeating-linear-gradient(0deg, rgba(${LIME},0.12) 0 1px, transparent 1px 24px),
            rgba(${LIME},0.045)
          `,
          border: `1.5px solid rgba(${LIME},0.8)`,
          boxSizing: "border-box",
          boxShadow: "0 0 90px rgba(0,0,0,0.65)",
        }}
        initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Room labels painted on the floor */}
      {pack.labels.map(({ text, x, y }, i) => (
        <motion.div
          key={`${text}-${i}`}
          style={{
            position: "absolute",
            left: x,
            top: y,
            transform: "translate(-50%, -50%)",
            color: `rgba(${LIME},0.45)`,
            fontSize: 11,
            letterSpacing: "0.25em",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 + i * 0.06 }}
        >
          {text}
        </motion.div>
      ))}

      {/* Impact FX live on the floor plane */}
      {pack.furniture.map((pl, i) => (
        <FloorFx
          key={`fx-${i}`}
          placement={pl}
          delay={FURNITURE_BASE_DELAY + i * FURNITURE_STAGGER}
          reduced={reduced}
        />
      ))}

      {/* Walls extrude along their length */}
      {pack.walls.map((seg, i) => (
        <WallExtrude key={`w-${i}`} seg={seg} delay={0.55 + i * 0.09} reduced={reduced} />
      ))}

      {/* Furniture rains down */}
      {pack.furniture.map((pl, i) => (
        <FurnitureDrop
          key={`f-${i}`}
          placement={pl}
          delay={FURNITURE_BASE_DELAY + i * FURNITURE_STAGGER}
          reduced={reduced}
        />
      ))}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------- */
/* HUD                                                                     */
/* ---------------------------------------------------------------------- */

function DayCounter({ reduced }: { reduced: boolean }) {
  const [day, setDay] = useState(reduced ? 3 : -1);

  useEffect(() => {
    if (reduced) return;
    const timers = DAYS.map(({ t }, i) => setTimeout(() => setDay(i), t));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        {DAYS.map((_, i) => (
          <div
            key={i}
            className="h-[3px] w-6 rounded-full transition-colors duration-500"
            style={{ backgroundColor: i <= day ? "#c9ed76" : "rgba(201,237,118,0.15)" }}
          />
        ))}
      </div>
      <div className="text-[10px] font-semibold tracking-[0.15em] uppercase">
        {day < 0 ? (
          <span className="text-[#c9ed76]/40">Plan en cours</span>
        ) : day < 3 ? (
          <span className="text-[#c9ed76]/60">
            Jour {day + 1} · {DAYS[day].label}
          </span>
        ) : (
          <motion.span
            className="text-[#c9ed76]"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Jour 4 · {DAYS[3].label}
          </motion.span>
        )}
      </div>
    </div>
  );
}

function FurnishTicker({ reduced }: { reduced: boolean }) {
  const [pct, setPct] = useState(reduced ? 100 : 0);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(0, 100, {
      delay: FURNITURE_BASE_DELAY,
      duration: 3.2,
      ease: [0.3, 0, 0.7, 1],
      onUpdate: (v) => setPct(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduced]);

  return (
    <div className="text-right">
      <div
        className="text-3xl font-bold tabular-nums leading-none"
        style={{ color: pct === 100 ? "#c9ed76" : "rgba(201,237,118,0.75)" }}
      >
        {pct}
        <span className="text-lg">%</span>
      </div>
      <div className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#c9ed76]/40 mt-1">
        Meublé
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Main component                                                          */
/* ---------------------------------------------------------------------- */

export default function ApartmentAnimation({ minimal = false }: { minimal?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-60px" });
  const reduced = useReducedMotion() ?? false;
  const [started, setStarted] = useState(false);
  const [packIdx, setPackIdx] = useState(reduced ? 1 : 0);
  const [fit, setFit] = useState(1);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  useEffect(() => {
    if (!started || reduced || !inView) return;
    const id = setInterval(() => setPackIdx((i) => (i + 1) % PACKS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [started, reduced, inView]);

  /* Scale the 3D stage to the container */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setFit(Math.min(Math.max(Math.min(r.width / 560, r.height / 520), 0.2), 1.4));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Mouse-driven camera: tilt + yaw, spring smoothed */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const camTilt = useSpring(useTransform(my, [0, 1], [67, 57]), { stiffness: 55, damping: 16 });
  const camYaw = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 55, damping: 16 });

  const pack = PACKS[packIdx];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      onMouseMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a14] to-[#252520]" />
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(90deg, rgba(${LIME},0.05) 0 1px, transparent 1px 56px),
            repeating-linear-gradient(0deg, rgba(${LIME},0.05) 0 1px, transparent 1px 56px)
          `,
        }}
      />

      {/* 3D stage */}
      {started && (
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 18 }}
        >
          <div
            className="absolute inset-0"
            style={{ perspective: 1400, perspectiveOrigin: "50% 38%" }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                rotateX: reduced ? 62 : camTilt,
                scale: fit,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ rotateZ: reduced ? 0 : camYaw, transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ rotateZ: 45 }}
                  animate={reduced ? { rotateZ: 45 } : { rotateZ: [45, 405] }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 44, ease: "linear", repeat: Infinity }
                  }
                >
                  <AnimatePresence mode="wait">
                    <Scene3D key={pack.name} pack={pack} reduced={reduced} />
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 42%, transparent 55%, rgba(16,16,12,0.75) 100%)",
        }}
      />

      {/* HUD */}
      {!minimal && started && (
        <>
          <div className="absolute bottom-4 left-5 z-20 pointer-events-none">
            <DayCounter key={`d-${packIdx}`} reduced={reduced} />
          </div>

          <div className="absolute top-4 right-5 z-20 pointer-events-none">
            <FurnishTicker key={`t-${packIdx}`} reduced={reduced} />
          </div>

          <div className="absolute bottom-4 right-5 z-20 pointer-events-none text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={pack.name}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-xs font-bold tracking-[0.18em] uppercase text-[#c9ed76]">
                  {pack.name}
                </div>
                <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#c9ed76]/40 mt-0.5">
                  {pack.pieces} · {pack.area}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-4 left-5 z-20 pointer-events-none">
            <div className="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#c9ed76]/35">
              Vue 3D · Meublage en direct
            </div>
          </div>
        </>
      )}
    </div>
  );
}
