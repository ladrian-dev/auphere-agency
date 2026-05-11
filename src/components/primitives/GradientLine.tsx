import { cn } from '@/lib/utils/cn';

interface Props {
  position?: 'top' | 'bottom';
  className?: string;
}

/**
 * Decorative monochrome gradient line — used as fixed top accent and footer bottom.
 * Adapted from Salix's gradient signature, refactored into Auphere's green palette.
 * Subtle, doesn't compete with content.
 */
export function GradientLine({ position = 'top', className }: Props) {
  const positionClass = position === 'top' ? 'top-0' : 'bottom-0';
  return (
    <div
      aria-hidden
      className={cn(
        'fixed inset-x-0 h-[1.5px] z-[60] pointer-events-none',
        positionClass,
        className,
      )}
      style={{
        background:
          'linear-gradient(90deg, var(--color-mint) 0%, var(--color-mountain-meadow) 35%, var(--color-caribbean-green) 70%, var(--color-pistachio) 100%)',
      }}
    />
  );
}
