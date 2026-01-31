'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface TechNode {
    id: string;
    name: string;
    category: 'language' | 'framework' | 'database' | 'tool';
    level: number; // 1-5 skill level
    x: number;
    y: number;
    connections: string[];
}

const technologies: TechNode[] = [
    // Languages
    { id: 'java', name: 'Java', category: 'language', level: 5, x: 20, y: 30, connections: ['spring', 'maven'] },
    { id: 'python', name: 'Python', category: 'language', level: 4, x: 40, y: 20, connections: ['fastapi', 'pandas'] },
    { id: 'typescript', name: 'TypeScript', category: 'language', level: 5, x: 60, y: 25, connections: ['react', 'nextjs'] },
    { id: 'sql', name: 'SQL', category: 'language', level: 4, x: 80, y: 35, connections: ['postgres', 'supabase'] },

    // Frameworks
    { id: 'spring', name: 'Spring Boot', category: 'framework', level: 5, x: 15, y: 55, connections: ['java', 'postgres', 'redis'] },
    { id: 'react', name: 'React', category: 'framework', level: 5, x: 50, y: 50, connections: ['typescript', 'nextjs'] },
    { id: 'nextjs', name: 'Next.js', category: 'framework', level: 4, x: 70, y: 55, connections: ['react', 'typescript', 'vercel'] },
    { id: 'fastapi', name: 'FastAPI', category: 'framework', level: 4, x: 35, y: 60, connections: ['python'] },

    // Databases
    { id: 'postgres', name: 'PostgreSQL', category: 'database', level: 4, x: 25, y: 80, connections: ['spring', 'sql'] },
    { id: 'redis', name: 'Redis', category: 'database', level: 4, x: 45, y: 85, connections: ['spring'] },
    { id: 'supabase', name: 'Supabase', category: 'database', level: 3, x: 65, y: 80, connections: ['sql', 'nextjs'] },

    // Tools
    { id: 'docker', name: 'Docker', category: 'tool', level: 3, x: 85, y: 60, connections: ['spring', 'fastapi'] },
    { id: 'vercel', name: 'Vercel', category: 'tool', level: 4, x: 85, y: 80, connections: ['nextjs'] },
    { id: 'maven', name: 'Maven', category: 'tool', level: 4, x: 10, y: 45, connections: ['java'] },
    { id: 'pandas', name: 'pandas', category: 'tool', level: 3, x: 30, y: 40, connections: ['python'] },
];

const categoryColors: Record<string, string> = {
    language: '#0066FF',
    framework: '#22c55e',
    database: '#eab308',
    tool: '#8b5cf6',
};

function getSkillLabel(level: number): string {
    if (level >= 5) return 'Expert';
    if (level >= 4) return 'Advanced';
    if (level >= 3) return 'Intermediate';
    return 'Learning';
}

export function TechConstellation() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    const getConnections = () => {
        const connections: { from: TechNode; to: TechNode }[] = [];
        technologies.forEach((tech) => {
            tech.connections.forEach((connId) => {
                const connTech = technologies.find((t) => t.id === connId);
                if (connTech && tech.id < connId) {
                    connections.push({ from: tech, to: connTech });
                }
            });
        });
        return connections;
    };

    const connections = getConnections();

    return (
        <motion.div
            ref={ref}
            className="tech-constellation"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
        >
            <h3 className="constellation-title">Tech Stack</h3>

            <div className="constellation-container">
                <svg className="constellation-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    {/* Connections */}
                    {connections.map(({ from, to }, index) => {
                        const isHighlighted = hoveredTech === from.id || hoveredTech === to.id;
                        return (
                            <motion.line
                                key={`${from.id}-${to.id}`}
                                x1={from.x}
                                y1={from.y}
                                x2={to.x}
                                y2={to.y}
                                className={`constellation-line ${isHighlighted ? 'highlighted' : ''}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={isInView ? { pathLength: 1, opacity: isHighlighted ? 0.8 : 0.2 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.02 }}
                            />
                        );
                    })}
                </svg>

                {/* Nodes */}
                {technologies.map((tech, index) => {
                    const isHovered = hoveredTech === tech.id;
                    const isConnected = hoveredTech && technologies.find(t => t.id === hoveredTech)?.connections.includes(tech.id);

                    return (
                        <motion.div
                            key={tech.id}
                            className={`constellation-node ${isHovered ? 'hovered' : ''} ${isConnected ? 'connected' : ''}`}
                            style={{
                                left: `${tech.x}%`,
                                top: `${tech.y}%`,
                                '--node-color': categoryColors[tech.category],
                            } as React.CSSProperties}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.3, delay: index * 0.03 }}
                            onMouseEnter={() => setHoveredTech(tech.id)}
                            onMouseLeave={() => setHoveredTech(null)}
                        >
                            <span className="node-label">{tech.name}</span>
                            {isHovered && (
                                <motion.div
                                    className="node-tooltip"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <span className="tooltip-level">{getSkillLabel(tech.level)}</span>
                                    <span className="tooltip-category">{tech.category}</span>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="constellation-legend">
                {Object.entries(categoryColors).map(([category, color]) => (
                    <span key={category} className="legend-item">
                        <span className="legend-dot" style={{ background: color }} />
                        {category}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
