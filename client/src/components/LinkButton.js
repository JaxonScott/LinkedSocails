import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { checkIcon } from './CheckIcon'

const LinkButton = ({ children, link, icon }) => {
  const platformIcon = checkIcon(icon)
  return (
    <Link to={link}>
      <Button
        bg='teal'
        w='100%'
        leftIcon={platformIcon}
        fontSize='2xl'
        p={8}
        fontWeight='normal'
        fontFamily='Roboto mono'
      >
        {children}
      </Button>
    </Link>
  )
}

export default LinkButton
