"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Rocket, Clock } from "lucide-react"

interface MissionTimerProps {
  targetDate: Date
}

export function MissionTimer({ targetDate }: MissionTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [missionStarted, setMissionStarted] = useState(false)
  const [missionTime, setMissionTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        // Countdown mode
        setMissionStarted(false)
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft({ hours, minutes, seconds })
      } else {
        // Mission time mode (elapsed since start)
        setMissionStarted(true)
        const elapsed = Math.abs(difference)
        const hours = Math.floor(elapsed / (1000 * 60 * 60))
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000)
        setMissionTime({ hours, minutes, seconds })
      }
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const formatTime = (value: number) => String(value).padStart(2, "0")

  const time = missionStarted ? missionTime : timeLeft

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card/60 backdrop-blur-md border border-primary/30"
    >
      {missionStarted ? (
        <Clock className="w-4 h-4 text-primary" />
      ) : (
        <Rocket className="w-4 h-4 text-primary" />
      )}
      
      <div className="flex flex-col">
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {missionStarted ? "Mission Time" : "T-Minus"}
        </span>
        <div className="flex items-center gap-1 font-mono text-lg font-bold tabular-nums">
          <span className={missionStarted ? "text-primary" : "text-foreground"}>
            {formatTime(time.hours)}
          </span>
          <span className="text-primary/60">:</span>
          <span className={missionStarted ? "text-primary" : "text-foreground"}>
            {formatTime(time.minutes)}
          </span>
          <span className="text-primary/60">:</span>
          <span className={missionStarted ? "text-primary" : "text-foreground"}>
            {formatTime(time.seconds)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
