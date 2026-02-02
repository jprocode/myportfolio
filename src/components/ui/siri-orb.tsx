// siri-orb.tsx - Smooth 3D Enhanced Version
"use client"
import { cn } from "@/lib/utils";

interface SiriOrbProps {
  size?: string
  className?: string
  colors?: {
    bg?: string
    c1?: string
    c2?: string
    c3?: string
  }
  animationDuration?: number
}

export const SiriOrb: React.FC<SiriOrbProps> = ({
  size = "56px",
  className,
  colors,
  animationDuration = 8,
}) => {
  // Brighter brand blue variations for visibility
  const defaultColors = {
    bg: "transparent",
    c1: "oklch(65% 0.28 255)",      // Bright primary blue
    c2: "oklch(75% 0.24 245)",      // Vivid lighter blue
    c3: "oklch(60% 0.26 265)",      // Deep vibrant accent
  }
  const finalColors = { ...defaultColors, ...colors }
  const sizeValue = parseInt(size.replace("px", ""), 10)
  const blurAmount = Math.max(sizeValue * 0.08, 8)

  return (
    <div
      className={cn("siri-orb-3d", className)}
      style={
        {
          width: size,
          height: size,
          "--c1": finalColors.c1,
          "--c2": finalColors.c2,
          "--c3": finalColors.c3,
          "--duration": `${animationDuration}s`,
          "--blur": `${blurAmount}px`,
          "--glow-color": "rgba(0, 102, 255, 0.6)",
        } as React.CSSProperties
      }
    >
      <style jsx>{`
        .siri-orb-3d {
          display: block;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          
          /* 3D depth with layered shadows */
          box-shadow:
            0 0 20px var(--glow-color),
            0 0 40px rgba(0, 102, 255, 0.3),
            0 4px 8px rgba(0, 0, 0, 0.3),
            0 8px 16px rgba(0, 0, 0, 0.2),
            inset 0 -2px 6px rgba(0, 0, 0, 0.3),
            inset 0 2px 6px rgba(255, 255, 255, 0.1);
          
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow:
              0 0 20px var(--glow-color),
              0 0 40px rgba(0, 102, 255, 0.3),
              0 4px 8px rgba(0, 0, 0, 0.3),
              0 8px 16px rgba(0, 0, 0, 0.2),
              inset 0 -2px 6px rgba(0, 0, 0, 0.3),
              inset 0 2px 6px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow:
              0 0 30px var(--glow-color),
              0 0 60px rgba(0, 102, 255, 0.4),
              0 4px 8px rgba(0, 0, 0, 0.3),
              0 8px 16px rgba(0, 0, 0, 0.2),
              inset 0 -2px 6px rgba(0, 0, 0, 0.3),
              inset 0 2px 6px rgba(255, 255, 255, 0.15);
          }
        }

        /* Multiple organic blob layers */
        .siri-orb-3d::before,
        .siri-orb-3d::after {
          content: "";
          position: absolute;
          inset: -20%;
          border-radius: 50%;
          filter: blur(var(--blur)) saturate(1.5) brightness(1.2);
          transform: translateZ(0);
          will-change: transform;
        }
        
        /* Primary flowing layer */
        .siri-orb-3d::before {
          background: 
            radial-gradient(circle at 30% 30%, var(--c2) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, var(--c1) 0%, transparent 45%),
            radial-gradient(circle at 40% 80%, var(--c3) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, var(--c2) 0%, transparent 35%);
          animation: orbit1 var(--duration) ease-in-out infinite;
        }
        
        /* Secondary flowing layer - offset timing */
        .siri-orb-3d::after {
          background: 
            radial-gradient(circle at 60% 30%, var(--c3) 0%, transparent 45%),
            radial-gradient(circle at 25% 70%, var(--c1) 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, var(--c2) 0%, transparent 35%);
          animation: orbit2 calc(var(--duration) * 1.3) ease-in-out infinite;
          opacity: 0.8;
        }
        
        /* Smooth organic orbiting motion - no hard cuts */
        @keyframes orbit1 {
          0%, 100% {
            transform: translate(0%, 0%) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(5%, -5%) rotate(90deg) scale(1.05);
          }
          50% {
            transform: translate(0%, 5%) rotate(180deg) scale(1);
          }
          75% {
            transform: translate(-5%, 0%) rotate(270deg) scale(1.05);
          }
        }
        
        @keyframes orbit2 {
          0%, 100% {
            transform: translate(0%, 0%) rotate(0deg) scale(1.05);
          }
          33% {
            transform: translate(-6%, 4%) rotate(120deg) scale(1);
          }
          66% {
            transform: translate(4%, -3%) rotate(240deg) scale(1.05);
          }
        }
        
        /* 3D highlight layer - using a child div would be better but for simplicity: */
        @media (prefers-reduced-motion: reduce) {
          .siri-orb-3d::before,
          .siri-orb-3d::after {
            animation: none;
          }
          .siri-orb-3d {
            animation: none;
          }
        }
      `}</style>
      {/* 3D highlight overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `
                        radial-gradient(
                            ellipse 80% 50% at 50% 20%,
                            rgba(255, 255, 255, 0.35) 0%,
                            rgba(255, 255, 255, 0.1) 40%,
                            transparent 70%
                        )
                    `,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default SiriOrb;
