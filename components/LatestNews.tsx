"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const news = [
  {
    category: "Conference",
    date: "15 Apr 2026",
    title: "ZiSSA Annual Statistical Conference 2026 — Call for Papers",
    excerpt:
      "We invite submissions from statisticians and researchers across all sectors for our flagship annual gathering in Harare.",
    href: "/news/conference-2026",
  },
  {
    category: "Standards",
    date: "2 Mar 2026",
    title: "Revised Code of Professional Conduct Now in Effect",
    excerpt:
      "Following extensive consultation with members, the updated ethical guidelines take full effect from March 2026.",
    href: "/news/code-of-conduct-2026",
  },
  {
    category: "Awards",
    date: "20 Jan 2026",
    title: "Nominations Open: ZiSSA Excellence in Statistics Award",
    excerpt:
      "Recognising outstanding contributions to the field from practitioners in academia, government, and the private sector.",
    href: "/news/excellence-award-2026",
  },
]

export function LatestNews() {
  return (
    <section className="py-28 bg-[#08142A]">
      <div className="mx-auto max-w-7xl px-8 md:px-16">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase">
                News & Updates
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Latest from ZiSSA
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.2em] uppercase text-[#C9A84C] hover:text-white transition-colors duration-200"
            >
              All news <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* News cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a3560]/40">
          {news.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <Link
                href={item.href}
                className="group block bg-[#0d2040] p-8 h-full border-t-2 border-transparent hover:border-[#C9A84C] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]">
                    {item.category}
                  </span>
                  <span className="text-[#1a3560]">·</span>
                  <span className="text-[11px] text-[#4a6a96]">{item.date}</span>
                </div>

                <h3
                  className="text-[18px] font-bold text-white leading-snug mb-4 transition-colors duration-200 group-hover:text-[#C9A84C]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </h3>

                <p className="text-[14px] leading-relaxed text-[#4a6a96]">
                  {item.excerpt}
                </p>

                <div className="mt-8 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4a6a96] transition-colors duration-200 group-hover:text-[#C9A84C]">
                  <span>Read more</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
