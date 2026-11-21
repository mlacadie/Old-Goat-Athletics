import type { Metadata } from 'next'
import { SignUp } from '@clerk/nextjs'
import AccountSection from '../../../components/account/AccountSection'

export const metadata: Metadata = { title: 'Sign up | Old Goat Athletics' }

export default function Page() {
  return (
    <AccountSection>
      <SignUp />
    </AccountSection>
  )
}
