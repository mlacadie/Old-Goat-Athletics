import { Box } from '@mui/material'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Groups from './pages/Groups.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  return (
    <HashRouter>
      <Box>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </Box>
    </HashRouter>
  )
}

export default App
