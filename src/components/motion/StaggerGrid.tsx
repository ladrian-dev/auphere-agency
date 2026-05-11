'use client';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}

interface ItemProps {
  children: ReactNode;
  className?: string;
}

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] as const },
  },
};

/**
 * Wrapper that staggers reveal of its <StaggerItem> children when scrolled into view.
 */
export function StaggerGrid({
  children,
  className,
  staggerChildren = 0.12,
  delayChildren = 0.1,
}: ContainerProps) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants(staggerChildren, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: ItemProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
