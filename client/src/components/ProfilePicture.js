import { Image, Box } from '@chakra-ui/react'

const ProfilePicture = ({ src }) => {
  return (
    <Box
      flexShrink={0}
      mt={{ base: 4, md: 0 }}
      ml={{ base: 4, md: 0 }}
      align='center'
    >
      <Image
        borderColor='whiteAlpha.800'
        borderWidth={2}
        borderStyle='solid'
        maxWidth='100px'
        display='inline-block'
        borderRadius='full'
        src={src}
        alt='Profile Picture'
      />
    </Box>
  )
}

export default ProfilePicture
