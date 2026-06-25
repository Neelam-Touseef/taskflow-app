import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Login — TaskFlow',
  description: 'Sign in to your TaskFlow account',
}

export default function LoginPage() {
  return <LoginForm />
}
