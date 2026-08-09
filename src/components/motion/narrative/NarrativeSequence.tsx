'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { NarrativeStage, type StageLabels } from './NarrativeStage';
import type { StageStateId } from './stage-states';

/**
 * §6.2 — el carril del plano vivo.
 *
 * Envuelve los actos de la home. El escenario vive en una columna pegajosa a la
 * derecha y no se desmonta entre secciones: es la misma pieza durante todo el
 * recorrido. Cada `<NarrativeAct>` declara en qué estado debe estar el plano
 * cuando esa sección domina la pantalla.
 *
 * El estado lo decide un IntersectionObserver con una banda estrecha en el
 * centro del viewport, no ScrollTrigger: es el mismo motivo por el que los
 * reveals migraron a `onEnter` (ver `lib/motion/on-enter.ts`). Aquí además da
 * una histéresis natural — el acto cambia cuando su sección cruza el centro,
 * no cuando asoma por el borde.
 *
 * Debajo de `xl` el carril no se monta: el plano necesita media pantalla para
 * leerse y en móvil esa mitad no existe. Las secciones se quedan a ancho
 * completo, que es como ya funcionaban.
 */

const StageInsetContext = createContext(false);

/** True cuando el contenido vive dentro de la secuencia y debe dejar sitio al plano. */
export function useStageInset(): boolean {
  return useContext(StageInsetContext);
}

interface SequenceProps {
  labels: StageLabels;
  /** Estado con el que arranca el carril antes de que ningún acto tome el mando. */
  initialState?: StageStateId;
  children: ReactNode;
}

interface ActContext {
  setState: (state: StageStateId) => void;
  register: (el: HTMLElement, state: StageStateId) => () => void;
}

const ActRegistry = createContext<ActContext | null>(null);

export function NarrativeSequence({ labels, initialState = 'tracks', children }: SequenceProps) {
  const [state, setState] = useState<StageStateId>(initialState);
  const entries = useRef(new Map<Element, StageStateId>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    // Banda estrecha en mitad del viewport: el acto activo es el que la ocupa.
    const io = new IntersectionObserver(
      (obs) => {
        for (const entry of obs) {
          if (entry.isIntersecting) {
            const next = entries.current.get(entry.target);
            if (next) setState(next);
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    observerRef.current = io;
    for (const el of entries.current.keys()) io.observe(el);
    return () => {
      io.disconnect();
      observerRef.current = null;
    };
  }, []);

  const register = (el: HTMLElement, actState: StageStateId) => {
    entries.current.set(el, actState);
    observerRef.current?.observe(el);
    return () => {
      entries.current.delete(el);
      observerRef.current?.unobserve(el);
    };
  };

  return (
    <ActRegistry.Provider value={{ setState, register }}>
      <StageInsetContext.Provider value>
        <div className="relative">
          {/* Carril del plano — pegajoso, ornamental, solo desde xl. */}
          <div
            aria-hidden
            className="pointer-events-none hidden xl:block absolute inset-y-0 right-0 w-[46%]"
          >
            <div className="sticky top-0 h-screen flex items-center pr-8 pl-2">
              <NarrativeStage state={state} labels={labels} />
            </div>
          </div>
          {children}
        </div>
      </StageInsetContext.Provider>
    </ActRegistry.Provider>
  );
}

/** Marca una sección como acto de la narrativa y le asigna su estado del plano. */
export function NarrativeAct({ state, children }: { state: StageStateId; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const registry = useContext(ActRegistry);

  useEffect(() => {
    const el = ref.current;
    if (!el || !registry) return;
    return registry.register(el, state);
  }, [registry, state]);

  return <div ref={ref}>{children}</div>;
}
