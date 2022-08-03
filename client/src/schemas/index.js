import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
const linkRules =
  /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

export const signUpSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'Please make a stronger password' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup.string().required('Required'),
})

export const createLinkSchema = yup.object().shape({
  platform: yup
    .string()
    .oneOf([
      'instagram',
      'twitter',
      'twitch',
      'github',
      'facebook',
      'tiktok',
      'youtube',
      'discord',
      'reddit',
      'steam',
      'amazon',
      'personal Site',
      'ecommerce',
      'other',
    ])
    .required('Required'),
  title: yup.string().required('Required'),
  link: yup
    .string()
    .matches(linkRules, { message: 'Please provide a link' })
    .required('Required'),
})

export const changeUsernameSchema = yup.object().shape({
  username: yup.string().required('Required'),
})
