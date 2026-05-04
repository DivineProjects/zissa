"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const areas = [
  { icon: "📊", title: "Official Statistics", desc: "Supporting national data collection, census methodology, and government reporting standards.", href: "/work/official-statistics" },
  { icon: "🎓", title: "Education & Training", desc: "Accrediting programmes and delivering CPD for statisticians at every career stage.", href: "/work/education" },
  { icon: "⚖️", title: "Ethics & Standards", desc: "Developing codes of conduct and maintaining professional accountability across the discipline.", href: "/standards/ethics" },
  { icon: "🔬", title: "Research & Innovation", desc: "Connecting researchers with funding opportunities and fostering statistical innovation.", href: "/work/research" },
  { icon: "🏛️", title: "Policy Influence", desc: "Advising government ministers and public bodies on evidence-based policy decisions.", href: "/work/policy" },
  { icon: "🌍", title: "International Links", desc: "Maintaining ties with ISI, AfSRN, and other global statistical bodies.", href: "/work/international" },
]

export function AreasOfWork() {
  return (
    <section className="py-32 bg-[#F5F0E8]">
      <div className="mx-auto max-w-7xl px-8 md:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase">
                Our Work
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#08142A] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Areas of Focus
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 text-[18px] leading-relaxed text-[#4a5568] lg:pt-8"
          >
            From shaping national statistics to training the next generation of data 
            professionals, ZiSSA operates across every domain where rigorous quantitative 
            thinking matters.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            >
              <Link
                href={area.href}
                className="group relative block bg-white p-10 h-full border border-transparent transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1"
              >
                {/* Thin gold border that appears on hover */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A84C] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                
                <div className="text-3xl mb-8 opacity-80">{area.icon}</div>
                <h3 className="text-xl font-bold text-[#08142A] mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {area.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#6b7a8d] mb-8">
                  {area.desc}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#08142A] transition-colors duration-500 group-hover:text-[#C9A84C]">
                  <span>Learn more</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}