"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const ease = [0.25, 0.1, 0.25, 1]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0B1F3A] overflow-hidden py-24">

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,148,26,1) 1px,transparent 1px),linear-gradient(90deg,rgba(184,148,26,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow blob */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(26,54,102,.7) 0%,transparent 70%)" }}
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
              <div className="h-px w-8 bg-[#B8941A] shrink-0" />
              <span className="text-[#B8941A] text-[10px] font-semibold tracking-[.25em] uppercase">
                Est. 1991 · Zimbabwe
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
              className="text-[clamp(36px,6vw,66px)] font-bold leading-[1.05] text-white mb-6"
              style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 900 }}
            >
              Advancing<br />
              <span className="text-[#B8941A]">Excellence</span><br />
              in Statistical<br />
              Practice
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
              className="text-base sm:text-[17px] leading-[1.75] text-white/60 max-w-[480px] mb-10"
            >
              Zimbabwe's national professional body for statisticians, data scientists,
              and quantitative researchers — setting the standard for rigour, ethics,
              and impact across all sectors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/membership/join"
                className="group inline-flex items-center gap-2 bg-[#B8941A] text-[#0B1F3A] text-[11px] font-bold tracking-[.12em] uppercase px-6 py-[14px] rounded-sm transition-all duration-200 hover:bg-[#D4AD30] hover:-translate-y-px"
              >
                Become a Member
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/standards"
                className="inline-flex items-center gap-2 border border-white/20 text-white/75 text-[11px] font-semibold tracking-[.12em] uppercase px-6 py-[14px] rounded-sm transition-all duration-200 hover:border-[#B8941A] hover:text-[#B8941A]"
              >
                Our Standards
              </Link>
            </motion.div>

            {/* Tagline strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-12 pt-6 border-t border-white/[.06] hidden sm:flex flex-wrap gap-4 lg:gap-6"
            >
              {["Professional Standards", "Ethical Practice", "Research Excellence", "Policy Influence"].map((t, i, arr) => (
                <span key={i} className="text-[10px] font-semibold tracking-[.2em] uppercase text-white/25">
                  {t}{i < arr.length - 1 && <span className="ml-4 text-[#B8941A]/30">·</span>}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Emblem — desktop only ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative w-[260px] h-[260px]">
              <div className="absolute inset-0 rounded-full border border-[#B8941A]/18" />
              <div className="absolute inset-5 rounded-full border border-[#B8941A]/10" />
              <div className="absolute inset-11 rounded-full bg-[#122848] border border-white/[.07] flex flex-col items-center justify-center">
                <span className="text-[68px] font-bold text-[#B8941A] leading-none" style={{ fontFamily: "Georgia,serif" }}>Σ</span>
                <span className="text-[8px] font-bold tracking-[.25em] uppercase text-white/35 mt-1">ZiSSA</span>
              </div>
              {/* Cardinal dots */}
              {[{top:"1px",left:"50%",transform:"translateX(-50%)"},{bottom:"1px",left:"50%",transform:"translateX(-50%)"},{left:"1px",top:"50%",transform:"translateY(-50%)"},{right:"1px",top:"50%",transform:"translateY(-50%)"}].map((s,i)=>(
                <div key={i} className="absolute w-2 h-2 rounded-full bg-[#B8941A]/45" style={s as React.CSSProperties} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}