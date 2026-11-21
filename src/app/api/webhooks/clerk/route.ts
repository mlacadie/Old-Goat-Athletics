import type { NextRequest } from 'next/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { deleteUser, syncUser, userRecordFromWebhook } from '../../../../lib/users'

/**
 * Clerk calls this when an account is created, updated, or deleted, so the users table stays in
 * step with Clerk. Verified with CLERK_WEBHOOK_SIGNING_SECRET. Uses the user data in the event
 * itself, so events that arrive late (even after the account is deleted) still succeed.
 */
export async function POST(request: NextRequest) {
  let event
  try {
    event = await verifyWebhook(request)
  } catch {
    return new Response('Webhook verification failed', { status: 400 })
  }

  if (event.type === 'user.created' || event.type === 'user.updated') {
    await syncUser(userRecordFromWebhook(event.data))
  } else if (event.type === 'user.deleted' && event.data.id) {
    await deleteUser(event.data.id)
  }

  return new Response('OK', { status: 200 })
}
