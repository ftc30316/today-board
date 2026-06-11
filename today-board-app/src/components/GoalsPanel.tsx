import { Box, Paper, Stack, Typography } from '@mui/material'
import FlagIcon from '@mui/icons-material/Flag'
import type { PracticeGoal } from '../types/todayBoard'

type GoalsPanelProps = {
  goals: PracticeGoal[]
}

function GoalsPanel({ goals }: GoalsPanelProps) {
  return (
    <Paper sx={{ p: 2, height: '100%', bgcolor: 'rgba(17, 28, 36, 0.86)' }}>
      <Stack spacing={1.25}>
        <Typography variant="h3">Today&apos;s Goals</Typography>
        {goals.map((goal) => (
          <Stack key={goal.id} direction="row" spacing={1.2} sx={{ alignItems: 'flex-start' }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1,
                bgcolor: 'rgba(245, 200, 76, 0.14)',
                color: 'secondary.light',
                display: 'grid',
                placeItems: 'center',
                flex: '0 0 auto',
              }}
            >
              <FlagIcon fontSize="small" />
            </Box>
            <Typography sx={{ fontSize: { xs: 15, lg: 17 }, fontWeight: 700 }}>{goal.text}</Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  )
}

export default GoalsPanel
