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

      {/* Center - Walking Map with Street Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-[30%] flex flex-col justify-center items-center px-4"
      >
        <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-4 w-full">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Footprints className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Walking Route</span>
          </div>
          
          {/* Street Grid Map */}
          <div className="relative w-full aspect-square bg-background/50 rounded-lg overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {/* Background */}
              <rect x="0" y="0" width="200" height="200" fill="#1a1a2e" />
              
              {/* Street grid - horizontal streets */}
              <g stroke="#333" strokeWidth="0.5">
                {/* NW 28th St */}
                <line x1="0" y1="20" x2="200" y2="20" />
                {/* NW 27th St */}
                <line x1="0" y1="50" x2="200" y2="50" />
                {/* NW 26th St */}
                <line x1="0" y1="100" x2="200" y2="100" />
                {/* NW 25th St */}
                <line x1="0" y1="150" x2="200" y2="150" />
                {/* NW 24th St */}
                <line x1="0" y1="180" x2="200" y2="180" />
              </g>
              
              {/* Street grid - vertical avenues */}
              <g stroke="#333" strokeWidth="0.5">
                {/* NW 3rd Ave */}
                <line x1="30" y1="0" x2="30" y2="200" />
                {/* NW 2nd Ave */}
                <line x1="90" y1="0" x2="90" y2="200" />
                {/* NW 1st Ave */}
                <line x1="150" y1="0" x2="150" y2="200" />
                {/* N Miami Ave */}
                <line x1="180" y1="0" x2="180" y2="200" />
              </g>
              
              {/* Street labels */}
              <g fill="#555" fontSize="6" fontFamily="monospace">
                {/* Horizontal street labels */}
                <text x="170" y="18">NW 28th</text>
                <text x="170" y="48">NW 27th</text>
                <text x="170" y="98">NW 26th</text>
                <text x="170" y="148" fill="#666">NW 25th</text>
                
                {/* Vertical avenue labels */}
                <text x="22" y="195" transform="rotate(-90, 22, 195)">3rd Ave</text>
                <text x="82" y="195" transform="rotate(-90, 82, 195)">2nd Ave</text>
              </g>
              
              {/* City blocks */}
              <g fill="#222" opacity="0.5">
                <rect x="35" y="25" width="50" height="20" rx="2" />
                <rect x="95" y="25" width="50" height="20" rx="2" />
                <rect x="35" y="55" width="50" height="40" rx="2" />
                <rect x="95" y="55" width="50" height="40" rx="2" />
                <rect x="35" y="105" width="50" height="40" rx="2" />
                <rect x="95" y="105" width="50" height="40" rx="2" />
                <rect x="35" y="155" width="50" height="20" rx="2" />
                <rect x="95" y="155" width="50" height="20" rx="2" />
              </g>
              
              {/* Walking route - highlighted path */}
              <motion.path
                d="M 30 35 L 30 100 L 90 100 L 90 150"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
              />
              
              {/* Gradient for route */}
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00e6b4" />
                  <stop offset="100%" stopColor="#ff6432" />
                </linearGradient>
              </defs>
              
              {/* Direction arrows on route */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <polygon points="30,65 26,58 34,58" fill="#00e6b4" />
                <polygon points="60,100 53,96 53,104" fill="#00c8a0" />
                <polygon points="90,125 86,118 94,118" fill="#ff6432" />
              </motion.g>
              
              {/* Start marker - The Lab Miami */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                <circle cx="30" cy="35" r="12" fill="#00e6b4" opacity="0.2" />
                <circle cx="30" cy="35" r="8" fill="#0a0a14" stroke="#00e6b4" strokeWidth="2" />
                <circle cx="30" cy="35" r="3" fill="#00e6b4" />
              </motion.g>
              
              {/* End marker - CC Rooftop */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              >
                <circle cx="90" cy="150" r="12" fill="#ff6432" opacity="0.2" />
                <circle cx="90" cy="150" r="8" fill="#0a0a14" stroke="#ff6432" strokeWidth="2" />
                <text x="90" y="153" textAnchor="middle" fill="#ff6432" fontSize="8" fontWeight="bold">CC</text>
              </motion.g>
              
              {/* Walking person animation along route */}
              <motion.circle
                r="4"
                fill="#fff"
                initial={{ cx: 30, cy: 35 }}
                animate={{ 
                  cx: [30, 30, 90, 90],
                  cy: [35, 100, 100, 150]
                }}
                transition={{ 
                  delay: 2.5, 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatDelay: 2,
                  ease: "linear"
                }}
              />
            </svg>
            
            {/* Location labels overlay */}
            <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded">
              <span className="text-[8px] font-mono text-primary">THE LAB MIAMI</span>
            </div>
            <div className="absolute bottom-10 right-4 bg-black/70 px-2 py-1 rounded">
              <span className="text-[8px] font-mono text-orange-400">CC ROOFTOP</span>
            </div>
          </div>

          {/* Walk instructions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-3 space-y-1"
          >
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[8px]">1</span>
              <span>Head south on NW 3rd Ave</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[8px]">2</span>
              <span>Turn left onto NW 26th St</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-[8px]">3</span>
              <span>Arrive at Moxy on NW 25th St</span>
            </div>
          </motion.div>

          {/* Walk time */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-center mt-3 pt-2 border-t border-border/30 flex items-center justify-center gap-3"
          >
            <div>
              <span className="text-xl font-bold text-primary">~5</span>
              <span className="text-xs text-muted-foreground ml-1">min</span>
            </div>
            <div className="w-px h-6 bg-border/50" />
            <div>
              <span className="text-xl font-bold text-foreground/70">400</span>
              <span className="text-xs text-muted-foreground ml-1">m</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Image gallery */}
      <div className="w-[25%] flex items-center justify-center pr-8">
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
