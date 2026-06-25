'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle2, Circle, Trash2, Edit2, Calendar, Tag, Clock, GripVertical
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toggleTaskStatus, deleteTask } from '@/actions/tasks'
import { cn, formatDate, getPriorityColor, getStatusColor, isOverdue } from '@/lib/utils'
import { toast } from 'sonner'
import type { Task } from '@/lib/types'

interface TaskCardProps {
  task: Task
  dragHandleProps?: Record<string, unknown>
  isDragging?: boolean
}

export function TaskCard({ task, dragHandleProps, isDragging }: TaskCardProps) {
  const [isPending, startTransition] = useTransition()
  const [isDeleting, setIsDeleting] = useState(false)
  const overdue = isOverdue(task.due_date) && task.status !== 'completed'

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleTaskStatus(task.id, task.status)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success(
          task.status === 'completed' ? 'Task reopened' : '🎉 Task completed!'
        )
      }
    })
  }

  function handleDelete() {
    setIsDeleting(true)
    startTransition(async () => {
      const result = await deleteTask(task.id)
      if (result?.error) {
        toast.error(result.error)
        setIsDeleting(false)
      } else {
        toast.success('Task deleted')
      }
    })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isDeleting ? 0 : 1, y: 0, scale: isDeleting ? 0.95 : 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all duration-200',
        isDragging && 'shadow-2xl scale-[1.02] border-indigo-300 dark:border-indigo-700',
        task.status === 'completed' && 'opacity-70',
        overdue && 'border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-950/10'
      )}
    >
      {/* Drag handle */}
      {dragHandleProps && (
        <div
          {...(dragHandleProps as React.HTMLAttributes<HTMLDivElement>)}
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing mt-0.5 text-muted-foreground"
        >
          <GripVertical className="h-4 w-4" />
        </div>
      )}

      {/* Checkbox */}
      <button
        onClick={handleToggle}
        disabled={isPending}
        className="mt-0.5 shrink-0 text-muted-foreground hover:text-indigo-500 transition-colors disabled:opacity-50"
      >
        {task.status === 'completed' ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/tasks/${task.id}`} className="flex-1 min-w-0">
            <h3
              className={cn(
                'font-medium text-sm leading-snug transition-all hover:text-indigo-500',
                task.status === 'completed' && 'line-through text-muted-foreground'
              )}
            >
              {task.title}
            </h3>
          </Link>
          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <Link href={`/tasks/${task.id}`}>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-red-500"
              onClick={handleDelete}
              disabled={isPending}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
        )}

        {/* Metadata */}
        <div className="flex items-center flex-wrap gap-2">
          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', getPriorityColor(task.priority))}>
            {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
            {task.priority}
          </span>

          {task.category && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
              <Tag className="h-2.5 w-2.5" />
              {task.category}
            </span>
          )}

          {task.due_date && (
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                overdue
                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  : 'bg-secondary text-muted-foreground'
              )}
            >
              {overdue ? <Clock className="h-2.5 w-2.5" /> : <Calendar className="h-2.5 w-2.5" />}
              {overdue ? 'Overdue · ' : ''}{formatDate(task.due_date)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
