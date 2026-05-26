"use client"

import { motion } from "framer-motion"
import { Brain, ChevronRight, Code, Cpu, Sparkles } from "lucide-react"
import { NeuralNetwork } from "./neural-network"
import { RotatingQuotes } from "./rotating-quotes"

export function HeroSlide() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 md:p-12 overflow-hidden">
      {/* Neural network background */}
      <NeuralNetwork />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        {/* Icon row */}
        <motion.div 
          className="flex items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[Brain, Code, Cpu].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.5 
              }}
            >
              <Icon className="w-10 h-10 text-primary/80" />
            </motion.div>
          ))}
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          AI
          <span className="text-primary"> HACKATHON</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-3 text-2xl md:text-3xl text-muted-foreground mb-8"
        >
          <Sparkles className="w-6 h-6 text-accent" />
          <span className="uppercase tracking-widest font-light">2026 Innovation Edition</span>
          <Sparkles className="w-6 h-6 text-accent" />
        </motion.div>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/20 border border-primary/40 text-primary text-xl font-semibold"
        >
          <ChevronRight className="w-5 h-5" />
          Friday, June 5th
          <ChevronRight className="w-5 h-5 rotate-180" />
        </motion.div>
      </motion.div>

      {/* Quotes at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-0 right-0 z-10"
      >
        <RotatingQuotes />
      </motion.div>
    </div>
  )
}
