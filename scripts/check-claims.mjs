/**
 * Puerta de CI #4 (action-plan-v3 §11.4): ningún claim en estado `blocked` o
 * `dated` puede aparecer afirmado en las superficies públicas.
 *
 * Escanea messages/ y src/content/ contra los `forbiddenPatterns` de cada
 * claim no-live de src/content/claims.ts. Falla el build si encuentra alguno.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { CLAIMS } from '../src/content/claims.ts';

const ROOT = new URL('..', import.meta.url).pathname;

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

// Surfaces under the law. claims.ts itself is exempt (it names what it bans).
const files = [
  ...walk(join(ROOT, 'messages'), ['.json']),
  ...walk(join(ROOT, 'src/content'), ['.ts', '.tsx', '.json']),
  ...walk(join(ROOT, 'public'), ['.txt']),
].filter((f) => !f.endsWith('claims.ts'));

// Basic structural validation
const ids = new Set();
for (const c of CLAIMS) {
  if (!c.id || !c.promise || !['live', 'dated', 'blocked'].includes(c.status)) {
    console.error(`✖ claims.ts: fila inválida ${JSON.stringify(c.id)}`);
    process.exit(1);
  }
  if (ids.has(c.id)) {
    console.error(`✖ claims.ts: id duplicado "${c.id}"`);
    process.exit(1);
  }
  ids.add(c.id);
  if (c.status === 'dated' && !c.publishAs) {
    console.error(`✖ claims.ts: "${c.id}" es dated pero no define publishAs (la única forma permitida de publicarlo)`);
    process.exit(1);
  }
}

const violations = [];
for (const claim of CLAIMS) {
  if (claim.status === 'live' || !claim.forbiddenPatterns) continue;
  // `dated` claims may be discussed in their allowedFiles (honesty-table
  // pattern: always accompanied by their date). `blocked` has no waiver.
  const allowed = claim.status === 'dated' ? (claim.allowedFiles ?? []) : [];
  for (const pattern of claim.forbiddenPatterns) {
    const re = new RegExp(pattern, 'gi');
    for (const file of files.filter((f) => !allowed.some((a) => f.endsWith(a)))) {
      const text = readFileSync(file, 'utf8');
      const lines = text.split('\n');
      lines.forEach((line, i) => {
        if (re.test(line)) {
          violations.push({ claim: claim.id, status: claim.status, file: relative(ROOT, file), line: i + 1, pattern, excerpt: line.trim().slice(0, 120) });
        }
        re.lastIndex = 0;
      });
    }
  }
}

if (violations.length) {
  console.error(`✖ ${violations.length} claim(s) en estado no-live afirmados en superficies públicas:\n`);
  for (const v of violations) {
    console.error(`  [${v.claim} · ${v.status}] ${v.file}:${v.line}\n    patrón: /${v.pattern}/i\n    → ${v.excerpt}\n`);
  }
  console.error('La fila del claim en src/content/claims.ts dice qué lo desbloquea.');
  process.exit(1);
}

console.log(`✓ claims: ${CLAIMS.length} filas válidas, 0 violaciones en ${files.length} archivos`);
