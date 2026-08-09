/**
 * Puerta de CI #5 (action-plan-v3 §11.4): lista negra de copy (§4.4).
 * Indetectabilidad (art. 50), hype, claims de resolución infladas y
 * "enterprise-grade" sin certificación. Falla el build si aparecen.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

const BLACKLIST = [
  // Indetectabilidad — riesgo art. 50 (el cambio de posicionamiento de §4.3)
  { pattern: 'la mayor[ií]a no\\.', reason: 'respuesta de indetectabilidad ("¿se darán cuenta?" → "La mayoría no")' },
  { pattern: "most (of them )?(don'?t|won'?t)\\.", reason: 'indetectability answer' },
  { pattern: 'indistinguible', reason: 'promesa de indetectabilidad' },
  { pattern: 'indistinguishable', reason: 'indetectability promise' },
  { pattern: 'suena humano', reason: '"suena humano" como promesa central' },
  { pattern: 'sounds like a human', reason: '"sounds human" as core promise' },
  { pattern: 'se har[áa] pasar por (un )?humano', reason: 'impersonación humana' },
  // Enterprise-grade sin SOC 2 en la mano
  { pattern: 'enterprise[- ]grade', reason: 'se verifica en la primera llamada y quema el resto' },
  // Resolución inflada (containment ≠ resolución verificada)
  { pattern: '9[0-9]\\s?%\\s?(de\\s)?(resoluci[oó]n|resolution)', reason: 'deflection disfrazada — hablar de resolución solo con la definición de §5.3' },
  // Hype
  { pattern: 'revolucionari', reason: 'vocabulario de hype' },
  { pattern: 'revolutionary', reason: 'hype vocabulary' },
  { pattern: 'potenciado por IA', reason: 'vocabulario de hype' },
  { pattern: 'transforma tu negocio', reason: 'vocabulario de hype' },
  { pattern: 'transform your business', reason: 'hype vocabulary' },
  { pattern: 'el futuro es\\b', reason: 'vocabulario de hype' },
  { pattern: 'the future is\\b', reason: 'hype vocabulary' },
];

function walk(dir, exts) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p, exts));
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

const files = [
  ...walk(join(ROOT, 'messages'), ['.json']),
  ...walk(join(ROOT, 'src/content'), ['.ts', '.tsx', '.json']),
  ...walk(join(ROOT, 'public'), ['.txt']),
].filter((f) => !f.endsWith('claims.ts'));

const violations = [];
for (const { pattern, reason } of BLACKLIST) {
  const re = new RegExp(pattern, 'gi');
  for (const file of files) {
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (re.test(line)) violations.push({ file: relative(ROOT, file), line: i + 1, pattern, reason, excerpt: line.trim().slice(0, 120) });
      re.lastIndex = 0;
    });
  }
}

if (violations.length) {
  console.error(`✖ ${violations.length} violación(es) de la lista negra de copy (§4.4):\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line} — ${v.reason}\n    patrón: /${v.pattern}/i\n    → ${v.excerpt}\n`);
  }
  process.exit(1);
}

console.log(`✓ blacklist: 0 violaciones en ${files.length} archivos (${BLACKLIST.length} patrones)`);
