import { useContext } from 'react'
import { editProfileContext } from '../contexts/editProfile'
import { AiOutlineEdit } from 'react-icons/ai'
import { Button, Box } from '@chakra-ui/react'

const EditProfileButton = () => {
  const { isEditing, setIsEditing } = useContext(editProfileContext)
  const startEditing = () => {
    setIsEditing(true)
    console.log(isEditing)
  }
  const stopEditing = () => {
    setIsEditing(false)
    console.log(isEditing)
  }
  return (
    <Box>
      {!isEditing ? (
        <Button
          onClick={startEditing}
          variant='ghost'
          p={4}
          fontSize='xl'
          fontWeight='normal'
          fontFamily='Roboto mono'
          rightIcon={<AiOutlineEdit />}
        >
          <span style={{ fontSize: '1rem' }}>Edit Profile</span>
        </Button>
      ) : (
        <Button
          onClick={stopEditing}
          w='100%'
          variant='ghost'
          p={4}
          fontSize='xl'
          fontWeight='regular'
          fontFamily='Roboto mono'
        >
          Done
        </Button>
      )}
    </Box>
  )
}

export default EditProfileButton
