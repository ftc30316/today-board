import { useMemo, useState } from 'react'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import {
  getMockAiSuggestions,
  initialTodayTaskIds,
  mockBacklogTasks,
  mockPracticeGoals,
  mockStudents,
  subteams,
} from '../api/todayBoardApi'
import type { Subteam } from '../types/todayBoard'
import AiTaskSuggestionPanel from './AiTaskSuggestionPanel'
import AttendanceCompact from './AttendanceCompact'
import GoalsPanel from './GoalsPanel'
import PracticeHeader from './PracticeHeader'
import PracticeNotesPanel from './PracticeNotesPanel'
import SubteamFilterBar from './SubteamFilterBar'
import TaskSelectionDrawer from './TaskSelectionDrawer'
import TodayTaskGrid from './TodayTaskGrid'

type SubteamFilter = Subteam | 'All'

const initialPresentStudentIds = ['lucy', 'adi', 'sami', 'bianca', 'samuel', 'leo', 'krithi', 'isaac']

function TodayBoardPage() {
  const [presentStudentIds, setPresentStudentIds] = useState(initialPresentStudentIds)
  const [selectedSubteamFilter, setSelectedSubteamFilter] = useState<SubteamFilter>('All')
  const [selectedTodayTaskIds, setSelectedTodayTaskIds] = useState(initialTodayTaskIds)
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [notes, setNotes] = useState('')

  const tasksById = useMemo(
    () => new Map(mockBacklogTasks.map((task) => [task.id, task])),
    [],
  )

  const selectedTasks = selectedTodayTaskIds
    .map((taskId) => tasksById.get(taskId))
    .filter((task) => task !== undefined)

  const filteredTasks =
    selectedSubteamFilter === 'All'
      ? selectedTasks
      : selectedTasks.filter((task) => task.subteam === selectedSubteamFilter)

  const suggestions = getMockAiSuggestions(presentStudentIds.length, selectedTodayTaskIds)

  function toggleStudent(studentId: string) {
    setPresentStudentIds((current) =>
      current.includes(studentId)
        ? current.filter((id) => id !== studentId)
        : [...current, studentId],
    )
  }

  function addTodayTasks(taskIds: string[]) {
    setSelectedTodayTaskIds((current) => [...new Set([...current, ...taskIds])])
  }

  function addSuggestedTask(taskId: string) {
    addTodayTasks([taskId])
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        background:
          'radial-gradient(circle at 20% 0%, rgba(47, 191, 113, 0.2), transparent 28%), #091117',
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, lg: 3 }, py: { xs: 2, lg: 3 } }}>
        <Stack spacing={2}>
          <PracticeHeader
            practiceDate="June 11, 2026"
            practiceTitle="Limelight validation, chassis direction, and outreach readiness"
            selectedTaskCount={selectedTodayTaskIds.length}
            presentCount={presentStudentIds.length}
            studentCount={mockStudents.length}
          />

          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: '1fr', xl: 'minmax(360px, 0.9fr) minmax(0, 2.1fr)' },
            }}
          >
            <Stack spacing={2}>
              <AttendanceCompact
                students={mockStudents}
                presentStudentIds={presentStudentIds}
                onToggleStudent={toggleStudent}
              />
              <GoalsPanel goals={mockPracticeGoals} />
            </Stack>

            <Stack spacing={1.5}>
              <Paper sx={{ p: 1.5, bgcolor: 'rgba(17, 28, 36, 0.78)' }}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={1.5}
                  sx={{
                    alignItems: { xs: 'stretch', md: 'center' },
                    justifyContent: 'space-between',
                  }}
                >
                  <SubteamFilterBar
                    subteams={subteams}
                    selectedFilter={selectedSubteamFilter}
                    onSelectFilter={setSelectedSubteamFilter}
                  />
                  <Stack direction="row" spacing={1}>
                    <Button
                      startIcon={<AddTaskIcon />}
                      variant="contained"
                      color="primary"
                      onClick={() => setTaskDrawerOpen(true)}
                    >
                      Add Tasks
                    </Button>
                    <Button
                      startIcon={<AutoAwesomeIcon />}
                      variant="outlined"
                      color="secondary"
                      onClick={() => setSuggestionsOpen(true)}
                    >
                      Suggest Tasks
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
              <TodayTaskGrid tasks={filteredTasks} />
            </Stack>
          </Box>

          <Paper sx={{ p: { xs: 2, lg: 3 }, mt: 2, bgcolor: 'rgba(17, 28, 36, 0.72)' }}>
            <Stack spacing={2}>
              <Typography variant="h2">Practice Notes and Summary</Typography>
              <PracticeNotesPanel notes={notes} onNotesChange={setNotes} />
            </Stack>
          </Paper>
        </Stack>
      </Container>

      <TaskSelectionDrawer
        open={taskDrawerOpen}
        backlogTasks={mockBacklogTasks}
        selectedTodayTaskIds={selectedTodayTaskIds}
        onClose={() => setTaskDrawerOpen(false)}
        onAddTasks={addTodayTasks}
      />
      <AiTaskSuggestionPanel
        open={suggestionsOpen}
        suggestions={suggestions}
        tasksById={tasksById}
        onClose={() => setSuggestionsOpen(false)}
        onAddTask={addSuggestedTask}
      />
    </Box>
  )
}

export default TodayBoardPage
