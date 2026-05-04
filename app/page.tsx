import Link from "next/link"
import SlideInSection from "@/components/SlideInSection"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { AreasOfWork } from "@/components/AreasOfWork"
import { LatestNews } from "@/components/LatestNews"

/* ── shared eyebrow component ── */
function Eyebrow({ label, center = false }: { label: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}>
      <div className="h-px w-8 bg-[#B8941A] shrink-0" />
      <span className="text-[#B8941A] text-[10px] font-semibold tracking-[.25em] uppercase">{label}</span>
      {center && <div className="h-px w-8 bg-[#B8941A] shrink-0" />}
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#0B1F3A]">

      {/* ─── HERO ─── */}
      <Hero />

      {/* ─── STATS ─── */}
      <Stats />

      {/* ─── ABOUT ─── */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Decorative side — hidden on mobile */}
            <SlideInSection direction="left" className="lg:col-span-5 hidden lg:block">
              <div className="relative select-none">
                <div
                  className="text-[clamp(120px,14vw,190px)] font-bold leading-none text-[#EDE8DF]"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                  aria-hidden="true"
                >
                  Σ
                </div>
                <div className="absolute bottom-4 right-0 bg-[#0B1F3A] text-white px-6 py-5 shadow-xl">
                  <div
                    className="text-2xl font-bold text-[#B8941A]"
                    style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                  >
                    35 Years
                  </div>
                  <div className="text-[9px] font-semibold tracking-[.18em] uppercase text-white/40 mt-1">
                    Serving Zimbabwe
                  </div>
                </div>
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[#B8941A] via-[#B8941A]/30 to-transparent" />
              </div>
            </SlideInSection>

            {/* Text */}
            <SlideInSection direction="right" delay={0.12} className="lg:col-span-7">
              <Eyebrow label="About ZiSSA" />
              <h2
                className="text-[clamp(28px,4vw,50px)] font-bold text-[#0B1F3A] leading-tight mb-7"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
              >
                Zimbabwe's National<br />
                Statistical Society
              </h2>
              <p className="text-base sm:text-[17px] leading-[1.75] text-[#5A6E84] mb-5">
                The Zimbabwe Statistical Sciences Association (ZiSSA) is a nationally
                recognised professional body dedicated to promoting the theory,
                application, and ethical practice of statistics across academia,
                industry, and government.
              </p>
              <p className="text-base sm:text-[17px] leading-[1.75] text-[#5A6E84] mb-9">
                We set the professional standards that guide statisticians and data
                scientists in their work — ensuring that evidence used to shape policy,
                drive business, and advance science meets the highest standards of
                rigour and integrity.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.18em] uppercase text-[#0B1F3A] border-b border-[#B8941A] pb-0.5 hover:text-[#B8941A] transition-colors duration-200"
              >
                About the Association →
              </Link>
            </SlideInSection>

          </div>
        </div>
      </section>

      {/* ─── MISSION / VISION / VALUES ─── */}
      <section className="py-20 sm:py-28 bg-[#F7F3EC]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

          <SlideInSection className="text-center mb-12 sm:mb-16">
            <Eyebrow label="Our Foundation" center />
            <h2
              className="text-[clamp(28px,4vw,50px)] font-bold text-[#0B1F3A]"
              style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
            >
              Mission, Vision &amp; Values
            </h2>
          </SlideInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#DDD8CF] divide-y md:divide-y-0 md:divide-x divide-[#DDD8CF]">
            {[
              { num: "01", tag: "Mission",  h: "Promote Excellence",   p: "To advance the theory and practice of statistics in Zimbabwe by setting professional standards, supporting practitioners, and engaging with policy and society." },
              { num: "02", tag: "Vision",   h: "Data-Driven Nation",    p: "A Zimbabwe where sound statistical evidence underpins all major decisions — from national development planning to corporate strategy and scientific discovery." },
              { num: "03", tag: "Values",   h: "Integrity & Rigour",    p: "Guided by intellectual honesty, methodological rigour, ethical responsibility, inclusivity, and a commitment to the public good in everything we do." },
            ].map((c, i) => (
              <SlideInSection key={i} delay={i * 0.1} className="group relative p-8 sm:p-10 hover:bg-white transition-colors duration-200">
                <div
                  className="absolute top-6 right-6 text-5xl sm:text-6xl font-bold text-[#EDE8DF] leading-none pointer-events-none"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                  aria-hidden="true"
                >
                  {c.num}
                </div>
                <div className="text-[10px] font-bold tracking-[.22em] uppercase text-[#B8941A] mb-5">{c.tag}</div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-[#0B1F3A] mb-4"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                >
                  {c.h}
                </h3>
                <p className="text-[14px] leading-[1.7] text-[#5A6E84]">{c.p}</p>
              </SlideInSection>
            ))}
          </div>

        </div>
      </section>

      {/* ─── AREAS OF WORK ─── */}
      <AreasOfWork />

      {/* ─── LATEST NEWS ─── */}
      <LatestNews />

      {/* ─── MEMBERSHIP CTA ─── */}
      <section className="relative py-24 sm:py-32 bg-[#F7F3EC] overflow-hidden text-center">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="text-[clamp(80px,18vw,220px)] font-bold text-[#EDE8DF] leading-none whitespace-nowrap"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
          >
            ZiSSA
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-6 sm:px-10">
          <SlideInSection>
            <Eyebrow label="Join ZiSSA" center />
            <h2
              className="text-[clamp(28px,4vw,52px)] font-bold text-[#0B1F3A] leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
            >
              Join the Professional<br />
              Statistical Community
            </h2>
            <p className="text-base sm:text-[17px] leading-[1.75] text-[#5A6E84] mb-10 max-w-xl mx-auto">
              Membership grants access to professional accreditation, cutting-edge
              research, national conferences, peer networking, and direct channels
              of policy influence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/membership/join"
                className="group inline-flex items-center gap-2 bg-[#0B1F3A] text-white text-[11px] font-bold tracking-[.12em] uppercase px-7 py-[14px] rounded-sm transition-all duration-200 hover:bg-[#B8941A] hover:text-[#0B1F3A]"
              >
                Apply for Membership
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/membership"
                className="inline-flex items-center border border-[#0B1F3A]/20 text-[#0B1F3A] text-[11px] font-semibold tracking-[.12em] uppercase px-7 py-[14px] rounded-sm transition-all duration-200 hover:border-[#0B1F3A]/50"
              >
                View Membership Grades
              </Link>
            </div>
          </SlideInSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0B1F3A] text-white/35">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
              >
                ZiSSA
              </div>
              <p className="text-[13px] leading-[1.65] mb-5 max-w-[220px]">
                Zimbabwe's national professional body for statisticians, data scientists, and quantitative researchers.
              </p>
              <div className="text-[9px] font-semibold tracking-[.2em] uppercase text-[#B8941A]">Est. 1991 · Harare, Zimbabwe</div>
            </div>

            {/* Links */}
            {[
              { h: "About",      links: ["About ZiSSA","Leadership","Our History","Careers"] },
              { h: "Membership", links: ["Join ZiSSA","Membership Grades","Benefits","Renew Membership"] },
              { h: "Standards",  links: ["Professional Standards","Code of Ethics","Accreditation","CPD Framework"] },
            ].map(col => (
              <div key={col.h}>
                <h4 className="text-[9px] font-bold tracking-[.22em] uppercase text-white mb-5">{col.h}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(l => (
                    <li key={l}>
                      <Link href="#" className="text-[13px] text-white/40 hover:text-white transition-colors duration-200">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-white/[.07] pt-7 flex flex-col sm:flex-row gap-4 items-center justify-between text-[12px]">
            <span>© 2026 Zimbabwe Statistical Sciences Association. All rights reserved.</span>
            <div className="flex gap-5 flex-wrap justify-center">
              {["Privacy Policy","Terms of Use","Contact"].map(l => (
                <Link key={l} href="#" className="text-white/30 hover:text-white/70 transition-colors duration-200">{l}</Link>
              ))}
            </div>
          </div>

        </div>
      </footer>

    </main>
  )
}