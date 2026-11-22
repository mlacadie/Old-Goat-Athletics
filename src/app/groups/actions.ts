'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { parseGroupForm, type GroupFormResult } from '../../lib/groupForm'
import { groupPath } from '../../data/groups'
import { createGroup, updateGroup } from '../../lib/groups'

/** Adds a Group owned by the signed-in User, then opens its Group page. */
export async function addGroup(formData: FormData): Promise<GroupFormResult> {
  const { userId } = await auth()
  if (!userId) return { errors: { form: 'Sign in to add your Group.' } }

  const parsed = parseGroupForm(formData)
  if (!parsed.ok) return { errors: parsed.errors }

  const groupId = await createGroup(parsed.group, userId)
  redirect(groupPath(groupId))
}

/** Saves the Owner's changes to their Group, then opens its Group page. Bound to a Group id by the edit page. */
export async function editGroup(groupId: string, formData: FormData): Promise<GroupFormResult> {
  const { userId } = await auth()
  if (!userId) return { errors: { form: 'Sign in to edit your Group.' } }

  const parsed = parseGroupForm(formData)
  if (!parsed.ok) return { errors: parsed.errors }

  const saved = await updateGroup(groupId, userId, parsed.group)
  if (!saved) return { errors: { form: 'Only the Group Owner can edit this Group.' } }
  redirect(groupPath(groupId))
}
