'use client'

import { useState } from 'react'
import { UserProfile } from '@clerk/nextjs'
import GroupsIcon from '@mui/icons-material/GroupsOutlined'
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined'
import type { MyGroup } from '../../types/group'
import MyGroups from './MyGroups'
import NotificationSettings from './NotificationSettings'

/**
 * Clerk's profile (name, email, password, Google) plus tabs of our own: My Groups and
 * Notifications. Tabs use hash routing, so switching tabs stays in the browser. The Notification
 * preference is held here, not in the tab, because Clerk remounts the tab each time it opens.
 */
export default function ProfileView({
  initialEmailNotifications,
  myGroups,
}: {
  initialEmailNotifications: boolean
  myGroups: MyGroup[]
}) {
  const [emailNotifications, setEmailNotifications] = useState(initialEmailNotifications)

  return (
    <UserProfile routing="hash">
      <UserProfile.Page label="My Groups" url="groups" labelIcon={<GroupsIcon sx={{ fontSize: 16 }} />}>
        <MyGroups groups={myGroups} />
      </UserProfile.Page>
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
