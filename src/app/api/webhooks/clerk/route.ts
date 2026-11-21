import type { NextRequest } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { deleteUser, syncUser } from '../../../../lib/users'

/**
 * Clerk calls this when an account is created, updated, or deleted, so the users table stays in
 * step with Clerk. Verified with CLERK_WEBHOOK_SIGNING_SECRET.
 */
export async function POST(request: NextRequest) {
  let event
  try {
    event = await verifyWebhook(request)
  } catch {
    return new Response('Webhook verification failed', { status: 400 })
  }

  if (event.type === 'user.created' || event.type === 'user.updated') {
    const client = await clerkClient()
    await syncUser(await client.users.getUser(event.data.id))
  } else if (event.type === 'user.deleted' && event.data.id) {
    await deleteUser(event.data.id)
  }

  return new Response('OK', { status: 200 })
}
