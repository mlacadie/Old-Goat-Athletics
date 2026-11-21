'use server'

import { auth } from '@clerk/nextjs/server'
import { setEmailNotifications } from '../../lib/users'

export async function updateEmailNotifications(enabled: boolean): Promise<void> {
  const { userId } = await auth()
  if (!userId) throw new Error('Sign in to change Notification preferences.')
  await setEmailNotifications(userId, enabled)
}
