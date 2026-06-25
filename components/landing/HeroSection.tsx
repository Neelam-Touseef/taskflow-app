'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const floatingCards = [
  {
    id: 1,
    title: 'Design system review',
    priority: 'high',
    category: 'Work',
    done: false,
    rotate: '-6deg',
    x: '-10%',
    y: '5%',
    delay: 0,
  },
  {
    id: 2,
    title: 'Update project docs',
    priority: 'medium',
    category: 'Work',
    done: true,
    rotate: '3deg',
    x: '5%',
    y: '0%',
    delay: 0.1,
  },
  {
    id: 3,
    title: 'Morning workout',
    priority: 'low',
    category: 'Health',
    done: true,
    rotate: '8deg',
    x: '20%',
    y: '10%',
    delay: 0.2,
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/30 dark:via-background dark:to-violet-950/30" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/30 dark:bg-violet-900/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                Smart Task Management
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight tracking-tight">
                Manage tasks with{' '}
                <span className="gradient-text">clarity</span>{' '}
                and{' '}
                <span className="gradient-text">speed</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                TaskFlow helps you stay on top of your work with smart organization, priority management, and a beautiful interface that makes productivity effortless.
              </p>
            </motion.div>

            {/* Features list */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              {[
                'Drag-and-drop task organization',
                'Smart priority management',
                'Calendar deadline view',
                'Dark mode & responsive design',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup">
                <Button variant="gradient" size="xl" className="gap-2 w-full sm:w-auto">
                  Get started for free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Sign in to your account
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xs text-muted-foreground"
            >
              No credit card required · Free forever · Setup in 60 seconds
            </motion.p>
          </div>

          {/* Right — floating task cards */}
          <div className="relative hidden lg:block h-[500px]">
            {floatingCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40, rotate: card.rotate }}
                animate={{ opacity: 1, y: 0, rotate: card.rotate }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + index * 0.15,
                  type: 'spring',
                  stiffness: 100,
                }}
                style={{
                  position: 'absolute',
                  top: `${20 + index * 22}%`,
                  left: `${10 + index * 15}%`,
                  rotate: card.rotate,
                  zIndex: index,
                }}
                className="w-72 p-4 bg-card border border-border rounded-2xl shadow-xl"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 ${card.done ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                    {card.done && <CheckCircle2 className="w-3 h-3 text-white m-auto" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${card.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {card.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        card.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                        : card.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {card.priority}
                      </span>
                      <span className="text-xs text-muted-foreground">{card.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Glowing orb behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-violet-400/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
