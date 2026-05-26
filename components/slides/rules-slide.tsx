"use client";

import { motion } from "framer-motion";

const rules = [
  {
    number: "01",
    title: "Team Size",
    description: "2-4 members per team. Mix skills for best results!",
  },
  {
    number: "02",
    title: "AI Focus",
    description:
      "Projects must incorporate AI/ML in a meaningful way. Use any tools you want.",
  },
  {
    number: "03",
    title: "Fresh Start",
    description:
      "All code must be written during the hackathon. Pre-planning ideas is encouraged!",
  },
  {
    number: "04",
    title: "Demo Ready",
    description:
      "5-minute demo presentation. Show us what you built and why it matters.",
  },
  {
    number: "05",
    title: "Have Fun",
    description: "This is about learning, creating, and connecting. Enjoy it!",
  },
];

const tips = [
  "Start with a clear problem statement",
  "Build an MVP first, polish later",
  "Document as you go",
  "Ask for help when stuck",
  "Take breaks to stay fresh",
];

export function RulesSlide() {
  return (
    <div className="relative flex h-full">
      {/* Left side - Rules */}
      <div className="flex-1 px-12 py-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
            Ground Rules
          </span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            How to Play
          </h2>
        </motion.div>

        <div className="space-y-6">
          {rules.map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-6 group"
            >
              <span className="text-3xl font-mono font-bold text-primary/50 group-hover:text-primary transition-colors">
                {rule.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {rule.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      {/* Right side - Tips */}
      <div className="w-96 px-12 py-16 bg-gradient-to-b from-primary/5 to-transparent">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-accent mb-4 block">
            Pro Tips
          </span>
          <h3 className="text-3xl font-bold text-foreground mb-8">
            Success Strategies
          </h3>

          <div className="space-y-4">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-accent"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
                <span className="text-foreground/80">{tip}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 p-6 rounded-xl border border-accent/30 bg-accent/5"
          >
            <p className="text-sm text-accent font-semibold mb-2">
              Remember...
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The goal is to learn and experiment. Even &quot;failed&quot;
              projects teach valuable lessons!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
