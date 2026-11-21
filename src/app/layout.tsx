import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import '@fontsource/bebas-neue/400.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import './globals.css'
import ThemeRegistry from '../components/layout/ThemeRegistry'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { colors } from '../theme'

export const metadata: Metadata = {
  title: 'Old Goat Athletics | Keep Competing',
  description:
    'Old Goat Athletics is a community for former college athletes to keep competing, find a new sport, and stay active after graduation.',
  icons: { icon: '/logos/OG_Horns.svg' },
}

/** Styles Clerk's sign-in, sign-up, and profile forms to match the MUI theme. */
const clerkAppearance = {
  variables: {
    colorPrimary: colors.navy,
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    borderRadius: '10px',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignOutUrl="/"
          appearance={clerkAppearance}
        >
          <ThemeRegistry>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeRegistry>
        </ClerkProvider>
      </body>
    </html>
  )
}
