import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface Props {
  className?: string;
  /** Alto en px. El ancho se deriva de la proporción del SVG (1511.49 × 390.99). */
  height?: number;
  /** `bone` sobre fondo profundo (rediseño); `ink` sobre bone (páginas heredadas). */
  variant?: 'bone' | 'ink' | 'default' | 'dark';
  priority?: boolean;
}

const RATIO = 1511.49 / 390.99;

/**
 * Logotipo completo. Siempre el archivo entero (README §Assets: nunca isotipo
 * + texto separados). Dos tintas, un solo trazado.
 */
export function Logo({ className, height = 30, variant = 'ink', priority = false }: Props) {
  // `default` / `dark` son los nombres de la v3: se mapean a las tintas nuevas.
  const tint = variant === 'bone' || variant === 'dark' ? 'bone' : 'ink';
  const width = Math.round(height * RATIO);
  return (
    <Image
      src={`/brand/auphere-logo-${tint}.svg`}
      alt="Auphere"
      height={height}
      width={width}
      priority={priority}
      unoptimized
      className={cn('block select-none', className)}
      style={{ height: `${height}px`, width: 'auto' }}
    />
  );
}
