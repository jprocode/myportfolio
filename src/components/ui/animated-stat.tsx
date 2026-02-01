// animated-stat.tsx
'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SlidingNumber } from '@/components/ui/sliding-number';

interface AnimatedStatProps {
    targetValue: number;
    suffix?: string;
    className?: string;
}

export function AnimatedStat({ targetValue, suffix = '%', className }: AnimatedStatProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        // Animate from 0 to target value
        const duration = 1500; // 1.5 seconds
        const steps = 60;
        const increment = targetValue / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                setValue(targetValue);
                clearInterval(timer);
            } else {
                setValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, targetValue]);

    return (
        <span
            ref={ref}
            className={className}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0'
            }}
        >
            <SlidingNumber value={value} />
            <span>{suffix}</span>
        </span>
    );
}

