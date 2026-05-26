"use client"

import { motion } from "framer-motion"
import { Wine, MapPin, Clock, Navigation, Footprints } from "lucide-react"
import Image from "next/image"

const galleryImages = [
  { src: "https://ccclubmiami.com/assets/main-bar-BRdbzxv0.jpg", alt: "CC Club Main Bar" },
  { src: "https://ccclubmiami.com/assets/signature-coupes-CUuk3UR-.jpg", alt: "Signature Cocktails" },
  { src: "https://ccclubmiami.com/assets/neon-cc-CUxggp2T.jpg", alt: "CC Neon Sign" },
]

export function VenueCCSlide() {
  return (
    <div className="w-full h-full flex">
      {/* Left side - Title and info */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[45%] flex flex-col justify-center pl-12 pr-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-3"
        >
          <Wine className="w-4 h-4 text-primary" />
          <span className="text-primary font-mono text-xs uppercase tracking-wider">
            Happy Hour Venue
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-1">
          <span className="text-primary">CC</span> ROOFTOP
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-muted-foreground mb-4">
          Social Club
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base italic text-foreground/80 mb-4"
        >
          &ldquo;Where cocktails glow and every night feels like a secret worth keeping&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-2 mb-4"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-3 h-3 text-primary" />
            <span className="font-mono text-xs">255 NW 25th Street, 8th FL</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-3 h-3 text-primary" />
            <span className="font-mono text-xs">Happy Hour after presentations</span>
          </div>
        </motion.div>

        {/* Moxy badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-3"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            At Moxy Miami
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Center - Walking Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-[25%] flex flex-col justify-center items-center px-4"
      >
        <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-4 w-full">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Footprints className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Walking Route</span>
          </div>
          
          {/* Simple visual map */}
          <div className="relative h-48 w-full">
            {/* Start point - The Lab Miami */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <span className="text-[9px] font-mono text-primary mt-1 whitespace-nowrap">THE LAB MIAMI</span>
              <span className="text-[8px] text-muted-foreground">400 NW 26th St</span>
            </motion.div>

            {/* Walking path - animated dashed line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M 50 25 L 50 40 L 35 50 L 35 65 L 50 75"
                fill="none"
                stroke="url(#walkGradient)"
                strokeWidth="2"
                strokeDasharray="4 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="walkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00e6b4" />
                  <stop offset="100%" stopColor="#ff6432" />
                </linearGradient>
              </defs>
            </svg>

            {/* Walking person animation */}
            <motion.div
              initial={{ top: "20%", left: "50%", opacity: 0 }}
              animate={{ 
                top: ["20%", "40%", "55%", "70%", "80%"],
                left: ["50%", "50%", "35%", "35%", "50%"],
                opacity: 1
              }}
              transition={{ delay: 1.2, duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <Navigation className="w-3 h-3 text-orange-400 rotate-180" />
            </motion.div>

            {/* End point - Moxy Hotel */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
                <Wine className="w-3 h-3 text-orange-500" />
              </div>
              <span className="text-[9px] font-mono text-orange-400 mt-1 whitespace-nowrap">MOXY / CC ROOFTOP</span>
              <span className="text-[8px] text-muted-foreground">255 NW 25th St</span>
            </motion.div>
          </div>

          {/* Walk time */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center mt-2 pt-2 border-t border-border/30"
          >
            <span className="text-lg font-bold text-primary">~3 min</span>
            <span className="text-xs text-muted-foreground ml-2">walk</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Image gallery */}
      <div className="w-[30%] flex items-center justify-center pr-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-2 w-full"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.15 }}
              className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border/30 shadow-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
