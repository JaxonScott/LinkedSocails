import { useState } from 'react'
import copy from 'copy-to-clipboard'
import { IoShareOutline } from 'react-icons/io5'
import { Button } from '@chakra-ui/react'
const ShareProfile = ({ username }) => {
  const [copied, setCopied] = useState(false)
  const copyText = `http://localhost:3000/user/${username}`

  const copyToClipboard = () => {
    copy(copyText)
    setCopied(true)
    console.log(copyText)
  }
  return (
    <Button
      fontWeight='normal'
      variant='ghost'
      rightIcon={<IoShareOutline />}
      onClick={copyToClipboard}
      color={copied ? 'green.400' : 'white'}
    >
      {copied ? 'Copied!' : 'Copy profile link'}
    </Button>
  )
}

export default ShareProfile
