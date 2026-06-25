'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, getPriorityColor } from '@/lib/utils'
import type { Task } from '@/lib/types'
import Link from 'next/link'

interface CalendarViewProps {
  tasks: Task[]
}

export function CalendarView({ tasks }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Pad start
  const startPadding = getDay(monthStart)
  const paddedDays = Array.from({ length: startPadding }, (_, i) => null as Date | null)

  const getTasksForDay = (date: Date) =>
    tasks.filter(
      (t) => t.due_date && isSameDay(new Date(t.due_date), date)
    )

  const selectedDayTasks = selectedDay ? getTasksForDay(selectedDay) : []

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6">
      {/* Calendar header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Week day headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {paddedDays.map((_, i) => (
            <div key={`pad-${i}`} className="min-h-[100px] p-2 border-b border-r border-border opacity-30" />
          ))}
          {days.map((day) => {
            const dayTasks = getTasksForDay(day)
            const isSelected = selectedDay && isSameDay(day, selectedDay)
            const isCurrentDay = isToday(day)

            return (
              <motion.div
                key={day.toISOString()}
                whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={cn(
                  'min-h-[100px] p-2 border-b border-r border-border cursor-pointer transition-colors',
                  isSelected && 'bg-indigo-50 dark:bg-indigo-950/50',
                  !isSameMonth(day, currentMonth) && 'opacity-40'
                )}
              >
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium mb-1 mx-auto',
                  isCurrentDay && 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow',
                  !isCurrentDay && 'text-foreground'
                )}>
                  {format(day, 'd')}
                </div>

                <div className="space-y-0.5">
                  {dayTasks.slice(0, 3).map((task) => (
                    <Link key={task.id} href={`/tasks/${task.id}`} onClick={(e) => e.stopPropagation()}>
                      <div
                        className={cn(
                          'text-[10px] px-1.5 py-0.5 rounded truncate font-medium leading-tight',
                          task.priority === 'high'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : task.priority === 'medium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
                          task.status === 'completed' && 'opacity-50 line-through'
                        )}
                      >
                        {task.title}
                      </div>
                    </Link>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-[10px] text-muted-foreground px-1.5">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Selected day tasks */}
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h3 className="font-semibold text-foreground">
            {format(selectedDay, 'EEEE, MMMM d')} · {selectedDayTasks.length} task{selectedDayTasks.length !== 1 ? 's' : ''}
          </h3>
          {selectedDayTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tasks due on this day.</p>
          ) : (
            <div className="space-y-2">
              {selectedDayTasks.map((task) => (
                <Link key={task.id} href={`/tasks/${task.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:shadow-sm transition-shadow">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full shrink-0',
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                      )}
                    />
                    <span className={cn('text-sm font-medium', task.status === 'completed' && 'line-through text-muted-foreground')}>
                      {task.title}
                    </span>
                    {task.category && (
                      <span className="ml-auto text-xs text-muted-foreground">{task.category}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
