import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { IsLoggedInContext } from './contexts/IsLoggedIn'
import { editProfileContext } from './contexts/editProfile'
import { TabTitle } from './utils/GeneralFunctions'
import Cookies from 'js-cookie'

//pages
import LandingPage from './pages/LandingPage'
import UserProfile from './pages/UserProfile'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Users from './pages/Users'

//check login status
function App() {
  TabTitle('Linked - Home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    const checkSession = Cookies.get('connect.sid')
    if (!checkSession) {
      console.log('no user session found')
    } else {
      setIsLoggedIn(true)
      console.log('user logged in')
    }
  }, [isLoggedIn])
  console.log(isLoggedIn)

  return (
    <>
      <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <editProfileContext.Provider value={{ isEditing, setIsEditing }}>
          <NavBar />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/user/:id' element={<Users />} />
          </Routes>
        </editProfileContext.Provider>
      </IsLoggedInContext.Provider>
    </>
  )
}

export default App
