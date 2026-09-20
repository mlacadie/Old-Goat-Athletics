import { Box, Container, Grid, Typography, Paper, Chip, Stack } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import XIcon from '@mui/icons-material/X'
import TikTokIcon from '../icons/TikTokIcon.jsx'
import { colors } from '../theme.js'

const PLATFORMS = [
  { name: 'Instagram', handle: '@oldgoatathletics', Icon: InstagramIcon },
  { name: 'TikTok', handle: '@oldgoatathletics', Icon: TikTokIcon },
  { name: 'Facebook', handle: 'Old Goat Athletics', Icon: FacebookIcon },
  { name: 'X', handle: '@oldgoatathletics', Icon: XIcon },
]

export default function Socials() {
  return (
    <Box id="socials" component="section" sx={{ bgcolor: colors.bone, py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} alignItems="center" textAlign="center" sx={{ mb: 6 }}>
          <Typography
            sx={{
              color: colors.navy,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
            }}
          >
            Follow the Herd
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, color: colors.navyDarker }}
          >
            We&rsquo;re just getting started.
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, fontSize: '1.05rem' }}>
            Our socials are lacing up. Check back soon for the first drop &mdash; workouts,
            stories, and proof that the competitive fire never really goes out.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {PLATFORMS.map(({ name, handle, Icon }) => (
            <Grid key={name} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  textAlign: 'center',
                  borderRadius: 3,
                  border: `1px solid ${colors.grayLight}`,
                  height: '100%',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 16px 32px rgba(0,50,100,0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: colors.navy,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Icon />
                </Box>
                <Typography sx={{ fontWeight: 700, color: colors.navyDarker }}>{name}</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 1.5 }}>
                  {handle}
                </Typography>
                <Chip
                  label="Coming soon"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(201,152,47,0.15)',
                    color: colors.gold,
                    fontWeight: 700,
                    fontSize: '0.7rem',
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
