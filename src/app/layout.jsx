import '@fontsource/bebas-neue/400.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import './globals.css'
import ThemeRegistry from '../components/ThemeRegistry.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export const metadata = {
  title: 'Old Goat Athletics | Keep Competing',
  description:
    'Old Goat Athletics is a community for former college athletes to keep competing, find a new sport, and stay active after graduation.',
  icons: { icon: '/logos/OG_Horns.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  )
}
