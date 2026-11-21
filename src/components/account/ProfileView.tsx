'use client'

import { UserProfile } from '@clerk/nextjs'
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined'
import NotificationSettings from './NotificationSettings'

/** Clerk's profile (name, email, password, Google) plus a Notifications tab of our own. */
export default function ProfileView({ emailNotifications }: { emailNotifications: boolean }) {
  return (
    <UserProfile path="/profile">
      <UserProfile.Page
        label="Notifications"
        url="notifications"
        labelIcon={<NotificationsIcon sx={{ fontSize: 16 }} />}
      >
        <NotificationSettings initialEmailNotifications={emailNotifications} />
      </UserProfile.Page>
    </UserProfile>
  )
}
