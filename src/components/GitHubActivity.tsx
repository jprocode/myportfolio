'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface GitHubEvent {
    id: string;
    type: string;
    repo: { name: string };
    created_at: string;
    payload: {
        commits?: { message: string }[];
        action?: string;
        ref_type?: string;
    };
}

interface ActivityItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    repo: string;
    time: string;
}

const GitHubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const CommitIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <line x1="1.05" y1="12" x2="7" y2="12" />
        <line x1="17.01" y1="12" x2="22.96" y2="12" />
    </svg>
);

const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const ForkIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
        <path d="M12 12v3" />
    </svg>
);

const RepoIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);

function getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function parseEvent(event: GitHubEvent): ActivityItem | null {
    const repo = event.repo.name.split('/')[1] || event.repo.name;
    const time = getRelativeTime(event.created_at);

    switch (event.type) {
        case 'PushEvent':
            const commitMsg = event.payload.commits?.[0]?.message || 'Pushed commits';
            const shortMsg = commitMsg.length > 50 ? commitMsg.slice(0, 50) + '...' : commitMsg;
            return {
                id: event.id,
                icon: <CommitIcon />,
                title: shortMsg,
                repo,
                time,
            };
        case 'CreateEvent':
            return {
                id: event.id,
                icon: <RepoIcon />,
                title: `Created ${event.payload.ref_type || 'repository'}`,
                repo,
                time,
            };
        case 'WatchEvent':
            return {
                id: event.id,
                icon: <StarIcon />,
                title: 'Starred repository',
                repo,
                time,
            };
        case 'ForkEvent':
            return {
                id: event.id,
                icon: <ForkIcon />,
                title: 'Forked repository',
                repo,
                time,
            };
        default:
            return null;
    }
}

export function GitHubActivity() {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        async function fetchActivity() {
            try {
                const response = await fetch('https://api.github.com/users/jprocode/events/public?per_page=10');
                if (!response.ok) throw new Error('Failed to fetch');
                const events: GitHubEvent[] = await response.json();

                const parsed = events
                    .map(parseEvent)
                    .filter((item): item is ActivityItem => item !== null)
                    .slice(0, 5);

                setActivities(parsed);
            } catch (err) {
                setError('Unable to load activity');
            } finally {
                setLoading(false);
            }
        }

        fetchActivity();
    }, []);

    if (loading) {
        return (
            <div className="github-activity" ref={ref}>
                <div className="activity-header">
                    <GitHubIcon />
                    <span>Recent Activity</span>
                </div>
                <div className="activity-loading">
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                </div>
            </div>
        );
    }

    if (error || activities.length === 0) {
        return (
            <div className="github-activity" ref={ref}>
                <div className="activity-header">
                    <GitHubIcon />
                    <span>Recent Activity</span>
                </div>
                <a
                    href="https://github.com/jprocode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="activity-link"
                >
                    View GitHub Profile →
                </a>
            </div>
        );
    }

    return (
        <motion.div
            className="github-activity"
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
            <div className="activity-header">
                <GitHubIcon />
                <span>Recent Activity</span>
            </div>
            <ul className="activity-list">
                {activities.map((activity, index) => (
                    <motion.li
                        key={activity.id}
                        className="activity-item"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 }}
                    >
                        <span className="activity-icon">{activity.icon}</span>
                        <div className="activity-content">
                            <span className="activity-title">{activity.title}</span>
                            <span className="activity-meta">
                                <span className="activity-repo">{activity.repo}</span>
                                <span className="activity-time">{activity.time}</span>
                            </span>
                        </div>
                    </motion.li>
                ))}
            </ul>
            <a
                href="https://github.com/jprocode"
                target="_blank"
                rel="noopener noreferrer"
                className="activity-link"
            >
                View all activity →
            </a>
        </motion.div>
    );
}
