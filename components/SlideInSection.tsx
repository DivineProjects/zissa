"use client"

import { motion } from "framer-motion"

const variants = {
  hidden: {
    up:    { opacity: 0, y: 15 },
    left:  { opacity: 0, x: -15 },
    right: { opacity: 0, x: 15 },
    fade:  { opacity: 0 },
  },
  visible: { opacity: 1, x: 0, y: 0 },
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
      initial={variants.hidden[direction]}
      whileInView={variants.visible}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Silky smooth ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}