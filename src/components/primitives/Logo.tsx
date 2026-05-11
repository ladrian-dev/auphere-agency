import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface Props {
  className?: string;
  /** Wordmark height in px. Mark scales proportionally. */
  height?: number;
  variant?: 'default' | 'dark';
  priority?: boolean;
}

/**
 * Logo wrapper. Currently uses PNG (the SVG vector source isn't ready yet).
 * When the SVG version lands in /public/brand/auphere-logo.svg, swap.
 */
export function Logo({ className, height = 32, variant = 'default', priority = false }: Props) {
  return (
    <Image
      src="/brand/auphere-logo.png"
      alt="Auphere"
      height={height}
      // Calculate width preserving aspect ratio (~5:1)
      width={Math.round(height * 5)}
      priority={priority}
      className={cn(
        'w-auto select-none',
        variant === 'dark' ? 'invert brightness-0' : '',
        className,
      )}
      style={{ height: `${height}px` }}
    />
  );
}
