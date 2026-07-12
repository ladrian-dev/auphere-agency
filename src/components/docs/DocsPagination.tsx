interface PaginationLink {
  href: string;
  title: string;
}

interface Props {
  previous?: PaginationLink;
  next?: PaginationLink;
  previousLabel: string;
  nextLabel: string;
}

/** Prev/next footer navigation at the bottom of every docs page. */
export function DocsPagination({ previous, next, previousLabel, nextLabel }: Props) {
  if (!previous && !next) return null;
  return (
    <nav
      aria-label={`${previousLabel} / ${nextLabel}`}
      className="mt-16 pt-6 border-t border-[var(--color-ink-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div>
        {previous ? (
          <a href={previous.href} className="group block py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-dim)]">
              ← {previousLabel}
            </span>
            <span className="block mt-1.5 text-[15px] text-[var(--color-ink)] group-hover:text-[var(--color-primary-deep)] transition-colors">
              {previous.title}
            </span>
          </a>
        ) : null}
      </div>
      <div className="sm:text-right">
        {next ? (
          <a href={next.href} className="group block py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-dim)]">
              {nextLabel} →
            </span>
            <span className="block mt-1.5 text-[15px] text-[var(--color-ink)] group-hover:text-[var(--color-primary-deep)] transition-colors">
              {next.title}
            </span>
          </a>
        ) : null}
      </div>
    </nav>
  );
}
