import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, isToday, isTomorrow, isPast, formatDistanceToNow } from 'date-fns'
import type { Priority, Status } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | null): string {
  if (!date) return 'No due date'
  const d = new Date(date)
  if (isToday(d)) return 'Today'
  if (isTomorrow(d)) return 'Tomorrow'
  return format(d, 'MMM d, yyyy')
}

export function formatDateRelative(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function isOverdue(date: string | null): boolean {
  if (!date) return false
  return isPast(new Date(date)) && !isToday(new Date(date))
}

export function getPriorityColor(priority: Priority) {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400'
    case 'medium':
      return 'text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400'
    case 'low':
      return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400'
  }
}

export function getStatusColor(status: Status) {
  switch (status) {
    case 'completed':
      return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400'
    case 'pending':
      return 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400'
  }
}

export function getPriorityIcon(priority: Priority): string {
  switch (priority) {
    case 'high': return '🔴'
    case 'medium': return '🟡'
    case 'low': return '🟢'
  }
}

export const CATEGORIES = [
  'Work',
  'Personal',
  'Health',
  'Finance',
  'Learning',
  'Shopping',
  'Travel',
  'Other',
]

export const PRIORITIES: { value: Priority; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export const STATUSES: { value: Status; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
]

export function getInitials(name: string | null | undefined): string {
  if (!name) return 'U'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
