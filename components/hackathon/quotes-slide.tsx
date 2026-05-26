"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Quote, Sparkles } from "lucide-react"

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
    text: "AI is the new electricity. It will transform every industry.",
    author: "Andrew Ng",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "AI is going to be the most transformative technology in human history.",
    author: "Sundar Pichai",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Think big, start small, move fast.",
    author: "Amazon Leadership Principle",
  },
]

export function QuotesSlide() {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto px-8 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 flex items-center gap-4"
      >
        <Sparkles className="w-8 h-8 text-primary" />
        <span className="text-2xl font-bold text-foreground">Get Inspired</span>
        <Sparkles className="w-8 h-8 text-primary" />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="relative">
            <Quote className="absolute -top-8 -left-8 w-16 h-16 text-primary/20" />
            <p className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-relaxed mb-8 text-balance px-12">
              {quotes[currentQuote].text}
            </p>
            <Quote className="absolute -bottom-8 -right-8 w-16 h-16 text-primary/20 rotate-180" />
          </div>
          <p className="text-xl text-primary font-semibold">
            — {quotes[currentQuote].author}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2 mt-12">
        {quotes.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentQuote(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentQuote
                ? "bg-primary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}
