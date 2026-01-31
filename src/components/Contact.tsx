'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Email icon SVG component
const EmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
    </svg>
);

// Target icon SVG component
const TargetIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

const socialLinks = [
    {
        name: 'Email',
        icon: <EmailIcon />,
        href: 'mailto:jayvpandya22@gmail.com',
        label: 'jayvpandya22@gmail.com',
    },
    {
        name: 'LinkedIn',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        href: 'https://linkedin.com/in/jayvpandya',
        label: 'linkedin.com/in/jayvpandya',
    },
    {
        name: 'GitHub',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        href: 'https://github.com/jprocode',
        label: 'github.com/jprocode',
    },
];

export function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="contact" className="section contact-section" ref={ref}>
            <div className="container">
                <motion.div
                    className="contact-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="section-header">
                        <span className="section-label">Contact</span>
                        <h2 className="section-title">Let's Work Together</h2>
                        <p className="section-subtitle">
                            I'm always open to discussing new projects and opportunities.
                        </p>
                    </div>

                    {/* Internship Badge */}
                    <motion.div
                        className="internship-badge"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <span className="badge-pulse" />
                        <span className="badge-text">Open to Summer 2026 Internships</span>
                    </motion.div>

                    {/* Social Links */}
                    <div className="social-links">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="social-link"
                                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.1 * index, duration: 0.4 }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            >
                                <span className="social-icon">{link.icon}</span>
                                <div className="social-info">
                                    <span className="social-name">{link.name}</span>
                                    <span className="social-label">{link.label}</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        className="contact-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <motion.a
                            href="mailto:jayvpandya22@gmail.com"
                            className="btn-primary magnetic-button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Send Me an Email →
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    className="footer"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <div className="footer-content">
                        <div className="footer-links">
                            <a href="#home" className="footer-link">Home</a>
                            <a href="#about" className="footer-link">About</a>
                            <a href="#projects" className="footer-link">Projects</a>
                            <a href="#experience" className="footer-link">Experience</a>
                        </div>
                        <p className="footer-copyright">© 2026 Jay Pandya. Built with Next.js and TypeScript.</p>
                    </div>

                    {/* Back to Top Button */}
                    <motion.button
                        className="back-to-top"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        whileHover={{ y: -4, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Back to top"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 15l-6-6-6 6" />
                        </svg>
                    </motion.button>
                </motion.footer>
            </div>
        </section>
    );
}
