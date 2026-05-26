"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface MissionTimerProps {
  targetDate: Date
}

// NASA-style seven-segment digit display
function SegmentDigit({ value, color = "text-primary" }: { value: string; color?: string }) {
  return (
    <div className={`relative w-6 h-10 bg-black/80 rounded-sm border border-primary/20 flex items-center justify-center font-mono text-2xl font-bold ${color} shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] overflow-hidden`}>
      {/* Scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      {/* Glow effect */}
      <span className="relative drop-shadow-[0_0_8px_currentColor]">{value}</span>
    </div>
  )
}

// Colon separator with blinking effect
function ColonSeparator({ blink }: { blink: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 px-0.5">
      <motion.div 
        animate={{ opacity: blink ? [1, 0.3, 1] : 1 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_currentColor]" 
      />
      <motion.div 
        animate={{ opacity: blink ? [1, 0.3, 1] : 1 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_currentColor]" 
      />
    </div>
  )
}

// Time unit label
function TimeLabel({ label }: { label: string }) {
  return (
    <span className="text-[8px] font-mono uppercase tracking-wider text-primary/60 mt-0.5">
      {label}
    </span>
  )
}

export function MissionTimer({ targetDate }: MissionTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [missionStarted, setMissionStarted] = useState(false)
  const [missionTime, setMissionTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setMissionStarted(false)
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setMissionStarted(true)
        const elapsed = Math.abs(difference)
        const days = Math.floor(elapsed / (1000 * 60 * 60 * 24))
        const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000)
        setMissionTime({ days, hours, minutes, seconds })
      }
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const formatTwo = (value: number) => String(value).padStart(2, "0")

  const time = missionStarted ? missionTime : timeLeft
  const statusColor = missionStarted ? "text-green-400" : "text-primary"

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-black/90 backdrop-blur-md border border-primary/30 shadow-[0_0_20px_rgba(0,230,180,0.15)]"
    >
      {/* Status indicator */}
      <div className="flex items-center gap-2 w-full">
        <motion.div 
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-2 h-2 rounded-full ${missionStarted ? "bg-green-400" : "bg-red-500"} shadow-[0_0_8px_currentColor]`}
        />
        <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${statusColor}`}>
          {missionStarted ? "Mission Elapsed Time" : "T-Minus"}
        </span>
      </div>
      
      {/* Digital display */}
      <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded border border-primary/10">
        {/* Days (if > 0) */}
        {time.days > 0 && (
          <>
            <div className="flex flex-col items-center">
              <div className="flex gap-0.5">
                <SegmentDigit value={formatTwo(time.days)[0]} color={statusColor} />
                <SegmentDigit value={formatTwo(time.days)[1]} color={statusColor} />
              </div>
              <TimeLabel label="days" />
            </div>
            <ColonSeparator blink={!missionStarted} />
          </>
        )}
        
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="flex gap-0.5">
            <SegmentDigit value={formatTwo(time.hours)[0]} color={statusColor} />
            <SegmentDigit value={formatTwo(time.hours)[1]} color={statusColor} />
          </div>
          <TimeLabel label="hrs" />
        </div>
        
        <ColonSeparator blink={!missionStarted} />
        
        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="flex gap-0.5">
            <SegmentDigit value={formatTwo(time.minutes)[0]} color={statusColor} />
            <SegmentDigit value={formatTwo(time.minutes)[1]} color={statusColor} />
          </div>
          <TimeLabel label="min" />
        </div>
        
        <ColonSeparator blink={!missionStarted} />
        
        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="flex gap-0.5">
            <SegmentDigit value={formatTwo(time.seconds)[0]} color={statusColor} />
            <SegmentDigit value={formatTwo(time.seconds)[1]} color={statusColor} />
          </div>
          <TimeLabel label="sec" />
        </div>
      </div>
    </motion.div>
  )
}
