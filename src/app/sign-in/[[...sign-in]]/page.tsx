import type { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'
import AccountSection from '../../../components/account/AccountSection'

export const metadata: Metadata = { title: 'Sign in | Old Goat Athletics' }

export default function Page() {
  return (
    <AccountSection>
      <SignIn />
    </AccountSection>
  )
}
