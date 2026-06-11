import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import type { Task } from '../types/todayBoard'

type TodayTaskCardProps = {
  task: Task
}

function TodayTaskCard({ task }: TodayTaskCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        borderColor: 'rgba(255, 255, 255, 0.12)',
        bgcolor: 'rgba(14, 24, 32, 0.98)',
      }}
    >
      <CardContent sx={{ height: '100%', p: { xs: 2, lg: 2.5 }, '&:last-child': { pb: 2.5 } }}>
        <Stack spacing={1.4} sx={{ height: '100%' }}>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', gap: 1 }}>
            <Chip label={task.subteam} size="small" color="primary" sx={{ fontWeight: 800 }} />
            {task.dueDate ? (
              <Chip label={task.dueDate} size="small" color="secondary" variant="outlined" />
            ) : null}
          </Stack>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.05rem', lg: '1.35rem' },
              lineHeight: 1.12,
            }}
          >
            {task.title}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: 14, lg: 16 }, lineHeight: 1.35 }}>
            {task.goal}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TodayTaskCard
