import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
// import './App.css'
import { AuthPage } from './pages/auth.page'
import { EventPage } from './pages/event.page'
import { BookingPage } from './pages/booking.page'
import { MainNavBar } from './components/Navbar/mainNavBar'
import { AuthProvider } from './context/authContext'
import React from 'react'

function App() {

  return (
    <div>
      <AuthProvider>
      <Router>
        <MainNavBar />
        <Routes>
          <Route path = "/" element = {null} />
          <Route path = "/authPage" element = {<AuthPage />} />
          <Route path = "/bookingPage" element = {<BookingPage />} />
          <Route path = "/eventPage" element = {<EventPage />} />
        </Routes>
      </Router>
      </AuthProvider>
      
    </div>
  )
}

export default App
