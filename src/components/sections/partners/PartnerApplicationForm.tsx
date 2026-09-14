'use client';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';
import { track } from '@/lib/analytics';

const CLIENT_OPTIONS = ['0-2', '3-10', '11-50', '50+'] as const;
const VERTICALS = ['health', 'beauty', 'hospitality', 'retail', 'services', 'software', 'other'] as const;
const COUNTRIES = [
  'ES', 'PT', 'FR', 'IT', 'DE', 'GB', 'IE', 'NL', 'BE', 'CH', 'AD', 'MX', 'CO', 'CL', 'AR', 'PE', 'EC', 'UY', 'PY', 'BO', 'VE',
  'CR', 'PA', 'GT', 'HN', 'SV', 'NI', 'DO', 'PR', 'CU', 'US', 'CA', 'BR', 'OTHER',
] as const;

/**
 * Formulario del programa de partners (README §Partners 5): 8 campos con la
 * etiqueta encima, inputs de 48 px y radio 12, selects con chevron propio y
 * color atenuado hasta elegir; País y Notas a ancho completo; botón de 52 px.
 * Envía a /api/partner-application (honeypot `fax`, rate limit, Zod).
 */
export function PartnerApplicationForm() {
  const t = useTranslations('partners.apply.form');
  const locale = useLocale();

  const schema = z.object({
    name: z.string().min(2, t('required')),
    email: z.string().email(t('emailInvalid')),
    company: z.string().min(1, t('required')),
    website: z.string().min(2, t('required')),
    clients: z.enum(CLIENT_OPTIONS, { message: t('required') }),
    vertical: z.enum(VERTICALS, { message: t('required') }),
    country: z.enum(COUNTRIES, { message: t('required') }),
    notes: z.string().max(2000).optional(),
    fax: z.string().optional(),
  });
  type FormData = z.infer<typeof schema>;

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Los selects van atenuados hasta que se elige algo (README §Partners 5).
  const [selClients, selVertical, selCountry] = useWatch({ control, name: ['clients', 'vertical', 'country'] });
  const sel = { clients: selClients, vertical: selVertical, country: selCountry };

  async function onSubmit(values: FormData) {
    setStatus('sending');
    try {
      const res = await fetch('/api/partner-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          // El API guarda el nombre del país tal y como lo ve el lead.
          country: t(`countries.${values.country}`),
          locale,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) track('partner_apply_submit', { clients: values.clients, vertical: values.vertical });
    } catch {
      setStatus('error');
    }
  }

  const err = (field: keyof FormData) =>
    errors[field] ? (
      <p role="alert" className="text-[13px] text-[#E2857B]">
        {errors[field]?.message as string}
      </p>
    ) : null;

  const labelCls = 'text-[13px] font-medium text-[rgba(241,247,246,.65)]';
  const fieldCls = 'flex min-w-0 flex-col gap-1.5';
  const sent = status === 'success';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        'grid grid-cols-1 gap-3.5 rounded-[24px] border border-[var(--color-line-2)] bg-[rgba(3,34,33,.6)] p-7 text-left backdrop-blur-[12px]',
        'sm:grid-cols-2',
        'max-tab:px-5 max-tab:py-6',
      )}
      aria-busy={status === 'sending'}
    >
      {/* Honeypot: las personas no lo ven; los bots lo rellenan. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="pf-fax">Fax</label>
        <input id="pf-fax" type="text" tabIndex={-1} autoComplete="off" {...register('fax')} />
      </div>

      <div className={fieldCls}>
        <label htmlFor="pf-name" className={labelCls}>{t('name')}</label>
        <input id="pf-name" type="text" className="field" placeholder={t('namePlaceholder')} autoComplete="name" required disabled={sent} {...register('name')} />
        {err('name')}
      </div>
      <div className={fieldCls}>
        <label htmlFor="pf-email" className={labelCls}>{t('email')}</label>
        <input id="pf-email" type="email" className="field" placeholder={t('emailPlaceholder')} autoComplete="email" required disabled={sent} {...register('email')} />
        {err('email')}
      </div>
      <div className={fieldCls}>
        <label htmlFor="pf-company" className={labelCls}>{t('company')}</label>
        <input id="pf-company" type="text" className="field" placeholder={t('companyPlaceholder')} autoComplete="organization" required disabled={sent} {...register('company')} />
        {err('company')}
      </div>
      <div className={fieldCls}>
        <label htmlFor="pf-web" className={labelCls}>{t('website')}</label>
        <input id="pf-web" type="url" className="field" placeholder={t('websitePlaceholder')} inputMode="url" required disabled={sent} {...register('website')} />
        {err('website')}
      </div>
      <div className={fieldCls}>
        <label htmlFor="pf-clients" className={labelCls}>{t('clients')}</label>
        <select id="pf-clients" className={cn('field', !sel.clients && 'is-empty')} defaultValue="" required disabled={sent} {...register('clients')}>
          <option value="" disabled>{t('clientsPlaceholder')}</option>
          {CLIENT_OPTIONS.map((o) => (
            <option key={o} value={o}>{t(`clientsOptions.${o}`)}</option>
          ))}
        </select>
        {err('clients')}
      </div>
      <div className={fieldCls}>
        <label htmlFor="pf-vertical" className={labelCls}>{t('vertical')}</label>
        <select id="pf-vertical" className={cn('field', !sel.vertical && 'is-empty')} defaultValue="" required disabled={sent} {...register('vertical')}>
          <option value="" disabled>{t('verticalPlaceholder')}</option>
          {VERTICALS.map((v) => (
            <option key={v} value={v}>{t(`verticals.${v}`)}</option>
          ))}
        </select>
        {err('vertical')}
      </div>
      <div className={cn(fieldCls, 'sm:col-span-2')}>
        <label htmlFor="pf-country" className={labelCls}>{t('country')}</label>
        <select id="pf-country" className={cn('field', !sel.country && 'is-empty')} defaultValue="" autoComplete="country" required disabled={sent} {...register('country')}>
          <option value="" disabled>{t('countryPlaceholder')}</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{t(`countries.${c}`)}</option>
          ))}
        </select>
        {err('country')}
      </div>
      <div className={cn(fieldCls, 'sm:col-span-2')}>
        <label htmlFor="pf-notes" className={labelCls}>
          {t('notes')} <span className="font-normal text-[var(--color-text-4)]">{t('optional')}</span>
        </label>
        <textarea id="pf-notes" className="field" placeholder={t('notesPlaceholder')} rows={4} disabled={sent} {...register('notes')} />
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || sent}
        className="btn btn-primary h-[52px] w-full text-[16px] sm:col-span-2 disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {status === 'sending' ? t('sending') : sent ? t('sent') : t('submit')}
      </button>
      {sent && (
        <p role="status" className="text-[14px] text-[var(--color-primary)] sm:col-span-2">
          {t('sentMessage')}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-[14px] text-[#E2857B] sm:col-span-2">
          {t('error')}
        </p>
      )}
    </form>
  );
}
