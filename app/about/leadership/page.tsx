"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  X,
  GraduationCap,
  Briefcase,
  FlaskConical,
  HandshakeIcon,
  Heart,
  Linkedin,
  ExternalLink,
  Mail,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import type {
  Leader,
  Education,
  WorkExperience,
  Research,
  Consultancy,
  VolunteerWork,
} from "@/types/leadership"

/* ─────────────────────────────────────────────────────────────────
   EYEBROW
───────────────────────────────────────────────────────────────── */
function Eyebrow({ label, center = false }: { label: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}>
      <div className="h-px w-8 bg-[#B8941A] shrink-0" />
      <span className="text-[#B8941A] text-[10px] font-semibold tracking-[.25em] uppercase">
        {label}
      </span>
      {center && <div className="h-px w-8 bg-[#B8941A] shrink-0" />}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SECTION BLOCK inside modal
───────────────────────────────────────────────────────────────── */
function ModalSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-[#E8E3DA] rounded-lg overflow-hidden mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-3.5 bg-[#F7F3EC] hover:bg-[#EDE8DF] transition-colors text-left"
      >
        <span className="text-[#B8941A]">{icon}</span>
        <span
          className="flex-1 text-[11px] font-bold tracking-[.18em] uppercase text-[#0B1F3A]"
          style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
        >
          {title}
        </span>
        {open ? (
          <ChevronUp size={14} className="text-[#5A6E84]" />
        ) : (
          <ChevronDown size={14} className="text-[#5A6E84]" />
        )}
      </button>
      {open && <div className="px-5 py-4">{children}</div>}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   MODAL
───────────────────────────────────────────────────────────────── */
function LeaderModal({
  leader,
  onClose,
}: {
  leader: Leader
  onClose: () => void
}) {
  /* Trap scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const hasSocials =
    leader.socialLinks &&
    Object.values(leader.socialLinks).some(Boolean)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0B1F3A]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full sm:max-w-2xl max-h-[90dvh] bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-start gap-5 p-6 border-b border-[#E8E3DA] bg-[#0B1F3A] shrink-0">
          <div className="relative h-16 w-16 rounded-full overflow-hidden ring-2 ring-[#B8941A] shrink-0">
            <Image
              src={leader.image || "/images/leadership/placeholder.jpg"}
              alt={leader.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold tracking-[.22em] uppercase text-[#B8941A] mb-1">
              {leader.position}
              {leader.department ? ` · ${leader.department}` : ""}
            </p>
            <h2
              className="text-xl sm:text-2xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
            >
              {leader.name}
            </h2>
            {leader.email && (
              <a
                href={`mailto:${leader.email}`}
                className="inline-flex items-center gap-1.5 mt-2 text-[12px] text-white/50 hover:text-[#B8941A] transition-colors"
              >
                <Mail size={12} />
                {leader.email}
              </a>
            )}
          </div>
          {hasSocials && (
            <div className="flex gap-2 shrink-0">
              {leader.socialLinks?.linkedin && (
                <a
                  href={leader.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[#B8941A] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {leader.socialLinks?.orcid && (
                <a
                  href={leader.socialLinks.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[#B8941A] transition-colors"
                  aria-label="ORCID"
                >
                  <ExternalLink size={18} />
                </a>
              )}
              {leader.socialLinks?.researchgate && (
                <a
                  href={leader.socialLinks.researchgate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[#B8941A] transition-colors"
                  aria-label="ResearchGate"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          )}
          <button
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">

          {/* Biography */}
          <p className="text-[14px] sm:text-[15px] leading-[1.75] text-[#3D4E60] mb-5">
            {leader.biography}
          </p>

          {/* Education */}
          {leader.education?.length > 0 && (
            <ModalSection icon={<GraduationCap size={16} />} title="Education">
              <ul className="space-y-3">
                {leader.education.map((e: Education, i: number) => (
                  <li key={i} className="flex gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#B8941A] shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold text-[#0B1F3A]">
                        {e.degree}
                        {e.honours && (
                          <span className="ml-2 text-[11px] font-normal text-[#B8941A]">
                            {e.honours}
                          </span>
                        )}
                      </p>
                      <p className="text-[12px] text-[#5A6E84]">
                        {e.institution} · {e.year}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </ModalSection>
          )}

          {/* Work Experience */}
          {leader.workExperience?.length > 0 && (
            <ModalSection icon={<Briefcase size={16} />} title="Work Experience">
              <ul className="space-y-4">
                {leader.workExperience.map((w: WorkExperience, i: number) => (
                  <li key={i} className="border-l-2 border-[#E8E3DA] pl-4">
                    <p className="text-[13px] font-semibold text-[#0B1F3A]">{w.title}</p>
                    <p className="text-[12px] text-[#B8941A] font-medium">{w.organisation}</p>
                    <p className="text-[11px] text-[#5A6E84] mb-1">{w.period}</p>
                    {w.description && (
                      <p className="text-[12px] text-[#5A6E84] leading-[1.6]">{w.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </ModalSection>
          )}

          {/* Research */}
          {leader.research?.length > 0 && (
            <ModalSection icon={<FlaskConical size={16} />} title="Research & Publications">
              <ul className="space-y-3">
                {leader.research.map((r: Research, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-[9px] font-bold tracking-widest uppercase text-white bg-[#0B1F3A] px-1.5 py-0.5 rounded h-fit">
                      {r.type === "publication" ? "Pub" : r.type === "project" ? "Proj" : "Conf"}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-[#0B1F3A] leading-snug">{r.title}</p>
                      {(r.journal || r.year) && (
                        <p className="text-[11px] text-[#5A6E84] mt-0.5">
                          {r.journal}{r.journal && r.year ? " · " : ""}{r.year}
                        </p>
                      )}
                      {r.doi && (
                        <a
                          href={`https://doi.org/${r.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#B8941A] hover:underline"
                        >
                          DOI: {r.doi}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </ModalSection>
          )}

          {/* Consultancy */}
          {leader.consultancy?.length > 0 && (
            <ModalSection icon={<HandshakeIcon size={16} />} title="Consultancy">
              <ul className="space-y-3">
                {leader.consultancy.map((c: Consultancy, i: number) => (
                  <li key={i} className="flex gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#B8941A] shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold text-[#0B1F3A]">{c.project}</p>
                      <p className="text-[12px] text-[#5A6E84]">
                        {c.client}{c.period ? ` · ${c.period}` : ""}
                      </p>
                      {c.description && (
                        <p className="text-[12px] text-[#5A6E84] mt-0.5 leading-[1.6]">{c.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </ModalSection>
          )}

          {/* Volunteer Work */}
          {leader.volunteerWork?.length > 0 && (
            <ModalSection icon={<Heart size={16} />} title="Volunteer Work">
              <ul className="space-y-3">
                {leader.volunteerWork.map((v: VolunteerWork, i: number) => (
                  <li key={i} className="flex gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#B8941A] shrink-0" />
                    <div>
                      <p className="text-[13px] font-semibold text-[#0B1F3A]">{v.role}</p>
                      <p className="text-[12px] text-[#5A6E84]">
                        {v.organisation}{v.period ? ` · ${v.period}` : ""}
                      </p>
                      {v.description && (
                        <p className="text-[12px] text-[#5A6E84] mt-0.5 leading-[1.6]">{v.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </ModalSection>
          )}

        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   LEADER CARD
───────────────────────────────────────────────────────────────── */
function LeaderCard({
  leader,
  onClick,
}: {
  leader: Leader
  onClick: () => void
}) {
  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick() }}
      className="group cursor-pointer rounded-xl bg-white shadow-sm border border-[#E8E3DA] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8941A]"
    >
      {/* Image */}
      <div className="relative h-64 bg-[#F7F3EC] overflow-hidden">
        <Image
          src={leader.image || "/images/leadership/placeholder.jpg"}
          alt={leader.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* View profile CTA */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="bg-[#B8941A] text-white text-[10px] font-bold tracking-[.16em] uppercase px-4 py-2 rounded-sm">
            View Full Profile →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] font-bold tracking-[.22em] uppercase text-[#B8941A] mb-1">
          {leader.position}
        </p>
        <h3
          className="text-lg font-bold text-[#0B1F3A] leading-snug mb-2"
          style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
        >
          {leader.name}
        </h3>
        <p className="text-[13px] leading-[1.65] text-[#5A6E84] line-clamp-2">
          {leader.biography}
        </p>

        {/* Education snippet */}
        {leader.education?.[0] && (
          <div className="mt-3 flex items-start gap-2">
            <GraduationCap size={12} className="shrink-0 mt-0.5 text-[#B8941A]" />
            <p className="text-[11px] text-[#5A6E84]">
              {leader.education[0].degree}, {leader.education[0].institution}
            </p>
          </div>
        )}
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────
   SKELETON
───────────────────────────────────────────────────────────────── */
function LeaderCardSkeleton() {
  return (
    <div className="rounded-xl bg-white border border-[#E8E3DA] overflow-hidden animate-pulse">
      <div className="h-64 bg-[#EDE8DF]" />
      <div className="p-5 space-y-3">
        <div className="h-2.5 w-24 bg-[#EDE8DF] rounded" />
        <div className="h-5 w-3/4 bg-[#EDE8DF] rounded" />
        <div className="h-3 w-full bg-[#EDE8DF] rounded" />
        <div className="h-3 w-2/3 bg-[#EDE8DF] rounded" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────── */
export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Leader | null>(null)

  useEffect(() => {
    async function fetchLeaders() {
      try {
        const res = await fetch("/api/leadership", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load leadership data")
        const json = await res.json()
        if (!json.success) throw new Error(json.message)
        setLeaders(json.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    fetchLeaders()
  }, [])

  return (
    <main className="pt-32 px-6 bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-0 sm:px-4 lg:px-6">

        {/* Page Header */}
        <header className="mb-14">
          <Eyebrow label="Governance" />
          <h1
            className="text-[clamp(32px,5vw,56px)] font-bold text-[#0B1F3A] leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display',Georgia,serif" }}
          >
            Our Leadership
          </h1>
          <p className="max-w-2xl text-[15px] sm:text-[17px] leading-[1.75] text-[#5A6E84]">
            Meet the executive team responsible for advancing statistical
            sciences and upholding the highest professional standards across Zimbabwe.
          </p>
        </header>

        {/* Grid */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <LeaderCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-[#be123c] font-semibold mb-2">Failed to load leadership</p>
            <p className="text-[#5A6E84] text-[13px]">{error}</p>
          </div>
        ) : leaders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-[#5A6E84]">No leadership records found.</p>
          </div>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {leaders.map((leader) => (
              <LeaderCard
                key={leader._id}
                leader={leader}
                onClick={() => setSelected(leader)}
              />
            ))}
          </section>
        )}

      </div>

      {/* Profile Modal */}
      {selected && (
        <LeaderModal leader={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  )
}
