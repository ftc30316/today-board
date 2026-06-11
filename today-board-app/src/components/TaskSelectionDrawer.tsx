import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  List,
  ListItemButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import type { Subteam, Task } from '../types/todayBoard'
import { subteams } from '../api/todayBoardApi'

type TaskSelectionDrawerProps = {
  open: boolean
  backlogTasks: Task[]
  selectedTodayTaskIds: string[]
  onClose: () => void
  onAddTasks: (taskIds: string[]) => void
}

type DrawerFilter = Subteam | 'All'

function TaskSelectionDrawer({
  open,
  backlogTasks,
  selectedTodayTaskIds,
  onClose,
  onAddTasks,
}: TaskSelectionDrawerProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<DrawerFilter>('All')
  const [selectedBacklogTaskIds, setSelectedBacklogTaskIds] = useState<string[]>([])

  const selectedToday = useMemo(() => new Set(selectedTodayTaskIds), [selectedTodayTaskIds])
  const selectedBacklog = useMemo(() => new Set(selectedBacklogTaskIds), [selectedBacklogTaskIds])

  const availableTasks = backlogTasks.filter((task) => !selectedToday.has(task.id))
  const visibleTasks = availableTasks.filter((task) => {
    const matchesSearch = `${task.title} ${task.goal}`.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'All' || task.subteam === filter

    return matchesSearch && matchesFilter
  })

  function toggleTask(taskId: string) {
    setSelectedBacklogTaskIds((current) =>
      current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId],
    )
  }

  function addSelectedTasks() {
    onAddTasks(selectedBacklogTaskIds)
    setSelectedBacklogTaskIds([])
    setSearch('')
    setFilter('All')
    onClose()
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: '100vw', sm: 520 },
          height: '100%',
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <PlaylistAddCheckIcon color="primary" />
            <Typography variant="h2">Add Tasks</Typography>
          </Stack>
          <TextField
            label="Search backlog"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="task-selection-subteam-label">Subteam</InputLabel>
            <Select
              labelId="task-selection-subteam-label"
              label="Subteam"
              value={filter}
              onChange={(event) => setFilter(event.target.value as DrawerFilter)}
            >
              <MenuItem value="All">All</MenuItem>
              {subteams.map((subteam) => (
                <MenuItem key={subteam} value={subteam}>
                  {subteam}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Divider />
        <List sx={{ overflowY: 'auto', flex: 1 }}>
          {visibleTasks.map((task) => {
            const checked = selectedBacklog.has(task.id)

            return (
              <ListItemButton key={task.id} onClick={() => toggleTask(task.id)} sx={{ gap: 1.5 }}>
                <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple />
                <Stack spacing={0.75} sx={{ minWidth: 0 }}>
                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    <Chip label={task.subteam} size="small" color="primary" variant="outlined" />
                    {task.dueDate ? <Chip label={task.dueDate} size="small" color="secondary" /> : null}
                  </Stack>
                  <Typography sx={{ fontWeight: 800 }}>{task.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.goal}
                  </Typography>
                </Stack>
              </ListItemButton>
            )
          })}
          {visibleTasks.length === 0 ? (
            <Typography color="text.secondary" sx={{ p: 3 }}>
              No available backlog tasks match this view.
            </Typography>
          ) : null}
        </List>
        <Divider />
        <Stack direction="row" spacing={1.5} sx={{ p: 2 }}>
          <Button onClick={onClose} fullWidth variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={addSelectedTasks}
            disabled={selectedBacklogTaskIds.length === 0}
            fullWidth
            variant="contained"
          >
            Add Selected Tasks
          </Button>
        </Stack>
      </Box>
    </Drawer>
  )
}

export default TaskSelectionDrawer
