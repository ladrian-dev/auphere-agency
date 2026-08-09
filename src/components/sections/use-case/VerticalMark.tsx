'use client';
import { useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { VerticalSlug } from '@/lib/use-cases/verticals';
import { useAuphereGSAP } from '@/lib/motion/gsap';

/**
 * Editorial SVG marks · one per vertical.
 *
 * Each mark is a hand-drawn-feeling abstraction of an object that lives in
 * the vertical's daily work (barber's razor / botanical leaf / Rx cross /
 * etc.). They share a single visual language: monochrome line art at
 * 1.5–2px, generous negative space, square viewBox.
 *
 * Rendered animated by default — single-pass stroke draw on mount. Pass
 * `static` for pages where motion is undesired.
 */

interface Props {
  vertical: VerticalSlug;
  /** Stroke color (CSS color, defaults to currentColor). */
  className?: string;
  /** Size in px — square. */
  size?: number;
  /** Disable stroke-draw animation. */
  static?: boolean;
}

export function VerticalMark({ vertical, className, size = 280, static: isStatic }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animate = !isStatic;

  // Single-pass stroke draw on mount (GSAP DrawSVG); tiers staggered by the
  // data-draw index each path declares. Reduced motion / static: no animation.
  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const svg = svgRef.current;
      if (!svg || isStatic || reduced) return;
      svg.querySelectorAll<SVGPathElement>('[data-draw]').forEach((path) => {
        const tier = Number(path.dataset.draw ?? 0);
        gsap.set(path, { drawSVG: '0%', opacity: 0 });
        gsap.to(path, { drawSVG: '100%', duration: 1.6, ease: 'auphere', delay: tier * 0.18 });
        gsap.to(path, { opacity: 1, duration: 0.4, delay: tier * 0.18 });
      });
    },
    { scope: svgRef, dependencies: [vertical, isStatic] },
  );

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('block', className)}
      aria-hidden
    >
      {vertical === 'barbershop' && <BarberMark animate={animate} />}
      {vertical === 'nail-salon' && <NailSalonMark animate={animate} />}
      {vertical === 'spa' && <SpaMark animate={animate} />}
      {vertical === 'medspa' && <MedspaMark animate={animate} />}
      {vertical === 'dental-clinic' && <DentalMark animate={animate} />}
      {vertical === 'physiotherapy' && <PhysioMark animate={animate} />}
      {vertical === 'veterinary' && <VeterinaryMark animate={animate} />}
      {vertical === 'pharmacy' && <PharmacyMark animate={animate} />}
      {vertical === 'language-school' && <LanguageSchoolMark animate={animate} />}
    </svg>
  );
}

/* Helpers ---------------------------------------------------------------- */

function makeStrokeProps(animate: boolean) {
  return (i: number) => (animate ? { 'data-draw': i } : {});
}

/* ────────────────────────────────────────────────────────────
 * BARBERSHOP — pole + razor diagonal
 * ──────────────────────────────────────────────────────────── */
function BarberMark({ animate }: { animate: boolean }) {
  const Comp = 'path';
  const props = makeStrokeProps(animate);

  return (
    <g>
      <Comp d="M75 30 L75 170 Q75 178 83 178 L117 178 Q125 178 125 170 L125 30 Q125 22 117 22 L83 22 Q75 22 75 30 Z" {...props(0)} />
      <Comp d="M78 50 L122 78" {...props(1)} />
      <Comp d="M78 80 L122 108" {...props(1)} />
      <Comp d="M78 110 L122 138" {...props(1)} />
      <Comp d="M78 140 L122 168" {...props(1)} />
      <Comp d="M40 60 L160 152" {...props(2)} />
      <Comp d="M156 148 L168 158 L160 162 Z" {...props(2)} />
    </g>
  );
}

/* ────────────────────────────────────────────────────────────
 * NAIL SALON — nail silhouette + sparkle accent
 * Almond-shaped nail with a small four-point sparkle above.
 * ──────────────────────────────────────────────────────────── */
function NailSalonMark({ animate }: { animate: boolean }) {
  const Comp = 'path';
  const props = makeStrokeProps(animate);

  return (
    <g>
      {/* Almond-shaped nail outline */}
      <Comp d="M100 40 C72 60 64 100 70 150 C76 174 124 174 130 150 C136 100 128 60 100 40 Z" {...props(0)} />
      {/* Cuticle line */}
      <Comp d="M76 70 Q100 60 124 70" {...props(1)} />
      {/* Free-edge smile (French tip) */}
      <Comp d="M76 145 Q100 158 124 145" {...props(2)} />
      {/* Sparkle — four-point */}
      <Comp d="M150 50 L150 70 M140 60 L160 60 M145 55 L155 65 M145 65 L155 55" {...props(3)} />
      {/* Small dot accent */}
      <Comp d="M44 96 L52 96" {...props(3)} />
    </g>
  );
}

/* ────────────────────────────────────────────────────────────
 * SPA — stacked zen stones with a single leaf
 * ──────────────────────────────────────────────────────────── */
function SpaMark({ animate }: { animate: boolean }) {
  const Comp = 'path';
  const Ellipse = 'ellipse';
  const props = makeStrokeProps(animate);

  return (
    <g>
      {/* Bottom stone (largest) */}
      <Ellipse cx="100" cy="155" rx="58" ry="22" {...props(0)} />
      {/* Middle stone */}
      <Ellipse cx="100" cy="118" rx="42" ry="18" {...props(1)} />
      {/* Top stone */}
      <Ellipse cx="100" cy="88" rx="28" ry="14" {...props(2)} />
      {/* Leaf — single stroke teardrop */}
      <Comp d="M100 70 C112 56 116 38 100 22 C84 38 88 56 100 70 Z" {...props(3)} />
      {/* Leaf vein */}
      <Comp d="M100 28 L100 66" {...props(3)} />
    </g>
  );
}

/* ────────────────────────────────────────────────────────────
 * MEDSPA — botanical halo + dewdrop
 * ──────────────────────────────────────────────────────────── */
function MedspaMark({ animate }: { animate: boolean }) {
  const Comp = 'path';
  const Circle = 'circle';
  const props = makeStrokeProps(animate);

  return (
    <g>
      <Circle cx="100" cy="100" r="78" {...props(0)} />
      <Comp d="M100 38 C140 60 145 110 100 162 C55 110 60 60 100 38 Z" {...props(1)} />
      <Comp d="M100 50 L100 158" {...props(2)} />
      <Comp d="M100 78 L86 96" {...props(2)} />
      <Comp d="M100 78 L114 96" {...props(2)} />
      <Comp d="M100 108 L82 130" {...props(2)} />
      <Comp d="M100 108 L118 130" {...props(2)} />
      <Comp d="M134 70 C138 78 138 86 130 86 C122 86 122 78 126 70 Z" {...props(3)} />
    </g>
  );
}

/* ────────────────────────────────────────────────────────────
 * DENTAL CLINIC — stylized molar + sparkle
 * ──────────────────────────────────────────────────────────── */
function DentalMark({ animate }: { animate: boolean }) {
  const Comp = 'path';
  const props = makeStrokeProps(animate);

  return (
    <g>
      {/* Molar crown — two-bump top + flared body */}
      <Comp
        d="M58 60 C56 38 74 22 90 28 C96 30 104 30 110 28 C126 22 144 38 142 60 L138 100 C136 122 130 144 122 158 C116 168 110 170 106 162 L102 124 C101 118 99 118 98 124 L94 162 C90 170 84 168 78 158 C70 144 64 122 62 100 L58 60 Z"
        {...props(0)}
      />
      {/* Top cusps */}
      <Comp d="M72 36 Q82 28 92 36" {...props(1)} />
      <Comp d="M108 36 Q118 28 128 36" {...props(1)} />
      {/* Tooth fissure line */}
      <Comp d="M100 56 L100 110" {...props(2)} />
      {/* Sparkle accent */}
      <Comp d="M152 78 L152 96 M144 87 L160 87" {...props(3)} />
    </g>
  );
}

/* ────────────────────────────────────────────────────────────
 * PHYSIOTHERAPY — abstract figure in motion
 * Three connected strokes suggesting a body mid-stride.
 * ──────────────────────────────────────────────────────────── */
function PhysioMark({ animate }: { animate: boolean }) {
  const Comp = 'path';
  const Circle = 'circle';
  const props = makeStrokeProps(animate);

  return (
    <g>
      {/* Head */}
      <Circle cx="120" cy="40" r="12" {...props(0)} />
      {/* Torso */}
      <Comp d="M120 52 L110 100" {...props(1)} />
      {/* Front arm (raised) */}
      <Comp d="M115 68 L150 50" {...props(2)} />
      {/* Back arm (swinging back) */}
      <Comp d="M115 68 L90 92" {...props(2)} />
      {/* Front leg (forward stride) */}
      <Comp d="M110 100 L138 148" {...props(3)} />
      {/* Back leg (push-off) */}
      <Comp d="M110 100 L80 152" {...props(3)} />
      {/* Motion lines behind figure */}
      <Comp d="M40 70 L60 70 M44 90 L62 90 M48 110 L62 110" {...props(3)} />
    </g>
  );
}

/* ────────────────────────────────────────────────────────────
 * VETERINARY — paw print
 * Four toe pads + a main pad below.
 * ──────────────────────────────────────────────────────────── */
function VeterinaryMark({ animate }: { animate: boolean }) {
  const Comp = 'path';
  const Ellipse = 'ellipse';
  const props = makeStrokeProps(animate);

  return (
    <g>
      {/* Main pad (large) */}
      <Comp
        d="M70 110 C70 90 86 78 100 78 C114 78 130 90 130 110 C130 130 118 148 100 148 C82 148 70 130 70 110 Z"
        {...props(0)}
      />
      {/* Top-left toe */}
      <Ellipse cx="62" cy="58" rx="11" ry="14" {...props(1)} />
      {/* Top-right toe */}
      <Ellipse cx="138" cy="58" rx="11" ry="14" {...props(1)} />
      {/* Mid-left toe */}
      <Ellipse cx="38" cy="92" rx="11" ry="14" {...props(2)} />
      {/* Mid-right toe */}
      <Ellipse cx="162" cy="92" rx="11" ry="14" {...props(2)} />
    </g>
  );
}

/* ────────────────────────────────────────────────────────────
 * PHARMACY — rounded Rx bottle + cross
 * ──────────────────────────────────────────────────────────── */
function PharmacyMark({ animate }: { animate: boolean }) {
  const Comp = 'path';
  const Circle = 'circle';
  const props = makeStrokeProps(animate);

  return (
    <g>
      <Comp
        d="M40 50 L160 50 Q172 50 172 62 L172 162 Q172 174 160 174 L40 174 Q28 174 28 162 L28 62 Q28 50 40 50 Z"
        {...props(0)}
      />
      <Comp d="M100 78 L100 146" {...props(1)} />
      <Comp d="M66 112 L134 112" {...props(1)} />
      <Comp d="M82 30 L118 30 Q126 30 126 38 L126 50 L74 50 L74 38 Q74 30 82 30 Z" {...props(2)} />
      <Circle cx="48" cy="68" r="2" {...props(3)} />
    </g>
  );
}

/* ────────────────────────────────────────────────────────────
 * LANGUAGE SCHOOL — speech bubble with text lines + small book
 * ──────────────────────────────────────────────────────────── */
function LanguageSchoolMark({ animate }: { animate: boolean }) {
  const Comp = 'path';
  const props = makeStrokeProps(animate);

  return (
    <g>
      {/* Speech bubble */}
      <Comp
        d="M40 40 L160 40 Q172 40 172 52 L172 108 Q172 120 160 120 L116 120 L100 138 L100 120 L40 120 Q28 120 28 108 L28 52 Q28 40 40 40 Z"
        {...props(0)}
      />
      {/* Text lines inside bubble */}
      <Comp d="M48 60 L150 60" {...props(1)} />
      <Comp d="M48 80 L140 80" {...props(1)} />
      <Comp d="M48 100 L120 100" {...props(1)} />
      {/* Small book below */}
      <Comp
        d="M60 152 Q80 146 100 152 Q120 146 140 152 L140 174 Q120 168 100 174 Q80 168 60 174 Z"
        {...props(2)}
      />
      {/* Book spine */}
      <Comp d="M100 152 L100 174" {...props(3)} />
    </g>
  );
}
