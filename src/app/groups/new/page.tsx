import type { Metadata } from 'next'
import GroupForm from '../../../components/groups/GroupForm'
import { listKnownCities } from '../../../lib/groups'
import { addGroup } from '../actions'

export const metadata: Metadata = { title: 'Add your Group | Old Goat Athletics' }

// Suggests cities from the database, so render per request.
export const dynamic = 'force-dynamic'

/** Signed-in Users only (see proxy.ts). Whoever adds the Group becomes its Group Owner. */
export default async function Page() {
  return (
    <GroupForm
      heading="Add your Group"
      intro="List your club, team, or crew so other former athletes can find it. You’ll be its Group Owner and can edit it any time."
      submitLabel="Add Group"
      cancelHref="/groups"
      knownCities={await listKnownCities()}
      action={addGroup}
    />
  )
}
