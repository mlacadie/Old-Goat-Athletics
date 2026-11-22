import type { Metadata } from 'next'
import GroupsPage from '../../components/groups/GroupsPage'
import { listGroups } from '../../lib/groups'

export const metadata: Metadata = {
  title: 'Groups | Old Goat Athletics',
  description: 'Clubs, teams, and crews for Old Goats such as yourself. Find one near you, or add your own.',
}

// Groups live in the database and Users add them at any time, so render the list per request.
export const dynamic = 'force-dynamic'

export default async function Page() {
  return <GroupsPage groups={await listGroups()} />
}
