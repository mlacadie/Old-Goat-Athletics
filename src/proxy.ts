import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

/** Pages only a signed-in User can open. Everything else stays public. */
const isUserOnlyRoute = createRouteMatcher(['/profile(.*)'])

export default clerkMiddleware(async (auth, request) => {
  if (isUserOnlyRoute(request)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
