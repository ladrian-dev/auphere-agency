'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils/cn';
import { track } from '@/lib/analytics';

interface Copy {
  fields: Record<'name' | 'email' | 'company' | 'website' | 'clients' | 'vertical' | 'country' | 'notes', string>;
  clientOptions: { value: string; label: string }[];
  verticalOptions: { value: string; label: string }[];
  submit: string;
  sending: string;
  success: string;
  error: string;
  requiredMsg: string;
  emailMsg: string;
}

interface Props {
  locale: 'es' | 'en';
  copy: Copy;
}

const inputClasses = cn(
  'w-full h-[48px] px-4 rounded-lg bg-[var(--color-bone)] text-[var(--color-ink)] text-[15px]',
  'border border-[var(--color-ink-subtle)] placeholder:text-[var(--color-ink-dim)]',
  'focus:outline-2 focus:outline-offset-1 focus:outline-[var(--color-bangladesh-green)]',
);

export function PartnerApplicationForm({ locale, copy }: Props) {
  const schema = z.object({
    name: z.string().min(2, copy.requiredMsg),
    email: z.string().email(copy.emailMsg),
    company: z.string().min(1, copy.requiredMsg),
    website: z.string().min(2, copy.requiredMsg),
    clients: z.string().min(1, copy.requiredMsg),
    vertical: z.string().min(1, copy.requiredMsg),
    country: z.string().min(2, copy.requiredMsg),
    notes: z.string().optional(),
    fax: z.string().optional(),
  });
  type FormData = z.infer<typeof schema>;

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormData) {
    setStatus('sending');
    try {
      const res = await fetch('/api/partner-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) track('partner_apply_submit', { clients: values.clients, vertical: values.vertical });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-[var(--color-bangladesh-green)]/30 bg-[var(--color-bangladesh-green)]/5 p-8 text-center">
        <p className="font-display font-semibold text-xl text-[var(--color-bangladesh-green)]">✓</p>
        <p className="mt-3 text-[15px] leading-relaxed">{copy.success}</p>
      </div>
    );
  }

  const err = (key: keyof FormData) =>
    errors[key] && (
      <p role="alert" className="text-[12px] text-[var(--color-status-danger)] mt-1.5">
        {errors[key]?.message as string}
      </p>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Honeypot — hidden from humans, aria-hidden, tab-skipped */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Fax
          <input type="text" tabIndex={-1} autoComplete="off" {...register('fax')} />
        </label>
      </div>

      <div>
        <label className="block type-meta text-[var(--color-ink-muted)] mb-2" htmlFor="pa-name">
          {copy.fields.name}
        </label>
        <input id="pa-name" className={inputClasses} autoComplete="name" {...register('name')} />
        {err('name')}
      </div>

      <div>
        <label className="block type-meta text-[var(--color-ink-muted)] mb-2" htmlFor="pa-email">
          {copy.fields.email}
        </label>
        <input id="pa-email" type="email" className={inputClasses} autoComplete="email" {...register('email')} />
        {err('email')}
      </div>

      <div>
        <label className="block type-meta text-[var(--color-ink-muted)] mb-2" htmlFor="pa-company">
          {copy.fields.company}
        </label>
        <input id="pa-company" className={inputClasses} autoComplete="organization" {...register('company')} />
        {err('company')}
      </div>

      <div>
        <label className="block type-meta text-[var(--color-ink-muted)] mb-2" htmlFor="pa-website">
          {copy.fields.website}
        </label>
        <input id="pa-website" className={inputClasses} inputMode="url" {...register('website')} />
        {err('website')}
      </div>

      <div>
        <label className="block type-meta text-[var(--color-ink-muted)] mb-2" htmlFor="pa-clients">
          {copy.fields.clients}
        </label>
        <select id="pa-clients" className={inputClasses} defaultValue="" {...register('clients')}>
          <option value="" disabled hidden />
          {copy.clientOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {err('clients')}
      </div>

      <div>
        <label className="block type-meta text-[var(--color-ink-muted)] mb-2" htmlFor="pa-vertical">
          {copy.fields.vertical}
        </label>
        <select id="pa-vertical" className={inputClasses} defaultValue="" {...register('vertical')}>
          <option value="" disabled hidden />
          {copy.verticalOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {err('vertical')}
      </div>

      <div>
        <label className="block type-meta text-[var(--color-ink-muted)] mb-2" htmlFor="pa-country">
          {copy.fields.country}
        </label>
        <input id="pa-country" className={inputClasses} autoComplete="country-name" {...register('country')} />
        {err('country')}
      </div>

      <div className="md:col-span-2">
        <label className="block type-meta text-[var(--color-ink-muted)] mb-2" htmlFor="pa-notes">
          {copy.fields.notes}
        </label>
        <textarea id="pa-notes" rows={3} className={cn(inputClasses, 'h-auto py-3')} {...register('notes')} />
      </div>

      <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className={cn(
            'inline-flex items-center justify-center h-[52px] px-[32px] rounded-full font-medium text-[15px] tracking-tight',
            'bg-[var(--color-ink)] text-[var(--color-bone)] hover:bg-[var(--color-bangladesh-green)]',
            'active:scale-[0.98] transition-[background-color,transform] duration-200 ease-out disabled:opacity-60',
            'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-bangladesh-green)]',
          )}
        >
          {status === 'sending' ? copy.sending : copy.submit}
        </button>
        {status === 'error' && (
          <p role="alert" className="text-[14px] text-[var(--color-status-danger)]">
            {copy.error}
          </p>
        )}
      </div>
    </form>
  );
}
