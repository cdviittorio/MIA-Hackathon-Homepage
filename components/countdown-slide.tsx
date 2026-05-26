"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface CountdownProps {
  targetDate: Date
}

export function CountdownSlide({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          HACKING ENDS IN
        </h2>
      </motion.div>

      <div className="flex gap-6 md:gap-10">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              key={unit.value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="w-28 h-28 md:w-40 md:h-40 rounded-2xl bg-card border border-border/50 flex items-center justify-center mb-4 backdrop-blur-sm"
            >
              <span className="text-5xl md:text-7xl font-bold text-primary font-mono">
                {String(unit.value).padStart(2, "0")}
              </span>
            </motion.div>
            <span className="text-sm md:text-base text-muted-foreground tracking-widest">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-2xl text-muted-foreground"
      >
        Keep building! 🚀
      </motion.p>
    </div>
  )
}
