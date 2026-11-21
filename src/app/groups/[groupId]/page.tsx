import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GroupPage from '../../../components/groups/GroupPage'
import { GROUPS, getGroup } from '../../../data/groups'
import { getCurrentUser, getGroupRole } from '../../../lib/viewer'

type Props = { params: Promise<{ groupId: string }> }

export function generateStaticParams() {
  return GROUPS.map((group) => ({ groupId: group.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const group = getGroup((await params).groupId)
  if (!group) return { title: 'Group not found | Old Goat Athletics' }
  return {
    title: `${group.name} | Old Goat Athletics`,
    description: group.description,
  }
}

export default async function Page({ params }: Props) {
  const group = getGroup((await params).groupId)
  if (!group) notFound()

  const role = getGroupRole(group, await getCurrentUser())
  return <GroupPage group={group} role={role} />
}
