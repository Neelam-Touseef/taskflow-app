---
name: project-taskflow
description: TaskFlow SaaS todo app built in this project — stack, structure, and setup
metadata:
  type: project
---

Full TaskFlow Smart Task Manager app built in C:\Users\vip\Documents\todo-application.

**Why:** User requested a complete, professional SaaS-quality task manager as a portfolio project.

**How to apply:** When working in this repo, reference this context to avoid re-deriving the architecture.

## Stack
- Next.js 16.2.9 (App Router) — uses `proxy.ts` not `middleware.ts` (breaking change)
- Tailwind CSS v4 — `@import "tailwindcss"` + `@theme inline` + `@custom-variant dark` in globals.css
- Supabase (Auth + PostgreSQL + RLS)
- Framer Motion, Lucide React, Sonner (toasts), @hello-pangea/dnd, date-fns
- Radix UI primitives for custom UI components (no shadcn CLI — manual components in components/ui/)

## Key architecture decisions
- Server/client split: layouts fetch data server-side, interactive shells are client components
- `lib/supabase/server.ts` uses `@supabase/ssr` createServerClient with next/headers cookies
- `lib/supabase/client.ts` uses createBrowserClient for client components
- All mutations use Server Actions (actions/auth.ts, actions/tasks.ts)
- Dashboard layout: server layout.tsx → DashboardShell client component → children
- Route protection via proxy.ts (Next.js 16 replacement for middleware.ts)

## Database schema
Located in supabase/schema.sql — tables: profiles, tasks. Both have RLS enabled.
Trigger auto-creates profile row on auth.users insert.

## Environment variables needed
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SITE_URL
