'use client';
import { useState, useRef, useEffect } from 'react';

interface Props {
  code: string;
  language: string;
  title?: string;
  /** Localized labels (from the `docs.chrome` namespace). */
  copyLabel: string;
  copiedLabel: string;
}

/**
 * Editorial code block: dark surface, mono type, copy button.
 * Deliberately unhighlighted — the docs follow the landing's monochrome
 * editorial system, and one ink on dark keeps snippets calm and legible.
 */
export function CodeBlock({ code, language, title, copyLabel, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/insecure context) — leave the
      // button as-is; the user can still select the text manually.
    }
  }

  return (
    <figure className="my-6 rounded-[8px] overflow-hidden border border-[var(--color-ink-subtle)]">
      <figcaption className="flex items-center justify-between gap-4 bg-[var(--color-ink)] border-b border-[color-mix(in_srgb,var(--color-bone)_14%,transparent)] px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--color-bone)_60%,transparent)] truncate">
          {title ?? language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color-mix(in_srgb,var(--color-bone)_60%,transparent)] hover:text-[var(--color-bone)] transition-colors py-1 px-2 -mr-2 rounded-[4px]"
          aria-live="polite"
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </figcaption>
      <pre className="bg-[var(--color-ink)] text-[var(--color-bone)] text-[13px] leading-[1.7] font-mono p-4 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
