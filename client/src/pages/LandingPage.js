import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IsLoggedInContext } from '../contexts/IsLoggedIn'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Heading, Button, Text } from '@chakra-ui/react'
import MovingModel from '../components/MovingModel'
import Footer from '../components/Footer'
const LandingPage = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useContext(IsLoggedInContext)

  useEffect(() => {
    isLoggedIn && navigate('/profile')
  }, [isLoggedIn, navigate])

  return (
    <Container mt={9}>
      <Box align='center'>
        <MovingModel />
        <Heading borderRadius={15}>
          Welcome to{' '}
          <span
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'teal',
            }}
          >
            Linked
          </span>
        </Heading>
        <Text>the web app that allows you to link everything in one place</Text>
      </Box>
      <Box mt={8}>
        <Link to='/signup'>
          <Button w='100%' bg='teal' mt={2}>
            Sign up
          </Button>
        </Link>
        <Link to='/login'>
          <Button w='100%' bg='teal' mt={2}>
            Login
          </Button>
        </Link>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Container>
  )
}

export default LandingPage
