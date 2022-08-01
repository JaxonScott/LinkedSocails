import axios from 'axios'
import { useContext, useEffect } from 'react'
import { IsLoggedInContext } from '../contexts/IsLoggedIn'
import {
  Container,
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Divider,
} from '@chakra-ui/react'

import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import { loginSchema } from '../schemas/index'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { TabTitle } from '../utils/GeneralFunctions'

const Login = () => {
  TabTitle('Linked - Login')
  const { setIsLoggedIn, isLoggedIn } = useContext(IsLoggedInContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn && navigate('/profile')
  }, [isLoggedIn, navigate])
  //submit
  const onSubmit = async (values, actions) => {
    const loginBody = {
      email: values.email,
      password: values.password,
    }
    await axios
      .post('http://localhost:3001/api/auth/login', loginBody, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('success!')
          setIsLoggedIn(true)
          navigate('/profile')
        }
      })
      .catch((err, res) => {
        console.log(err)
      })
    actions.resetForm()
  }
  //
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  })
  return (
    <Container style={{ marginTop: '6rem' }} fontFamily='Roboto mono'>
      <Box align='center'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <Heading as='h1'>Log In</Heading>
          <Text>
            Welcome back to <span> </span>
            <span
              style={{
                fontWeight: 'bold',
                textDecoration: 'underline',
                textDecorationColor: 'teal',
                textDecorationThickness: '3px',
              }}
            >
              Linked
            </span>
          </Text>
        </motion.div>
        <Divider my={6} />
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>email</FormLabel>
          <Input
            placeholder='email'
            value={values.email}
            id='email'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p style={{ color: 'red' }}>{errors.email}</p>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>password</FormLabel>
          <Input
            placeholder='password'
            type='password'
            value={values.password}
            id='password'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <p style={{ color: 'red' }}>{errors.password}</p>
          )}
        </FormControl>
        <Box mt={2}>
          <Text>
            New to linked? Sign up
            <Link to='/signup'>
              <span style={{ color: '#ff63c3' }}> here</span>
            </Link>
          </Text>
        </Box>
        <Box mt='3'>
          <Button bg='teal' w='100%' type='submit' disabled={isSubmitting}>
            Login
          </Button>
        </Box>
      </form>
      <Box>
        <Footer />
      </Box>
    </Container>
  )
}

export default Login
