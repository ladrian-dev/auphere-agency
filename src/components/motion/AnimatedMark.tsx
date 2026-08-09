'use client';
import { useId, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useAuphereGSAP } from '@/lib/motion/gsap';

const MARK_PATH_FULL =
  'M925.28,500.98l-.26-.26c-30.39-29.28-76.54-47.32-137.3-53.71,19.97-25.37,40.53-53.3,58.32-85.72,20.61-39.85,50.63-111.39,19.75-142.72-14.61-14.78-39.55-15.74-72.14-2.73-27.63,11.06-55.31,29.92-72.03,43.93-67.74,56.78-129.95,135.42-166.32,210.31-.7,1.45-1.94,1.41-2.63,1.24-.56-.11-1.86-.6-1.88-2.31l-.23-152.71-.02-13.88c-.02-2.35-1.92-4.25-4.27-4.25h-12.56c-2.35,0-4.25,1.9-4.27,4.25l-.02,13.88-.24,152.71c-.02,1.71-1.32,2.2-1.88,2.31-.68.17-1.92.21-2.63-1.24-36.37-74.89-98.58-153.53-166.32-210.31-16.72-14.01-44.4-32.87-72.03-43.93-32.59-13.01-57.53-12.04-72.14,2.73-30.88,31.33-.85,102.87,19.75,142.72,17.79,32.42,38.35,60.35,58.32,85.72-60.76,6.39-106.91,24.43-137.3,53.71l-.26.26c-20.8,23.53-26.1,52.73-14.5,80.17,27.08,64.11,125.27,92.09,189.81,96.23-21.65,35.02-42.18,93.71-14.35,122.62,10.14,10.53,23.77,15.68,40.45,15.27,40.34-.98,86.32-33.08,111.99-62.49,21.8-24.99,40.64-57.15,55.97-96.53,1.03-2.65,4.66-2.24,5.34.19.09.26.13.53.13.83l-.13,158.8v53.5c.26,1.94,1.82,3.48,3.78,3.67h3.63l3.16-.02,3.16.02h3.63c1.96-.19,3.52-1.73,3.78-3.67v-53.5l-.13-158.8c0-.3.04-.58.13-.83.68-2.43,4.31-2.84,5.34-.19,15.33,39.38,34.17,71.54,55.97,96.53,25.67,29.41,71.65,61.5,111.99,62.49,16.68.41,30.3-4.74,40.45-15.27,27.83-28.92,7.3-87.6-14.35-122.62,64.54-4.14,162.73-32.12,189.81-96.23,11.6-27.44,6.3-56.64-14.5-80.17ZM223.02,251c-.15-9.33,6.04-17.6,14.74-19.67,2.71-.64,5.66-.96,8.84-.96,13.03,0,29.88,5.32,49.52,15.63,19.22,10.12,40.66,24.99,57.32,39.79,66.97,59.37,125.29,136.36,156.07,205.91.58,1.37-.17,2.31-.51,2.67-.36.34-1.32,1.07-2.65.47-67.78-31.44-124.91-45.87-184.83-46.6-64.43-76.86-97.55-143.21-98.49-197.24ZM508.67,521.95c.04.43-.04,1.52-1.11,2.16l-61.01,37.93c-37.52-23.36-71.82-53-104.54-90.36,36.6,1.54,69.11,10.55,96.46,19.37,23.6,8.84,46.19,18.28,68.83,28.89,1.17.53,1.32,1.6,1.37,2.01ZM164.29,580.75c-12.11-21.16-9.55-44.61,6.77-62.81,29.75-28.64,81.79-46.58,139.64-48.14,37.01,44.38,75.02,79.23,116.02,106.27-34.83,25.52-61.06,51.42-82.11,80.98-94.73-.83-162.39-44.93-180.33-76.3ZM500.24,656.09c-32.16,80.08-79.23,126.51-139.94,138.04-6.75.47-27.7.41-32.91-16.29-7.67-24.67,2.22-58.07,29.43-99.22l41.47-1.82c33.57-1.45,64.77-11.62,98.68-24.07,2.07-.75,4.1,1.3,3.27,3.35ZM509.1,624.25c-36.5,14.63-72.52,25.05-106.18,30.28l-29.43,1.39c19.58-24.32,43.57-45.96,74.53-67.38l61.27,31.95c1.54.81,1.43,3.1-.19,3.76ZM523.66,579.51l-3.16,13.43c-.88,3.82-5.15,5.74-8.61,3.93l-42.84-22.64,53.11-32.67c1.67-1.03,3.89.02,4.06,1.99,1.09,12.04.26,24.09-2.56,35.96ZM570.5,491.69c30.77-69.56,89.1-146.54,156.07-205.91,16.66-14.8,38.1-29.66,57.32-39.79,19.65-10.31,36.5-15.63,49.52-15.63,3.18,0,6.13.32,8.84.96,8.69,2.07,14.88,10.34,14.74,19.67-.94,54.03-34.06,120.38-98.49,197.24-59.92.73-117.05,15.16-184.83,46.6-1.32.6-2.29-.13-2.65-.47-.34-.36-1.09-1.3-.51-2.67ZM737.99,471.68c-32.72,37.35-67.01,66.99-104.54,90.36l-61.01-37.93c-1.07-.64-1.15-1.73-1.11-2.16.04-.41.19-1.47,1.37-2.01,22.64-10.61,45.23-20.05,68.83-28.89,27.36-8.82,59.86-17.83,96.46-19.37ZM559.5,592.94l-3.16-13.43c-2.82-11.87-3.65-23.92-2.56-35.96.17-1.96,2.39-3.01,4.06-1.99l53.11,32.67-42.84,22.64c-3.46,1.82-7.73-.11-8.61-3.93ZM570.71,620.49l61.27-31.95c30.97,21.42,54.95,43.05,74.53,67.38l-29.43-1.39c-33.66-5.23-69.68-15.65-106.18-30.28-1.62-.66-1.73-2.95-.19-3.76ZM752.62,777.84c-5.21,16.7-26.16,16.76-32.91,16.29-60.71-11.53-107.78-57.96-139.94-138.04-.83-2.05,1.2-4.1,3.27-3.35,33.91,12.45,65.11,22.62,98.68,24.07l41.47,1.82c27.21,41.15,37.09,74.55,29.43,99.22ZM915.71,580.75c-17.94,31.37-85.59,75.47-180.33,76.3-21.06-29.56-47.28-55.46-82.11-80.98,41-27.04,79.02-61.89,116.02-106.27,57.85,1.56,109.9,19.5,139.64,48.14,16.32,18.19,18.88,41.64,6.77,62.81Z';

/** Just the outer silhouette (first subpath). The comet only traces this so it
 *  doesn't teleport between the inner negative-space holes. */
const MARK_PATH_OUTLINE = MARK_PATH_FULL.split('ZM')[0] + 'Z';

const VIEWBOX = 1080;
const CENTER = VIEWBOX / 2;

/** Pre-computed radius from center to viewBox corner — used to size the radial
 *  mask reveal so it grows just past the farthest visible pixel. */
const REVEAL_MAX_RADIUS = Math.ceil(Math.SQRT2 * CENTER) + 80;

const COLORS = {
  fill: '#00DF81', // caribbean-green — the final filled mark
  trail: '#2CC295', // mountain-meadow — the traced contour glow
  ghost: '#17876D', // frog — the dim background ghost (anchors the eye)
  comet: '#F1F7F6', // bone — the leading particle
};

interface Props {
  className?: string;
  /** Skip viewport gating and animate immediately. */
  immediate?: boolean;
  /** Seconds the comet takes to traverse the outer silhouette. Default 2.6. */
  traceDurationSeconds?: number;
  /** Seconds the radial mask takes to flood the fill. Default 0.9. */
  fillRevealSeconds?: number;
  /** Whether to loop a soft diagonal shimmer across the filled mark. Default true. */
  loopShimmer?: boolean;
  /** Seconds between the start of one shimmer pass and the next. Default 11. */
  shimmerIntervalSeconds?: number;
}

/**
 * Premium hero mark animation, on GSAP (DrawSVG + MotionPath). Three phases:
 *
 *  1. CONSTELLATION TRACE (~2.6s) — a comet (MotionPath along the outer
 *     silhouette) leads while the full contour draws in behind it (DrawSVG).
 *  2. RADIAL FILL REVEAL (~0.9s) — a circular mask floods the fill from
 *     dead center outward.
 *  3. AMBIENT SHIMMER LOOP — a diagonal light band crosses the filled mark
 *     every ~11s (repeating tween, paused when out of view).
 *
 * Reduced motion: static filled mark, no animation.
 */
export function AnimatedMark({
  className,
  immediate = false,
  traceDurationSeconds = 2.6,
  fillRevealSeconds = 0.9,
  loopShimmer = true,
  shimmerIntervalSeconds = 11,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const outlinePathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<SVGGElement>(null);
  const maskCircleRef = useRef<SVGCircleElement>(null);
  const shimmerRef = useRef<SVGGElement>(null);

  const fillMaskId = useId();
  const shimmerClipId = useId();
  const cometGlowId = useId();
  const shimmerGradId = useId();

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const trail = trailRef.current;
      const comet = cometRef.current;
      const maskCircle = maskCircleRef.current;
      const shimmer = shimmerRef.current;
      const outline = outlinePathRef.current;
      if (!trail || !comet || !maskCircle || !outline) return;

      if (reduced) {
        // Static filled mark: flood the mask, hide trace artifacts.
        gsap.set(maskCircle, { attr: { r: REVEAL_MAX_RADIUS } });
        gsap.set([trail, comet], { autoAlpha: 0 });
        return;
      }

      gsap.set(maskCircle, { attr: { r: 0 } });
      gsap.set(trail, { drawSVG: '0%', autoAlpha: 0 });
      gsap.set(comet, { autoAlpha: 0 });

      const tl = gsap.timeline({
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: svgRef.current,
                start: 'top 85%',
                once: true,
              },
            }),
      });

      // PHASE 1 — comet trace + contour glow.
      tl.to(trail, { autoAlpha: 1, duration: 0.4, ease: 'auphere' }, 0)
        .to(trail, { drawSVG: '100%', duration: traceDurationSeconds, ease: 'power1.inOut' }, 0)
        .to(comet, { autoAlpha: 1, duration: 0.12 }, 0)
        .to(
          comet,
          {
            motionPath: { path: outline, align: outline, alignOrigin: [0.5, 0.5] },
            duration: traceDurationSeconds,
            ease: 'power1.inOut',
          },
          0,
        )
        .to(comet, { autoAlpha: 0, duration: 0.18 }, traceDurationSeconds - 0.18)
        // PHASE 2 — radial fill reveal.
        .to(
          maskCircle,
          { attr: { r: REVEAL_MAX_RADIUS }, duration: fillRevealSeconds, ease: 'auphere' },
          traceDurationSeconds,
        )
        .to(trail, { autoAlpha: 0, duration: 0.6, ease: 'power1.out' }, traceDurationSeconds + fillRevealSeconds * 0.6);

      // PHASE 3 — ambient shimmer loop (its own repeating tween).
      if (loopShimmer && shimmer) {
        gsap.set(shimmer, { x: -1.8 * VIEWBOX });
        tl.add(() => {
          gsap.to(shimmer, {
            x: 1.8 * VIEWBOX,
            duration: 1.6,
            ease: 'sine.inOut',
            repeat: -1,
            repeatDelay: Math.max(0, shimmerIntervalSeconds - 1.6),
          });
        });
      }
    },
    {
      scope: svgRef,
      dependencies: [immediate, traceDurationSeconds, fillRevealSeconds, loopShimmer, shimmerIntervalSeconds],
    },
  );

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      className={cn('block overflow-visible', className)}
      aria-hidden
      role="presentation"
    >
      <defs>
        {/* Mask used to flood-reveal the fill from a growing center circle. */}
        <mask id={fillMaskId}>
          <circle ref={maskCircleRef} cx={CENTER} cy={CENTER} r={0} fill="white" />
        </mask>

        {/* Clip used to keep the shimmer band inside the silhouette. */}
        <clipPath id={shimmerClipId}>
          <path d={MARK_PATH_FULL} />
        </clipPath>

        {/* Soft glow filter behind the comet. */}
        <filter id={cometGlowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="14" />
        </filter>

        {/* Diagonal shimmer gradient — transparent → bright → transparent. */}
        <linearGradient
          id={shimmerGradId}
          x1="0"
          y1="0"
          x2={VIEWBOX}
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`rotate(28 ${CENTER} ${CENTER})`}
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Layer 1 — DIM GHOST: faint stroke so the eye knows where the form goes. */}
      <path
        d={MARK_PATH_FULL}
        fill="none"
        stroke={COLORS.ghost}
        strokeWidth={1.5}
        strokeOpacity={0.18}
        strokeLinejoin="round"
      />

      {/* Layer 2 — TRAIL: contour drawing behind the comet (DrawSVG). */}
      <path
        ref={trailRef}
        d={MARK_PATH_FULL}
        fill="none"
        stroke={COLORS.trail}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          visibility: 'hidden',
          filter: `drop-shadow(0 0 8px ${COLORS.trail}) drop-shadow(0 0 18px ${COLORS.trail}aa)`,
        }}
      />

      {/* Outer silhouette as an invisible ref — the comet's MotionPath. */}
      <path ref={outlinePathRef} d={MARK_PATH_OUTLINE} fill="none" stroke="none" pointerEvents="none" />

      {/* Layer 3 — FILL: the final filled mark, revealed by the growing mask. */}
      <path d={MARK_PATH_FULL} fill={COLORS.fill} mask={`url(#${fillMaskId})`} />

      {/* Layer 4 — SHIMMER: diagonal band swept across the filled mark. */}
      {loopShimmer && (
        <g clipPath={`url(#${shimmerClipId})`}>
          <g ref={shimmerRef}>
            <rect
              x={-VIEWBOX}
              y={-VIEWBOX}
              width={3 * VIEWBOX}
              height={3 * VIEWBOX}
              fill={`url(#${shimmerGradId})`}
            />
          </g>
        </g>
      )}

      {/* Layer 5 — COMET: glow halo + sharp core, driven along the outline. */}
      <g ref={cometRef} style={{ visibility: 'hidden' }}>
        <circle r={28} fill={COLORS.fill} opacity={0.85} filter={`url(#${cometGlowId})`} />
        <circle r={9} fill={COLORS.comet} />
      </g>
    </svg>
  );
}
