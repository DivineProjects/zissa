"use client"

import { motion } from "framer-motion"

export default function SlideInSection({
  children,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode
  direction?: "left" | "right" | "up"
  delay?: number
}) {
  const variants = {
    up: { y: 30 },
    left: { x: -40 },
    right: { x: 40 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...variants[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
