import { Metadata } from 'next'
import { LandingHeader } from '@/components/landing/LandingHeader'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { CTASection } from '@/components/landing/CTASection'
import { Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TaskFlow — Smart Task Manager',
  description:
    'TaskFlow helps you manage tasks with clarity and speed. Smart organization, priority management, and a beautiful interface.',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />

      {/* Testimonials / social proof */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Loved by productive people
            </h2>
            <p className="text-muted-foreground">Here&apos;s what our users say about TaskFlow</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "TaskFlow completely changed how I manage my projects. The drag-and-drop feature alone saves me 30 minutes a day.",
                name: "Sarah Chen",
                role: "Product Manager",
                avatar: "#6366f1",
                initials: "SC",
              },
              {
                quote: "Finally a task manager that looks as good as it works. The dark mode and animations are chef's kiss.",
                name: "Marcus Rivera",
                role: "UX Designer",
                avatar: "#8b5cf6",
                initials: "MR",
              },
              {
                quote: "I tried every task app out there. TaskFlow is the only one that stuck. Simple, fast, and actually fun to use.",
                name: "Priya Patel",
                role: "Software Engineer",
                avatar: "#06b6d4",
                initials: "PP",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 bg-card border border-border rounded-2xl space-y-4 hover:shadow-md transition-shadow"
              >
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: testimonial.avatar }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-foreground">TaskFlow</span>
            </Link>

            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaskFlow. Built with Next.js & Supabase.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                <span className="text-muted-foreground font-normal">Developer:</span>
                Neelam Touseef
              </span>
              <div className="flex items-center gap-6">
                {['Privacy', 'Terms', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
