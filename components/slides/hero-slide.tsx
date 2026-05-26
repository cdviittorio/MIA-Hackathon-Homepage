"use client";

import { motion } from "framer-motion";

export function HeroSlide() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center px-8">
      {/* Glowing orb background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl animate-pulse-glow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block px-6 py-2 text-sm font-mono uppercase tracking-[0.3em] text-primary border border-primary/30 rounded-full bg-primary/5">
            Internal Hackathon 2026
          </span>
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-6">
          <span className="block text-foreground">AI</span>
          <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            Innovation
          </span>
          <span className="block text-foreground">Day</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mt-8 leading-relaxed"
        >
          Build the future. Push boundaries. Transform ideas into reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-8 text-sm font-mono text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>NEXT FRIDAY</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span>ONE DAY</span>
          <div className="w-px h-4 bg-border" />
          <span>UNLIMITED POSSIBILITIES</span>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary/50"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-accent/40"
        animate={{
          y: [0, 20, 0],
          x: [0, -20, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-glow-green/50"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
