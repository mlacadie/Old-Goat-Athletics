import type { ComponentType } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import type { SvgIconProps } from '@mui/material/SvgIcon'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LanguageIcon from '@mui/icons-material/Language'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import XIcon from '@mui/icons-material/X'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TikTokIcon from '../icons/TikTokIcon'
import { colors } from '../../theme'
import type { GroupLink } from '../../types/group'
import { sectionLabelSx } from './styles'

/** Sites that get their own icon. Anything else (a Group's website, Strava, ...) gets a globe. */
const SITE_ICONS: Record<string, ComponentType<SvgIconProps>> = {
  'facebook.com': FacebookIcon,
  'instagram.com': InstagramIcon,
  'linkedin.com': LinkedInIcon,
  'tiktok.com': TikTokIcon,
  'twitter.com': XIcon,
  'x.com': XIcon,
  'youtube.com': YouTubeIcon,
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function LinkRow({ link }: { link: GroupLink }) {
  const host = hostOf(link.url)
  const Icon = SITE_ICONS[host] ?? LanguageIcon

  return (
    <Box
      component="a"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        minHeight: 56,
        px: 1.75,
        borderRadius: 3,
        border: `1px solid ${colors.grayLight}`,
        bgcolor: '#fff',
        color: colors.navyDarker,
        textDecoration: 'none',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: colors.navy },
        '&:focus-visible': { outline: `2px solid ${colors.navy}`, outlineOffset: 2 },
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
          borderRadius: 2,
          bgcolor: 'rgba(0,50,100,0.1)',
          color: colors.navy,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon sx={{ fontSize: 18 }} />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>{link.label}</Typography>
        <Typography noWrap sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
          {host}
        </Typography>
      </Box>
      <NorthEastIcon sx={{ fontSize: 16, color: colors.navy }} />
    </Box>
  )
}

/** The Group's website and socials. Group Owners add up to MAX_GROUP_LINKS of them. */
export default function GroupLinks({ links }: { links: GroupLink[] }) {
  return (
    <Box component="nav" aria-label="Group links" sx={{ flex: { md: '1 1 300px' }, minWidth: 0 }}>
      <Typography sx={{ ...sectionLabelSx, mb: 1.25 }}>
        Links
      </Typography>
      <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {links.map((link) => (
          <li key={link.url}>
            <LinkRow link={link} />
          </li>
        ))}
      </Stack>
    </Box>
  )
}
