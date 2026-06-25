'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Zap,
  CheckCircle2,
  Calendar,
  Search,
  Moon,
  Smartphone,
  GripVertical,
  Shield,
} from 'lucide-react'

const features = [
  {
    icon: CheckCircle2,
    title: 'Smart Task Management',
    description: 'Create, organize, and track tasks with priority levels, categories, and due dates. Never miss a deadline again.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950',
  },
  {
    icon: GripVertical,
    title: 'Drag & Drop Ordering',
    description: 'Reorder your tasks with intuitive drag-and-drop. Organize your workflow exactly the way you think.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-950',
  },
  {
    icon: Calendar,
    title: 'Calendar View',
    description: 'See all your upcoming deadlines in a beautiful monthly calendar. Click any day to see tasks due.',
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950',
  },
  {
    icon: Search,
    title: 'Powerful Filters',
    description: 'Quickly find tasks with full-text search, filter by priority, status, and category simultaneously.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    icon: Moon,
    title: 'Dark Mode',
    description: 'Beautiful dark and light themes that follow your system preference or can be toggled manually.',
    color: 'text-slate-500',
    bg: 'bg-slate-50 dark:bg-slate-900',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description: 'Works flawlessly on desktop, tablet, and mobile. Take your tasks with you anywhere.',
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-950',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Powered by Supabase with Row Level Security. Your data stays private — only you can access your tasks.',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Next.js App Router and React Server Components for instant page loads and smooth animations.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-950',
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <Zap className="h-3.5 w-3.5" />
            Powerful features
          </span>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything you need to{' '}
            <span className="gradient-text">stay productive</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            TaskFlow packs all the tools modern professionals need into a clean, intuitive interface that stays out of your way.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group p-6 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
