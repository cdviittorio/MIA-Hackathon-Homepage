"use client"

import { motion } from "framer-motion"
import { MapPin, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

const flipCards = [
  {
    image: "https://www.thelabmiami.com/images/dsc4169-hdr.jpeg",
    alt: "The Lab Miami main workspace",
    stat: "2012",
    label: "Established",
  },
  {
    image: "https://www.thelabmiami.com/images/dsc9192-hdr.jpeg",
    alt: "The Lab Miami lounge area",
    stat: "16K+",
    label: "Sq. Ft Campus",
  },
  {
    image: "https://www.thelabmiami.com/images/lab-events.jpeg",
    alt: "Events at The Lab Miami",
    stat: "100K+",
    label: "Innovators",
  },
  {
    image: "https://www.thelabmiami.com/images/hackers.jpeg",
    alt: "Hackers at The Lab Miami",
    stat: "1",
    label: "Mission",
  },
]

function FlipCard({ 
  image, 
  alt, 
  stat, 
  label, 
  isFlipped,
  delay 
}: { 
  image: string
  alt: string
  stat: string
  label: string
  isFlipped: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative aspect-[4/3] [perspective:1000px]"
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Front - Image */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl overflow-hidden border border-primary/30">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        {/* Back - Stat */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateX(180deg)] rounded-xl overflow-hidden border border-primary/50 bg-gradient-to-br from-card via-card to-primary/10 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isFlipped ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <p className="text-5xl md:text-6xl font-bold text-primary drop-shadow-[0_0_20px_rgba(0,230,180,0.5)]">
              {stat}
            </p>
            <p className="text-sm text-muted-foreground text-center mt-2 uppercase tracking-wider">
              {label}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function VenueLabSlide() {
  const [flippedIndex, setFlippedIndex] = useState(-1)
  
  // Cycle through flipping cards
  useEffect(() => {
    const interval = setInterval(() => {
      setFlippedIndex((prev) => {
        // Cycle: -1 -> 0 -> 1 -> 2 -> 3 -> -1 (reset all)
        if (prev >= flipCards.length - 1) {
          return -1
        }
        return prev + 1
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-[12%]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-primary font-mono text-xs uppercase tracking-widest">
            Hackathon Headquarters
          </span>
        </div>
        
        <div className="flex items-center justify-center mb-3">
          <Image 
            src="https://www.thelabmiami.com/images/thelab_logo_white.png"
            alt="The Lab Miami Logo"
            width={280}
            height={80}
            className="object-contain"
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground italic"
        >
          &ldquo;Designed for Serious Builders, Not Tourists&rdquo;
        </motion.p>
      </motion.div>

      {/* Flip Card Grid */}
      <div className="w-full grid grid-cols-4 gap-6 mb-8">
        {flipCards.map((card, index) => (
          <FlipCard
            key={index}
            image={card.image}
            alt={card.alt}
            stat={card.stat}
            label={card.label}
            isFlipped={flippedIndex >= index}
            delay={0.4 + index * 0.1}
          />
        ))}
      </div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-12"
      >
        {/* Location */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Wynwood Arts District</h3>
            <p className="text-xs text-muted-foreground font-mono">400 NW 26th St, Miami</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-10 w-px bg-primary/30" />

        {/* Mission */}
        <p className="text-sm text-muted-foreground">
          Accelerate Miami&apos;s rise as a <span className="text-primary font-semibold">global tech hub</span>
        </p>

        {/* Divider */}
        <div className="h-10 w-px bg-primary/30" />
        
        {/* Website link */}
        <a
          href="https://thelabmiami.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          thelabmiami.com
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </motion.div>
    </div>
  )
}
