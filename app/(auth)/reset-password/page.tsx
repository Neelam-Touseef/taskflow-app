import { Metadata } from 'next'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Reset Password — TaskFlow',
  description: 'Set a new password for your TaskFlow account',
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
