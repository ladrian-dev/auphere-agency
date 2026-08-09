/**
 * Puerta de CI #7 (action-plan-v3 §11.4): paridad i18n.
 * Toda clave ES existe en EN y viceversa. Soporta tanto messages/{locale}.json
 * como la partición por namespace messages/{locale}/*.json.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const MESSAGES = join(ROOT, 'messages');

function loadLocale(locale) {
  const single = join(MESSAGES, `${locale}.json`);
  const dir = join(MESSAGES, locale);
  if (existsSync(dir) && statSync(dir).isDirectory()) {
    const merged = {};
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
      Object.assign(merged, JSON.parse(readFileSync(join(dir, f), 'utf8')));
    }
    return merged;
  }
  return JSON.parse(readFileSync(single, 'utf8'));
}

function keyPaths(obj, prefix = '') {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) out.push(...keyPaths(v, path));
    else out.push(path);
  }
  return out;
}

const es = new Set(keyPaths(loadLocale('es')));
const en = new Set(keyPaths(loadLocale('en')));

const missingInEn = [...es].filter((k) => !en.has(k));
const missingInEs = [...en].filter((k) => !es.has(k));

if (missingInEn.length || missingInEs.length) {
  if (missingInEn.length) {
    console.error(`✖ ${missingInEn.length} clave(s) ES sin EN:`);
    missingInEn.slice(0, 40).forEach((k) => console.error(`    ${k}`));
  }
  if (missingInEs.length) {
    console.error(`✖ ${missingInEs.length} clave(s) EN sin ES:`);
    missingInEs.slice(0, 40).forEach((k) => console.error(`    ${k}`));
  }
  process.exit(1);
}

console.log(`✓ i18n: paridad completa (${es.size} claves por idioma)`);
