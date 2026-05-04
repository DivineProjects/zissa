"use client"

import { motion } from "framer-motion"

const INITIAL = {
  up:    { opacity: 0, y: 32 },
  left:  { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  fade:  { opacity: 0 },
}

export default function SlideInSection({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  direction?: "left" | "right" | "up" | "fade"
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={INITIAL[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}