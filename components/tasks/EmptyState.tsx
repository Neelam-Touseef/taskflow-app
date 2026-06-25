'use client'

import { motion } from 'framer-motion'
import { CheckSquare, Search } from 'lucide-react'
import { CreateTaskModal } from './CreateTaskModal'

interface EmptyStateProps {
  hasFilters?: boolean
}

export function EmptyState({ hasFilters = false }: EmptyStateProps) {
  if (hasFilters) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">No tasks match your filters</h3>
        <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-950 dark:to-violet-950 flex items-center justify-center mb-6 shadow-inner">
        <CheckSquare className="h-10 w-10 text-indigo-400" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No tasks yet</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">
        Create your first task to get started. Stay organized and productive!
      </p>
      <CreateTaskModal />
    </motion.div>
  )
}
