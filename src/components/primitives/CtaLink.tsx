'use client';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { track } from '@/lib/analytics';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** Sección desde la que se pulsa: alimenta el evento Plausible `cta_click`. */
  section: string;
  children: ReactNode;
}

/**
 * Enlace CTA instrumentado. Cada «Agenda ahora» emite `cta_click` con la
 * sección de origen (README §Pendientes: evento por clic y sección).
 */
export function CtaLink({ href, section, children, onClick, ...rest }: Props) {
  return (
    <a
      href={href}
      onClick={(event) => {
        track('cta_click', { section });
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
