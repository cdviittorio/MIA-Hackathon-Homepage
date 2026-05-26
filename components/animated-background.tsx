"use client"

import { motion } from "framer-motion"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 animate-grid-move"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(0.75 0.18 195 / 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(0.75 0.18 195 / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'top',
            height: '200%',
            top: '-50%'
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/30 blur-3xl animate-pulse-glow"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ left: '10%', top: '20%' }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-accent/20 blur-3xl animate-pulse-glow"
        animate={{
          x: [0, -80, 50, 0],
          y: [0, 80, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        style={{ right: '15%', bottom: '30%' }}
      />

      {/* Particle lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          style={{
            width: `${30 + Math.random() * 40}%`,
            left: `${Math.random() * 60}%`,
            top: `${15 + i * 18}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            x: [-100, 100],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  )
}
