"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MissionTimerProps {
  targetDate: Date
}

// Flip digit component - compact size
function FlipDigit({ value, color = "text-primary" }: { value: string; color?: string }) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)
  const prevValue = useRef(value)

  useEffect(() => {
    if (prevValue.current !== value) {
      setIsFlipping(true)
      const timeout = setTimeout(() => {
        setDisplayValue(value)
        setIsFlipping(false)
        prevValue.current = value
      }, 150)
      return () => clearTimeout(timeout)
    }
  }, [value])

  return (
    <div className="relative w-5 h-7 perspective-500">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[2px] border border-zinc-700/50 shadow-md">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-black/50 z-10" />
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-zinc-700/20 to-transparent rounded-t-[2px]" />
        </div>
        
        <div className={`absolute inset-0 flex items-center justify-center font-mono text-sm font-bold ${color}`}>
          <span className="drop-shadow-[0_0_4px_currentColor]">{displayValue}</span>
        </div>
        
        <AnimatePresence>
          {isFlipping && (
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -90 }}
              exit={{ rotateX: -90 }}
              transition={{ duration: 0.15, ease: "easeIn" }}
              className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[2px] border border-zinc-700/50 flex items-center justify-center backface-hidden origin-bottom"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className={`font-mono text-sm font-bold ${color} drop-shadow-[0_0_4px_currentColor]`}>
                {prevValue.current}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Compact colon separator
function ColonSeparator() {
  return (
    <div className="flex flex-col justify-center gap-1 h-7 px-0.5">
      <div className="w-1 h-1 rounded-full bg-primary/70" />
      <div className="w-1 h-1 rounded-full bg-primary/70" />
    </div>
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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-black/80 backdrop-blur-sm border border-primary/20"
    >
      {/* Status indicator */}
      <div className="flex items-center gap-1">
        <motion.div 
          animate={{ opacity: missionStarted ? 1 : [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: missionStarted ? 0 : Infinity }}
          className={`w-1.5 h-1.5 rounded-full ${missionStarted ? "bg-green-400" : "bg-red-500"}`}
        />
        <span className={`text-[8px] font-mono uppercase tracking-wider ${statusColor}`}>
          {missionStarted ? "MET" : "T-"}
        </span>
      </div>
      
      {/* Flip clock display */}
      <div className="flex items-center">
        {/* Days (if > 0) */}
        {time.days > 0 && (
          <>
            <div className="flex gap-px">
              <FlipDigit value={formatTwo(time.days)[0]} color={statusColor} />
              <FlipDigit value={formatTwo(time.days)[1]} color={statusColor} />
            </div>
            <ColonSeparator />
          </>
        )}
        
        {/* Hours */}
        <div className="flex gap-px">
          <FlipDigit value={formatTwo(time.hours)[0]} color={statusColor} />
          <FlipDigit value={formatTwo(time.hours)[1]} color={statusColor} />
        </div>
        
        <ColonSeparator />
        
        {/* Minutes */}
        <div className="flex gap-px">
          <FlipDigit value={formatTwo(time.minutes)[0]} color={statusColor} />
          <FlipDigit value={formatTwo(time.minutes)[1]} color={statusColor} />
        </div>
        
        <ColonSeparator />
        
        {/* Seconds */}
        <div className="flex gap-px">
          <FlipDigit value={formatTwo(time.seconds)[0]} color={statusColor} />
          <FlipDigit value={formatTwo(time.seconds)[1]} color={statusColor} />
        </div>
      </div>
    </motion.div>
  )
}
