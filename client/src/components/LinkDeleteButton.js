import axios from 'axios'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalBody,
  useDisclosure,
  Container,
  Box,
} from '@chakra-ui/react'
import { IoTrashSharp } from 'react-icons/io5'
const LinkDeleteButton = ({
  link,
  title,
  platform,
  userLinks,
  setUserLinks,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
    <Container>
      <Button
        variant='ghost'
        p={4}
        onClick={onOpen}
        leftIcon={<IoTrashSharp />}
        color='red.600'
        mt={1}
      >
        Remove Link
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align='center'>
            Are you sure you want to remove the link : {title}?
          </ModalHeader>
          <Container>
            <Divider my={4} />
          </Container>
          <ModalBody>
            <Box align='end'>
              <Button
                mr='1'
                variant='ghost'
                color='red.500'
                rightIcon={<IoTrashSharp />}
                fontSize='lg'
                onClick={removeLink}
              >
                Remove
              </Button>
              <Button variant='ghost' fontSize='lg' onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default LinkDeleteButton
