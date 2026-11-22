'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { parseGroupForm, type GroupFormResult } from '../../lib/groupForm'
import { groupPath } from '../../data/groups'
import { createGroup, updateGroup } from '../../lib/groups'
import { addMembership, removeMembership } from '../../lib/memberships'
import { ensureUser } from '../../lib/users'

/** The signed-in User's id. Joining and leaving are only offered to them, so anyone else is an error. */
async function requireUserId(): Promise<string> {
  const { userId } = await auth()
  if (!userId) throw new Error('Sign in to join or leave a Group.')
  return userId
}

/** Makes the signed-in User a Member of the Group, then refreshes the Groups page and Group pages. */
export async function joinGroup(groupId: string): Promise<void> {
  const userId = await requireUserId()
  await ensureUser(userId)
  await addMembership(userId, groupId)
  revalidatePath('/groups', 'layout')
}

/** Ends the signed-in User's Membership in the Group, then refreshes the Groups page and Group pages. */
export async function leaveGroup(groupId: string): Promise<void> {
  const userId = await requireUserId()
  await removeMembership(userId, groupId)
  revalidatePath('/groups', 'layout')
}

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
