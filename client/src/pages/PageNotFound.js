import { Link } from 'react-router-dom'
import { IoChevronForward } from 'react-icons/io5'
import {
  Button,
  Container,
  Text,
  Box,
  Heading,
  Divider,
} from '@chakra-ui/react'
import MovingModel from '../components/MovingModel'

const PageNotFound = () => {
  return (
    <Container mt={9} align='center'>
      <Box>
        <MovingModel />
      </Box>
      <Box align='center'>
        <Heading fontWeight='normal' color='red.500'>
          404 Page Not Found
        </Heading>
        <Text fontFamily='Roboto mono' mt={1}>
          We are unable to find the page you are looking for.
        </Text>
      </Box>
      <Divider my={6} />
      <Box mt={2}>
        <Link to='/'>
          <Button
            color='teal.300'
            variant='ghost'
            fontFamily='Roboto mono'
            rightIcon={<IoChevronForward />}
          >
            Return Home
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default PageNotFound
