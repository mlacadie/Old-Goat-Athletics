import type { Metadata } from 'next'
import GroupsPage from '../../components/groups/GroupsPage'

export const metadata: Metadata = {
  title: 'Groups | Old Goat Athletics',
  description: 'Clubs, teams, and crews for Old Goats such as yourself. Find one near you, or add your own.',
}

export default function Page() {
  return <GroupsPage />
}
