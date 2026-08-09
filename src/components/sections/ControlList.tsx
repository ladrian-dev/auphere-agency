/**
 * <ControlList> — §10.2: control + mecanismo, uno a uno.
 * Server component; inherits surface colors (works on bone and on deep).
 * Used by /enterprise (04) and /platform/security.
 */
interface Control {
  name: string;
  mechanism: string;
}

export function ControlList({ controls }: { controls: Control[] }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-current/10 bg-current/[0.06]">
      {controls.map((control, i) => (
        <li key={i} className="bg-[var(--control-cell-bg,transparent)] p-6 md:p-7 flex flex-col gap-3 backdrop-blur-[1px]">
          <span aria-hidden className="font-mono text-[11px] tracking-[0.18em] opacity-45">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display font-semibold text-[16.5px] leading-snug tracking-[-0.01em]">{control.name}</h3>
          <p className="text-[13.5px] leading-relaxed opacity-70">{control.mechanism}</p>
        </li>
      ))}
    </ol>
  );
}
