import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  FormControl,
  FormLabel,
  Box,
  Input,
  Button,
  Text,
  Heading,
  Divider,
} from '@chakra-ui/react'
import { IsLoggedInContext } from '../contexts/IsLoggedIn'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { signUpSchema } from '../schemas'
import { TabTitle } from '../utils/GeneralFunctions'

const Signup = () => {
  const [signUpErr, setSignUpErr] = useState(false)
  TabTitle('Linked - Sign up')
  const navigate = useNavigate()
  const { isLoggedIn } = useContext(IsLoggedInContext)
  //check if user is logged
  useEffect(() => {
    isLoggedIn && navigate('/profile')
  }, [navigate, isLoggedIn])
  const onSubmit = async (values, actions) => {
    const registerBody = {
      username: values.username,
      email: values.email,
      password: values.password,
    }
    axios
      .post('http://localhost:3001/api/auth/register', registerBody, {
        header: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log('success')
          navigate('/login')
        }

        actions.resetForm()
      })
      .catch((err) => {
        console.log(err)
        setSignUpErr(true)
      })
  }
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
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit,
  })

  console.log(errors)

  return (
    <Container style={{ marginTop: '4rem' }} mb={10}>
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
          <Heading as='h1'>Sign Up</Heading>
          <Text>
            link all your socails at once with{' '}
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
          <FormLabel>username</FormLabel>
          <Input
            placeholder='username'
            value={values.username}
            onChange={handleChange}
            id='username'
            onBlur={handleBlur}
          />
          {errors.username && touched.username && (
            <p style={{ color: 'red' }}>{errors.username}</p>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>email</FormLabel>
          <Input
            placeholder='email'
            value={values.email}
            onChange={handleChange}
            id='email'
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
            onChange={handleChange}
            id='password'
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <p style={{ color: 'red' }}>{errors.password}</p>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>confirm password</FormLabel>
          <Input
            type='password'
            placeholder='confirm password'
            value={values.confirmPassword}
            onChange={handleChange}
            id='confirmPassword'
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
          )}
        </FormControl>
        {signUpErr && (
          <Text color='red.500' fontSize='sm'>
            Username or email is already taken.
          </Text>
        )}
        <Box mt={2}>
          <Text>
            Already have an account? Login
            <Link to='/login'>
              <span style={{ color: '#ff63c3' }}> here</span>
            </Link>
          </Text>
        </Box>
        <Box mt='3'>
          <Button bg='teal' w='100%' type='submit' disabled={isSubmitting}>
            Sign up
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default Signup
