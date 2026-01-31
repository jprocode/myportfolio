'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';

interface Project {
    title: string;
    description: string;
    tech: string[];
    status: 'live' | 'coming-soon' | 'complete';
    metrics?: string[];
    liveUrl?: string;
    githubUrl?: string;
    badge?: string;
    size: 'large' | 'medium' | 'small';
}

const projects: Project[] = [
    {
        title: 'FitStack',
        description: 'Full-stack fitness platform with live workout tracking, AI-assisted nutrition planning, and real-time dashboards.',
        tech: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'WebSockets'],
        status: 'live',
        metrics: ['85% onboarding time reduction', 'Sub-100ms latency', '35% retention increase'],
        liveUrl: 'https://fitstack-jade.vercel.app',
        githubUrl: 'https://github.com/jprocode',
        size: 'large',
    },
    {
        title: 'DocAssist AI',
        description: 'AI-driven platform for real-time PDF analysis and summarization with RAG pipeline and streaming responses.',
        tech: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'FAISS', 'OpenAI'],
        status: 'coming-soon',
        metrics: ['100% type safety', 'SSE streaming', 'IP rate limiting'],
        githubUrl: 'https://github.com/jprocode',
        size: 'large',
    },
    {
        title: 'OwlHacks MindScape Compass',
        description: 'Hackathon project: Mental health resource navigator. Led 4-person team to 2nd place.',
        tech: ['Team Project'],
        status: 'complete',
        badge: '🏆 2nd Place',
        githubUrl: 'https://github.com/jprocode',
        size: 'medium',
    },
    {
        title: 'More Projects',
        description: 'Check out my GitHub for more projects including academic work and experiments.',
        tech: ['Various'],
        status: 'complete',
        githubUrl: 'https://github.com/jprocode',
        size: 'small',
    },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`project-card project-card--${project.size}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
        >
            <div className="project-card-content">
                {/* Header */}
                <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    {project.badge && <span className="project-badge">{project.badge}</span>}
                    {project.status === 'live' && <span className="status-badge status-live">Live</span>}
                    {project.status === 'coming-soon' && <span className="status-badge status-soon">Coming Soon</span>}
                </div>

                {/* Description */}
                <p className="project-description">{project.description}</p>

                {/* Metrics */}
                {project.metrics && (
                    <ul className="project-metrics">
                        {project.metrics.map((metric) => (
                            <li key={metric}>{metric}</li>
                        ))}
                    </ul>
                )}

                {/* Tech Stack */}
                <div className="project-tech">
                    {project.tech.map((t) => (
                        <span key={t} className="tech-badge">{t}</span>
                    ))}
                </div>

                {/* Actions */}
                <div className="project-actions">
                    {project.liveUrl && (
                        <a href={project.liveUrl} className="btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                            View Live →
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} className="btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" className="section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Projects</span>
                    <h2 className="section-title">What I've Built</h2>
                    <p className="section-subtitle">
                        Production-ready applications with real metrics and impact
                    </p>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
