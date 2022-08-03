import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
}

const fonts = {
  body: 'Roboto mono',
  heading: 'Roboto mono',
}

const theme = extendTheme({ fonts, config })
export default theme
