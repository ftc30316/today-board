import { Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

type PracticeNotesPanelProps = {
  notes: string
  onNotesChange: (notes: string) => void
}

function PracticeNotesPanel({ notes, onNotesChange }: PracticeNotesPanelProps) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Practice Notes"
        placeholder="Type or dictate what happened during practice..."
        value={notes}
        onChange={(event) => onNotesChange(event.target.value)}
        multiline
        minRows={6}
        fullWidth
      />
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <AutoAwesomeIcon color="secondary" />
              <Typography variant="h3">Future AI Summary</Typography>
            </Stack>
            <Typography color="text.secondary">
              In a later milestone, this card can summarize notes, call out blockers, and produce follow-up
              tasks for the next practice.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default PracticeNotesPanel
