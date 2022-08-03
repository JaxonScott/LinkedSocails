import { Link } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
const Footer = () => {
  return (
    <Box mt={120} align='center'>
      <Text>
        Built by{' '}
        <Link href='http://localhost:3000/user/jaxon' target='_blank'>
          <span style={{ color: '#ff63c3' }}>
            JaxonCodes <ExternalLinkIcon />
          </span>
        </Link>
      </Text>
    </Box>
  )
}

export default Footer
