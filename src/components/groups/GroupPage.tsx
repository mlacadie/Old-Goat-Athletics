import { Box, Chip, Container, Stack, Typography } from '@mui/material'
import { colors } from '../../theme'
import type { Group, MembersOnlyContent } from '../../types/group'
import type { DateKey } from '../../lib/calendar'
import type { GroupRole } from '../../lib/viewer'
import GroupHero from './GroupHero'
import { GroupMembershipProvider } from './GroupMembership'
import GroupLinks from './GroupLinks'
import MembersOnlySection from './MembersOnlySection'

interface Props {
  group: Group
  role: GroupRole
  /** Null unless the viewer is a Member or the Owner. */
  membersOnly: MembersOnlyContent | null
  today: DateKey
}

/** One Group's page: its public info for everyone, then the members-only area (locked for non-members). */
export default function GroupPage({ group, role, membersOnly, today }: Props) {
  const links = group.links ?? []

  return (
    <GroupMembershipProvider groupId={group.id} initiallyMember={role === 'member'}>
      <GroupHero group={group} role={role} />
      <Box component="section" aria-label={`About ${group.name}`} sx={{ bgcolor: colors.bone }}>
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 6 }}
            sx={{ alignItems: 'flex-start', pb: { xs: 4, md: 5 }, borderBottom: `1px solid ${colors.grayLight}` }}
          >
            <Stack spacing={2.5} sx={{ flex: { md: '2 1 520px' }, minWidth: 0 }}>
              {group.tags.length > 0 && (
                <Stack component="ul" direction="row" useFlexGap spacing={1} sx={{ flexWrap: 'wrap', listStyle: 'none', m: 0, p: 0 }}>
                  {group.tags.map((tag) => (
                    <li key={tag}>
                      <Chip
                        label={tag}
                        size="small"
                        sx={{ bgcolor: 'rgba(0,50,100,0.1)', color: colors.navy, fontWeight: 600 }}
                      />
                    </li>
                  ))}
                </Stack>
              )}
              <Typography sx={{ fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.7, color: '#2b3442' }}>
                {group.description}
              </Typography>
            </Stack>
            {links.length > 0 && <GroupLinks links={links} />}
          </Stack>
          <MembersOnlySection
            groupId={group.id}
            groupName={group.name}
            role={role}
            content={membersOnly}
            today={today}
          />
        </Container>
      </Box>
    </GroupMembershipProvider>
  )
}
