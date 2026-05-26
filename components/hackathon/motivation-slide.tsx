"use client"

import { motion } from "framer-motion"
import { Rocket, Target, Brain, Award } from "lucide-react"
import { useEffect, useState } from "react"

const journeySteps = [
  {
    phase: "LAUNCH",
    time: "09:00",
    title: "Begin Your Mission",
    description: "Form teams & define your challenge",
    icon: Rocket,
  },
  {
    phase: "ORBIT",
    time: "09:30",
    title: "Skill Up",
    description: "Learn: Claude, APIs, Python",
    icon: Brain,
  },
  {
    phase: "CRUISE",
    time: "11:30",
    title: "Build & Iterate",
    description: "Prototype with live coaching",
    icon: Target,
  },
  {
    phase: "LAND",
    time: "15:00",
    title: "Present & Win",
    description: "Demo & claim victory",
    icon: Award,
  },
]

export function MotivationSlide() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-[15%]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-2"
        >
          Your Mission
        </motion.p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          From <span className="text-primary">Idea</span> to{" "}
          <span className="text-orange-500">Impact</span> in One Day
        </h2>
      </motion.div>

      {/* Journey Timeline - Horizontal */}
      <div className="relative w-full max-w-3xl">
        {/* Connection line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-yellow-500 to-orange-500 opacity-40 origin-left"
        />
        
        <div className="grid grid-cols-4 gap-2 relative">
          {journeySteps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === activeStep
            const isPast = index < activeStep
            const isLast = index === 3
            
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Phase indicator */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    boxShadow: isActive 
                      ? `0 0 25px ${isLast ? "rgba(255,100,50,0.5)" : "rgba(0,230,180,0.5)"}`
                      : "none"
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mb-3 border-2 transition-colors duration-300 ${
                    isActive 
                      ? isLast 
                        ? "bg-orange-500/20 border-orange-500" 
                        : "bg-primary/20 border-primary"
                      : isPast
                        ? "bg-primary/10 border-primary/50"
                        : "bg-card/30 border-border/50"
                  }`}
                >
                  <Icon className={`w-6 h-6 lg:w-7 lg:h-7 transition-colors duration-300 ${
                    isActive 
                      ? isLast ? "text-orange-500" : "text-primary"
                      : isPast ? "text-primary/70" : "text-muted-foreground"
                  }`} />
                </motion.div>

                {/* Phase label & time */}
                <span className={`font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  isActive 
                    ? isLast ? "text-orange-500" : "text-primary"
                    : "text-muted-foreground/70"
                }`}>
                  {step.phase} &bull; {step.time}
                </span>

                {/* Title */}
                <h3 className={`font-bold text-sm lg:text-base mt-1 transition-colors ${
                  isActive ? "text-foreground" : "text-foreground/60"
                }`}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className={`text-[11px] lg:text-xs mt-0.5 transition-opacity max-w-[140px] ${
                  isActive ? "text-muted-foreground" : "text-muted-foreground/40"
                }`}>
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 flex flex-col items-center gap-4"
      >
        {/* Stats row */}
        <div className="flex gap-6">
          <div className="text-center px-4">
            <p className="text-2xl lg:text-3xl font-bold text-primary">6</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Hours</p>
          </div>
          <div className="w-px bg-border/50" />
          <div className="text-center px-4">
            <p className="text-2xl lg:text-3xl font-bold text-foreground">∞</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Possibilities</p>
          </div>
          <div className="w-px bg-border/50" />
          <div className="text-center px-4">
            <p className="text-2xl lg:text-3xl font-bold text-orange-500">1</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Winner</p>
          </div>
        </div>

        {/* CTA */}
        <p className="text-sm text-muted-foreground mt-2">
          <span className="text-primary font-medium">No experience required.</span>{" "}
          Just curiosity and creativity.
        </p>
      </motion.div>
    </div>
  )
}
