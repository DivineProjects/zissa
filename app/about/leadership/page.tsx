import Image from "next/image"

export default function LeadershipPage() {
  return (
    <main className="pt-32 px-6 bg-[#e7f0fa] min-h-screen">
      <div className="mx-auto max-w-6xl">
        
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-[#0d2440]">
            Leadership
          </h1>
          <p className="mt-4 max-w-2xl text-[#2e5e99]">
            Meet the leadership responsible for guiding the profession
            and upholding the highest statistical standards.
          </p>
        </header>

        {/* Leadership Grid */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <LeaderCard
            name="Dr. Alice Moyo"
            role="President"
            image="/leader-placeholder.png"
          />
          <LeaderCard
            name="Mr. Tendai Ncube"
            role="Vice President"
            image="/leader-placeholder.png"
          />
          <LeaderCard
            name="Ms. Rutendo Chirwa"
            role="Secretary General"
            image="/leader-placeholder.png"
          />
        </section>

      </div>
    </main>
  )
}

function LeaderCard({
  name,
  role,
  image,
}: {
  name: string
  role: string
  image: string
}) {
  return (
    <div className="rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <Image
        src={image}
        alt={name}
        width={400}
        height={400}
        className="h-64 w-full rounded-t-xl object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#0d2440]">
          {name}
        </h3>
        <p className="text-sm text-[#2e5e99]">
          {role}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus dignissim, nisi at facilisis placerat, velit
          elit suscipit massa.
        </p>
      </div>
    </div>
  )
}
