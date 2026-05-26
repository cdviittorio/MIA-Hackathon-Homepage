"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  targetDate: Date
  label: string
}

export function CountdownTimer({ targetDate, label }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft({ hours, minutes, seconds })
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const TimeBlock = ({ value, unit }: { value: number; unit: string }) => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative"
      >
        <div className="w-24 h-28 md:w-32 md:h-36 bg-card/50 backdrop-blur-md rounded-xl border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.2)]">
          <span className="text-5xl md:text-6xl font-mono font-bold text-primary tabular-nums">
            {String(value).padStart(2, "0")}
          </span>
        </div>
        <div className="absolute inset-0 rounded-xl bg-primary/5 animate-pulse" />
      </motion.div>
      <span className="mt-3 text-sm md:text-base font-medium text-muted-foreground uppercase tracking-widest">
        {unit}
      </span>
    </motion.div>
  )

  return (
    <div className="text-center">
      <p className="text-lg md:text-xl text-muted-foreground mb-6">{label}</p>
      <div className="flex items-center justify-center gap-4 md:gap-6">
        <TimeBlock value={timeLeft.hours} unit="Hours" />
        <span className="text-4xl md:text-5xl text-primary font-bold mb-8">:</span>
        <TimeBlock value={timeLeft.minutes} unit="Minutes" />
        <span className="text-4xl md:text-5xl text-primary font-bold mb-8">:</span>
        <TimeBlock value={timeLeft.seconds} unit="Seconds" />
      </div>
    </div>
  )
}
