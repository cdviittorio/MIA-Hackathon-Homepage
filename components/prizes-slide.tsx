"use client"

import { motion } from "framer-motion"
import { Award, Sparkles, Zap } from "lucide-react"

const prizes = [
  { place: "1st", prize: "$5,000", color: "from-amber-400 to-amber-600", icon: "🥇" },
  { place: "2nd", prize: "$2,500", color: "from-slate-300 to-slate-400", icon: "🥈" },
  { place: "3rd", prize: "$1,000", color: "from-orange-400 to-orange-600", icon: "🥉" },
]

export function PrizesSlide() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-6"
        >
          <Award className="w-20 h-20 text-primary mx-auto" />
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
          COMPETE & WIN
        </h2>
        <p className="text-xl text-muted-foreground uppercase tracking-widest">
          Amazing prizes await
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
        {prizes.map((prize, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              className="w-64 h-72 rounded-2xl bg-card border border-border/50 p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm"
            >
              <span className="text-6xl mb-4">{prize.icon}</span>
              <span className="text-2xl font-bold text-muted-foreground mb-2">
                {prize.place} Place
              </span>
              <span className="text-4xl font-bold text-primary">
                {prize.prize}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 flex items-center gap-4 text-muted-foreground"
      >
        <Sparkles className="w-5 h-5 text-accent" />
        <span className="text-lg">Plus special category awards!</span>
        <Zap className="w-5 h-5 text-accent" />
      </motion.div>
    </div>
  )
}
