import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GroupForm from '../../../../components/groups/GroupForm'
import { groupPath } from '../../../../data/groups'
import { getGroup, listKnownCities } from '../../../../lib/groups'
import { getCurrentUserId, getGroupRole } from '../../../../lib/viewer'
import { editGroup } from '../../actions'

type Props = { params: Promise<{ groupId: string }> }

export const metadata: Metadata = { title: 'Edit Group | Old Goat Athletics' }

/** Signed-in Users only (see proxy.ts). Anyone but the Group Owner gets "Group not found". */
export default async function Page({ params }: Props) {
  const group = await getGroup((await params).groupId)
  // Only ownership matters here, so there's no need to look up a Membership.
  if (!group || getGroupRole(group, await getCurrentUserId(), false) !== 'owner') notFound()

  return (
    <GroupForm
      heading="Edit your Group"
      intro="Changes show on the Groups page and your Group page as soon as you save."
      submitLabel="Save changes"
      cancelHref={groupPath(group.id)}
      group={group}
      knownCities={await listKnownCities()}
      action={editGroup.bind(null, group.id)}
    />
  )
}
