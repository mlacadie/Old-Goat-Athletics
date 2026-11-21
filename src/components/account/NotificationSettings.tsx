'use client'

import { useState, useTransition } from 'react'
import { Alert, Box, FormControlLabel, Switch, Typography } from '@mui/material'
import { updateEmailNotifications } from '../../app/profile/actions'

/** The Notifications tab on the profile: which channels a User gets Notifications on. */
export default function NotificationSettings({
  initialEmailNotifications,
}: {
  initialEmailNotifications: boolean
}) {
  const [emailNotifications, setEmailNotifications] = useState(initialEmailNotifications)
  const [saveFailed, setSaveFailed] = useState(false)
  const [isSaving, startTransition] = useTransition()

  const handleChange = (enabled: boolean) => {
    setEmailNotifications(enabled)
    setSaveFailed(false)
    startTransition(async () => {
      try {
        await updateEmailNotifications(enabled)
      } catch {
        setEmailNotifications(!enabled)
        setSaveFailed(true)
      }
    })
  }

  return (
    <Box>
      <Typography variant="h6" component="h1" sx={{ mb: 0.5 }}>
        Notifications
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        Choose how we tell you when your Groups post Announcements and Events.
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={emailNotifications}
            onChange={(event) => handleChange(event.target.checked)}
            disabled={isSaving}
          />
        }
        label="Email me"
      />
      {saveFailed && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Couldn&rsquo;t save that change. Please try again.
        </Alert>
      )}
    </Box>
  )
}
