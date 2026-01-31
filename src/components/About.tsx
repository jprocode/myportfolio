'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

const stats = [
    { value: '40%', label: 'Latency Reduction', description: 'Question delivery optimization' },
    { value: '85%', label: 'Onboarding Time Cut', description: 'AI-powered personalization' },
    { value: '35%', label: 'Retention Increase', description: 'Real-time dashboards' },
    { value: '100%', label: 'Type Safety', description: 'TypeScript + Pydantic' },
];

const skills = [
    'Java', 'Python', 'TypeScript', 'React', 'Spring Boot',
    'Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

export function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="section" ref={ref}>
            <div className="container">
                <motion.div
                    className="about-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Section Header */}
                    <motion.div className="section-header" variants={itemVariants}>
                        <span className="section-label">About Me</span>
                        <h2 className="section-title">Building the Future with Code</h2>
                    </motion.div>

                    {/* Bio */}
                    <motion.div className="about-bio" variants={itemVariants}>
                        <p>
                            I&apos;m a <strong>Computer Science student</strong> at Temple University with a minor in Data Science,
                            graduating in May 2027. I&apos;m passionate about building full-stack applications that solve real problems
                            and exploring the intersection of <strong>AI and software engineering</strong>.
                        </p>
                        <p>
                            Currently, I&apos;m working as an AI Researcher at Temple, developing educational platforms that
                            improve children&apos;s learning outcomes, and as a Web Developer at Aero Dental, building patient
                            portal applications.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div className="stats-grid" variants={itemVariants}>
                        {stats.map((stat) => (
                            <motion.div
                                key={stat.label}
                                className="stat-card"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                                <span className="stat-description">{stat.description}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Skills */}
                    <motion.div className="skills-section" variants={itemVariants}>
                        <h3 className="skills-title">Technologies I Work With</h3>
                        <div className="skills-grid">
                            {skills.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    className="skill-tag"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Activity Feed Placeholder */}
                    <motion.div className="activity-placeholder" variants={itemVariants}>
                        <span className="placeholder-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13 17l5-5-5-5" />
                                <path d="M6 12h12" />
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        </span>
                        <span className="placeholder-text">Live Activity Feed (Coming in Phase 3)</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
