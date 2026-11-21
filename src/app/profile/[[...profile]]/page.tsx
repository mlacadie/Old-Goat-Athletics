import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import AccountSection from '../../../components/account/AccountSection'
import ProfileView from '../../../components/account/ProfileView'
import { getEmailNotifications, syncUser } from '../../../lib/users'

export const metadata: Metadata = { title: 'Profile | Old Goat Athletics' }

export default async function Page() {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/sign-in')

  // The Clerk webhook normally keeps the users table in sync. Syncing here as well covers
  // local development, where Clerk can't reach the webhook.
  await syncUser(clerkUser)
  const emailNotifications = await getEmailNotifications(clerkUser.id)

  return (
    <AccountSection>
      <ProfileView emailNotifications={emailNotifications} />
    </AccountSection>
  )
}
