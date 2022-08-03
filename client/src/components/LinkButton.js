import { Button, Link } from '@chakra-ui/react'
import { checkIcon } from './CheckIcon'

const LinkButton = ({ children, link, icon }) => {
  const platformIcon = checkIcon(icon)
  return (
    <Link href={link} target='_blank'>
      <Button
        bg='teal'
        w='100%'
        leftIcon={platformIcon}
        fontSize='2xl'
        p={8}
        fontWeight='normal'
      >
        {children}
      </Button>
    </Link>
  )
}

export default LinkButton
