'use client';
import { useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useAuphereGSAP } from '@/lib/motion/gsap';

/**
 * §6.1.1 — El orquestador. El activo de marca del proyecto.
 *
 * Un plano técnico de una conversación real atravesando el sistema:
 * canales (WhatsApp · Instagram · TikTok · voz) → clasificación →
 * herramientas (calendario, CRM, pagos, navegador) → respuesta,
 * con la rama de escalado a humano que se ilumina periódicamente.
 *
 * A-03: SVG estático servido en el HTML (fine-line, estética de diagrama
 * técnico). La capa GSAP (DrawSVG + MotionPath) entra DESPUÉS del LCP vía
 * requestIdleCallback; loop ambiental pausado fuera de viewport y con
 * document.hidden. Con prefers-reduced-motion el SVG queda estático.
 *
 * Colores por CSS vars para servir en hero oscuro y en /platform claro:
 *   --orch-line (trazo base) · --orch-accent (pulsos y escalado).
 */

export interface OrchestratorLabels {
  channels: [string, string, string, string];
  classifier: string;
  tools: [string, string, string, string];
  response: string;
  human: string;
}

interface Props {
  labels: OrchestratorLabels;
  className?: string;
  /** Animation entrance without viewport gating (hero use). */
  immediate?: boolean;
}

const CHANNEL_Y = [96, 208, 320, 432] as const;
const CHANNEL_PATHS = [
  'M160,96 C230,96 235,240 300,240',
  'M160,208 C230,208 235,252 300,252',
  'M160,320 C230,320 235,268 300,268',
  'M160,432 C230,432 235,280 300,280',
] as const;
const RESPONSE_PATH = 'M440,264 C500,264 520,280 580,280';
const HUMAN_PATH = 'M420,232 C480,180 540,120 600,100';
const TOOL_STEM = 'M370,296 L370,372';
const TOOL_PATHS = [
  'M370,372 C300,412 240,448 209,496',
  'M370,372 C352,428 348,460 349,496',
  'M370,372 C420,428 482,458 489,496',
  'M370,372 C520,412 600,448 629,496',
] as const;
const TOOL_X = [150, 290, 430, 570] as const;

export function Orchestrator({ labels, className, immediate = false }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const svg = svgRef.current;
      if (!svg || reduced) return;

      const lines = svg.querySelectorAll<SVGPathElement>('[data-orch-line]');
      const nodes = svg.querySelectorAll<SVGGElement>('[data-orch-node]');
      const pulses = svg.querySelectorAll<SVGCircleElement>('[data-orch-pulse]');
      const humanBranch = svg.querySelector<SVGPathElement>('[data-orch-human-line]');
      const humanNode = svg.querySelector<SVGGElement>('[data-orch-human-node]');
      const humanPulse = svg.querySelector<SVGCircleElement>('[data-orch-human-pulse]');

      gsap.set(lines, { drawSVG: '0%' });
      gsap.set(nodes, { autoAlpha: 0, y: 6 });
      gsap.set(pulses, { autoAlpha: 0 });
      if (humanPulse) gsap.set(humanPulse, { autoAlpha: 0 });

      // Master ambient timeline — created paused; started after idle (post-LCP).
      const ambient = gsap.timeline({ repeat: -1, paused: true });
      pulses.forEach((pulse, i) => {
        const path = svg.querySelector<SVGPathElement>(`[data-orch-channel-path="${i % CHANNEL_PATHS.length}"]`);
        const respPath = svg.querySelector<SVGPathElement>('[data-orch-response-path]');
        if (!path || !respPath) return;
        const start = i * 1.5;
        ambient
          .set(pulse, { autoAlpha: 0 }, start)
          .to(pulse, { autoAlpha: 0.7, duration: 0.2 }, start + 0.05)
          .to(pulse, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: 1.6, ease: 'power1.inOut' }, start)
          .to(pulse, { motionPath: { path: respPath, align: respPath, alignOrigin: [0.5, 0.5] }, duration: 1.0, ease: 'power1.out' }, start + 1.65)
          .to(pulse, { autoAlpha: 0, duration: 0.25 }, start + 2.6);
      });
      // Escalation branch lights up once per ambient cycle.
      if (humanBranch && humanNode && humanPulse) {
        const t = 4.2;
        ambient
          .set(humanPulse, { autoAlpha: 0 }, t)
          .to(humanPulse, { autoAlpha: 0.85, duration: 0.15 }, t + 0.05)
          .to(humanPulse, { motionPath: { path: humanBranch, align: humanBranch, alignOrigin: [0.5, 0.5] }, duration: 1.1, ease: 'power1.inOut' }, t)
          .to(humanBranch, { stroke: 'var(--orch-accent)', strokeOpacity: 0.9, duration: 0.3 }, t + 0.7)
          .to(humanNode, { scale: 1.04, transformOrigin: '50% 50%', duration: 0.25, ease: 'auphere' }, t + 1.0)
          .to(humanPulse, { autoAlpha: 0, duration: 0.2 }, t + 1.15)
          .to(humanNode, { scale: 1, duration: 0.35 }, t + 1.4)
          .to(humanBranch, { stroke: 'var(--orch-line)', strokeOpacity: 0.5, duration: 0.8 }, t + 1.5);
      }

      const entrance = gsap.timeline({
        paused: true,
        onComplete: () => ambient.play(),
        ...(immediate
          ? {}
          : { scrollTrigger: { trigger: svg, start: 'top 85%', once: true } }),
      });
      entrance
        .to(lines, { drawSVG: '100%', duration: 1.4, ease: 'power1.inOut', stagger: 0.06 })
        .to(nodes, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'auphere-expo', stagger: 0.05 }, 0.4);

      // Post-LCP gate: entrance work starts only when the main thread is idle.
      const start = () => (immediate ? entrance.play() : entrance.scrollTrigger?.refresh());
      const hasIdle = typeof window.requestIdleCallback === 'function';
      const idle = hasIdle ? window.requestIdleCallback(start) : window.setTimeout(start, 800);

      // Pause the ambient loop when the tab is hidden or the SVG leaves view.
      const onVisibility = () => (document.hidden ? ambient.pause() : entrance.progress() === 1 && ambient.play());
      document.addEventListener('visibilitychange', onVisibility);
      const io = new IntersectionObserver(([entry]) => {
        if (!entry) return;
        if (!entry.isIntersecting) ambient.pause();
        else if (entrance.progress() === 1) ambient.play();
      });
      io.observe(svg);

      return () => {
        document.removeEventListener('visibilitychange', onVisibility);
        io.disconnect();
        if (hasIdle) window.cancelIdleCallback(idle);
        else window.clearTimeout(idle);
      };
    },
    { scope: svgRef, dependencies: [immediate] },
  );

  const line = 'var(--orch-line)';
  const accent = 'var(--orch-accent)';

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 720 560"
      className={cn('block', className)}
      aria-hidden
      role="presentation"
      style={{
        ['--orch-line' as string]: 'var(--orchestrator-line, color-mix(in srgb, currentColor 45%, transparent))',
        ['--orch-accent' as string]: 'var(--orchestrator-accent, var(--color-caribbean-green))',
      }}
    >
      {/* ── Flow lines ── */}
      {CHANNEL_PATHS.map((d, i) => (
        <path
          key={i}
          data-orch-line
          data-orch-channel-path={i}
          d={d}
          fill="none"
          stroke={line}
          strokeWidth={1.2}
          strokeOpacity={0.5}
        />
      ))}
      <path data-orch-line data-orch-response-path d={RESPONSE_PATH} fill="none" stroke={line} strokeWidth={1.2} strokeOpacity={0.5} />
      <path data-orch-line data-orch-human-line d={HUMAN_PATH} fill="none" stroke={line} strokeWidth={1.2} strokeOpacity={0.5} strokeDasharray="3 5" />
      <path data-orch-line d={TOOL_STEM} fill="none" stroke={line} strokeWidth={1.2} strokeOpacity={0.4} />
      {TOOL_PATHS.map((d, i) => (
        <path key={i} data-orch-line d={d} fill="none" stroke={line} strokeWidth={1} strokeOpacity={0.35} />
      ))}

      {/* ── Channel nodes ── */}
      {labels.channels.map((label, i) => (
        <g key={label} data-orch-node>
          <rect x={30} y={CHANNEL_Y[i]! - 18} width={130} height={36} rx={8} fill="none" stroke={line} strokeWidth={1.2} strokeOpacity={0.7} />
          <circle cx={48} cy={CHANNEL_Y[i]} r={3} fill={accent} opacity={0.8} />
          <text x={62} y={CHANNEL_Y[i]! + 3.5} fontFamily="var(--font-mono)" fontSize={11} letterSpacing="0.08em" fill="currentColor" opacity={0.85}>
            {label.toUpperCase()}
          </text>
        </g>
      ))}

      {/* ── Classifier ── */}
      <g data-orch-node>
        <rect x={300} y={232} width={140} height={64} rx={10} fill="none" stroke={line} strokeWidth={1.4} strokeOpacity={0.85} />
        <rect x={306} y={238} width={128} height={52} rx={7} fill="none" stroke={line} strokeWidth={0.6} strokeOpacity={0.3} />
        <text x={370} y={268} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={11} letterSpacing="0.1em" fill="currentColor" opacity={0.9}>
          {labels.classifier.toUpperCase()}
        </text>
      </g>

      {/* ── Tools ── */}
      {labels.tools.map((label, i) => (
        <g key={label} data-orch-node>
          <rect x={TOOL_X[i]! - 59} y={496} width={118} height={30} rx={6} fill="none" stroke={line} strokeWidth={1} strokeOpacity={0.55} />
          <text x={TOOL_X[i]} y={515} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={9.5} letterSpacing="0.08em" fill="currentColor" opacity={0.7}>
            {label.toUpperCase()}
          </text>
        </g>
      ))}

      {/* ── Response ── */}
      <g data-orch-node>
        <rect x={580} y={258} width={120} height={44} rx={8} fill="none" stroke={accent} strokeWidth={1.3} strokeOpacity={0.9} />
        <text x={640} y={284} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={10.5} letterSpacing="0.09em" fill={accent}>
          {labels.response.toUpperCase()}
        </text>
      </g>

      {/* ── Human escalation ── */}
      <g data-orch-node data-orch-human-node>
        <rect x={560} y={60} width={140} height={40} rx={20} fill="none" stroke={line} strokeWidth={1.2} strokeOpacity={0.75} />
        <circle cx={582} cy={80} r={4} fill="none" stroke={line} strokeWidth={1.2} strokeOpacity={0.8} />
        <path d="M576,90 C576,85 588,85 588,90" fill="none" stroke={line} strokeWidth={1.2} strokeOpacity={0.8} />
        <text x={600} y={84} fontFamily="var(--font-mono)" fontSize={10.5} letterSpacing="0.09em" fill="currentColor" opacity={0.85}>
          {labels.human.toUpperCase()}
        </text>
      </g>

      {/* ── Pulses (animated by GSAP; invisible statically) ── */}
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} data-orch-pulse r={3.2} fill={accent} opacity={0} cx={-20} cy={-20} />
      ))}
      <circle data-orch-human-pulse r={3.2} fill={accent} opacity={0} cx={-20} cy={-20} />
    </svg>
  );
}
