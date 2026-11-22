import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import AccountSection from '../../components/account/AccountSection'
import ProfileView from '../../components/account/ProfileView'
import { listMyGroups } from '../../lib/memberships'
import { getEmailNotifications, syncUser, userRecordFromClerk } from '../../lib/users'

export const metadata: Metadata = { title: 'Profile | Old Goat Athletics' }

export default async function Page() {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/sign-in')

  // The Clerk webhook normally keeps the users table in sync. Syncing here as well covers local
  // development, where Clerk can't reach the webhook. It only writes when something changed.
  await syncUser(userRecordFromClerk(clerkUser))
  const [emailNotifications, myGroups] = await Promise.all([
    getEmailNotifications(clerkUser.id),
    listMyGroups(clerkUser.id),
  ])

  return (
    <AccountSection>
      <ProfileView initialEmailNotifications={emailNotifications} myGroups={myGroups} />
    </AccountSection>
  )
}
