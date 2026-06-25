'use client'

import { useState } from 'react'
import { AppSidebar } from './AppSidebar'
import { AppHeader } from './AppHeader'
import type { Profile } from '@/lib/types'

interface DashboardShellProps {
  children: React.ReactNode
  profile: Profile | null
}

export function DashboardShell({ children, profile }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const hour = new Date().getHours()
  const greeting =
    hour < 12
      ? `Good morning, ${profile?.full_name?.split(' ')[0] || 'there'}! 👋`
      : hour < 17
      ? `Good afternoon, ${profile?.full_name?.split(' ')[0] || 'there'}! 👋`
      : `Good evening, ${profile?.full_name?.split(' ')[0] || 'there'}! 👋`

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar
        profile={profile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        <AppHeader
          profile={profile}
          onMenuClick={() => setSidebarOpen(true)}
          greeting={greeting}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
