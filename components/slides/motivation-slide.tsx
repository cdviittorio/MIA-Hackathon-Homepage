"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const quotes = [
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.",
    author: "Mark Zuckerberg",
  },
  {
    text: "AI is probably the most important thing humanity has ever worked on.",
    author: "Sundar Pichai",
  },
];

const stats = [
  { value: "8", label: "Hours to Build", suffix: "hrs" },
  { value: "∞", label: "Ideas Welcome", suffix: "" },
  { value: "1st", label: "Place Prize", suffix: "" },
  { value: "100%", label: "Your Creativity", suffix: "" },
];

export function MotivationSlide() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center px-12">
      {/* Animated background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-16"
      >
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-4xl md:text-5xl font-light leading-relaxed max-w-4xl mx-auto text-foreground mb-8">
            {'"'}
            {quotes[quoteIndex].text}
            {'"'}
          </p>
          <p className="text-xl text-primary font-mono">
            — {quotes[quoteIndex].author}
          </p>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 grid grid-cols-4 gap-12"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="text-center"
          >
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
              {stat.value}
              <span className="text-2xl">{stat.suffix}</span>
            </div>
            <div className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-16 left-0 right-0"
      >
        <motion.p
          className="text-2xl font-semibold text-foreground"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Today, you become <span className="text-primary">innovators</span>.
        </motion.p>
      </motion.div>
    </div>
  );
}
