import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import type { Student } from '../types/todayBoard'

type AttendanceCompactProps = {
  students: Student[]
  presentStudentIds: string[]
  onToggleStudent: (studentId: string) => void
}

function AttendanceCompact({
  students,
  presentStudentIds,
  onToggleStudent,
}: AttendanceCompactProps) {
  const present = new Set(presentStudentIds)

  return (
    <Paper sx={{ p: 2, bgcolor: 'rgba(17, 28, 36, 0.78)' }}>
      <Stack spacing={1.5}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h3">Attendance</Typography>
          <Typography color="secondary.light" sx={{ fontWeight: 800 }}>
            {presentStudentIds.length} / {students.length} present
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {students.map((student) => {
            const isPresent = present.has(student.id)

            return (
              <Chip
                key={student.id}
                label={student.name}
                clickable
                color={isPresent ? 'primary' : 'default'}
                variant={isPresent ? 'filled' : 'outlined'}
                onClick={() => onToggleStudent(student.id)}
                sx={{
                  opacity: isPresent ? 1 : 0.46,
                  fontWeight: 800,
                  minWidth: 72,
                  borderColor: isPresent ? 'primary.main' : 'rgba(255, 255, 255, 0.22)',
                }}
              />
            )
          })}
        </Box>
      </Stack>
    </Paper>
  )
}

export default AttendanceCompact
