"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const agendaItems = [
  {
    time: "28 May",
    timeDetail: "12:00-16:00",
    title: "Optional: IT support",
    isOptional: true,
  },
  {
    time: "09:00",
    title: "Welcome & Teams",
  },
  {
    time: "09:30",
    title: "AI Upskilling",
  },
  {
    time: "11:00",
    title: "Teams boarding their ships (with lunch)",
  },
  {
    time: "11:30",
    title: "Team Hacking",
  },
  {
    time: "15:00",
    title: "Presentations",
  },
  {
    time: "16:00",
    title: "Winners & Happy Hour",
    isHighlight: true,
  },
]

// Mini rocket for timeline animation
function MiniRocket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2C12 2 8 6 8 12C8 16 10 20 12 22C14 20 16 16 16 12C16 6 12 2 12 2Z"
        fill="url(#miniRocketBody)"
        stroke="rgba(0,230,180,0.8)"
        strokeWidth="0.5"
      />
      <path d="M8 14L4 20L8 18V14Z" fill="#00e6b4" />
      <path d="M16 14L20 20L16 18V14Z" fill="#00e6b4" />
      <circle cx="12" cy="9" r="2" fill="#00ffcc" />
      <path d="M11 22L12 26L13 22" fill="#ff6040" opacity="0.9" />
      <defs>
        <linearGradient id="miniRocketBody" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e0e0e0" />
          <stop offset="1" stopColor="#808080" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function AgendaSlide() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Auto-advance rocket through timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % agendaItems.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center px-12">
      <div className="flex gap-20 items-center max-w-6xl">
        {/* Left side - Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            <span className="text-primary">MIA to MARS</span>
            <br />
            <span className="text-foreground/90">Agenda</span>
          </h1>
          <p className="text-primary font-mono mt-3 text-base">29 MAY</p>
        </motion.div>

        {/* Right side - Timeline */}
        <div className="flex-1">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[48px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20" />
            
            {/* Animated glow on timeline */}
            <motion.div
              className="absolute left-[47px] w-1.5 h-12 bg-gradient-to-b from-transparent via-primary to-transparent rounded-full blur-sm"
              animate={{
                top: `${activeIndex * 48 + 8}px`,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            
            {agendaItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className={`flex items-center gap-4 h-12 ${item.isOptional ? "opacity-50" : ""}`}
              >
                {/* Time */}
                <div className="w-[44px] text-right flex-shrink-0">
                  <span className={`font-mono text-xs ${item.isHighlight ? "text-primary font-bold" : "text-primary/80"}`}>
                    {item.time}
                  </span>
                </div>
                
                {/* Dot or Rocket */}
                <div className="w-6 flex-shrink-0 flex justify-center relative">
                  {index === activeIndex ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <MiniRocket className="w-6 h-6 rotate-90 drop-shadow-[0_0_8px_rgba(0,230,180,0.8)]" />
                    </motion.div>
                  ) : (
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index < activeIndex
                        ? "bg-primary shadow-[0_0_8px_rgba(0,230,180,0.6)]"
                        : item.isHighlight 
                          ? "bg-primary/80" 
                          : item.isOptional 
                            ? "bg-muted-foreground/30" 
                            : "bg-primary/40"
                    }`} />
                  )}
                </div>
                
                {/* Content */}
                <motion.div 
                  className="flex-1"
                  animate={{
                    scale: index === activeIndex ? 1.05 : 1,
                    x: index === activeIndex ? 4 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className={`font-medium text-sm transition-colors duration-300 ${
                    index === activeIndex
                      ? "text-primary"
                      : index < activeIndex
                        ? "text-foreground/80"
                        : item.isHighlight 
                          ? "text-primary/70" 
                          : item.isOptional 
                            ? "text-muted-foreground/60 italic" 
                            : "text-foreground/60"
                  }`}>
                    {item.title}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
