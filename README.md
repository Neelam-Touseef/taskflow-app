# TaskFlow — Smart Task Manager

A modern, production-quality task management web application built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Supabase.

## Features

- **Authentication** — Signup, login, logout, forgot/reset password via Supabase Auth
- **Task Management** — Create, edit, delete, and complete tasks with priority, category, due date
- **Smart Filters** — Search, filter by status, priority, and category simultaneously
- **Drag & Drop** — Reorder tasks with @hello-pangea/dnd
- **Calendar View** — Monthly calendar showing tasks by due date
- **Dashboard** — Stats cards with completion progress visualization
- **Dark Mode** — System-aware with manual toggle, persisted to localStorage
- **Responsive** — Works on mobile, tablet, and desktop
- **Animations** — Smooth transitions powered by Framer Motion
- **RLS Security** — Row Level Security ensures users only see their own data

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.9 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| UI Components | Custom (Radix UI primitives) |
| Icons | Lucide React |
| Animations | Framer Motion |
| Drag & Drop | @hello-pangea/dnd |
| Toasts | Sonner |
| Date Utils | date-fns |

## Project Structure

```
├── app/
│   ├── (auth)/          # Login, signup, forgot/reset password pages
│   ├── (dashboard)/     # Protected: dashboard, tasks, calendar
│   ├── api/auth/        # Supabase OAuth callback
│   ├── layout.tsx       # Root layout with Toaster
│   └── page.tsx         # Public landing page
├── actions/
│   ├── auth.ts          # signIn, signUp, signOut, resetPassword server actions
│   └── tasks.ts         # createTask, updateTask, deleteTask, toggleStatus server actions
├── components/
│   ├── auth/            # LoginForm, SignupForm, ForgotPasswordForm, ResetPasswordForm
│   ├── dashboard/       # DashboardShell, AppSidebar, AppHeader, StatsCards, ThemeToggle
│   ├── landing/         # LandingHeader, HeroSection, FeaturesSection, CTASection
│   ├── tasks/           # TaskCard, DraggableTaskList, TaskFilters, CreateTaskModal, EditTaskForm, CalendarView
│   └── ui/              # Button, Input, Label, Card, Badge, Dialog, Select, Textarea, Avatar, Progress, etc.
├── lib/
│   ├── supabase/        # client.ts (browser), server.ts (SSR)
│   ├── types.ts         # TypeScript types (Task, Profile, TaskFilters, etc.)
│   └── utils.ts         # cn(), formatDate(), getPriorityColor(), CATEGORIES, etc.
├── supabase/
│   └── schema.sql       # Full database schema with RLS policies and triggers
├── proxy.ts             # Auth route protection (Next.js 16 proxy convention)
└── .env.local.example   # Required environment variables
```

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Run the database schema

1. In the Supabase dashboard, go to **SQL Editor → New Query**
2. Paste the full contents of `supabase/schema.sql`
3. Click **Run**

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Configure Supabase Auth redirect URLs

In Supabase → **Authentication → URL Configuration**:
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: `http://localhost:3000/api/auth/callback`

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment on Vercel

1. Push to GitHub, import in Vercel
2. Add the 3 environment variables with your production URLs
3. In Supabase, add your Vercel URL to allowed redirect URLs

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon public key |
| `NEXT_PUBLIC_SITE_URL` | Yes | App URL for password reset emails |
