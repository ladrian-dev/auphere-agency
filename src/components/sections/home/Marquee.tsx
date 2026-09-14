import { cn } from '@/lib/utils/cn';

interface Props {
  items: string[];
  /** Nombre accesible del listado (el bucle duplicado queda oculto al lector). */
  label: string;
  tone?: 'mint' | 'alert';
  /** Segundos por vuelta. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Marquesina de chips (hero y problema). Bucle CSS lineal con máscara lateral;
 * con `prefers-reduced-motion` la animación se apaga en globals.css y queda
 * una fila estática.
 */
export function Marquee({ items, label, tone = 'mint', duration = 28, reverse = false, className }: Props) {
  const chip = (text: string, key: string, hidden = false) => (
    <span
      key={key}
      aria-hidden={hidden || undefined}
      className={cn(
        'inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-[14px] text-[14px]',
        tone === 'mint'
          ? 'h-9 border-[var(--color-line-2)] bg-[var(--color-card)] text-[rgba(241,247,246,.8)]'
          : 'h-[38px] border-[rgba(168,68,58,.5)] bg-[rgba(168,68,58,.12)] text-[var(--color-text)]',
      )}
    >
      <span
        aria-hidden
        className={cn('size-1.5 rounded-full', tone === 'mint' ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-alert)]')}
      />
      {text}
    </span>
  );

  return (
    <div
      role="list"
      aria-label={label}
      className={cn(
        'relative w-full max-w-[560px] overflow-hidden max-tab:max-w-none',
        '[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]',
        className,
      )}
    >
      <div
        className="flex w-max gap-2.5 motion-safe:animate-[g-marquee_var(--marquee-duration)_linear_infinite]"
        style={
          {
            '--marquee-duration': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {items.map((text, i) => (
          <span role="listitem" key={`a-${i}`} className="contents">
            {chip(text, `a-${i}`)}
          </span>
        ))}
        {items.map((text, i) => chip(text, `b-${i}`, true))}
      </div>
    </div>
  );
}
