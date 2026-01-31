'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Experience {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    metrics?: string[];
}

const experiences: Experience[] = [
    {
        title: 'AI Researcher & Software Developer Intern',
        company: 'Temple University',
        location: 'Philadelphia, PA',
        period: 'May 2025 – Present',
        description: [
            'Developing an AI-driven educational platform to improve children\'s learning outcomes',
            'Engineered learning system combining speech recognition and semantic scoring for synchronized video-based comprehension questions',
            'Built React UI with real-time feedback system adapting question difficulty based on student performance patterns',
            'Collaborated with research team on NLP pipeline design and conducted user testing sessions',
        ],
        metrics: ['40% latency reduction', '20+ students tested', '95%+ engagement'],
    },
    {
        title: 'Web Developer Intern',
        company: 'Aero Dental',
        location: 'West Chester, PA',
        period: 'January 2026 – Present',
        description: [
            'Redesigned company website front-end using HTML, CSS, and JavaScript',
            'Developing full-stack patient portal application using React, Node.js, and SQL',
            'Collaborated with stakeholders to gather requirements and iterate on UI/UX designs',
        ],
        metrics: ['35% page load improvement', '5+ pages redesigned', '3+ design reviews'],
    },
];

const education = {
    school: 'Temple University',
    degree: 'Bachelor of Science in Computer Science',
    minor: 'Minor in Data Science',
    location: 'Philadelphia, PA',
    graduation: 'May 2027',
};

export function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="experience" className="section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Experience</span>
                    <h2 className="section-title">Where I've Worked</h2>
                </motion.div>

                {/* Timeline */}
                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            className="timeline-item"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <div className="timeline-dot" />
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <h3 className="timeline-title">{exp.title}</h3>
                                    <span className="timeline-period">{exp.period}</span>
                                </div>
                                <div className="timeline-company">
                                    {exp.company} · {exp.location}
                                </div>
                                <ul className="timeline-description">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                                {exp.metrics && (
                                    <div className="timeline-metrics">
                                        {exp.metrics.map((metric) => (
                                            <span key={metric} className="metric-badge">{metric}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Education */}
                <motion.div
                    className="education-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="education-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                    </div>
                    <div className="education-content">
                        <h3 className="education-school">{education.school}</h3>
                        <p className="education-degree">{education.degree}</p>
                        <p className="education-minor">{education.minor}</p>
                        <p className="education-meta">{education.location} · Graduation: {education.graduation}</p>
                    </div>
                </motion.div>

                {/* Resume Download */}
                <motion.div
                    className="resume-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.a
                        href="/resume.pdf"
                        className="btn-primary magnetic-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        download
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12L8 2M8 12L4 8M8 12L12 8M2 14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Download Resume
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
