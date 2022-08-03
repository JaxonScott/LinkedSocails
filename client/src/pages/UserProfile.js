import { useContext, useEffect, useState } from 'react'
import { IsLoggedInContext } from '../contexts/IsLoggedIn'
import { editProfileContext } from '../contexts/editProfile'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Box,
  Heading,
  Divider,
  List,
  ListItem,
  Spacer,
  Link,
  Input,
  ButtonGroup,
  Button,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { AiOutlineEdit } from 'react-icons/ai'
import LinkButton from '../components/LinkButton'
import ProfilePicture from '../components/ProfilePicture'
import AddLinkButton from '../components/AddLinkButton'
import EditProfileButton from '../components/EditProfileButton'
import LinkDeleteButton from '../components/LinkDeleteButton'
import { TabTitle } from '../utils/GeneralFunctions'
import ShareProfile from '../components/ShareProfile'
import { changeUsernameSchema } from '../schemas'

const UserProfile = () => {
  TabTitle('Linked - Profile')
  //context
  const { isLoggedIn } = useContext(IsLoggedInContext)
  const { isEditing } = useContext(editProfileContext)
  //state
  const [userLinks, setUserLinks] = useState([])
  const [profileData, setProfileData] = useState([])
  const [editUsername, setEditUsername] = useState(false)
  const [loading, setLoading] = useState([])

  const handleEditUsernameState = () => {
    if (editUsername) {
      setEditUsername(false)
    } else {
      setEditUsername(true)
    }
  }

  const navigate = useNavigate()
  useEffect(() => {
    !isLoggedIn && navigate('/')
    axios
      .get('http://localhost:3001/api/user/profile', {
        header: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        setProfileData(res.data)
        setUserLinks(res.data.links)
        setLoading(false)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [isLoggedIn, navigate])

  const onSubmit = async (values, actions) => {
    const changeUsername = {
      username: values.username,
    }
    axios
      .patch(
        'http://localhost:3001/api/user/profile/username',
        changeUsername,
        {
          header: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(() => {
        console.log(values)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: changeUsernameSchema,
    onSubmit,
  })
  console.log(errors)

  if (loading) {
    return <h1>loading</h1>
  } else {
    return (
      <Container align='center' mt={10}>
        <Box mb={4}>
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
            <ProfilePicture src={profileData.profilePicture} />
          </motion.div>
          {isEditing && <Link color='#ff63c3'>Change Picture</Link>}
          {editUsername && isEditing ? (
            <Box mt={4}>
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder={profileData.username}
                  value={values.username}
                  id='username'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  w='50%'
                />
                <Box>
                  <ButtonGroup>
                    <Button
                      variant='ghost'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                    <Button onClick={handleEditUsernameState} variant='ghost'>
                      Cancel
                    </Button>
                  </ButtonGroup>
                </Box>
              </form>
            </Box>
          ) : (
            <Heading fontWeight='regular'>
              {profileData.username}{' '}
              {isEditing && (
                <Button
                  onClick={handleEditUsernameState}
                  variant='ghost'
                  m={0}
                  p={0}
                  fontSize='2xl'
                >
                  <AiOutlineEdit />
                </Button>
              )}
            </Heading>
          )}
          <Divider mt={4} />
        </Box>
        <List>
          {userLinks.map((i) => {
            return (
              <ListItem mt={4}>
                <LinkButton link={i.link} icon={i.platform}>
                  {i.title}
                </LinkButton>
                {isEditing && (
                  <Box align='start'>
                    <LinkDeleteButton
                      title={i.title}
                      link={i.link}
                      platform={i.platform}
                      userLinks={userLinks}
                      setUserLinks={setUserLinks}
                    />
                  </Box>
                )}
              </ListItem>
            )
          })}
        </List>
        <Divider my={6} />
        <Box mt={4} display='flex' justify='end'>
          <Spacer />
          <Box mr={2}>
            {isEditing && (
              <AddLinkButton
                userLinks={userLinks}
                setUserLinks={setUserLinks}
              />
            )}
          </Box>
          <Box>
            <EditProfileButton
              editUsername={editUsername}
              setEditUsername={setEditUsername}
            />
          </Box>
        </Box>
        <Box mt={4}>
          <Divider my={6} />
          <ShareProfile username={profileData.username} />
        </Box>
      </Container>
    )
  }
}

export default UserProfile
