import axios from 'axios'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Input,
  Box,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik'
import { createLinkSchema } from '../schemas'

const AddLinkButton = ({ userLinks, setUserLinks }) => {
  const onSubmit = async (values, actions) => {
    console.log(values)
    const links = {
      platform: values.platform,
      title: values.title,
      link: values.link,
    }
    await axios
      .patch(
        'http://localhost:3001/api/user/profile/addlink',
        { links },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setUserLinks([...userLinks, links])
      })
      .catch((err) => {
        console.log(err)
      })
    actions.resetForm()
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      platform: '',
      title: '',
      link: '',
    },
    validationSchema: createLinkSchema,
    onSubmit,
  })

  console.log(errors)
  return (
    <>
      <Button
        bg='teal'
        leftIcon={<AddIcon />}
        color='whiteAlpha'
        fontSize='xl'
        fontWeight='normal'
        fontFamily='Roboto mono'
        p={4}
        onClick={onOpen}
      >
        Add Link
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mt={2} isRequired>
                <FormLabel>select platform</FormLabel>
                <Select
                  value={values.platform}
                  onChange={handleChange}
                  id='platform'
                  onBlur={handleBlur}
                >
                  <option value=''>Select a platform</option>
                  <option value='instagram'>instagram</option>
                  <option value='twitter'>twitter</option>
                  <option value='twitch'>twitch</option>
                  <option value='github'>github</option>
                  <option value='facebook'>facebook</option>
                  <option value='tiktok'>tiktok</option>
                  <option value='youtube'>youtube</option>
                  <option value='discord'>discord</option>
                  <option value='reddit'>reddit</option>
                  <option value='steam'>steam</option>
                  <option value='amazon'>amazon</option>
                  <option value='personal Site'>personal site</option>
                  <option value='ecommerce'>ecommerce</option>
                  <option value='other'>other</option>
                </Select>
                {errors.platform && touched.platform && (
                  <p style={{ color: 'red' }}>{errors.platform}</p>
                )}
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>link title</FormLabel>
                <Input
                  placeholder='my instagram'
                  value={values.title}
                  onChange={handleChange}
                  id='title'
                  onBlur={handleBlur}
                />
                {errors.title && touched.title && (
                  <p style={{ color: 'red' }}>{errors.title}</p>
                )}
              </FormControl>
              <FormControl mt={2} isRequired>
                <FormLabel>link</FormLabel>
                <Input
                  placeholder='https://www.instagram.com/user/'
                  value={values.link}
                  onChange={handleChange}
                  id='link'
                  onBlur={handleBlur}
                />
                {errors.link && touched.link && (
                  <p style={{ color: 'red' }}>{errors.link}</p>
                )}
              </FormControl>
              <Box mt={4} mb={4} align='end'>
                <Button bg='teal' type='submit' disabled={isSubmitting}>
                  Add link
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddLinkButton
