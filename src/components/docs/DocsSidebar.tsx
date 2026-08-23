'use client';
import { usePathname } from 'next/navigation';
import type { DocsNavGroup } from '@/content/docs/registry';

interface Props {
  groups: DocsNavGroup[];
  homeHref: string;
  homeLabel: string;
  /** Product heading shown above the groups. */
  productLabel: string;
}

/**
 * Docs navigation list. Rendered twice by the docs layout: inside the
 * desktop <aside> and inside the mobile <details> disclosure. Client
 * component only for the active-item state (usePathname).
 */
export function DocsSidebar({ groups, homeHref, homeLabel, productLabel }: Props) {
  const pathname = usePathname();

  return (
    <nav aria-label={homeLabel}>
      <a
        href={homeHref}
        className="type-meta text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
      >
        {homeLabel}
      </a>
      <p className="mt-5 font-display text-[15px] font-medium text-[var(--color-ink)]">
        {productLabel}
      </p>
      <div className="mt-4 space-y-6">
        {groups.map((group) => (
          <div key={group.id}>
            <p className="type-meta text-[var(--color-ink-dim)] mb-2">
              {group.label}
            </p>
            <ul className="space-y-0.5 border-l border-[var(--color-ink-subtle)]">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`block text-[14px] leading-snug py-1.5 pl-3 -ml-px border-l transition-colors ${
                        active
                          ? 'border-[var(--color-primary-deep)] text-[var(--color-ink)] font-medium'
                          : 'border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-dim)]'
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
