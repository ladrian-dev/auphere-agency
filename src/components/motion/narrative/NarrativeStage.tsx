'use client';
import { useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useAuphereGSAP } from '@/lib/motion/gsap';
import {
  NODE_IDS,
  STAGE_STATES,
  STAGE_VIEWBOX,
  type NodeId,
  type StageStateId,
} from './stage-states';

export interface StageLabels {
  channels: [string, string, string, string];
  core: string;
  out: string;
  human: string;
  tools: [string, string, string, string];
  tracks: [string, string, string];
  stages: [string, string, string];
  annotations: {
    sharedEngine: string;
    t0: string;
    t1: string;
    t2: string;
    tenantA: string;
    tenantB: string;
    wall: string;
    rowData: string;
    rowConv: string;
  };
}

interface Props {
  state: StageStateId;
  labels: StageLabels;
  className?: string;
}

const NODE_H = 44;
const DUR = 0.9;

/**
 * §6.2 — "El plano vivo".
 *
 * Un solo SVG que acompaña toda la narrativa de la home y se reconfigura al
 * cambiar de sección. Los once nodos son siempre los mismos elementos del DOM:
 * viajan de una disposición a otra en lugar de aparecer y desaparecer. Esa
 * continuidad es el efecto — se lee como una máquina que se reordena, no como
 * cuatro ilustraciones distintas.
 *
 * Las etiquetas cambian con el estado porque el mismo nodo representa cosas
 * distintas en cada acto (un canal en `network`, una vía comercial en `tracks`,
 * una etapa en `timeline`, un inquilino en `isolation`).
 *
 * Rendimiento y accesibilidad:
 *  · `aria-hidden` — es ornamental; todo lo que dice está en el texto al lado.
 *  · Con `prefers-reduced-motion` los nodos se colocan sin transición.
 *  · Solo se monta desde `xl`; en pantallas menores la home no lo usa.
 */
export function NarrativeStage({ state, labels, className }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useAuphereGSAP(
    ({ reduced, gsap }) => {
      const svg = svgRef.current;
      if (!svg) return undefined;

      const target = STAGE_STATES[state];
      const d = reduced ? 0 : DUR;

      // ── Nodos ──────────────────────────────────────────────────────────────
      NODE_IDS.forEach((id, i) => {
        const el = svg.querySelector<SVGGElement>(`[data-node="${id}"]`);
        const box = svg.querySelector<SVGRectElement>(`[data-node="${id}"] [data-node-box]`);
        if (!el || !box) return;
        const layout = target.nodes[id];
        gsap.to(el, {
          x: layout.x,
          y: layout.y,
          opacity: layout.opacity,
          scale: layout.scale ?? 1,
          duration: d,
          ease: 'auphere',
          delay: reduced ? 0 : i * 0.02,
          overwrite: 'auto',
        });
        gsap.to(box, {
          attr: { width: layout.w, x: -layout.w / 2 },
          duration: d,
          ease: 'auphere',
          overwrite: 'auto',
        });
      });

      // ── Conexiones ─────────────────────────────────────────────────────────
      // Cada par posible tiene su propio path persistente. Se redibuja hacia la
      // geometría del estado y se traza o destraza según participe o no.
      const linkKey = (a: NodeId, b: NodeId) => `${a}__${b}`;
      const active = new Set(target.links.map(([a, b]) => linkKey(a, b)));

      svg.querySelectorAll<SVGPathElement>('[data-link]').forEach((path) => {
        const key = path.dataset.link!;
        const [a, b] = key.split('__') as [NodeId, NodeId];
        const from = target.nodes[a];
        const to = target.nodes[b];
        const isOn = active.has(key);

        if (isOn) {
          // Curva suave: control horizontal cuando el salto es lateral,
          // vertical cuando es un descuelgue hacia las herramientas.
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const horizontal = Math.abs(dx) >= Math.abs(dy);
          const fx = from.x + (horizontal ? Math.sign(dx) * (from.w / 2) : 0);
          const fy = from.y + (horizontal ? 0 : Math.sign(dy) * (NODE_H / 2));
          const tx = to.x - (horizontal ? Math.sign(dx) * (to.w / 2) : 0);
          const ty = to.y - (horizontal ? 0 : Math.sign(dy) * (NODE_H / 2));
          const c1 = horizontal ? `${fx + dx * 0.45},${fy}` : `${fx},${fy + dy * 0.45}`;
          const c2 = horizontal ? `${tx - dx * 0.45},${ty}` : `${tx},${ty - dy * 0.45}`;
          gsap.to(path, {
            attr: { d: `M${fx},${fy} C${c1} ${c2} ${tx},${ty}` },
            duration: d,
            ease: 'auphere',
            overwrite: 'auto',
          });
          gsap.to(path, { drawSVG: '100%', opacity: 1, duration: d, ease: 'auphere', overwrite: 'auto' });
        } else {
          gsap.to(path, { drawSVG: '0%', opacity: 0, duration: d * 0.6, ease: 'auphere', overwrite: 'auto' });
        }
      });

      // ── Marcos y anotaciones ───────────────────────────────────────────────
      svg.querySelectorAll<SVGGElement>('[data-frame]').forEach((frame) => {
        const spec = target.frames?.find((f) => f.key === frame.dataset.frame);
        gsap.to(frame, {
          opacity: spec ? 1 : 0,
          x: spec ? spec.x : 360,
          y: spec ? spec.y : 300,
          duration: d,
          ease: 'auphere',
          overwrite: 'auto',
        });
      });

      svg.querySelectorAll<SVGTextElement>('[data-annotation]').forEach((note) => {
        const spec = target.annotations?.find((a) => a.key === note.dataset.annotation);
        gsap.to(note, {
          opacity: spec ? 1 : 0,
          x: spec ? spec.x : 360,
          y: spec ? spec.y : 300,
          duration: d,
          ease: 'auphere',
          overwrite: 'auto',
        });
      });

      // ── Muro de aislamiento ────────────────────────────────────────────────
      const wall = svg.querySelector<SVGLineElement>('[data-wall]');
      if (wall) {
        gsap.to(wall, {
          drawSVG: state === 'isolation' ? '100%' : '0%',
          opacity: state === 'isolation' ? 1 : 0,
          duration: d,
          ease: 'auphere',
          overwrite: 'auto',
        });
      }

      return undefined;
    },
    { scope: svgRef, dependencies: [state] },
  );

  // Etiqueta de cada nodo según el acto en curso.
  const nodeLabel = (id: NodeId): string => {
    const channelIndex = { ch0: 0, ch1: 1, ch2: 2, ch3: 3 } as const;
    if (id in channelIndex) {
      const i = channelIndex[id as keyof typeof channelIndex];
      // `tracks` y `timeline` solo usan tres de los cuatro nodos de canal; el
      // cuarto queda oculto en esos estados y no necesita etiqueta.
      if (state === 'tracks') return labels.tracks.at(i) ?? '';
      if (state === 'timeline') return labels.stages.at(i) ?? '';
      // En el acto de aislamiento los cuatro nodos son las dos filas de datos
      // de cada inquilino; quién es cada columna lo dicen las anotaciones.
      if (state === 'isolation') return i % 2 === 0 ? labels.annotations.rowData : labels.annotations.rowConv;
      return labels.channels[i] ?? '';
    }
    if (id === 'core') return labels.core;
    if (id === 'out') return labels.out;
    if (id === 'human') return labels.human;
    const toolIndex = { tool0: 0, tool1: 1, tool2: 2, tool3: 3 } as const;
    return labels.tools[toolIndex[id as keyof typeof toolIndex]] ?? '';
  };

  const accent = 'var(--stage-accent)';
  const line = 'var(--stage-line)';
  const tone = STAGE_STATES[state].tone;

  // Todos los pares que alguna disposición llega a usar.
  const LINK_PAIRS: Array<[NodeId, NodeId]> = [
    ['ch0', 'core'],
    ['ch1', 'core'],
    ['ch2', 'core'],
    ['ch3', 'core'],
    ['core', 'out'],
    ['core', 'human'],
    ['core', 'tool0'],
    ['core', 'tool1'],
    ['core', 'tool2'],
    ['core', 'tool3'],
    ['ch0', 'ch1'],
    ['ch1', 'ch2'],
  ];

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${STAGE_VIEWBOX.w} ${STAGE_VIEWBOX.h}`}
      className={cn(
        'block w-full h-auto transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
        tone === 'dark' ? 'text-[var(--color-bone)]' : 'text-[var(--color-ink)]',
        className,
      )}
      aria-hidden
      role="presentation"
      style={{
        ['--stage-line' as string]: 'color-mix(in srgb, currentColor 62%, transparent)',
        ['--stage-accent' as string]:
          tone === 'dark' ? 'var(--color-caribbean-green)' : 'var(--color-bangladesh-green)',
      }}
    >
      {/* ── Conexiones ── */}
      {LINK_PAIRS.map(([a, b]) => (
        <path
          key={`${a}__${b}`}
          data-link={`${a}__${b}`}
          fill="none"
          stroke={line}
          strokeWidth={1.4}
          opacity={0}
        />
      ))}

      {/* ── Muro de aislamiento (solo en el último acto) ── */}
      <line
        data-wall
        x1={365}
        y1={196}
        x2={365}
        y2={440}
        stroke={accent}
        strokeWidth={2}
        strokeDasharray="6 6"
        opacity={0}
      />

      {/* ── Marcos de las tres vías ── */}
      {['hire', 'resell', 'embed'].map((key) => (
        <g key={key} data-frame={key} opacity={0}>
          <rect
            x={-95}
            y={-75}
            width={190}
            height={150}
            rx={14}
            fill="none"
            stroke={line}
            strokeWidth={1.2}
            strokeDasharray="5 5"
          />
        </g>
      ))}

      {/* ── Nodos ── */}
      {NODE_IDS.map((id) => {
        const initial = STAGE_STATES.network.nodes[id];
        const isOut = id === 'out';
        return (
          <g key={id} data-node={id} opacity={0} transform={`translate(${initial.x} ${initial.y})`}>
            <rect
              data-node-box
              x={-initial.w / 2}
              y={-NODE_H / 2}
              width={initial.w}
              height={NODE_H}
              rx={10}
              fill="var(--stage-fill, transparent)"
              stroke={isOut ? accent : line}
              strokeWidth={isOut ? 1.6 : 1.4}
            />
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              y={1}
              fontFamily="var(--font-mono)"
              fontSize={13}
              letterSpacing="0.07em"
              fill={isOut ? accent : 'currentColor'}
            >
              {nodeLabel(id).toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* ── Anotaciones ── */}
      {(['sharedEngine', 't0', 't1', 't2', 'tenantA', 'tenantB', 'wall'] as const).map((key) => (
        <text
          key={key}
          data-annotation={key}
          opacity={0}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={11}
          letterSpacing="0.14em"
          fill={accent}
        >
          {labels.annotations[key].toUpperCase()}
        </text>
      ))}
    </svg>
  );
}
