/* Serialisable plain-object versions used by pages and components
   (Mongoose Documents are stripped by .lean() / JSON serialisation) */

export interface Education {
  degree: string
  institution: string
  year: string
  honours?: string
}

export interface WorkExperience {
  title: string
  organisation: string
  period: string
  description?: string
}

export interface Research {
  title: string
  journal?: string
  year?: string
  doi?: string
  type: "publication" | "project" | "conference"
}

export interface Consultancy {
  project: string
  client: string
  period?: string
  description?: string
}

export interface VolunteerWork {
  role: string
  organisation: string
  period?: string
  description?: string
}

export interface SocialLinks {
  linkedin?: string
  researchgate?: string
  orcid?: string
  twitter?: string
}

export interface Leader {
  _id: string
  name: string
  position: string
  department?: string
  image?: string
  email?: string
  biography: string
  education: Education[]
  workExperience: WorkExperience[]
  research: Research[]
  consultancy: Consultancy[]
  volunteerWork: VolunteerWork[]
  order: number
  isActive: boolean
  socialLinks?: SocialLinks
  createdAt: string
  updatedAt: string
}