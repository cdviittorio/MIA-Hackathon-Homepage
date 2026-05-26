"use client"

import { motion } from "framer-motion"
import { CountdownTimer } from "./countdown-timer"

interface HeroSlideProps {
  hackathonStartTime: Date
}

// Sleek rocket SVG component
function SleekRocket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Main rocket body */}
      <path
        d="M32 4C32 4 24 16 24 32C24 44 28 56 32 60C36 56 40 44 40 32C40 16 32 4 32 4Z"
        fill="url(#rocketBody)"
        stroke="rgba(0,230,180,0.6)"
        strokeWidth="0.5"
      />
      {/* Nose cone highlight */}
      <path
        d="M32 4C32 4 28 12 28 20C32 18 36 20 36 20C36 12 32 4 32 4Z"
        fill="url(#noseHighlight)"
      />
      {/* Left fin */}
      <path
        d="M24 40L16 56L24 52V40Z"
        fill="url(#finGradient)"
        stroke="rgba(0,230,180,0.4)"
        strokeWidth="0.5"
      />
      {/* Right fin */}
      <path
        d="M40 40L48 56L40 52V40Z"
        fill="url(#finGradient)"
        stroke="rgba(0,230,180,0.4)"
        strokeWidth="0.5"
      />
      {/* Window */}
      <circle cx="32" cy="24" r="4" fill="url(#windowGradient)" stroke="rgba(0,230,180,0.8)" strokeWidth="0.5" />
      {/* Engine glow */}
      <ellipse cx="32" cy="58" rx="4" ry="6" fill="url(#engineGlow)" />
      {/* Thrust flames */}
      <path
        d="M30 60C30 60 28 68 32 72C36 68 34 60 34 60"
        fill="url(#flameGradient)"
        opacity="0.9"
      />
      <path
        d="M31 60C31 60 30 66 32 68C34 66 33 60 33 60"
        fill="#fff"
        opacity="0.8"
      />
      <defs>
        <linearGradient id="rocketBody" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e0e0e0" />
          <stop offset="0.5" stopColor="#a0a0a0" />
          <stop offset="1" stopColor="#606060" />
        </linearGradient>
        <linearGradient id="noseHighlight" x1="28" y1="4" x2="36" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c0c0c0" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="finGradient" x1="16" y1="40" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00e6b4" />
          <stop offset="1" stopColor="#008060" />
        </linearGradient>
        <radialGradient id="windowGradient" cx="32" cy="24" r="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00ffcc" />
          <stop offset="0.7" stopColor="#006050" />
          <stop offset="1" stopColor="#003030" />
        </radialGradient>
        <radialGradient id="engineGlow" cx="32" cy="58" rx="4" ry="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00e6b4" stopOpacity="0.8" />
          <stop offset="1" stopColor="#00e6b4" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameGradient" x1="32" y1="60" x2="32" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00e6b4" />
          <stop offset="0.5" stopColor="#ff6040" />
          <stop offset="1" stopColor="#ff4020" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// BCG Logo component - official BCG green logo  
function BCGLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 32" className={className} fill="none">
      {/* B */}
      <path 
        d="M0 4h7c4 0 6.5 2 6.5 5.5 0 2.2-1.2 3.8-3.2 4.5 2.4.6 4 2.5 4 5 0 3.8-2.8 6-7 6H0V4zm6.5 8.5c2.2 0 3.5-1.2 3.5-3.2 0-1.9-1.3-3-3.5-3H3.5v6.2h3zm.4 9c2.4 0 3.8-1.3 3.8-3.4 0-2.1-1.5-3.5-3.8-3.5H3.5v6.9h3.4z"
        fill="#3DCD58"
      />
      {/* C */}
      <path 
        d="M28.5 21.5c-1.5 2.8-4.3 5-8.2 5-5.8 0-9.8-4.3-9.8-10.5S14.5 5.5 20.3 5.5c3.6 0 6.4 1.8 7.8 4.3l-3 1.8c-1-1.8-2.8-2.8-4.8-2.8-4 0-6.5 3-6.5 7.2s2.5 7.2 6.5 7.2c2.4 0 4.2-1.4 5.2-3.5l3 1.8z"
        fill="#3DCD58"
      />
      {/* G */}
      <path 
        d="M44.5 21.5c-1.5 2.8-4.3 5-8.2 5-5.8 0-9.8-4.3-9.8-10.5S30.5 5.5 36.3 5.5c3.6 0 6.4 1.8 7.8 4.3l-3 1.8c-1-1.8-2.8-2.8-4.8-2.8-4 0-6.5 3-6.5 7.2s2.5 7.2 6.5 7.2c2 0 3.5-.8 4.5-2v-2.5h-4.5v-3H48v7.3c-1 1.2-2.2 2.2-3.5 3z"
        fill="#3DCD58"
      />
    </svg>
  )
}

// The Lab Miami Logo - using actual logo image
function LabMiamiLogo({ className }: { className?: string }) {
  return (
    <img 
      src="https://www.thelabmiami.com/images/thelab_logo_white.png"
      alt="The Lab Miami"
      className={className}
    />
  )
}

export function HeroSlide({ hackathonStartTime }: HeroSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 h-full">
      {/* Logos at top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="absolute top-8 left-0 right-0 flex justify-center items-center gap-8"
      >
        <BCGLogo className="h-8 text-foreground/80" />
        <div className="w-px h-8 bg-foreground/20" />
        <LabMiamiLogo className="h-8 object-contain" />
      </motion.div>

      <motion.div
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 1.2, bounce: 0.3 }}
        className="mb-6 relative"
      >
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <SleekRocket className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_30px_rgba(0,230,180,0.5)]" />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-primary font-mono text-lg md:text-xl tracking-widest mb-4"
      >
        29 MAY 2026
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight"
      >
        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          MIA to MARS
        </span>
        <br />
        <span className="text-foreground">Hackathon</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10"
      >
        Drive AI innovation. Build something extraordinary.
        <br />
        <span className="text-primary font-semibold">One day. Infinite possibilities.</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <CountdownTimer
          targetDate={hackathonStartTime}
          label="Event starts in"
        />
      </motion.div>
    </div>
  )
}
