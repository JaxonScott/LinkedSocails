import React, { useContext } from 'react'
import {
  Container,
  Flex,
  Button,
  ButtonGroup,
  Box,
  Spacer,
} from '@chakra-ui/react'
import { IoShareOutline } from 'react-icons/io5'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { IsLoggedInContext } from '../contexts/IsLoggedIn'
import LogoutButton from './LogoutButton'
const NavBar = () => {
  const { isLoggedIn } = useContext(IsLoggedInContext)
  return (
    <Container mt={4}>
      <Flex>
        <Box>
          <Logo />
        </Box>
        <Spacer />
        <Box>
          <ButtonGroup justifyContent='end'>
            {isLoggedIn && (
              <Button fontWeight='bolder' fontSize='xl' bg='teal'>
                <IoShareOutline />
              </Button>
            )}
            {isLoggedIn ? <LogoutButton /> : <Button bg='teal'>Sign in</Button>}
          </ButtonGroup>
        </Box>
      </Flex>
    </Container>
  )
}

export default NavBar
