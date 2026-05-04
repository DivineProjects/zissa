import SlideInSection from "@/components/SlideInSection"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { AreasOfWork } from "@/components/AreasOfWork"
import { LatestNews } from "@/components/LatestNews"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen">

      <Hero />
      <Stats />

      {/* ─── ABOUT ─── */}
      <section className="relative py-32 lg:py-40 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,168,76,0.08),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

            {/* LEFT SYMBOL */}
            <SlideInSection direction="left" className="lg:col-span-5 hidden lg:block">
              <div className="relative h-full flex items-center justify-center">
                <div className="absolute left-0 top-0 h-full w-[1px] bg-[#e8e2d9]" />
                <div className="text-[240px] text-[#F5F0E8] select-none font-display">
                  Σ
                </div>
              </div>
            </SlideInSection>

            {/* TEXT */}
            <SlideInSection direction="right" delay={0.15} className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-10 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase">
                  About the Society
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.1] mb-10 text-balance">
                Zimbabwe’s National
                <br />
                Statistical Body
              </h2>

              <p className="text-[17px] leading-relaxed text-[#4a5568] mb-8">
                The Zimbabwe Statistical Sciences Association (ZiSSA) is a nationally
                recognised professional body dedicated to promoting the theory,
                application, and ethical practice of statistics.
              </p>

              <p className="text-[17px] leading-relaxed text-[#4a5568] mb-12">
                We set the professional standards that guide statisticians and data
                scientists — ensuring evidence used in policy, business, and science
                meets the highest level of rigour and integrity.
              </p>

              <Link
                href="/about"
                className="link-underline text-[12px] font-bold tracking-[0.2em] uppercase"
              >
                Learn about our history →
              </Link>
            </SlideInSection>

          </div>
        </div>
      </section>

      <div className="section-divider my-24" />

      {/* ─── MISSION ─── */}
      <section className="py-32 bg-[#F5F0E8]">
        <div className="mx-auto max-w-7xl px-8 md:px-16">

          <SlideInSection className="text-center mb-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Mission & Values
            </h2>
          </SlideInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {[
              {
                label: "Mission",
                title: "Promote Excellence",
                text: "Advance statistical practice through standards and engagement."
              },
              {
                label: "Vision",
                title: "Data-Driven Nation",
                text: "A Zimbabwe guided by high-quality statistical evidence."
              },
              {
                label: "Values",
                title: "Integrity & Rigour",
                text: "Guided by ethics, inclusivity, and intellectual honesty."
              }
            ].map((item, i) => (
              <SlideInSection key={i} delay={i * 0.15}>
                <div className="card p-8">

                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-px w-6 bg-[#C9A84C]" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                      {item.label}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-[#6b7a8d]">{item.text}</p>

                </div>
              </SlideInSection>
            ))}

          </div>
        </div>
      </section>

      <AreasOfWork />
      <LatestNews />

      {/* ─── CTA ─── */}
      <section className="py-32 text-center">
        <div className="mx-auto max-w-3xl px-8">

          <SlideInSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
              Join the Professional
              <br />
              Statistical Community
            </h2>

            <p className="text-[#6b7a8d] mb-12">
              Access accreditation, research, conferences, and policy influence.
            </p>

            <Link
              href="/membership/join"
              className="btn-cta px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.2em]"
            >
              Apply for Membership →
            </Link>
          </SlideInSection>

        </div>
      </section>

    </main>
  )
}