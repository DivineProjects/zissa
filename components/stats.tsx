"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { value: 1200, suffix: "+", label: "Registered Members", description: "Across academia, industry & government" },
  { value: 35,   suffix: "",  label: "Years of Excellence", description: "Championing statistical rigour" },
  { value: 18,   suffix: "",  label: "Accredited Programmes", description: "Nationally recognised credentials" },
  { value: 95,   suffix: "%", label: "Ethics Compliance",   description: "Among certified practitioners" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000 // Slowed down slightly for elegance
    const step = Math.max(1, Math.floor(value / (duration / 16)))
    const interval = setInterval(() => {
      start = Math.min(start + step, value)
      setCount(start)
      if (start >= value) clearInterval(interval)
    }, 16)
    return () => clearInterval(interval)
  }, [inView, value])

  return (
    <span ref={ref} className="stat-number tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="bg-white py-32 border-b border-[#e8e2d9]">
      <div className="mx-auto max-w-7xl px-8 md:px-16">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="h-px w-10 bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase">
            ZiSSA by the Numbers
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-[#e8e2d9]">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="px-8 group first:pl-0"
            >
              <div className="w-8 h-[1px] bg-[#C9A84C] mb-8 transition-all duration-500 group-hover:w-16" />

              <div
                className="text-5xl md:text-6xl font-normal text-[#08142A] leading-none mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>

              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#08142A] mb-3">
                {stat.label}
              </div>
              <div className="text-[14px] text-[#6b7a8d] font-light leading-snug pr-4">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}