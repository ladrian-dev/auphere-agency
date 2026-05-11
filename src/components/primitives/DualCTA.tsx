import { Button } from './Button';
import { cn } from '@/lib/utils/cn';

interface CTAItem {
  label: string;
  href: string;
  /** Open in new tab? */
  external?: boolean;
}

interface Props {
  primary: CTAItem;
  secondary?: CTAItem;
  className?: string;
  size?: 'md' | 'lg';
  /** Optional helper text shown beneath the CTAs (e.g. risk reversal microcopy). */
  microcopy?: string;
}

export function DualCTA({ primary, secondary, className, size = 'lg', microcopy }: Props) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <Button
          as="a"
          href={primary.href}
          variant="primary"
          size={size}
          {...(primary.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {primary.label}
        </Button>
        {secondary && (
          <Button
            as="a"
            href={secondary.href}
            variant="outline"
            size={size}
            {...(secondary.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {secondary.label}
          </Button>
        )}
      </div>
      {microcopy && (
        <p className="text-sm text-[var(--color-ink-muted)] max-w-md">{microcopy}</p>
      )}
    </div>
  );
}
