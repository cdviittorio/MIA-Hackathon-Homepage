"use client"

import { motion } from "framer-motion"
import { Wine, MapPin, Clock, Star, Music, Sparkles } from "lucide-react"

const highlights = [
  { icon: Wine, label: "Premium Cocktails" },
  { icon: Music, label: "Curated Music" },
  { icon: Star, label: "Rooftop Views" },
  { icon: Sparkles, label: "Exclusive Atmosphere" },
]

export function VenueCCSlide() {
  return (
    <div className="w-full h-full flex">
      {/* Left side - Title and info */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 flex flex-col justify-center pl-12 pr-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-4"
        >
          <Wine className="w-5 h-5 text-primary" />
          <span className="text-primary font-mono text-sm uppercase tracking-wider">
            Happy Hour Venue
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-2">
          <span className="text-primary">CC</span> ROOFTOP
        </h1>
        <h2 className="text-3xl md:text-4xl font-light text-muted-foreground mb-6">
          Social Club
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl italic text-foreground/80 mb-2"
        >
          &ldquo;Elegance above the city&rdquo;
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground mb-8 max-w-md"
        >
          A sanctuary of taste and conversation. Miami&apos;s penthouse sanctuary 
          where cocktails glow and every night feels like a secret worth keeping.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 mb-8"
        >
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm">255 NW 25th Street, 8th FL Rooftop</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm">Happy Hour after presentations!</span>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 gap-3"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-card/30 border border-border/30"
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right side - Quote and atmosphere */}
      <div className="w-1/2 flex flex-col justify-center pr-12 pl-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl blur-xl" />
          
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-card/60 to-card/20 border border-primary/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-2xl md:text-3xl text-foreground leading-relaxed mb-6 font-light">
                The view stretches beyond the city &mdash; a horizon of gold and glass. 
                The music hums softly, the cocktails glimmer in candlelight.
              </p>
              <p className="text-xl text-primary italic">
                Here, time slows.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Moxy badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-4">
            At Moxy Miami Hotel &bull; Wynwood
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <p className="text-lg text-primary font-medium">
            Celebrate your hackathon wins with us!
          </p>
          <p className="text-sm text-muted-foreground mt-2 font-mono">
            ccclubmiami.com
          </p>
        </motion.div>
      </div>
    </div>
  )
}
