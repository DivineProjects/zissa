import { z } from "zod"

export const membershipSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),

  qualification: z.string().min(2, "Qualification is required"),
  institution: z.string().min(2, "Institution is required"),

  membershipType: z.enum([
    "student",
    "associate",
    "professional",
    "fellow",
  ]),

  declaration: z.literal(true, {
    message: "You must accept the declaration",
  }),
})

export type MembershipFormData = z.infer<typeof membershipSchema>
