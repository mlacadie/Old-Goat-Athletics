import type { Metadata } from 'next'
import ContactPage from '../../components/contact/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us | Old Goat Athletics',
  description: 'Questions, ideas, or a club we should add to the directory? Reach out.',
}

export default function Page() {
  return <ContactPage />
}
