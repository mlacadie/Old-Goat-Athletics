'use client'

import { useState, useTransition, type FormEvent } from 'react'
import Link from 'next/link'
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  Link as MuiLink,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { colors } from '../../theme'
import { MAX_GROUP_LINKS } from '../../data/groups'
import { SPORTS } from '../../data/sports'
import { GROUP_LIMITS, type GroupFormErrors, type GroupFormResult } from '../../lib/groupForm'
import type { Group, KnownCity } from '../../types/group'
import GroupLocationFields from './GroupLocationFields'

/** One editable Group link row. `id` only keeps React's keys stable while rows are added and removed. */
interface LinkRow {
  id: number
  label: string
  url: string
}

function initialLinkRows(group?: Group): LinkRow[] {
  const links = group?.links ?? []
  const rows = links.map((link, index) => ({ id: index, label: link.label, url: link.url }))
  return rows.length > 0 ? rows : [{ id: 0, label: '', url: '' }]
}

const sectionLabelStyle = {
  color: colors.navy,
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
} as const

/**
 * The Add / Edit Group form. `group` fills it in for editing. `action` saves it on the server: it
 * redirects to the Group page on success, or returns a message for each field to fix.
 */
export default function GroupForm({
  heading,
  intro,
  submitLabel,
  cancelHref,
  group,
  knownCities,
  action,
}: {
  heading: string
  intro: string
  submitLabel: string
  cancelHref: string
  group?: Group
  /** Cities other Groups use, suggested in the City field. */
  knownCities: KnownCity[]
  action: (formData: FormData) => Promise<GroupFormResult>
}) {
  const [errors, setErrors] = useState<GroupFormErrors>({})
  const [linkRows, setLinkRows] = useState(() => initialLinkRows(group))
  const [isSaving, startTransition] = useTransition()

  const addLinkRow = () => {
    setLinkRows((rows) => [...rows, { id: Math.max(-1, ...rows.map((row) => row.id)) + 1, label: '', url: '' }])
  }

  const removeLinkRow = (id: number) => {
    setLinkRows((rows) => rows.filter((row) => row.id !== id))
  }

  // Submitting through onSubmit rather than <form action> keeps what the User typed when the
  // server sends back errors (React resets forms after a form action).
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(async () => {
      try {
        const result = await action(formData)
        setErrors(result?.errors ?? {})
      } catch {
        setErrors({ form: 'Something went wrong saving your Group. Please try again.' })
      }
    })
  }

  const fieldError = (field: keyof GroupFormErrors) => ({
    error: Boolean(errors[field]),
    helperText: errors[field],
  })

  return (
    <Box component="section" sx={{ bgcolor: colors.bone, py: { xs: 14, md: 18 } }}>
      <Container maxWidth="md">
        <Stack spacing={1.25} sx={{ mb: 4 }}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '2.4rem', md: '3rem' }, color: colors.navyDarker }}
          >
            {heading}
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 560, fontSize: '1.05rem' }}>{intro}</Typography>
        </Stack>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          noValidate
          elevation={0}
          sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: `1px solid ${colors.grayLight}` }}
        >
          <Stack spacing={4}>
            <Stack spacing={2.5}>
              <Typography sx={sectionLabelStyle}>About</Typography>
              <TextField
                name="name"
                label="Group name"
                required
                fullWidth
                defaultValue={group?.name}
                slotProps={{ htmlInput: { maxLength: GROUP_LIMITS.name } }}
                {...fieldError('name')}
              />
              <TextField
                select
                name="sport"
                label="Sport"
                required
                fullWidth
                defaultValue={group?.sport ?? ''}
                error={Boolean(errors.sport)}
                helperText={
                  errors.sport ?? (
                    <>
                      Don&rsquo;t see your sport? Pick Other and{' '}
                      <MuiLink href="/contact" target="_blank" rel="noopener" sx={{ color: colors.navy, fontWeight: 600 }}>
                        tell us
                      </MuiLink>
                      .
                    </>
                  )
                }
              >
                {SPORTS.map((sport) => (
                  <MenuItem key={sport} value={sport}>
                    {sport}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="description"
                label="Description"
                required
                fullWidth
                multiline
                minRows={4}
                defaultValue={group?.description}
                slotProps={{ htmlInput: { maxLength: GROUP_LIMITS.description } }}
                {...fieldError('description')}
              />
              <TextField
                name="tags"
                label="Tags"
                fullWidth
                defaultValue={group?.tags.join(', ')}
                error={Boolean(errors.tags)}
                helperText={errors.tags ?? 'Separate with commas, e.g. masters, road racing, track. People can search by them.'}
              />
            </Stack>

            <Stack spacing={2.5}>
              <Typography sx={sectionLabelStyle}>Where</Typography>
              <GroupLocationFields group={group} knownCities={knownCities} errors={errors} />
            </Stack>

            <Stack spacing={2}>
              <Box>
                <Typography sx={sectionLabelStyle}>Links</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mt: 0.5 }}>
                  Optional. Up to {MAX_GROUP_LINKS}: your website, Instagram, Strava, and so on.
                </Typography>
              </Box>
              {linkRows.map((row, index) => (
                <Stack key={row.id} direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ alignItems: { sm: 'flex-start' } }}>
                  <TextField
                    name="linkLabel"
                    label="Label"
                    placeholder="Instagram"
                    defaultValue={row.label}
                    slotProps={{ htmlInput: { maxLength: GROUP_LIMITS.linkLabel } }}
                    sx={{ flex: { sm: '0 0 180px' } }}
                  />
                  <TextField
                    name="linkUrl"
                    label="URL"
                    placeholder="instagram.com/yourgroup"
                    fullWidth
                    defaultValue={row.url}
                    slotProps={{ htmlInput: { maxLength: GROUP_LIMITS.linkUrl, inputMode: 'url' } }}
                  />
                  <IconButton
                    aria-label={`Remove link ${index + 1}`}
                    onClick={() => removeLinkRow(row.id)}
                    sx={{ alignSelf: { xs: 'flex-end', sm: 'center' }, width: 44, height: 44 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              ))}
              {errors.links && <Alert severity="error">{errors.links}</Alert>}
              {linkRows.length < MAX_GROUP_LINKS && (
                <Button
                  onClick={addLinkRow}
                  startIcon={<AddIcon />}
                  sx={{ alignSelf: 'flex-start', color: colors.navy, fontWeight: 700, minHeight: 44 }}
                >
                  Add a link
                </Button>
              )}
            </Stack>

            {errors.form && <Alert severity="error">{errors.form}</Alert>}

            <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'flex-end' }}>
              <Button
                component={Link}
                href={cancelHref}
                variant="outlined"
                sx={{ color: colors.navy, borderColor: colors.navy, minHeight: 48 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSaving}
                sx={{ bgcolor: colors.navy, minHeight: 48, '&:hover': { bgcolor: colors.navyDark } }}
              >
                {isSaving ? 'Saving…' : submitLabel}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
