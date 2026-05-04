"use client"

import { motion } from "framer-motion"
import Link from "next/link"

// Adding 'as const' fixes the "Type 'number[]' is not assignable" error
const ease = [0.25, 0.1, 0.25, 1] as const

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[var(--navy-deep)] overflow-hidden py-24">

      {/* Grid texture - Updated to match calibrated gold */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px,transparent 1px),linear-gradient(90deg,var(--gold) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow blob */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle, var(--navy-light) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Text Content ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-[var(--gold)] shrink-0" />
              <span className="text-[var(--gold)] text-[10px] font-bold tracking-[.25em] uppercase">
                Est. 1991 · Zimbabwe
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
              className="text-[clamp(42px,6vw,72px)] font-bold leading-[1.05] text-[var(--ivory)] mb-8"
              style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 900 }}
            >
              Advancing<br />
              <span className="text-[var(--gold-light)]">Excellence</span><br />
              in Statistical<br />
              Practice
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
              className="text-base sm:text-[18px] leading-relaxed text-white/70 max-w-[520px] mb-12"
            >
              Zimbabwe&apos;s national professional body for statisticians and data scientists,
              setting the global standard for rigour, ethics, and impactful research.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/membership/join"
                className="group inline-flex items-center gap-2 bg-[var(--gold-light)] text-[var(--navy-deep)] text-[12px] font-bold tracking-[.15em] uppercase px-8 py-4 transition-all duration-300 hover:bg-[var(--gold)] hover:-translate-y-1"
              >
                Become a Member
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/standards"
                className="inline-flex items-center gap-2 border border-white/20 text-white/90 text-[12px] font-bold tracking-[.15em] uppercase px-8 py-4 transition-all duration-300 hover:border-[var(--gold-light)] hover:text-[var(--gold-light)]"
              >
                Our Standards
              </Link>
            </motion.div>
          </div>

          {/* ── Emblem — High Contrast Version ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease }}
            className="hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative w-[320px] h-[320px]">
              {/* Outer rings with brand variables */}
              <div className="absolute inset-0 rounded-full border border-[var(--gold)]/20 animate-[pulse_4s_infinite]" />
              <div className="absolute inset-8 rounded-full border border-[var(--gold)]/10" />
              
              <div className="absolute inset-16 rounded-full bg-[var(--navy-mid)] border border-white/10 shadow-2xl flex flex-col items-center justify-center">
                <span className="text-[84px] font-bold text-[var(--gold-light)] leading-none" style={{ fontFamily: "Georgia, serif" }}>Σ</span>
                <span className="text-[10px] font-bold tracking-[.3em] uppercase text-white/40 mt-2">ZiSSA</span>
              </div>

              {/* Cardinal Accents using calibrated gold */}
              {[
                { top: "0", left: "50%", transform: "translateX(-50%)" },
                { bottom: "0", left: "50%", transform: "translateX(-50%)" },
                { left: "0", top: "50%", transform: "translateY(-50%)" },
                { right: "0", top: "50%", transform: "translateY(-50%)" }
              ].map((style, i) => (
                <div key={i} className="absolute w-2 h-2 rounded-full bg-[var(--gold)]" style={style as React.CSSProperties} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}