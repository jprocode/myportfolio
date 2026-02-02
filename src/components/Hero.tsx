'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SplineScene } from '@/components/ui/spline';
import { Spotlight } from '@/components/ui/spotlight';
import { HyperText } from '@/components/ui/hyper-text';

const roles = [
    'Full-Stack Developer',
    'AI/ML Developer',
    'Problem Solver',
];

export function Hero() {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        const typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && displayText === currentRole) {
            setTimeout(() => setIsDeleting(true), 2000);
            return;
        }

        if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        const timeout = setTimeout(() => {
            setDisplayText((prev) =>
                isDeleting
                    ? prev.slice(0, -1)
                    : currentRole.slice(0, prev.length + 1)
            );
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRoleIndex]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <section id="home" className="hero">
            {/* Spotlight effect */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            {/* Spline 3D Background */}
            <div className="spline-container">
                <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                />
            </div>

            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.p className="hero-greeting" variants={itemVariants}>
                    Hello, I&apos;m
                </motion.p>

                <motion.h1 className="hero-name" variants={itemVariants}>
                    <HyperText text="Jay Pandya" duration={1000} />
                </motion.h1>

                <motion.p className="hero-title" variants={itemVariants}>
                    {displayText}
                    <span className="typing-cursor" />
                </motion.p>

                <motion.p className="hero-description" variants={itemVariants}>
                    Temple University CS student crafting elegant solutions with modern technologies.
                    Building full-stack applications and exploring the frontiers of AI.
                </motion.p>

                <motion.div className="hero-cta" variants={itemVariants}>
                    <motion.a
                        href="#projects"
                        className="btn-primary magnetic-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        View My Work
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.a>
                    <motion.a
                        href="#contact"
                        className="btn-secondary magnetic-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Get In Touch
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
            >
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span>Scroll</span>
            </motion.div>
        </section>
    );
}
