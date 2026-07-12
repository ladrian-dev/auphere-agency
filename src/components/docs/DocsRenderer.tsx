import type { DocBlock, DocCodeSnippet } from '@/content/docs/types';
import { CodeBlock } from './CodeBlock';
import { renderInline } from './inline';

interface ChromeLabels {
  copy: string;
  copied: string;
  required: string;
}

interface Props {
  blocks: DocBlock[];
  locale: string;
  chrome: ChromeLabels;
}

/**
 * Maps the typed docs content model to the editorial design system.
 * Server component — only CodeBlock hydrates on the client (copy button).
 */
export function DocsRenderer({ blocks, locale, chrome }: Props) {
  return (
    <div className="text-[16px] md:text-[17px] leading-[1.65] text-[var(--color-ink)]">
      {blocks.map((block, index) => (
        <Block key={index} block={block} locale={locale} chrome={chrome} />
      ))}
    </div>
  );
}

function Block({
  block,
  locale,
  chrome,
}: {
  block: DocBlock;
  locale: string;
  chrome: ChromeLabels;
}) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="mt-4 text-[var(--color-ink-muted)] [text-wrap:pretty]">
          {renderInline(block.text, locale)}
        </p>
      );

    case 'h2':
      return (
        <h2
          id={block.id}
          className="scroll-mt-32 mt-12 md:mt-16 pb-3 border-b border-[var(--color-ink-subtle)] font-display text-[22px] md:text-[26px] leading-[1.2] tracking-[-0.01em] [text-wrap:balance]"
        >
          {block.text}
        </h2>
      );

    case 'h3':
      return (
        <h3 className="mt-6 font-display text-[18px] md:text-[20px] leading-[1.25] tracking-[-0.01em]">
          {renderInline(block.text, locale)}
        </h3>
      );

    case 'code':
      return <Snippet snippet={block} chrome={chrome} />;

    case 'callout': {
      const isWarning = block.tone === 'warning';
      return (
        <aside
          className={`my-6 rounded-[8px] border p-5 ${
            isWarning
              ? 'border-[color-mix(in_srgb,var(--color-status-warning)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-status-warning)_7%,transparent)]'
              : 'border-[var(--color-ink-subtle)] bg-[var(--color-ink-faint)]'
          }`}
        >
          {block.title ? (
            <p
              className={`font-mono text-[11px] uppercase tracking-[0.12em] mb-2 ${
                isWarning ? 'text-[var(--color-status-warning)]' : 'text-[var(--color-primary-deep)]'
              }`}
            >
              {block.title}
            </p>
          ) : null}
          <p className="text-[15px] leading-[1.6] text-[var(--color-ink-muted)]">
            {renderInline(block.text, locale)}
          </p>
        </aside>
      );
    }

    case 'list': {
      const items = block.items.map((item, i) => (
        <li key={i} className="text-[var(--color-ink-muted)] [text-wrap:pretty]">
          {renderInline(item, locale)}
        </li>
      ));
      return block.ordered ? (
        <ol className="mt-4 space-y-2.5 list-decimal pl-5 marker:font-mono marker:text-[13px] marker:text-[var(--color-ink-dim)]">
          {items}
        </ol>
      ) : (
        <ul className="mt-4 space-y-2.5 list-disc pl-5 marker:text-[var(--color-ink-dim)]">
          {items}
        </ul>
      );
    }

    case 'table':
      return (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse text-[14px] md:text-[15px]">
            <thead>
              <tr className="border-b border-[var(--color-ink-subtle)]">
                {block.head.map((cell, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="py-2.5 pr-6 font-mono text-[11px] uppercase tracking-[0.12em] font-normal text-[var(--color-ink-muted)] whitespace-nowrap"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-ink-subtle)]">
              {block.rows.map((row, r) => (
                <tr key={r} className="align-top">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className="py-3 pr-6 leading-[1.55] text-[var(--color-ink-muted)] min-w-[140px]"
                    >
                      {renderInline(cell, locale)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'steps':
      return (
        <ol className="mt-7 space-y-0">
          {block.items.map((step, i) => (
            <li
              key={i}
              className="relative pl-12 pb-7 last:pb-2 border-l border-[var(--color-ink-subtle)] last:border-l-transparent ml-4"
            >
              {/* w-6 = 32px on this project's spacing scale (tokens.css) */}
              <span
                aria-hidden
                className="absolute -left-4 top-0 w-6 h-6 rounded-full border border-[var(--color-ink-subtle)] bg-[var(--color-bone)] flex items-center justify-center font-mono text-[12px] text-[var(--color-ink-muted)]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[18px] md:text-[20px] leading-[1.25] tracking-[-0.01em] pt-0.5">
                {step.title}
              </h3>
              {step.body ? (
                <p className="mt-2 text-[15px] md:text-[16px] leading-[1.6] text-[var(--color-ink-muted)] [text-wrap:pretty]">
                  {renderInline(step.body, locale)}
                </p>
              ) : null}
              {step.code ? <Snippet snippet={step.code} chrome={chrome} /> : null}
            </li>
          ))}
        </ol>
      );

    case 'params':
      return (
        <dl className="mt-6 divide-y divide-[var(--color-ink-subtle)] border-y border-[var(--color-ink-subtle)]">
          {block.items.map((param) => (
            <div key={param.name} className="py-4">
              <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <code className="font-mono text-[14px] text-[var(--color-ink)]">{param.name}</code>
                {param.type ? (
                  <span className="font-mono text-[12px] text-[var(--color-ink-dim)]">
                    {param.type}
                  </span>
                ) : null}
                {param.required ? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-primary-deep)]">
                    {chrome.required}
                  </span>
                ) : null}
              </dt>
              <dd className="mt-1.5 text-[15px] leading-[1.6] text-[var(--color-ink-muted)] [text-wrap:pretty]">
                {renderInline(param.description, locale)}
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

function Snippet({ snippet, chrome }: { snippet: DocCodeSnippet; chrome: ChromeLabels }) {
  return (
    <CodeBlock
      code={snippet.code}
      language={snippet.language}
      title={snippet.title}
      copyLabel={chrome.copy}
      copiedLabel={chrome.copied}
    />
  );
}
