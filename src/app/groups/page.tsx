import type { Metadata } from 'next'
import GroupsPage from '../../components/groups/GroupsPage'

export const metadata: Metadata = {
  title: 'Groups & Clubs | Old Goat Athletics',
  description: 'A directory of clubs for former college athletes staying competitive and active.',
}

export default function Page() {
  return <GroupsPage />
}
