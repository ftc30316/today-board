import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import GroupsIcon from '@mui/icons-material/Groups'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

type PracticeHeaderProps = {
  practiceDate: string
  practiceTitle: string
  selectedTaskCount: number
  presentCount: number
  studentCount: number
}

function PracticeHeader({
  practiceDate,
  practiceTitle,
  selectedTaskCount,
  presentCount,
  studentCount,
}: PracticeHeaderProps) {
  return (
    <Paper
      sx={{
        p: { xs: 2, lg: 2.5 },
        border: '1px solid rgba(47, 191, 113, 0.22)',
        bgcolor: 'rgba(17, 28, 36, 0.92)',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between' }}
      >
        <Box>
          <Typography color="primary.light" sx={{ fontWeight: 800, letterSpacing: 0.6 }}>
            Evergreen Dynamics
          </Typography>
          <Typography variant="h1">Today Board</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: { xs: 16, lg: 18 } }}>
            {practiceTitle}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Chip icon={<EventAvailableIcon />} label={practiceDate} color="primary" variant="outlined" />
          <Chip icon={<TaskAltIcon />} label={`${selectedTaskCount} selected tasks`} color="secondary" />
          <Chip icon={<GroupsIcon />} label={`${presentCount} / ${studentCount} present`} />
        </Stack>
      </Stack>
    </Paper>
  )
}

export default PracticeHeader
