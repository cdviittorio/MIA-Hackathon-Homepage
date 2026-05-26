"use client";

import { motion } from "framer-motion";

const prizes = [
  {
    place: "1st",
    title: "Grand Champion",
    description: "Top innovation award",
    color: "from-yellow-400 to-orange-500",
    glow: "shadow-yellow-500/30",
  },
  {
    place: "2nd",
    title: "Runner Up",
    description: "Excellence in execution",
    color: "from-slate-300 to-slate-400",
    glow: "shadow-slate-400/30",
  },
  {
    place: "3rd",
    title: "Rising Star",
    description: "Most promising concept",
    color: "from-amber-600 to-amber-700",
    glow: "shadow-amber-600/30",
  },
];

const specialAwards = [
  { icon: "🎨", title: "Best Design", description: "UI/UX Excellence" },
  { icon: "🧠", title: "Most Innovative", description: "Creative AI Usage" },
  { icon: "💡", title: "People's Choice", description: "Crowd Favorite" },
  { icon: "⚡", title: "Best Demo", description: "Presentation Skills" },
];

export function PrizesSlide() {
  return (
    <div className="relative flex flex-col h-full px-12 py-16">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
          What&apos;s at Stake
        </span>
        <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-foreground">
          Prizes & Recognition
        </h2>
      </motion.div>

      {/* Main prizes */}
      <div className="flex-1 flex items-center justify-center gap-8 mb-12">
        {prizes.map((prize, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`relative flex flex-col items-center p-8 rounded-2xl bg-card border border-border ${
              index === 0 ? "scale-110 z-10" : ""
            }`}
          >
            {/* Trophy icon */}
            <motion.div
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${prize.color} flex items-center justify-center mb-6 shadow-xl ${prize.glow}`}
              animate={index === 0 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-4xl font-bold text-background">
                {prize.place}
              </span>
            </motion.div>

            <h3 className="text-2xl font-bold text-foreground mb-2">
              {prize.title}
            </h3>
            <p className="text-muted-foreground text-sm">{prize.description}</p>

            {index === 0 && (
              <motion.div
                className="absolute -top-2 -right-2 px-3 py-1 bg-primary text-primary-foreground text-xs font-mono rounded-full"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                TOP PRIZE
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Special awards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-center text-lg font-mono text-muted-foreground mb-6 uppercase tracking-wider">
          Special Awards
        </h3>
        <div className="flex justify-center gap-8">
          {specialAwards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-center p-4 rounded-xl bg-secondary/50 border border-border/50"
            >
              <span className="text-3xl mb-2">{award.icon}</span>
              <span className="text-sm font-semibold text-foreground">
                {award.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {award.description}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
