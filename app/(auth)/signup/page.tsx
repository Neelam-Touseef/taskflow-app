import { Metadata } from 'next'
import { SignupForm } from '@/components/auth/SignupForm'

export const metadata: Metadata = {
  title: 'Sign Up — TaskFlow',
  description: 'Create your TaskFlow account',
}

export default function SignupPage() {
  return <SignupForm />
}
