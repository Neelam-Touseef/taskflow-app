export type Priority = 'high' | 'medium' | 'low'
export type Status = 'pending' | 'completed'

export interface Task {
  id: string
  user_id: string
  title: string
  description: string | null
  category: string | null
  priority: Priority
  status: Status
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  email: string
  avatar_url: string | null
  created_at: string
}

export interface TaskFilters {
  search: string
  status: Status | 'all'
  priority: Priority | 'all'
  category: string | 'all'
}

export interface DashboardStats {
  total: number
  completed: number
  pending: number
  highPriority: number
}

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }
