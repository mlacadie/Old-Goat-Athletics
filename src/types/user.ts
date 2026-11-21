/** Someone with an account. Accounts are managed by Clerk; `id` is the Clerk user id. */
export interface User {
  id: string
  displayName: string
}
