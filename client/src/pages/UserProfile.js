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
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import LinkButton from '../components/LinkButton'
import ProfilePicture from '../components/ProfilePicture'
import AddLinkButton from '../components/AddLinkButton'
import EditProfileButton from '../components/EditProfileButton'
import LinkDeleteButton from '../components/LinkDeleteButton'
import { TabTitle } from '../utils/GeneralFunctions'
import ShareProfile from '../components/ShareProfile'

const UserProfile = () => {
  TabTitle('Linked - Profile')
  const { isLoggedIn } = useContext(IsLoggedInContext)
  const { isEditing } = useContext(editProfileContext)
  const [userLinks, setUserLinks] = useState([])
  const [profileData, setProfileData] = useState([])
  const [loading, setLoading] = useState([])
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
          <Heading fontWeight='regular' fontFamily='Roboto mono'>
            {profileData.username}
          </Heading>
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
            <EditProfileButton />
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
