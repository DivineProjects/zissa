import { Button } from "@/components/ui/button"
import SlideInSection from "@/components/SlideInSection"
import { Card, CardContent } from "@/components/ui/card"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"


export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Stats />
      

      {/* ABOUT */}
      <section className="py-24 bg-light">
        <div className="container mx-auto px-6">
          <SlideInSection direction="right">
            <h2 className="text-2xl md:text-3xl font-semibold">
              About the Statistical Society
            </h2>

            <p className="mt-6 max-w-3xl text-dark leading-relaxed">
              We are a nationally recognized professional body dedicated to
              promoting the theory, application, and ethical practice of
              statistics across academia, industry, and government.
            </p>
          </SlideInSection>
        </div>
      </section>

      {/* MISSION, VISION, VALUES */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          
          {[
            { title: "Mission", text: "Promote excellence in statistical practice." },
            { title: "Vision", text: "A society guided by data-driven decision making." },
            { title: "Values", text: "Integrity, rigor, professionalism, impact." },
          ].map((item, i) => (
            <SlideInSection key={i} direction={i % 2 === 0 ? "left" : "right"}>
              <Card className="bg-light shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-dark">{item.text}</p>
                </CardContent>
              </Card>
            </SlideInSection>
          ))}

        </div>
      </section>

      
      <section className="py-24 bg-dark text-light text-center">
        <SlideInSection>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Join the Professional Statistical Community
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-secondary">
            Membership grants access to professional accreditation, research,
            conferences, and policy influence.
          </p>

          <Button className="mt-8 bg-primary hover:bg-secondary">
            Apply for Membership
          </Button>
        </SlideInSection>
      </section>


      <footer className="bg-dark text-secondary py-10 text-center">
        © 2026 ZiSSA. All rights reserved.
      </footer>

    </main>
    
  )
}
