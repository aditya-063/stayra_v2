"use client";

import { motion } from "framer-motion";

export function FlowingWaveBackground() {
    return (
        <>
            {/* Pale Golden Wave Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[0, 1, 2, 3, 4, 5].map((waveIndex) => (
                    <motion.div
                        key={waveIndex}
                        className="absolute inset-x-0"
                        style={{
                            top: `${10 + waveIndex * 12}%`,
                            height: '50%',
                            opacity: 0.4 - waveIndex * 0.05,
                            zIndex: 1,
                        }}
                    >
                        <svg
                            className="absolute w-full h-full"
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                            style={{ filter: 'blur(2px)' }}
                        >
                            <motion.path
                                d={`M0,${160 + waveIndex * 15} C240,${120 + waveIndex * 10} 360,${200 + waveIndex * 10} 720,${160 + waveIndex * 15} C1080,${120 + waveIndex * 20} 1200,${200 + waveIndex * 10} 1440,${160 + waveIndex * 15} L1440,320 L0,320 Z`}
                                fill={`url(#paleGradient${waveIndex})`}
                                animate={{
                                    d: [
                                        `M0,${160 + waveIndex * 15} C240,${120 + waveIndex * 10} 360,${200 + waveIndex * 10} 720,${160 + waveIndex * 15} C1080,${120 + waveIndex * 20} 1200,${200 + waveIndex * 10} 1440,${160 + waveIndex * 15} L1440,320 L0,320 Z`,
                                        `M0,${160 + waveIndex * 15} C240,${200 + waveIndex * 10} 360,${120 + waveIndex * 10} 720,${160 + waveIndex * 15} C1080,${200 + waveIndex * 10} 1200,${120 + waveIndex * 20} 1440,${160 + waveIndex * 15} L1440,320 L0,320 Z`,
                                        `M0,${160 + waveIndex * 15} C240,${120 + waveIndex * 10} 360,${200 + waveIndex * 10} 720,${160 + waveIndex * 15} C1080,${120 + waveIndex * 20} 1200,${200 + waveIndex * 10} 1440,${160 + waveIndex * 15} L1440,320 L0,320 Z`,
                                    ]
                                }}
                                transition={{
                                    duration: 10 + waveIndex * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <defs>
                                <linearGradient id={`paleGradient${waveIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.3" />
                                    <stop offset="25%" stopColor="#fde68a" stopOpacity="0.4" />
                                    <stop offset="50%" stopColor="#fcd34d" stopOpacity="0.5" />
                                    <stop offset="75%" stopColor="#fde68a" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>
                ))}

                {/* Golden Particle Sprinkles - Optimized for Performance */}
                {Array.from({ length: 100 }).map((_, i) => {
                    const colorIndex = i % 4;
                    const color = colorIndex === 0 ? '#fbbf24' : colorIndex === 1 ? '#f59e0b' : colorIndex === 2 ? '#fcd34d' : '#fb923c';
                    const shadowColor = colorIndex === 0 ? 'rgba(251, 191, 36, 0.6)' :
                        colorIndex === 1 ? 'rgba(245, 158, 11, 0.6)' :
                            colorIndex === 2 ? 'rgba(252, 211, 77, 0.6)' :
                                'rgba(251, 146, 60, 0.6)';

                    return (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute rounded-full will-change-transform"
                            style={{
                                width: `${2 + Math.random() * 4}px`,
                                height: `${2 + Math.random() * 4}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${15 + Math.random() * 70}%`,
                                background: color,
                                boxShadow: `0 0 ${12 + Math.random() * 8}px ${shadowColor}`,
                                zIndex: 2,
                            }}
                            animate={{
                                x: [0, -25 + Math.random() * 50],
                                y: [0, -35 + Math.random() * 70],
                                opacity: [0, 0.8, 0.6, 0],
                                scale: [0.5, 2 + Math.random() * 1, 1, 0.5],
                            }}
                            transition={{
                                duration: 3.5 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: 'linear',
                            }}
                        />
                    );
                })}
            </div>
        </>
    );
}
