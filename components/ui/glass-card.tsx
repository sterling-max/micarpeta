import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'flat';
    noPadding?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, variant = 'default', noPadding = false, ...props }, ref) => {
        const variants = {
            default: 'glass-card',
            elevated: 'glass-card shadow-lg bg-white/80 dark:bg-slate-900/80',
            flat: 'bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm',
        };

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={cn(
                    variants[variant],
                    noPadding ? 'p-0' : 'p-6',
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

GlassCard.displayName = 'GlassCard';
