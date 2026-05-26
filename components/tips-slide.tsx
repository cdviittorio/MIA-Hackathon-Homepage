"use client"

import { motion } from "framer-motion"
import { Lightbulb, MessageSquare, Rocket, Target, Users, Zap } from "lucide-react"

const tips = [
  {
    icon: Target,
    title: "Start with a Problem",
    description: "Focus on a real pain point AI can solve",
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "Diverse skills win — find complementary teammates",
  },
  {
    icon: Rocket,
    title: "MVP First",
    description: "A working demo beats a perfect plan",
  },
  {
    icon: MessageSquare,
    title: "Tell a Story",
    description: "Your pitch matters as much as your code",
  },
  {
    icon: Zap,
    title: "Use AI Tools",
    description: "Leverage existing APIs and models",
  },
  {
    icon: Lightbulb,
    title: "Think Bold",
    description: "Big ideas get remembered",
  },
]

export function TipsSlide() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
          WINNING STRATEGIES
        </h2>
        <p className="text-xl text-muted-foreground uppercase tracking-widest">
          Pro tips from past champions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {tips.map((tip, index) => {
          const Icon = tip.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 border border-primary/30">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {tip.title}
              </h3>
              <p className="text-muted-foreground">
                {tip.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
