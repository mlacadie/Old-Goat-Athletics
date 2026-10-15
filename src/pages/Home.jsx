import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import Mission from '../components/Mission.jsx'
import IAmNow from '../components/IAmNow.jsx'
import Merch from '../components/Merch.jsx'
import Community from '../components/Community.jsx'
import Socials from '../components/Socials.jsx'

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const scrollTo = location.state?.scrollTo
    if (!scrollTo) return
    document.querySelector(scrollTo)?.scrollIntoView({ behavior: 'smooth' })
    navigate('.', { replace: true, state: null })
  }, [location.state, navigate])

  return (
    <>
      <Hero />
      <Mission />
      <IAmNow />
      <Merch />
      <Community />
      <Socials />
    </>
  )
}
