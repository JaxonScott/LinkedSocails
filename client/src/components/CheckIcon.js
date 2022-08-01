import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoTwitch,
  IoLogoGithub,
  IoLogoFacebook,
  IoLogoTiktok,
  IoLogoYoutube,
  IoLogoDiscord,
  IoLogoReddit,
  IoLogoSteam,
  IoLogoAmazon,
  IoLink,
} from 'react-icons/io5'

export const checkIcon = function (platform) {
  if (platform === 'instagram') {
    return <IoLogoInstagram />
  } else if (platform === 'twitter') {
    return <IoLogoTwitter />
  } else if (platform === 'twitch') {
    return <IoLogoTwitch />
  } else if (platform === 'github') {
    return <IoLogoGithub />
  } else if (platform === 'facebook') {
    return <IoLogoFacebook />
  } else if (platform === 'tiktok') {
    return <IoLogoTiktok />
  } else if (platform === 'youtube') {
    return <IoLogoYoutube />
  } else if (platform === 'discord') {
    return <IoLogoDiscord />
  } else if (platform === 'reddit') {
    return <IoLogoReddit />
  } else if (platform === 'steam') {
    return <IoLogoSteam />
  } else if (platform === 'amazon') {
    return <IoLogoAmazon />
  } else if (platform === 'other' || 'ecommerce' || 'personal site') {
    return <IoLink />
  }
}
