'use client';

import { useState, useRef, ReactNode, MouseEvent } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
    glare?: boolean;
}

export function TiltCard({
    children,
    className = '',
    tiltAmount = 10,
    glare = true,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.1s ease-out',
    });
    const [glareStyle, setGlareStyle] = useState({
        background: 'transparent',
        opacity: 0,
    });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (mouseY / (rect.height / 2)) * -tiltAmount;
        const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
            transition: 'transform 0.1s ease-out',
        });

        if (glare) {
            const glareX = ((e.clientX - rect.left) / rect.width) * 100;
            const glareY = ((e.clientY - rect.top) / rect.height) * 100;
            setGlareStyle({
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                opacity: 1,
            });
        }
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            transition: 'transform 0.4s ease-out',
        });
        setGlareStyle({
            background: 'transparent',
            opacity: 0,
        });
    };

    return (
        <div
            ref={cardRef}
            className={`tilt-card ${className}`}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {glare && (
                <div
                    className="tilt-card-glare"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'inherit',
                        pointerEvents: 'none',
                        ...glareStyle,
                        transition: 'opacity 0.3s ease-out',
                    }}
                />
            )}
        </div>
    );
}
