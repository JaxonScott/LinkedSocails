import axios from 'axios'
import { Button } from '@chakra-ui/react'
const LogoutButton = () => {
  const logout = () => {
    axios
      .post('http://localhost:3001/api/auth/logout', {
        header: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.statusCode)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Button onClick={logout} bg='teal'>
      Log out
    </Button>
  )
}

export default LogoutButton
