'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface Props {
  headline: string;
  intro: string;
  questions: readonly string[];
  verdictApplies: string;
  verdictMaybe: string;
  note: string;
  yesLabel: string;
  noLabel: string;
}

/**
 * §6.9-02 — ¿Te aplica? Cuatro preguntas, resultado inmediato, client-side,
 * sin formulario y sin enviar nada a ningún sitio.
 */
export function ApplicabilityTest({ headline, intro, questions, verdictApplies, verdictMaybe, note, yesLabel, noLabel }: Props) {
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => questions.map(() => null));
  const answered = answers.every((a) => a !== null);
  const sizeOrBasic = answers.slice(0, 3).some(Boolean);
  const usesBot = answers[3] === true;
  const applies = sizeOrBasic && usesBot;

  return (
    <div className="rounded-2xl border border-[var(--color-ink-subtle)] p-6 md:p-8">
      <h3 className="type-h3">{headline}</h3>
      <p className="text-[14px] text-[var(--color-ink-muted)] mt-2">{intro}</p>

      <ol className="mt-6 flex flex-col gap-5">
        {questions.map((question, i) => (
          <li key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <span className="text-[15px] leading-snug max-w-xl">{question}</span>
            <span className="flex gap-2 shrink-0" role="group" aria-label={question}>
              {[true, false].map((value) => (
                <button
                  key={String(value)}
                  type="button"
                  aria-pressed={answers[i] === value}
                  onClick={() =>
                    setAnswers((prev) => prev.map((a, j) => (j === i ? value : a)))
                  }
                  className={cn(
                    'h-9 px-4 rounded-full border text-[14px] font-medium transition-colors',
                    answers[i] === value
                      ? 'bg-[var(--color-bangladesh-green)] text-[var(--color-bone)] border-transparent'
                      : 'border-[var(--color-ink-subtle)] text-[var(--color-ink-muted)] hover:border-[var(--color-ink-dim)]',
                  )}
                >
                  {value ? yesLabel : noLabel}
                </button>
              ))}
            </span>
          </li>
        ))}
      </ol>

      <div aria-live="polite">
        {answered && (
          <p
            className={cn(
              'mt-7 rounded-xl p-5 text-[15px] leading-relaxed',
              applies
                ? 'bg-[var(--color-bangladesh-green)]/8 border border-[var(--color-bangladesh-green)]/25 text-[var(--color-ink)]'
                : 'bg-[var(--color-ink-faint)] text-[var(--color-ink-muted)]',
            )}
          >
            {applies ? verdictApplies : verdictMaybe}
          </p>
        )}
      </div>

      <p className="mt-5 text-[12px] leading-relaxed text-[var(--color-ink-muted)]">{note}</p>
    </div>
  );
}
