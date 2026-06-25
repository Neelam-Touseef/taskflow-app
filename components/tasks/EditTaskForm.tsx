'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowLeft, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { updateTask, deleteTask } from '@/actions/tasks'
import { CATEGORIES, cn, formatDateRelative, getPriorityColor, getStatusColor } from '@/lib/utils'
import { toast } from 'sonner'
import type { Task } from '@/lib/types'

interface EditTaskFormProps {
  task: Task
}

export function EditTaskForm({ task }: EditTaskFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isDeleting, startDeleteTransition] = useTransition()
  const [priority, setPriority] = useState(task.priority)
  const [status, setStatus] = useState(task.status)
  const [category, setCategory] = useState(task.category || '')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('priority', priority)
    formData.set('status', status)
    formData.set('category', category)

    startTransition(async () => {
      const result = await updateTask(task.id, formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Task updated!')
        router.push('/tasks')
      }
    })
  }

  function handleDelete() {
    if (!confirm('Are you sure you want to delete this task?')) return
    startDeleteTransition(async () => {
      const result = await deleteTask(task.id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Task deleted')
        router.push('/tasks')
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold', getPriorityColor(task.priority))}>
            {task.priority} priority
          </span>
          <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold', getStatusColor(task.status))}>
            {task.status}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="text-xs text-muted-foreground">
        Last updated {formatDateRelative(task.updated_at)} · Created {formatDateRelative(task.created_at)}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 p-6 bg-card border border-border rounded-2xl">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={task.title}
              required
              className="text-lg font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={task.description || ''}
              rows={4}
              placeholder="Add task details..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6 bg-card border border-border rounded-2xl">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">🔴 High</SelectItem>
                <SelectItem value="medium">🟡 Medium</SelectItem>
                <SelectItem value="low">🟢 Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No category</SelectItem>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Input
              id="due_date"
              name="due_date"
              type="date"
              defaultValue={task.due_date || ''}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || isPending}
            className="gap-2"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete Task
          </Button>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}
