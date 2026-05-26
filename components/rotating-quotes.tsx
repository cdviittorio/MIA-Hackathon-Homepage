"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "AI is the new electricity.", author: "Andrew Ng" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.", author: "Mark Zuckerberg" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Think different.", author: "Apple" },
  { text: "Build something people want.", author: "Y Combinator" },
  { text: "Fortune favors the bold.", author: "Virgil" },
]

export function RotatingQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-32 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center px-8"
        >
          <p className="text-2xl md:text-3xl font-light text-foreground/90 italic leading-relaxed">
            &ldquo;{quotes[currentQuote].text}&rdquo;
          </p>
          <p className="text-lg text-muted-foreground mt-4 tracking-wide uppercase">
            — {quotes[currentQuote].author}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
