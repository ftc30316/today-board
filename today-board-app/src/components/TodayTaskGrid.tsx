import { Box, Paper, Stack, Typography } from '@mui/material'
import type { Task } from '../types/todayBoard'
import TodayTaskCard from './TodayTaskCard'

type TodayTaskGridProps = {
  tasks: Task[]
}

function TodayTaskGrid({ tasks }: TodayTaskGridProps) {
  return (
    <Paper sx={{ p: 2, bgcolor: 'rgba(17, 28, 36, 0.72)' }}>
      <Stack spacing={1.5}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h2">Selected Tasks</Typography>
          <Typography color="text.secondary" sx={{ fontWeight: 800 }}>
            {tasks.length} showing
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              xl: 'repeat(3, minmax(0, 1fr))',
            },
          }}
        >
          {tasks.map((task) => (
            <TodayTaskCard key={task.id} task={task} />
          ))}
        </Box>
      </Stack>
    </Paper>
  )
}

export default TodayTaskGrid
