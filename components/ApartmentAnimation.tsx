"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STROKE = "#c9ed76";
const STROKE_DIM = "rgba(201,237,118,0.25)";
const FILL_ROOM = "rgba(201,237,118,0.04)";
const FILL_FURNITURE = "rgba(201,237,118,0.12)";
const TEXT_COLOR = "rgba(201,237,118,0.5)";

export default function ApartmentAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const wallTransition = { duration: 1.0, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] };
  const furnitureTransition = (delay: number) => ({
    duration: 0.4,
    ease: "easeOut" as const,
    delay,
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a14] to-[#252520]" />

      <svg
        ref={ref}
        viewBox="0 0 380 300"
        className="relative z-10 w-full max-w-[420px] px-4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Grid background lines */}
        {[50, 100, 150, 200, 250, 300, 350].map((x) => (
          <line key={`vg-${x}`} x1={x} y1={0} x2={x} y2={300} stroke={STROKE_DIM} strokeWidth="0.5" />
        ))}
        {[50, 100, 150, 200, 250].map((y) => (
          <line key={`hg-${y}`} x1={0} y1={y} x2={380} y2={y} stroke={STROKE_DIM} strokeWidth="0.5" />
        ))}

        {/* Outer walls */}
        {phase >= 1 && (
          <motion.rect
            x="20" y="20" width="340" height="260"
            stroke={STROKE}
            strokeWidth="2"
            fill={FILL_ROOM}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={wallTransition}
          />
        )}

        {/* Interior walls */}
        {phase >= 1 && (
          <>
            {/* Vertical divider living/bedroom */}
            <motion.line
              x1="220" y1="20" x2="220" y2="195"
              stroke={STROKE} strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ ...wallTransition, delay: 0.5 }}
            />
            {/* Horizontal divider top/bottom */}
            <motion.line
              x1="20" y1="195" x2="360" y2="195"
              stroke={STROKE} strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ ...wallTransition, delay: 0.7 }}
            />
            {/* Bottom kitchen/hall divider */}
            <motion.line
              x1="120" y1="195" x2="120" y2="280"
              stroke={STROKE} strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ ...wallTransition, delay: 0.85 }}
            />
            {/* Bathroom top */}
            <motion.line
              x1="220" y1="225" x2="360" y2="225"
              stroke={STROKE} strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ ...wallTransition, delay: 0.95 }}
            />
          </>
        )}

        {/* Door arcs */}
        {phase >= 2 && (
          <>
            <motion.path
              d="M120 230 A20 20 0 0 1 140 210"
              stroke={STROKE} strokeWidth="1" strokeDasharray="3 3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={furnitureTransition(0)}
            />
            <motion.path
              d="M248 195 A20 20 0 0 0 220 210"
              stroke={STROKE} strokeWidth="1" strokeDasharray="3 3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={furnitureTransition(0.1)}
            />
          </>
        )}

        {/* Room labels */}
        {phase >= 2 && (
          <>
            {[
              { x: 120, y: 115, label: "SÉJOUR" },
              { x: 290, y: 110, label: "CHAMBRE" },
              { x: 70, y: 238, label: "CUISINE" },
              { x: 170, y: 238, label: "COULOIR" },
              { x: 290, y: 256, label: "SDB" },
            ].map(({ x, y, label }, i) => (
              <motion.text
                key={label}
                x={x} y={y}
                textAnchor="middle"
                fontSize="7"
                letterSpacing="2"
                fill={TEXT_COLOR}
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={furnitureTransition(0.1 * i)}
              >
                {label}
              </motion.text>
            ))}
          </>
        )}

        {/* SÉJOUR furniture */}
        {phase >= 3 && (
          <>
            {/* TV unit on north wall */}
            <motion.rect x="50" y="28" width="90" height="8" rx="1"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
              style={{ originX: "95px", originY: "32px" }}
              transition={furnitureTransition(0)}
            />
            {/* Sofa */}
            <motion.rect x="35" y="90" width="80" height="28" rx="4"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              style={{ originX: "75px", originY: "104px" }}
              transition={furnitureTransition(0.15)}
            />
            <motion.rect x="35" y="90" width="10" height="28" rx="2"
              stroke={STROKE} strokeWidth="0.5" fill={FILL_FURNITURE}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={furnitureTransition(0.2)}
            />
            <motion.rect x="105" y="90" width="10" height="28" rx="2"
              stroke={STROKE} strokeWidth="0.5" fill={FILL_FURNITURE}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={furnitureTransition(0.2)}
            />
            {/* Coffee table */}
            <motion.rect x="55" y="68" width="40" height="20" rx="3"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              style={{ originX: "75px", originY: "78px" }}
              transition={furnitureTransition(0.3)}
            />
            {/* Dining table */}
            <motion.rect x="148" y="100" width="55" height="38" rx="3"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              style={{ originX: "175px", originY: "119px" }}
              transition={furnitureTransition(0.4)}
            />
            {/* Dining chairs */}
            {[
              [148,95,16,8], [170,95,16,8],
              [148,138,16,8], [170,138,16,8],
              [130,104,8,14], [203,104,8,14],
            ].map(([x,y,w,h], i) => (
              <motion.rect key={i} x={x} y={y} width={w} height={h} rx="1"
                stroke={STROKE} strokeWidth="0.5" fill={FILL_FURNITURE}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={furnitureTransition(0.45 + i * 0.05)}
              />
            ))}
          </>
        )}

        {/* CHAMBRE furniture */}
        {phase >= 3 && (
          <>
            {/* Bed */}
            <motion.rect x="228" y="28" width="105" height="65" rx="3"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              style={{ originX: "280px", originY: "60px" }}
              transition={furnitureTransition(0.1)}
            />
            {/* Pillows */}
            <motion.rect x="233" y="30" width="25" height="14" rx="2"
              stroke={STROKE} strokeWidth="0.5" fill={FILL_FURNITURE}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={furnitureTransition(0.25)}
            />
            <motion.rect x="262" y="30" width="25" height="14" rx="2"
              stroke={STROKE} strokeWidth="0.5" fill={FILL_FURNITURE}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={furnitureTransition(0.25)}
            />
            {/* Nightstands */}
            <motion.rect x="228" y="50" width="14" height="14" rx="1"
              stroke={STROKE} strokeWidth="0.5" fill={FILL_FURNITURE}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={furnitureTransition(0.3)}
            />
            <motion.rect x="319" y="50" width="14" height="14" rx="1"
              stroke={STROKE} strokeWidth="0.5" fill={FILL_FURNITURE}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={furnitureTransition(0.3)}
            />
            {/* Wardrobe */}
            <motion.rect x="228" y="110" width="50" height="35" rx="2"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              style={{ originX: "253px", originY: "127px" }}
              transition={furnitureTransition(0.4)}
            />
            <motion.line x1="253" y1="110" x2="253" y2="145"
              stroke={STROKE} strokeWidth="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={furnitureTransition(0.5)}
            />
            {/* Desk */}
            <motion.rect x="292" y="155" width="60" height="22" rx="2"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              style={{ originX: "322px", originY: "166px" }}
              transition={furnitureTransition(0.5)}
            />
          </>
        )}

        {/* CUISINE furniture */}
        {phase >= 4 && (
          <>
            {/* Counter L-shape */}
            <motion.rect x="28" y="202" width="78" height="10" rx="1"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
              style={{ originX: "28px", originY: "207px" }}
              transition={furnitureTransition(0)}
            />
            <motion.rect x="28" y="212" width="10" height="55" rx="1"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}
              style={{ originX: "33px", originY: "212px" }}
              transition={furnitureTransition(0.15)}
            />
            {/* Kitchen table */}
            <motion.circle cx="80" cy="248" r="18"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              style={{ originX: "80px", originY: "248px" }}
              transition={furnitureTransition(0.3)}
            />
          </>
        )}

        {/* SDB furniture */}
        {phase >= 4 && (
          <>
            {/* Bathtub */}
            <motion.rect x="228" y="232" width="65" height="38" rx="5"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              style={{ originX: "260px", originY: "251px" }}
              transition={furnitureTransition(0.1)}
            />
            <motion.rect x="233" y="237" width="55" height="28" rx="4"
              stroke={STROKE} strokeWidth="0.5" fill="none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={furnitureTransition(0.25)}
            />
            {/* Toilet */}
            <motion.rect x="303" y="231" width="22" height="28" rx="2"
              stroke={STROKE} strokeWidth="1" fill={FILL_FURNITURE}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              style={{ originX: "314px", originY: "245px" }}
              transition={furnitureTransition(0.2)}
            />
            <motion.ellipse cx="314" cy="252" rx="9" ry="7"
              stroke={STROKE} strokeWidth="0.5" fill="none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={furnitureTransition(0.3)}
            />
          </>
        )}

        {/* Measurement annotations */}
        {phase >= 4 && (
          <>
            <motion.line x1="20" y1="14" x2="220" y2="14"
              stroke={STROKE_DIM} strokeWidth="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={furnitureTransition(0.5)}
            />
            <motion.text x="120" y="12" textAnchor="middle" fontSize="5"
              fill={TEXT_COLOR} fontFamily="system-ui, sans-serif"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={furnitureTransition(0.6)}
            >
              SÉJOUR 55 m²
            </motion.text>
          </>
        )}
      </svg>

      {/* Corner label */}
      <div className="absolute bottom-4 right-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-[#c9ed76]/30">
        Plan type T3
      </div>
    </div>
  );
}
