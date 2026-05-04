"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { value: 1200, suffix: "+", label: "Registered Members",   desc: "Across academia, industry & government" },
  { value: 35,   suffix: "",  label: "Years of Excellence",  desc: "Championing statistical rigour" },
  { value: 18,   suffix: "",  label: "Accredited Programmes",desc: "Nationally recognised credentials" },
  { value: 95,   suffix: "%", label: "Ethics Compliance",    desc: "Among certified practitioners" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  useEffect(() => {
    if (!inView) return
    let n = 0
    const step = Math.max(1, value / (1400 / 16))
    const id = setInterval(() => {
      n = Math.min(n + step, value)
      setCount(Math.floor(n))
      if (n >= value) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [inView, value])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export function Stats() {
  return (
    <section className="bg-[#F7F3EC] py-16 sm:py-20 border-b border-[#DDD8CF]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10 sm:mb-14"
        >
          <div className="h-px w-8 bg-[#B8941A] shrink-0" />
          <span className="text-[#B8941A] text-[10px] font-semibold tracking-[.25em] uppercase">
            ZiSSA by the Numbers
          </span>
        </motion.div>

        {/* Grid: 2×2 on mobile, 4×1 on md+ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#DDD8CF] border border-[#DDD8CF]">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [.25,.1,.25,1] }}
              className="px-5 py-7 sm:px-8 sm:py-9 group"
            >
              {/* Gold bar */}
              <div className="w-6 h-[2px] bg-[#B8941A] mb-5 transition-all duration-300 group-hover:w-12" />

              <div
                className="text-[clamp(32px,5vw,52px)] font-bold text-[#0B1F3A] leading-none"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
              >
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </div>

              <div className="mt-3 text-[10px] sm:text-[11px] font-semibold tracking-[.15em] uppercase text-[#0B1F3A]">
                {s.label}
              </div>
              <div className="mt-1.5 text-xs sm:text-[13px] text-[#6B7A8D] leading-snug hidden sm:block">
                {s.desc}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}