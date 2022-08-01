import axios from 'axios'
import { Button } from '@chakra-ui/react'
import { IoTrashSharp } from 'react-icons/io5'
const LinkDeleteButton = ({
  link,
  title,
  platform,
  userLinks,
  setUserLinks,
}) => {
  const links = { link, title, platform }
  const removeLink = () => {
    axios
      .patch(
        'http://localhost:3001/api/user/profile/removelink',
        { links },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then(() => {
        console.log(userLinks)
        setUserLinks(
          userLinks.filter((val) => {
            return val.title !== title
          })
        )
      })
      .catch((err) => {
        console.log(err)
      })
    console.log(links)
  }
  return (
    <Button
      variant='ghost'
      p={4}
      onClick={removeLink}
      leftIcon={<IoTrashSharp />}
      color='red.600'
      mt={1}
    >
      Remove Link
    </Button>
  )
}

export default LinkDeleteButton
