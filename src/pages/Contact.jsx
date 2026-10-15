import { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Paper,
  TextField,
  Alert,
} from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'
import { colors } from '../theme.js'

// Replace with your real Formspree endpoint after creating a form at https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id'
const CONTACT_EMAIL = 'hello@oldgoatathletics.com'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(event.target),
        headers: { Accept: 'application/json' },
      })
      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Box component="section" sx={{ bgcolor: 'background.paper', py: { xs: 14, md: 18 }, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
          <Typography
            sx={{
              color: colors.navy,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.2rem', md: '2.8rem' }, color: colors.navyDarker }}
          >
            Contact Us
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, fontSize: '1.05rem' }}>
            Questions, ideas, or a club we should add to the directory? Reach out.
          </Typography>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            border: `1px solid ${colors.grayLight}`,
            maxWidth: 960,
            mx: 'auto',
          }}
        >
          <Grid container>
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                bgcolor: colors.navy,
                color: '#fff',
                p: { xs: 4, md: 5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Typography variant="h4" sx={{ color: '#fff' }}>
                Let&rsquo;s talk.
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                We&rsquo;ll get back to you as soon as we can. Prefer email? Reach us directly.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 1 }}>
                <MailIcon fontSize="small" sx={{ color: colors.gold }} />
                <Typography
                  component="a"
                  href={`mailto:${CONTACT_EMAIL}`}
                  sx={{ color: colors.gold, fontWeight: 600, textDecoration: 'none' }}
                >
                  {CONTACT_EMAIL}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }} sx={{ p: { xs: 4, md: 5 } }}>
              {status === 'success' ? (
                <Alert severity="success">
                  Thanks for reaching out. We&rsquo;ll be in touch soon.
                </Alert>
              ) : (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2.5}>
                    <TextField name="name" label="Name" required fullWidth disabled={status === 'submitting'} />
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      required
                      fullWidth
                      disabled={status === 'submitting'}
                    />
                    <TextField
                      name="message"
                      label="Message"
                      required
                      multiline
                      minRows={4}
                      fullWidth
                      disabled={status === 'submitting'}
                    />
                    <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    {status === 'error' && (
                      <Alert severity="error">
                        Something went wrong sending that. Email us directly at{' '}
                        <Box component="a" href={`mailto:${CONTACT_EMAIL}`} sx={{ color: 'inherit', fontWeight: 700 }}>
                          {CONTACT_EMAIL}
                        </Box>{' '}
                        instead.
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={status === 'submitting'}
                      sx={{
                        alignSelf: 'flex-start',
                        bgcolor: colors.navy,
                        '&:hover': { bgcolor: colors.navyDark },
                      }}
                    >
                      {status === 'submitting' ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Stack>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}
