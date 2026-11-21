'use client'

import { useState } from 'react'
import { UserProfile } from '@clerk/nextjs'
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined'
import NotificationSettings from './NotificationSettings'

/**
 * Clerk's profile (name, email, password, Google) plus a Notifications tab of our own. Tabs use
 * hash routing, so switching tabs stays in the browser. The preference is held here, not in the
 * tab, because Clerk remounts the tab each time it opens.
 */
export default function ProfileView({
  initialEmailNotifications,
}: {
  initialEmailNotifications: boolean
}) {
  const [emailNotifications, setEmailNotifications] = useState(initialEmailNotifications)

  return (
    <UserProfile routing="hash">
      <UserProfile.Page
        label="Notifications"
        url="notifications"
        labelIcon={<NotificationsIcon sx={{ fontSize: 16 }} />}
      >
        <NotificationSettings
          emailNotifications={emailNotifications}
          onEmailNotificationsChange={setEmailNotifications}
        />
      </UserProfile.Page>
    </UserProfile>
  )
}
