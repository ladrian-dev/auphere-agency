import type { ReactNode } from 'react';

/**
 * Minimal inline-markdown renderer for docs content: `code`, **bold** and
 * [links](href). Internal links (starting with `/`) are prefixed with the
 * active locale; external and mailto links pass through untouched.
 */

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const EMPHASIS_RE = /(\*\*[^*]+\*\*|`[^`]+`)/g;

function localizeHref(href: string, locale: string): string {
  if (!href.startsWith('/')) return href;
  // "/#book" → "/{locale}#book" · "/docs/x" → "/{locale}/docs/x"
  if (href.startsWith('/#')) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

function renderEmphasis(text: string, keyPrefix: string): ReactNode[] {
  return text.split(EMPHASIS_RE).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={key} className="font-medium text-[var(--color-ink)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={key}
          className="font-mono text-[0.85em] bg-[var(--color-ink-faint)] border border-[var(--color-ink-subtle)] rounded-[4px] px-[5px] py-[1px] whitespace-nowrap"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function renderInline(text: string, locale: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(...renderEmphasis(text.slice(lastIndex, match.index), `t${i}`));
    }
    const [, label = '', href = ''] = match;
    nodes.push(
      <a
        key={`l${i}`}
        href={localizeHref(href, locale)}
        className="text-[var(--color-primary-deep)] underline underline-offset-[3px] decoration-[var(--color-ink-dim)] hover:decoration-[var(--color-primary-deep)] transition-colors"
      >
        {renderEmphasis(label, `ll${i}`)}
      </a>,
    );
    lastIndex = match.index + match[0].length;
    i += 1;
  }
  if (lastIndex < text.length) {
    nodes.push(...renderEmphasis(text.slice(lastIndex), `t${i}`));
  }
  return nodes;
}
