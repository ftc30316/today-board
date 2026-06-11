import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import type { AiTaskSuggestion, Task } from '../types/todayBoard'

type AiTaskSuggestionPanelProps = {
  open: boolean
  suggestions: AiTaskSuggestion[]
  tasksById: Map<string, Task>
  onClose: () => void
  onAddTask: (taskId: string) => void
}

function AiTaskSuggestionPanel({
  open,
  suggestions,
  tasksById,
  onClose,
  onAddTask,
}: AiTaskSuggestionPanelProps) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: '100vw', sm: 500 },
          height: '100%',
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack spacing={1} sx={{ p: 3 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <AutoAwesomeIcon color="secondary" />
            <Typography variant="h2">Suggest Tasks</Typography>
          </Stack>
          <Typography color="text.secondary">
            Mock AI nominations based on attendance, balance, deadlines, and robot readiness.
          </Typography>
        </Stack>
        <Divider />
        <List sx={{ overflowY: 'auto', flex: 1, p: 2 }}>
          {suggestions.map((suggestion) => {
            const task = tasksById.get(suggestion.taskId)

            if (!task) {
              return null
            }

            return (
              <ListItem key={suggestion.taskId} disablePadding sx={{ mb: 1.5 }}>
                <Paper variant="outlined" sx={{ p: 2, width: '100%' }}>
                  <Stack spacing={1.2}>
                    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                      <Chip label={task.subteam} size="small" color="primary" />
                      <Chip
                        label={`${suggestion.confidence} confidence`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </Stack>
                    <Typography sx={{ fontWeight: 900 }}>{task.title}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {suggestion.reason}
                    </Typography>
                    <Button variant="contained" onClick={() => onAddTask(task.id)}>
                      Add to Today
                    </Button>
                  </Stack>
                </Paper>
              </ListItem>
            )
          })}
          {suggestions.length === 0 ? (
            <Typography color="text.secondary" sx={{ p: 1 }}>
              All current recommendations are already selected for today.
            </Typography>
          ) : null}
        </List>
      </Box>
    </Drawer>
  )
}

export default AiTaskSuggestionPanel
