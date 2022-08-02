import { useContext } from 'react'
import { IsLoggedInContext } from '../contexts/IsLoggedIn'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
const LogoutButton = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext)
  const navigate = useNavigate()
  const logout = () => {
    if (isLoggedIn) {
      axios
        .get('http://localhost:3001/api/auth/logout', {
          header: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          credentials: 'include',
        })
        .then((res) => {
          console.log('Successfully logged out')
          setIsLoggedIn(false)
          navigate('/')
        })
        .catch((err) => {
          console.log(err)
          navigate('/')
        })
    } else {
      navigate('/')
    }
  }
  return (
    <Button onClick={logout} bg='teal' fontFamily='Roboto mono'>
      Log out
    </Button>
  )
}

export default LogoutButton
