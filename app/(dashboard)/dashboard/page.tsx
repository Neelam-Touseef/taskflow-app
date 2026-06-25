import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { TaskCard } from '@/components/tasks/TaskCard'
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/tasks/EmptyState'
import type { DashboardStats, Task } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Dashboard — TaskFlow',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const allTasks: Task[] = tasks || []

  const stats: DashboardStats = {
    total: allTasks.length,
    completed: allTasks.filter((t) => t.status === 'completed').length,
    pending: allTasks.filter((t) => t.status === 'pending').length,
    highPriority: allTasks.filter((t) => t.priority === 'high' && t.status === 'pending').length,
  }

  const recentPending = allTasks
    .filter((t) => t.status === 'pending')
    .slice(0, 5)

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Here&apos;s an overview of your tasks today
          </p>
        </div>
        <CreateTaskModal />
      </div>

      <StatsCards stats={stats} />

      {/* Recent pending tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Pending Tasks</h2>
          <Link href="/tasks">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {recentPending.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-2">
            {recentPending.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
