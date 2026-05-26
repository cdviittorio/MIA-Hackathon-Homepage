"use client";

import { motion } from "framer-motion";

interface SlideIndicatorProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function SlideIndicator({
  total,
  current,
  onSelect,
}: SlideIndicatorProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full bg-card/80 backdrop-blur-md border border-border">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className="relative p-1 focus:outline-none"
        >
          <div
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current
                ? "bg-primary"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
          {index === current && (
            <motion.div
              layoutId="activeSlide"
              className="absolute inset-0 w-5 h-5 -m-1 rounded-full border-2 border-primary"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
      <div className="ml-4 pl-4 border-l border-border">
        <span className="text-xs font-mono text-muted-foreground">
          {current + 1}/{total}
        </span>
      </div>
    </div>
  );
}
