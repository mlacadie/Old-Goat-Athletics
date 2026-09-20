import { Box, Container, Grid, Typography, Button, Stack, Paper } from '@mui/material'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import { colors } from '../theme.js'

export default function Community() {
  return (
    <Box id="track-club" component="section" sx={{ bgcolor: 'background.paper', py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            border: `1px solid ${colors.grayLight}`,
          }}
        >
          <Grid container>
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                bgcolor: colors.navy,
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'center',
                minHeight: { xs: 260, md: '100%' },
              }}
            >
              <Box
                component="img"
                src="/team.png"
                alt="Old Goat Track Club"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 7 }} sx={{ p: { xs: 4, md: 6 } }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', color: colors.navy, mb: 2 }}
              >
                <DirectionsRunIcon fontSize="small" />
                <Typography
                  sx={{
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem',
                  }}
                >
                  Our Flagship Club
                </Typography>
              </Stack>

              <Typography
                variant="h3"
                sx={{ color: colors.navyDarker, fontSize: { xs: '2.2rem', md: '2.8rem' }, mb: 2 }}
              >
                The Old Goat Track Club
              </Typography>

              <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.75, mb: 3 }}>
                If running is your &ldquo;I ___ now,&rdquo; the Old Goat Track Club is where it
                happens. It&rsquo;s our home base for former college runners and competitors who
                traded the eligibility clock for the open road &mdash; workouts, races, and a
                crew that still shows up early.
              </Typography>

              <Button
                size="large"
                variant="contained"
                href="https://ogtc.net/index.html"
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<NorthEastIcon sx={{ fontSize: 16 }} />}
                sx={{
                  bgcolor: colors.navy,
                  '&:hover': { bgcolor: colors.navyDark },
                }}
              >
                Visit ogtc.net
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
