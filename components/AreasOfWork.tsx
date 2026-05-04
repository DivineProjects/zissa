"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const areas = [
  {
    icon: "📊",
    title: "Official Statistics",
    desc: "Supporting national data collection, census methodology, and government reporting standards.",
    href: "/work/official-statistics",
  },
  {
    icon: "🎓",
    title: "Education & Training",
    desc: "Accrediting programmes and delivering CPD for statisticians at every career stage.",
    href: "/work/education",
  },
  {
    icon: "⚖️",
    title: "Ethics & Standards",
    desc: "Developing codes of conduct and maintaining professional accountability across the discipline.",
    href: "/standards/ethics",
  },
  {
    icon: "🔬",
    title: "Research & Innovation",
    desc: "Connecting researchers with funding opportunities and fostering statistical innovation.",
    href: "/work/research",
  },
  {
    icon: "🏛️",
    title: "Policy Influence",
    desc: "Advising government ministers and public bodies on evidence-based policy decisions.",
    href: "/work/policy",
  },
  {
    icon: "🌍",
    title: "International Links",
    desc: "Maintaining ties with ISI, AfSRN, and other global statistical bodies.",
    href: "/work/international",
  },
]

export function AreasOfWork() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-8 md:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase">
                Our Work
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#08142A] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Areas of
              <br />
              Focus
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 text-[17px] leading-relaxed text-[#4a5568] self-end"
          >
            From shaping national statistics to training the next generation of data 
            professionals, ZiSSA operates across every domain where rigorous quantitative 
            thinking matters.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8e2d9]">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
            >
              <Link
                href={area.href}
                className="group block bg-white p-8 h-full transition-all duration-300 hover:bg-[#08142A]"
              >
                <div className="text-3xl mb-5 transition-transform duration-300 group-hover:scale-110 inline-block">
                  {area.icon}
                </div>
                <h3 className="text-lg font-bold text-[#08142A] mb-3 tracking-tight transition-colors duration-300 group-hover:text-white">
                  {area.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#6b7a8d] transition-colors duration-300 group-hover:text-[#8fafd4]">
                  {area.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#C9A84C] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
