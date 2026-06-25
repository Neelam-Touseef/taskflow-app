import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CalendarView } from '@/components/tasks/CalendarView'
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal'
import type { Task } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Calendar — TaskFlow',
}

export default async function CalendarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .not('due_date', 'is', null)
    .order('due_date', { ascending: true })

  const allTasks: Task[] = tasks || []

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            View tasks by their due dates
          </p>
        </div>
        <CreateTaskModal />
      </div>

      <CalendarView tasks={allTasks} />
    </div>
  )
}
