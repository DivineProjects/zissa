import mongoose, { Schema, Document, Model } from "mongoose"

/* ─────────────────────────────────────────
   Sub-document interfaces
───────────────────────────────────────── */
export interface IEducation {
  degree: string        // e.g. "PhD Statistics"
  institution: string   // e.g. "University of Zimbabwe"
  year: string          // e.g. "2005"
  honours?: string      // e.g. "With Distinction"
}

export interface IExperience {
  title: string         // e.g. "Senior Statistician"
  organisation: string  // e.g. "ZIMSTAT"
  period: string        // e.g. "2010 – 2016"
  description?: string
}

export interface IResearch {
  title: string         // e.g. "Bayesian Methods in Survey Sampling"
  journal?: string      // e.g. "African Statistical Journal"
  year?: string
  doi?: string
  type: "publication" | "project" | "conference"
}

export interface IConsultancy {
  project: string       // e.g. "National Household Survey 2022"
  client: string        // e.g. "World Bank"
  period?: string
  description?: string
}

export interface IVolunteer {
  role: string          // e.g. "Board Trustee"
  organisation: string  // e.g. "African Statistical Institute"
  period?: string
  description?: string
}

/* ─────────────────────────────────────────
   Main interface
───────────────────────────────────────── */
export interface ILeadership extends Document {
  name: string
  position: string          // e.g. "President"
  department?: string       // e.g. "Executive Committee"
  image?: string            // URL or path
  email?: string
  biography: string         // Short professional biography paragraph
  education: IEducation[]
  workExperience: IExperience[]
  research: IResearch[]
  consultancy: IConsultancy[]
  volunteerWork: IVolunteer[]
  order: number             // controls display order on page
  isActive: boolean
  socialLinks?: {
    linkedin?: string
    researchgate?: string
    orcid?: string
    twitter?: string
  }
  createdAt: Date
  updatedAt: Date
}

/* ─────────────────────────────────────────
   Sub-document schemas (no _id needed)
───────────────────────────────────────── */
const EducationSchema = new Schema<IEducation>(
  {
    degree:      { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    year:        { type: String, required: true, trim: true },
    honours:     { type: String, trim: true },
  },
  { _id: false }
)

const ExperienceSchema = new Schema<IExperience>(
  {
    title:        { type: String, required: true, trim: true },
    organisation: { type: String, required: true, trim: true },
    period:       { type: String, required: true, trim: true },
    description:  { type: String, trim: true },
  },
  { _id: false }
)

const ResearchSchema = new Schema<IResearch>(
  {
    title:   { type: String, required: true, trim: true },
    journal: { type: String, trim: true },
    year:    { type: String, trim: true },
    doi:     { type: String, trim: true },
    type:    { type: String, enum: ["publication", "project", "conference"], default: "publication" },
  },
  { _id: false }
)

const ConsultancySchema = new Schema<IConsultancy>(
  {
    project:     { type: String, required: true, trim: true },
    client:      { type: String, required: true, trim: true },
    period:      { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false }
)

const VolunteerSchema = new Schema<IVolunteer>(
  {
    role:         { type: String, required: true, trim: true },
    organisation: { type: String, required: true, trim: true },
    period:       { type: String, trim: true },
    description:  { type: String, trim: true },
  },
  { _id: false }
)

/* ─────────────────────────────────────────
   Main schema
───────────────────────────────────────── */
const LeadershipSchema = new Schema<ILeadership>(
  {
    name:      { type: String, required: true, trim: true },
    position:  { type: String, required: true, trim: true },
    department:{ type: String, trim: true },
    image:     { type: String, trim: true },
    email:     { type: String, trim: true, lowercase: true },
    biography: { type: String, required: true, trim: true },

    education:      { type: [EducationSchema],  default: [] },
    workExperience: { type: [ExperienceSchema], default: [] },
    research:       { type: [ResearchSchema],   default: [] },
    consultancy:    { type: [ConsultancySchema], default: [] },
    volunteerWork:  { type: [VolunteerSchema],  default: [] },

    order:    { type: Number, default: 99 },
    isActive: { type: Boolean, default: true },

    socialLinks: {
      linkedin:    { type: String },
      researchgate:{ type: String },
      orcid:       { type: String },
      twitter:     { type: String },
    },
  },
  {
    timestamps: true,
    collection: "leadership",
  }
)

/* Prevent model re-compilation in hot-reload (Next.js dev) */
const Leadership: Model<ILeadership> =
  mongoose.models.Leadership ||
  mongoose.model<ILeadership>("Leadership", LeadershipSchema)

export default Leadership