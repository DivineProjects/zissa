
export function Hero() {
  return (
    <section className="relative bg-[#e7f0fa] pt-40 pb-28">
        
      <div className="mx-auto max-w-6xl px-6">
            <h1 className="max-w-3xl text-5xl font-bold leading-tight text-[#0d2440]">
            Advancing Excellence in Statistical Practice
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#2e5e99]">
            Promoting professional standards, ethical conduct, and
            continuous development for statisticians nationwide.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
            <a
                href="/membership/join"
                className="rounded-md bg-[#2e5e99] px-6 py-3 text-white hover:bg-[#7ba4d0]"
            >
                Become a Member
            </a>
            <a
                href="/standards"
                className="rounded-md border border-[#2e5e99] px-6 py-3 text-[#2e5e99] hover:bg-white"
            >
                Our Standards
            </a>
            </div>
      </div>
    </section>
  )
}
