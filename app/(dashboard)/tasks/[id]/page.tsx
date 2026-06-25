import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { EditTaskForm } from '@/components/tasks/EditTaskForm'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: task } = await supabase.from('tasks').select('title').eq('id', id).single()
  return {
    title: task ? `${task.title} — TaskFlow` : 'Task — TaskFlow',
  }
}

export default async function TaskDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: task } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!task) notFound()

  return (
    <div className="py-2">
      <EditTaskForm task={task} />
    </div>
  )
}
