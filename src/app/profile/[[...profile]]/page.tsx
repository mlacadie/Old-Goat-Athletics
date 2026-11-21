import type { Metadata } from 'next'
import { UserProfile } from '@clerk/nextjs'
import AccountSection from '../../../components/account/AccountSection'

export const metadata: Metadata = { title: 'Profile | Old Goat Athletics' }

export default function Page() {
  return (
    <AccountSection>
      <UserProfile path="/profile" />
    </AccountSection>
  )
}
