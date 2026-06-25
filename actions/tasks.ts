'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Priority, Status } from '@/lib/types'

export async function createTask(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const taskData = {
    user_id: user.id,
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    category: formData.get('category') as string || null,
    priority: (formData.get('priority') as Priority) || 'medium',
    status: 'pending' as Status,
    due_date: formData.get('due_date') as string || null,
  }

  const { error } = await supabase.from('tasks').insert(taskData)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/tasks')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateTask(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const updates = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    category: formData.get('category') as string || null,
    priority: formData.get('priority') as Priority,
    status: formData.get('status') as Status,
    due_date: formData.get('due_date') as string || null,
  }

  const { error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/tasks')
  revalidatePath('/dashboard')
  revalidatePath(`/tasks/${id}`)
  return { success: true }
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/tasks')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function toggleTaskStatus(id: string, currentStatus: Status) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const newStatus: Status = currentStatus === 'completed' ? 'pending' : 'completed'

  const { error } = await supabase
    .from('tasks')
    .update({ status: newStatus })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/tasks')
  revalidatePath('/dashboard')
  return { success: true, newStatus }
}

export async function getTasks() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return []
  return data
}

export async function getTask(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) return null
  return data
}
