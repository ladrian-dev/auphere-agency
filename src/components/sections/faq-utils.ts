/**
 * Tipo compartido entre el acordeón heredado (Faq.tsx) y el JSON-LD de FAQ.
 * Server-safe: sin `'use client'`.
 */
export interface FaqItemData {
  q: string;
  a: string;
}
