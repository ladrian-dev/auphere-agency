/**
 * Typed content model for the documentation section.
 *
 * Docs pages are authored as structured TypeScript modules (one per page,
 * both locales together) and rendered by `DocsRenderer`. This keeps the
 * content type-safe, bilingual by construction, and lets the renderer own
 * every visual decision through the design tokens — no MDX pipeline needed.
 *
 * Inline text in `p`, `list`, `table`, `steps` and `callout` supports a
 * minimal markdown subset: `code`, **bold** and [links](href).
 */

export type DocsLocale = 'en' | 'es';

export interface DocCodeSnippet {
  /** Display label, e.g. `bash`, `tsx`, `json`. Purely informative. */
  language: string;
  /** Optional filename/title shown in the block header. */
  title?: string;
  code: string;
}

export type DocBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; id: string; text: string }
  | { kind: 'h3'; text: string }
  | ({ kind: 'code' } & DocCodeSnippet)
  | { kind: 'callout'; tone: 'note' | 'warning'; title?: string; text: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | {
      kind: 'steps';
      items: { title: string; body?: string; code?: DocCodeSnippet }[];
    }
  | {
      /** API reference entries — name/type/description rows. */
      kind: 'params';
      items: {
        name: string;
        type?: string;
        required?: boolean;
        description: string;
      }[];
    };

export interface DocPageLocaleContent {
  /** Sidebar label + H1. */
  title: string;
  /** Meta description + page intro. */
  description: string;
  blocks: DocBlock[];
}

export type DocGroupId = 'start' | 'guides' | 'reference';

export interface DocPage {
  /** URL segments after `/docs`, e.g. `['embed', 'quickstart']`. */
  slug: string[];
  group: DocGroupId;
  en: DocPageLocaleContent;
  es: DocPageLocaleContent;
}
