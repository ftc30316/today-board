import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Alert,
  AppBar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import GroupsIcon from '@mui/icons-material/Groups'
import RefreshIcon from '@mui/icons-material/Refresh'
import TodayIcon from '@mui/icons-material/Today'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

type Task = {
  id: string
  title: string
  description: string | null
  goal: string | null
  status: string
  priority: string
  due_date: string | null
  subteam: string | null
}

const attendance = [
  { label: 'Present', value: '18' },
  { label: 'Late', value: '2' },
  { label: 'Absent', value: '3' },
]

function formatLabel(value: string | null) {
  if (!value) {
    return 'Unassigned'
  }

  return value
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTasks = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`)

      if (!response.ok) {
        throw new Error(`The API returned ${response.status}`)
      }

      const data = (await response.json()) as Task[]
      setTasks(data)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to load tasks')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadTasks()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [loadTasks])

  const openTaskCount = tasks.filter((task) => task.status !== 'done').length
  const subteams = useMemo(() => {
    const counts = new Map<string, number>()

    tasks.forEach((task) => {
      const subteam = formatLabel(task.subteam)
      counts.set(subteam, (counts.get(subteam) ?? 0) + 1)
    })

    return [...counts.entries()].map(([name, count]) => ({
      name,
      count,
      progress: tasks.length > 0 ? Math.round((count / tasks.length) * 100) : 0,
    }))
  }, [tasks])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          <AssignmentTurnedInIcon color="primary" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Today Board
          </Typography>
          <Button
            startIcon={<RefreshIcon />}
            variant="outlined"
            size="small"
            onClick={() => void loadTasks()}
            disabled={isLoading}
          >
            Sync
          </Button>
          <Button startIcon={<AddTaskIcon />} variant="contained" size="small">
            Task
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>
          <Paper sx={{ p: { xs: 3, md: 4 } }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={3}
              sx={{
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <TodayIcon color="primary" fontSize="small" />
                  <Typography color="text.secondary" sx={{ fontWeight: 700 }}>
                    Practice dashboard
                  </Typography>
                </Stack>
                <Typography variant="h1">Today&apos;s robotics work, at a glance.</Typography>
              </Box>
              <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                {attendance.map((item) => (
                  <Box key={item.label} sx={{ minWidth: 72 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Paper>

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 2fr) minmax(280px, 1fr)' },
            }}
          >
            <Paper sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Typography variant="h2">Task Queue</Typography>
                  <Chip label={`${openTaskCount} open`} color="primary" variant="outlined" />
                </Stack>

                {error ? (
                  <Alert severity="error" action={<Button onClick={() => void loadTasks()}>Retry</Button>}>
                    {error}
                  </Alert>
                ) : null}

                {isLoading ? (
                  <Stack sx={{ alignItems: 'center', py: 5 }}>
                    <CircularProgress />
                  </Stack>
                ) : null}

                {!isLoading && !error && tasks.length === 0 ? (
                  <Alert severity="info">No tasks found.</Alert>
                ) : null}

                {!isLoading && !error
                  ? tasks.map((task) => (
                      <Paper key={task.id} variant="outlined" sx={{ p: 2 }}>
                        <Stack spacing={1}>
                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1}
                            sx={{
                              alignItems: { xs: 'flex-start', sm: 'center' },
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography sx={{ fontWeight: 700 }}>{task.title}</Typography>
                            <Chip label={formatLabel(task.priority)} size="small" color="secondary" />
                          </Stack>
                          {task.description ? (
                            <Typography variant="body2" color="text.secondary">
                              {task.description}
                            </Typography>
                          ) : null}
                          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                            <Chip label={formatLabel(task.subteam)} size="small" variant="outlined" />
                            <Chip label={formatLabel(task.status)} size="small" />
                            {task.due_date ? (
                              <Chip label={`Due ${task.due_date}`} size="small" variant="outlined" />
                            ) : null}
                          </Stack>
                        </Stack>
                      </Paper>
                    ))
                  : null}
              </Stack>
            </Paper>

            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <GroupsIcon color="primary" />
                    <Typography variant="h2">Subteams</Typography>
                  </Stack>
                  {subteams.length > 0 ? (
                    subteams.map((subteam, index) => (
                      <Box key={subteam.name}>
                        <Typography color="text.secondary" sx={{ mb: 1 }}>
                          {subteam.name} ({subteam.count})
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={subteam.progress}
                          color={index % 2 === 0 ? 'primary' : 'secondary'}
                        />
                      </Box>
                    ))
                  ) : (
                    <Typography color="text.secondary">No subteam task data loaded.</Typography>
                  )}
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  Today&apos;s Goal
                </Typography>
                <Typography color="text.secondary">
                  Showing live tasks from the Today Board API at {API_BASE_URL}.
                </Typography>
              </Paper>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default App
