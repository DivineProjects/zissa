"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Plus, Trash2, X, Upload, Loader2, ChevronDown, ChevronUp,
  GraduationCap, Briefcase, FlaskConical, Handshake, Heart,
  Link as LinkIcon, User, AlertTriangle, CheckCircle2,
} from "lucide-react"
import { useUploadThing } from "@/lib/uploadthing-client"
import type { Leader } from "@/types/leadership"

/* ─────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────── */
type ResearchType = "publication" | "project" | "conference"

interface FormState {
  name: string
  position: string
  department: string
  email: string
  biography: string
  order: string
  education:      { degree: string; institution: string; year: string; honours: string }[]
  workExperience: { title: string; organisation: string; period: string; description: string }[]
  research:       { title: string; journal: string; year: string; doi: string; type: ResearchType }[]
  consultancy:    { project: string; client: string; period: string; description: string }[]
  volunteerWork:  { role: string; organisation: string; period: string; description: string }[]
  socialLinks:    { linkedin: string; researchgate: string; orcid: string; twitter: string }
}

const BLANK: FormState = {
  name: "", position: "", department: "", email: "", biography: "", order: "99",
  education: [], workExperience: [], research: [], consultancy: [], volunteerWork: [],
  socialLinks: { linkedin: "", researchgate: "", orcid: "", twitter: "" },
}

/* ─────────────────────────────────────────────────────────────────
   SMALL UI PRIMITIVES
───────────────────────────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-bold tracking-[.14em] uppercase text-[#0B1F3A] mb-1">
      {children}
    </label>
  )
}
function Input({ className = "", ...p }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...p}
      className={`w-full rounded-lg border border-[#DDD8CF] bg-white px-3 py-2 text-[13px] text-[#0B1F3A]
        placeholder:text-[#9CA3AF] focus:border-[#B8941A] focus:outline-none focus:ring-1 focus:ring-[#B8941A]/30 ${className}`}
    />
  )
}
function Textarea({ className = "", ...p }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...p}
      className={`w-full rounded-lg border border-[#DDD8CF] bg-white px-3 py-2 text-[13px] text-[#0B1F3A]
        placeholder:text-[#9CA3AF] focus:border-[#B8941A] focus:outline-none focus:ring-1 focus:ring-[#B8941A]/30 resize-none ${className}`}
    />
  )
}
function Select({ className = "", ...p }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...p}
      className={`w-full rounded-lg border border-[#DDD8CF] bg-white px-3 py-2 text-[13px] text-[#0B1F3A]
        focus:border-[#B8941A] focus:outline-none focus:ring-1 focus:ring-[#B8941A]/30 ${className}`}
    />
  )
}

function FormSection({
  icon, title, children, count,
}: { icon: React.ReactNode; title: string; children: React.ReactNode; count?: number }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-[#E8E3DA] rounded-xl overflow-hidden">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-3.5 bg-[#F7F3EC] hover:bg-[#EDE8DF] transition-colors text-left">
        <span className="text-[#B8941A]">{icon}</span>
        <span className="flex-1 text-[11px] font-bold tracking-[.18em] uppercase text-[#0B1F3A]">{title}</span>
        {!!count && count > 0 && (
          <span className="text-[10px] bg-[#0B1F3A] text-white rounded-full px-2 py-0.5">{count}</span>
        )}
        {open
          ? <ChevronUp size={14} className="text-[#5A6E84]" />
          : <ChevronDown size={14} className="text-[#5A6E84]" />}
      </button>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  )
}
function AddRowBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick}
      className="flex items-center gap-2 text-[11px] font-bold tracking-[.14em] uppercase text-[#B8941A] hover:text-[#0B1F3A] transition-colors">
      <Plus size={13} /> {label}
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────
   IMAGE UPLOADER — uses useUploadThing hook
───────────────────────────────────────────────────────────────── */
function ImageUploader({
  preview,
  onUploadComplete,
  onUploadError,
}: {
  preview: string | null
  onUploadComplete: (url: string, key: string) => void
  onUploadError: (msg: string) => void
}) {
  const { startUpload, isUploading } = useUploadThing("leadershipImage", {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        /* UploadThing returns ufsUrl (the CDN url) and key */
        onUploadComplete(res[0].ufsUrl, res[0].key)
      }
    },
    onUploadError: (err) => {
      onUploadError(err.message ?? "Upload failed")
    },
  })

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 4 * 1024 * 1024) { onUploadError("Image must be under 4 MB"); return }
    startUpload([file])
  }

  return (
    <div>
      <Label>Profile Photo</Label>
      <label
        className={`relative flex flex-col items-center justify-center h-44 rounded-xl border-2 border-dashed transition-colors cursor-pointer
          ${isUploading
            ? "border-[#B8941A] bg-[#FBF8F2]"
            : "border-[#DDD8CF] hover:border-[#B8941A] hover:bg-[#FBF8F2]"}`}
      >
        {preview ? (
          <>
            <Image src={preview} alt="Profile preview" fill className="object-cover rounded-xl" />
            <div className="absolute inset-0 bg-[#0B1F3A]/50 rounded-xl flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity gap-2">
              <Upload size={20} className="text-white" />
              <span className="text-white text-[11px] font-bold tracking-widest uppercase">Replace Photo</span>
            </div>
          </>
        ) : isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={26} className="animate-spin text-[#B8941A]" />
            <p className="text-[12px] text-[#B8941A] font-medium">Uploading to UploadThing…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#9CA3AF]">
            <div className="w-12 h-12 rounded-full bg-[#F0EBE0] flex items-center justify-center">
              <Upload size={20} className="text-[#B8941A]" />
            </div>
            <p className="text-[13px] font-medium text-[#5A6E84]">Click to upload photo</p>
            <p className="text-[11px]">JPEG, PNG, WebP — max 4 MB</p>
          </div>
        )}
        <input type="file" accept="image/*" className="sr-only" onChange={handleFile} disabled={isUploading} />
      </label>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   CONFIRM DELETE DIALOG
───────────────────────────────────────────────────────────────── */
function ConfirmDialog({
  name, onConfirm, onCancel,
}: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#0B1F3A]/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-full bg-red-50 shrink-0">
            <AlertTriangle size={20} className="text-[#be123c]" />
          </div>
          <h3 className="font-bold text-[#0B1F3A] text-[15px]">Delete Leader</h3>
        </div>
        <p className="text-[13px] text-[#5A6E84] mb-7 leading-[1.65]">
          Permanently delete{" "}
          <span className="font-semibold text-[#0B1F3A]">{name}</span>?
          Their profile photo will also be removed from UploadThing. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 rounded-xl border border-[#DDD8CF] py-2.5 text-[12px] font-semibold text-[#5A6E84] hover:bg-[#F7F3EC] transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 rounded-xl bg-[#be123c] py-2.5 text-[12px] font-bold text-white hover:bg-[#9f1239] transition-colors">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   LEADER LIST ROW
───────────────────────────────────────────────────────────────── */
function LeaderRow({ leader, onDelete }: { leader: Leader; onDelete: (l: Leader) => void }) {
  return (
    <div className="flex items-center gap-4 bg-white border border-[#E8E3DA] rounded-2xl p-4 hover:shadow-md hover:border-[#D4C9A8] transition-all duration-200">
      <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-[#E8E3DA] shrink-0 bg-[#F7F3EC]">
        {leader.image ? (
          <Image src={leader.image} alt={leader.name} fill className="object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <User size={20} className="text-[#C4B99A]" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold tracking-[.2em] uppercase text-[#B8941A] mb-0.5">{leader.position}</p>
        <p className="font-bold text-[#0B1F3A] text-[14px] truncate"
          style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
          {leader.name}
        </p>
        {leader.department && (
          <p className="text-[11px] text-[#7A8FA6]">{leader.department}</p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] bg-[#F0EBE0] text-[#B8941A] font-semibold px-2.5 py-1 rounded-full">
          #{leader.order}
        </span>
        {leader.image && (
          <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 size={10} /> Photo
          </span>
        )}
        <button onClick={() => onDelete(leader)}
          className="p-2 rounded-xl text-[#C4B99A] hover:text-[#be123c] hover:bg-red-50 transition-colors"
          aria-label={`Delete ${leader.name}`}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
export default function AdminLeadershipPage() {
  const [leaders, setLeaders]           = useState<Leader[]>([])
  const [loading, setLoading]           = useState(true)
  const [panelOpen, setPanelOpen]       = useState(false)
  const [form, setForm]                 = useState<FormState>(BLANK)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageUrl, setImageUrl]         = useState("")
  const [imageKey, setImageKey]         = useState("")
  const [submitting, setSubmitting]     = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [success, setSuccess]           = useState<string | null>(null)
  const [toDelete, setToDelete]         = useState<Leader | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  /* ── Fetch ── */
  async function fetchLeaders() {
    setLoading(true)
    try {
      const res  = await fetch("/api/leadership")
      const json = await res.json()
      if (json.success) setLeaders(json.data)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { fetchLeaders() }, [])

  /* ── UploadThing callbacks ── */
  function handleUploadComplete(url: string, key: string) {
    setImageUrl(url)
    setImageKey(key)
    setImagePreview(url)
    setError(null)
  }

  /* ── Submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.position || !form.biography) {
      setError("Name, position, and biography are required.")
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const payload = {
        ...form,
        order:    parseInt(form.order, 10) || 99,
        image:    imageUrl    || undefined,
        imageKey: imageKey    || undefined,
      }
      const res  = await fetch("/api/leadership", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message)

      setForm(BLANK)
      setImagePreview(null)
      setImageUrl("")
      setImageKey("")
      setPanelOpen(false)
      setSuccess(`${form.name} added successfully.`)
      setTimeout(() => setSuccess(null), 4000)
      await fetchLeaders()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Delete ── */
  async function confirmDelete() {
    if (!toDelete) return
    setDeleteLoading(true)
    try {
      const res  = await fetch(`/api/leadership/${toDelete._id}`, { method: "DELETE" })
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      setToDelete(null)
      setSuccess("Leader deleted successfully.")
      setTimeout(() => setSuccess(null), 4000)
      await fetchLeaders()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
      setToDelete(null)
    } finally {
      setDeleteLoading(false)
    }
  }

  /* ── Array helpers ── */
  function addRow<T>(key: keyof FormState, blank: T) {
    setForm(f => ({ ...f, [key]: [...(f[key] as T[]), blank] }))
  }
  function removeRow(key: keyof FormState, idx: number) {
    setForm(f => ({ ...f, [key]: (f[key] as unknown[]).filter((_, i) => i !== idx) }))
  }
  function updateRow<T>(key: keyof FormState, idx: number, field: keyof T, value: string) {
    setForm(f => {
      const arr = [...(f[key] as T[])]
      arr[idx]  = { ...arr[idx], [field]: value }
      return { ...f, [key]: arr }
    })
  }

  function openPanel() {
    setForm(BLANK)
    setImagePreview(null)
    setImageUrl("")
    setImageKey("")
    setError(null)
    setPanelOpen(true)
  }

  /* ─────────────── RENDER ─────────────── */
  return (
    <div className="min-h-screen bg-[#F7F3EC]">

      {/* ── Page header ── */}
      <div className="bg-[#0B1F3A] px-6 sm:px-10 py-8 sticky top-0 z-30 shadow-lg">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[.22em] uppercase text-[#B8941A] mb-1">Admin · ZiSSA</p>
            <h1 className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
              Leadership Management
            </h1>
          </div>
          <button onClick={openPanel}
            className="flex items-center gap-2 bg-[#B8941A] hover:bg-[#C9A84C] text-white text-[11px] font-bold tracking-[.14em] uppercase px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-[#B8941A]/30">
            <Plus size={15} /> Add Leader
          </button>
        </div>
      </div>

      {/* ── Toast notifications ── */}
      {success && (
        <div className="mx-auto max-w-5xl px-6 sm:px-10 mt-5">
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <p className="text-[13px] text-green-700 font-medium">{success}</p>
          </div>
        </div>
      )}

      {/* ── Leader list ── */}
      <div className="mx-auto max-w-5xl px-6 sm:px-10 py-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[12px] font-semibold text-[#7A8FA6] tracking-wide">
            {loading ? "Loading…" : `${leaders.length} leader${leaders.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-[86px] bg-white border border-[#E8E3DA] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : leaders.length === 0 ? (
          <div className="text-center py-28 border-2 border-dashed border-[#DDD8CF] rounded-2xl">
            <div className="text-5xl mb-4 opacity-20" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>Σ</div>
            <p className="text-[#7A8FA6] mb-3">No leaders added yet.</p>
            <button onClick={openPanel} className="text-[#B8941A] text-[13px] font-bold underline underline-offset-2">
              Add the first one
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {leaders.map(l => (
              <LeaderRow key={l._id} leader={l} onDelete={setToDelete} />
            ))}
          </div>
        )}
      </div>

      {/* ── Slide-in drawer ── */}
      {panelOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-[#0B1F3A]/50 backdrop-blur-sm" onClick={() => setPanelOpen(false)} />

          <div className="relative z-10 w-full max-w-2xl bg-white shadow-2xl flex flex-col h-full overflow-hidden">

            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 bg-[#0B1F3A] shrink-0">
              <div>
                <p className="text-[10px] font-bold tracking-[.2em] uppercase text-[#B8941A] mb-0.5">New Entry</p>
                <h2 className="text-white font-bold text-[18px]"
                  style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
                  Add Leader
                </h2>
              </div>
              <button onClick={() => setPanelOpen(false)}
                className="p-2 rounded-xl border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mx-5 mt-4 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 shrink-0">
                <AlertTriangle size={14} className="text-[#be123c] shrink-0" />
                <p className="text-[12px] text-[#be123c] flex-1">{error}</p>
                <button onClick={() => setError(null)} className="text-[#be123c] hover:text-[#9f1239]">
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Form body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">

              {/* ── Image ── */}
              <ImageUploader
                preview={imagePreview}
                onUploadComplete={handleUploadComplete}
                onUploadError={(msg) => setError(msg)}
              />
              {imageKey && (
                <p className="text-[11px] text-green-600 flex items-center gap-1.5 -mt-2">
                  <CheckCircle2 size={12} /> Uploaded to UploadThing
                </p>
              )}

              {/* ── Basic Info ── */}
              <FormSection icon={<User size={15} />} title="Basic Information">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label>Full Name *</Label>
                    <Input placeholder="e.g. Dr. Alice Moyo" value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Position *</Label>
                    <Input placeholder="e.g. President" value={form.position}
                      onChange={e => setForm(f => ({ ...f, position: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Input placeholder="e.g. Executive Committee" value={form.department}
                      onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="name@zissa.org.zw" value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Display Order</Label>
                    <Input type="number" min="1" placeholder="1" value={form.order}
                      onChange={e => setForm(f => ({ ...f, order: e.target.value }))} />
                  </div>
                  <div className="col-span-2">
                    <Label>Biography *</Label>
                    <Textarea rows={4} placeholder="Short professional biography…" value={form.biography}
                      onChange={e => setForm(f => ({ ...f, biography: e.target.value }))} />
                  </div>
                </div>
              </FormSection>

              {/* ── Education ── */}
              <FormSection icon={<GraduationCap size={15} />} title="Education" count={form.education.length}>
                {form.education.map((edu, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 p-3 bg-[#F7F3EC] rounded-xl relative pr-8">
                    <button type="button" onClick={() => removeRow("education", i)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-lg text-[#9CA3AF] hover:text-[#be123c] hover:bg-red-50 transition-colors">
                      <X size={12} />
                    </button>
                    <div className="col-span-2">
                      <Label>Degree</Label>
                      <Input placeholder="e.g. PhD Statistics" value={edu.degree}
                        onChange={e => updateRow<typeof edu>("education", i, "degree", e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <Label>Institution</Label>
                      <Input placeholder="e.g. University of Zimbabwe" value={edu.institution}
                        onChange={e => updateRow<typeof edu>("education", i, "institution", e.target.value)} />
                    </div>
                    <div>
                      <Label>Year</Label>
                      <Input placeholder="2001" value={edu.year}
                        onChange={e => updateRow<typeof edu>("education", i, "year", e.target.value)} />
                    </div>
                    <div>
                      <Label>Honours</Label>
                      <Input placeholder="e.g. First Class" value={edu.honours}
                        onChange={e => updateRow<typeof edu>("education", i, "honours", e.target.value)} />
                    </div>
                  </div>
                ))}
                <AddRowBtn label="Add Education"
                  onClick={() => addRow("education", { degree: "", institution: "", year: "", honours: "" })} />
              </FormSection>

              {/* ── Work Experience ── */}
              <FormSection icon={<Briefcase size={15} />} title="Work Experience" count={form.workExperience.length}>
                {form.workExperience.map((w, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 p-3 bg-[#F7F3EC] rounded-xl relative pr-8">
                    <button type="button" onClick={() => removeRow("workExperience", i)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-lg text-[#9CA3AF] hover:text-[#be123c] hover:bg-red-50 transition-colors">
                      <X size={12} />
                    </button>
                    <div>
                      <Label>Title</Label>
                      <Input placeholder="e.g. Director General" value={w.title}
                        onChange={e => updateRow<typeof w>("workExperience", i, "title", e.target.value)} />
                    </div>
                    <div>
                      <Label>Organisation</Label>
                      <Input placeholder="e.g. ZIMSTAT" value={w.organisation}
                        onChange={e => updateRow<typeof w>("workExperience", i, "organisation", e.target.value)} />
                    </div>
                    <div>
                      <Label>Period</Label>
                      <Input placeholder="2015 – 2022" value={w.period}
                        onChange={e => updateRow<typeof w>("workExperience", i, "period", e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <Label>Description</Label>
                      <Textarea rows={2} placeholder="Brief description…" value={w.description}
                        onChange={e => updateRow<typeof w>("workExperience", i, "description", e.target.value)} />
                    </div>
                  </div>
                ))}
                <AddRowBtn label="Add Role"
                  onClick={() => addRow("workExperience", { title: "", organisation: "", period: "", description: "" })} />
              </FormSection>

              {/* ── Research ── */}
              <FormSection icon={<FlaskConical size={15} />} title="Research & Publications" count={form.research.length}>
                {form.research.map((r, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 p-3 bg-[#F7F3EC] rounded-xl relative pr-8">
                    <button type="button" onClick={() => removeRow("research", i)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-lg text-[#9CA3AF] hover:text-[#be123c] hover:bg-red-50 transition-colors">
                      <X size={12} />
                    </button>
                    <div className="col-span-2">
                      <Label>Title</Label>
                      <Input placeholder="Paper / project title" value={r.title}
                        onChange={e => updateRow<typeof r>("research", i, "title", e.target.value)} />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select value={r.type}
                        onChange={e => updateRow<typeof r>("research", i, "type", e.target.value)}>
                        <option value="publication">Publication</option>
                        <option value="project">Project</option>
                        <option value="conference">Conference</option>
                      </Select>
                    </div>
                    <div>
                      <Label>Year</Label>
                      <Input placeholder="2021" value={r.year}
                        onChange={e => updateRow<typeof r>("research", i, "year", e.target.value)} />
                    </div>
                    <div>
                      <Label>Journal / Venue</Label>
                      <Input placeholder="e.g. African Statistical Journal" value={r.journal}
                        onChange={e => updateRow<typeof r>("research", i, "journal", e.target.value)} />
                    </div>
                    <div>
                      <Label>DOI</Label>
                      <Input placeholder="10.xxxx/…" value={r.doi}
                        onChange={e => updateRow<typeof r>("research", i, "doi", e.target.value)} />
                    </div>
                  </div>
                ))}
                <AddRowBtn label="Add Research"
                  onClick={() => addRow("research", { title: "", journal: "", year: "", doi: "", type: "publication" as ResearchType })} />
              </FormSection>

              {/* ── Consultancy ── */}
              <FormSection icon={<Handshake size={15} />} title="Consultancy" count={form.consultancy.length}>
                {form.consultancy.map((c, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 p-3 bg-[#F7F3EC] rounded-xl relative pr-8">
                    <button type="button" onClick={() => removeRow("consultancy", i)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-lg text-[#9CA3AF] hover:text-[#be123c] hover:bg-red-50 transition-colors">
                      <X size={12} />
                    </button>
                    <div className="col-span-2">
                      <Label>Project</Label>
                      <Input placeholder="e.g. National Household Survey" value={c.project}
                        onChange={e => updateRow<typeof c>("consultancy", i, "project", e.target.value)} />
                    </div>
                    <div>
                      <Label>Client</Label>
                      <Input placeholder="e.g. World Bank" value={c.client}
                        onChange={e => updateRow<typeof c>("consultancy", i, "client", e.target.value)} />
                    </div>
                    <div>
                      <Label>Period</Label>
                      <Input placeholder="2020" value={c.period}
                        onChange={e => updateRow<typeof c>("consultancy", i, "period", e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <Label>Description</Label>
                      <Textarea rows={2} value={c.description}
                        onChange={e => updateRow<typeof c>("consultancy", i, "description", e.target.value)} />
                    </div>
                  </div>
                ))}
                <AddRowBtn label="Add Consultancy"
                  onClick={() => addRow("consultancy", { project: "", client: "", period: "", description: "" })} />
              </FormSection>

              {/* ── Volunteer Work ── */}
              <FormSection icon={<Heart size={15} />} title="Volunteer Work" count={form.volunteerWork.length}>
                {form.volunteerWork.map((v, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 p-3 bg-[#F7F3EC] rounded-xl relative pr-8">
                    <button type="button" onClick={() => removeRow("volunteerWork", i)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-lg text-[#9CA3AF] hover:text-[#be123c] hover:bg-red-50 transition-colors">
                      <X size={12} />
                    </button>
                    <div>
                      <Label>Role</Label>
                      <Input placeholder="e.g. Board Trustee" value={v.role}
                        onChange={e => updateRow<typeof v>("volunteerWork", i, "role", e.target.value)} />
                    </div>
                    <div>
                      <Label>Organisation</Label>
                      <Input placeholder="e.g. ISI" value={v.organisation}
                        onChange={e => updateRow<typeof v>("volunteerWork", i, "organisation", e.target.value)} />
                    </div>
                    <div>
                      <Label>Period</Label>
                      <Input placeholder="2018 – present" value={v.period}
                        onChange={e => updateRow<typeof v>("volunteerWork", i, "period", e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <Label>Description</Label>
                      <Textarea rows={2} value={v.description}
                        onChange={e => updateRow<typeof v>("volunteerWork", i, "description", e.target.value)} />
                    </div>
                  </div>
                ))}
                <AddRowBtn label="Add Volunteer Role"
                  onClick={() => addRow("volunteerWork", { role: "", organisation: "", period: "", description: "" })} />
              </FormSection>

              {/* ── Social Links ── */}
              <FormSection icon={<LinkIcon size={15} />} title="Social Links">
                <div className="grid grid-cols-2 gap-3">
                  {(["linkedin", "researchgate", "orcid", "twitter"] as const).map(key => (
                    <div key={key}>
                      <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                      <Input placeholder={`https://${key}.com/…`} value={form.socialLinks[key]}
                        onChange={e => setForm(f => ({ ...f, socialLinks: { ...f.socialLinks, [key]: e.target.value } }))} />
                    </div>
                  ))}
                </div>
              </FormSection>

              {/* ── Submit ── */}
              <div className="pb-8 pt-2">
                <button type="submit" disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#0B1F3A] hover:bg-[#B8941A] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-[12px] tracking-[.14em] uppercase py-4 rounded-xl transition-colors duration-300 shadow-lg shadow-[#0B1F3A]/20">
                  {submitting
                    ? <><Loader2 size={15} className="animate-spin" /> Saving…</>
                    : "Save Leader"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ── Confirm delete ── */}
      {toDelete && (
        <ConfirmDialog
          name={toDelete.name}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
      {deleteLoading && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0B1F3A]/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-2xl">
            <Loader2 size={22} className="animate-spin text-[#B8941A]" />
            <p className="text-[13px] font-medium text-[#0B1F3A]">Deleting leader and photo…</p>
          </div>
        </div>
      )}

    </div>
  )
}
