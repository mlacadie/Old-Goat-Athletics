export interface NavLink {
  label: string
  /** A route ("/groups") or a Home page Section ("/#socials"). */
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Groups', href: '/groups' },
  { label: 'Socials', href: '/#socials' },
  { label: 'Contact Us', href: '/contact' },
]
