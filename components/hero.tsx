"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-[#08142A] overflow-hidden">
      {/* Decorative subtle vertical line */}
      <div className="absolute left-8 md:left-16 top-0 h-full w-[1px] bg-white/5" />

      <div className="relative mx-auto max-w-7xl px-8 md:px-16 py-32 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: Main content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.3em] uppercase">
                Est. 1991 · Zimbabwe
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.05] tracking-tight text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Advancing
              <br />
              <span className="text-white">Excellence</span>
              <br />
              in Statistical
              <br />
              Practice
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="mt-10 max-w-2xl text-[18px] leading-relaxed text-[#8fafd4] font-light"
            >
              Zimbabwes national professional body for statisticians, data scientists, 
              and quantitative researchers — setting the standard for rigour, ethics, 
              and impact across all sectors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="mt-14 flex flex-wrap gap-6"
            >
              <Link
                href="/membership/join"
                className="group relative inline-flex items-center gap-3 rounded-none bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#08142A] transition-all duration-500 hover:bg-[#C9A84C] hover:text-white"
              >
                Become a Member
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/standards"
                className="inline-flex items-center gap-3 rounded-none border border-white/20 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              >
                Our Standards
              </Link>
            </motion.div>
          </div>

          {/* Right: Restrained emblem panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-4 hidden lg:flex items-center justify-end"
          >
            <div className="relative w-80 h-80 flex items-center justify-center opacity-80">
              {/* Thin, elegant rings */}
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/10" />
              <div className="absolute inset-16 rounded-full border border-white/5" />
              
              <div className="relative flex flex-col items-center justify-center text-center z-10">
                <div className="text-[100px] font-normal text-white/20 leading-none select-none" style={{ fontFamily: "Georgia, serif" }}>
                  Σ
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}