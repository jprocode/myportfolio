'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

export function Navigation() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Scroll Progress Indicator */}
            <motion.div
                className="scroll-progress"
                style={{ scaleX }}
            />

            {/* Navigation */}
            <motion.nav
                className={`navigation ${scrolled ? 'scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="nav-container">
                    <motion.a
                        href="#home"
                        className="nav-logo"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('#home');
                        }}
                    >
                        JP
                    </motion.a>

                    <div className="nav-links">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="nav-link"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </div>

                    <div className="nav-actions">
                        <ThemeToggle />
                        <motion.a
                            href="#contact"
                            className="nav-cta magnetic-button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('#contact');
                            }}
                        >
                            Let&apos;s Talk
                        </motion.a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </motion.nav>
        </>
    );
}
