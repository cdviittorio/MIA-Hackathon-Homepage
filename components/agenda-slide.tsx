"use client"

import { motion } from "framer-motion"
import { Clock, Coffee, Lightbulb, Presentation, Rocket, Trophy, Utensils, Users } from "lucide-react"

const agendaItems = [
  { time: "9:00 AM", title: "Registration & Breakfast", icon: Coffee, description: "Check in and fuel up" },
  { time: "9:30 AM", title: "Opening Keynote", icon: Lightbulb, description: "AI Innovation vision & rules" },
  { time: "10:00 AM", title: "Team Formation", icon: Users, description: "Find your squad" },
  { time: "10:30 AM", title: "Hacking Begins!", icon: Rocket, description: "Start building" },
  { time: "12:30 PM", title: "Lunch Break", icon: Utensils, description: "Refuel & network" },
  { time: "1:30 PM", title: "Hacking Continues", icon: Clock, description: "Deep work time" },
  { time: "4:00 PM", title: "Project Submissions", icon: Presentation, description: "Submit your creation" },
  { time: "4:30 PM", title: "Demos & Judging", icon: Trophy, description: "Show what you built" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
}

export function AgendaSlide() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
          TODAY&apos;S AGENDA
        </h2>
        <p className="text-xl text-muted-foreground uppercase tracking-widest">
          Your roadmap to innovation
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        <div className="grid gap-3">
          {agendaItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-6 p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-lg font-mono text-primary font-semibold">
                    {item.time}
                  </span>
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
