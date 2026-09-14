import type { SVGProps } from 'react';
import type { SocialId } from '@/lib/site';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** Tick de las listas (acento, trazo 2). */
export function TickIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="var(--color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M4 10.5l4 4L16 6" />
    </svg>
  );
}

export function GlobeIcon({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      {...rest}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
    </svg>
  );
}

export function BurgerIcon({ open, size = 18, ...rest }: IconProps & { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      {...rest}
    >
      <path d={open ? 'M4 4l12 12M16 4L4 16' : 'M2 5h16M2 10h16M2 15h16'} />
    </svg>
  );
}

export function ArrowIcon({ size = 14, ...rest }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function PlusIcon({ size = 14, ...rest }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      {...rest}
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

/** Marca (isotipo) en el color del contexto. */
export function MarkIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 1080 1080" width={size} height={size} fill="currentColor" {...rest}>
      <path d="M925.28,500.98l-.26-.26c-30.39-29.28-76.54-47.32-137.3-53.71,19.97-25.37,40.53-53.3,58.32-85.72,20.61-39.85,50.63-111.39,19.75-142.72-14.61-14.78-39.55-15.74-72.14-2.73-27.63,11.06-55.31,29.92-72.03,43.93-67.74,56.78-129.95,135.42-166.32,210.31-.7,1.45-1.94,1.41-2.63,1.24-.56-.11-1.86-.6-1.88-2.31l-.23-152.71-.02-13.88c-.02-2.35-1.92-4.25-4.27-4.25h-12.56c-2.35,0-4.25,1.9-4.27,4.25l-.02,13.88-.24,152.71c-.02,1.71-1.32,2.2-1.88,2.31-.68.17-1.92.21-2.63-1.24-36.37-74.89-98.58-153.53-166.32-210.31-16.72-14.01-44.4-32.87-72.03-43.93-32.59-13.01-57.53-12.05-72.14,2.73-30.88,31.33-.86,102.87,19.75,142.72,17.79,32.42,38.35,60.35,58.32,85.72-60.76,6.39-106.91,24.43-137.3,53.71l-.26.26c-13.68,13.85-20.65,30.06-20.65,48.15,0,40.55,36.86,71.11,73.37,96.09,26.07,17.84,56.08,34.03,92.11,45.35-8.87,17.32-15.99,33.15-21.62,47.6-15.96,40.93-24.66,88.16,3.13,105.79,5.55,3.52,12.03,5.11,19.34,5.11,24.99,0,59.61-18.74,102.54-55.46,45.5-38.94,82.43-84.85,108.34-134.62,4.58-8.78,9.13-18.15,13.55-27.87,3.65-8.05,7.24-16.15,10.75-24.27,4.73,10.93,9.57,21.9,14.53,32.8,4.5,9.93,9.15,19.53,13.83,28.5,26.03,49.95,63.04,95.97,108.6,134.96,42.93,36.72,77.55,55.46,102.54,55.46,7.31,0,13.79-1.59,19.34-5.11,27.79-17.63,19.09-64.86,3.13-105.79-5.63-14.45-12.75-30.28-21.62-47.6,36.03-11.32,66.04-27.51,92.11-45.35,36.51-24.98,73.37-55.54,73.37-96.09,0-18.09-6.97-34.3-20.65-48.15Z" />
    </svg>
  );
}

const SOCIAL_PATHS: Record<SocialId, { d: string; stroke?: boolean }> = {
  linkedin: {
    d: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.27 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 6.99V22h-4.56v-6.83c0-1.63-.03-3.73-2.27-3.73-2.27 0-2.62 1.77-2.62 3.6V22H7.49V8z',
  },
  instagram: { d: '', stroke: true },
  x: {
    d: 'M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L.9 2h7.2l5 6.6L18.9 2zm-1.2 18.2h1.9L7.4 3.7H5.3l12.4 16.5z',
  },
  bluesky: {
    d: 'M12 10.8c-1.1-2.1-4-6.1-6.8-8C2.6 1 1.6 1.3 1 1.6.3 1.9 0 3 0 3.6s.4 5.6.6 6.4c.8 2.8 3.6 3.7 6.2 3.4-3.8.6-7.1 1.9-2.7 6.9 4.8 5 6.6-1.1 7.9-4.2 1.3 3.1 2.6 9 7.8 4.2 3.9-4.2 1.1-6.3-2.7-6.9 2.6.3 5.4-.6 6.2-3.4.2-.8.6-5.8.6-6.4s-.3-1.7-1-2C22.4 1.3 21.4 1 18.8 2.8c-2.8 1.9-5.7 5.9-6.8 8z',
  },
  facebook: {
    d: 'M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22h3.4z',
  },
};

/** Icono de red social (17 px, hereda el color). */
export function SocialIcon({ id, size = 17, ...rest }: IconProps & { id: SocialId }) {
  if (id === 'instagram') {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        {...rest}
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...rest}>
      <path d={SOCIAL_PATHS[id].d} />
    </svg>
  );
}
