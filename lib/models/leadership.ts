import mongoose, { Schema, Document, Model } from "mongoose"

/* ─────────────────────────────────────────
   Sub-document interfaces
───────────────────────────────────────── */
export interface IEducation {
  degree: string
  institution: string
  year: string
  honours?: string
}

export interface IExperience {
  title: string
  organisation: string
  period: string
  description?: string
}

export interface IResearch {
  title: string
  journal?: string
  year?: string
  doi?: string
  type: "publication" | "project" | "conference"
}

export interface IConsultancy {
  project: string
  client: string
  period?: string
  description?: string
}

export interface IVolunteer {
  role: string
  organisation: string
  period?: string
  description?: string
}

/* ─────────────────────────────────────────
   Main interface
───────────────────────────────────────── */
export interface ILeadership extends Document {
  name: string
  position: string
  department?: string
  image?: string       /* UploadThing file URL  (ufsUrl) */
  imageKey?: string    /* UploadThing file key  — used for deletion via UTApi */
  email?: string
  biography: string
  education: IEducation[]
  workExperience: IExperience[]
  research: IResearch[]
  consultancy: IConsultancy[]
  volunteerWork: IVolunteer[]
  order: number
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
   Sub-document schemas
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
    name:       { type: String, required: true, trim: true },
    position:   { type: String, required: true, trim: true },
    department: { type: String, trim: true },
    image:      { type: String, trim: true },  /* UploadThing ufsUrl */
    imageKey:   { type: String, trim: true },  /* UploadThing file key */
    email:      { type: String, trim: true, lowercase: true },
    biography:  { type: String, required: true, trim: true },

    education:      { type: [EducationSchema],   default: [] },
    workExperience: { type: [ExperienceSchema],  default: [] },
    research:       { type: [ResearchSchema],    default: [] },
    consultancy:    { type: [ConsultancySchema], default: [] },
    volunteerWork:  { type: [VolunteerSchema],   default: [] },

    order:    { type: Number,  default: 99 },
    isActive: { type: Boolean, default: true },

    socialLinks: {
      linkedin:     { type: String },
      researchgate: { type: String },
      orcid:        { type: String },
      twitter:      { type: String },
    },
  },
  { timestamps: true, collection: "leadership" }
)

const Leadership: Model<ILeadership> =
  mongoose.models.Leadership ||
  mongoose.model<ILeadership>("Leadership", LeadershipSchema)

export default Leadership