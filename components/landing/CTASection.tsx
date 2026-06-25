'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mx-auto">
            <Zap className="h-8 w-8 text-white" />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Start managing tasks smarter today
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Join thousands of productive teams and individuals who use TaskFlow to ship faster, stay organized, and do their best work.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button
                size="xl"
                className="bg-white text-indigo-700 hover:bg-white/90 font-semibold gap-2 shadow-xl w-full sm:w-auto"
              >
                Get started — it&apos;s free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="xl"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
              >
                I already have an account
              </Button>
            </Link>
          </div>

          <p className="text-white/50 text-sm">
            No credit card required · Free forever for personal use · Takes 60 seconds to set up
          </p>
        </motion.div>
      </div>
    </section>
  )
}
