import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GroupPage from '../../../components/groups/GroupPage'
import { getGroup } from '../../../lib/groups'
import { hasJoined } from '../../../lib/memberships'
import { getCurrentUserId, getGroupRole } from '../../../lib/viewer'

type Props = { params: Promise<{ groupId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const group = await getGroup((await params).groupId)
  if (!group) return { title: 'Group not found | Old Goat Athletics' }
  return {
    title: `${group.name} | Old Goat Athletics`,
    description: group.description,
  }
}

export default async function Page({ params }: Props) {
  const group = await getGroup((await params).groupId)
  if (!group) notFound()

  const userId = await getCurrentUserId()
  // Owners are Members by owning the Group, so only look up a Membership for other Users.
  const joined = userId !== null && userId !== group.ownerId && (await hasJoined(userId, group.id))
  return <GroupPage group={group} role={getGroupRole(group, userId, joined)} />
}
