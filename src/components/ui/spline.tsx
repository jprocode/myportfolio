'use client'

import { Suspense, lazy, useEffect } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    // Suppress known Spline library console warnings
    useEffect(() => {
        const originalError = console.error;
        const originalLog = console.log;

        // Suppress Spline's internal "Updating pivot" logs
        console.log = (...args) => {
            if (typeof args[0] === 'string' && args[0].includes('Updating pivot')) {
                return;
            }
            originalLog.apply(console, args);
        };

        // Suppress Spline's internal duplicate key warnings
        console.error = (...args) => {
            if (typeof args[0] === 'string' &&
                (args[0].includes('Encountered two children with the same key') ||
                    args[0].includes('Updating pivot'))) {
                return;
            }
            originalError.apply(console, args);
        };

        return () => {
            console.error = originalError;
            console.log = originalLog;
        };
    }, []);

    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex items-center justify-center">
                    <span className="loader"></span>
                </div>
            }
        >
            <Spline
                scene={scene}
                className={className}
            />
        </Suspense>
    )
}

