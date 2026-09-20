import { Box, Container, Grid, Typography, Stack, Paper } from '@mui/material'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BoltIcon from '@mui/icons-material/Bolt'
import { colors } from '../theme.js'

const PILLARS = [
  {
    icon: FavoriteBorderIcon,
    title: 'Rebuild Your Identity',
    body: "Your sport was never just a schedule — it was who you were. We help you carry that identity into whatever's next.",
  },
  {
    icon: EmojiPeopleIcon,
    title: 'Find Your People',
    body: 'Every former athlete knows the feeling. Old Goat Athletics connects you with others who get it and want to move with you.',
  },
  {
    icon: BoltIcon,
    title: 'Keep Competing',
    body: 'The scoreboard changes. The drive doesn’t. Whether it’s a 5K, a men’s league, or a mountain, the fire still counts.',
  },
]

export default function Mission() {
  return (
    <Box id="mission" component="section" sx={{ bgcolor: colors.bone, py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{
                color: colors.navy,
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                mb: 2,
              }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2.4rem', md: '3.2rem' }, color: colors.navyDarker, mb: 3 }}
            >
              Graduation ends a career, not a competitor.
            </Typography>
            <Stack spacing={2.5} sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.75 }}>
              <Typography component="p" sx={{ color: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}>
                Most college athletes spend their entire lives training for something that
                ends the day they walk across the stage. One day you&rsquo;re a student-athlete
                with a locker, a schedule, and a team. The next, that identity is gone &mdash;
                and a lot of us lose our way for a while.
              </Typography>
              <Typography component="p" sx={{ color: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}>
                Old Goat Athletics exists to catch that fall. We&rsquo;re a community built for
                former college athletes to stay active, find a new sport or calling, and keep
                the competitive fire alive &mdash; on their own terms, on their own timeline.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={`${import.meta.env.BASE_URL}logos/OGTC_OGoatG_KC.svg`}
              alt="Old Goat Athletics — Keep Competing"
              sx={{
                width: '100%',
                maxWidth: 460,
                mx: 'auto',
                display: 'block',
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: { xs: 6, md: 9 } }}>
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <Grid key={title} size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  border: `1px solid ${colors.grayLight}`,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 16px 32px rgba(0,50,100,0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    bgcolor: colors.navy,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                  }}
                >
                  <Icon />
                </Box>
                <Typography variant="h6" sx={{ color: colors.navyDarker, mb: 1 }}>
                  {title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.65 }}>{body}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
