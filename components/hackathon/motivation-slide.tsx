"use client"

import { motion } from "framer-motion"
import { Rocket, Target, Brain, Award, PartyPopper } from "lucide-react"
import { useEffect, useState } from "react"

const journeySteps = [
  {
    phase: "LAUNCH",
    time: "09:00",
    title: "Begin Mission",
    icon: Rocket,
  },
  {
    phase: "ORBIT",
    time: "09:30",
    title: "Skill Up",
    icon: Brain,
  },
  {
    phase: "CRUISE",
    time: "11:30",
    title: "Build",
    icon: Target,
  },
  {
    phase: "LAND",
    time: "15:00",
    title: "Present",
    icon: Award,
  },
  {
    phase: "CELEBRATE",
    time: "16:00",
    title: "Party!",
    icon: PartyPopper,
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
    <div className="w-full h-full flex flex-col justify-center items-center relative z-10 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
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

      {/* Journey Timeline - Simple horizontal row */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-start justify-between px-4">
          {journeySteps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === activeStep
            const isPast = index < activeStep
            const isLast = index === 4
            
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center text-center flex-1"
              >
                {/* Phase indicator */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    boxShadow: isActive 
                      ? `0 0 25px ${isLast ? "rgba(255,100,50,0.6)" : "rgba(0,230,180,0.6)"}`
                      : "none"
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 transition-colors duration-300 ${
                    isActive 
                      ? isLast 
                        ? "bg-orange-500/30 border-orange-500" 
                        : "bg-primary/30 border-primary"
                      : isPast
                        ? "bg-primary/10 border-primary/50"
                        : "bg-card/50 border-border/50"
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-colors duration-300 ${
                    isActive 
                      ? isLast ? "text-orange-500" : "text-primary"
                      : isPast ? "text-primary/70" : "text-muted-foreground"
                  }`} />
                </motion.div>

                {/* Phase label */}
                <span className={`font-mono text-[9px] uppercase tracking-wider mb-0.5 transition-colors ${
                  isActive 
                    ? isLast ? "text-orange-500" : "text-primary"
                    : "text-muted-foreground/70"
                }`}>
                  {step.phase}
                </span>

                {/* Title */}
                <h3 className={`font-bold text-xs transition-colors ${
                  isActive ? "text-foreground" : "text-foreground/60"
                }`}>
                  {step.title}
                </h3>
              </motion.div>
            )
          })}
        </div>
        
        {/* Connection line beneath icons */}
        <div className="relative h-1 mx-12 mt-[-52px] mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-500 to-orange-500 opacity-30 rounded-full" />
          <motion.div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-orange-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeStep / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}
