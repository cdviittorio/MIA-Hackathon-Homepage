"use client";

import { motion } from "framer-motion";

const agendaItems = [
  { time: "9:00 AM", title: "Doors Open & Breakfast", type: "break" },
  { time: "9:30 AM", title: "Opening Keynote & Theme Reveal", type: "main" },
  { time: "10:00 AM", title: "Team Formation & Brainstorming", type: "main" },
  { time: "10:30 AM", title: "Hacking Begins!", type: "highlight" },
  { time: "12:30 PM", title: "Lunch Break", type: "break" },
  { time: "1:30 PM", title: "Checkpoint #1 - Progress Share", type: "main" },
  { time: "3:30 PM", title: "Snack Break & Networking", type: "break" },
  { time: "5:00 PM", title: "Final Submissions", type: "highlight" },
  { time: "5:30 PM", title: "Demo Presentations", type: "main" },
  { time: "6:30 PM", title: "Judging & Awards Ceremony", type: "highlight" },
];

export function AgendaSlide() {
  return (
    <div className="relative flex flex-col h-full px-12 py-16">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <span className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
          The Schedule
        </span>
        <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-foreground">
          Agenda
        </h2>
      </motion.div>

      <div className="flex-1 grid grid-cols-2 gap-x-16 gap-y-1">
        {agendaItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center py-4 border-b border-border/50 group ${
              item.type === "highlight"
                ? "bg-gradient-to-r from-primary/10 to-transparent -mx-4 px-4 rounded-lg border-primary/30"
                : ""
            }`}
          >
            <span
              className={`w-28 text-sm font-mono ${
                item.type === "highlight"
                  ? "text-primary"
                  : item.type === "break"
                    ? "text-muted-foreground"
                    : "text-muted-foreground"
              }`}
            >
              {item.time}
            </span>
            <span
              className={`flex-1 text-lg ${
                item.type === "highlight"
                  ? "text-foreground font-semibold"
                  : item.type === "break"
                    ? "text-muted-foreground"
                    : "text-foreground"
              }`}
            >
              {item.title}
            </span>
            {item.type === "highlight" && (
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-8 text-center text-muted-foreground text-sm font-mono"
      >
        * Schedule may be adjusted based on participant needs
      </motion.div>
    </div>
  );
}
