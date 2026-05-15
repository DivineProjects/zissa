import Link from "next/link"
import SlideInSection from "@/components/SlideInSection"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { AreasOfWork } from "@/components/AreasOfWork"
import { LatestNews } from "@/components/LatestNews"

/* ─────────────────────────────────────────────────────────────────
   SHARED PRIMITIVES
───────────────────────────────────────────────────────────────── */
function Eyebrow({ label, center = false, light = false }: { label: string; center?: boolean; light?: boolean }) {
  const gold = light ? "#C9A84C" : "#B8941A"
  return (
    <div className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}>
      <div className="h-px w-8 shrink-0" style={{ background: gold }} />
      <span
        className="text-[10px] font-semibold tracking-[.28em] uppercase"
        style={{ color: gold }}
      >
        {label}
      </span>
      {center && <div className="h-px w-8 shrink-0" style={{ background: gold }} />}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1F3A] overflow-x-hidden">

      {/* ─── HERO ─── */}
      <Hero />

      {/* ─── STATS ─── */}
      <Stats />

      {/* ══════════════════════════════════════════
          ABOUT — editorial split layout
      ══════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-white overflow-hidden">

        {/* decorative grid lines */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#EDE8DF]" />
          <div className="absolute left-1/4 top-0 h-full w-px bg-[#EDE8DF] hidden lg:block" />
          <div className="absolute left-3/4 top-0 h-full w-px bg-[#EDE8DF] hidden lg:block" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-20 items-center">

            {/* ── Left decorative panel ── */}
            <SlideInSection direction="left" className="lg:col-span-5 hidden lg:flex flex-col items-start gap-8">

              {/* large sigma + year badge */}
              <div className="relative w-full select-none">
                <div
                  className="text-[clamp(140px,15vw,210px)] font-bold leading-none text-[#EDE8DF] translate-x-[-0.05em]"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                  aria-hidden="true"
                >
                  Σ
                </div>
                {/* floating badge */}
                <div className="absolute bottom-6 right-0 bg-[#0B1F3A] text-white px-6 py-5 shadow-2xl">
                  <div
                    className="text-2xl font-bold text-[#B8941A] mb-1"
                    style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                  >
                    35 Years
                  </div>
                  <div className="text-[9px] font-semibold tracking-[.2em] uppercase text-white/40">
                    Serving Zimbabwe
                  </div>
                </div>
                {/* vertical rule */}
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#B8941A] via-[#B8941A]/30 to-transparent" />
              </div>

              {/* mini stats row */}
              <div className="grid grid-cols-2 gap-4 w-full">
                {[
                  { n: "1,200+", l: "Members nationwide" },
                  { n: "47",     l: "Institutional partners" },
                  { n: "12",     l: "Annual publications" },
                  { n: "9",      l: "Provincial chapters" },
                ].map(({ n, l }) => (
                  <div key={l} className="border border-[#EDE8DF] p-4">
                    <div
                      className="text-xl font-bold text-[#0B1F3A] mb-0.5"
                      style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                    >
                      {n}
                    </div>
                    <div className="text-[11px] text-[#7A8FA6] leading-snug">{l}</div>
                  </div>
                ))}
              </div>
            </SlideInSection>

            {/* ── Right text ── */}
            <SlideInSection direction="right" delay={0.12} className="lg:col-span-7">
              <Eyebrow label="About ZiSSA" />
              <h2
                className="text-[clamp(30px,4.5vw,54px)] font-bold text-[#0B1F3A] leading-[1.1] mb-7"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
              >
                Zimbabwes National<br />
                <span className="italic text-[#B8941A]">Statistical</span> Society
              </h2>
              <p className="text-[15px] sm:text-[17px] leading-[1.8] text-[#5A6E84] mb-5 max-w-xl">
                The Zimbabwe Statistical Sciences Association (ZiSSA) is a nationally
                recognised professional body dedicated to promoting the theory,
                application, and ethical practice of statistics across academia,
                industry, and government.
              </p>
              <p className="text-[15px] sm:text-[17px] leading-[1.8] text-[#5A6E84] mb-10 max-w-xl">
                We set the professional standards that guide statisticians and data
                scientists — ensuring evidence used to shape policy, drive business,
                and advance science meets the highest standards of rigour and integrity.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 bg-[#0B1F3A] text-white text-[11px] font-bold tracking-[.16em] uppercase px-7 py-[14px] rounded-sm hover:bg-[#B8941A] transition-colors duration-300"
                >
                  About the Association
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/about/leadership"
                  className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.16em] uppercase text-[#0B1F3A] border-b border-[#B8941A] pb-0.5 hover:text-[#B8941A] transition-colors duration-200"
                >
                  Meet Our Leadership →
                </Link>
              </div>
            </SlideInSection>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MISSION / VISION / VALUES
          — full-bleed dark panel with offset cards
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#0B1F3A] py-24 sm:py-32 overflow-hidden">

        {/* large watermark */}
        <div
          className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 text-[clamp(120px,18vw,260px)] font-bold leading-none text-white/[.03] select-none hidden sm:block"
          style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
          aria-hidden="true"
        >
          ZiSSA
        </div>

        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

          <SlideInSection className="mb-14 sm:mb-18">
            <Eyebrow label="Our Foundation" light />
            <h2
              className="text-[clamp(28px,4vw,52px)] font-bold text-white leading-tight max-w-lg"
              style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
            >
              Mission, Vision
              <br />
              <span className="italic text-[#C9A84C]">&amp; Values</span>
            </h2>
          </SlideInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
            {[
              {
                num: "01",
                tag: "Mission",
                h: "Promote Excellence",
                p: "To advance the theory and practice of statistics in Zimbabwe by setting professional standards, supporting practitioners, and engaging with policy and society.",
                accent: true,
              },
              {
                num: "02",
                tag: "Vision",
                h: "Data-Driven Nation",
                p: "A Zimbabwe where sound statistical evidence underpins all major decisions — from national development planning to corporate strategy and scientific discovery.",
                accent: false,
              },
              {
                num: "03",
                tag: "Values",
                h: "Integrity & Rigour",
                p: "Guided by intellectual honesty, methodological rigour, ethical responsibility, inclusivity, and a commitment to the public good in everything we do.",
                accent: false,
              },
            ].map((c, i) => (
              <SlideInSection
                key={i}
                delay={i * 0.1}
                className={`group relative p-8 sm:p-10 border transition-all duration-300 hover:-translate-y-1 ${
                  c.accent
                    ? "border-[#B8941A] bg-[#B8941A]/10"
                    : "border-white/10 bg-white/[.04] hover:bg-white/[.07]"
                }`}
              >
                {/* large decorative number */}
                <div
                  className="absolute top-5 right-6 text-5xl sm:text-6xl font-bold leading-none pointer-events-none text-white/[.06]"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                  aria-hidden="true"
                >
                  {c.num}
                </div>

                <div
                  className={`text-[10px] font-bold tracking-[.24em] uppercase mb-6 ${c.accent ? "text-[#C9A84C]" : "text-[#C9A84C]/70"}`}
                >
                  {c.tag}
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                >
                  {c.h}
                </h3>
                <p className="text-[14px] leading-[1.75] text-white/55">{c.p}</p>

                {/* bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 w-0 bg-[#B8941A] transition-all duration-500 group-hover:w-full ${c.accent ? "w-full" : ""}`}
                />
              </SlideInSection>
            ))}
          </div>

        </div>
      </section>

      {/* ─── AREAS OF WORK ─── */}
      <AreasOfWork />

      {/* ─── LATEST NEWS ─── */}
      <LatestNews />

      {/* ══════════════════════════════════════════
          MEMBERSHIP CTA — split dark/cream panel
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

          {/* ── Left: dark panel ── */}
          <div className="relative bg-[#0B1F3A] flex items-center justify-center py-20 px-8 sm:px-14 overflow-hidden">
            {/* pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-[.04]" aria-hidden="true"
              style={{ backgroundImage: "radial-gradient(circle, #B8941A 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

            <SlideInSection direction="left" className="relative z-10 max-w-md text-center lg:text-left">
              <Eyebrow label="Membership" light />
              <h2
                className="text-[clamp(28px,4vw,48px)] font-bold text-white leading-tight mb-5"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
              >
                Join the <span className="italic text-[#C9A84C]">Professional</span><br />
                Statistical Community
              </h2>
              <p className="text-[15px] leading-[1.75] text-white/55 mb-9">
                Membership grants access to professional accreditation, cutting-edge
                research, national conferences, peer networking, and direct channels
                of policy influence.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/membership/join"
                  className="group inline-flex items-center gap-2 bg-[#B8941A] text-white text-[11px] font-bold tracking-[.14em] uppercase px-7 py-[14px] rounded-sm hover:bg-[#C9A84C] transition-colors duration-300"
                >
                  Apply for Membership
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/membership"
                  className="inline-flex items-center border border-white/20 text-white text-[11px] font-semibold tracking-[.14em] uppercase px-7 py-[14px] rounded-sm hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                >
                  View Grades
                </Link>
              </div>
            </SlideInSection>
          </div>

          {/* ── Right: cream panel with grade cards ── */}
          <div className="relative bg-[#F7F3EC] flex items-center justify-center py-20 px-8 sm:px-14 overflow-hidden">
            <div
              className="pointer-events-none absolute right-[-2rem] bottom-[-2rem] text-[clamp(100px,14vw,180px)] font-bold leading-none text-[#EDE8DF] select-none"
              style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
              aria-hidden="true"
            >
              Σ
            </div>
            <SlideInSection direction="right" className="relative z-10 w-full max-w-sm">
              <p className="text-[10px] font-bold tracking-[.24em] uppercase text-[#B8941A] mb-6">Membership Grades</p>
              <div className="space-y-3">
                {[
                  { grade: "Fellow",        abbr: "FZiSSA",  desc: "Highest professional distinction" },
                  { grade: "Member",        abbr: "MZiSSA",  desc: "Full professional membership" },
                  { grade: "Associate",     abbr: "AZiSSA",  desc: "Early-career practitioners" },
                  { grade: "Student",       abbr: "SZiSSA",  desc: "Undergraduate & postgraduate" },
                  { grade: "Corporate",     abbr: "CZiSSA",  desc: "Institutional membership" },
                ].map(({ grade, abbr, desc }, i) => (
                  <div
                    key={grade}
                    className="flex items-center gap-4 bg-white border border-[#E8E3DA] px-5 py-3.5 hover:border-[#B8941A] hover:shadow-sm transition-all duration-200 cursor-default"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="text-[11px] font-bold text-[#B8941A] w-16 shrink-0">{abbr}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#0B1F3A]">{grade}</p>
                      <p className="text-[11px] text-[#7A8FA6]">{desc}</p>
                    </div>
                    <div className="text-[#DDD8CF] text-lg shrink-0">→</div>
                  </div>
                ))}
              </div>
            </SlideInSection>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER — redesigned multi-column
      ══════════════════════════════════════════ */}
      <footer className="bg-[#040D1C] text-white/40">

        {/* Top bar with brand statement */}
        <div className="border-b border-white/[.06]">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
              >
                ZiSSA
              </div>
              <div className="h-8 w-px bg-white/10" />
              <p className="text-[12px] text-white/35 max-w-xs leading-snug hidden sm:block">
                Zimbabwe Statistical Sciences Association — advancing evidence-based excellence since 1991.
              </p>
            </div>
            {/* social icons */}
            <div className="flex gap-3">
              {[
                { label: "LinkedIn",   path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { label: "Twitter/X",  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "Facebook",   path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              ].map(({ label, path }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-200">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">

            {/* Brand col — spans 2 on large */}
            <div className="col-span-2 lg:col-span-2">
              <p className="text-[13px] leading-[1.7] text-white/35 mb-6 max-w-xs">
                Zimbabwes national professional body for statisticians, data scientists,
                and quantitative researchers. Established in Harare in 1991.
              </p>
              <div className="text-[9px] font-semibold tracking-[.22em] uppercase text-[#B8941A] mb-8">
                Est. 1991 · Harare, Zimbabwe
              </div>
              {/* Newsletter */}
              <p className="text-[10px] font-bold tracking-[.2em] uppercase text-white/60 mb-3">
                Statistical Bulletin
              </p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 px-4 py-2.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#B8941A] transition-colors"
                />
                <button className="shrink-0 bg-[#B8941A] hover:bg-[#C9A84C] text-white text-[10px] font-bold tracking-[.14em] uppercase px-4 py-2.5 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Nav columns */}
            {[
              {
                h: "About",
                links: [
                  { l: "About ZiSSA",    href: "/about" },
                  { l: "Leadership",     href: "/about/leadership" },
                  { l: "Our History",    href: "/about/history" },
                  { l: "Careers",        href: "/about/careers" },
                ],
              },
              {
                h: "Membership",
                links: [
                  { l: "Join ZiSSA",        href: "/membership/join" },
                  { l: "Membership Grades", href: "/membership" },
                  { l: "Benefits",          href: "/membership/benefits" },
                  { l: "Renew",             href: "/membership/renew" },
                ],
              },
              {
                h: "Standards",
                links: [
                  { l: "Professional Standards", href: "/standards" },
                  { l: "Code of Ethics",         href: "/standards/ethics" },
                  { l: "Accreditation",          href: "/standards/accreditation" },
                  { l: "CPD Framework",          href: "/standards/cpd" },
                ],
              },
            ].map(col => (
              <div key={col.h}>
                <h4 className="text-[9px] font-bold tracking-[.24em] uppercase text-white mb-5">{col.h}</h4>
                <ul className="space-y-3">
                  {col.links.map(({ l, href }) => (
                    <li key={l}>
                      <Link href={href} className="text-[13px] text-white/35 hover:text-white transition-colors duration-200">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* Divider */}
          <div className="border-t border-white/[.06]" />

          {/* Bottom bar */}
          <div className="pt-7 flex flex-col sm:flex-row gap-4 items-center justify-between text-[11px]">
            <span className="text-white/25">
              © 2026 Zimbabwe Statistical Sciences Association. All rights reserved.
            </span>
            <div className="flex gap-5 flex-wrap justify-center">
              {[
                { l: "Privacy Policy", href: "/privacy" },
                { l: "Terms of Use",   href: "/terms" },
                { l: "Contact",        href: "/contact" },
                { l: "Sitemap",        href: "/sitemap" },
              ].map(({ l, href }) => (
                <Link key={l} href={href} className="text-white/25 hover:text-white/60 transition-colors duration-200">
                  {l}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </footer>

    </main>
  )
}
