"use client"

import { useForm, type Control } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import {
  membershipSchema,
  MembershipFormData,
} from "@/lib/validators/membership"

export default function JoinPage() {
  const form = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      qualification: "",
      institution: "",
    },
  })

  function onSubmit(data: MembershipFormData) {
    console.log("Membership application:", data)
    alert("Application submitted (demo)")
  }

  return (
    <main className="min-h-screen bg-[#e7f0fa] pt-32 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-[#0d2440]">
            Membership Application
          </h1>
          <p className="mt-4 text-[#2e5e99]">
            Apply to become a member of the professional statistical body.
          </p>
        </header>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 rounded-xl bg-white p-8 shadow-sm"
          >

            {/* Personal Details */}
            <Section title="Personal Information">
              <TwoCol>
                <InputField
                  control={form.control}
                  name="firstName"
                  label="First Name"
                />
                <InputField
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                />
              </TwoCol>

              <TwoCol>
                <InputField
                  control={form.control}
                  name="email"
                  label="Email Address"
                />
                <InputField
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                />
              </TwoCol>
            </Section>

            {/* Professional Details */}
            <Section title="Professional Information">
              <InputField
                control={form.control}
                name="qualification"
                label="Highest Qualification"
              />
              <InputField
                control={form.control}
                name="institution"
                label="Institution"
              />
            </Section>

            {/* Membership Type */}
            <Section title="Membership Category">
              <FormField
                control={form.control}
                name="membershipType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Membership Type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select membership type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="associate">Associate</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="fellow">Fellow</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Section>

            {/* Declaration */}
            <FormField
              control={form.control}
              name="declaration"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={(val) => field.onChange(Boolean(val))}
                    />
                  </FormControl>
                  <div>
                    <FormLabel>
                      I declare that the information provided is true and correct.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-[#2e5e99] hover:bg-[#7ba4d0]"
            >
              Submit Application
            </Button>

          </form>
        </Form>
      </div>
    </main>
  )
}


function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[#0d2440]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {children}
    </div>
  )
}

function InputField({
  control,
  name,
  label,
}: {
  control: Control<MembershipFormData>
  name: keyof MembershipFormData
  label: string
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              value={(field.value ?? "") as string}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
