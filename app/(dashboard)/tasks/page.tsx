import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DraggableTaskList } from '@/components/tasks/DraggableTaskList'
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal'
import type { Task } from '@/lib/types'

export const metadata: Metadata = {
  title: 'My Tasks — TaskFlow',
}

export default async function TasksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const allTasks: Task[] = tasks || []
  const pending = allTasks.filter((t) => t.status === 'pending').length
  const completed = allTasks.filter((t) => t.status === 'completed').length

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {pending} pending · {completed} completed
          </p>
        </div>
        <CreateTaskModal />
      </div>

      <DraggableTaskList initialTasks={allTasks} />
    </div>
  )
}
