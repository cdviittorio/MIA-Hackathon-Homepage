"use client"

import { motion } from "framer-motion"
import { Wine, MapPin, Clock } from "lucide-react"
import Image from "next/image"

const galleryImages = [
  { src: "https://ccclubmiami.com/assets/main-bar-BRdbzxv0.jpg", alt: "CC Club Main Bar" },
  { src: "https://ccclubmiami.com/assets/gallery-crowd-D-_Dn6Eu.jpg", alt: "CC Club Crowd" },
  { src: "https://ccclubmiami.com/assets/gallery-cocktail-B2FQd2oM.jpg", alt: "Signature Cocktails" },
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
          className="text-xl italic text-foreground/80 mb-6"
        >
          &ldquo;Where cocktails glow and every night feels like a secret worth keeping&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 mb-6"
        >
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm">255 NW 25th Street, 8th FL Rooftop</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm">Happy Hour after presentations</span>
          </div>
        </motion.div>

        {/* Moxy badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            At Moxy Miami &bull; Wynwood
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Right side - Image gallery */}
      <div className="w-1/2 flex items-center justify-center pr-12 pl-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-3 w-full max-w-lg"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/30 shadow-xl"
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
