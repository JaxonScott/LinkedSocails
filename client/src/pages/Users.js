import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Box,
  Heading,
  List,
  ListItem,
  Divider,
} from '@chakra-ui/react'
import ProfilePicture from '../components/ProfilePicture'
import LinkButton from '../components/LinkButton'
import { TabTitle } from '../utils/GeneralFunctions'

const Users = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  TabTitle(`Linked - ${id}`)
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/user/profile/${id}`)
      .then((res) => {
        setUserData(res.data)
        console.log(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        navigate('/*')
      })
  }, [id, navigate])
  if (loading) {
    return <h1>Loading</h1>
  } else {
    return (
      <Container mt={10}>
        <Box align='center'>
          <ProfilePicture src={userData.profilePicture} />
          <Heading mb={2} fontWeight='regular'>
            {id}
          </Heading>
          <Divider />
        </Box>
        <Box mt={5}>
          <List>
            {userData.links.map((i) => {
              return (
                <ListItem mt={4}>
                  <LinkButton link={i.link} icon={i.platform}>
                    {i.title}
                  </LinkButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Container>
    )
  }
}

export default Users
