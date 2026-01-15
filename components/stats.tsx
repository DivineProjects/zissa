"use client"

import { useEffect, useState } from "react"
import SlideInSection from "./SlideInSection";

export function Stats() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={1200} label="Registered Members" />
          <Stat value={35} label="Years of Excellence" />
          <Stat value={18} label="Accredited Programs" />
          <Stat value={95} label="Ethics Compliance (%)" />
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const step = Math.max(1, Math.floor(value / (duration / 16)))

    const interval = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [value])

  return (
    <div>
        <SlideInSection direction="right">
      <div className="text-4xl font-bold text-[#0d2440]">
        {count}
        {label.includes("%") && "%"}
      </div>
      <div className="mt-2 text-sm uppercase tracking-wide text-[#2e5e99]">
        {label}
      </div>
      </SlideInSection>
    </div>
  )
}
