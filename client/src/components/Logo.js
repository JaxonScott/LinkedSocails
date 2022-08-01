import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Text, useColorModeValue } from '@chakra-ui/react'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;
`

const Logo = () => {
  return (
    <Link to='/'>
      <LogoBox>
        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontFamily='Roboto Mono'
          fontWeight='bold'
          textDecoration='underline'
          textDecorationColor='teal'
          textDecorationThickness='3px'
          fontSize='xl'
        >
          Linked
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
