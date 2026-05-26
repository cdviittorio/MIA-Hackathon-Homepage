"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlowingOrb } from "@/components/hackathon/glowing-orb"
import { HeroSlide } from "@/components/hackathon/hero-slide"
import { AgendaSlide } from "@/components/hackathon/agenda-slide"
import { MotivationSlide } from "@/components/hackathon/motivation-slide"
import { QuotesSlide } from "@/components/hackathon/quotes-slide"
import { VenueLabSlide } from "@/components/hackathon/venue-lab-slide"
import { VenueCCSlide } from "@/components/hackathon/venue-cc-slide"
import { SlideIndicator } from "@/components/hackathon/slide-indicator"
import { MissionTimer } from "@/components/hackathon/mission-timer"
import { Play, Pause, SkipForward, SkipBack, Maximize, Minimize, Rocket } from "lucide-react"

const SLIDE_DURATION = 15000 // 15 seconds per slide

export default function HackathonLobby() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Set hackathon start time to May 29, 2026 at 9:00 AM ET
  const hackathonStartTime = new Date("2026-05-29T09:00:00-04:00")

  const totalSlides = 6

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, SLIDE_DURATION)

    return () => clearInterval(interval)
  }, [isPlaying, nextSlide])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          nextSlide()
          break
        case "ArrowLeft":
          prevSlide()
          break
        case "p":
          setIsPlaying((prev) => !prev)
          break
        case "f":
          toggleFullscreen()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const slideVariants = {
    enter: { opacity: 0, scale: 0.95, y: 20 },
    center: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.05, y: -20 },
  }

  const slides = [
    <HeroSlide key="hero" hackathonStartTime={hackathonStartTime} />,
    <AgendaSlide key="agenda" />,
    <VenueLabSlide key="venue-lab" />,
    <MotivationSlide key="motivation" />,
    <QuotesSlide key="quotes" />,
    <VenueCCSlide key="venue-cc" />,
  ]

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#1c2024]">
      <GlowingOrb />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-primary">
                MIA to MARS
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                29 MAY 2026
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <MissionTimer targetDate={hackathonStartTime} />
            
            <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card transition-all"
              title="Previous slide"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card transition-all"
              title={isPlaying ? "Pause (P)" : "Play (P)"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-lg bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card transition-all"
              title="Next slide"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-card/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-card transition-all ml-2"
              title="Toggle fullscreen (F)"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicator */}
      <SlideIndicator
        total={totalSlides}
        current={currentSlide}
        onSlideClick={setCurrentSlide}
      />

      {/* Keyboard hints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 right-8 text-xs text-muted-foreground/50 font-mono z-40"
      >
        <span className="px-2 py-1 rounded bg-card/30 border border-border/30 mr-1">F</span>
        Fullscreen
      </motion.div>
    </main>
  )
}
