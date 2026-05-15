"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Users, BookOpen, Award, BarChart2, FileText, Globe,
  GraduationCap, Briefcase, Calendar, ChevronDown,
  Menu, X, ArrowRight, TrendingUp, Shield,
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────────
   NAV DATA  (inline — move to nav-data.ts if preferred)
───────────────────────────────────────────────────────────────── */
interface NavItem {
  label: string
  href: string
  desc: string
  icon: React.ReactNode
}
interface NavGroup {
  label: string
  featured?: { label: string; href: string; headline: string; sub: string }
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: "About",
    featured: {
      label: "About ZiSSA",
      href: "/about",
      headline: "35 Years of Statistical Excellence",
      sub: "Learn how ZiSSA has shaped statistics in Zimbabwe since 1991.",
    },
    items: [
      { label: "Our Leadership",  href: "/about/leadership",  desc: "Meet the executive committee", icon: <Users size={15} /> },
      { label: "Our History",     href: "/about/history",     desc: "From founding to present day", icon: <BookOpen size={15} /> },
      { label: "Accreditation",   href: "/about/accreditation", desc: "How ZiSSA recognises institutions", icon: <Award size={15} /> },
      { label: "Careers",         href: "/about/careers",     desc: "Opportunities within ZiSSA", icon: <Briefcase size={15} /> },
    ],
  },
  {
    label: "Membership",
    featured: {
      label: "Join ZiSSA",
      href: "/membership/join",
      headline: "Advance Your Statistical Career",
      sub: "Access accreditation, research, events, and a national professional network.",
    },
    items: [
      { label: "Membership Grades", href: "/membership",          desc: "Fellow, Member, Associate & more",   icon: <Award size={15} /> },
      { label: "Benefits",          href: "/membership/benefits", desc: "What your membership unlocks",       icon: <TrendingUp size={15} /> },
      { label: "Renew",             href: "/membership/renew",    desc: "Keep your status current",           icon: <Shield size={15} /> },
      { label: "CPD Framework",     href: "/standards/cpd",       desc: "Continuing professional development", icon: <GraduationCap size={15} /> },
    ],
  },
  {
    label: "Standards",
    featured: {
      label: "Professional Standards",
      href: "/standards",
      headline: "Upholding Rigour & Integrity",
      sub: "The ethical and methodological principles every member upholds.",
    },
    items: [
      { label: "Code of Ethics",   href: "/standards/ethics",        desc: "Our professional conduct framework",  icon: <Shield size={15} /> },
      { label: "Publications",     href: "/standards/publications",  desc: "Journals, reports and guidelines",    icon: <FileText size={15} /> },
      { label: "Data Policy",      href: "/standards/data-policy",   desc: "How we handle statistical data",      icon: <Globe size={15} /> },
      { label: "Chapters",         href: "/standards/chapters",      desc: "Provincial and sector chapters",      icon: <Users size={15} /> },
    ],
  },
  {
    label: "Resources",
    featured: {
      label: "Knowledge Hub",
      href: "/resources",
      headline: "Research, Tools & Learning",
      sub: "Datasets, statistical tools, and learning resources for members and the public.",
    },
    items: [
      { label: "Statistical Reports", href: "/resources/reports",   desc: "National data publications",         icon: <BarChart2 size={15} /> },
      { label: "Events & Conferences",href: "/resources/events",    desc: "Upcoming ZiSSA calendar",            icon: <Calendar size={15} /> },
      { label: "Learning Centre",     href: "/resources/learning",  desc: "Courses, webinars and tutorials",    icon: <GraduationCap size={15} /> },
      { label: "News & Media",        href: "/resources/news",      desc: "Latest announcements and coverage",  icon: <FileText size={15} /> },
    ],
  },
]

/* ─────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────── */
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold)
    fn()
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [threshold])
  return scrolled
}

/* ─────────────────────────────────────────────────────────────────
   LOGO SIGMA MARK
───────────────────────────────────────────────────────────────── */
function SigmaMark({ dark }: { dark: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="6" fill={dark ? "#B8941A" : "#0B1F3A"} />
      <text x="14" y="21" textAnchor="middle"
        style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontWeight: 700, fill: "white" }}>
        Σ
      </text>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────
   DESKTOP DROPDOWN
───────────────────────────────────────────────────────────────── */
function DesktopDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = React.useState(false)
  const closeTimer  = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const isGroupActive = group.items.some(i => pathname.startsWith(i.href))

  function openMenu()  { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true) }
  function closeMenu() { closeTimer.current = setTimeout(() => setOpen(false), 120) }

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      {/* Trigger */}
      <button
        aria-expanded={open}
        className={`flex items-center gap-1.5 text-[12px] font-semibold tracking-[.08em] uppercase py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8941A] rounded-sm
          ${isGroupActive ? "text-[#B8941A]" : "text-[#0B1F3A]/70 hover:text-[#0B1F3A]"}`}
      >
        {group.label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Active underline */}
      {isGroupActive && (
        <div className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-[#B8941A] rounded-full" />
      )}

      {/* Panel */}
      <div
        className={`absolute top-[calc(100%+22px)] left-1/2 -translate-x-1/2 w-[580px] bg-white border border-[#E8E3DA] rounded-2xl shadow-2xl shadow-[#0B1F3A]/10 overflow-hidden transition-all duration-200 origin-top
          ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-[.97] -translate-y-2 pointer-events-none"}`}
        style={{ zIndex: 100 }}
      >
        <div className="grid grid-cols-[1fr_1.5fr]">

          {/* Featured */}
          {group.featured && (
            <Link href={group.featured.href}
              className="group flex flex-col justify-end p-6 bg-[#0B1F3A] relative overflow-hidden min-h-[200px]"
              onClick={() => setOpen(false)}>
              {/* decorative sigma */}
              <span
                className="absolute top-2 right-3 text-[80px] font-bold leading-none text-white/[.06] pointer-events-none select-none"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
                aria-hidden="true"
              >Σ</span>
              <span className="text-[10px] font-bold tracking-[.2em] uppercase text-[#B8941A] mb-3">
                {group.featured.label}
              </span>
              <p className="text-[15px] font-bold text-white leading-snug mb-2"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                {group.featured.headline}
              </p>
              <p className="text-[12px] text-white/50 leading-[1.6] mb-4">
                {group.featured.sub}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[.14em] uppercase text-[#B8941A] group-hover:gap-2.5 transition-all duration-200">
                Explore <ArrowRight size={11} />
              </span>
            </Link>
          )}

          {/* Items */}
          <div className="p-3">
            {group.items.map((item, i) => {
              const active = pathname.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-start gap-3 px-3 py-3 rounded-xl transition-colors duration-150
                    ${active ? "bg-[#FBF8F2]" : "hover:bg-[#F7F3EC]"}`}
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <span className={`mt-0.5 p-1.5 rounded-lg shrink-0 transition-colors ${active ? "bg-[#B8941A] text-white" : "bg-[#F0EBE0] text-[#B8941A] group-hover:bg-[#B8941A] group-hover:text-white"}`}>
                    {item.icon}
                  </span>
                  <div>
                    <p className={`text-[13px] font-semibold mb-0.5 ${active ? "text-[#B8941A]" : "text-[#0B1F3A]"}`}>
                      {item.label}
                    </p>
                    <p className="text-[11px] text-[#7A8FA6] leading-snug">{item.desc}</p>
                  </div>
                </Link>
              )
            })}
          </div>

        </div>

        {/* Bottom strip */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#F7F3EC] border-t border-[#E8E3DA]">
          <span className="text-[10px] text-[#7A8FA6] tracking-wide">Zimbabwe Statistical Sciences Association</span>
          <Link href="/sitemap" className="text-[10px] text-[#B8941A] hover:underline font-medium" onClick={() => setOpen(false)}>
            All pages →
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   MOBILE ACCORDION GROUP
───────────────────────────────────────────────────────────────── */
function MobileGroup({ group, pathname, onClose }: { group: NavGroup; pathname: string; onClose: () => void }) {
  const [open, setOpen] = React.useState(() => group.items.some(i => pathname.startsWith(i.href)))

  return (
    <div className="border-b border-white/[.06]">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[13px] font-bold tracking-[.1em] uppercase text-white/80">{group.label}</span>
        <ChevronDown size={14} className={`text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] pb-3" : "max-h-0"}`}>
        {group.items.map(item => {
          const active = pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} onClick={onClose}
              className={`flex items-center gap-3 py-2.5 px-2 rounded-lg transition-colors ${active ? "text-[#C9A84C]" : "text-white/55 hover:text-white"}`}>
              <span className={`shrink-0 ${active ? "text-[#C9A84C]" : "text-white/30"}`}>{item.icon}</span>
              <div>
                <p className={`text-[13px] font-medium ${active ? "text-[#C9A84C]" : ""}`}>{item.label}</p>
                <p className="text-[11px] text-white/30 leading-snug">{item.desc}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────────────────────────── */
export function Navbar() {
  const pathname = usePathname()
  const scrolled = useScrolled()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  /* Lock body scroll when mobile menu is open */
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  /* Close on route change */
  React.useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-[#E8E3DA] shadow-sm shadow-[#0B1F3A]/5 h-16"
            : "bg-white/80 backdrop-blur-lg border-b border-[#0B1F3A]/[.05] h-20"
          }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 h-full">
          <div className="flex h-full items-center justify-between">

            {/* ── Brand ── */}
            <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="ZiSSA home">
              <SigmaMark dark={scrolled} />
              <div className="leading-tight">
                <p className={`font-bold transition-all duration-300 ${scrolled ? "text-[18px] text-[#0B1F3A]" : "text-[20px] text-[#0B1F3A]"}`}
                  style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                  ZiSSA
                </p>
                <p className="text-[9px] uppercase tracking-[.2em] text-[#7A8FA6] hidden sm:block">
                  Statistical Sciences
                </p>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-8 h-full" aria-label="Main navigation">
              {navGroups.map(group => (
                <DesktopDropdown key={group.label} group={group} pathname={pathname} />
              ))}
            </nav>

            {/* ── Right side ── */}
            <div className="flex items-center gap-3">

              {/* CTA — desktop */}
              <Link
                href="/membership/join"
                className="hidden md:inline-flex items-center gap-2 bg-[#0B1F3A] hover:bg-[#B8941A] text-white text-[11px] font-bold tracking-[.14em] uppercase px-5 py-2.5 rounded-lg transition-all duration-300 group"
              >
                Join ZiSSA
                <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-[#E8E3DA] hover:bg-[#F7F3EC] transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <span className={`transition-all duration-200 ${mobileOpen ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100"}`}>
                  <Menu size={18} className="text-[#0B1F3A]" />
                </span>
                <span className={`transition-all duration-200 ${mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"}`}>
                  <X size={18} className="text-[#0B1F3A]" />
                </span>
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 bg-[#0B1F3A]/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden
            ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[360px] bg-[#0B1F3A] transition-transform duration-300 ease-out lg:hidden flex flex-col
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[.08] shrink-0">
            <div className="flex items-center gap-3">
              <SigmaMark dark={false} />
              <span className="font-bold text-white text-[17px]"
                style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>ZiSSA</span>
            </div>
            <button onClick={() => setMobileOpen(false)}
              className="p-2 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
              aria-label="Close menu">
              <X size={16} />
            </button>
          </div>

          {/* Nav groups */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {navGroups.map(group => (
              <MobileGroup key={group.label} group={group} pathname={pathname} onClose={() => setMobileOpen(false)} />
            ))}
          </div>

          {/* Drawer footer */}
          <div className="shrink-0 px-6 py-6 border-t border-white/[.08] space-y-3">
            <Link href="/membership/join" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#B8941A] hover:bg-[#C9A84C] text-white text-[11px] font-bold tracking-[.16em] uppercase py-3.5 rounded-xl transition-colors">
              Apply for Membership <ArrowRight size={12} />
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-[11px] font-semibold tracking-[.12em] uppercase py-3 rounded-xl transition-all">
              Contact ZiSSA
            </Link>
            <p className="text-[10px] text-white/20 text-center tracking-wide pt-1">
              Est. 1991 · Harare, Zimbabwe
            </p>
          </div>

        </div>
      </>
    </>
  )
}
