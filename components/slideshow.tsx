"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { AnimatedBackground } from "./animated-background"
import { HeroSlide } from "./hero-slide"
import { AgendaSlide } from "./agenda-slide"
import { PrizesSlide } from "./prizes-slide"
import { TipsSlide } from "./tips-slide"
import { CountdownSlide } from "./countdown-slide"

const slides = [
  { id: "hero", component: HeroSlide },
  { id: "agenda", component: AgendaSlide },
  { id: "prizes", component: PrizesSlide },
  { id: "tips", component: TipsSlide },
  { id: "countdown", component: CountdownSlide },
]

const SLIDE_DURATION = 15000 // 15 seconds per slide

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(1)

  // Target date for countdown - set to 4 PM today or tomorrow
  const getTargetDate = () => {
    const now = new Date()
    const target = new Date()
    target.setHours(16, 0, 0, 0) // 4 PM
    if (now > target) {
      target.setDate(target.getDate() + 1)
    }
    return target
  }

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(nextSlide, SLIDE_DURATION)
    return () => clearInterval(interval)
  }, [isPlaying, nextSlide])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      } else if (e.key === "p") {
        setIsPlaying((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const CurrentSlideComponent = slides[currentSlide].component

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="relative z-10"
        >
          {slides[currentSlide].id === "countdown" ? (
            <CountdownSlide targetDate={getTargetDate()} />
          ) : (
            <CurrentSlideComponent />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30 z-20">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: isPlaying ? "100%" : `${(currentSlide / slides.length) * 100}%` }}
          transition={isPlaying ? { duration: SLIDE_DURATION / 1000, ease: "linear" } : { duration: 0 }}
          key={`progress-${currentSlide}-${isPlaying}`}
        />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1)
              setCurrentSlide(index)
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-5 right-6 flex items-center gap-2 z-20">
        <button
          onClick={prevSlide}
          className="p-2 rounded-lg bg-card/50 border border-border/50 text-foreground/70 hover:text-foreground hover:bg-card/80 transition-colors backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="p-2 rounded-lg bg-card/50 border border-border/50 text-foreground/70 hover:text-foreground hover:bg-card/80 transition-colors backdrop-blur-sm"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-lg bg-card/50 border border-border/50 text-foreground/70 hover:text-foreground hover:bg-card/80 transition-colors backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Keyboard hints */}
      <div className="absolute bottom-5 left-6 text-xs text-muted-foreground/50 z-20 hidden md:flex items-center gap-4">
        <span><kbd className="px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">→</kbd> Navigate</span>
        <span><kbd className="px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">P</kbd> Play/Pause</span>
      </div>
    </div>
  )
}
