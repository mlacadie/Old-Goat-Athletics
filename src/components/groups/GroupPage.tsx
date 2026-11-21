import { Box, Chip, Container, Stack, Typography } from '@mui/material'
import { colors } from '../../theme'
import type { Group } from '../../types/group'
import type { GroupRole } from '../../lib/viewer'
import GroupHero from './GroupHero'
import GroupLinks from './GroupLinks'

/** One Group's page: its public info for everyone. Members-only content is added below the About row later. */
export default function GroupPage({ group, role }: { group: Group; role: GroupRole }) {
  const links = group.links ?? []

  return (
    <>
      <GroupHero group={group} role={role} />
      <Box component="section" aria-label={`About ${group.name}`} sx={{ bgcolor: colors.bone }}>
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 6 }}
            sx={{ alignItems: 'flex-start' }}
          >
            <Stack spacing={2.5} sx={{ flex: { md: '2 1 520px' }, minWidth: 0 }}>
              <Typography sx={{ fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.7, color: '#2b3442' }}>
                {group.description}
              </Typography>
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
            </Stack>
            {links.length > 0 && <GroupLinks links={links} />}
          </Stack>
          {/* Members-only Content: Next up, Calendar, Announcements, and Members go here, shown only to Members. */}
        </Container>
      </Box>
    </>
  )
}
