import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

/** Pages only a signed-in User can open. Everything else stays public. */
const isUserOnlyRoute = createRouteMatcher(['/profile(.*)', '/groups/new', '/groups/(.*)/edit'])

export default clerkMiddleware(
  async (auth, request) => {
    if (isUserOnlyRoute(request)) await auth.protect()
  },
  // Send Visitors to our own sign-in page, not Clerk's hosted one on another domain: a cross-site
  // redirect during client-side navigation fails in the browser before falling back to a full load.
  { signInUrl: '/sign-in', signUpUrl: '/sign-up' },
)

export const config = {
  matcher: [
    // Skip Next.js internals and static files.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
