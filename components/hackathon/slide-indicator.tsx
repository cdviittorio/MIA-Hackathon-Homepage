"use client"

import { motion } from "framer-motion"

interface SlideIndicatorProps {
  total: number
  current: number
  onSlideClick: (index: number) => void
}

const slideNames = ["Welcome", "Schedule", "The Lab", "Get Inspired", "Quotes", "Happy Hour"]

export function SlideIndicator({ total, current, onSlideClick }: SlideIndicatorProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-md border border-border/50">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideClick(index)}
            className="group relative flex items-center"
          >
            <motion.div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-primary shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                  : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
              }`}
              animate={index === current ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-card border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {slideNames[index]}
            </span>
          </button>
        ))}
      </div>

      <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-mono">
        {current + 1} / {total}
      </div>
    </div>
  )
}
