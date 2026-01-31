'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface TrailDot {
    id: number;
    x: number;
    y: number;
}

type CursorMode = 'default' | 'pointer' | 'magnetic' | 'crosshair';

export function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [cursorMode, setCursorMode] = useState<CursorMode>('default');
    const [isClicking, setIsClicking] = useState(false);
    const [trail, setTrail] = useState<TrailDot[]>([]);
    const [trailId, setTrailId] = useState(0);

    const addTrailDot = useCallback((x: number, y: number) => {
        setTrailId(prev => prev + 1);
        setTrail(prev => [...prev.slice(-8), { id: trailId, x, y }]);
    }, [trailId]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Add trail dot every few pixels
            if (Math.random() > 0.7) {
                addTrailDot(e.clientX, e.clientY);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for crosshair elements (Launch buttons)
            const isCrosshair = !!(
                target.classList.contains('crosshair-button') ||
                target.closest('.crosshair-button') ||
                target.classList.contains('btn-primary') ||
                target.closest('.btn-primary')
            );

            // Check for magnetic elements
            const isMagnetic = !!(
                target.classList.contains('magnetic-button') ||
                target.closest('.magnetic-button')
            );

            // Check for interactive elements
            const isInteractive = !!(
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button')
            );

            if (isCrosshair) {
                setCursorMode('crosshair');
            } else if (isMagnetic) {
                setCursorMode('magnetic');
            } else if (isInteractive) {
                setCursorMode('pointer');
            } else {
                setCursorMode('default');
            }
        };

        const handleMouseOut = () => {
            setCursorMode('default');
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [cursorX, cursorY, addTrailDot]);

    // Clean up old trail dots
    useEffect(() => {
        const interval = setInterval(() => {
            setTrail(prev => prev.slice(1));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const getOutlineStyle = () => {
        switch (cursorMode) {
            case 'crosshair':
                return { scale: 1.8, borderRadius: '4px' };
            case 'magnetic':
                return { scale: 1.5, borderRadius: '50%' };
            case 'pointer':
                return { scale: 1.3, borderRadius: '50%' };
            default:
                return { scale: 1, borderRadius: '50%' };
        }
    };

    return (
        <div className="custom-cursor">
            {/* Trail particles */}
            {trail.map((dot) => (
                <motion.div
                    key={dot.id}
                    className="cursor-trail"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        left: dot.x,
                        top: dot.y,
                    }}
                />
            ))}

            {/* Cursor dot - becomes crosshair when in crosshair mode */}
            {cursorMode === 'crosshair' ? (
                <motion.div
                    className="cursor-crosshair"
                    style={{
                        left: cursorXSpring,
                        top: cursorYSpring,
                    }}
                    animate={{
                        scale: isClicking ? 0.8 : 1,
                    }}
                >
                    <span className="crosshair-line horizontal" />
                    <span className="crosshair-line vertical" />
                </motion.div>
            ) : (
                <motion.div
                    className="cursor-dot"
                    style={{
                        left: cursorXSpring,
                        top: cursorYSpring,
                    }}
                    animate={{
                        scale: isClicking ? 0.5 : 1,
                    }}
                />
            )}

            {/* Cursor outline */}
            <motion.div
                className={`cursor-outline ${cursorMode}`}
                style={{
                    left: cursorXSpring,
                    top: cursorYSpring,
                }}
                animate={{
                    ...getOutlineStyle(),
                    borderWidth: cursorMode === 'magnetic' ? '3px' : '2px',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
        </div>
    );
}
