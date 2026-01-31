'use client';

import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

export function KonamiCode() {
    const [inputSequence, setInputSequence] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [discoMode, setDiscoMode] = useState(false);

    const triggerEasterEgg = useCallback(() => {
        // Show secret message first
        setShowModal(true);

        // After 2 seconds, start disco mode
        setTimeout(() => {
            setShowModal(false);
            setDiscoMode(true);
            document.body.classList.add('disco-mode');

            // Stop disco mode after 4 seconds
            setTimeout(() => {
                setDiscoMode(false);
                document.body.classList.remove('disco-mode');
            }, 4000);
        }, 2000);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const newSequence = [...inputSequence, e.code].slice(-10);
            setInputSequence(newSequence);

            // Check if sequence matches Konami code
            if (newSequence.length === 10 &&
                newSequence.every((key, i) => key === KONAMI_CODE[i])) {
                triggerEasterEgg();
                setInputSequence([]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputSequence, triggerEasterEgg]);

    if (!showModal && !discoMode) return null;

    return (
        <>
            {/* Secret Message Modal */}
            {showModal && (
                <div className="konami-modal">
                    <div className="konami-modal-content">
                        <span className="konami-emoji">🎮</span>
                        <h2>You found it!</h2>
                        <p>Nice work, fellow developer. Get ready for disco mode...</p>
                        <span className="konami-code-hint">↑↑↓↓←→←→BA</span>
                    </div>
                </div>
            )}

            {/* Disco overlay effect */}
            {discoMode && (
                <div className="disco-overlay" />
            )}
        </>
    );
}
