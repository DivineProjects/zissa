"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const news = [
  { category: "Conference", date: "15 Apr 2026", title: "ZiSSA Annual Statistical Conference 2026 — Call for Papers", excerpt: "We invite submissions from statisticians and researchers across all sectors for our flagship annual gathering in Harare.", href: "/news/conference-2026" },
  { category: "Standards", date: "2 Mar 2026", title: "Revised Code of Professional Conduct Now in Effect", excerpt: "Following extensive consultation with members, the updated ethical guidelines take full effect from March 2026.", href: "/news/code-of-conduct-2026" },
  { category: "Awards", date: "20 Jan 2026", title: "Nominations Open: ZiSSA Excellence in Statistics Award", excerpt: "Recognising outstanding contributions to the field from practitioners in academia, government, and the private sector.", href: "/news/excellence-award-2026" },
]

export function LatestNews() {
  return (
    <section className="py-32 bg-[#08142A]">
      <div className="mx-auto max-w-7xl px-8 md:px-16">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase">
                News & Updates
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Latest from the Society
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white border-b border-white/20 pb-1 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-500"
            >
              View all news <span>→</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {news.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            >
              <Link
                href={item.href}
                className="group block bg-[#08142A] p-10 h-full border-t border-transparent hover:bg-white/[0.02] transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]">
                    {item.category}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-[11px] text-[#4a6a96] tracking-wide">{item.date}</span>
                </div>

                <h3
                  className="text-xl font-bold text-white leading-snug mb-5 transition-colors duration-500 group-hover:text-[#C9A84C]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </h3>

                <p className="text-[15px] leading-relaxed text-[#4a6a96] font-light">
                  {item.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}