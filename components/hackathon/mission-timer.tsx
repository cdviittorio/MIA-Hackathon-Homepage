"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MissionTimerProps {
  targetDate: Date
}

// Flip digit component - like an airport departure board
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
    <div className="relative w-7 h-10 perspective-500">
      {/* Card container */}
      <div className="relative w-full h-full">
        {/* Background card */}
        <div className={`absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-sm border border-zinc-700 shadow-lg`}>
          {/* Center divider line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-black/60 z-10" />
          {/* Top half gradient */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-zinc-700/30 to-transparent rounded-t-sm" />
        </div>
        
        {/* Static digit (back) */}
        <div className={`absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold ${color}`}>
          <span className="drop-shadow-[0_0_8px_currentColor]">{displayValue}</span>
        </div>
        
        {/* Flipping animation */}
        <AnimatePresence>
          {isFlipping && (
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -90 }}
              exit={{ rotateX: -90 }}
              transition={{ duration: 0.15, ease: "easeIn" }}
              className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-sm border border-zinc-700 flex items-center justify-center backface-hidden origin-bottom"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className={`font-mono text-2xl font-bold ${color} drop-shadow-[0_0_8px_currentColor]`}>
                {prevValue.current}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Colon separator - vertically centered with digits
function ColonSeparator() {
  return (
    <div className="flex flex-col justify-center gap-2 h-10 px-1">
      <div className="w-1.5 h-1.5 rounded-full bg-primary/80 shadow-[0_0_6px_currentColor]" />
      <div className="w-1.5 h-1.5 rounded-full bg-primary/80 shadow-[0_0_6px_currentColor]" />
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-black/90 backdrop-blur-md border border-primary/30 shadow-[0_0_20px_rgba(0,230,180,0.15)]"
    >
      {/* Status indicator */}
      <div className="flex flex-col items-start gap-0.5">
        <div className="flex items-center gap-1.5">
          <motion.div 
            animate={{ opacity: missionStarted ? 1 : [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: missionStarted ? 0 : Infinity }}
            className={`w-2 h-2 rounded-full ${missionStarted ? "bg-green-400" : "bg-red-500"} shadow-[0_0_8px_currentColor]`}
          />
          <span className={`text-[9px] font-mono uppercase tracking-widest ${statusColor}`}>
            {missionStarted ? "MET" : "T-"}
          </span>
        </div>
      </div>
      
      {/* Flip clock display */}
      <div className="flex items-center">
        {/* Days (if > 0) */}
        {time.days > 0 && (
          <>
            <div className="flex flex-col items-center">
              <div className="flex gap-0.5">
                <FlipDigit value={formatTwo(time.days)[0]} color={statusColor} />
                <FlipDigit value={formatTwo(time.days)[1]} color={statusColor} />
              </div>
              <span className="text-[7px] font-mono uppercase text-muted-foreground mt-0.5">days</span>
            </div>
            <ColonSeparator />
          </>
        )}
        
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="flex gap-0.5">
            <FlipDigit value={formatTwo(time.hours)[0]} color={statusColor} />
            <FlipDigit value={formatTwo(time.hours)[1]} color={statusColor} />
          </div>
          <span className="text-[7px] font-mono uppercase text-muted-foreground mt-0.5">hrs</span>
        </div>
        
        <ColonSeparator />
        
        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="flex gap-0.5">
            <FlipDigit value={formatTwo(time.minutes)[0]} color={statusColor} />
            <FlipDigit value={formatTwo(time.minutes)[1]} color={statusColor} />
          </div>
          <span className="text-[7px] font-mono uppercase text-muted-foreground mt-0.5">min</span>
        </div>
        
        <ColonSeparator />
        
        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="flex gap-0.5">
            <FlipDigit value={formatTwo(time.seconds)[0]} color={statusColor} />
            <FlipDigit value={formatTwo(time.seconds)[1]} color={statusColor} />
          </div>
          <span className="text-[7px] font-mono uppercase text-muted-foreground mt-0.5">sec</span>
        </div>
      </div>
    </motion.div>
  )
}
