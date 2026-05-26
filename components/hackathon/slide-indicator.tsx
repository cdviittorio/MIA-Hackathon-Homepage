"use client"

import { motion } from "framer-motion"
import { Rocket } from "lucide-react"

interface SlideIndicatorProps {
  total: number
  current: number
  onSlideClick: (index: number) => void
}

export function SlideIndicator({ total, current }: SlideIndicatorProps) {
  const progress = (current / (total - 1)) * 100

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[60%] max-w-xl">
      {/* Progress track */}
      <div className="relative h-1 bg-muted/30 rounded-full overflow-visible">
        {/* Progress fill */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-primary to-orange-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Animated rocket */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          initial={{ left: "0%" }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ marginLeft: "-12px" }}
        >
          <motion.div
            animate={{ 
              y: [0, -2, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Rocket glow */}
            <div className="absolute inset-0 bg-primary/50 blur-md rounded-full scale-150" />
            
            {/* Rocket icon */}
            <div className="relative w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Rocket className="w-3 h-3 text-primary rotate-90" />
            </div>
            
            {/* Flame trail */}
            <motion.div
              className="absolute right-full top-1/2 -translate-y-1/2 mr-1"
              animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.8, 1.2, 0.8] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <div className="w-4 h-1 bg-gradient-to-l from-orange-500 via-yellow-400 to-transparent rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Planet markers */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary/50 shadow-lg shadow-primary/30" />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary">MIA</span>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
          <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-orange-500/50 shadow-lg shadow-orange-500/30" />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-orange-500">MARS</span>
        </div>
      </div>
    </div>
  )
}
