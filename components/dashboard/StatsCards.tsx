'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, AlertTriangle, ListTodo } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { DashboardStats } from '@/lib/types'

interface StatsCardsProps {
  stats: DashboardStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const completionRate = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0

  const cards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950',
      description: 'All your tasks',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-950',
      description: 'Tasks finished',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Circle,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-950',
      description: 'In progress',
    },
    {
      title: 'High Priority',
      value: stats.highPriority,
      icon: AlertTriangle,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-950',
      description: 'Need attention',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Progress card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">Overall Progress</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {stats.completed} of {stats.total} tasks completed
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  {completionRate}%
                </span>
              </div>
            </div>
            <Progress value={completionRate} className="h-2.5" />
            <p className="text-xs text-muted-foreground mt-2">
              {completionRate >= 80
                ? '🎉 Excellent work! Keep it up!'
                : completionRate >= 50
                ? '🚀 Halfway there, you got this!'
                : '💪 Keep going, great progress!'}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{card.value}</p>
                    <p className="text-sm font-medium text-foreground">{card.title}</p>
                    <p className="text-xs text-muted-foreground">{card.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
